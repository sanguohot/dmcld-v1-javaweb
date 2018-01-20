Ext.define('app.view.systemconfig.ObjectTypeListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	initComponent: function(){
		var objectTypeListStore= Ext.create('app.store.systemconfig.ObjectTypeStore',{}); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		
		var objectTypeList=Ext.create('Ext.grid.Panel',{
			title:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			selModel: sm,
			store: objectTypeListStore, 
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true,flex:1},
					{header: 'Object Type Id',dataIndex: 'objectTypeId',width:120,},
					{header: 'Name',dataIndex: 'name',width:120},
					{header: 'Description',dataIndex: 'detailDesc',flex:1},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
					var rec=row;
					
	   		 		var updateObjectType = Ext.getCmp('updateObjectType');
					var componentId=objectTypeList.id;
					if(updateObjectType==undefined){
						updateObjectType=Ext.create('app.view.systemconfig.UpdateObjectType');
						lanControll.setLan(updateObjectType);
					}
					updateObjectType.down('form').getForm().findField('componentId').setValue(componentId);
					updateObjectType.down('form').getForm().findField('uuid').setValue(rec.get('uuid'));
					var objectTypeId=updateObjectType.down('form').getForm().findField('objectTypeId');
					objectTypeId.setReadOnly(true);
					objectTypeId.setFieldStyle("background:#DFE9F6");
					objectTypeId.setValue(rec.get('objectTypeId'));
					updateObjectType.objectTypeName=rec.get('name');
					updateObjectType.down('form').getForm().findField('name').setValue(rec.get('name'));
					updateObjectType.down('form').getForm().findField('detailDesc').setValue(rec.get('detailDesc'));
					updateObjectType.show();
		    			
				}
					
			},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items:[{
					xtype : 'button',
					text : 'Add Object Type',
					iconCls : 'add',
					flag:"super_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							
							var addAlarm = Ext.getCmp('addObjectType');
							var componentId=objectTypeList.id;
							if(addAlarm==undefined){
								addAlarm=Ext.create('app.view.systemconfig.AddObjectType');
								lanControll.setLan(addAlarm);
							}
							addAlarm.down('form').getForm().findField('componentId').setValue(componentId);
							addAlarm.show();
						}
					}
				},'-',{
					xtype : 'button',
					text : 'Setting',
					iconCls : 'option',
					flag:"super_edit",
					ulan:'btSetting',
					listeners : {
						click : function() {
							
							var records=objectTypeList.getSelectionModel().getSelection();
							if(objectTypeList.getSelectionModel().hasSelection()&&records.length==1){
								
								var rec=records[0];
								
			       		 		var updateObjectType = Ext.getCmp('updateObjectType');
								var componentId=objectTypeList.id;
								if(updateObjectType==undefined){
									updateObjectType=Ext.create('app.view.systemconfig.UpdateObjectType');
									lanControll.setLan(updateObjectType);
								}
								updateObjectType.down('form').getForm().findField('componentId').setValue(componentId);
								updateObjectType.down('form').getForm().findField('uuid').setValue(rec.get('uuid'));
								var objectTypeId=updateObjectType.down('form').getForm().findField('objectTypeId');
								objectTypeId.setReadOnly(true);
								objectTypeId.setFieldStyle("background:#DFE9F6");
								objectTypeId.setValue(rec.get('objectTypeId'));
								updateObjectType.objectTypeName=rec.get('name');
								updateObjectType.down('form').getForm().findField('name').setValue(rec.get('name'));
								updateObjectType.down('form').getForm().findField('detailDesc').setValue(rec.get('detailDesc'));
								updateObjectType.show();
			        			
		   		 			}else{
		   		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		   		 				return;
		   		 			}
						}
					}
				},'-',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
		        		    var page=objectTypeList.down('pagingtoolbar');
		        		    page.moveFirst();
		       	 		}
		       	 	}
		       	 },'->',{
		       		 xtype:'button',
		       		 text:'Search',
		       		 iconCls:'search',
		       		ulan:'btSearch',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
		       		 		var eastSearch=Ext.getCmp("objectType_east_search");
		       		 		if(eastSearch.isHidden()){
		       		 			eastSearch.expand();
		       		 		}else{
		       		 			eastSearch.collapse();
		       		 		}
		       	 		}
		       	 	}
				}]
			},{
				itemId:'pagingtoolbar',
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: objectTypeListStore ,
			     displayInfo: true,
			     
			}],	
			
		});		
		objectTypeList.addListener("afterlayout",function(){
			privilege.procPrivilege(objectTypeList);
		},this,{single:true});
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
			items : [ {
				xtype:'textfield',
				fieldLabel:'Object Type Id',
				name:'objectTypeId',
			},{
				xtype:'textfield',
				fieldLabel:'Name',
				name:'name',
			},{
				xtype:'textfield',
				fieldLabel:'Description',
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
					var form=this.up('form').getForm();
        		    var objectTypeListStore=objectTypeList.getStore();
					var params = form.getValues();
					objectTypeListStore.on('beforeload', function (objectTypeListStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(objectTypeListStore.proxy.extraParams, params);
        		    },this,{single: true});
					var page=objectTypeList.down('pagingtoolbar');
					page.moveFirst();
				}
			}]
		});
		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[objectTypeList]
			},{
			 id:'objectType_east_search',
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