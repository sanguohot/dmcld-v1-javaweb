Ext.define('app.view.operation.system.FLocalSystemPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	cloudUuid:-1,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'sysInFLocalSystemPanel';
		if(maintenance){
			id = 'maintenanceSysInFLocalSystemPanel';
		}
		var sysListPanel=Ext.create('app.view.operation.cloud.SysListPanel',{
			title:lanControll.getLanValue('localSysList'),
			border:false,
			id:id,
			sysMode:1,
		});
		sysListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(sysListPanel);
		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[sysListPanel],
	       	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
	       
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		lanControll.setLan(sysListPanel);
		this.callParent(arguments);	
	}
});