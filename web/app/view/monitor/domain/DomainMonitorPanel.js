Ext.define('app.view.monitor.domain.DomainMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'domainMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var neList = Ext.create("app.view.monitor.domain.NeLayout",{
			id:'domainNeLayout'
		});
		var domain15Panel=Ext.create('app.view.monitor.domain.Domain15Panel',{});
		var domain24Panel=Ext.create('app.view.monitor.domain.Domain24Panel',{});
		var domainCurPanel=Ext.create('app.view.monitor.domain.DomainCurPanel',{
			id:'domainCurPanel',
			gridId:'domainCurGrid'
		});
		var domainCdrPanel=Ext.create('app.view.monitor.domain.DomainCdrPanel',{});
		var domainSmsPanel=Ext.create('app.view.monitor.domain.DomainSmsPanel',{});
		var domainUssdPanel=Ext.create('app.view.monitor.domain.DomainUssdPanel',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[neList,domain15Panel,domain24Panel,domainCurPanel,domainSmsPanel,domainUssdPanel,domainCdrPanel],
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