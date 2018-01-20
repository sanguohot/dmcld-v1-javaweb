define(["bootstrap-table","form-field","dev-fun","alarm-fun","text!html/DateTimeRow.html"
        ,"text!html/SearchRow.html","alarm-column","alarm-win","pri-pri"]
        ,function (bt,field,dfun,afun,datetime,searchRow,column,win,pri){
	function createColEvents(pid,id){
	    var view=function (e, value, row, index) {
	    	  if(row.neUuid && row.domainUuid){
			      var params={neUuid:row.neUuid,dstDomainUuid:row.domainUuid};
			      require(["dev-panel"], function (panel){
			        panel.loadRemoteData(pid,pid+"_form",params);
			      });
	    	  }else{
	    		  window.tip.show_pk("info",null,window.lc.getValue("notDevAlarm"));
	    	  }
	    };
	    var confirm=function (e, value, row, index) {	    	
			if(pri.procPrivilegeOper()){
			   	   return;
			}else{
				afun.confirm(pid,id,[row]);
			}
	    };
	    var remote=function (e, value, row, index) {
	    	dfun.doRemoteWeb(row.neSn,row.neUuid,row.domainUuid);
	    };
	    var all=function (e, value, row, index) {
	    	win.createView(row.neUuid,column,row);
	    };
	    window.operateEvents = {
	        'click a[action=view]':view,
	        'click a[action=confirm]':confirm,
	        'click a[action=remote]':remote,
	        'click a[action=all]':all,
	    };
	}  
	function getQueryParams(p,pid,did,isExport){
		  var t=did.substring(did.lastIndexOf("_")+1);
		  var params="";
		  	if(!isExport)
			params+="type="+t;
			params+="&dstDomainUuid="+window.global.getDomainUuid();
			var str=window.global.getCheckboxParams(pid,"alarmLevelList");
			if(str){
				params+=str;
			}
			var str=window.global.getCheckboxParams(pid,"devTypeList");
			if(str){
				params+=str;
			}
			var str=window.global.getCheckboxParams(pid,"devStatusList");
			if(str){
				params+=str;
			}
			
			var fromTime=$("#"+pid+" input[name=fromTime]").val();
			var toTime=$("#"+pid+" input[name=toTime]").val();
			if(fromTime){
				params+="&fromTime="+window.format.browseToUtc(fromTime);
			}
			if(toTime){
				params+="&toTime="+window.format.browseToUtc(toTime);
			}
			if(p){
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				if(p.search){
					params+="&search="+p.search;
				}
			}
			params+="&sip="+$("#"+pid+"_search_input").val();
			return params;
	  }
	function createAlarmList(pid,did){
		var cid=pid+"_list";
		createColEvents(pid,cid);
		var t=did.substring(did.lastIndexOf("_")+1);
		var url="androidManager!getDevAlarm2.action";
		if(t!="dev"){
			url="androidManager!getOtherAlarmList.action";
		}
		
		$('#'+cid).bootstrapTable({
			method: 'get',
			url: url,
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				var obj={};
				if(res && res.total){					
					obj["rows"]=res.alarmList;
					obj.total=res["total"];				
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				return getQueryParams(p,pid,did);
			},
			striped: true,
			toolbar:"#"+cid+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
		    search: true,
		    searchOnEnterKey:true,
			showColumns: true,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: column.getColumn(true,true)
		});
		$("#"+pid+" button[name=confirm]").bind('click',function(){
	    	if(pri.procPrivilegeOper()){
		   		return;
		   	 }else{
				var rows=$('#'+cid).bootstrapTable("getSelections");
				afun.confirm(pid,cid,rows);
	   	     }
		});
	    $('#'+cid).on('post-body.bs.table', function () {
	    	window.list.changeForAce(pid,cid,600);
	    	$('#'+cid+' [data-rel=tooltip]').tooltip();
	    })
		$(window).resize(function () {
			window.list.changeView(pid,cid,600);
		});
	}
	
	function createAll(pid,did){
		var lid=pid+"_list";
		var fid=pid+"_form";
		var html=getHtml(pid,did);
		var pn=$("#"+pid);
		pn.html("");
		pn.append(html);

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
		createAlarmList(pid,did);
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
		$("#"+fid+" button[name=back]").bind("click",function(){
			 require(["alarm-calc"], function (alarm) {
			        alarm.loadRemoteData(pid);
			 });
		});
		$('#demo').parent().find('input[type=checkbox]').bind("click",function(){
			toFirst(pid);
		});
		var t=did.substring(did.lastIndexOf("_")+1);
		$("#"+pid+" button[name=export]").bind('click',function(){
			var rows=$('#'+lid).bootstrapTable("getData");
			if(!rows || rows.length==0){
				window.tip.show_pk("info",null,window.lc.getValue("noRecords"));
				return;
			}
			var params=getQueryParams(null,pid,did,true);
			params+="&exportType="+t;
			var url="exportConfig!exportAlarmDev.action";
			if(t!="dev"){
				url="exportConfig!exportAlarmOther.action";
			}
			window.tip.show_pk("info",10,window.lc.getValue("exportingWait"),true);
			$.ajax({ 
				url: url,
				data:params,
				complete: function(data,str){
				window.tip.close_pk();
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
					window.location.href="download/"+data.responseJSON["fileName"];
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
				}
			}});	
	    });
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
	}
	function toFirst(pid){
		var id=pid+"_list";
		$('#'+id).bootstrapTable("selectPage",1);
	}
	function changeType(type){
		if(type=="dev"){
			$('#demo').collapse('show')
		}else{
			$('#demo').collapse('hide')
		}
	}
	function getHtml(pid,did){
		var lid=pid+"_list";
		var fid=pid+"_form";
	    var searchRowFn = window.dot.template(searchRow);
	    var searchRowField=searchRowFn({pid:pid,lan:{placeholder:window.lc.getValue("sipAccount")}});
	    var lan={fromTime:window.lc.getValue("fromTime")
	    		,toTime:window.lc.getValue("toTime")
	    		,today:window.lc.getValue("today")
	    		,last3Day:window.lc.getValue("last3Day")
	    		,last7Day:window.lc.getValue("last7Day")
	    		,lastMonth:window.lc.getValue("lastMonth")};
	    var tempFn = window.dot.template(datetime);
	    var datetimeh=tempFn({lan:lan});
		var html='<form id="'+fid+'" role="form">'		
		+'<div class="container-fluid my-tab" >'
		+'<div class="row ">'
			+'<div class="col-md-12">'
			 +'<div class="btn-group">'
				+'<button name="back" type="button" class="btn btn-info btn-sm" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
//				+'<button type="button" name="refresh" class="btn btn-success btn-width">刷新</button>'
				+'<button name="export" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("expt")+'"><i class="fa fa-cloud-download bigger-130"></i>'+window.lc.getValue("expt")+'</button>'
			+'</div>'
			+'</div>'
		+'</div>'
		+'</div>'
		+'<div class="container-fluid my-tab" >'		
		+'<div class="row"><div class="col-md-12"><h4 ><label>'+window.lc.getValue("filter")+'</label></h4></div></div>'
		+(did.indexOf("dev")>=0?searchRowField:"")
		+datetimeh
		+'<div class="row">'
		+'<div class="col-md-12">';
//		html+=field.getRadioField("type","dev","告警分类",[{value:"dev",text:"设备告警"},{value:"server",text:"服务告警"},{value:"call",text:"话务告警"},{value:"service",text:"服务告警"}]);
		if(did.indexOf("dev")>=0){
			html+='<div id="demo" class="collapse in" aria-expanded="true" style="height: auto;">';
			html+=field.getCheckboxField("devTypeList","",window.lc.getValue("devType"),[{value:"dag",text:"DAG"},{value:"mtg",text:"MTG"}]);
			html+=field.getCheckboxField("devStatusList","",window.lc.getValue("devStatus"),[{value:"active",text:window.lc.getValue("active")}
			,{value:"busy",text:window.lc.getValue("busy")}
			,{value:"idle",text:window.lc.getValue("idle")}
			,{value:"init",text:window.lc.getValue("init")},{value:"commFail",text:window.lc.getValue("commFail")}
			,{value:"disable",text:window.lc.getValue("disable")}]);
				html+='</div>';
		}
			html+=field.getCheckboxField("alarmLevelList","",window.lc.getValue("alarmLevel"),[{value:"0",text:window.lc.getValue("alarmLevel",0)}
			,{value:"1",text:window.lc.getValue("alarmLevel",1)},{value:"2",text:window.lc.getValue("alarmLevel",2)}
			,{value:"3",text:window.lc.getValue("alarmLevel",3)},{value:"4",text:window.lc.getValue("alarmLevel",4)}
				,{value:"6",text:window.lc.getValue("alarmLevel",6)}
			]);
			html+='</div>';
		html+='</div>'		
		+'</div>'
		+'<div class="container-fluid my-tab" >'
		+'<div class="row ">'
			+'<div class="col-md-12">'
			+'<div id="'+lid+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
			+'<button name="confirm" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("confirm")+'"><i class="fa fa-check bigger-130"></i>'+window.lc.getValue("confirm")+'</button>'
			+'</div>'
				+'<table id="'+lid+'"></table>'
			+'</div>'
		+'</div>'
		+'</div>'
		+'</form>';
		return html;
	}
    return {
        createAlarmList:createAlarmList,
        createAll:createAll
    };
});


