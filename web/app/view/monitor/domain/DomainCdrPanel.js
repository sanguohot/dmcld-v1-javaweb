Ext.define('app.view.monitor.domain.DomainCdrPanel',{
	extend:'Ext.panel.Panel',
	id:'domainCdrPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiDomainCdr'),
	initComponent: function(){
	
		var domainCdrGrid=Ext.create('app.view.monitor.domain.DomainCdrGrid',{});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[controller.createCdrSearchPanel(domainCdrGrid)],
	       	border:false,
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