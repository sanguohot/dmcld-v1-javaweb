Ext.define("app.view.operation.node.AddNodeList", {
	extend : 'Ext.window.Window',
	alias : 'widget.addNode',
	id:'AddNodeList',
	title:lanControll.getLanValue('tiAddNodeToGrp'),
	closeAction: 'hide',
	layout:'fit',
	height : 340,
	autoScroll:true,
	treeName:'',
//	bodyPadding: 5,
	modal: true,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:600,
    layout: 'fit',
    resizable: true,
//    items: grid,
    NodeListStore:{},
    initComponent:function(){
    	var nodeStore= Ext.create('app.store.operation.node.NodeListStore');
    	nodeStore.getProxy().url = "nodeListManager!getNodeListOutGrp.action";
    	var sm = Ext.create('Ext.selection.CheckboxModel');
    	
    	var grid = Ext.create('Ext.grid.Panel',{
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
    				{header: 'Name',dataIndex: 'name',flex:1,editor: {allowBlank: false}},
    				{header: 'Alias',dataIndex: 'alias',flex:1,editor: {allowBlank: false}},
    				{header: 'Default Flag',dataIndex: 'defaultFlag'},
    				{header: 'Description',dataIndex: 'detailDesc',flex:1,editor: {allowBlank: false}},
    		],
    		listeners:{
    			itemdblclick: function(grid, row, columnindex,e){
    				var ot=Ext.getCmp('operationTree');
    				var uuid=row.get('uuid');
    				var rootNode=ot.getRootNode();
    				var node=rootNode.findChild('nid','nodegroup_'+uuid,true);			
    				ot.fireEvent('itemclick',null,node);
    			}						
    		},
    		tbar:[{
    			xtype : 'button',
    			text : 'Add',
    			iconCls : 'add',
    			ulan:'btAdd',
//    			tooltip : 'Add nodes to this group',
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
						Ext.Ajax.request({
	                		url:'nodeListManager!addNodesToGrp.action',
	                		method:'POST',
	                		params:params,
	                		callback: function (options, success, response) {
								var obj=Ext.JSON.decode(response.responseText);
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
		                    	grid.up('window').hide();
		                    	grid.up('window').NodeListStore.load();
	                    	}
	                	});
    			
    					}	
    				}
    			}
    		},'-',{
    	  		 xtype:'button',
    	   		 text:'Refresh',
    	   		ulan:'btRefresh',
    	   		 iconCls:'refresh2',
    	   		 listeners:{
    	   		 	click:function(){
    					nodeStore.load();
    	   	 		}
    	   	 	}
    	   	 }]
    	});
    	this.items = [grid];
    	this.callParent();
    }
});