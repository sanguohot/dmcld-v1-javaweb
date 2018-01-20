define(["form-field"],function (field){
  function createPanel(dstDomainUuid,dstUuid,lid){
		var pn=$("#myModal");
		if(!pn) return;
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("setPwd")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">'
		      +'<div class="row">'
		      +'<div class="col-md-12" >';
		html+=field.getTextField("oldPwd","",window.lc.getValue("oldPwd"),"","password")
		html+=field.getTextField("newPwd","",window.lc.getValue("newPwd"),"","password")
		html+=field.getTextField("confirmPwd","",window.lc.getValue("confirmPwd"),"","password")
		      html+='</div>'			  
		      +'</div>'
		      +'</form>'
		      +'</div>'
		      +'<div class="modal-footer">'
		      +'<button name="close" type="button" class="btn btn-default" '
		      +'data-dismiss="modal">'+window.lc.getValue("close")
		      +'</button>'
		      +'<button name="commit"  type="button" class="btn btn-primary">'
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
		$('#myModal button[name=commit]').bind("click",function(){
			var oldPwd=$("#myModal input[name=oldPwd]").val();
			var newPwd=$("#myModal input[name=newPwd]").val();
			var confirmPwd=$("#myModal input[name=confirmPwd]").val();
			if(!oldPwd){
				window.tip.show_pk("warning",null,window.lc.getValue("oldPwdCanNotEmpty"));
				return;
			}
			$.ajax({ 
				url: "userManager!checkPwd.action",
				data:{passwordMd5:oldPwd,domainUuid:(dstDomainUuid?dstDomainUuid:window.user.dstDomainUuid),uuid:(dstUuid?dstUuid:window.user.uuid)},
				complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){
					if(!newPwd){
						window.tip.show_pk("warning",null,window.lc.getValue("newPwdCanNotEmpty"));
						return;
					}
					if(!confirmPwd){
						window.tip.show_pk("warning",null,window.lc.getValue("confirmPwdCanNotEmpty"));
						return;
					}
					if(newPwd.length<6||newPwd.length>16||/.*[^\x00-\xff]+.*$/.test(newPwd)){
						window.tip.show_pk("warning",null,window.lc.getValue("passWordRand"));
						return;	
					}
					if(confirmPwd!=newPwd){
						window.tip.show_pk("warning",null,window.lc.getValue("newPwdConfirmPwdNotSame"));
						return;
					}
					$.ajax({ 
						url: "userManager!updatePwd.action",
						data:{passwordMd5:newPwd,domainUuid:(dstDomainUuid?dstDomainUuid:window.user.dstDomainUuid),uuid:(dstUuid?dstUuid:window.user.uuid)},
						complete: function(data,str){
						$('#myModal button[name=close]').trigger("click");
						if(lid){
							$('#'+lid).bootstrapTable("removeAll");
							$('#'+lid).bootstrapTable("refresh");
						}
						if(data.responseJSON && data.responseJSON.success){
							window.tip.show_pk("success",null,window.lc.getValue("setSucc"));
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
						}
					}});
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("oldPwdNotRight"));
					return;
				}
			}});
			
		});
  }
  function enterkey(){
		 if(window.event.keyCode == 13){
			 $('#myModal button[name=commit]').click();
		 }
	 }
  return {
	  createPanel:createPanel
  };
});


