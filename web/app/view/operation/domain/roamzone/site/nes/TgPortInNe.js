Ext.define('app.view.operation.domain.roamzone.site.nes.TgPortInNe', {
	extend:'Ext.panel.Panel', 
	title:tiPortList,
	layout:'fit',
	autoScroll:false,
	border:false,
	forceRefresh:0,
	moduleId:'',
	toolbars:0,
	otiose:0,
	store:null,
	initComponent: function() {
		
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store=Ext.create('app.store.operation.domain.roamzone.site.nes.TgpInNeStore',{});
		this.store=store;
		var otiose=this.otiose;
		var toolbars=this.toolbars;
		var moduleId=this.moduleId;
		var tgpInNeGrid=Ext.create('Ext.grid.Panel',{
			itemId:'grid',
			columnLines:true,
			store:store,
			title:'',
			selModel:sm,
			autoScroll:true,
			border:false,
			treeName:'',
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
				{header: 'Port Type',  dataIndex: 'type',ulan:'portType',width:90,
					renderer:function(val){
						return rs.portType(val);
					} 
				},
				{header: 'Port',dataIndex: 'portNo',width:40 },
				{header: 'Alias',dataIndex: 'alias',width:150,},
				{header: 'Admin Status', dataIndex: 'adminStatus',width:120,
					renderer:function(val){  
						return rs.adminStatus(val);
					} 
				},
				{header: 'Opr Status', dataIndex: 'oprStatus',hidden:true,width:120,
					renderer:function(val){  
						return rs.oprStatus(val);
					} 
				},
				{header: 'Run Status', dataIndex: 'runStatus',width:120,
					renderer:function(val){  
						return rs.runStatusImg(val);
					} 
				},
				{header: 'Device Uuid',dataIndex: 'neUuid',hidden:true},
				{header: 'Port Uuid',dataIndex: 'uuid',hidden:true},
				],
//				listeners:{
//					itemdblclick: function(view, record, item, index, e, eOpts){
//						var tabpanel = tgpInNeGrid.up('panel').up('panel');
//						var prefix = moduleId+'_TgpInNe_';
//						var tgpUuid=record.get('tgpUuid');
//						var id=prefix+"tgpUuid_"+tgpUuid;
//						var tipId = prefix+'tgpTipId_'+tgpUuid;
//						var tab = Ext.getCmp(id);
//						var params = {params : {tgpUuid:tgpUuid}};
//						
//						if(tab==undefined){
//							tab = Ext.create('app.view.module.TgpInfoPanel',{
//								id:id,
//								tipId:tipId,
//								params:params,
//								prefix:prefix,
//								toolbars:toolbars,
//								otiose:otiose,
//							});
//							tabpanel.add(tab);
//						}
//						tab.store.load(params);
//						tab.show();
//		
//				},
//			}						
		});
		var setting={
	       		 xtype:'button',
	       		 text:'Setting',
	       		 iconCls:'option',
	       		 ulan:'btSetting',
	       		 flag:"domain_edit",
	       		 listeners:{
		       		click:function(){
						
	       		 		if(tgpInNeGrid.getSelectionModel().hasSelection()){
	       		 			var records=tgpInNeGrid.getSelectionModel().getSelection();
	       		 			
							var ids="";
							var domainUuid=0;
							var alias = "";
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
									alias=records[i].get('alias');
								}else {
									ids=ids+","+records[i].get('uuid');
								}
							}
							var updateTgp=Ext.getCmp('updateTgp');
							var parentId=tgpInNeGrid.up('panel').id;
							if(updateTgp==undefined || updateTgp=="undefined"){
								updateTgp = Ext.create('app.view.operation.domain.roamzone.site.UpdateTgp',{});
								lanControll.setLan(updateTgp);
							}
							updateTgp.down('form').getForm().reset();
			       			
							updateTgp.down('form').getForm().findField('parentId').setValue(parentId);
							updateTgp.down('form').getForm().findField('uuids').setValue(ids);
							updateTgp.down('form').getForm().findField('portStr').setValue(alias);
							updateTgp.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		        			
							updateTgp.show();
		        			
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
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
						var store=tgpInNeGrid.store;
						store.load();
	       	 		}
	       	 	}
		};
		
		var tbs=[];
		tbs.push(setting);
		tbs.push('-');
//		tbs.push(refresh);		
		var refreshButton = autoRefresh.createRefreshButton(tgpInNeGrid,store,Ext.create(Ext.getClassName(store),{}),null);
		tbs.push(refreshButton);
		var di=[{
	        xtype: 'toolbar',
	        items: tbs
	    }];
		tgpInNeGrid.addDocked(di);
		
		this.items=[tgpInNeGrid];

		this.callParent(arguments);		
	},
//	listeners:{
//		activate: function(tab){
//			var grid=tab.down('panel');
//			if(tab.forceRefresh==1){
//				tab.forceRefresh=0;
//				grid.store.load();
//			}
//		}
//	}
});