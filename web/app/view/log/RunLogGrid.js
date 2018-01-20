Ext.define('app.view.log.RunLogGrid',{
	extend:'Ext.panel.Panel',
	 requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
              'app.store.log.LogStore'
	           ],
	title:'',
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	initComponent: function() {
		var runLogStore= Ext.create("app.store.common.RunLogStore");
		this.store = runLogStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var nesGrid = Ext.create('Ext.grid.Panel', {
			border:false,
			itemId:'runLogGrid',
			columnLines:true,
			store: runLogStore, 
//			selModel: sm,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns:[{
			 			header:"domainName",
						dataIndex:"domainName",
						width:70,
						hidden:true
					},{
			 			header:"SN",
						dataIndex:"logSn",
						ulan:'snAbbr',
						width:70,
					},{
			 			header:"objectId",
						dataIndex:"objectId",
						width:70,
						hidden:true,
					},{
						header:"objectType",
						dataIndex:"objectType",
						width:70,
						hidden:true,
					},{
						header:"Time",
						dataIndex:"reportTime",
						width:160,
						renderer: function(value,metaData,record,rowIndex,store,view){
							return rs.timeFormat(value);
						}
					},{
						header:"Content",
						dataIndex:'log',
						ulan:'content',
//						flex:1,
						width:1000,
//						autoWidth:false,
//						renderer: function(value, meta, record) {
//	                        meta.style = 'overflow:auto;text-overflow:ellipsis;white-space:nowrap;white-space:normal;';   
//	                        return value;
//							meta.attr = 'style="white-space:normal;"';     
//					        return value;  
//						}
					}
			],
			listeners:{
				itemdblclick:function(view, record, item, index, e, eOpts ){
					ip.createModule('log_win');
				}
			},
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: runLogStore,
			     pageSize: 25,
			     displayInfo: true
			}]
		});

		this.tbar=[{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
						this.up('panel').down('panel[itemId=runLogGrid]').getStore().load();
	       	 		}
	       	 	}
	       	 },'->',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 ulan:'btSearch',
	       		 iconCls:'search',
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
	    }];	
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:120
			},
			items : [{
				xtype:'datefield',
				fieldLabel:'Time Begin',
				name:'timeBegin',
				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Time End',
				name:'timeEnd',
				format: 'Y-m-d',
			},{
				xtype:'numberfield',
				fieldLabel:'Object ID',
				name:'objectId',
				hidden:true,
			},{
				xtype:'numberfield',
				fieldLabel:'Object Type',
				name:'objectType',
				hidden:true,
			},{
				xtype:'textfield',
				fieldLabel:'Content',
				ulan:'content',
				name:'log',
			}],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
					}
			},{
			text : 'Search',
			ulan:'btSearch',
			handler : function() {
				var store = this.up('form').up('panel').up('panel').store;
				var form=this.up('form').getForm();
				var params = form.getValues();
				
				if(params.timeBegin){
					params.timeBegin=rs.dateSearchFormat(params.timeBegin,'Y-m-d H:i:s','begin');
				}
				if(params.timeEnd){
					params.timeEnd=rs.dateSearchFormat(params.timeEnd,'Y-m-d H:i:s','end');
				}
				Ext.apply(store.proxy.extraParams, params);
				this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
			}
			}]
		});
		var roleId = Ext.get('roleId').value;
		if(roleType.isSuper(roleId)){
			var domainName = Ext.create('Ext.form.field.Text',{
				xtype:'textfield',
				fieldLabel:'Domain Name',
				name:'domainName',
				labelWidth:120
			});
			search_grid.insert(0,domainName);
		}
		
		var store = this.store;
		var params = search_grid.getValues();
		Ext.apply(store.proxy.extraParams, params);
		this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[nesGrid]
			       
			},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 border:false,
			 width:300,
			 items:[search_grid]
		 }
		 ];
		this.callParent(arguments);		
	}	
})