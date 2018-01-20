Ext.define('app.view.systemconfig.EnumDefTypePanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	forceRefresh:0,
	initComponent: function(){
		var typeListStore= Ext.create('app.store.systemconfig.EnumDefTypeStore',{}); 
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
					{header: 'Type Name',dataIndex: 'typeName',width:200,},
					{header: 'Type Count',dataIndex: 'typeCnt',width:120}
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
						var tabpanel = typeList.up('panel').up('panel').up('panel');
						var typeName = row.get('typeName');
						var prefix = 'enumList_';
						var id=prefix+"typeName_"+typeName;
						var tipId = prefix+'enumTipId_'+typeName;
						var tab = Ext.getCmp(id);
						var params = {params : {typeName:typeName}};
						if(tab==undefined){
							tab = Ext.create('app.view.systemconfig.EnumDefListPanel',{
								id:id,
								title:typeName,
								tipId:tipId,
								prefix:prefix,
								closable:true,
							});
							tabpanel.add(tab);
							lanControll.setLan(tab);
						};
						var typeName1=tab.down('textfield[name=typeName1]');
						typeName1.setValue(typeName);
						typeName1.setReadOnly(true);
						typeName1.setFieldStyle("background:#DFE9F6");
						
//						var causeDescListGrid=tab.down('panel').down('panel').store
	        			var enumStore=tab.down('panel').down('panel').store;
	        			if(enumStore.beforeload_fn != undefined){
	        				enumStore.removeListener('beforeload',enumStore.beforeload_fn);
	        			}
	        			var beforeload_fn = function (enumStore, options) {
	        				var params = {typeName:typeName};
	        				Ext.apply(enumStore.proxy.extraParams, params);
	        			}
	        			enumStore.beforeload_fn = beforeload_fn;
	        			enumStore.on('beforeload', beforeload_fn);
	        			enumStore.load();
//						tab.down('panel').down('panel').store.load(params);
						tab.show();
					
				}						
		},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items:[{
					xtype : 'button',
					text : 'Add Enum Type',
					iconCls : 'add',
					flag:"super_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							
							var addEnumDef = Ext.getCmp('addEnumDef');
							var componentId=typeList.id;
							if(addEnumDef==undefined){
								addEnumDef=Ext.create('app.view.systemconfig.AddEnumDef');
								lanControll.setLan(addEnumDef);
							}
							addEnumDef.runProc(true);
							addEnumDef.down('form').getForm().reset();
							addEnumDef.down('form').getForm().findField('componentId').setValue(componentId);
							var tn=addEnumDef.down('form').getForm().findField('typeName');
							tn.setValue("");
//							tn.setFieldStyle("background:#FFF");
//							tn.setReadOnly(false);
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
							this.up('panel').store.load();
		       	 		}
		       	 	}
		       	 },'->',{
		       		 xtype:'button',
		       		 text:'Search',
		       		ulan:'btSearch',
		       		 iconCls:'search',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
		       		 		var eastSearch=this.up('panel').up('panel').up('panel').down('panel[itemId=enumtype_east_search]');
		       		 		if(eastSearch.isHidden()){
		       		 			eastSearch.expand();
		       		 		}else{
		       		 			eastSearch.collapse();
		       		 		}
		       	 		}
		       	 	}
				}]
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
			items : [ {
				xtype:'textfield',
				fieldLabel:'Enum Types',
				name:'typeName1',
			}, {
				xtype:'hiddenfield',
				name:'typeName',
			}],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:"super_read",
					handler : function() {
						var form=this.up('form').getForm().reset();
					}
			},{
				text : 'Search',
				flag:"super_read",
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
        		    var typeListStore=typeList.getStore();
        		    var typeName1=form.findField('typeName1');
        		    var typeName=form.findField('typeName');
        		    if(typeName1.getValue()!=''){
        		    	typeName.setValue('%'+typeName1.getValue()+'%');
        		    }
					var params = form.getValues();
					typeListStore.on('beforeload', function (typeListStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(typeListStore.proxy.extraParams, params);
        		    },this,{single: true});
					typeListStore.load();
						
				}
			}]
		});
		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[typeList]
			},{
			 itemId:'enumtype_east_search',
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
			grid.store.load();
		}
	}
}	
});