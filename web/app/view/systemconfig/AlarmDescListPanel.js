Ext.define('app.view.systemconfig.AlarmDescListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	initComponent: function(){
		var alarmListStore= Ext.create('app.store.systemconfig.AlarmDescStore',{}); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		
		var alarmList=Ext.create('Ext.grid.Panel',{
			title:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			selModel: sm,
			store: alarmListStore,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true},
					{header: 'Alarm Id',dataIndex: 'alarmId',width:120,},
					{header: 'Alarm Name',dataIndex: 'alarmName',width:120},
					{header: 'Alarm Level',dataIndex: 'alarmLevel',width:140,
						renderer:function(value,metaData,record,rowIndex,store,view){
	    				return alarmObject.getAlarmLevel(value,metaData,record,rowIndex,store,view,null);
					}
					},
				    {header: 'Alarm Type',dataIndex: 'alarmType',
				    	renderer: function(value,metaData,record,rowIndex,store,view){
			    			return rs.alarmType(record.get('alarmType'));
			    		}
				    },
					{header: 'Filter Period', dataIndex: 'timeCheckMax',minWidth:120},
					{header: 'alarmDesc',dataIndex: 'alarmDesc',ulan:'null'},
					{header: '告警描述',dataIndex: 'alarmDescCn',ulan:'null'}
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
						var rec=row;
						
		   		 		var updateAlarm = Ext.getCmp('updateAlarmDesc');
						var componentId=alarmList.id;
						if(updateAlarm==undefined){
							updateAlarm=Ext.create('app.view.systemconfig.UpdateAlarmDesc');
							lanControll.setLan(updateAlarm);
						}
						updateAlarm.down('form').getForm().findField('componentId').setValue(componentId);
						updateAlarm.down('form').getForm().findField('uuid').setValue(rec.get('uuid'));
						var alarmId=updateAlarm.down('form').getForm().findField('alarmId');
						alarmId.setReadOnly(true);
						alarmId.setFieldStyle("background:#DFE9F6");
						alarmId.setValue(rec.get('alarmId'));
						updateAlarm.alarmName=rec.get('alarmName');
						updateAlarm.down('form').getForm().findField('alarmName').setValue(rec.get('alarmName'));
						updateAlarm.down('form').getForm().findField('alarmLevel').setValue(rec.get('alarmLevel'));
						updateAlarm.down('form').getForm().findField('alarmDesc').setValue(rec.get('alarmDesc'));
						updateAlarm.down('form').getForm().findField('alarmDescCn').setValue(rec.get('alarmDescCn'));
						updateAlarm.down('form').getForm().findField('timeCheckMax').setValue(rec.get('timeCheckMax'));
						updateAlarm.down('form').getForm().findField('alarmType').setValue(rec.get('alarmType'));
						updateAlarm.show();
		    			
				}		
			 			
			},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items:[{
					xtype : 'button',
					text : 'Add Alarm',
					iconCls : 'add',
					flag:"super_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							
							var addAlarm = Ext.getCmp('addAlarmDesc');
							var componentId=alarmList.id;
							if(addAlarm==undefined){
								addAlarm=Ext.create('app.view.systemconfig.AddAlarmDesc');
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
							
							var records=alarmList.getSelectionModel().getSelection();
							if(alarmList.getSelectionModel().hasSelection()&&records.length==1){
								
								var rec=records[0];
								
			       		 		var updateAlarm = Ext.getCmp('updateAlarmDesc');
								var componentId=alarmList.id;
								if(updateAlarm==undefined){
									updateAlarm=Ext.create('app.view.systemconfig.UpdateAlarmDesc');
									lanControll.setLan(updateAlarm);
								}
								updateAlarm.down('form').getForm().findField('componentId').setValue(componentId);
								updateAlarm.down('form').getForm().findField('uuid').setValue(rec.get('uuid'));
								var alarmId=updateAlarm.down('form').getForm().findField('alarmId');
								alarmId.setReadOnly(true);
								alarmId.setFieldStyle("background:#DFE9F6");
								alarmId.setValue(rec.get('alarmId'));
								updateAlarm.alarmName=rec.get('alarmName');
								updateAlarm.down('form').getForm().findField('alarmName').setValue(rec.get('alarmName'));
								updateAlarm.down('form').getForm().findField('alarmLevel').setValue(rec.get('alarmLevel'));
								updateAlarm.down('form').getForm().findField('alarmDesc').setValue(rec.get('alarmDesc'));
								updateAlarm.down('form').getForm().findField('timeCheckMax').setValue(rec.get('timeCheckMax'));
								updateAlarm.down('form').getForm().findField('alarmType').setValue(rec.get('alarmType'));
								updateAlarm.down('form').getForm().findField('alarmDescCn').setValue(rec.get('alarmDescCn'));
								updateAlarm.show();
			        			
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
		        		    var page=alarmList.down('pagingtoolbar');
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
		       		 		var eastSearch=Ext.getCmp("alarmDesc_east_search");
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
			     store: alarmListStore ,
			     displayInfo: true,
			     
			}],	
			
		});
		alarmList.addListener("afterlayout",function(){
			privilege.procPrivilege(alarmList);
		},this,{single:true});
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
			items : [ {
				xtype:'textfield',
				fieldLabel:'Alarm Id',
				name:'alarmId',
			},{
				xtype:'textfield',
				fieldLabel:'Alarm Name',
				name:'alarmName',
			},{

	            xtype: 'combo',
	            name: 'alarmLevel',
	            fieldLabel: 'Alarm Level',
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
						name : 'EMERG',
						statusId :0
					}, {
						name : 'ALERT',
						statusId :1
					}, {
						name : 'CRIT',
						statusId :2
					}, {
						name : 'ERR',
						statusId :3
					}, {
						name : 'WARNING',
						statusId :4
					}, {
						name : 'NOTICE',
						statusId :5
					}, {
						name : 'INFO',
						statusId :6
//					}, {
//						name : 'DEBUG',
//						statusId :7
					}, {
						name : 'DISABLED',
						statusId :8
					} ]
				}),
				
	        
			},{
				xtype:'textfield',
				fieldLabel:'Description',
				name:'alarmDesc',
			}
	        ],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:"super_read",
					handler : function() {
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('alarmLevel').setValue(-1);
						
					}
			},{
				text : 'Search',
				ulan:'btSearch',
				flag:"super_read",
				handler : function() {
					var form=this.up('form').getForm();
        		    var alarmListStore=alarmList.getStore();
					var params = form.getValues();
					alarmListStore.on('beforeload', function (alarmListStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(alarmListStore.proxy.extraParams, params);
        		    },this,{single: true});
					var page=alarmList.down('pagingtoolbar');
					page.moveFirst();
				}
			}]
		});
		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[alarmList]
			},{
			 id:'alarmDesc_east_search',
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