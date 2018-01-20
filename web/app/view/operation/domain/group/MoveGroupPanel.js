Ext.define('app.view.operation.domain.group.MoveGroupPanel',{
	extend : 'Ext.window.Window',
	alias : 'widget.moveGroup',
	id:'moveGroup',
	title:lanControll.getLanValue('tiGrpList'),
	closeAction: 'hide',
	layout:'fit',
	height : 340,
	autoScroll:true,
	treeName:'',
//	bodyPadding: 5,
	modal: true,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:600,
    layout: 'fit',
    resizable: true,
    param:{},
	initComponent: function(){
		var groupInDomainStore= Ext.create('app.store.operation.domain.GroupInDomainStore');
		this.store=groupInDomainStore;
		var sm = Ext.create('Ext.selection.CheckboxModel',{});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var fgroupTab1=Ext.create('Ext.grid.Panel',{
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
					{header: 'uuid',dataIndex: 'uuid',hidden:true},
					{header: 'Name',dataIndex: 'name',width:120},
					{header: 'Alias',dataIndex: 'alias',width:120,hidden:true},
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
					{header: 'Run Status', dataIndex: 'runStatus',width:120,
						renderer:function(val){  
							return rs.runStatus(val);
						} 
					},
					
					{header: 'modType',dataIndex: 'modType',hidden:true,
						renderer:function(val){
							return rs.modType(val);
						}
					},
					{header: 'defaultEncode',dataIndex: 'defaultEncode',hidden:true,
						renderer:function(val){
							return rs.defaultEncode(val);
						}
					},
					{header: 'hbmRoleType', dataIndex: 'hbmRoleType',width:120,
						renderer:function(val){
							return rs.hbmRoleType(val);
						} 
					},
					{header: 'nextWorkGrp',ulan:'hbmNextWorkGrpAbbr',dataIndex: 'hbmPromNextGrpName',hidden:true},
					{header: 'hbmNextNobalGrp',ulan:'hbmNextNobalGrpAbbr',dataIndex: 'hbmNextNobalGrpName',hidden:true},
					{header: 'nextBlockedGrp',dataIndex: 'hbmNextBlockedGrpName',ulan:'hbmNextBlockedGrpAbbr',hidden:true},
					{header: 'maxWorkSim',dataIndex: 'maxWorkSimCount',hidden:true},
					{header: 'hbmInitSimFlag', dataIndex: 'hbmInitSimFlag',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'hbmImeiFlag', dataIndex: 'hbmImeiFlag',width:120,hidden:true,
						renderer:function(val){  
							return rs.hbmImeiFlag(val);
						} 
					},
					{header: 'Total Count',dataIndex: 'cardTotalCount',hidden:true},
					{header: 'Available Count',dataIndex: 'cardAvailableCount',hidden:true},
					{header: 'Idle Count',dataIndex: 'cardIdleCount',hidden:true},
//					{header: 'nextWorkGrp',ulan:'hbmNextWorkGrp',dataIndex: 'hbmPromNextGrp',minWidth:120},
//					{header: 'nextBlockedGrp',dataIndex: 'hbmNextBlockedGrp',minWidth:120},

					
					{header: 'hbmAcdFlag', dataIndex: 'hbmAcdFlag',ulan:'hbmAcdAsrFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'hbmPromFlag', dataIndex: 'hbmPromFlag',ulan:'hbmPromFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'hbmSmsTestFlag', dataIndex: 'hbmSmsTestFlag',ulan:'hbmSmsTestFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'hbmCallTestFlag', dataIndex: 'hbmCallTestFlag',ulan:'hbmCallTestFlagAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'hbmBalanceCheck', dataIndex: 'hbmBalanceCheck',ulan:'hbmBalanceCheck',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'hbmBlockedCheck', dataIndex: 'hbmBlockedCheck',ulan:'hbmBlockedCheckAbbr',width:120,hidden:true,
						renderer:function(val){
							return rs.yesOrNo(val);
						} 
					},
					{header: 'Description',dataIndex: 'detailDesc'},
					{header: 'defaultFlag',dataIndex: 'defaultFlag',hidden:true},
					{header: 'zoneUuid',dataIndex: 'zoneUuid',hidden:true},
					{header: 'domainUuid',dataIndex: 'domainUuid',hidden:true},
			],
			listeners:{
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    			},
	    			single:true
	    		}
			},

		maintenance:maintenance,
    	createTbar:function(){
    		var tbar = [];
    		if(!this.maintenance){
    			var set = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'OK',
		       		 ulan:'btMove',
		       		 iconCls:'option',
		       		 flag:"domain_edit",
		       		 listeners:{
		       		 	click:function(){
							var tid=this.up('panel').parentNodeTid;
							var param=this.up('window').param;
							if(fgroupTab1.getSelectionModel().hasSelection()){
								var records=fgroupTab1.getSelectionModel().getSelection();
								if(records.length==1){
										param['grpUuid']=records[0].get('uuid');
										console.log(param);
//				    					var params = {ids:ids};
										Ext.Ajax.request({
					                		url:'simCardManager!updateSimCard.action',
					                		method:'POST',
					                		params:param,
					                		callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj['success']){
						                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
						                    	}
						                    	fgroupTab1.up('window').hide();
						                    	Ext.getCmp('simCardTab').down('panel[itemId=grid]').getStore().load();
					                    	}
					                	});
								}else{
									Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
									return;
								}
							}else{
								Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
								return;
							}
		       	 		}
		       	 	}
		       	 });
				tbar.push(set);
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
		this.items = [fgroupTab1];
    	this.callParent();
	}
});