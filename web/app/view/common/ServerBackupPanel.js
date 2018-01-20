Ext.define('app.view.common.ServerBackupPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	cloudUuid:-1,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'serverInBackupPanel';
		if(maintenance){
			id = 'maintenanceServerInBackupPanel';
		}
		var panel=Ext.create('app.view.common.BackupListPanel',{
			title:lanControll.getLanValue('backupList'),
			border:false,
			id:id,
		});
		panel.addListener("afterlayout",function(){
			privilege.procPrivilege(panel);
		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[panel],
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