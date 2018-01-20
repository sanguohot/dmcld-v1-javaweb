Ext.define('app.view.operation.domain.roamzone.site.nes.GwpInNe', {
    extend: 'Ext.grid.Panel',
//	id:'gwpInNe',
	title:'',
	treeName:'',
	layout:'fit',
	columnLines:true,
	autoScroll:true,
	border:false,
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	store:Ext.create('app.store.operation.domain.roamzone.site.nes.GwpInNeStore',{}),
	comboxStore:null,
    viewConfig : {
		loadMask:{
			msg:lanControll.getLanValue('maskMsg')
		},
		enableTextSelection: true
	},
	columns: [
	         {header: 'gwpUuid',dataIndex: 'uuid',ulan:'gwpUuid',hidden:true},
			{header: 'Port',dataIndex: 'portNo',width:40},
//			{header: 'Alias',dataIndex: 'alias',hidden:true},
			{header: 'Alias',dataIndex: 'portAlias',hidden:true},
			{header: 'Admin Status', dataIndex: 'adminStatus',width:90,hidden:true,
				renderer:function(val){  
					return rs.adminStatus(val);
				} 
			},
			{header: 'Opr Status', dataIndex: 'oprStatus',hidden:true,
				renderer:function(val){  
					return rs.oprStatus(val);
				} 
			},
			{header: 'Run Status', dataIndex: 'runStatus',width:120,
				renderer:function(val){  
					return rs.runStatusImg(val);
				} 
			},
			
			{header: 'Work Mode', dataIndex:'workMode', width:125,
				renderer:function(value,metaData,record,rowIndex,store,view){
					return rs.workType(value);
				}
			},
			{header: 'Module Type', dataIndex:'modType',width:125,
				renderer:function(value,metaData,record,rowIndex,store,view){
					return rs.modType(value);
				}
			},
			{header: 'Module Status', dataIndex:'modStatus',ulan:'agpWorkStateAbbr',width:125,
				renderer:function(value,metaData,record,rowIndex,store,view){
					return rs.modStatus(value);
				}
			},
			{header: 'Operator', dataIndex: 'operator',},
			{header: 'Local IMEI', dataIndex: 'localImei',width:120},
			{header: 'localImsi', dataIndex: 'localImsi'},
			{header: 'Mobile', dataIndex: 'mobile'},
			{header: 'Current IMEI', width:150,dataIndex: 'currentImei',hidden:true},
			{header: 'Port Spec Group', dataIndex: 'portGrpName',ulan:'portSpecGroupAbbr',hidden:true},
			{header: 'Port Spec Policy', dataIndex: 'portPolicyName',ulan:'portSpecPolicyAbbr',hidden:true},
			{header: 'BKPort Alias', dataIndex: 'bkpAlias',minWidth:80,hidden:true },
			{header: 'roundTripDelay', dataIndex:'roundTripDelay',hidden:true },
			{header: 'packetAll', dataIndex:'packetAll',hidden:true },
			{header: 'packetRetries', dataIndex:'packetRetries',hidden:true },
			{header: 'packetTimeout', dataIndex:'packetTimeout',hidden:true },
			{header: 'Signal', dataIndex:'modSignalVal',hidden:true },
			{header: 'modBerVal', dataIndex:'modBerVal',hidden:true },
			{header: 'modErrorCount', dataIndex:'modErrorCount',hidden:true },
			{header: 'Last Bind', xtype: 'datecolumn',dataIndex: 'lastBindTime', format:'H:i:s',width:75},//format:'Y-m-d H:i:s'
			{header: 'Last Used', xtype: 'datecolumn',dataIndex: 'lastUsedTime', format:'H:i:s',width:75},										
			{header: 'Call Status', dataIndex: 'curCallStatus',width:120,hidden:true,
				renderer: function(value,metaData,record,rowIndex,store,view){
					return rs.callStatus(value);
			}},
			{header: 'SMS Status', dataIndex: 'curSmsStatus',width:120,hidden:true,
				renderer: function(value,metaData,record,rowIndex,store,view){
					return rs.smsStatus(value);
			}},
			{header: 'USSD Status', dataIndex: 'curUssdStatus',width:120,hidden:true,
				renderer: function(value,metaData,record,rowIndex,store,view){
					return rs.ussdStatus(value);
			}},
			{header: 'Call SN', dataIndex: 'curCallSn',width:120,hidden:true},
			{header: 'SMS SN', dataIndex: 'curSmsSn',width:120,hidden:true},
			{header: 'USSD SN', dataIndex: 'curUssdSn',width:120,hidden:true},
//			{header: 'Related Bkp',dataIndex: 'bkpPortNoStr',ulan:'bindBkp',width:145},
	        {header: 'Related Sim',width:145,ulan:'relatedSim',hidden:true,
				dataIndex:'simAlias',
	        	renderer: function(value,metaData,record,rowIndex,store,view){
	        		var simUuid = parseInt(record.get('simUuid'));
	        		var simAlias = record.get('simAlias');
	        		var simImsi = record.get('simImsi');
	        		if(simUuid == 0){
	        			return "";
	        		}else{
	        			if(simAlias==null || simAlias==''){
	        				return simImsi;
	        			}else{
	        				return simAlias;
	        			}
	        		}
	        }},
			{
	            header:'Links',
	            dataIndex:'links',
	            autoWidth:false,
	            renderer: function(value,metaData,record,rowIndex,store,view){
					var uuid;
					var bkp = "";
					var sim = "";
					if(record.get('workMode') != 2){
						uuid = record.get('localSimUuid');
					}else{
						uuid = parseInt(record.get('simUuid'));
					}
					if(uuid > 0){
						sim = "<input align='middle' style='width:40%;color:green'" +
							" type='button' value='SIM'>";						
					}else if(uuid == 0){
						sim = "<input align='middle' style='width:40%'" +
						" type='button' disabled='disabled' value='SIM'>";
					}
					
					uuid = parseInt(record.get('bkpUuid'));
					if(uuid > 0){
						bkp = "<input align='middle' style='width:40%;color:green;'" +
						" type='button' value='BKP'>";	
					}else if(uuid == 0){
						bkp = "<input align='middle' style='width:40%;'" +
						" type='button' disabled='disabled' value='BKP'>";
					}
			        return bkp+'&nbsp&nbsp'+sim;
		    	}
			},
			{header: 'neUuid',dataIndex: 'neUuid',hidden:true},
			{header: 'portUuid', dataIndex:'portUuid',hidden:true},						
			{header: 'bkpUuid', dataIndex:'bkpUuid',ulan:'bkpUuid',hidden:true },
			{header: 'simUuid', dataIndex: 'simUuid',hidden:true},
			{header: 'localSimUuid', dataIndex: 'localSimUuid',hidden:true},
			{header: 'portGrpUuid', dataIndex:'portGrpUuid',hidden:true },
			{header: 'portPolicyUuid', dataIndex:'portPolicyUuid',hidden:true },
			{header: 'lockPortUuid', dataIndex:'lockPortUuid',hidden:true },
			{header: 'lockSimUuid', dataIndex: 'lockSimUuid',width:120,hidden:true},
	],
	maintenance:null,
	createTbar:function(){
		var tbar = [];
		if(!this.maintenance){
			var set = Ext.create('Ext.button.Button',{
	       		 xtype:'button',
	       		 text:'Setting',
	       		ulan:'btSetting',
	       		 iconCls:'option',
	       		 flag:"domain_edit",
	       		 listeners:{
		       		click:function(){
					var gwpInNe=this.up('panel');
	  		 		if(gwpInNe.getSelectionModel().hasSelection()){
	  		 			var records=gwpInNe.getSelectionModel().getSelection();
	  		 			
						var ids="";
						var portAlias = "";
						var domainUuid=Ext.getCmp('gwPanel').down('form[itemId=form]').getForm().findField('domainUuid').getValue();
						for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('uuid')+"-"+records[i].get('portUuid');
								portAlias = records[i].get('portAlias');
								if(domainUuid==0 || domainUuid== null){
									domainUuid=records[i].get('domainUuid');
								}
							}else {
								ids=ids+","+records[i].get('uuid')+"-"+records[i].get('portUuid');
							}
						}
						var updateGwp=Ext.getCmp('updateGwp');
						if(updateGwp==undefined || updateGwp=="undefined"){
							updateGwp = Ext.create('app.view.operation.domain.roamzone.site.UpdateGwp',{});
							lanControll.setLan(updateGwp);
						}
						
						var portGrpUuidStore = updateGwp.down('form').getForm().findField("portGrpUuid").getStore();
						var portPolicyUuidStore = updateGwp.down('form').getForm().findField("portPolicyUuid").getStore();
						var comboxStore= Ext.create("app.store.util.ComboxStore",{});
						comboxStore.on('load',function(){      	
							portGrpUuidStore.removeAll();
							portGrpUuidStore.add({uuid:-1,name:'-SELECT-'});
							portGrpUuidStore.add({uuid:0,name:'NULL'});
							
							portPolicyUuidStore.removeAll();
							portPolicyUuidStore.add({uuid:-1,name:'-SELECT-'});
							portPolicyUuidStore.add({uuid:0,name:'NULL'});
							for(var i=0; i<comboxStore.getCount(); i++){
								if(comboxStore.getAt(i).get('type')=='policy'){
									portPolicyUuidStore.add(comboxStore.getAt(i));
								}else if(comboxStore.getAt(i).get('type')=='group'){
									portGrpUuidStore.add(comboxStore.getAt(i));
								}
							}
							updateGwp.down('form').getForm().findField('portGrpUuid').setValue(-1);
							updateGwp.down('form').getForm().findField('portPolicyUuid').setValue(-1);
							
							updateGwp.down('form').getForm().findField('ids').setValue(ids);
							updateGwp.down('form').getForm().findField('portStr').setValue(portAlias);
							updateGwp.down('form').getForm().findField('domainUuid').setValue(domainUuid);
							updateGwp.show();
							
						},this,{single: true})
						comboxStore.load({params:{domainUuid:domainUuid,types:'policy,group'}});
						
						
	        			
		 			}else{
		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		 				return;
		 			}	 		
					}
	       	 	}	
			});
			tbar.push(set);
			tbar.push('-');
		}else{
			var reset = Ext.create('Ext.button.Button',{
	     		 xtype:'button',
	     		 text: 'Reset',
	     		 iconCls: 'reset',
	     		ulan:'btReset',
	     		 flag:"device_action",
	     		 listeners:{
	     			 click:function(){
						var gwpInNe=this.up('panel');
			    		Ext.MessageBox.confirm(boxWarnning,boxReset,function(e) {																			
							if( e == 'yes' ){
								if ( gwpInNe.getSelectionModel().hasSelection()){				       				
									var records= gwpInNe.getSelectionModel().getSelection();
									var ids="";
									var portAlias = "";
									for ( var i = 0; i < records.length; i++) {										
										if(i==0){
											ids=records[i].get('portUuid');
											portAlias=records[i].get('portAlias');
										}else {
											cnt=1;
											ids=ids+"-"+records[i].get('portUuid');
										}
									}
				        			var handler = Ext.getCmp('handler');
				        			if(handler==undefined){
				        				handler = Ext.create('app.util.Handler',{});
				        			}
				        			handler.ResetPortHandler(ids,portAlias);
			 		 			}else{
			 		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
			 		 				return;
			 		 			}
							}
			    		});		       			 
	 		 		 }
	     		 }	 
			});
			tbar.push(reset);
			tbar.push('-');
			
			var elegant = Ext.create('Ext.button.Button',{
	        	text: 'Elegant Stop',
	        	iconCls:'elegant_stop',
	        	ulan:'btElegantStop',
	        	flag:"device_action",
	        	handler:function(){
					var gwpInNe=this.up('panel');
		    		Ext.MessageBox.confirm(boxWarnning,boxElegantStop,function(e) {																			
						if( e == 'yes' ){
					 		if ( gwpInNe.getSelectionModel().hasSelection()){				       				
								var records= gwpInNe.getSelectionModel().getSelection();
								var ids="";
								var portAlias = "";
								for ( var i = 0; i < records.length; i++) {										
									if(i==0){
										ids=records[i].get('portUuid');
										portAlias=records[i].get('portAlias');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('portUuid');
									}
								}
			        			var handler = Ext.getCmp('handler');
			        			if(handler==undefined){
			        				handler = Ext.create('app.util.Handler',{});
			        			}
			        			handler.ElegantStopPortHandler(ids,portAlias);
				 			}else{
				 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				 				return;
				 			}
						}
		    		});		       			 
			 	}       
			});
			tbar.push(elegant);
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
		       			text:lanControll.getLanValue('miDefaultView'),
		       			handler:function(){
	       			 		var gwpInNe=this.up('panel').up('panel');
	       			 		var showIds=",checkbox,portNo,runStatus,workMode,modType,modStatus,operator,localImei,localImsi,mobile,lastBindTime,lastUsedTime,links";
	       			 		var hideIds=",uuid,adminStatus,portAlias,oprStatus,currentImei,bkpAlias,portGrpName,portPolicyName,roundTripDelay,packetAll,packetRetries,packetTimeout,modSignalVal,modBerVal,modErrorCount,curCallStatus,curSmsStatus,curUssdStatus,curCallSn,curSmsSn,curUssdSn,simAlias,neUuid,portUuid,bkpUuid,simUuid,localSimUuid,portPolicyUuid,lockPortUuid,lockSimUuid";

		       			 	ip.changeView(gwpInNe,showIds,true);
		       			 	ip.changeView(gwpInNe,hideIds,false);
		       			 	
		       			 	ip.setCurCookie(showIds,hideIds,'gwpl');
		       		 	}
		       	 },{
		       		text:lanControll.getLanValue('miBasicView'),
	       			handler:function(){
		       		 	var gwpInNe=this.up('panel').up('panel');
		       		 	var showIds=",checkbox,uuid,portNo,adminStatus,runStatus,currentImei,simAlias,links";
	       			 	var hideIds=",portAlias,oprStatus,workMode,modType,modStatus,operator,portGrpName,portPolicyName,mobile,localImei,localImsi,bkpAlias,roundTripDelay,packetAll,packetRetries,packetTimeout,modSignalVal,modBerVal,modErrorCount,lastBindTime,lastUsedTime,curCallStatus,curSmsStatus,curUssdStatus,curCallSn,curSmsSn,curUssdSn,neUuid,portUuid,bkpUuid,simUuid,localSimUuid,portPolicyUuid,lockPortUuid,lockSimUuid";

	       			 	ip.changeView(gwpInNe,showIds,true);
	       			 	ip.changeView(gwpInNe,hideIds,false);
	       			 	
	       			 	ip.setCurCookie(showIds,hideIds,'gwpl');
	       		 	}
	       		 },{
	       			text:lanControll.getLanValue('miDetailView'),
//		       			ulan:'miDetailView',
		       			handler:function(){
	       			 		var gwpInNe=this.up('panel').up('panel');
		       			 	var showIds=",checkbox,uuid,portNo,adminStatus,runStatus,workMode,modType,modStatus,operator,mobile,portGrpName,portPolicyName,localImei,currentImei,localImsi,bkpAlias,roundTripDelay,packetAll,packetRetries,packetTimeout,modSignalVal,modBerVal,modErrorCount,lastBindTime,lastUsedTime,curCallStatus,curSmsStatus,curUssdStatus,simAlias,links";
		       			 	var hideIds=",portAlias,oprStatus,curCallSn,curSmsSn,curUssdSn,neUuid,portUuid,bkpUuid,simUuid,localSimUuid,portPolicyUuid,lockPortUuid,lockSimUuid";

		       			 	ip.changeView(gwpInNe,showIds,true);
		       			 	ip.changeView(gwpInNe,hideIds,false);
		       			 	
		       			 	ip.setCurCookie(showIds,hideIds,'gwpl');
		       		 	}
		       	 },'-',{
		       		text:lanControll.getLanValue('miUserView1'),
	       			handler:function(){
		       		 	var gwpInNe=this.up('panel').up('panel');
	       			 	ip.changeUserView(gwpInNe,'gwpl',1,gwpInNe.id);
	       		 	}
	       		 },{
	       			text:lanControll.getLanValue('miUserView2'),
	       			handler:function(){
	       			 	var gwpInNe=this.up('panel').up('panel');
	       			 	ip.changeUserView(gwpInNe,'gwpl',2,gwpInNe.id);
	       		 	}
	       		 },{
	       			text:lanControll.getLanValue('miUserView3'),
	       			handler:function(){
	       			 	var gwpInNe=this.up('panel').up('panel');
	       			 	ip.changeUserView(gwpInNe,'gwpl',3,gwpInNe.id);
	       		 	}
	       		 },'-',{
	       			text:lanControll.getLanValue('miUserSetting'),
	       			handler:function(){
	       			 	var gwpInNe=this.up('panel').up('panel');	
	       			 	var win=Ext.getCmp('viewAdvanced');
	       			 	var win=ip.initViewSet(gwpInNe);
	       			 	win.down('hiddenfield[name=mode]').setValue('gwpl');
	       			 	win.down('hiddenfield[name=cmpId]').setValue(gwpInNe.id);
	       			 	win.show();
	       		 	}
		       	}], 
      	 	 }
      	 });
		tbar.push(view);
		tbar.push('-');
		
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
	listeners:{
		afterlayout:{
			fn:function(){
				this.createTbar();
				lanControll.setFieldSet(this);
			},
			single:true
		},
		itemdblclick: function(view, record, item, index, e, eOpts){
			var tabpanel = view.up('panel').up('panel');
			var uuid = record.get('uuid');
			var prefix = 'GwpInNe_';
			if(this.maintenance){
				prefix = 'maintenance_'+prefix;
			}
			var id=prefix+"gwpUuid_"+uuid;
			var tipId = prefix+'gwpTipId_'+uuid;
			var tab = Ext.getCmp(id);
			var params = {params : {uuid:uuid}};
			if(tab==undefined){
				tab = Ext.create('app.view.module.GwpInfoPanel',{
					id:id,
					tipId:tipId,
//						title:gwpAlias,
					params:params,
					prefix:prefix,
				});
				lanControll.setLan(tab);
				tabpanel.add(tab);
				
			}
			tab.store.load(params);
			tab.show();

		},
		itemclick:function(view, record, item, index, e, eOpts ){
			if(e.getTarget().style.color == 'green'){
				if(e.getTarget().value == 'BKP'){
					var tabpanel = view.up('panel').up('panel');
					var bkpUuid = record.get('bkpUuid');
					var prefix = 'GwpInNe_';
					if(this.maintenance){
						prefix = 'maintenance_'+prefix;
					}
					var id=prefix+"bkpUuid_"+bkpUuid;
					var tipId = prefix+'bkpTipId_'+bkpUuid;
					var tab = Ext.getCmp(id);
					var params = {params:{uuid:bkpUuid}};
					if(tab==undefined){
						tab = Ext.create('app.view.module.BkpInfoPanel',{
							id:id,
							tipId:tipId,
							params:params,
							prefix:prefix,
						});
						lanControll.setLan(tab);
						tabpanel.add(tab);							
					}
					tab.store.load(params);
					tab.show();
				}
				else if(e.getTarget().value=='SIM'){
					var tabpanel = view.up('panel').up('panel');
					var uuid;
					if(record.get('workMode') != 2){
						uuid = record.get('localSimUuid');
					}else{
						uuid = parseInt(record.get('simUuid'));
					}
					var domainUuid = record.get('domainUuid');
					var prefix = 'GwpInNe_';
					if(this.maintenance){
						prefix = 'maintenance_'+prefix;
					}
					var id=prefix+"simUuid_"+uuid;
					var tipId = prefix+'simTipId_'+uuid;
					var tab = Ext.getCmp(id);
					var params = {params : {uuid:uuid}};
					if(tab==undefined){
						tab = Ext.create('app.view.module.SimCardPanel',{
							id:id,
							tipId:tipId,
							params:params,
							prefix:prefix,
							domainUuid:domainUuid,
						});
						lanControll.setLan(tab);
						tabpanel.add(tab);
						
					}
					tab.store.load(params);
					tab.show();
				}
			}else{
				return;
			}
		}
}

});