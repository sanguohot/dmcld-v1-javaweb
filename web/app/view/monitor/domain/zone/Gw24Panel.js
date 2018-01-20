Ext.define('app.view.monitor.domain.zone.Gw24Panel',{
	extend:'Ext.panel.Panel',
	id:'gw24Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGw24Hour'),
	initComponent: function(){
		var gridStore=Ext.create('app.store.monitor.PmdGw24Store',{});
		var originStore=Ext.create('app.store.monitor.PmdGw24Store',{});
		var gw24Grid=Ext.create('app.view.monitor.domain.zone.Gw24Grid',{
			store:gridStore
		});
		var pagebar = gw24Grid.down('pagingtoolbar');
		pagebar.bindStore(gridStore);
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);

		
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,gw24Grid],
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