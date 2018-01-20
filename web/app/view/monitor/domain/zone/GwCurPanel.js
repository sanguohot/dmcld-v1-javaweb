Ext.define('app.view.monitor.domain.zone.GwCurPanel',{
	extend:'Ext.panel.Panel',
//	id:'gwCurPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwCur'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var gwCurStore=Ext.create('app.store.monitor.PmdGwCurStore',{});
		var gwCurGrid=Ext.create('app.view.monitor.domain.zone.GwCurGrid',{
			id:gridId,
			store:gwCurStore
		});

		var pagebar=gwCurGrid.down('pagingtoolbar');
		pagebar.bindStore(gwCurStore);
		if(gridId.substr(0,2) != 'gw'){
			pagebar.getComponent("export").setVisible(false);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[gwCurGrid],
   	   	   	listeners:{			
   				tabchange:function(tabPanel,newTab,oldTab,obj){
   					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
   				}
   			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		this.callParent(arguments);	
	},
});