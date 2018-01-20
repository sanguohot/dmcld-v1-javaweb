Ext.define('app.view.module.DomainDescPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	border:false,
	gridStore:null,
	forceRefresh:0,
	flag:'alarm',
	title:lanControll.getLanValue("tiAlarmDesc"),
	initComponent: function(){
		this.createView();
		this.callParent(arguments);
	},
	createView:function(){
		this.createTbar();
		this.items=[{
			 region: 'center',
			 layout:'fit',
			 items:this.createGrid()       
			},{
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:300,
			 items:this.createSearch()
		}];
	},
	createTbar:function(){
		this.tbar = [{
			xtype : 'button',
			text : 'Setting',
			iconCls : 'add',
			flag:"super_edit",
			ulan:'btSetting',
			listeners : {
				click : function() {
					var grid=this.up('panel').down('panel[itemId=domainDescGrid]');
			 		if(grid.getSelectionModel().hasSelection()){
			 			var records=grid.getSelectionModel().getSelection();			 			
						var ids="";
						var domainUuid = 0;
						for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('alarmId');
								domainUuid = records[i].get('domainUuid');
							}else {
								ids=ids+"-"+records[i].get('alarmId');
							}
						}
						if(grid.selectAll==1){
							ids="";
						}
						var addAlarm = Ext.getCmp('updateDomainDesc');
						if(addAlarm==undefined){
							addAlarm=Ext.create('app.view.systemconfig.UpdateDomainDesc');
							addAlarm.down('form').store = grid.store;
							lanControll.setLan(addAlarm);
						}
						if(records.length==1){
							addAlarm.down('form').getForm().findField('dstAlarmLevel').setValue(records[0].get('alarmLevel'));
							addAlarm.down('form').loadRecord(records[0]);
						}
						var params = this.up('panel').down('form').getForm().getValues();
						params["domainUuid"] = domainUuid;
						params["alarmIds"] = ids;
						console.log(params)
						addAlarm.down('form').params = params;
//						addAlarm.down('form').getForm().findField('domainUuid').setValue(domainUuid);
//						addAlarm.down('form').getForm().findField('alarmIds').setValue(ids);
						addAlarm.show();
		 			}else{
		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		 				return;
		 			}	 									
				}
			}
		},{
	   		 xtype:'button',
	   		 text:'Reset',
	   		 iconCls:'option',
	   		 ulan:'btReset1',
	   		 flag:"domain_edit",
	   		 listeners:{
	   		 	click:function(){
					var grid=this.up('panel').down('panel[itemId=domainDescGrid]');
			 		if(grid.getSelectionModel().hasSelection()){
			 			var records=grid.getSelectionModel().getSelection();			 			
						var ids="";
						var domainUuid = 0;
						for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('alarmId');
								domainUuid = records[i].get('domainUuid');
							}else {
								ids=ids+"-"+records[i].get('alarmId');
							}
						}
						if(grid.selectAll==1){
							ids="";
						}
						var params = this.up('panel').down('form').getForm().getValues();
						params["domainUuid"] = domainUuid;
						params["alarmIds"] = ids;
	                	Ext.Ajax.request({
	                		url:'alarmDomainDescManager!deleteDomainDesc.action',
	                		method:'POST',
	                		params:params,
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
					                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		grid.store.load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
		 			}else{
		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		 				return;
		 			}	 		
				}
	   	 	}
	   	 },'-',{
      		 xtype:'button',
      		 text: 'Select All',
      		 iconCls: 'selectAll',
      		ulan:'btSelectAll',
      		 flag:"domain_read",
      		 listeners:{
      			 click:function(){
	   		 		var grid=this.up('panel').down('panel[itemId=domainDescGrid]');
      		 		if(grid.selectAll==1){      		 			
      		 			grid.selectAll=0;
      		 			grid.selModel.setLocked(false);
      		 			grid.getSelectionModel().deselectAll();
      		 			this.setIconCls('selectOut');
      		 		}else{
       		 			this.setIconCls('selectIn');
       		 			grid.selectAll=1;
       		 			grid.getSelectionModel().selectAll();
       		 			grid.selModel.setLocked(true);
      		 		}
      		 	}
      		 }
      	 },'-',{
	   		 xtype:'button',
	   		 text:'Refresh',
	   		 iconCls:'refresh2',
	   		 ulan:'btRefresh',
	   		 flag:"domain_read",
	   		 listeners:{
	   		 	click:function(){
					var store = this.up('panel').gridStore;
					if(store != null){
						store.load();
					}
	   	 		}
	   	 	}
	   	 },'->',{
	   		 xtype:'button',
	   		 text:'Search',
	   		 iconCls:'search',
	   		 ulan:'btSearch',
	   		 flag:"domain_read",
	   		 listeners:{
	   		 	click:function(){
	   		 		var search = this.up('panel').down('form').up('panel');
	   		 		if(search.isHidden()){
	   		 			search.expand();
	   		 		}else{
	   		 			search.collapse();
	   		 		}
	   	 		}
	   	 	}
	   	 }]
	},
	createGrid:function(){
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store = Ext.create("app.store.systemconfig.AlarmDomainDescStore",{});
		store.getProxy().url = "alarmDomainDescManager!getDomainDesc.action";
		store.getProxy().setReader({
			root:'domainDescList',
			type:'json',
		});
		var paging = Ext.create("Ext.toolbar.Paging",{			     
			displayInfo: true,
			store:store
		});
		this.gridStore = store;
		var columns = [
						{header: 'Uuid',dataIndex: 'uuid',hidden:true},
						{header: 'domain Uuid',dataIndex: 'domainUuid',hidden:true},
						{header: 'Alarm Id',dataIndex: 'alarmId',width:120,},
						{header: 'Alarm Name',dataIndex: 'alarmName',width:120},
						{header: 'Alarm Level',dataIndex: 'alarmLevel',width:140,
							renderer:function(value,metaData,record,rowIndex,store,view){
//			    				return alarmObject.getAlarmLevel(value,metaData,record,rowIndex,store,view,null);
                var str = alarmObject.getAlarmLevel(value,metaData,record,rowIndex,store,view,null);
                metaData.style = 'background-color:' + str.split('|')[1] + ";color:white";
                return str.split('|')[0];
							}
						},
						{header: 'timeCheckMax',dataIndex: 'timeCheckMax',width:120,
							renderer:function(value,metaData,record,rowIndex,store,view){
		    				return alarmObject.getTimeCheckMax(value,metaData,record,rowIndex,store,view);
						}},
				];
		var isCn = lanControll.isCn();
		if(isCn){
			columns.push({header: 'Description',dataIndex: 'alarmDescCn',ulan:'alarmDescAbbr'});
		}else{
			columns.push({header: 'Description',dataIndex: 'alarmDesc'});
		}
		var grid = Ext.create("Ext.grid.Panel",{
			border:false,
			columnLines:true,
			selModel: sm,
			itemId:'domainDescGrid',
			store:store,
			columns:columns,
			bbar:paging,
			viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true,
			}
		});
		store.on('load', function(){
	    	var total = store.getCount();//数据行数  	    	
	    	if(grid.selectAll==1){
	    		grid.selModel.setLocked(false);
				if(total>0){
					grid.selModel.selectRange(0,total-1,true);  
				}
				grid.selModel.setLocked(true);
			}else{
				grid.selModel.setLocked(false);
			}	
	    });
