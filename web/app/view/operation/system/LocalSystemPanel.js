Ext.require([
    'app.util.TimerPanel'
]);
Ext.define('app.view.operation.system.LocalSystemPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	initComponent: function(){
		var me =this;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var store = Ext.create('app.store.operation.system.SysAndLicInfoStore',{});
		this.store = store;
		store.on('beforeload',function(){
			store.loadFlag = false;
		})
		var systemTab1=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiSysInfo'),
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
	            anchor: '75%',
	            labelWidth: 180,
	        },
	       
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'cloudUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:lanControll.getLanValue('fsBasicInfo'),
				ulan:'fsBasicInfo',
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
			        	 xtype: 'textfield',
				            name: 'name',
				            ulan:'sysName',
				            labelWidth: 180,
				            fieldLabel: 'Server Name'
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
			    		src:Ext.get('resources').value+'/images/panel_logo/server.png',
			    	
			        },{
			        	xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Server Alias',
			        },{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2],adminSizeObj),{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Opr',
				            ulan:'oprStatusSpec',
				        },{
				            xtype: 'displayfield',
				            labelWidth: 80,
				            labelAlign: 'right',
				            name: 'runStatus',
				            fieldLabel: 'Run',
				            ulan:'runStatusSpec',
				        }]
			        
			        },{
			        	xtype: 'textareafield',
			            name: 'detailDesc',
			            labelWidth: 180,
			            height:50,
			            rows:1,
			            fieldLabel: 'Description',
			        }]
			        }
		    ]},{
		    	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'sys_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		        	xtype: 'displayfield',
		        	name: 'productId',
		        	ulan:'sysProductId',
		        	fieldLabel: 'Server Type',
		        	listeners :{
		    			change:function(cmp){
							if(cmp.getValue()>0 && cmp.getValue()<999){
								var startTime=this.up('form').getForm().findField("startTime");
			    				var dcCon=this.up('form').down('container[name=dcCon]');
			    				var drCon=this.up('form').down('container[name=drCon]');
			    				var simCon=this.up('form').down('container[name=simCon]');
								if(cmp.getValue()==61){
									startTime.setVisible(true);
									drCon.setVisible(true);
									dcCon.setVisible(false);
									simCon.setVisible(false);
								}else if(cmp.getValue()==62){
									startTime.setVisible(true);
									drCon.setVisible(false);
									dcCon.setVisible(true);
									simCon.setVisible(false);
								}else{
									startTime.setVisible(false);
									drCon.setVisible(false);
									dcCon.setVisible(false);
									simCon.setVisible(true);
								}
								cmp.setValue(rs.serverType(cmp.getValue()));
							}
		    			}
		    		}
		        },{
		            xtype: 'displayfield',
		            name: 'srvMode',
		            fieldLabel: 'Server Mode',
				},{
		            xtype: 'displayfield',
		            name: 'signType',
		            fieldLabel: 'License Type',
				},{
		            xtype: 'displayfield',
		            name: 'licStatus',
		            fieldLabel: 'License Status',
				},{
		            xtype: 'displayfield',
		            name: 'leftDays',
		            fieldLabel: 'License Left Days',
				},{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		            xtype: 'textfield',
		            name: 'sysIpAddr',
		            fieldLabel: 'Outer IP Address',
		        },{
		        	xtype: 'textfield',
		        	name: 'ethIpAddr',
		        	fieldLabel: 'Inner IP Address',
		        },{
		        	xtype:'container',
		        	name:'simCon',
		        	items:[{
			            xtype: 'displayfield',
			            name: 'procNum',
			            fieldLabel: 'Process Count',
			        },{
			            xtype: 'displayfield',
			            name: 'loadVal',
			            fieldLabel: 'Load Value',
			        },{
		            	 xtype: 'displayfield',
		                 name: 'totalNeCount',
		                 fieldLabel: 'Device Count',
		            },{
			        	xtype: 'displayfield',
			        	name: 'onlineNeCount',
			        	fieldLabel: 'Online Device Count',
			        },{
		               	 xtype: 'displayfield',
		                 name: 'totalSimCard',
		                 fieldLabel: 'SIM Card',
		            },{
			        	xtype: 'displayfield',
			        	name: 'onlineSimCard',
			        	fieldLabel: 'Online SIM Count',
			        },{
			            xtype: 'displayfield',
			            name: 'softwareVersion',
			            ulan:'version',
			            fieldLabel: 'Software Version',
			        }, {
			            xtype: 'displayfield',
			            name: 'softwareBuildTime',
			            fieldLabel: 'Software Build Time',
			        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
			            xtype: 'displayfield',
			            name: 'lifeSecond',
			            fieldLabel: 'Server Runing Time',
			        },{
			            xtype: 'displayfield',
			            name: 'lastRegTime',
			            fieldLabel: 'Last Registered Time',
			        }, {
			        	xtype: 'displayfield',
			        	name: 'lastHbTime',
			        	fieldLabel: 'Last Heartbeat Time',
			        }, {
			            xtype: 'displayfield',
			            name: 'lastHbTime02',
			            ulan:'localHbTime',
			            fieldLabel: 'Local Heartbeat Time',
			        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
			            name: 'canRegisterFlag',
			            xtype:'checkbox',
			            inputValue:1,
			            boxLabel:'Not allowed to register domain',
		    			boxLabelCls:'box_label'
			        
			        }, {
			            xtype: 'textfield',
			            name: 'hbIntervalMs',
			            fieldLabel: 'Heartbeat Interval(ms)',
			        }, {
			            xtype: 'textfield',
			            name: 'hbDeadCheckMs',
			            fieldLabel: 'Heartbeat Loss Timeout(ms)',
			        }, {
			            xtype: 'textfield',
			            name: 'pollIntervalSec',
			            fieldLabel: 'DB Poll Interval(sec)',
			        }, {
			            xtype: 'textfield',
			            name: 'diffIntervalSec',
			            fieldLabel: 'Diff Poll Interval(sec)',
			        }, {
			            xtype: 'textfield',
			            name: 'updateIntervalSec',
			            fieldLabel: 'DB Update Interval(sec)',
			        }, {
			            xtype: 'textfield',
			            name: 'auditIntervalSec',
			            fieldLabel: 'DB Audit Interval(sec)',
			        },{
		    			labelWidth: 180,
			            xtype: 'textfield',
			            name: 'demoPortNum',
			            fieldLabel: 'Demo Port Count',
			        },{
		    			labelWidth: 180,
			            xtype: 'textfield',
			            name: 'demoRandom',
			            fieldLabel: 'Demo Event Random',
			        },{
			            name: 'createDevPort',
			            xtype:'checkbox',
			            inputValue:1,
			            boxLabel:'Create Default Port of New Device?',
		    			boxLabelCls:'box_label'
			        },{xtype:'displayfield',anchor: '75%',value:'<hr>'}, {
			            xtype: 'displayfield',
			            name: 'localScpPort',
			            fieldLabel: 'SCTP Comm Port',
			        },{
			            xtype: 'displayfield',
			            name: 'sysMsgPort',
			            fieldLabel: 'Server Comm Port',
			        },{
			            xtype: 'displayfield',
			            name: 'sysWebPort',
			            fieldLabel: 'Web Proxy Port',
			        }, {
			            xtype: 'displayfield',
			            name: 'iceIdleTimelen',
			            fieldLabel: 'ICE IDLE Timeout(sec)',
			        }, {
			            xtype: 'displayfield',
			            name: 'srvCheckTimelen',
			            fieldLabel: 'SRV Check Timeout(sec)',
			        },{
			            name: 'syslogServerFlag',
			            xtype:'checkbox',
			            hidden:true,
			            inputValue:1,
			            boxLabel:'Syslog Server Flag',
		    			boxLabelCls:'box_label'
			        }]
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		        	xtype: 'displayfield',
		        	name: 'startTime',
		        	fieldLabel: 'Start Time',
		        	ulan:'dmStartTime',
		        	renderer:function(value){
	        			return rs.dateTimeFormat(value);
	        		}
		        },{
		        	xtype:'container',
		        	name:'dcCon',
		        	items:[{
			        	xtype:'timerpanel',
			        	store:Ext.create('app.store.dm.AuthNumStore'),
			        	parentId:me.id,
			        	interval:8000,
			        	params:{serverUuid:me.uuid},
			        	hidden:false,
			        	border:false,
			        	bodyStyle: {
							background: '#DFE9F6',
						},
				        fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '75%',
				            labelWidth: 180,
				        },
			        	items:[{
							xtype: 'displayfield',
							name: 'avgProcessTime',
							fieldLabel: 'Avg Process Time',
						},{
							xtype: 'displayfield',
							name: 'maxProcessTime',
							fieldLabel: 'Max Process Time',
						},{
							xtype: 'displayfield',
							name: 'curPendingCnt',
							fieldLabel: 'Cur Pending Count',
						},{
							xtype: 'displayfield',
							name: 'totalProcess',
							fieldLabel: 'Total Process',
						}]
						}
		            ]
		        }]
		    },{
	        	xtype:'container',
	        	name:'drCon',
	        	items:[{
		        	xtype:'timerpanel',
		        	store:Ext.create('app.store.dm.TapeStore'),
		        	parentId:me.id,
		        	interval:8000,
		        	params:{serverUuid:me.uuid},
		        	hidden:false,
		        	border:false,
		        	bodyStyle: {
						background: '#DFE9F6',
					},
			        fieldDefaults: {
			            labelAlign: 'left',
			            anchor: '75%',
			            labelWidth: 180,
			        },
		        	items:[{
			       		    	xtype: 'fieldset',
			       				layout:'anchor',
			       				title:'APP Config',
			       				ulan:'appConfigFS',
			       				layout: 'anchor',
			       				collapsible: true,
			       				collapsed: false,
			       				items:[{xtype:'displayfield',name:'listenIp',fieldLabel:'listenIp'},
					        	       {xtype:'displayfield',name:'listenPort',fieldLabel:'listenPort'},
					        	       {xtype:'displayfield',name:'maxSessions',fieldLabel:'maxSessions'},
					        	       {xtype:'displayfield',name:'version',fieldLabel:'Version'},
										]
							},
		        	       
							{
			       		    	xtype: 'fieldset',
			       				layout:'anchor',
			       				title:'APP Status',
			       				ulan:'appStatusFS',
			       				layout: 'anchor',
			       				collapsible: true,
			       				collapsed: false,
			       				items:[{xtype:'displayfield',name:'sessionsCount',fieldLabel:'sessionsCount'},
									{xtype: 'displayfield',	name: 'processedTotal',	fieldLabel: 'Total Tape Count',},
									{xtype: 'displayfield',	name: 'processedFailed',	fieldLabel: 'Total Tape Count',}]
							},
							
							{
			       		    	xtype: 'fieldset',
			       				layout:'anchor',
			       				title:'Runtime',
			       				ulan:'runtimeFS',
			       				layout: 'anchor',
			       				collapsible: true,
			       				collapsed: false,
			       				items:[{xtype:'displayfield',name:'systemUptime',fieldLabel:'systemUptime'},
						        	       {xtype:'displayfield',name:'processId',fieldLabel:'processId'},
						        	       {xtype:'displayfield',name:'processUptime',fieldLabel:'processUptime'},
						        	       {xtype:'displayfield',name:'totalMemory',fieldLabel:'totalMemory'},
						        	       {xtype:'displayfield',name:'freeMemory',fieldLabel:'freeMemory'},
						        	       {xtype:'displayfield',name:'loadavg1m',fieldLabel:'loadavg1m'},
						        	       {xtype:'displayfield',name:'loadavg5m',fieldLabel:'loadavg5m'},
						        	       {xtype:'displayfield',name:'loadavg15m',fieldLabel:'loadavg15m'},
						        	       {xtype:'displayfield',name:'rxRate',fieldLabel:'rxRate'},
						        	       {xtype:'displayfield',name:'txRate',fieldLabel:'txRate'},
						        	       {xtype:'displayfield',name:'diskUsed',fieldLabel:'diskUsed'},
						        	       {xtype:'displayfield',name:'diskAvailable',fieldLabel:'diskAvailable'},]
							},
		        	      
		        	       {
		       		    	xtype: 'fieldset',
		       				layout:'anchor',
		       				title:'Engine Status',
		       				ulan:'engineStatusFS',
		       				layout: 'anchor',
		       				collapsible: true,
		       				collapsed: true,
		       				items:[
					        	       {xtype:'displayfield',name:'audioTime',fieldLabel:'Audio Time'},
					        	       {xtype:'displayfield',name:'mixTime',fieldLabel:'Mix Time'},
					        	       {xtype:'displayfield',name:'writeTime',fieldLabel:'Write Time'},
					        	       {xtype:'displayfield',name:'recordTime',fieldLabel:'RecordTime'},
					        	       {xtype:'displayfield',name:'fractionLost',fieldLabel:'Fraction Lost'},
					        	       {xtype:'displayfield',name:'cumulativeLost',fieldLabel:'Cumulative Lost'},
					        	       {xtype:'displayfield',name:'extendedMaxSequenceNumber',fieldLabel:'Max Sequence Number'},
					        	       {xtype:'displayfield',name:'jitter',fieldLabel:'Jitter'},
					        	       {xtype:'displayfield',name:'currentBufferSizeMs',fieldLabel:'Curr Buffer Size(ms)'},
					        	       {xtype:'displayfield',name:'preferredBufferSizeMs',fieldLabel:'Preferred Buffer Size(ms)'},
					        	       {xtype:'displayfield',name:'jitterPeaksFound',fieldLabel:'Jitter Peaks Found'},
					        	       {xtype:'displayfield',name:'packetLossRate',fieldLabel:'Pkt Loss Rate'},
					        	       {xtype:'displayfield',name:'packetDiscardRate',fieldLabel:'Pkt Discard Rate'},
					        	       {xtype:'displayfield',name:'expandRate',fieldLabel:'Expand Rate'},
					        	       {xtype:'displayfield',name:'preemptiveRate',fieldLabel:'Preemptive Rate'},
					        	       {xtype:'displayfield',name:'accelerateRate',fieldLabel:'Accelerate Rate'},
					        	       {xtype:'displayfield',name:'clockdriftPpm',fieldLabel:'Clock Drift Ppm'},
					        	       {xtype:'displayfield',name:'addedZeroSamples',fieldLabel:'Added Zero Samples'},]
		       				},
		        	      
		        	       
		        	       
		        	]
		        }]
            },{
		    	xtype: 'fieldset',
				layout:'anchor',
				title:'License Setting',
				ulan:'fsLicenseSetting',
				itemId:'sys_lic_setting',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
					xtype: 'displayfield',
				    name: 'authSysUuid',
				    fieldLabel: 'Auth Server',
				},{
					xtype: 'displayfield',
				    name: 'trialBalance',
				    fieldLabel: 'TRIAL Balance',
				},{
					xtype: 'displayfield',
					name: 'premiumBalance',
					fieldLabel: 'PREMIUM Balance',
				},{
					xtype: 'displayfield',
					name: 'licFirstCost',
					fieldLabel: 'First Year Cost',
				},{
					xtype: 'displayfield',
					name: 'licPeriodCost',
					fieldLabel: 'Second Year Cost',
				}]
		    },{
		    	xtype: 'fieldset',
				layout:'anchor',
				title:'Provision Setting',
				ulan:'fsProvisionSetting',
				itemId:'sys_provision_setting',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[
					{
					    xtype: 'displayfield',
					    name: 'provXmlUrl',
					    fieldLabel: 'Provision XML URL',
					},{
						xtype: 'displayfield',
						name: 'provUsername',
						fieldLabel: 'Provision Username',
					},{
						xtype: 'displayfield',
						name: 'provPassword',
						fieldLabel: 'Provision Password',
						
					}   
				]
		    }],
		    maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			var commit = Ext.create('Ext.button.Button',{
			            text: 'Commit',
			            iconCls:'save',
			            ulan:'btCommit',
			            flag:"super_edit",
			            disabled: true,
			            formBind: false,
			            handler: function() {
	    					var store = this.up('form').store;
	    					var name = store.getAt(0).get('name');
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'sysManager!updateSys.action?',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);
				                    	if(success){
				                    		ip.commitSuccess(systemTab1,systemTab1.store);
				                    	}else{
				                    		ip.commitFailure(systemTab1);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(systemTab1,systemTab1.store,tbar);
	    			tbar[tbar.length-2].flag = "super_edit";
	    		}
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"super_read",
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
		systemTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(systemTab1);
		},this,{single:true});
		
		
		ip.initOtiose(1,systemTab1);
		sysLoadMask=new Ext.LoadMask(systemTab1, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load', function(){
			  var r=store.getAt(0);
			  var oprStatus=parseInt(r.get('oprStatus'));
			  var runStatus=parseInt(r.get('runStatus'));
			  var lifeSecond=parseInt(r.get('lifeSecond'));
			  var opr=systemTab1.getForm().findField('oprStatus');
			  var run=systemTab1.getForm().findField('runStatus');
			  var life=systemTab1.getForm().findField('lifeSecond');
			  Ext.suspendLayouts();
			  systemTab1.loadRecord(r);
			  systemTab1.getForm().findField('srvMode').setValue(rs.serverMode(parseInt(r.get('srvMode'))));
			  systemTab1.getForm().findField('licStatus').setValue(rs.licenseStatus(parseInt(r.get('licStatus'))));
			  systemTab1.getForm().findField('signType').setValue(rs.signType(parseInt(r.get('signType'))));

			  opr.setValue(rs.oprStatus(oprStatus));
			  run.setValue(rs.runStatus(runStatus));
			  life.setValue(rs.tranSecond(lifeSecond));
			  Ext.resumeLayouts(true);
//			  licNewSignTypeField.setValue(rs.licenseType(licNewSignType));
//			  licNewHbmFlagField.setValue(rs.yesOrNo(licNewHbmFlag));
		});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[systemTab1],
	       	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		lanControll.setLan(systemTab1);
		this.callParent(arguments);	
	}
});