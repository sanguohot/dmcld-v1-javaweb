Ext.define('app.view.operation.domain.roamzone.site.nes.FSs7Panel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'ss7InFSs7Panel';
		if(maintenance){
			id = 'maintenanceSs7InFSs7Panel';
		}
		var tgpInFTgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.Ss7InNe',{
			border:false,
			id:id,
		});
		tgpInFTgpPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(tgpInFTgpPanel);
		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[tgpInFTgpPanel],
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