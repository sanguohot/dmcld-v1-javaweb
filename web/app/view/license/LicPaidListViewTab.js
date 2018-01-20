Ext.define('app.view.license.LicPaidListViewTab',{
		extend:'Ext.panel.Panel',
		layout:'border',
		autoScroll:false,
		border:false,
		treeName:'',
		forceRefresh:0,
		usedDomainUuid:-1,
		usedSysUuid:-1,
		initComponent: function() {
			
			var paidListStore= Ext.create('app.store.license.LicPaidListStore', {});
			var store = paidListStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			})
			var maintenance = (this.id.indexOf('licAllPaid')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var paidListGrid = Ext.create('Ext.grid.Panel', {
				columnLines:true,
				itemId:'grid',
				border:false,
				layout:'fit',
				treeName:'',
				selectAll:0,
				parentNodeTid:'',
				store: paidListStore,
				autoScroll:true,
				selModel: sm,
		        viewConfig : {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
				},
				columns: [
			        {header: 'uuid',  dataIndex: 'uuid',width:80,hidden:true},
			        {header: 'Card Sn', dataIndex: 'cardSn',width:150},
					{header: 'Alias',  dataIndex: 'alias',width:128,hidden:true},
					{header: 'Card Status', dataIndex: 'cardStatus',width:120,
						renderer:function(val){  
							return rs.licPaidStatus(val);
						} 
					},
					{header: 'Card Type', dataIndex: 'cardType',width:90,
						renderer:function(val){  
							return rs.licPaidType(val);
						} 
					},
					{header: 'Card Price', dataIndex: 'cardPrice',width:80},
					{header: 'Create Time',dataIndex:'createTime',width:100,xtype: 'datecolumn', format:'H:i:s',hidden:true},
					{header: 'Used Server', dataIndex: 'usedSysName',width:100},
					{header: 'Used Domain', dataIndex: 'usedDomainName',width:100},
					{header: 'Used Time',dataIndex:'usedTime',width:160,xtype: 'datecolumn', format:'Y-m-d H:i:s'},
					{header: 'Expired Date',dataIndex:'expiredDate',width:100,xtype: 'datecolumn', format:'H:i:s',hidden:true},
					{header: 'Description', dataIndex: 'detailDesc',width:260},
					{header: 'usedSysUuid',dataIndex: 'usedSysUuid',width:80,hidden:true},
					{header: 'usedDomainUuid',dataIndex: 'usedDomainUuid',width:80,hidden:true},
					
				],
				listeners:{
					itemdblclick: function(view, record, item, index, e, eOpts ){},
				},
				dockedItems : [{
					 itemId:'pagingtoolbar',
				     dock: 'bottom',
					 xtype: 'pagingtoolbar',
				     store: paidListStore,
				     pageSize: 10,
				     limit:10,
				     displayInfo: true,
				}]
			});
			
			var tbar = [];
			
				
				var exportS = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Export',
		       		 ulan:'btExport',
		       		 iconCls:'export',
		       		 listeners:{
		       		 	click:function(){

		       			if ( paidListGrid.getSelectionModel().hasSelection() ){
		       				
								var records= paidListGrid.getSelectionModel().getSelection();
								var ids="";
								var cnt=0;
								var selectAll=paidListGrid.selectAll;
								boxExportPaidAll = lanControll.getLanValue('boxExportPaidAll');
								boxExportPaid = lanControll.getLanValue('boxExportPaid');
								var info=boxExportPaidAll;
								if(selectAll==1){
									info=boxExportPaidAll;
								}else{
									for ( var i = 0; i < records.length; i++) {
										if(i==0){
											ids=records[i].get('uuid');
										}else {
											cnt=1;
											ids=ids+","+records[i].get('uuid');
										}
									}
									info=boxExportPaid;
								}
								
							
								var usedDomainUuid=paidListGrid.up('panel').up('panel').usedDomainUuid;
								var usedSysUuid=paidListGrid.up('panel').up('panel').usedSysUuid;
								
								Ext.MessageBox.confirm(boxWarnning,info,function(e) { 																				
		       						if( e == 'yes' ){
		       							var form=paidListGrid.up('panel').up('panel').down('form').getForm();
		       							var param=form.getValues();
//		       							var param=paidListGrid.store.proxy.extraParams;
		       							Ext.Ajax.request({
					                		url:'exportConfig!exportLicPaidCard.action?uuids='+ids+"&selectAll="+selectAll+'&usedDomainUuid='+usedDomainUuid+'&usedSysUuid='+usedSysUuid,
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj["success"]){
						                    		window.location.href="download/"+obj["fileName"];
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
//			}
			
			var sel = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 ulan:'btSelectAll',
	       		 text: 'Select All',
	       		 iconCls: 'selectAll',
	       		 listeners:{
	       			 click:function(){
						if(paidListGrid.selectAll==1){
							paidListGrid.selectAll=0;
							paidListGrid.selModel.setLocked(false);	
							paidListGrid.getSelectionModel().deselectAll(); 
							this.setIconCls('selectOut');
	       		 		}else{
							this.setIconCls('selectIn');
							paidListGrid.selectAll=1;
							paidListGrid.getSelectionModel().selectAll();
							paidListGrid.selModel.setLocked(true);
	       		 		}
	       		 	}
	       		 }
	       	 });
			tbar.push(sel);
			tbar.push('-');
			
			var refresh = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
//	       		 flag:"super_read",
	       		 listeners:{
	       		 	click:function(){
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
				items : [ {
					xtype:'textfield',
					fieldLabel:'Card Sn',
					name:'cardSn',
				},{
		            xtype: 'combo',
		            name: 'cardStatus',
		            fieldLabel: 'Card Status',
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
							name : lanControll.getLanValue('licPaidStatus_'+0),
							statusId : 0
						},{
							name : lanControll.getLanValue('licPaidStatus_'+1),
							statusId : 1
						},{
							name : lanControll.getLanValue('licPaidStatus_'+2),
							statusId : 2
						}]
					}),
					
				},{
					xtype: 'combo',
					name: 'cardType',
					fieldLabel: 'Card Type',
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
							name : lanControll.getLanValue('licPaidType_'+0),
							statusId : 0
						},{
							name : lanControll.getLanValue('licPaidType_'+1),
							statusId : 1
						}]
					}),
					
		        },{
					xtype:'textfield',
					fieldLabel:'Card Price',
					name:'cardPrice',
				},{
					xtype:'textfield',
					fieldLabel:'Description',
					name:'detailDesc',
				}],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('cardStatus').setValue(-1);
							this.up('form').getForm().findField('cardType').setValue(-1);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
					
					var paidListGridStore=paidListGrid.getStore();
					var params = form.getValues();
        			paidListGridStore.on('beforeload', function (paidListGridStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(paidListGridStore.proxy.extraParams, params);
        		    },this,{single: true});
        			
        			var panel = this.up('form').up('panel').up('panel').down('panel[itemId=grid]');
        			var paging = panel.getComponent('pagingtoolbar');
        			paging.moveFirst();
				}
				}]
			});
			
			
			paidListStore.on('load', function(){
		    	var total = paidListStore.getCount();//数据行数  	    	
		    	if(paidListGrid.selectAll==1){
		    		paidListGrid.selModel.setLocked(false);
					if(total>0){
						paidListGrid.selModel.selectRange(0,total-1,true);  
					}
					paidListGrid.selModel.setLocked(true);
				}else{
					paidListGrid.selModel.setLocked(false);
				}	
		    });
			
			 this.items=[{
				 region: 'center',
				 layout:'fit',
				 items:[paidListGrid]
				       
				},{
				 itemId:'search',
				 region:'east',
				 title : lanControll.getLanValue('tiSearchRecharge'),
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
