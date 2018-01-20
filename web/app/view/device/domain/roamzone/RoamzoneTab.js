Ext.define('app.view.device.domain.roamzone.RoamzoneTab',{
		extend:'Ext.panel.Panel',
		 requires: [
	               'Ext.util.Format',
	               'Ext.grid.Panel',
	               'Ext.toolbar.Paging',
		       		'app.store.SimCardStore'
		           ],
		title:'RoamZone',
		layout:'border',
		autoScroll:true,
		
//		width: 800,
//        height: 600,
		
		initComponent: function() {
			
			var SimCardStore= Ext.create(app.store.SimCardStore, {}); 
			SimCardStore.load();
			
		
			var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var simcard_grid = Ext.create( Ext.grid.Panel, {
				columnLines:true,
				border:false,
				layout:'fit',
//				height:'600',
//				id:'grid1',
//				closable: true,
				store: SimCardStore,
				autoScroll:true,
//				plugins: [cellEditing],
				selModel: sm,
				columns: [
				{header: 'IMSI',  dataIndex: 'imsi',width:128 },
				{header: 'Status', dataIndex: 'status',width:64,
					renderer:function(val){  
						if( val==0 ) return 'Empty';
						else if( val== 3) return 'Loaded';
						else if( val== 4) return 'Using';
						else if( val== 5) return 'Stoped';
					} },
				{header: 'SimGroup', dataIndex: 'simgrpname',width:120,
				editor: {
						xtype: 'combobox',
						typeAhead: true,
						triggerAction: 'all',
						selectOnTab: true,
						store: [
							['unicomm-prepaid-1','unicomm-prepaid-1'],
							['mobile-prepaid-1','mobile-prepaid-1'],
							['mobile-mzone-1','mobile-mzone-1'],
						],
						lazyRender: true,
						listClass: 'x-combo-list-small'
					}
				},
				{header: 'BankName',dataIndex:'bankname',width:64 },
				{header: 'Slot',dataIndex: 'portno',width:32 },	
				{header: 'Balance', dataIndex:'balance',width:64},						
				{header: 'Provider', dataIndex:'providername',width:64},
				{header: 'PIN1', dataIndex:'pin1',width:64},
				{header: 'PUK1', dataIndex:'puk1',width:64},
				{header: 'Talk-Time', dataIndex:'talk_timelong'},
				{header: 'Talk-Time/day', dataIndex:'talk_timelong_today',},
				{header: 'Talk-Time/mon', dataIndex:'talk_timelong_month'},
				{header: 'SMS-cnt', dataIndex:'sms_cnt'},
				{header: 'SMS-cnt/day', dataIndex:'sms_cnt_today'},
				{header: 'SMS-cnt/mon', dataIndex:'sms_cnt_month'},
				{header: 'ICC', dataIndex:'icc',width:64},
				{header: 'LastUsedTime', xtype: 'datecolumn',dataIndex: 'last_use', format:'Y-m-d H:i:s' },												
				]
			});
			this.dockedItems=[{

			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: SimCardStore,
			     pageSize: 25,
			     displayInfo: true,
			}	 	
			];
			this.tbar=[{
		       	 xtype:'button',
		       	 text: 'ReLoad',
		       	 iconCls: 'refresh',
		       	 tooltip: 'ReLoad SimCards in the SimBank'
		       	 },'-',{
		       		 xtype:'button',
		       		 text:'Del',
		       		 iconCls:'remove',
		       		 listeners:{
		       		 	click:function(){

		       			if ( simcard_grid.getSelectionModel().hasSelection() ){
		       				Ext.MessageBox.confirm(boxWarnning,"Are you sure Delete current Simcard",function(e) { 																				
		       						if( e == 'yes' )
		       						{
		       							var records= simcard_grid.getSelectionModel().getSelection();
		       							for(var i=0;i<records.length;i++){
		       								//r= roamgrpStore.getAt(0);
		       								SimCardStore.remove(records[i]);
		       							}
		       						}	
		       				})
		       			}	
		       		
		       	 		}
		       	 	}
		       	 },'-',{
		       		 xtype:'button',
		       		 text:'Config',
		       		 iconCls:'option',
		       		 flag:"edit",
		       		 listeners:{
		       		 	click:function(){
		       		 			var record=simcard_grid.getSelectionModel().getSelection()
//				       			if (record.length != 1) {
//				       				Ext.MessageBox.alert( 'Error', 'you must check one record');
//									return;
//								}
//		       		 			for ( var i = 0; i < record.length; i++) {
		       		 			
									var updateSimcard = Ext.create('app.view.simbank.UpdateSimCard');

									updateSimcard.show();
//								}

		       		 		
		       	 		}
		       	 	}
		       	 },'-', {
		       		 xtype:'button',
		       		 text: 'SelectAll',
		       		 iconCls: 'selectAll',
		       		 listeners:{
		       			 click:function(){
		       		 		if(simcard_grid.getSelectionModel().hasSelection()){
			       		 		simcard_grid.getSelectionModel().deselectAll();  
		       		 		}else{
		       		 			simcard_grid.getSelectionModel().selectAll();
		       		 		}
//		       		 		var cnt=simcard_grid.getSelectionModel().getSelection();
//		       		 		alert('cnt='+cnt+" cnt="+cnt.length);
		       		 	}
		       		 }
		       	 },'->',{
		       		 xtype:'button',
		       		 text:'Search',
		       		 iconCls:'search',
		       		 listeners:{
		       		 	click:function(){
		       		 		var eastSearch=Ext.getCmp("dr_east_search");
		       		 		if(eastSearch.isHidden()){
		       		 			eastSearch.expand();
		       		 		}else{
		       		 			eastSearch.collapse();
		       		 		}
		       	 		}
		       	 	}
		    }];
			
			
			

			var search_grid=Ext.create('Ext.panel.Panel',{
//				width:280,
//				layout : {
//				type : 'vbox',
//				align : 'stretch'
//				},
				id:'deviceSearchPanel',
//				layout:'fit',
				border : false,
				bodyPadding : 5,
				defaults : {
				margins : '0 0 10 0'
				},
				items : [ {
					xtype:'textfield',
					fieldLabel:'SN',
					name:'bankid',
					tooltip:'sn',
				
				
				},{
					xtype:'textfield',
					fieldLabel:'Name',
					name:'bankname',
				}, {
					name : 'status',
					xtype: 'combo',
					mode: 'local',
					fieldLabel: 'Status',
					displayField: 'name',
					valueField: 'status',
					queryMode: 'local',
					value: 1,
					store: Ext.create('Ext.data.Store', {
					fields : ['name', 'status'],
					data   : [
					{name : 'Enabled',   status: 1},
					{name : 'Disabled',  status: 0}
					]
					})
				},  {
					xtype : 'textfield',
					fieldLabel : 'Description',
					flex : 1,
					margins : '0',
				}
				],
				
				buttons : [ {
						text : 'Cancel',
						handler : function() {
							Ext.getCmp("dr_east_search").expand();
						}
				}, {
				text : 'Commit',
				handler : function() {
//					simcard_grid.destroy();
//					simcard_grid2.show();
//					Ext.getCmp('allGrid').down('panel').getCmp('grid1').hide();
//					Ext.getCmp('allGrid').down('panel').getCmp('grid2').show();
//					if (this.up('form').getForm().isValid()) {
//						// In a real application, this would submit the form to the
//						// configured url
//						// this.up('form').getForm().submit();
//						this.up('form').getForm().reset();
//						this.up('window').hide();
//						Ext.MessageBox.alert( 'Commit Success','Add Group To Policy Success!');
//					}
				}
				}]
			});
//			
//			var allPanel=Ext.create('Ext.panel.Panel',{
////				layout:'fit',
//				border:false,
//				items:[{
//				       	xtype: 'tabpanel',
//				       	layout:'auto',
//				       	id:'allGrid',
//				       	items:[simcard_grid,simcard_grid2]
//				       
//				}]
//			});
			
			
			 this.items=[
			   {
				 region: 'center',
//				 xtype:'tabpanel',
//				 split: false,
//				 layout:'fit',
				 layout:'fit',
				 items:[simcard_grid]
				       
				},{
				 id:'dr_east_search',
				 region:'east',
				 title : 'Search SimCard',
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
