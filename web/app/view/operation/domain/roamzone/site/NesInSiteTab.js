Ext.define('app.view.operation.domain.roamzone.site.NesInSiteTab',{
		extend:'Ext.panel.Panel',
		 requires: [
	               'Ext.util.Format',
	               'Ext.grid.Panel',
	               'Ext.toolbar.Paging',
		       	   'app.store.operation.domain.roamzone.site.NesInSiteStore',
	               'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
		           ],
		title:'',
//		id:'nesInSiteTab',
		layout:'border',
//		autoScroll:true,
		treeName:'',
		
		initComponent: function() {
			var nesInSiteStore= Ext.create('app.store.operation.domain.roamzone.site.NesInSiteStore', {}); 
//			nesInSiteStore.load();
			nesInSiteStore.on('beforeload',function(){
				nesInSiteStore.loadFlag = false;
			})
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var nesGrid = Ext.create('Ext.grid.Panel', {			
				border:false,
//				id:'nesInSiteGrid',
				itemId:'grid',
				autoScroll:false,
				columnLines:true,
				store: nesInSiteStore, 
				selModel: sm,
		        viewConfig : {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
				},
				columns: [
					         {header: 'uuid', dataIndex: 'uuid', hidden:true},
//					         {header: 'Domain Name', dataIndex: 'domainName'},
					         {header: 'Device SN',sortable:false, dataIndex: 'productSnStr',ulan:'productSn',width:160},
					         {header: 'Device Model', dataIndex: 'productName'},
					         {header: 'Alias', dataIndex: 'alias',width:120},
							{header: 'Admin Status', dataIndex: 'adminStatus',hidden:true,
								renderer:function(val){  
									return rs.adminStatus(val);
								 }
							},
							{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',
								renderer:function(val){  
									return rs.oprStatus(val);
								} 
							},
							{header: 'Run Status', dataIndex: 'runStatus',
								renderer:function(val){  
									return rs.runStatus(val);
								} 
							},
					        {header: 'Version', dataIndex: 'packageVersion',ulan:'versionAbbr',},
					     	{header: 'Build Time',dataIndex: 'packageBuildTime',width:140,xtype: 'datecolumn',format:'m-d H:i:s',},

					     	{header: 'Port Total',dataIndex: 'portTotalCount',width:80},
							{header: 'Port Work',dataIndex: 'portWorkCount',width:80},
							{header: 'Last Register',dataIndex: 'lastRegTime',width:140,hidden:true,xtype: 'datecolumn',format:'m-d H:i:s',},
							{header: 'Out IP',dataIndex: 'outerIpAddr',width:120,hidden:false},
							{header: 'Inner IP',dataIndex: 'innerIpAddr',width:120,hidden:false},
					     	{header: 'RunTime',dataIndex: 'lifeSecond',width:150,
					     		renderer:function(val,metaData,record,rowIndex,store,view){
				     				return rs.tranSecondMin(val,record.get('runStatus'));
				     			}
					     	},
							{header: 'Create Time', dataIndex: 'createTime',hidden:true,xtype: 'datecolumn',format:'m-d H:i:s'},
					         {header: 'Upgrade Type', dataIndex: 'upgradeType',hidden:true},
					         {header: 'Upgrade Status', dataIndex: 'upgradeStatus',hidden:true},
					         {header: 'domainUuid', dataIndex: 'domainUuid',hidden:true},

					],
				listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
        			var ot=Ext.getCmp('operationTree');
        			if(maintenance){
        				ot = Ext.getCmp('maintenanceTree');
        			}
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
			var tbar = [];
			if(!maintenance){
				var add = Ext.create('Ext.button.Button',{
					text:'Add Device',
					ulan:'btAdd',
					iconCls:'add',
					flag:"domain_edit",
					listeners:{ 
						click: function() {
							var tid=nesGrid.treeName;
							var domainUuid=nesGrid.domainUuid;
							var gridStore = Ext.getCmp('nesInSiteTab').down('panel[itemId=grid]').store;
		        			var addNe=Ext.getCmp('addNeToSite');
		        			if(addNe=='undefined'||addNe==undefined){
		        				addNe=Ext.create('app.view.operation.domain.roamzone.site.AddNeToSite',{
		        					treeId:tid,
		        					id:'addNeToSite',
			        			});
		        				lanControll.setLan(addNe);
		        			}
		        			addNe.gridStore = gridStore;
		        			var comboxStore = addNe.comboxStore;
		        			comboxStore.removeAll();
		        			comboxStore.on('load',function(){
		        				var defaultGrpUuid = addNe.down('form').getForm().findField('defaultGrpUuid');
		    					var store0 = defaultGrpUuid.store;
		    					var policyUuid = addNe.down('form').getForm().findField('policyUuid');
		    					var store2 = policyUuid.store;
	
		    					store0.removeAll();
		    					store2.removeAll();
		    					for(var i=0; i<comboxStore.getCount(); i++){
		    						if(comboxStore.getAt(i).get('type')=='policy'){
		    							store2.add(comboxStore.getAt(i));
		    						}else if(comboxStore.getAt(i).get('type')=='group'){
		    							store0.add(comboxStore.getAt(i));
		    						}
		    					}
		    					if(store0.getCount()>0){
		    						defaultGrpUuid.setValue(store0.getAt(0).get('uuid'));
		    					}
		    					if(store2.getCount()>0){
		    						policyUuid.setValue(store2.getAt(0).get('uuid'));
		    					}
		    					addNe.down('form').getForm().findField('productId').setValue('31');
								addNe.down('form').getForm().findField('siteUuid').setValue(tid);
								addNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		    					addNe.show();
		        			},this,{single: true})
		        			comboxStore.load({params:{domainUuid:domainUuid,types:'policy,group'}});						
						}						
					}
				});
				tbar.push(add);
				tbar.push('-');
				
				var del = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Delete Device',
		       		ulan:'btDel',
		       		 iconCls:'remove',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){

		       			if ( nesGrid.getSelectionModel().hasSelection() ){
		       				
       							var records = nesGrid.getSelectionModel().getSelection();
       							var ids="";
//								var names="";
								var names=new Array();
								var domainUuid=0;
								var uuid = 0;
								var alias = "";
								var productId = 0;
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										domainUuid=records[i].get("domainUuid");
										ids=records[i].get('uuid');
//										names=records[i].get('alias');
										uuid = records[i].get('uuid');
										alias = records[i].get('alias');
										productId = records[i].get('productId');
									}else {
										ids=ids+"-"+records[i].get('uuid');
//										names=names+","+records[i].get('alias')
									}
									/* 去掉限制 || records[i].get('runStatus')!=9 */
									if(records[i].get('adminStatus')!=2){
										if(names.length==3){
											names.push("</br>... ...");
										}else if(names.length==0){
											names.push(records[i].get('alias'));
										}else if(names.length<3){
											names.push("</br>"+records[i].get('alias'));
										}
									}
									
//											policyInDomainStore.remove(records[i]);
								}
								
								if(names.length>0){
									Ext.MessageBox.alert(boxWarnning,names+boxIsUsing);
									return;
								}
								
								Ext.MessageBox.confirm(boxWarnning,boxDelNe,function(e) {																			
		       						if( e == 'yes' ){
       									Ext.Ajax.request({
					                		url:'neManager!deleteNe.action?ids='+ids+"&domainUuid="+domainUuid+"&uuid="+uuid+"&alias="+alias+"&productId="+productId,
					                		method:'POST',
					                		callback: function (options, success, response) {
						                    	var obj=Ext.JSON.decode(response.responseText);
														
						                    	if(obj['success']){
						                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
						                    		nesGrid.getStore().load();
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
						                    	}
					                    	}
					                	});
		       						}	
								})
								
		       			}
				}
		       	 	}
		       	 });
				tbar.push(del);
				tbar.push('-');
				
				var set = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text: 'Setting',
		       		ulan:'btSetting',
		       		 iconCls: 'option',
		       		 flag:"domain_edit",
		       		 listeners:{
		       			 click:function(){
		       		 		if ( nesGrid.getSelectionModel().hasSelection()){
	       				
								var records= nesGrid.getSelectionModel().getSelection();
								var ids="";
								var productId = null;
								var uuid = 0;
								var alias = "";
								var names=new Array();
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
										productId = records[i].get('productId');
										uuid = records[i].get('uuid');
										alias = records[i].get('alias');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('uuid');
									}
								}
								
								var updateNe = Ext.getCmp('updateNeStatus');
								if(updateNe==undefined || updateNe=='undefined'){
									updateNe=Ext.create('app.view.operation.domain.roamzone.site.UpdateNe',{});
									lanControll.setLan(updateNe);
								}
								updateNe.down('form').store = nesInSiteStore;
								updateNe.down('form').getForm().findField('ids').setValue(ids);
								updateNe.down('form').getForm().findField('productId').setValue(productId);
								updateNe.down('form').getForm().findField('alias').setValue(alias);
								updateNe.down('form').getForm().findField('uuid').setValue(uuid);
//								updateNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);

								updateNe.show();
	       		 			}else{
	       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	       		 				return;
	       		 			}
								
								
		       		 	}
		       		 }
		       	 });
				tbar.push(set);
				tbar.push('-');
			}else{
				var upgrade = Ext.create('Ext.button.Button',{
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
			        			var vendorId=records[0].get('vendorId');
			        			domainInfoStore.on('load',function(){
			        				var r=domainInfoStore.getAt(0);
//			        				vendorId=domainInfoStore.getAt(0).get('vendorId');
									upgradeNe.down('form').getForm().findField('ids').setValue(ids);
									upgradeNe.down('form').getForm().findField('productId').setValue(productId);
									upgradeNe.down('form').getForm().findField('maxVersion').setValue(maxVersion);
									upgradeNe.down('form').getForm().findField('upgradeType1').setValue(rs.upgradeType(upgradeTypes));
									upgradeNe.down('form').getForm().findField('upgradeTypes').setValue(""+upgradeTypes);
									upgradeNe.down('form').getForm().findField('alias').setValue(alias);
									var sysStore=Ext.create('app.store.operation.system.SysInfoStore',{});
									
									
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
		       	 });
				tbar.push(upgrade);
				tbar.push('-');
				
				var reboot = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text: 'Reboot',
		       		ulan:'btReboot',
		       		 iconCls: 'reboot',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
		            		Ext.MessageBox.confirm(boxWarnning,boxReboot,function(e) {																			
		   						if( e == 'yes' ){
		   							if ( nesGrid.getSelectionModel().hasSelection()){
										var records= nesGrid.getSelectionModel().getSelection();
										var ids="";
										var productId = 0;
										var alias = "";
										for ( var i = 0; i < records.length; i++) {										
											if(i==0){
												ids=records[i].get('uuid');
												productId = records[i].get('productId');
												alias = records[i].get('alias');
											}else {
												cnt=1;
												ids=ids+"-"+records[i].get('uuid');
											}
										}
					        			var handler = Ext.getCmp('handler');
					        			if(handler==undefined){
					        				handler = Ext.create('app.util.Handler',{});
					        			}
					        			handler.RebootHandler(ids,productId,alias);
				       		 		}else{
			       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
			       		 				return;
			       		 			}
		   						}
		            		});		       			 
	       		 		 }
		       		 }
	       	 	});
				tbar.push(reboot);
				tbar.push('-');
				
				var restore = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text: 'Restore Password',
		       		ulan:'btRestorePwd',
		       		 iconCls: 'restore_pwd',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
		            		Ext.MessageBox.confirm(boxWarnning,boxRestorePwd,function(e) {																			
		   						if( e == 'yes' ){
				       		 		if ( nesGrid.getSelectionModel().hasSelection()){
										var records= nesGrid.getSelectionModel().getSelection();
										var ids="";
										var productId = 0;
										var alias = "";
										for ( var i = 0; i < records.length; i++) {										
											if(i==0){
												ids=records[i].get('uuid');
												productId = records[i].get('productId');
												alias = records[i].get('alias');
											}else {
												cnt=1;
												ids=ids+"-"+records[i].get('uuid');
											}
										}
			   		        			var handler = Ext.getCmp('handler');
			   		        			if(handler==undefined){
			   		        				handler = Ext.create('app.util.Handler',{});
			   		        			}
			   		        			handler.RestorePwdHandler(ids,productId,alias);
				       		 		}else{
			       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
			       		 				return;
			       		 			}
		   						}
		            		});		        			       			 
	       		 		 }
		       		 }	       	 		       		 
		       	 });
				tbar.push(restore);
				tbar.push('-');
			}
			
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
//		       		 			var panel=this.up('panel').up('panel');
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
			tbar.push(remote);
			tbar.push('-');
			
			var sel = Ext.create('Ext.button.Button',{
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
	       		 		var store=this.up('panel').down('panel[itemId=grid]').store;		       		 		
	       		 		store.load();
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
				items : [{
					xtype:'hiddenfield',
					name:'siteUuid'
				},{
					xtype:'textfield',
					fieldLabel:'Name',
					name:'alias',
				}, {
					name : 'productId',
					xtype: 'combo',
					mode: 'local',
					ulan:'deviceType',
					editable:false,
					fieldLabel: 'Type',
					displayField: 'name',
					valueField: 'value',
					queryMode: 'local',
					store: Ext.create('Ext.data.Store', {
					fields : ['name', 'value'],
					data   : [
					{name : '-SELECT-',   value: '-1'},
					{name : 'DWG',   value: '23'},
					{name : 'SIMBANK',  value: '31'}
					]
					})
				},  {
					xtype : 'textfield',
					fieldLabel : 'Description',
					flex : 1,
					name:'detailDesc',
					margins : '0',
				}
				],
				
				buttons : [ 
					 {
						text : 'Cancel',
						ulan:'btCancel',
						handler : function() {
							this.up('form').up('panel').collapse();
						}
					}, {
						text : 'Search',
						ulan:'btSearch',
						flag:"domain_read",
						handler : function() {
						var siteUuid=this.up('form').up('panel').up('panel').treeName;
						
						var form=this.up('form').getForm();
						form.findField('siteUuid').setValue(siteUuid);
						var params = form.getValues();
						nesInSiteStore.on('beforeload', function (nesInSiteStore, options) {
	        		        Ext.apply(nesInSiteStore.proxy.extraParams, params);
	        		    },this,{single: true});
						
						var panel = this.up('form').up('panel').up('panel');
						var paging = panel.down("pagingtoolbar");
						paging.moveFirst();
					}
				}]
			});
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[nesGrid]
				       
				},{
//				 id:'neEastSearch',
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