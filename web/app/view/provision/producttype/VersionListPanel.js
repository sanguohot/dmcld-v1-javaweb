Ext.define('app.view.provision.producttype.VersionListPanel',{
	extend:'Ext.panel.Panel',
//	id:'versionListPanel',
	requires: [
		        'app.store.provision.producttype.VersionListStore',
		        'app.view.provision.producttype.version.AddVersion'
		       ],
	layout:'border',
	hidden:false,
	border:false,
	initComponent: function(){
		var versionListStore= Ext.create('app.store.provision.producttype.VersionListStore',{}); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var versionListTab=Ext.create('Ext.grid.Panel',{
			title:'',
			productId:'',
			itemId:'grid',
//			id:'versionListTab',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			selModel: sm,
			store: versionListStore,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true,width:80},
					{header: 'Version',dataIndex: 'packageVer',ulan:'versionAbbr',width:150},
					{header: 'Rely Version',dataIndex: 'relyVer',width:150},
					{header: 'productId',dataIndex: 'productId',ulan:'deviceTypeAbbr',width:120,hidden:true},
					{header: 'Package Name',dataIndex: 'packageName',width:180,hidden:true},
					{header: 'Status',dataIndex: 'status',width:120,
						renderer:function(val){  
							return rs.versionStatus(val);
						} 
					},
					{header: 'Build Time',dataIndex: 'createTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:150},
					{header: 'Description',dataIndex: 'detailDesc',flex:1},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
    			var ot=Ext.getCmp('provisionTree');
    			var uuid=row.get('uuid');
    			var rootNode=ot.getRootNode();
    			var node=rootNode.findChild('nid','version_'+uuid,true);
    			ot.fireEvent('itemclick',null,node);
			}						
		},
			dockedItems: [{
				 itemId:'pagingtoolbar',
				 xtype: 'pagingtoolbar',
				 pageSize: 32,
			     dock: 'bottom',
			     store: versionListStore,
			     displayInfo: true,
			}
		],	
			
		});
		
		
		
		var tbar = [];
		
		if(Ext.get('sysMode').value==11 || Ext.get('sysMode').value==10){
			var add = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Add Version',
				iconCls : 'add',
				ulan:'btAdd',
				flag:"super_edit",
				listeners : {
					click : function() {
						
						var addVersion = Ext.getCmp('addVersion');
						if(addVersion=='undefined'||addVersion==undefined){
							addVersion=Ext.create('app.view.provision.producttype.version.AddVersion');
							lanControll.setLan(addVersion);
						}
						 
						var provUrl=Ext.get('provUrl').value;
//						var sysStore=Ext.create('app.store.operation.system.SysInfoStore',{});
//						
//						sysStore.on('load',function(){
//							 var sr=sysStore.getAt(0);
//	        				 var provXmlUrl=sr.get('provXmlUrl');
//	        				
//	        				 addVersion.down('form').getForm().findField('provUrl').setValue(provXmlUrl);
//						});
//						sysStore.load({params:{uuid:sysUuid}});
						addVersion.down('form').getForm().findField('provUrl').setValue(provUrl);
						
//						addVersion.down('form').getForm().findField('domainUuid').setValue(domainUuid);
						addVersion.show();
					}
				}
			});
			tbar.push(add);
			tbar.push('-');
			var del = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Delete Version',
				iconCls : 'remove',
				ulan:'btDel',
				flag:"super_edit",
				listeners : {
					click : function() {
						if (versionListTab.getSelectionModel().hasSelection()) {
							
								var records = versionListTab.getSelectionModel().getSelection();
								var ids="";
								var cnt=0;
								var productId=versionListTab.productId;
								var versions="";
								var firstFlag=true;
								var names=new Array();
								for ( var i = 0; i < records.length; i++) {
									
									for(var j=0;j<versionListTab.getStore().getCount();j++){
										var rec=versionListTab.getStore().getAt(j);
										if(rec.get('relyVer')==records[i].get('packageVer')){
											if(names.length==3){
												names.push("</br>... ...");
											}else if(names.length==0){
												names.push(records[i].get('packageVer'));
											}else if(names.length<3){
												names.push("</br>"+records[i].get('packageVer'));
											}
											break;
										}
									}
									if(firstFlag){
										versions=records[i].get('uuid')+"-"+records[i].get('packageName')+"-"+records[i].get('productId');
										firstFlag=false;
									}else{
										versions=versions+","+records[i].get('uuid')+"-"+records[i].get('packageName')+"-"+records[i].get('productId');
									}
									
								}
								if(names.length>0){
									boxIsBasicVersion = lanControll.getLanValue('boxIsBasicVersion');
									Ext.MessageBox.alert(boxWarnning,names+boxIsBasicVersion);
									return;
								}
								boxDelVersion = lanControll.getLanValue('boxDelVersion');
								Ext.MessageBox.confirm(boxWarnning,boxDelVersion,function(e) {
									if (e == 'yes') {
										Ext.Ajax.request({
					                		url:'versionManager!deleteVersion.action?productId='+productId+'&versions='+versions,
					                		method:'POST',
					                		callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
						                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
						                    		versionListTab.getStore().load();
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
			
		}
		var exportS = Ext.create('Ext.button.Button',{
     		 xtype:'button',
     		 text:'Export',
     		 iconCls:'export',
     		 ulan:'btExport',
     		 listeners:{
     		 	click:function(){
	      			if (versionListTab.getSelectionModel().hasSelection()){
	      					var records= versionListTab.getSelectionModel().getSelection();
	      					if(records.length!=1){
	      						Ext.MessageBox.alert(boxFailture,'Export only one version at a time');
	      						return;
	      					}
							var uuids="";
							var cnt=0;
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									uuids=records[i].get('uuid');
								}else {
									cnt=1;
									uuids=uuids+"-"+records[i].get('uuid');
								}
							}
							Ext.MessageBox.confirm(boxWarnning,'Are you sure Export current version?',function(e) { 																				
	      						if( e == 'yes' ){
	      							var form=versionListTab.up('panel').up('panel').down('form').getForm();
	      							var param=form.getValues();
	      							Ext.Ajax.request({
				                		url:'exportVersion.action?uuids='+uuids,
				                		method:'POST',
				                		timeout:60*60*1000,
				                		params:param,
				                		callback: function (options, success, response) {
	      									var obj=Ext.JSON.decode(response.responseText);
					                    	if(obj["success"]){
					                    		if(obj["fileName"]=="404"){
					                    			Ext.MessageBox.alert(boxFailture,"Oops,Not found!");
					                    		}else{
					                    			window.location.href=obj["fileName"];
					                    		}
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
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
     	 
     	 });
		tbar.push(exportS);
		tbar.push('-');
		var update = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text:'Sync Versoin',
      		ulan:'btSyncVersion',
      		 iconCls:'synchro',
      		flag:"super_action",
      		 listeners:{
      		 	click:function(){
			boxSyncVersion = lanControll.getLanValue('boxSyncVersion');
					Ext.MessageBox.confirm(boxInfo,boxSyncVersion,function(e) {
               		if( e == 'yes' ){
               			var boxObj = {
               		    		title:boxInfo,
               		    		width : 300,
               		    		msg:boxWaitMsg,
               		    		modal:true,
               		    		closable:false,
               		    		wait:true
               		    };
               			var msg = Ext.MessageBox.show(boxObj);
               			
               			Ext.Ajax.request({
		                		url:'versionList!synchroVersion.action',
		                		method:'POST',
		                		callback: function (options, success, response) {
               					boxObj.wait = false;
               					msg.hide();
									var obj=Ext.JSON.decode(response.responseText);
			                    	if(obj["success"]){
			                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
			                    		versionListTab.getStore().load();
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
			                    	}
		                    	}
		                	})
               		}});
      	 		}
      	 	}
		});
		tbar.push(update);
		tbar.push('-');
		
		
		
		var refresh = Ext.create('Ext.button.Button',{
      		 xtype:'button',
       		 text:'Refresh',
       		ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 listeners:{
       		 	click:function(){
					versionListTab.getStore().load();
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
       		 listeners:{
       		 	click:function(){
       		 		var eastSearch=this.up('panel').up('panel').up('panel').down('panel[itemId=search]');
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
				xtype:'textfield',
				fieldLabel:'Version',
				name:'packageVer',
				ulan:'version',
			},{
				xtype:'textfield',
				fieldLabel:'Rely Version',
				name:'relyVer',
			},{

	            xtype: 'combo',
	            name: 'status',
	            fieldLabel: 'Status',
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
						name : lanControll.getLanValue('versionStatus_'+0),
						statusId : 0
					}, {
						name : lanControll.getLanValue('versionStatus_'+1),
						statusId : 1,
					} ]
				}),
				value:-1
				
	        
			},{
	            xtype: 'combo',
	            name: 'productId',
	            fieldLabel: 'Product Type',
	            ulan:'deviceType',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : 0
					},{
						name : 'MTG200(1)',
						statusId : 1
					}, {
						name : 'MTG600(2)',
						statusId : 2
					}, {
						name : 'MTG1000(3)',
						statusId : 3,
					}, {
						name : 'MTG1000B(4)',
						statusId : 4,
					}, {
						name : 'AG(11 vxworks v3)',
						statusId : 11,
					}, {
						name : 'AG(12 vxworks v7)',
						statusId : 12,
					}, {
						name : 'AG(15 linux arm)',
						statusId : 15,
					}, {
						name : 'AG(16 uclinux arm)',
						statusId : 16,
					}, {
						name : 'WG(20 vxworks v7)',
						statusId : 20,
					}, {
						name : 'WG(21 vxworks v3)',
						statusId : 21,
					}, {
						name : 'WG(22 linux arm)',
						statusId : 22,
					}, {
						name : 'WG(23 uclinux arm)',
						statusId : 23,
					}, {
						name : 'SIMBOX(30)',
						statusId : 30,
					}, {
						name : 'SIMBANK(31)',
						statusId : 31,
					}, {
						name : 'SIMSERVER(32)',
						statusId : 32,
					} ]
				}),
				value:0
				
	        },{
				xtype:'textfield',
				fieldLabel:'Description',
				name:'detailDesc',
			}],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:'super_read',
					handler : function() {
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('status').setValue(-1);
						this.up('form').getForm().findField('productId').setValue(0);
					}
			},{
				text : 'Search',
				ulan:'btSearch',
				flag:'super_read',
				handler : function() {
				var form=this.up('form').getForm();
				
					var versionListStore=versionListTab.getStore();
					var params = form.getValues();
					versionListStore.on('beforeload', function (versionListStore, options) {
	    		        var params = form.getValues();
	    		        Ext.apply(versionListStore.proxy.extraParams, params);
	    		    },this,{single: true});
	    			
	    			var paging = versionListTab.getComponent('pagingtoolbar');
	    			paging.moveFirst();
			}
			}]
		});
		
		this.items=[{
				 region: 'center',
				 layout:'fit',
				 items:[versionListTab]
				},{
				 itemId:'search',
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