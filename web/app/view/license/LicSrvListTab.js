Ext.define('app.view.license.LicSrvListTab',{
		extend:'Ext.panel.Panel',
		layout:'border',
		autoScroll:false,
		border:false,
		treeName:'',
		forceRefresh:0,
		initComponent: function() {
			
			var licSrvListStore= Ext.create('app.store.license.LicSrvListStore', {});
			var store = licSrvListStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			})
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var licSrvListGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
				itemId:'grid',
				border:false,
				layout:'fit',
				treeName:'',
				parentNodeTid:'',
				store: licSrvListStore,
				autoScroll:true,
				selModel: sm,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
				        {header: 'uuid',  dataIndex: 'uuid',width:80,hidden:true},
				        {header: 'sysUuid',dataIndex: 'sysUuid',width:80,hidden:true},
						{header: 'Server Name',dataIndex: 'sysName',width:120},
						{header: 'Server Alias',dataIndex: 'sysAlias',width:120,hidden:true},
						{header: 'Admin Status', dataIndex: 'adminStatus',hidden:true,
							renderer:function(val){  
								return rs.adminStatus(val);
							 }
						},
						{header: 'Opr Status',dataIndex: 'oprStatus',hidden:true,
							renderer:function(val){  
								return rs.oprStatus(val);
							} 
						},
						{header: 'Run Status', dataIndex: 'runStatus',hidden:true,
							renderer:function(val){  
								return rs.runStatus(val);
							} 
						},
						{header: 'Total Device',dataIndex: 'totalNeCount',width:80,hidden:true,},
						{header: 'Total SIM Card',dataIndex: 'sysTotalSimCard',width:80,hidden:true},
						{header: 'Trial Balance',dataIndex: 'trialBalance',width:80,hidden:true},
						{header: 'Premium Balance',dataIndex: 'premiumBalance',width:80,hidden:true},
						{header: 'Description', dataIndex: 'sysDetailDesc',width:160,hidden:true},
						{header: 'License Status', dataIndex: 'licStatus',width:120,
							renderer:function(val){  
								return rs.licenseStatus(val);
							} 
						},
						{header: 'Left Days', dataIndex: 'leftDays',width:80},
						{header: 'Serial No',  dataIndex: 'serialNo',ulan:'snAbbr',width:128,hidden:true},
						{header: 'Type', dataIndex: 'signType',width:120,
							renderer:function(val){  
								return rs.signType(val);
							} 
						},
						{header: 'Version', dataIndex: 'version',width:80},
						{header: 'Server Uuid', dataIndex: 'srvUuid',width:80,hidden:true,},
						{header: 'Server Mode', dataIndex: 'srvMode',width:120,
							renderer:function(val){ 
								return rs.serverMode(val);
							} 
						},
						{header: 'Server Magic', dataIndex: 'srvMagic',width:80,hidden:true},
						{header: 'Max SIM Card', dataIndex: 'maxSimCard',width:80,hidden:rs.dmCloudMode()},
						{header: 'API', dataIndex: 'serviceApi',width:80,
							renderer:function(val){  
								return rs.yesOrNo(val);
							}	 
						},
						{header: 'HBM', dataIndex: 'hbmFeatures',width:80,
							renderer:function(val){  
								return rs.yesOrNo(val);
							}	 
						},
						{header: 'Expired Date',dataIndex:'expiredDate',width:100,xtype: 'datecolumn', format:'Y-m-d',hidden:true},
						{header: 'ValidDays', dataIndex: 'validDays',width:80,hidden:true},
						{header: 'Sign Date',dataIndex:'signDate',width:100,xtype: 'datecolumn', format:'Y-m-d',hidden:true},
						{header: 'Sign Author', dataIndex: 'signAuthor',width:100,hidden:true},
						{header: 'DNS Url-01', dataIndex: 'dnsUrl',width:100,hidden:true},
						{header: 'DNS Url-02', dataIndex: 'dnsUrl02',width:100,hidden:true},
						{header: 'Memo', dataIndex: 'detailDesc',width:100,hidden:true},
						{header: 'Authentication', dataIndex: 'authInfo',width:100,hidden:true},
						
						{header: 'specDomainUuid',dataIndex: 'specDomainUuid',width:80,hidden:true},
							
				],
				listeners:{
					itemdblclick: function(view, record, item, index, e, eOpts ){},
				},
				dockedItems : [{
					 itemId:'pagingtoolbar',
				     dock: 'bottom',
					 xtype: 'pagingtoolbar',
				     store: licSrvListStore,
				     pageSize: 10,
				     limit:10,
				     displayInfo: true
				}]
			});
			
			var tbar = [];
			var refresh = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
	       		 		var domainUuid=licSrvListGrid.parentParentNodeTid;
						this.up('panel').down('panel[itemId=grid]').getStore().load();
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
					xtype:'textfield',
					fieldLabel:'Server Name',
					name:'sysName',
				},{
		            xtype: 'combo',
		            name: 'licStatus',
		            fieldLabel: 'License Status',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'value',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'value' ],
						data : [ {
							name : '-SELECT-',
							value : -1
						},{
							name : lanControll.getLanValue('licenseStatus_'+0),
							value : 0
						},{
							name : lanControll.getLanValue('licenseStatus_'+1),
							value : 1
						},{
							name : lanControll.getLanValue('licenseStatus_'+10),
							value : 10
						},{
							name : lanControll.getLanValue('licenseStatus_'+11),
							value : 11
						},{
							name : lanControll.getLanValue('licenseStatus_'+20),
							value : 20
						}]
					}),
				},{
					xtype: 'combo',
					name: 'hbmFeatures',
					fieldLabel: 'HBM',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'value',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'value' ],
						data : [ {
							name : '-SELECT-',
							value : -1
						},{
							name : lanControll.getLanValue('no'),
							value : 0
						},{
							name : lanControll.getLanValue('yes'),
							value : 1
						}]
					}),
				},{
					xtype:'numberfield',
					fieldLabel:'Left Days <=',
					name:'leftDays',
				}],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('hbmFeatures').setValue(-1);
							this.up('form').getForm().findField('licStatus').setValue(-1);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
					
					var licSrvListGridStore=licSrvListGrid.getStore();
					var params = form.getValues();
        			licSrvListGridStore.on('beforeload', function () {
        		        var params = form.getValues();
        		        Ext.apply(licSrvListGridStore.proxy.extraParams, params);
        		    },this,{single: true});
        			
        			var panel = this.up('form').up('panel').up('panel').down('panel[itemId=grid]');
        			var paging = panel.getComponent('pagingtoolbar');
        			paging.moveFirst();
				}
				}]
			});
			
			 this.items=[{
				 region: 'center',
				 layout:'fit',
				 items:[licSrvListGrid]
				       
				},{
				 itemId:'search',
				 region:'east',
				 title : lanControll.getLanValue('tiSearchLic'),
				 collapsible: true,
				 collapsed:true,
				 width:300,
				 items:[search_grid]
			 }
			 ];
			this.callParent(arguments);		
		},
		listeners: {
	        activate: function(tab){
				var grid=tab.down('panel').down('panel');
				if(tab.forceRefresh==1){
					tab.forceRefresh=0;
					var page=grid.getComponent('pagingtoolbar');
					page.moveFirst();
				}
			}
		}	
});
