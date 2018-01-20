Ext.define('app.view.operation.user.FSUserPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		user=Ext.create('app.view.privilege.UserGrid',{
			node:'super'
		});
		user.addListener("afterlayout",function(){
			privilege.procPrivilege(user);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[user]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});