Ext.define('app.view.device.domain.roamzone.site.nes.PortPanel',{
	extend:'Ext.panel.Panel',
	id:'devicePortPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
	
//		var roamzoneTab=Ext.create('app.view.operation.domain.roamzone.RoamzoneTab',{});
//		var siteTab=Ext.create('app.view.operation.domain.roamzone.SiteTab',{});
		var portTab1=Ext.create('app.view.gateway.gwPort',{
			title:'Ports',
			id:'dm_portTab1',
			treeName:'',
			border:false,
		});
//		var portTab1=Ext.create('Ext.panel.Panel',{
//			title:'PortTab1',
//			border:false
//		});
		
//		var portTab2=Ext.create('Ext.panel.Panel',{
//			title:'PortTab2',
//			border:false
//		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[portTab1]
	       
		}];
		this.callParent(arguments);	
	}
});