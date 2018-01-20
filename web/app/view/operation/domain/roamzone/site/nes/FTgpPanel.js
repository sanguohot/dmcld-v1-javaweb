Ext.define('app.view.operation.domain.roamzone.site.nes.FTgpPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'tgpInFTgpPanel';
		if(maintenance){
			id = 'maintenanceTgpInFTgpPanel';
		}
		var tgpInFTgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.TgpInNe',{
			border:false,
			id:id,
		});

		var id = 'tgpTabInFTgpPanel';
		if(maintenance){
			id = 'maintenanceTgpTabInFTgpPanel';
		}
		var tgpTabInFTgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.TgpTab',{
			border:false,
			id:id,
		});
		tgpInFTgpPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(tgpInFTgpPanel);
		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[tgpTabInFTgpPanel,tgpInFTgpPanel],
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