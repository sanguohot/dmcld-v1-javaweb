Ext.define("app.view.privilege.EditPrivilege", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : 800,
//	id:'editUser',
	closeAction: 'destroy',
	minWidth : 500,
    layout: 'fit',
    resizable: true,
    modal: true,
//    closable:true,
    tipId:'',
    initComponent:function(){
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
//		    fieldDefaults: {
//		        labelAlign: 'left',
//		        anchor: '100%',
//		    },
			layout: {
		        type:'vbox',
		        align: 'stretch'
		    },
//			 fieldDefaults: {
//				labelWidth: 120
//			 },
		    items: [{    	
		    	itemId:'viewGroup',
		        xtype: 'checkboxgroup',
		        name:'viewGroup',
		        fieldLabel: lanControll.getLanValue('modulePrivilegeName'),
		        columns: 3,
		        vertical: true,
//		        items: []
		    },{
		    	xtype:'hiddenfield',
				name:'roleId',
		    }],
		    buttons: [{
		        text: 'Cancel',
		        ulan:'btCancel',
		        handler: function() {
		            this.up('form').getForm().reset();
		            this.up('window').close();
		        }
		    },{
		        text: 'Commit',
		        ulan:'btCommit',
		        handler: function() {
	                var form = this.up('form').getForm();
	                var cbStore = this.up('form').cbStore;
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'privilegeManager!updatePrivilege.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
	                    		var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		cbStore.load();
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	                this.up('form').getForm().reset();
	                this.up('window').hide();           
		        }
		        
		    }]
		});
		this.items = [form];
		
		this.callParent();
	},
	createCheckbox:function(name,boxLabel){
		var checkbox = Ext.create("Ext.form.field.Checkbox",{
			xtype:'checkbox',
			boxLabel:boxLabel, 
			boxLabelCls:'box_label',
			name: name,
			inputValue:1,
		})
		return checkbox;
	},
	createCheckboxGroup:function(srcRoleId,dstRoleId,store){
		var arr = [];
		var rightSpecialFinance = this.createCheckbox("rightSpecialFinance","Finance");
		var rightModuleConfiguration = this.createCheckbox("rightModuleConfiguration","Configuration Module");
		var rightModuleMaintenance = this.createCheckbox("rightModuleMaintenance","Maintenance Module");
        var rightModulePerformance = this.createCheckbox("rightModulePerformance","Performance Module");
        var rightModuleLog = this.createCheckbox("rightModuleLog","Log Module");
        var rightModuleVersion = this.createCheckbox("rightModuleVersion","Version Module");
        var rightModuleProvision = this.createCheckbox("rightModuleProvision","Provision Module");
        var rightModuleSystem = this.createCheckbox("rightModuleSystem","System Module");
        var rightModuleLicense = this.createCheckbox("rightModuleLicense","License Module");
        var rightModulePrivilege = this.createCheckbox("rightModulePrivilege","Privilege Module");
        var rightModuleBatch = this.createCheckbox("rightModuleBatch","Batch Module");
        var rightSuperRead = this.createCheckbox("rightSuperRead","Super Read");
        var rightSuperEdit = this.createCheckbox("rightSuperEdit","Super Edit");
        var rightSuperAction = this.createCheckbox("rightSuperAction","Super Action");
        var rightDomainRead = this.createCheckbox("rightDomainRead","Domain Read");
        var rightDomainEdit = this.createCheckbox("rightDomainEdit","Domain Edit");
        var rightDomainAction = this.createCheckbox("rightDomainAction","Domain Action");
        var rightDeviceAction = this.createCheckbox("rightDeviceAction","Device Action");
        var rightSimAction = this.createCheckbox("rightSimAction","SIM Action");
        var rightApiAction = this.createCheckbox("rightApiAction","API Action");
        var roleObj = privilege.roleObj;
		if(roleType.isSuperAdmin(srcRoleId) && roleType.isSuperFinance(dstRoleId)){
			arr.push(rightSpecialFinance);
		}
        if(roleType.isSuper(dstRoleId)){
        	if(roleObj.rightModuleProvision == 1){
        		arr.push(rightModuleProvision);
        	}
        	if(roleObj.rightModuleSystem == 1){
        		arr.push(rightModuleSystem);
        	}
        	if(roleObj.rightSuperRead == 1){
        		arr.push(rightSuperRead);
        	}
        	if(roleObj.rightSuperEdit == 1){
        		arr.push(rightSuperEdit);
        	}
        	if(roleObj.rightSuperAction == 1){
        		arr.push(rightSuperAction);
        	}
		}
        
        if(roleType.isDomainUserWithoutAdmin(dstRoleId)){
        	var domainRecord = store.findRecord('roleId',roleType.getDomainAdmin());
        	if(!domainRecord){
        		return;
        	}
        	if(roleObj.rightModuleConfiguration == 1
        			&& domainRecord.get("rightModuleConfiguration")==1){
        		arr.push(rightModuleConfiguration);
        	}
        	if(roleObj.rightModuleMaintenance == 1
        			&& domainRecord.get("rightModuleMaintenance")==1){
        		arr.push(rightModuleMaintenance);
        	}
        	if(roleObj.rightModulePerformance == 1
        			&& domainRecord.get("rightModulePerformance")==1){
        		arr.push(rightModulePerformance);
        	}
        	if(roleObj.rightModuleLog == 1
        			&& domainRecord.get("rightModuleLog")==1){
        		arr.push(rightModuleLog);
        	}
        	if(roleObj.rightModuleVersion == 1
        			&& domainRecord.get("rightModuleVersion")==1){
        		arr.push(rightModuleVersion);
        	}
        	if(roleObj.rightModuleLicense == 1
        			&& domainRecord.get("rightModuleLicense")==1){
        		arr.push(rightModuleLicense);
        	}
        	if(roleObj.rightModulePrivilege == 1
        			&& domainRecord.get("rightModulePrivilege")==1){
        		arr.push(rightModulePrivilege);
        	}
        	if(roleObj.rightModuleBatch == 1
        			&& domainRecord.get("rightModuleBatch")==1){
        		arr.push(rightModuleBatch);
        	}
        	if(roleObj.rightDomainRead == 1
        			&& domainRecord.get("rightDomainRead")==1){
        		arr.push(rightDomainRead);
        	}
        	if(roleObj.rightDomainEdit == 1
        			&& domainRecord.get("rightDomainEdit")==1){
        		arr.push(rightDomainEdit);
        	}
        	if(roleObj.rightDomainAction == 1
        			&& domainRecord.get("rightDomainAction")==1){
        		arr.push(rightDomainAction);
        	}
        	if(roleObj.rightDeviceAction == 1
        			&& domainRecord.get("rightDeviceAction")==1){
        		arr.push(rightDeviceAction);
        	}
        	if(roleObj.rightSimAction == 1
        			&& domainRecord.get("rightSimAction")==1){
        		arr.push(rightSimAction);
        	}
        	if(roleObj.rightApiAction == 1
        			&& domainRecord.get("rightApiAction")==1){
        		arr.push(rightApiAction);
        	}
		}else{
			if(roleObj.rightModuleConfiguration == 1){
	    		arr.push(rightModuleConfiguration);
	    	}
	    	if(roleObj.rightModuleMaintenance == 1){
	    		arr.push(rightModuleMaintenance);
	    	}
	    	if(roleObj.rightModulePerformance == 1){
	    		arr.push(rightModulePerformance);
	    	}
	    	if(roleObj.rightModuleLog == 1){
	    		arr.push(rightModuleLog);
	    	}
	    	if(roleObj.rightModuleVersion == 1){
	    		arr.push(rightModuleVersion);
	    	}
	    	if(roleObj.rightModuleLicense == 1){
	    		arr.push(rightModuleLicense);
	    	}
	    	if(roleObj.rightModulePrivilege == 1){
	    		arr.push(rightModulePrivilege);
	    	}
	    	if(roleObj.rightModuleBatch == 1){
	    		arr.push(rightModuleBatch);
	    	}
	    	if(roleObj.rightDomainRead == 1){
	    		arr.push(rightDomainRead);
	    	}
	    	if(roleObj.rightDomainEdit == 1){
	    		arr.push(rightDomainEdit);
	    	}
	    	if(roleObj.rightDomainAction == 1){
	    		arr.push(rightDomainAction);
	    	}
	    	if(roleObj.rightDeviceAction == 1){
	    		arr.push(rightDeviceAction);
	    	}
	    	if(roleObj.rightSimAction == 1){
	    		arr.push(rightSimAction);
	    	}
	    	if(roleObj.rightApiAction == 1){
	    		arr.push(rightApiAction);
	    	}
		}               

    	return arr;
	},
	proc:function(store){
		var roleId = this.down("hiddenfield[name=roleId]").getValue();
		var role = Ext.get("roleId").value;
		var arr = this.createCheckboxGroup(role,roleId,store);
		var viewGroup=this.down('checkboxgroup[itemId=viewGroup]');
		viewGroup.removeAll();
		viewGroup.add(arr);
//		var rightSpecialFinance = this.down("checkbox[name=rightSpecialFinance]");
//		var rightModuleConfiguration = this.down("checkbox[name=rightModuleConfiguration]");
//		var rightModuleMaintenance = this.down("checkbox[name=rightModuleMaintenance]");
//		var rightModulePerformance = this.down("checkbox[name=rightModulePerformance]");
//		var rightModuleLog = this.down("checkbox[name=rightModuleLog]");
//		var rightModuleVersion = this.down("checkbox[name=rightModuleVersion]");
//		var rightModuleProvision = this.down("checkbox[name=rightModuleProvision]");
//		var rightModuleSystem = this.down("checkbox[name=rightModuleSystem]");
//		var rightModuleLicense = this.down("checkbox[name=rightModuleLicense]");
//		var rightModulePrivilege = this.down("checkbox[name=rightModulePrivilege]");
//		
//		var rightSuperRead = this.down("checkbox[name=rightSuperRead]");
//		var rightSuperEdit = this.down("checkbox[name=rightSuperEdit]");
//		var rightSuperAction = this.down("checkbox[name=rightSuperAction]");
//		if(roleType.isSuperAdmin(srcRoleId) && roleType.isSuperFinance(dstRoleId)){
//			arr.push(rightSpecialFinance);
//		}
//		if(roleType.isSuper(roleId)){
//			arr.push(rightModuleProvision);
//			arr.push(rightModuleSystem);
//			arr.push(rightSuperRead);
//			arr.push(rightSuperEdit);
//			arr.push(rightSuperAction);
//		}
//		arr.push(rightModuleConfiguration);
//		arr.push(rightModuleMaintenance);
//        arr.push(rightModulePerformance);
//        arr.push(rightModuleLog);
//        arr.push(rightModuleVersion);
//        arr.push(rightModuleProvision);
//        arr.push(rightModuleSystem);
//        arr.push(rightModuleLicense);
//        arr.push(rightModulePrivilege);
//        arr.push(rightSuperRead);
//        arr.push(rightSuperEdit);
//        arr.push(rightSuperAction);
//        arr.push(rightDomainRead);
//        arr.push(rightDomainEdit);
//        arr.push(rightDomainAction);
//        arr.push(rightDeviceAction);
//        arr.push(rightSimAction);
//        arr.push(rightApiAction);


	}
});

