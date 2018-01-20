Ext.define('app.view.privilege.PrivilegePanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'privilegePanel',
	itemId:'rightPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){
		var log = Ext.create("app.view.privilege.PrivilegeTabPanel",{
			id:'fcloudPrivilegeTabPanel',
			hidden:true,
			node:'super',
		});
		
		this.items=[log];
		this.callParent(arguments);	
	},
	
	listeners:{
		resize:function(win, width, height, eOpts){
			var treeFn = Ext.getCmp('treeFn');
			if(!treeFn){
				treeFn = Ext.create('app.util.TreeFn',{});
			}
			treeFn.resize('privilegePanel');
		}
	}
	
	
});