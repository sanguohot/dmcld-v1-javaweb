Ext.define('app.view.dm.NumDMGrid',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	treeId:'',
	store:null,
	initComponent: function(){
		var me=this;
		var type = this.type;
		var store = Ext.create('app.store.dm.NumDMStore',{});
		this.store=store;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var numGrid = Ext.create('Ext.grid.Panel', {
				border:false,
				itemId:'numGrid',
				columnLines:true,
				store: store, 
				selModel: sm,
				selectAll:0,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
				columns: [
				        {header: 'uuid',  dataIndex: 'uuid',hidden:true },
				        {header: 'Number',  dataIndex: 'num',width:140},
				        {header: 'Action', dataIndex: 'action',width:120,
							renderer:function(val){  
								return rs.dmNumAction(val);
							} 
						},
						{header: 'createTime',dataIndex:'createTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:160,},
						{header: 'domainUuid', dataIndex: 'domainUuid',width:120,hidden:true,},
				],
				dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: store,
			     pageSize: 25,
			     displayInfo: true,
				}	 	
			],
			viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true,
			},
		});
		store.on('load', function(){
	    	var total = store.getCount();//数据行数
	    	if(numGrid.selectAll==1){
	    		numGrid.selModel.setLocked(false);
				if(total>0){
					numGrid.selModel.selectRange(0,total-1,true);  
				}
				numGrid.selModel.setLocked(true);
			}else{
				numGrid.selModel.setLocked(false);
			}	
	    });
		numGrid.addListener('itemdblclick',function(view, record, item, index, e, eOpts){
			if(numGrid.selectAll==1){
				if (numGrid.getSelectionModel().hasSelection() ){
					numGrid.updateNum(numGrid.getSelectionModel().getSelection());					
				}else{
					Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
				}
			}else{
				numGrid.updateNum([record]);
			}
		});
		this.tbar = this.createTbar(type,maintenance,numGrid);
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:100
			},
			items : [
			         {xtype:'textfield',name:'num',fieldLabel:'Number'},
			         {
			        	 xtype:'combo',
			        	 name:'action',
			        	 fieldLabel:'Action',
			        	 mode:'local',
			        	 editable:false,
			        	 displayField:'name',
			        	 valueField:'value',
			        	 querymode:'local',
						store:Ext.create('Ext.data.Store',{
							fields:['name','value'],
							data:[
							      {name:lanControll.getLanValue('dmNumAction_0'),value:0},
							      {name:lanControll.getLanValue('dmNumAction_1'),value:1},
							      {name:lanControll.getLanValue('dmNumAction_2'),value:2},
							      {name:lanControll.getLanValue('dmNumAction_3'),value:3},
							      {name:lanControll.getLanValue('dmNumAction_4'),value:4},
							      ]
						}),
						value:0,
			         },
			         ],
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
					}
			},{
				text : 'Search',
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
					var params = form.getValues();
					Ext.apply(store.proxy.extraParams, params);				
					this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
				}
			}]
		});

		 this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[numGrid]
			       
			},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 border:true,
			 width:300,
			 items:[search_grid]
		 }
		 ];
		this.callParent(arguments);	
	},
	createTbar:function(type,maintenance,numGrid){
		var me=this;
		var id=me.id;
		var staticFlag=1;
		if(id.indexOf("d")>=0) staticFlag=0;
		var add = Ext.create('Ext.button.Button',{
    		xtype:'button',
    		text: 'Add',
    		ulan:'btAdd',
    		iconCls:'add',
    		listeners:{ 
    			click: function() {
					var domainUuid = numGrid.domainUuid;
					if(!domainUuid){
						domainUuid = Ext.get("domainUuid").value;
					}
					var win=Ext.getCmp('addDMNum');
					if(!win){
						win=Ext.create('app.view.dm.AddDMNum');
					}
					win.down('form').store=numGrid.store;
					win.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					win.show();
					
    			}						
    		},
    	});
		
		var boxDelNum = lanControll.getLanValue("boxDelNum");
		var del = Ext.create('Ext.button.Button',{
    		text:'Delete',
    		ulan:'btDel',
    		iconCls:'remove',
    		listeners:{ 
    			click: function() {
    					if ( numGrid.getSelectionModel().hasSelection() ){
    						Ext.MessageBox.confirm(boxWarnning,boxDelNum,function(e) { 																				
								if( e == 'yes' ){
									var records = numGrid.getSelectionModel().getSelection();
									var ids="";
									var cnt=0;
									var name = "";
									var domainUuid = numGrid.domainUuid;
									for ( var i = 0; i < records.length; i++) {
										if(i==0){
											ids=records[i].get('uuid');
											name=records[i].get('num');
										}else {
											cnt=1;
											ids=ids+","+records[i].get('uuid');
										}
									}
									if(numGrid.selectAll==1){
										ids = "";
									}
									var form=numGrid.up('panel').up('panel').down('form').getForm();
	      							var param=form.getValues();
	      							param['domainUuid'] = domainUuid;
	      							param['uuids'] = ids;
	      							param['selectAll']=numGrid.selectAll;
									Ext.Ajax.request({
				                		url:'numDMManager!deleteNum.action',
				                		method:'POST',
				                		params:param,
				                		callback: function (options, success, response) {
					                    var obj=Ext.JSON.decode(response.responseText);			
				                    		if(obj['success']){
				                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    			numGrid.selectAll=0;
				                    			numGrid.selModel.setLocked(false);
				                    			numGrid.getSelectionModel().deselectAll();
				                    			var store=numGrid.getStore();
				                    			var page=me.down("pagingtoolbar");				                   
				                    			if(numGrid.getStore().getCount()==records.length){
				                    				page.moveFirst();
				                    			}else{
				                    				store.load();
				                    			}
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
					                    	}
				                    	}
				                	});
								}	
    						})
    					}else{
    						Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	   		 				return;
    					}
    				}		
    		}							
    	});
		var set = Ext.create('Ext.button.Button',{
    		text:'Setting',
    		ulan:'btSetting',
    		iconCls:'option',
    		listeners:{ 
    			click: function() {
					if (numGrid.getSelectionModel().hasSelection() ){
						var win =Ext.getCmp('updateDMNum');
						if(!win){
							win=Ext.create('app.view.dm.UpdateDMNum');
						}
						var ids="";
						var domainUuid = numGrid.domainUuid;
						var records = numGrid.getSelectionModel().getSelection();
						for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('uuid');
							}else {
								ids=ids+","+records[i].get('uuid');
							}
						}
						var form=win.down('form').getForm();
						if(records.length==1){
							form.findField('num').setValue(records[0].get('num'));
							form.findField('action').setValue(records[0].get('action'));
						}
						win.down('form').store=numGrid.store;
						form.findField('uuids').setValue(ids);
						form.findField('domainUuid').setValue(domainUuid);
						win.show();
						
					}else{
						Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
   		 				return;
					}
				}		
    		}							
    	});
		var importC = Ext.create('Ext.button.Button',{
     		 xtype:'button',
     		 text:lanControll.getLanValue("btImport"),
     		 iconCls:'upgrade',
     		 flag:"domain_edit",
     		 listeners:{
     		 	click:function(){
					var domainUuid = numGrid.domainUuid;
					if(!domainUuid){
						domainUuid = Ext.get("domainUuid").value;
					}
					var importPaidCard=Ext.getCmp('importDMNum');
					if(importPaidCard==undefined){
						importPaidCard=Ext.create('app.view.dm.ImportDMNum');
					}
					importPaidCard.down('form').store=numGrid.store;
					importPaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					importPaidCard.show();
     		 		
     	 		}
     	 	}
     	 
     	 });
		var exportC = Ext.create("Ext.button.Button",{
      		 xtype:'button',
      		 text:'Export',
      		 ulan:lanControll.getLanValue('btExport'),
      		 iconCls:'export',
      		 flag:"domain_read",
      		 listeners:{
      		 	click:function(){

	       			if ( numGrid.getSelectionModel().hasSelection() ){
	       				
						var records= numGrid.getSelectionModel().getSelection();
						var ids="";
						var cnt=0;
						var domainUuid = numGrid.domainUuid;
						if(!domainUuid){
							domainUuid = Ext.get("domainUuid").value;
						}
						var selectAll=numGrid.selectAll;
						if(selectAll==1){
							info=lanControll.getLanValue('boxExport');
							ids="";
						}else{
							info=lanControll.getLanValue('boxExport');
							var names=new Array();
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
								}else {
									cnt=1;
									ids=ids+","+records[i].get('uuid');
								}
							}
						}
						var id=me.id;
						var staticFlag=1;
						if(id.indexOf("d")>=0) staticFlag=0;
						Ext.MessageBox.confirm(boxWarnning,info,function(e) { 																				
							if( e == 'yes' ){
								var form=numGrid.up('panel').up('panel').down('form').getForm();
      							var param=form.getValues();
      							param['domainUuid'] = domainUuid;
      							param['uuids'] = ids;
      							
      							var boxObj = {
      	               		    		title:boxInfo,
      	               		    		width : 300,
      	               		    		msg:boxWaitMsg,
      	               		    		modal:true,
      	               		    		closable:false,
      	               		    		wait:true
      	               		    };
      	               			var msg = Ext.MessageBox.show(boxObj);
      							
								Ext.Ajax.request({
									url:'exportConfig!exportDMNum.action',
									method:'POST',
									timeout:60*60*1000,
									params:param,
									callback: function (options, success, response) {
									boxObj.wait = false;
	               					msg.hide();
									var obj=Ext.JSON.decode(response.responseText);
									if(obj["success"]){
										window.location.href="download/"+obj["fileName"];
									}else{
										Ext.MessageBox.alert(boxFailture,boxExportFail);
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
		var sel = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text: 'Select All',
      		 iconCls: 'selectAll',
      		 ulan:'btSelectAll',
      		 flag:"domain_read",
      		 selectAll:0,
      		 listeners:{
      			 click:function(){
      		 		if(numGrid.selectAll==1){      		 			
      		 			numGrid.selectAll=0;
      		 			numGrid.selModel.setLocked(false);
      		 			numGrid.getSelectionModel().deselectAll();
      		 			this.setIconCls('selectOut');
      		 		}else{
       		 			this.setIconCls('selectIn');
	       		 		numGrid.selectAll=1;
	       		 		numGrid.getSelectionModel().selectAll();
	       		 		numGrid.selModel.setLocked(true);
      		 		}
      		 	}
      		 }
      	 });
		var refresh = Ext.create("Ext.button.Button",{
     		 xtype:'button',
      		 text:'Refresh',
      		 ulan:'btRefresh',
      		 iconCls:'refresh2',
      		 listeners:{
      		 	click:function(){
					this.up('panel').down('panel[itemId=numGrid]').getStore().load();
      	 		}
      	 	}
      	 });
		var search = Ext.create("Ext.button.Button",{
     		 xtype:'button',
      		 text:'Search',
      		ulan:'btSearch',
      		 iconCls:'search',
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
		
		var tbar = [];
		if(!maintenance){
			tbar.push(add);
			tbar.push('-')
			tbar.push(del);
			tbar.push('-');
			tbar.push(set);
			tbar.push('-');
		}
		tbar.push(importC);
		tbar.push('-');
		tbar.push(exportC);
		tbar.push('-');
		tbar.push(sel);
		tbar.push('-');
		tbar.push(refresh);
		tbar.push('->');
		tbar.push(search);
		return tbar;
	},
});