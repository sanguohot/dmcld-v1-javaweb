Ext.define('app.view.operation.cloud.CloudListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	border:false,
	title:'',
	forceRefresh:0,
	cloudUuid:-1,
	initComponent: function(){
	var store= Ext.create('app.store.operation.cloud.CloudListStore'); 
	var sm = Ext.create('Ext.selection.CheckboxModel');
	this.store = store;
	store.on('beforeload',function(){
		store.loadFlag = false;
	})
	var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
	var cloudUuid=this.cloudUuid;
	var grid=Ext.create('Ext.grid.Panel',{
		itemId:'grid',
		treeName:'',
		parentNodeTid:'',
		border:false,
		columnLines:true,
		store: store, 
		selModel: sm,
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
  		},
		columns: [
				{header: 'Uuid',dataIndex: 'uuid',hidden:true},
				{header: 'Name',dataIndex: 'name',width:120},
				{header: 'Alias',dataIndex: 'alias',width:120},
				{header: 'Admin Status', dataIndex: 'adminStatus',
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
				{header: 'Manage Domain',dataIndex: 'manDomainName',hidden:false},
				{header: 'SMTP Server',dataIndex: 'smtpServer',hidden:false},
				{header: 'SMTP Port',dataIndex: 'smtpPort',hidden:false},
				{header: 'SMTP Username',dataIndex: 'smtpUserName',hidden:false},
				{header: 'SMTP Password',dataIndex: 'smtpPassWord',hidden:false},
				{header: 'Mail from',dataIndex: 'mailFrom',hidden:false},
				
				{header: 'Detail Desc',dataIndex: 'detailDesc',flex:1},
				{header: 'Create Time',dataIndex: 'createTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
				{header: 'Update Time',dataIndex: 'updateTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
		],
		dockedItems:[{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: store,
		     pageSize: 25,
		     displayInfo: true,
		}	 	
		]
	});
	var tbar = [];
	if(!maintenance){
		
		var set = Ext.create("Ext.button.Button",{
			 xtype:'button',
	  		 text:'Setting',
	  		 iconCls:'option',
	  		 ulan:'btSetting',
	  		 flag:"super_edit",
	  		 listeners:{
	  		 	click:function(){
					if ( grid.getSelectionModel().hasSelection() ){
						var records = grid.getSelectionModel().getSelection();
						var ids;
						var name = '';
						for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('uuid');
								name = records[i].get('name');
							}else {
								ids=ids+","+records[i].get('uuid');
							}
						}
					
						var updatePanel = Ext.getCmp('updateCloud');
						if(updatePanel=='undefined'||updatePanel==undefined){
							updatePanel=Ext.create('app.view.operation.cloud.UpdateCloud',{});
							lanControll.setLan(updatePanel);
						}
						updatePanel.down('form').getForm().findField('ids').setValue(ids);
						updatePanel.down('form').getForm().findField('name').setValue(name);
						updatePanel.down('form').getForm().findField('cmpId').setValue(grid.up('panel').up('panel').id);
						var domainUuid = updatePanel.down('combo[name=manDomainUuid]');
						if(records.length == 1){
							var comboxStore = Ext.create("app.store.util.ComboxStore",{});							
							domainUuid.setValue("");
							domainUuid.setVisible(true);
							var domainUuidStore = domainUuid.store;
							comboxStore.on('load',function(){
	//							comboxStore.filter("type","locksim");
								domainUuidStore.removeAll();
								for(var i=0; i<comboxStore.getCount(); i++){
									if(comboxStore.getAt(i).get('type')=='domain'){
										domainUuidStore.add(comboxStore.getAt(i));
									}
								}
								updatePanel.show();
							})
							var params = { cloudUuid:records[0].get("uuid"),types:'domain'};
							Ext.apply(comboxStore.proxy.extraParams, params);
							comboxStore.load();
						}else{
							domainUuid.setValue(-1);
							domainUuid.setVisible(false);
							updatePanel.show();
						}
						
					}
	  	 		}
	  	 	}
		});
		tbar.push(set);
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
				grid.getStore().load();
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
	
	var search_grid=Ext.create('Ext.form.Panel',{
		border : false,
		bodyPadding : 5,
		defaults : {
		margins : '0 0 10 0'
		},
		items : [{
			xtype:'textfield',
			fieldLabel:'Name',
			name:'name',
		},rs.createAdminStatus(3,null,null),rs.createRunStatus(20,null),{
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
			 items:[grid]
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