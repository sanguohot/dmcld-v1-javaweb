Ext.define('app.view.privilege.SyncSupportPanel',{
	extend : 'Ext.window.Window',
	alias : 'widget.syncSupport',
	id:'syncSupport',
	title:lanControll.getLanValue('tiSysList'),
	closeAction: 'hide',
	layout:'border',
	height : 540,
	autoScroll:true,
	treeName:'',
	modal: true,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:760,
    resizable: true,
    param:{},
	initComponent: function(){
		var sysListStore= Ext.create('app.store.operation.system.SysListStore');		
		sysListStore.proxy.url="sysListManager!getTblSysWithDeviceNumInCloud.action";
		sysListStore.getProxy().setReader({
	        type: 'json',
	        root: 'sysList2'
	    });
		this.store=sysListStore;
		var store = sysListStore;
		store.on('beforeload',function(){
			store.loadFlag = false;
		})
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var sync = Ext.create("Ext.button.Button",{
    		xtype:'button',
    		text: 'Sync Support',
            ulan:'btSyncSupport',
            iconCls:'synchro',
      		flag:"super_action",
     		listeners:{
     		 	click:function(){
					var win=this.up('window');
    				if ( fSystemTab.getSelectionModel().hasSelection() ){
    					var records=fSystemTab.getSelectionModel().getSelection();
    					for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('uuid');
							}else {
								ids=ids+","+records[i].get('uuid');
							}
						}
    					Ext.MessageBox.confirm(boxWarnning,lanControll.getLanValue('boxSyncSupport'),function(e) {
       						if( e == 'yes' ){
	       						var boxObj = {
	            		    		title:boxInfo,
	            		    		width : 300,
	            		    		msg:boxWaitMsg,
	            		    		modal:true,
	            		    		closable:false,
	            		    		wait:true
	                		    };
			                	var store=Ext.create('app.store.util.StepStore');
	                			sleepBar(store,true);
			                	
			                	Ext.Ajax.request({
									url:'userManager!syncSupport.action?ids='+ids,
									method:'POST',
									timeout:30*60*1000,
									callback: function (options, success, response) {
										boxObj.wait = false;
										Ext.MessageBox.hide();
										autoRefresh.stopTask(null,store);
										var obj=Ext.JSON.decode(response.responseText);
										if(obj['success']){
											win.hide();
											Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
										}else{
											Ext.MessageBox.alert(boxFailture,boxCommitFail);
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
					{header: 'Cur Cloud',dataIndex: 'cloudName'},
					{header: 'IP Address',dataIndex: 'sysIpAddr',hidden:true},
					{header: 'Load Value',dataIndex: 'loadVal',width:120,hidden:true},
					{header: 'deviceCnt', dataIndex: 'totalNeCount',hidden:true},
					{header: 'onlineDevcieCnt', dataIndex: 'onlineNeCount',hidden:true},
					{header: 'SIM Card', dataIndex: 'totalSimCard',hidden:true},
					{header: 'onlineSIMCard', dataIndex: 'onlineSimCard',hidden:true},
					{header: 'Version',dataIndex: 'softwareVersion',ulan:'versionAbbr',width:120,hidden:true},
					{header: 'Build Time',dataIndex: 'softwareBuildTime',width:150,xtype: 'datecolumn',format:'m-d H:i:s',hidden:true},
					{header: 'RunTime',dataIndex: 'lifeSecond',width:150,hidden:true,
						renderer:function(val,metaData,record,rowIndex,store,view){
		     				return rs.tranSecondMin(val,record.get('runStatus'));
		     			}
			     	},
					{header: 'Last Register',dataIndex: 'lastRegTime',xtype: 'datecolumn',format:'m-d H:i:s',hidden:true},
					{header: 'Last Heartbeat',dataIndex: 'lastHbTime',xtype: 'datecolumn',format:'m-d H:i:s',hidden:true},
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
					{header: 'canRegisterFlag',dataIndex: 'canRegisterFlag',hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						}
					},
					{header: 'Description',dataIndex: 'detailDesc',minWidth:120,hidden:false},
			],
			listeners:{
    			itemdblclick: function(grid, row, columnindex,e){
	  				sync.fireEvent('click');
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
		tbar.push(sync);
		tbar.push('-');
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
		}],
		
		buttons : [{
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