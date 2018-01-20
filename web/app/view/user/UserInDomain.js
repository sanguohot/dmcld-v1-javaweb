Ext.define('app.view.user.UserInDomain',{
	extend:'Ext.panel.Panel',
	
//	id:'userInDomain',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		user=Ext.create('app.view.privilege.UserGrid',{
			node:'domain'
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