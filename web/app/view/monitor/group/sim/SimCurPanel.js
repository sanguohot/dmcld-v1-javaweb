Ext.define('app.view.monitor.group.sim.SimCurPanel',{
	extend:'Ext.panel.Panel',
//	id:'simCurPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSimCur'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var simCurStore=Ext.create('app.store.monitor.PmdSimCurStore',{})
		var simCurGrid=Ext.create('app.view.monitor.group.sim.SimCurGrid',{
			id:gridId,
			store:simCurStore,
		});
		var pagebar=simCurGrid.down('pagingtoolbar[itemId=pagingtoolbar]');
		pagebar.bindStore(simCurStore);
		if(gridId.substr(0,3) == 'bk_'){
			pagebar.getComponent("export").setVisible(false);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[simCurGrid],
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