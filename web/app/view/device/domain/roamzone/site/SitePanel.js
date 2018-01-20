Ext.define('app.view.device.domain.roamzone.site.SitePanel',{
	extend:'Ext.panel.Panel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	id:'deviceSitePanel',
	layout:'fit',
	hidden:true,
	border:false,
	renderStatus:function(val,meta,record) { 
		var status=record.get('status');
		if( status =='1') { 
			return '<span style="color:grey;">' + val + '</span>';
		}
		else if	( status =='0') { 
			return '<span style="color:red;">' + val + '</span>';
		}	
		else {
			return '<span style="color:green;">' + val + '</span>';	
		}				
	},
	renderStatus_0:function(val,meta,record) { 
		var status=record.get('status');
		if( status =='1') { 
			return '<span style="color:grey;">online</span>';
		}
		else if	( status =='0') { 
			return '<span style="color:red;">offline</span>';
		}	
		else {
			return '<span style="color:green;">' + val + '</span>';	
		}				
	},
	initComponent: function(){
	
//		var siteTab1=Ext.create('app.view.operation.domain.roamzone.RoamzoneTab',{});
//		var siteTab2=Ext.create('app.view.operation.domain.roamzone.SiteTab',{});
		
		var siteTab=Ext.create('Ext.panel.Panel',{
			title:'Site Info',
			id:'dm_siteTab2',
			treeName:'',
			
			frame: true,
			border:false,
			width: 500,
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 400,
	            anchor: '100%'
	        },
	        dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [
				{
					text:'Save',
					tooltip:'Save',
					iconCls:'save',
					flag:"edit",
					handler: function() {}
				}						
				]		
	        }],

	        items: [{
	            xtype: 'textfield',
	            name: 'siteName',
	            fieldLabel: 'Site Name',
	            value: 'nanshan',
	           
	        }, {
	            xtype: 'textfield',
	            name: 'alias',
//	            inputType: 'password',
	            fieldLabel: 'Alias',
	            value:'shenzhen nanshan site'
	        },{
	            xtype: 'displayfield',
	            name: 'zoneId',
	            fieldLabel: 'Roamzone',
	            value: 'shenzhen'
	        },{
	            xtype: 'textareafield',
	            name: 'description',
	            fieldLabel: 'Description',
	            value: 'about shenzhen nanshan site description',
	            width:300,
	        }],
	       
		});
		
    	var	site_store = Ext.create('app.store.SiteStore', {});
		var siteTab1=Ext.create('Ext.grid.Panel',{
			title:'Site',
			id:'dm_siteTab1',
			treeName:'',
			layout:'fit',
   			autoScroll:true,
   			columnLines:true,
   			store: site_store, 
   			selModel: Ext.create('Ext.selection.CheckboxModel'),
   			columns: [
   				{header: 'RoamZoneName',dataIndex: 'roamzonename',flex:1},
   				{header: 'SiteName',dataIndex: 'sitename',flex:1},											
   				{header: 'Desc',dataIndex: 'desc',flex:1},
   			],
   			tbar: [{
		   		xtype:'button',
		   		text: 'Add',
		   		iconCls:'add',
		   		listeners:{ 
		   			click: function() {
		   				var window = Ext.create('app.view.gateway.gwSiteAddWindow');
		   				window.show();
		   			}						
		   		},
		   	},{
		   		text:'Mod',
		   		tooltip:'Modify a Site',
		   		iconCls:'option',
		   		flag:"edit",
		   		listeners:{ 
		   			click: function() {
		   				var site_grid = Ext.getCmp('site_grid');
		   				if(site_grid.getSelectionModel().hasSelection()){
		   					
		   					var record=site_grid.getSelectionModel().getSelection();
		   					if(record.length!=1){
		   						Ext.MessageBox.alert({title:'Error',msg:'You selected '+record.length+' records, please select only one record!'})
		   						return;
		   					}

		   					var roamzonename=record[0].get('roamzonename');
		   					var sitename=record[0].get('sitename');
		   					var desc=record[0].get('desc');					
		   					var window = Ext.create('app.view.gateway.gwSiteModWindow');

		   					if(roamzonename != undefined)
		   					window.down('form').getForm().findField('gw_site_mod_roamzone').setValue(roamzonename);

		   					if(sitename != undefined)
		   					window.down('form').getForm().findField('gw_site_mod_site').setValue(sitename);

		   					if(desc != undefined)
		   					window.down('form').getForm().findField('gw_site_mod_desc').setValue(desc);

		   					window.show();
		   				}
		   				else{
		   					alert("Please select a record");
		   				}			
		   			}
		   		}
		   	},{
		   		text:'Del',
		   		tooltip:'Delete the selected Site',
		   		iconCls:'remove',
		   		listeners:{ 
		   			click: function() {
		   					var site_grid = Ext.getCmp('site_grid');
		   					if ( site_grid.getSelectionModel().hasSelection() ){
		   						Ext.MessageBox.confirm(boxWarnning,"Are you sure to delete sites",function(e) { 																				
		   								if( e == 'yes' )
		   								{
		   									var records= site_grid.getSelectionModel().getSelection();
		   									for(var i=0;i<records.length;i++){
		   										site_store.remove(records[i]);
		   									}
		   								}	
		   						})
		   					}	
		   				}		
		   		}							
		   	}],	
		});
