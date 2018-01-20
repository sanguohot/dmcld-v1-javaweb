Ext.define('app.view.operation.domain.group.FPaidGroupPanel',{
	extend:'Ext.panel.Panel',
//	id:'fPaidGroupPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var groupInDomainStore= Ext.create('app.store.operation.domain.PaidGroupInDomainStore'); 
		var sm = Ext.create('Ext.selection.CheckboxModel',{});
		
		var fgroupTab1=Ext.create('Ext.grid.Panel',{
			title:lanControll.getLanValue('tiPaidGrpList'),
//			id:'fPaidGroupTab',
			itemId:'grid',
			treeName:'',
			parentNodeTid:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
//			plugins: [cellEditing],
			store: groupInDomainStore, 
			selModel: sm,					
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true},
					{header: 'Domain Uuid',dataIndex: 'domainUuid',hidden:true},
					{header: 'Paid Group',dataIndex: 'name',ulan:'paidGroupName',width:120},
					{header: 'Total Count',dataIndex: 'totalCount',width:120},
					{header: 'Used Count',dataIndex: 'usedCount',width:120},
					{header: 'Unused Count',dataIndex: 'unusedCount',width:120},
					{header: 'Create Time',dataIndex: 'createTime',hidden:true,xtype: 'datecolumn', format:'y-m-d H:i:s',width:90},
					{header: 'Update Time',dataIndex: 'updateTime',hidden:true,xtype: 'datecolumn', format:'y-m-d H:i:s',width:90},
					{header: 'Description',dataIndex: 'detailDesc',flex:1},
					{header: 'defaultFlag',dataIndex: 'defaultFlag',width:80,hidden:true},
					
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
        			var ot=Ext.getCmp('operationTree');
        			if(maintenance){
        				ot = Ext.getCmp('maintenanceTree');
        			}
        			var uuid=row.get('uuid');
        			var rootNode=ot.getRootNode();
        			var node=rootNode.findChild('nid','paidgroup_'+uuid,true);
        			ot.fireEvent('itemclick',null,node);
				},
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    			},
	    			single:true
	    		}
			},
	    	maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			var add = Ext.create('Ext.button.Button',{
						xtype : 'button',
						text : 'Add Paid Group',
						iconCls : 'add',
						flag:"domain_edit",
						ulan:'btAdd',
						listeners : {
							click : function() {
						
								var tid=this.up('panel').parentNodeTid;
								
								var addPaidGroup = Ext.getCmp('addPaidGroup');
								if(addPaidGroup=='undefined'||addPaidGroup==undefined){
									addPaidGroup=Ext.create('app.view.operation.domain.group.AddPaidGroup');
									lanControll.setLan(addPaidGroup);
								}
								addPaidGroup.down('form').getForm().reset();
								
								addPaidGroup.down('form').getForm().findField('domainUuid').setValue(tid);
								addPaidGroup.show();
							}
						}
					});
	    			tbar.push(add);
	    			tbar.push('-');
	    			
	    			var del = Ext.create('Ext.button.Button',{
						xtype : 'button',
						text : 'Delete Group',
						iconCls : 'remove',
						flag:"domain_edit",
						ulan:'btDel',
						listeners : {
							click : function() {
								if (fgroupTab1.getSelectionModel().hasSelection()) {
									
											var records = fgroupTab1.getSelectionModel().getSelection();
											var ids="";
											var cnt=0;
											var names="";
											var domainUuid=0;
											var name = "";
											for ( var i = 0; i < records.length; i++) {
												if(records[i].get('defaultFlag')>0){
													 Ext.MessageBox.alert(boxWarnning,records[i].get('name')+boxDefault);
													 return;
												}
												if(i==0){
													domainUuid=records[i].get('domainUuid');
													ids=records[i].get('uuid');
													names=records[i].get('name');
													name=records[i].get('name');
												}else {
													cnt=1;
													ids=ids+","+records[i].get('uuid');
													names=names+","+records[i].get('name')
												}
												
											}
											
											Ext.Ajax.request({
						                		url:'paidListManager!checkPaidGroup.action?paidGrpUuids='+ids+"&paidGrpNames="+names,
						                		method:'POST',
						                		callback: function (options, success, response) {
							             var obj=Ext.JSON.decode(response.responseText);			
							               if(obj['success']){
							            	   boxDelPaidGrp = lanControll.getLanValue('boxDelPaidGrp');
													Ext.MessageBox.confirm(boxWarnning,boxDelPaidGrp,function(e) {
														if (e == 'yes') {
															Ext.Ajax.request({
										                		url:'paidGroupManager!deleteGroup.action?uuids='+ids+"&domainUuid="+domainUuid+"&name="+name,
										                		method:'POST',
										                		callback: function (options, success, response) {
																	var obj=Ext.JSON.decode(response.responseText);
																	
											                    	if(obj['success']){
											                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
											                    		var domainUuid=fgroupTab1.parentNodeTid
											                        	fgroupTab1.getStore().load({params:{domainUuid:domainUuid}});
											                    		//fgroupTab1.getStore().load();
											                    	}else{
											                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
											                    	}
										                    	}
										                	});
														}
			
													})
							               }else{
							            	   Ext.MessageBox.alert(boxWarnning,obj['msg']+boxHasChildNode);
							               }
							                  		 }
											})
								}
							}

						}
					});
	    			tbar.push(del);
	    			tbar.push('-');
	    		}
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
		       		 listeners:{
		       		 	click:function(){
							var domainUuid=fgroupTab1.parentNodeTid
							fgroupTab1.getStore().load({params:{domainUuid:domainUuid}});
		       	 		}
		       	 	}
	       	 	});
	    		tbar.push(refresh);
	    		for(var i=0;i<tbar.length;i++){
	    			if(tbar[i]!='-' && tbar[i]!='->'){
	    				var text = lanControll.getLanValue(tbar[i].ulan);
	    				tbar[i].setText(text);
	    			}
	    		}
	    		var dockedItems = {
	    				xtype:'toolbar',
	    				dock: 'top',
	    				items:tbar
	    		};
	    		this.addDocked(dockedItems);
	    	},
			
		});
		fgroupTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(fgroupTab1);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[fgroupTab1]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});