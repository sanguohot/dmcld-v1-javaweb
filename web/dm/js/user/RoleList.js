define(["bootstrap-table","form-field"],function (bt,field){
	var view=function (e, value, row, index) {
		if(procPrivilegeEdit(window.user.roleId,row.roleId,row)){
	     createModelHtml(row);  
		}else{
			window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
		}
	      
	};
	function procPrivilegeEdit(srcRoleId,dstRoleId,row){
		var flag = 1;
		if(dstRoleId == srcRoleId){
			//不允许同级配置
			flag = 0;
		}else if(roleType.isDomainAdmin(srcRoleId)){
			//域管理员只开放一些用户的配置
			if(roleType.isDomainUserDef(dstRoleId)){
				flag = 1;
			}else{
				flag = 0;
			}
		}else if(roleType.isSuperAdmin(dstRoleId)){
			flag = 0;
		}else if(roleType.isDomainAdmin(dstRoleId)){
			if(roleType.isSuper(srcRoleId)){
				if(row.rightSuperEdit != 1){
					flag = 0;
				}else{
					flag = 1;
				}
			}else if(roleType.isDomainAdmin(srcRoleId)){
				if(row.rightDomainEdit != 1){
					flag = 0;
				}else{
					flag = 1;
				}
			}else{
				flag = 0;
			}
		}else if(roleType.isSuperFinance(dstRoleId)){
			if(roleType.isSuperAdmin(srcRoleId)
					&& row.rightSuperEdit==1){
				flag = 1;
			}else{
				flag = 0;
			}
		}else if(roleType.isSuper(dstRoleId)){
			if(!roleType.isSuper(srcRoleId)){
				flag = 0;
			}else if(row.rightSuperEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}else if(roleType.isDomainUserDefault(dstRoleId)){
			if(!roleType.isSuper(srcRoleId)){
				flag = 0;
			}else if(row.rightSuperEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}else{
			if(row.rightDomainEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}
		return flag;
	}
	function  createModelHtml(row){
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
		      +'<form class="" role="form">'
		      +'<div class="row">'
		      +'<div class="col-md-12" >';
		     html+=field.getCheckboxField("adminStatus","",window.lc.getValue("adminStatus")
				,[{value:1,id:"rightSuperEdit",text:window.lc.getValue("rightSuperEdit")},{value:1,id:"rightSuperAction",text:window.lc.getValue("rightSuperAction")},
				  {value:1,id:"rightDomainEdit",text:window.lc.getValue("rightDomainEdit")},{value:1,id:"rightDomainAction",text:window.lc.getValue("rightDomainAction")}]);
		      html+='</div>'			  
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
	     var checkBox=document.getElementsByName("adminStatus");
	     if(row.rightSuperEdit==1){
	    	 checkBox[0].checked=true;
	     }
	     if(row.rightSuperAction==1){
	    	 checkBox[1].checked=true;
	     }
	     if(row.rightDomainEdit==1){
	    	 checkBox[2].checked=true;
	     }
	     if(row.rightDomainAction==1){
	    	 checkBox[3].checked=true;
	     }
		$('#myModal button[name=commit]').click(function(){
			var params={};
			 var checkBox=document.getElementsByName("adminStatus");
			 if(checkBox[0].checked){
				 params.rightSuperEdit=1
			 }else{
				 params.rightSuperEdit=0; 
			 }
			 if(checkBox[1].checked){
				 params.rightSuperAction=1
			 }else{
				 params.rightSuperAction=0; 
			 }
			 if(checkBox[2].checked){
				 params.rightDomainEdit=1
			 }else{
				 params.rightDomainEdit=0; 
			 }
			 if(checkBox[3].checked){
				 params.rightDomainAction=1
			 }else{
				 params.rightDomainAction=0; 
			 }
			 $.ajax({
				 url:'privilegeManager!update.action',
				 type:'post',
				 data:params,
				 complete:function(data){
				 if(data.responseJSON){
					 $('#myModal button[name=close]').trigger("click");
			    		$('#role_list button[name=refresh]').click();
					 window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				 }else{
					 window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				 }
			 }
			 });
		})
	}
	window.operateEvents7 = {
	        'click a[action=view]':view,
	       
	    };
	function createList(pid){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    pn.html("");
	    var cid=pid+"_list";
	    var html='<table id='+cid+'></table>';
	    pn.append(html);
		
		var url="roleManager!getList2.action";
	    
         if(window.roleType.isDomainAdmin(window.user.roleId)){
        	 var disVisiable=true;
         }else {
        	 var disVisiable=false;
         }
		$('#'+cid).bootstrapTable({
			method: 'get',
			url: url,
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.roleList2){
//					var obj={};
//					obj["rows"]=res.roleList2;
//					obj.total=res["total"];
//					return obj;
					return res.roleList2;
				}
				return res;
			},
			queryParams:function(p){
				var params="";
				params+="&domainUuid="+window.global.getDomainUuid();
//				params+="&limit="+p.limit;
//				params+="&start="+p.offset;
				var roleId=0;
				if(window.global.getDomainUuid()>0){
					roleId=window.roleType.getDomainAdmin();
				}
				params+="&roleId="+roleId;
				return params;
			},
			
			striped: true,
			toolbar:"#"+cid+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
//			sidePagination: "server",
//			pageList: [10,25],
			search: true,
			showColumns: true,
			showRefresh: true,
//			queryParamsType:'limit',
//			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [{
				field: 'name',
				title: window.lc.getValue("role"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'rightSpecialFinance',
				title: window.lc.getValue("rightSpecialFinance"),
				align: 'center',
				valign: 'middle',	
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleConfiguration',
				title: window.lc.getValue("rightModuleConfiguration"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }			
			},{
				field: 'rightModulePerformance',
				title: window.lc.getValue("rightModulePerformance"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleLog',
				title: window.lc.getValue("rightModuleLog"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleVersion',
				title: window.lc.getValue("rightModuleVersion"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleProvision',
				title: window.lc.getValue("rightModuleProvision"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleSystem',
				title: window.lc.getValue("rightModuleSystem"),
				align: 'center',
				valign: 'middle',	
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleLicense',
				title: window.lc.getValue("rightModuleLicense"),
				align: 'center',
				valign: 'middle',	
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModulePrivilege',
				title: window.lc.getValue("rightModulePrivilege"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightModuleBatch',
				title: window.lc.getValue("rightModuleBatch"),
				align: 'center',
				valign: 'middle',	
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightSuperRead',
				title: window.lc.getValue("rightSuperRead"),
				align: 'center',
				valign: 'middle',	
				
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightSuperEdit',
				title: window.lc.getValue("rightSuperEdit"),
				align: 'center',
				valign: 'middle',				
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightSuperAction',
				title: window.lc.getValue("rightSuperAction"),
				align: 'center',
				valign: 'middle',				
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightDomainRead',
				title: window.lc.getValue("rightDomainRead"),
				align: 'center',
				valign: 'middle',
				
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightDomainEdit',
				title: window.lc.getValue("rightDomainEdit"),
				align: 'center',
				valign: 'middle',				
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightDomainAction',
				title: window.lc.getValue("rightDomainAction"),
				align: 'center',
				valign: 'middle',				
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightDeviceAction',
				title: window.lc.getValue("rightDeviceAction"),
				align: 'center',
				valign: 'middle',
				visible:false,
		        formatter:function(value,row,index){
				return window.format.getPrivilegeImg(value);
		    }
			},{
				field: 'rightSimAction',
				title: window.lc.getValue("rightSimAction"),
				align: 'center',
				valign: 'middle',	
				visible:false,
		        formatter:function(value,row,index){
					return window.format.getPrivilegeImg(value);
			    }
			},{
				field: 'rightApiAction',
				title: window.lc.getValue("rightApiAction"),
				align: 'center',
				valign: 'middle',	
				visible:false,
		        formatter:function(value,row,index){
					return window.format.getPrivilegeImg(value);
			    }
			},{
				field:'',
				title:window.lc.getValue("operate"),
				align:'center',
				valign:'middle',
				clickToSelect: true,
				visible:false,
		       //  visible:disVisiable,
				 formatter:function(value,row,index){
				var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
					var view='<a action="view" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
						+'<i class="fa fa-pencil bigger-130"></i>'
						+'</a>';
				    
					html+=view
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
						      +'<li>'+view+'</li>'
						     
						    tmp+='</ul>'
						  +'</div>'
						+'</div>';
					tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
					html+=tmp;
	           
	          
		    	  return html;
	          },
			 events:operateEvents7
			}],
			onClickRow: function (row) {
//				if(row){
//					var uuid=row.uuid;
//					var domainUuid=row.domainUuid;
//					var params={neUuid:uuid,dstDomainUuid:domainUuid};
//					require(["dev-panel"], function (panel){
//						panel.loadRemoteData(pid,pid+"_form",params);
//					});
//				}
            }
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,cid,600);
		});
		window.list.changeView(pid,cid,600);
	}
    return {
    	createList:createList,
    	createModelHtml:createModelHtml,
    	procPrivilegeEdit:procPrivilegeEdit,
    };
});


