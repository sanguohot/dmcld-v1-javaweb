var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
//    bodyPadding: 10,
//    defaults: {
//        margins: '0 0 10 0'
//    },
    bodyStyle: {
		background: '#DFE9F6',
	},
    items: [{    	
    	xtype:'textareafield',
    	name:'message',
//    	ulan:'detailDesc',
        flex:1,
        height:300,
        autoScroll:true,
	}],

    buttons: [{
        text: 'OK',
        ulan:'btOK',
        margins: '0 0 0 0',
        handler: function() {
    		autoRefresh.stopTask(null,this.up('window').store);
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    }]
});

Ext.define("app.view.common.MessageWindow", {
	extend : 'Ext.window.Window',
	alias : 'widget.messageWindow',
	id:'messageWindow',
	title : 'Message',
	cmpId:'',
	width : 550,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    count:0,
    items: form
});

