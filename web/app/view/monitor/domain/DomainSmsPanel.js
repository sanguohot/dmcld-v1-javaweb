Ext.define('app.view.monitor.domain.DomainSmsPanel',{
	extend:'Ext.panel.Panel',
	id:'domainSmsPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiDomainSms'),
	initComponent: function(){
	
		var domainSmsGrid=Ext.create('app.view.monitor.domain.DomainSmsGrid',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[domainSmsGrid],
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