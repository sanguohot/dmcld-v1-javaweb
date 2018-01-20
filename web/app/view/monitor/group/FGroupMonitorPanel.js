Ext.define('app.view.monitor.group.FGroupMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'fGroupMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var groupCurPanel=Ext.create('app.view.monitor.group.GroupCurPanel',{
			id:'fGroupCurPanel',
			gridId:'fGroupCurGrid'
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[groupCurPanel]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});