
Ext.define('app.view.module.GwpInfoPanel',{
	extend:'Ext.panel.Panel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
	border:false,
	closable:true,
	tipId:'',
	store:{},
	gbsStore:{},
	title:lanControll.getLanValue('tiGwp'),
	params:'',
	prefix:'',
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var store= Ext.create('app.store.operation.domain.roamzone.site.nes.GwpStore',{});
		this.store=store;
		var panel = this;
		var params = panel.params;
//		var store = panel.store;
		store.on('beforeload',function(){
			store.loadFlag = false;
		});
		this.gbsStore = Ext.create('app.store.operation.domain.roamzone.site.nes.GwpBkpSimStore',{});
		var dwgPortAlias;
		var prefix = panel.prefix;
		var panelId = this.id;
		var BindSIMBankPort = {
		   name: 'simbankUuid',
		   xtype: 'fieldcontainer',
		   itemId:'SimbankPort',
		   ulan:'bindBkp',
		   fieldLabel: lanControll.getLanValue('bindBkp'),
		   layout:'hbox',
		   items: [{
			   		xtype:'displayfield', name: 'bkpUuid',hidden:true},
			   		{xtype: 'button',ulan:'btToSimbankPort',text:' >> To SIMBANK Port',itemId:'toSimbankPort',flag:"domain_read",
						listeners:{
							click:function(but,even,eOpts){
			        			
			        			var bkpUuid=panel.down('form').getForm().findField('bkpUuid').getValue();
			        			if(bkpUuid<1){
			        				Ext.MessageBox.alert(boxWarnning,boxGwpNotBindBkp)
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
				}]
			};
		
		var gwpInfoTab=Ext.create('Ext.form.Panel',{
			border:false,
			store:store,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        	fieldLabel:'uuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{
	            xtype: 'hiddenfield',
	            name: 'portUuid',
	            fieldLabel: 'portUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'link_gwp_basic_info',
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
			        	name:'neSnStr',
			        	labelWidth: 180,
			        	fieldLabel:'Device SN'
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
			    		src:Ext.get('resources').value+'/images/panel_logo/dwg.png',
			    	
			        },{
			        	xtype:'displayfield',
			        	name:'neAlias',
			        	labelWidth: 180,
			        	fieldLabel:'Device Name',
			        	listeners :{
			    			change:function(cmp){
			    				var portGrpUuid=this.up('form').getForm().findField("portGrpUuid");
			    				var portPolicyUuid=this.up('form').getForm().findField("portPolicyUuid");
			    				portGrpUuid.setFieldLabel('<label onmouseover=moveOver("gw_port_spec_group",event,"'+cmp.getValue()+'") onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecGroup')+'</label>');
			    				portPolicyUuid.setFieldLabel('<label onmouseover=moveOver("gw_port_spec_policy",event,"'+cmp.getValue()+'") onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecPolicy')+'</label>');
			    			}
			    		}
			        },{
			        	xtype:'displayfield',
			        	name:'portNo',
			        	labelWidth: 180,
			        	fieldLabel:'Port No'
			        },{
			    		xtype: 'displayfield',
						name : 'portAlias',
						fieldLabel: 'DWG Port Alias',
						ulan:'gwpAlias',
						labelWidth: 180,
						maxLength:31,
						anchor:'75%'
					},
			        {
				    	layout:'hbox',
				    	xtype:'fieldcontainer',
				    	border:false,
				    	anchor: '100%',
				    	items:[rs.createAdminStatus(null,[1,2,5],adminSizeObj),{xtype: 'displayfield',width:30,value:'' },{
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
				    }]
			     }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'link_gwp_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'modType',
		            fieldLabel: 'Module Type',
		        },{
		            xtype: 'displayfield',
		            name: 'workMode',
		            fieldLabel: 'Work Mode',
		        },{
		            xtype: 'displayfield',
		            name: 'modStatus',
		            fieldLabel: 'Module Status',
		        },{
		            xtype: 'displayfield',
		            name: 'currentImei',
		            fieldLabel: 'Current IMEI',
		        },{
		            xtype: 'displayfield',
		            name: 'localImei',
		            fieldLabel: 'Local IMEI',
		        },BindSIMBankPort,{
		            xtype: 'hiddenfield',
		            name: 'neUuid',
		            fieldLabel: 'neUuid',
		        }, {
		            xtype: 'displayfield',
		            name: 'simUuid',
		            ulan:'bindSim',
		            fieldLabel: 'Bind Sim Card',
		        },{
		    		name : 'portGrpUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : '<label onmouseover=moveOver("gw_port_spec_group",event) onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecGroup')+'</label>',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    		
		    	},{
		    		name : 'portPolicyUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : '<label onmouseover=moveOver("gw_port_spec_policy",event) onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecPolicy')+'</label>',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    	},{
		    		name : 'lockBkUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : 'Select SIMBANK',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    		listeners :{
		    			change:function(cmp){
				    		if(cmp.getValue()==-1){
		    					return;
		    				}
		    		
		    				var comboxStore = Ext.create("app.store.util.ComboxStore",{});
		    				var lockPortUuid=this.up('form').getForm().findField("lockPortUuid");
		    				var lockPortUuidStore = lockPortUuid.getStore();
		    				var domainUuid = this.up('form').getForm().findField("domainUuid").getValue();
		    				if(!domainUuid)
		    					return;
		    				var lockBkUuid = this.up('form').getForm().findField("lockBkUuid").getValue();
		    				if(!lockBkUuid)
		    				return;
		    				var params = {params:{domainUuid:domainUuid,bkUuid:lockBkUuid,types:'bkp'}};
		    				comboxStore.on('load',function(){
//		    					comboxStore.filter("type","locksim");
		    					lockPortUuidStore.removeAll();
		    					lockPortUuidStore.add({uuid:0,name:'-SELECT-'});
		    					lockPortUuidStore.add({uuid:0,name:'NULL'});
		    					for(var i=0; i<comboxStore.getCount(); i++){
		    						if(comboxStore.getAt(i).get('type')=='bkp'){
		    							lockPortUuidStore.add(comboxStore.getAt(i));
		    						}
		    					}
		    					lockPortUuid.setValue(0);
		    				},this,{single: true})
		    				comboxStore.load(params);
		    			}
		    		}
		    	},{
		    		name : 'lockPortUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : 'Lock SIMBANK Port',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    		listeners :{
		    			change:function(cmp){
		    				var specGrpUuid=this.up('form').getForm().findField("specGrpUuid");
		    				var lockSimUuid=this.up('form').getForm().findField("lockSimUuid");
		    				if(cmp.getValue()>0){
		    					specGrpUuid.setDisabled(true);
		    					lockSimUuid.setDisabled(true);
		    				}else{
		    					specGrpUuid.setDisabled(false);
		    					lockSimUuid.setDisabled(false);
		    				}
		    				
		    			}
		    		}
		    		
		    	},{
		    		name : 'specGrpUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : 'Select Group',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    		listeners :{
		    			change:function(cmp){
		    				if(cmp.getValue()==-1){
		    					return;
		    				}
		    			
		    				var comboxStore = Ext.create("app.store.util.ComboxStore",{});
		    				var lockSimUuid=this.up('form').getForm().findField("lockSimUuid");
		    				var lockSimUuidStore = lockSimUuid.getStore();
		    				var domainUuid = this.up('form').getForm().findField("domainUuid").getValue();
		    				if(!domainUuid)
		    					return;
		    				var grpUuid = this.up('form').getForm().findField("specGrpUuid").getValue();
		    				if(!grpUuid)
		    				return;
		    				var params = {params:{domainUuid:domainUuid,types:'locksim',grpUuid:grpUuid}};
		    				comboxStore.on('load',function(){
//		    					comboxStore.filter("type","locksim");
		    					lockSimUuidStore.removeAll();
		    					lockSimUuidStore.add({uuid:0,name:'-SELECT-'});
		    					lockSimUuidStore.add({uuid:0,name:'NULL'});
		    					for(var i=0; i<comboxStore.getCount(); i++){
		    						if(comboxStore.getAt(i).get('type')=='locksim'){
		    							lockSimUuidStore.add(comboxStore.getAt(i));
		    						}
		    					}
		    					lockSimUuid.setValue(0);
		    				},this,{single: true})
		    				comboxStore.load(params);
		    			}
		    		}
		    	},{
		    		name : 'lockSimUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : 'Lock SIM Card',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    		
		    	},{
		            xtype: 'displayfield',
		            name: 'roundTripDelay',
		            fieldLabel: 'Round Trip Delay',
		    	},{
		    		xtype: 'displayfield',
		    		name: 'packetAll',
		    		fieldLabel: 'Packet All',
		    	},{
		    		xtype: 'displayfield',
		    		name: 'packetRetries',
		    		fieldLabel: 'Packet Retries',
		    	},{
		    		xtype: 'displayfield',
		    		name: 'packetTimeout',
		    		fieldLabel: 'Packet Timeout',
		    	},{
		    		xtype: 'displayfield',
		    		name: 'modSignalVal',
		    		fieldLabel: 'Module Signal Value',
		        },{
		            xtype: 'displayfield',
		            name: 'modBerVal',
		            fieldLabel: 'Module BER Value',
		        },{
		            xtype: 'displayfield',
		            name: 'modErrorCount',
		            fieldLabel: 'Module Error Count',
		        },{
		        	xtype: 'displayfield',
		        	name: 'curCallStatus',
		        	fieldLabel: 'Current Call Status',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.callStatus(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		        	xtype: 'displayfield',
		        	name: 'curSmsStatus',
		        	fieldLabel: 'Current Sms Status',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.smsStatus(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		        	xtype: 'displayfield',
		        	name: 'curUssdStatus',
		        	fieldLabel:'Current Ussd Status',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.ussdStatus(cmp.getValue()));
				        	}
		                }
		            }
					
		        },{
		    		name : 'curCallSn',
		    		xtype : 'displayfield',
		    		fieldLabel : 'Current Call SN',
		    	},{
		    		name : 'curSmsSn',
		    		xtype : 'displayfield',
		    		fieldLabel : 'Current SMS SN',
		    	},{
		    		name : 'curUssdSn',
		    		xtype : 'displayfield',
		    		fieldLabel : 'Current USSD SN',
		    	},{
		            xtype: 'displayfield',
		            name: 'lastBindTime',
		            fieldLabel: 'Last Bind Time',
		        },{
		            xtype: 'displayfield',
		            name: 'lastUsedTime',
		            fieldLabel: 'Last Used Time',
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
		                    var form = panel.down('form');
//		                    var picture = form.down('fieldcontainer[itemId=portAlias]').getComponent('picture');
//		                    if(picture.flag == 0){
//		                    	return;
//		                    }
		                    if (form.getForm().isValid()) {
			                	var store = this.up('form').store;
				                var params = form.getValues();
				                params["portStr"] = store.getAt(0).get('portAlias');
		                    	Ext.Ajax.request({
		                    		url:'gwpManager!updateGwp.action',
		                    		method:'POST',
		                    		params:params,
		                    		callback: function (options, success, response) {
		    	                    	if(success){
		    	                    		ip.initOtiose(1,gwpInfoTab);
	    	                    			gwpInfoTab.down('button[ulan=btCommit]').setDisabled(true);
	    	                    			gwpInfoTab.down('button[ulan=btCommit]').formBind=false;
	    	                    			gwpInfoTab.down('button[ulan=btCancel]').setIconCls('edit');
	    	                    			gwpInfoTab.down('button[ulan=btCancel]').setText(lanControll.getLanValue('btEdit'));
		    	                    		var params = form.up('panel').params;
    	                					store.load(params);
    	            						panel.show();
		    	                    	}else{
		    	                    		ip.commitFailure(gwpInfoTab);
		    	                    	}
		                        	}
		                    	});
		                    }
		                }
		            });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(gwpInfoTab,gwpInfoTab.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    		}else{
	    			var reset = Ext.create('Ext.button.Button',{
	    	        	text: 'Reset',
	    	        	iconCls:'reset',
	    	        	ulan:'btReset',
	    	        	flag:"device_action",
	    	        	handler:function(){
	    					var store = this.up('form').up('panel').store;
	    					var ids = store.getAt(0).get('portUuid');
	    					var portAlias = store.getAt(0).get('portAlias');
	    		    		Ext.MessageBox.confirm(boxWarnning,boxReset,function(e) {																			
	    						if( e == 'yes' ){
	    		        			var handler = Ext.getCmp('handler');
	    		        			if(handler==undefined){
	    		        				handler = Ext.create('app.util.Handler',{});
	    		        			}
	    		        			handler.ResetPortHandler(ids,portAlias);
	    						}
	    		    		});		        		
	    	        	}
	    	        });
	    			tbar.push(reset);
	    			tbar.push('-');
	    			
	    			var  elegant = Ext.create('Ext.button.Button',{
	    	        	text: 'Elegant Stop',
	    	        	iconCls:'elegant_stop',
	    	        	ulan:'btElegantStop',
	    	        	flag:"device_action",
	    	        	handler:function(){
	    					var store = this.up('form').up('panel').store;
	    	        		var ids = store.getAt(0).get('portUuid');
	    	        		var portAlias = store.getAt(0).get('portAlias');
	    	        		Ext.MessageBox.confirm(boxWarnning,boxElegantStop,function(e) {																			
	    						if( e == 'yes' ){
	    		        			var handler = Ext.getCmp('handler');
	    		        			if(handler==undefined){
	    		        				handler = Ext.create('app.util.Handler',{});
	    		        			}
	    		        			handler.ElegantStopPortHandler(ids,portAlias);
	    						}
	    	        		});
	    	        	}
	    	        });
	    			tbar.push(elegant);
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
	    					var params = this.up('form').up('panel').params;
        					store.load(params);
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
		gwpInfoTab.addListener("afterlayout",function(){
			privilege.procPrivilege(gwpInfoTab);
		},this,{single:true});
//		this.tbar =[];
		var gwpStore = this.store;
		var gbsStore = this.gbsStore;
		gwpStore.removeAll();
		if(gwpStore.load_fn != undefined){
		    gwpStore.removeListener('load',gwpStore.load_fn);
	    }
		var load_fn = function(){
			var r=gwpStore.getAt(0);
			panel.setTitle(r.get('portAlias'));
	        var form = panel.down('form');
	        Ext.suspendLayouts();
			panel.down('form').loadRecord(r);
			var uuid=parseInt(r.get('uuid'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var opr=gwpInfoTab.getForm().findField('oprStatus');
			var runStatus=parseInt(r.get('runStatus'));
			var run=gwpInfoTab.getForm().findField('runStatus');
			var workType=parseInt(r.get('workMode'));
			var work=gwpInfoTab.getForm().findField('workMode');
			var modType=parseInt(r.get('modType'));
			var mod=gwpInfoTab.getForm().findField('modType');
			var modStatus=parseInt(r.get('modStatus'));
			var mods=gwpInfoTab.getForm().findField('modStatus');
			var toBkpPort=gwpInfoTab.down('fieldcontainer[itemId=SimbankPort]').getComponent('toSimbankPort');
			var bkpUuid=parseInt(r.get('bkpUuid'));
			
			var portGrpUuid=parseInt(r.get('portGrpUuid'));
			var portPolicyUuid=parseInt(r.get('portPolicyUuid'));
			var lockPortUuid=parseInt(r.get('lockPortUuid'));
			var lockSimUuid=parseInt(r.get('lockSimUuid'));
			
			
			gwpInfoTab.getForm().findField('curCallStatus').setValue(rs.callStatus(r.get("curCallStatus")));
			gwpInfoTab.getForm().findField('curSmsStatus').setValue(rs.smsStatus(r.get("curSmsStatus")));
			gwpInfoTab.getForm().findField('curUssdStatus').setValue(rs.ussdStatus(r.get("curUssdStatus")));
			gwpInfoTab.getForm().findField('simUuid').setValue(r.get("simImsi"));
			
			var specGrpUuidStore = gwpInfoTab.getForm().findField("specGrpUuid").getStore();
			var portGrpUuidStore = gwpInfoTab.getForm().findField("portGrpUuid").getStore();
			var portPolicyUuidStore = gwpInfoTab.getForm().findField("portPolicyUuid").getStore();
			var lockBkUuidStore = gwpInfoTab.getForm().findField("lockBkUuid").getStore();

			var lockSimUuidStore = gwpInfoTab.getForm().findField("lockSimUuid").getStore();
			
			var lockPortUuidStore = gwpInfoTab.getForm().findField("lockPortUuid").getStore();
			var comboxStore= Ext.create("app.store.util.ComboxStore",{});
			var domainUuid =parseInt(r.get('domainUuid'));
			comboxStore.on('load',function(){      	
				specGrpUuidStore.removeAll();
				specGrpUuidStore.add({uuid:-1,name:'-SELECT-'});
				portGrpUuidStore.removeAll();
				portGrpUuidStore.add({uuid:0,name:'-SELECT-'});
				portGrpUuidStore.add({uuid:0,name:'NULL'});
				portPolicyUuidStore.removeAll();
				portPolicyUuidStore.add({uuid:0,name:'-SELECT-'});
				portPolicyUuidStore.add({uuid:0,name:'NULL'});
				lockBkUuidStore.removeAll();
				lockBkUuidStore.add({uuid:-1,name:'-SELECT-'});
				lockPortUuidStore.removeAll();
				lockSimUuidStore.removeAll();
				lockPortUuidStore.add({uuid:0,name:'NULL'});
				lockSimUuidStore.add({uuid:0,name:'NULL'});
//				lockSimUuidStore.removeAll();
//				lockSimUuidStore.add({uuid:-1,name:'-SELECT-'});
//				lockSimUuidStore.add({uuid:0,name:'NULL'});
				for(var i=0; i<comboxStore.getCount(); i++){
					if(comboxStore.getAt(i).get('type')=='group'){
						specGrpUuidStore.add(comboxStore.getAt(i));
						portGrpUuidStore.add(comboxStore.getAt(i));
					}else if(comboxStore.getAt(i).get('type')=='policy'){
						portPolicyUuidStore.add(comboxStore.getAt(i));
					}else if(comboxStore.getAt(i).get('type')=='device'){
						lockBkUuidStore.add(comboxStore.getAt(i));
					}else if(comboxStore.getAt(i).get('type')=='portone'){
						lockPortUuidStore.add(comboxStore.getAt(i));
					}else if(comboxStore.getAt(i).get('type')=='simone'){
						lockSimUuidStore.add(comboxStore.getAt(i));
					}
				}
				gwpInfoTab.getForm().findField("specGrpUuid").setValue(-1);
				gwpInfoTab.getForm().findField("lockSimUuid").setValue(lockSimUuid);
				gwpInfoTab.getForm().findField("portGrpUuid").setValue(portGrpUuid);
				gwpInfoTab.getForm().findField("portPolicyUuid").setValue(portPolicyUuid);
				gwpInfoTab.getForm().findField("lockBkUuid").setValue(-1);
				gwpInfoTab.getForm().findField("lockPortUuid").setValue(lockPortUuid);
				
			},this,{single: true})
			comboxStore.load({params:{domainUuid:domainUuid,types:'group,policy,device,portone,simone',portUuid:lockPortUuid,simUuid:lockSimUuid,productIds:'31,35'}});
			
			
			if(bkpUuid<1){
				toBkpPort.setDisabled(true);
			}else{
				toBkpPort.setDisabled(false);
			}
			mods.setValue(rs.modStatus(modStatus));
			work.setValue(rs.workType(workType));
			mod.setValue(rs.modType(modType));
			  
			opr.setValue(rs.oprStatus(oprStatus));
			  
			run.setValue(rs.runStatus(runStatus));
			Ext.resumeLayouts(true);
		};
		gwpStore.load_fn = load_fn;
		gwpStore.on('load',load_fn);
		
		
		ip.initOtiose(1,gwpInfoTab);
		var loadMask=new Ext.LoadMask(gwpInfoTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		this.items=[gwpInfoTab];
		this.callParent(arguments);	
	},
//	listeners:{
//		beforeshow:function(){
//	        var form = this.down('form');
//	        var picture = form.getComponent('alias').getComponent('picture');
//	        picture.update("");
//	        picture.flag = 2;
//		}
//	}
});