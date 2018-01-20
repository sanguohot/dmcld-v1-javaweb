Ext.define('app.view.monitor.domain.Domain24Panel',{
	extend:'Ext.panel.Panel',
	id:'domain24Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiDomain24Hour'),
	initComponent: function(){
	
		var domain24Grid=Ext.create('app.view.monitor.domain.Domain24Grid',{});
		var originStore=Ext.create('app.store.monitor.PmdDomain24Store',{})
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,domain24Grid],
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