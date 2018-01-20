var nodeStore= Ext.create('app.store.operation.node.NodeListStore');
nodeStore.getProxy().url = "nodeListManager!getNodeListInGrp.action";
//nodeStore.getProxy().setReader({
//    type: 'json',
//    root: 'nodeList'
//});
var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('app.view.operation.node.NodeListPanel',{
	title:lanControll.getLanValue('tiNodeList'),
//	id:'NodeListPanel',
	extend:'Ext.grid.Panel',
	treeName:'',
	parentNodeTid:'',
	border:false,
	layout:'fit',
	autoScroll:true,
	columnLines:true,
	store: nodeStore, 
	selModel: sm,
	viewConfig: {
		loadMask:{
			msg:lanControll.getLanValue('maskMsg')
		},
		enableTextSelection: true
	},
	columns: [
			{header: 'Uuid',dataIndex: 'uuid',hidden:true},
			{header: 'Name',dataIndex: 'name',minWidth:120},
			{header: 'Alias',dataIndex: 'alias',hidden:true},
			{header: 'encryptType',dataIndex: 'encryptType',
				renderer:function(val){  
					return rs.encryptType(val);
				}
			},
			{header: 'priority',dataIndex: 'priority',},
			{header: 'ipAddr',dataIndex: 'ipAddr',hidden:true},
			{header: 'portNo',dataIndex: 'portNo',hidden:true},
			{header: 'bytesTx',dataIndex: 'bytesTx',hidden:true},
			{header: 'bytesRx',dataIndex: 'bytesRx',hidden:true},
			{header: 'allocsTot',dataIndex: 'allocsTot',hidden:true},
			{header: 'allocsCur',dataIndex: 'allocsCur',hidden:true},
			{header: 'lastRegTime',dataIndex: 'lastRegTime',hidden:true,xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,},
			{header: 'lastHbTime',dataIndex: 'lastHbTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,},
			{header: 'Description',dataIndex: 'detailDesc',flex:1,minWidth:120},
	],
	listeners:{
		itemdblclick: function(grid, row, columnindex,e){
			var ot=Ext.getCmp('operationTree');
			if(this.maintenance){
				ot = Ext.getCmp('maintenanceTree');
			}
			var uuid=row.get('uuid');
			var rootNode=ot.getRootNode();
			var node=rootNode.findChild('nid','node_'+uuid,true);			
			ot.fireEvent('itemclick',null,node);
		}						
	},
	maintenance:null,
	createTbar:function(){
		var tbar = [];
		if(!this.maintenance){
			var  add = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Add',
				iconCls : 'add',
				flag:"super_edit",
//				tooltip : 'Add nodes to this group',
				ulan:'btAdd',
				listeners : {
					click : function() {				
						var tid=this.up('panel').parentNodeTid;						
						var addNode = Ext.getCmp('AddNodeList');
						if(addNode=='undefined'||addNode==undefined){
							addNode=Ext.create('app.view.operation.node.AddNodeList');
						}
						var cloudUuid=Ext.getCmp('nodeGroupPanel').cloudUuid;
						addNode.NodeListStore = this.up('panel').getStore();
						addNode.down('panel').treeName = this.up('panel').treeName;
						var store = addNode.down('panel').getStore();
						var name = this.up('panel').treeName;
	        			var params = {cloudUuid:cloudUuid,nodeGrpUuid:name};
	        			Ext.apply(store.proxy.extraParams, params);
	        			store.load();
						addNode.show();
					}
				}
			});
			tbar.push(add);
			tbar.push('-');
			
			var del = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Delete',
				iconCls : 'remove',
				flag:"super_edit",
				ulan:'btDel',
				listeners : {
					click : function() {
						if (this.up('panel').getSelectionModel().hasSelection()) {						
								var records = this.up('panel').getSelectionModel().getSelection();
								var ids="";
								var name = "";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
										name=records[i].get('name');
									}else {
										ids=ids+"-"+records[i].get('uuid');
									}
									
								}
								var nodeGrpUuid = this.up('panel').treeName;
								var params = {nodeUuids:ids,nodeGrpUuid:nodeGrpUuid,name:name};
								var grid = this.up('panel');
								Ext.MessageBox.confirm(boxWarnning,boxDelNode,function(e) {
									if (e == 'yes') {
										Ext.Ajax.request({
					                		url:'nodeListManager!DelNodesToGrp.action',
					                		method:'POST',
					                		params:params,
					                		callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
						                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
						                    		grid.getStore().load();
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
						                    	}
					                    	}
					                	});
									}
								})
						}
					}

				}
			});
			tbar.push(del);
			tbar.push('-');
		}
		
		var refresh = Ext.create('Ext.button.Button',{
       		 xtype:'button',
       		 text:'Refresh',
       		ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 flag:"super_read",
       		 listeners:{
       		 	click:function(){
					nodeStore.load();
       	 		}
       	 	}
   	 	});
		tbar.push(refresh);
		var dockedItems = {
				xtype:'toolbar',
				dock: 'top',
				items:tbar
		};
		this.addDocked(dockedItems);
	},
	listeners:{
		afterlayout:{
			fn:function(){
				this.createTbar();
				lanControll.setFieldSet(this);
				lanControll.setLan(this);
			},
			single:true
		}
	}
});