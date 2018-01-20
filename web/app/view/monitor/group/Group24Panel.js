Ext.define('app.view.monitor.group.Group24Panel',{
	extend:'Ext.panel.Panel',
	id:'group24Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGroup24Hour'),
	initComponent: function(){
	
		var group24Grid=Ext.create('app.view.monitor.group.Group24Grid',{});
		var originStore=Ext.create('app.store.monitor.PmdGrp24Store',{});
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,group24Grid],
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