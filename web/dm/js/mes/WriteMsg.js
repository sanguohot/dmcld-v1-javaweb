define(['text!html/mes/select.html'],function (select){
	function createView(pid){
		
	
		 var saveParams={};
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    pn.html("");
	    id=pid+"-write"
	   var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
	   html+='<button id="'+id+'-send" type="submit" class="btn btn-sm btn-success" style="margin: 10px 1px 0 0" title="'+window.lc.getValue("send")+'"><i class="fa fa-send"></i>'+window.lc.getValue("send")+'</button>';
       html+='<button style="margin: 10px 1px 0 0" id="'+id+'-save" type="submit" class="btn btn-sm btn-success" title="'+window.lc.getValue("save")+'"><i class="fa fa-saved"></i>'+window.lc.getValue("save")+'</button>';
       html+='</div>'
       var selectFn = window.dot.template(select);
        var selectFile=selectFn({lan:{sendToRole:window.lc.getValue("sendToRole"),
        	                          theme:window.lc.getValue("theme"),
        	                          content:window.lc.getValue("contentText"),
        	                          id:'form-field-select-4',
        	                          chooseRole:window.lc.getValue("chooseRole")}})
       html+=selectFile;
	   pn.append(html);
//	   $(".chosen-select").chosen(); 
	   document.getElementById('textarea').parentNode.style.marginTop="-2%";
	   $(".chosen-select").chosen({width: "100%"}); 
	    $("#"+id+"-send").click(function () { 
	    	 var params={};
	    	 var sendToRole='';
	    	 var roleIdList=new Array();
          roleIdList= $("#form-field-select-4").val();
           var theme=$("#therm").val();
           var content=$("#textarea").val();
            if(!roleIdList){
            	window.tip.show_pk("warning",null,window.lc.getValue("youNotChoiseRole"));
            	return;
            }
            if(!theme){
            	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteTheme"));
            	return;
            }if(!content){
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
   	    sendMsg(params,saveParams);
       }); 
	    $("#"+id+"-save").click(function () { 
	    	
	    	 var sendToRole='';
	    	 var roleIdList=new Array();
         roleIdList= $("#form-field-select-4").val();
          var theme=$("#therm").val();
          var content=$("#textarea").val();
           if(!roleIdList){
           	window.tip.show_pk("warning",null,window.lc.getValue("youNotChoiseRole"));
           	return;
           }
           if(!theme){
           	window.tip.show_pk("warning",null,window.lc.getValue("youNotWriteTheme"));
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
        saveMsg(saveParams);
      }); 
		
	   // var roleIdList=new array();
	    
	    //window.global.getMsgPara(params)
	   
	}
	function sendMsg(params,saveParams){
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
                		window.tip.show_pk("warning",null,window.lc.getValue("txFail"));
                    	return;
                	}
			  if(data.responseJSON.retValue){
				  window.tip.show_pk("success",null,window.lc.getValue("sendSuccess"));
				  window.modal.creatMes(window.lc.getValue('yourMessageIsSent'),window.lc.getValue('thisMessageIsSentSuccessfullyAndIsSavedToTheSentMessage')); 
			  }	
			  $('#view-message').bind("click",function(){
					//跳转到发件箱
				  $('#myModal button[class=close]').trigger("click");
				  $('#myTab a[href=#mes_send]').tab("show");
				 
				  
			    });
			    $('#another-message').bind("click",function(){
			    	  //在写一封
			    	 $('#myTab a[href=#mes_write]').tab("show");
			    	$('#form-field-select-4').val('').trigger('chosen:updated');
			    	$('#therm').val('');
			    	$('#textarea').val('');
			    });
			   
			}
			
		});	
			//window.setTimeout("window.global.getMailTip()",2000);
	}
	function saveMsg(saveParams){
		if(!saveParams.msgUuid)
		{
			$.ajax({
				url:'msgManager!saveMsg.action',
			    type:'POST',
			    data:saveParams,
			    complete:function(data){	
				if(data.responseJSON && data.responseJSON.success){	
					saveParams.msgUuid=data.responseJSON.retValue;
					 
                	}else{
                		window.tip.show_pk("warning",null,window.lc.getValue("saveFail"));
                    	return;
                	}
			  if(data.responseJSON.retValue){
				  window.tip.show_pk("success",null,window.lc.getValue("saveSuccess"));
				  $('#myTab a[href=#mes_draft]').tab("show");
			  }	
			}
		});	
		
	}
	}
	
	 return {
		 createView:createView,
		  sendMsg:sendMsg,
		  saveMsg:saveMsg
		  };
});