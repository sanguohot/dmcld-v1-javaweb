Ext.define('app.view.sms.UssdGrid', {
		extend:'Ext.panel.Panel', 
//		id:'ussdInGroupTab',
		title:tiUssdList,
		layout:'border',
		autoScroll:false,
		border:false,
		forceRefresh:0,
		initComponent: function() {
			
			var simUssdStore=Ext.create('app.store.sms.UssdInGroupStore',{});
			var store = simUssdStore;
			this.store = store;
			store.on('beforeload',function(){
				store.loadFlag = false;
			});
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var sm = Ext.create('Ext.selection.CheckboxModel');	
			var ussdGrid=Ext.create('Ext.grid.Panel',{
			columnLines:true,
			store:simUssdStore,
			title:'',
			selModel:sm,
			selectAll:0,
//			id:'ussdInGroupGrid',
			itemId:'grid',
			border:false,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			treeName:'',
			columns: [
			    {header: 'ussdSn',dataIndex: 'ussdSn',ulan:'snAbbr',width:120},
				{header: 'IMSI',dataIndex: 'imsi',width:120},
				{header: 'SIM Alias',dataIndex: 'alias',ulan:'simAlias',width:120},
				{header: 'GWP Alias',dataIndex: 'gwpPortNoStr',ulan:'gwpAlias',width:120},
				{header: 'content',dataIndex: 'content',flex:1,minWidth:80},
				{header: 'ussdDirection',dataIndex: 'ussdDirection',width:120,hidden:true,
					renderer:function(val){  
						return rs.ussdDirection(val);
					}
				},
				{header: 'ussdParam',dataIndex: 'ussdParam',width:120,
					renderer:function(val){  
						return rs.ussdParam(val);
					}
				},
				{header: 'ussdStatus',dataIndex: 'ussdStatus',width:120,
					renderer:function(val){  
						return rs.ussdStatus(val);
					}
				},
				{header: 'ussdTime',dataIndex: 'ussdTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
				{header: 'ussdResult',dataIndex: 'ussdResult',width:120,
					renderer:function(val){  
						return rs.smsUssdCallResult(val);
					}
				},
				{header: 'resultTime',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
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
				{header: 'ussdUuid',dataIndex: 'ussdUuid',width:120,hidden:true},
				
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
//					if(maintenance){
//						return;
//					}
					var imsi=row.get('imsi');
					var ussdDirection=row.get('ussdDirection');
					var ussdStatus=row.get('ussdStatus');
					var content=row.get('content');
					var ussdDetail=Ext.getCmp('ussdDetail');
					if(ussdDetail==undefined || ussdDetail==null){
						ussdDetail=Ext.create('app.view.sms.UssdDetail',{});
					}
					ussdDirection=rs.ussdDirection(ussdDirection);
					ussdStatus=rs.ussdStatus(ussdStatus);
					ussdDetail.down('form').getForm().findField('imsi').setValue(imsi);
					ussdDetail.down('form').getForm().findField('ussdDirection').setValue(ussdDirection);
					ussdDetail.down('form').getForm().findField('content').setValue(content);
					ussdDetail.show();
				}
			},
			dockedItems : [{
				itemId:'pagingtoolbar',
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: simUssdStore ,
			     displayInfo: true,
			     
			}]
		});
			
	    simUssdStore.on('load',function(){
	    	var total = simUssdStore.getCount();//数据行数  
			if(ussdGrid.selectAll==1){
				ussdGrid.selModel.setLocked(false);
				ussdGrid.selModel.selectRange(0,total-1,true);  
				ussdGrid.selModel.setLocked(true);
			}else{
				ussdGrid.selModel.setLocked(false);
			}
	    });
	    
			var tbar = [];
			if(!maintenance){
				var del = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Delete USSD',
		       		 ulan:'btDelUssd',
		       		 iconCls:'remove',
		       		 flag:"sim_action",
		       		 listeners:{
		       		 	click:function(){

		       			if ( ussdGrid.getSelectionModel().hasSelection() ){
		       				
       							var records= ussdGrid.getSelectionModel().getSelection();
       							var ids="";
       							var cnt=0;
       							var names=new Array();
       							var objName = "";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('ussdUuid');
										objName = records[i].get('ussdSn')+'('+records[i].get('imsi')+')';
									}else {
										cnt=1;
										ids=ids+","+records[i].get('ussdUuid');
									}
								}
								var domainUuid=Ext.getCmp('groupPanel').domainUuid;
								var grpUuid=Ext.getCmp('groupPanel').treeId;
								boxDelUssd = lanControll.getLanValue('boxDelUssd');
								Ext.MessageBox.confirm(boxWarnning,boxDelUssd,function(e) { 																				
		       						if( e == 'yes' ){
		       							var form=ussdGrid.up('panel').up('panel').down('form').getForm();
		       							var param=form.getValues();
//		       							var param=ussdGrid.store.proxy.extraParams;
		       							param["objName"] = objName;
		       							var selectAll=ussdGrid.selectAll;
		       							Ext.Ajax.request({
					                		url:'ussdInGroupManager!deleteUssd.action?ussdUuids='+ids+"&selectAll="+selectAll+"&grpUuid="+grpUuid+"&domainUuid="+domainUuid,
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
					                    			ussdGrid.selectAll=0;
					              		        		    var smsInGroupPage=ussdGrid.down('pagingtoolbar');
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
		       			 		var showIds=",checkbox,ussdSn,imsi,alias,gwpPortNoStr,content,ussdTime,ussdParam,ussdStatus,ussdResult";
		       			 		var hideIds=",ussdDirection,resultTime,userTaskType,userTaskId,domainUuid,gwpUuid,simUuid,ussdUuid";

			       			 	ip.changeView(ussdGrid,showIds,true);
			       			 	ip.changeView(ussdGrid,hideIds,false);
			       			 	
			       			 	ip.setCurCookie(showIds,hideIds,'gussdl');
			       		 	}
			       	 },{
		       			text:'Basic View',
		       			ulan:'miBasicView',
		       			handler:function(){
		       			 	var showIds=",checkbox,content,ussdDirection,ussdTime,ussdParam,ussdStatus,ussdResult";
		       			 	var hideIds=",ussdSn,imsi,alias,gwpPortNoStr,resultTime,userTaskType,userTaskId,domainUuid,gwpUuid,simUuid,ussdUuid";

		       			 	ip.changeView(ussdGrid,showIds,true);
		       			 	ip.changeView(ussdGrid,hideIds,false);
		       			 	
		       			 	ip.setCurCookie(showIds,hideIds,'gussdl');
		       		 	}
		       		 },'-',{
		       			text:'User View-1',
		       			ulan:'miUserView1',
		       			handler:function(){
		       			 	ip.changeUserView(ussdGrid,'gussdl',1,ussdGrid.up('panel').up('panel').id);
		       		 	}
		       		 },{
		       			text:'User View-2',
		       			ulan:'miUserView2',
		       			handler:function(){
		       			 	ip.changeUserView(ussdGrid,'gussdl',2,ussdGrid.up('panel').up('panel').id);
		       		 	}
		       		 },{
		       			text:'User View-3',
		       			ulan:'miUserView3',
		       			handler:function(){
		       			 	ip.changeUserView(ussdGrid,'gussdl',3,ussdGrid.up('panel').up('panel').id);
		       		 	}
		       		 },'-',{
		       			text:'User Setting...',
		       			ulan:'miUserSetting',
		       			handler:function(){
		       			 	var win=Ext.getCmp('viewAdvanced');
		       			 	var win=ip.initViewSet(ussdGrid);
		       			 	win.down('hiddenfield[name=mode]').setValue('gussdl');
		       			 	win.down('hiddenfield[name=cmpId]').setValue(ussdGrid.up('panel').up('panel').id);
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
	       		 		if(ussdGrid.selectAll==1){
	       		 			ussdGrid.selectAll=0;
	       		 			ussdGrid.selModel.setLocked(false);	
	       		 			ussdGrid.getSelectionModel().deselectAll(); 
	       		 			this.setIconCls('selectOut');
	       		 		}else{
	       		 			this.setIconCls('selectIn');
	       		 			ussdGrid.selectAll=1;
	       		 			ussdGrid.getSelectionModel().selectAll();
	       		 			ussdGrid.selModel.setLocked(true);
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
			       		var ussdInGroupGrid=this.up('panel').down('panel[itemId=grid]');
	        		    var ussdInGroupPage=ussdInGroupGrid.down('pagingtoolbar');
	        		    ussdInGroupGrid.store.load();
//	        		    ussdInGroupPage.moveFirst();
	       	 		}
	       	 	}
	       	 });
			tbar.push(refresh);
			tbar.push('->');
			
			var search = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 ulan:'btSearch',
	       		 iconCls:'search',
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
					fieldLabel:'Content',
					name:'content',
				},{

		            xtype: 'combo',
		            name: 'direction',
		            ulan:'ussdDirection',
		            fieldLabel: 'USSD Direction',
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
							name : 'RECV',
							statusId :0
						}, {
							name : 'SEND',
							statusId :1
						}]
					}),
					
		        
				},{
		            xtype: 'combo',
		            name: 'ussdStatus',
		            fieldLabel: 'USSD Status',
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
							name : 'IDLE',
							statusId :0
						}, {
							name : 'SEND_WAIT',
							statusId : 1
						}, {
							name : 'SENDING',
							statusId : 2
						}, {
							name : 'SENT_OK',
							statusId : 3
						}, {
							name : 'SENT_FAIL',
							statusId : 4
						}, {
							name : 'SENT_RECEIPT',
							statusId : 5
						}, {
							name : 'RECV_OK',
							statusId : 10
						}, {
							name : 'RECV_FAIL',
							statusId : 11
						} ]
					}),
					
		        },{
		            xtype: 'combo',
		            name: 'ussdResult',
		            fieldLabel: 'USSD Result',
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
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+100),
							statusId : 100
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+101),
							statusId : 101
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+102),
							statusId : 102
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+103),
							statusId : 103
						},{
							name : lanControll.getLanValue('smsUssdCallResult_'+104),
							statusId : 104
						}]
					}),
		        },{
					xtype:'datefield',
					fieldLabel:'Send Time Begin',
					name:'ussdTimeB',
					format: 'Y-m-d',
				},{
					xtype:'datefield',
					fieldLabel:'Send Time End',
					name:'ussdTimeE',
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
						flag:"domain_read",
						ulan:'btReset1',
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('direction').setValue(-1);
							this.up('form').getForm().findField('ussdResult').setValue(-1);
							this.up('form').getForm().findField('ussdStatus').setValue(-1);
							
						}
				}, {
				text : 'Search',
				flag:"domain_read",
				ulan:'btSearch',
					handler : function() {
						var form=this.up('form').getForm();
						
	        		    var ussdGridStore=ussdGrid.getStore();
						var params = form.getValues();
						ussdGridStore.on('beforeload', function (ussdGridStore, options) {
	        		        var params = form.getValues();
	        		        Ext.apply(ussdGridStore.proxy.extraParams, params);
	        		    },this,{single: true});
						var ussdpage=ussdGrid.down('pagingtoolbar');
						ussdpage.moveFirst();
					}
				}]
			});
			
			 this.items=[
			   {
				 region: 'center',
				 layout:'fit',
				 items:[ussdGrid]
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