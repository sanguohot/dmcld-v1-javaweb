Ext.define('app.view.sms.SimCallTab',{
		extend:'Ext.panel.Panel',
//		id:'simCallTab',
		title:lanControll.getLanValue('tiCallTask'),
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var com=Ext.create('app.util.CallOpenModel',{});
			var simCallStore=Ext.create('app.store.sms.SimCallStore',{});
			simCallStore.pageSize=32;
			var store = simCallStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var simCallGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
//				id:'simCallGrid',
				itemId:'grid',
				store:simCallStore,
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
							console.log("mark:"+mark)
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
					{header: 'Number',dataIndex: 'callNumber',minWidth:120,flex:1},
					{header: 'Direction',dataIndex: 'callDirection',width:120,
						renderer:function(val){  
							return rs.callDirection(val);
						}
					},
					{header: 'callerNumber',dataIndex: 'callerNumber',width:120},
					{header: 'srcIp',dataIndex: 'srcIp',width:120},
					{header: 'hangupSide',dataIndex: 'hangupSide',width:120,hidden:true,
						renderer:function(val){  
							return rs.hangupSide(val);
						}
					},
					{header: 'endReason',dataIndex: 'endReason',width:120,hidden:true,
						renderer:function(val){  
							return rs.endReason(val);
						}
					},
					{header: 'Auto Connect Flag',dataIndex: 'connectFlag',width:80,
						renderer:function(val){  
							return rs.connectFlag(val);
						}
					},
					{header: 'Duration',dataIndex: 'callDuration'},
					{header: 'billingSec',dataIndex: 'billingSec'},
					{header: 'Tone Mode',dataIndex: 'testToneMode',
						renderer:function(val){  
							return rs.testToneMode(val);
						}
					},
					{header: 'DTMF Number',dataIndex: 'dtmfNumber',width:60},
					{header: 'Call Status',dataIndex: 'callStatus',width:140,
						renderer:function(val){  
							return rs.callStatus(val);
						}
					},
					{header: 'Call Result',dataIndex: 'callResult',width:140,
						renderer:function(val){  
							return rs.smsUssdCallResult(val);
						}
					},
					{header: 'GSM Code',dataIndex: 'gsmCode',width:240,
						renderer:function(val){  
							return rs.gsmCode(val);
						}
					},
					
					{header: 'Start Time',dataIndex: 'callTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
					{header: 'Cur Fail Retries',dataIndex: 'curFailRetries',hidden:true},
					{header: 'Max Fail Retries',dataIndex: 'maxFailRetries',hidden:true},
					{header: 'Result Time',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
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
					{header: 'Call Uuid',dataIndex: 'callUuid',width:120,hidden:true},
					{header: 'Related Bkp',dataIndex: 'bkpPortNoStr',ulan:'bindBkp',width:120,hidden:true},
					
				],
				listeners:{
					itemdblclick: function(grid, row, columnindex,e){
//						if(maintenance){
//							return;
//						}
						com.maintenance = maintenance;
						var sendCall=com.setModel(row,0);
						var simUuid=row.get('uuid');
						var callUuid=row.get('callUuid');
						var domainUuid=row.get('domainUuid');
						simCallUuids=simUuid+"-"+callUuid;
						sendCall.down('form').getForm().findField('simUuids').setValue(simUuid);
						sendCall.down('form').getForm().findField('domainUuid').setValue(domainUuid);
						sendCall.down('form').getForm().findField('callUuids').setValue(callUuid);
						sendCall.down('form').getForm().findField('simCallUuids').setValue(simCallUuids);
						sendCall.show();
					}
				},
				dockedItems : [{
					 itemId:'pagingtoolbar',
				     dock: 'bottom',
					 xtype: 'pagingtoolbar',
				     store: simCallStore,
				     pageSize: 10,
				     limit:10,
				     displayInfo: true,
				}]
			});

			var tbar = [];
			if(1){
				var sendCall = Ext.create('Ext.button.Button',{
					xtype : 'button',
					text : 'Send CALL',
					iconCls : 'add',
					ulan:'btSendCall',
					flag:"sim_action",
					listeners : {
						click : function() {
							if ( simCallGrid.getSelectionModel().hasSelection()){
								var records= simCallGrid.getSelectionModel().getSelection();
								var simUuids="";
								var domainUuid="";
								var flag=0;
								var callNumber;
								var callStatus;
								var callUuids;
								var simCallUuids;
								for ( var i = 0; i < records.length; i++) {
									if(records[i].get('uuid')==null||records[i].get('uuid')==undefined||records[i].get('uuid')==""){
										continue;
									}
									if(flag==0){
										callNumber=records[i].get('callNumber');
										callStatus=records[i].get('callStatus');
										simUuids=records[i].get('uuid');
										domainUuid=records[i].get('domainUuid');
										callUuids=records[i].get('callUuid');
										simCallUuids=records[i].get('uuid')+"-"+records[i].get('callUuid');
										flag=1;
									}else {
										simCallUuids=simCallUuids+","+records[i].get('uuid')+"-"+records[i].get('callUuid');
										simUuids=simUuids+"-"+records[i].get('uuid');
										callUuids=callUuids+"-"+records[i].get('callUuid');
										flag=2;
									}
								}
								if(simUuids==""){
									
									Ext.MessageBox.alert(boxWarnning,boxSimNotAvailable);
					 				return;
								}else{
									com.maintenance = maintenance;
									com.simcard = 0;
									var sendCall=com.setModel(records[0],1);
									
									sendCall.down('form').getForm().findField('simUuids').setValue(simUuids);
									sendCall.down('form').getForm().findField('callUuids').setValue(callUuids);
									sendCall.down('form').getForm().findField('simCallUuids').setValue(simCallUuids);
									sendCall.down('form').getForm().findField('domainUuid').setValue(domainUuid);
									
									sendCall.show();
								}
							}else{
				 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				 				return;
				 			}	
						}
					}				
				});
				tbar.push(sendCall);
				tbar.push('-');
				
				var clearStatus = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Cancel CALL',
		       		 ulan:'btCancelCall',
		       		 iconCls:'option',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simCallGrid.getSelectionModel().hasSelection()){
			       		 			var records=simCallGrid.getSelectionModel().getSelection();
			       		 			if(records.length>0){
			       		 				
				       		 					var simUuids="";
						       		 			var domainUuid;
						       		 			var callUuids="";
						       		 			var flag=0;
							       		 		for ( var i = 0; i < records.length; i++) {
//													if(records[i].get('smlUuid')==null||records[i].get('smlUuid')==undefined||records[i].get('smlUuid')==""
//														||records[i].get('smsStatus')==0||records[i].get('smsStatus')==3){
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
//												Ext.MessageBox.alert(boxWarnning,'You choose SIM Card Call is not available');
//								 				return;
//											}else{
							       		 	boxCancelCall = lanControll.getLanValue('boxCancelCall');
												Ext.MessageBox.confirm(boxWarnning,boxCancelCall,function(e) { 																				
					       		 					if( e == 'yes' ){
										       		 	Ext.Ajax.request({
									                		url:'callManager!cancelCall.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
									                		method:'POST',
									                		timeout:5*60*1000,
									                		callback: function (options, success, response) {
						       									var obj=Ext.JSON.decode(response.responseText);
										                    	if(obj['success']){
										                    		simCallGrid.getStore().load();
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
				
				var clearCall = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Clear CALL',
		       		 ulan:'btClearCall',
		       		 iconCls:'option',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simCallGrid.getSelectionModel().hasSelection()){
			       		 			var records=simCallGrid.getSelectionModel().getSelection();
			       		 			if(records.length>0){
			       		 				
				       		 					var callUuids="";
				       		 					var simUuids="";
						       		 			var domainUuid;
						       		 			var flag=0;
							       		 		for ( var i = 0; i < records.length; i++) {
//													if(records[i].get('callUuid')==null||records[i].get('callUuid')==undefined||records[i].get('callUuid')==""
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
//							       		 	if(callUuids==""){
//												Ext.MessageBox.alert(boxWarnning,'You choose SIM Card Call is not available');
//								 				return;
//											}else{
							       		 	boxClearCall = lanControll.getLanValue('boxClearCall');
												Ext.MessageBox.confirm(boxWarnning,boxClearCall,function(e) { 																				
					       		 					if( e == 'yes' ){
								       		 	Ext.Ajax.request({
							                		url:'callManager!clearCall.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
							                		method:'POST',
							                		timeout:5*60*1000,
							                		callback: function (options, success, response) {
				       									var obj=Ext.JSON.decode(response.responseText);
								                    	if(obj['success']){
								                    		simCallGrid.getStore().load();
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
				tbar.push(clearCall);
				tbar.push('-');
			}
			
			if(!maintenance){
				
				var set = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Setting SIM Card',
		       		 iconCls:'option',
		       		 ulan:'btSetting',
		       		 flag:'other',
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simCallGrid.getSelectionModel().hasSelection()){
			       		 			var records=simCallGrid.getSelectionModel().getSelection();
			       		 			
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
	       		 ulan:'btSelectAll',
	       		 iconCls: 'selectAll',
	       		 flag:"domain_read",
	       		 listeners:{
	       			 click:function(){
	       		 		if(simCallGrid.getSelectionModel().hasSelection()){
	       		 			simCallGrid.getSelectionModel().deselectAll();  
	       		 		}else{
	       		 			simCallGrid.getSelectionModel().selectAll();
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
			       		var simCallGrid=this.up('panel').down('panel[itemId=grid]');
	        		    var simSmlPage=simCallGrid.getComponent('pagingtoolbar');
	        		    simCallGrid.store.load();
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
					name:'callNumber',
				},{
		            xtype: 'combo',
		            name: 'callStatus',
		            fieldLabel: 'Call Status',
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
							name : lanControll.getLanValue('callStatus_'+0),
							statusId :0
						}, {
							name : lanControll.getLanValue('callStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('callStatus_'+2),
							statusId : 2
						}, {
							name : lanControll.getLanValue('callStatus_'+3),
							statusId : 3
						}, {
							name : lanControll.getLanValue('callStatus_'+4),
							statusId : 4
						}, {
							name : lanControll.getLanValue('callStatus_'+5),
							statusId : 5
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'callResult',
		            fieldLabel: 'Call Result',
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
		        },{
					xtype:'datefield',
					fieldLabel:'Send Time Begin',
					name:'callTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time End',
					name:'callTimeE',
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
				}],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(-1);
							this.up('form').getForm().findField('callResult').setValue(-1);
							this.up('form').getForm().findField('callStatus').setValue(-1);
							
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
					handler : function() {
						var form=this.up('form').getForm();
	        		    var simCallStore=simCallGrid.getStore();
						var params = form.getValues();
						simCallStore.on('beforeload', function (simCallStore, options) {
	        		        var params = form.getValues();
	        		        Ext.apply(simCallStore.proxy.extraParams, params);
	        		    },this,{single: true});
						var simCallPage=simCallGrid.getComponent('pagingtoolbar');
						simCallPage.moveFirst();
					}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[simCallGrid]
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
