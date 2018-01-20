
Ext.define('app.view.operation.domain.roamzone.site.nes.BkpInNe', {
    extend: 'Ext.grid.Panel',
//	id:'bkpInNe',
	treeName:'',
	layout:'fit',
	itemId:'grid',
//	autoScroll:true,
	columnLines:true,
	border:false,
	selModel:Ext.create('Ext.selection.CheckboxModel'),
    viewConfig : {
		loadMask:{
			msg:lanControll.getLanValue('maskMsg')
		},
		enableTextSelection: true
	},
//				layout:'fit',
//				autoScroll:true,
	store:Ext.create('app.store.operation.domain.roamzone.site.nes.BkpInNeStore',{}),
		columns: [
		        {header: 'bkpUuid',dataIndex: 'uuid',ulan:'bkpUuid',hidden:true},
				{header: 'Port',dataIndex: 'portNo',width:40 },
//				{header: 'Alias',dataIndex: 'alias',hidden:true},
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
				{header: 'IMSI',  dataIndex: 'simImsi',width:140},
				{header: 'Work Status', dataIndex: 'status',ulan:'agpWorkStateAbbr',minWidth:80,
					renderer:function(val){  
						return rs.workStatus(val);
					} 
				},
				{header: 'Operator',  dataIndex: 'operator', },
				{header: 'lastErrorCount',  dataIndex: 'lastErrorCount',hidden:true},
				
				{header: 'Port Spec Group', dataIndex: 'portGrpName',ulan:'portSpecGroupAbbr',hidden:true},
				{header: 'Last Bind', xtype: 'datecolumn',dataIndex: 'lastBindTime', format:'H:i:s',width:75},//format:'Y-m-d H:i:s'
				{header: 'Last Used', xtype: 'datecolumn',dataIndex: 'lastUsedTime', format:'H:i:s',width:75,hidden:true},
				{header: 'Call Status', dataIndex: 'curCallStatus',hidden:true,
					renderer:function(val){  
						return rs.callStatus(val);
					} 
				},
				{header: 'SMS Status', dataIndex: 'curSmsStatus',hidden:true,
					renderer:function(val){  
						return rs.smsStatus(val);
					} 
				},
				{header: 'USSD Status', dataIndex: 'curUssdStatus',hidden:true,
					renderer:function(val){  
						return rs.ussdStatus(val);
					} 
				},
		        {header: 'Related Gwp',dataIndex: 'gwpPortNoStr',ulan:'bindGwpAbbr',width:120},
		        {header: 'Related Sim',width:140,ulan:'relatedSim',hidden:true,
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
		            header:'Links',width:140,
		            dataIndex:'links',
		            autoWidth:false,
		            renderer: function(value,metaData,record,rowIndex,store,view){
						var uuid;
						var gwp = "";
						var sim = "";
						uuid = parseInt(record.get('simUuid'));
						if(uuid > 0){
							sim = "<input align='middle' style='width:40%;color:green'" +
								" type='button' value='SIM'>";						
						}else if(uuid == 0){
							sim = "<input align='middle' style='width:40%'" +
							" type='button' disabled='disabled' value='SIM'>";
						}
						
						uuid = parseInt(record.get('gwpUuid'));
						if(uuid > 0){
							gwp = "<input align='middle' style='width:40%;color:green'" +
							" type='button' value='GWP'>";	
						}else if(uuid == 0){
							gwp = "<input align='middle' style='width:40%'" +
							" type='button' disabled='disabled' value='GWP'>";
						}
				        return gwp+'&nbsp&nbsp'+sim;
			    	}
				},
				{header: 'domainUuid',dataIndex: 'domainUuid',hidden:true},
				{header: 'neUuid',dataIndex: 'neUuid',hidden:true},
				{header: 'portUuid',dataIndex: 'portUuid',hidden:true},
				{header: 'simUuid',dataIndex: 'simUuid',hidden:true},
		        {header: 'gwpUuid', dataIndex: 'gwpUuid',ulan:'gwpUuid',flex:2,hidden:true},
		        {header: 'portGrpUuid', dataIndex:'portGrpUuid',hidden:true },
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
								var bkpInNe=this.up('panel');
			       		 		if(bkpInNe.getSelectionModel().hasSelection()){
			       		 			var records=bkpInNe.getSelectionModel().getSelection();
			       		 			
									var ids="";
									var domainUuid=Ext.getCmp('bkPanel').domainUuid;
									var simUuids="";
									var bkpStr = "";
									var simStr = "";
									var portStr = "";
									var j = 0;
									for ( var i = 0; i < records.length; i++) {
										if(i==0){
											ids=records[i].get('uuid')+"-"+records[i].get('portUuid');							        		
							        		bkpStr = records[i].get('alias');
							        		portStr = records[i].get('portAlias');
							        		if(domainUuid==0){
												domainUuid=records[i].get('domainUuid');
											}
										}else {
											ids=ids+","+records[i].get('uuid')+"-"+records[i].get('portUuid');
											
										}
										if(records[i].get('simUuid')){
											if(j==0){
												simUuids=records[j].get('simUuid');													
												simStr = records[j].get('simImsi');
											}else{
												simUuids=simUuids+"-"+records[i].get('simUuid');
											}
											j++;
										}
									}
									var updateSimcard=Ext.getCmp('updateBkp');
									if(updateSimcard==undefined || updateSimcard=="undefined"){
										updateSimcard = Ext.create('app.view.operation.domain.roamzone.site.UpdateBkp',{});
										lanControll.setLan(updateSimcard);
									}
									var portGrpUuidStore = updateSimcard.down('form').getForm().findField("portGrpUuid").getStore();
									var grpUuidStore = updateSimcard.down('form').getForm().findField("grpUuid").getStore();
									var comboxStore= Ext.create("app.store.util.ComboxStore",{});
									comboxStore.on('load',function(){      	
										portGrpUuidStore.removeAll();
										portGrpUuidStore.add({uuid:-1,name:'-SELECT-'});
										portGrpUuidStore.add({uuid:0,name:'NULL'});
										
										grpUuidStore.removeAll();
										grpUuidStore.add({uuid:-1,name:'-SELECT-'});
										grpUuidStore.add({uuid:0,name:'NULL'});
										for(var i=0; i<comboxStore.getCount(); i++){
											if(comboxStore.getAt(i).get('type')=='group'){
												portGrpUuidStore.add(comboxStore.getAt(i));
												grpUuidStore.add(comboxStore.getAt(i));
											}
										}
										updateSimcard.down('form').getForm().findField('grpUuid').setValue(-1);
					        			updateSimcard.down('form').getForm().findField('portGrpUuid').setValue(-1);
					        			
					        			updateSimcard.down('form').getForm().findField('ids').setValue(ids);
					        			updateSimcard.down('form').getForm().findField('simUuids').setValue(simUuids);
					        			updateSimcard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					        			updateSimcard.down('form').getForm().findField('bkpStr').setValue(bkpStr);
					        			updateSimcard.down('form').getForm().findField('simStr').setValue(simStr);
					        			updateSimcard.down('form').getForm().findField('portStr').setValue(portStr);
					        			
					        			updateSimcard.show();
									},this,{single: true})
									comboxStore.load({params:{domainUuid:domainUuid,types:'group'}});
									
				        			
				        			
				        			
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
		    	      		ulan:'btReset',
		    	      		 iconCls: 'reset',
		    	      		 flag:"device_action",
		    	      		 listeners:{
		    	      			 click:function(){
		    						var bkpGrid = this.up('panel');
		    			    		Ext.MessageBox.confirm(boxWarnning,boxReset,function(e) {																			
		    							if( e == 'yes' ){
		    			     		 		if ( bkpGrid.getSelectionModel().hasSelection()){				       				
		    									var records= bkpGrid.getSelectionModel().getSelection();
		    									var ids="";
		    									var portAlias = "";
		    									for ( var i = 0; i < records.length; i++) {										
		    										if(i==0){
		    											ids=records[i].get('portUuid');
		    											portAlias = records[i].get('portAlias');
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
		    					var bkpGrid = this.up('panel');
		    		    		Ext.MessageBox.confirm(boxWarnning,boxElegantStop,function(e) {																			
		    						if( e == 'yes' ){
		    					 		if ( bkpGrid.getSelectionModel().hasSelection()){				       				
		    								var records= bkpGrid.getSelectionModel().getSelection();
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
		         		 flag:"device_action",
		         		 menu:{
		   	       		 xtype:'menu',			       		 
		   	       		 items:[{
		   	       			 text:lanControll.getLanValue('miDefaultView'),
		   		       			handler:function(){
		   	       			 		var bkpInNe=this.up('panel').up('panel');
		   	       			 		var showIds=",checkbox,portNo,runStatus,simImsi,operator,status,lastBindTime,gwpPortNoStr,links";
		   	       			 		var hideIds=",uuid,adminStatus,portAlias,oprStatus,lastErrorCount,lastUsedTime,simAlias,portGrpName,curCallStatus,curSmsStatus,curUssdStatus,neUuid,portUuid,simUuid,gwpUuid";

		   		       			 	ip.changeView(bkpInNe,showIds,true);
		   		       			 	ip.changeView(bkpInNe,hideIds,false);
		   		       			 	
		   		       			 	ip.setCurCookie(showIds,hideIds,'bkpl');
		   		       		 	}
		   		       	 },{
		   		       	text:lanControll.getLanValue('miBasicView'),
		   	       			handler:function(){
		   		       		 	var bkpInNe=this.up('panel').up('panel');
		   		       		 	var showIds=",checkbox,portNo,adminStatus,runStatus,simImsi,gwpPortNoStr,simAlias,links";
		   	       			 	var hideIds=",uuid,portAlias,oprStatus,operator,status,lastErrorCount,lastBindTime,lastUsedTime,portGrpName,curCallStatus,curSmsStatus,curUssdStatus,neUuid,portUuid,simUuid,gwpUuid";

		   	       			 	ip.changeView(bkpInNe,showIds,true);
		   	       			 	ip.changeView(bkpInNe,hideIds,false);
		   	       			 	
		   	       			 	ip.setCurCookie(showIds,hideIds,'bkpl');
		   	       		 	}
		   	       		 },{
		   	       		text:lanControll.getLanValue('miDetailView'),
		   		       			handler:function(){
		   	       			 		var bkpInNe=this.up('panel').up('panel');
		   		       			 	var showIds=",checkbox,uuid,portNo,adminStatus,runStatus,simImsi,operator,lastErrorCount,portGrpName,status,lastBindTime,lastUsedTime,curCallStatus,curSmsStatus,curUssdStatus,gwpPortNoStr,simAlias,links";
		   		       			 	var hideIds=",portAlias,oprStatus,neUuid,portUuid,simUuid,gwpUuid";

		   		       			 	ip.changeView(bkpInNe,showIds,true);
		   		       			 	ip.changeView(bkpInNe,hideIds,false);
		   		       			 	
		   		       			 	ip.setCurCookie(showIds,hideIds,'bkpl');
		   		       		 	}
		   		       	 },'-',{
		   		       	text:lanControll.getLanValue('miUserView1'),
		   	       			handler:function(){
		   		       		 	var bkpInNe=this.up('panel').up('panel');
		   	       			 	ip.changeUserView(bkpInNe,'bkpl',1,bkpInNe.id);
		   	       		 	}
		   	       		 },{
		   	       		text:lanControll.getLanValue('miUserView2'),
		   	       			handler:function(){
		   	       			 	var bkpInNe=this.up('panel').up('panel');
		   	       			 	ip.changeUserView(bkpInNe,'bkpl',2,bkpInNe.id);
		   	       		 	}
		   	       		 },{
		   	       		text:lanControll.getLanValue('miUserView3'),
		   	       			handler:function(){
		   	       			 	var bkpInNe=this.up('panel').up('panel');
		   	       			 	ip.changeUserView(bkpInNe,'bkpl',3,bkpInNe.id);
		   	       		 	}
		   	       		 },'-',{
		   	       		text:lanControll.getLanValue('miUserSetting'),
		   	       			handler:function(){
		   	       			 	var bkpInNe=this.up('panel').up('panel');	
		   	       			 	var win=Ext.getCmp('viewAdvanced');
		   	       			 	var win=ip.initViewSet(bkpInNe);
		   	       			 	win.down('hiddenfield[name=mode]').setValue('bkpl');
		   	       			 	win.down('hiddenfield[name=cmpId]').setValue(bkpInNe.id);
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
				var prefix = 'BkpInNe_';
				if(this.maintenance){
					prefix = 'maintenance_'+prefix;
				}
				var id=prefix+"bkpUuid_"+uuid;
				var tipId = prefix+'bkpTipId_'+uuid;
				var tab = Ext.getCmp(id);
				var params = {params : {uuid:uuid}};
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
		
			},
			itemclick:function(view, record, item, index, e, eOpts ){
				if(e.getTarget().style.color == 'green'){
					if(e.getTarget().value == 'GWP'){
						var tabpanel = view.up('panel').up('panel');
						var gwpUuid = record.get('gwpUuid');
						var prefix = 'BkpInNe_';
						if(this.maintenance){
							prefix = 'maintenance_'+prefix;
						}
						var id=prefix+"gwpUuid_"+gwpUuid;
						var tipId = prefix+'gwpTipId_'+gwpUuid;
						var tab = Ext.getCmp(id);
						var params = {params:{uuid:gwpUuid}};
						if(tab==undefined){
							tab = Ext.create('app.view.module.GwpInfoPanel',{
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
						var uuid = record.get('simUuid');
						var domainUuid = record.get('domainUuid');
						var prefix = 'BkpInNe_';
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
			//					title:gwpAlias,
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