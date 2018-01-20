Ext.define("app.view.privilege.Privilege", {
	roleObj:null,
	superNodeList:null,
	domainNodeList:null,
	initPrivilege:function(){
		if(!this.roleObj){
			
			this.roleObj = Ext.get('roleObj').value;
		}
		if(!this.superNodeList){
			this.createSuperNodeList();
		} 
		if(!this.domainNodeList){
			this.createDomainNodeList();
		}
	},
	procRoleEdit:function(srcRoleId,dstRoleId,dstType){
		var flag = 1;
		if(dstRoleId == srcRoleId){
			flag = 0;
		}else if(roleType.isSuperAdmin(dstRoleId)){
			flag = 0;
		}else if(roleType.isDomainAdmin(dstRoleId)){
			if(roleType.isSuper(srcRoleId)){
				flag = 0;
			}else if(roleType.isDomainAdmin(srcRoleId)){
				if(dstType == 1){
					flag = 0;
				}else{
					if(this.roleObj.rightDomainEdit != 1){
						flag = 0;
					}else{
						flag = 1;
					}					
				}
			}else{
				flag = 0;
			}
		}else if(roleType.isSuper(dstRoleId)){
			if(!roleType.isSuper(srcRoleId)){
				flag = 0;
			}else if(this.roleObj.rightSuperEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
//		}else if(roleType.isDomainUser(dstRoleId)){
//			if(roleType.isSuper(srcRoleId)){
//				if(this.roleObj.rightSuperEdit == 1){
//					flag = 1;
//				}else{
//					flag = 0;
//				}
//			}else if(roleType.isDomainAdmin(srcRoleId)){
//				if(this.roleObj.rightDomainEdit == 1){
//					flag = 1;
//				}else{
//					flag = 0;
//				}
//			}else{
//				flag = 0;
//			}
		}else{
			if(this.roleObj.rightDomainEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}
		return flag;
	},
	procPrivilegeEdit:function(srcRoleId,dstRoleId){
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
				if(this.roleObj.rightSuperEdit != 1){
					flag = 0;
				}else{
					flag = 1;
				}
			}else if(roleType.isDomainAdmin(srcRoleId)){
				if(this.roleObj.rightDomainEdit != 1){
					flag = 0;
				}else{
					flag = 1;
				}
			}else{
				flag = 0;
			}
		}else if(roleType.isSuperFinance(dstRoleId)){
			if(roleType.isSuperAdmin(srcRoleId)
					&& this.roleObj.rightSuperEdit==1){
				flag = 1;
			}else{
				flag = 0;
			}
		}else if(roleType.isSuper(dstRoleId)){
			if(!roleType.isSuper(srcRoleId)){
				flag = 0;
			}else if(this.roleObj.rightSuperEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}else if(roleType.isDomainUserDefault(dstRoleId)){
			if(!roleType.isSuper(srcRoleId)){
				flag = 0;
			}else if(this.roleObj.rightSuperEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}else{
			if(this.roleObj.rightDomainEdit != 1){
				flag = 0;
			}else{
				flag = 1;
			}
		}
		return flag;
	},
	procModule:function(module){
		var right = null;
		var flag = 0;
		if(module=="configuration"){
			right = this.roleObj.rightModuleConfiguration;
		}else if(module=="maintenance"){
			right = this.roleObj.rightModuleMaintenance;
		}else if(module=="performance"){
			right = this.roleObj.rightModulePerformance;
		}else if(module=="log"){
			right = this.roleObj.rightModuleLog;
		}else if(module=="version"){
			right = this.roleObj.rightModuleVersion;
		}else if(module=="provision"){
			right = this.roleObj.rightModuleProvision;
		}else if(module=="system"){
			right = this.roleObj.rightModuleSystem;
		}else if(module=="license"){
			right = this.roleObj.rightModuleLicense;
		}else if(module=="privilege"){
			right = this.roleObj.rightModulePrivilege;
		}else if(module=='batch'){
			right = this.roleObj.rightModuleBatch;
		}
		if(right!=null && right!=1){
			flag = 1;
			Ext.MessageBox.alert(boxForbidden,boxNoRight);
		}
		return flag;
	},
	procSuperEdit:function(panel){
		if(this.roleObj.rightSuperEdit!=1){
			this.procPrivilege(panel);
		}
	},
	procDomainEdit:function(panel){
		if(this.roleObj.rightDomainEdit!=1){
			this.procPrivilege(panel);
		}
	},
	procPrivilege:function(panel){
		var buttons = panel.query("button");
		for(var i=0;i<buttons.length;i++){
//			alert(panel.query("button")[i].iconCls);
			var button = buttons[i];
			var iconCls = button.iconCls;
			var flag = button.flag;
//			alert(iconCls+'----'+roleType.isSuperFinance(this.roleObj.roleId))
//			alert(button.+":fuck:"+this.roleObj.rightSpecialFinance+"----"+button.isDisabled())
			if(flag && button.isVisible(true)){
				if(flag=="super_read" && this.roleObj.rightSuperRead!=1){
					if(roleType.isDomainAdmin(this.roleObj.roleId)){
						if(this.roleObj.rightDomainRead!=1){
							button.setVisible(false);
							if(button.nextSibling('tbseparator')){
								button.nextSibling('tbseparator').setVisible(false);
							}
						}
					}else{
						button.setVisible(false);
						if(button.nextSibling('tbseparator')){
							button.nextSibling('tbseparator').setVisible(false);
						}
					}
				}else if(flag=="super_edit" && this.roleObj.rightSuperEdit!=1){					
					if(roleType.isDomainAdmin(this.roleObj.roleId)){
						if(this.roleObj.rightDomainEdit!=1){
							button.setVisible(false);
							if(button.nextSibling('tbseparator')){
								button.nextSibling('tbseparator').setVisible(false);
							}
						}
					}else{
						button.setVisible(false);
						if(button.nextSibling('tbseparator')){
							button.nextSibling('tbseparator').setVisible(false);
						}
					}
				}else if(flag=="super_action" && this.roleObj.rightSuperAction!=1){
					if(roleType.isDomainAdmin(this.roleObj.roleId)){
						if(this.roleObj.rightDomainAction!=1){
							button.setVisible(false);
							if(button.nextSibling('tbseparator')){
								button.nextSibling('tbseparator').setVisible(false);
							}
						}
					}else{
						button.setVisible(false);
						if(button.nextSibling('tbseparator')){
							button.nextSibling('tbseparator').setVisible(false);
						}
					}
				}else if(flag=="domain_read" && this.roleObj.rightDomainRead!=1){
					button.setVisible(false);
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
				}else if(flag=="domain_edit" && this.roleObj.rightDomainEdit!=1){
					button.setVisible(false);
					console.log('domain_edit')
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
				}else if(flag=="domain_action" && this.roleObj.rightDomainAction!=1){
					button.setVisible(false);
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
				}else if(flag=="sim_action" && this.roleObj.rightSimAction!=1){
					button.setVisible(false);
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
				}else if(flag=="device_action" && this.roleObj.rightDeviceAction!=1){
					button.setVisible(false);
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
				}else if(flag=="api_action" && this.roleObj.rightApiAction!=1){
					button.setVisible(false);
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
				}else if(flag=="other"){
//					alert(this.roleObj.rightDomainAction+"---"+this.roleObj.rightDomainEdit)
					if(this.roleObj.rightDomainAction!=1
							&& this.roleObj.rightDomainEdit!=1
							&& iconCls=="option")
					button.setVisible(false);
					if(button.nextSibling('tbseparator')){
						button.nextSibling('tbseparator').setVisible(false);
					}
					
				}else if(flag=="super_finance"){
					if(!roleType.isSuperFinance(this.roleObj.roleId) && !roleType.isSuperAdmin(this.roleObj.roleId)){
						button.setVisible(false);
						if(button.nextSibling('tbseparator')){
							button.nextSibling('tbseparator').setVisible(false);
						}
					}else if(this.roleObj.rightSpecialFinance!=1){
						button.setVisible(false);
						if(button.nextSibling('tbseparator')){
							button.nextSibling('tbseparator').setVisible(false);
						}
					}
				}
			}
		}	
	},
	procLogRead:function(){
		var flag = 0;
		var roleId = this.roleObj.roleId;
		if(roleType.isSuper(roleId)){
			if(this.roleObj.rightSuperRead!=1){
				flag = 1;
			}
		}else{
			if(this.roleObj.rightDomainRead!=1){
				flag = 1;
			}
		}
		return flag;
	},
	procPrivilegeRead:function(record
				,operationPanel
				,name
				,parentNode
				,size,treeFn){
		var flag = 0;		
		if(this.roleObj.rightSuperRead!=1){
			if(this.isSuperNode(record)){
				if(roleType.isDomainAdmin(this.roleObj.roleId)){
					if(this.roleObj.rightDomainRead!=1){
						flag = 1;
					}
				}else{
					flag = 1;
				}
				if(flag)
				treeFn.FORBIDDEN(operationPanel,name,parentNode,size,"forbidden");				
				return flag;
			}			
		}

		if(this.roleObj.rightDomainRead!=1){
			if(this.isDomainNode(record)){
				flag = 1;
				treeFn.FORBIDDEN(operationPanel,name,parentNode,size,"forbidden");
			}
		}

		return flag;
	},
	isSuperNode:function(record){
		var flag = 0;
		for(var i=0;i<this.superNodeList.length;i++){
			if(record.raw.eType.toUpperCase()==this.superNodeList[i]){
				flag = 1;
			}
		}
		return flag;
	},
	isDomainNode:function(record){
		var flag = 0;
		for(var i=0;i<this.domainNodeList.length;i++){
			if(record.raw.eType.toUpperCase()==this.domainNodeList[i]){
				flag = 1;
			}
		}
		return flag;
	},
	createSuperNodeList:function(){
		var a = new Array();
		this.superNodeList = a;
		a.push("FCLOUD");
		a.push("CLOUD");
		a.push("FSYSTEM");
		a.push("SYSTEM");
		a.push("PROC");
		a.push("FDOMAIN");
		a.push("FNODE");
		a.push("FNODEGROUP");
		a.push("NODEGROUP");
		a.push("NODE");
		a.push("CLOUD");
		a.push("FSUSER");
		//provision module
		a.push("PROVISION");
		a.push("PRODUCTTYPE");
		a.push("VERSION");
		//system module
		a.push("ALARMDESC");
		a.push("ALARMDOMAINDESC");
		a.push("OBJECTTYPE");
		a.push("CAUSE");
		a.push("ENUMDEF");
	},
	createDomainNodeList:function(){
		var a = new Array();
		this.domainNodeList = a;
		a.push("FDOMAIN");
		a.push("DOMAIN");
		a.push("SIPSERVER");
		a.push("DEVICEUPGRADE");
		a.push("ALARMCONFIG");
		a.push("SYSLOGMAIN");
		a.push("ALARMMAIN");
		a.push("USER");
		a.push("UDOMAIN");
		a.push("TGPORT");
		a.push("TG");
		a.push("AGPORT");
		a.push("AG");
		a.push("BKPORT");
		a.push("GWPORT");
		a.push("GW");
		a.push("BK");
		a.push("SITE");
		a.push("ROAMZONE");
		a.push("FROAMZONE");
		a.push("GROUP");
		a.push("FGROUP");
		a.push("PAIDGROUP");
		a.push("FPAIDGROUP");
		a.push("RULE");
		a.push("POLICY");
		a.push("FPOLICY");
	},
	procUpdateSimCard:function(flag,win){
//		alert(this.roleObj.rightDomainEdit+"------"+flag)
		if(flag!="other" && flag!="super_read"){
			return;
		}
//		alert(win+"----"+win.down("combo[name=adminStatus]"))
		if(this.roleObj.rightDomainEdit != 1){
			win.down("combo[name=grpUuid]").setVisible(false);
			win.down("combo[name=adminStatus]").setVisible(false);			
		}else{
			win.down("combo[name=grpUuid]").setVisible(true);
			win.down("combo[name=adminStatus]").setVisible(true);
		}
		
		if(this.roleObj.rightDomainAction != 1){
			win.down("combo[name=advanceSetting]").setVisible(false);
		}else{
			win.down("combo[name=advanceSetting]").setVisible(true);
		}
	}
});

