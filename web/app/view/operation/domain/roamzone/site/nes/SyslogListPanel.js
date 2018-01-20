Ext.define('app.view.operation.domain.roamzone.site.nes.SyslogListPanel', {
	extend:'Ext.panel.Panel', 
	title:lanControll.getLanValue('tiSyslogList'),
	layout:'border',
	autoScroll:false,
	border:false,
	forceRefresh:0,
	moduleId:'',
	toolbars:0,
	otiose:0,
	domainUuid:0,
	initComponent: function() {
		
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store=Ext.create('app.store.util.ProvisionFileStore',{});
		this.store = store;
		var otiose=this.otiose;
		var toolbars=this.toolbars;
		var moduleId=this.moduleId;
		var sm = Ext.create('Ext.selection.CheckboxModel');		
		var syslogGrid=Ext.create('Ext.grid.Panel',{
			itemId:'grid',
			columnLines:true,
			store:store,
			title:'',
			selModel:sm,
			autoScroll:true,
			border:false,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			treeName:'',
			columns: [
			    {header: 'uuid', dataIndex: 'uuid', hidden:true},
				{header: 'Device SN', sortable:false, dataIndex: 'productSnStr', ulan:'productSn', width:160,hidden:true},
				{header: 'Alias',  dataIndex: 'alias',width:140},
				
		        {header: 'Admin Status', dataIndex: 'adminStatus',width:120,hidden:true,
					renderer:function(val){  
						return rs.adminStatus(val);
					 }
				},
				{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',width:120,hidden:true,
					renderer:function(val){  
						return rs.oprStatus(val);
					} 
				},
				{header: 'Run Status', dataIndex: 'runStatus',width:120,hidden:true,
					renderer:function(val){  
						return rs.runStatus(val);
					} 
				},
				{header: 'Syslog Status', dataIndex: 'syslogStatus',width:80,
					renderer:function(val){ 
		        		return rs.sysLogStatus(val);
					} 
		        },
				{header: 'Debug Level', dataIndex: 'syslogDebugLevel',width:80,hidden:true,
		        	renderer:function(val){
						return rs.sysLogDebugLevel(val);
					} 
		        },
				{header: 'File Name',dataIndex: 'fileName',ulan:'fileAbbr',width:210},
				{header: 'File Size', dataIndex: 'fileSize',width:120},
				{header: 'Last Modified', dataIndex:'lastModified',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:150},
				{header: 'fileHref',dataIndex: 'fileHref',hidden:true,flex:1},
				{header:'Link',width:140,
		            renderer: function(value,metaData,record,rowIndex,store,view){
						var href=record.get('fileHref');
						var fileName=record.get('fileName');
						var url="attachment.action?href="+href+"&fileName="+fileName;
						var download="<input type='button' onclick=window.location.href='"+url+"' value='Download'/>";
						var view="<input type='button' onclick=viewSyslog('"+this.up('panel').up('panel').up('panel').id+"','"+fileName+"','"+href+"') value='View'/>";
						
						var btn="<input type='button' align='middle' style='width:80%' onclick='' value='Download'>";
				        return download+"&nbsp;&nbsp;"+view;
			    	}
				}],
				listeners:{
					itemdblclick: function(view, record, item, index, e, eOpts){

						var records=syslogGrid.getSelectionModel().getSelection();
	 			
						var hrefs="";
						for ( var i = 0; i < records.length; i++) {
							var tabpanel = syslogGrid.up('panel').up('panel').up('panel');
							var fileName = records[i].get('fileName');
							var fileHref=records[i].get('fileHref');
							var prefix = 'syslogDetail_';
							var id=prefix+"name_"+fileName;
							var tab = Ext.getCmp(id);
							if(tab==undefined){
								tab=tabpanel.add({
			      	  	                id:id,
										title:fileName,
			    					    closable: true,
			    					    autoScroll: true,
			    					    layout:'fit',
			    					    items :[{
			    					        itemId:'remote_web',
			    							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+fileHref+'"></iframe>'
			    						}]
			        			});
							}
							tab.show();
						}
					
					
					},
				}						
		});
//		window.viewSyslog =function(tabpanel,fileName,fileHref){
//			var tabpanel = syslogGrid.up('panel').up('panel');
//			
//			var prefix = 'syslogDetail_';
//			var id=prefix+"name_"+fileName;
//			var tab = Ext.getCmp(id);
//			if(tab==undefined){
//				tab=tabpanel.add({
//	  	                id:id,
//						title:fileName,
//					    closable: true,
//					    autoScroll: true,
//					    layout:'fit',
//					    items :[{
//					        itemId:'remote_web',
//							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+fileHref+'"></iframe>'
//						}]
//    			});
//			}
//			tab.show();
//		};
		var clearSyslog={
	       		 xtype:'button',
	       		 text:'Delete Syslog',
	       		 ulan:'btDel',
	       		 iconCls:'remove',
	       		 flag:"domain_action",
	       		 listeners:{
		       		click:function(){
						
	       		 		if(syslogGrid.getSelectionModel().hasSelection()){
	       		 			var records=syslogGrid.getSelectionModel().getSelection();
	       		 			
							var names = "";
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									names = records[i].get('fileName');
								}else {
									names =names+","+ records[i].get('fileName');
								}
								Ext.MessageBox.confirm(boxWarnning,"Are you sure delete current syslog?",function(e) {
		       						if( e == 'yes' ){
		       							Ext.Ajax.request({
					                		url:'provisionFileManager!deleteSyslog.action?names='+names,
					                		method:'POST',
					                		callback: function (options, success, response) {
		       									var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
//						                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
						                    		var store=syslogGrid.store;
						              						store.load();
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
						                    	}
					                    	}
					                	})
		       						}	
								})
							}
       		 			}else{
       		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
       		 				return;
       		 			}
   	 				}
	       	 	}
		};
		
		var refresh={
	       		 xtype:'button',
	       		 text:'Refresh',
	       		ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
//						alert(syslogGrid.up('panel').id+","+syslogGrid.up('panel').domainUuid);
						var store=syslogGrid.store;
						store.load();
	       	 		}
	       	 	}
		};
		var search={
	       		 xtype:'button',
	       		 text:'Search',
	       		ulan:'btSearch',
	       		 iconCls:'search',
	       		 listeners:{
	       		 	click:function(){
	       		 		var eastSearch=syslogGrid.up('panel').up('panel').down("panel[region=east]");
	       		 		if(eastSearch.isHidden()){
	       		 			eastSearch.expand();
	       		 		}else{
	       		 			eastSearch.collapse();
	       		 		}
	       	 		}
	       	 	}
	    };
		
		var di=[{
	        xtype: 'toolbar',
	        items: []
	    }];
		var items=di[0].items;
		var tbs=this.toolbars;
		var i=0;
		items[i++]=clearSyslog;
		items[i++]='-';
		items[i++]=refresh;
		items[i++]='->';
		items[i++]=search;
		syslogGrid.addDocked(di);
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
			items : [{
				xtype:'hiddenfield',
				name:'moduleId',
				value:'syslog'
			},{
				xtype:'hiddenfield',
				name:'domainUuid'
			},{
				xtype:'textfield',
				fieldLabel:'Device SN',
				name:'productSn',
			},{
				xtype:'textfield',
				fieldLabel:'Alias',
				name:'alias',
			},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null),{
	            xtype: 'combo',
	            name: 'syslogStatus',
	            fieldLabel: 'Syslog Status',
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
						name : lanControll.getLanValue('sysLogStatus_'+0),
						statusId : 0
					}, {
						name : lanControll.getLanValue('sysLogStatus_'+1),
						statusId : 1
					}, {
						name : lanControll.getLanValue('sysLogStatus_'+2),
						statusId : 2
					} ]
				}),
				
	        },{
	            xtype: 'combo',
	            name: 'syslogDebugLevel',
	            fieldLabel: 'Syslog Level',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -2
					},{
						name : 'DISABLE',
						statusId : -1
					}, {
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
						statusId :6
					}, {
						name : 'DEBUG',
						statusId : 7
					} ]
				}),
				
	        }],
			
			buttons : [ {
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('adminStatus').setValue(0);
						this.up('form').getForm().findField('runStatus').setValue(0);
						this.up('form').getForm().findField('syslogStatus').setValue(-1);
						this.up('form').getForm().findField('syslogDebugLevel').setValue(-2);
						
						
					}
			}, {
			text : 'Search',
			ulan:'btSearch',
			handler : function() {
				
				var panel = this.up('form').up('panel').up('panel');
				var domainUuid=panel.domainUuid;
				
				var form=this.up('form').getForm();
				form.findField('domainUuid').setValue(domainUuid);
				
				var gridStore=syslogGrid.store;				
				
				var params = form.getValues();
				Ext.apply(gridStore.proxy.extraParams, params);
				panel.down('panel').down('panel').store.load();
//				var paging = panel.down("pagingtoolbar");
//				paging.moveFirst();
			}
			}]
		});		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[syslogGrid]
			},{
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:300,
			 items:[search_grid]
		 }];


		this.callParent(arguments);		
	},
//	listeners:{
//		activate: function(tab){
//			var grid=tab.down('panel').down('panel');
//			if(tab.forceRefresh==1){
//				tab.forceRefresh=0;
//				grid.store.load();
//			}
//		}
//	}
});