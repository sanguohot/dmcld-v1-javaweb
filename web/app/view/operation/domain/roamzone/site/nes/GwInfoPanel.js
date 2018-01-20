Ext.define('app.view.operation.domain.roamzone.site.nes.GwInfoPanel',{
	extend:'Ext.panel.Panel',
//	id:'gwPanel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
	hidden:true,
	border:false,
	store:null,
//	comboxStore:Ext.create("app.store.util.ComboxStore",{}),
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var gwAlias;
		var store = Ext.create('app.store.operation.domain.roamzone.site.nes.GwInfoStore',{});
		this.store = store;
		if(maintenance){
			gwAlias = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'alias',
				fieldLabel: 'Alias',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}else{
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			gwAlias = generalObj.createName('gw_alias'
					,75,25,'alias','Alias','#DFE9F6','neManager!checkAlias.action',store);
			store.on('load',function(){
				var picture = gwAlias.getComponent('picture');
				picture.update("");
				picture.flag = 2;
			});
		} 

		var gwTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiDwgInfo'),
//			id:'gwTab',
			itemId:'form',
			store:store,
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
//			width: 500,
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'gw_basic_info',
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
			            xtype: 'displayfield',
			            name: 'productSnStr',
			            ulan:'productSn',
			            itemId:'gwProductSn',
			            labelWidth: 180,
			            fieldLabel: 'Device SN',
			        },{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:4,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 4,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/dwg.png',
			    	
			        }, gwAlias,{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2,4],adminSizeObj),{xtype: 'displayfield',width:30,value:'' },{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            ulan:'oprStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Opr',
				        },{xtype: 'displayfield',width:30,value:'' },{
				            xtype: 'displayfield',
				            name: 'runStatus',
				            ulan:'runStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Run',
				        }]
			        },{
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            fieldLabel: 'Description',
			            labelWidth: 180,
			            height:50,
			            rows:1,
			        }
			        ]
			    }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'gw_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		    		xtype: 'displayfield',
		    		name : 'productId',
		    		ulan:'deviceType',
		    		itemId:'gwProductType',
		    		fieldLabel: 'Device Type',
		    		
		        },{
		            xtype: 'displayfield',
		            name: 'productName',
		            fieldLabel: 'Device Model',
		        },{
		            xtype: 'displayfield',
		            name: 'vendorId',
		            fieldLabel: 'Device Vendor'
		        }, {
		            xtype: 'combo',
		            name: 'siteUuid',
		            mode : 'local',
		            editable:false,
		            fieldLabel: 'Location Site',
		            displayField : 'name',
					valueField : 'uuid',
					queryMode : 'local',
					store:Ext.create("app.store.util.ComboxStore",{}),
					allowBlank: false,
		        }, {
		            xtype: 'combo',
		            name: 'policyUuid',
		            mode : 'local',
		            editable:false,
		            fieldLabel: 'SIM Policy',
		            displayField : 'name',
					valueField : 'uuid',
					queryMode : 'local',
					store:Ext.create("app.store.util.ComboxStore",{}),
					allowBlank: false,
					valueNotFoundText :""
		        },{
					xtype: 'checkbox',
					name: 'virtualSimFlag',
					boxLabel: 'Create virtual Local SIM card by device port',
					boxLabelCls:'box_label',
					inputValue:1,
		        },{
		            xtype: 'combo',
		            name: 'defaultGrpUuid',
		            fieldLabel: 'Local SIM Group',
		            editable:false,
		            displayField : 'name',
		            ulan:'localSimGroup',
					valueField : 'uuid',
					mode : 'local',
					queryMode : 'local',
					store:Ext.create("app.store.util.ComboxStore",{}),
					valueNotFoundText :"",
		        },createPasswordContainer(),{
		            xtype: 'displayfield',
		            name: 'encryptType',
		            fieldLabel: 'Encrypt Type',
		        },{
		            xtype: 'displayfield',
		            name: 'outerIpAddr',
		            fieldLabel: 'Outer IP Address',
		        },{
		        	xtype: 'displayfield',
		        	name: 'innerIpAddr',
		        	fieldLabel: 'Inner IP Address',
		        },{
		            xtype: 'displayfield',
		            name: 'regFailCount',
		            fieldLabel: 'Register Fail Count',
		        },{
		            xtype: 'displayfield',
		            name: 'lastRegTime',
		            fieldLabel: 'Last Register Time',
		        },{
		            xtype: 'displayfield',
		            name: 'packageVersion',
		            ulan:'versionAbbr',
		            fieldLabel: 'Software Version',
		        },{
		            xtype: 'displayfield',
		            name: 'packageBuildTime',
		            fieldLabel: 'Software Build Time',
		        }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				ulan:'fsProvisionSetting',
				title:'Provision Setting',
				itemId:'gw_provison_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[rs.createUpgradeType(2,null,null),{
		            xtype: 'displayfield',
		            name: 'targetSoftwareVer',
		            fieldLabel: 'Target Version',
		        },{
		            xtype: 'displayfield',
		            name: 'upgradeStatus',
		            fieldLabel: 'Upgrade Status',
		        },{
		            xtype: 'displayfield',
		            name: 'lastUpgradeResult',
		            fieldLabel: 'Last Upgrade Result',
		        },{
		            xtype: 'displayfield',
		            name: 'lastUpgradeTime',
		            fieldLabel: 'Last Upgrade Time',
		        }]
			}],
	    	maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			var commit = Ext.create('Ext.button.Button',{
			            text: 'Commit',
			            iconCls:'save',
			            ulan:'btCommit',
			            flag:"domain_edit",
			            disabled: true,
			            formBind: false,
			            handler: function() {
			        		var tmp = this.up('form').down('fieldcontainer[itemId=gw_alias]');
			        		if(tmp.getComponent('picture').flag==0)
			            	return;
			                var form = this.up('form').getForm();
//			                var pwd=form.findField('password').getValue();
//			                var pwd2=form.findField('password2');
//			                if(pwd!=pwd2.getValue()){
//			                	var pic=pwd2.up('fieldcontainer').getComponent('picture');
//			                	pic.update("<div style='background:#DFE9F6'>&nbsp;<font color=#f00>Please input the same password</font></div>");
//			                	return;
//			                }
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'neManager!updateGw.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		ip.commitSuccess(gwTab,gwTab.store);
				                    	}else{
				                    		ip.commitFailure(gwTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(gwTab,gwTab.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    		}else{
	    			var upgrade = Ext.create('Ext.button.Button',{
			       		 xtype:'button',
			       		 text: 'Upgrade',
			       		ulan:'btUpgrade',
			       		 iconCls: 'provision-small',
			       		 flag:"device_action",
			       		 listeners:{
			       			 click:function(){
								var ids=gwTab.getForm().findField('uuid').getValue();
								var maxVersion=gwTab.getForm().findField('packageVersion').getValue();
								var store = Ext.getCmp('maintenanceGwPanel').store;
								var upgradeType=store.getAt(0).get('upgradeType');
								if(upgradeType=="0"){
									Ext.MessageBox.alert(boxWarnning,boxUpgradeNeedEnable);
									return;
								}
								var upgradeStatus = store.getAt(0).get('upgradeStatus');
								if(upgradeStatus==2){
									Ext.MessageBox.alert(boxWarnning
											,boxUpgradeStatus+rs.upgradeFlag(upgradeStatus)+boxCanNotUpgrade);
									return;
								}
								var productId=store.getAt(0).get('productId');
								var alias=store.getAt(0).get('alias');
								var upgradeNe = Ext.getCmp('maintenanceUpgradeNe');
								if(upgradeNe==undefined && upgradeNe==null){
									upgradeNe=Ext.create('app.view.operation.domain.roamzone.site.UpgradeNe',{});
									lanControll.setLan(upgradeNe);
								}
								var domainUuid = gwTab.getForm().findField("domainUuid").getValue();
			        			var domainInfoStore=Ext.create('app.store.operation.domain.DomainInfoStore',{});
			        			domainInfoStore.on('beforeload', function (domainInfoStore, options) {
			        		        var params = { uuid:domainUuid};
			        		        Ext.apply(domainInfoStore.proxy.extraParams, params);
			        		    });
			        			var vendorId=store.getAt(0).get('vendorId');;
			        			domainInfoStore.on('load',function(){
//			        				vendorId=domainInfoStore.getAt(0).get('vendorId');
									upgradeNe.down('form').getForm().findField('ids').setValue(ids);
									upgradeNe.down('form').getForm().findField('productId').setValue(productId);
									upgradeNe.down('form').getForm().findField('maxVersion').setValue(maxVersion);
									upgradeNe.down('form').getForm().findField('upgradeType1').setValue(rs.upgradeType(upgradeType));
									upgradeNe.down('form').getForm().findField('upgradeTypes').setValue(""+upgradeType);
									upgradeNe.down('form').getForm().findField('alias').setValue(alias);
									var r=domainInfoStore.getAt(0);
									
									var provUrl=Ext.get('provUrl').value;
				        			upgradeNe.down('form').getForm().findField('provUrl').setValue(provUrl);
									
									var vendorStore=upgradeNe.down('form').getForm().findField('vendorId').getStore();
									if(vendorStore.storeId!='vendorListStore'){
										vendorStore=Ext.create('app.store.provision.VendorListStore',{});
									}
									vendorStore.on('beforeload', function (vendorStore, options) {
				        				var params = { defaultVendorId:vendorId};
				        		        Ext.apply(vendorStore.proxy.extraParams, params);
				        		    });
									roleId = Ext.get('roleId').value;
									vendorStore.on('load',function(vendorStore, options){
										if(!roleType.isSuper(roleId) && vendorId>0){
											vendorStore.filter('vendorId',vendorId);
											if(vendorStore.getCount() == 0){
												Ext.MessageBox.alert(boxError,boxIllegalData);
											}
										}
			       		 				upgradeNe.down('form').getForm().findField('vendorId').store=vendorStore;
										upgradeNe.down('form').getForm().findField('vendorId').setValue(vendorId);
										upgradeNe.show();
				        			});
									
									vendorStore.load();
			        			})
								domainInfoStore.load();
		            		}
		            	}
		            });
	    			tbar.push(upgrade);
	    			tbar.push('-');
	    			
	    			var reboot = Ext.create('Ext.button.Button',{	
			        	text: 'Reboot',
			        	iconCls:'reboot',
			        	ulan:'btReboot',
			        	flag:"device_action",
			        	handler:function(){
	    					var store = this.up('form').up('panel').up('panel').store;
		            		Ext.MessageBox.confirm(boxWarnning,boxReboot,function(e) {																			
		   						if( e == 'yes' ){		   		            		
		   			        		var ids = store.getAt(0).get('uuid');
									var productId = store.getAt(0).get('productId');
									var alias = store.getAt(0).get('alias');
		   		        			var handler = Ext.getCmp('handler');
		   		        			if(handler==undefined){
		   		        				handler = Ext.create('app.util.Handler',{});
		   		        			}
		   		        			handler.RebootHandler(ids,productId,alias);
		   						}
		            		});
		            	}
			        });
	    			tbar.push(reboot);
	    			tbar.push('-');
	    			
	    			var restore = Ext.create('Ext.button.Button',{
			        	text: 'Restore Password',
			        	iconCls:'restore_pwd',
			        	ulan:'btRestorePwd',
			        	flag:"device_action",
			        	handler:function(){
	    					var store = this.up('form').up('panel').up('panel').store;
		            		Ext.MessageBox.confirm(boxWarnning,boxRestorePwd,function(e) {																			
		   						if( e == 'yes' ){
		   			        		var ids = store.getAt(0).get('uuid');
		   		        			var handler = Ext.getCmp('handler');
									var productId = store.getAt(0).get('productId');
									var alias = store.getAt(0).get('alias');
		   		        			if(handler==undefined){
		   		        				handler = Ext.create('app.util.Handler',{});
		   		        			}
		   		        			handler.RestorePwdHandler(ids,productId,alias);
		   						}
		            		});
			        	}
			        });
	    			tbar.push(restore);
	    			tbar.push('-');	    			
	    		}
	    		
	    		var remote = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Remote Web',
		       		ulan:'btRemoteWeb',
		       		 iconCls: 'domain-group',
		       		flag:"domain_action",
//		       		 menu:{
//			       		 xtype:'menu',			       		 
//			       		 items:[{
//			       			text:'New Tab',
//			       			ulan:'miNewTab',
//			       			handler:function(){
//		       		 			var sn=gwTab.getForm().findField('productSnStr').getValue();
//		       		 			var uuid=gwTab.getForm().findField('uuid').getValue();
//		       		 			var domainUuid = gwTab.getForm().findField('domainUuid').getValue();
//		       		 			var panel = this.up('form');
//		       		 			var id = panel.id+'_remote';
//		       		 			var domainStore = Ext.getStore('maintenanceDomainInfoStore');
//		       		 			if(domainStore!=undefined && domainStore!=null && typeof(domainStore)==='object'){
//		       		 				Ext.destroy(domainStore);
//		       		 			}
//		       		 			domainStore = Ext.create('app.store.operation.domain.DomainInfoStore',{});		
//		       		 			domainStore.on('beforeload', function () {
//		            		        var params = { uuid:domainUuid};
//		            		        Ext.apply(domainStore.proxy.extraParams, params);
//		            		    });
//		       		 			domainStore.on('load', function(){
//		       		 				var r=domainStore.getAt(0);
//			       		 			var idleTime=r.get('idleTime');			       		 			
//			       		 			Ext.Ajax.request({
//				                		url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&idleTime="+idleTime+"&domainUuid="+domainUuid,
//				                		method:'POST',
//				                		callback: function (options, success, response) {
//					             var obj=Ext.JSON.decode(response.responseText);			
//					               if(obj['success']){
//					            	    var url=obj['url'];				            	   
//					            	  	var remoteTab=panel.up('panel');
//					            	  	var tab = Ext.getCmp(id);
//					            	  	if(tab!=undefined){
//					            	  		tab.destroy();
//					            	  	}
//	            	  	  tab=remoteTab.add({
//	            	  	      	title:sn,
//	                    	            	  	id:id,
//	                    					    closable: true,
//	                    					    autoScroll: true,
//	                    					    layout:'fit',
//	                    					    items :[{
//	                    					        itemId:'remote_web',
//	                    					        layout:'fit',
//	                    							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
//	                    						}]
//	                    					});
//					            	  	tab.show();	
//					               }else{
//					            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
//					               }
//					               }
//					                        })
//		       		 			});
//		       		 			domainStore.load();								
//			       		 	}
//			       		 },{
//			       			text:'New Window',
//			       			ulan:'miNewWindow',
			       			handler:function(){
		       		 			var sn=gwTab.getForm().findField('productSnStr').getValue();
		       		 			var uuid=gwTab.getForm().findField('uuid').getValue();
		       		 			var domainUuid = gwTab.getForm().findField('domainUuid').getValue();
		       		 			var domainStore = Ext.getStore('maintenanceDomainInfoStore');
		       		 			if(domainStore!=undefined && domainStore!=null && typeof(domainStore)==='object'){
		       		 				Ext.destroy(domainStore);
		       		 			}
		       		 			domainStore = Ext.create('app.store.operation.domain.DomainInfoStore',{});		
		       		 			domainStore.on('beforeload', function () {
		            		        var params = { uuid:domainUuid};
		            		        Ext.apply(domainStore.proxy.extraParams, params);
		            		    });
		       		 			domainStore.on('load', function(){
		       		 				var r=domainStore.getAt(0);
			       		 			var idleTime=r.get('idleTime');			       		 			
			       		 			Ext.Ajax.request({
				                		url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&idleTime="+idleTime+"&domainUuid="+domainUuid,
				                		method:'POST',
				                		callback: function (options, success, response) {
					             var obj=Ext.JSON.decode(response.responseText);			
					               if(obj['success']){
	    	       	var url=obj['url'];
//	    	    	window.open(url);
	    	       	openChildWin(url);
					               }else{
					            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
					               }
					               }
					                        })
		       		 			});
		       		 			domainStore.load();								
			       		 	}
//			       		 }], 
//		       	 	 }
		       	 });
	    		tbar.push(remote);
	    		tbar.push('-');
	    		
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
	    			},
	    			single:true
	    		}
	    	},
		});
		gwTab.addListener("afterlayout",function(){
			privilege.procPrivilege(gwTab);
		},this,{single:true});
		var tab = gwTab;
		gwLoadMask=new Ext.LoadMask(tab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
	    store.on('load', function(){
			var r=store.getAt(0);
			Ext.suspendLayouts();
			tab.loadRecord(r);
			if(r.get('siteUuid')==0){
				tab.getForm().findField('siteUuid').setValue('');
			}
			if(r.get('policyUuid')==0){
				tab.getForm().findField('policyUuid').setValue('');
			}
			var type=r.get('productId');
			var sn=r.get('productSnStr');
			var pt=tab.down('displayfield[itemId=gwProductType]');
			var ps=tab.down('displayfield[itemId=gwProductSn]');
			ps.setValue(sn);
			pt.setValue('DWG');
			
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			
			var uresult=parseInt(r.get('lastUpgradeResult'));
			var uflag=parseInt(r.get('upgradeStatus'));
			
			var opr=tab.getForm().findField('oprStatus');
			var run=tab.getForm().findField('runStatus');
			var lastUpgradeResult=tab.getForm().findField('lastUpgradeResult');
			var upgradeFlag=tab.getForm().findField('upgradeStatus');
			var vendorId=parseInt(r.get('vendorId'));
			var vendor=tab.getForm().findField('vendorId');

			vendor.setValue(rs.vendor(vendorId));
			opr.setValue(rs.oprStatus(oprStatus));
			  
			run.setValue(rs.runStatus(runStatus));
			lastUpgradeResult.setValue(rs.lastUpgradeResult(uresult));
			upgradeFlag.setValue(rs.upgradeFlag(uflag));
			Ext.resumeLayouts(true);
		});
	    var comboxStore = Ext.create("app.store.util.ComboxStore",{});
	    tab.comboxStore = comboxStore;
	    comboxStore.on('beforeload',function(){
	    	comboxStore.loadFlag = false;
		})
		var store0 = tab.getForm().findField('siteUuid').store;
		var store1 = tab.getForm().findField('policyUuid').store;
		var store2 = tab.getForm().findField('defaultGrpUuid').store;
		comboxStore.on('load',function(){
			store0.removeAll();
			store1.removeAll();
			store2.removeAll();
			store2.add({id:0,name:'NULL'});
			for(var i=0; i<comboxStore.getCount(); i++){
				if(comboxStore.getAt(i).get('type')=='site'){
					store0.add(comboxStore.getAt(i));
				}else if(comboxStore.getAt(i).get('type')=='policy'){
					store1.add(comboxStore.getAt(i));
				}else if(comboxStore.getAt(i).get('type')=='group'){
					store2.add(comboxStore.getAt(i));
				}
			}
			
			store.load();
		})
		
		ip.initOtiose(1,gwTab);
		var id = 'gwpInNe';
		if(maintenance){
			id = 'maintenanceGwpInNe';
		}
		gwpInNe=Ext.create('app.view.operation.domain.roamzone.site.nes.GwpInNe',{
			title:tiPortList,
			maintenance:maintenance,
			id:id
		});
		gwpInNe.addListener("afterlayout",function(){
			privilege.procPrivilege(gwpInNe);
		},this,{single:true});
		gwpInNe.store.on('beforeload',function(){
			gwpInNe.store.loadFlag = false;
		})
		var id = 'gwpPort';
		if(maintenance){
			id = 'maintenanceGwpPort';
		}
		gwPortTab=Ext.create('app.view.operation.domain.roamzone.site.nes.GwpTab',{
			title:tiPortMap,
			id:id,
			maintenance:maintenance,
			store:gwpInNe.store
		});
		gwPortTab.addListener("afterlayout",function(){
			privilege.procPrivilege(gwPortTab);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[gwTab,gwPortTab,gwpInNe],
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