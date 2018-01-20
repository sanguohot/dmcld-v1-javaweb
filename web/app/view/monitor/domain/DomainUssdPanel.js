Ext.define('app.view.monitor.domain.DomainUssdPanel',{
	extend:'Ext.panel.Panel',
	id:'domainUssdPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiDomainUssd'),
	initComponent: function(){
	
		var domainUssdGrid=Ext.create('app.view.monitor.domain.DomainUssdGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[domainUssdGrid],
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