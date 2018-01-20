Ext.define('app.view.operation.system.FSystemPanel',{
	extend:'Ext.panel.Panel',
//	id:'fSystemPanel',
	layout:'fit',
	hidden:true,
	border:false,
	cloudUuid:-1,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'sysInFSystemPanel';
		if(maintenance){
			id = 'maintenanceSysInFSystemPanel';
		}
		var sysListPanel=Ext.create('app.view.operation.cloud.SysListPanel',{
			title:tiSysList,
			border:false,
			id:id,
		});
		sysListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(sysListPanel);
		},this,{single:true});
		
		
		var id = 'domainInFSysPanel';
		if(maintenance){
			id = 'maintenanceDomainInFSysPanel';
		}
		var systemTab2=Ext.create('app.view.operation.domain.DomainListPanel',{
			title:tiDomainList,
			border:false,
			id:id,
		});
		systemTab2.addListener("afterlayout",function(){
			privilege.procPrivilege(systemTab2);
		},this,{single:true});
		
		var id = 'nesInFSystemTab';
		if(maintenance){
			id = 'maintenanceNesInFSystemTab';
		}
		var systemTab3=Ext.create('app.view.operation.NesInCloudTab',{
			title:tiDeviceList,
			border:false,
			id:id
		});
		systemTab3.addListener("afterlayout",function(){
			privilege.procPrivilege(systemTab3);
		},this,{single:true});
		
//		var id = 'neNasInFSystemTab';
//		if(maintenance){
//			id = 'maintenanceNeNasInFSystemTab';
//		}
//		var systemTab4=Ext.create('app.view.operation.NeNasInCloudTab',{
//			title:lanControll.getLanValue('tiUnknownDeviceList'),
//			border:false,
//			id:id
//		});
//		systemTab4.addListener("afterlayout",function(){
//			privilege.procPrivilege(systemTab4);
//		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[sysListPanel,systemTab2,systemTab3],
	       	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
	       
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});