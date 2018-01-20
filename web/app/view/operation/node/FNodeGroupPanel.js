Ext.define('app.view.operation.node.FNodeGroupPanel',{
	extend:'Ext.panel.Panel',
//	id:'fNodeGroupPanel',
	layout:'fit',
	hidden:true,
	border:false,
	nodeGrpStore:{},
	cloudUuid:-1,
	initComponent: function(){
		var nodeStore= Ext.create('app.store.operation.node.NodeGroupStore',{});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		this.nodeGrpStore = nodeStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		
		var stepStore=Ext.create('app.store.util.StepStore');
//		stepStore.on('load',function(){
//			if(stepStore==null || stepStore.getCount()<1){
//				
//			}else{
//				sleepBar(store);
//			}
//		});
		
		var fgroupTab1=Ext.create('Ext.grid.Panel',{
			title:lanControll.getLanValue('tiNodeGrpList'),
//			id:'fNodeGroupTab',
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
					{header: 'Default Flag',dataIndex: 'defaultFlag',
						 renderer: function(value){
								return rs.defaultFlag(value);
					    	}
					},
					{header: 'Description',dataIndex: 'detailDesc',flex:1,editor: {allowBlank: false}},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){

        			var ot=Ext.getCmp('operationTree');
        			if(maintenance){
        				ot = Ext.getCmp('maintenanceTree');
        			}
        			var uuid=row.get('uuid');
        			var rootNode=ot.getRootNode();
        			var node=rootNode.findChild('nid','nodegroup_'+uuid,true);
        			
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
						text : 'Add Group',
						iconCls : 'add',
						flag:"super_edit",
						ulan:'btAdd',
						listeners : {
							click : function() {
						
								var tid=this.up('panel').parentNodeTid;
								var cloudUuid=this.up('panel').up('panel').up('panel').cloudUuid;
								var addNode = Ext.getCmp('addNodeGrp');
								if(addNode=='undefined'||addNode==undefined){
									addNode=Ext.create('app.view.operation.node.AddNodeGrp');
									lanControll.setLan(addNode);
								}
								addNode.down('form').getForm().findField('cloudUuid').setValue(cloudUuid);
								addNode.nodeGrpStore = this.up('panel').store;
								addNode.show();
							}
						}
					});
	    			tbar.push(add);
	    			tbar.push('-');
	    			
	    			var del = Ext.create('Ext.button.Button',{
						xtype : 'button',
						text : 'Delete Group',
						iconCls : 'remove',
						flag:"super_edit",
						ulan:'btDel',
						listeners : {
							click : function() {
								if (fgroupTab1.getSelectionModel().hasSelection()) {								
											var records = fgroupTab1.getSelectionModel().getSelection();
											var ids="";
											var cnt=0;
											var name = "";
											for ( var i = 0; i < records.length; i++) {
												if(i==0){
													ids=records[i].get('uuid');
													name=records[i].get('name');
												}else {
													cnt=1;
													ids=ids+","+records[i].get('uuid');
												}
												
											}
											
										Ext.MessageBox.confirm(boxWarnning,boxDelNode,function(e) {
											if (e == 'yes') {
												Ext.Ajax.request({
							                		url:'nodeGrpManager!delNodeList.action?ids='+ids+"&name="+name,
							                		method:'POST',
							                		callback: function (options, success, response) {
														var obj=Ext.JSON.decode(response.responseText);
								                    	if(success){
								                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
								                    		fgroupTab1.getStore().load();
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
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[fgroupTab1]
	       
		}];
		this.callParent(arguments);	
	}
});