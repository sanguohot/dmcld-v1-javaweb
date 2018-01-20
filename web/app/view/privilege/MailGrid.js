Ext.define('app.view.privilege.MailGrid',{
	extend:'Ext.panel.Panel',
	title:lanControll.getLanValue('tiMailList'),
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	node:null,
	initComponent: function() {
		var userStore=Ext.create('app.store.privilege.MailListStore',{});
		this.store = userStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var node = this.node;
		var userGrid = Ext.create('Ext.grid.Panel', {
			border:false,
			itemId:'mailGrid',
			columnLines:true,
			store: userStore,
			selectAll:0,
			selModel: sm,
			viewConfig: {
				enableTextSelection: true
	  		},
			columns: [
				{header: 'domainName',dataIndex: 'domainName',hidden:true,width:140},
				{header: 'dstAddr',dataIndex: 'dstAddr',width:170},
				{header: 'subject',dataIndex: 'subject',minWidth:140,flex:1},
				{header: 'Send Time',dataIndex:'mailTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:150},
				{header: 'Result',dataIndex: 'mailResult',width:120,
					renderer:function(val){
						return rs.mailResult(val);
					}
				},
				{header: 'logUuid',dataIndex: 'logUuid',hidden:true },
				{header: 'mailqUuid',dataIndex: 'mailqUuid',hidden:true },
				{header: 'domainUuid',dataIndex: 'domainUuid',hidden:true,width:140},
				{header: 'contentType',dataIndex: 'contentType',hidden:true,width:140},
				{header: 'resultDesc',dataIndex: 'resultDesc',hidden:true,width:140},
				{header: 'path',dataIndex: 'path',hidden:true,width:140},
			],
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: userStore,
			     pageSize: 25,
			     displayInfo: true,
			}],
		listeners: {
			itemclick:function(view, record, item, index, e, eOpts ){
	  			
	  		}
		}
	});
		var sendMail = Ext.create('Ext.button.Button',{
            text: 'ReSend',
            ulan:'btReSendMail',
            iconCls:'mail_small',
            handler: function() {
	    		var records = userGrid.getSelectionModel().getSelection();
				var ids="";
				if(userGrid.getSelectionModel().hasSelection()){
					var mails=records[0].get('dstAddr');
					var domainUuids=records[0].get('domainUuid');
	               
					var content="";
					var path="";
					var subject="";
					for ( var i = 0; i < records.length; i++) {
						var dstAddr=records[i].get('dstAddr');
						if(dstAddr.lastIndexOf(";")-1!=dstAddr.length){
							dstAddr=dstAddr+";";
						}
						if(i==0){
							domainUuids=records[i].get('domainUuid');
							mails=dstAddr;
							path=records[i].get('path');
							subject=records[i].get('subject');
						}else {
							domainUuids=domainUuids+","+records[i].get('domainUuid');
							if(mails.indexOf(dstAddr)<0){
								mails=mails+dstAddr;
							}
						}
					}
					
					
					var addMail=Ext.getCmp('addMail');
	                if(addMail==undefined || addMail=='undefined'){
	                	addMail=Ext.create('app.view.common.AddMail',{});
	                	lanControll.setLan(addMail);
	                }
	                addMail.down('form').getForm().findField('domainUuids').setValue(domainUuids);
	                addMail.down('form').getForm().findField('dstAddr').setValue(mails);
	                addMail.down('form').getForm().findField('subject').setValue(subject);
	                

					path=path.substring(path.lastIndexOf('\\'));
					if(path.lastIndexOf('/')>0){
						path=path.substring(path.lastIndexOf('/'));
					}
					path='temp/mail'+path;
					ajaxrequest(path,"post",true,null,function(rs){
						var res=rs.responseText;
						addMail.down('form').getForm().findField('content').setValue(res);
						addMail.show();
					},document);
	                

				}
			}
    	});
		var del = Ext.create('Ext.button.Button',{
    		text:'Delete',
    		ulan:'btDel',
    		iconCls:'remove',
    		listeners:{ 
    			click: function() {
    					if ( userGrid.getSelectionModel().hasSelection()){
    						
								var selectAll=userGrid.selectAll;
	   							var info="";
	   							if(selectAll==1){
	   								info="Are you sure delete comply with the conditions of Mail";
	   							}else{
	   								info="Are you sure Delete current Mail";
	   							}
								
								var records = userGrid.getSelectionModel().getSelection();
								var name = "";
								var logUuids="";
								var mailqUuids="";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										logUuids=records[i].get('logUuid');
										mailqUuids=records[i].get('mailqUuid');
									}else {
										logUuids=logUuids+","+records[i].get('logUuid');
										mailqUuids=mailqUuids+","+records[i].get('mailqUuid');
									}
								}
								Ext.MessageBox.confirm(boxWarnning,info,function(e){
									if( e == 'yes' ){
										var form=userGrid.up('panel').up('panel').down('form').getForm();
										var param=form.getValues();
//										var param=userGrid.store.proxy.extraParams;
										Ext.Ajax.request({
											url:'mailqManager!deleteMail.action?mailqUuids='+mailqUuids+'&logUuids='+logUuids+"&selectAll="+selectAll,
											method:'POST',
											params:param,
											callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);			
												if(obj['success']){
													Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
													userGrid.selectAll=0;
													userGrid.getStore().load();
												}else{
													Ext.MessageBox.alert(boxFailture,boxDelFail);
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
		
		var clearMail = Ext.create('Ext.button.Button',{
    		text:'Clear Mail',
    		ulan:'btClear',
    		iconCls:'option',
    		listeners:{ 
    			click: function() {
    					if ( userGrid.getSelectionModel().hasSelection()){
    						
								var selectAll=userGrid.selectAll;
	   							var info="";
	   							if(selectAll==1){
	   								info="Are you sure clear comply with the conditions of Mail";
	   							}else{
	   								info="Are you sure clear current Mail";
	   							}
								
								var records = userGrid.getSelectionModel().getSelection();
								var name = "";
								var logUuids="";
								var mailqUuids="";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										logUuids=records[i].get('logUuid');
										mailqUuids=records[i].get('mailqUuid');
									}else {
										logUuids=logUuids+","+records[i].get('logUuid');
										mailqUuids=mailqUuids+","+records[i].get('mailqUuid');
									}
								}
								Ext.MessageBox.confirm(boxWarnning,info,function(e){
									if( e == 'yes' ){
										var form=userGrid.up('panel').up('panel').down('form').getForm();
										var param=form.getValues();
//										var param=userGrid.store.proxy.extraParams;
										Ext.Ajax.request({
											url:'mailqManager!clearMail.action?mailqUuids='+mailqUuids+'&logUuids='+logUuids+"&selectAll="+selectAll,
											method:'POST',
											params:param,
											callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);			
												if(obj['success']){
													Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
													userGrid.selectAll=0;
													userGrid.getStore().load();
												}else{
													Ext.MessageBox.alert(boxFailture,boxDelFail);
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
		
		var sel = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text: 'Select All',
      		 ulan:'btSelectAll',
      		 iconCls: 'selectAll',
      		 flag:"domain_read",
      		 listeners:{
      			 click:function(){
					if(userGrid.selectAll==1){
						userGrid.selectAll=0;
						userGrid.selModel.setLocked(false);	
						userGrid.getSelectionModel().deselectAll(); 
      		 			this.setIconCls('selectOut');
      		 		}else{
      		 			this.setIconCls('selectIn');
      		 			userGrid.selectAll=1;
      		 			userGrid.getSelectionModel().selectAll();
      		 			userGrid.selModel.setLocked(true);
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
					this.up('panel').down('panel[itemId=mailGrid]').getStore().load();
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
		var node = this.node;
		tbar.push(sendMail);
		tbar.push("-");
		tbar.push(clearMail);
		tbar.push("-");
		tbar.push(del);
		tbar.push("-");

		tbar.push(sel);
		tbar.push('-');
		tbar.push(refresh);
		tbar.push("->");
		tbar.push(search);
		this.tbar=tbar;	
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:100
			},
			items : [{
				xtype:'textfield',
				fieldLabel:'Domain Name',
				name:'domainName',
			},{
				xtype:'textfield',
				fieldLabel:'Subject',
				name:'subject',
			},{
				xtype:'textfield',
				fieldLabel:'Email Address',
				name:'dstAddr',
			},{
	            xtype: 'combo',
	            name: 'mailResult',
	            fieldLabel: 'Result',
				mode : 'local',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name:'-SELECT-',
						value:-1,
					},{
						name:'NULL',
						value:0,
					},{
						name : 'WAIT',
						value : 1
					}, {
						name : 'SENDING',
						value : 2
					}, {
						name : 'FAIL',
						value : 3
					}, {
						name : 'SUCCESS',
						value : 4
					}  ]
				}),

			}],
			
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
					Ext.apply(userStore.proxy.extraParams, params);
					this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
				}
			}]
		});
		
		 this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[userGrid]
			       
			},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 border:false,
			 width:300,
			 items:[search_grid]
		 }
		 ];
//		 userStore.load();
		this.callParent(arguments);		
	}	
})