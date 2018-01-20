var width = 550;
Ext.define("app.view.log.LogSql", {
	extend : 'Ext.window.Window',
	title : lanControll.getLanValue('tiShowSql'),
	width : width,
	height:330,
	id:'logSql',
	closeAction: 'hide',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    closable:false,
    tipId:'',
    initComponent:function(){
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '100% 100%',
		    },
		    items: [{
		    	xtype:'textareafield',
		    	name:'sql',
		    	fieldLabel:'SQL'
		    }],
	
		    buttons: [{
		        text: 'Cancel',
		        ulan:'btCancel',
		        handler: function() {
		            this.up('form').getForm().reset();
		            this.up('window').hide();
		        }
		    }]
		});
		this.items = [form];
		
		this.callParent();
	}
});

