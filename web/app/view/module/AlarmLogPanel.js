Ext.define('app.view.module.AlarmLogPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	border:false,
	nodeDesc:null,
	createDesc:null,
	gridStore:null,
	forceRefresh:0,
	flag:'alarm',
	title:lanControll.getLanValue("tiAlarmHistory"),
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
	   		 xtype:'button',
	   		 text:'Export',
	   		 iconCls:'export',
	   		 ulan:'btExport',
	   		 flag:"domain_action",
	   		 listeners:{
	   		 	click:function(){
					var store = this.up('panel').gridStore;
                	Ext.Ajax.request({
                		url:'exportConfig!exportOldAlarmLog.action',
                		method:'POST',
                		timeout:3*60*1000,
                		params:store.proxy.extraParams,
                		callback: function (options, success, response) {
							var obj=Ext.JSON.decode(response.responseText);
	                    	if(obj["success"]){
	                    		if(obj.message){
	                    			Ext.MessageBox.alert(boxInfo,obj.message);
	                    		}
	                    		window.location.href="download/"+obj["fileName"];
	                    	}else{
	                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
	                    	}
                    	}
                	});
				}
	   	 	}
	   	 },{
	   		 xtype:'button',
	   		 text:'Refresh',
	   		 ulan:'btRefresh',
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
		var store = Ext.create("app.store.operation.domain.AlarmLogStore",{});
		var paging = Ext.create("Ext.toolbar.Paging",{			     
			displayInfo: true,
			store:store
		});
		this.gridStore = store;
		var grid = Ext.create("Ext.grid.Panel",{
			border:false,
			columnLines:true,
			itemId:'alarmHisGrid',
			selModel: sm,
			store:store,
			columns:[
			    {header: 'uuid',dataIndex: 'uuid',width:120,hidden:true},
			    {header: 'SN',dataIndex: 'alarmSn',ulan:'snAbbr',width:80},
			    {header: 'Alarm Id',dataIndex: 'alarmId',width:80},
			    {header: 'Alarm Level',dataIndex: 'alarmLevel',width:80,
					renderer:function(value,metaData,record,rowIndex,store,view){
                        var str = alarmObject.getAlarmLevel(value,metaData,record,rowIndex,store,view,'his');
                        metaData.style = 'background-color:' + str.split('|')[1] + ";color:white";
                        return str.split('|')[0];
					}
	        	},
			    {header: 'Report Time',dataIndex: 'reportTime',width:150,				
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 			return rs.timeFormat(value);
		    	}},	
		    
//			    {header: 'Object Id',dataIndex: 'objectId',hidden:true},
			    {header: 'Alarm Name',dataIndex: 'alarmName',width:180,				
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 			if(!value || value==""){
    	 				return record.get('alarmId');
    	 			}
    	 			return value;
		    	}},
			    {header: 'Type',ulan:'typeAbbr',dataIndex: 'alarmType',width:60,hidden:false,
			    	renderer: function(value,metaData,record,rowIndex,store,view){
		    			return rs.alarmType(record.get('alarmType'));
		    		}
			    },

			    {header: 'Object Desc',dataIndex: 'objectDesc',hidden:true},
			    {header: 'Cause Desc',dataIndex: 'causeDesc',hidden:true,				
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 			if(!value || value==""){
    	 				return record.get('causeId');
    	 			}
    	 			return value;
		    	}},	
			    {
					header:"content",
					hidden:false,
					sortable:false,
					ulan:'contentAbbr',
					width:1000,
					renderer: function(value,metaData,record,rowIndex,store,view){
						var neAlias = record.get('neAlias');
						var domainName = record.get('domainName');
						if(!domainName || domainName==""){
							domainName = "N/A";
						}
						var alarmType = rs.alarmType(record.get('alarmType'));
						var alarmName = record.get('alarmName');
						var causeName = record.get('causeName');
						var alarmId = record.get('alarmId');
						var alarmLevel = record.get('alarmLevel');
						var objectDesc = record.get('objectDesc');
						var confirmFlag = record.get('confirmFlag');
						var reportTime = record.get('reportTime');
						
						
						var str = "";
						if(alarmType){
							str = "["+alarmType+"]";
						}
//						str= str +" domain:"+domainName;
//						if(neAlias && neAlias!=""){
//							str = str + " device:" + neAlias;
//						}else{
//							str = str + " device:N/A";
//						}

						str= str+" "+objectDesc;
						if(alarmName!="")
						str = str + " , "+alarmName;
						if(causeName!=""){
							str = str +' Cause:'+causeName;
						}
//						str = "<div style='white-space:normal'>"+str+"</div>"
						return str;
		    		}
				},
			    {header: 'Clean Flag',dataIndex: 'cleanFlag',hidden:true,
			    	renderer: function(value,metaData,record,rowIndex,store,view){
		    			return rs.cleanFlag(record.get('cleanFlag'));
		    		}	
			    }
			],
			bbar:paging,
			viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true,
				forceFit :true,
					getRowClass : function(record,rowIndex,rowParams,store){
					  //禁用数据显示红色
//					if(record.get('alarmType')==3){
//						return 'row-green';
//					}else if(record.get('alarmType')==2){
//						return 'row-black';
//					}else if(record.get('confirmFlag')==1){
//						return 'row-gray';
//					}else{
//						var alarmType = rs.alarmType(record.get('alarmType'));
//						var level = record.get('alarmLevel');
//						if(level==0 || level==1 || level==2){
//							return 'row-red';
//						}else if(level==3 || level==4){
//							return 'row-orange';
//						}else if(level==5 || level==6 || level==8){
//							return 'row-blue';
//						}else{
//							return 'row-black';
//						}
//					
//					}
//					var level = record.get('alarmLevel');
//					var alarmType = record.get('alarmType');
//					var cleanFlag = record.get('cleanFlag');
//					if(alarmType==3 || cleanFlag!=0){
//						return 'row-gray';
//					}else if(alarmType == 2){
//						return 'row-black';
//					}else if(alarmType == 1){
//						return 'row-red';
//					}else if(level==0 || level==1 || level==2){
//						return 'row-red';
//					}else if(level==3 || level==4){
//						return 'row-orange';
//					}else{
//						return 'row-blue';
//					}
				}
			}
		});
		grid.store = store;
