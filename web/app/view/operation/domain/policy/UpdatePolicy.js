var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,

    defaults: {
        margins: '0 0 10 0'
    },

    items: [{
    	xtype:'hiddenfield',
    	name:'uuid',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid'
    },{
        xtype: 'textfield',
        name:'name',
        fieldLabel: 'Name',
        allowBlank: false
    }, {
        xtype: 'textfield',
        name:'alias',
        fieldLabel: 'Alias',
    },{
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name:'detailDesc',
//        labelAlign: 'top',
        flex: 1,
        margins: '0',
       
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
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'policyManager!updatePolicy.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	if(success){
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
            }
    }]
});

Ext.define("app.view.operation.domain.policy.UpdatePolicy", {
	extend : 'Ext.window.Window',
	alias : 'widget.updatePolicy',
	title : tiSetting,
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
	height : 250,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

