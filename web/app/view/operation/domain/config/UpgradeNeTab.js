Ext.define('app.view.operation.domain.config.UpgradeNeTab',{
		extend:'Ext.panel.Panel',
		layout:'border',
		treeId:'',
		forceRefresh:0,
		toolbars:0,
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
				        {header: 'Device SN',sortable:false,  dataIndex: 'productSnStr',ulan:'productSn',width:160},
						{header: 'Alias',  dataIndex: 'alias',width:140},
						{header: 'Admin Status', dataIndex: 'adminStatus',width:120,hidden:true,
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
				        {header: 'Vendor', dataIndex: 'vendorId',width:120,hidden:true,
							renderer:function(val){
								return rs.vendor(val);
							}
						},
				        {header: 'Version', dataIndex: 'packageVersion',ulan:'versionAbbr',width:100},
				        {header: 'Build Time', dataIndex: 'packageBuildTime',xtype: 'datecolumn',format:'m-d H:i:s',minWidth:120},
				        {header: 'RunTime',dataIndex: 'lifeSecond',width:150,hidden:true,
				     		renderer:function(val,metaData,record,rowIndex,store,view){
				     			return rs.tranSecondMin(val,record.get('runStatus'));
				     		}
				     	},
				       
				        {header: 'Upgrade Type', dataIndex: 'upgradeType',width:160,
				        	renderer:function(val){ 
								return rs.upgradeType(val);
							} 
				        },
				        {header: 'Target Software', dataIndex: 'targetSoftwareVer',minWidth:120},
				        {header: 'Upgrade Status', dataIndex: 'upgradeStatus',minWidth:120,
				        	renderer:function(val){ 
								return rs.upgradeFlag(val);
							} 
				        },
				        {header: 'Last Upgrade Result', dataIndex: 'lastUpgradeResult',minWidth:120,
				        	renderer:function(val){ 
								return rs.lastUpgradeResult(val);
							} 
				        },
				        {header: 'Last Upgrade Time', dataIndex: 'lastUpgradeTime',xtype: 'datecolumn',format:'m-d H:i',minWidth:120,hidden:true},
				     	{header: 'Port Total',dataIndex: 'portTotalCount',width:90,hidden:true},
						{header: 'Port Work',dataIndex: 'portWorkCount',width:90,hidden:true},
						{header: 'Description', dataIndex: 'detailDesc',minWidth:120,hidden:true},
						{header: 'domainUuid', dataIndex: 'domainUuid', hidden:true},
						{header: 'siteUuid', dataIndex: 'siteUuid', hidden:true},
						{header:'productId',dataIndex:'productId',ulan:'deviceTypeAbbr',hidden:true},
				],
				listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
					var maintenance = (nesGrid.up('panel').up('panel').id.indexOf('main')>=0)?1:0;
					var cmpId;
					if(maintenance){
						cmpId='maintenanceTree';
					}else{
						cmpId='operationTree';
					}
        			var ot=Ext.getCmp(cmpId);
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
			}	 	
			]
		});
			
			
			var upgrade={
					 xtype:'button',
		       		 text: 'Upgrade',
		       		ulan:'btUpgrade',
		       		 iconCls: 'provision-small',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
							
		       		 		if ( nesGrid.getSelectionModel().hasSelection()){
		  				
								var records= nesGrid.getSelectionModel().getSelection();
								var ids="";
								var upgradeTypes="";
								var maxVersion=records[0].get('packageVersion');
//									alert("maxVersion1="+maxVersion);
								var productId=records[0].get('productId');
								var names=new Array();
								var alias = "";
								for ( var i = 0; i < records.length; i++) {
									var tempProductId=records[i].get('productId');
									if(tempProductId!=productId){
										Ext.MessageBox.alert(boxWarnning,boxOneTypeToUpgrade);
										return;
									}
									if(records[i].get('upgradeType')=="0"){
										Ext.MessageBox.alert(boxWarnning,boxUpgradeNeedEnable);
										return;
									}
									
									var upgradeStatus = records[i].get('upgradeStatus');
									if(upgradeStatus==2){
										Ext.MessageBox.alert(boxWarnning
												,boxUpgradeStatus+rs.upgradeFlag(upgradeStatus)+boxCanNotUpgrade);
										return;
									}
//										alert("maxVersion2="+maxVersion);
									if(i==0){
										ids=records[i].get('uuid');
										upgradeTypes = records[i].get('upgradeType');
										alias = records[i].get('alias');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('uuid');
										upgradeTypes = upgradeTypes+'-'+records[i].get('upgradeType');
									}
									var tempVersion=records[i].get('packageVersion');
									
									if(tempVersion>maxVersion){
										maxVersion=tempVersion;
									}
									
								}
//									var domainUuid=Ext.getCmp('nesInDomainTab').treeId;
								
								var upgradeNe = Ext.getCmp('maintenanceUpgradeNe');
								if(!upgradeNe){
									upgradeNe=Ext.create('app.view.operation.domain.roamzone.site.UpgradeNe',{});
									lanControll.setLan(upgradeNe);
								}
								var domainUuid = records[0].get("domainUuid");
			        			var domainInfoStore=Ext.create('app.store.operation.domain.DomainInfoStore',{});
			        			domainInfoStore.on('beforeload', function (domainInfoStore, options) {
			        		        var params = { uuid:domainUuid};
			        		        Ext.apply(domainInfoStore.proxy.extraParams, params);
			        		    });
			        			var vendorId;
			        			domainInfoStore.on('load',function(){
			        				var r=domainInfoStore.getAt(0);
			        				vendorId=domainInfoStore.getAt(0).get('vendorId');
									upgradeNe.down('form').getForm().findField('ids').setValue(ids);
									upgradeNe.down('form').getForm().findField('productId').setValue(productId);
									upgradeNe.down('form').getForm().findField('maxVersion').setValue(maxVersion);
									upgradeNe.down('form').getForm().findField('upgradeType1').setValue(rs.upgradeType(upgradeTypes));
									upgradeNe.down('form').getForm().findField('upgradeTypes').setValue(""+upgradeTypes);
									upgradeNe.down('form').getForm().findField('alias').setValue(alias);
									
									var provUrl=Ext.get('provUrl').value;
				        			upgradeNe.down('form').getForm().findField('provUrl').setValue(provUrl);
									
									var vendorStore=Ext.create('app.store.provision.VendorListStore',{});
									vendorStore.on('beforeload', function (vendorStore, options) {
				        				var params = { defaultVendorId:vendorId};
				        		        Ext.apply(vendorStore.proxy.extraParams, params);
				        		        upgradeNe.down('form').getForm().findField('vendorId').store=vendorStore;
				        		    });
									roleId = Ext.get('roleId').value;
									vendorStore.on('load',function(vendorStore, options){
										if(!roleType.isSuper(roleId) && vendorId>0){
											vendorStore.filter('vendorId',vendorId);
											if(vendorStore.getCount() == 0){
												Ext.MessageBox.alert(boxError,boxIllegalData);
											}
										}
										upgradeNe.down('form').getForm().findField('vendorId').setValue(vendorId);
										upgradeNe.show();
				        			});
									
									vendorStore.load();
			        			})
								domainInfoStore.load();
		  		 			}else{
		  		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		  		 				return;
		  		 			}
								
								
		       		 	}
		       		 }
			};
			
			var unUpgrade={
					 xtype:'button',
		       		 text: 'Cancel Upgrade',
		       		 ulan:'btUnUpgrade',
		       		 iconCls: 'option',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
							
		       		 		if ( nesGrid.getSelectionModel().hasSelection()){
		  				
								var records= nesGrid.getSelectionModel().getSelection();
								var ids="";
								var names=new Array();
								var alias = "";
								for ( var i = 0; i < records.length; i++) {
//									var upgradeStatus = records[i].get('upgradeStatus');
//									if(upgradeStatus==2){
//										Ext.MessageBox.alert(boxWarnning
//												,boxUpgradeStatus+rs.upgradeFlag(upgradeStatus)+boxCanNotUpgrade);
//										return;
//									}
									if(i==0){
										ids=records[i].get('uuid');
										alias = records[i].get('alias');
									}else {
										cnt=1;
										ids=ids+","+records[i].get('uuid');
									}
								}
								var domainUuid = records[0].get("domainUuid");
								var info=lanControll.getLanValue('cancelUpgradeTips');
								Ext.MessageBox.confirm(boxWarnning,info,function(e) {
		       						if( e == 'yes' ){
		       							Ext.Ajax.request({
					                		url:'neManager!cancelUpgrade.action?ids='+ids+"&domainUuid="+domainUuid+"&alias="+alias,
					                		method:'POST',
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
					                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
					                    			nesGrid.getStore().load();
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
			};

			var selectAll={
		       		 xtype:'button',
		       		 text: 'SelectAll',
		       		ulan:'btSelectAll',
		       		 iconCls: 'selectAll',
		       		 flag:"domain_read",
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

		 			text: 'Setting',
		 			iconCls: 'option',
		 			ulan:'btSetting',
		 			flag:"domain_edit",
		 			listeners:{
		 				click:function(){
		 				
		 					if (!nesGrid.getSelectionModel().hasSelection()){
		    		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		    		 				return;
		 					}
		 					var records= nesGrid.getSelectionModel().getSelection();
		 					var ids="";
		 					var neAlias = "";
		 					var productId = 0;
		 					for ( var i = 0; i < records.length; i++) {
		 						if(i==0){
		 							ids=records[i].get('uuid');
		 							productId=records[i].get('productId');
		 							neAlias=records[i].get('alias');
		 						}else {
		 							cnt=1;
		 							ids=ids+","+records[i].get('uuid');
		 						}
		 					}
		 					
		 					var tab = Ext.getCmp("upgradeSetting");
		 					if(tab == undefined){
		 						tab = Ext.create("app.view.operation.domain.config.UpgradeSetting",{id:'upgradeSetting'});
		 						lanControll.setLan(tab);
		 					}
		 					tab.down('form').getForm().findField('ids').setValue(ids);
		 					tab.down('form').getForm().findField('neAlias').setValue(neAlias);
		 					tab.down('form').getForm().findField('productId').setValue(productId);
		 					tab.down('form').getForm().findField('componentId').setValue(nesGrid.up('panel').id);
		 					tab.show();
		 				}
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
	       		 		
	       		 			nesGrid.down('pagingtoolbar').moveFirst();
		       	 		}
		       	 	}
		    };
			
			var remote = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Remote Web',
	       		ulan:'btRemoteWeb',
	       		 iconCls: 'domain-group',
	       		flag:"domain_action",
//	       		 menu:{
//		       		 xtype:'menu',			       		 
//		       		 items:[{
//		       			text:'New Tab',
//		       			ulan:'miNewTab',
//		       			handler:function(){
//		       		 		if ( nesGrid.getSelectionModel().getSelection().length==1){	       				
//		       		 			var records= nesGrid.getSelectionModel().getSelection();
//		       		 			var sn=records[0].get('productSnStr');
//		       		 			var uuid=records[0].get('uuid');
//		       		 			var domainUuid = records[0].get('domainUuid');
//		       		 			var panel=this.up('panel').up('panel').up('panel').up('panel');
//		       		 			var id = panel.id+'_remote';
//		       		 			var domainStore = Ext.getStore('domainInfoStore');
//		       		 			if(domainStore!=undefined && domainStore!=null && typeof(domainStore)==='object'){
//		       		 				Ext.destroy(domainStore);
//		       		 			}
//		       		 			domainStore = Ext.create('app.store.operation.domain.DomainInfoStore',{});		
//		       		 			domainStore.on('beforeload', function () {
//		            		        var params = { uuid:domainUuid};
//		            		        Ext.apply(domainStore.proxy.extraParams, params);
//		            		    });
//		       		 			domainStore.on('load', function(){
//		       		 				var r=domainStore.getAt(0);
//			       		 			var idleTime=r.get('idleTime');			       		 			
//			       		 			Ext.Ajax.request({
//				                		url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&idleTime="+idleTime+"&domainUuid="+domainUuid,
//				                		method:'POST',
//				                		callback: function (options, success, response) {
//					             var obj=Ext.JSON.decode(response.responseText);			
//					               if(obj['success']){
//					            	    var url=obj['url'];				            	   
//					            	  	var remoteTab=panel.up('panel');
//					            	  	var tab = Ext.getCmp(id);
//					            	  	if(tab!=undefined){
//					            	  		tab.destroy();
//					            	  	}
//	            	  	  tab=remoteTab.add({
//	            	  	      	title:sn,
//	                    	            	  	id:id,
//	                    					    closable: true,
//	                    					    autoScroll: true,
//	                    					    layout:'fit',
//	                    					    items :[{
//	                    					        itemId:'remote_web',
//	                    					        layout:'fit',
//	                    							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
//	                    						}]
//	                    					});
//					            	  	tab.show();	
//					               }else{
//					            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
//					               }
//					               }
//					                        })
//		       		 			});
//		       		 			domainStore.load();
//	       		 			}else{
//	       		 				Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
//	       		 				return;
//	       		 			}								
//		       		 	}
//		       		 },{
//		       			text:'New Window',
//		       			ulan:'miNewWindow',
		       			handler:function(){
		       		 		if ( nesGrid.getSelectionModel().getSelection().length==1){	       				
		       		 			var records= nesGrid.getSelectionModel().getSelection();
		       		 			var sn=records[0].get('productSnStr');
		       		 			var uuid=records[0].get('uuid');
		       		 			var domainUuid = records[0].get('domainUuid');
//		       		 			var domainUuid=Ext.getCmp('domainPanel').treeId;
		       		 			var domainStore = Ext.getStore('maintenanceDomainInfoStore');
		       		 			if(domainStore!=undefined && domainStore!=null && typeof(domainStore)==='object'){
		       		 				Ext.destroy(domainStore);
		       		 			}
		       		 			domainStore = Ext.create('app.store.operation.domain.DomainInfoStore',{});		
		       		 			domainStore.on('beforeload', function () {
		            		        var params = { uuid:domainUuid};
		            		        Ext.apply(domainStore.proxy.extraParams, params);
		            		    });
		       		 			domainStore.on('load', function(){
		       		 				var r=domainStore.getAt(0);
			       		 			var idleTime=r.get('idleTime');			       		 			
			       		 			Ext.Ajax.request({
				                		url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&idleTime="+idleTime+"&domainUuid="+domainUuid,
				                		method:'POST',
				                		callback: function (options, success, response) {
					             var obj=Ext.JSON.decode(response.responseText);			
					               if(obj['success']){
					            	    var url=obj['url'];
//					            	        window.open(url);
					            	    openChildWin(url);
					               }else{
					            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
					               }
					               }
					                        })
		       		 			});
		       		 			domainStore.load();
	       		 			}else{
	       		 				Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
	       		 				return;
	       		 			}								
		       		 	}
//		       		 }], 
//	       	 	 }
	       	 });
			
			
			var search={
		       		 xtype:'button',
		       		 text:'Search',
		       		 iconCls:'search',
		       		ulan:'btSearch',
		       		 flag:"domain_read",
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
			if((tbs&2)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=setting;
			}
			
			if((tbs&1)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=selectAll;
			}

			
			if((tbs&4)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=upgrade;
				items[i++]='-';
				items[i++]=unUpgrade;
			}
			if((tbs&32)>0){
				if(items[0]!=undefined){
					items[i++]='-';
				}
				items[i++]=remote;
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
					name:'domainUuid'
				},{
					xtype:'textfield',
					fieldLabel:'Device SN',
					name:'productSn',
				},{
					xtype:'textfield',
					fieldLabel:'Alias',
					name:'alias',
				},rs.createAdminStatus(null,[0,1,2]),rs.createRunStatus(20,null),rs.createUpgradeStatus(null,[0,1,2,3],null),
				{
					xtype:'textfield',
					fieldLabel:'Device Model',
					name:'productName',
				},{
					xtype:'textfield',
					fieldLabel:'Version',
					name:'version',
				},{
					xtype:'textfield',
					fieldLabel:'Target Version',
					name:'targetSoftwareVer',
				}],
				
				buttons : [{
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(0);
							this.up('form').getForm().findField('upgradeStatus').setValue(0);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
				handler : function() {
					
					var panel = this.up('form').up('panel').up('panel');
					var domainUuid=panel.treeId;
					
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
		}	
});