//		var params = {cleanFlag:0,alarmType:1};
//		Ext.apply(store.proxy.extraParams, params);

		grid.store = store;
		return grid;
	},
	createSearch:function(){
		var search = Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
		    fieldDefaults: {
		        labelWidth: 120
		    },
			items:[{
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
					value:-1,
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
//						}, {
//							name : 'DEBUG',
//							statusId :7
						}, {
							name : 'DISABLED',
							statusId :8
						} ]
					}),
					
		        
				},{
					xtype:'textfield',
					fieldLabel:'Description',
					name:'alarmDesc',
				}],
			buttons : [ {
				text : 'Reset',
				flag:"domain_read",
				ulan:'btReset1',
				handler : function() {
					this.up('form').getForm().reset();
					this.up('form').getForm().findField('alarmLevel').setValue(-1);
				}
			}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
				handler : function() {
					var store = this.up('form').up('panel').up('panel').gridStore;
					if(store != null){
						var form=this.up('form').getForm();
						var params = form.getValues();
						
						if(params.reportTimeB){
							params.reportTimeB=rs.dateSearchFormat(params.reportTimeB,'Y-m-d H:i:s','begin');
						}
						if(params.reportTimeE){
							params.reportTimeE=rs.dateSearchFormat(params.reportTimeE,'Y-m-d H:i:s','end');
						}
						
						Ext.apply(store.proxy.extraParams, params);
						var paging = this.up('form').up('panel').up('panel').down('pagingtoolbar');
						paging.moveFirst();
					}
				}
			}]
		});

		return search;
	}
});