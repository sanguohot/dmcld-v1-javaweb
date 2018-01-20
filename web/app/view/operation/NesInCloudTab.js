Ext.define('app.view.operation.NesInCloudTab',{
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
//		id:'nesInCloudTab',
		layout:'border',
//		autoScroll:true,
		treeId:'',
		store:null,
		initComponent: function() {
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var nesInSiteStore= Ext.create('app.store.operation.domain.roamzone.site.NesInSiteStore', {});
			nesInSiteStore.proxy.url = "nesInSiteManager!getNeInSystemList.action";
			nesInSiteStore.getProxy().setReader({
	            type: 'json',
	            root: 'neList2'
	        });
			this.store = nesInSiteStore;
//			nesInSiteStore.load();
			nesInSiteStore.on('beforeload',function(){
				nesInSiteStore.loadFlag = false;
			})
//			var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var nesGrid = Ext.create('Ext.grid.Panel', {
				border:false,
//				id:'nesInCloudGrid',
				itemId:'grid',
				columnLines:true,
				store: nesInSiteStore, 
//				plugins: [cellEditing],
//				autoScroll:true,
				selModel: sm,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
				         {header: 'uuid', dataIndex: 'uuid', hidden:true},
				         {header: 'Domain Name', dataIndex: 'domainName'},
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
				        {header: 'Version', dataIndex: 'packageVersion',ulan:'versionAbbr'},
				     	{header: 'Build Time',dataIndex: 'packageBuildTime',width:140,xtype: 'datecolumn',format:'m-d H:i:s'},

				     	{header: 'Port Total',dataIndex: 'portTotalCount',width:80},
						{header: 'Port Work',dataIndex: 'portWorkCount',width:80},
						{header: 'Last Register',dataIndex: 'lastRegTime',width:140,hidden:true,xtype: 'datecolumn',format:'m-d H:i:s'},
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
				         {header: 'domainUuid', dataIndex: 'domainUuid',hidden:true}

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

			this.tbar=[{
		       		 xtype:'button',
		       		 text:'Remote Web',
		       		ulan:'btRemoteWeb',
		       		 iconCls: 'domain-group',
		       		flag:"domain_action",
//		       		 menu:{
//			       		 xtype:'menu',			       		 
//			       		 items:[{
//			       			text:'New Tab',
//			       			ulan:'miNewTab',
//			       			handler:function(){
//			       		 		if ( nesGrid.getSelectionModel().getSelection().length==1){	       				
//			       		 			var records= nesGrid.getSelectionModel().getSelection();								
//			       		 			var sn=records[0].get('productSnStr');
//			       		 			var uuid=records[0].get('uuid');
//			       		 			var domainUuid=records[0].get('domainUuid');
//			       		 			var panel = this.up('panel').up('panel');
//			       		 			var id = panel.id+'_remote';
//			       		 			Ext.Ajax.request({
//			       		 				url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid,
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
//				                            
//					            	  	
//					               }else{
//					            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
//					               }
//					               }
//					          })
//									
//		       		 			}else{
//		       		 				Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
//		       		 				return;
//		       		 			}
//			       		 	}
//			       		 },{
//			       			text:'New Window',
//			       			ulan:'miNewWindow',
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
//					            	      window.open(url);
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
//			       		 }]
//		       	 	 }
		       	 },'-', {
		       		 xtype:'button',
		       		 text: 'SelectAll',
		       		ulan:'btSelectAll',
		       		 iconCls: 'selectAll',
		       		 flag:"super_read",
		       		 listeners:{
		       			 click:function(){
		       		 		if(nesGrid.getSelectionModel().hasSelection()){
		       		 		nesGrid.getSelectionModel().deselectAll();  
		       		 		}else{
		       		 		nesGrid.getSelectionModel().selectAll();
		       		 		}
		       		 	}
		       		 }
		       	 },'-',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
							this.up('panel').down('panel[itemId=grid]').getStore().load();
		       	 		}
		       	 	}
		       	 },'->',{
		       		 xtype:'button',
		       		 text:'Search',
		       		 iconCls:'search',
		       		ulan:'btSearch',
		       		 flag:"super_read",
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
		    }];
			
			
			

			var search_grid=Ext.create('Ext.form.Panel',{
				border : false,
				bodyPadding : 5,
				defaults : {
				margins : '0 0 10 0'
				},
				items : [{
					xtype:'textfield',
					fieldLabel:'Domain Name',
					name:'domainName',
				},{
					xtype:'textfield',
					fieldLabel:'Device SN',
					name:'productSn',
				},{
					xtype:'textfield',
					fieldLabel:'Alias',
					name:'alias',
				},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null),{
					xtype:'textfield',
					fieldLabel:'Type',
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
						flag:"super_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(0);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"super_read",
				handler : function() {
					var store = this.up('form').up('panel').up('panel').store;
					var form=this.up('form').getForm();
					var params = form.getValues();
					store.on('beforeload', function (store, options) {
				        Ext.apply(store.proxy.extraParams, params);
				    },this,{single: true});
					this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
				}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
//				 xtype:'tabpanel',
//				 split: false,
				 layout:'fit',
				 items:[nesGrid]
				       
				},{
//				 id:'neCloudEastSearch',
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
