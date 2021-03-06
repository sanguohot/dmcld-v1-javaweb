Ext.define('app.view.operation.domain.roamzone.site.nes.DspInNe', {
	extend:'Ext.panel.Panel', 
	title:lanControll.getLanValue('tiDspList'),
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
				{header: 'Port',dataIndex: 'portNo',width:40 },
				{header: 'Alias',dataIndex: 'alias',width:80,hidden:true},
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
				{header: 'workStatus',  dataIndex: 'dspWorkStatus',ulan:'workStateAbbr',width:90,
					renderer:function(val){  
						return rs.dspWorkStatus(val);
					} 
				},
				{header: 'pcmLaw',dataIndex: 'dspPcmLaw',width:100,
					renderer:function(val){  
						return rs.dspPcmLaw(val);
					} 
				},
				{header: 'workTime',dataIndex: 'dspWorkTime',ulan:'workTimeAbbr',width:120,
					renderer:function(val,metaData,record,rowIndex,store,view){
     					return rs.tranSecondMin(val,record.get('runStatus'));
     				}
				},
				{header: 'Usage',dataIndex: 'dspCalcuAlo',width:70},
				{header: 'RSTCnt',ulan:'rstCntAbbr',dataIndex: 'value6',width:70},
				{header: 'ChnNum',dataIndex: 'dspChannelNum',width:70},
				{header: 'ChnFail',dataIndex: 'dspChannelFail',width:70},
				{header: 'rtpDelay',dataIndex: 'dspRtpDelay',width:100},
				{header: 'rtpDelayMax',dataIndex: 'dspRtpDelayMax',width:100},
				{header: 'Vol(Dbm)',dataIndex: 'dspRtpDbm',width:110},
				
				{header: 'deviceUuid',dataIndex: 'neUuid',hidden:true},
				{header: 'dspUuid',dataIndex: 'dspUuid',hidden:true},
		       
		        
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
				 			var workStateField=form.findField('dspWorkStatus');
				 			var dspPcmLawField=form.findField('dspPcmLaw');
				 			var dspWorkTimeField=form.findField('dspWorkTime');
				 			Ext.suspendLayouts();
				 			form.loadRecord(record);
				 			oprField.setValue(rs.oprStatus(record.get('oprStatus')));
				 			runField.setValue(rs.runStatus(record.get('runStatus')));
				 			workStateField.setValue(rs.dspWorkStatus(record.get('dspWorkStatus')));
				 			dspPcmLawField.setValue(rs.dspPcmLaw(record.get('dspPcmLaw')));
				 			dspWorkTimeField.setValue(rs.tranSecondMin(record.get('dspWorkTime'),record.get('runStatus')));
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
				iconCls: 'view_group',
				ulan:'btView',
				flag:"domain_read",
				menu:{
				xtype:'menu',			       		 
				items:[{
					text:'Default View',
					ulan:'miDefaultView',
					handler:function(){
						var showIds=",checkbox,portNo,adminStatus,runStatus,dspWorkStatus,dspPcmLaw,dspWorkTime,dspCalcuAlo,value6,dspChannelNum,dspChannelFail,dspRtpDelay,dspRtpDelayMax,dspRtpDbm";
						var hideIds=",uuid,alias,oprStatus,neUuid,dspUuid";
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						
						ip.insertViewAdvance(tgpInNeGrid,'dspl',11,showIds,hideIds);
					}
				},{
					text:'Basic View',
					ulan:'miBasicView',
					handler:function(){
						var showIds=",checkbox,portNo,alias,adminStatus,oprStatus,runStatus";
						var hideIds=",uuid,dspWorkStatus,dspPcmLaw,dspWorkTime,dspCalcuAlo,value6,dspChannelNum,dspChannelFail,dspRtpDelay,dspRtpDelayMax,dspRtpDbm,neUuid,dspUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'dspl',12,showIds,hideIds);
					}
				},{
					text:'Detail View',
					ulan:'miDetailView',
					handler:function(){
						var showIds=",checkbox,portNo,alias,adminStatus,oprStatus,runStatus,dspWorkStatus,dspPcmLaw,dspWorkTime,dspCalcuAlo,value6,dspChannelNum,dspChannelFail,dspRtpDelay,dspRtpDelayMax,dspRtpDbm";
						var hideIds=",uuid,neUuid,dspUuid";
						
//						ip.changeView(tgpInNeGrid,showIds,true);
//						ip.changeView(tgpInNeGrid,hideIds,false);
						ip.insertViewAdvance(tgpInNeGrid,'dspl',13,showIds,hideIds);
					}
				},'-',{
					text:'User View-1',
					ulan:'miUserView1',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'dspl',1,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-2',
					ulan:'miUserView2',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'dspl',2,tgpInNeGrid.up('panel').up('panel').id);
					}
				},{
					text:'User View-3',
					ulan:'miUserView3',
					handler:function(){
						ip.changeUserView(tgpInNeGrid,'dspl',3,tgpInNeGrid.up('panel').up('panel').id);
					}
				},'-',{
					text:'User Setting...',
					ulan:'miUserSetting',
					handler:function(){
						var win=Ext.getCmp('viewAdvanced');
						var win=ip.initViewSet(tgpInNeGrid);
						win.down('hiddenfield[name=mode]').setValue('dspl');
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
		        	name: 'dspWorkStatus',
		        	ulan:'workState',
		        	fieldLabel: 'Work Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspPcmLaw',
		        	fieldLabel: 'PCM Law',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspWorkTime',
		        	ulan:'workTime',
		        	fieldLabel: 'Work Time',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspCalcuAlo',
		        	fieldLabel: 'Usage',
		        },{
		        	xtype: 'displayfield',
		        	name: 'value6',
		        	ulan:'rstCnt',
		        	fieldLabel: 'Reset Count',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspChannelNum',
		        	fieldLabel: 'Channel Num',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspChannelFail',
		        	fieldLabel: 'Channel Fail',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspRtpDelay',
		        	fieldLabel: 'RTP Delay',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspRtpDelayMax',
		        	fieldLabel: 'RTP Delay Max',
		        },{
		        	xtype: 'displayfield',
		        	name: 'dspRtpDbm',
		        	fieldLabel: 'Vol(Dbm)',
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
			 items:[detail_panel]
		}];
		this.callParent(arguments);		
	}
});