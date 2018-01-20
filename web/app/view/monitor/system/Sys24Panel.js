Ext.define('app.view.monitor.system.Sys24Panel',{
	extend:'Ext.panel.Panel',
	id:'sys24Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSys24Hour'),
	initComponent: function(){
	
		var originStore=Ext.create('app.store.monitor.PmdSys24Store',{});
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createSysChartLayout(originStore);
		var sys24Grid=Ext.create('app.view.monitor.system.Sys24Grid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,sys24Grid],
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