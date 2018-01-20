Ext.define('app.view.operation.domain.roamzone.site.nes.Ss7InNe', {
	extend:'Ext.panel.Panel', 
	title:lanControll.getLanValue('tiSs7List'),
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
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			recordId:0,
			columns: [
			    {header: 'portUuid',dataIndex: 'uuid',ulan:'portUuidAbbr',width:80,hidden:true},
				{header: 'port',dataIndex: 'portNo',width:40 },
				{header: 'alias',dataIndex: 'alias',width:80,hidden:true},
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
				{header: 'mode',  dataIndex: 'ss7Mode',width:80,
					renderer:function(val){  
						return rs.ss7Mode(val);
					} 
				},
				{header: 'workStatus',  dataIndex: 'ss7WorkStatus',ulan:'workStateAbbr',width:90,
					renderer:function(val){  
						return rs.ss7WorkStatus(val);
					} 
				},
				{header: 'curCalls',dataIndex: 'ss7CurCalls',ulan:'curCallCountAbbr',width:70},
				{header: 'maxCalls',dataIndex: 'ss7CurCallsMax',ulan:'maxCallCountAbbr',width:70},
				{header: 'ACD(sec)',dataIndex: 'ss7Acd',ulan:'acdAbbr',width:70},
				{header: 'ASR(%)',dataIndex: 'ss7Asr',ulan:'asrAbbr',width:70},
				
				{header: 'grpId',dataIndex: 'ss7GrpId',width:90},
				{header: 'proto',dataIndex: 'ss7Proto',width:90,
					renderer:function(val){  
						return rs.ss7Proto(val);
					} 
				},
				{header: 'type',  dataIndex: 'ss7Type',width:70,
					renderer:function(val){  
						return rs.ss7Type(val);
					} 
				},
				{header: 'netIndi',dataIndex: 'ss7NetIndi',width:130,
					renderer:function(val){  
						return rs.ss7NetIndi(val);
					}
				},
				{header: 'OPC',dataIndex: 'ss7Opc',width:80},
				{header: 'DPC',dataIndex: 'ss7Dpc',width:80},
				{header: 'sendSLTM',dataIndex: 'ss7SendSltm',width:90,
					renderer:function(val){  
						return rs.ss7SendSltm(val);
					}
				},
				{header: 'Link0Sta',dataIndex: 'ss7Link0Status',width:90,
					renderer:function(val){  
						return rs.ss7LinkStatus(val);
					}
				},
				{header: 'Lnk0SLC',dataIndex: 'ss7Link0Slc',width:90},
				{header: 'link0Port',dataIndex: 'ss7Link0Port',width:90},
				{header: 'link0Slot',dataIndex: 'ss7Link0Ts',width:90},
				{header: 'link1Sta',dataIndex: 'ss7Link1Status',width:90,
					renderer:function(val){  
						return rs.ss7LinkStatus(val);
					}
				},
				{header: 'link1SLC',dataIndex: 'ss7Link1Slc',width:90},
				{header: 'link1Port',dataIndex: 'ss7Link1Port',width:90},
				{header: 'link1Slot',dataIndex: 'ss7Link1Ts',width:90},

				{header: 'deviceUuid',dataIndex: 'neUuid',hidden:true},
				{header: 'ss7Uuid',dataIndex: 'ss7Uuid',hidden:true},
		       
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
			 			var form=eastSearch.down('form').getForm();
			 			var oprField=form.findField('oprStatus');
			 			var runField=form.findField('runStatus');
			 			var modeField=form.findField('ss7Mode');
			 			var workStateField=form.findField('ss7WorkStatus');
			 			var typeField=form.findField('ss7Type');
			 			
			 			var ss7ProtoField=form.findField('ss7Proto');
			 			var ss7NetIndiField=form.findField('ss7NetIndi');
			 			var ss7Link0StatusField=form.findField('ss7Link0Status');
			 			var ss7Link1StatusField=form.findField('ss7Link1Status');
			 			var ss7SendSltmField=form.findField('ss7SendSltm');
			 			Ext.suspendLayouts();
			 			form.loadRecord(record);
			 			oprField.setValue(rs.oprStatus(record.get('oprStatus')));
			 			runField.setValue(rs.runStatus(record.get('runStatus')));
			 			modeField.setValue(rs.ss7Mode(record.get('ss7Mode')));
			 			workStateField.setValue(rs.ss7WorkStatus(record.get('ss7WorkStatus')));
			 			typeField.setValue(rs.ss7Type(record.get('ss7Type')));

			 			ss7ProtoField.setValue(rs.ss7Proto(record.get('ss7Proto')));
			 			ss7NetIndiField.setValue(rs.ss7NetIndi(record.get('ss7NetIndi')));
			 			ss7Link0StatusField.setValue(rs.ss7LinkStatus(record.get('ss7Link0Status')));
			 			ss7Link1StatusField.setValue(rs.ss7LinkStatus(record.get('ss7Link1Status')));
			 			ss7SendSltmField.setValue(rs.ss7SendSltm(record.get('ss7SendSltm')));
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
						var showIds="checkbox,portNo,adminStatus,runStatus,ss7Mode,ss7WorkStatus,ss7GrpId,ss7Proto,ss7Type,ss7NetIndi,ss7Opc,ss7Dpc,ss7CurCalls,ss7CurCallsMax,ss7Acd,ss7Asr,ss7Link0Status,ss7Link0Slc,ss7Link0Port,ss7Link0Ts,ss7Link1Status,ss7Link1Slc,ss7Link1Port,ss7Link1Ts,ss7SendSltm";
						var hideIds="uuid,alias,oprStatus,neUuid,ss7Uuid";
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'ss7l',11,showIds,hideIds);
					}
				},{
					text:'Basic View',
					ulan:'miBasicView',
					handler:function(){
						var showIds="checkbox,portNo,adminStatus,runStatus,ss7Mode,ss7WorkStatus,ss7GrpId,ss7Proto,ss7Type";
						var hideIds="uuid,alias,oprStatus,ss7NetIndi,ss7Opc,ss7Dpc,ss7CurCalls,ss7CurCallsMax,ss7Acd,ss7Asr,ss7Link0Status,ss7Link0Slc,ss7Link0Port,ss7Link0Ts,ss7Link1Status,ss7Link1Slc,ss7Link1Port,ss7Link1Ts,ss7SendSltm,neUuid,ss7Uuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'ss7l',12,showIds,hideIds);
					}
				},{
					text:'Detail View',
					ulan:'miDetailView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,adminStatus,runStatus,ss7Mode,ss7WorkStatus,ss7GrpId,ss7Proto,ss7Type,ss7NetIndi,ss7Opc,ss7Dpc,ss7CurCalls,ss7CurCallsMax,ss7Acd,ss7Asr,ss7Link0Status,ss7Link0Slc,ss7Link0Port,ss7Link0Ts,ss7Link1Status,ss7Link1Slc,ss7Link1Port,ss7Link1Ts,ss7SendSltm";
						var hideIds="alias,oprStatus,neUuid,ss7Uuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'ss7l',13,showIds,hideIds);
					}
				},{
					text:'Calls View',
					ulan:'miCallView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,adminStatus,runStatus,ss7CurCalls,ss7CurCallsMax,ss7Acd,ss7Asr";
						var hideIds="alias,oprStatus,ss7Mode,ss7WorkStatus,ss7GrpId,ss7Proto,ss7Type,ss7NetIndi,ss7Opc,ss7Dpc,ss7Link0Status,ss7Link0Slc,ss7Link0Port,ss7Link0Ts,ss7Link1Status,ss7Link1Slc,ss7Link1Port,ss7Link1Ts,ss7SendSltm,neUuid,ss7Uuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'ss7l',14,showIds,hideIds);
					}
				},'-',{
					text:'User View-1',
					ulan:'miUserView1',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'ss7l',1,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-2',
					ulan:'miUserView2',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'ss7l',2,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-3',
					ulan:'miUserView3',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'ss7l',3,tgpInNeGrid.up('panel').up('panel').id);
					}
				},'-',{
					text:'User Setting...',
					ulan:'miUserSetting',
					handler:function(){
						var win=Ext.getCmp('viewAdvanced');
						var win=ip.initViewSet(tgpInNeGrid);
						win.down('hiddenfield[name=mode]').setValue('ss7l');
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
		        	name: 'ss7Mode',
		        	fieldLabel: 'Mode',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7WorkStatus',
		        	ulan:'workState',
		        	fieldLabel: 'Work Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7GrpId',
		        	fieldLabel: 'Grp Id',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Proto',
		        	fieldLabel: 'Protocol',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Type',
		        	fieldLabel: 'Type',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7NetIndi',
		        	fieldLabel: '<label onmouseover=moveOver("ss7_net_indi",event) onmouseout=moveOut() class="tips_label">Network INDI</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Opc',
		        	fieldLabel: '<label onmouseover=moveOver("ss7_opc",event) onmouseout=moveOut() class="tips_label">OPC</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Dpc',
		        	fieldLabel: '<label onmouseover=moveOver("ss7_dpc",event) onmouseout=moveOut() class="tips_label">DPC</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7SendSltm',
		        	fieldLabel: 'Sending SLTM',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link0Status',
		        	fieldLabel: 'Link0 Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link0Slc',
		        	fieldLabel: '<label onmouseover=moveOver("ss7_link0_slc",event) onmouseout=moveOut() class="tips_label">Lnk0 SLC</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link0Port',
		        	fieldLabel: 'Link0 Port',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link0Ts',
		        	fieldLabel: 'Link0 Slot',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link1Status',
		        	fieldLabel: 'Link1 Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link1Slc',
		        	fieldLabel: '<label onmouseover=moveOver("ss7_link1_slc",event) onmouseout=moveOut() class="tips_label">Lnk1 SLC</label>',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link1Port',
		        	fieldLabel: 'Link1 Port',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Link1Ts',
		        	fieldLabel: 'Link1 Slot',
		        }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:lanControll.getLanValue('fsCallsInfo'),
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'ss7CurCalls',
		        	ulan:'curCallCount',
		        	fieldLabel: 'Cur Calls',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7CurCallsMax',
		        	ulan:'maxCallCount',
		        	fieldLabel: 'Max Calls',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Acd',
		        	ulan:'acd',
		        	fieldLabel: 'ACD(sec)',
		        },{
		        	xtype: 'displayfield',
		        	name: 'ss7Asr',
		        	ulan:'asr',
		        	fieldLabel: 'ASR(%)',
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