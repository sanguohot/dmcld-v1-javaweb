var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,

//    fieldDefaults: {
//        labelAlign: 'top',
//        labelWidth: 100
//        labelStyle: 'font-weight:bold'
//    },
    defaults: {
        margins: '0 0 10 0'
    },

    items: [{
    	xtype:'hiddenfield',
    	name:'ids',
    }],

    buttons: [{
        text: 'Cancel',
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('form').getForm().findField('type').setValue(-1);
            this.up('window').hide();
        }
    }, {
        text: 'Commit',
        ulan:'btCommit',
        handler: function() {
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	          
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'domainManager!setDomain.action',
	                		method:'POST',
//	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	if(success){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('fDomainTab').getStore().load();
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

Ext.define("app.view.operation.domain.UpdateDomain", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateDomain',
	title : tiSetting,
	id:'updateDomain',
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
	height : 150,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

