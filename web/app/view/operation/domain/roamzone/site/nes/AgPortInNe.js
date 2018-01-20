Ext.define('app.view.operation.domain.roamzone.site.nes.AgPortInNe', {
	extend:'Ext.panel.Panel', 
	title:tiPortList,
	layout:'fit',
	autoScroll:false,
	border:false,
	forceRefresh:0,
	moduleId:'',
	toolbars:0,
	otiose:0,
	initComponent: function() {
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store=Ext.create('app.store.operation.domain.roamzone.site.nes.AgpInNeStore',{});
		var agpInNeGrid=Ext.create('Ext.grid.Panel',{
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
//				{header: 'Module Type',  dataIndex: 'modType',width:140,
//					renderer:function(val){  
//						return rs.agpModType(val);
//					} 
//				},
//				{header: 'Work Status',  dataIndex: 'workState',
//					renderer:function(val){  
//						return rs.agpWorkState(val);
//					} 
//				},
//				{header: 'Primary User', dataIndex: 'primaryUser',flex:1,minWidth:80},
//				{header: 'Primary UserReg', dataIndex: 'primaryUserReg'},
//				{header: 'Secondary User', dataIndex: 'secondaryUser'},
//				{header: 'Secondary UserReg', dataIndex: 'secondaryUserReg',width:120},
				
				{header: 'Device Uuid',dataIndex: 'neUuid',hidden:true},
				{header: 'Port Uuid',dataIndex: 'portUuid',hidden:true},
				{header: 'Agp Uuid',dataIndex: 'agpUuid',hidden:true},
		       
		        
				],
				listeners:{
					itemdblclick: function(view, record, item, index, e, eOpts){
						var tabpanel = agpInNeGrid.up('panel').up('panel');
						var prefix = moduleId+'_AgpInNe_';
						var agpUuid=record.get('agpUuid');
						var id=prefix+"agpUuid_"+agpUuid;
						var tipId = prefix+'agpTipId_'+agpUuid;
						var tab = Ext.getCmp(id);
						var params = {params : {agpUuid:agpUuid}};
						
						if(tab==undefined){
							tab = Ext.create('app.view.module.AgpInfoPanel',{
								id:id,
								tipId:tipId,
								params:params,
								prefix:prefix,
								toolbars:toolbars,
								otiose:otiose,
							});
							tabpanel.add(tab);
						}
						
						var maskId=id+"_mask";
//						var agpLoadMask=Ext.getCmp(maskId);
//						if(!agpLoadMask){
//							agpLoadMask=new Ext.LoadMask(tab, {
//								id:maskId,
//				 			    msg:lanControll.getLanValue('maskMsg'),
//				 			    disabled:false,
//				 			    maskCls:'loadmaskcss',
//				 			    store:tab.store
//				 			});
//						}
						
						tab.store.load(params);
						tab.show();
		
				},
			}						
		});
		var setting={
	       		 xtype:'button',
	       		 text:'Setting',
	       		ulan:'btSetting',
	       		 iconCls:'option',
	       		 flag:"domain_edit",
	       		 listeners:{
		       		click:function(){
						
	       		 		if(agpInNeGrid.getSelectionModel().hasSelection()){
	       		 			var records=agpInNeGrid.getSelectionModel().getSelection();
	       		 			
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
							var updateAgp=Ext.getCmp('updateAgp');
							var parentId=agpInNeGrid.up('panel').id;
							if(updateAgp==undefined || updateAgp=="undefined"){
								updateAgp = Ext.create('app.view.operation.domain.roamzone.site.UpdateAgp',{});
								lanControll.setLan(updateAgp);
							}
							updateAgp.down('form').getForm().reset();
			       			
							updateAgp.down('form').getForm().findField('parentId').setValue(parentId);
							updateAgp.down('form').getForm().findField('uuids').setValue(ids);
							updateAgp.down('form').getForm().findField('portStr').setValue(alias);
							updateAgp.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		        			
							updateAgp.show();
		        			
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
						var store=agpInNeGrid.store;
						store.load();
	       	 		}
	       	 	}
		};
		
		var tbs=[];
		if(!maintenance){
			tbs.push(setting);
			tbs.push('-');
		}
		var refreshButton = autoRefresh.createRefreshButton(agpInNeGrid,store,Ext.create(Ext.getClassName(store),{}),null);
		tbs.push(refreshButton);
		var di=[{
	        xtype: 'toolbar',
	        items: tbs
	    }];
		agpInNeGrid.addDocked(di);
		
		this.items=[agpInNeGrid];

		this.callParent(arguments);		
	},
	listeners:{
		activate: function(tab){
			var grid=tab.down('panel');
			if(tab.forceRefresh==1){
				tab.forceRefresh=0;
				grid.store.load();
			}
		}
	}
});