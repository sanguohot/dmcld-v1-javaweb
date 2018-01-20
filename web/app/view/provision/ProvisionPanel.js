Ext.define('app.view.provision.ProvisionPanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'provisionPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
//	collapsible:true,
	initComponent: function(){
		var productTypePanel=Ext.create('app.view.provision.producttype.ProductTypePanel',{id:'productTypePanel'});
		var versionPanel=Ext.create('app.view.provision.producttype.version.VersionPanel',{});
        this.items=[productTypePanel,versionPanel];
        lanControll.setLan(productTypePanel);
		this.callParent(arguments);	
	},

	listeners:{
		resize:function(win, width, height, eOpts){
			treeFn.resize('provisionPanel');
		}
	}
});