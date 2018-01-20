Ext.define('app.view.sms.CallGrid', {
		extend:'Ext.panel.Panel', 
//		id:'callInGroupTab',
		title:tiCdrList,
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var simCallStore=Ext.create('app.store.sms.SimCdrStore',{});
			var store = simCallStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var sm = Ext.create('Ext.selection.CheckboxModel');	
			var callGrid=Ext.create('Ext.grid.Panel',{
			columnLines:true,
			store:simCallStore,
			title:'',
//			id:'callInGroupGrid',
			itemId:'grid',
			selModel:sm,
			selectAll:0,
			border:false,
			treeName:'',
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
			          {header: 'Call Sn',dataIndex: 'callSn',ulan:'snAbbr',width:120},
			          {header: 'callIndex',dataIndex: 'callIndex',width:120,hidden:true},
			          {header: 'IMSI',dataIndex: 'imsi',width:140},
			          {header: 'SIM Alias',dataIndex: 'alias',ulan:'simAlias',width:120},
			          {header: 'GWP Alias',dataIndex: 'gwpPortNoStr',ulan:'gwpAlias',width:120},
			          {header: 'CDR Alias',dataIndex: 'cdrAlias',width:180,hidden:true},
						
			          {header: 'callNumber',dataIndex: 'callNumber',width:120},
						{header: 'callDirection',dataIndex: 'callDirection',width:100,hidden:true,
							renderer:function(val){  
								return rs.callDirection(val);
							}
						},
						{header: 'callerNumber',dataIndex: 'callerNumber',width:120},
						{header: 'srcIp',dataIndex: 'srcIp',width:120},
						{header: 'hangupSide',dataIndex: 'hangupSide',width:120,hidden:true,
							renderer:function(val){  
								return rs.hangupSide(val);
							}
						},
						{header: 'endReason',dataIndex: 'endReason',width:120,hidden:true,
							renderer:function(val){  
								return rs.endReason(val);
							}
						},
						{header: 'pddTimelen',dataIndex: 'pddTimelen',width:80},
						{header: 'duration',dataIndex: 'duration',width:80},
						{header: 'billingSec',dataIndex: 'billingSec',width:120},
						{header: 'callStatus',dataIndex: 'callStatus',width:120,
							renderer:function(val){  
								return rs.callStatus(val);
							}
						},
						{header: 'startTime',dataIndex: 'startTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
						{header: 'gsmCode',dataIndex: 'gsmCode',width:240,
							renderer:function(val){  
								return rs.gsmCode(val);
							}
						},
						{header: 'callResult',dataIndex: 'callResult',width:120,
							renderer:function(val){  
								return rs.smsUssdCallResult(val);
							}
						},
						{header: 'cdrFlag',dataIndex: 'cdrFlag',width:120,
							renderer:function(val){  
								return rs.cdrFlag(val);
							}
						},
						
						{header: 'activeTime',dataIndex: 'activeTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
						{header: 'resultTime',xtype: 'datecolumn',dataIndex: 'resultTime',width:120,format:'Y-m-d H:i:s',hidden:true},
						{header: 'Task Type',dataIndex: 'userTaskType',width:60,hidden:true,
							renderer:function(val){  
								return rs.userTaskType(val);
							}
						},
						{header: 'Task Id',dataIndex: 'userTaskId',width:120,hidden:true,
							renderer:function(val,metaData,record,rowIndex,store,view){
	                            if(record.get('userTaskType')==2){
	                                    return rs.userTaskId(val);
	                            }else{   
	                                    return val;
	                            }
							}
						},
						{header: 'domainUuid',dataIndex: 'domainUuid',width:60,hidden:true},
						{header: 'gwpUuid',dataIndex: 'gwpUuid',ulan:'gwpUuid',width:120,hidden:true},
						{header: 'cdrUuid',dataIndex: 'cdrUuid',width:120,hidden:true},
					],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){}
			},
			dockedItems : [{
				itemId:'pagingtoolbar',
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: simCallStore ,
			     pageSize: 4,
			     displayInfo: true,
			     
			}]
		});
	    simCallStore.on('load', function(){
	    	var total = simCallStore.getCount();//数据行数  
	    	
			if(callGrid.selectAll==1){
				callGrid.selModel.setLocked(false);
				callGrid.selModel.selectRange(0,total-1,true);  
				callGrid.selModel.setLocked(true);
			}else{
				callGrid.selModel.setLocked(false);
			}
	    });	
	    
			var tbar = [];
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			if(!maintenance){
				var del = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Delete Call',
		       		 ulan:'btDelCall',
		       		 iconCls:'remove',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){
		       			if ( callGrid.getSelectionModel().hasSelection() ){		       				
       							var records= callGrid.getSelectionModel().getSelection();
       							var ids="";
       							var names=new Array();
       							var objName = "";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('cdrUuid');
										objName = records[i].get('callSn')+'('+records[i].get('imsi')+')';
									}else {
										ids=ids+","+records[i].get('cdrUuid');
									}
								}
								
								var domainUuid=Ext.getCmp('groupPanel').domainUuid;
								var grpUuid=Ext.getCmp('groupPanel').treeId;
								boxDelCall = lanControll.getLanValue('boxDelCall');
								Ext.MessageBox.confirm(boxWarnning,boxDelCall,function(e) { 																				
		       						if( e == 'yes' ){
		       							var form=callGrid.up('panel').up('panel').down('form').getForm();
		       							var param=form.getValues();
//		       							var param=callGrid.store.proxy.extraParams;
		       							param["objName"] = objName;
		       							var selectAll=callGrid.selectAll;
		       							Ext.Ajax.request({
					                		url:'callInGroupManager!deleteCdr.action?cdrUuids='+ids+'&selectAll='+selectAll+'&grpUuid='+grpUuid+"&domainUuid="+domainUuid,
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
					                    			callGrid.selectAll=0;
					              		        		    var smsInGroupPage=callGrid.down('pagingtoolbar');
					              		        		    smsInGroupPage.moveFirst();
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
						                    	}
					                    	}
					                	})
		       						}	
								})
		       							
		       			}else{
		       				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
       		 				return;
		       			}
		       		
		       	 		}
		       	 	}		       	 
		       	 });
				tbar.push(del);
				tbar.push('-');
			}
			
			var view = Ext.create("Ext.button.Button",{
	      		 xtype:'button',
	       		 text:'View',
	       		 ulan:'btView',
	       		 iconCls: 'view_group',
	       		 flag:"domain_read",
	       		 menu:{
		       		 xtype:'menu',			       		 
		       		 items:[{
			       			text:'Default View',
			       			ulan:'miDefaultView',
			       			handler:function(){
		       			 		var showIds=",checkbox,callSn,imsi,alias,gwpPortNoStr,callNumber,startTime,pddTimelen,duration,billingSec,gsmCode,callStatus,callResult,cdrFlag";
		       			 		var hideIds=",callIndex,callDirection,activeTime,resultTime,userTaskType,userTaskId,domainUuid,gwpUuid,cdrUuid";

			       			 	ip.changeView(callGrid,showIds,true);
			       			 	ip.changeView(callGrid,hideIds,false);
			       			 	
			       			 	ip.setCurCookie(showIds,hideIds,'gcalll');
			       		 	}
			       	 },{
		       			text:'Basic View',
		       			ulan:'miBasicView',
		       			handler:function(){
		       			 	var showIds=",checkbox,callNumber,callDirection,startTime,pddTimelen,duration,billingSec,gsmCode,callStatus,callResult";
		       			 	var hideIds=",callSn,callIndex,imsi,alias,gwpPortNoStr,cdrFlag,activeTime,resultTime,userTaskType,userTaskId,domainUuid,gwpUuid,cdrUuid";

		       			 	ip.changeView(callGrid,showIds,true);
		       			 	ip.changeView(callGrid,hideIds,false);
		       			 	
		       			 	ip.setCurCookie(showIds,hideIds,'gcalll');
		       		 	}
		       		 },'-',{
		       			text:'User View-1',
		       			ulan:'miUserView1',
		       			handler:function(){
		       			 	ip.changeUserView(callGrid,'gcalll',1,callGrid.up('panel').up('panel').id);
		       		 	}
		       		 },{
		       			text:'User View-2',
		       			ulan:'miUserView2',
		       			handler:function(){
		       			 	ip.changeUserView(callGrid,'gcalll',2,callGrid.up('panel').up('panel').id);
		       		 	}
		       		 },{
		       			text:'User View-3',
		       			ulan:'miUserView3',
		       			handler:function(){
		       			 	ip.changeUserView(callGrid,'gcalll',3,callGrid.up('panel').up('panel').id);
		       		 	}
		       		 },'-',{
		       			text:'User Setting...',
		       			ulan:'miUserSetting',
		       			handler:function(){
		       			 	var win=Ext.getCmp('viewAdvanced');
		       			 	var win=ip.initViewSet(callGrid);
		       			 	win.down('hiddenfield[name=mode]').setValue('gcalll');
		       			 	win.down('hiddenfield[name=cmpId]').setValue(callGrid.up('panel').up('panel').id);
		       			 	win.show();
		       		 	}
			       	}], 
	       	 	 }
	       	 });
			tbar.push(view);
			tbar.push('-');
			
			var sel = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text: 'Select All',
	       		 iconCls: 'selectAll',
	       		 ulan:'btSelectAll',
	       		 flag:"domain_read",
	       		 listeners:{
	       			 click:function(){
	       		 		if(callGrid.getSelectionModel().hasSelection()){
	       		 			callGrid.selectAll=0;
	       		 			callGrid.selModel.setLocked(false);	
	       		 			callGrid.getSelectionModel().deselectAll(); 
	       		 			this.setIconCls('selectOut');
	       		 		}else{
	       		 			this.setIconCls('selectIn');
	       		 			callGrid.selectAll=1;
	       		 			callGrid.getSelectionModel().selectAll();
	       		 			callGrid.selModel.setLocked(true);
	       		 		}
	       		 	}
	       		 }
	       	 });
			tbar.push(sel);
			tbar.push('-');
			
			var refresh = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 iconCls:'refresh2',
	       		 ulan:'btRefresh',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
			       		var callInGroupGrid=this.up('panel').down('panel[itemId=grid]');
	        		    var callInGroupPage=callInGroupGrid.down('pagingtoolbar');
	        		    callInGroupGrid.store.load();
