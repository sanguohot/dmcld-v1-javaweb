Ext.define('app.view.operation.domain.roamzone.site.nes.FAgpPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'agpInFAgpPanel';
		if(maintenance){
			id = 'maintenanceAgpInFAgpPanel';
		}
		var tgpInFTgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.AgpInNe',{
			border:false,
			id:id,
		});

		var id = 'agpTabInFAgpPanel';
		if(maintenance){
			id = 'maintenanceAgpTabInFAgpPanel';
		}
		var tgpTabInFTgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.AgpTab',{
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