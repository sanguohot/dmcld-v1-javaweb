Ext.define('app.view.log.LogPanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'logPanel',
	itemId:'rightPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){
//		var node = "domain";
//		if(roleType.isSuper(Ext.get("roleId").value)){
//			node = "super";
//		}
//		var userGrid = Ext.create("app.view.log.LogGrid",{title:lanControll.getLanValue('tiUserLog'),node:node});
//		userGrid.addListener("afterlayout",function(){
//			privilege.procPrivilege(userGrid);
//		},this,{single:true});
//		
//		var runGrid = Ext.create("app.view.log.RunLogGrid",{title:lanControll.getLanValue('tiRunLog')});
//		runGrid.addListener("afterlayout",function(){
//			privilege.procPrivilege(runGrid);
//		},this,{single:true});
//		
//        this.items=[runGrid,userGrid];
//		for(var i=0;i<this.items.length;i++){
//			lanControll.setLan(this.items[i]);
//		}
		var log = Ext.create("app.view.log.GridContainer",{
			id:'fcloudGridContainer',
			hidden:true
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
			treeFn.resize('logPanel');
		}
	}
	
	
});