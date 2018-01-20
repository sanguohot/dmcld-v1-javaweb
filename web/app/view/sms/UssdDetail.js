var form = Ext.widget('form', {
    border: false,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '90%',
    },
    items: [{
    	xtype:'displayfield',
    	name:'imsi',
    	fieldLabel:'IMSI',
    },{
    	xtype:'displayfield',
    	name:'ussdDirection',
    	fieldLabel:'Direction',
    },{
    	xtype:'textareafield',
    	name:'content',
    	fieldLabel:'Content',
    	readOnly:true,
    	rows:6
    },{
    	xtype:'hiddenfield',
    	name:'simUuids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'smlUuid',
    }],

    buttons: [{
        text: 'OK',
        ulan:'btOk',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    }]
});

Ext.define("app.view.sms.UssdDetail", {
	extend : 'Ext.window.Window',
	alias : 'widget.ussdDetail',
	id:'ussdDetail',
	title : tiDetail,
	width : 600,
	closeAction: 'hide',
	minWidth : 350,
	height : 280,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

