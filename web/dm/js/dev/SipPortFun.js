define(["form-field"],function(filed){
	function createAddHtml(pid,row,id,tblSipConfig,rows){
	  if(id=="dev_listsip_list-add"){
		var list=[]
		  for(var i=0;i<122;i++){
			  list.push({value:i,text:i})
		  }   
		
			for(var i=tblSipConfig.length-1;i>-1;i--){
			 var port=tblSipConfig[i].port;
			  list.splice(port,1)
			}
	}
	
		var pn=$("#myModal");
		if(!pn) return;
		var html='<div class="modal-dialog" >'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
			      +'<button type="button" class="close" '
			      +'data-dismiss="modal" aria-hidden="true">'
			      +'&times;'
			      +'</button>'
			      +'<h4 class="modal-title" id="myModalLabel">'
			      +window.lc.getValue("sipPortConf")
			      +'</h4>'
			      +'</div>'
		      +'<div class="modal-body" style="height:300px;overflow-y:scroll;>'
			      +'<form class="" role="form">'
				      +'<div class="row">'
				      +'<div class="col-md-12" >'
				      html+='<span style="color:gray"><font color="red">*</font>'+window.lc.getValue('portTip')+'</span>'
				      +'</br>'
				      html+='<div id="sipAdd">'
				    	  	html+=field.getComboField("sipPort","",window.lc.getValue("port"),list);
		              html+='</div>'
		              html+='<div id="sipSet">'	  
		                 html+=field.getTextField("sipPort","",'<font color="red"></font>&nbsp;'+window.lc.getValue("port"));
		              html+='</div>'
		              html+='</br>'
		              html+= '<label><font>'+window.lc.getValue("disablePort")+'</font><input type="checkbox" name="checkbox" id="disablePort"value="disablePort" style="margin-left:15px" ></label>'
		              html+='<div id="sipPlay">'
		            	  html+= '<label><font>'+window.lc.getValue("register")+'</font><input type="checkbox" name="checkbox" value="resite" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
		            	  html+=field.getTextField("mainSipName","",'<font color="red"></font>&nbsp;'+window.lc.getValue("mainSipName"));
		                  html+=field.getTextField("mainSipAccount","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("mainSipAccount"));
		                  html+=field.getTextField("mainSipAuthAccount","",'<font color="red"></font>&nbsp;'+window.lc.getValue("mainSipAuthAccount"));
		                  html+=field.getTextField("mainAatuPassword","",'<font color="red"></font>&nbsp;'+window.lc.getValue("mainAatuPassword"));
		                 // html+=field.getTextField("sipName","",'<font color="red"></font>&nbsp;'+window.lc.getValue("sipName"));
		                //  html+=field.getTextField("sipAccount","",'<font color="red"></font>&nbsp;'+window.lc.getValue("sipAccount"));
		                //  html+=field.getTextField("sipAuthAccount","",'<font color="red"></font>&nbsp;'+window.lc.getValue("sipAuthAccount"));
		                //  html+=field.getTextField("authPassword","",'<font color="red"></font>&nbsp;'+window.lc.getValue("authPassword"));
		                  html+=field.getTextField("dialNum","",'<font color="red"></font>&nbsp;'+window.lc.getValue("dialNum"));
		                  html+=field.getTextField("delayTime","",'<font color="red"></font>&nbsp;'+window.lc.getValue("delayTime"));
		                  html+= '<label><font>'+window.lc.getValue("notDisturb")+'</font><input type="checkbox" name="checkbox" value="notDisturb" style="margin-left:56px" ><font>'+window.lc.getValue("enable")+'</font></label>'
		                  html+='</br>'
		                  html+= '<label><font>'+window.lc.getValue("callId")+'</font><input type="checkbox" name="checkbox" value="callId" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
		                  html+=field.getTextField("unCall","",'<font color="red"></font>&nbsp;'+window.lc.getValue("unCall"));
		                  html+=field.getTextField("busyCall","",'<font color="red"></font>&nbsp;'+window.lc.getValue("busyCall"));
		                  html+=field.getTextField("cfnry","",'<font color="red"></font>&nbsp;'+window.lc.getValue("cfnry"));
		                  html+= '<label><font>'+window.lc.getValue("callWait")+'</font><input type="checkbox" name="checkbox" value="callWait" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
		                  html+='</br>'
		                  html+= '<label><font>'+window.lc.getValue("callWaitTone")+'</font><input type="checkbox" name="checkbox" value="callWaitTone" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
		              html+='</div>' 	  
				      +'</div>'	  
			      +'</div>'
		       +'</form>'
		      +'</div>'
		      
		      +'<div class="modal-footer">'
		      +'<button name="close" type="button" class="btn btn-default" '
		      +'data-dismiss="modal">'+window.lc.getValue("close")
		      +'</button>'
		      +'<button name="commit" type="button" class="btn btn-primary">'
		      +window.lc.getValue("commit")
		      +'</button>'
		      +'</div>'
		      +'</div><!-- /.modal-content -->'
		      +'</div>';
		pn.html("");
		pn.append(html);
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		createDefaultfun(id);
		if(id=="dev_listsip_list-set"){
			$("#myModal input[name=sipPort]").val(rows[0].port);
			$("#myModal input[name=sipPort]").attr("disabled","disabled");
			$("#myModal input[name=mainSipName]").val(rows[0].mainSipName);
			//var mainSipName=$("#myModal input[name=sipPort]").val();
			$("#myModal input[name=mainSipAccount]").val(rows[0].mainSipAccount);
			$("#myModal input[name=mainSipAuthAccount]").val(rows[0].mainSipAuthAccount);
			$("#myModal input[name=mainAatuPassword]").val(rows[0].mainSipPossword);
			//var sipName=$("#myModal input[name=sipName]").val();
			//var sipAuthAccount=$("#myModal input[name=sipAuthAccount]").val();
			//var sipAccount=$("#myModal input[name=sipAccount]").val();
			//var authPassword=$("#myModal input[name=authPassword]").val();
			$("#myModal input[name=dialNum]").val(rows[0].dialNumber);
			$("#myModal input[name=delayTime]").val(rows[0].delayTime);
			$("#myModal input[name=unCall]").val(rows[0].unconditionalCall);
			$("#myModal input[name=busyCall]").val(rows[0].busyCallTransfer);
			$("#myModal input[name=cfnry]").val(rows[0].cfnry);
			if(rows[0].disablePort==1){
				$("#myModal input[value=disablePort]").attr("checked","checked");
				document.getElementById('sipPlay').style.display='none';
			}else if(rows[0].disablePort==0){
				$("#myModal input[value=disablePort]").attr("checked",false);	
			}
			if(rows[0].resite==1){
				$("#myModal input[value=resite]").attr("checked","checked");
			} else if(rows[0].resite==0){
				$("#myModal input[value=resite]").attr("checked",false);
			}
			if(rows[0].notDisturb==1){
				$("#myModal input[value=notDisturb]").attr("checked","checked");
			}
			if(rows[0].callId==1){
				$("#myModal input[value=callId]").attr("checked","checked");
			}else if(rows[0].callId==0){
				$("#myModal input[value=callId]").attr("checked",false);
			}
			if(rows[0].callWait==1){
				$("#myModal input[value=callWait]").attr("checked","checked");
			}
			if(rows[0].callWaitTone==1){
				$("#myModal input[value=callWaitTone]").attr("checked","checked");
			}
			
		}
		$("#myModal button[name=commit]").click(function(){
			var params={};
			var checkBoxs=document.getElementsByName('checkbox');
			for(var i=0;i<checkBoxs.length;i++){
				if(checkBoxs[i].checked){
				params[checkBoxs[i].value]=1;
				}else{
					params[checkBoxs[i].value]=0;
				}
			}
			var mainSipAccount=$("#myModal input[name=mainSipAccount]").val();
			if(id=="dev_listsip_list-add"){
			var port=$("#myModal select[name=sipPort]").val();
			   if(params.disablePort==0){
			     for(var i=0;i<tblSipConfig.length;i++){
					   if(mainSipAccount==tblSipConfig[i].mainSipAccount){
						   window.tip.show_pk("warning",null,window.lc.getValue("exitmainSip"));
							return;
					   }
				   
			   }
			   }
			}
		   if(id=="dev_listsip_list-set"){
			   var port=rows[0].port; 
			   if(params.disablePort==0){
			   
			      for(var i=0;i<tblSipConfig.length;i++){
				   if(rows[0].uuid!=tblSipConfig[i].uuid){
					 
					   if(mainSipAccount==tblSipConfig[i].mainSipAccount){
						   window.tip.show_pk("warning",null,window.lc.getValue("exitmainSip"));
							return;
					   }
				   }
			   }
			   }
		   }
		 
			var mainSipName=$("#myModal input[name=mainSipName]").val();
			//var mainSipName=$("#myModal input[name=sipPort]").val();
			var mainSipAccount=$("#myModal input[name=mainSipAccount]").val();
			var mainSipAuthAccount=$("#myModal input[name=mainSipAuthAccount]").val();
			var mainAatuPassword=$("#myModal input[name=mainAatuPassword]").val();
			//var sipName=$("#myModal input[name=sipName]").val();
			//var sipAuthAccount=$("#myModal input[name=sipAuthAccount]").val();
			//var sipAccount=$("#myModal input[name=sipAccount]").val();
			//var authPassword=$("#myModal input[name=authPassword]").val();
			var dialNum=$("#myModal input[name=dialNum]").val();
			var delayTime=$("#myModal input[name=delayTime]").val();
			var unCall=$("#myModal input[name=unCall]").val();
			var busyCall=$("#myModal input[name=busyCall]").val();
			var cfnry=$("#myModal input[name=cfnry]").val();
			
			if(params.disablePort==0){
			if(mainSipAccount==""&&dialNum==""){
				window.tip.show_pk("warning",null,window.lc.getValue("errorTip"));
				return;
			  }
			}
			
			if(dialNum){
				if(createTip(dialNum,'dialNumRand')){
					return;
				};
				if(!/^\d+$/.test(delayTime)||delayTime==''||parseInt(delayTime)<0||parseInt(delayTime)>10){
				window.tip.show_pk("warning",null,window.lc.getValue("delayTimeRand"));
				return;
				}
				
			}
			
			if(mainSipName){
				if(createTip(mainSipName,'mainSipNameLessThan32')){
					return;
				};
				if(mainSipName.length>32){
					window.tip.show_pk("warning",null,window.lc.getValue("mainSipNameLessThan32"));
					return;	
				}
			}
			
			if(mainSipAccount){
				
				if(createTip(mainSipAccount,'mainSipAccountLessThan32')){
					return;
				};
				if(mainSipAccount.length>32){
					window.tip.show_pk("warning",null,window.lc.getValue("mainSipAccountLessThan32"));
					return;	
				}
			}
			
			if(mainSipAuthAccount){
				if(createTip(mainSipAuthAccount,'mainSipAuthAccountLessThan64')){
					return;
				};
				if(mainSipAuthAccount.length>64){
					window.tip.show_pk("warning",null,window.lc.getValue("mainSipAuthAccountLessThan64"));
					return;	
				}
			}
			if(mainAatuPassword){
				
				if(createTip(mainAatuPassword,'mainAatuPasswordRand')){
					return;
				};
				if(mainAatuPassword.length>32){
					window.tip.show_pk("warning",null,window.lc.getValue("mainAatuPasswordRand"));
					return;	
				}
				
			}
		
			if(unCall){
				if(createTip(unCall,'unCallLessThan32')){
					return;
				};
				if(unCall.length>32){
					window.tip.show_pk("warning",null,window.lc.getValue("unCallLessThan32"));
					return;	
				}
				if(unCall==mainSipAccount){
					window.tip.show_pk("warning",null,window.lc.getValue("unCallNotSame"));
					return;	
				}
			
			}
			if(busyCall){
				if(createTip(busyCall,'busyCallLessThan32')){
					return;
				};
				if(busyCall.length>32){
					window.tip.show_pk("warning",null,window.lc.getValue("busyCallLessThan32"));
					return;	
				}
				if(busyCall==mainSipAccount){
					window.tip.show_pk("warning",null,window.lc.getValue("busyCallNotSame"));
					return;	
				}
			}
			if(cfnry){
				if(createTip(cfnry,'cfnryLessThan32')){
					return;
				};
				if(cfnry.length>32){
					window.tip.show_pk("warning",null,window.lc.getValue("cfnryLessThan32"));
					return;	
				}
				
				if(cfnry==mainSipAccount){
					window.tip.show_pk("warning",null,window.lc.getValue("cfnryNotSame"));
					return;	
				}
			}
			params.port=port;
			params.mainSipName=mainSipName;
			//params. mainSipName=$("#myModal input[name=sipPort]").val();
			params.mainSipAccount=mainSipAccount;
			params.mainSipAuthAccount=mainSipAuthAccount;
			params.mainSipPossword=mainAatuPassword;
			/*params.sipName=sipName;
			params.sipAuthAccount=sipAuthAccount;
			params.sipAccount=sipAccount;
			params.authPassword=authPassword;*/
			params.dialNumber=dialNum;
			params.delayTime=delayTime;
			params.unconditionalCall=unCall;
			params.busyCallTransfer=busyCall;
			params.cfnry=cfnry;
			params.domainUuid=row.domainUuid;
			params.productSn=row.productSns;
			params.alias=row.alias;
			//params.provUrl="121.41.119.101";
	    	params.provUrl=window.extra.provUrl;
			params.uuid=row.uuid;
			//修改处理
		 if(id=="dev_listsip_list-set"){
			 id=pid+"sip_list";
			 $.ajax({
				 url:'sipConfigManager!updateSipConfig.action',
				 type:'post',
				 data:params,
				 complete:function(data){
				 $('#myModal button[name=close]').trigger("click");
				 if(data.responseJSON && data.responseJSON.success){	
					 //alert("'")
						//$('#dev_listsip_list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ').bootstrapTable("removeAll");
					      $('#'+id).bootstrapTable("removeAll");
						$('#dev_listsip_list').bootstrapTable('refresh');
						window.tip.show_pk("success",null,window.lc.getValue("setSucc")+"!");
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("setFail")+"");
					}
			 }
			 }) 
			 
		 }else if(id=="dev_listsip_list-add"){
			
			 id=pid+"sip_list";
			 $.ajax({
				 url:'sipConfigManager!addSipConfig.action',
				 type:'post',
				 data:params,
				 complete:function(data){
				 $('#myModal button[name=close]').trigger("click");
					if(data.responseJSON && data.responseJSON.success){	
						$('#'+id).bootstrapTable("removeAll");
						$('#'+id).bootstrapTable("refresh");
						window.tip.show_pk("success",null,window.lc.getValue("commitSucc")+"!");
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("commitFail")+"");
					}
			 }
			 })
			 
		 }	
			
		})
	}
	function createDefaultfun(id){
		if(id=="dev_listsip_list-set"){
		       document.getElementById("sipAdd").style.display='none';
			 //$("#myModal select[name=sipPort]").css('display', 'none');	
		}else if(id=="dev_listsip_list-add"){
			// $("#myModal input[name=sipPort]").css('display', 'none');	
			document.getElementById("sipSet").style.display='none';
			$("#myModal input[value=resite]").attr("checked","checked")
			$("#myModal input[value=callId]").attr("checked",true);
		}
		//var m=document.getElementsByName('checkbox');
		$("#disablePort").change(function(){
			if(document.getElementById('sipPlay').style.display=='none'){
				document.getElementById('sipPlay').style.display='block';
			}else{
				document.getElementById('sipPlay').style.display='none'
			}
			
		})
		$("#myModal input[name=delayTime]").attr("disabled","disabled");
		//$("input[name=getDNS]").attr("disabled", "disabled");
		$("#myModal input[name=dialNum]").focus(function(){
			$("#myModal input[name=delayTime]").attr("disabled",false);	
		})
		$("#myModal input[name=dialNum]").blur(function(){
			var dialNum=$("#myModal input[name=dialNum]").val();
			if(dialNum==""){
			$("#myModal input[name=delayTime]").attr("disabled","disabled");
			}
		})
		/*$("#myModal input[name=dialNum]").blur(function(){
			$("#myModal input[name=delayTime]").attr("disabled","disabled");	
		})*/
		
		$("#myModal input[value=callWaitTone]").attr("disabled","disabled");
		$("#myModal input[value=callWait]").change(function(){
			if(this.checked){
				$("#myModal input[value=callWaitTone]").attr("disabled",false);
			}else{
				$("#myModal input[value=callWaitTone]").attr("disabled","disabled");	
			}
		});
		
	}
	function createAddBatchHtml(pid,row,tblSipConfig){
		id=pid+"sip_list";
		var list=[]
				  for(var i=0;i<=121;i++){
					  list.push({value:i,text:i})
				  }        
				var pn=$("#myModal");
				if(!pn) return;
				var html='<div class="modal-dialog" >'
				      +'<div class="modal-content">'
				      +'<div class="modal-header">'
					      +'<button type="button" class="close" '
					      +'data-dismiss="modal" aria-hidden="true">'
					      +'&times;'
					      +'</button>'
					      +'<h4 class="modal-title" id="myModalLabel">'
					      +window.lc.getValue("sipPortConf")
					      +'</h4>'
					      +'</div>'
				      +'<div class="modal-body" style="height:300px;overflow-y:scroll;">'
					      +'<form class="" role="form">'
						      +'<div class="row">'
						      +'<div class="col-md-12" >'
						    	  	html+=field.getComboField("sipPort","",window.lc.getValue("startPort"),list);
				                    html+=field.getComboField("sipPort1","",window.lc.getValue("endPort"),list);
				              html+='</br>'
				            	  html+= '<label><font>'+window.lc.getValue("register")+'</font><input type="checkbox" name="checkbox" value="resite" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
				            	  html+='</br>'
				            	  html+= '<label><font style="font-size: 18px;color: black">'+window.lc.getValue("stratMainSipAccount")+'</font></label>'
				            	  //html+=field.getTextField("mainSipName","",'<font color="red"></font>&nbsp;'+window.lc.getValue("mainSipName"));
				                  html+=field.getTextField("mainSipAccount","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("mainSipAccount"));
				                  html+=field.getTextField("mainSipAuthAccount","",'<font color="red"></font>&nbsp;'+window.lc.getValue("mainSipAuthAccount"));
				                  html+=field.getTextField("mainAatuPassword","",'<font color="red"></font>&nbsp;'+window.lc.getValue("mainAatuPassword"));
				                 // html+=field.getTextField("sipName","",'<font color="red"></font>&nbsp;'+window.lc.getValue("sipName"));
				                 // html+= '<label><font style="font-size: 21px;color: black">'+window.lc.getValue("stratSipAccount")+'</font></label>'
				                //  html+=field.getTextField("sipAccount","",'<font color="red"></font>&nbsp;'+window.lc.getValue("sipAccount"));
				                //  html+=field.getTextField("sipAuthAccount","",'<font color="red"></font>&nbsp;'+window.lc.getValue("sipAuthAccount"));
				                //  html+=field.getTextField("authPassword","",'<font color="red"></font>&nbsp;'+window.lc.getValue("authPassword"));
				                //  html+=field.getTextField("dialNum","",'<font color="red"></font>&nbsp;'+window.lc.getValue("dialNum"));
				                 // html+=field.getTextField("delayTime","",'<font color="red"></font>&nbsp;'+window.lc.getValue("delayTime"));
				                  html+=field.getTextField("step","",'<font color="red"></font>&nbsp;'+window.lc.getValue("step"));
				                  html+= '<label><font>'+window.lc.getValue("samePossword")+'</font><input type="checkbox" name="checkbox" value="portCommPossword" style="margin-left:56px" ><font>'+window.lc.getValue("enable")+'</font></label>'
				                  html+='</br>'
				                  //html+= '<label><font>'+window.lc.getValue("callId")+'</font><input type="checkbox" name="register" value="port" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
				                	  html+=field.getComboField("workMode","",window.lc.getValue("workMode"),[{value:0,text:window.lc.getValue("voice")},{value:1,text:window.lc.getValue("fax")},{value:2,text:window.lc.getValue("voiceAndFax")},{value:3,text:window.lc.getValue("pos")}])	  
				                  //html+=field.getTextField("callWait","",'<font color="red"></font>&nbsp;'+window.lc.getValue("callWait"));
				                  //html+=field.getTextField("busyCall","",'<font color="red"></font>&nbsp;'+window.lc.getValue("busyCall"));
				                  //html+=field.getTextField("cfnry","",'<font color="red"></font>&nbsp;'+window.lc.getValue("cfnry"));
				                  html+= '<label><font>'+window.lc.getValue("callWait")+'</font><input type="checkbox" name="checkbox" value="callWait" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
				                  html+='</br>'
				                  html+= '<label><font>'+window.lc.getValue("callId")+'</font><input type="checkbox" name="checkbox" value="callId" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
				                  html+='</br>'
				                	  html+= '<label><font>'+window.lc.getValue("callWaitTone")+'</font><input type="checkbox" name="checkbox" value="callWaitTone" style="margin-left:42px" ><font>'+window.lc.getValue("enable")+'</font></label>'
				              	  
						      +'</div>'	  
					      +'</div>'
				       +'</form>'
				      +'</div>'
				      
				      +'<div class="modal-footer">'
				      +'<button name="close" type="button" class="btn btn-default" '
				      +'data-dismiss="modal">'+window.lc.getValue("close")
				      +'</button>'
				      +'<button name="commit" type="button" class="btn btn-primary">'
				      +window.lc.getValue("commit")
				      +'</button>'
				      +'</div>'
				      +'</div><!-- /.modal-content -->'
				      +'</div>';
				pn.html("");
				pn.append(html);
				$('#myModal').modal().css({
				    width: 'auto',
				    backdrop:false,
				});
		
				$("#myModal input[value=resite]").attr("checked","checked");
				//$("#myModal input[value=callId]").attr("checked",true);
				$("#myModal input[value=callId]").attr("checked",true);
				$("#myModal input[value=portCommPossword]").attr("checked",true);
				$("#myModal input[name=step]").val("1");
				$("#myModal button[name=commit]").click(function(){
					var params={};
					var checkBoxs=document.getElementsByName('checkbox');
					for(var i=0;i<checkBoxs.length;i++){
						if(checkBoxs[i].checked){
						params[checkBoxs[i].value]=1;
						}else{
							params[checkBoxs[i].value]=0;
						}
					}
					
					var port=$("#myModal select[name=sipPort]").val();
					var endPort=$("#myModal select[name=sipPort1]").val();
					var mainSipAccount=$("#myModal input[name=mainSipAccount]").val();
					var mainSipAuthAccount=$("#myModal input[name=mainSipAuthAccount]").val();
					var mainAatuPassword=$("#myModal input[name=mainAatuPassword]").val();
					var step=$("#myModal input[name=step]").val();
					var siProws=[];
					
					if(mainSipAccount){
						if(createTip(mainSipAccount,'mainSipAccountLessThan32')){
							return;
						};
						if(mainSipAccount.length>32){
							window.tip.show_pk("warning",null,window.lc.getValue("mainSipAccountLessThan32"));
							return;	
						}
						if(0<mainSipAccount.length&&mainSipAccount.length<3){
						 if(!/^\d+$/.test(mainSipAccount)){
							 window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
								return;	
						 }
						}
						if(mainSipAccount.length>=3){
							var mainSip3=mainSipAccount.substring(mainSipAccount.length-3,mainSipAccount.length)
						 if(!/^\d+$/.test(mainSip3)){
						  window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
						  return;	
						}else{
							if(parseInt(mainSip3)+(parseInt(endPort)-parseInt(port))*parseInt(step)>=1000){
							 window.tip.show_pk("warning",null,window.lc.getValue("isDigital1"));
							  return;
							}
						}
						}
					}
					if(mainSipAccount.length<=3){
					for(var i=port;i<=endPort;i++){
						siProws.push({port:i,mainSipAccount:parseInt(mainSipAccount)+(i-port)*parseInt(step)});
					}
					//var rows=[{port_no:0,pri_acc:1000},{port_no:1,pri_acc:1001}];
					//var datas=[{port_no:0,pri_acc:2000},{port_no:1,pri_acc:2001},{port_no:2,pri_acc:2002},{port_no:3,pri_acc:11001}];
					
					}else{
						var mainSip3=mainSipAccount.substring(mainSipAccount.length-3,mainSipAccount.length);
						var mainSipString=mainSipAccount.substring(0,mainSipAccount.length-3);
						for(var i=port;i<=endPort;i++){
							var tmp=parseInt(mainSip3)+(i-port)*parseInt(step);
							tmp+=1000;
							tmp+="";
							tmp=tmp.substring(1);
							siProws.push({port:i,mainSipAccount:mainSipString+tmp});
						}
						
						
					}
					if(!check_pri_acc(siProws,tblSipConfig)){
						 window.tip.show_pk("warning",null,window.lc.getValue("exitmainSip"));
							return;

						
					}
					if(mainSipAuthAccount){
						if(createTip(mainSipAuthAccount,'mainSipAuthAccountLessThan64')){
							return;
						};
						if(mainSipAuthAccount.length>64){
							window.tip.show_pk("warning",null,window.lc.getValue("mainSipAuthAccountLessThan64"));
							return;	
						}
						if(0<mainSipAuthAccount.length&&mainSipAuthAccount.length<3){
							 if(!/^\d+$/.test(mainSipAuthAccount)){
								 window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
									return;	
							 }
							}
							if(mainSipAuthAccount.length>=3){
							 if(!/^\d+$/.test(mainSipAuthAccount.substring(mainSipAuthAccount.length-3,mainSipAuthAccount.length))){
							  window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
							  return;	
							}
							}
					}
					if(step==""||!/^\d+$/.test(step)||parseInt(step)<=0||parseInt(step)>1000000){
						  window.tip.show_pk("warning",null,window.lc.getValue("stepRand"));
						  return;	
					}
					if(params.portCommPossword==0){
						if(mainAatuPassword){
							if(createTip(mainAatuPassword,'mainAatuPasswordRand')){
								return;
							};
							if(0<mainAatuPassword.length&&mainAatuPassword.length<3){
								 if(!/^\d+$/.test(mainAatuPassword)){
									 window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
										return;	
								 }
								}
								if(mainAatuPassword.length>=3){
									if(!/^[A-Za-z0-9]+$/.test(mainAatuPassword)){
										window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
										  return;
									}
								 if(!/^\d+$/.test(mainAatuPassword.substring(mainAatuPassword.length-3,mainAatuPassword.length))){
								  window.tip.show_pk("warning",null,window.lc.getValue("isDigital"));
								  return;	
								}
								}	
						}
						
					}else if(params.portCommPossword==1){
							if(mainAatuPassword){
								if(createTip(mainAatuPassword,'mainAatuPasswordRand')){
									return;
								};
								if(mainAatuPassword.length>32){
									window.tip.show_pk("warning",null,window.lc.getValue("mainAatuPasswordRand"));
									return;	
								}
							}
						
					}
					if(parseInt(endPort)<parseInt(port)){
						window.tip.show_pk("warning",null,window.lc.getValue("endPortLessThanstratPort"));
						return;	
					}
					if(mainSipAccount==""){
						window.tip.show_pk("warning",null,window.lc.getValue("errorTip"));
						return;
					}
					params.port=port;
					params.endPort=endPort;
					params.mainSipAccount=mainSipAccount;
					params.mainSipAuthAccount=mainSipAuthAccount;
					params.mainSipPossword=mainAatuPassword;
					params.step=step;
					params.domainUuid=row.domainUuid;
					params.productSn=row.productSns;
					params.alias=row.alias;
					//params.provUrl="172.16.0.40";
			    	params.provUrl=window.extra.provUrl;
				$.ajax({
					url:'sipConfigManager!batchSipConfig.action',
				    type:'post',
				    data:params,
				    complete:function(data){
					$('#myModal button[name=close]').trigger("click");
					if(data.responseJSON && data.responseJSON.success){	
						$('#'+id).bootstrapTable("removeAll");
						$('#'+id).bootstrapTable("refresh");
						window.tip.show_pk("success",null,window.lc.getValue("commitSucc")+"!");
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("commitFail")+"");
					}
				     	
				    }
				})
		});
	}
	function createTip(name,nameRand){
		
		if(/.*[^\x00-\xff]+.*$/.test(name)){
			window.tip.show_pk("warning",null,window.lc.getValue(nameRand));
			return true;	
		}
		if(name.indexOf("'")!=-1||name.indexOf("\"")!=-1||name.indexOf(" ")!=-1){
			window.tip.show_pk("warning",null,window.lc.getValue(nameRand));
			return true;	
		}
		return false;
	}

		
		
		function check_pri_acc(rows,datas){
		    for(var i=0;i<rows.length;i++){
		        var row=rows[i];
		        var port_no=row.port;
		        var port_no_min=rows[0].port;
		        var port_no_max=rows[rows.length-1].port;
		        for(var j=0;j<datas.length;j++){
		            var data=datas[j];
		            var no=data.port;
		            if(no<port_no_min || no>port_no_max){
		                if(data.mainSipAccount==row.mainSipAccount){
		                    return false;
		                }
		            }
		        }
		    }
		    return true;
		}
	
	return{
		createAddHtml:createAddHtml,
		createAddBatchHtml:createAddBatchHtml,
	} 
})