//		if(this.nodeDesc=='ne'){
//			var container = grid.down('headercontainer');
//			var neAlias = container.getComponent('neAlias');
//			container.remove(neAlias);
//		}
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
				fieldLabel:'Object Desc',
				name:'objectDesc',
			},{
				xtype:'textfield',
				fieldLabel:'Alarm Name',
				name:'alarmName',
			},{
	            xtype: 'combo',
	            name: 'alarmLevel',
	            fieldLabel: 'Alarm Level',
				mode : 'local',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				value:-1,
				editable:false,
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : '-SELECT-',
						value : -1
					},{
						name : 'EMERG',
						value : 0
					}, {
						name : 'ALERT',
						value : 1
					},{
						name : 'CRIT',
						value : 2					
					},{
						name : 'ERR',
						value : 3					
					},{
						name : 'WARNING',
						value : 4					
					},{
						name : 'NOTICE',
						value : 5					
					},{
						name : 'INFO',
						value : 6					
//					},{
//						name : 'DEBUG',
//						value : 7					
					},{
						name : 'DISABLED',
						value : 8					
					}]
				}),
//			},{
//				xtype:'datefield',
//				fieldLabel:'Clean Time Begin',
//				name:'cleanTimeB',
//				format: 'Y-m-d',
//			},{
//				xtype:'datefield',
//				fieldLabel:'Clean Time End',
//				name:'cleanTimeE',
//				format: 'Y-m-d',
//			},{
//				xtype:'datefield',
//				fieldLabel:'Recv Time Begin',
//				name:'recvTimeB',
//				format: 'Y-m-d',
//			},{
//				xtype:'datefield',
//				fieldLabel:'Recv Time End',
//				name:'recvTimeE',
//				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Report Time Begin',
				name:'reportTimeB',
				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Report Time End',
				name:'reportTimeE',
				format: 'Y-m-d',
			}],
			buttons : [ {
				text : 'Reset',
				ulan:'btReset1',
				flag:"domain_read",
				handler : function() {
//					this.up('form').up('panel').collapse();
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
//		if(this.nodeDesc=='ne'){
//			var neAlias = search.down('textfield[name=neAlias]');
//			search.remove(neAlias);
//		}
		return search;
	},
//	listeners:{
//		activate: function(tab){
//			var grid=this.down('panel[itemId=grid]');
//			if(this.forceRefresh==1){
//				this.forceRefresh=0;
//				grid.down('pagingtoolbar').moveFirst();
//			}
//		}
//	}
});