Ext.define('app.view.monitor.group.sim.SimUssdPanel',{
	extend:'Ext.panel.Panel',
//	id:'simUssdPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSimUssd'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var simUssdStore=Ext.create('app.store.monitor.SimUssdStore',{});
		var simUssdGrid=Ext.create('app.view.monitor.group.sim.SimUssdGrid',{
			id:gridId,
			store:simUssdStore,
		});
		var pagebar=simUssdGrid.down('pagingtoolbar[itemId=pagingtoolbar]');
		pagebar.bindStore(simUssdStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[simUssdGrid],
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