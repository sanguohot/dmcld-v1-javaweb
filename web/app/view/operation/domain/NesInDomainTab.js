Ext.define('app.view.operation.domain.NesInDomainTab',{
		extend:'Ext.panel.Panel',
		 requires: [
	               'Ext.util.Format',
	               'Ext.grid.Panel',
	               'Ext.toolbar.Paging',
		       	   'app.store.operation.domain.roamzone.site.NesInSiteStore',
	               'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
	               'app.store.provision.VendorListStore',
	               'app.store.provision.VendorModel'
		           ],
		title:'',
//		id:'nesInDomainTab',
		layout:'border',
//		autoScroll:true,
		treeId:'',
		
		initComponent: function() {
			var nesInSiteStore= Ext.create('app.store.operation.domain.roamzone.site.NesInSiteStore', {}); 
//			nesInSiteStore.load();
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			nesInSiteStore.on('beforeload',function(){
				nesInSiteStore.loadFlag = false;
			})
			this.store = nesInSiteStore;
//			var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var nesGrid = Ext.create('Ext.grid.Panel', {
				border:false,
//				id:'nesInDomainGrid',
				itemId:'grid',
				autoScroll:true,
				columnLines:true,
				store: nesInSiteStore, 
//				plugins: [cellEditing],
				selModel: sm,
				viewConfig: {
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
							var domainUuid = this.up('panel').treeId;
			    			var addNe=Ext.getCmp('addNeToDomain');
			    			var gridStore = this.up('panel').down('panel[itemId=grid]').store;
			        		if(addNe=='undefined'||addNe==undefined){
			        			addNe=Ext.create('app.view.operation.domain.roamzone.site.AddNeToSite',{
		        					id:'addNeToDomain',
			        			});
			        			lanControll.setLan(addNe);
			    			}
			        		addNe.gridStore = gridStore;
			        		var ne_form = addNe.down('form').down('form');
			        		var siteUuid = ne_form.getForm().findField('siteUuid');
			        		ne_form.remove(siteUuid,true);
			        		siteUuid = new Ext.form.field.ComboBox({
			    	            name: 'siteUuid',
			    	            fieldLabel: lanControll.getLanValue('siteUuid'),
			    	            displayField : 'name',
			    	            editable:false,
			    				valueField : 'uuid',
			    				mode : 'local',
			    				queryMode : 'local',
			    				allowBlank:false,
			    				store:Ext.create("app.store.util.ComboxStore",{}),
			    				valueNotFoundText :""
			        		});
			        		ne_form.insert(4,siteUuid);
			    			var comboxStore = addNe.comboxStore;
			    			comboxStore.removeAll();
			    			comboxStore.on('load',function(){
			    				var defaultGrpUuid = addNe.down('form').getForm().findField('defaultGrpUuid');
								var store0 = defaultGrpUuid.store;
								var policyUuid = addNe.down('form').getForm().findField('policyUuid');
								var store2 = policyUuid.store;
								var store3 = siteUuid.store;
			
								store0.removeAll();
								store2.removeAll();
								store3.removeAll();
								for(var i=0; i<comboxStore.getCount(); i++){
									if(comboxStore.getAt(i).get('type')=='policy'){
										store2.add(comboxStore.getAt(i));
									}else if(comboxStore.getAt(i).get('type')=='group'){
										store0.add(comboxStore.getAt(i));
									}else if(comboxStore.getAt(i).get('type')=='site'){
										store3.add(comboxStore.getAt(i));
									}
								}
								defaultGrpUuid.setValue(store0.getAt(0).get('uuid'));
								policyUuid.setValue(store2.getAt(0).get('uuid'));
								siteUuid.setValue(store3.getAt(0).get('uuid'));
								addNe.down('form').getForm().findField('productId').setValue('31');
								addNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);
								addNe.show();
			    			},this,{single: true})
			    			comboxStore.load({params:{domainUuid:domainUuid,types:'policy,group,site'}});	   						
						}						
					}
				});
				tbar.push(add);
				tbar.push('-');
				
				var del = Ext.create('Ext.button.Button',{
		       		 text:'Delete Device',
		       		ulan:'btDel',
		       		 iconCls:'remove',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){

		       			if ( nesGrid.getSelectionModel().hasSelection() ){
		       				
	   							var records = nesGrid.getSelectionModel().getSelection();
	   							var ids="";
	   							var names=new Array();
								var domainUuid=0;
								var uuid = 0;
								var alias = "";
								var productId = null;
								var failture = 0;
								var success = 0;
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
									
								}
								if(names.length>0){
									Ext.MessageBox.alert(boxWarnning,names+boxIsUsing);
									return;
								}
								Ext.MessageBox.confirm(boxWarnning,boxDelNe,function(e) {
									if (e == 'yes') {
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
		       		 text: 'Setting',
		       		 iconCls: 'option',
		       		ulan:'btSetting',
		       		 flag:"domain_edit",
		       		 listeners:{
		       			 click:function(){
		       		 		if ( nesGrid.getSelectionModel().hasSelection()){
	       				
								var records= nesGrid.getSelectionModel().getSelection();
								var ids="";
								var names=new Array();
								var productId = null;
								var uuid = 0;
								var alias = "";
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
		       		 text: 'Upgrade',
		       		 iconCls: 'provision-small',
		       		ulan:'btUpgrade',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
		       		 		if ( nesGrid.getSelectionModel().hasSelection()){
	       				
								var records= nesGrid.getSelectionModel().getSelection();
								var ids="";
								var upgradeTypes="";
								var maxVersion=records[0].get('packageVersion');
//								alert("maxVersion1="+maxVersion);
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
//									alert("maxVersion2="+maxVersion);
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
//								var domainUuid=Ext.getCmp('nesInDomainTab').treeId;
								
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
//								var vendorId=Ext.getCmp('maintenanceDomainPanel').down('hiddenfield[name=vendorId]').getValue();
//								var sysUuid=parseInt(Ext.getCmp('maintenanceDomainPanel').store.getAt(0).get('sysUuid'));
//								
//								upgradeNe.down('form').getForm().findField('upgradeType1').setValue(rs.upgradeType(upgradeTypes));
//								upgradeNe.down('form').getForm().findField('upgradeTypes').setValue(""+upgradeTypes);
//								upgradeNe.down('form').getForm().findField('ids').setValue(ids);
//								upgradeNe.down('form').getForm().findField('productId').setValue(productId);
//								upgradeNe.down('form').getForm().findField('maxVersion').setValue(maxVersion);
//								upgradeNe.down('form').getForm().findField('alias').setValue(alias);
//								
//								
//								var sysStore=Ext.create('app.store.operation.system.SysInfoStore',{});
//							
//								sysStore.on('load',function(){
//									 var sr=sysStore.getAt(0);
//			        				 var provXmlUrl=sr.get('provXmlUrl');
//			        				
//			        				 upgradeNe.down('form').getForm().findField('provUrl').setValue(provXmlUrl);
//								});
//								sysStore.load({params:{uuid:sysUuid}});
//								
//								
//								var vendorStore=Ext.create('app.store.provision.VendorListStore',{});
//								vendorStore.on('beforeload', function (vendorStore, options) {
//			        				var params = { defaultVendorId:vendorId};
//			        		        Ext.apply(vendorStore.proxy.extraParams, params);
//			        		        upgradeNe.down('form').getForm().findField('vendorId').store=vendorStore;
//			        		    });
//								userType = Ext.get('g_usertype').value;
//								vendorStore.on('load',function(vendorStore, options){
//									if(userType != 0 && vendorId>0){
//										vendorStore.filter('vendorId',vendorId);
//										if(vendorStore.getCount() == 0){
//											Ext.MessageBox.alert(boxError,boxIllegalData);
//										}
//									}
//									upgradeNe.down('form').getForm().findField('vendorId').setValue(parseInt(vendorId));
//									upgradeNe.show();
//			        			});
//								
//								vendorStore.load();
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
		       		 text: 'Reboot',
		       		 iconCls: 'reboot',
		       		ulan:'btReboot',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
		            		Ext.MessageBox.confirm(boxWarnning,boxReboot,function(e) {																			
		   						if( e == 'yes' ){
		   							if ( nesGrid.getSelectionModel().hasSelection()){
										var records= nesGrid.getSelectionModel().getSelection();
										var ids="";
										var alias = "";
										var productId = 0;
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
		       		 text: 'Restore Password',
		       		 iconCls: 'restore_pwd',
		       		ulan:'btRestorePwd',
		       		 flag:"device_action",
		       		 listeners:{
		       			 click:function(){
		            		Ext.MessageBox.confirm(boxWarnning,boxRestorePwd,function(e) {																			
		   						if( e == 'yes' ){
				       		 		if ( nesGrid.getSelectionModel().hasSelection()){								var records= nesGrid.getSelectionModel().getSelection();
										var ids="";
										var alias = "";
										var productId = 0;
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
	       		 text:'Remote Web',
	       		 iconCls: 'domain-group',
	       		ulan:'btRemoteWeb',
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
//		       		 			var domainUuid=records[0].get('domainUuid');
//		       		 			var panel = this.up('panel').up('panel');
//		       		 			var id = panel.id+'_remote';
//		       		 			if(maintenance){
//		       		 				id = 'maintenance_'+id;
//		       		 			}
//		       		 			Ext.Ajax.request({
//		       		 				url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid,
//			                		method:'POST',
//			                		callback: function (options, success, response) {
//				             var obj=Ext.JSON.decode(response.responseText);			
//				               if(obj['success']){
//				            	    var url=obj['url'];				            	   
//				            	  	var remoteTab=panel.up('panel');
//				            	  	var tab = Ext.getCmp(id);
//				            	  	if(tab!=undefined){
//				            	  		tab.destroy();
//				            	  	}
//            	  	  tab=remoteTab.add({
//            	  	      	title:sn,
//                    	            	  	id:id,
//                    					    closable: true,
//                    					    autoScroll: true,
//                    					    layout:'fit',
//                    					    items :[{
//                    					        itemId:'remote_web',
//                    					        layout:'fit',
//                    							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
//                    						}]
//                    					});
//				            	  	tab.show();
//			                            
//				            	  	
//				               }else{
//				            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
//				               }
//				               }
//				                        })
//								
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
		       		 			var domainUuid=records[0].get('domainUuid');
		       		 			
		       		 			Ext.Ajax.request({
		       		 				url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid,
			                		method:'POST',
			                		callback: function (options, success, response) {
				             var obj=Ext.JSON.decode(response.responseText);			
				               if(obj['success']){
				            	    var url=obj['url'];
//				            	        window.open(url);
				            	    openChildWin(url);
				               }else{
				            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
				               }
				               }
				                        })
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
	       		 text: 'SelectAll',
	       		 iconCls: 'selectAll',
	       		ulan:'btSelectAll',
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
	       		 text:'Refresh',
	       		ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
	       		 		this.up('panel').down('panel[itemId=grid]').getStore().load();
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
				}
//				,{
//					name : 'productId',
//					xtype: 'combo',
//					mode: 'local',
//					editable:false,
//					fieldLabel: 'Type',
//					displayField: 'name',
//					valueField: 'value',
//					queryMode: 'local',
//					store: Ext.create('Ext.data.Store', {
//					fields : ['name', 'value'],
//					data   : [
//					    {name : '-SELECT-',   value: '-1'},
//						{name : 'DWG',   value: '23'},
//						{name : 'SIMBANK',  value: '31'}
//					]
//					}),
//					
//				}
				,rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null),{
					xtype:'textfield',
					fieldLabel:'Device Model',
					name:'productName',
				},{
					xtype:'textfield',
					fieldLabel:'Version',
					name:'version',
				}
				],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(0);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
				handler : function() {
					
					var domainUuid=this.up('form').up('panel').up('panel').treeId;
					
					var form=this.up('form').getForm();
					form.findField('domainUuid').setValue(domainUuid);
					var params = form.getValues();
					nesInSiteStore.removeAll();
					nesInSiteStore.on('beforeload', function (nesInSiteStore, options) {
        				Ext.apply(nesInSiteStore.proxy.extraParams, params);
        			},this,{single:true});
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
