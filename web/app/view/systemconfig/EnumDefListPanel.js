Ext.define('app.view.systemconfig.EnumDefListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	forceRefresh:0,
	initComponent: function(){
		var typeListStore= Ext.create('app.store.systemconfig.EnumDefListStore',{}); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var typeList=Ext.create('Ext.grid.Panel',{
			title:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			selModel: sm,
			store: typeListStore, 
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true,flex:1},
					{header: 'Type Name',dataIndex: 'typeName',width:250,},
					{header: 'Enum Id',dataIndex: 'enumId',width:120},
					{header: 'Enum Value',dataIndex: 'enumValue',width:250}
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
				}						
			},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items:[{
					xtype : 'button',
					text : 'Add Enum',
					iconCls : 'add',
					flag:"super_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							var _typeName="";
							if(this.up('panel').up('panel').up('panel').id=='enumDefListGrid'){
								if(!this.up('panel').getSelectionModel().hasSelection()){
									Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
									return;
								}
								var records = this.up('panel').getSelectionModel().getSelection();
								if(records.length != 1){
									Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
									return;
								}
								 _typeName=records[0].get('typeName');
							}else{
								 _typeName=this.up('panel').store.getAt(0).get('typeName');
							}
							var addEnumDef = Ext.getCmp('addEnumDef');
							var componentId=typeList.id;
							
							if(addEnumDef==undefined){
								addEnumDef=Ext.create('app.view.systemconfig.AddEnumDef');
								lanControll.setLan(addEnumDef);
							}
							addEnumDef.runProc(false);
							addEnumDef.down('form').getForm().reset();
							addEnumDef.down('form').getForm().findField('componentId').setValue(componentId);
							var tn=addEnumDef.down('form').getForm().findField('typeName');
							tn.setValue(_typeName);
//							tn.setFieldStyle("background:#DFE9F6");
//							tn.setReadOnly(true);
							addEnumDef.show();
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
		        		    var page=typeList.down('pagingtoolbar');
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
		       		 		var eastSearch=this.up('panel').up('panel').up('panel').down('panel[itemId=enumdef_east_search]');
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
		     store: typeListStore ,
		     displayInfo: true,
		     
		}],	
			
		});
		typeList.addListener("afterlayout",function(){
			privilege.procPrivilege(typeList);
		},this,{single:true});
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
			items: [{
				xtype:'textfield',
				fieldLabel:'Enum Type',
				name:'typeName1',
			}, {
				xtype:'hiddenfield',
				name:'typeName',
			},{
				xtype:'numberfield',
				fieldLabel:'Enum Id',
				name:'enumId',
			},{
				xtype:'textfield',
				fieldLabel:'Enum Value',
				name:'enumValue',
			}
	        ],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:"super_read",
					handler : function() {
						var tabId=search_grid.up('panel').up('panel').id;
						var form=this.up('form').getForm();
						if(tabId!='enumDefListGrid'){
							var typeName=form.findField('typeName1').getValue();
							form.reset();
							form.findField('typeName').setValue(typeName);
							form.findField('typeName1').setValue(typeName);
						}else{
							form.reset();
						}
					}
			},{
				text : 'Search',
				flag:"super_read",
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
					var typeName1=form.findField('typeName1');
        		    var typeName=form.findField('typeName');
        		    var tabId=search_grid.up('panel').up('panel').id;
        		    if(typeName1.getValue()!=''&& tabId=='enumDefListGrid'){
        		    	typeName.setValue('%'+typeName1.getValue()+'%');
        		    }else{
        		    	typeName.setValue(typeName1.getValue());
        		    }
        		    var typeListStore=typeList.getStore();
					var params = form.getValues();
					typeListStore.on('beforeload', function (typeListStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(typeListStore.proxy.extraParams, params);
        		    },this,{single: true});
					var page=typeList.down('pagingtoolbar');
					page.moveFirst();
				}
			}]
		});
		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[typeList]
			},{
			 itemId:'enumdef_east_search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:300,
			 items:[search_grid]
		 }];
		
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