Ext.define('app.view.device.domain.FDomainPanel',{
	extend:'Ext.panel.Panel',
	id:'deviceFdomainPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
	
//		var roamzoneTab=Ext.create('app.view.operation.domain.roamzone.RoamzoneTab',{});
//		var siteTab=Ext.create('app.view.operation.domain.roamzone.SiteTab',{});
//		var fdomainTab1=Ext.create('Ext.panel.Panel',{
//			title:'FDomainTab1',
//			id:'fdomainTab1',
//			treeName:'',
//			border:false
//		});
		
//		var domainTab2=Ext.create('Ext.panel.Panel',{
//			title:'FDomainTab2',
//			border:false
//		});
//		this.items=[{
//	       	xtype: 'tabpanel',
//	       	items:[domainTab1]
//	       
//		}];
		this.callParent(arguments);	
	}
});