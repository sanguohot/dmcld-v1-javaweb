Ext.define('app.view.monitor.domain.zone.port.GwpCdrPanel',{
	extend:'Ext.panel.Panel',
	id:'gwpCdrPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwpCdr'),
	initComponent: function(){
	
		var gwpCdrGrid=Ext.create('app.view.monitor.domain.zone.port.GwpCdrGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	border:false,
	       	autoScroll:false,
	       	items:[controller.createCdrSearchPanel(gwpCdrGrid)],
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