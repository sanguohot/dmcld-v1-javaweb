Ext.define('app.view.monitor.system.FSysMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'fSysMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var sysCurPanel=Ext.create('app.view.monitor.system.SysCurPanel',{
			id:'fSysCurPanel',
			gridId:'fSysCurGrid'
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[sysCurPanel]
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});