Ext.define('app.view.provision.FProvisionPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		
		
		var versionListTab=Ext.create('app.view.provision.producttype.VersionListPanel',{
			id:'versionListInPP',
			title:lanControll.getLanValue('tiVersionList'),
			border:false,
		});
		versionListTab.addListener("afterlayout",function(){
			privilege.procPrivilege(versionListTab);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[versionListTab]
	       
		}];
		lanControll.setLan(versionListTab);
		this.callParent(arguments);	
	}
});