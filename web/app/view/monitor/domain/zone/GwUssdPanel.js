Ext.define('app.view.monitor.domain.zone.GwUssdPanel',{
	extend:'Ext.panel.Panel',
	id:'gwUssdPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiGwUssd'),
	initComponent: function(){
	
		var gwUssdGrid=Ext.create('app.view.monitor.domain.zone.GwUssdGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[gwUssdGrid],
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