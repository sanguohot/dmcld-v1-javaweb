Ext.define('app.view.monitor.group.sim.SimSmsPanel',{
	extend:'Ext.panel.Panel',
//	id:'simSmsPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSimSms'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var simSmsStore=Ext.create('app.store.monitor.SimSmsStore',{});
		var simSmsGrid=Ext.create('app.view.monitor.group.sim.SimSmsGrid',{
			id:gridId,
			store:simSmsStore,
		});
		var pagebar=simSmsGrid.down('pagingtoolbar[itemId=pagingtoolbar]');
		pagebar.bindStore(simSmsStore);
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[simSmsGrid],
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