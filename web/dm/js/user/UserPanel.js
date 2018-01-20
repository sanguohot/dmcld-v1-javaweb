define(["form-field","user-fun","pri-pri"],function (field,fun,pri){
	function createPanel(pid,row){
		var pn=$("#"+pid);
		if(!pn) return;
		var format=window.format;
		var id=pid+"_form";
		var html='<form id="'+id+'" class="my-tab" role="form">'
		html+='<div class="btn-group">'
			html+='<button type="button" name="back" pid="'+pid+'" class="btn btn-info btn-sm tooltip-info"><i class="fa fa-reply bigger-130"></i></button>'
			html+='<button type="button"  name="save" style="display:'+window.global.getClass("modifyDevice")+'" class="btn btn-success btn-sm tooltip-success"><i class="fa fa-pencil bigger-130"></i>&nbsp;'+window.lc.getValue("save")+'</button>'
   if(roleType.isSuper(window.user.roleId)||roleType.isDomainAdmin(window.user.roleId)){
	   html+='<button type="button"  name="restore"   class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-key bigger-130"></i>&nbsp;'+window.lc.getValue("restorePwd")+'</button>';
	   html+='<button type="button"  name="setPwd" class="btn btn-info btn-sm tooltip-error"><i class="fa fa-exchange bigger-130"></i>&nbsp;'+window.lc.getValue("setPwd")+'</button>';
   }else if(window.user.uuid==row.uuid){
	   html+='<button type="button"  name="restore"   class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-key bigger-130"></i>&nbsp;'+window.lc.getValue("restorePwd")+'</button>';
	   html+='<button type="button"  name="setPwd" class="btn btn-info btn-sm tooltip-error"><i class="fa fa-exchange bigger-130"></i>&nbsp;'+window.lc.getValue("setPwd")+'</button>';
   }
		html+='<button type="button"  name="api" style="display:'+window.global.getClass("modifyDevice")+'" class="btn btn-success btn-sm"><i class="fa fa-arrows-h bigger-130"></i>&nbsp;API</button>'
		html+='<button name="refresh" type="button" class="btn btn-info btn-sm popover-notitle"><i class="fa fa-refresh bigger-130"></i>&nbsp;'+window.lc.getValue("refresh")+'</button>'
		html+='</div>'		
		html+='<div class="container-fluid">'
		html+='<div class="row">'
		html+='<div class="col-md-5">'
		html+='<h4 ><label>'+window.lc.getValue("basicInfo")+'</label></h4>'
		html+='<div name="basic" >'
		html+=field.getTextField("name","",window.lc.getValue("name"))
	   html+=field.getTextField("alias","",window.lc.getValue("alias"))
	   html+=field.getTextareaField("detailDesc","",window.lc.getValue("desc"))
	   html+='</div>'
	   html+='</br>'
	   html+='<h4 ><label>'+window.lc.getValue("detailInfo")+'</label></h4>'
	   html+='<div name="detail" >'
	   html+=field.getDisplayField("type","",window.lc.getValue("userType"))
//				+field.getTextField("passwordMd5","",window.lc.getValue("password"))
		html+=field.getTextField("phone","",window.lc.getValue("phone"))
		html+=field.getTextField("email","",window.lc.getValue("email"))
		html+=field.getTextField("address","",window.lc.getValue("addr"))	
		html+='</div>'
		html+='</br>'
		html+='<h4 ><label >'+window.lc.getValue("apiInfo")+'</label></h4>'
		html+='<div name="per" >'
		html+=field.getDisplayField("apiEnabled","",window.lc.getValue("apiEnabled"))
		html+=field.getDisplayField("apiAuthType","",window.lc.getValue("authType"))
		html+=field.getTextField("apiAuthPwd","",window.lc.getValue("authPwd"))
		html+=field.getDisplayField("maxTimeoutSec","",window.lc.getValue("maxTimeout"))
		html+=field.getDisplayField("maxReqPerMin","",window.lc.getValue("maxReqPerMin"))	
//								+field.getRadioField("upgradeType","","升级设置",[{value:0,text:"禁用"},{value:1,text:"升级到目标版本"}])

		html+='</div>'
	  		  
		html+='</div>'
		html+='<div class="col-md-2">'
		html+='</div>'
		html+='<div class="col-md-5">'
		html+='<div name="per2" >'
		html+=field.getDisplayField("validIpAddr","","IP 1")
		html+=field.getDisplayField("validIpAddr2","","IP 2")
		html+=field.getDisplayField("validIpAddr3","","IP 3")
		html+=field.getDisplayField("apiTrapFlag","",window.lc.getValue("pushSetting"))

		html+=field.getDisplayField("trapIpAddr","",window.lc.getValue("pushAddr"))
		html+=field.getDisplayField("trapPortNo","",window.lc.getValue("pushPort"))
		html+=field.getDisplayField("lastReqSn","",window.lc.getValue("lastReqSn"))
		html+=field.getDisplayField("reqCntPerMin","",window.lc.getValue("reqCntPerMin"))
										+field.getDisplayField("totalTrapCount","",window.lc.getValue("totalPushCnt"))
		html+=field.getDisplayField("totalReqCount","",window.lc.getValue("totalReqCnt"))
		html+=field.getDisplayField("apiAuthFailCnt","",window.lc.getValue("authFailCnt"))
		html+=field.getDisplayField("cliIpAddr","",window.lc.getValue("clientIp"))
						+field.getDisplayField("cliPortNo","",window.lc.getValue("clientPort"))
		html+=field.getDisplayField("lastUsedTime","",window.lc.getValue("lastUsedTime"))
		html+='</div>'
	   html+='</div>'			  
	   html+='</div>'
	   html+='</div>'
	 html+='</form>';
		pn.html("");		
		pn.append(html);
		$('#'+id).autofill(row);
		$('#'+id+' [name=type]').html(window.lc.getValue("userType",row.type));
		if(row.apiEnabled){
			$('#'+id+' [name=apiEnabled]').html(window.lc.getValue("enable"));
		}else{
			$('#'+id+' [name=apiEnabled]').html(window.lc.getValue("disable"));
		}
		if(row.apiAuthType==0){
			$('#'+id+' [name=apiAuthType]').html("NULL");
		}else if(row.apiAuthType==1){
			$('#'+id+' [name=apiAuthType]').html("MD5");
		}
		if(row.apiTrapFlag==0){
			$('#'+id+' [name=apiTrapFlag]').html(window.lc.getValue("disable"));
		}else if(row.apiTrapFlag==1){
			$('#'+id+' [name=apiTrapFlag]').html(window.lc.getValue("enable"));
		}
		$("#"+id+" button[name=back]").bind('click',function(){
			require(["user-list"], function(user) {
				user.createList("user_list");
			});		
		});
		
		$("#"+id+" button[name=refresh]").bind('click',function(){
			$.ajax({ 
				url: "userManager!getUser.action",
				data:{uuid:row["uuid"],domainUuid:row["domainUuid"]},
				complete: function(data,str){
//				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.userList && data.responseJSON.userList.length){
					createPanel(pid,data.responseJSON.userList[0]);
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("refreshFail"));
				}
			}});		
		});
		$("#"+id+" button[name=restore]").bind('click',function(){
		
			fun.restorePwd(null,[row]);
			
		});
		$("#"+id+" button[name=setPwd]").bind('click',function(){
			
			fun.setPwd(null,[row]);	
			
		});
		$("#"+id+" button[name=api]").bind('click',function(){
//			$('#'+id).autofill(row);
			
			fun.createApi(row,id);
			
		});

		$("#"+id+" button[name=save]").bind('click',function(){
			
	
			var form=$("#"+id);
	 		var pa=form.formSerialize();
			pa+="&domainUuid="+row["domainUuid"];
			pa+="&uuid="+row["uuid"];
			var ev=$('#'+id+' input[name=email]').val();
			if(!ev){
				window.tip.show_pk("warning",null,window.lc.getValue("emailCanNotEmpty"));
				return;
			}
			if(!window.validate.isEmail(ev)){
				window.tip.show_pk("warning",null,window.lc.getValue("emailNotValid"));
				return;
			}
			$.ajax({ 
				url: "userManager!updateUser.action",
				data:pa,
				complete: function(data,str){
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
			
		});

//		$("#port_bt").bind('click',function(){
//			var productId=record.productId;
//			var name=window.lc.getProductType(productId);
//			if(name=="MTG"){
//				require(["mtg-port-list"], function(grid) {
//					grid.createPortList(pid,pid+"_tg",{neUuid:record.uuid,domainUuid:record.domainUuid},"all");
//				});	
//			}else if(name=="DAG"){
//				require(["dag-port-list"], function(grid) {
//					grid.createPortList(pid,pid+"_ag",{neUuid:record.uuid,domainUuid:record.domainUuid},"all");
//				});
//			}
//	
//		});
	}	
    return {
		createPanel:createPanel,
    };
});


