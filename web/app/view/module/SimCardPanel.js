
Ext.define('app.view.module.SimCardPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
//	autoScroll:true,
	border:false,
	closable:true,
	tipId:'',
	store:{},
	title:lanControll.getLanValue('tiSim'),
	params:{},
	comboxStore:{},
	domainUuid:0,
	prefix:'',
	record:{},
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var domainUuid = this.domainUuid;
		var prefix = this.prefix;
		
		var panel = this;
		var comboxStore = Ext.create("app.store.util.ComboxStore",{});
		this.comboxStore = comboxStore;
		var groupStore = Ext.create("app.store.util.ComboxStore",{});
		var siteStore = Ext.create("app.store.util.ComboxStore",{});
		var simCardStore=Ext.create('app.store.operation.domain.roamzone.SimCardStore',{});
		this.store = simCardStore;
		var params = this.params;
		var panelId = this.id;
		var SIMBankPort = {
		           name: 'simbankUuid',
				   xtype: 'fieldcontainer',
				   itemId:'SimbankPort',
				   layout:'hbox',
				   fieldLabel: lanControll.getLanValue('bindBkp'),
				   items: [
							{xtype:'hiddenfield',  name: 'bkpUuid'},
							{xtype: 'button',ulan:'btToSimbankPort',text:'>>To SIMBank Port',itemId:'toSimbankPort',
								
								listeners:{
									click:function(but,even,eOpts){
					        			var bkpUuid=simCardTab.getForm().findField('bkpUuid').getValue();
					        			if(bkpUuid<1){
					        				Ext.MessageBox.alert(boxWarnning,boxSimNotBindBkp)
					        			}else{
											var tabpanel = panel.up('panel');
											var id=prefix+"bkpUuid_"+bkpUuid;
											if(prefix.indexOf('gwpInfoPanel_')>=0
													|| prefix.indexOf('bkpInfoPanel_')>=0){
												id = prefix+'bkpInfoPanel';
											}
											var tab = Ext.getCmp(id);
											var params = {params:{uuid:bkpUuid}};
											if(tab==undefined){
												tab = Ext.create('app.view.module.BkpInfoPanel',{
													id:id,
													params:params,
													prefix:prefix,
												});
												lanControll.setLan(tab);
												tabpanel.add(tab);							
											}
											tab.store.load(params);
											tab.show();
					        			}
					        		}
								
								}
							}
						]					
		        };
		var simCardTab=Ext.create('Ext.form.Panel',{
			title:'',
			treeName:'',
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
			store:simCardStore,
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'link_simcard_basic_info',
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
			        	xtype:'displayfield',
			        	name:'imsi',
			        	labelWidth: 180,
			        	fieldLabel:'IMSI'
			        },{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:5,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 5,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/sim_card.png',
			    	
			        },{
			            xtype: 'displayfield',
			            name: 'alias',
			            ulan:'simAlias',
			            labelWidth: 180,
			            fieldLabel: 'SIM Card Alias',
			        },{
				    	layout:'hbox',
				    	xtype:'fieldcontainer',
				    	border:false,
				    	anchor: '100%',
				    	items:[rs.createAdminStatus(null,[1,2,5,6],adminSizeObj),{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            ulan:'oprStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Opr',
				        },{
				            xtype: 'displayfield',
				            name: 'runStatus',
				            ulan:'runStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Run',
				        }]
				    },{
			            xtype: 'combo',
			            name: 'grpUuid',
			            ulan:'group',
			            mode : 'local',
			            labelWidth: 180,
			            width:420,
			            editable:false,
			            fieldLabel: 'Group',
			            displayField : 'name',
						valueField : 'uuid',
						queryMode : 'local',
						store:groupStore,
						valueNotFoundText:'',
			        },{
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            labelWidth: 180,
			            height:50,
			            rows:1,
			            fieldLabel: 'Description',
			        }
			       ]
			    }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'link_simcard_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'blockedFlag',
		            fieldLabel: 'Blocked Flag',
