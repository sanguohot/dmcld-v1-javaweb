Ext.define('app.view.license.LicensePanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'licensePanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){

		var simCloudPanel=Ext.create('app.view.license.SimCloudPanel',{
			id:'licenseSimCloudPanel',
			hidden:true
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
			treeFn.resize('licensePanel');
		}
	}
	
	
});