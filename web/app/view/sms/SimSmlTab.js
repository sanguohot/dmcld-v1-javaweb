Ext.define('app.view.sms.SimSmlTab',{
		extend:'Ext.panel.Panel',
//		id:'simSmlTab',
		title:lanControll.getLanValue('tiSmsTask'),
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var som=Ext.create('app.util.SmlOpenModel',{});
			var simSmsStore=Ext.create('app.store.sms.SimSmlStore',{});
			simSmsStore.pageSize=32;
			var store = simSmsStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var simSmlGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
//				id:'simSmlGrid',
				itemId:'grid',
				store:simSmsStore,
				border:false,
				treeName:'',
				selModel:sm,
				autoScroll:true,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
					{header: 'IMSI',dataIndex: 'imsi',width:145},
					{header: 'Alias',  dataIndex: 'alias',minWidth:140,
						renderer:function(value,metaData,record,rowIndex,store,view){
							var mark=record.get('detailDesc');
							if(mark!=null && mark!=""){
								value=value+" - "+mark;
							}
							return value;
						} 
					},
					{header: 'Admin Status', dataIndex: 'adminStatus',width:85,hidden:true,
						renderer:function(val){  
							return rs.adminStatus(val);
						} 
					},
					{header: 'Run Status', dataIndex: 'runStatus',width:85,
						renderer:function(val){  
							return rs.runStatus(val);
						} 
					},
					{header: 'Number',dataIndex: 'smsNumber',width:120},
					{header: 'content',dataIndex: 'content',flex:1,minWidth:220},
					{header: 'Encode',dataIndex: 'encode',width:80,
						renderer:function(val){  
							return rs.smsEncode(val);
						}
					},
					{header: 'SMS Status',dataIndex: 'smsStatus',width:80,
						renderer:function(val){  
							return rs.smsStatus(val);
						}
					},
					{header: 'SMS Result',dataIndex: 'smsResult',width:80,
						renderer:function(val){  
							return rs.smsUssdCallResult(val);
						}
					},
					{header: 'SMS Time',dataIndex: 'smsTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
					{header: 'Cur Fail Retries',dataIndex: 'curFailRetries',hidden:true},
					{header: 'Max Fail Retries',dataIndex: 'maxFailRetries',hidden:true},
					{header: 'SMS Receipt',dataIndex: 'smsReceipt',width:120,hidden:true},
					{header: 'Result Time',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'Receipt Time',dataIndex: 'receiptTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'Split Cnt',dataIndex: 'splitCnt',width:60,hidden:true},
					{header: 'Split Success Cnt',dataIndex: 'splitSuccCnt',width:60,hidden:true},
					{header: 'Split Failure Cnt',dataIndex: 'splitFailCnt',width:60,hidden:true},
					{header: 'Task Type',dataIndex: 'userTaskType',width:60,hidden:true,
						renderer:function(val){  
							return rs.userTaskType(val);
						}
					},
					{header: 'Task Id',dataIndex: 'userTaskId',width:120,hidden:true,
						renderer:function(val,metaData,record,rowIndex,store,view){
	                        if(record.get('userTaskType')==2){
	                                return rs.userTaskId(val);
	                        }else{   
	                                return val;
	                        }
						}
					},
					{header: 'Domain Uuid',dataIndex: 'domainUuid',width:60,hidden:true},
					{header: 'Gwp Uuid',dataIndex: 'gwpUuid',ulan:'gwpUuid',width:120,hidden:true},
					{header: 'SIM Uuid',dataIndex: 'uuid',ulan:'simUuidAbbr',width:120,hidden:true},
					{header: 'SMS Uuid',dataIndex: 'smlUuid',width:120,hidden:true},
					{header: 'Related Bkp',dataIndex: 'bkpPortNoStr',ulan:'bindBkp',width:120,hidden:true},
					
				],
				listeners:{
					itemdblclick: function(grid, row, columnindex,e){
//						if(maintenance){
//							return;
//						}
						som.maintenance = maintenance;
						var sendSms=som.setModel(row,0);
						var simUuid=row.get('uuid');
						var smlUuid=row.get('smlUuid');
						var domainUuid=row.get('domainUuid');
						simSmlUuids=simUuid+"-"+smlUuid;
						sendSms.down('form').getForm().findField('simUuids').setValue(simUuid);
						sendSms.down('form').getForm().findField('domainUuid').setValue(domainUuid);
						sendSms.down('form').getForm().findField('smlUuids').setValue(smlUuid);
						sendSms.down('form').getForm().findField('simSmlUuids').setValue(simSmlUuids);
						sendSms.show();
					}
				},
				dockedItems : [{
					 itemId:'pagingtoolbar',
				     dock: 'bottom',
					 xtype: 'pagingtoolbar',
				     store: simSmsStore,
				     pageSize: 10,
				     limit:10,
				     displayInfo: true,
				}]
			});
			
			var tbar = [];
			if(1){
				var sendSMS = Ext.create('Ext.button.Button',{
					xtype : 'button',
					text : 'Send SMS',
					iconCls : 'add',
					ulan:'btSendSms',
					flag:"sim_action",
					listeners : {
						click : function() {
							if ( simSmlGrid.getSelectionModel().hasSelection()){
								var records= simSmlGrid.getSelectionModel().getSelection();
								var simUuids="";
								var domainUuid="";
								var flag=0;
								var smsNumber;
								var smsStatus;
								var smsContent;
								var smsEncode;
								var smlUuids;
								var simSmlUuids;
								for ( var i = 0; i < records.length; i++) {
									if(records[i].get('uuid')==null||records[i].get('uuid')==undefined||records[i].get('uuid')==""){
										continue;
									}
									if(flag==0){
										smsNumber=records[i].get('smsNumber');
										smsContent=records[i].get('content');
										smsEncode=records[i].get('encode');
										smsStatus=records[i].get('smsStatus');
										simUuids=records[i].get('uuid');
										domainUuid=records[i].get('domainUuid');
										smlUuids=records[i].get('smlUuid');
										simSmlUuids=records[i].get('uuid')+"-"+records[i].get('smlUuid');
										flag=1;
									}else {
										simSmlUuids=simSmlUuids+","+records[i].get('uuid')+"-"+records[i].get('smlUuid');
										simUuids=simUuids+"-"+records[i].get('uuid');
										smlUuids=smlUuids+"-"+records[i].get('smlUuid');
										flag=2;
									}
								}
								if(simUuids==""){
									Ext.MessageBox.alert(boxWarnning,boxSimNotAvailable);
					 				return;
								}else{
									som.maintenance = maintenance;
									som.simcard = 0;
									var sendSms=som.setModel(records[0],1);
									
									sendSms.down('form').getForm().findField('simUuids').setValue(simUuids);
									sendSms.down('form').getForm().findField('smlUuids').setValue(smlUuids);
									sendSms.down('form').getForm().findField('simSmlUuids').setValue(simSmlUuids);
									sendSms.down('form').getForm().findField('domainUuid').setValue(domainUuid);
									
									sendSms.show();
								}
							}else{
				 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				 				return;
				 			}	
						}
					}				
				});
				tbar.push(sendSMS);
				tbar.push('-');
				
				var clearStatus = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Cancel SMS',
		       		 ulan:'btCancelSms',
		       		 iconCls:'option',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simSmlGrid.getSelectionModel().hasSelection()){
			       		 			var records=simSmlGrid.getSelectionModel().getSelection();
			       		 			if(records.length>0){
			       		 				
				       		 					var simUuids="";
						       		 			var domainUuid;
						       		 			var smlUuids="";
						       		 			var flag=0;
							       		 		for ( var i = 0; i < records.length; i++) {
													if(flag==0){
														simUuids=records[i].get('uuid');
														domainUuid=records[i].get('domainUuid');
														flag=1;
													}else {
														simUuids=simUuids+"-"+records[i].get('uuid');
														flag=2;
													}
							       		 		}
//							       		 	if(smlUuids==""){
//												Ext.MessageBox.alert(boxWarnning,'You choose SIM Card SMS is not available');
//								 				return;
//											}else{
							       		 	boxCancelSms = lanControll.getLanValue('boxCancelSms');
												Ext.MessageBox.confirm(boxWarnning,boxCancelSms,function(e) { 																				
					       		 					if( e == 'yes' ){
										       		 	Ext.Ajax.request({
									                		url:'smlManager!cancelSml.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
									                		method:'POST',
									                		timeout:5*60*1000,
									                		callback: function (options, success, response) {
						       									var obj=Ext.JSON.decode(response.responseText);
										                    	if(obj['success']){
										                    		simSmlGrid.getStore().load();
										                    	}else{
										                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
										                    	}
									                    	}
									                	})
					       		 					}
												})
//											}
			       		 			}
		       		 			}else{
		       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		       		 				return;
		       		 			}
		       	 		}
		       	 	}
		       	 });
				tbar.push(clearStatus);
				tbar.push('-');
				
				var clearSMS = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Clear SMS',
		       		 ulan:'btClearSms',
		       		 iconCls:'option',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simSmlGrid.getSelectionModel().hasSelection()){
			       		 			var records=simSmlGrid.getSelectionModel().getSelection();
			       		 			if(records.length>0){
			       		 				
				       		 					var smlUuids="";
				       		 					var simUuids="";
						       		 			var domainUuid;
						       		 			var flag=0;
							       		 		for ( var i = 0; i < records.length; i++) {
//													if(records[i].get('smlUuid')==null||records[i].get('smlUuid')==undefined||records[i].get('smlUuid')==""
//							       		 				||records[i].get('smsStatus')==1||records[i].get('smsStatus')==2){
//														continue;
//													}
													if(flag==0){
														simUuids=records[i].get('uuid');
														domainUuid=records[i].get('domainUuid');
														flag=1;
													}else {
														simUuids=simUuids+"-"+records[i].get('uuid');
														flag=2;
													}
							       		 		}
//							       		 	if(smlUuids==""){
//												Ext.MessageBox.alert(boxWarnning,'You choose SIM Card SMS is not available');
//								 				return;
//											}else{
							       		 	boxClearSms = lanControll.getLanValue('boxClearSms');
												Ext.MessageBox.confirm(boxWarnning,boxClearSms,function(e) { 																				
					       		 					if( e == 'yes' ){
								       		 	Ext.Ajax.request({
							                		url:'smlManager!clearSml.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
							                		method:'POST',
							                		timeout:5*60*1000,
							                		callback: function (options, success, response) {
				       									var obj=Ext.JSON.decode(response.responseText);
								                    	if(obj['success']){
								                    		simSmlGrid.getStore().load();
								                    	}else{
								                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
								                    	}
							                    	}
							                	})
											}
												})
//											}
			       		 			}
		       		 			}else{
		       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		       		 				return;
		       		 			}
		       	 		}
		       	 	}
		       	 });
				tbar.push(clearSMS);
				tbar.push('-');
			}
			if(!maintenance){
				var set = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Setting SIM Card',
		       		 ulan:'btSetting',
		       		 iconCls:'option',
		       		 flag:'other',
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simSmlGrid.getSelectionModel().hasSelection()){
			       		 			var records=simSmlGrid.getSelectionModel().getSelection();
			       		 			
									var ids="";
									var domainUuid=Ext.getCmp('groupPanel').domainUuid;
									var grpUuid=Ext.getCmp('groupPanel').treeId;
									var alias = "";
									var simStr = "";
	//								var selectAll=0;
	//								if(selectAll==1){
	//									ids=records[0].get('uuid');
	//								}else{
										for ( var i = 0; i < records.length; i++) {
											if(i==0){
												ids=records[i].get('uuid');
												alias = records[i].get('alias');
												simStr = records[i].get('imsi');
											}else {
												ids=ids+"-"+records[i].get('uuid');
											}
										}
	//								}
					       			var updateSimcard = Ext.getCmp('updateSimCard');
					       			if(updateSimcard==undefined|| updateSimcard=='undefined'){
					       				updateSimcard=Ext.create('app.view.operation.domain.roamzone.UpdateSimCard',{});
					       				lanControll.setLan(updateSimcard);
					       			}
					       			privilege.procUpdateSimCard(this.flag,updateSimcard);
					       			updateSimcard.down('form').getForm().reset();
					       			
					       			var groupInDomainStore=Ext.getCmp('updateSimCardGrpUuid').getStore();
					       			
					       			if(groupInDomainStore.storeId!='groupInDomainStore'){
					       				groupInDomainStore=Ext.create('app.store.operation.domain.GroupInDomainStore',{});
					       				Ext.getCmp('updateSimCardGrpUuid').store=groupInDomainStore;
					       			}
	
					       			groupInDomainStore.removeAll();
			       		 			groupInDomainStore.load({params:{domainUuid:domainUuid}});
				        			
			       		 			updateSimcard.down('form').getForm().findField('ids').setValue(ids);
			       		 			
	//		       		 			var form=simSmlGrid.up('panel').up('panel').down('form').getForm();
	//		       		 			var param=form.getValues();
			       		 			var basicForm = updateSimcard.down('form').getForm();
									if(records.length==1){
//										basicForm.findField('grpUuid').setValue(records[0].get('grpUuid'));
										basicForm.findField('adminStatus').setValue(records[0].get('adminStatus'));
										basicForm.findField('detailDesc').setValue(records[0].get('detailDesc'));
									}
				        			updateSimcard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
				        			updateSimcard.down('form').getForm().findField('grpUuidSearch').setValue(0);
				        			updateSimcard.down('form').getForm().findField('adminStatusSearch').setValue(0);
				        			updateSimcard.down('form').getForm().findField('runStatus').setValue(0);
				        			updateSimcard.down('form').getForm().findField('imsi').setValue('');
				        			updateSimcard.down('form').getForm().findField('aliasSearch').setValue('');
				        			updateSimcard.down('form').getForm().findField('alias').setValue(alias);
				        			updateSimcard.down('form').getForm().findField('simStr').setValue(simStr);
				        			updateSimcard.down('form').getForm().findField('selectAll').setValue(0);
	
				        			updateSimcard.show();
		       		 			}else{
		       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		       		 				return;
		       		 			}
		       	 		}
		       	 	}
		       	 });
				tbar.push(set);
				tbar.push('-');
			}
			var sel = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text: 'Select All',
	       		 iconCls: 'selectAll',
	       		 ulan:'btSelectAll',
	       		 flag:"domain_read",
	       		 listeners:{
	       			 click:function(){
	       		 		if(simSmlGrid.getSelectionModel().hasSelection()){
	       		 			simSmlGrid.getSelectionModel().deselectAll();  
	       		 		}else{
	       		 			simSmlGrid.getSelectionModel().selectAll();
	       		 		}
	       		 	}
	       		 }
	       	 });
			tbar.push(sel);
			tbar.push('-');
			
			var refresh = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
			       		var simSmlGrid=this.up('panel').down('panel[itemId=grid]');
	        		    var simSmlPage=simSmlGrid.getComponent('pagingtoolbar');
	        		    simSmlGrid.store.load();
