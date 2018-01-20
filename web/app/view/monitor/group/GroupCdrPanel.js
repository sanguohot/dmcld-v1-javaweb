Ext.define('app.view.monitor.group.GroupCdrPanel',{
	extend:'Ext.panel.Panel',
	id:'groupCdrPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGroupCdr'),
	initComponent: function(){
	
		var groupCdrGrid=Ext.create('app.view.monitor.group.GroupCdrGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	border:false,
	       	items:[controller.createCdrSearchPanel(groupCdrGrid)],
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