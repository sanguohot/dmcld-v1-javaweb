define(['write-msg','text!html/mes/selece2.html'],function (writeMsg,select){
	
	function delSendMsg(rows,id){
		if(rows.length>0){
		  for (var i=0;i<rows.length;i++){
			 if(i==0){
				 var ids=rows[i]["msgUuid"];
			 }else{
				 ids=ids+","+rows[i]["msgUuid"];
			 }
		  }
		}else {
			ids=rows.msgUuid;
		}
		$.ajax({
			url:'msgManager!delMsg.action',
			method:'POST',
			data:{nodeType:"sentmsg",selAll:0,absolutely:false,ids:ids
				,readIds:"",unreadIds:"",domainUuid:window.user.domainUuid,userUuid:window.user.uuid},
			complete: function(data,str){
			window.list.delRefresh(id,rows);
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
	}
		});
		
	}
	function delRecMsg(rows,id){
		
		var readIds='';
		var unreadIds='';
		if(rows.length>0){
		for (var i=0;i<rows.length;i++){
			if(rows[i].readStatus==2){
				var readIds=readIds+rows[i]["msgUuid"]+',';
		       }else if(rows[i].readStatus==1){
				unreadIds=unreadIds+rows[i]["msgUuid"]+",";
		
		     }
		 }
		readIds=readIds.substr(0,readIds.lastIndexOf(','));
		unreadIds=unreadIds.substr(0,unreadIds.lastIndexOf(','));
		}else {
			if(rows.readStatus==2){
				var readIds=readIds+rows.msgUuid;
		       }else if(rows.readStatus==1){
				unreadIds=unreadIds+rows.msgUuid;
		
		     }
		}
		$.ajax({
			url:'msgManager!delMsg.action',
			method:'POST',
			data:{nodeType:"receivedmsg",selAll:0,absolutely:false,readIds:readIds,unreadIds:unreadIds,domainUuid:window.user.domainUuid,userUuid:window.user.uuid},
			complete: function(data,str){
			window.list.delRefresh(id,rows);
			$('#myModal button[name=close]').trigger("click");
			
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
	}
		});
		
		
		
	}
function delDraftMsg(rows,id){
		
	  if(rows.length>0){
		for (var i=0;i<rows.length;i++){
			if(i==0){
				var ids=rows[i]["msgUuid"];
			}else{
				 ids=ids+","+rows[i]["msgUuid"];
			}
		}
	  }else {
		  var ids=rows.msgUuid;
	  }
		$.ajax({
			url:'msgManager!delMsg.action',
			method:'POST',
			data:{nodeType:"draftmsg",selAll:0,absolutely:false,ids:ids
				,readIds:"",unreadIds:"",domainUuid:window.user.domainUuid,userUuid:window.user.uuid},
			complete: function(data,str){
			window.list.delRefresh(id,rows);
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
	}
		});
		
	}
	function creatMsgHtml(row,pid){
		
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		 
		if(row.sendToRole.length>50){
			var sendToRole=row.sendToRole.substring(0,50)+'</br>'+row.sendToRole.substring(50,row.sendToRole.length)
		}else{
			var sendToRole=row.sendToRole;
		}
		
		id=pid+'-information';
		var html='';
		html+='<div id="'+id+'-toolbar"  class="btn-group my-btn-group" role="group" aria-label="...">';
		html+='<button id="'+id+'-back" style="margin: 10px 1px 0 0" name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
		html+='<button style="margin: 10px 1px 0 0" id="'+id+'-writeAgain" type="submit" class="btn btn-sm btn-info" title="'+window.lc.getValue("writeAgain")+'"><i class="fa fa-pencil"></i>'+window.lc.getValue("writeAgain")+'</button>';
		html+='</div>';
		html+='<div class="msgbody">';
		html+='<div style="margin-left: 18px;font-size: 16px; color:#6D5151;font-family: initial;"><ui class="list-unstyled ">';
		//html+='<li >'+window.lc.getValue("theme")+':'+'<input  id="theme"  value="" rows="1" ></input></li>';
	    html+='<li>'+window.lc.getValue("addresser")+':'+'<span>'+window.global.oneNumToRole(row.roleId)+'</span></li>';
		html+='<li>'+window.lc.getValue("time")+':'+'<span>'+window.format.timeStaticFormat(row.time)+'</span></li>';
		html+='<li>'+window.lc.getValue("sendToRole")+':'+'<span>'+sendToRole+'</span></li>';
		html+='<li style="margin-bottom:1%">'+window.lc.getValue("theme")+':'+'<input  id="theme1" style="width:100.1%" value="" rows="1" ></input></li>';
		html+='</ui></div>';
		html+='<div class="col-md-12">';
		html+='<textarea id="textarea" class="form-control" rows="30" placeholder="请输入文本" style="width:101.7%">'+row.content+'</textarea>';
		html+='</div>';
		html+='</div>'
		pn.html("");
		
		pn.append(html);
		  $('#theme1').val(row.theme);
		$("#"+id+'-back').bind('click',function(){
			require(["send-msg"], function (send) {
	    		send.createView(pid);
	    	});
	      });
		$("#"+id+'-writeAgain').bind('click',function(){
			creatSendToWrite(row,pid);
				
	      });
		
		
	}
	
	function creatSendToWrite(row,pid){
		var saveParams={};
		 pn=$("#"+pid);
		    if(!pn){
		      return;
		    }
		    pn.html("");
		    id=pid+"-write"
		   var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		   html+='<button id="'+id+'-back" style="margin: 10px 1px 0 0" name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
		   html+='<button id="'+id+'-send" type="submit" class="btn btn-sm btn-success" style="margin: 10px 1px 0 0" title="'+window.lc.getValue("send")+'"><i class="fa fa-send"></i>'+window.lc.getValue("send")+'</button>';
	       html+='<button style="margin: 10px 1px 0 0" id="'+id+'-save" type="submit" class="btn btn-sm btn-success" title="'+window.lc.getValue("save")+'"><i class="fa fa-saved"></i>'+window.lc.getValue("save")+'</button>';
	       html+='</div>'
	    	   
		   /*html+='<from class="form-horizontal" role="from">';
		   html+='<div class="from-group">';
		   html+='<label for="firstname" class="col-md-2 control-label text-right">收件人</label>';
		   html+='<div class="col-md-10 " style="margin-left: -21px">';
		   html+='<div class="widget-main" style="width: 798px;left: -21px;">';
		   html+='<select multiple="" style="width: 798px;margin-left: -21px;" class=" chosen-select form-control " id="form-field-select-4" >';
		   html+='<option value="1">super_admin</option>';
		   html+='<option value="2">super_user</option>';
		   html+='<option value="3">super_viewer</option>';
		   html+='<option value="4">super_finance</option>';
		   html+='<option value="5">domain_admin</option>';
		   html+='<option value="6">domain_editor</option>';
		   html+='<option value="7">domain_viewer</option>';
		   html+='<option value="8">domain_operator</option>';
		   html+='<option value="9">domain_user01</option>';
		   html+='<option value="10">domain_user02</option>';
		   html+='<option value="11">domain_user03</option>';
		   html+='</select>';
		   html+='</div>';
		   html+='</div>';
		   html+='</div>';
		   html+='<div class="form-group">';
		   html+=' <label for="lastname" class="col-md-2 control-label text-right">主题</label>';
		   html+=' <div class="col-md-10">';
		   html+=' <textarea id="theme" class="form-control" rows="1" placeholder="请输入主题">'+row.theme+'</textarea>';
		   html+=' </div>';
		   html+='</div>';
		   html+='<div class="form-group">';
		   html+='<label for="name" class="col-md-2 control-label text-right">文本框</label>';
		   html+='<div class="col-md-10">';
		   html+='<textarea name="textarea" class="form-control" rows="20" placeholder="请输入文本">'+row.content+'</textarea>';
		   html+='</div>';
		   html+='</div>';
		   html+='</form>';*/
	       var selectFn = window.dot.template(select);
	       var selectFile=selectFn({lan:{sendToRole:window.lc.getValue("sendToRole"),
                             theme:window.lc.getValue("theme"),
                              content:window.lc.getValue("contentText"),
                              theme1:row.theme,
                              content1:row.content,
                              id:'form-field-select-3',
                              chooseRole:window.lc.getValue("chooseRole")}})
	       html+=selectFile;
		   pn.append(html);
		 var sendToRole=  window.global.getRoleToNum(row);
		   for(var i=0;i<sendToRole.length;i++){
		   $("#form-field-select-3 option[value='"+sendToRole[i]+"']").attr("selected","selected"); 
		   }
		   
		   $(".chosen-select").chosen();
		   $(".chosen-select").chosen({width: "95%"}); 
		   //$("#form-field-select-4").val(row.sendToRole).trigger("chosen:updated");
		   
		   
		   
		   //返回发件箱的具体某个信息的详细页面
		   $("#"+id+'-back').bind('click',function(){
		   		creatMsgHtml(row,pid);
			      });
		   //点击发送
		   $("#"+id+"-send").click(function () { 
		    	 var params={};
		    	 var sendToRole='';
		    	  $(".chosen-select").chosen();
		    	 var roleIdList= $("#form-field-select-3").val();
		    	 
	           var theme=$("#theme").val();
	           var content=$("textarea[name=textarea] ").val();
	           
	            if(!roleIdList){
	            	window.tip.show_pk("warning",null,window.lc.getValue("youNotChoiseRole"));
	            	return;
	            }
	            if(!theme){
	            	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteTheme"));
	            	return;
	            }
	            if(!content){
	            	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteContent"));
	            	return;
	            }
	            if(theme.length>126){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongTheme"));
	            	return;
	            }
	            if(content.length>4094){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongContent"));
	            	return;
	            }
	           for(var i=0;i<roleIdList.length;i++){
	        	   if(i==roleIdList.length-1){
	        		   var sendToRole=sendToRole+roleIdList[i];
	        	   }else{
	        		   sendToRole=sendToRole+roleIdList[i]+',';
	        	   }
	        	   
	           }
	        params.sendToRole=sendToRole;
	   	    params.theme=theme;
	   	    params.content=content;
	   	    params.roleIdList=roleIdList;
	   	    params.msgUuid=0;
	   	    params.domainUuid=window.user.domainUuid;
	   	    //调用写信息页面的发送ajax
	   	    var Params={};
			if(saveParams.msgUuid)
			{
				Params=saveParams;
				
			}else{
				Params=params
			}
				$.ajax({
					url:'msgManager!sendMsg.action',
				    type:'POST',
				    data:Params,
				    complete:function(data){	
					if(data.responseJSON && data.responseJSON.success){	
						params.msgUuid=data.responseJSON.retValue;
						 
	                	}else{
	                		window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
	                    	return;
	                	}
				  if(data.responseJSON.retValue){
					  window.tip.show_pk("success",null,window.lc.getValue("sendSuccess"));
					  window.modal.creatMes(window.lc.getValue("yourMessageIsSent"),window.lc.getValue("thisMessageIsSentSuccessfullyAndIsSavedToTheSentMessage")); 
					
				  }	
				  
				  
				    $('#another-message').bind("click",function(){
				    	  //在写一封
				    	
				    	/*$('#form-field-select-4').val('').trigger('liszt:updated');
				    	 //$(".chosen-select").chosen();
				    	$('#theme').val('');
				    	$("textarea[name=textarea] ").val('');*/
				    	  window.global.procTab();
				    });
				    
				    
				    $('#view-message').bind("click",function(){
						//跳转到发件箱
					  $('#myModal button[class=close]').trigger("click");
					  //$('#myTab a[href=#mes_send]').tab("show");
					  require(["send-msg"], function (send) {
				    		send.createView(pid);
				    	});
					 
					  
				    });
				}
			});	
	   	   
	   	   
	       }); 
		    $("#"+id+"-save").click(function () { 
		    	
		    	 var sendToRole='';
		    	 
		    	 var roleIdList= $("#form-field-select-3").val();
	          var theme=$("#theme").val();
	          var content=$("textarea[name=textarea] ").val();
	           if(!roleIdList){
	           	window.tip.show_pk("warning",null,window.lc.getValue("youNotChoiseRole"));
	           	return;
	           }
	           if(!theme){
	           	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteTheme"));
	           	return;
	           }
	           if(theme.length>126){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongTheme"));
	            	return;
	            }
	            if(content.length>4094){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongContent"));
	            	return;
	            }
	          for(var i=0;i<roleIdList.length;i++){
	       	   if(i==roleIdList.length-1){
	       		   var sendToRole=sendToRole+roleIdList[i];
	       	   }else{
	       		   sendToRole=sendToRole+roleIdList[i]+',';
	       	   }
	       	   
	          }
	         
	        saveParams.sendToRole=sendToRole;
	        saveParams.theme=theme;
	        saveParams.content=content;
	        saveParams.roleIdList=roleIdList;
	        saveParams.msgUuid=0;
	        saveParams.domainUuid=window.user.domainUuid;
	        writeMsg.saveMsg(saveParams);
	        $('#myTab a[href=#mes_draft]').tab("show");
	      }); 
	}
	
	function creatRecHtml(row,pid){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		row.sendToRole=window.global.getNumToRole(row.sendToRole)
	
		if(row.sendToRole.length>50){
			row.sendToRole=row.sendToRole.substring(0,50)+'</br>'+row.sendToRole.substring(50,row.sendToRole.length)
		}
		
		id=pid+'-information';
		var html='';
		html+='<div id="'+id+'-toolbar"  class="btn-group my-btn-group" role="group" aria-label="...">';
		html+='<button id="'+id+'-back" style="margin: 10px 1px 0 0" name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
		html+='</div>';
		html+='<div class="msgbody">';
		html+='<div style="margin-left: 18px;font-size: 16px; color:#6D5151;font-family: initial;"><ui class="list-unstyled ">';
	    html+='<li>'+window.lc.getValue("addresser")+':'+'<span>'+row.srcRoleId+'</span></li>';
		//html+='<li>'+window.lc.getValue("theme")+':'+'<span>'+row.theme+'</span></li>';
		html+='<li>'+window.lc.getValue("time")+':'+'<span>'+window.format.timeStaticFormat(row.time)+'</span></li>';
		html+='<li>'+window.lc.getValue("sendToRole")+':'+'<span>'+row.sendToRole+'</span></li>';
		html+='<li style="margin-bottom:1%">'+window.lc.getValue("theme")+':'+'<input  id="theme" style="width:100.1%" value="" rows="1" ></input></li>';
		html+='</ui></div>';
		if(row.cancelStatus==0){
		html+='<div class="col-sm-12">';
		html+='<textarea id="textarea" class="form-control" rows="30" placeholder="请输入文本" style="width:101.7%">'+row.content+'</textarea>';
		html+='</div>';
		}else if(row.cancelStatus==1){
			 if(row.readStatus==2){
				 html+='<div class="col-sm-10">';
					html+='<textarea id="textarea" class="form-control" rows="30" placeholder="请输入文本">'+row.content+'</textarea>';
					html+='</div>';
			 }else if(row.readStatus==1){
				 
				 html+='<div class="col-sm-10">';
					html+='<textarea id="textarea" class="form-control" rows="30" placeholder="请输入文本">'+window.lc.getValue("cancelMail")+'</textarea>';
					html+='</div>';
			 }
		}else if(row.cancelStatus==2){
			html+='<div class="col-sm-10">';
			html+='<textarea id="textarea" class="form-control" rows="30" placeholder="请输入文本">'+window.lc.getValue("cancelMail")+'</textarea>';
			html+='</div>';
		}else if (row.cancelStatus==3){
			html+='<div class="col-sm-10">';
			html+='<textarea id="textarea" class="form-control" rows="30" placeholder="请输入文本">'+row.content+'</textarea>';
			html+='</div>';
		}
		html+='</div>'
		pn.html("");
		
		pn.append(html);
		$('#theme').val(row.theme);
		
		
		
		$("#"+id+'-back').bind('click',function(){
			require(["rec-msg"], function (send) {
	    		send.createView(pid);
	    	});
	      });
	
		
	}
	function creatDraftHtml(row,pid){
		 
		    pn=$("#"+pid);
		    if(!pn){
		      return;
		    }
		    pn.html("");
		    id=pid+"-write"
		   var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		   html+='<button id="'+id+'-back" style="margin: 10px 1px 0 0" name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
		   html+='<button id="'+id+'-send" type="submit" class="btn btn-sm btn-success" style="margin: 10px 1px 0 0" title="'+window.lc.getValue("send")+'"><i class="fa fa-send"></i>'+window.lc.getValue("send")+'</button>';
	       html+='<button style="margin: 10px 1px 0 0" id="'+id+'-save" type="submit" class="btn btn-sm btn-success" title="'+window.lc.getValue("save")+'"><i class="fa fa-saved"></i>'+window.lc.getValue("save")+'</button>';
	       html+='</div>'
		  /* html+='<from class="form-horizontal" role="from">';
		   html+='<div class="from-group">';
		   html+='<label for="firstname" class="col-md-2 control-label text-right">收件人</label>';
		   html+='<div class="col-md-10 " style="margin-left: -21px">';
		   html+='<div class="widget-main" style="width: 798px;left: -21px;">';
		   html+='<select multiple="" style="width: 798px;margin-left: -21px;" class=" chosen-select form-control " id="form-field-select-4" >';
		   html+='<option value="1">super_admin</option>';
		   html+='<option value="2">super_user</option>';
		   html+='<option value="3">super_viewer</option>';
		   html+='<option value="4">super_finance</option>';
		   html+='<option value="5">domain_admin</option>';
		   html+='<option value="6">domain_editor</option>';
		   html+='<option value="7">domain_viewer</option>';
		   html+='<option value="8">domain_operator</option>';
		   html+='<option value="9">domain_user01</option>';
		   html+='<option value="10">domain_user02</option>';
		   html+='<option value="11">domain_user03</option>';
		   html+='</select>';
		   html+='</div>';
		   html+='</div>';
		   html+='</div>';
		   html+='<div class="form-group">';
		   html+=' <label for="lastname" class="col-md-2 control-label text-right">主题</label>';
		   html+=' <div class="col-md-10">';
		   html+=' <textarea id="theme" class="form-control" rows="1" placeholder="请输入主题">'+row.theme+'</textarea>';
		   html+=' </div>';
		   html+='</div>';
		   html+='<div class="form-group">';
		   html+='<label for="name" class="col-md-2 control-label text-right">文本框</label>';
		   html+='<div class="col-md-10">';
		   html+='<textarea name="textarea" class="form-control" rows="20" placeholder="请输入文本">'+row.content+'</textarea>';
		   html+='</div>';
		   html+='</div>';
		   html+='</form>';*/
	       var selectFn = window.dot.template(select);
	       var selectFile=selectFn({lan:{sendToRole:window.lc.getValue("sendToRole"),
                                          theme:window.lc.getValue("theme"),
                                          content:window.lc.getValue("content"),
                                          theme1:row.theme,
                                          content1:row.content,
                                          id:'form-field-select-2',
                                          chooseRole:window.lc.getValue("chooseRole")}})
	       html+=selectFile;
		   pn.append(html);
		   var sendToRole=  window.global.getRoleToNum(row);
	/*	   for(var i=0;i<sendToRole.length;i++){
		   $("#form-field-select-4 option[value='"+sendToRole[i]+"']").attr("selected","selected"); 
		   }*/
		   document.getElementById('textarea2').parentNode.style.marginTop="-2%";
		   
		   $(".chosen-select").val(sendToRole).trigger('chosen:updated');
		   $(".chosen-select").chosen(); 
		   $("#"+id+'-back').bind('click',function(){
			   require(["dr-box"], function (dr) {
		    		dr.createView(pid);
		    	});
			    	
			      });
		  
		   $("#"+id+"-send").click(function () { 
		    	 var params={};
		    	 var sendToRole='';
		    	 
		    	 var  roleIdList= $("#form-field-select-2").val() 
		    	  $(".chosen-select").val(roleIdList).trigger('chosen:updated');
		    	 
	           var theme=$("#theme").val();
	           var content=$("textarea[name=textarea] ").val();
	            if(!roleIdList){
	            	window.tip.show_pk("warning",null,window.lc.getValue("youNotChoiseRole"));
	            	return;
	            }
	            if(!theme){
	            	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteTheme"));
	            	return;
	            }
	            if(!content){
	            	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteContent"));
	            	return;
	            }
	            if(theme.length>126){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongTheme"));
	            	return;
	            }
	            if(content.length>4094){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongContent"));
	            	return;
	            }
	           for(var i=0;i<roleIdList.length;i++){
	        	   if(i==roleIdList.length-1){
	        		   var sendToRole=sendToRole+roleIdList[i];
	        	   }else{
	        		   sendToRole=sendToRole+roleIdList[i]+',';
	        	   }
	        	   
	           }
	        params.sendToRole=sendToRole;
	   	    params.theme=theme;
	   	    params.content=content;
	   	    params.roleIdList=roleIdList;
	   	    params.msgUuid=row.msgUuid;
	   	    params.domainUuid=window.user.domainUuid;
	   	$.ajax({
			url:'msgManager!sendMsg.action',
		    type:'POST',
		    data:params,
		    complete:function(data){	
			if(data.responseJSON && data.responseJSON.success){	
				params.msgUuid=data.responseJSON.retValue;
				 
            	}else{
            		window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
                	return;
            	}
		  if(data.responseJSON.retValue){
			  window.tip.show_pk("success",null,window.lc.getValue("sendSuccess"));
			  window.modal.creatMes(window.lc.getValue('yourMessageIsSent'),window.lc.getValue('thisMessageIsSentSuccessfullyAndIsSavedToTheSentMessage'));  
			
		  }	
		  
		  
		    $('#another-message').bind("click",function(){
		    	  //在写一封
		    	
		    	/*$('#form-field-select-4').val('').trigger('liszt:updated');
		    	 //$(".chosen-select").chosen();
		    	$('#theme').val('');
		    	$("textarea[name=textarea] ").val('');*/
		    	  window.global.procTab();
		    });
		    
		    
		    $('#view-message').bind("click",function(){
				//跳转到发件箱
			  $('#myModal button[class=close]').trigger("click");
			  $('#myTab a[href=#mes_send]').tab("show");
			 
			 
			  
		    });
		}
	});	
	   
	   }); 
		   
		   
		   $("#"+id+"-save").click(function () { 
		    	var params={}
		    	 var sendToRole='';
		    	var roleIdList=$("#form-field-select-2").find("option:selected").val();
		    	 var  roleIdList= $("#form-field-select-2").val();
	          var theme=$("#theme").val();
	          var content=$("textarea[name=textarea] ").val();
	           if(!roleIdList){
	           	window.tip.show_pk("warning",null,window.lc.getValue("youNotChoiseRole"));
	           	return;
	           }
	           if(!theme){
	           	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteTheme"));
	           	return;
	           }
	           if(theme.length>126){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongTheme"));
	            	return;
	            }
	            if(content.length>4094){
	            	window.tip.show_pk("warning",null,window.lc.getValue("tooLongContent"));
	            	return;
	            }
	          for(var i=0;i<roleIdList.length;i++){
	       	   if(i==roleIdList.length-1){
	       		   var sendToRole=sendToRole+roleIdList[i];
	       	   }else{
	       		   sendToRole=sendToRole+roleIdList[i]+',';
	       	   }
	       	   
	          }
	         
	        params.sendToRole=sendToRole;
	        params.theme=theme;
	        params.content=content;
	        params.roleIdList=roleIdList;
	        params.msgUuid=row.msgUuid;
	        params.domainUuid=window.user.domainUuid;
	        $.ajax({
				url:'msgManager!saveMsg.action',
			    type:'POST',
			    data:params,
			    complete:function(data){	
				if(data.responseJSON && data.responseJSON.success){	
					
					 window.tip.show_pk("success",null,window.lc.getValue("saveSuccess"));
					 require(["dr-box"], function (dr) {
				    		dr.createView(pid);
				    	});
                	}else{
                		window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
                    	return;
                	}
			 
			 }
	      
		   });	
	       
	     });  
		   
	         
	    	
		
	}
	
	return{
		delSendMsg:delSendMsg,
		creatMsgHtml:creatMsgHtml,
		delDraftMsg:delDraftMsg,
		delRecMsg:delRecMsg,
		creatRecHtml:creatRecHtml,
		creatDraftHtml:creatDraftHtml,
		creatSendToWrite:creatSendToWrite,
	}
});