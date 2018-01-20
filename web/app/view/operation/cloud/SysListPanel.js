Ext.define('app.view.operation.cloud.SysListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	border:false,
	title:'',
	forceRefresh:0,
	cloudUuid:-1,
	sysMode:0,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var sysMode=this.sysMode;
		
		var sysListStore= Ext.create('app.store.operation.system.SysListStore');		
		sysListStore.proxy.url="sysListManager!getTblSysWithDeviceNumInCloud.action";
		sysListStore.getProxy().setReader({
	        type: 'json',
	        root: 'sysList2'
	    });
		var store = sysListStore;
		store.on('beforeload',function(){
			
			store.loadFlag = false;
		})
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var cloudUlan='cloudName';
		var cloudUlanAbbr='cloudNameAbbr';
		if(sysMode==1){
			cloudUlan="domainName";
			cloudUlanAbbr="domainNameAbbr";
		}
	
		var fSystemTab=Ext.create('Ext.grid.Panel',{
			itemId:'grid',
			treeName:'',
			parentNodeTid:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			store: sysListStore, 
			selModel: sm,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',sortable:false,hidden:true},
					{header: 'Name',dataIndex: 'name'},
					{header: 'Alias',dataIndex: 'alias',hidden:true},
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
					{header: 'Run Status', dataIndex: 'runStatus',width:120,
						renderer:function(val){  
							return rs.runStatus(val);
						} 
					},
					{header: 'Cur Cloud',dataIndex: 'cloudName',ulan:cloudUlanAbbr},
					{header: 'IP Address',dataIndex: 'sysIpAddr',hidden:false},
					{header: 'Load Value',dataIndex: 'loadVal',width:120},
					{header: 'deviceCnt', dataIndex: 'totalNeCount'},
					{header: 'onlineDevcieCnt', dataIndex: 'onlineNeCount',hidden:false},
					{header: 'SIM Card', dataIndex: 'totalSimCard'},
					{header: 'onlineSIMCard', dataIndex: 'onlineSimCard',hidden:false},
					{header: 'Version',dataIndex: 'softwareVersion',ulan:'versionAbbr',width:120,},
					{header: 'Build Time',dataIndex: 'softwareBuildTime',width:150,xtype: 'datecolumn',format:'m-d H:i:s',},
					{header: 'RunTime',dataIndex: 'lifeSecond',width:150,
						renderer:function(val,metaData,record,rowIndex,store,view){
		     				return rs.tranSecondMin(val,record.get('runStatus'));
		     			}
			     	},
					{header: 'Last Register',dataIndex: 'lastRegTime',hidden:true,xtype: 'datecolumn',format:'m-d H:i:s',},
					{header: 'Last Heartbeat',dataIndex: 'lastHbTime',hidden:true,xtype: 'datecolumn',format:'m-d H:i:s',},
					{header: 'smtpServer',dataIndex: 'smtpServer',hidden:true},
					{header: 'smtpPort',dataIndex: 'smtpPort',hidden:true},
					{header: 'startTls',dataIndex: 'startTls',hidden:true,
						renderer:function(val){  
							return rs.yesOrNo(val);
						}
					},
					{header: 'smtpUserName',dataIndex: 'smtpUserName',hidden:true},
//					{header: 'smtpPassWord',dataIndex: 'smtpPassWord',hidden:true},
					{header: 'mailFrom',dataIndex: 'mailFrom',hidden:true},
					{header: 'manageDomainName',dataIndex: 'manageDomainName',ulan:'manDomainNameAbbr',hidden:true},
					{header: 'canRegisterFlag',dataIndex: 'canRegisterFlag',hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						}
					},
					{header: 'Description',dataIndex: 'detailDesc',minWidth:120},
					{header: 'manageDomain',dataIndex: 'manageDomain',hidden:true},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
	    			var ot=Ext.getCmp('operationTree');
	    			if(maintenance){
	    				ot = Ext.getCmp('maintenanceTree');
	    			}
	    			var uuid=row.get('uuid');
	    			var rootNode=ot.getRootNode();
	    			var node=rootNode.findChild('nid','system_'+uuid,true);
	    			
	    			ot.fireEvent('itemclick',null,node);
				}						
			},
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: sysListStore,
			     pageSize: 25,
			     displayInfo: true,
			}],
		});

		var tbar = [];
		if(!maintenance){
			var add = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Add Server',
				iconCls : 'add',
				flag:"super_edit",
				ulan:'btAdd',
				listeners : {
					click : function() {
						var add = Ext.getCmp('addSystem');
						
						if(add=='undefined'||add==undefined){
							add=Ext.create('app.view.operation.system.AddSystem',{});
							lanControll.setLan(add);
						}
						
						var cloudUuid=fSystemTab.up('panel').up('panel').up('panel').up('panel').cloudUuid;
						if(!cloudUuid){
							fSystemTab.up('panel').up('panel').cloudUuid;
						}
						var cloudField=add.down('form').getForm().findField('cloudUuid');
						console.log(cloudUuid);
						var cmpId=fSystemTab.up('panel').up('panel').id;
						add.down('form').getForm().findField('cmpId').setValue(cmpId);
						
						if(sysMode==1){
							cloudField.setValue(cloudUuid);
							cloudField.setVisible(false);
							Ext.Ajax.request({
		                		url:'sysManager!findMaxSysUuid.action',
		                		method:'POST',
		                		callback: function (options, success, response) {
									var obj=Ext.JSON.decode(response.responseText);
//									add.down('form').getForm().findField('uuid').setReadOnly(true);
//									add.down('form').getForm().findField('uuid').setFieldStyle("background:#DFE9F6");
									add.down('form').getForm().findField('uuid').setValue(obj['uuid']);
									add.down('form').getForm().findField('uuid').setVisible(false);
									/*本地server名称默认使用server+uuid*/
									add.down('form').getForm().findField('name').setReadOnly(true);
									add.down('form').getForm().findField('name').setFieldStyle("background:#DFE9F6");
									add.down('form').getForm().findField('name').setValue('server'+obj['uuid']);
									add.show();
								}
							});
						}else{
							cloudField.setVisible(true);
							add.down('form').getForm().findField('uuid').setVisible(true);
							add.down('form').getForm().findField('name').setReadOnly(false);
							add.down('form').getForm().findField('name').setFieldStyle("background:#FFF");
							var comboxStore = Ext.create("app.store.util.ComboxStore",{});
							var cloudStore=cloudField.getStore();
							cloudStore.removeAll();
							
							comboxStore.on('load',function(){
		        				
		        				cloudStore.add({uuid:-1,name:'-SELECT-'});
		        				for(var i=0; i<comboxStore.getCount(); i++){
		    						if(comboxStore.getAt(i).get('type')=='cloud'){
		    							cloudStore.add(comboxStore.getAt(i));
		    						}
		    					}
		        				add.down('form').getForm().findField('cloudUuid').setValue(cloudUuid);
		        				add.show();
		        			},this,{single: true});
		        			comboxStore.load({params:{cloudUuid:cloudUuid,types:'cloud'}});
						}
						
						
					}
				}
			});
			console.log(this.id);
			if(this.id.indexOf('FCloudPanel')>-1){
				
			}else{
				tbar.push(add);
				tbar.push('-');
			}
			var update = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Setting',
				iconCls : 'option',
				flag:"super_edit",
				ulan:'btSetting',
				listeners : {
					click : function() {
		   		 		if(fSystemTab.getSelectionModel().hasSelection()){
		   		 			var records=fSystemTab.getSelectionModel().getSelection();
		   		 			
							var ids="";
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
								}else {
									ids=ids+","+records[i].get('uuid');
								}
							}
			       			var updateSystem = Ext.getCmp('updateSystem');
			       			if(updateSystem==undefined|| updateSystem=='undefined'){
			       				updateSystem=Ext.create('app.view.operation.cloud.UpdateSystem',{});
			       				lanControll.setLan(updateSystem);
			       			}
			       			
			       			var comboxStore = Ext.create("app.store.util.ComboxStore",{});
			       			var manDomainUuid = updateSystem.down('form').getForm().findField('manageDomain');
			       			manDomainUuid.setValue(-1);
			       			var manDomainStore = manDomainUuid.store;
			       			comboxStore.on('load',function(){
			       				manDomainStore.removeAll();
			       				manDomainStore.add({uuid:-1,name:'-SELECT-'});
			       				for(var i=0; i<comboxStore.getCount(); i++){
			       					if(comboxStore.getAt(i).get('type')=='domain'){
			       						manDomainStore.add(comboxStore.getAt(i));
			       					}
			       				}
			       				if(records.length==1){
				       				updateSystem.down('form').getForm().loadRecord(records[0]);
				       			}
				       			updateSystem.cmpId=fSystemTab.up('panel').up('panel').id;
				       			updateSystem.down('form').getForm().findField('uuids').setValue(ids);
			       				updateSystem.show();
			       			});
			       			comboxStore.load({params:{cloudUuid:records[0].get('cloudUuid'),types:'domain'}})
			 			}else{
			 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
			 				return;
			 			}
			 		}
			}
			});
			tbar.push(update);
			tbar.push('-');
		}
		
		var refresh = Ext.create('Ext.button.Button',{
      		 xtype:'button',
       		 text:'Refresh',
       		 ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 flag:"super_read",
       		 listeners:{
       		 	click:function(){
        			fSystemTab.getStore().load();
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
	  	 });
		tbar.push(search);	
		this.tbar = tbar;
		
		
	
	var cloudStore = Ext.create('app.store.util.ComboxStore',{});
	var cloudStore2 = Ext.create('app.store.util.ComboxStore',{});
	cloudStore.on('beforeload', function () {
        var params = { cloudUuid:1};
        Ext.apply(cloudStore.proxy.extraParams, params);
    });
	cloudStore.on('load',function(){
		cloudStore2.removeAll();
		for(var i=0; i<cloudStore.getCount(); i++){
			cloudStore2.add(cloudStore.getAt(i));
		}
	});

	
	var search_grid=Ext.create('Ext.form.Panel',{
		border : false,
		bodyPadding : 5,
		defaults : {
		margins : '0 0 10 0'
		},
		items : [{
			xtype:'numberfield',
			fieldLabel:'uuid',
			name:'uuid',
			value:0,
			minValue:0
		},{
			xtype:'textfield',
			fieldLabel:'Cloud Name',
			name:'cloudName',
			ulan:cloudUlan,
		},{
			xtype:'textfield',
			fieldLabel:'Name',
			name:'name',
		},rs.createAdminStatus(3,null,null),rs.createRunStatus(20,null),{
			xtype:'textfield',
			fieldLabel:'IP',
			name:'sysIpAddr',
		},{
			xtype:'textfield',
			fieldLabel:'Version',
			name:'version',
		},{
			xtype:'textfield',
			fieldLabel:'Detail Desc',
			name:'detailDesc',
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
			var panel = this.up('form').up('panel').up('panel').down("panel[itemId=grid]")
			var store = panel.store;
			var form=this.up('form').getForm();
			var params = form.getValues();
			store.on('beforeload', function (store, options) {
		        Ext.apply(store.proxy.extraParams, params);
		    },this,{single: true});
			
			var paging = panel.down("pagingtoolbar");
			paging.moveFirst();
		}
		}]
	});
	
	this.items=[{
		 region: 'center',
		 layout:'fit',
		 items:[fSystemTab]
		},{
		 itemId:'search',
		 region:'east',
		 title : tiSearch,
		 collapsible: true,
		 collapsed:true,
		 width:300,
		 items:[search_grid]
		 }];
//	this.items=[fSystemTab];
	this.callParent(arguments);	
	}
});