Ext.define('app.view.operation.domain.roamzone.SimCardTab',{
		extend:'Ext.panel.Panel',
//		id:'simCardTab',
		requires: [
	               'Ext.util.Format',
	               'Ext.grid.Panel',
	               'Ext.toolbar.Paging',
	               'app.view.operation.domain.group.ImportSIMCard',
	               'app.store.monitor.GrpSmsStore'
		           ],
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var simCardStore= Ext.create('app.store.operation.domain.roamzone.SimCardStore', {});
			simCardStore.pageSize=32;
			simCardStore.proxy.url = "simCardInGroupManager!getList.action";
			
			var store = simCardStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var sm = Ext.create('Ext.selection.CheckboxModel');
			
//			var collection=Ext.create('Ext.util.MixedCollection');
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var simCardGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
//				id:'simCardGrid',
				itemId:'grid',
				maintenance:maintenance,
				border:false,
				layout:'fit',
//				collection:collection,
				selectAll:0,
				store: simCardStore,
				autoScroll:true,
				selModel: sm,
		        viewConfig : {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
				},
				columns: [
				    {header: 'simUuid',  dataIndex: 'uuid',ulan:'simUuidAbbr',hidden:true },
					{header: 'IMSI',  dataIndex: 'imsi',width:140},
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
					{header: 'Opr Status', dataIndex: 'oprStatus',width:85,hidden:true,
						renderer:function(val){  
							return rs.oprStatus(val);
						} 
					},
					{header: 'Run Status', dataIndex: 'runStatus',width:120,
						renderer:function(val){  
							return rs.runStatusImg(val);
						} 
					},
					{header: 'Operator',dataIndex:'operator1',ulan:'operatorAbbr',width:80},
					{header: 'Operator',dataIndex:'operator',ulan:'operatorSpec',width:80,hidden:true},
					{header: 'simNumber',dataIndex:'simNumber',width:120,hidden:true},
					{header: 'Mobile',dataIndex:'mobile',width:120,hidden:false },
					{header: 'lastBalance',dataIndex:'lastBalance',width:100 },
					{header: 'lastBalanceTime',dataIndex:'lastBalanceTime',hidden:false,xtype: 'datecolumn',format:'H:i:s',width:75},
					{header: 'Cur Balance',dataIndex:'curBalance',width:100 },
					{header: 'Left Call-Time',dataIndex:'leftCallTime',width:100 },
					{header: 'Blocked Flag',dataIndex:'blockedFlag',width:100,hidden:true,
						renderer:function(val){  
							return rs.yesOrNo(val);
						} 
					},
					{header: 'Bind IMEI',dataIndex:'bindImei',width:140,hidden:true },
					
					
					{header: 'Deactive Reason',dataIndex:'deactiveReason',width:140, 
						renderer:function(val){  
							return rs.switchReason(val);
						} 
					},
					{header: 'Last Deactive Reason',dataIndex:'lastDeactiveReason',width:140, hidden:true,
						renderer:function(val){  
							return rs.switchReason(val);
						} 
					},
					{header: 'lastSiteName',dataIndex:'lastSiteName',ulan:'lastSiteNameAbbr',hidden:true,width:100},
					{header: 'Group Start Time',dataIndex:'lastGroupTime',ulan:'lastGroupTimeAbbr',hidden:true,xtype: 'datecolumn',format:'H:i:s',width:75},
					{header: 'lastLoadTime',dataIndex:'lastLoadTime',hidden:true,xtype: 'datecolumn',format:'H:i:s',width:75},
					{header: 'lastBindTime',dataIndex:'lastBindTime',hidden:true,xtype: 'datecolumn',format:'H:i:s',width:75},
					{header: 'lastUsedTime',dataIndex:'lastUsedTime',hidden:true,xtype: 'datecolumn',format:'H:i:s',width:75},
					

					{header: 'Low Flag',dataIndex:'lowBalanceFlag',width:100,hidden:true,
						renderer:function(val){  
							return rs.lowBalanceFlag(val);
						} 
					},
					{header: 'No Balance Flag',dataIndex:'noBalanceFlag',width:100,hidden:true,
						renderer:function(val){  
							return rs.yesOrNo(val);
						} 
					},
					{header: 'Recharged Flag',dataIndex:'simRechargedFlag',width:100,hidden:true,
						renderer:function(val){  
							return rs.simRechargedFlag(val);
						} 
					},
					{header: 'pin2Code',dataIndex:'pin2Code',hidden:true},
					{header: 'paidListUuid',dataIndex:'paidListUuid',width:80,hidden:true},
					{header: 'promotionGrpUuid',dataIndex:'promotionGrpUuid',hidden:true },
					{header: 'Promotion Status',dataIndex:'promotionStatus',width:100,hidden:true,
						renderer:function(val){  
							return rs.promotionStatus(val);
						} 
					},
					{header: 'promCallTime',dataIndex:'promCallTime',hidden:true},
					{header: 'promotionCount',dataIndex:'promotionCount',hidden:true},
					{header: 'promotionReport',dataIndex:'promotionReport',width:120,hidden:true},
					{header: 'promotionTime',dataIndex:'promotionTime',hidden:true,xtype: 'datecolumn',format:'H:i:s',width:75},
					{header: 'lastPromTime',dataIndex:'lastPromTime',hidden:true,xtype: 'datecolumn',format:'H:i:s',width:75},
					{header: 'localSimFlag',dataIndex:'localSimFlag',hidden:true,
						renderer:function(val){  
							return rs.yesOrNo(val);
						} 
					},
					{header: 'RegFail',dataIndex:'hbmRegFailCount',hidden:true },
					{header: 'acdCdrShort',dataIndex:'hbmAcdShortCount',hidden:true },
					{header: 'acdCdrFail',dataIndex:'hbmAcdFailCount',hidden:true },
					{header: 'acdSmsFail',dataIndex:'hbmAcdSmsCount',hidden:true },
					{header: 'smsFail',dataIndex:'hbmSmsFailCount',hidden:true },
					{header: 'callFail',ulan:'callFailCountAbbr',dataIndex:'hbmCallFailCount',hidden:true },
					{header: 'dtmfFail',dataIndex:'hbmDtmfFailCount',ulan:'hbmDtmfFailCountAbbr',hidden:true },
					
					{header: 'domainUuid',  dataIndex: 'domainUuid',hidden:true },
					{header: 'grpUuid',  dataIndex: 'grpUuid',hidden:true },
					{header: 'lastSiteUuid',  dataIndex: 'lastSiteUuid',hidden:true },
					{header: 'bkpUuid',dataIndex:'bkpUuid',ulan:'bkpUuid',hidden:true },
					{header: 'localGwpUuid',dataIndex:'localGwpUuid',hidden:true },
					{header: 'Related Bkp',dataIndex: 'bkpPortNoStr',ulan:'bindBkp',width:120,hidden:true},
			        {header: 'Related Gwp',width:120,dataIndex: 'gwpPortNoStr',ulan:'bindGwpAbbr',},
					{
			            header:'Links',
			            dataIndex:'links',
			            width:120,
			            autoWidth:false,
			            renderer: function(value,metaData,record,rowIndex,store,view){
							var uuid;
							var bkp = "";
							var gwp = "";
							if(record.get('localSimFlag') == 1){
								uuid = record.get('localGwpUuid')
							}else{
								uuid = parseInt(record.get('gwpUuid'));
							}
							if(uuid > 0){
								gwp = "<input align='middle' style='width:40%;color:green'" +
									" type='button' value='GWP'>";						
							}else if(uuid == 0){
								gwp = "<input align='middle' style='width:40%'" +
								" type='button' disabled='disabled' value='GWP'>";
							}
							
							uuid = parseInt(record.get('bkpUuid'));
							if(uuid > 0){
								bkp = "<input align='middle' style='width:40%;color:green'" +
								" type='button' value='BKP'>";	
							}else if(uuid == 0){
								bkp = "<input align='middle' style='width:40%'" +
								" type='button' disabled='disabled' value='BKP'>";
							}
					        return bkp+'&nbsp&nbsp'+gwp;
				    	}
					},
				],
				listeners:{
					itemdblclick: function(view, record, item, index, e, eOpts ){
						var tabpanel = view.up('panel').up('panel').up('panel').up('panel');
						var uuid = record.get('uuid');
						var domainUuid = record.get('domainUuid');
						var prefix = 'SimCardTab_';
						if(this.maintenance){
							prefix = 'maintenance_'+prefix;
						}
						var id=prefix+"simUuid_"+uuid;
						var tipId = prefix+'simTipId_'+uuid;
						var tab = Ext.getCmp(id);
						var params = {params : {uuid:uuid}};
						if(tab==undefined){
							tab = Ext.create('app.view.module.SimCardPanel',{
								id:id,
								tipId:tipId,
			//					title:gwpAlias,
								params:params,
								prefix:prefix,
								record:record,
								domainUuid:domainUuid,
							});
							lanControll.setLan(tab);
							tabpanel.add(tab);
							
						}
//						tab.store.load(params);
						tab.show();
					},
					itemclick:function(view, record, item, index, e, eOpts ){
//						if(sm.isSelected(index)){  
//					    	   collection.add(record.get('uuid'),{id:record.get('uuid'),name:record.get('imsi')});     
//						}else{  
//				    	   collection.removeKey(record.get('uuid'));
//						}  
						if(e.getTarget().style.color == 'green'){
							var tabpanel = view.up('panel').up('panel').up('panel').up('panel');
							if(e.getTarget().value == 'BKP'){
								var bkpUuid = record.get('bkpUuid');
								var prefix = 'SimCardTab_';
								if(this.maintenance){
									prefix = 'maintenance_'+prefix;
								}
								var id=prefix+"bkpUuid_"+bkpUuid;
								var tipId = prefix+'bkpTipId_'+bkpUuid;
								var tab = Ext.getCmp(id);
								var params = {params:{uuid:bkpUuid}};
								if(tab==undefined){
									tab = Ext.create('app.view.module.BkpInfoPanel',{
										id:id,
										tipId:tipId,
										params:params,
										prefix:prefix,
									});
									lanControll.setLan(tab);
									tabpanel.add(tab);							
								}
								tab.store.load(params);
								tab.show();
							}
							else if(e.getTarget().value=='GWP'){
								var gwpUuid;
								if(record.get('localSimFlag') == 1){
									gwpUuid = record.get('localGwpUuid')
								}else{
									gwpUuid = parseInt(record.get('gwpUuid'));
								}
								var prefix = 'SimCardTab_';
								if(this.maintenance){
									prefix = 'maintenance_'+prefix;
								}
								var id=prefix+"gwpUuid_"+gwpUuid;
								var tipId = prefix+'gwpTipId_'+gwpUuid;
								var tab = Ext.getCmp(id);
								var params = {params:{uuid:gwpUuid}};
								if(tab==undefined){
									tab = Ext.create('app.view.module.GwpInfoPanel',{
										id:id,
										tipId:tipId,
										params:params,
										prefix:prefix,
									});
									lanControll.setLan(tab);
									tabpanel.add(tab);							
								}
								tab.store.load(params);
								tab.show();
							}
						}else{
							return;
						}
					}
			},
			dockedItems : [{
				 itemId:'pagingtoolbar',
				 xtype: 'pagingtoolbar',
				 pageSize: 32,
			     dock: 'bottom',
			     store: simCardStore,
			     displayInfo: true,
			}	 	
			]
			});
			
			var action=ip.initSIMCardAction(simCardGrid,maintenance);
			function rightClickFn(view, record, item, index, event, options) {
				var eType=record.raw.eType;
				var nid=record.raw.nid;
				var tid=record.raw.tid;
				var name=record.raw.name;
				event.preventDefault();
				event.stopEvent();
				Ext.create('Ext.menu.Menu', {
					width: 100,
					margin: '0 0 10 0',
					floating : true,
					plain : true,
					items : action
				}).showAt(event.getXY());
			};
			simCardGrid.addListener('itemcontextmenu', rightClickFn, this); 
			
			
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var tbar = [];
			if(!maintenance){				
				var add = Ext.create('Ext.button.Button',{
					xtype : 'button',
					text : 'Add',
					iconCls : 'add',
					ulan:'btAdd',
					flag:"domain_edit",
					listeners : {
						click : function() {
							var domainUuid=Ext.getCmp('groupPanel').domainUuid;
							var grpUuid=Ext.getCmp('groupPanel').treeId;
							
							var addSIMCard = Ext.getCmp('addSIMCard');
							if(addSIMCard=='undefined'||addSIMCard==undefined){
									addSIMCard=Ext.create('app.view.operation.domain.group.AddSIMCard');
									lanControll.setLan(addSIMCard);
							}
							addSIMCard.down('form').getForm().findField('grpUuid').setValue(grpUuid);
							addSIMCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
							addSIMCard.show();
						}
					}			
				});
				tbar.push(add);
				tbar.push('-');
				
				var del = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Delete',
		       		 ulan:'btDel',
		       		 iconCls:'remove',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){
	
		       			if ( simCardGrid.getSelectionModel().hasSelection() ){
		       				
	   							var records= simCardGrid.getSelectionModel().getSelection();
	   							var ids="";
	   							var cnt=0;
	   							var domainUuid=0;
	   							var grpUuid=0;
	   							var names=new Array();
	   							var alias = "";
	   							var simStr = "";
	   							var selectAll=simCardGrid.selectAll;
	   							var info="";
	   							if(selectAll==1){
	   								domainUuid=Ext.getCmp('groupPanel').domainUuid;
	   								grpUuid=Ext.getCmp('groupPanel').treeId;
	   								info="Are you sure delete comply with the conditions of SIM Card";
	   								ids=records[0].get('uuid');
	   							}else{
	   								info="Are you sure Delete current SIM Card";
	   								for ( var i = 0; i < records.length; i++) {
										if(i==0){
											ids=records[i].get('uuid');
											domainUuid=records[i].get('domainUuid');
											grpUuid=records[i].get('grpUuid');
											alias=records[i].get('alias');
											simStr=records[i].get('imsi');
										}else {
											cnt=1;
											ids=ids+"-"+records[i].get('uuid');
										}
										if(records[i].get('adminStatus')!=2 || records[i].get('runStatus')!=9){
											if(names.length==3){
												names.push("</br>... ...");
											}else if(names.length==0){
												names.push(records[i].get('imsi'));
											}else if(names.length<3){
												names.push("</br>"+records[i].get('imsi'));
											}
										}
									}
	   								if(names.length>0){
										Ext.MessageBox.alert(boxWarnning,names+boxIsUsing);
										return;
									}
	   							}
								
							
								Ext.MessageBox.confirm(boxWarnning,info,function(e) {
		       						if( e == 'yes' ){
		       							var form=simCardGrid.up('panel').up('panel').down('form').getForm();
		       							var param=form.getValues();
//		       							var param=simCardGrid.store.proxy.extraParams;
		       							param['simStr'] = simStr;
		       							Ext.Ajax.request({
					                		url:'simCardManager!deleteSimCard.action?ids='+ids+"&domainUuid="+domainUuid+"&grpUuid="+grpUuid+"&selectAll="+selectAll+"&simAlias="+alias,
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
						                    		
						                    			Ext.MessageBox.alert(boxSuccess,boxDelSucc);
						                    			simCardGrid.selectAll=0;
	//						                    			simCardGrid.getStore().removeAll();
						                    			simCardGrid.getStore().load();
						                    		
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
				
				if(!maintenance){
					var set = Ext.create('Ext.button.Button',{
			       		 xtype:'button',
			       		 text:'Setting',
			       		 ulan:'btSetting',
			       		 iconCls:'option',
			       		 flag:"other",//特别处理，弹窗区分domain_edit和domain_action
			       		 listeners:{
			       		 	click:function(){
				       		 		if(simCardGrid.getSelectionModel().hasSelection()){
				       		 			var records=simCardGrid.getSelectionModel().getSelection();
				       		 			
										var ids="";
										var domainUuid=Ext.getCmp('groupPanel').domainUuid;
										var grpUuid=Ext.getCmp('groupPanel').treeId;
										var alias = "";
										var simStr = "";
										var selectAll=simCardGrid.selectAll;
										if(selectAll==1){
											ids=records[0].get('uuid');
										}else{
											for ( var i = 0; i < records.length; i++) {
												if(i==0){
													ids=records[i].get('uuid');
													alias = records[i].get('alias');
													simStr = records[i].get('imsi');
												}else {
													ids=ids+"-"+records[i].get('uuid');
												}
											}
										}
						       			var updateSimcard = Ext.getCmp('updateSimCard');
						       			if(updateSimcard==undefined|| updateSimcard=='undefined'){
						       				updateSimcard=Ext.create('app.view.operation.domain.roamzone.UpdateSimCard',{});
						       				lanControll.setLan(updateSimcard);
						       			}
						       			privilege.procUpdateSimCard(this.flag,updateSimcard);
						       			updateSimcard.down('form').getForm().reset();
						       			
//						       			var groupInDomainStore=Ext.getCmp('updateSimCardGrpUuid').getStore();
//						       			
//						       			if(groupInDomainStore.storeId!='groupInDomainStore'){
//						       				groupInDomainStore=Ext.create('app.store.operation.domain.GroupInDomainStore',{});
//						       				Ext.getCmp('updateSimCardGrpUuid').store=groupInDomainStore;
//						       			}
//
//						       			groupInDomainStore.removeAll();
//				       		 			groupInDomainStore.load({params:{domainUuid:domainUuid}});
					        			
			       		 			var grpStore=updateSimcard.down('form').getForm().findField('grpUuid').store;
			       		 			var nextSiteStore=updateSimcard.down('form').getForm().findField('nextSiteUuid').store;
				       		 			
				       		 		var comboxStore= Ext.create("app.store.util.ComboxStore",{});
									comboxStore.on('load',function(){      	
										grpStore.removeAll();
										grpStore.add({uuid:-1,name:'-SELECT-'});
										
										nextSiteStore.removeAll();
										nextSiteStore.add({uuid:-1,name:'-SELECT-'});
										nextSiteStore.add({uuid:0,name:'NULL'});
										for(var i=0; i<comboxStore.getCount(); i++){
											if(comboxStore.getAt(i).get('type')=='group'){
												grpStore.add(comboxStore.getAt(i));
											}else if(comboxStore.getAt(i).get('type')=='site'){
												nextSiteStore.add(comboxStore.getAt(i));
											}
										}
										var basicForm = updateSimcard.down('form').getForm();
										if(records.length==1){											
											basicForm.findField('adminStatus').setValue(records[0].get('adminStatus'));
											basicForm.findField('detailDesc').setValue(records[0].get('detailDesc'));
//											basicForm.findField('grpUuid').setValue(records[0].get('grpUuid'));
										}
										
										basicForm.findField('grpUuid').setValue(-1);
										basicForm.findField('nextSiteUuid').setValue(-1);
										basicForm.findField('ids').setValue(ids);
				       		 			
				       		 			var form=simCardGrid.up('panel').up('panel').down('form').getForm();
				       		 			var param=form.getValues();
//				       		 			var param=simCardGrid.store.proxy.extraParams;
					        			basicForm.findField('domainUuid').setValue(domainUuid);
					        			basicForm.findField('grpUuidSearch').setValue(grpUuid);
					        			basicForm.findField('adminStatusSearch').setValue(param['adminStatus']);
					        			basicForm.findField('runStatus').setValue(param['runStatus']);
					        			basicForm.findField('imsi').setValue(param['imsi']);
					        			basicForm.findField('aliasSearch').setValue(param['alias']);
					        			basicForm.findField('alias').setValue(alias);
					        			basicForm.findField('simStr').setValue(simStr);
					        			basicForm.findField('selectAll').setValue(selectAll);

					        			updateSimcard.show();
									},this,{single: true})
									comboxStore.load({params:{domainUuid:domainUuid,types:'group,site'}});
				       		 			
			       		 			}else{
			       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
			       		 				return;
			       		 			}
			       		 			
			       		 			
			       		 		
			       	 		}
			       	 	}
			       	 });
					tbar.push(set);
					tbar.push('-');
					
					var move = Ext.create('Ext.button.Button',{
			       		 xtype:'button',
			       		 text:'Move',
			       		 ulan:'btMove',
			       		 iconCls:'option',
			       		 flag:"other",
			       		 listeners:{
			       		 	click:function(){
			       		 		if(simCardGrid.getSelectionModel().hasSelection()){
			       		 			var records=simCardGrid.getSelectionModel().getSelection();
									var ids="";
									var domainUuid=Ext.getCmp('groupPanel').domainUuid;
									var grpUuid=Ext.getCmp('groupPanel').treeId;
									var alias = "";
									var simStr = "";
									var selectAll=simCardGrid.selectAll;
									if(selectAll==1){
										ids=records[0].get('uuid');
									}else{
										for ( var i = 0; i < records.length; i++) {
											if(i==0){
												ids=records[i].get('uuid');
												alias = records[i].get('alias');
												simStr = records[i].get('imsi');
											}else {
												ids=ids+"-"+records[i].get('uuid');
											}
										}
									}
					       			var updateSimcard = Ext.getCmp('moveGroup');
					       			if(updateSimcard==undefined|| updateSimcard=='undefined'){
					       				updateSimcard=Ext.create('app.view.operation.domain.group.MoveGroupPanel',{});
					       				lanControll.setLan(updateSimcard);
					       			}
					       			Ext.apply(updateSimcard.store.proxy.extraParams, {domainUuid:domainUuid});
					       			updateSimcard.store.load();
					       			
//									updateSimcard.down('form').getForm().findField('ids').setValue(ids);
					       			var form=simCardGrid.up('panel').up('panel').down('form').getForm();
					       			var param=form.getValues();
//					       			var param=simCardGrid.store.proxy.extraParams;
									var temp={};
									temp['nextSiteUuid']=0;
									temp['adminStatus']=0;
									temp['advanceSetting']=0;
									temp['detailDesc']="";
									
									temp['ids']=ids;
									temp['domainUuid']=domainUuid;
									temp['grpUuidSearch']=grpUuid;
									temp['selectAll']=selectAll;
									if(param['adminStatus']){
										temp['adminStatusSearch']=param['adminStatus'];
									}
									if(param['runStatus']){
										temp['runStatus']=param['runStatus'];
									}
									temp['aliasSearch']=param['alias'];
									temp['imsi']=param['imsi'];
									temp['alias']=alias;
									temp['simStr']=simStr;
			       		 			
//				        			updateSimcard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
//				        			updateSimcard.down('form').getForm().findField('grpUuidSearch').setValue(grpUuid);
//				        			updateSimcard.down('form').getForm().findField('adminStatusSearch').setValue(param['adminStatus']);
//				        			updateSimcard.down('form').getForm().findField('runStatus').setValue(param['runStatus']);
//				        			updateSimcard.down('form').getForm().findField('imsi').setValue(param['imsi']);
//				        			updateSimcard.down('form').getForm().findField('aliasSearch').setValue(param['alias']);
//				        			updateSimcard.down('form').getForm().findField('alias').setValue(alias);
//				        			updateSimcard.down('form').getForm().findField('simStr').setValue(simStr);
//				        			updateSimcard.down('form').getForm().findField('selectAll').setValue(selectAll);
									updateSimcard.param=temp;
				        			updateSimcard.show();
//								},this,{single: true})
//								comboxStore.load({params:{domainUuid:domainUuid,types:'group'}});
			       		 			
		       		 			}else{
		       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		       		 				return;
		       		 			}
			       	 		}
			       	 	}
			       	 });
					tbar.push(move);
					tbar.push('-');
					
					var set = Ext.create('Ext.button.Button',{
						xtype:'button',
						text:'Recharge',
						ulan:'btRecharge',
						iconCls:'option',
						flag:"other",
						listeners:{
						click:function(){
			       			if ( simCardGrid.getSelectionModel().hasSelection() ){
		   							var records= simCardGrid.getSelectionModel().getSelection();
		   							var ids="";
		   							var cnt=0;
		   							var domainUuid=0;
		   							var grpUuid=0;
		   							var names=new Array();
		   							var alias = "";
		   							var simStr = "";
		   							var selectAll=simCardGrid.selectAll;
		   							var info="";
		   							if(selectAll==1){
		   								domainUuid=Ext.getCmp('groupPanel').domainUuid;
		   								grpUuid=Ext.getCmp('groupPanel').treeId;
		   								info=lanControll.getLanValue('boxRechargeAll');
		   								ids=records[0].get('uuid');
		   							}else{
		   								info=lanControll.getLanValue('boxRecharge');
		   								for ( var i = 0; i < records.length; i++) {
											if(i==0){
												ids=records[i].get('uuid');
												domainUuid=records[i].get('domainUuid');
												grpUuid=records[i].get('grpUuid');
												alias=records[i].get('alias');
												simStr=records[i].get('imsi');
											}else {
												cnt=1;
												ids=ids+"-"+records[i].get('uuid');
											}
										}
		   							}
									
								
									Ext.MessageBox.confirm(boxWarnning,info,function(e) {
			       						if( e == 'yes' ){
			       							var form=simCardGrid.up('panel').up('panel').down('form').getForm();
			       							var param=form.getValues();
//			       							var param=simCardGrid.store.proxy.extraParams;
						        			param['adminStatusSearch']=param['adminStatus'];
						        			param['grpUuidSearch']=grpUuid;
						        			param['aliasSearch']=param['alias'];
						        			param['alias']="";
						        			param['advanceSetting']=2;
			       							param['adminStatus']=-1;
			       							
			       							param['simStr'] = simStr;
			       							Ext.Ajax.request({
						                		url:'simCardManager!updateSimCard.action?ids='+ids+"&domainUuid="+domainUuid+"&selectAll="+selectAll+"&simAlias="+alias,
						                		method:'POST',
						                		params:param,
						                		callback: function (options, success, response) {
			       									var obj=Ext.JSON.decode(response.responseText);
							                    	if(obj['success']){
						                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
						                    			simCardGrid.selectAll=0;
						                    			simCardGrid.getStore().load();
							                    	}else{
							                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
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
					tbar.push(set);
					tbar.push('-');
				}
				
				var importS = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Import',
		       		 ulan:'btImport',
		       		 iconCls:'upgrade',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){
		       		 		var domainUuid=Ext.getCmp('groupPanel').domainUuid;
		       		 		var grpUuid=Ext.getCmp('groupPanel').treeId;
		       		 		
							var importSIMCard=Ext.getCmp('importSIMCard');
							if(!importSIMCard){
								importSIMCard=Ext.create('app.view.operation.domain.group.ImportSIMCard',{id:'importSIMCard'});
								lanControll.setLan(importSIMCard);
							}
							importSIMCard.down('form').getForm().findField('grpUuid').setValue(grpUuid);
							importSIMCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
							importSIMCard.show();
		       		 		
		       	 		}
		       	 	}
		       	 
		       	 });
				tbar.push(importS);
				tbar.push('-');
			}
			
			var exportS = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Export',
	       		 iconCls:'export',
	       		 ulan:'btExport',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){

	       			if ( simCardGrid.getSelectionModel().hasSelection() ){
	       				
							var records= simCardGrid.getSelectionModel().getSelection();
							var domainUuid=Ext.getCmp('groupPanel').domainUuid;
							var grpUuid=Ext.getCmp('groupPanel').treeId;
							var ids="";
							var cnt=0;
							var selectAll=simCardGrid.selectAll;
							var info=lanControll.getLanValue('boxExportSimAll');
							if(selectAll==1){
								info=lanControll.getLanValue('boxExportSimAll');
							}else{
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('uuid');
									}
								}
								info=lanControll.getLanValue('boxExportSim');
							}
							
							Ext.MessageBox.confirm(boxWarnning,info,function(e) { 																				
	       						if( e == 'yes' ){
	       							var form=simCardGrid.up('panel').up('panel').down('form').getForm();
	       							var param=form.getValues();
//	       							var param=simCardGrid.store.proxy.extraParams;
	       							Ext.Ajax.request({
				                		url:'exportSIMCard.action?ids='+ids+"&selectAll="+selectAll+"&grpUuid="+grpUuid+"&domainUuid="+domainUuid,
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
			tbar.push(exportS);
			tbar.push('-');
			
			var sender = Ext.create("Ext.button.Button",{
	      		 xtype:'button',
	       		 text:'Actions',
	       		 ulan:'btActions',
	       		 iconCls: 'option',
	       		 flag:"sim_action",
	       		 menu:{
		       		 xtype:'menu',			       		 
		       		 items:action, 
	       	 	 }
	       	 });
			tbar.push(sender);
			tbar.push('-');
			
			var sel = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text: 'Select All',
	       		 ulan:'btSelectAll',
	       		 iconCls: 'selectAll',
	       		 flag:"domain_read",
	       		 listeners:{
	       			 click:function(){
						if(simCardGrid.selectAll==1){
							simCardGrid.selectAll=0;
							simCardGrid.selModel.setLocked(false);	
							simCardGrid.getSelectionModel().deselectAll(); 
	       		 			this.setIconCls('selectOut');
	       		 		}else{
	       		 			this.setIconCls('selectIn');
	       		 			simCardGrid.selectAll=1;
	       		 			simCardGrid.getSelectionModel().selectAll();
	       		 			simCardGrid.selModel.setLocked(true);
	       		 		}
	       		 	}
	       		 }
	       	 });
			tbar.push(sel);
			tbar.push('-');
			
			var view = Ext.create("Ext.button.Button",{
				xtype:'button',
				text:'View',
				iconCls: 'view_group',
				ulan:'btView',
				flag:"domain_read",
				menu:{
				xtype:'menu',			       		 
				items:[{
					text:'Default View',
					ulan:'miDefaultView',
					handler:function(){
					var showIds="checkbox,imsi,alias,runStatus,mobile,lastBalance,lastBalanceTime,curBalance,leftCallTime,deactiveReason,gwpPortNoStr,links";
					var hideIds="uuid,adminStatus,oprStatus,operator,simNumber,blockedFlag,pin2Code,bindImei,lastDeactiveReason,lastSiteName,lastGroupTime,bkpPortNoStr,lastLoadTime,simRechargedFlag,promotionStatus,lastBindTime,lastUsedTime,lowBalanceFlag,noBalanceFlag,paidListUuid,promotionGrpUuid,promCallTime,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdShortCount,hbmAcdSmsCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,bkpUuid,localGwpUuid,";
//					,smlUuid,smsNumber,smlContent,smsStatus,smsResult,smsTime,smlEncode,smlCurFailRetries,smlMaxFailRetries,smsReceipt,smlResultTime,receiptTime,splitCnt,splitSuccCnt,splitFailCnt,usslUuid,usslContent,ussdParam,ussdStatus,ussdResult,ussdTime,usslResultTime,usslCurFailRetries,usslMaxFailRetries,callUuid,callNumber,callDirection,connectFlag,callDuration,testToneMode,dtmfNumber,callStatus,callResult,callTime,callCurFailRetries,callMaxFailRetries,callResultTime
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
					ip.insertViewAdvance(simCardGrid,'gsl',11,showIds,hideIds);
					
//					ip.setCurCookie(showIds,hideIds,'gsl');
				}
				},{
					text:'Basic View',
					ulan:'miBasicView',
					handler:function(){
					var showIds="checkbox,uuid,imsi,alias,adminStatus,oprStatus,runStatus,bkpPortNoStr,gwpPortNoStr,links";
					var hideIds="blockedFlag,bindImei,operator,mobile,simNumber,deactiveReason,pin2Code,lastDeactiveReason,lastSiteName,lastGroupTime,lastLoadTime,lastBindTime,lastUsedTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,promotionStatus,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdShortCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,bkpUuid,localGwpUuid,promotionGrpUuid,";
					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
					ip.insertViewAdvance(simCardGrid,'gsl',12,showIds,hideIds);
					
//					ip.setCurCookie(showIds,hideIds,'gsl');
				}
				},{
					text:'Detail View',
					ulan:'miDetailView',
					handler:function(){
					var showIds="checkbox,uuid,imsi,alias,adminStatus,oprStatus,runStatus,blockedFlag,bindImei,operator,mobile,simNumber,deactiveReason,lastBalance,lastBalanceTime,lastDeactiveReason,lastSiteName,lastGroupTime,lastLoadTime,lastBindTime,lastUsedTime,bkpPortNoStr,gwpPortNoStr,links";
					var hideIds="curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,pin2Code,paidListUuid,promotionStatus,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdShortCount,hbmAcdSmsCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,bkpUuid,localGwpUuid,promotionGrpUuid,";
					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
					ip.insertViewAdvance(simCardGrid,'gsl',13,showIds,hideIds);
//					ip.setCurCookie(showIds,hideIds,'gsl');
				}
				},{
					text:'Balance View',
					ulan:'miBalanceView',
					handler:function(){
					var showIds="checkbox,uuid,imsi,alias,adminStatus,oprStatus,runStatus,lastBalance,pin2Code,lastBalanceTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,bkpPortNoStr,gwpPortNoStr,links";
					var hideIds="blockedFlag,bindImei,operator,mobile,simNumber,deactiveReason,lastDeactiveReason,lastSiteName,lastGroupTime,lastLoadTime,lastBindTime,lastUsedTime,promotionStatus,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdShortCount,hbmAcdSmsCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,bkpUuid,localGwpUuid,promotionGrpUuid,";
					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
					ip.insertViewAdvance(simCardGrid,'gsl',14,showIds,hideIds);
					
//					ip.setCurCookie(showIds,hideIds,'gsl');
				}
				},{
					text:'Promotion View',
					ulan:'miPromotionView',
					handler:function(){
					var showIds="checkbox,uuid,imsi,alias,adminStatus,oprStatus,runStatus,promotionStatus,promotionCount,promotionReport,promotionTime,lastPromTime,bkpPortNoStr,gwpPortNoStr,promotionGrpUuid,links";
					var hideIds="blockedFlag,bindImei,operator,mobile,simNumber,deactiveReason,lastDeactiveReason,pin2Code,lastSiteName,lastGroupTime,lastLoadTime,lastBalance,lastBalanceTime,lastBindTime,lastUsedTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,localSimFlag,hbmRegFailCount,hbmAcdShortCount,hbmAcdSmsCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,bkpUuid,localGwpUuid,";
					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
					ip.insertViewAdvance(simCardGrid,'gsl',15,showIds,hideIds);
					
//					ip.setCurCookie(showIds,hideIds,'gsl');
				}
				},{
					text:'HBM Monitor View',
					ulan:'miHbmMonitorView',
					handler:function(){
					var showIds="checkbox,uuid,imsi,alias,adminStatus,oprStatus,runStatus,hbmRegFailCount,hbmAcdShortCount,hbmAcdSmsCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,bkpPortNoStr,gwpPortNoStr,links";
					var hideIds="blockedFlag,bindImei,operator,mobile,simNumber,deactiveReason,lastDeactiveReason,pin2Code,lastSiteName,lastGroupTime,lastLoadTime,lastBalance,lastBalanceTime,lastBindTime,lastUsedTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,promotionStatus,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,domainUuid,grpUuid,bkpUuid,localGwpUuid,promotionGrpUuid,";
					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
					ip.insertViewAdvance(simCardGrid,'gsl',16,showIds,hideIds);
					
//					ip.setCurCookie(showIds,hideIds,'gsl');
					}
				},'-',
//				{
//					text:'SMS View',
//					handler:function(){
//					var showIds="checkbox,imsi,alias,runStatus,smsNumber,smlContent,smsStatus,smsResult,gwpPortNoStr,links";
//					var hideIds="uuid,adminStatus,oprStatus,blockedFlag,bindImei,operator,mobile,deactiveReason,lastDeactiveReason,lastSiteName,lastLoadTime,lastBindTime,lastUsedTime,lastBalance,lastBalanceTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,promotionGrpUuid,promotionStatus,promCallTime,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,lastSiteUuid,bkpUuid,localGwpUuid,smlUuid,smsTime,smlEncode,smlCurFailRetries,smlMaxFailRetries,smsReceipt,smlResultTime,receiptTime,splitCnt,splitSuccCnt,splitFailCnt,usslUuid,usslContent,ussdParam,ussdStatus,ussdResult,ussdTime,usslResultTime,usslCurFailRetries,usslMaxFailRetries,callUuid,callNumber,callDirection,connectFlag,callDuration,testToneMode,dtmfNumber,callStatus,callResult,callTime,callCurFailRetries,callMaxFailRetries,callResultTime,bkpPortNoStr";
//					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
//					
//					ip.setCurCookie(showIds,hideIds,'gsl');
//					}
//				},{
//					text:'USSD View',
//					handler:function(){
//					var showIds="checkbox,imsi,alias,runStatus,usslContent,ussdStatus,ussdResult,ussdTime,gwpPortNoStr,links";
//					var hideIds="uuid,adminStatus,oprStatus,blockedFlag,bindImei,operator,mobile,deactiveReason,lastDeactiveReason,lastSiteName,lastLoadTime,lastBindTime,lastUsedTime,lastBalance,lastBalanceTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,promotionGrpUuid,promotionStatus,promCallTime,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,lastSiteUuid,bkpUuid,localGwpUuid,smlUuid,smsNumber,smlContent,smsStatus,smsResult,smsTime,smlEncode,smlCurFailRetries,smlMaxFailRetries,smsReceipt,smlResultTime,receiptTime,splitCnt,splitSuccCnt,splitFailCnt,usslUuid,ussdParam,usslResultTime,usslCurFailRetries,usslMaxFailRetries,callUuid,callNumber,callDirection,connectFlag,callDuration,testToneMode,dtmfNumber,callStatus,callResult,callTime,callCurFailRetries,callMaxFailRetries,callResultTime,bkpPortNoStr";
//					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
//					
//					ip.setCurCookie(showIds,hideIds,'gsl');
//					}
//				},{
//					text:'Call View',
//					handler:function(){
//					var showIds="checkbox,imsi,alias,runStatus,callNumber,callDirection,callStatus,callResult,callTime,gwpPortNoStr,links";
//					var hideIds="uuid,adminStatus,oprStatus,blockedFlag,bindImei,operator,mobile,deactiveReason,lastDeactiveReason,lastSiteName,lastLoadTime,lastBindTime,lastUsedTime,lastBalance,lastBalanceTime,curBalance,leftCallTime,lowBalanceFlag,noBalanceFlag,simRechargedFlag,paidListUuid,promotionGrpUuid,promotionStatus,promCallTime,promotionCount,promotionReport,promotionTime,lastPromTime,localSimFlag,hbmRegFailCount,hbmAcdFailCount,hbmSmsFailCount,hbmCallFailCount,hbmDtmfFailCount,domainUuid,grpUuid,lastSiteUuid,bkpUuid,localGwpUuid,smlUuid,smsNumber,smlContent,smsStatus,smsResult,smsTime,smlEncode,smlCurFailRetries,smlMaxFailRetries,smsReceipt,smlResultTime,receiptTime,splitCnt,splitSuccCnt,splitFailCnt,usslUuid,usslContent,ussdParam,ussdStatus,ussdResult,ussdTime,usslResultTime,usslCurFailRetries,usslMaxFailRetries,callUuid,connectFlag,callDuration,testToneMode,dtmfNumber,callCurFailRetries,callMaxFailRetries,callResultTime,bkpPortNoStr";
//					
//					ip.changeView(simCardGrid,showIds,true);
//					ip.changeView(simCardGrid,hideIds,false);
//					
//					ip.setCurCookie(showIds,hideIds,'gsl');
//					}
//				},'-',
				{
					text:'User View-1',
					ulan:'miUserView1',
					handler:function(){
					ip.changeUserView(simCardGrid,'gsl',1,simCardGrid.up('panel').up('panel').id);
				}
				},{
					text:'User View-2',
					ulan:'miUserView2',
					handler:function(){
					ip.changeUserView(simCardGrid,'gsl',2,simCardGrid.up('panel').up('panel').id);
				}
				},{
					text:'User View-3',
					ulan:'miUserView3',
					handler:function(){
					ip.changeUserView(simCardGrid,'gsl',3,simCardGrid.up('panel').up('panel').id);
				}
				},'-',{
					text:'User Setting...',
					ulan:'miUserSetting',
					handler:function(){
					var win=Ext.getCmp('viewAdvanced');
					var win=ip.initViewSet(simCardGrid);
					win.down('hiddenfield[name=mode]').setValue('gsl');
					win.down('hiddenfield[name=cmpId]').setValue(simCardGrid.up('panel').up('panel').id);
					win.show();
				}
				}], 
			}
			});
			tbar.push(view);
			tbar.push('-');
			
			var refresh = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
	       		 		simCardGrid.getStore().load();
	       	 		}
	       	 	}
	       	 });
			tbar.push(refresh);
			tbar.push('->');
			
			var search = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 ulan:'btSearch',
	       		 iconCls:'search',
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
					fieldLabel:'Alias',
					name:'alias',
				},rs.createAdminStatus(null,[0,1,2,6],null),rs.createRunStatus(23,null)],
				
				buttons : [{
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(0);
//							Ext.getCmp("east_search").collapse();
						}
				}, {
				text : 'Search',
				flag:"domain_read",
				itemId:'search',
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
					
					var simCardGridStore=simCardGrid.getStore();
					var params = form.getValues();
        			simCardGridStore.on('beforeload', function (simCardGridStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(simCardGridStore.proxy.extraParams, params);
        		    },this,{single: true});
//        			simCardGridStore.removeAll();
        			
//        			var panel = Ext.getCmp('simCardTab');
        			var paging = simCardGrid.getComponent('pagingtoolbar');
        			paging.moveFirst();
        			
        			
				}
				}],
				listeners: {
			        afterRender: function(thisForm, options){
			            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
			                enter: function(){
			                    var btn =search_grid.down('button[itemId=search]');
			                    btn.handler();
			                },
			                scope: this
			            });
			        }
			    },
			});
			
		    simCardStore.on('load', function(){
		    	var total = simCardStore.getCount();//数据行数  	    	
		    	if(simCardGrid.selectAll==1){
		    		simCardGrid.selModel.setLocked(false);
					if(total>0){
						simCardGrid.selModel.selectRange(0,total-1,true);  
					}
					simCardGrid.selModel.setLocked(true);
				}else{
					simCardGrid.selModel.setLocked(false);
				}	
		    });
			 this.items=[
			   {
				 region: 'center',
//				 xtype:'tabpanel',
//				 split: false,
//				 layout:'fit',
				 layout:'fit',
				 items:[simCardGrid]
				       
				},{
				 itemId:'search',
				 region:'east',
				 title : tiSearch,
				 collapsible: true,
				 collapsed:true,
				 width:300,
//    			 split: true,
				 items:[search_grid]
			 }
			 ];
			this.callParent(arguments);		
		}
});
