Ext.define('app.view.operation.domain.group.FGroupPanel',{
	extend:'Ext.panel.Panel',
//	id:'fgroupPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
	
		var groupInDomainStore= Ext.create('app.store.operation.domain.GroupInDomainStore'); 
		var sm = Ext.create('Ext.selection.CheckboxModel',{});
//		
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var fgroupTab1=Ext.create('Ext.grid.Panel',{
			title:lanControll.getLanValue('tiGrpList'),
			itemId:'grid',
			treeName:'',
			parentNodeTid:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			store: groupInDomainStore, 
			selModel: sm,
	        viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
			},
			columns: [
					{header: 'uuid',dataIndex: 'uuid',hidden:true,tdCls:'tdCls'},
					{header: 'Name',dataIndex: 'name',width:120,tdCls:'tdCls'},
					{header: 'Alias',dataIndex: 'alias',width:120,hidden:true,tdCls:'tdCls'},
					{header: 'Admin Status', dataIndex: 'adminStatus',width:120,hidden:true,
						renderer:function(val){  
							return rs.adminStatus(val);
						 }
					,tdCls:'tdCls'},
					{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',width:120,hidden:true,
						renderer:function(val){  
							return rs.oprStatus(val);
						} 
					,tdCls:'tdCls'},
					{header: 'Run Status', dataIndex: 'runStatus',width:120,
						renderer:function(val){  
							return rs.runStatus(val);
						} 
					,tdCls:'tdCls'},
					{header: 'hbmRoleType', dataIndex: 'hbmRoleType',width:120,
						renderer:function(val){
							return rs.hbmRoleType(val);
						} 
					,tdCls:'tdCls'},
//					{header: 'nextWorkGrp',ulan:'hbmNextWorkGrpAbbr',dataIndex: 'hbmPromNextGrpName',hidden:true,tdCls:'tdCls'},
//					{header: 'nextNobalGrp',ulan:'hbmNextNobalGrpAbbr',dataIndex: 'hbmNextNobalGrpName',hidden:true,tdCls:'tdCls'},
//					{header: 'nextBlockedGrp',dataIndex: 'hbmNextBlockedGrpName',ulan:'hbmNextBlockedGrpAbbr',hidden:true,tdCls:'tdCls'},
					{header: 'hbmInitSimFlag', dataIndex: 'hbmInitSimFlag',width:120,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					,tdCls:'tdCls'},
					{
			            header:'Next',
			            dataIndex:'nextGrp',
			            renderer: function(value,metaData,record,rowIndex,store,view){
							var nextWorkGrp=record.get('hbmPromNextGrpName');
							if(nextWorkGrp==""){
								nextWorkGrp="-";
							}
							var nextNobalGrp=record.get('hbmNextNobalGrpName');
							if(nextNobalGrp==""){
								nextNobalGrp="-";
							}
							var nextBlockedGrp=record.get('hbmNextBlockedGrpName');
							if(nextBlockedGrp==""){
								nextBlockedGrp="-";
							}
							var nextGrp="<font size=2>Work:</font>"+nextWorkGrp+"</br></br>";
							nextGrp=nextGrp+"<font size=2>NoBal:</font>"+nextNobalGrp+"</br></br>";
							nextGrp=nextGrp+"<font size=2>Blocked:</font>"+nextBlockedGrp;
							
					        return nextGrp;
				    	}
					,tdCls:'tdCls'},
					
//					{header: 'maxWorkSim',dataIndex: 'maxWorkSimCount',hidden:true,
//						renderer:function(val){
//							if(val==0){
//								return lanControll.getLanValue("unlimited");
//							}else{
//								return val;
//							}
//					} ,tdCls:'tdCls'},
//					{header: 'Total Count',dataIndex: 'cardTotalCount',hidden:true,tdCls:'tdCls'},
//					{header: 'Normal Count',dataIndex: 'cardAvailableCount',hidden:true,tdCls:'tdCls'},
//					{header: 'Available Count',dataIndex: 'cardIdleCount',hidden:true,tdCls:'tdCls'},
					{
			            header:'SIM',
			            dataIndex:'simCount',
			            renderer: function(value,metaData,record,rowIndex,store,view){
							var maxWorkSim=record.get('maxWorkSimCount');
							if(maxWorkSim==0){
								maxWorkSim= lanControll.getLanValue("unlimited");
							}
							var cardTotalCount=record.get('cardTotalCount');
							var cardAvailableCount=record.get('cardAvailableCount');
							var cardIdleCount=record.get('cardIdleCount');
							var sim="<font size=2>Max:</font>"+maxWorkSim+", ";
							sim=sim+"<font size=2>Total:</font>"+cardTotalCount+", ";
							sim=sim+"<font size=2>Available:</font>"+cardAvailableCount+", ";
							sim=sim+"<font size=2>Idle:</font><font color='green'>"+cardIdleCount+"</font>";
							
					        return sim;
				    	}
					,tdCls:'tdCls'},
					
					{header: 'modType',dataIndex: 'modType',hidden:true,
						renderer:function(val){
							return rs.modType(val);
						}
					,tdCls:'tdCls'},
					{header: 'hbmImeiFlag', dataIndex: 'hbmImeiFlag',width:120,hidden:true,
						renderer:function(val){  
							return rs.hbmImeiFlag(val);
						} 
					,tdCls:'tdCls'},
					{header: 'defaultEncode',dataIndex: 'defaultEncode',hidden:true,
						renderer:function(val){
							return rs.defaultEncode(val);
						}
					,tdCls:'tdCls'},
//					{header: 'nextWorkGrp',ulan:'hbmNextWorkGrp',dataIndex: 'hbmPromNextGrp',minWidth:120,tdCls:'tdCls'},
//					{header: 'nextBlockedGrp',dataIndex: 'hbmNextBlockedGrp',minWidth:120,tdCls:'tdCls'},
					{header: 'hbmAcdFlag', dataIndex: 'hbmAcdFlag',ulan:'hbmAcdAsrFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					,tdCls:'tdCls'},
					{header: 'hbmPromFlag', dataIndex: 'hbmPromFlag',ulan:'hbmPromFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					,tdCls:'tdCls'},
					{header: 'hbmSmsTestFlag', dataIndex: 'hbmSmsTestFlag',ulan:'hbmSmsTestFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					,tdCls:'tdCls'},
					{header: 'hbmCallTestFlag', dataIndex: 'hbmCallTestFlag',ulan:'hbmCallTestFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					,tdCls:'tdCls'},
					{header: 'hbmBalanceCheck', dataIndex: 'hbmBalanceCheck',ulan:'hbmBalanceCheckAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					,tdCls:'tdCls'},
					{header: 'hbmBlockedCheck', dataIndex: 'hbmBlockedCheck',ulan:'hbmBlockedCheckAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						}
					,tdCls:'tdCls'},
					{header: 'Description',dataIndex: 'detailDesc',tdCls:'tdCls'},
					{header: 'defaultFlag',dataIndex: 'defaultFlag',hidden:true,tdCls:'tdCls'},
					{header: 'zoneUuid',dataIndex: 'zoneUuid',hidden:true,tdCls:'tdCls'},
					{header: 'domainUuid',dataIndex: 'domainUuid',hidden:true,tdCls:'tdCls'},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
					var ot=Ext.getCmp('operationTree');
					if(maintenance){
						ot=Ext.getCmp('maintenanceTree');
					}
        			var uuid=row.get('uuid');
        			var rootNode=ot.getRootNode();
        			var node=rootNode.findChild('nid','group_'+uuid,true);
        			
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
					text : 'Add Group',
					iconCls : 'add',
					ulan:'btAdd',
					flag:"domain_edit",
					listeners : {
						click : function() {
					
							var tid=this.up('panel').parentNodeTid;
							
							var addGroup = Ext.getCmp('addGroup');
							if(addGroup=='undefined'||addGroup==undefined){
								addGroup=Ext.create('app.view.operation.domain.group.AddGroup');
								lanControll.setLan(addGroup);
//								lanControll.setFieldSet(addGroup);
							}
							addGroup.down('form').getForm().reset();

		        			
		        			
		        			var comboxStore = Ext.create("app.store.util.ComboxStore",{})
		        			var zoneStore=addGroup.down('form').getForm().findField('zoneUuid').store;
		        			
		        			var form=addGroup.down('form').getForm();
		        			
		        			var hbmTestGrpUuidStore=form.findField('hbmTestGrpUuid').store;
		        			var hbmMasterGrpUuidStore=form.findField('hbmMasterGrpUuid').store;
		        			var hbmPromNextGrpStore=form.findField('hbmPromNextGrp').store;
		        			var hbmNextBlockedGrpStore=form.findField('hbmNextBlockedGrp').store;
		        			var paidGrpUuid=form.findField('paidGrpUuid').store;
		        			comboxStore.removeAll();
		        			zoneStore.removeAll();
		        		
	            			hbmTestGrpUuidStore.removeAll();
	            			hbmMasterGrpUuidStore.removeAll();
	            			hbmPromNextGrpStore.removeAll();
	            			hbmNextBlockedGrpStore.removeAll();
	            			paidGrpUuid.removeAll();
	            			
	            			hbmTestGrpUuidStore.add({id:0,name:'NULL'});
	            			hbmMasterGrpUuidStore.add({id:0,name:'NULL'});
	            			hbmPromNextGrpStore.add({id:0,name:'NULL'});
	            			hbmNextBlockedGrpStore.add({id:0,name:'NULL'});
	            			paidGrpUuid.add({id:0,name:'NULL'});
		        			
		        			comboxStore.on('load',function(){       				
		        				for(var i=0; i<comboxStore.getCount(); i++){
		    						if(comboxStore.getAt(i).get('type')=='zone'){
		    							zoneStore.add(comboxStore.getAt(i));
		    						}else if(comboxStore.getAt(i).get('type')=='group'){
		    							hbmTestGrpUuidStore.add(comboxStore.getAt(i));
		    							hbmMasterGrpUuidStore.add(comboxStore.getAt(i));
		    							hbmPromNextGrpStore.add(comboxStore.getAt(i));
		    							hbmNextBlockedGrpStore.add(comboxStore.getAt(i));
		    						}else if(comboxStore.getAt(i).get('type')=='paidgroup'){
		    							paidGrpUuid.add(comboxStore.getAt(i));
		    						}
		    					}
		        				
		        			},this,{single: true})
		        			comboxStore.load({params:{domainUuid:tid,types:'zone,group,paidgroup'}}); 
		        			
							
							addGroup.down('form').getForm().findField('domainUuid').setValue(tid);
		        			addGroup.show();
						}
					}
				});
    			tbar.push(add);
    			tbar.push('-');
    			
    			
    			var set = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Setting',
		       		 ulan:'btSetting',
		       		 iconCls:'option',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){
							var tid=this.up('panel').parentNodeTid;
							if(fgroupTab1.getSelectionModel().hasSelection()){
								var records=fgroupTab1.getSelectionModel().getSelection();
								var ids="";
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
									}else {
										ids=ids+","+records[i].get('uuid');
									}
								}
								var updateGroup = Ext.getCmp('updateGroup');
								if(updateGroup==undefined){
									updateGroup=Ext.create('app.view.operation.domain.group.UpdateGroup',{});
									lanControll.setLan(updateGroup);
								}
								var comboxStore = Ext.create("app.store.util.ComboxStore",{})
			        			var zoneStore=updateGroup.down('form').getForm().findField('zoneUuid').store;
			        			var form=updateGroup.down('form').getForm();
			        			zoneStore.removeAll();
			        			comboxStore.on('load',function(){       				
			        				for(var i=0; i<comboxStore.getCount(); i++){
			    						if(comboxStore.getAt(i).get('type')=='zone'){
			    							zoneStore.add(comboxStore.getAt(i));
			    						}
			    					}
			        				
			        				if(records.length==1){
			        					updateGroup.down('form').getForm().loadRecord(records[0]);
			        				}else{
			        					updateGroup.down('form').getForm().findField('domainUuid').setValue(tid);
			        				}
			        				updateGroup.down('form').getForm().findField('ids').setValue(ids);
			        				updateGroup.down('form').getForm().findField('hbmImeiFlag').loadFlag=true;
				        			updateGroup.show();
				        			
			        			},this,{single: true})
			        			comboxStore.load({params:{domainUuid:tid,types:'zone'}}); 
								
							}else{
								Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
								return;
							}
		       	 		}
		       	 	}
		       	 });
				tbar.push(set);
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
												ids=ids+"-"+records[i].get('uuid');
												names=names+","+records[i].get('name')
											}
											
										}
										
										Ext.Ajax.request({
					                		url:'checkManager!checkGroup.action?ids='+ids+"&names="+names,
					                		method:'POST',
					                		callback: function (options, success, response) {
						             var obj=Ext.JSON.decode(response.responseText);			
						               if(obj['success']){
						            	   boxDelGrp = lanControll.getLanValue('boxDelGrp');
												Ext.MessageBox.confirm(boxWarnning,boxDelGrp,function(e) {
													if (e == 'yes') {
														Ext.Ajax.request({
									                		url:'groupManager!deleteGroup.action?ids='+ids+"&domainUuid="+domainUuid+"&name="+name,
									                		method:'POST',
									                		callback: function (options, success, response) {
																var obj=Ext.JSON.decode(response.responseText);
																
										                    	if(success){										
										                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
										                    		fgroupTab1.getStore().load();
										                    		treeFn.refreshNode('operationTree','fgroup_-'+domainUuid,null);
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
	        			this.up('panel').store.load();
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