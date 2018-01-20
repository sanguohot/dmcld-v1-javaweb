/**
 * Created by Rainc on 2015/3/22.
 */
define(["form-field",'text!html/field/select.html','lan-con'],function(field,select,lan){
	function createAddHtmlList(lid,list){
		var params={}
	    if(window.global.getDomainUuid()>0){
	    	params.domainUuid=window.global.getDomainUuid();
	    	 params.types='site';
	    	 $.ajax({ 
	 			url: "getCombox.action",
	 			data:params,
	 			complete: function(data,str){
	 			if(data.responseJSON && data.responseJSON.comboxList){
	 				var siteList=data.responseJSON.comboxList;
	 				var li=[];
	 				for(var i=0;i<siteList.length;i++){
	 					var item=siteList[i];
	 					if(item.type=="site"){
	 						var obj={text:item.name,value:item.uuid};
	 						li.push(obj);
	 					}
	 				}
	 					$.ajax({
	 						url:'domainGrpManager!getList.action',
	 						type:'post',
	 						data:params,
	 						complete:function(data){
	 						if(data.responseJSON && data.responseJSON.tblDomainGroup){
	 							var arr=data.responseJSON.tblDomainGroup;
	 							var groundlist=[];
	 							for(var i=0;i<arr.length;i++){
	 								groundlist.push({value:arr[i]["uuid"],text:arr[i]["nameCn"]});
	 							}
	 							createAddHtml(lid,list,li,groundlist);
	 						}
	 						
	 						
	 					}
	 					})
	 			
	 				
	 				
	    	 }
				 
	    	 }
	    	 })
	    } else{
	    	createAddHtml(lid,list);
	    }
		
		
		
	}
	function createAddHtml(lid,list,zoneList,groundlist){
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
			      +window.lc.getValue("add")
			      +'</h4>'
			      +'</div>'
			      +'<div class="modal-body">'
			      +'<form class="" role="form">';
			      html+=field.getTextField("name","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("user"));
			      html+=field.getTextField("passwordMd5","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("password"),"","password");	
			      if(window.global.getDomainUuid()==0){
			      html+=field.getComboField("roleId","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("role"),list);
			      html+='</br>'
			      }else if(window.global.getDomainUuid()>0){
			    	  html+=field.getComboField("grpUuid","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("role"),groundlist);
				      html+='</br>'  
			      }
			    	if(window.global.getDomainUuid()>0){
			    		 if(roleType.isDomainAdmin(window.user.roleId)||roleType.isSuper(window.user.roleId)){
			      
			      html+=field.getMulSelectField("siteId","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("ownSite"),zoneList);
			      html+='</br>'
			    	}
			      }
			      html+=field.getTextField("email","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("email"));
			      html+=field.getTextField("phone","",window.lc.getValue("phone"));
//			      html+=field.getTextField("mobile","",window.lc.getValue("mobile"));
			      html+=field.getTextField("address","",window.lc.getValue("addr"));
			      html+=field.getTextareaField("detailDesc","",window.lc.getValue("desc"));	
			      html+='</form>'
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
			 $(".chosen-select").chosen({width: "100%"});
			$('#myModal button[name=commit]').bind("click",function(){
				var form=$("#myModal form");
				var name=$("#myModal input[name=name]").val();				
				var pwd=$("#myModal input[name=passwordMd5]").val();
				if(!name){
					window.tip.show_pk("warning",null,window.lc.getValue("userCanNotEmpty"));
					$('#myModal input[name=name]').trigger("focus");
					return;
				}
				if(!pwd){
					window.tip.show_pk("warning",null,window.lc.getValue("pwdCantNotEmpty"));
					$('#myModal input[name=passwordMd5]').trigger("focus");
					return;
				}
				if(pwd.length<6||pwd.length>16||/.*[^\x00-\xff]+.*$/.test(pwd)){
					window.tip.show_pk("warning",null,window.lc.getValue("passWordRand"));
					$('#myModal input[name=passwordMd5]').trigger("focus");
					return;
				}

				var domainUuid=window.global.getDomainUuid();
				if(domainUuid){
					var site=$("#siteId").val();
					if(!site){
						window.tip.show_pk("warning",null,window.lc.getValue("siteCantNotEmpty"));
						$('#siteId').trigger("focus");
						return;
					}
				}
				var pa="name="+name;
				pa+="&domainUuid="+domainUuid;
				var ev=$('#myModal input[name=email]').val();
				
				if(!ev){
					window.tip.show_pk("warning",null,window.lc.getValue("emailCanNotEmpty"));
					$('#myModal input[name=email]').trigger("focus");
					return;
				}
				if(!window.validate.isEmail(ev)){
					window.tip.show_pk("warning",null,window.lc.getValue("emailNotValid"));
					$('#myModal input[name=email]').trigger("focus");
					return;
				}
				if(window.global.getDomainUuid()>0){
					var userId=$('#myModal select[name=roleId]').val();
					var siteUuid=$('#siteId').val();
				}
				$.ajax({ 
					url: "registerManager!checkUser.action",
					data:pa,
					complete: function(data,str){
					if(data.responseJSON && data.responseJSON.success){
						var params=form.formSerialize();
						
						params+="&domainUuid="+domainUuid;
						if(window.global.getDomainUuid()>0){
							var roleId=$('#myModal select[name=grpUuid]').val();
							if(roleId>11){
								roleId=9;
							}
							params+="&roleId="+roleId;
						}else{
							//如果是超级用户把组设置为0
							params+="&grpUuid=0";
						}
						$.ajax({ 
							url: "userManager!addUser.action",
							data:params,
							complete: function(data,str){
							$('#'+lid).bootstrapTable("removeAll");
							$('#'+lid).bootstrapTable("refresh");
							$('#myModal button[name=close]').trigger("click");
							if(data.responseJSON && data.responseJSON.success){
								window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
								addSite(siteUuid);
							}else{
								window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
							}
						}});
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("userIsUse"));
					}
				}});
				
			});
			
	}
	function addSite(siteUuid){
		var params={};
		var siteId;
		params.domainUuid=window.global.getDomainUuid();
		for(var i=0;i<siteUuid.length;i++){
			if(i==0){
				siteId=siteUuid[i];
			}else{
				siteId=siteId+","+siteUuid[i];
			}
		}
		params.siteId=siteId;
		$.ajax({
			url:'userSiteManger!addUserSite.action',
		    type:'post',
		    data:params,
		    complete:function(data){
			
		}
		})
		
	}
	function createSetHtml(uuid,lid,row){
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
		      +window.lc.getValue("set")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">';	      
		      html+=field.getTextField("email",row.email,'<font color="red">*</font>&nbsp;'+window.lc.getValue("email"));
		      html+=field.getTextField("phone",row.phone,window.lc.getValue("phone"));
		      html+=field.getTextField("address",row.address,window.lc.getValue("addr"));
		      html+=field.getTextareaField("detailDesc",row.detailDesc,window.lc.getValue("desc"));	
		      html+='</form>'
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
		
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var ev=$('#myModal input[name=email]').val();
			if(!ev){
				window.tip.show_pk("warning",null,window.lc.getValue("emailCanNotEmpty"));
				$('#myModal input[name=email]').trigger("focus");
				return;
			}
			if(!window.validate.isEmail(ev)){
				window.tip.show_pk("warning",null,window.lc.getValue("emailNotValid"));
				$('#myModal input[name=email]').trigger("focus");
				return;
			}
			var domainUuid=window.global.getDomainUuid();		
			var params=form.formSerialize();
			params+="&uuid="+uuid;
			params+="&domainUuid="+domainUuid;
			$.ajax({ 
				url: "userManager!updateUser.action",
				data:params,
				complete: function(data,str){
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("setSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
				}
			}});
			
		});
		
	}
	function createSet(lid,rows){
		var domainUuid=window.global.getDomainUuid();
		var user=window.user;
//		if(!domainUuid ) return;
		params={};
//		params+="&domainUuid="+domainUuid;
		
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(rows.length>1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}		
		
		createSetHtml(rows[0]["uuid"],lid,rows[0]);	
	}
	function restorePwd(lid,rows){
		var domainUuid=window.global.getDomainUuid();
		var user=window.user;
//		if(!domainUuid ) return;
		params={};
//		params+="&domainUuid="+domainUuid;
		
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(rows.length>1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}		
		params.domainUuid=domainUuid;
		params.uuid=rows[0]["uuid"];
		params.name=rows[0]["name"];
		$.ajax({ 
			url: "userManager!resetUserPwd.action",
			data:params,
			type:"POST",
			complete: function(data,str){
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					$('#'+lid).bootstrapTable("removeAll");
					$('#'+lid).bootstrapTable("refresh");
					window.tip.show_pk("success",null,window.lc.getValue("setSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
				}
		}});
			
	}
	function setPwd(lid,rows){
		var domainUuid=window.global.getDomainUuid();		
//		if(!domainUuid) return;
		params={};
//		params+="&domainUuid="+domainUuid;
		
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(rows.length>1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}		
		var uuid=rows[0]["uuid"];
		  require(['change-pwd'],function(cp){
			  cp.createPanel(domainUuid,uuid,lid);
		  });
			
	}
	function delDev(lid,rows){
		var domainUuid=rows[0].domainUuid;
//		var user=window.user;
//		if(!domainUuid) return;
		params={};
//		params+="&domainUuid="+domainUuid;
		
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		 var ids="";
         var name = "";
         for ( var i = 0; i < rows.length; i++) {
  			if(window.roleType.isSuperAdmin(rows[i]["roleId"])){
 				window.tip.show_pk("warning",null,window.lc.getValue("superAdminCanNotDel"));
 				return;
 			}
  			if(rows[i].uuid==window.user.uuid){
 				window.tip.show_pk("warning",null,window.lc.getValue("canNotDelYourself"));
 				return;
 			}
  			
              if(i==0){
                  ids=rows[i]["uuid"];
                  name = rows[i]["name"];
              }else {
                  ids=ids+"-"+rows[i]["uuid"];
              }
          }
 		params.domainUuid=domainUuid;
		params.ids=ids;
		params.name=name;
         var cnt=0,tc=0;
//         var data=$('#'+lid).bootstrapTable('getData');
//         for ( var i = 0; i < data.length; i++) {
//  			if(data[i].domainUuid==rows[0].domainUuid && window.roleType.isDomainAdmin(data[i].roleId)){
// 				tc++;
// 			}
//         }
         for ( var i = 0; i < rows.length; i++) {
  			if(window.roleType.isDomainAdmin(rows[i].roleId)){
  				cnt++;
  			}
         }
         if(cnt>0){
	         $.ajax({ 
	 			url: "userManager!countDomainAdmin.action",
	 			data:{dstDomainUuid:domainUuid},
	 			type:"POST",
	 			complete: function(data,str){
	 				tc=data.responseJSON.cnt;
			         if(cnt>=tc){
						window.tip.show_pk("warning",null,window.lc.getValue("needOneDomainAdmin"));
						return;
			         }
			         sendDel(rows,lid,params);
	 		}});
         }else{
        	 sendDel(rows,lid,params);
         }
         
	}
	function sendDel(rows,lid,params){
		$.ajax({ 
			url: "userManager!deleteUser.action",
			data:params,
			type:"POST",
			complete: function(data,str){
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.list.delRefresh(lid,rows);
					window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
				}
		}});
	}
	function createAdd(lid){
		var pa={};
		var rt=window.roleType;
		var user=window.user;
		var dstDomainUuid=window.global.getDomainUuid();
		pa.domainUuid=dstDomainUuid;
		if(rt.isSuper(user.roleId)){
			if(dstDomainUuid>0){
				var tmp = rt.getDomainAdmin();
				pa.roleId=tmp;
			}else{
				pa.roleId=user.roleId;
			}
		}else{
			pa.roleId=user.roleId;
		}
		
		$.ajax({ 
			url: "roleManager!getList3.action",
			data:pa,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.roleList){
				var arr=data.responseJSON.roleList;
				var list=[];
				for(var i=0;i<arr.length;i++){
					list.push({value:arr[i]["roleId"],text:arr[i]["name"]});
				}
				createAddHtmlList(lid,list);
			}
		}});
		
	}
	function createApi(row,fid){
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
		      +'API'
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">';
		 	  html+=field.getSwitch("apiEnabled","","",1);
//		      html+=field.getCheckboxField("apiEnabled","","API",[{value:1,text:"启用"}]);
		 	  html+='<div id="api_body">';
		      html+=field.getTextField("maxTimeoutSec","",window.lc.getValue("maxTimeout")+"("+window.lc.getValue("secs")+")");
		      html+=field.getComboField("apiAuthType","",window.lc.getValue("authType"),[{value:0,text:"NULL"},{value:1,text:"MD5"}]);
		      html+=field.getTextField("apiAuthPwd","",window.lc.getValue("authPwd"));
		      html+=field.getTextField("maxReqPerMin","",window.lc.getValue("maxReqPerMin"));
//		      html+=field.getComboField("apiAuthType","","认证类型",[{value:0,text:"无"},{value:1,text:"MD5"}]);
		      html+=field.getCheckboxField("apiAclFlag","","API ACL",[{value:1,text:window.lc.getValue("enable")}]);
		      html+=field.getTextField("validIpAddr","",window.lc.getValue("ip1"));
		      html+=field.getTextField("validIpAddr2","",window.lc.getValue("ip2"));
		      html+=field.getTextField("validIpAddr3","",window.lc.getValue("ip3"));
		      html+=field.getCheckboxField("apiTrapFlag","",window.lc.getValue("pushSetting"),[{value:1,text:window.lc.getValue("enable")}]);
		      html+=field.getTextField("trapIpAddr","",window.lc.getValue("pushIp"));
		      html+=field.getTextField("trapPortNo","",window.lc.getValue("pushPort"));
		      html+='</div>';
		      html+='</form>'
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
		$("#api_body").css("display","none");
		$('#myModal form input[name=apiEnabled]').bind("click",function(){
			var n=$(this);
			var n=$('#myModal form input[name=apiEnabled]:checked');
			if(n.length){
				$("#api_body").css("display","block");
			}else{
				$("#api_body").css("display","none");
			}
		});
		$('#myModal form').autofill(row);
		if(row["apiEnabled"]){
			$("#api_body").css("display","block");
		}else{
			$("#api_body").css("display","none");
		}
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var domainUuid=row["domainUuid"];		
			var params=form.formSerialize();
			params+="&ids="+row["uuid"];
			params+="&name="+row["name"];
			params+="&domainUuid="+domainUuid;
			$.ajax({ 
				url: "userManager!updateUserAPI.action",
				data:params,
				complete: function(data,str){
				$('#myModal button[name=close]').trigger("click");
				$("#"+fid+" button[name=refresh]").trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
			
		});

		
	}
	function createSiteList(pid,row){
		 pn=$("#"+pid);
		    if(!pn){
		      return;
		    }
		    var id=pid+"_site_list";
		    pn.html("");
		    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
		    
//		    if(domainUuid){
		    
		    html+='<button id="'+id+'-back"  name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
		    if(roleType.isDomainAdmin(window.user.roleId) || roleType.isSuper(window.user.roleId)){
		    		if(!roleType.isDomainAdmin(row.roleId))
		    		html+='<button id="'+id+'-del" type="submit" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove"></i>'+window.lc.getValue("del")+'</button>';
		    }
//		        +'<button id="'+lid+'-del" class="btn btn-link">删除</button>'
//		        +'<button id="'+lid+'-set" class="btn btn-link">修改</button>'
//		        +'<button id="'+lid+'-restore" class="btn btn-link">重置密码</button>'
//		        +'<button id="'+lid+'-set-pwd" class="btn btn-link">修改密码</button>';
//		    }
		    html+='</div>';	
//		    var html='';
		    html+='<table id='+id+'></table>';
		    pn.append(html);
		    $('#'+id).bootstrapTable({
				method: 'get',
				url: "userSiteManger!getUserSiteList.action",
				cache: false,
//				height: 500,
				responseHandler:function(res){
				var obj={};
				
				if(res && res.tblUserSite){	
					
					
					obj["rows"]=res.tblUserSite;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
				queryParams:function(p){
				
					var params={};
		            params.domainUuid=row.domainUuid;
		            params.userId=row.uuid;
					params["limit"]=p.limit;
					params["start"]=p.offset;
					params.roleId=row.roleId;
					
					 
					if(p.search){
					params["search"]=p.search;
					}
					return params;
				},
				striped: true,
				toolbar:"#"+id+"-toolbar",
				pagination: true,
				pageSize: 5,
//				pageNumber:1,
				sidePagination: "server",
				pageList: [5,10,20,50,100],
				search:false,
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
			        
			      },{
						field: 'siteName',
						title: window.lc.getValue("site"),
						align: 'center',
						valign: 'middle',
						
						
					},{
					field: 'createTime',
					title: window.lc.getValue("time"),
					align: 'center',
					valign: 'middle',
					formatter:function(value,row,index){
						return window.format.timeStaticFormat(value);
		        	},	
					
				}]
			});
		    $("#"+id+"-back").click(function(){
		    	
		    	$("#user_manage").click();
		    })
		    $("#"+id+"-del").click(function(){
		    	var params={};
		    	 var rows=$('#'+id).bootstrapTable('getSelections');
				 if(rows.length==0){
						window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
						return;
					}
				 for(var i=0;i<rows.length;i++){
					 if(i==0){
						var siteId=rows[i].siteUuid;
						var domainUuid=rows[i].domainUuid;
						var userId=rows[i].userUuid;
					 }else{
						siteId=siteId+","+rows[i].siteUuid;
					 }
				 }
				 params.siteId=siteId;
				 params.domainUuid=domainUuid;
				 params.userId=userId;
				 $.ajax({
					 url:'userSiteManger!deleteUserSite.action',
					 typr:'post',
					 data:params,
					 complete:function(data){
					 if(data.responseJSON&&data.responseJSON.success){
							window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
							$("#user_list button[name=refresh]" ).click();
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("delFail")); 
					 }
					 
				 }
						 
				 })
		    	
		    })
		    $('#'+id).on('post-body.bs.table', function () {
				$('#'+id+' [data-rel=tooltip]').tooltip();
				window.list.changeForAce(pid);
			})
			$(window).resize(function () {
				window.list.changeView(pid,id,600);
			});
		    window.list.changeView(pid,id,600);
		    $("#user_list button[name=refresh]").addClass("btn-info btn-sm");
			 $("#user_list button[name=toggle]").addClass("btn-info btn-sm");
			 $("#user_list button[data-toggle=dropdown]").addClass("btn-info btn-sm");
	}
function addSiteList(row){
		var params={};
	params.domainUuid=window.global.getDomainUuid();
   	 params.types='site';
   	 $.ajax({ 
			url: "getCombox.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.comboxList){
				var siteList=data.responseJSON.comboxList;
				var li=[];
				for(var i=0;i<siteList.length;i++){
					var item=siteList[i];
					if(item.type=="site"){
						var obj={text:item.name,value:item.uuid};
						li.push(obj);
					}
				}
				
				createAddSiteList(row,li);
   	 }
			 
   	 }
   	 })
		
		
	}
	function createAddSiteList(row,li){
		var params={};
        params.domainUuid=row.domainUuid;
        params.userId=row.uuid;
		params.roleId=row.roleId;
		 $.ajax({
			url: "userSiteManger!getUserSiteList.action",
			type:'post',
			data:params,
			complete:function(data){
			 if(data.responseJSON && data.responseJSON.tblUserSite){
				 var list=[];
				 var arr=data.responseJSON.tblUserSite;
				 for(var i=0;i<arr.length;i++){
					 list.push({value:arr[i]["siteUuid"],text:arr[i]["siteName"]})
				 }
				 createAddSiteHtmlList(row,li,list,arr);
			 } else{
				 createAddSiteHtmlList(row,li); 
			 }
		 }
		 })
	}
	function createAddSiteHtmlList(row,li,list,arr){
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
		      +window.lc.getValue("addSite")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">';
//		    if(list!=undefined){
//		      html+=field.getMulSelectField("siteId1","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("oldSite"),list);	
//		    }
		      html+=field.getMulSelectField("siteId","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("ownSite"),li);
		      html+='</form>'
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
		// $(".chosen-select").chosen({width: "100%"});
		 if(list!=undefined){
		 var siteArr =new Array(arr.length)
		 for(var i=0;i<arr.length;i++){
			 siteArr[i]=arr[i].siteUuid
		 }
		 $('#siteId').val(siteArr).trigger('chosen:updated');
//			$('#siteId').attr("disabled","disabled");
		 }
			  $(".chosen-select").chosen({width: "100%"}); 
		 $('#myModal button[name=commit]').bind("click",function(){
			 var params={};
			 var siteUuid=$("#siteId").val();
			
			 for(var i=0;i<siteUuid.length;i++){
					if(i==0){
						siteId=siteUuid[i];
					}else{
						siteId=siteId+","+siteUuid[i];
					}
				}
			 params.userId=row.uuid;
			 params.domainUuid=window.global.getDomainUuid();
			 params.siteId=siteId;
			 $.ajax({
				 url:'userSiteManger!updateUserSite.action',
				 type:'post',
				 data:params,
				 complete:function(data){
				 $('#myModal button[name=close]').trigger("click");
				 if(data.responseJSON&&data.responseJSON.success){
						window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("commitFail")); 
				 }
			 }
			 })
			 
		 });

	}
	function createPerHtmlList(row,pid){
		
		n=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    lan.initEvent();
	    var c = lan.getCookie("userLan");
	
	    var name="";
	    if(c==1){
	    	 name="nameCn";
	    }else{
	    	name="nameEn";
	    }
	    var id=pid+"_site_list";
	    pn.html("");
	    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    html+='<button id="'+id+'-back"  name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
	    html+='</div>';	
	    html+='<table id='+id+'></table>';
	    pn.append(html);
	    $('#'+id).bootstrapTable({
			method: 'get',
			url: "privilegeNewManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
			var obj={};
			
			if(res && res.tblOperateNew){	
				
				
				obj["rows"]=res.tblOperateNew;
				obj.total=res["total"];
			}else{
				obj["rows"]=[];
				obj.total=0;
			}
			return obj;
		},
			queryParams:function(p){
			
				var params={};
				
	            params.domainUuid=window.global.getDomainUuid();
				
				params["limit"]=p.limit;
				params["start"]=p.offset;
				params.groupUuid=row.grpUuid;
				params.userId=window.user.uuid;
				 
				if(p.search){
				params["search"]=p.search;
				}
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [10,20,50,100],
			search:true,
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
				field: name,
				title: window.lc.getValue("buttonName"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'createTime',
				title: window.lc.getValue("time"),
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
					return window.format.timeStaticFormat(value);
	        	},	
				
			}]
		});
	    $("#"+id+"-back").click(function(){
	    	window.tabAfterShow("#"+pid);
	    })
	    $("#"+id+"-del").click(function(){
	    	var params={};
	    	 var rows=$('#'+id).bootstrapTable('getSelections');
			 if(rows.length==0){
					window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
					return;
				}
			 for(var i=0;i<rows.length;i++){
				 if(i==0){
					var siteId=rows[i].siteUuid;
					var domainUuid=rows[i].domainUuid;
					var userId=rows[i].userUuid;
				 }else{
					siteId=siteId+","+rows[i].siteUuid;
				 }
			 }
			 params.siteId=siteId;
			 params.domainUuid=domainUuid;
			 params.userId=userId;
			 $.ajax({
				 url:'userSiteManger!deleteUserSite.action',
				 typr:'post',
				 data:params,
				 complete:function(data){
				 if(data.responseJSON&&data.responseJSON.success){
						window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
						$("#user_list button[name=refresh]" ).click();
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("delFail")); 
				 }
				 
			 }
					 
			 })
	    	
	    })
	    $('#'+id).on('post-body.bs.table', function () {
			$('#'+id+' [data-rel=tooltip]').tooltip();
			window.list.changeForAce(pid);
		})
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	    $("#user_list button[name=refresh]").addClass("btn-info btn-sm");
		 $("#user_list button[name=toggle]").addClass("btn-info btn-sm");
		 $("#user_list button[data-toggle=dropdown]").addClass("btn-info btn-sm");
	  
	}
  function	createGroudHtmlList(row,pid){
	  if(window.global.getDomainUuid()>0){
		  var params={};
		  params.domainUuid=window.global.getDomainUuid();
		  $.ajax({
				url:'domainGrpManager!getList.action',
				type:'post',
				data:params,
				complete:function(data){
				if(data.responseJSON && data.responseJSON.tblDomainGroup){
					var arr=data.responseJSON.tblDomainGroup;
					var groundlist=[];
					for(var i=0;i<arr.length;i++){
						if(arr[i]["nameCn"]=="域编辑者"){
						 arr[i]["nameCn"]="role_domain_editor";
						}else if(arr[i]["nameCn"]=="域操作者"){
							arr[i]["nameCn"]="role_domain_operator";
						}else if(arr[i]["nameCn"]=="域观察者"){
							arr[i]["nameCn"]="role_domain_viewer";
							
						}
						groundlist.push({value:arr[i]["uuid"],text:arr[i]["nameCn"]});
					}
					createsetGroudHtml(row,pid,groundlist);
				     }
				
				
			     }
			})
	  }
  }
  function createsetGroudHtml(row,pid,groundlist){
	  var pn=$("#myModal");
		if(!pn) return;
	  html='<div class="modal-dialog">'
	      +'<div class="modal-content">'
	      +'<div class="modal-header">'
	      +'<button type="button" class="close" '
	      +'data-dismiss="modal" aria-hidden="true">'
	      +'&times;'
	      +'</button>'
	      +'<h4 class="modal-title" id="myModalLabel">'
	      +window.lc.getValue("setGroud")
	      +'</h4>'
	      +'</div>'
	      +'<div class="modal-body">'
	      +'<form class="" role="form">'
//	      html+=field.getTextField("groudId","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("role"));	
	      html+=field.getComboField("roleId","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("role"),groundlist);
	      html+='</form>'
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
	$('#myModal select[name=roleId]').val(row.grpUuid);
//	$('#myModal input[name=groudId]').attr("disabled","disabled");
	$('#myModal').modal().css({
	    width: 'auto',
	    backdrop:false,
	});
	$('#myModal button[name=commit]').bind("click",function(){
		 var params={};
		 var grpUuid= $('#myModal select[name=roleId]').val();
		 params.userUuid=row.uuid;
		 params.grpUuid=grpUuid;
		 params.domainUuid=window.global.getDomainUuid();
		 if(grpUuid>6){
			 params.roleId=10; 
		 }else {
		 params.roleId=grpUuid;
		 }
		 $.ajax({
			 url:'userListManager!updateUserList.action',
			 type:'post',
			 data:params,
			 complete:function(data){
			 
			 $('#myModal button[name=close]').trigger("click");
			 if(data.responseJSON&&data.responseJSON.success){
				 $("#user_list button[name=refresh]" ).click();
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail")); 
			 }
		 }
		 })
		
	})
	  
  }
  return{
	  createAdd:createAdd,
	  createAddHtml:createAddHtml,
	  delDev:delDev,
	  restorePwd:restorePwd,
	  setPwd:setPwd,
	  createSet:createSet,
	  createSetHtml:createSetHtml,
	  createApi:createApi,
	  createAddHtmlList:createAddHtmlList,
	  createSiteList:createSiteList,
	  addSiteList:addSiteList,
	  createPerHtmlList:createPerHtmlList,
	  createGroudHtmlList:createGroudHtmlList,
  }
})