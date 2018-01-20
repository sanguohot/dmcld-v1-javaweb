Ext.define('app.view.monitor.group.GroupCurPanel',{
	extend:'Ext.panel.Panel',
//	id:'groupCurPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGroupCur'),
	gridId:'',
	initComponent: function(){
		var gridId = this.gridId;
		var grpCurStore=Ext.create('app.store.monitor.PmdGrpCurStore',{});
		var groupCurGrid=Ext.create('app.view.monitor.group.GroupCurGrid',{
			id:gridId,
			store:grpCurStore,
		});
		var pagebar=groupCurGrid.down('pagingtoolbar');
		pagebar.bindStore(grpCurStore);
		if(gridId.charAt(0) == 'f'){
			pagebar.getComponent("export").setVisible(false);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[groupCurGrid],
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