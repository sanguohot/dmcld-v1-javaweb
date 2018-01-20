Ext.require([
    'Ext.window.*',
    'app.util.GMapPanel'
]);
Ext.define('app.view.operation.node.FNodePanel',{
	extend:'Ext.panel.Panel',
//	id:'fNodePanel',
	layout:'fit',
	hidden:true,
	border:false,
	cloudUuid:-1,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var nodeStore= Ext.create('app.store.operation.node.NodeListStore'); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		
		var fgroupTab1=Ext.create('Ext.grid.Panel',{
			title:lanControll.getLanValue('tiNodeList'),
//			id:'fNodeTab',
			itemId:'grid',
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
					// {header: 'Id',dataIndex: 'simgrpid',width:30 },
					{header: 'Uuid',dataIndex: 'uuid',hidden:true},
					{header: 'Name',dataIndex: 'name',width:140},
					{header: 'Alias',dataIndex: 'alias',width:120},
					{header: 'adminStatus', dataIndex: 'adminStatus',width:80,hidden:true,
						renderer:function(val){
							return rs.adminStatus(val);
						 }
					},
					{header: 'oprStatus',hidden:true, dataIndex: 'oprStatus',width:80,hidden:true,
						renderer:function(val){
							return rs.oprStatus(val);
						} 
					},
					{header: 'runStatus', dataIndex: 'runStatus',width:80,hidden:false,
						renderer:function(val){  
							return rs.runStatus(val);
						} 
					},
					{header: 'encryptType', dataIndex: 'encryptType',width:90,
						renderer:function(val){
							return rs.encryptType(val);
						}
					},
					{header: 'ipAddr', dataIndex: 'ipAddr',width:120,hidden:false},
					{header: 'portNo', dataIndex: 'portNo',width:60,hidden:false},
					{header: 'priority', dataIndex: 'priority',width:60,hidden:true,
						renderer:function(val){
							return rs.tranPriority(val);
						}
					},
					{header: 'allocsTot', dataIndex: 'allocsTot',width:90,hidden:false},
					{header: 'allocsCur', dataIndex: 'allocsCur',width:90,hidden:false},
					{header: 'bytesTx', dataIndex: 'bytesTx',width:90,hidden:false},
					{header: 'bytesRx', dataIndex: 'bytesRx',width:90,hidden:false},

					{header: 'lastRegTime', dataIndex: 'lastRegTime',width:150,hidden:true,xtype: 'datecolumn',format:'Y-m-d H:i:s',},
					{header: 'lastHbTime', dataIndex: 'lastHbTime',width:150,xtype: 'datecolumn',format:'Y-m-d H:i:s',hidden:true,},
					{header: 'Description',dataIndex: 'detailDesc',width:120,},
					{header: 'lat',dataIndex: 'lat',width:120,hidden:true,},
					{header: 'lng',dataIndex: 'lng',width:120,hidden:true,},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
        			var ot=Ext.getCmp('operationTree');
        			if(maintenance){
        				ot = Ext.getCmp('maintenanceTree');
        			}
        			var uuid=row.get('uuid');
        			var rootNode=ot.getRootNode();
        			var node=rootNode.findChild('nid','node_'+uuid,true);
        			
        			ot.fireEvent('itemclick',null,node);
				},
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    				lanControll.setLan(this);
	    			},
	    			single:true
	    		}
			},
			maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			var add = Ext.create('Ext.button.Button',{
						xtype : 'button',
						text : 'Add Node',
						iconCls : 'add',
						flag:"super_edit",
						ulan:'btAdd',
						listeners : {
							click : function() {
						
								var tid=this.up('panel').parentNodeTid;
								var cloudUuid=this.up('panel').up('panel').up('panel').cloudUuid;
								var addNode = Ext.getCmp('addNode');
								if(addNode=='undefined'||addNode==undefined){
									addNode=Ext.create('app.view.operation.node.AddNode');
									lanControll.setLan(addNode);
								}
								addNode.down('form').getForm().reset();
								addNode.down('form').getForm().findField('cloudUuid').setValue(cloudUuid);
								
								addNode.show();
							}
						}
					});
	    			tbar.push(add);
	    			tbar.push('-');
	    			
	    			var del = Ext.create('Ext.button.Button',{
						xtype : 'button',
						text : 'Delete Node',
						iconCls : 'remove',
						flag:"super_edit",
						ulan:'btDel',
						listeners : {
							click : function() {
								if (fgroupTab1.getSelectionModel().hasSelection()) {								
										var records = fgroupTab1.getSelectionModel().getSelection();
										var ids="";
										var cnt=0;
										var names="";
										var name = "";
										for ( var i = 0; i < records.length; i++) {
											if(i==0){
												ids=records[i].get('uuid');
												names=records[i].get('name');
												name=records[i].get('name');
											}else {
												cnt=1;
												ids=ids+","+records[i].get('uuid');
												names=names+","+records[i].get('name')
											}
											
										}
										var params = {nodeUuids:ids};
										Ext.Ajax.request({
					                		url:'nodeListManager!checkNodesInGrp.action',
					                		method:'POST',
					                		params:params,
					                		callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
						                    		var msg = obj['msg'];
						                    		var ajaxobj = {
								                		url:'nodeManager!deleteNode.action?ids='+ids+'&name='+name,
								                		method:'POST',
								                		callback: function (options, success, response) {
															var obj=Ext.JSON.decode(response.responseText);
									                    	if(obj['success']){
									                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
									                    		fgroupTab1.getStore().load();
									                    	}else{
									                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
									                    	}
								                    	}
											         };
						                    		if(msg == ""){
						                    			Ext.MessageBox.confirm(boxPromotion,boxDelNode,function(e) {
				    										if (e == 'yes') {
				    											Ext.Ajax.request(ajaxobj);
				    										}
						    							});
						                    		}else{
						                    			boxNodeIsUsing = lanControll.getLanValue('boxNodeIsUsing');
						                    			Ext.MessageBox.confirm(boxPromotion
						                    					,msg+boxNodeIsUsing,function(e) {
						    								if (e == 'yes') {
						    									Ext.Ajax.request(ajaxobj);
						    								}
						                    			});
						                    		}
						                    		
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxUnknowError);
						                    	}
					                    	}
					                	});
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
    						this.up('panel').store.load();
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
	    	}			
		});
		fgroupTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(fgroupTab1);
		},this,{single:true});
		var id = 'config_gmap';
		if(maintenance){
			id = 'maintenance_gmap';
		}
		
		gmap=Ext.create('app.view.operation.node.NodeGmapPanel',{id:id});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[fgroupTab1,gmap]	       
		}];

		this.callParent(arguments);	
	}
});