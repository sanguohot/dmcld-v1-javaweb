Ext.define('app.view.operation.user.FUserPanel',{
	extend:'Ext.panel.Panel',
	
	id:'fuserPanel',
	layout:'fit',
	hidden:true,
	border:false,
	
	initComponent: function(){
		
		
		var userStore=Ext.create('app.store.operation.user.UserListStore',{});
	
		var fuserTab1=Ext.create('Ext.grid.Panel',{
			title:lanControll.getLanValue('tiUserList'),
			id:'fuserTab1',
			treeName:'',
			parentNodeTid:'',
			border:false,
			autoScroll:true,
			columnLines:true,
			store:userStore,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: [
			    {header: 'uuid',dataIndex: 'uuid',hidden:true,flex:1},										
				{header: 'UserName',dataIndex: 'name',ulan:'userName',flex:1},										
				{header: 'Type',dataIndex: 'type',flex:1,
					renderer:function(val){
						return rs.userType(val);
					} 
				},								
				{header: 'Description',dataIndex: 'detailDesc',flex:1},
			],
		});

		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[fuserTab1]
	       
		}];
		this.callParent(arguments);	
	}
});