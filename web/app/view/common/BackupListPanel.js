Ext.define('app.view.common.BackupListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	border:false,
	title:'',
	forceRefresh:0,
	cloudUuid:-1,
	initComponent: function(){
		var backupStore= Ext.create('app.store.common.BackupStore');
		var sm = Ext.create('Ext.selection.CheckboxModel');
		backupStore.pageSize=32;
		backupStore.proxy.url = "backupManager!findFileList.action";
		this.store = backupStore;
		backupStore.on('beforeload',function(){
			backupStore.loadFlag = false;
		});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var gridTab=Ext.create('Ext.grid.Panel',{
			itemId:'grid',
			treeName:'',
			parentNodeTid:'',
			border:false,
			columnLines:true,
			store: backupStore, 
			selModel: sm,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true},
					{header: 'Name',dataIndex: 'name',width:160,},
					{header: 'domainName', dataIndex: 'domainName',width:120,hidden:true},
					{header: 'userName', dataIndex: 'userName',hidden:true},
					{header: 'size', dataIndex: 'size',
						renderer:function(val){  
							return (val/1024)+'kb';
						}
					},
					{header: 'createTime', dataIndex: 'createTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:150},
					{header: 'detailDesc', dataIndex: 'detailDesc',minWidth:90,flex:1},
					{header: 'type', dataIndex: 'type',hidden:true},
					{header: 'relateUuid', dataIndex: 'relateUuid',hidden:true},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){}						
			},
			dockedItems:[{
	
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: backupStore,
			     pageSize: 25,
			     displayInfo: true,
			}]
		});
		var tbar = [];
		if(!maintenance){
			var del = Ext.create('Ext.button.Button',{
				xtype : 'button',
				text : 'Delete',
				ulan:'btDel',
				iconCls : 'remove',
				flag:"super_edit",
				listeners : {
					click : function() {
						if (gridTab.getSelectionModel().hasSelection()) {
							
									var records = gridTab.getSelectionModel().getSelection();
									var ids="";
									var cnt=0;
									var names="";
									var name = "";
									var uuid = 0;
									var domainName="";
									for ( var i = 0; i < records.length; i++) {
										if(i==0){
											ids=records[i].get('uuid');
											names=records[i].get('domainName');
											name = names;
											uuid = records[i].get('uuid');
											domainName = records[i].get('domainName');
										}else {
											cnt=1;
											ids=ids+"-"+records[i].get('uuid');
											names=names+","+records[i].get('domainName')
										}
										
									}
									boxDelDomain = lanControll.getLanValue('boxDelDomain');
									Ext.MessageBox.confirm(boxWarnning,boxDelDomain,function(e) {
										if (e == 'yes') {
											Ext.Ajax.request({
						                		url:'backupManager!deleteBackup.action?uuids='+ids+'&domainName='+domainName+'&uuid='+uuid,
						                		method:'POST',
						                		callback: function (options, success, response) {
													var obj=Ext.JSON.decode(response.responseText);
							                    	if(obj['success']){
							                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
							                    		backupStore.load();
							                    	}else{
							                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
							                    	}
						                    	}
						                	});
										}
	
									})
			               
						}else{
							Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	   		 				return;
						}
					}
	
				}
			});
			tbar.push(del);
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
					gridTab.getStore().load();
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
			},{
				xtype:'textfield',
				fieldLabel:'detailDesc',
				name:'detailDesc',
			}],
			
			buttons : [{
				text : 'Reset',
				ulan:'btReset1',
				flag:"super_read",
				handler : function() {
					this.up('form').getForm().reset();
				}
			},{
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
				 items:[gridTab]
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