//	        		    callInGroupPage.moveFirst();
	       	 		}
	       	 	}
	       	 });
			tbar.push(refresh);
			tbar.push('->');
			
			var search = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 iconCls:'search',
	       		 ulan:'btSearch',
	       		 flag:"domain_read",
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
			});
			tbar.push(search);
			this.tbar=tbar;
			
			var search_grid=Ext.create('Ext.form.Panel',{
				border : false,
				bodyPadding : 5,
				defaults : {
				margins : '0 0 10 0'
				},
				items : [ {
					xtype:'textfield',
					fieldLabel:'IMSI',
					name:'imsi',
				},{
					xtype:'textfield',
					fieldLabel:'SIM Alias',
					ulan:'simAlias',
					name:'alias',
				},{
					xtype:'textfield',
					fieldLabel:'Number',
					name:'callNumber',
				},{

		            xtype: 'combo',
		            name: 'callDirection',
		            fieldLabel: 'Direction',
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
							name:lanControll.getLanValue('callDirection_'+0),
							statusId :0
						}, {
							name:lanControll.getLanValue('callDirection_'+1),
							statusId :1
						}, {
							name:lanControll.getLanValue('callDirection_'+2),
							statusId :2
						} ]
					}),
					
		        
				},{
		            xtype: 'combo',
		            name: 'callStatus',
		            fieldLabel: 'Call Status',
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
							name : lanControll.getLanValue('callStatus_'+0),
							statusId :0
						}, {
							name : lanControll.getLanValue('callStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('callStatus_'+2),
							statusId : 2
						}, {
							name : lanControll.getLanValue('callStatus_'+3),
							statusId : 3
						}, {
							name : lanControll.getLanValue('callStatus_'+4),
							statusId : 4
						}, {
							name : lanControll.getLanValue('callStatus_'+5),
							statusId : 5
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'callResult',
		            fieldLabel: 'Call Result',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'statusId',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'statusId' ],
						data : [{
							name : '-SELECT-',
							statusId : -1
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+0),
							statusId : 0
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+1),
							statusId : 1
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+2),
							statusId : 2
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+3),
							statusId : 3
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+4),
							statusId : 4
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+5),
							statusId : 5
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+6),
							statusId : 6
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+7),
							statusId : 7
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+8),
							statusId : 8
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+9),
							statusId : 9
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+10),
							statusId : 10
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+11),
							statusId : 11
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+12),
							statusId : 12
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+13),
							statusId : 13
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+14),
							statusId : 14
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+15),
							statusId : 15
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+16),
							statusId : 16
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+17),
							statusId : 17
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+18),
							statusId : 18
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+19),
							statusId : 19
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+20),
							statusId : 20
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+21),
							statusId : 21
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+22),
							statusId : 22
						}]
					}),
		        },{
					xtype:'datefield',
					fieldLabel:'Start Time Begin',
					name:'callTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Start Time End',
					name:'callTimeE',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Result Time Begin',
					name:'resultTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Result Time End',
					name:'resultTimeE',
					format: 'Y-m-d',
				},],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('callDirection').setValue(-1);
							this.up('form').getForm().findField('callResult').setValue(-1);
							this.up('form').getForm().findField('callStatus').setValue(-1);
							
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
					handler : function() {
						var form=this.up('form').getForm();
	        		    var callGridStore=callGrid.getStore();
						var params = form.getValues();
						callGridStore.on('beforeload', function (callGridStore, options) {
	        		        var params = form.getValues();
	        		        Ext.apply(callGridStore.proxy.extraParams, params);
	        		    },this,{single: true});
						var callpage=callGrid.down('pagingtoolbar');
						callpage.moveFirst();
					}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[callGrid]
				},{
				 itemId:'search',
				 region:'east',
				 title : tiSearch,
				 collapsible: true,
				 collapsed:true,
				 width:300,
				 items:[search_grid]
			 }
			 ];
			this.callParent(arguments);		
	}
});