Ext.define('app.view.operation.domain.config.SyslogNeTab',{
		extend:'Ext.panel.Panel',
		layout:'border',
		treeId:'',
		domainUuid:0,
		forceRefresh:0,
		toolbars:0,
		border:false,
		initComponent: function() {
			
			var nesInSiteStore= Ext.create('app.store.operation.domain.roamzone.site.NesInSiteStore', {}); 
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var nesGrid = Ext.create('Ext.grid.Panel', {
				itemId:'grid',
				border:false,
				autoScroll:true,
				columnLines:true,
				store: nesInSiteStore, 
				selModel: sm,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
				        {header: 'uuid', dataIndex: 'uuid', hidden:true},
				        {header: 'Device SN',sortable:false,  dataIndex: 'productSnStr',ulan:'productSn',  width:160},
						{header: 'Alias',  dataIndex: 'alias',width:140},
						{header: 'Admin Status', dataIndex: 'adminStatus',width:120,
							renderer:function(val){  
								return rs.adminStatus(val);
							 }
						},
						{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',width:120,hidden:true,
							renderer:function(val){  
								return rs.oprStatus(val);
							} 
						},
						{header: 'Run Status', dataIndex: 'runStatus',width:120,
							renderer:function(val){  
								return rs.runStatus(val);
							} 
						},
						{header: 'Device Model', dataIndex: 'productName', width:120,hidden:true},
				        {header: 'Syslog Status', dataIndex: 'syslogStatus',width:80,
							renderer:function(val){ 
				        		return rs.sysLogStatus(val);
							} 
				        },
				        {header: 'Begin Date',dataIndex: 'syslogBeginDate',xtype: 'datecolumn',format:'m-d H:i',width:120},
				        {header: 'EndDate',dataIndex: 'syslogEndDate',xtype: 'datecolumn',format:'m-d H:i',width:120},
				        {header: 'Debug Level', dataIndex: 'syslogDebugLevel',width:80,
				        	renderer:function(val){
								return rs.sysLogDebugLevel(val);
							} 
				        },
				        {header: 'CDR', dataIndex: 'cdrLogFlag',width:80,
				        	renderer:function(val){ 
				        		return rs.yesOrNo(val);
				        	} 
				        },
				        {header: 'Signal', dataIndex: 'signalLogFlag',width:80,
				        	renderer:function(val){ 
				        		return rs.yesOrNo(val);
				        	} 
				        },
				        {header: 'Media', dataIndex: 'mediaLogFlag',width:80,
				        	renderer:function(val){ 
				        		return rs.yesOrNo(val);
				        	} 
				        },
				        {header: 'System', dataIndex: 'systemLogFlag',width:80,
				        	renderer:function(val){ 
				        		return rs.yesOrNo(val);
				        	} 
				        },
				        {header: 'Management', dataIndex: 'mngLogFlag',width:120,
				        	renderer:function(val){ 
				        		return rs.yesOrNo(val);
				        	} 
				        },
						{header: 'siteUuid', dataIndex: 'siteUuid', hidden:true},
						{header: 'logSysUuid', dataIndex: 'logSysUuid', hidden:true},
						{header:'productId',dataIndex:'productId',ulan:'deviceTypeAbbr',hidden:true},
				],
				listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
        			var ot=Ext.getCmp('maintenanceTree');
        			var uuid=row.get('uuid');
        			var rootNode=ot.getRootNode();
        			var node=rootNode.findChild('nid','nes_'+uuid,true);
        			
        			ot.fireEvent('itemclick',null,node);
				}						
			},
			dockedItems:[{

			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: nesInSiteStore,
			     pageSize: 25,
			     displayInfo: true,
			}]
		});
