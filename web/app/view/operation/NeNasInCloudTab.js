Ext.define('app.view.operation.NeNasInCloudTab',{
		extend:'Ext.panel.Panel',
		title:'',
		layout:'border',
		treeId:'',
		store:null,
		initComponent: function() {
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var nesInSiteStore= Ext.create('app.store.operation.domain.roamzone.site.NeNasInSiteStore', {});
			this.store = nesInSiteStore;
			nesInSiteStore.on('beforeload',function(){
				nesInSiteStore.loadFlag = false;
			})
			var sm = Ext.create('Ext.selection.CheckboxModel');
			var move = Ext.create("Ext.button.Button",{
	       		 xtype:'button',
	       		text:'Add Device',
				ulan:'tiDomainList',
				iconCls:'add',
				flag:"domain_edit",
	       		 listeners:{
	       		 	click:function(){
	       		 		if(nesGrid.getSelectionModel().hasSelection()){
	       		 			var records=nesGrid.getSelectionModel().getSelection();
							var ids="";
							var selectAll=nesGrid.selectAll;
							var domainUuid=0;
							var domainName='';
							if(selectAll==1){
								ids=records[0].get('uuid');
								for(var i=0;i<records.length;i++){
									if(i==0){
										domainUuid=records[i].get('domainUuid');
									}
									if(domainUuid!=records[i].get('domainUuid')){
										Ext.MessageBox.alert(boxWarnning,lanControll.getLanValue('boxSameRecordSel'));
										return;
									}
								}
							}else{
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										domainUuid=records[i].get('domainUuid');
										domainName=records[i].get('domainName');
										ids=records[i].get('uuid');
									}else {
										if(domainUuid!=records[i].get('domainUuid')){
											Ext.MessageBox.alert(boxWarnning,lanControll.getLanValue('boxSameRecordSel'));
											return;
										}
										ids=ids+","+records[i].get('uuid');
									}
								}
							}
							
							if(domainUuid==0){
								var movePanel = Ext.getCmp('moveNeNa');
				       			if(movePanel==undefined|| movePanel=='undefined'){
				       				movePanel=Ext.create('app.view.operation.MoveNeNaPanel',{});
				       				lanControll.setLan(movePanel);
				       			}
//				       			Ext.apply(movePanel.store.proxy.extraParams, {});
				       			movePanel.store.load();
				       			
				       			var form=nesGrid.up('panel').up('panel').down('form').getForm();
				       			var param=form.getValues();
//				       			var param=nesGrid.store.proxy.extraParams;
								var temp={};
								temp['uuids']=ids;
								temp['selectAll']=selectAll;
								temp['runStatus']=param['runStatus'];
								temp['alias']=param['alias'];
								temp['adminStatus']=param['adminStatus'];
								temp['productSn']=param['productSn'];
								temp['productName']=param['productName'];
								movePanel.param=temp;
			        			movePanel.show();
							}else{
	    						var addNe=Ext.getCmp('updateNeNa');
				        		if(addNe=='undefined'||addNe==undefined){
				        			addNe=Ext.create('app.view.operation.UpdateNeNa',{
			        					id:'updateNeNa',
				        			});
				        			lanControll.setLan(addNe);
				    			}
				        		var form=nesGrid.up('panel').up('panel').down('form').getForm();
				       			var param=form.getValues();
//				        		var param=nesGrid.store.proxy.extraParams;
								var temp={};
								temp['uuids']=ids;
								temp['selectAll']=selectAll;
								temp['runStatus']=param['runStatus'];
								temp['alias']=param['alias'];
								temp['adminStatus']=param['adminStatus'];
								temp['productSn']=param['productSn'];
								temp['productName']=param['productName'];
				        		addNe.param=temp;
	    						var comboxStore = addNe.comboxStore;
				    			comboxStore.removeAll();
				    			comboxStore.on('load',function(){
									var siteUuid = addNe.down('form').getForm().findField('siteUuid');
									var siteStore = siteUuid.store;
				
									siteStore.removeAll();
									for(var i=0; i<comboxStore.getCount(); i++){
										if(comboxStore.getAt(i).get('type')=='site'){
											siteStore.add(comboxStore.getAt(i));
										}
									}
									addNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);
									addNe.show();
				    			},this,{single: true});
				    			comboxStore.load({params:{domainUuid:domainUuid,types:'site'}});	  
	    					
							}
			       			
      		 			}else{
      		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
      		 				return;
      		 			}
	       	 		}
	       	 	}
			});
			var nesGrid = Ext.create('Ext.grid.Panel', {
				border:false,
				itemId:'grid',
				columnLines:true,
				store: nesInSiteStore, 
				selModel: sm,
				selectAll:0,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [{
				        	header:"mark",
				  			dataIndex:"addFlag",
							width:120,
							hidden:false,
							renderer: function(value,metaData,record,rowIndex,store,view){
								if(value==0){
									return rs.getIcon('white',rs.mark(value));
								}else{
									return rs.getIcon('blue',rs.mark(value));
								}
							}
				          },
				         {header: 'uuid', dataIndex: 'uuid', hidden:true},
				         {header: 'Device SN',sortable:false, dataIndex: 'productSnStr',ulan:'productSn',width:160},
				         {header: 'Device Model', dataIndex: 'productName'},
				         {header: 'Alias', dataIndex: 'alias',width:120,hidden:true},
						{header: 'Admin Status', dataIndex: 'adminStatus',hidden:true,
							renderer:function(val){
								return rs.adminStatus(val);
							 }
						},
						{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',
							renderer:function(val){
								return rs.oprStatus(val);
							}
						},
						{header: 'Run Status', dataIndex: 'runStatus',
							renderer:function(val){  
								return rs.runStatus(val);
							}
						},
						{header: 'sysName', dataIndex: 'sysName',sortable:false},
//						{header: 'Mark', dataIndex: 'addFlag',
//							renderer:function(val){
//								return rs.mark(val);
//							}
//						},
						{header: 'domainName', dataIndex: 'domainName',sortable:false},
						{header: 'Last Register',dataIndex: 'lastMsgTime',width:140,xtype: 'datecolumn',format:'m-d H:i:s',},
						{header: 'Out IP',dataIndex: 'outerIpAddr',width:120},
						{header: 'sysUuid', dataIndex: 'sysUuid',hidden:true},
				        {header: 'domainUuid', dataIndex: 'domainUuid',hidden:true},
				],
				listeners:{
	    			itemdblclick: function(grid, row, columnindex,e){
	    				move.fireEvent('click');
	    			}
	    		},
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: nesInSiteStore,
			     pageSize: 25,
			     displayInfo: true,
			}]
		});

			this.tbar=[move,'-',{
					xtype:'button',
					text:'Remote Web',
					ulan:'btRemoteWeb',
					iconCls: 'domain-group',
					flag:"domain_action",
//					menu:{
//			       		 xtype:'menu',			       		 
//			       		 items:[{
//			       			text:'New Tab',
//			       			ulan:'miNewTab',
//			       			handler:function(){
//			       		 		if ( nesGrid.getSelectionModel().getSelection().length==1){	       				
//			       		 			var records= nesGrid.getSelectionModel().getSelection();								
//			       		 			var sn=records[0].get('productSnStr');
//			       		 			var uuid=records[0].get('uuid');
//			       		 			var domainUuid=records[0].get('domainUuid');
//			       		 			var panel = this.up('panel').up('panel');
//			       		 			var id = panel.id+'_remote';
//			       		 			Ext.Ajax.request({
//			       		 				url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid+"&type=nena",
//				                		method:'POST',
//				                		callback: function (options, success, response) {
//											var obj=Ext.JSON.decode(response.responseText);			
//											if(obj['success']){
//												var url=obj['url'];				            	   
//												var remoteTab=panel.up('panel');
//												var tab = Ext.getCmp(id);
//												if(tab!=undefined){
//													tab.destroy();
//												}
//												tab=remoteTab.add({
//													title:sn,
//													id:id,
//													closable: true,
//													autoScroll: true,
//													layout:'fit',
//													items :[{
//														itemId:'remote_web',
//														layout:'fit',
//														html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
//													}]
//												});
//												tab.show();
//											}else{
//												Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
//											}
//										}
//										})
//								}else{
//									Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
//									return;
//								}
//							}
//			       		 },{
//			       			text:'New Window',
//			       			ulan:'miNewWindow',
			       			handler:function(){
			       		 		if ( nesGrid.getSelectionModel().getSelection().length==1){	       				
									var records= nesGrid.getSelectionModel().getSelection();								
									var sn=records[0].get('productSnStr');
									var uuid=records[0].get('uuid');
									var domainUuid=records[0].get('domainUuid');
									Ext.Ajax.request({
									url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid+"&type=nena",
									method:'POST',
									callback: function (options, success, response) {
									var obj=Ext.JSON.decode(response.responseText);			
										if(obj['success']){
											var url=obj['url'];
//											window.open(url);
											openChildWin(url);
										}else{
											Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
										}
									}
									})
			       		 		}else{
			       		 			Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
			       		 			return;
			       		 		}
			       		 }
//			       		 }]
//					}
		       	 },'-',{
		       		xtype:'button',
		       		text: 'SelectAll',
		       		ulan:'btSelectAll',
		       		iconCls: 'selectAll',
		       		flag:"super_read",
		       		listeners:{
		       			 click:function(){
							if(nesGrid.selectAll==1){
								nesGrid.selectAll=0;
								nesGrid.selModel.setLocked(false);	
								nesGrid.getSelectionModel().deselectAll(); 
		       		 			this.setIconCls('selectOut');
		       		 		}else{
		       		 			this.setIconCls('selectIn');
		       		 			nesGrid.selectAll=1;
		       		 			nesGrid.getSelectionModel().selectAll();
		       		 			nesGrid.selModel.setLocked(true);
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
							this.up('panel').down('panel[itemId=grid]').getStore().load();
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
		       		 		var eastSearch=this.up('panel').down('panel[itemId=search]');
		       		 		if(eastSearch.isHidden()){
		       		 			eastSearch.expand();
		       		 		}else{
		       		 			eastSearch.collapse();
		       		 		}
		       	 		}
		       	 	}
		    }];
			
			var sysStore = Ext.create('app.store.util.ComboxStore',{});
			sysStore.on('beforeload', function (sysStore, options) {
		        var params = { cloudUuid:-99};
		        Ext.apply(sysStore.proxy.extraParams, params);
		    });

			var search_grid=Ext.create('Ext.form.Panel',{
				border : false,
				bodyPadding : 5,
				defaults : {
	    			width:285,
	    			margins : '0 0 10 0'
	    		},
				items : [{
					xtype:'textfield',
					fieldLabel:'Device SN',
					name:'productSn',
				},{
					xtype:'textfield',
					fieldLabel:'Alias',
					name:'alias',
				},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null),{
					name : 'addFlag',
					xtype: 'combo',
					mode: 'local',
					fieldLabel: 'Mark',
					editable:false,
					displayField: 'name',
					valueField: 'uuid',
					queryMode: 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'uuid' ],
						data : [
						        {name:'-SELECT-',uuid:-1},
						        {name:'new',uuid:0},
						        {name:'edit',uuid:1}
						]
					}),
					listConfig: {
			    		getInnerTpl: function(displayField) {
							removeCSSRule(styleSheet,'.icon_new::before');
							var obj = {width:13,height:13,lineHeight:13,color:'white',textAlign:'center',content:'',border:'1px solid black'};
							setPseudo3(styleSheet,'.icon_new::before',obj);
	
							removeCSSRule(styleSheet,'.icon_edit::before');
							var obj = {width:15,height:15,lineHeight:15,color:'blue',textAlign:'center',content:'',border:'0'};
							setPseudo3(styleSheet,'.icon_edit::before',obj);
//							var tmp = '<span class=icon_'+color+'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;'+content;
							
							return "<span class='icon_{name}'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}";
			        	}  
			    	},
					value:-1
				},{
					name : 'sysUuid',
					xtype: 'combo',
					mode: 'local',
					fieldLabel: 'Current Server',
					editable:false,
					displayField: 'name',
					valueField: 'uuid',
					queryMode: 'local',
					store:sysStore,
					value:-1
				},{
					xtype:'textfield',
					fieldLabel:'Type',
					name:'productName',
				}],
				buttons : [{
						text : 'Reset',
						ulan:'btReset1',
						flag:"super_read",
						handler : function() {
							this.up('form').getForm().reset();
							this.up('form').getForm().findField('adminStatus').setValue(0);
							this.up('form').getForm().findField('runStatus').setValue(0);
							this.up('form').getForm().findField('sysUuid').setValue(-1);
							this.up('form').getForm().findField('addFlag').setValue(-1);
						}
				}, {
				text : 'Search',
				ulan:'btSearch',
				flag:"super_read",
				handler : function() {
					var store = this.up('form').up('panel').up('panel').store;
					var form=this.up('form').getForm();
					var params = form.getValues();
					store.on('beforeload', function (store, options) {
				        Ext.apply(store.proxy.extraParams, params);
				    },this,{single: true});
					this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
				}
				}]
			});
			nesInSiteStore.on('load', function(){
		    	var total = nesInSiteStore.getCount();//数据行数  	    	
		    	if(nesGrid.selectAll==1){
		    		nesGrid.selModel.setLocked(false);
					if(total>0){
						nesGrid.selModel.selectRange(0,total-1,true);  
					}
					nesGrid.selModel.setLocked(true);
				}else{
					nesGrid.selModel.setLocked(false);
				}	
		    });
			 this.items=[{
				region: 'center',
				layout:'fit',
				items:[nesGrid]
			 },{
				itemId:'search',
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
