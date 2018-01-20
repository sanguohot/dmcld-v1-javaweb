Ext.define('app.view.operation.domain.roamzone.site.nes.TgpInNe', {
	extend:'Ext.panel.Panel', 
	title:lanControll.getLanValue('tiE1List'),
	layout:'border',
	autoScroll:false,
	border:false,
	forceRefresh:0,
	moduleId:'',
	store:null,
	initComponent: function() {
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store=Ext.create('app.store.operation.domain.roamzone.site.nes.TgpInNeStore',{});
		this.store=store;
		var moduleId=this.moduleId;
		var tgpInNeGrid=Ext.create('Ext.grid.Panel',{
			itemId:'grid',
			columnLines:true,
			store:store,
			title:'',
			selModel:sm,
			autoScroll:true,
			border:false,
			treeName:'',
			columnLines:true,
			sealedColumns:true,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			recordId:0,
			columns: [
			    {header: 'portUuid',dataIndex: 'uuid',ulan:'portUuidAbbr',hidden:true},
				{header: 'port',dataIndex: 'portNo',width:40 },
				{header: 'Alias',dataIndex: 'alias',hidden:true},
				{header: 'adminStatus', dataIndex: 'adminStatus',width:90,hidden:true,
					renderer:function(val){  
						return rs.adminStatus(val);
					} 
				},
				{header: 'oprStatus', dataIndex: 'oprStatus',hidden:true,width:90,
					renderer:function(val){  
						return rs.oprStatus(val);
					} 
				},
				{header: 'runStatus', dataIndex: 'runStatus',width:90,
					renderer:function(val){  
						return rs.runStatusImg(val);
					} 
				},
				{header: 'modType',  dataIndex: 'modType',width:70,
					renderer:function(val){  
						return rs.tgpModType(val);
					} 
				},
				{header: 'workStatus',  dataIndex: 'workState',width:110,
					renderer:function(val){  
						return rs.tgpWorkState(val);
					} 
				},
				
				{header: 'pcmMode',dataIndex: 'pcmMode',width:70,
					renderer:function(val){  
						return rs.tgpPcmMode(val);
					}
				},
				{header: 'frameMode',dataIndex: 'frameMode',width:70,
					renderer:function(val){  
						return rs.tgpFrameMode(val);
					}
				},
				{header: 'lineCode',dataIndex: 'lineCode',width:70,
					renderer:function(val){  
						return rs.tgpLineCode(val);
					}
				},
				{header: 'haulMode',dataIndex: 'lineBuiltOut',width:100,
					renderer:function(val){  
						return rs.tgpLineBuiltOut(val);
					}
				},
				{header: 'clockSrc',dataIndex: 'clockSrc',width:80,
					renderer:function(val){  
						return rs.tgpClockSrc(val);
					}
				},
				{header: 'slaveType',dataIndex: 'slaveType',width:70,
					renderer:function(val){  
						return rs.slaveType(val);
					}
				},
				{header: 'slaveIp',dataIndex: 'slaveIp', },
				{header: 'slaveNo',dataIndex: 'slaveTgNo',width:60,},
				{header: 'slaveE1Cnt',dataIndex: 'slaveE1Count',width:70,},
				{header: 'slaveStartNo',dataIndex: 'slaveStartNo', width:80,},
				{header: 'slaveE1No',dataIndex: 'slaveE1No', width:70,},

				{header: 'TxFrame',ulan:'txFrameAbbr',dataIndex: 'value6', width:100,
					renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
				},
				{header: 'RxFrame',ulan:'rxFrameAbbr',dataIndex: 'value7', width:100,
					renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
				},
				{header: 'TxFail',ulan:'txFailAbbr',dataIndex: 'value8', width:100,
					renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
				},
				{header: 'RxFail',ulan:'rxFailAbbr',dataIndex: 'value9', width:100,
					renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
				},
//				{header: 'tsStatus0',dataIndex: 'tsStatus0',width:80 },
//				{header: 'tsStatus1',dataIndex: 'tsStatus1',width:80 },
//				{header: 'tsStatus2',dataIndex: 'tsStatus2',width:80 },
//				{header: 'tsStatus3',dataIndex: 'tsStatus3',width:80 },
				
				{header: 'deviceUuid',dataIndex: 'neUuid',hidden:true},
				{header: 'tgpUuid',dataIndex: 'tgpUuid',hidden:true},
				],
				listeners:{
			  		itemdblclick: function(view, record, item, index, e, eOpts){
						var eastSearch=tgpInNeGrid.up('panel').up('panel').down('panel[itemId=detail]');
				 		if(eastSearch.isHidden()){
				 			eastSearch.expand(false);
				 		}else{
				 			eastSearch.collapse(false);
				 		}
			
					},
					itemclick: {
						fn:function(view, record, item, index, e, eOpts){
							var eastSearch=tgpInNeGrid.up('panel').up('panel').down('panel[itemId=detail]');
							if(eastSearch.isHidden()){
								tgpInNeGrid.recordId=0;
					 		}
				 			tgpInNeGrid.recordId=record.get('uuid');
				 			
				 			var form=eastSearch.down('form').getForm();
				 			var oprField=form.findField('oprStatus');
				 			var runField=form.findField('runStatus');
				 			var modTypeField=form.findField('modType');
				 			var workStateField=form.findField('workState');

				 			var pcmModeField=form.findField('pcmMode');
				 			var frameModeField=form.findField('frameMode');
				 			var lineCodeField=form.findField('lineCode');
				 			var lineBuiltOutField=form.findField('lineBuiltOut');
				 			var clockSrcField=form.findField('clockSrc');
				 			var slaveTypeField=form.findField('slaveType');
//					 			
				 			Ext.suspendLayouts();
				 			form.loadRecord(record);
				 			oprField.setValue(rs.oprStatus(record.get('oprStatus')));
				 			runField.setValue(rs.runStatus(record.get('runStatus')));
				 			modTypeField.setValue(rs.tgpModType(record.get('modType')));
				 			workStateField.setValue(rs.tgpWorkState(record.get('workState')));

				 			pcmModeField.setValue(rs.tgpPcmMode(record.get('pcmMode')));
				 			frameModeField.setValue(rs.tgpFrameMode(record.get('frameMode')));
				 			lineCodeField.setValue(rs.tgpLineCode(record.get('lineCode')));
				 			lineBuiltOutField.setValue(rs.tgpLineBuiltOut(record.get('lineBuiltOut')));
				 			clockSrcField.setValue(rs.tgpClockSrc(record.get('clockSrc')));
				 			slaveTypeField.setValue(rs.slaveType(record.get('slaveType')));
				 			Ext.resumeLayouts(true);
					 		
			
						}
					},
				}						
		});
		var setting={
	       		 xtype:'button',
	       		 text:'Setting',
	       		ulan:'btSetting',
	       		 iconCls:'option',
	       		 flag:"domain_edit",
	       		 listeners:{
		       		click:function(){
						
	       		 		if(tgpInNeGrid.getSelectionModel().hasSelection()){
	       		 			var records=tgpInNeGrid.getSelectionModel().getSelection();
	       		 			
							var ids="";
							var domainUuid=0;
							var alias = "";
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
									alias=records[i].get('alias');
								}else {
									ids=ids+","+records[i].get('uuid');
								}
							}
							var updateTgp=Ext.getCmp('updateTgp');
							var parentId=tgpInNeGrid.up('panel').id;
							if(updateTgp==undefined || updateTgp=="undefined"){
								updateTgp = Ext.create('app.view.operation.domain.roamzone.site.UpdateTgp',{});
								lanControll.setLan(updateTgp);
							}
							updateTgp.down('form').getForm().reset();
			       			
							updateTgp.down('form').getForm().findField('parentId').setValue(parentId);
							updateTgp.down('form').getForm().findField('uuids').setValue(ids);
							updateTgp.down('form').getForm().findField('portStr').setValue(alias);
							updateTgp.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		        			
							updateTgp.show();
		        			
       		 			}else{
       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
       		 				return;
       		 			}
   	 				}
	       	 	}
		};
		
		

		var reset = {
     		 xtype:'button',
     		 text: 'Reset',
     		ulan:'btReset',
     		 iconCls: 'reset',
     		 flag:"device_action",
     		 listeners:{
     			 click:function(){
		    		Ext.MessageBox.confirm(boxWarnning,boxReset,function(e) {																			
						if( e == 'yes' ){
							if ( tgpInNeGrid.getSelectionModel().hasSelection()){				       				
								var records= tgpInNeGrid.getSelectionModel().getSelection();
								var ids="";
								var portAlias = "";
								for ( var i = 0; i < records.length; i++) {										
									if(i==0){
										ids=records[i].get('uuid');
										portAlias=records[i].get('alias');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('uuid');
									}
								}
			        			var handler = Ext.getCmp('handler');
			        			if(handler==undefined){
			        				handler = Ext.create('app.util.Handler',{});
			        			}
			        			handler.ResetPortHandler(ids,portAlias);
		 		 			}else{
		 		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		 		 				return;
		 		 			}
						}
		    		});		       			 
 		 		 }
     		 }	 
		};
		
		var view={
				xtype:'button',
				text:'View',
				ulan:'btView',
				iconCls: 'view_group',
				flag:"domain_read",
				menu:{
				xtype:'menu',			       		 
				items:[{
					text:'Default View',
					ulan:'miDefaultView',
					handler:function(){
						var showIds=",checkbox,portNo,runStatus,modType,workState,pcmMode,frameMode,lineCode,lineBuiltOut,clockSrc,slaveType,slaveIp,slaveTgNo,slaveE1Count,slaveStartNo,slaveE1No,value6,value7,value8,value9";
						var hideIds=",uuid,alias,adminStatus,oprStatus,neUuid,tgpUuid";
						ip.changeView(tgpInNeGrid,showIds,true);
						ip.changeView(tgpInNeGrid,hideIds,false);
					}
				},{
					text:'Basic View',
					ulan:'miBasicView',
					handler:function(){
						var showIds=",checkbox,portNo,alias,adminStatus,oprStatus,runStatus";
						var hideIds=",uuid,modType,workState,pcmMode,frameMode,lineCode,lineBuiltOut,clockSrc,slaveType,slaveIp,slaveTgNo,slaveE1Count,slaveStartNo,slaveE1No,value6,value7,value8,value9,neUuid,tgpUuid";
						
						ip.changeView(tgpInNeGrid,showIds,true);
						ip.changeView(tgpInNeGrid,hideIds,false);
					}
				},{
					text:'Detail View',
					ulan:'miDetailView',
					handler:function(){
						var showIds=",checkbox,portNo,alias,adminStatus,oprStatus,runStatus,modType,workState,pcmMode,frameMode,lineCode,lineBuiltOut,clockSrc";
						var hideIds=",uuid,slaveType,slaveIp,slaveTgNo,slaveE1Count,slaveStartNo,slaveE1No,value6,value7,value8,value9,neUuid,tgpUuid";
						
						ip.changeView(tgpInNeGrid,showIds,true);
						ip.changeView(tgpInNeGrid,hideIds,false);
					}
				},{
					text:'Slave View',
					ulan:'miSlaveView',
					handler:function(){
						var showIds=",checkbox,portNo,alias,adminStatus,oprStatus,runStatus,slaveType,slaveIp,slaveTgNo,slaveE1Count,slaveStartNo,slaveE1No";
						var hideIds=",uuid,modType,workState,pcmMode,frameMode,lineCode,lineBuiltOut,clockSrc,value6,value7,value8,value9,neUuid,tgpUuid";
						
						ip.changeView(tgpInNeGrid,showIds,true);
						ip.changeView(tgpInNeGrid,hideIds,false);
					}
				},{
					text:'TX/RX View',
					ulan:'miTxRxView',
					handler:function(){
						var showIds=",checkbox,portNo,alias,adminStatus,oprStatus,runStatus,value6,value7,value8,value9";
						var hideIds=",uuid,modType,workState,pcmMode,frameMode,lineCode,lineBuiltOut,clockSrc,slaveType,slaveIp,slaveTgNo,slaveE1Count,slaveStartNo,slaveE1No,neUuid,tgpUuid";
						
						ip.changeView(tgpInNeGrid,showIds,true);
						ip.changeView(tgpInNeGrid,hideIds,false);
					}
				},'-',{
					text:'User View-1',
					ulan:'miUserView1',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'tgpl',1,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-2',
					ulan:'miUserView2',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'tgpl',2,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-3',
					ulan:'miUserView3',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'tgpl',3,tgpInNeGrid.up('panel').up('panel').id);
					}
				},'-',{
					text:'User Setting...',
					ulan:'miUserSetting',
					handler:function(){
						var win=Ext.getCmp('viewAdvanced');
						var win=ip.initViewSet(tgpInNeGrid);
						win.down('hiddenfield[name=mode]').setValue('tgpl');
						win.down('hiddenfield[name=cmpId]').setValue(tgpInNeGrid.up('panel').up('panel').id);
						win.show();
					}
				}], 
			}
		};
		
		var refresh={
	       		 xtype:'button',
	       		 text:'Refresh',
	       		ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
						var store=tgpInNeGrid.store;
						if(store.task){
							Ext.TaskManager.stop(store.task);
							store.task = null;
						}					
						store.load();
	       	 		}
	       	 	}
		};
		
		var tbs=[];
		if(!maintenance){
			tbs.push(setting);
			tbs.push('-');
		}else{
//			tbs.push(reset);
//			tbs.push('-');
		}
		tbs.push(view);
		tbs.push('-');
		var refreshButton = autoRefresh.createRefreshButton(tgpInNeGrid,store,Ext.create(Ext.getClassName(store),{}),null);
		tbs.push(refreshButton);
		var di=[{
	        xtype: 'toolbar',
	        items: tbs
	    }];
		tgpInNeGrid.addDocked(di);
		
		var detail_panel=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			bodyStyle: {
				background: '#DFE9F6',
		 	},
			defaults : {
		 		labelWidth: 140,
		 		anchor: '100%',
		 		margins : '0 0 10 0'
			},
			items : [{
				xtype:'hiddenfield',
				fieldLabel:'Port Uuid',
				name:'uuid',
			},{	
	            xtype: 'fieldset',
				layout:'anchor',
				defaults : {
			 		labelWidth: 140,
				},
				title:lanControll.getLanValue('fsBasicInfo'),
				items:[{
						xtype:'displayfield',
						fieldLabel:'Port No',
						name:'portNo',
					},{
						xtype:'displayfield',
						fieldLabel:'Port Alias',
						ulan:'portAlias',
						name:'alias',
//						readOnly:maintenance==1?true:false,
//						fieldStyle:maintenance==1?{background:'#DFE9F6'}:{background:'#FFF'},
					},{
			            xtype: 'combo',
			            name: 'adminStatus',
			            fieldLabel: 'Admin Status',
			            fieldStyle:maintenance==1?{background:'#DFE9F6'}:{background:'#FFF'},
						mode : 'local',
						editable:false,
						displayField : 'name',
						valueField : 'statusId',
						queryMode : 'local',
						store : Ext.create('Ext.data.Store', {
							fields : [ 'name', 'statusId' ],
							data : [{
								name : admin_enable,
								statusId : 1
							}, {
								name : admin_disable,
								statusId : 2
							}]
						}),
			        },{
			            xtype: 'displayfield',
			            name: 'oprStatus',
			            fieldLabel: 'Opr Status',
			        },{
			            xtype: 'displayfield',
			            name: 'runStatus',
			            fieldLabel: 'Run Status',
			        }]
	        },{
	            xtype: 'fieldset',
				defaults : {
			 		labelWidth: 140,
				},
				layout:'anchor',
				title:lanControll.getLanValue('fsDetailInfo'),
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'modType',
		        	fieldLabel: 'Module Type',
		        },{
		        	xtype: 'displayfield',
		        	name: 'workState',
		        	fieldLabel: 'Work Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'pcmMode',
		        	fieldLabel: 'PCM Law',
		        },{
		        	xtype: 'displayfield',
		        	name: 'frameMode',
		        	fieldLabel: 'Frame Mode',
		        },{
		        	xtype: 'displayfield',
		        	name: 'lineCode',
		        	fieldLabel: 'Line Code',
		        },{
		        	xtype: 'displayfield',
		        	name: 'lineBuiltOut',
		        	fieldLabel: 'Haul Mode',
		        },{
		        	xtype: 'displayfield',
		        	name: 'clockSrc',
		        	fieldLabel: 'Clock Source',
		        }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				defaults : {
			 		labelWidth: 140,
				},
				title:lanControll.getLanValue('fsSlaveInfo'),
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'slaveType',
		        	fieldLabel: 'Slave Type',
		        },{
		        	xtype: 'displayfield',
		        	name: 'slaveIp',
		        	fieldLabel: 'Slave IP',
		        },{
		        	xtype: 'displayfield',
		        	name: 'slaveTgNo',
		        	fieldLabel: 'Slave No',
		        },{
		        	xtype: 'displayfield',
		        	name: 'slaveE1Count',
		        	fieldLabel: 'Slave E1 Count',
		        },{
		        	xtype: 'displayfield',
		        	name: 'slaveStartNo',
		        	fieldLabel: 'Slave Start No',
		        },{
		        	xtype: 'displayfield',
		        	name: 'slaveE1No',
		        	fieldLabel: 'Slave E1 No',
//		        },{
//		        	xtype: 'displayfield',
//		        	name: 'tsStatus0',
//		        	fieldLabel: 'tsStatus0',
//		        },{
//		        	xtype: 'displayfield',
//		        	name: 'tsStatus1',
//		        	fieldLabel: 'tsStatus1',
//		        },{
//		        	xtype: 'displayfield',
//		        	name: 'tsStatus2',
//		        	fieldLabel: 'tsStatus2',
//		        },{
//		        	xtype: 'displayfield',
//		        	name: 'tsStatus3',
//		        	fieldLabel: 'tsStatus3',
		        }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				defaults : {
			 		labelWidth: 140,
				},
				title:lanControll.getLanValue('fsTxRxInfo'),
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'value6',
		        	ulan:'txFrame',
		        	fieldLabel: 'Tx Frame',
		        	renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
		        },{
		        	xtype: 'displayfield',
		        	name: 'value7',
		        	ulan:'rxFrame',
		        	fieldLabel: 'Rx Frame',
		        	renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
		        },{
		        	xtype: 'displayfield',
		        	name: 'value8',
		        	ulan:'txFail',
		        	fieldLabel: 'Tx Fail',
		        	renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
		        },{
		        	xtype: 'displayfield',
		        	name: 'value9',
		        	ulan:'rxFail',
		        	fieldLabel: 'Rx Fail',
		        	renderer:function(value,metaData,record,rowIndex,store,view){
						value=rs.sigToUnsig(value);
						return value;
					}
		        }]
			}],
			buttons : [{
				text : 'Cancel',
				ulan:'btCancel',
				flag:"domain_read",
				handler : function() {
					this.up('panel[itemId=detail]').collapse();
				}
			},{
				text : 'Commit',
				ulan:'btCommit',
				flag:"domain_edit",
				hidden:maintenance==1?true:false,
				handler : function() {
					if (this.up('form').getForm().isValid()) {
		                var form = this.up('form').getForm();
		                if (form.isValid()) {
		                	Ext.Ajax.request({
		                		url:'tgpManager!updateTgp.action',
		                		method:'POST',
		                		timeout:60000,
		                		params:form.getValues(),
		                		callback: function (options, success, response) {
			                    	var obj=Ext.JSON.decode(response.responseText);			
			                    	if(obj['success']){
//			                    		tgpInNeGrid.up('panel').up('panel').down('panel[itemId=detail]').collapse();
			                    		tgpInNeGrid.store.load();
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
			                    	}
		                    	}
		                	});
		                }
		            }
				}
			}]
		});
		
		this.items=[{
			 region: 'center',
			 layout:'fit',
			 items:[tgpInNeGrid]
		},{
			 itemId:'detail',
			 region:'east',
			 title : tiDetail,
			 collapsible: true,
			 collapsed:true,
			 width:400,
			 bodyStyle: {
				background: '#DFE9F6',
			 },
			 autoScroll:true,
			 items:[detail_panel]
		}];
		this.callParent(arguments);		
	}
});