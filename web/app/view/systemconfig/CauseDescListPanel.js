Ext.define('app.view.systemconfig.CauseDescListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	initComponent: function(){
		var causeListStore= Ext.create('app.store.systemconfig.CauseDescStore',{}); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var columns = [
						{header: 'Uuid',dataIndex: 'uuid',hidden:true},
						{header: 'Cause Id',dataIndex: 'causeId',width:120,},
						{header: 'Cause Name',dataIndex: 'causeName',width:120}
		               ];
//		var isCn = lanControll.isCn();
		columns.push({header: 'causeDesc',dataIndex: 'causeDesc',ulan:'null'});
		columns.push({header: '原因描述',dataIndex: 'causeDescCn',ulan:'null'});
		var causeList=Ext.create('Ext.grid.Panel',{
			title:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			selModel: sm,
			store: causeListStore, 
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: columns,
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
					var rec=row;
					
	   		 		var updateCauseDesc = Ext.getCmp('updateCauseDesc');
					var componentId=causeList.id;
					if(updateCauseDesc==undefined){
						updateCauseDesc=Ext.create('app.view.systemconfig.UpdateCauseDesc');
						lanControll.setLan(updateCauseDesc);
					}
					updateCauseDesc.down('form').getForm().findField('componentId').setValue(componentId);
					updateCauseDesc.down('form').getForm().findField('uuid').setValue(rec.get('uuid'));
					var causeId=updateCauseDesc.down('form').getForm().findField('causeId');
					causeId.setReadOnly(true);
					causeId.setFieldStyle("background:#DFE9F6");
					causeId.setValue(rec.get('causeId'));
					updateCauseDesc.causeName=rec.get('causeName');
					updateCauseDesc.down('form').getForm().findField('causeName').setValue(rec.get('causeName'));
					updateCauseDesc.down('form').getForm().findField('causeDesc').setValue(rec.get('causeDesc'));
					updateCauseDesc.down('form').getForm().findField('causeDescCn').setValue(rec.get('causeDescCn'));
					updateCauseDesc.show();
			    			
					
				}		
			},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items:[{
					xtype : 'button',
					text : 'Add Cause',
					iconCls : 'add',
					flag:"super_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							
							var addCause = Ext.getCmp('addCauseDesc');
							var componentId=causeList.id;
							if(addCause==undefined){
								addCause=Ext.create('app.view.systemconfig.AddCauseDesc');
								lanControll.setLan(addCause);
							}
							addCause.down('form').getForm().findField('componentId').setValue(componentId);
							addCause.show();
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
							
							var records=causeList.getSelectionModel().getSelection();
							if(causeList.getSelectionModel().hasSelection()&&records.length==1){
								
								var rec=records[0];
								
			       		 		var updateCauseDesc = Ext.getCmp('updateCauseDesc');
								var componentId=causeList.id;
								if(updateCauseDesc==undefined){
									updateCauseDesc=Ext.create('app.view.systemconfig.UpdateCauseDesc');
									lanControll.setLan(updateCauseDesc);
								}
								updateCauseDesc.down('form').getForm().findField('componentId').setValue(componentId);
								updateCauseDesc.down('form').getForm().findField('uuid').setValue(rec.get('uuid'));
								var causeId=updateCauseDesc.down('form').getForm().findField('causeId');
								causeId.setReadOnly(true);
								causeId.setFieldStyle("background:#DFE9F6");
								causeId.setValue(rec.get('causeId'));
								updateCauseDesc.causeName=rec.get('causeName');
								var causeDesc = rec.get('causeDesc');
								if(lanControll.isCn()){
									causeDesc = rec.get('causeDescCn');
								}
								updateCauseDesc.down('form').getForm().findField('causeName').setValue(rec.get('causeName'));
								updateCauseDesc.down('form').getForm().findField('causeDesc').setValue(rec.get('causeDesc'));
								updateCauseDesc.down('form').getForm().findField('causeDescCn').setValue(rec.get('causeDescCn'));
								updateCauseDesc.show();
			        			
		   		 			}else{
		   		 				Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
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
		        		    var page=causeList.down('pagingtoolbar');
		        		    page.moveFirst();
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
		       		 		var eastSearch=Ext.getCmp("causeDesc_east_search");
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
			     store: causeListStore ,
			     displayInfo: true,
			     
			}],	
			
		});
		causeList.addListener("afterlayout",function(){
			privilege.procPrivilege(causeList);
		},this,{single:true});
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
			items : [ {
				xtype:'textfield',
				fieldLabel:'Cause Id',
				name:'causeId',
			},{
				xtype:'textfield',
				fieldLabel:'Cause Name',
				name:'causeName',
			},{
				xtype:'textfield',
				fieldLabel:'Description',
				name:'causeDesc',
			}
	        ],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:"super_read",
					handler : function() {
						this.up('form').getForm().reset();
					}
			},{
				text : 'Search',
				flag:"super_read",
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
        		    var causeListStore=causeList.getStore();
					var params = form.getValues();
					causeListStore.on('beforeload', function (causeListStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(causeListStore.proxy.extraParams, params);
        		    },this,{single: true});
					var page=causeList.down('pagingtoolbar');
					page.moveFirst();
				}
			}]
		});
		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[causeList]
			},{
			 id:'causeDesc_east_search',
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