Ext.define('app.view.operation.MoveNeNaPanel',{
	extend : 'Ext.window.Window',
	alias : 'widget.moveNeNa',
	id:'moveNeNa',
	title:lanControll.getLanValue('tiDomainList'),
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
    	var domainListStore= Ext.create('app.store.operation.domain.SysDomainListStore'); 
    	var sm = Ext.create('Ext.selection.CheckboxModel');
    	this.store = domainListStore;
    	domainListStore.on('beforeload',function(){
    		domainListStore.loadFlag = false;
    	})
    	var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
    	var cloudUuid=this.cloudUuid;
    	var move = Ext.create("Ext.button.Button",{
    		xtype:'button',
    		text:'Move',
    		ulan:'btMove',
    		iconCls:'option',
    		flag:"super_edit",
     		listeners:{
     		 	click:function(){
    				if ( fDomainTab.getSelectionModel().hasSelection() ){
    					var records=fDomainTab.getSelectionModel().getSelection();
    					if(records.length==1){
    						var domainUuid=records[0].get('uuid');
    						var addNe=Ext.getCmp('updateNeNa');
			        		if(addNe=='undefined'||addNe==undefined){
			        			addNe=Ext.create('app.view.operation.UpdateNeNa',{
		        					id:'updateNeNa',
			        			});
			        			lanControll.setLan(addNe);
			    			}
			        		var param=fDomainTab.up('panel').up('panel').param;
			        		addNe.param=param;
    						var comboxStore = addNe.comboxStore;
			    			comboxStore.removeAll();
			    			comboxStore.on('load',function(){
								var siteUuid = addNe.down('form').getForm().findField('siteUuid');
								var siteStore = siteUuid.store;
			
								siteStore.removeAll();
								for(var i=0; i<comboxStore.getCount(); i++){
									if(comboxStore.getAt(i).get('type')=='site'){
										siteStore.add(comboxStore.getAt(i));
									}
								}
								addNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);
								addNe.show();
			    			},this,{single: true});
			    			comboxStore.load({params:{domainUuid:domainUuid,types:'site'}});	  
    					}else{
    						Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
        		 			return;
    					}
    				}else{
    					Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
    		 			return;
    				}
     	 		}
     	 	}
    	});
    	var fDomainTab=Ext.create('Ext.grid.Panel',{
            viewConfig : {
    			loadMask:{
    				msg:lanControll.getLanValue('maskMsg')
    			},
    			enableTextSelection: true
    		},
    		itemId:'grid',
    		treeName:'',
    		parentNodeTid:'',
    		border:false,
    		columnLines:true,
    		store: domainListStore, 
    		selModel: sm,
    		columns: [
    				{header: 'Uuid',dataIndex: 'uuid',hidden:true,sortable:false},
    				{header: 'Name',dataIndex: 'name',},
    				{header: 'Alias',dataIndex: 'alias',hidden:true},
    				{header: 'Admin Status', dataIndex: 'adminStatus',hidden:true,
    					renderer:function(val){  
    						return rs.adminStatus(val);
    					 }
    				},
    				{header: 'Opr Status', dataIndex: 'oprStatus',hidden:true,
    					renderer:function(val){  
    						return rs.oprStatus(val);
    					} 
    				},
    				{header: 'Run Status', dataIndex: 'runStatus',
    					renderer:function(val){  
    						return rs.runStatus(val);
    					} 
    				},
    				{header: 'Vendor', dataIndex: 'vendorId',
    					renderer:function(val){  
    						return rs.vendor(val);
    					} 
    				},
    				{header: 'productId', ulan:'domainProductTypeAbbr',dataIndex: 'productId',hidden:true,
    					renderer:function(val){  
    						return rs.domainProductType(val);
    					}
    				},
    				{header: 'Cur Cloud', dataIndex: 'cloudName',hidden:true},
    				{header: 'Spec Server', dataIndex: 'specServerName',ulan:'specSysUuidSpec'},
    				{header: 'Cur Server', dataIndex: 'serverName'},
    				{header: 'Locked Flag', dataIndex: 'sysLockedFlag',hidden:true,
    					renderer:function(val){  
    						return rs.yesOrNo(val);
    					}
    				},
    				{header: 'DeviceCnt', dataIndex: 'totalNeCount',hidden:true},
    				{header: 'onlineDevcieCnt', dataIndex: 'onlineNeCount',hidden:true},
    				{header: 'SIM Card', dataIndex: 'totalSimCard',hidden:true},
    				{header: 'onlineSIMCard', dataIndex: 'onlineSimCard',hidden:true},
//    				{header: 'Alarm Max', dataIndex: 'alarmMax',hidden:true},
//    				{header: 'PM 15M Max', dataIndex: 'pm15mMax',hidden:true,
//    					renderer:function(val){  
//    						return rs.min15(val);
//    					}
//    				},
//    				{header: 'PM 24H Max', dataIndex: 'pm24hMax',hidden:true,
//    					renderer:function(val){  
//    						return rs.hour24(val);
//    					}
//    				},
//    				{header: 'PM Call Max', dataIndex: 'pmCallMax',hidden:true,},
//    				{header: 'PM SMS Max', dataIndex: 'pmSmsMax',hidden:true,},
//    				{header: 'PM USSD Max', dataIndex: 'pmUssdMax',hidden:true,},
//    				{header: 'Log User Max', dataIndex: 'logUserMax',hidden:true,},
//    				{header: 'snumberMax', dataIndex: 'snumberMax',hidden:true,},
//    				{header: 'dnumberMax', dataIndex: 'dnumberMax',hidden:true,},
    				{header: 'Create Time',dataIndex: 'createTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
    				{header: 'Update Time',dataIndex: 'updateTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
    				{header: 'specCloudUuid', dataIndex: 'specCloudUuid',hidden:true},
    				{header: 'cloudUuid', dataIndex: 'cloudUuid',hidden:true},
    				{header: 'specSysUuid', dataIndex: 'specSysUuid',hidden:true},
    		],
    		dockedItems:[{
    			dock: 'bottom',
    			xtype: 'pagingtoolbar',
    		    store: domainListStore,
    		    pageSize: 25,
    		    displayInfo: true,
    		}],
    		listeners:{
    			itemdblclick: function(grid, row, columnindex,e){
    				move.fireEvent('click');
    			}
    		},
    	});
    	var tbar = [];
    	tbar.push(move);
    	tbar.push('-');
    	var refresh = Ext.create('Ext.button.Button',{
       		 xtype:'button',
       		 text:'Refresh',
       		ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 flag:"super_read",
       		 listeners:{
       		 	click:function(){
    				fDomainTab.getStore().load();
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
    	
    	var sysStore = Ext.create('app.store.util.ComboxStore',{});
    	var sysStore2 = Ext.create('app.store.util.ComboxStore',{});
    	sysStore.on('beforeload', function (sysStore, options) {
            var params = { cloudUuid:1};
            Ext.apply(sysStore.proxy.extraParams, params);
        });
    	sysStore.on('load',function(){
    		sysStore2.removeAll();
    		for(var i=0; i<sysStore.getCount(); i++){
    			sysStore2.add(sysStore.getAt(i));
    		}
    	});
    	var search_grid=Ext.create('Ext.form.Panel',{
    		border : false,
    		bodyPadding : 5,
    		defaults : {
    			width:285,
    			margins : '0 0 10 0'
    		},
    		items : [{
    			xtype:'textfield',
    			fieldLabel:'Name',
    			name:'name',
    		}, {
    			name : 'specSysUuid',
    			xtype: 'combo',
    			mode: 'local',
    			fieldLabel: 'Specific Server',
    			displayField: 'name',
    			valueField: 'uuid',
    			queryMode: 'local',
    			store:sysStore,
    		}, {
    			name : 'sysUuid',
    			xtype: 'combo',
    			mode: 'local',
    			fieldLabel: 'Current Server',
    			displayField: 'name',
    			valueField: 'uuid',
    			queryMode: 'local',
    			store:sysStore2,
    		},{
                xtype: 'combo',
                name: 'vendorId',
                fieldLabel: 'Vendor',
    			mode : 'local',
    			displayField : 'name',
    			valueField : 'value',
    			queryMode : 'local',
    			store : Ext.create('Ext.data.Store', {
    				fields : [ 'name', 'value' ],
    				data : [ {
    					name:'-SELECT-',
    					value:-1,
    				},{
    					name:'NULL',
    					value:0,
    				},{
    					name : 'UCSPEED',
    					value : 1
    				}, {
    					name : 'DINSTAR',
    					value : 2
    				}  ]
    			}),

    		},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null)
    		],
    		
    		buttons : [ {
    				text : 'Reset',
    				ulan:'btReset1',
    				flag:"super_read",
    				handler : function() {
    					this.up('form').getForm().reset();
    					this.up('form').getForm().findField('specSysUuid').setValue(-1);
    					this.up('form').getForm().findField('sysUuid').setValue(-1);
    					this.up('form').getForm().findField('vendorId').setValue(-1);
    					this.up('form').getForm().findField('type').setValue(-1);
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
					 items:[fDomainTab]
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