Ext.define('app.view.monitor.domain.zone.port.Gwp24Panel',{
	extend:'Ext.panel.Panel',
	id:'gwp24Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwp24Hour'),
	initComponent: function(){
	
		var originStore=Ext.create('app.store.monitor.PmdGwp24Store',{})
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		var gwp24Grid=Ext.create('app.view.monitor.domain.zone.port.Gwp24Grid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,gwp24Grid],
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