//		var siteTab1=Ext.create('Ext.panel.Panel',{
//			title:'SiteTab1',
//			border:false,
//			requires: [
//			           'Ext.util.Format',
//			           'Ext.grid.Panel',
//			   		'app.store.SiteStore'
//			       ],
//			   	
//			       initComponent: function() {
//			   		site_store = Ext.create('app.store.SiteStore', { });
//			   		site_grid = Ext.create('Ext.grid.Panel', {
//			   			layout:'fit',
//			   			autoScroll:true,
//			   			columnLines:true,
//			   			id:'site_grid',
//			   			store: site_store, 
//			   			selModel: Ext.create('Ext.selection.CheckboxModel'),
//			   			columns: [
//			   				{header: 'RoamZoneName',dataIndex: 'roamzonename',flex:1},
//			   				{header: 'SiteName',dataIndex: 'sitename',flex:1},											
//			   				{header: 'Desc',dataIndex: 'desc',flex:1},
//			   			],
//			   		});	
//			   		
//			   		this.items = [ site_grid ];
//			   				
//			   		this.callParent(arguments);		
//			   	},	
//			   	title:'Site',
//			   	layout:'fit',
//			   	
//		});
		var simbankStore= Ext.create(app.store.SimBankStore);
		var roamzoneStore= Ext.create(app.store.RoamZoneStore, {});
		var banktypeStore= Ext.create(app.store.BankTypeStore, {});
		simbankStore.load();
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1});	
		var sm = Ext.create('Ext.selection.CheckboxModel');	
		var siteTab2=Ext.create('Ext.grid.Panel',{
				title:'NES In Site',
				width: 800,
				border:false,
				autoScroll:true,
				columnLines:true,
				store: simbankStore, 
//				plugins: [cellEditing],
//				selModel: sm,
				columns: [							
						{header: 'Name',  dataIndex: 'name',flex: 1 ,renderer:this.renderStatus,
						editor: {allowBlank: false},
						},
						{header: 'Device SN',  dataIndex: 'id',  width:120,renderer:this.renderStatus,
						editor: {allowBlank: false},},
						{header: 'Type', dataIndex: 'type', width:48, renderer:this.renderStatus,flex: 1,
							editor: {
							xtype: 'combobox',
							typeAhead: true,
							triggerAction: 'all',
							selectOnTab: true,
							store: banktypeStore,
							queryMode: 'remote',
							displayField: 'simbanktype',
							valueField: 'simbanktype',
							lazyRender: true,
							listClass: 'x-combo-list-small'
							}
						},
						{header: 'Status', dataIndex: 'status', flex: 1,renderer:this.renderStatus_0},
						{header: 'Version', dataIndex: 'currVersion', flex: 1,renderer:this.renderStatus},
						{header: 'Description', dataIndex: 'desc', flex: 1 ,sortable : false, renderer:this.renderStatus,
						editor: {allowBlank: false},
						}
				],
				// inline buttons
				dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [
				{
					text:'Add',
					tooltip:'Add a new simbank',
					iconCls:'add',
					listeners:{ 
						click: function() {
//						var r = Ext.create('app.store.SimBankStore', {
//									name: 'New SimBank',
//								});
//						simbankStore.insert(0, r);
//						cellEditing.startEditByPosition({row: 0, column: 0});
						var addSimbank=Ext.create('app.view.simbank.AddSimbank',{});
						addSimbank.show();
						}						
					},
				}, '-',{
					text:'Del',
					tooltip:'Remove the selected simbank',
					iconCls:'remove',
					listeners:{ 
						click: function() {
								if ( simbank_tab.getSelectionModel().hasSelection() ){
									Ext.MessageBox.confirm(boxWarnning,"Are you sure Delete current simbank",function(e) { 																				
											if( e == 'yes' )
											{
												var records= simbank_tab.getSelectionModel().getSelection();
												for(var i=0;i<records.length;i++){
													//r= roamgrpStore.getAt(0);
													simbankStore.remove(records[i]);
												}
											}	
									})
								}	
							}		
					}							
				},'-',{
						text:'Config',
//						id:'Update',
						tooltip:'Config the selected simbank',
						iconCls:'option',
						flag:"edit",
						listeners:{
							click: function(){
								var record = simbank_tab.getSelectionModel().getSelection();
								if(record.length != 1)
								{
									Ext.MessageBox.alert('Warning',"No SimBank was selected");
									return;
								}

							for ( var i = 0; i < record.length; i++) {
								var bankid=record[i].get('bankid');
								var bankname=record[i].get('bankname');
								var description=record[i].get('desc');
								var status=record[i].get('status');
								var updateSimbank=Ext.create('app.view.simbank.UpdateSimbank',{bankid:bankid});
								
//								alert("bankId="+bankid+" , bankname="+bankname);
								updateSimbank.down('form').getForm().findField('bankname').setValue(bankname);
								updateSimbank.down('form').getForm().findField('bankid').setValue(bankid);
								updateSimbank.down('form').getForm().findField('desc').setValue(description);
								updateSimbank.down('form').getForm().findField('status').setValue(status);
								updateSimbank.show();
							}
					}
				}
				}, '-',{
					text:'Remote',
					tooltip:'Explore the remote Gateway',
					iconCls:'world',
					disabled: false
				},'-',{
					text:'Upgrade',
					tooltip:'Upgrade the modified simbank',
					iconCls:'upgrade',
					disabled:false
				},'-',{
					text:'Details',
					tooltip:'Show simbanks details',
					iconCls:'monitor_edit',
					handler: function() {
						if ( simbank_tab.getSelectionModel().hasSelection() )
						{
							var records= simbank_tab.getSelectionModel().getSelection();
							for(var i=0;i<records.length;i++){
								simbank_tab.slotgrid(0, records[i] );
							}																	
						}
						else
						{
							Ext.MessageBox.alert('Warning','No Simbank was selected');
						}	
					}
				},						
				]},		
				],

				slotgrid: function(rowIndex,record) {
					var bankname=record.get('bankname');
					var bankid  =record.get('bankid');	
//					alert("bankname="+bankname+" , bankid="+bankid);
					var slot_panel = Ext.create('app.view.simbank.SimSlot',{bankid:bankid});
					Ext.getCmp('simbank_tab').add({
						title: 'Simcards In ' + bankname,
						closable: true,
						layout:'fit',
						items: [ slot_panel ]
					}).show();
					
				},						
				listeners:{
					celldblclick: function( grid, row, columnindex,e){
						var s = grid.getStore();
						var record = s.getAt(e.index);
						this.slotgrid(e.index, record );
					}						
				}
			
			
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[siteTab,siteTab1,siteTab2]
	       
		}];
		this.callParent(arguments);	
	}
});