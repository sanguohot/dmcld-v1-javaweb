Ext.define('app.view.operation.domain.FDomainPanel',{
	extend:'Ext.panel.Panel',
//	id:'fdomainPanel',
	layout:'fit',
	hidden:true,
	border:false,
	cloudUuid:-1,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'domainInFDomainPanel';
		if(maintenance){
			id = 'maintenanceDomainInFDomainPanel';
		}
		var DomainListPanel=Ext.create('app.view.operation.domain.DomainListPanel',{
			title:tiDomainList,
			border:false,
			id:id,
		});
		DomainListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(DomainListPanel);
		},this,{single:true});
		var id = 'nesInCloudTab';
		if(maintenance){
			id = 'maintenanceNesInCloudTab';
		}
		var domainTab2=Ext.create('app.view.operation.NesInCloudTab',{
			title:tiDeviceList,
			border:false,
			id:id
		});
		domainTab2.addListener("afterlayout",function(){
			privilege.procPrivilege(domainTab2);
		},this,{single:true});
		
//		var id = 'neNasInCloudTab';
//		if(maintenance){
//			id = 'maintenanceNeNasInCloudTab';
//		}
//		var domainTab3=Ext.create('app.view.operation.NeNasInCloudTab',{
//			title:lanControll.getLanValue('tiUnknownDeviceList'),
//			border:false,
//			id:id
//		});
//		domainTab3.addListener("afterlayout",function(){
//			privilege.procPrivilege(domainTab3);
//		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[DomainListPanel,domainTab2],
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