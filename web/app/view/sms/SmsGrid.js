Ext.define('app.view.sms.SmsGrid', {
		extend:'Ext.panel.Panel', 
//		id:'smsInGroupTab',
		title:tiSmsList,
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var simSmsStore=Ext.create('app.store.sms.SmsInGroupStore',{});
			var store = simSmsStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var sm = Ext.create('Ext.selection.CheckboxModel');	
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var smsGrid=Ext.create('Ext.grid.Panel',{
			columnLines:true,
			store:simSmsStore,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			title:'',
//			id:'smsInGroupGrid',
			itemId:'grid',
			selectAll:0,
			border:false,
			selModel:sm,
			treeName:'',
			columns: [
				{header: 'smsSn',dataIndex: 'smsSn',ulan:'snAbbr',width:120},
				{header: 'IMSI',dataIndex: 'imsi',width:120},				
				{header: 'SIM Alias',dataIndex: 'alias',ulan:'simAlias',width:120},
				{header: 'GWP Alias',dataIndex: 'gwpPortNoStr',ulan:'gwpAlias',width:120},
				{header: 'smsNumber',dataIndex: 'smsNumber',width:120},
				{header: 'content',dataIndex: 'content',flex:1,minWidth:120},
				{header: 'smsDirection',dataIndex: 'smsDirection',width:120,hidden:true,
					renderer:function(val){  
						return rs.smsDirection(val);
					}
				},
				{header: 'smsStatus',dataIndex: 'smsStatus',width:120,
					renderer:function(val){  
						return rs.smsStatus(val);
					}
				},
				{header: 'smsTime',dataIndex: 'smsTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
				{header: 'smsResult',dataIndex: 'smsResult',width:120,
					renderer:function(val){  
						return rs.smsUssdCallResult(val);
					}
				},
				{header: 'smsReceipt',dataIndex: 'smsReceipt',width:120,hidden:true},
				{header: 'resultTime',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
				{header: 'receiptTime',dataIndex: 'receiptTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
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
				{header: 'simUuid',dataIndex: 'simUuid',width:120,hidden:true},
				{header: 'smsUuid',dataIndex: 'smsUuid',width:120,hidden:true},
				
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
//					if(maintenance){
//						return;
//					}
					var imsi=row.get('imsi');
					var smsDirection=row.get('smsDirection');
					var smsNumber=row.get('smsNumber');
					var smsStatus=row.get('smsStatus');
					var content=row.get('content');
					var smsDetail=Ext.getCmp('smsDetail');
					if(smsDetail==undefined || smsDetail==null){
						smsDetail=Ext.create('app.view.sms.SmsDetail',{});
					}
					smsDirection=rs.smsDirection(smsDirection);
					smsStatus=rs.smsStatus(smsStatus);
					smsDetail.down('form').getForm().findField('imsi').setValue(imsi);
					smsDetail.down('form').getForm().findField('smsDirection').setValue(smsDirection);
					smsDetail.down('form').getForm().findField('smsNumber').setValue(smsNumber);
	//				smsDetail.down('form').getForm().findField('smsStatus').setValue(smsStatus);
					smsDetail.down('form').getForm().findField('content').setValue(content);
					smsDetail.show();
				}
			},
			dockedItems : [{
				itemId:'pagingtoolbar',
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: simSmsStore ,
			     pageSize: 4,
			     displayInfo: true,
			     
			}]
		});
		
	    simSmsStore.on('load',function(){
	    	var total = simSmsStore.getCount();//数据行数  
			if(smsGrid.selectAll==1){
				smsGrid.selModel.setLocked(false);
				if(total>0){
					smsGrid.selModel.selectRange(0,total-1,true);  
				}
				smsGrid.selModel.setLocked(true);
			}else{
				smsGrid.selModel.setLocked(false);
			}
	    });
			var tbar = [];
			if(!maintenance){
				var del = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Delete SMS',
		       		 ulan:'btDelSms',
		       		 iconCls:'remove',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){

		       			if ( smsGrid.getSelectionModel().hasSelection() ){
		       				
       							var records= smsGrid.getSelectionModel().getSelection();
       							var ids="";
       							var cnt=0;
       							var names=new Array();
       							var objName = "";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('smsUuid');
										objName = records[i].get('smsSn')+'('+records[i].get('imsi')+')';
									}else {
										cnt=1;
										ids=ids+","+records[i].get('smsUuid');
									}
								}
								var domainUuid=Ext.getCmp('groupPanel').domainUuid;
								var grpUuid=Ext.getCmp('groupPanel').treeId;
								boxDelSms = lanControll.getLanValue('boxDelSms');
								Ext.MessageBox.confirm(boxWarnning,boxDelSms,function(e) { 																				
		       						if( e == 'yes' ){
		       							var form=smsGrid.up('panel').up('panel').down('form').getForm();
		       							var param=form.getValues();
//		       							var param=smsGrid.store.proxy.extraParams;
		       							param["objName"] = objName;
		       							var selectAll=smsGrid.selectAll;
		       							Ext.Ajax.request({
					                		url:'smsInGroupManager!deleteSms.action?smsUuids='+ids+"&selectAll="+selectAll+"&grpUuid="+grpUuid+"&domainUuid="+domainUuid,
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
					                    			smsGrid.selectAll=0;
					              		        		    var smsInGroupPage=smsGrid.down('pagingtoolbar');
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
			       			 	var showIds=",checkbox,smsSn,imsi,alias,gwpPortNoStr,content,smsTime,smsNumber,smsStatus,smsResult";
			       			 	var hideIds=",smsDirection,smsReceipt,resultTime,receiptTime,userTaskType,userTaskId,domainUuid,gwpUuid,simUuid,smsUuid";

			       			 	ip.changeView(smsGrid,showIds,true);
			       			 	ip.changeView(smsGrid,hideIds,false);
			       			 	
			       			 	ip.setCurCookie(showIds,hideIds,'gsmsl');
			       		 	}
			       	 },{
		       			text:'Basic View',
		       			ulan:'miBasicView',
		       			handler:function(){
		       			 	var showIds=",checkbox,content,smsDirection,smsTime,smsNumber,smsStatus,smsResult";
		       			 	var hideIds=",smsSn,imsi,alias,gwpPortNoStr,smsReceipt,resultTime,receiptTime,userTaskType,userTaskId,domainUuid,gwpUuid,simUuid,smsUuid";

		       			 	ip.changeView(smsGrid,showIds,true);
		       			 	ip.changeView(smsGrid,hideIds,false);
		       			 	
		       			 	ip.setCurCookie(showIds,hideIds,'gsmsl');
		       		 	}
		       		 },'-',{
		       			text:'User View-1',
		       			ulan:'miUserView1',
		       			handler:function(){
		       			 	ip.changeUserView(smsGrid,'gsmsl',1,smsGrid.up('panel').up('panel').id);
		       		 	}
		       		 },{
		       			text:'User View-2',
		       			ulan:'miUserView2',
		       			handler:function(){
		       			 	ip.changeUserView(smsGrid,'gsmsl',2,smsGrid.up('panel').up('panel').id);
		       		 	}
		       		 },{
		       			text:'User View-3',
		       			ulan:'miUserView3',
		       			handler:function(){
		       			 	ip.changeUserView(smsGrid,'gsmsl',3,smsGrid.up('panel').up('panel').id);
		       		 	}
		       		 },'-',{
		       			text:'User Setting...',
		       			ulan:'miUserSetting',
		       			handler:function(){
		       			 	var win=Ext.getCmp('viewAdvanced');
		       			 	var win=ip.initViewSet(smsGrid);
		       			 	win.down('hiddenfield[name=mode]').setValue('gsmsl');
		       			 	win.down('hiddenfield[name=cmpId]').setValue(smsGrid.up('panel').up('panel').id);
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
	       		 ulan:'btSelectAll',
	       		 iconCls: 'selectAll',
	       		 flag:"domain_read",
	       		 listeners:{
	       			 click:function(){
	       		 		if(smsGrid.selectAll==1){
	       		 			smsGrid.selectAll=0;
	       		 			smsGrid.selModel.setLocked(false);	
	       		 			smsGrid.getSelectionModel().deselectAll(); 
	       		 			this.setIconCls('selectOut');
	       		 		}else{
	       		 			this.setIconCls('selectIn');
	       		 			smsGrid.selectAll=1;
	       		 			smsGrid.getSelectionModel().selectAll();
	       		 			smsGrid.selModel.setLocked(true);
	       		 		}
	       		 	}
	       		 }
	       	 });
			tbar.push(sel);
			tbar.push('-');
			
			var refresh = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
			       		var smsInGroupGrid=this.up('panel').down('panel[itemId=grid]');
	        		    var smsInGroupPage=smsInGroupGrid.down('pagingtoolbar');
	        		    smsInGroupGrid.store.load();
//	        		    smsInGroupPage.moveFirst();
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
					name:'number',
				},{
					xtype:'textfield',
					fieldLabel:'Content',
					name:'content',
				},{

		            xtype: 'combo',
		            name: 'direction',
		            fieldLabel: 'SMS Direction',
		            ulan:'smsDirection',
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
							name : lanControll.getLanValue('smsDirection_'+0),
							statusId :0
						}, {
							name : lanControll.getLanValue('smsDirection_'+1),
							statusId :1
						}, {
							name : lanControll.getLanValue('smsDirection_'+2),
							statusId :2
						} ]
					}),
					
		        
				},
				{
		            xtype: 'combo',
		            name: 'smsStatus',
		            fieldLabel: 'SMS Status',
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
							name : lanControll.getLanValue('smsStatus_'+0),
							statusId :0
						}, {
							name : lanControll.getLanValue('smsStatus_'+1),
							statusId : 1
						}, {
							name : lanControll.getLanValue('smsStatus_'+2),
							statusId : 2
						}, {
							name : lanControll.getLanValue('smsStatus_'+3),
							statusId : 3
						}, {
							name : lanControll.getLanValue('smsStatus_'+4),
							statusId : 4
						}, {
							name : lanControll.getLanValue('smsStatus_'+5),
							statusId : 5
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'smsResult',
		            fieldLabel: 'SMS Result',
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
					fieldLabel:'Send Time Begin',
					name:'smsTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time End',
					name:'smsTimeE',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Sent Time Begin',
					name:'resultTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Sent Time End',
					name:'resultTimeE',
					format: 'Y-m-d',
				}
		        ],
				
				buttons : [ {
						text : 'Reset',
						ulan:'btReset1',
						flag:"domain_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('direction').setValue(-1);
							this.up('form').getForm().findField('smsResult').setValue(-1);
							this.up('form').getForm().findField('smsStatus').setValue(-1);
							
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"domain_read",
					handler : function() {
						var form=this.up('form').getForm();
	        		    var smsGridStore=smsGrid.getStore();
						var params = form.getValues();
						smsGridStore.on('beforeload', function (smsGridStore, options) {
	        		        var params = form.getValues();
	        		        Ext.apply(smsGridStore.proxy.extraParams, params);
	        		    },this,{single: true});
						var smspage=smsGrid.down('pagingtoolbar');
						smspage.moveFirst();
					}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[smsGrid]
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