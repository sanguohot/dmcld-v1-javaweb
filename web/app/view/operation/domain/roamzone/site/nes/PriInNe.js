Ext.define('app.view.operation.domain.roamzone.site.nes.PriInNe', {
	extend:'Ext.panel.Panel', 
	title:lanControll.getLanValue('tiPriList'),
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
				{header: 'runStatus', dataIndex: 'runStatus',width:110,
					renderer:function(val){  
						return rs.runStatusImg(val);
					} 
				},
				{header: 'workStatus',  dataIndex: 'priWorkStatus',ulan:'workStateAbbr',width:90,
					renderer:function(val){  
						return rs.priWorkStatus(val);
					} 
				},
				{header: 'curCalls',dataIndex: 'priCurCalls',ulan:'curCallCountAbbr',width:70},
				{header: 'maxCalls',dataIndex: 'priCurCallsMax',ulan:'maxCallCountAbbr',width:70},
				{header: 'ACD',dataIndex: 'priAcd',ulan:'acdAbbr',width:70},
				{header: 'ASR',dataIndex: 'priAsr',ulan:'asrAbbr',width:70},
				
				{header: 'proto',dataIndex: 'priProto',width:70,
					renderer:function(val){  
						return rs.priProto(val);
					} 
				},
				{header: 'switchSide',dataIndex: 'priSwside',width:120,
					renderer:function(val){  
						return rs.priSwside(val);
					}	
				},
				{header: 'Alerting Indn',dataIndex: 'priAlertIndi',width:120,
					renderer:function(val){  
						return rs.priAlertIndi(val);
					}
				},
				
				{header: 'deviceUuid',dataIndex: 'neUuid',hidden:true},
				{header: 'priUuid',dataIndex: 'priUuid',hidden:true},
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
			 			var workStateField=form.findField('priWorkStatus');
			 			var typeField=form.findField('ss7Type');

			 			var priProtoField=form.findField('priProto');
			 			var priSwsideField=form.findField('priSwside');
			 			var priAlertIndiField=form.findField('priAlertIndi');
			 			Ext.suspendLayouts();
			 			form.loadRecord(record);
			 			oprField.setValue(rs.oprStatus(record.get('oprStatus')));
			 			runField.setValue(rs.runStatus(record.get('runStatus')));
			 			workStateField.setValue(rs.priWorkStatus(record.get('priWorkStatus')));

			 			priProtoField.setValue(rs.priProto(record.get('priProto')));
			 			priSwsideField.setValue(rs.priSwside(record.get('priSwside')));
			 			priAlertIndiField.setValue(rs.priAlertIndi(record.get('priAlertIndi')));
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
	     		 iconCls: 'reset',
	     		ulan:'btReset',
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
						var showIds="checkbox,portNo,adminStatus,runStatus,priWorkStatus,priProto,priSwside,priAlertIndi,priCurCalls,priCurCallsMax,priAcd,priAsr";
						var hideIds="uuid,alias,oprStatus,neUuid,priUuid";
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'pril',11,showIds,hideIds);
					}
				},{
					text:'Basic View',
					ulan:'miBasicView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,alias,adminStatus,oprStatus,runStatus";
						var hideIds="priWorkStatus,priProto,priSwside,priAlertIndi,priCurCalls,priCurCallsMax,priAcd,priAsr,neUuid,priUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'pril',12,showIds,hideIds);
					}
				},{
					text:'Detail View',
					ulan:'miDetailView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,adminStatus,runStatus,priWorkStatus,priProto,priSwside,priAlertIndi";
						var hideIds="alias,oprStatus,priCurCalls,priCurCallsMax,priAcd,priAsr,neUuid,priUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'pril',13,showIds,hideIds);
					}
				},{
					text:'Calls View',
					ulan:'miCallsView',
					handler:function(){
						var showIds="checkbox,uuid,portNo,adminStatus,runStatus,priCurCalls,priCurCallsMax,priAcd,priAsr";
						var hideIds="alias,oprStatus,priWorkStatus,priProto,priSwside,priAlertIndi,neUuid,priUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'pril',14,showIds,hideIds);
					}
				},'-',{
					text:'User View-1',
					ulan:'miUserView1',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'pril',1,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-2',
					ulan:'miUserView2',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'pril',2,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-3',
					ulan:'miUserView3',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'pril',3,tgpInNeGrid.up('panel').up('panel').id);
					}
				},'-',{
					text:'User Setting...',
					ulan:'miUserSetting',
					handler:function(){
						var win=Ext.getCmp('viewAdvanced');
						var win=ip.initViewSet(tgpInNeGrid);
						win.down('hiddenfield[name=mode]').setValue('pril');
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
		        	name: 'priWorkStatus',
		        	ulan:'workState',
		        	fieldLabel: 'Work Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'priProto',
		        	fieldLabel: 'Protocol',
		        },{
		        	xtype: 'displayfield',
		        	name: 'priSwside',
		        	fieldLabel: 'Switch Side',
		        },{
		        	xtype: 'displayfield',
		        	name: 'priAlertIndi',
		        	fieldLabel: '<label onmouseover=moveOver("pri_alert_indi",event) onmouseout=moveOut() class="tips_label">Alerting Indn</label>',
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
		        	name: 'priCurCalls',
		        	ulan:'curCallCount',
		        	fieldLabel: 'Cur Calls',
		        },{
		        	xtype: 'displayfield',
		        	name: 'priCurCallsMax',
		        	ulan:'maxCallCount',
		        	fieldLabel: 'Max Calls',
		        },{
		        	xtype: 'displayfield',
		        	name: 'priAcd',
		        	ulan:'acd',
		        	fieldLabel: 'ACD',
		        },{
		        	xtype: 'displayfield',
		        	name: 'priAsr',
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