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
    	name:'smsDirection',
    	fieldLabel:'Direction',
    }
//    ,{
//    	name:'encode',
//		xtype: 'combo',
//		mode: 'local',
//		fieldLabel: 'Encode',
//		displayField: 'name',
//		valueField: 'value',
//		queryMode: 'local',
//		editable:false,
//		store: Ext.create('Ext.data.Store', {
//			fields : ['name', 'value'],
//			data   : [
//				{name : 'Unicode',   value: 0},
//				{name : 'ACSII',  value: 1},
//			]
//		}),
//		value:0,
//		allowBlank: false
//    }
//    ,{
//    	name:'smsStatus',
//		xtype: 'combo',
//		mode: 'local',
//		fieldLabel: 'Status',
//		displayField: 'name',
//		valueField: 'value',
//		queryMode: 'local',
//		editable:false,
//		allowBlank: false
//    }
    ,{
    	xtype:'textfield',
    	name:'smsNumber',
    	fieldLabel:'Number',
    	readOnly:true
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

Ext.define("app.view.sms.SmsDetail", {
	extend : 'Ext.window.Window',
	alias : 'widget.smsDetail',
	id:'smsDetail',
	title : tiDetail,
	width : 600,
	closeAction: 'hide',
	minWidth : 350,
	height : 300,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

