Ext.define('app.view.monitor.group.sim.Sim24Panel',{
	extend:'Ext.panel.Panel',
//	id:'sim24Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSim24Hour'),
	gridId:"",
	initComponent: function(){
		var gridId = this.gridId;
		var sim24Store=Ext.create('app.store.monitor.PmdSim24Store',{})
		var sim24Grid=Ext.create('app.view.monitor.group.sim.Sim24Grid',{
			id:gridId,
			store:sim24Store,
		});
		var pagebar=sim24Grid.down('pagingtoolbar[itemId=pagingtoolbar]');
		pagebar.bindStore(sim24Store);
		
		var originStore = Ext.create("app.store.monitor.PmdSim24Store",{});
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,sim24Grid],
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