Ext.define('app.view.operation.domain.group.PaidListTab',{
		extend:'Ext.panel.Panel',
//		id:'paidListTab',
		layout:'border',
		autoScroll:false,
		border:false,
		treeName:'',
		forceRefresh:0,
		parentNodeTid:'',
		parentParentNodeTid:'',
		initComponent: function() {
			
			var paidListStore= Ext.create('app.store.operation.domain.paidgroup.PaidListStore', {});
			var store = paidListStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			})
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var paidListGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
//				id:'paidListGrid',
				itemId:'grid',
				border:false,
				layout:'fit',
				treeName:'',
				paidGrpUuid:0,
				domainUuid:0,
				parentNodeTid:'',
				store: paidListStore,
				autoScroll:true,
				selModel: sm,
				selectAll:0,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
			        {header: 'uuid',  dataIndex: 'uuid',width:80,hidden:true},
					{header: 'Name',  dataIndex: 'name',width:128},
					{header: 'Alias',  dataIndex: 'alias',width:128,hidden:true},
					{header: 'Paid Mode', dataIndex: 'paidMode',width:85,
						renderer:function(val){  
							return rs.paidMode(val);
						} 
					},
					{header: 'Paid Number', dataIndex: 'paidNumber',width:80},
					{header: 'Paid Content', dataIndex: 'paidContent',width:180},
					{header: 'Paid Status', dataIndex: 'paidStatus',width:85,
						renderer:function(val){  
							return rs.paidStatus(val);
						} 
					},
					{header: 'Connect Flag', dataIndex: 'connectFlag',width:80,hidden:true,
						renderer:function(val){  
							return rs.yesOrNo(val);
						} 
					},
					{header: 'Call Duration', dataIndex: 'callDuration',width:80,hidden:true},
					{header: 'Paid Report', dataIndex: 'paidReport',width:180},
					{header: 'Create Time',dataIndex:'createTime',width:100,xtype: 'datecolumn', format:'H:i:s',hidden:true},
					{header: 'Used Time',dataIndex:'lastUsedTime',width:160,xtype: 'datecolumn', format:'Y-m-d H:i:s'},
					{header: 'domainUuid',dataIndex: 'domainUuid',width:80,hidden:true},
					{header: 'paidGrpUuid',dataIndex: 'paidGrpUuid',width:80,hidden:true},
					{header: 'paidSimUuid',dataIndex:'paidSimUuid',width:100,hidden:true },
					
				],
				listeners:{
					itemdblclick: function(view, record, item, index, e, eOpts ){
						var updatePaidCard = Ext.getCmp('updatePaidCard');
						if(updatePaidCard=='undefined'||updatePaidCard==undefined){
							updatePaidCard=Ext.create('app.view.operation.domain.group.UpdatePaidCard');
							lanControll.setLan(updatePaidCard);
						}
						var paidGrpUuid=record.get('paidGrpUuid');
						var domainUuid=record.get('domainUuid');
						var name=record.get('name');
						var alias=record.get('alias');
						var paidMode=record.get('paidMode');
						var paidNumber=record.get('paidNumber');
						
						var connectFlag=record.get('connectFlag');
						var callDuration=record.get('callDuration');
						
						var paidContent=record.get('paidContent');
						var paidReport=record.get('paidReport');
						var paidStatus=record.get('paidStatus');
						var uuid=record.get('uuid');
						
						
						updatePaidCard.down('form').getForm().findField('alias').setVisible(true);
						updatePaidCard.down('form').getForm().findField('name').setVisible(true);
						updatePaidCard.down('form').getForm().findField('name').allowBlank=false;
						updatePaidCard.down('form').getForm().findField('paidMode').setVisible(true);
						updatePaidCard.down('form').getForm().findField('paidNumber').setVisible(true);
						updatePaidCard.down('form').getForm().findField('connectFlagAll').setVisible(true);
						updatePaidCard.down('form').getForm().findField('callDuration').setVisible(true);
						updatePaidCard.down('form').getForm().findField('paidContent').setVisible(true);
						updatePaidCard.down('form').getForm().findField('paidReport').setVisible(true);
						
						updatePaidCard.down('form').getForm().findField('uuid').setValue(uuid);
						updatePaidCard.down('form').getForm().findField('alias').setValue(alias);
						updatePaidCard.down('form').getForm().findField('name').setValue(name);
						updatePaidCard.down('form').getForm().findField('paidMode').setValue(paidMode);
						updatePaidCard.down('form').getForm().findField('paidNumber').setValue(paidNumber);
						updatePaidCard.down('form').getForm().findField('connectFlag').setValue(connectFlag);
						updatePaidCard.down('form').getForm().findField('callDuration').setValue(callDuration);
						updatePaidCard.down('form').getForm().findField('paidContent').setValue(paidContent);
						updatePaidCard.down('form').getForm().findField('paidReport').setValue(paidReport);
						updatePaidCard.down('form').getForm().findField('paidStatus').setValue(paidStatus);
						updatePaidCard.down('form').getForm().findField('paidGrpUuid').setValue(paidGrpUuid);
						updatePaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
						
						updatePaidCard.down('form').getForm().findField('uuids').setValue('');
						updatePaidCard.show();
					},
					
				},
				dockedItems : [{
					 itemId:'pagingtoolbar',
				     dock: 'bottom',
					 xtype: 'pagingtoolbar',
				     store: paidListStore,
				     pageSize: 10,
				     limit:10,
				     displayInfo: true,
				}]
			});
			
			var tbar = [];
			if(!maintenance){
				var add = Ext.create('Ext.button.Button',{
					xtype : 'button',
					text : 'Add Paid Card',
					iconCls : 'add',
					flag:"domain_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							var domainUuid=paidListGrid.parentParentNodeTid;
							var paidGrpUuid=paidListGrid.treeName;
							
							var addPaidCard = Ext.getCmp('addPaidCard');
							if(addPaidCard=='undefined'||addPaidCard==undefined){
									addPaidCard=Ext.create('app.view.operation.domain.group.AddPaidCard');
									lanControll.setLan(addPaidCard);
							}
							addPaidCard.down('form').getForm().findField('paidGrpUuid').setValue(paidGrpUuid);
							addPaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
							addPaidCard.show();
						}
					}				
				});
				tbar.push(add);
				tbar.push('-');
				
				
				
				var del = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Delete Paid Card',
		       		ulan:'btDel',
		       		 iconCls:'remove',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){

		       			if ( paidListGrid.getSelectionModel().hasSelection() ){
		       				
       							var records= paidListGrid.getSelectionModel().getSelection();
       							var ids="";
       							var cnt=0;
       							var names=new Array();
       							var name = "";
       							var info="";
       							var selectAll=paidListGrid.selectAll;
       							
       							var paidGrpUuid=0;
       							var domainUuid=0;
       							
       							if(selectAll==1){
       								info=lanControll.getLanValue('boxDelPaidCardAll');
       								domainUuid=paidListGrid.parentParentNodeTid;
       								paidGrpUuid=paidListGrid.treeName;
       								ids=records[0].get('uuid');
       								name = records[0].get('name');
       							}else{
       								for ( var i = 0; i < records.length; i++) {
    									if(i==0){
    										ids=records[i].get('uuid');
    										name = records[i].get('name');
    										domainUuid=records[i].get('domainUuid');
    										paidGrpUuid=records[i].get('paidGrpUuid');
    									}else {
    										cnt=1;
    										ids=ids+","+records[i].get('uuid');
    									}
    									if(records[i].get('paidStatus')!=4 && records[i].get('paidStatus')!=5 && records[i].get('paidStatus')!=6){
    										if(names.length==3){
    											names.push("</br>... ...");
    										}else if(names.length==0){
    											names.push(records[i].get('name'));
    										}else if(names.length<3){
    											names.push("</br>"+records[i].get('name'));
    										}
    									}
    									
//    											nesInSiteStore.remove(records[i]);
    								}
    								if(names.length > 0){
    									names=names+lanControll.getLanValue('boxDelPaidCardNotUsed');
    								}
    								info=names+lanControll.getLanValue('boxDelPaidCard');
       							}
       							
								
								Ext.MessageBox.confirm(boxWarnning,info,function(e) { 																				
		       						if( e == 'yes' ){
		       							var form=paidListGrid.up('panel').up('panel').down('form').getForm();
		       							var param=form.getValues();
//		       							var param=paidListGrid.store.proxy.extraParams;
		       							param['cardName']=name;
		       							Ext.Ajax.request({
					                		url:'paidListManager!deletePaid.action?uuids='+ids+"&domainUuid="+domainUuid+"&paidGrpUuid="+paidGrpUuid+"&selectAll="+selectAll,
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
					                    			Ext.MessageBox.alert(boxSuccess,boxDelSucc);
					                    			paidListGrid.selectAll=0;
					                    			Ext.getCmp('paidListTab').down('panel[itemId=grid]').getStore().load();
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
						                    	}
					                    	}
					                	})
		       						}	
									})
								
		       							
		       			}else{
		       				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
       		 				return;
		       			}
		       		
		       	 		}
		       	 	}
		       	 });
				tbar.push(del);
				tbar.push('-');
				
				var set = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Setting',
		       		ulan:'btSetting',
		       		 iconCls:'option',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){
			       		 		if(paidListGrid.getSelectionModel().hasSelection()&&paidListGrid.getSelectionModel().getSelection().length>1){
			       		 			var records=paidListGrid.getSelectionModel().getSelection();
									var ids="";			
									var discardCnt=0;
									var paidGrpUuid=records[0].get('paidGrpUuid');
									var domainUuid=records[0].get('domainUuid');
									var name = "";
									var cnt = 0;
									var selectAll=paidListGrid.selectAll;
									if(selectAll==1){
										ids=records[0].get('uuid');
									}else{
										for ( var i = 0; i < records.length; i++) {
											var newValue=records[i].get('paidStatus');
											if(newValue==0||newValue==1||newValue==4||newValue==5||newValue==6){
												if(cnt == 0){
													ids=records[i].get('uuid');
													name=records[i].get('name');
												}else{
													ids=ids+","+records[i].get('uuid');
												}
												cnt++;
											}else{
												discardCnt=discardCnt+1;
												continue;
											}
										}
									}
									
									var updatePaidCard = Ext.getCmp('updatePaidCard');
									if(updatePaidCard=='undefined'||updatePaidCard==undefined){
										updatePaidCard=Ext.create('app.view.operation.domain.group.UpdatePaidCard');
										lanControll.setLan(updatePaidCard);
									}

						
									updatePaidCard.down('form').getForm().findField('alias').setVisible(false);
									updatePaidCard.down('form').getForm().findField('name').setValue(name);
									updatePaidCard.down('form').getForm().findField('name').setVisible(false);
									updatePaidCard.down('form').getForm().findField('name').allowBlank=true;
									updatePaidCard.down('form').getForm().findField('paidMode').setVisible(false);
									updatePaidCard.down('form').getForm().findField('paidNumber').setVisible(false);
									updatePaidCard.down('form').getForm().findField('connectFlagAll').setVisible(false);
									updatePaidCard.down('form').getForm().findField('callDuration').setVisible(false);
									updatePaidCard.down('form').getForm().findField('paidContent').setVisible(false);
									updatePaidCard.down('form').getForm().findField('paidReport').setVisible(false);
									updatePaidCard.down('form').getForm().findField('paidStatus').setValue(0);
									updatePaidCard.down('form').getForm().findField('uuids').setValue(ids);
									updatePaidCard.down('form').getForm().findField('paidGrpUuid').setValue(paidGrpUuid);
									updatePaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
									updatePaidCard.down('form').getForm().findField('discardCnt').setValue(discardCnt);
									
									
									var form=paidListGrid.up('panel').up('panel').down('form').getForm();
			       		 			var param=form.getValues();
//									var param=paidListGrid.store.proxy.extraParams;
				        			updatePaidCard.down('form').getForm().findField('name').setValue(param['name']);
				        			updatePaidCard.down('form').getForm().findField('alias').setValue(param['alise']);
				        			updatePaidCard.down('form').getForm().findField('paidMode').setValue(param['paidMode']);
				        			updatePaidCard.down('form').getForm().findField('paidNumber').setValue(param['paidNumber']);
				        			updatePaidCard.down('form').getForm().findField('paidContent').setValue(param['paidContent']);
				        			updatePaidCard.down('form').getForm().findField('paidStatusSearch').setValue(param['paidStatus']);
				        			updatePaidCard.down('form').getForm().findField('paidReportSearch').setValue(param['paidReport']);
				        			updatePaidCard.down('form').getForm().findField('selectAll').setValue(selectAll);
									
									updatePaidCard.show();
				        			
		       		 			}else if(paidListGrid.getSelectionModel().hasSelection()&&paidListGrid.getSelectionModel().getSelection().length==1){
			       		 			var updatePaidCard = Ext.getCmp('updatePaidCard');
									if(updatePaidCard=='undefined'||updatePaidCard==undefined){
										updatePaidCard=Ext.create('app.view.operation.domain.group.UpdatePaidCard');
										lanControll.setLan(updatePaidCard);
									}
									var record=paidListGrid.getSelectionModel().getSelection()[0];
									var paidGrpUuid=record.get('paidGrpUuid');
									var domainUuid=record.get('domainUuid');
									var name=record.get('name');
									var alias=record.get('alias');
									var paidMode=record.get('paidMode');
									var paidNumber=record.get('paidNumber');
									
									var connectFlag=record.get('connectFlag');
									var callDuration=record.get('callDuration');
									
									var paidContent=record.get('paidContent');
									var paidReport=record.get('paidReport');
									var paidStatus=record.get('paidStatus');
									var uuid=record.get('uuid');
									
									
									updatePaidCard.down('form').getForm().findField('alias').setVisible(true);
									updatePaidCard.down('form').getForm().findField('name').setVisible(true);
									updatePaidCard.down('form').getForm().findField('name').allowBlank=false;
									updatePaidCard.down('form').getForm().findField('paidMode').setVisible(true);
									updatePaidCard.down('form').getForm().findField('paidNumber').setVisible(true);
									updatePaidCard.down('form').getForm().findField('connectFlagAll').setVisible(true);
									updatePaidCard.down('form').getForm().findField('callDuration').setVisible(true);
									updatePaidCard.down('form').getForm().findField('paidContent').setVisible(true);
									updatePaidCard.down('form').getForm().findField('paidReport').setVisible(true);
									
									updatePaidCard.down('form').getForm().findField('uuid').setValue(uuid);
									updatePaidCard.down('form').getForm().findField('alias').setValue(alias);
									updatePaidCard.down('form').getForm().findField('name').setValue(name);
									updatePaidCard.down('form').getForm().findField('paidMode').setValue(paidMode);
									updatePaidCard.down('form').getForm().findField('paidNumber').setValue(paidNumber);
									updatePaidCard.down('form').getForm().findField('connectFlag').setValue(connectFlag);
									updatePaidCard.down('form').getForm().findField('callDuration').setValue(callDuration);
									updatePaidCard.down('form').getForm().findField('paidContent').setValue(paidContent);
									updatePaidCard.down('form').getForm().findField('paidReport').setValue(paidReport);
									updatePaidCard.down('form').getForm().findField('paidStatus').setValue(paidStatus);
									updatePaidCard.down('form').getForm().findField('paidGrpUuid').setValue(paidGrpUuid);
									updatePaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
									
									updatePaidCard.down('form').getForm().findField('uuids').setValue('');
									updatePaidCard.show();
		       		 			}else{
		       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		       		 				return;
		       		 			}		       		 		
		       	 		}
		       	 	}
		       	 });
				tbar.push(set);
				tbar.push('-');
				
				var importC = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Import Paid Card',
		       		ulan:'btImport',
		       		 iconCls:'upgrade',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){
				       		var domainUuid=paidListGrid.parentParentNodeTid;
							var paidGrpUuid=paidListGrid.treeName;
							var importPaidCard=Ext.getCmp('importPaidCard');
							if(importPaidCard==undefined){
								importPaidCard=Ext.create('app.view.operation.domain.group.ImportPaidCard');
								lanControll.setLan(importPaidCard);
							}
							
							importPaidCard.down('form').getForm().findField('paidGrpUuid').setValue(paidGrpUuid);
							importPaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
							importPaidCard.show();
		       		 		
		       	 		}
		       	 	}
		       	 
		       	 });
				tbar.push(importC);
				tbar.push('-');
			}
			var exportC = Ext.create("Ext.button.Button",{
	       		 xtype:'button',
	       		 text:'Export Paid Card',
	       		ulan:'btExport',
	       		 iconCls:'export',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){

		       			if ( paidListGrid.getSelectionModel().hasSelection() ){
		       				
   							var records= paidListGrid.getSelectionModel().getSelection();
   							var ids="";
   							var cnt=0;
   							var domainUuid=paidListGrid.parentParentNodeTid;
							var paidGrpUuid=paidListGrid.treeName;
   							var selectAll=paidListGrid.selectAll;
							var info="Are you sure export comply with the conditions of Paid Card";
							if(selectAll==1){
								info=lanControll.getLanValue('boxExportPaidAll');
								ids=records[0].get('uuid');
							}else{
								info=lanControll.getLanValue('boxExportPaid');
								var names=new Array();
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('uuid');
									}
								}
							}
   							
							Ext.MessageBox.confirm(boxWarnning,info,function(e) { 																				
								if( e == 'yes' ){
									var form=paidListGrid.up('panel').up('panel').down('form').getForm();
	       							var param=form.getValues();
//									var param=paidListGrid.store.proxy.extraParams;
									Ext.Ajax.request({
										url:'exportPaidCard.action?ids='+ids+"&selectAll="+selectAll+"&grpUuid="+paidGrpUuid+"&domainUuid="+domainUuid,
										method:'POST',
										params:param,
										callback: function (options, success, response) {
										var obj=Ext.JSON.decode(response.responseText);
										if(obj["success"]){
											window.location.href="download/"+obj["fileName"];
										}else{
											Ext.MessageBox.alert(boxFailture,boxExportFail);
										}
										}
									})
								}
							})
		       							
		       			}else{
		       				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		       				return;
		       			}
	       	 		}
	       	 	}
	       	 
	       	 });
			tbar.push(exportC);
			tbar.push('-');
			
			var sel = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text: 'Select All',
	       		 iconCls: 'selectAll',
	       		ulan:'btSelectAll',
	       		 flag:"domain_read",
	       		 listeners:{
	       			 click:function(){
	       		 		if(paidListGrid.getSelectionModel().hasSelection()){
	       		 			this.setIconCls('selectOut');
	       		 			paidListGrid.selectAll=0;
	       		 			paidListGrid.getSelectionModel().deselectAll();
	       		 			paidListGrid.selModel.setLocked(false);	
	       		 		}else{
		       		 		this.setIconCls('selectIn');
		       		 		paidListGrid.selectAll=1;
		       		 		paidListGrid.getSelectionModel().selectAll();
		       		 		paidListGrid.selModel.setLocked(true);
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
	       		 		var domainUuid=paidListGrid.parentParentNodeTid;
						this.up('panel').down('panel[itemId=grid]').getStore().load();
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
					fieldLabel:'Name',
					name:'name',
				},{
					xtype:'textfield',
					fieldLabel:'Alias',
					name:'alias',
				},{
		            xtype: 'combo',
		            name: 'paidStatus',
		            fieldLabel: 'Paid Status',
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
							name : lanControll.getLanValue('paidStatus_'+0),
							statusId : 0
						},{
							name : lanControll.getLanValue('paidStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('paidStatus_'+2),
							statusId : 2
						}, {
							name : lanControll.getLanValue('paidStatus_'+3),
							statusId : 3
						}, {
							name : lanControll.getLanValue('paidStatus_'+4),
							statusId : 4
						}, {
							name : lanControll.getLanValue('paidStatus_'+5),
							statusId : 5
						}, {
							name : lanControll.getLanValue('paidStatus_'+6),
							statusId : 6
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'paidMode',
		            fieldLabel: 'Paid Mode',
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
							name : lanControll.getLanValue('paidMode_'+0),
							statusId : 0
						},{
							name : lanControll.getLanValue('paidMode_'+1),
							statusId : 1
						},{
							name : lanControll.getLanValue('paidMode_'+2),
							statusId : 2
						}]
					}),
					
		        },{
					xtype:'textfield',
					fieldLabel:'Paid Number',
					name:'paidNumber',
				},{
					xtype:'textfield',
					fieldLabel:'Paid Content',
					name:'paidContent',
				},{
					xtype:'textfield',
					fieldLabel:'Paid Report',
					name:'paidReport',
				}],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('paidStatus').setValue(-1);
							this.up('form').getForm().findField('paidMode').setValue(-1);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
				handler : function() {
					var form=this.up('form').getForm();
					
					var paidListGridStore=paidListGrid.getStore();
					var params = form.getValues();
        			paidListGridStore.on('beforeload', function (paidListGridStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(paidListGridStore.proxy.extraParams, params);
        		    },this,{single: true});
        			
        			var panel = this.up('form').up('panel').up('panel').down('panel[itemId=grid]');
        			var paging = panel.getComponent('pagingtoolbar');
        			paging.moveFirst();
        			
        			
				}
				}]
			});
			
			paidListStore.on('load', function(){
			    	var total = paidListStore.getCount();//数据行数  	    	
			    	if(paidListGrid.selectAll==1){
			    		paidListGrid.selModel.setLocked(false);
						if(total>0){
							paidListGrid.selModel.selectRange(0,total-1,true);  
						}
						paidListGrid.selModel.setLocked(true);
					}else{
						paidListGrid.selModel.setLocked(false);
					}	
			 });
			
			 this.items=[{
				 region: 'center',
				 layout:'fit',
				 items:[paidListGrid]
				       
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
		},
		listeners: {
	        activate: function(tab){
				var grid=tab.down('panel').down('panel');
				if(tab.forceRefresh==1){
					tab.forceRefresh=0;
					var page=grid.getComponent('pagingtoolbar');
					page.moveFirst();
				}
			}
		}	
});
