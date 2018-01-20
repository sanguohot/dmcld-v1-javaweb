var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,

    defaults: {
        margins: '0 0 10 0',
        labelWidth: 120,
    },

    items: [rs.createAdminStatus(null,[0,1,2],{labelWidth:120}),{
		xtype:'combo',
		fieldLabel:'Domain',
		name:'manDomainUuid',
		ulan:'manDomainName',
//		comboxStore:Ext.create("app.store.util.ComboxStore",{}),
		store:Ext.create("app.store.util.ComboxStore",{}),
		valueField:'uuid',
		displayField:'name',
		queryMode : 'local',
//	},{
//		xtype:'textfield',
//		fieldLabel:'SMTP Address',
//		name:'smtpServer',
//		value:''
//	},{
//		xtype:'textfield',
//		fieldLabel:'SMTP Port',
//		name:'smtpPort',
//		value:''
//	},{
//		xtype:'textfield',
//		fieldLabel:'Account',
//		name:'smtpUserName',
//		value:''
//	},{
//		xtype:'textfield',
//		fieldLabel:'Password',
//		name:'smtpPassWord',
//		inputType:'password',
//		value:''
//	},{
//		xtype:'textfield',
//		fieldLabel:'Mail from',
//		name:'mailFrom',
//		value:''
	},{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'name',
    },{
    	xtype:'hiddenfield',
    	name:'cmpId',
    }],
    buttons: [{
        text: 'Cancel',
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    }, {
        text: 'Commit',
        ulan:'btCommit',
        handler: function() {
            if (this.up('form').getForm().isValid()) {
	                var form = this.up('form').getForm();
	                var cmpId=form.findField('cmpId').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'cloudManager!updateCloud.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
                    			var obj=Ext.JSON.decode(response.responseText);
        			                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(cmpId).down('grid[itemId=grid]').store.load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
		                    	form.reset();
	                    	}
	                	});
	                }
	                
	                this.up('window').hide();
	            }
            }
        
    }]
});

Ext.define("app.view.operation.cloud.UpdateCloud", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateCloud',
	title : tiSetting,
	id:'updateCloud',
	width : 460,
	closeAction: 'hide',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
});

