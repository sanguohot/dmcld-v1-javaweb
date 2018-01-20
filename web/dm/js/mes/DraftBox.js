define(["msg-fun",'text!html/DateTimeRow.html','text!html/mes/recivied.html',"bootstrap-table"],function (msgFun,datetime,recivied){
	var view=function (e, value, row, index) {
	     
		//window.global.procTab();
		msgFun.creatDraftHtml(row,"mes_draft");
		
      
};
var del=function (e, value, row, index) {
    
	 var cb=function(){
		 msgFun.delDraftMsg([row],id);
    	}
    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
	
  
};
window.operateEvents3 = {
    'click a[action=view]':view,
    'click a[action=del]':del,
   
};
	function createView(pid){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var datetimeFn = window.dot.template(datetime);
		 var datetimeField=datetimeFn({lan:{fromTime:window.lc.getValue("fromTime")
		    	    ,toTime:window.lc.getValue("toTime")
		    		,today:window.lc.getValue("today")
		    		,last3Day:window.lc.getValue("last3Day")
		    		,last7Day:window.lc.getValue("last7Day")
		    		,lastMonth:window.lc.getValue("lastMonth")}});
	     var tempFn = window.dot.template(recivied);
		 var html=tempFn({datetimeField:datetimeField});
		id=pid+'-list';
		
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		//html+='<button id="'+id+'-clear" type="submit" class="btn btn-sm btn-info" title="'+window.lc.getValue("cleanCdr")+'"><i class="fa fa-external-link"></i>'+window.lc.getValue("cleanCdr")+'</button>';
		
		html+='<button id="'+id+'-del" name="export" type="button" class="btn btn-sm btn-danger btn-info" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i>'+window.lc.getValue("del")+'</button>';
		html+='</div>';
		html+='<table id='+id+'></table>';
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
	    $('#operate-sel').chosen({width:'85%',allow_single_deselect:true});
	    $('#object-type-sel').chosen({width:'85%',allow_single_deselect:true});
	    createList(pid);
	    listen(pid);
	};
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
	 var id=pid+"-list";
      $('#'+id).bootstrapTable("selectPage",1);
		}
	 function createList(pid){
		 id=pid+'-list';
		 $('#'+id).bootstrapTable({
				method: 'get',
				url: "msgManager!getMsgList.action",
				cache: false,
//				height: 500,
				responseHandler:function(res){
				var obj={};
				
				if(res && res.messageList){	
					for(var i=0;i<res.messageList.length;i++){
						var m='';
						m=window.global.getNumToRole(res.messageList[i].sendToRole);
						res.messageList[i].sendToRole=m;
					}
					
					
					obj["rows"]=res.messageList;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
				queryParams:function(p){
				
					var params={};
		            window.global.getTreePara(params);
					params["limit"]=p.limit;
					params["start"]=p.offset;
					params["nodeType"]="draftmsg";
					 params["domainUuid"]=window.user.domainUuid;
					 params['userUuid']=window.user.uuid;
					 var fromTime=$("#"+pid+" input[name=fromTime]").val();
					 var toTime=$("#"+pid+" input[name=toTime]").val();
					 if(fromTime){
							console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
							params['fromTime']=window.format.browseToUtc(fromTime);
						}
						if(toTime){
							console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
							params['toTime']=window.format.browseToUtc(toTime);
						}
					if(p.search){
					params["fuzzySearch"]=p.search;
					}
					return params;
				},
				striped: true,
				toolbar:"#"+id+"-toolbar",
				pagination: true,
				pageSize: 10,
//				pageNumber:1,
				sidePagination: "server",
				pageList: [10,25,50,100],
				search: true,
				showColumns: true,
				sortable: false,
				showRefresh: true,
				queryParamsType:'limit',
				sidePagination: "server",
				showToggle:true,
				smartDisplay:true,
				minimumCountColumns: 2,
				clickToSelect: true,
				columns: [{
			        field: 'state',
			        checkbox: true,
			        cardVisible:false
			        
			      },
		        	{
					field: 'sendToRole',
					title: window.lc.getValue("sendToRole"),
					align: 'center',
					valign: 'middle',
				   formatter: function (value, row) {
			    	   if(row.sendToRole.length>20){
		                  return [row.sendToRole.substr(0,20)+"...."];
			    	   }else {
			    		   return [row.sendToRole.substr(0,20)];
			    	   }
		              },
				},{
					field: 'theme',
					title: window.lc.getValue("theme"),
					align: 'center',
					valign: 'middle',
				    formatter: function (value, row) {
			    	   if(row.theme.length>20){
		                  return [row.theme.substr(0,20)+"...."];
			    	   }else {
			    		   return [row.theme.substr(0,20)];
			    	   }
		              },
				},{
					field: 'time',
					title: window.lc.getValue("time"),
					align: 'center',
					valign: 'middle',
					formatter:function(value,row,index){
					return window.format.timeStaticFormat(value);
	        	
					
				}
				},{
					field:'',
					title:window.lc.getValue("detailedInformation"),
					align:'center',
					valign:'middle',
					 formatter:function(value,row,index){
					var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
						var view='<a action="view" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("view")+'">'
							+'<i class="fa fa-search-plus bigger-130"></i>'
							+'</a>';
					   var del='<a action="del"  class="red tooltip-error"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
				       +'<i class="fa fa-remove bigger-130"></i>'
				       +'</a>';
						html+=view+del;
						html+='</div>';
						var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
							  +'<div class="inline position-relative">'
							    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
							      +'<i class="fa fa-cog icon-only bigger-110"></i>'
							    +'</button>'
							    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
							      +'<li>'+view+'</li>'
							      +'<li>'+del+'</li>'

							    tmp+='</ul>'
							  +'</div>'
							+'</div>';
						tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
						html+=tmp;
		            //当批量配置模板引用时，隐藏设备操作按钮
		          
			    	  return html;
		          },
				 events:operateEvents3
				}
				]
			});
		 $('#'+id).on('post-body.bs.table', function () {
		    	$('#'+id+' [data-rel=tooltip]').tooltip();
		    	window.list.changeForAce(pid);
		    })
			$(window).resize(function () {
				window.list.changeView(pid,id,600);
			});
		    window.list.changeView(pid,id,600);
		    
			 $("#mes_draft button[name=refresh]").addClass("btn-info btn-sm");
			 $("#mes_draft button[name=toggle]").addClass("btn-info btn-sm");
			 $("#mes_draft button[data-toggle=dropdown]").addClass("btn-info btn-sm");
			$("#"+id+"-del").click(function(){
				//alert(id);
				 var rows=$('#'+id).bootstrapTable('getSelections');
				 if(rows.length==0){
						window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
						return;
					}
				 var cb=function(){
					 msgFun.delDraftMsg(rows,id);
			    	}
			    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
			});
		 
	 }
	return {
		createView:createView,
		createList:createList
	}
});