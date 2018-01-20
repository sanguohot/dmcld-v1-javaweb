Ext.define('app.view.operation.domain.config.SipServerPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	agTabId:'',
	initComponent: function(){
		var agTabId=this.agTabId;
		var agListGrid=Ext.create("app.view.operation.domain.NeList",{id:agTabId,title:lanControll.getLanValue('tiSipServer')});
		agListGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(agListGrid);
		},this,{single:true});	
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[agListGrid]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});