Ext.define('app.view.systemconfig.AlarmDomainDescListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	initComponent: function(){
		var alarmListStore= Ext.create('app.store.systemconfig.AlarmDomainDescStore',{}); 
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
					{header: 'Uuid',dataIndex: 'uuid',hidden:true,flex:1},
					{header: 'domain Uuid',dataIndex: 'domainUuid',hidden:true,flex:1},
					{header: 'Alarm Id',dataIndex: 'alarmId',width:120,},
					{header: 'Alarm Name',dataIndex: 'alarmName',width:120},
					{header: 'Alarm Level',dataIndex: 'alarmLevel',width:140,
						renderer:function(val){  
							return rs.alarmLevel(val);
						}
					},
					{header: 'Description',dataIndex: 'alarmDesc',flex:1},
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
					text : 'Add Domain Alarm',
					iconCls : 'add',
					flag:"super_edit",
					ulan:'btAdd',
					listeners : {
						click : function() {
							
							var addAlarm = Ext.getCmp('addAlarmDomainDesc');
							var componentId=alarmList.id;
							if(addAlarm==undefined){
								addAlarm=Ext.create('app.view.systemconfig.AddAlarmDomainDesc');
								lanControll.setLan(addAlarm);
							}
							addAlarm.down('form').getForm().findField('componentId').setValue(componentId);
							addAlarm.show();
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
		       		 		var eastSearch=Ext.getCmp("alarmDomainDesc_east_search");
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
			 id:'alarmDomainDesc_east_search',
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