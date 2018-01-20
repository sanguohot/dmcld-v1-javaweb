define(["bootstrap-table",'text!html/alarm/UserLog.html','text!html/alarm/UserLogRow.html',"object-type","operate-type"],function (bt,tpl,rowTpl,objectf,operatef){
	function createView(pid){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    var lan={searchCondition:window.lc.getValue("searchCondition")
	    		,searchResult:window.lc.getValue("searchResult")	    		
	    		,fromTime:window.lc.getValue("fromTime")
	    		,toTime:window.lc.getValue("toTime")
	    		,plSelOperateType:window.lc.getValue("plSelOperateType")
	    		,plSelOperateObject:window.lc.getValue("plSelOperateObject")
	    		,today:window.lc.getValue("today")
	    		,last3Day:window.lc.getValue("last3Day")
	    		,last7Day:window.lc.getValue("last7Day")
	    		,lastMonth:window.lc.getValue("lastMonth")
	    		,userName:window.lc.getValue("userName")
	    		,objectDomain:window.lc.getValue("objectDomain")
	    		,objectName:window.lc.getValue("objectName")};
	    var tempFn = window.dot.template(tpl);
	    var html=tempFn({lan:lan,pid:pid,objectList:objectf.getList(),operateList:operatef.getList()});
	    pn.html(html);
	    $('#'+pid+' .form_datetime').datetimepicker({
	        language:'zh-CN',
			format:'yyyy-mm-dd hh:ii:ss',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			minView:1,
//			pickerPosition:'bottom-left',
			maxView:2,
			startView: 2,
	        showMeridian: 1
	    }).on('changeDate', function(ev){
			toFirst(pid);
		});
	    $('#operate-sel').chosen({width:'85%',allow_single_deselect:true});
	    $('#object-type-sel').chosen({width:'85%',allow_single_deselect:true});
	    createList(pid);
	    listen(pid);
	}
	function listen(pid){
		$(".form_datetime .input-group-addon").hover(function(){
			$(this).css("background-color","#c7c7c7");
		},function(){
			$(this).css("background-color","#eeeeee");	
		});
		$('.input-group-addon').bind("click",function(){
			var child=$(this).find(".glyphicon-remove");
			if(child){
				$(this).parent().find("input.form-control").val("");
				toFirst(pid);
			}	
		})
		
		$("#"+pid+"_search_bt").bind("click",function(){
			toFirst(pid);
		});
        $("#"+pid+"_search_input").bind('keypress',function(event){
            if(event.keyCode == "13")    
            {
            	toFirst(pid);
            }
        });
        $("#"+pid+"_search_clear").bind("click",function(){
        	$("#"+pid+"_search_input").val("");
        	toFirst(pid);
        })
		$('#operate-sel').chosen().change(function(){
			toFirst(pid);
		});
		$('#object-type-sel').chosen().change(function(){
			toFirst(pid);
		});
		$('#'+pid+' button[name=time]').bind("click",function(){
			var n=$(this);
			var val=n.attr("value");
			if(val){
				var obj=window.global.getTimeObj(val);
				var flag=0;
				if(obj.fromTime){
					$("#"+pid+" input[name=fromTime]").val(obj.fromTime);
					flag=1;
				}
				if(obj.toTime){
					$("#"+pid+" input[name=toTime]").val(obj.toTime);
					flag=1;
				}
				if(flag){
					toFirst(pid);
				}
			}
		});
	}
	function toFirst(pid){
		var id=pid+"_list";
		$('#'+id).bootstrapTable("selectPage",1);
	}
	function createList(pid){
		var id=pid+"_list";
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "logManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.li){
					var obj={};
					obj["rows"]=res.li;
					obj.total=res["maxTotal"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params="";
				params+="&dstDomainUuid="+window.global.getDomainUuid();
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				params+="&objectType="+$("#object-type-sel").val();
				params+="&operate="+$("#operate-sel").val();
				params+="&search="+$("#"+pid+"_search_input").val();
				var fromTime=$("#"+pid+" input[name=fromTime]").val();
				var toTime=$("#"+pid+" input[name=toTime]").val();
				if(fromTime){
					console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
					params+="&fromTime="+window.format.browseToUtc(fromTime);
				}
				if(toTime){
					console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
					params+="&toTime="+window.format.browseToUtc(toTime);
				}
				
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 5,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [5,10,25,50],
//			search: true,
			showColumns: true,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			detailView:true,
			detailFormatter:function(index, row) {
	    	  var id=pid+"_row_"+index;
	    	  var html='<div id="'+id+'" style="width:100%;">';
	    	  html+=window.global.getLoadHtml();
	    	  html+='</div>';
	    	  return html;
			},
			columns: [{
				field: 'generateTime',
				title: window.lc.getValue("createTime"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){					
					return window.format.timeStaticFormat(value);
	        	},
	        	cellStyle:function(value,row,index){
	        		return {
	    			    css: {"min-width": "90px"}
	    			};
	        	}
			},{
				field: 'ipAddr',
				title: window.lc.getValue("peerIp"),
				align: 'center',
				valign: 'middle'
//			},{
//				field: 'realAddr',
//				title: window.lc.getValue("realAddr"),
//				align: 'center',
//				valign: 'middle',
//			    formatter:function(value,row,index){
//					if(!value){
//						return "-";
//					}
//					var ret="";
//					if(value){
//						ret+=value;
//					}
//					if(row.isp){
//						ret+="("+row.isp+")";
//					}
//					return ret;
//	        	}
			},{
				field: 'userName',
				title: window.lc.getValue("user"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					var ret=value+'&nbsp;<font color=gray>&lt;';
					if(row.roleName){
						ret+=row.roleName;
					}else{
						ret+="-";
					}
					ret+="&gt;</font>";
					return ret;
	        	}
			},{
				field: 'operate',
				title: window.lc.getValue("operate"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){					
					return window.lc.getValue("operateType",value);
	        	}
			},{
				field: 'objectType',
				title: window.lc.getValue("objectType"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){					
					return window.lc.getObjectType(value);
	        	}
//			},{
//				field: 'objectName',
//				title: window.lc.getValue("objectName"),
//				align: 'center',
//				valign: 'middle',
//			    formatter:function(value,row,index){					
//					if(!value){
//						return "-";
//					}
//					return value;
//	        	}
			}]
		});
		
		$('#'+id).on('expand-row.bs.table', function (e, index, row, detail) {			
	    	$.ajax({ 
				url: "logManager!getLog.action",
				data:{uuid:row.uuid},
				type:"POST",
				timeout:15 * 1000,
				complete: function(data,str){
					var log=data.responseJSON.lg;
					showRow(pid,row,index,log);
			}});
		})
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}
	function showRow(pid,row,index,obj){
		if(!obj){
			return;
		}
		console.log(obj);
    	var rid=pid+"_row_"+index;
    	var node=$("#"+rid);
	    var tempFn = window.dot.template(rowTpl);
	    var lan={realAddr:window.lc.getValue("realAddr")
	    		,searchDetail:window.lc.getValue("searchDetail")
	    		,isp:window.lc.getValue("isp"),userDomain:window.lc.getValue("userDomain")
	    		,objectDomain:window.lc.getValue("objectDomain"),objectName:window.lc.getValue("objectName")};
	    var value={outIp:obj.outIp?obj.outIp:"-"
	    		,realAddr:obj.realAddr?obj.realAddr:"-"
	    		,isp:obj.isp?obj.isp:'-'
	    		,userDomain:obj.domainName?obj.domainName:"-"
	    		,objectDomain:obj.dstDomainName?obj.dstDomainName:'-'
	    			,objectName:obj.objectName?obj.objectName:"-",sql:obj.execSql?obj.execSql:"-"};
	    var html=tempFn({showSql:true,lan:lan,value:value});
	    node.html(html);
	}
    return {
    	createList:createList,
    	createView:createView
    };
});


