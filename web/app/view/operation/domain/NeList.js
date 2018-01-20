Ext.define('app.view.operation.domain.NeList',{
	extend:'Ext.panel.Panel',
	 requires: [
               'Ext.util.Format',
               'Ext.grid.Panel',
	           ],
	layout:'border',
	treeId:'',
	forceRefresh:0,
	initComponent: function() {
		this.createView();
		this.callParent(arguments);		
	},
	listeners: {
	    activate: function(tab){
//			var grid=tab.down('panel').down('panel');
//			if(tab.forceRefresh==1){
//				tab.forceRefresh=0;
//				var page=grid.getComponent('pagingtoolbar');
//				page.moveFirst();
//			}
		}
	},
	createView:function(){
		this.createGridStore();
		this.createTbar();
		this.createItems();
	},
	createGridStore:function(){
		this.gridStore = Ext.create("app.store.operation.domain.roamzone.site.NesInSiteStore",{});
	},
	createTbar:function(){
		var setting = Ext.create("Ext.button.Button",{
			text: 'Setting',
			iconCls: 'option',
			ulan:'btSetting',
			flag:"domain_edit",
			listeners:{
				click:function(){
					var grid = this.up('panel').down("panel[itemId=grid]");
					if (!grid.getSelectionModel().hasSelection()){
   		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
   		 				return;
					}
					var records= grid.getSelectionModel().getSelection();
					var ids="";
					var alias = "";
					for ( var i = 0; i < records.length; i++) {
						if(i==0){
							ids=records[i].get('uuid');
							alias = records[i].get('alias');
						}else {
							cnt=1;
							ids=ids+","+records[i].get('uuid');
						}
					}
					var tab = Ext.getCmp("updateSipServer");
					if(tab == undefined){
						tab = Ext.create("app.view.operation.domain.UpdateSipServer",{});
						lanControll.setLan(tab);
					}
					if(records.length == 1){
						var bForm = tab.down('form').getForm();
						bForm.findField('sipsrvLockFlag').setValue(records[0].get('sipsrvLockFlag'));
						bForm.findField('primarySipServer').setValue(records[0].get('primarySipServer'));
						bForm.findField('primarySipsrvPort').setValue(records[0].get('primarySipsrvPort'));
						bForm.findField('secondarySipServer').setValue(records[0].get('secondarySipServer'));
						bForm.findField('secondarySipsrvPort').setValue(records[0].get('secondarySipsrvPort'));
					}
					tab.down('form').getForm().findField('ids').setValue(ids);
					tab.down('form').getForm().findField('neAlias').setValue(alias);
					tab.show();
				}
			}
		});
		
		var selectAll = Ext.create("Ext.button.Button",{
      		text: 'SelectAll',
       		iconCls: 'selectAll',
       		ulan:'btSelectAll',
       		flag:"domain_read",
			listeners:{
				click:function(){
					var grid = this.up('panel').down("panel[itemId=grid]");
       		 		if(grid.getSelectionModel().hasSelection()){
       		 			grid.getSelectionModel().deselectAll();  
	       		 	}else{
	       		 		grid.getSelectionModel().selectAll();
	       		 	}
				}
			}
		});
		var Refresh = Ext.create("Ext.button.Button",{
      		text:'Refresh',
      		ulan:'btRefresh',
       		iconCls:'refresh2',
       		flag:"domain_read",
			listeners:{
				click:function(){
					var grid = this.up('panel').down("panel[itemId=grid]");
					grid.getStore().load();
				}
			}
		});
		var Search = Ext.create("Ext.button.Button",{
      		text:'Search',
      		ulan:'btSearch',
       		iconCls:'search',
       		flag:"domain_read",
			listeners:{
				click:function(){
			 		var eastSearch=this.up('panel').down("panel[region=east]");
	   		 		if(eastSearch.isHidden()){
	   		 			eastSearch.expand();
	   		 		}else{
	   		 			eastSearch.collapse();
	   		 		}
				}
			}
		});
		this.tbar = [setting,'-',selectAll,'-',Refresh,'->',Search];
	},
	createGridPagingtoolbar:function(){
		return Ext.create('Ext.toolbar.Paging',{
		     store: this.gridStore,
		     pageSize: 25,
		     displayInfo: true,
		});
	},
	createGridColumns:function(){
		
		return [
		        {header: 'uuid', dataIndex: 'uuid',hidden:true},
		         {header: 'Device SN',sortable:false, dataIndex: 'productSnStr',ulan:'productSn',width:170},
		         {header: 'Alias', dataIndex: 'alias',width:120},
		         {header: 'Admin Status', dataIndex: 'adminStatus',width:120,
						renderer:function(val){  
							return rs.adminStatus(val);
						 }
				},
				{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',width:120,hidden:true,
					renderer:function(val){  
						return rs.oprStatus(val);
					} 
				},
				{header: 'Run Status', dataIndex: 'runStatus',width:120,
					renderer:function(val){  
						return rs.runStatus(val);
					} 
				},
				{header: 'Device Model', dataIndex: 'productName', width:120,hidden:true},
		         {header:'SIP Server Lock',dataIndex:'sipsrvLockFlag',width:120,
		        	 renderer:function(val){  
						return rs.sipsrvLockFlag(val);
					 }
		         },
		         {header:'Primary SIP Server',dataIndex:'primarySipServer',width:200},
		         {header:'Primary Port',dataIndex:'primarySipsrvPort',width:90},
		         {header:'Secondary SIP Server',dataIndex:'secondarySipServer',width:200},
		         {header:'Secondary Port',dataIndex:'secondarySipsrvPort',width:80},      
		         {header: 'domainUuid', dataIndex: 'domainUuid', hidden:true},  
				];
	},
	createGridPanel:function(){
		var sm = Ext.create('Ext.selection.CheckboxModel');	
		return Ext.create('Ext.grid.Panel', {
			border:false,
			autoScroll:true,
			columnLines:true,
			store: this.gridStore,
			itemId:'grid',
			selModel: sm,
			columns: this.createGridColumns(),
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){			
	    			var ot=Ext.getCmp('operationTree');
	    			var uuid=row.get('uuid');
	    			var rootNode=ot.getRootNode();
	    			var node=rootNode.findChild('nid','nes_'+uuid,true);	    			
	    			ot.fireEvent('itemclick',null,node);
				}						
			},	 	
			bbar:this.createGridPagingtoolbar(),
		});
	},
	createSearchPanel:function(){
		return Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
				margins : '0 0 10 0'
			},
			fieldDefaults: {
		        labelAlign: 'left',
		        labelWidth: 150
		    },
			items : [{
				xtype: 'combo',
				mode: 'local',
				name:'productIds',
				ulan:'deviceType',
				editable:false,
				fieldLabel: 'Device Type',
				displayField: 'name',
				valueField: 'value',
				queryMode: 'local',
				value:'17,18,20,21,22,23',
				store: Ext.create('Ext.data.Store', {
					fields : ['name', 'value'],
					data   : [
					    {name : '-SELECT-',   value:'17,18,20,21,22,23'},
						{name : 'AG',   value: '17,18'},
						{name : 'WG',  value: '20,21,22,23'}
					]
				})
			},{
				xtype:'textfield',
				fieldLabel:'Product Sn',
				ulan:'productSn',
				name:'productSnStr',
			},{
				xtype:'textfield',
				fieldLabel:'Alias',
				name:'alias',
			}, rs.createSipLockedFlag('sipsrvLockFlag',{labelWidth:150}),{
				xtype:'textfield',
				fieldLabel:'Primary SIP Server',
				name:'primarySipServer',
			},{
				xtype:'textfield',
				fieldLabel:'Primary Port',
				name:'primarySipsrvPort',
			},{
				xtype:'textfield',
				fieldLabel:'Secondary SIP Server',
				name:'secondarySipServer',
			},{
				xtype:'textfield',
				fieldLabel:'Secondary Port',
				name:'secondarySipsrvPort',
			}],
			
			buttons : [ {
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
//						this.up('form').up('panel').collapse();
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('productIds').setValue('17,18,20,21,22,23');
						this.up('form').getForm().findField('sipsrvLockFlag').setValue(-1);
					}
			}, {
			text : 'Search',
			ulan:'btSearch',
			handler : function() {
				var panel = this.up('form').up('panel').up('panel');
				var gridStore=panel.gridStore;				
				var form=this.up('form').getForm();
				var params = form.getValues();
				Ext.apply(gridStore.proxy.extraParams, params);
				var paging = panel.down("pagingtoolbar");
				paging.moveFirst();
			}
			}]
		});		
	},
	createItems:function(){
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 items:this.createGridPanel()						       
			},{
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:320,
			 items:this.createSearchPanel()
			}
		 ];
	},
});