//	        		    simSmlPage.moveFirst();
	       	 		}
	       	 	}
	       	 });
			tbar.push(refresh);
			tbar.push('->');
			
			var search = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 iconCls:'search',
	       		 ulan:'btSearch',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
	       		 		var eastSearch=this.up('panel').down('panel[itemId=search]');
	       		 		if(eastSearch.isHidden()){
	       		 			eastSearch.expand();
	       		 		}else{
	       		 			eastSearch.collapse();
	       		 		}
	       	 		}
	       	 	}
			});
			tbar.push(search);
			
			this.tbar=tbar;

			var search_grid=Ext.create('Ext.form.Panel',{
				border : false,
				bodyPadding : 5,
				defaults : {
				margins : '0 0 10 0'
				},
				items : [ {
					xtype:'textfield',
					fieldLabel:'IMSI',
					name:'imsi',
				},{
					xtype:'textfield',
					fieldLabel:'SIM Alias',
					ulan:'simAlias',
					name:'alias',
				},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(23,null),{
					xtype:'textfield',
					fieldLabel:'Send To',
					ulan:'sendTo',
					name:'number',
				},{
					xtype:'textfield',
					fieldLabel:'Content',
					name:'content',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time Begin',
					name:'smsTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time End',
					name:'smsTimeE',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Sent Time Begin',
					name:'resultTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Sent Time End',
					name:'resultTimeE',
					format: 'Y-m-d',
				},
				{
		            xtype: 'combo',
		            name: 'status',
		            fieldLabel: 'SMS Status',
		            ulan:'smsStatus',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'statusId',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'statusId' ],
						data : [ {
							name : '-SELECT-',
							statusId : -1
						},{
							name : lanControll.getLanValue('smsStatus_'+0),
							statusId :0
						}, {
							name : lanControll.getLanValue('smsStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('smsStatus_'+2),
							statusId : 2
						}, {
							name : lanControll.getLanValue('smsStatus_'+3),
							statusId : 3
						}, {
							name : lanControll.getLanValue('smsStatus_'+4),
							statusId : 4
						}, {
							name : lanControll.getLanValue('smsStatus_'+5),
							statusId : 5
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'smsResult',
		            fieldLabel: 'SMS Result',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'statusId',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'statusId' ],
						data : [{
							name : '-SELECT-',
							statusId : -1
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+0),
							statusId : 0
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+1),
							statusId : 1
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+2),
							statusId : 2
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+3),
							statusId : 3
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+4),
							statusId : 4
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+5),
							statusId : 5
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+6),
							statusId : 6
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+7),
							statusId : 7
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+8),
							statusId : 8
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+9),
							statusId : 9
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+10),
							statusId : 10
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+11),
							statusId : 11
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+12),
							statusId : 12
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+13),
							statusId : 13
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+14),
							statusId : 14
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+15),
							statusId : 15
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+16),
							statusId : 16
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+17),
							statusId : 17
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+18),
							statusId : 18
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+19),
							statusId : 19
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+20),
							statusId : 20
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+21),
							statusId : 21
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+22),
							statusId : 22
						}]
					}),
		        }
		        ],
				
				buttons : [ {
						text : 'Reset',
						flag:"domain_read",
						ulan:'btReset1',
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(-1);
							this.up('form').getForm().findField('smsResult').setValue(-1);
							this.up('form').getForm().findField('status').setValue(-1);
							
						}
				}, {
				text : 'Search',
				flag:"domain_read",
				ulan:'btSearch',
					handler : function() {
						var form=this.up('form').getForm();
	        		    var simSmlStore=simSmlGrid.getStore();
						var params = form.getValues();
						simSmlStore.on('beforeload', function (simSmlStore, options) {
	        		        var params = form.getValues();
	        		        Ext.apply(simSmlStore.proxy.extraParams, params);
	        		    },this,{single: true});
						var simSmlPage=simSmlGrid.getComponent('pagingtoolbar');
						simSmlPage.moveFirst();
					}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[simSmlGrid]
				},{
				 itemId:'search',
				 region:'east',
				 title : tiSearch,
				 collapsible: true,
				 collapsed:true,
				 width:300,
				 items:[search_grid]
			 }
			 ];
			this.callParent(arguments);		
		}
});
