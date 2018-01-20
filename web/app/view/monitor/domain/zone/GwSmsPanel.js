Ext.define('app.view.monitor.domain.zone.GwSmsPanel',{
	extend:'Ext.panel.Panel',
	id:'gwSmsPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwSms'),
	initComponent: function(){
	
		var gwSmsGrid=Ext.create('app.view.monitor.domain.zone.GwSmsGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[gwSmsGrid],
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