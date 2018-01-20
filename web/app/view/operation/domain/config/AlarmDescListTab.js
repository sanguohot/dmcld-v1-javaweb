Ext.define('app.view.operation.domain.config.AlarmDescListTab',{
		extend:'Ext.panel.Panel',
		layout:'border',
		treeId:'',
		forceRefresh:0,
		toolbars:0,
		initComponent: function() {
			var gridStore= Ext.create('app.store.operation.domain.config.AlarmDescSettingStore', {}); 
			
			var sm = Ext.create('Ext.selection.CheckboxModel');		
			var grid = Ext.create('Ext.grid.Panel', {
				itemId:'grid',
				border:false,
				autoScroll:true,
				columnLines:true,
				store: gridStore, 
				selModel: sm,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
				        {header: 'uuid', dataIndex: 'uuid', hidden:true},
				        {header: 'Alarm Id',  dataIndex: 'alarmId',  width:120},
						{header: 'Alarm Name',  dataIndex: 'alarmName',width:140},
						{header: 'Alarm Level', dataIndex: 'alarmLevel',width:140,
							renderer:function(val){
							var tmp = '<div class="avgCpu5Cls">&nbsp;&nbsp'+rs.alarmLevel(val)+'</div>';
								return tmp;
							 }
						},
					    {header: 'Alarm Type',dataIndex: 'alarmType',minWidth:120,
					    	renderer: function(value,metaData,record,rowIndex,store,view){
				    			return rs.alarmType(record.get('alarmType'));
				    		}
					    },	
						{header: 'Domain Alarm Id', dataIndex: 'taddAlarmId', width:140,hidden:true},
				        {header: 'Domain Alarm Name', dataIndex: 'taddAlarmName',width:120},
				        {header: 'Domain Alarm Level', dataIndex: 'taddAlarmLevel',width:160,
				        	renderer:function(val){ 
								return rs.alarmLevel(val);
							} 
				        },
				        {header: 'Domain Filter Period', dataIndex: 'taddTimeCheckMax',minWidth:120},
						{header: 'Alarm Desc', dataIndex: 'alarmDesc',minWidth:120,hidden:true},
						{header: 'Domain Alarm Desc', dataIndex: 'taddAlarmDesc', hidden:true},
						{header:'Domain Alarm Uuid',dataIndex:'taddUuid',hidden:true},
						{header:'domainUuid',dataIndex:'domainUuid',hidden:true},
				],
				listeners:{
					itemdblclick: function(grid, row, columnindex,e){

					var alarmId=0;
					var alarmName="";
					var alarmLevel=-1;
					var taddUuid=0;
					var domainUuid=Ext.getCmp('config_alarm').domainUuid;
					
					alarmName=row.get('taddAlarmName');
					alarmLevel=row.get('taddAlarmLevel');
					
					taddUuid=row.get('taddUuid');
					alarmId=row.get('alarmId');
					if(alarmName==""){
						alarmName=row.get('alarmName');
					}
					if(alarmLevel==-1){
						alarmLevel=row.get('alarmLevel');
					}
					
					
					var tab = Ext.getCmp("alarmSetting");
					if(tab == undefined){
						tab = Ext.create("app.view.operation.domain.config.AlarmSetting",{id:'alarmSetting'});
						lanControll.setLan(tab);
					}
					tab.down('form').getForm().findField('taddUuid').setValue(taddUuid);
					tab.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					tab.down('form').getForm().findField('alarmId').setValue(alarmId);
					tab.down('form').getForm().findField('alarmId').setReadOnly(true);
					tab.down('form').getForm().findField('alarmId').setFieldStyle("background:#DFE9F6");
					tab.down('form').getForm().findField('taddAlarmName').setValue(alarmName);
					tab.down('form').getForm().findField('taddAlarmLevel').setValue(alarmLevel);
					tab.down('form').getForm().findField('componentId').setValue(this.up('panel').id);
					tab.show();
				
	        			
					}						
				},
			dockedItems:[{

			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: gridStore,
			     pageSize: 25,
			     displayInfo: true,
			}]
		});

			this.tbar=[{

		 			text: 'Setting',
		 			iconCls: 'option',
		 			flag:"domain_edit",
		 			ulan:'btSetting',
		 			listeners:{
		 				click:function(){
		 					var grid = this.up('panel').down("panel[itemId=grid]");
		 					if (!grid.getSelectionModel().hasSelection() || grid.getSelectionModel().getSelection().length>1){
		    		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		    		 				return;
		 					}
		 					var records= grid.getSelectionModel().getSelection();
		 					var ids="";
		 					var alarmId=0;
		 					var alarmName="";
		 					var alarmLevel=-1;
		 					var taddUuid=0;
		 					var domainUuid=Ext.getCmp('config_alarm').domainUuid;
		 				
		 					for ( var i = 0; i < records.length; i++) {
		 						if(i==0){
		 							ids=records[i].get('uuid');
		 							taddUuid=records[i].get('taddUuid');
		 							alarmId=records[i].get('alarmId');
		 							alarmName=records[i].get('alarmName');
		 							alarmLevel=records[i].get('alarmLevel');
		 						}else {
		 							cnt=1;
		 							ids=ids+"-"+records[i].get('uuid');
		 						}
		 					}
		 					
		 					var tab = Ext.getCmp("alarmSetting");
		 					if(tab == undefined){
		 						tab = Ext.create("app.view.operation.domain.config.AlarmSetting",{id:'alarmSetting'});
		 						lanControll.setLan(tab);
		 					}
		 					tab.down('form').getForm().findField('taddUuid').setValue(taddUuid);
		 					tab.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		 					tab.down('form').getForm().findField('alarmId').setValue(alarmId);
		 					tab.down('form').getForm().findField('alarmId').setReadOnly(true);
		 					tab.down('form').getForm().findField('alarmId').setFieldStyle("background:#DFE9F6");
		 					tab.down('form').getForm().findField('taddAlarmName').setValue(alarmName);
		 					tab.down('form').getForm().findField('taddAlarmLevel').setValue(alarmLevel);
		 					tab.down('form').getForm().findField('ids').setValue(ids);
		 					tab.down('form').getForm().findField('alarmType').setValue(records[0].get('alarmType'));
		 					tab.down('form').getForm().findField('componentId').setValue(this.up('panel').id);
		 					tab.show();
		 				}
		 			}
		 		
		       	 },,'-',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		 ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
		       		 listeners:{
		       		 	click:function(){
	       		 			var grid = this.up('panel').down("panel[itemId=grid]");
	       		 			grid.down('pagingtoolbar').moveFirst();
		       	 		}
		       	 	}
		       	 },'->',{
		       		 xtype:'button',
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
		    }];
			
			var search_grid=Ext.create('Ext.form.Panel',{
				border : false,
				bodyPadding : 5,
				defaults : {
				margins : '0 0 10 0',
					labelWidth: 120,
				},
				items : [{
					xtype:'hiddenfield',
					name:'domainUuid'
				},{
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
							statusId : 0
						}, {
							name : 'ALERT',
							statusId : 1
						}, {
							name : 'CRIT',
							statusId : 2
						}, {
							name : 'ERR',
							statusId : 3
						}, {
							name : 'WARNING',
							statusId : 4
						}, {
							name : 'NOTICE',
							statusId : 5
						}, {
							name : 'INFO',
							statusId : 6
//						}, {
//							name : 'DEBUG',
//							statusId : 7
						}, {
							name : 'DISABLED',
							statusId : 8
						} ]
					}),
					
		        },{
					xtype:'textfield',
					fieldLabel:'Domain Alarm Name',
					name:'taddAlarmName',
				},{
		            xtype: 'combo',
		            name: 'taddAlarmLevel',
		            fieldLabel: 'Domain Alarm Level',
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
							statusId : 0
						}, {
							name : 'ALERT',
							statusId : 1
						}, {
							name : 'CRIT',
							statusId : 2
						}, {
							name : 'ERR',
							statusId : 3
						}, {
							name : 'WARNING',
							statusId : 4
						}, {
							name : 'NOTICE',
							statusId : 5
						}, {
							name : 'INFO',
							statusId : 6
//						}, {
//							name : 'DEBUG',
//							statusId : 7
						}, {
							name : 'DISABLED',
							statusId : 8
						} ]
					}),
					
		        }],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('alarmLevel').setValue(-1);
							this.up('form').getForm().findField('taddAlarmLevel').setValue(-1);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
				handler : function() {
					
					var panel = this.up('form').up('panel').up('panel');
					var domainUuid=panel.treeId;
					
					var form=this.up('form').getForm();
					form.findField('domainUuid').setValue(domainUuid);
					
					var gridStore=panel.down('panel[itemId=grid]').store;				
					
					var params = form.getValues();
					Ext.apply(gridStore.proxy.extraParams, params);
					var paging = panel.down("pagingtoolbar");
					paging.moveFirst();
				}
				}]
			});
			
			 this.items=[{
				 region: 'center',
				 layout:'fit',
				 items:[grid]
				},{
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
