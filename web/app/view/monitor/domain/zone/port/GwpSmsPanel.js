Ext.define('app.view.monitor.domain.zone.port.GwpSmsPanel',{
	extend:'Ext.panel.Panel',
	id:'gwpSmsPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwpSms'),
	initComponent: function(){
	
		var gwpSmsGrid=Ext.create('app.view.monitor.domain.zone.port.GwpSmsGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[gwpSmsGrid],
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