//		window.viewSyslog =function(fileName,fileHref){
//			var tabpanel = syslogGrid.up('panel').up('panel');
//			
//			var prefix = 'syslogDetail_';
//			var id=prefix+"name_"+fileName;
//			var tab = Ext.getCmp(id);
//			if(tab==undefined){
//				tab=tabpanel.add({
//	  	                id:id,
//						title:fileName,
//					    closable: true,
//					    autoScroll: true,
//					    layout:'fit',
//					    items :[{
//					        itemId:'remote_web',
//							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+fileHref+'"></iframe>'
//						}]
//    			});
//			}
//			tab.show();
//		};
			var selectAll={
		       		 xtype:'button',
		       		 text: 'SelectAll',
		       		ulan:'btSelectAll',
		       		 iconCls: 'selectAll',
		       		 listeners:{
		       			 click:function(){
		       		 		if(nesGrid.getSelectionModel().hasSelection()){
		       		 		nesGrid.getSelectionModel().deselectAll();  
		       		 		}else{
		       		 		nesGrid.getSelectionModel().selectAll();
		       		 		}
		       		 	}
		       		 }
		    };
			var setting={

		 			text: 'Start Syslog',
		 			ulan:'btStartSyslog',
		 			iconCls: 'control_start',
		 			listeners:{
		 				click:function(){
		 				
		 					if (!nesGrid.getSelectionModel().hasSelection()){
		    		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		    		 				return;
		 					}
		 					var records= nesGrid.getSelectionModel().getSelection();
		 					var ids="";
		 					var productId = "";
		 					var alias = "";
		 					for ( var i = 0; i < records.length; i++) {
		 						if(i==0){
		 							ids=records[i].get('uuid');
		 							alias=records[i].get('alias');
		 							productId=records[i].get('productId');
		 						}else {
		 							cnt=1;
		 							ids=ids+","+records[i].get('uuid');
		 						}
		 					}
		 					
		 					var tab = Ext.getCmp("syslogSetting");
		 					if(tab == undefined){
		 						tab = Ext.create("app.view.operation.domain.config.SyslogSetting",{id:'syslogSetting'});
		 						lanControll.setLan(tab);
		 					}
		 					var domainUuid=nesGrid.up('panel').up('panel').domainUuid;
		 					
		 					tab.down('form').getForm().findField('ids').setValue(ids);
		 					tab.down('form').getForm().findField('productId').setValue(productId);
		 					tab.down('form').getForm().findField('alias').setValue(alias);
		 					tab.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		 					
		 					tab.down('form').getForm().findField('componentId').setValue(nesGrid.up('panel').id);
		 					tab.show();
		 				}
		 			}
		 		
		    };
			var stopSyslog={
			    		text: 'Stop Syslog',
			    		ulan:'btStopSyslog',
			    		iconCls:'control_stop',
			    		handler:function(){
							if (!nesGrid.getSelectionModel().hasSelection()){
				 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				 				return;
							}
							var records= nesGrid.getSelectionModel().getSelection();
							var ids="";
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
									productId=records[i].get('productId');
									alias = records[i].get('alias');
								}else {
									cnt=1;
									ids=ids+","+records[i].get('uuid');
								}
							}
					
				        	Ext.MessageBox.confirm(boxWarnning,boxStopSyslog,function(e) {																			
								if( e == 'yes' ){
									var domainUuid=nesGrid.up('panel').up('panel').domainUuid;
									Ext.Ajax.request({
				                		url:'neManager!stopSyslog.action',
				                		method:'POST',
				                		params:{ids:ids,domainUuid:domainUuid,alias:alias,productId:productId},
				                		callback: function (options, success, response) {
					                    	var obj=Ext.JSON.decode(response.responseText);			
					                    	if(obj['success']){
					                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
					                    	}
				                    	}
				                	});
								}
				        	});
			    		}		        	
			        };
			var refresh={
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
	       		 		
	       		 			nesGrid.down('pagingtoolbar').moveFirst();
		       	 		}
		       	 	}
		    };
			var search={
		       		 xtype:'button',
		       		 text:'Search',
		       		ulan:'btSearch',
		       		 iconCls:'search',
		       		 listeners:{
		       		 	click:function(){
		       		 		var eastSearch=nesGrid.up('panel').up('panel').down("panel[region=east]");
		       		 		if(eastSearch.isHidden()){
		       		 			eastSearch.expand();
		       		 		}else{
		       		 			eastSearch.collapse();
		       		 		}
		       	 		}
		       	 	}
		    };
			
			var di=[{
		        xtype: 'toolbar',
		        items: []
		    }];
			var items=di[0].items;
			var tbs=this.toolbars;
			var i=0;
			if((tbs&1)>0){
				items[i++]=selectAll;
			}

			if((tbs&2)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=setting;
			}
			if((tbs&4)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=stopSyslog;
			}
			if((tbs&8)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=refresh;
			}
			if((tbs&16)>0){
				if(items[0]!=undefined){
					items[i++]='->';
				}
				items[i++]=search;
			}
			
			nesGrid.addDocked(di);
			
			

			var search_grid=Ext.create('Ext.form.Panel',{
				border : false,
				bodyPadding : 5,
				defaults : {
				margins : '0 0 10 0'
				},
				items : [{
					xtype:'hiddenfield',
					name:'moduleId',
					value:'syslog'
				},{
					xtype:'hiddenfield',
					name:'domainUuid'
				},{
					xtype:'textfield',
					fieldLabel:'Device SN',
					name:'productSn',
				},{
					xtype:'textfield',
					fieldLabel:'Alias',
					name:'alias',
				},rs.createAdminStatus(null,[0,1,2]),rs.createRunStatus(20,null),{
		            xtype: 'combo',
		            name: 'syslogStatus',
		            fieldLabel: 'Syslog Status',
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
							name : lanControll.getLanValue('syslogStatus_'+0),
							statusId : 0
						}, {
							name : lanControll.getLanValue('syslogStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('syslogStatus_'+2),
							statusId : 2
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'syslogDebugLevel',
		            fieldLabel: 'Syslog Level',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'statusId',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'statusId' ],
						data : [ {
							name : '-SELECT-',
							statusId : -2
						},{
							name : 'DISABLE',
							statusId : -1
						}, {
							name : 'EMERG',
							statusId : 0
						}, {
							name : 'ALERT',
							statusId : 1
						}, {
							name : 'CRIT',
							statusId : 2
						}, {
							name : 'ERR',
							statusId : 3
						}, {
							name : 'WARNING',
							statusId : 4
						}, {
							name : 'NOTICE',
							statusId : 5
						}, {
							name : 'INFO',
							statusId :6
						}, {
							name : 'DEBUG',
							statusId : 7
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'cdrLogFlag',
		            fieldLabel: 'CDR Log Flag',
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
							name : lanControll.getLanValue('enableOrDisable_'+0),
							statusId : 0
						}, {
							name : lanControll.getLanValue('enableOrDisable_'+1),
							statusId : 1
						}]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'signalLogFlag',
		            fieldLabel: 'Signal Log Flag',
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
							name : lanControll.getLanValue('enableOrDisable_'+0),
							statusId : 0
						}, {
							name : lanControll.getLanValue('enableOrDisable_'+1),
							statusId : 1
						}]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'mediaLogFlag',
		            fieldLabel: 'Media Log Flag',
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
							name : lanControll.getLanValue('enableOrDisable_'+0),
							statusId : 0
						}, {
							name : lanControll.getLanValue('enableOrDisable_'+1),
							statusId : 1
						}]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'systemLogFlag',
		            fieldLabel: 'System Log Flag',
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
							name : lanControll.getLanValue('enableOrDisable_'+0),
							statusId : 0
						}, {
							name :lanControll.getLanValue('enableOrDisable_'+1),
							statusId : 1
						}]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'mngLogFlag',
		            fieldLabel: 'Management Log Flag',
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
							name : lanControll.getLanValue('enableOrDisable_'+0),
							statusId : 0
						}, {
							name : lanControll.getLanValue('enableOrDisable_'+1),
							statusId : 1
						}]
					}),
					
		        }],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(0);
							this.up('form').getForm().findField('syslogStatus').setValue(-1);
							this.up('form').getForm().findField('syslogDebugLevel').setValue(-2);
							this.up('form').getForm().findField('cdrLogFlag').setValue(-1);
							this.up('form').getForm().findField('signalLogFlag').setValue(-1);
							this.up('form').getForm().findField('mediaLogFlag').setValue(-1);
							this.up('form').getForm().findField('systemLogFlag').setValue(-1);
							this.up('form').getForm().findField('mngLogFlag').setValue(-1);
							
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				handler : function() {
					
					var panel = this.up('form').up('panel').up('panel');
					var domainUuid=panel.domainUuid;
					
					var form=this.up('form').getForm();
					form.findField('domainUuid').setValue(domainUuid);
					
					var gridStore=nesGrid.store;				
					
					var params = form.getValues();
					Ext.apply(gridStore.proxy.extraParams, params);
					var paging = panel.down("pagingtoolbar");
					paging.moveFirst();
				}
				}]
			});
			
			 this.items=[{
				 region: 'center',
				 layout:'fit',
				 items:[nesGrid]
				},{
				 region:'east',
				 title : tiSearch,
				 collapsible: true,
				 collapsed:true,
				 width:300,
				 items:[search_grid]
			 }];
			this.callParent(arguments);		
		},
//		listeners:{
//			activate: function(tab){
//				var grid=tab.down('panel').down('panel');
//				if(tab.forceRefresh==1){
//					tab.forceRefresh=0;
//					grid.store.load();
//				}
//			}
//		}
});
