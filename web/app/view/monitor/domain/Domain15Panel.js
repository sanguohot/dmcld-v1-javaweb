Ext.define('app.view.monitor.domain.Domain15Panel',{
	extend:'Ext.panel.Panel',
	id:'domain15Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiDomain15Min'),
	initComponent: function(){
	
		var domain15Grid=Ext.create('app.view.monitor.domain.Domain15Grid',{});
		var originStore=Ext.create('app.store.monitor.PmdDomain15Store',{});
//		originStore.getProxy().url = "pmdDomain15Manager!getPmdDomain15ByTime.action";
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,domain15Grid],
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