Ext.define('app.view.operation.domain.roamzone.site.nes.SipInNe', {
	extend:'Ext.panel.Panel', 
	title:lanControll.getLanValue('tiSipList'),
	layout:'border',
	autoScroll:false,
	border:false,
	forceRefresh:0,
	moduleId:'',
	toolbars:0,
	otiose:0,
	store:null,
	initComponent: function() {
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store=Ext.create('app.store.operation.domain.roamzone.site.nes.TgpInNeStore',{});
		this.store=store;
		var otiose=this.otiose;
		var toolbars=this.toolbars;
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
			recordId:0,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
			    {header: 'portUuid',dataIndex: 'uuid',ulan:'portUuidAbbr',hidden:true},
				{header: 'port',dataIndex: 'portNo',width:40 },
				{header: 'alias',dataIndex: 'alias',hidden:true},
				{header: 'adminStatus', dataIndex: 'adminStatus',width:90,
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
				{header: 'workStatus',  dataIndex: 'sipWorkStatus',ulan:'workStateAbbr',width:90,hidden:true,
					renderer:function(val){  
						return rs.priWorkStatus(val);
					} 
				},
				{header: 'linkStatus',dataIndex: 'sipLinkStatus',width:90,
					renderer:function(val){  
						return rs.sipLinkStatus(val);
					}
				},
				{header: 'curCalls',dataIndex: 'sipCurCalls',ulan:'curCallCountAbbr',width:70},
				{header: 'ACD',dataIndex: 'sipAcd',ulan:'acdAbbr',width:70},
				{header: 'ASR',dataIndex: 'sipAsr',ulan:'asrAbbr',width:70},
				
				{header: 'remoteAddr',dataIndex: 'sipRemoteAddr',width:120},
				{header: 'remotePort',dataIndex: 'sipRemotePort',width:90},
				{header: 'regFlag',  dataIndex: 'sipRegFlag',width:90,
					renderer:function(val){  
						return rs.sipRegFlag(val);
					} 
				},
				{header: 'callMode',  dataIndex: 'sipCallMode',width:90,
					renderer:function(val){  
						return rs.sipCallMode(val);
					} 
				},
				{header: 'authType',dataIndex: 'sipAuthType',width:90,
					renderer:function(val){  
						return rs.sipAuthType(val);
					}
				},
				{header: 'suppSIP-T',dataIndex: 'sipSipT',width:90,
					renderer:function(val){  
						return rs.sipSipT(val);
					}
				},
				{header: 'Trk detc',dataIndex: 'sipDetectTrunk',width:90,
					renderer:function(val){  
						return rs.sipDetectTrunk(val);
					}
				},
				{header: 'tranProto',dataIndex: 'sipTransProto',width:90,
					renderer:function(val){  
						return rs.sipTransProto(val);
					}
				},
				{header: 'SIPVer',dataIndex: 'sipProtoVer',width:90},
				{header: 'account',dataIndex: 'sipAcctName',width:90},
				{header: 'PSTNGroup',dataIndex: 'sipBindGrp',width:90},
				{header: 'expTime',dataIndex: 'sipExpireTime',width:90},
				
				
				{header: 'deviceUuid',dataIndex: 'neUuid',hidden:true},
				{header: 'SIPUuid',dataIndex: 'sipUuid',hidden:true},
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
					itemclick: function(view, record, item, index, e, eOpts){
						var eastSearch=tgpInNeGrid.up('panel').up('panel').down('panel[itemId=detail]');
						if(eastSearch.isHidden()){
							tgpInNeGrid.recordId=0;
				 		}
		 				tgpInNeGrid.recordId=record.get('uuid');
			 			var form=eastSearch.down('form').getForm();
			 			var oprField=form.findField('oprStatus');
			 			var runField=form.findField('runStatus');
			 			var sipCallModeField=form.findField('sipCallMode');
			 			var workStateField=form.findField('sipWorkStatus');
			 			var sipRegFlagField=form.findField('sipRegFlag');

			 			var sipTransProtoField=form.findField('sipTransProto');
			 			var sipAuthTypeField=form.findField('sipAuthType');
			 			var sipSipTField=form.findField('sipSipT');
			 			var sipLinkStatusField=form.findField('sipLinkStatus');
			 			var sipDetectTrunkField=form.findField('sipDetectTrunk');
			 			Ext.suspendLayouts();				 			
			 			form.loadRecord(record);
			 			oprField.setValue(rs.oprStatus(record.get('oprStatus')));
			 			runField.setValue(rs.runStatus(record.get('runStatus')));
			 			sipCallModeField.setValue(rs.sipCallMode(record.get('sipCallMode')));
			 			workStateField.setValue(rs.priWorkStatus(record.get('sipWorkStatus')));
			 			sipRegFlagField.setValue(rs.sipRegFlag(record.get('sipRegFlag')));

			 			sipTransProtoField.setValue(rs.sipTransProto(record.get('sipTransProto')));
			 			sipAuthTypeField.setValue(rs.sipAuthType(record.get('sipAuthType')));
			 			sipSipTField.setValue(rs.sipSipT(record.get('sipSipT')));
			 			sipLinkStatusField.setValue(rs.sipLinkStatus(record.get('sipLinkStatus')));
			 			sipDetectTrunkField.setValue(rs.sipDetectTrunk(record.get('sipDetectTrunk')));
			 			Ext.resumeLayouts(true);
			
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
						var showIds="checkbox,portNo,adminStatus,runStatus,sipLinkStatus,sipRemoteAddr,sipRemotePort,sipRegFlag,sipCallMode,sipDetectTrunk,sipAcd,sipAsr,sipCurCalls,sipTransProto,sipAuthType,sipSipT,sipAcctName,sipBindGrp,sipExpireTime,sipProtoVer";
						var hideIds="uuid,alias,oprStatus,sipWorkStatus,neUuid,sipUuid";
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						
						ip.insertViewAdvance(tgpInNeGrid,'sipl',11,showIds,hideIds);
						
					}
				},{
					text:'Basic View',
					ulan:'miBasicView',
					handler:function(){
						var showIds="checkbox,portNo,adminStatus,runStatus,sipLinkStatus,sipRemoteAddr,sipRemotePort,sipRegFlag,sipCallMode";
						var hideIds="uuid,alias,oprStatus,sipWorkStatus,sipDetectTrunk,sipAcd,sipAsr,sipCurCalls,sipTransProto,sipAuthType,sipSipT,sipAcctName,sipBindGrp,sipExpireTime,sipProtoVer,neUuid,sipUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
//						cmpId,mode,item,showIds,hideIds
						ip.insertViewAdvance(tgpInNeGrid,'sipl',12,showIds,hideIds);
					}
				},{
					text:'Detail View',
					ulan:'miDetailView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,adminStatus,runStatus,sipWorkStatus,sipLinkStatus,sipRemoteAddr,sipRemotePort,sipRegFlag,sipCallMode,sipDetectTrunk,sipTransProto,sipAuthType,sipSipT,sipAcctName,sipBindGrp,sipExpireTime,sipProtoVer";
						var hideIds="alias,oprStatus,sipAcd,sipAsr,sipCurCalls,neUuid,sipUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						
						ip.insertViewAdvance(tgpInNeGrid,'sipl',13,showIds,hideIds);
					}
				},{
					text:'Calls View',
					ulan:'miCallsView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,adminStatus,runStatus,sipAcd,sipAsr,sipCurCalls";
						var hideIds="alias,oprStatus,sipWorkStatus,sipLinkStatus,sipRemoteAddr,sipRemotePort,sipRegFlag,sipCallMode,sipDetectTrunk,,sipTransProto,sipAuthType,sipSipT,sipAcctName,sipBindGrp,sipExpireTime,sipProtoVer,neUuid,sipUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						
						ip.insertViewAdvance(tgpInNeGrid,'sipl',14,showIds,hideIds);
					}
				},'-',{
					text:'User View-1',
					ulan:'miUserView1',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'sipl',1,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-2',
					ulan:'miUserView2',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'sipl',2,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-3',
					ulan:'miUserView3',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'sipl',3,tgpInNeGrid.up('panel').up('panel').id);
					}
				},'-',{
					text:'User Setting...',
					ulan:'miUserSetting',
					handler:function(){
						var win=Ext.getCmp('viewAdvanced');
						var win=ip.initViewSet(tgpInNeGrid);
						win.down('hiddenfield[name=mode]').setValue('sipl');
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
//					readOnly:maintenance==1?true:false,
//					fieldStyle:maintenance==1?{background:'#DFE9F6'}:{background:'#FFF'},
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
				layout:'anchor',
				title:lanControll.getLanValue('fsDetailInfo'),
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'sipWorkStatus',
		        	ulan:'workState',
		        	fieldLabel: 'Work Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipLinkStatus',
		        	fieldLabel: 'Link Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipRemoteAddr',
		        	fieldLabel: 'Remote Addr',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipRemotePort',
		        	fieldLabel: 'Remote Port',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipRegFlag',
		        	fieldLabel: 'Reg Flag',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipCallMode',
		        	fieldLabel: 'Call Mode',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipAuthType',
		        	fieldLabel: 'Auth Type',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipSipT',
		        	fieldLabel: 'Support SIP-T',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipDetectTrunk',
		        	fieldLabel: '<label onmouseover=moveOver("sip_tran_proto",event) onmouseout=moveOut() class="tips_label">Tran Proto</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipTransProto',
		        	fieldLabel: '<label onmouseover=moveOver("sip_trk_status",event) onmouseout=moveOut() class="tips_label">Trunk detc</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipProtoVer',
		        	fieldLabel: 'SIP Version',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipAcctName',
		        	fieldLabel: 'Account',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipBindGrp',
		        	fieldLabel: '<label onmouseover=moveOver("sip_pstn_grp",event) onmouseout=moveOut() class="tips_label">PSTN GRP</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipExpireTime',
		        	fieldLabel: 'Expire Time',
		        }]
//>>>>>>> 7bc259048ad0f7b0cd46e6d6ad2d2e1b01ff2d0d
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:lanControll.getLanValue('fsCallsInfo'),
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'sipCurCalls',
		        	ulan:'curCallCount',
		        	fieldLabel: 'Cur Calls',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipAcd',
		        	ulan:'acd',
		        	fieldLabel: 'ACD',
		        },{
		        	xtype: 'displayfield',
		        	name: 'sipAsr',
		        	ulan:'asr',
		        	fieldLabel: 'ASR',
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