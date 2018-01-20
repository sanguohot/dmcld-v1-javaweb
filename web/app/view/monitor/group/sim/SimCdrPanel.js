Ext.define('app.view.monitor.group.sim.SimCdrPanel',{
	extend:'Ext.panel.Panel',
//	id:'simCdrPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSimCdr'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var SimCdrStore=Ext.create('app.store.monitor.SimCdrStore',{});
		var simCdrGrid=Ext.create('app.view.monitor.group.sim.SimCdrGrid',{
			id:gridId,
			store:SimCdrStore,
		});
		var pagebar=simCdrGrid.down('pagingtoolbar[itemId=pagingtoolbar]');
		pagebar.bindStore(SimCdrStore);

		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	border:false,
	       	items:[controller.createCdrSearchPanel(simCdrGrid)],
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