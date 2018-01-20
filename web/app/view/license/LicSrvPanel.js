Ext.define('app.view.license.LicSrvPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	sysUuid:0,
	initComponent: function(){
		var store = Ext.create('app.store.license.LicSrvStore',{});
		this.store = store;
		var formPanel=Ext.create('Ext.form.Panel',{
			title:tiLicInfo,
			itemId:'form',
			cloudName:'',
			treeName:'',
			store:store,
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '100%',
	            labelWidth: 180,
	        },
	       
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'specSysUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Server Info',
				ulan:'fsServerInfo',
				itemId:'system_basic_info',
				items:[{
					border:false,
					layout: {
			            type: 'table',
			            columns: 3
			        },
			        defaults: {
			            width:640, 
			            height: 25,
			        },
			        bodyStyle: {
						background: '#DFE9F6',
					},
			        items: [{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[{
			    			xtype: 'displayfield',
			    			name: 'sysUuid',
			    			ulan:'srvUuid',
			    			fieldLabel: 'Server Uuid',
				            labelWidth: 180,
				            width:290,
				        },{
				            xtype: 'displayfield',
				            name: 'sysName',
				            labelWidth: 40,
				            width:150,
				            ulan:'sysNameSpec',
				            fieldLabel: 'Name',
				        },{
				            xtype: 'displayfield',
				            labelWidth: 40,
				            width:90,
				            name: 'sysAlias',
				            ulan:'sysAliasSpec',
				            fieldLabel: 'Alias',
				        }]
			        },{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:8,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 8,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/server.png',
			    	
			        },{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[{
				            xtype: 'displayfield',
				            name: 'adminStatus',
				            fieldLabel: 'Admin Status',
				            labelWidth: 180,
				            width:290,
				        },{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            ulan:'oprStatusSpec',
				            labelWidth: 40,
				            width:150,
				            fieldLabel: 'Opr',
				        },{
				            xtype: 'displayfield',
				            labelWidth: 40,
				            width:90,
				            ulan:'runStatusSpec',
				            name: 'runStatus',
				            fieldLabel: 'Run',
				        }]
			        
			        },{
			        	xtype: 'displayfield',
			        	name: 'trialBalance',
			        	labelWidth: 180,
			        	fieldLabel: 'TRIAL Balance',
			        },{
			        	xtype: 'displayfield',
			        	name: 'premiumBalance',
			        	labelWidth: 180,
			        	fieldLabel: 'PREMIUM Balance',
			        },{
			        	xtype: 'displayfield',
			        	name: 'licFirstCost',
			        	labelWidth: 180,
			        	fieldLabel: 'First Year Cost',
			        },{
			        	xtype: 'displayfield',
			        	name: 'licPeriodCost',
			        	labelWidth: 180,
			        	fieldLabel: 'Next Year Cost(per year)',
			        },{
		    			xtype: 'displayfield',
			            name: 'totalNeCount',
			            fieldLabel: 'Device Count',
			            labelWidth: 180,
			            width:240,
			        },{
			        	xtype: 'displayfield',
			        	name: 'sysTotalSimCard',
			        	fieldLabel: 'SIM Card',
			        	labelWidth: 180,
			        	hidden:rs.dmCloudMode(),
			        },{
			        	xtype: 'displayfield',
			            name: 'sysDetailDesc',
			            labelWidth: 180,
			            rows:1,
			            fieldLabel: 'Description',
			        }]
			        }
		    ]},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'License Info',
				ulan:'fsLicenseDetailInfo',
				itemId:'license_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'licStatus',
		            fieldLabel: 'Status',
		        }, {
		            xtype: 'displayfield',
		            name: 'leftDays',
		            fieldLabel: 'Left Days',
		        },{
		            xtype: 'hiddenfield',
		            name: 'srvDomain',
		            fieldLabel: 'Server Domain',
		        },{
		            xtype: 'displayfield',
		            name: 'serialNo',
		            ulan:'sn',
		            fieldLabel: 'Serial No',
		        },{
		        	xtype: 'displayfield',
		        	name: 'signType',
		        	fieldLabel: 'Type',
		        },{
		        	xtype: 'displayfield',
		        	name: 'version',
		        	fieldLabel: 'Version',
		        },{
		        	xtype: 'displayfield',
		        	name: 'srvUuid',
		        	fieldLabel: 'Server Uuid',
		        },{
		        	xtype: 'displayfield',
		        	name: 'srvMode',
		        	fieldLabel: 'Server Mode',
		        },{
		            xtype: 'displayfield',
		            name: 'srvMagic',
		            fieldLabel: 'Server Magic',
		        },{
		            xtype: 'displayfield',
		            name: 'maxSimCard',
		            fieldLabel: 'MAX SIM Card',
		            hidden:rs.dmCloudMode(),
		        }, {
		            xtype: 'displayfield',
		            name: 'serviceApi',
		            fieldLabel: 'Service API',
		            hidden:rs.dmCloudMode(),
		        }, {
		        	xtype: 'displayfield',
		        	name: 'hbmFeatures',
		        	fieldLabel: 'HBM Features',
		        }, {
		            xtype: 'hiddenfield',
		            name: 'hbmFeatures02',
		            fieldLabel: 'HBM Features-02',
		        }, {
		            xtype: 'hiddenfield',
		            name: 'hbmFeatures03',
		            fieldLabel: 'HBM Features-03',
		        }, {
		            xtype: 'displayfield',
		            name: 'expiredDate',
		            fieldLabel: 'Expired Date',
		        }, {
		            xtype: 'displayfield',
		            name: 'validDays',
		            fieldLabel: 'Valid Days',
		        }, {
		            xtype: 'displayfield',
		            name: 'signDate',
		            fieldLabel: 'Sign Date',
		        }, {
		        	xtype: 'displayfield',
		        	name: 'signAuthor',
		        	fieldLabel: 'Sign Author',
		        }, {
		            xtype: 'displayfield',
		            name: 'dnsUrl',
		            fieldLabel: 'DNS URL-1',
		        }, {
		            xtype: 'displayfield',
		            name: 'dnsUrl02',
		            fieldLabel: 'DNS URL-2',
		        }, {
		            xtype: 'displayfield',
		            name: 'authInfo',
		            fieldLabel: 'Authentication',
		        }, {
		        	xtype: 'displayfield',
		            name: 'detailDesc',
		            hidden:true,
		            fieldLabel: 'Memo',
		        }]
		    }],
	    	createTbar:function(){
	    		var tbar = [];
	    		
	    		var recharge = Ext.create('Ext.button.Button',{
	    			xtype:'button',
	    			text:'Recharge',
	    			ulan:'btRecharge',
	    			iconCls:'icon-basket',
	    			remoteFlag:'',
	    			hidden:true,
	    			listeners:{
	    			click:function(){
	    				var cloudName=this.up('form').cloudName;
		    			if(this.remoteFlag==true){
		    				var srvMode=formPanel.getForm().findField('srvMode').getValue();
		    				
		    				Ext.MessageBox.confirm(boxInfo,boxLocalMode+srvMode+boxJumpToLic,function(e) {
	       						if( e == 'yes' ){
	       							var dns=Ext.get('dnsUrl').value;
	       							if(dns.indexOf('dinstarcloud')>0){
	       								window.open("http://www.dinstarcloud.com/login.html?domainName="+cloudName);
	       							}else{
	       								window.open("http://"+dns+"/login.html?domainName="+cloudName);
	       							}
	       						}
	       					});
	    				}else{
			    			var rechargeLicense=Ext.getCmp('rechargeLicense');
			    			if(!rechargeLicense){
			    				rechargeLicense=Ext.create('app.view.license.RechargeLicense',{title:lanControll.getLanValue('tiRechargeLic')});
			    			}
			    			rechargeLicense.cmpId=formPanel.up('panel').id;
			    			var sysUuid=formPanel.treeName;
			    			var name=this.up('form').getForm().findField('sysName').getValue();
			    			rechargeLicense.down('form').getForm().findField('name').setValue(name);
			    			rechargeLicense.down('form').getForm().findField('usedSysUuid').setValue(sysUuid);
			    			rechargeLicense.show();
	    				}
	    			}
	    		}
	    		});
	    		tbar.push(recharge);
	    		tbar.push('-');
	    		
	    		var renewal = Ext.create('Ext.button.Button',{
	    			xtype:'button',
	    			text:'License',
	    			ulan:'btLicense',
	    			iconCls:'icon-switch',
	    			remoteFlag:'',
	    			hidden:true,
	    			listeners:{
		    			click:function(){
	    					var cloudName=this.up('form').cloudName;
			    			if(this.remoteFlag==true){
			    				var srvMode=formPanel.getForm().findField('srvMode').getValue();
		    					Ext.MessageBox.confirm(boxInfo,boxLocalMode+srvMode+boxJumpToLic,function(e) {
		       						if( e == 'yes' ){
		       							var dns=Ext.get('dnsUrl').value;
		       							if(dns.indexOf('dinstarcloud')>0){
		       								window.open("http://www.dinstarcloud.com/login.html?domainName="+cloudName);
		       							}else{
		       								window.open("http://"+dns+"/login.html?domainName="+cloudName);
		       							}
		       						}
		       					});
		    				}else{
			    				var updateLicense=Ext.getCmp('updateLicense');
			    				if(!updateLicense){
			    					updateLicense=Ext.create('app.view.license.UpdateLicense',{title:tiSetting});
			    					lanControll.setLan(updateLicense);
			    				}
			    				updateLicense.cmpId=formPanel.up('panel').id;
			    				var store=this.up('form').store;
			    				if(store.getAt(0)){
			    					updateLicense.down('form').getForm().loadRecord(store.getAt(0));
			    					updateLicense.down('form').getForm().findField('curSimCard').setValue(store.getAt(0).get('maxSimCard'));
			    					updateLicense.store=this.up('form').store;
			    				}
			    				updateLicense.action='createSrvLicense';
			    				var sysUuid=formPanel.treeName;
			    				var srvMode=this.up('form').getForm().findField('srvMode').getValue();
			    				var signType=this.up('form').getForm().findField('signType').getValue();
			    				var licStatus=this.up('form').getForm().findField('licStatus').getValue();
			    				var name=this.up('form').getForm().findField('sysName').getValue();
			    				updateLicense.down('form').getForm().findField('srvUuid').setValue(sysUuid);
			    				updateLicense.down('form').getForm().findField('srvMode').setValue(srvMode);
			    				updateLicense.down('form').getForm().findField('name').setValue(name);
			    				updateLicense.down('form').getForm().findField('srvMode').setVisible(true);
			    				
			    				var srvMagicField=updateLicense.down('form').getForm().findField('srvMagic');
			    				
			    				srvMagicField.setDisabled(false);
			    				srvMagicField.setVisible(true)
			    				
			    				
			    				
			    				//set magic readonly while license is not null
			    				var ls=store.getAt(0).get('licStatus');
			    				if(ls==0){
			    					srvMagicField.setReadOnly(false);
			    					srvMagicField.setFieldStyle("background:#FFF");
			    				}else{
			    					if(roleType.isSuperAdmin(privilege.roleObj.roleId)){
				    					srvMagicField.setReadOnly(false);
				    					srvMagicField.setFieldStyle("background:#FFF");
				    				}else{
				    					srvMagicField.setReadOnly(true);
				    					srvMagicField.setFieldStyle("background:#DFE9F6");
				    				}
			    				}
			    				
			    				var operateField=updateLicense.down('form').getForm().findField('operate');
			    				operateField.store.removeAll();
			    				var st=store.getAt(0).get('signType');
			    				if(st==1){
			    					operateField.store.add({name : lanControll.getLanValue('licOpr_'+'newLic'),value : 'newLic'});
//			    					updateLicense.down('form').getForm().findField('validDays').setValue(30);
			    				}else{
			    					operateField.store.add({name : lanControll.getLanValue('licOpr_'+'newLic'),value : 'newLic'});
			    					operateField.store.add({name : lanControll.getLanValue('licOpr_'+'renewLic'),value : 'renewLic'});
//			    					updateLicense.down('form').getForm().findField('validDays').setValue(365);
			    				}
			    				
			    				updateLicense.show();
		    				}
		    			}
	    			}
	    		});
	    		tbar.push(renewal);
	    		tbar.push('-');
	    		var imp = Ext.create('Ext.button.Button',{
		       		xtype:'button',
		       		text:'Import',
		       		ulan:'btImport',
		       		iconCls:'upgrade',
		       		hidden:true,
		       		listeners:{
		       		 	click:function(){
		       		 		var cmpId=this.up('form').id;
		       		 		var sysUuid = this.up('form').store.getAt(0).get('sysUuid');
		       		 		var importConfig=Ext.getCmp('importLicense');
		       		 		if(!importConfig){
		       		 			importConfig=Ext.create('app.view.license.ImportLicense',{cmpId:cmpId});
		       		 		}
		       		 		importConfig.cmpId=cmpId;
			       		 	importConfig.down('form').getForm().findField('uuid').setValue(sysUuid);
			       		 	importConfig.show();
		       	 		}
		       	 	}
		       	 
		       	 });
				tbar.push(imp);
				tbar.push('-');
	    		
	    		var exp = Ext.create('Ext.button.Button',{
	    			xtype:'button',
	    			text:'Export',
	    			ulan:'btExport',
	    			iconCls:'export',
	    			hidden:true,
	    			listeners:{
		    			click:function(){
       				
							var records= this.up('form').store.getAt(0);
							var srvUuid=records.get('sysUuid');
							var sysName=records.get('sysName');
							boxNoLic = lanControll.getLanValue('boxNoLic');
							if(!srvUuid){
								Ext.MessageBox.alert(boxError,sysName+boxNoLic);
								return;
							}
							boxExportLic = lanControll.getLanValue('boxExportLic');
							Ext.MessageBox.confirm(boxInfo,boxExportLic,function(e) {																			
		   						if( e == 'yes' ){
		   							Ext.Ajax.request({
				                		url:'licSrvManager!exportSrvLicense.action?srvUuid='+srvUuid,
				                		method:'POST',
				                		timeout:5*60*1000,
				                		callback: function (options, success, response) {
		   									var obj=Ext.JSON.decode(response.responseText);
					                    	if(obj["success"]){
					                    		var href="download/"+obj["fileName"];
					                    		var url="attachment.action?href="+href+"&fileName="+obj["fileName"];
					                    		window.location.href=url;
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
					                    	}
				                    	}
				                	})
								}
							})
		   							
		   			}
	    			}
	    		});
	    		tbar.push(exp);
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		 ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
		        			this.up('form').store.load();
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
	    		}
	    	},
	       
	       
		});

		sysLoadMask=new Ext.LoadMask(formPanel, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load', function(){
			  var r=store.getAt(0);
			  var sysUuid=parseInt(r.get('sysUuid'));
			  var adminStatus=parseInt(r.get('adminStatus'));
			  var oprStatus=parseInt(r.get('oprStatus'));
			  var runStatus=parseInt(r.get('runStatus'));
			  var signType=parseInt(r.get('signType'));
			  var srvMode=parseInt(r.get('srvMode'));
			  var serviceApi=parseInt(r.get('serviceApi'));
			  var hbmFeatures=parseInt(r.get('hbmFeatures'));
			  var hbmFeatures02=parseInt(r.get('hbmFeatures02'));
			  var hbmFeatures03=parseInt(r.get('hbmFeatures03'));
			  var licStatus=parseInt(r.get('licStatus'));
			  
			  var admin=formPanel.getForm().findField('adminStatus');
			  var opr=formPanel.getForm().findField('oprStatus');
			  var run=formPanel.getForm().findField('runStatus');
			  var signTypeField=formPanel.getForm().findField('signType');
			  var srvModeField=formPanel.getForm().findField('srvMode');
			  var serviceApiField=formPanel.getForm().findField('serviceApi');
			  var hbmFeaturesField=formPanel.getForm().findField('hbmFeatures');
			  var hbmFeatures02Field=formPanel.getForm().findField('hbmFeatures02');
			  var hbmFeatures03Field=formPanel.getForm().findField('hbmFeatures03');
			  var licStatusField=formPanel.getForm().findField('licStatus');
			  
			  var localSysMode=Ext.get('sysMode').value;
			  var localLicStatus=Ext.get('licStatus').value;
			  var localSysUuid=Ext.get('sysUuid').value;
			  var recharge=formPanel.down('button[ulan=btRecharge]');
			  var license=formPanel.down('button[ulan=btLicense]');
			  var imp=formPanel.down('button[ulan=btImport]');
			  var exp=formPanel.down('button[ulan=btExport]');
			  
			  
			  if(localSysMode==1 ||localSysMode==0){
				  recharge.remoteFlag=true;
				  license.remoteFlag=true;
				  imp.setVisible(true);
				  exp.setVisible(true);
			  }else if(localSysMode==10){
				  recharge.setVisible(false);
				  license.setVisible(false);
				  imp.setVisible(false);
				  exp.setVisible(true);
			  }else if(localSysMode==11 && localLicStatus==10){
				  if(srvMode==1){
					  recharge.setVisible(true);
					  license.setVisible(true);
					  imp.setVisible(true);
					  exp.setVisible(true);
				  }else if(srvMode==10){
					  recharge.setVisible(false);
					  license.setVisible(false);
					  imp.setVisible(false);
					  exp.setVisible(true);
				  }else if(srvMode==11){
					  recharge.setVisible(false);
					  license.setVisible(false);
					  imp.setVisible(false);
					  exp.setVisible(true);
				  }else{
					  recharge.setVisible(true);
					  license.setVisible(true);
					  imp.setVisible(true);
					  exp.setVisible(false);
				  }
			  }else{
				  recharge.setVisible(false);
				  license.setVisible(false);
				  imp.setVisible(false);
				  exp.setVisible(false);
			  }
			 
			  
			  if(r){
				  formPanel.loadRecord(r);
			  }
			  admin.setValue(rs.adminStatus(adminStatus));
			  opr.setValue(rs.oprStatus(oprStatus));
			  run.setValue(rs.runStatus(runStatus));
			  signTypeField.setValue(rs.signType(signType));
			  srvModeField.setValue(rs.serverMode(srvMode));
			  serviceApiField.setValue(rs.yesOrNo(serviceApi));
			  hbmFeaturesField.setValue(rs.yesOrNo(hbmFeatures));
			  hbmFeatures02Field.setValue(rs.yesOrNo(hbmFeatures02));
			  hbmFeatures03Field.setValue(rs.yesOrNo(hbmFeatures03));
			  licStatusField.setValue(rs.licenseStatus(licStatus));
		});
		
		var id = 'licSrvPaidListTab';
		

		var paidListTab=Ext.create('app.view.license.LicPaidListViewTab',{title:lanControll.getLanValue('tiRechargeHis'),id:id});

		paidListTab.addListener("afterlayout",function(){
			privilege.procPrivilege(paidListTab);
		},this,{single:true});

		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[formPanel,paidListTab],
	   	    listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});