Ext.define('app.view.monitor.group.GroupSmsPanel',{
	extend:'Ext.panel.Panel',
	id:'groupSmsPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGroupSms'),
	initComponent: function(){
	
		var groupSmsGrid=Ext.create('app.view.monitor.group.GroupSmsGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[groupSmsGrid],
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