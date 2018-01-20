Ext.define('app.view.monitor.domain.zone.Gw15Panel',{
	extend:'Ext.panel.Panel',
	id:'gw15Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGw15Min'),
	initComponent: function(){
		var gridStore=Ext.create('app.store.monitor.PmdGw15Store',{});
		var originStore=Ext.create('app.store.monitor.PmdGw15Store',{});
		var gw15Grid=Ext.create('app.view.monitor.domain.zone.Gw15Grid',{
			store:gridStore,
		});
		var pagebar = gw15Grid.down('pagingtoolbar');
		pagebar.bindStore(gridStore);
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,gw15Grid],
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