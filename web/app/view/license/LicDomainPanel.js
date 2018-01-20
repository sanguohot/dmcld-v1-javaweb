Ext.define('app.view.license.LicDomainPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	domainUuid:0,
	initComponent: function(){
		var store = Ext.create('app.store.license.LicDomainStore',{});
		this.store = store;
		var formPanel=Ext.create('Ext.form.Panel',{
			title:tiLicInfo,
			itemId:'form',
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
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Domain Info',
				ulan:'fsDomainInfo',
				itemId:'domain_basic_info',
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
			    			name: 'domainUuid',
			    			fieldLabel: 'Domain UUID',
				            labelWidth: 180,
				            width:290,
				        },{
				            xtype: 'displayfield',
				            name: 'domainName',
				            labelWidth: 40,
				            width:150,
				            ulan:'name',
				            fieldLabel: 'Name',
				        },{
				            xtype: 'displayfield',
				            labelWidth: 40,
				            width:150,
				            name: 'domainAlias',
				            ulan:'alias',
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
			    		src:Ext.get('resources').value+'/images/panel_logo/domain.png',
			    	
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
				            width:150,
				            ulan:'runStatusSpec',
				            name: 'runStatus',
				            fieldLabel: 'Run',
				        }]
			        
			        },{
			        	xtype: 'displayfield',
			        	name: 'trialBalance',
			        	labelWidth: 180,
			        	fieldLabel: 'Trial Balance',
			        	hidden:rs.localSysMode()
			        },{
			        	xtype: 'displayfield',
			        	name: 'premiumBalance',
			        	labelWidth: 180,
			        	fieldLabel: 'Premium Balance',
			        	hidden:rs.localSysMode()
			        },{
			        	xtype: 'displayfield',
			        	name: 'licFirstCost',
			        	labelWidth: 180,
			        	fieldLabel: 'First Year Cost',
			        	hidden:rs.localSysMode()
			        },{
			        	xtype: 'displayfield',
			        	name: 'licPeriodCost',
			        	labelWidth: 180,
			        	fieldLabel: 'Next Year Cost(per year)',
			        	hidden:rs.localSysMode()
			        },{
		    			xtype: 'displayfield',
			            name: 'totalNeCount',
			            fieldLabel: 'Device Count',
			            labelWidth: 180,
			            width:240,
			        },{
			        	xtype: 'displayfield',
			        	name: 'totalSimCard',
			        	fieldLabel: 'SIM Card',
			        	labelWidth: 180,
			        	hidden:rs.dmCloudMode(),
			        },{
			        	xtype: 'displayfield',
			            name: 'domainDetailDesc',
			            ulan:'detailDesc',
			            labelWidth: 180,
			            rows:1,
			            fieldLabel: 'Description',
			        }]
			        }
		    ]},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'License Info',
				itemId:'license_detail_info',
				ulan:'fsLicenseDetailInfo',
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
	    			flag:"domain_action",
	    			remoteFlag:'',
	    			hidden:true,
	    			listeners:{
	    			click:function(){
	    				var name=this.up('form').getForm().findField('domainName').getValue();
	    				if(this.remoteFlag==true){
	    					var srvMode=rs.serverMode(Ext.get('sysMode').value);
	    					Ext.MessageBox.confirm(boxInfo,boxLocalMode+srvMode+boxJumpToLic,function(e) {
	       						if( e == 'yes' ){
	       							var dns=Ext.get('dnsUrl').value;
	       							if(dns.indexOf('dinstarcloud')>0){
	       								window.open("http://www.dinstarcloud.com/login.html?domainName="+name);
	       							}else{
	       								window.open("http://"+dns+"/login.html?domainName="+name);
	       							}
	       						}
	       					});
	    				}else{
	    					var rechargeLicense=Ext.getCmp('rechargeLicense');
			    			if(!rechargeLicense){
			    				rechargeLicense=Ext.create('app.view.license.RechargeLicense',{title:lanControll.getLanValue('tiRechargeLic')});
			    				lanControll.setLan(rechargeLicense);
			    			}
			    			rechargeLicense.cmpId=formPanel.up('panel').id;
			    			var domainUuid=formPanel.treeName;
			    			
			    			rechargeLicense.down('form').getForm().findField('usedDomainUuid').setValue(domainUuid);
			    			rechargeLicense.down('form').getForm().findField('name').setValue(name);
			    			rechargeLicense.show();	
	    				}
	    			}
	    		}
	    		});
	    		tbar.push(recharge);
	    		var renewal = Ext.create('Ext.button.Button',{
	    			xtype:'button',
	    			text:'License',
	    			ulan:'btLicense',
	    			iconCls:'icon-switch',
	    			flag:"domain_action",
	    			hidden:true,
	    			remoteFlag:'',
	    			listeners:{
		    			click:function(){
	    					var name=this.up('form').getForm().findField('domainName').getValue();
    						if(this.remoteFlag==true){
    							var srvMode=rs.serverMode(Ext.get('sysMode').value);
    							Ext.MessageBox.confirm(boxInfo,boxLocalMode+srvMode+boxJumpToLic,function(e) {
		       						if( e == 'yes' ){
		       							var dns=Ext.get('dnsUrl').value;
		       							if(dns.indexOf('dinstarcloud')>0){
		       								window.open("http://www.dinstarcloud.com/login.html?domainName="+name);
		       							}else{
		       								window.open("http://"+dns+"/login.html?domainName="+name);
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
			    				updateLicense.action='createDomainLicense';
			    				var domainUuid=formPanel.treeName;
			    				var signType=this.up('form').getForm().findField('signType').getValue();
			    				var name=this.up('form').getForm().findField('domainName').getValue();
			    				updateLicense.down('form').getForm().findField('domainUuid').setValue(domainUuid);
			    				updateLicense.down('form').getForm().findField('name').setValue(name);
			    				updateLicense.down('form').getForm().findField('srvMode').setVisible(false);
			    				updateLicense.down('form').getForm().findField('srvMagic').setDisabled(true);
			    				updateLicense.down('form').getForm().findField('srvMagic').setVisible(false);
			    				
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
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		 ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
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
	    				privilege.procPrivilege(formPanel);
	    			},
	    			single:true
	    		}
	    	},
	       
	       
		});
//		formPanel.addListener("afterlayout",function(){
//			privilege.procPrivilege(formPanel);
//		},this,{single:true});
		domainLoadMask=new Ext.LoadMask(formPanel, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load', function(){
			  var r=store.getAt(0);
			  var adminStatus=parseInt(r.get('adminStatus'));
			  var oprStatus=parseInt(r.get('oprStatus'));
			  var runStatus=parseInt(r.get('runStatus'));
			  var signType=parseInt(r.get('signType'));
			  var serviceApi=parseInt(r.get('serviceApi'));
			  var hbmFeatures=parseInt(r.get('hbmFeatures'));
			  var hbmFeatures02=parseInt(r.get('hbmFeatures02'));
			  var hbmFeatures03=parseInt(r.get('hbmFeatures03'));
			  var licStatus=parseInt(r.get('licStatus'));
			  
			  var admin=formPanel.getForm().findField('adminStatus');
			  var opr=formPanel.getForm().findField('oprStatus');
			  var run=formPanel.getForm().findField('runStatus');
			  var signTypeField=formPanel.getForm().findField('signType');
			  var serviceApiField=formPanel.getForm().findField('serviceApi');
			  var hbmFeaturesField=formPanel.getForm().findField('hbmFeatures');
			  var hbmFeatures02Field=formPanel.getForm().findField('hbmFeatures02');
			  var hbmFeatures03Field=formPanel.getForm().findField('hbmFeatures03');
			  var licStatusField=formPanel.getForm().findField('licStatus');
			  if(r){
				  formPanel.loadRecord(r);
			  }
			  
			  
			  var localSysMode=Ext.get('sysMode').value;
			  var localLicStatus=Ext.get('licStatus').value;
			  var localSysUuid=Ext.get('sysUuid').value;
			  var recharge=formPanel.down('button[ulan=btRecharge]');
			  var license=formPanel.down('button[ulan=btLicense]');
			  
			  if(localSysMode==1 ||localSysMode==0){
				  recharge.setVisible(false);
				  license.setVisible(true);
				  
//				  recharge.remoteFlag=true;
//				  license.remoteFlag=true;
			  }else if(localSysMode==10){
//				  recharge.setVisible(false);
//				  license.setVisible(false);
				  recharge.remoteFlag=true;
				  license.remoteFlag=true;
			  }else if(localSysMode==11 && localLicStatus==10){
				  recharge.setVisible(true);
				  license.setVisible(true);
			  }else{
				  recharge.setVisible(false);
				  license.setVisible(false);
			  }
			  
			  var role=Ext.get("roleId").value;
			  var isSuper = roleType.isSuper(role);
			  if(isSuper){
				  if(recharge.isVisible()){
					  recharge.setVisible(true);
				  }
				  license.setVisible(true);
			  }else{
				  recharge.setVisible(false);
				  license.setVisible(false);
			  }
			  
			  admin.setValue(rs.adminStatus(adminStatus));
			  opr.setValue(rs.oprStatus(oprStatus));
			  run.setValue(rs.runStatus(runStatus));
			  signTypeField.setValue(rs.signType(signType));
			  serviceApiField.setValue(rs.yesOrNo(serviceApi));
			  hbmFeaturesField.setValue(rs.yesOrNo(hbmFeatures));
			  hbmFeatures02Field.setValue(rs.yesOrNo(hbmFeatures02));
			  hbmFeatures03Field.setValue(rs.yesOrNo(hbmFeatures03));
			  licStatusField.setValue(rs.licenseStatus(licStatus));
		});
		
		var id = 'licDomainPaidListTab';
		
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