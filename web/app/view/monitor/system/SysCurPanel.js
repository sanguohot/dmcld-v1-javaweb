Ext.define('app.view.monitor.system.SysCurPanel',{
	extend:'Ext.panel.Panel',
//	id:'sysCurPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiSysCur'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var sysCurStore=Ext.create('app.store.monitor.PmdSysCurStore',{});
		var sysCurGrid=Ext.create('app.view.monitor.system.SysCurGrid',{
			id:gridId,
			store:sysCurStore
		});
		var pagebar=sysCurGrid.down('pagingtoolbar');
		pagebar.bindStore(sysCurStore);
		if(gridId.charAt(0) == 'f'){
			pagebar.getComponent("export").setVisible(false);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[sysCurGrid],
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