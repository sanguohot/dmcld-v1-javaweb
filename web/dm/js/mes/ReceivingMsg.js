define(["msg-fun",'text!html/DateTimeRow.html','text!html/mes/recivied.html','theme-macarons'],function(msgFun,datetime,recivied){
	function createView(pid){
	
		var view=function (e, value, row, index) {
		     
	        msgFun.creatRecHtml(row,"mes_received");
	        //单点击后把未读的标记为已读的
	        if(row.cancelStatus!=1&&row.readStatus!=1){
	        var params={};
	        params['time']=row.time;
	        params['msgUuid']=row.msgUuid;
	        params["domainUuid"]=window.user.domainUuid;
	        $.ajax({
	        	url:'msgManager!recUnreadToRead.action',
       		method:'POST',
       		data:params,
       		complete: function(data,str){
				//window.list.delRefresh(id,rows);
				
				if(data.responseJSON && data.responseJSON.success){	
					console.log("success");
					//window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				}else{
					//window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
				}
		}
	        	
	        	
	        });
	        
	        
	        }else if (row.cancelStatus==0&&row.readStatus==1){
	        	 var params={};
	 	        params['time']=row.time;
	 	        params['msgUuid']=row.msgUuid;
	 	        params["domainUuid"]=window.user.domainUuid;
	 	        $.ajax({
	 	        	url:'msgManager!recUnreadToRead.action',
	        		method:'POST',
	        		data:params,
	        		complete: function(data,str){
	 				//window.list.delRefresh(id,rows);
	 				
	 				if(data.responseJSON && data.responseJSON.success){	
	 					console.log("success");
	 					//window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
	 				}else{
	 					//window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
	 				}
	 		}
	 	        	
	 	        	
	 	        });
	        	
	        }
	      
   };
   var del=function (e, value, row, index) {
	   
		 var cb=function(){
			 msgFun.delRecMsg([row],id);
			 
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
   }
window.operateEvents2 = {
        'click a[action=view]':view,
        'click a[action=del]':del,
       
    };
   

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
		   // pn.html(html);
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
//				pickerPosition:'bottom-left',
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
						var msgList=res.messageList[i].roleId;
						msgList=window.global.oneNumToRole(parseInt(msgList));
						srcRoleId=window.global.oneNumToRole(parseInt(res.messageList[i].srcRoleId));
						res.messageList[i].roleId=msgList;
						res.messageList[i].srcRoleId=srcRoleId;
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
					params["nodeType"]="receivedmsg";
					params["readStatus"]=0;
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
				pageSize: 20,
//				pageNumber:1,
				sidePagination: "server",
				pageList: [20,50,100],
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
				
				/* rowStyle: function (row, index) {
	                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
	                var strclass = "";
	                if (row.readStatus==1&&row.cancelStatus==1) {
	                   strclass = 'info'; //还有一个active
	                }else if(row.readStatus==1&&row.cancelStatus==2){
	                	 strclass = 'info';
	                } else if(row.readStatus==1) {
	                 strclass = 'danger';
	                }else{
	                    return {};
	                }
	                return { classes: strclass }
	            },*/
				columns: [{
			        field: 'state',
			        checkbox: true,
			        cardVisible:false
			        
			      },
		        	{
					field: 'roleId',
					title: window.lc.getValue("addresser"),
					  formatter: function (value, row) {
		                  return row.srcUserName+' &lt<font color=gray>'+row.srcRoleId+'&gt</font>';
		              },
					align: 'center',
					valign: 'middle'
				     
				},{
					field: 'theme',
					title: window.lc.getValue("theme"),
					formatter: function (value, row) {
				    	   if(row.theme.length>20){
			                  return [row.theme.substr(0,20)+"...."];
				    	   }else {
				    		   return [row.theme.substr(0,20)];
				    	   }
			              },
				   align: 'center',
				   valign: 'middle',
					
					
				},{
					field: 'time',
					title: window.lc.getValue("time"),
					align: 'center',
					valign: 'middle',
					formatter:function(value,row,index){
					return window.format.timeStaticFormat(value);
	        	},
					
				},{
					field: 'stateDescription',
					title: window.lc.getValue("stateDescription"),
					formatter: function (value, row) {
					 if (row.readStatus==1&&row.cancelStatus==1) {
						 return ['<font class="text-primary">'+window.lc.getValue("cancelMail")+'</font>']; //还有一个active
		                }else if(row.readStatus==1&&row.cancelStatus==2){
		                	 return ['<font class="text-primary">'+window.lc.getValue("cancelMail")+'</font>'];
		                }else if(row.readStatus==2&&row.cancelStatus==2){
		                	return ['<font class="text-primary">'+window.lc.getValue("cancelMail")+'</font>'];
		                } else if(row.readStatus==1) {
		                	 return ['<font class="text-danger">'+window.lc.getValue("unread")+'</font>']
		                	         }else{
		                   
		                
	                    return ['<font color=blue>'+window.lc.getValue("read")+'</font>'];
	                }
					 },
					align: 'center',
					valign: 'middle',
					cellStyle:function(value,row,index){
					 var strclass = "";
		                if (row.readStatus==1&&row.cancelStatus==1) {
		                   strclass = 'info'; //还有一个active
		                }else if(row.readStatus==1&&row.cancelStatus==2){
		                	 strclass = 'info';
		                } else if(row.readStatus==1) {
		                 strclass = 'danger';
		                }else{
		                    return {};
		                }
		                return { classes: strclass }
			  	}
					
					
				},{
					field:'',
					title:window.lc.getValue("detailedInformation"),
					align:'center',
					valign:'middle',
					clickToSelect: true,
			        visible:true,
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
						//tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
						html+=tmp;
		           
		          
			    	  return html;
		          },
				 events:operateEvents2
				}]
			 
				
			}); 
		
			$('#'+id).on('post-body.bs.table', function () {
				$('#'+id+' [data-rel=tooltip]').tooltip();
				
			})
		
	
		 $("#mes_received button[name=refresh]").addClass("btn-info btn-sm");
		 $("#mes_received button[name=toggle]").addClass("btn-info btn-sm");
		 $("#mes_received button[data-toggle=dropdown]").addClass("btn-info btn-sm");
		  function re(){
			  $("#mes_received button[name=refresh]").click();
		  }
		  window.setInterval(re,100000);
		
		//删除发送的
		$("#mes_received-list-del").click(function(){
			//alert("dd");
			// var rows1=$('#'+id).bootstrapTable('getOptions');
			 var rows=$('#'+id).bootstrapTable('getSelections');
			 if(rows.length==0){
					window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
					return;
				}
			 var cb=function(){
				 msgFun.delRecMsg(rows,id);
				 
		    	}
		    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
		    	
		});
			
		}
		
		
		return{
			createView:createView,
			createList:createList,
			
		}
});