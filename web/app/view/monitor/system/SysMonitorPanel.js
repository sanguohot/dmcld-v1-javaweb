Ext.define('app.view.monitor.system.SysMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'sysMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		
		var sys15Panel=Ext.create('app.view.monitor.system.Sys15Panel',{});
		var sys24Panel=Ext.create('app.view.monitor.system.Sys24Panel',{});
		var sysCurPanel=Ext.create('app.view.monitor.system.SysCurPanel',{
			id:'sysCurPanel',
			gridId:'sysCurGrid'
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[sys15Panel,sys24Panel,sysCurPanel],
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