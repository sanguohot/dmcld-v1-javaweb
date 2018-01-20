Ext.define('app.view.monitor.domain.zone.port.GwpUssdPanel',{
	extend:'Ext.panel.Panel',
	id:'gwpUssdPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwpUssd'),
	initComponent: function(){
	
		var gwpUssdGrid=Ext.create('app.view.monitor.domain.zone.port.GwpUssdGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[gwpUssdGrid],
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