//		            listeners: {
//		                change: function(cmp){
//				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
//				        		cmp.setValue(rs.yesOrNo(cmp.getValue()));
//				        	}
//		                }
//		            }
		        },{
		            xtype: 'hiddenfield',
		            name: 'lastSiteUuid',
		            fieldLabel: 'Last Site',
		        },{
		            xtype: 'hiddenfield',
		            name: 'lastSiteUuid',
		            fieldLabel: 'Next Site',
		        },{
		        	xtype: 'displayfield',
		        	name: 'lastSiteName',
		        	fieldLabel: 'Last Site',
		        },{
		            xtype: 'displayfield',
		            name: 'nextSiteName',
		            fieldLabel: 'Next Site',
		        },SIMBankPort,{
		            xtype: 'textfield',
		            name: 'bindImei',
		            fieldLabel: 'Bind IMEI',
		        },{
		            xtype: 'displayfield',
		            name: 'operator',
		            fieldLabel: 'Operator',
		        },{
		            xtype: 'displayfield',
		            name: 'smsc',
		            fieldLabel: 'SMSC',
		        },{
		        	xtype: 'displayfield',
		        	name: 'simNumber',
		        	fieldLabel: 'SIM Number',
		        },{
		            xtype: 'textfield',
		            name: 'mobile',
		            fieldLabel: 'Mobile',
		            validateOnChange:false,
			    	validator:function(val){return checkString(val,/^[\sA-Za-z0-9+-]{0,31}$/)}
		        },{
		            xtype: 'displayfield',
		            name: 'deactiveReason',
		            fieldLabel: 'Deactive Reason',
		        },{
		            xtype: 'displayfield',
		            name: 'lastDeactiveReason',
		            fieldLabel: 'Last Deactive Reason',
//		            listeners: {
//		                change: function(cmp){
//				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
//				        		cmp.setValue(rs.switchReason(cmp.getValue()));
//				        	}
//		                }
//		            }
		        },{
		        	xtype: 'displayfield',
		        	name: 'lastGroupTime',
		        	fieldLabel: 'Group Start Time',
		        },{
		        	xtype: 'displayfield',
		        	name: 'lastLoadTime',
		        	fieldLabel: 'Last Load Time',
		        },{
		            xtype: 'displayfield',
		            name: 'lastBindTime',
		            fieldLabel: 'Last Bind Time',
		        },{
		            xtype: 'displayfield',
		            name: 'lastUsedTime',
		            fieldLabel: 'Last Used Time',
		        },{
		        	xtype: 'hiddenfield',
		        	name: 'localSimFlag',
		        	fieldLabel: 'Local SIM Flag',
		        },{
		        	xtype: 'hiddenfield',
		        	name: 'localGwpUuid',
		        	fieldLabel: 'Local Gwp Uuid',
		        },{
		            xtype: 'hiddenfield',
		            name: 'iccId',
		            fieldLabel: 'ICC',
		        },{
		            xtype: 'hiddenfield',
		            name: 'origZoneUuid',
		            fieldLabel: 'Original Zone',
		        }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Balance Info',
				ulan:'fsBalanceInfo',
				itemId:'link_simcard_balance_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		            xtype: 'displayfield',
		            name: 'lastBalance',
		            fieldLabel: 'Last Balance',
		        },{
		            xtype: 'displayfield',
		            name: 'curBalance',
		            fieldLabel: 'SIM Balance',
		        },{
		        	xtype: 'displayfield',
		        	name: 'leftCallTime',
		        	fieldLabel: 'Left Call-Time(min)',
		        },{
		            xtype: 'displayfield',
		            name: 'lowBalanceFlag',
		            fieldLabel: 'Low Balance Flag',
//		            listeners: {
//		                change: function(cmp){
//				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
//				        		cmp.setValue(rs.yesOrNo(cmp.getValue()));
//				        	}
//		                }
//		            }
		        },{
		            xtype: 'displayfield',
		            name: 'noBalanceFlag',
		            fieldLabel: 'No Balance Flag',
//		            listeners: {
//		                change: function(cmp){
//				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
//				        		cmp.setValue(rs.yesOrNo(cmp.getValue()));
//				        	}
//		                }
//		            }
		        },{
		        	xtype: 'displayfield',
		        	name: 'simRechargedFlag',
		        	fieldLabel: 'Recharged Flag',
		        },{
		        	xtype: 'displayfield',
		        	name: 'pin2Code',
		        	fieldLabel: 'Password',
		        },{
		        	xtype: 'displayfield',
		        	name: 'paidListUuid',
		        	fieldLabel: 'Paid List Uuid',
		        },{
		        	xtype: 'displayfield',
		        	name: 'lastBalanceTime',
		        	fieldLabel: 'Last Balance Time',
		        }]
			},{
				xtype: 'fieldset',
				layout:'anchor',
				title:'Promotion Info',
				ulan:'fsPromotionInfo',
				itemId:'link_simcard_promotion_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'promotionGrpUuid',
		        	fieldLabel: 'Promotion Group',
//		        	listeners: {
//		                change: function(cmp){
//							if(cmp.getValue()>=0){
//				        		var grpUuidStore=cmp.up('form').down('combo[name=grpUuid]').store;
//				        		for(var i=0; i<grpUuidStore.getCount(); i++){
//		    						if(grpUuidStore.getAt(i).get('uuid')==cmp.getValue()){
//		    							cmp.setValue(grpUuidStore.getAt(i).get('name'));
//		    						}
//		    					}
//				        		
//				        	}
//		                }
//		            }
		        },{
		            xtype: 'displayfield',
		            name: 'promotionStatus',
		            fieldLabel: 'Promotion Status',
//		            listeners: {
//		                change: function(cmp){
//				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
//				        		cmp.setValue(rs.promotionStatus(cmp.getValue()));
//				        	}
//		                }
//		            }
		        },{
		        	xtype: 'displayfield',
		        	name: 'promCallTime',
		        	fieldLabel: 'Promotion Call Time(min)',
		        },{
		        	xtype: 'displayfield',
		        	name: 'promotionCount',
		        	fieldLabel: 'Promotion Apply Count',
		        },{
		            xtype: 'displayfield',
		            name: 'promotionReport',
		            fieldLabel: 'Promotion Report',
		           
		        },{
		        	xtype: 'displayfield',
		        	name: 'promotionTime',
		        	fieldLabel: 'Promotion Report Time',
		        },{
		            xtype: 'displayfield',
		            name: 'lastPromTime',
		            fieldLabel: 'Last Promotion Time',
		        }]
			},{
				xtype: 'fieldset',
				layout:'anchor',
				title:' HBM Monitor Info',
				ulan:'fsHbmMonitorInfo',
				itemId:'link_simcard_hbmmonitor_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
					xtype: 'displayfield',
					name: 'hbmRegFailCount',
					fieldLabel: 'HBM Register Fail',
				},{
		        	xtype: 'displayfield',
		        	name: 'hbmAcdShortCount',
		        	fieldLabel: 'ACD Short CDR',
		        },{
		        	xtype: 'displayfield',
		        	name: 'hbmAcdFailCount',
		        	fieldLabel: 'ACD Fail CDR',
		        },{
		        	xtype: 'displayfield',
		        	name: 'hbmAcdSmsCount',
		        	ulan:'simSmsFailCount',
		        	fieldLabel: 'ACD Fail SMS',
		        },{
		        	xtype: 'displayfield',
		        	name: 'hbmSmsFailCount',
		        	fieldLabel: 'HBM SMS Fail',
		        },{
		        	xtype: 'displayfield',
		        	name: 'hbmCallFailCount',
		        	fieldLabel: 'HBM Call Fail',
		        },{
		        	xtype: 'displayfield',
		        	name: 'hbmDtmfFailCount',
		        	fieldLabel: 'HBM DTMF Fail',
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
//			            disabled: true,
//			            formBind: false,
			            handler: function() {
			                var form = this.up('form').getForm();
			                var form2=panel.down('form');
			                var params = form.getValues();
			                var store = this.up('form').store;
			                var simStr = store.getAt(0).get("imsi");
			                params['simStr'] = simStr;
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'simCardManager!updateSimCardByUuid.action',
			                		method:'POST',
			                		params:params,
			                		callback: function (options, success, response) {
				                    var obj=Ext.JSON.decode(response.responseText);			
			                    		if(obj['success']){
			                    			ip.initOtiose(1,simCardTab);
			                    			simCardTab.down('button[ulan=btCommit]').formBind=false;
			                    			simCardTab.down('button[ulan=btCancel]').setIconCls('edit');
			                    			simCardTab.down('button[ulan=btCancel]').setText('Edit');
			                    			simCardTab.down('button[ulan=btCommit]').setDisabled(true);
			                    			simCardStore.load(form2.up('panel').params);
				                    	}else{
				                    		ip.commitFailure(simCardTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(simCardTab,simCardTab.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    		}
	    			    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		 ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
	    					simCardStore.load(params);
    						panel.show();
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
	    	}
		});
		simCardTab.addListener("afterlayout",function(){
			privilege.procPrivilege(simCardTab);
		},this,{single:true});
		var load_fn=function(){
			
			r=simCardStore.getAt(0);
			
			panel.setTitle(r.get('alias'));
			Ext.suspendLayouts();
			panel.down('form').loadRecord(r);
			var lastSiteUuid = r.get('lastSiteUuid');
			var nextSiteUuid = r.get('nextSiteUuid');
			var lastSiteName = "";
			var nextSiteName = "";
			for(var i=0; i<siteStore.getCount(); i++){
				if(siteStore.getAt(i).get('uuid') == lastSiteUuid){
					lastSiteName = siteStore.getAt(i).get('name');
				}
				if(siteStore.getAt(i).get('uuid') == nextSiteUuid){
					nextSiteName = siteStore.getAt(i).get('name');
				}
			}
//			alert(lastSiteName+"-"+siteStore.getCount());
			panel.down('form').getForm().findField('lastSiteName').setValue(lastSiteName);
			panel.down('form').getForm().findField('nextSiteName').setValue(nextSiteName);
			panel.setTitle(r.get('imsi'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=panel.down('form').getForm().findField('oprStatus');
			var run=panel.down('form').getForm().findField('runStatus');
			var reasonStatus=parseInt(r.get('deactiveReason'));
			var reason=panel.down('form').getForm().findField('deactiveReason');

//			
			panel.down('form').getForm().findField('blockedFlag').setValue(rs.yesOrNo(r.get('blockedFlag')));
			panel.down('form').getForm().findField('lastDeactiveReason').setValue(rs.switchReason(r.get('lastDeactiveReason')));
			panel.down('form').getForm().findField('lowBalanceFlag').setValue(rs.yesOrNo(r.get('lowBalanceFlag')));
			panel.down('form').getForm().findField('noBalanceFlag').setValue(rs.yesOrNo(r.get('noBalanceFlag')));
			
			var promotionGrpField=panel.down('form').getForm().findField('promotionGrpUuid');
			var grpUuidStore=panel.down('form').down('combo[name=grpUuid]').store;
    		for(var i=0; i<grpUuidStore.getCount(); i++){
				if(grpUuidStore.getAt(i).get('uuid')==promotionGrpField.getValue()){
					promotionGrpField.setValue(grpUuidStore.getAt(i).get('name'));
				}
			}
			panel.down('form').getForm().findField('promotionStatus').setValue(rs.promotionStatus(r.get('promotionStatus')));
			
			
			opr.setValue(rs.oprStatus(oprStatus));				  
			run.setValue(rs.runStatus(runStatus));
			reason.setValue(rs.switchReason(reasonStatus));
			var bkpUuid = simCardTab.down('hiddenfield[name=bkpUuid]').getValue();
			var bkp = simCardTab.down('fieldcontainer[itemId=SimbankPort]').getComponent('toSimbankPort');
			if(bkpUuid>0){
				bkp.setDisabled(false);
			}else{
				bkp.setDisabled(true);
			}
			
			Ext.resumeLayouts(true);
		};
		
		simCardStore.on('load',load_fn);
		comboxStore.on('beforeload',function(){
			comboxStore.loadFlag = false;
		});		
		comboxStore.on('load',function(){		
			siteStore.removeAll();
			groupStore.removeAll();
			siteStore.add({id:0,name:'NULL'});
			for(var i=0; i<comboxStore.getCount(); i++){
				if(comboxStore.getAt(i).get('type')=='site'){
					siteStore.add(comboxStore.getAt(i));
				}else if(comboxStore.getAt(i).get('type')=='group'){
					groupStore.add(comboxStore.getAt(i));
				}
			}
//			var record=panel.record;
//			if(record){
//				load_fn();
//			}else{
			simCardStore.load(params);
//			}
		});
		var params1 = {domainUuid:domainUuid,types:'group,site'};
		Ext.apply(comboxStore.proxy.extraParams, params1);
		comboxStore.load();
		
		
		ip.initOtiose(1,simCardTab);
		var loadMask=new Ext.LoadMask(simCardTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:simCardStore
		});
		this.items=[
	       simCardTab
	       ];
		this.callParent(arguments);	
	}
//	listeners:{
//		beforeshow:function(){
//	        var form = this.down('form');
//	        var picture = form.getComponent('alias').getComponent('picture');
//	        picture.update("");
//	        picture.flag = 2;
//		}
//	}
});