Ext.define('app.view.monitor.group.sim.Sim15Panel',{
	extend:'Ext.panel.Panel',
//	id:'sim15Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSim15Min'),
	gridId:"",
	initComponent: function(){
		var gridId = this.gridId;
		var sim15Store=Ext.create('app.store.monitor.PmdSim15Store',{id:"store_"+gridId});
		var sim15Grid=Ext.create('app.view.monitor.group.sim.Sim15Grid',{
			id:gridId,
			store:sim15Store,
		});
		var pagebar=sim15Grid.down('pagingtoolbar[itemId=pagingtoolbar]');
		pagebar.bindStore(sim15Store);
		
		var originStore = Ext.create("app.store.monitor.PmdSim15Store",{});
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var chartLayout = generalChart.createChartLayout(originStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[chartLayout,sim15Grid],
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