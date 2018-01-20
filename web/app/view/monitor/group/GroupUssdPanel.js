Ext.define('app.view.monitor.group.GroupUssdPanel',{
	extend:'Ext.panel.Panel',
	id:'groupUssdPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGroupUssd'),
	initComponent: function(){
	
		var groupUssdGrid=Ext.create('app.view.monitor.group.GroupUssdGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[groupUssdGrid],
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