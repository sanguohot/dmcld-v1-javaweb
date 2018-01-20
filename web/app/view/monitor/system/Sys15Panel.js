Ext.define('app.view.monitor.system.Sys15Panel',{
	extend:'Ext.panel.Panel',
	id:'sys15Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSys15Min'),
	initComponent: function(){
	
		var originStore=Ext.create('app.store.monitor.PmdSys15Store',{});
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createSysChartLayout(originStore);
		var sys15Grid=Ext.create('app.view.monitor.system.Sys15Grid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,sys15Grid],
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