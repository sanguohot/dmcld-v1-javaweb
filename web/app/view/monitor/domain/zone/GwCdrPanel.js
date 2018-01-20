Ext.define('app.view.monitor.domain.zone.GwCdrPanel',{
	extend:'Ext.panel.Panel',
	id:'gwCdrPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwCdr'),
	initComponent: function(){
	
		var gwCdrGrid=Ext.create('app.view.monitor.domain.zone.GwCdrGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	border:false,
	       	items:[controller.createCdrSearchPanel(gwCdrGrid)],
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