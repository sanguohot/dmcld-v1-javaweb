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

    items: [rs.createAdminStatus(null,[1,2,4],null),{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'productId',
    },{
    	xtype:'hiddenfield',
    	name:'uuid',
    },{
    	xtype:'hiddenfield',
    	name:'alias',
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
	                	var store=this.up('form').store
	                	Ext.Ajax.request({
	                		url:'neManager!updateNeStatus.action',
	                		method:'POST',
//	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	if(success){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);		       		 		
		        		       		store.load();
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

Ext.define("app.view.operation.domain.roamzone.site.UpdateNe", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateNe',
	title : tiSetting,
	id:'updateNeStatus',
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