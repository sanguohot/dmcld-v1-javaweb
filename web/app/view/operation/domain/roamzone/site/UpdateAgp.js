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

    items: [rs.createAdminStatus(null,[1,2],null),{
    	xtype:'hiddenfield',
    	name:'uuids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'parentId',
    },{
    	xtype:'hiddenfield',
    	name:'portStr',
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
	                var parentId=form.findField('parentId').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'agpManager!updateAgp.action',
	                		method:'POST',
	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(parentId).down('panel').store.load();
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

Ext.define("app.view.operation.domain.roamzone.site.UpdateAgp", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateAgp',
	title : tiSetting,
	id:'updateAgp',
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

