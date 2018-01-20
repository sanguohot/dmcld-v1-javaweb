Ext.define('app.view.operation.domain.config.UpgradePanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeId:'',
	userTypeValue:'1',
	neTabId:'',
	toolbars:0,
	neTabToolbars:0,
	initComponent: function(){
		var neTabId=this.neTabId;
		var neTabToolbars=this.neTabToolbars;
		var maintenance = (neTabId.indexOf('main')>=0)?1:0;
		if(maintenance){
			neTabToolbars = 29+32;
		}else{
			neTabToolbars = 27+32;
		}
		var upgradeNeTab=Ext.create('app.view.operation.domain.config.UpgradeNeTab',{
			id:neTabId,
			toolbars:neTabToolbars,
			title:tiDeviceList,
			border:false
		});
		upgradeNeTab.addListener("afterlayout",function(){
			privilege.procPrivilege(upgradeNeTab);
		},this,{single:true});	
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[upgradeNeTab]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});