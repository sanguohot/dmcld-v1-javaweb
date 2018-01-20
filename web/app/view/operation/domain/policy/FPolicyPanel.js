Ext.define('app.view.operation.domain.policy.FPolicyPanel',{
	extend:'Ext.panel.Panel',
//	id:'fpolicyPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
			
				var policyInDomainStore = Ext.create('app.store.operation.domain.PolicyInDomainStore', {});
				var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
				var sm = Ext.create('Ext.selection.CheckboxModel');
				var groupTab2 = Ext.create('Ext.grid.Panel',{
//									id : 'policyInDomainGrid',
									itemId:'grid',
									title:lanControll.getLanValue('tiPolicyList'),
									columnLines : true,
									border:false,
									store : policyInDomainStore,
									parentNodeTid:'',
									autoScroll : true,
									selModel : sm,
									viewConfig: {
										loadMask:{
											msg:lanControll.getLanValue('maskMsg')
										},
										enableTextSelection: true
							  		},
									columns : [
										 {
										 header : 'Id',
										 dataIndex : 'uuid',
										 width : 64,
										 hidden:true
										 },{
											header:'DomainUuid',
											dataIndex:'domainUuid',
											hidden:true,
										 },{
												header : 'Policy Name',
												dataIndex : 'name',
												ulan:'policyName',
												flex:1
										},{
												header : 'Description',
												dataIndex : 'detailDesc',
												flex : 1
										},{
											header : 'defaultFlag',
											dataIndex : 'defaultFlag',
											hidden:true
										}],
										listeners:{
											itemdblclick: function(grid, row, columnindex,e){
							        			var ot=Ext.getCmp('operationTree');
							        			if(maintenance){
							        				ot=Ext.getCmp('maintenanceTree');
							        			}
							        			var uuid=row.get('uuid');
							        			var rootNode=ot.getRootNode();
							        			var node=rootNode.findChild('nid','policy_'+uuid,true);
							        			ot.fireEvent('itemclick',null,node);
											},
											afterlayout:{
								    			fn:function(){
								    				this.createTbar();
								    				lanControll.setFieldSet(this);
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
									text : 'Add Policy',
									iconCls : 'add',
									flag:"domain_edit",
									ulan:'btAdd',
									listeners : {
										click : function() {
											var tid=this.up('panel').parentNodeTid;
									
											var addPolicy=Ext.getCmp('addPolicy');
											
											if(addPolicy=='undefined'||addPolicy==undefined){
						        				addPolicy = Ext.create('app.view.operation.domain.policy.AddPolicy');
						        				lanControll.setLan(addPolicy);
											}
											
											addPolicy.down('form').getForm().findField('domainUuid').setValue(tid);
											addPolicy.show();
										}
									}
								});
				    			tbar.push(add);
				    			tbar.push('-');
				    			
				    			var del = Ext.create('Ext.button.Button',{
									xtype : 'button',
									text : 'Delete Policy',
									iconCls : 'remove',
									flag:"domain_edit",
									ulan:'btDel',
									listeners : {
										click : function() {
											if (groupTab2.getSelectionModel().hasSelection()) {
												
														var records = groupTab2.getSelectionModel().getSelection();
														var ids="";
														var names="";
														var domainUuid=0;
														var name = "";
														for ( var i = 0; i < records.length; i++) {
															if(records[i].get('defaultFlag')>0){
																 Ext.MessageBox.alert(boxWarnning,records[i].get('name')+boxDefault);
																 return;
															}
															if(i==0){
																domainUuid=records[i].get('domainUuid');
																ids=records[i].get('uuid');
																names=records[i].get('name');
																name=records[i].get('name');
															}else {
																ids=ids+","+records[i].get('uuid');
																names=names+","+records[i].get('name')
															}
															
//															policyInDomainStore.remove(records[i]);
														}
														Ext.Ajax.request({
									                		url:'checkManager!checkPolicy.action?ids='+ids+"&names="+names,
									                		method:'POST',
									                		callback: function (options, success, response) {
										                    	var obj=Ext.JSON.decode(response.responseText);			
										                    	if(obj['success']){
										                    		boxDelPolicy = lanControll.getLanValue('boxDelPolicy');
										                    		Ext.MessageBox.confirm(boxWarnning,boxDelPolicy,function(e) {

																	if (e == 'yes') {
																		Ext.Ajax.request({
													                		url:'policyManager!deletePolicy.action?ids='+ids+'&domainUuid='+domainUuid+'&name='+name,
													                		method:'POST',
													                		callback: function (options, success, response) {
														                    	var obj=Ext.JSON.decode(response.responseText);			
														                    	if(obj['success']){
														                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
														                    		groupTab2.getStore().load();
														                    	}else{
														                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
														                    	}
													                    	}
													                	});
																	}

																	})
										                    	}else{
										                    		Ext.MessageBox.alert(boxWarnning,obj['msg']+boxHasChildNode);
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
					       		 flag:"domain_read",
					       		 listeners:{
					       		 	click:function(){
					        			this.up('panel').store.load();
					       	 		}
					       	 	}
				       	 	});
				    		tbar.push(refresh);
				    		for(var i=0;i<tbar.length;i++){
				    			if(tbar[i]!='-' && tbar[i]!='->'){
				    				var text = lanControll.getLanValue(tbar[i].ulan);
				    				tbar[i].setText(text);
				    			}
				    		}
				    		var dockedItems = {
				    				xtype:'toolbar',
				    				dock: 'top',
				    				items:tbar
				    		};
				    		this.addDocked(dockedItems);
				    	},		
					});
				groupTab2.addListener("afterlayout",function(){
					privilege.procPrivilege(groupTab2);
				},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[groupTab2]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});