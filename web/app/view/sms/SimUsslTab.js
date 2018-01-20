Ext.define('app.view.sms.SimUsslTab',{
		extend:'Ext.panel.Panel',
//		id:'simUsslTab',
		title:lanControll.getLanValue('tiUssdTask'),
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var uom=Ext.create('app.util.UsslOpenModel',{});
			
			var simUssdStore=Ext.create('app.store.sms.SimUsslStore',{});
			simUssdStore.pageSize=32;
			var store = simUssdStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var simUssdGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
//				id:'simUsslGrid',
				itemId:'grid',
				store:simUssdStore,
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
					
					{header: 'Content',dataIndex: 'content',minWidth:220},
					{header: 'Params',dataIndex: 'ussdParam',hidden:false},
					{header: 'Ussd Status',dataIndex: 'ussdStatus',width:120,
						renderer:function(val){  
							return rs.ussdStatus(val);
						}
					},
					{header: 'Ussd Result',dataIndex: 'ussdResult',width:120,
						renderer:function(val){  
							return rs.smsUssdCallResult(val);
						}
					},
					{header: 'Ussd Time',dataIndex: 'ussdTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
					{header: 'Result Time',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'Cur Fail Retries',dataIndex: 'curFailRetries',hidden:true},
					{header: 'Max Fail Retries',dataIndex: 'maxFailRetries',hidden:true},
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
					{header: 'Ussd Uuid',dataIndex: 'usslUuid',width:120,hidden:true},
					{header: 'Related Bkp',dataIndex: 'bkpPortNoStr',ulan:'bindBkp',width:120,hidden:true},
					
				],
				listeners:{
					itemdblclick: function(grid, row, columnindex,e){
//						if(maintenance){
//							return;
//						}
						uom.maintenance = maintenance;
						var sendUssl=uom.setModel(row,0);
						var simUuid=row.get('uuid');
						var usslUuid=row.get('usslUuid');
						var domainUuid=row.get('domainUuid');
						var simUsslUuids=simUuid+"-"+usslUuid;
						sendUssl.down('form').getForm().findField('simUuids').setValue(simUuid);
						sendUssl.down('form').getForm().findField('domainUuid').setValue(domainUuid);
						sendUssl.down('form').getForm().findField('usslUuids').setValue(usslUuid);
						sendUssl.down('form').getForm().findField('simUsslUuids').setValue(simUsslUuids);
						sendUssl.show();
					}
				},
				dockedItems : [{
					 itemId:'pagingtoolbar',
				     dock: 'bottom',
					 xtype: 'pagingtoolbar',
				     store: simUssdStore,
				     pageSize: 10,
				     limit:10,
				     displayInfo: true,
				}]
			});
			
			var tbar = [];
			if(1){
				var sendUssd = Ext.create('Ext.button.Button',{
					xtype : 'button',
					text : 'Send USSD',
					ulan:'btSendUssd',
					iconCls : 'add',
					flag:"sim_action",
					listeners : {
						click : function() {
							if ( simUssdGrid.getSelectionModel().hasSelection()){
								var records= simUssdGrid.getSelectionModel().getSelection();
								var simUuids="";
								var domainUuid="";
								var flag=0;
								var usslContent;
								var ussdParam;
								var usslUuids;
								var usslStatus;
								var simUsslUuids;
								for ( var i = 0; i < records.length; i++) {
									if(records[i].get('uuid')==null||records[i].get('uuid')==undefined||records[i].get('uuid')==""){
										continue;
									}
									if(flag==0){
										usslContent=records[i].get('content');
										ussdParam=records[i].get('ussdParam');
										usslStatus=records[i].get('usslStatus');
										simUuids=records[i].get('uuid');
										domainUuid=records[i].get('domainUuid');
										usslUuids=records[i].get('usslUuid');
										simUsslUuids=records[i].get('uuid')+"-"+records[i].get('usslUuid');
										flag=1;
									}else {
										simUsslUuids=simUsslUuids+","+records[i].get('uuid')+"-"+records[i].get('usslUuid');
										simUuids=simUuids+"-"+records[i].get('uuid');
										usslUuids=usslUuids+"-"+records[i].get('usslUuid');
										flag=2;
									}
								}
								if(simUuids==""){
									Ext.MessageBox.alert(boxWarnning,boxSimNotAvailable);
					 				return;
								}else{
									uom.maintenance = maintenance;
									uom.simcard = 0;
									var sendUssl=uom.setModel(records[0],1);
									sendUssl.down('form').getForm().findField('simUuids').setValue(simUuids);
									sendUssl.down('form').getForm().findField('usslUuids').setValue(usslUuids);
									sendUssl.down('form').getForm().findField('simUsslUuids').setValue(simUsslUuids);
									sendUssl.down('form').getForm().findField('domainUuid').setValue(domainUuid);									
									sendUssl.show();
								}
							}else{
				 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				 				return;
				 			}	
						}
					}				
				});
				tbar.push(sendUssd);
				tbar.push('-');
				
				var clearStatus = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Cancel USSD',
		       		 ulan:'btCancelUssd',
		       		 iconCls:'option',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simUssdGrid.getSelectionModel().hasSelection()){
			       		 			var records=simUssdGrid.getSelectionModel().getSelection();
			       		 			if(records.length>0){
			       		 				
				       		 					var simUuids="";
						       		 			var domainUuid;
						       		 			var usslUuids="";
						       		 			var flag=0;
							       		 		for ( var i = 0; i < records.length; i++) {
//													if(records[i].get('usslUuid')==null||records[i].get('usslUuid')==undefined||records[i].get('usslUuid')==""
//														||records[i].get('ussdStatus')==0||records[i].get('ussdStatus')==3){
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
//							       		 	if(usslUuids==""){
//												Ext.MessageBox.alert(boxWarnning,'You choose SIM Card Ussd is not available');
//								 				return;
//											}else{
							       		 	boxCancelUssd = lanControll.getLanValue('boxCancelUssd');
												Ext.MessageBox.confirm(boxWarnning,boxCancelUssd,function(e) { 																				
						       		 				if( e == 'yes' ){
										       		 	Ext.Ajax.request({
									                		url:'usslManager!cancelUssl.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
									                		method:'POST',
									                		timeout:5*60*1000,
									                		callback: function (options, success, response) {
						       									var obj=Ext.JSON.decode(response.responseText);
										                    	if(obj['success']){
										                    		simUssdGrid.getStore().load();
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
				
				var clearUssd = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Clear USSD',
		       		 ulan:'btClearUssd',
		       		 iconCls:'option',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(simUssdGrid.getSelectionModel().hasSelection()){
			       		 			var records=simUssdGrid.getSelectionModel().getSelection();
			       		 			if(records.length>0){
			       		 				
				       		 					var usslUuids="";
				       		 					var simUuids="";
						       		 			var domainUuid;
						       		 			var flag=0;
							       		 		for ( var i = 0; i < records.length; i++) {
//													if(records[i].get('usslUuid')==null||records[i].get('usslUuid')==undefined||records[i].get('usslUuid')==""
//							       		 				||records[i].get('ussdStatus')==1||records[i].get('ussdStatus')==2){
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
//							       		 	if(usslUuids==""){
//												Ext.MessageBox.alert(boxWarnning,'You choose SIM Card Ussd is not available');
//								 				return;
//											}else{
							       		 	boxClearUssd = lanControll.getLanValue('boxClearUssd');
												Ext.MessageBox.confirm(boxWarnning,boxClearUssd,function(e) { 																				
					       		 					if( e == 'yes' ){
								       		 	Ext.Ajax.request({
							                		url:'usslManager!clearUssl.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
							                		method:'POST',
							                		timeout:5*60*1000,
							                		callback: function (options, success, response) {
				       									var obj=Ext.JSON.decode(response.responseText);
								                    	if(obj['success']){
								                    		simUssdGrid.getStore().load();
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
				tbar.push(clearUssd);
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
			       		 		if(simUssdGrid.getSelectionModel().hasSelection()){
			       		 			var records=simUssdGrid.getSelectionModel().getSelection();
			       		 			
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
	       		 		if(simUssdGrid.getSelectionModel().hasSelection()){
	       		 			simUssdGrid.getSelectionModel().deselectAll();  
	       		 		}else{
	       		 			simUssdGrid.getSelectionModel().selectAll();
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
			       		var simUssdGrid=this.up('panel').down('panel[itemId=grid]');
	        		    var simSmlPage=simUssdGrid.getComponent('pagingtoolbar');
	        		    simUssdGrid.store.load();
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
					fieldLabel:'Content',
					name:'content',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time Begin',
					name:'usslTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time End',
					name:'usslTimeE',
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
		            fieldLabel: 'Ussd Status',
					mode : 'local',
					ulan:'ussdStatus',
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
							name : lanControll.getLanValue('ussdStatus_'+0),
							statusId :0
						}, {
							name : lanControll.getLanValue('ussdStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('ussdStatus_'+2),
							statusId : 2
						}, {
							name : lanControll.getLanValue('ussdStatus_'+3),
							statusId : 3
						}, {
							name : lanControll.getLanValue('ussdStatus_'+4),
							statusId : 4
						}, {
							name : lanControll.getLanValue('ussdStatus_'+5),
							statusId : 5
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'usslResult',
		            fieldLabel: 'Ussd Result',
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
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(-1);
							this.up('form').getForm().findField('usslResult').setValue(-1);
							this.up('form').getForm().findField('status').setValue(-1);
						}
				}, {
				text : 'Search',
				flag:"domain_read",
				ulan:'btSearch',
					handler : function() {
						var form=this.up('form').getForm();
	        		    var simUsslStore=simUssdGrid.getStore();
						var params = form.getValues();
						simUsslStore.on('beforeload', function (simUsslStore, options) {
	        		        var params = form.getValues();
	        		        Ext.apply(simUsslStore.proxy.extraParams, params);
	        		    },this,{single: true});
						var simUsslPage=simUssdGrid.getComponent('pagingtoolbar');
						simUsslPage.moveFirst();
					}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[simUssdGrid]
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
