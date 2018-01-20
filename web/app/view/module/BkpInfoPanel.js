
Ext.define('app.view.module.BkpInfoPanel',{
	extend:'Ext.panel.Panel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
	autoScroll:true,
	closable:true,
	hidden:false,
	border:false,
	tipId:'',
	store:{},
	title:lanControll.getLanValue('tiBkp'),
	params:{},
	prefix:'',
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var panel = this;
		this.store = Ext.create('app.store.operation.domain.roamzone.site.nes.BkpStore',{});
		var store = this.store;
		store.on('beforeload',function(){
			store.loadFlag = false;
		});
		var params = this.params;
		var bkpAlias;
		
		var prefix = this.prefix;
		var panelId = this.id;
		var BindDWGPort = {
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   itemId:'DWGPort',
				   ulan:'bindGwp',
				   fieldLabel: lanControll.getLanValue('bindGwp'),
				   items: [
							{xtype:'hiddenfield', name: 'gwpUuid',},
							{xtype: 'button',ulan:'btToDwgPort',text:'>> To DWG Port',itemId:'toDWGPort',flag:"domain_read",
								
								listeners:{
									click:function(but,even,eOpts){
					        			
					        			var gwpUuid=bkpInfoTab.getForm().findField('gwpUuid').getValue();
					        			if(gwpUuid<1){
					        				Ext.MessageBox.alert(boxWarnning,boxBkpNotBindGwp)
					        			}else{
											var tabpanel = panel.up('panel');
											var id=prefix+"gwpUuid_"+gwpUuid;
											if(prefix.indexOf('gwpInfoPanel_')>=0
													|| prefix.indexOf('bkpInfoPanel_')>=0){
												id = prefix+'gwpInfoPanel';
											}
											var tab = Ext.getCmp(id);
											var params = {params : {uuid:gwpUuid}};
											if(tab==undefined){
												tab = Ext.create('app.view.module.GwpInfoPanel',{
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
		var LoadSIMCard = {
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   itemId:'SimCard',
				   ulan:'bindSim',
				   fieldLabel: lanControll.getLanValue('bindSim'),
				   items: [
							{xtype:'hiddenfield',  name: 'simUuid',},
							{xtype: 'button',ulan:'btToSimCard',text:'>> To SIM Card',itemId:'toSimCard',flag:"domain_read",
								
								listeners:{
									click:function(but,even,eOpts){
					        			var simUuid=panel.down('form').getForm().findField('simUuid').getValue();
					        			var domainUuid=panel.down('form').getForm().findField('domainUuid').getValue();
					        			if(simUuid<1){
					        				Ext.MessageBox.alert(boxWarnning,boxBkpNotBindSim)
					        			}else{
											var tabpanel = panel.up('panel');
											var id=prefix+"simUuid_"+simUuid;
											if(prefix.indexOf('gwpInfoPanel_')>=0
													|| prefix.indexOf('bkpInfoPanel_')>=0){
												id = prefix+'simCardInfoPanel';
											}
											var tab = Ext.getCmp(id);
											var params = {params : {uuid:simUuid}};
											if(tab==undefined){
												tab = Ext.create('app.view.module.SimCardPanel',{
													id:id,
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
					        		}
								
								}
							}
						]
				
	        
	        };
		var bkpInfoTab=Ext.create('Ext.form.Panel',{
			border:false,
			autoScroll:true,
			store:store,
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
	        	xtype:'hiddenfield',
	        	name:'imsi'
	        },{
	            xtype: 'hiddenfield',
	            name: 'portUuid',
	            fieldLabel: 'PortUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'bkp_basic_info',
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
			            name: 'neSnStr',
			            labelWidth: 180,
			            fieldLabel: 'Device SN',
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
			    		src:Ext.get('resources').value+'/images/panel_logo/simbank_port.png',
			    	
			        },{
			            xtype: 'displayfield',
			            name: 'neAlias',
			            labelWidth: 180,
			            fieldLabel: 'Device Name',
			            listeners :{
			    			change:function(cmp){
			    				var portGrpUuid=this.up('form').getForm().findField("portGrpUuid");
			    				portGrpUuid.setFieldLabel('<label onmouseover=moveOver("bk_port_spec_group",event,"'+cmp.getValue()+'") onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecGroup')+'</label>');
			    			}
			    		}
			        },{
			            xtype: 'displayfield',
			            name: 'portNo',
			            labelWidth: 180,
			            fieldLabel: 'Port No',
			        },{
			    		xtype: 'displayfield',
						name : 'portAlias',
						fieldLabel: 'BK Port Alias',
						ulan:'bkpAlias',
						labelWidth: 180,
						maxLength:31,
						anchor:'75%'
					},{
				    	layout:'hbox',
				    	xtype:'fieldcontainer',
				    	border:false,
				    	anchor: '100%',
				    	items:[rs.createAdminStatus(null,[1,2,6],adminSizeObj),{
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
			        }]
			     }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				itemId:'link_bkp_detail_info',
				layout: 'anchor',
				ulan:'fsDetailInfo',
				collapsible: true,
				collapsed: false,
				items:[{
		    		name : 'portGrpUuid',
		    		xtype : 'combo',
		    		mode : 'local',
		    		editable:false,
		    		allowBlank:true,
		    		anchor:'60%',
		    		fieldLabel : '<label onmouseover=moveOver("bk_port_spec_group",event) onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecGroup')+'</label>',
		    		displayField : 'name',
		    		valueField : 'uuid',
		    		queryMode : 'local',
		    		store:Ext.create("app.store.util.ComboxStore",{}),
		    		
		    	},{
		            xtype: 'displayfield',
		            name: 'status',
		            fieldLabel: 'Work Status',
		        },BindDWGPort,LoadSIMCard,{
		            xtype: 'displayfield',
		            name: 'lastErrorCount',
		            fieldLabel: 'Last Error Count',
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
		        	fieldLabel: 'Current Ussd Status',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.ussdStatus(cmp.getValue()));
				        	}
		                }
		            }
					
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
	    					var form2=panel.down('form');
			                var form = this.up('form').getForm();
//		                    var picture = this.up('form').down('fieldcontainer[itemId=alias]').getComponent('picture');
//		                    if(picture.flag == 0){
//		                    	return;
//		                    }

			                if (form.isValid()) {
			                	var store = this.up('form').store;
				                var params = form.getValues();
				                params["portStr"] = store.getAt(0).get('portAlias');
			                	Ext.Ajax.request({
			                		url:'bkpManager!updateBkp.action',
			                		method:'POST',
			                		params:params,
			                		
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		ip.initOtiose(1,bkpInfoTab);
		    	                    		bkpInfoTab.down('button[ulan=btCommit]').setDisabled(true);
	    	                    			bkpInfoTab.down('button[ulan=btCommit]').formBind=false;
	    	                    			bkpInfoTab.down('button[ulan=btCancel]').setIconCls('edit');
	    	                    			bkpInfoTab.down('button[ulan=btCancel]').setText(lanControll.getLanValue('btEdit'));
				                    		var params = form2.up('panel').params;
				                      					store.load(params);
				                  					panel.show();
				                    	}else{
				                    		ip.commitFailure(bkpInfoTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(bkpInfoTab,bkpInfoTab.store,tbar);
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
		bkpInfoTab.addListener("afterlayout",function(){
			privilege.procPrivilege(bkpInfoTab);
		},this,{single:true});
		var bkpStore = this.store;
		bkpStore.on('load',function(){
			var r=bkpStore.getAt(0);
	        var form = panel.down('form');
			panel.setTitle(r.get('alias'));
			Ext.suspendLayouts();
			bkpInfoTab.loadRecord(r);
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=bkpInfoTab.getForm().findField('oprStatus');
			var run=bkpInfoTab.getForm().findField('runStatus');
			var workStatus=parseInt(r.get('status'));
			var sta=bkpInfoTab.getForm().findField('status');		
			var toDwgPort=bkpInfoTab.down('fieldcontainer[itemId=DWGPort]').getComponent('toDWGPort');
			var toSimCard=bkpInfoTab.down('fieldcontainer[itemId=SimCard]').getComponent('toSimCard');
			var simUuid=parseInt(r.get('simUuid'));
			var gwpUuid=parseInt(r.get('gwpUuid'));		
			if(simUuid<1){
				toSimCard.setDisabled(true);
			}else{
				toSimCard.setDisabled(false);
			}
			if(gwpUuid<1){
				toDwgPort.setDisabled(true);
			}else{
				toDwgPort.setDisabled(false);
			}		
			sta.setValue(rs.workStatus(workStatus));			  
			opr.setValue(rs.oprStatus(oprStatus));		  
			run.setValue(rs.runStatus(runStatus));
			
			var portGrpUuid=parseInt(r.get('portGrpUuid'));
			
			var portGrpUuidStore = bkpInfoTab.getForm().findField("portGrpUuid").getStore();
			var comboxStore= Ext.create("app.store.util.ComboxStore",{});
			var domainUuid =parseInt(r.get('domainUuid'));
			comboxStore.on('load',function(){      	
				portGrpUuidStore.removeAll();
				portGrpUuidStore.add({uuid:0,name:'-SELECT-'});
				portGrpUuidStore.add({uuid:0,name:'NULL'});
				for(var i=0; i<comboxStore.getCount(); i++){
					if(comboxStore.getAt(i).get('type')=='group'){
						portGrpUuidStore.add(comboxStore.getAt(i));
					}
				}
				bkpInfoTab.getForm().findField("portGrpUuid").setValue(portGrpUuid);
				
			},this,{single: true})
			comboxStore.load({params:{domainUuid:domainUuid,types:'group'}});
			Ext.resumeLayouts(true);
		});
		
		
		ip.initOtiose(1,bkpInfoTab);
		var loadMask=new Ext.LoadMask(bkpInfoTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		this.items=[bkpInfoTab];
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