Ext.define('app.view.msg.MsgPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	border:false,
	id:'msgPanel',
	itemId:'rightPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){
//		var log = Ext.create("app.view.msg.MsgGrid",{
//		});

		licCardPanel=Ext.create('app.view.msg.SendMsgResult',{
		});
		
		this.items=[licCardPanel];
		this.callParent(arguments);	
	},
	
	listeners:{
		resize:function(win, width, height, eOpts){
			var treeFn = Ext.getCmp('treeFn');
			if(!treeFn){
				treeFn = Ext.create('app.util.TreeFn',{});
			}
			treeFn.resize('msgPanel');
		}
	}
	
	
});