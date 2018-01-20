Ext.define('app.view.operation.domain.DomainListPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	border:false,
	title:'',
	forceRefresh:0,
	cloudUuid:-1,
	initComponent: function(){
	var domainListStore= Ext.create('app.store.operation.domain.SysDomainListStore'); 
	var sm = Ext.create('Ext.selection.CheckboxModel');
	this.store = domainListStore;
	domainListStore.on('beforeload',function(){
		domainListStore.loadFlag = false;
	})
	var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
	var cloudUuid=this.cloudUuid;
	var fDomainTab=Ext.create('Ext.grid.Panel',{
        viewConfig : {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
		},
		itemId:'grid',
		treeName:'',
		parentNodeTid:'',
		border:false,
		columnLines:true,
		store: domainListStore, 
		selModel: sm,
		columns: [
				{header: 'Uuid',dataIndex: 'uuid',hidden:true,sortable:false},
				{header: 'Name',dataIndex: 'name',},
				{header: 'Alias',dataIndex: 'alias',hidden:true},
				{header: 'Admin Status', dataIndex: 'adminStatus',hidden:true,
					renderer:function(val){  
						return rs.adminStatus(val);
					 }
				},
				{header: 'Opr Status', dataIndex: 'oprStatus',hidden:true,
					renderer:function(val){  
						return rs.oprStatus(val);
					} 
				},
				{header: 'Run Status', dataIndex: 'runStatus',
					renderer:function(val){  
						return rs.runStatus(val);
					} 
				},
				{header: 'Vendor', dataIndex: 'vendorId',
					renderer:function(val){  
						return rs.vendor(val);
					} 
				},
				{header: 'productId', ulan:'domainProductTypeAbbr',dataIndex: 'productId',
					renderer:function(val){  
					return rs.domainProductType(val);
				} 
				},
				{header: 'Cur Cloud', dataIndex: 'cloudName',},
				{header: 'Spec Server', dataIndex: 'specServerName',ulan:'specSysUuidSpec'},
				{header: 'Cur Server', dataIndex: 'serverName',},
				{header: 'Locked Flag', dataIndex: 'sysLockedFlag',
					renderer:function(val){  
						return rs.yesOrNo(val);
					}
				},
				{header: 'DeviceCnt', dataIndex: 'totalNeCount',hidden:false},
				{header: 'onlineDevcieCnt', dataIndex: 'onlineNeCount',hidden:false},
				{header: 'SIM Card', dataIndex: 'totalSimCard',hidden:false},
				{header: 'onlineSIMCard', dataIndex: 'onlineSimCard',hidden:false},

				{header: 'Alarm Max', dataIndex: 'alarmMax',hidden:true},
				{header: 'PM 15M Max', dataIndex: 'pm15mMax',hidden:true,
					renderer:function(val){  
						return rs.min15(val);
					}
				},
				{header: 'PM 24H Max', dataIndex: 'pm24hMax',hidden:true,
					renderer:function(val){  
						return rs.hour24(val);
					}
				},
				{header: 'PM Call Max', dataIndex: 'pmCallMax',hidden:true,},
				{header: 'PM SMS Max', dataIndex: 'pmSmsMax',hidden:true,},
				{header: 'PM USSD Max', dataIndex: 'pmUssdMax',hidden:true,},
				{header: 'Log User Max', dataIndex: 'logUserMax',hidden:true,},
				{header: 'snumberMax', dataIndex: 'snumberMax',hidden:true,},
				{header: 'dnumberMax', dataIndex: 'dnumberMax',hidden:true,},
				{header: 'Create Time',dataIndex: 'createTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:false},
				{header: 'Update Time',dataIndex: 'updateTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
				{header: 'specCloudUuid', dataIndex: 'specCloudUuid',hidden:true},
				{header: 'cloudUuid', dataIndex: 'cloudUuid',hidden:true},
				{header: 'specSysUuid', dataIndex: 'specSysUuid',hidden:true},
				{header: 'detailDesc', dataIndex: 'detailDesc',hidden:true},
		],
		listeners:{
			itemdblclick: function(grid, row, columnindex,e){
    			var ot=Ext.getCmp('operationTree');
    			if(maintenance){
    				ot = Ext.getCmp('maintenanceTree');
    			}
    			var uuid=row.get('uuid');
    			var rootNode=ot.getRootNode();
    			var node=rootNode.findChild('nid','domain_'+uuid,true);
    			
    			ot.fireEvent('itemclick',null,node);
			}						
		},
		dockedItems:[{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: domainListStore,
		     pageSize: 25,
		     displayInfo: true,
		}	 	
		]
	});
	var tbar = [];
	if(!maintenance){
		var add = Ext.create('Ext.button.Button',{
			xtype : 'button',
			text : 'Add Domain',
			ulan:'btAdd',
			iconCls : 'add',
			flag:"super_edit",
			listeners : {
				click : function() {
					var addDomain = Ext.getCmp('addDomain');
					
					if(addDomain=='undefined'||addDomain==undefined){
						addDomain=Ext.create('app.view.operation.domain.AddDomain',{});
						lanControll.setLan(addDomain);
					}
					var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
					var sysUuid=fDomainTab.up('panel').up('panel').sysUuid;
					addDomain.firstLoad=true;
					var comboxStore = Ext.create("app.store.util.ComboxStore",{});
					var cloudField=addDomain.down('form').getForm().findField('cloudUuid');
					var specSysField=addDomain.down('form').getForm().findField('specSysUuid');
					var cloudStore=cloudField.getStore();
					var specSysStore=specSysField.getStore();
					cloudStore.removeAll();
					specSysStore.removeAll();
					comboxStore.on('load',function(){
        				cloudStore.add({uuid:-1,name:'-SELECT-'});
        				specSysStore.add({uuid:-1,name:'-SELECT-'});
        				for(var i=0; i<comboxStore.getCount(); i++){
    						if(comboxStore.getAt(i).get('type')=='cloud'){
    							cloudStore.add(comboxStore.getAt(i));
    						}else if(comboxStore.getAt(i).get('type')=='server'){
    							specSysStore.add(comboxStore.getAt(i));
    						}
    					}
        				addDomain.down('form').store = domainListStore;
        				if(cloudUuid){
        					cloudField.setValue(cloudUuid);
        				}else{
        					cloudField.setValue(cloudStore.getAt(0).get('uuid'));
        				}
        				if(sysUuid){
        					specSysField.setValue(sysUuid);
        				}
        				addDomain.show();
        			},this,{single: true});
        			comboxStore.load({params:{cloudUuid:cloudUuid,types:'cloud,server'}});
					
//					addDomain.down('form').getForm().findField('cloudUuid').setValue(cloudUuid);
//					addDomain.show();
				}
			}
		});
//		tbar.push(add);
//		tbar.push('-');
		
		var del = Ext.create('Ext.button.Button',{
			xtype : 'button',
			text : 'Delete Domain',
			iconCls : 'remove',
			flag:"super_edit",
			ulan:'btDel',
			listeners : {
				click : function() {
					if (fDomainTab.getSelectionModel().hasSelection()) {
						
								var records = fDomainTab.getSelectionModel().getSelection();
								var ids="";
								var cnt=0;
								var names="";
								var name = "";
								var uuid = 0;
								for ( var i = 0; i < records.length; i++) {
									if(records[i].get("adminStatus")!=2){
										Ext.MessageBox.alert(boxWarnning,lanControll.getLanValue('pDiableDomain'));
										return;
									}
									if(i==0){
										ids=records[i].get('uuid');
										names=records[i].get('name');
										name = names;
										uuid = records[i].get('uuid');
									}else {
										cnt=1;
										ids=ids+"-"+records[i].get('uuid');
										names=names+","+records[i].get('name')
									}
									
								}
								boxDelDomain = lanControll.getLanValue('boxDelDomain');
								Ext.MessageBox.confirm(boxWarnning,boxDelDomain,function(e) {
									if (e == 'yes') {
										Ext.Ajax.request({
					                		url:'domainManager!deleteDomain.action?ids='+ids+'&name='+name+'&uuid='+uuid,
					                		method:'POST',
					                		callback: function (options, success, response) {
												var obj=Ext.JSON.decode(response.responseText);
												
						                    	if(obj['success']){
						                    		if(!obj['msg']){
						                    			Ext.MessageBox.alert(boxSuccess,boxDelSucc);
						                    		}else{
						                    			Ext.MessageBox.alert(boxSuccess,'delete success,discard '+obj['msg']);
						                    		}
						                    		domainListStore.load();
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
		tbar.push(del);
		tbar.push('-');
		var del2 = Ext.create('Ext.button.Button',{
			xtype : 'button',
			text : 'Force Delete',
			iconCls : 'remove',
			hidden:!rs.dnsSysMode(),
			flag:"super_edit",
//			ulan:'btForceDel',
			listeners : {
			click : function() {
			if (fDomainTab.getSelectionModel().hasSelection()) {
				
				var records = fDomainTab.getSelectionModel().getSelection();
				var ids="";
				var cnt=0;
				var names="";
				var name = "";
				var uuid = 0;
				for ( var i = 0; i < records.length; i++) {
					if(records[i].get("adminStatus")!=2){
						Ext.MessageBox.alert(boxWarnning,lanControll.getLanValue('pDiableDomain'));
						return;
					}
					if(i==0){
						ids=records[i].get('uuid');
						names=records[i].get('name');
						name = names;
						uuid = records[i].get('uuid');
					}else {
						cnt=1;
						ids=ids+"-"+records[i].get('uuid');
						names=names+","+records[i].get('name')
					}
					
				}
				boxDelDomain = lanControll.getLanValue('boxDelDomain');
				Ext.MessageBox.confirm(boxWarnning,boxDelDomain,function(e) {
					if (e == 'yes') {
						var boxObj = {
            		    		title:boxInfo,
            		    		width : 300,
            		    		msg:boxWaitMsg,
            		    		modal:true,
            		    		closable:false,
            		    		wait:true
            		    };
            			var store=Ext.create('app.store.util.StepStore');
            			sleepBar(store,true);
						Ext.Ajax.request({
							url:'domainManager!deleteForceDomain.action?ids='+ids+'&name='+name+'&uuid='+uuid,
							method:'POST',
							timeout:30*60*1000,
							callback: function (options, success, response) {
								boxObj.wait = false;
	            				autoRefresh.stopTask(null,store);
								var obj=Ext.JSON.decode(response.responseText);
								if(obj['success']){
									if(!obj['msg']){
										Ext.MessageBox.alert(boxSuccess,boxDelSucc);
									}else{
										Ext.MessageBox.alert(boxSuccess,'delete success,discard '+obj['msg']);
									}
									domainListStore.load();
								}else{
									Ext.MessageBox.alert(boxFailture,boxDelFail);
								}
							}
						});
					}
					
				})
				
//				Ext.MessageBox.confirm(boxInfo,boxBackup,function(e) {
//            		if( e == 'yes' ){
//            			var boxObj = {
//            		    		title:boxInfo,
//            		    		width : 300,
//            		    		msg:boxWaitMsg,
//            		    		modal:true,
//            		    		closable:false,
//            		    		wait:true
//            		    };
//            			var store=Ext.create('app.store.util.StepStore');
//            			sleepBar(store,true);
//            			Ext.Ajax.request({
//    		           		url:url,
//    		           		method:'POST',
//    		           		timeout:30*60*1000,
//    		           		callback: function (options, success, response) {
//                				boxObj.wait = false;
//                				autoRefresh.stopTask(null,store);
//            					var obj=Ext.JSON.decode(response.responseText);
//    	                   	if(obj["success"]){
//    	                   		window.location.href="download/"+obj["path"];
//    	                   	}else{
//    	                   		Ext.MessageBox.alert(boxFailture,boxExportFail);
//    	                   	}
//	               	}
//    		           	})
//            		}});
				
			}else{
				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				return;
			}
		}
		
		}
		});
		tbar.push(del2);
		tbar.push('-');
		
		var rename = Ext.create('Ext.button.Button',{
			xtype:'button',
	  		 text:'Rename',
	  		ulan:'btRename',
	  		 iconCls:'option',
	  		 flag:"super_edit",
	  		 listeners:{
	  		 	click:function(){
					if ( fDomainTab.getSelectionModel().hasSelection() ){
						if(fDomainTab.getSelectionModel().getCount()!=1){
							Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
							return;
						}
						var records = fDomainTab.getSelectionModel().getSelection();
						var ids=records[0].get('uuid');
						var name = records[0].get('name');
						var addDomain = Ext.getCmp('updateDomainName');
						if(addDomain=='undefined'||addDomain==undefined){
							addDomain=Ext.create('app.view.operation.system.UpdateDomainName',{});
							lanControll.setLan(addDomain);
						}
						addDomain.down('form').store = domainListStore;
						addDomain.down('form').getForm().findField('ids').setValue(ids);
						addDomain.down('form').getForm().findField('orginal_name').setValue(name);
						addDomain.down('form').getForm().findField('name').setValue(name);
						addDomain.show();
					}else{
						Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
   		 				return;
					}
	  	 		}
	  	 	}
		});
		tbar.push(rename);
		tbar.push('-');
		
		var set = Ext.create("Ext.button.Button",{
			 xtype:'button',
	  		 text:'Setting',	  		 
	  		ulan:'btSetting',
	  		 iconCls:'option',
	  		 flag:"super_edit",
	  		 listeners:{
	  		 	click:function(){
					if ( fDomainTab.getSelectionModel().hasSelection() ){
						var records = fDomainTab.getSelectionModel().getSelection();
						var ids;
						var name = '';
						for ( var i = 0; i < records.length; i++) {
							if(i==0){
								ids=records[i].get('uuid');
								name = records[i].get('name');
							}else {
								ids=ids+"-"+records[i].get('uuid');
							}
						}
					
						var addDomain = Ext.getCmp('updateDomainPara');
						if(addDomain=='undefined'||addDomain==undefined){
							addDomain=Ext.create('app.view.operation.system.UpdateDomainPara',{});
							lanControll.setLan(addDomain);
						}
						addDomain.firstLoad=true;
						addDomain.down('form').store = domainListStore;
						addDomain.down('form').getForm().findField('ids').setValue(ids);
						addDomain.down('form').getForm().findField('name').setValue(name);
						var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
						var types='server,nodegroup';
						var specCloudField=addDomain.down('form').getForm().findField('specCloudUuid');
						var specSysField=addDomain.down('form').getForm().findField('specSysUuid');
						
						var comboxStore = Ext.create("app.store.util.ComboxStore",{});
						
	        			var specSysStore=specSysField.getStore();
	        			var specCloudStore=specCloudField.getStore();
	        			
	        			comboxStore.removeAll();
	        			specSysStore.removeAll();
	        			specCloudStore.removeAll();
	        			comboxStore.on('load',function(){
	        				
	        				specSysStore.add({uuid:-1,name:'-SELECT-'});
	        				specCloudStore.add({uuid:-1,name:'-SELECT-'});
	        				
	        				specSysStore.add({uuid:0,name:'NULL'});
	        				specCloudStore.add({uuid:0,name:'NULL'});
	        				
	        				for(var i=0; i<comboxStore.getCount(); i++){
	    						if(comboxStore.getAt(i).get('type')=='server'){
	    							specSysStore.add(comboxStore.getAt(i));
	    						}else if(comboxStore.getAt(i).get('type')=='cloud'){
	    							specCloudStore.add(comboxStore.getAt(i));
	    						}
	    					}
	        				if(records.length==1){
	        					addDomain.down('form').loadRecord(records[0]);
							}
	        				
							addDomain.show();
	        			},this,{single: true});
	        			comboxStore.load({params:{cloudUuid:-99,types:types}});
	        			
					}else{
						Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
   		 				return;
					}
	  	 		}
	  	 	}
		});
		tbar.push(set);
		tbar.push('-');
		
		var isHidden=false;
		if(roleType.isSuperAdmin(Ext.get("roleId").value)){
			isHidden=false;
		}else if(Ext.get('sysMode').value==1){
			isHidden=false;
		}else{
			isHidden=true;
		}
		var importS = Ext.create('Ext.button.Button',{
				xtype:'button',
				text:'Restore',
				ulan:'btRestore',
				iconCls:'upgrade',
				flag:"super_edit",
				menu:{
				xtype:'menu',			       		 
    		   		 items:[{
						text:'From File',
						ulan:'miFromFile',
						hidden:isHidden,
						handler:function(){
		      		 		var cmpId=fDomainTab.up('panel').up('panel').id;
		      		 		var importConfig=Ext.getCmp('importConfig');
		      		 		if(!importConfig){
		      		 			importConfig=Ext.create('app.view.operation.ImportConfig',{importMode:'importDomain',cmpId:cmpId});
		      		 			lanControll.setLan(importConfig);
		      		 		}
		      		 		var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
							var comboxStore = Ext.create("app.store.util.ComboxStore",{});
							var specSysField=importConfig.down('form').getForm().findField('specSysUuid');
							var sysLockedFlag=importConfig.down('form').getForm().findField('sysLockedFlag');
							var importLicField=importConfig.down('form').getForm().findField('importLic');
							var typeField=importConfig.down('form').getForm().findField('type').setValue(1);
							
							
							var specSysStore=specSysField.getStore();
							specSysStore.removeAll();
							comboxStore.on('load',function(){
		        				specSysStore.add({uuid:0,name:'NULL'});
		        				for(var i=0; i<comboxStore.getCount(); i++){
		    						if(comboxStore.getAt(i).get('type')=='server'){
		    							specSysStore.add(comboxStore.getAt(i));
		    						}
		    					}
		        				specSysField.setVisible(true);
		        				specSysField.setValue(0);
		        				importLicField.setVisible(true);
		        				importLicField.setValue(0);
		        				
		        				sysLockedFlag.setVisible(true);
		        				
		        				importConfig.importMode="importDomain";
			      		 		importConfig.cmpId=cmpId;
				       		 	importConfig.show();
		        			},this,{single: true});
		        			comboxStore.load({params:{cloudUuid:cloudUuid,types:'server'}});
    		   		 	}
    		   		 },{
 						text:'From Cloud',
 						ulan:'miFromCloud',
 						hidden:rs.dnsSysMode(),
 						handler:function(){
    		   			 	var sysMode=Ext.get('sysMode').value;
	    		   			if (sysMode!=1){
	    		   				if(!fDomainTab.getSelectionModel().hasSelection()){
	    		   					Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
						 			return;
	    		   				}
	    		   			}
    		   			 
//	    		   			if ( fDomainTab.getSelectionModel().hasSelection() ){
								var records = fDomainTab.getSelectionModel().getSelection();
								var ids;
								var name = '';
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										name = records[i].get('name');
									}
								}
								var cmpId=fDomainTab.up('panel').up('panel').id;
	 		      		 		var importConfig=Ext.getCmp('importConfigFromCloud');
	 		      		 		if(!importConfig){
	 		      		 			importConfig=Ext.create('app.view.operation.ImportConfigFromCloud',{importMode:'importDomain',cmpId:cmpId});
	 		      		 			lanControll.setLan(importConfig);
	 		      		 		}
	 		      		 		
	 		      		 		var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
	 							var comboxStore = Ext.create("app.store.util.ComboxStore",{});

	 							var backupStore = Ext.create("app.store.common.BackupStore",{});
	 							var backupField=importConfig.down('form').getForm().findField('backupUuid');
	 							var specSysField=importConfig.down('form').getForm().findField('specSysUuid');
	 							var sysLockedFlag=importConfig.down('form').getForm().findField('sysLockedFlag');
	 							var importLicField=importConfig.down('form').getForm().findField('importLic');
	 							//only for test
	 							importConfig.down('form').getForm().findField('type').setValue(2);
	 							
	 							var backupUuidStore=backupField.getStore();
	 							var specSysStore=specSysField.getStore();
	 							backupUuidStore.removeAll();
	 							specSysStore.removeAll();
	 							comboxStore.on('load',function(){
	 		        				specSysStore.add({uuid:0,name:'NULL'});
	 		        				for(var i=0; i<comboxStore.getCount(); i++){
	 		    						if(comboxStore.getAt(i).get('type')=='server'){
	 		    							specSysStore.add(comboxStore.getAt(i));
	 		    						}
	 		    					}
	 		        				specSysField.setVisible(true);
	 		        				specSysField.setValue(0);
	 		        				sysLockedFlag.setVisible(true);
	 		        				
	 		        				importLicField.setVisible(true);
			        				importLicField.setValue(0);
	 		        				
	 		        				importConfig.importMode="importDomain";
	 			      		 		importConfig.cmpId=cmpId;
	 			      		 		
	 			      		 		backupStore.on('load',function(){
//	 			      		 			backupUuidStore.add({uuid:-1,name:'-SELECT-'});
		 		        				for(var i=0; i<backupStore.getCount(); i++){
		 		        					var bs=backupStore.getAt(i);
		 		        					backupUuidStore.add(bs);
		 		        				}
		 		        				importConfig.show();
		 		        			},this,{single: true});
	 			      		 		
		 			      		 	
		 			      		 	var params={};
		 			      		 	if(sysMode==10){
										params={domainName:name,serverUuid:0,type:2};
									}else if(sysMode==1){
										var serverUuid=Ext.get('realSysUuid').value;
										params={domainName:'',serverUuid:serverUuid,type:1};
									}
	 			      		 		
		 		        			backupStore.load({params:params});
	 			      		 		
	 		        			},this,{single: true});
	 		        			comboxStore.load({params:{cloudUuid:cloudUuid,types:'server'}});
//							}else{
//								Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
//					 			return;
//							}
    		   			 
    		   		 	}
    		   		 }
    		 ]}
     	 
     	});
		
		if(isHidden && rs.dnsSysMode() ){
			
		}else{
			tbar.push(importS);
			tbar.push('-');
		}
	
	var exportS = Ext.create('Ext.button.Button',{
		xtype:'button',
		text:'Backup',
		ulan:'btBackup',
		iconCls:'export',
		flag:"super_read",
		menu:{
			 xtype:'menu',			       		 
		   		 items:[{
						text:'To File',
						ulan:'miToFile',
						handler:function(){
							if ( fDomainTab.getSelectionModel().hasSelection() ){
								var records = fDomainTab.getSelectionModel().getSelection();
								var ids;
								var name = '';
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
										name = records[i].get('name');
									}else {
										ids=ids+","+records[i].get('uuid');
									}
								}
								if(records.length>1){
									url="exportConfig!exportDomain.action?type=0&domainUuids="+ids;
								}else{
									url="exportConfig!exportDomain.action?type=0&domainUuid="+records[0].get('uuid');
								}
								Ext.MessageBox.confirm(boxInfo,boxBackup,function(e) {
			                		if( e == 'yes' ){
			                			var boxObj = {
			                		    		title:boxInfo,
			                		    		width : 300,
			                		    		msg:boxWaitMsg,
			                		    		modal:true,
			                		    		closable:false,
			                		    		wait:true
			                		    };
			                			var store=Ext.create('app.store.util.StepStore');
			                			sleepBar(store,true);
			                			Ext.Ajax.request({
			        		           		url:url,
			        		           		method:'POST',
			        		           		timeout:30*60*1000,
			        		           		callback: function (options, success, response) {
				                				boxObj.wait = false;
//				                				Ext.getCmp('messageWindow').down('form').getForm().reset();
//				                				Ext.getCmp('messageWindow').hide();
				                				autoRefresh.stopTask(null,store);
				            					var obj=Ext.JSON.decode(response.responseText);
			        	                   	if(obj["success"]){
			        	                   		window.location.href="download/"+obj["fileName"];
			        	                   	}else{
			        	                   		Ext.MessageBox.alert(boxFailture,boxExportFail);
			        	                   	}
			    	               	}
			        		           	})
			                		}});
								
							}else{
								Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
					 			return;
							}
		   		 		}
		   		 },{
						text:'From Work Server',
						ulan:'miToFileFromWork',
						hidden:!rs.dnsSysMode(),
						handler:function(){
							if ( fDomainTab.getSelectionModel().hasSelection() ){
								var records = fDomainTab.getSelectionModel().getSelection();
								var ids;
								var name = '';
								for ( var i = 0; i < records.length; i++) {
									if(i==0){
										ids=records[i].get('uuid');
										name = records[i].get('name');
									}else {
										ids=ids+","+records[i].get('uuid');
									}
								}
								url="exportConfig!exportDomainFromWorkServer.action?domainUuids="+ids;
								Ext.MessageBox.confirm(boxInfo,boxBackup,function(e) {
			                		if( e == 'yes' ){
			                			var boxObj = {
			                		    		title:boxInfo,
			                		    		width : 300,
			                		    		msg:boxWaitMsg,
			                		    		modal:true,
			                		    		closable:false,
			                		    		wait:true
			                		    };
			                			var store=Ext.create('app.store.util.StepStore');
			                			sleepBar(store,true);
			                			Ext.Ajax.request({
			        		           		url:url,
			        		           		method:'POST',
			        		           		timeout:30*60*1000,
			        		           		callback: function (options, success, response) {
				                				boxObj.wait = false;
//				                				Ext.getCmp('messageWindow').down('form').getForm().reset();
//				                				Ext.getCmp('messageWindow').hide();
				                				autoRefresh.stopTask(null,store);
				            					var obj=Ext.JSON.decode(response.responseText);
			        	                   	if(obj["success"]){
			        	                   		window.location.href="download/"+obj["fileName"];
			        	                   	}else{
			        	                   		Ext.MessageBox.alert(boxFailture,boxExportFail);
			        	                   	}
			    	               	}
			        		           	})
			                		}});
								
							}else{
								Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
					 			return;
							}
		   		 		}
		   		 },{
					text:'To Cloud',
					ulan:'miToCloud',
					hidden:rs.dnsSysMode(),
					handler:function(){
						if ( fDomainTab.getSelectionModel().hasSelection() ){
							var records = fDomainTab.getSelectionModel().getSelection();
							var ids;
							var name = '';
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
									name = records[i].get('name');
								}else {
									ids=ids+","+records[i].get('uuid');
								}
							}
							
							var sysMode=Ext.get('sysMode').value;
							var type=2;
							if(sysMode==10){
								type=2;
							}else if(sysMode=1){
								type=1;
							}
							if(records.length>1){
								url="exportConfig!exportDomain.action?type="+type+"&domainUuids="+ids;
							}else{
								url="exportConfig!exportDomain.action?type="+type+"&domainUuid="+records[0].get('uuid');
							}
							var backupToCloud=Ext.getCmp('backupToCloud');
		      		 		if(!backupToCloud){
		      		 			backupToCloud=Ext.create('app.view.operation.BackupToCloud');
								lanControll.setLan(backupToCloud);
		      		 		}
		      		 		backupToCloud.url=url;
		      		 		var backupNameField=backupToCloud.down('form').getForm().findField('backupName');
		      		 		var backupDescField=backupToCloud.down('form').getForm().findField('backupDesc');
		      		 		
		      		 		var date=rs.dateFormat(new Date(),'Y-m-d');
		      		 		backupNameField.setValue(name+'_'+date);
		      		 		
		      		 		var desc=name+" from "+Ext.get('sysAlias').value+" backup to the Cloud by "+Ext.get('username').value;
		      		 		backupDescField.setValue(desc);
		      		 		backupToCloud.show();
						}else{
							Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
				 			return;
						}
	   		 		}
		   		 }]
		   },
 	 
 	 });
	tbar.push(exportS);
	tbar.push('-');
	
	
	var move = Ext.create("Ext.button.Button",{
		xtype:'button',
		text:'Move',
		ulan:'btMove',
		iconCls:'option',
		flag:"super_edit",
 		listeners:{
 		 	click:function(){
				if ( fDomainTab.getSelectionModel().hasSelection() ){
					var records = fDomainTab.getSelectionModel().getSelection();
					var ids;
					var name = '';
					var type=0;
					for ( var i = 0; i < records.length; i++) {
						if(i==0){
							ids=records[i].get('uuid');
							name = records[i].get('name');
							type=2;
						}else {
							name=name+","+records[i].get('name');
							ids=ids+"-"+records[i].get('uuid');
							type=2;
						}
					}
				
					var moveDomain = Ext.getCmp('moveDomain');
					if(moveDomain=='undefined'||moveDomain==undefined){
						moveDomain=Ext.create('app.view.operation.system.MoveDomain',{});
						lanControll.setLan(moveDomain);
					}
					moveDomain.firstLoad=true;
					moveDomain.down('form').getForm().findField('ids').setValue(ids);
					moveDomain.down('form').getForm().findField('name').setValue(name);
					var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
					var types='extserver';
//					var specSysField=moveDomain.down('form').getForm().findField('fromServerUuid');
					var toSysUuidField=moveDomain.down('form').getForm().findField('toServerUuid');
					var domainNameField=moveDomain.down('form').getForm().findField('domainNames');
					var typeField=moveDomain.down('form').getForm().findField('type');
					domainNameField.setValue(name);
					
					typeField.setValue(type);
					var comboxStore = Ext.create("app.store.util.ComboxStore",{});
					
//					var specSysStore=specSysField.getStore();
					var toSysUuidStore=toSysUuidField.getStore();
					
					comboxStore.removeAll();
//					specSysStore.removeAll();
					toSysUuidStore.removeAll();
					comboxStore.on('load',function(){
//	       				specSysStore.add({uuid:-1,name:'-SELECT-'});
	       				toSysUuidStore.add({uuid:-1,name:'-SELECT-'});
	
	       				for(var i=0; i<comboxStore.getCount(); i++){
	   						if(comboxStore.getAt(i).get('type')=='extserver'){
//	   							specSysStore.add(comboxStore.getAt(i));
	   							toSysUuidStore.add(comboxStore.getAt(i));
	   						}
	   					}
	       				if(records.length==1){
//	       					specSysField.setValue(records[0].get('specSysUuid'));
	       					toSysUuidField.setValue(-1);
	       				}
	       				moveDomain.show();
	       			},this,{single: true});
					comboxStore.load({params:{cloudUuid:-99,types:types}});
       			
				}else{
					Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		 			return;
				}
 	 		}
 	 	}
	});
	
	var localSysMode=Ext.get('sysMode').value;
	var localLicStatus=Ext.get('licStatus').value;
	if(localSysMode==11 && localLicStatus==10){
		var roleId = Ext.get("roleId").value;
		if(roleType.isSuper(roleId)){
			tbar.push(move);
			tbar.push('-');
		}
	}
	
		
		
		var view = Ext.create("Ext.button.Button",{
			xtype:'button',
			text:'View',
			ulan:'btView',
			iconCls: 'view_group',
			flag:"super_read",
			menu:{
	       		 xtype:'menu',			       		 
	       		 items:[{
	       			text:'Default View',
	       			ulan:'miDefaultView',
	       			handler:function(){
//		       			 ip.changeView(fDomainTab,'checkbox,name,adminStatus,runStatus,vendorId,type,specServerName,serverName,sysLockedFlag,alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax',true);
//		       			 ip.changeView(fDomainTab,'uuid,alias,oprStatus,e...e,createTime,updateTime,logUserMax,totalNeCount,totalSimCard',false);
//		       			 
//		       			 var showIds="checkbox,name,adminStatus,runStatus,vendorId,type,specServerName,serverName,sysLockedFlag,alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax";
//		       			 var hideIds="uuid,alias,oprStatus,e...e,createTime,updateTime,logUserMax";
//		       			 ip.setCurCookie(showIds,hideIds,'dl');
//		     			{header: 'SIM Card', dataIndex: 'totalSimCard',hidden:false},
//						{header: 'onlineSIMCard', dataIndex: 'onlineSimCard',hidden:false},
		       			 
		       			 var showIds="checkbox,name,runStatus,vendorId,type,specServerName,serverName,sysLockedFlag,totalNeCount,onlineNeCount,totalSimCard,onlineSimCard,createTime";
		       			 var hideIds="uuid,alias,adminStatus,oprStatus,e...e,updateTime,alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax";
							
						ip.insertViewAdvance(fDomainTab,'dl',11,showIds,hideIds);
	       		 	}
	       		 },{
	       			text:'Basic View',
	       			ulan:'miBasicView',
	       			handler:function(){
	       			 	ip.changeView(fDomainTab,'uuid,name,alias,adminStatus,oprStatus,runStatus',true);
	       			 	ip.changeView(fDomainTab,'alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax',false);
	       			 	ip.changeView(fDomainTab,'vendorId,type,specServerName,serverName,sysLockedFlag,totalNeCount,totalSimCard',false);
	       			 
	       			 	var showIds="uuid,name,alias,adminStatus,oprStatus,runStatus";
	       			 	var hideIds="alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,vendorId,type,specServerName,serverName,sysLockedFlag,totalNeCount,totalSimCard,logUserMax";
	       			 	ip.setCurCookie(showIds,hideIds,'dl');
	       		 	}
	       		 },{
	       			text:'Detail View',
	       			ulan:'miDetailView',
	       			handler:function(){
		       			ip.changeView(fDomainTab,'uuid,name,alias,adminStatus,oprStatus,runStatus,totalNeCount,totalSimCard',true);
	       			 	ip.changeView(fDomainTab,'alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax',false);
	       			 	ip.changeView(fDomainTab,'vendorId,type,specServerName,serverName,sysLockedFlag',true);
	       			 	
	       			 	var showIds="uuid,name,alias,adminStatus,oprStatus,runStatus,vendorId,type,specServerName,serverName,sysLockedFlag,totalNeCount,totalSimCard";
	       			 	var hideIds="alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax";
	       			 	ip.setCurCookie(showIds,hideIds,'dl');
	       		 	}
	       		 },{
	       			text:'PM Data View',
	       			ulan:'miPmDataView',
	       			handler:function(){
	       			 	ip.changeView(fDomainTab,'uuid,name,alias,adminStatus,oprStatus,runStatus',true);
	       			 	ip.changeView(fDomainTab,'alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax',true);
	       			 	ip.changeView(fDomainTab,'vendorId,type,specServerName,serverName,sysLockedFlag',false);
	       			 	
	       			 	var showIds="uuid,name,alias,adminStatus,oprStatus,runStatus,alarmMax,pm15mMax,pm24hMax,pmCallMax,pmSmsMax,pmUssdMax,logUserMax";
	       			 	var hideIds="vendorId,type,specServerName,serverName,sysLockedFlag,totalNeCount,totalSimCard";
	       			 	ip.setCurCookie(showIds,hideIds,'dl');
	       		 	}
	       		 },'-',{
	       			text:'User View-1',
	       			ulan:'miUserView1',
	       			handler:function(){
	       			 	ip.changeUserView(fDomainTab,'dl',1,fDomainTab.up('panel').up('panel').id);
	       		 	}
	       		 },{
	       			text:'User View-2',
	       			ulan:'miUserView2',
	       			handler:function(){
	       			 	ip.changeUserView(fDomainTab,'dl',2,fDomainTab.up('panel').up('panel').id);
	       		 	}
	       		 },{
	       			text:'User View-3',
	       			ulan:'miUserView3',
	       			handler:function(){
	       			 	ip.changeUserView(fDomainTab,'dl',3,fDomainTab.up('panel').up('panel').id);
	       		 	}
	       		 },'-',{
	       			text:'User Setting...',
	       			ulan:'miUserSetting',
	       			handler:function(){
	       			 	var win=Ext.getCmp('viewAdvanced');
	       			 	var win=ip.initViewSet(fDomainTab);
	       			 	
	       			 	win.down('hiddenfield[name=mode]').setValue('dl');
	       			 	win.down('hiddenfield[name=cmpId]').setValue(fDomainTab.up('panel').up('panel').id);
	       			 	win.show();
	       		 	}
		       	}], 
       	 	 }
       	 });
	}
	tbar.push(view);
	tbar.push('-');
	
	var refresh = Ext.create('Ext.button.Button',{
   		 xtype:'button',
   		 text:'Refresh',
   		ulan:'btRefresh',
   		 iconCls:'refresh2',
   		 flag:"super_read",
   		 listeners:{
   		 	click:function(){
				fDomainTab.getStore().load();
   	 		}
   	 	}
   	 });
	tbar.push(refresh);
	tbar.push('->');
	
	var search = Ext.create('Ext.button.Button',{
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
   	 });
	tbar.push(search);	
	this.tbar = tbar;
	
	var sysStore = Ext.create('app.store.util.ComboxStore',{});
	var sysStore2 = Ext.create('app.store.util.ComboxStore',{});
	sysStore.on('beforeload', function (sysStore, options) {
        var params = { cloudUuid:1};
        Ext.apply(sysStore.proxy.extraParams, params);
    });
	sysStore.on('load',function(){
		sysStore2.removeAll();
		for(var i=0; i<sysStore.getCount(); i++){
			sysStore2.add(sysStore.getAt(i));
		}
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
			fieldLabel:'Name',
			name:'name',
		}, {
			name : 'specSysUuid',
			xtype: 'combo',
			mode: 'local',
			fieldLabel: 'Specific Server',
			displayField: 'name',
			valueField: 'uuid',
			queryMode: 'local',
			store:sysStore,
			value:-1,
		}, {
			name : 'sysUuid',
			xtype: 'combo',
			mode: 'local',
			fieldLabel: 'Current Server',
			displayField: 'name',
			valueField: 'uuid',
			queryMode: 'local',
			store:sysStore2,
			value:-1,
//			listConfig:{minWidth:180}
		},{
            xtype: 'combo',
            name: 'vendorId',
            fieldLabel: 'Vendor',
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
					name : 'UCSPEED',
					value : 1
				}, {
					name : 'DINSTAR',
					value : 2
				}  ]
			}),
			value:-1,

		},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null)
		],
		
		buttons : [ {
				text : 'Reset',
				ulan:'btReset1',
				flag:"super_read",
				handler : function() {
					this.up('form').getForm().reset();
					this.up('form').getForm().findField('specSysUuid').setValue(-1);
					this.up('form').getForm().findField('sysUuid').setValue(-1);
					this.up('form').getForm().findField('vendorId').setValue(-1);
//					this.up('form').getForm().findField('type').setValue(-1);
					this.up('form').getForm().findField('adminStatus').setValue(0);
					this.up('form').getForm().findField('runStatus').setValue(0);
				}
		}, {
		text : 'Search',
		ulan:'btSearch',
		flag:"super_read",
		handler : function() {
			var panel = this.up('form').up('panel').up('panel').down("panel[itemId=grid]")
			var store = panel.store;
			var form=this.up('form').getForm();
			var params = form.getValues();
			store.on('beforeload', function (store, options) {
		        Ext.apply(store.proxy.extraParams, params);
		    },this,{single: true});
			
			var paging = panel.down("pagingtoolbar");
			paging.moveFirst();
		}
		}]
	});

	this.items=[
				   {
					 region: 'center',
					 layout:'fit',
					 items:[fDomainTab]
					       
					},{
					 itemId:'search',
					 region:'east',
					 title : tiSearch,
					 collapsible: true,
					 collapsed:true,
					 width:300,
					 items:[search_grid]
				 }
				 ];
		this.callParent(arguments);	
	}
});