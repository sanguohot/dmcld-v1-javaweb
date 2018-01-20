Ext.define('app.view.monitor.domain.FDomainMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'fDomainMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var neList = Ext.create("app.view.monitor.domain.NeLayout",{
			id:'fDomainNeLayout'
		});
		var domainCurPanel=Ext.create('app.view.monitor.domain.DomainCurPanel',{
			id:'fDomainCurPanel',
			gridId:'fDomainCurGrid'
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[neList,domainCurPanel],
	    	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});