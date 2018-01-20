Ext.define('app.view.operation.MaintenancePanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'maintenancePanel',
//	collapsible:true,
	itemId:'rightPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){
		var simCloudPanel=Ext.create('app.view.operation.SimCloudPanel',{
			id:'maintenanceSimCloudPanel'
		});		            
        this.items=[simCloudPanel];
		
		this.callParent(arguments);	
	},

	listeners:{
		resize:function(win, width, height, eOpts){
			var treeFn = Ext.getCmp('treeFn');
			if(!treeFn){
				treeFn = Ext.create('app.util.TreeFn',{});
			}
			treeFn.resize('maintenancePanel');
		}
	}	
});