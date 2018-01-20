Ext.define('app.view.monitor.domain.zone.port.GwpCurPanel',{
	extend:'Ext.panel.Panel',
//	id:'gwpCurPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwpCur'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var gwpCurStore=Ext.create('app.store.monitor.PmdGwpCurStore',{});
		var gwpCurGrid=Ext.create('app.view.monitor.domain.zone.port.GwpCurGrid',{
			id:gridId,
			store:gwpCurStore
		});
		var pagebar=gwpCurGrid.down('pagingtoolbar');
		pagebar.bindStore(gwpCurStore);
		if(gridId.substr(0,3) == 'gw_'){
			pagebar.getComponent("export").setVisible(false);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[gwpCurGrid],
   	   	   	listeners:{			
   				tabchange:function(tabPanel,newTab,oldTab,obj){
   					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
   				}
   			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		this.callParent(arguments);	
	}
});