Ext.define('app.view.common.RunLogView',{
	extend:'Ext.panel.Panel',
	title:'',
	layout:'fit',
	treeId:'',
	store:null,
	border:false,
	initComponent: function() {
		var runLogStore= Ext.create("app.store.common.RunLogStore");
		runLogStore.pageSize=10;
		this.store = runLogStore;
		
		var sm = Ext.create('Ext.selection.CheckboxModel');		
		var nesGrid = Ext.create('Ext.grid.Panel', {
			border:false,
			itemId:'grid',
			columnLines:true,
			store: runLogStore, 
			selModel: sm,
			viewConfig : {
				loadMask:false
			},
			columns:[{
			 			header:"SN",
						dataIndex:"logSn",
						ulan:'snAbbr',
						width:70,
					},{
			 			header:"objectId",
						dataIndex:"objectId",
						width:70,
						hidden:true,
					},{
						header:"objectType",
						dataIndex:"objectType",
						width:70,
						hidden:true,
					},{
						header:"Time",
						dataIndex:"reportTime",
						width:160,
						renderer: function(value,metaData,record,rowIndex,store,view){
							return rs.timeFormat(value);
						}
					},{
						header:"Content",
						dataIndex:'log',
						minWidth:280,
					}
			],
			listeners:{
				itemdblclick:function(view, record, item, index, e, eOpts ){
					ip.createModule('log_win');
				}
			},
		});

//		var params={execResult:-1};
//		Ext.apply(store.proxy.extraParams, params);
//		runLogStore.load();
		autoRefresh.createBaseTask(runLogStore,10000);
		
		this.items=[nesGrid];
		this.callParent(arguments);		
	}	
})