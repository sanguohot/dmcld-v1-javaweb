Ext.define('app.view.operation.domain.roamzone.site.nes.TgInfoPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
//	comboxStore:Ext.create("app.store.util.ComboxStore",{}),
	toolbars:0,
	otiose:0,
	moudleId:'',
	tgpListToolbars:0,
	tgpListOtiose:0,
	tgpMapOtiose:0,
	tgpMapToolbars:0,
	initComponent: function(){
		var store = Ext.create('app.store.operation.domain.roamzone.site.nes.TgInfoStore',{});
		var tgAlias;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		if(!maintenance){
			this.toolbars=3;
			this.otiose=0;
			this.moduleId='config';
			this.tgpListToolbars=3;
			this.tgpListOtiose=0;
			this.tgpMapToolbars=3;
			this.tgpMapOtiose=0;
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			tgAlias = generalObj.createName('tg_alias'
					,75,25,'alias','Alias','#DFE9F6','neManager!checkAlias.action',store);
			store.on('load',function(){
				var picture = tgAlias.getComponent('picture');
				picture.update("");
				picture.flag = 2;
			});
		}else{
			this.toolbars=30;
			this.otiose=1;
			this.moduleId='maintenance';
			this.tgpMapToolbars=2;
			this.tgpMapOtiose=1;
			this.tgpListToolbars=2;
			this.tgpListOtiose=1;
			tgAlias = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'alias',
				fieldLabel: 'Alias',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}
		tgAlias.ulan = 'mtgAlias';
		var tgTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue("tiMtgInfo"),
			border:false,
			autoScroll:true,
			forceRefresh:0,
			store:store,
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
				itemId:'basic_info',
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
			    		src:Ext.get('resources').value+'/images/panel_logo/tg.png',
			    	
			        },tgAlias,{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2],adminSizeObj),{xtype: 'displayfield',width:30,value:'' },{
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
			        }]
			     }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				itemId:'tg_detail_info',
				ulan:'fsDetailInfo',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		    		xtype: 'displayfield',
		    		name : 'productId',
		    		ulan:'deviceType',
		    		fieldLabel: 'Device Type',
		        }, {
		            xtype: 'displayfield',
		            name: 'productName',
		            fieldLabel: 'Device Model',
		        }, {
		            xtype: 'displayfield',
		            name: 'vendorId',
		            fieldLabel: 'Device Vendor',
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
		        },createPasswordContainer(),
//		        {
//		            xtype: 'displayfield',
//		            name: 'encryptType',
//		            fieldLabel: 'Encrypt Type',
//		        },
		        {
		            xtype: 'displayfield',
		            name: 'outerIpAddr',
		            fieldLabel: 'Outer IP Address',
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
		            ulan:'version',
		            fieldLabel: 'Software Version',
		        },{
		            xtype: 'displayfield',
		            name: 'packageBuildTime',
		            fieldLabel: 'Software Build Time',
		        },{
		            xtype: 'textareafield',
		            name: 'detailVer',
		            readOnly:true,
		            fieldLabel: 'Detail Version',
		            flex:1,
		            listeners:{
		        		focus:function(cmp,eventObject,eOpts){
		        			this.setHeight(18*(cmp.getValue().split("\n").length+1));
		        		},
		        		blur:function(cmp,eventObject,eOpts){
		        			this.setHeight(18*4);
		        		}
		        	}
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},
		        {
		        	xtype: 'displayfield',
		        	name: 'ntpStatus',
		        	fieldLabel: 'NTP Status',
		        },{
		        	xtype: 'displayfield',
		        	name: 'autoRebootFlag',
		        	fieldLabel: 'Schedule Reset',
		        },
//		        {
//		        	xtype: 'displayfield',
//		        	name: 'timeChipStatus',
//		        	fieldLabel: 'Time Chip Status',
//		        },
		        {
		        	xtype: 'displayfield',
		        	name: 'switchChipStatus',
		        	fieldLabel: 'TDM Switch Chip',
		        },{
		        	xtype: 'displayfield',
		        	name: 'devTime',
		        	fieldLabel: 'Device Time',
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		        	xtype: 'displayfield',
		        	name: 'curCpu',
		        	ulan:'curCpuUsage',
		        	fieldCls:'curCpuCls',
//		        	html:'<div id=abcd class=abcd>abcdefg</div>'
		        	fieldLabel: 'Current CPU Usage',
		        },{
		        	xtype: 'displayfield',
		        	name: 'avgCpu5',
		        	fieldCls:'avgCpu5Cls',
		        	fieldLabel: 'AVG CPU Usage(5 sec)',
		        },{
		        	xtype: 'displayfield',
		        	name: 'avgCpu60',
		        	fieldCls:'avgCpu60Cls',
		        	fieldLabel: 'AVG CPU Usage(60 sec)',
		        },{
		        	xtype: 'displayfield',
		        	name: 'avgCpu600',
		        	fieldCls:'avgCpu600Cls',
		        	fieldLabel: 'AVG CPU Usage(600 sec)',
		        },{
		        	xtype: 'displayfield',
		        	name: 'freeMem',
		        	fieldLabel: 'Free Mem',
		        	hidden:true,
		        },{
		        	xtype: 'displayfield',
		        	name: 'totalMem',
		        	fieldLabel: 'Total Mem',
		        	hidden:true,
		        },{
		        	xtype: 'displayfield',
		        	name: 'memAosUsage',
		        	fieldCls:'memAosUsageCls',
		        	fieldLabel: 'Mem Usage',
		        },
//		        {xtype:'displayfield',anchor: '75%',value:'<hr>'},{
//					xtype: 'fieldcontainer',
//					layout:'column',
//					items: [
//							{xtype:'displayfield',anchor: '45%',width:220,labelWidth: 180,fieldLabel: 'Port Type',name: 'portType1',maxLength:7,},
//							{xtype: 'displayfield',value:'',width:15},
//							{xtype:'displayfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Count',name: 'portCount1'},
//					        ]
//				},{
//					xtype: 'fieldcontainer',
//					layout:'column',
//					items: [
//							{xtype:'displayfield',anchor: '45%',width:220,labelWidth: 180,fieldLabel: 'Port Type',name: 'portType2',maxLength:7,},
//							{xtype: 'displayfield',value:'',width:15},
//							{xtype:'displayfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Count',name: 'portCount2'},
//					        ]
//				},{
//					xtype: 'fieldcontainer',
//					layout:'column',
//					items: [
//							{xtype:'displayfield',anchor: '45%',width:220,labelWidth: 180,fieldLabel: 'Port Type',name: 'portType3',maxLength:7,},
//							{xtype: 'displayfield',value:'',width:15},
//							{xtype:'displayfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Count',name: 'portCount3'},
//					        ]
//				},{
//					xtype: 'fieldcontainer',
//					layout:'column',
//					items: [
//							{xtype:'displayfield',anchor: '45%',width:220,labelWidth: 180,fieldLabel: 'Port Type',name: 'portType4',maxLength:7,},
//							{xtype: 'displayfield',value:'',width:15},
//							{xtype:'displayfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Count',name: 'portCount4'},
//					        ]
//				},{
//					xtype: 'fieldcontainer',
//					layout:'column',
//					items: [
//							{xtype:'displayfield',anchor: '45%',width:220,labelWidth: 180,fieldLabel: 'Port Type',name: 'portType5',maxLength:7,},
//							{xtype: 'displayfield',value:'',width:15},
//							{xtype:'displayfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Count',name: 'portCount5'},
//					        ]
//				},{
//					xtype: 'fieldcontainer',
//					layout:'column',
//					items: [
//							{xtype:'displayfield',anchor: '45%',width:220,labelWidth: 180,fieldLabel: 'Port Type',name: 'portType6',maxLength:7,},
//							{xtype: 'displayfield',value:'',width:15},
//							{xtype:'displayfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Count',name: 'portCount6'},
//					        ]
//				}
				]
			},
//			{
//
//	            xtype: 'fieldset',
//				layout:'anchor',
//				title:'Report Period Setting',
//				itemId:'report_info',
//				layout: 'anchor',
//				collapsible: true,
//				collapsed: true,
//				items:[{
//		        	xtype: 'numberfield',
//		        	name: 'alarmShortPeriod',
//		        	fieldLabel: 'Alarm Short Period(sec)',
//		        	anchor:'50%',minValue:0,maxValue:1000000000
//		        },{
//		        	xtype: 'numberfield',
//		        	name: 'alarmLongPeriod',
//		        	fieldLabel: 'Alarm Long Period(sec)',
//		        	anchor:'50%',minValue:0,maxValue:1000000000
//		        },{
//		        	xtype: 'numberfield',
//		        	name: 'statusShortPeriod',
//		        	fieldLabel: 'Status Short Period(sec)',
//		        	anchor:'50%',minValue:0,maxValue:1000000000
//		        },{
//		        	xtype: 'numberfield',
//		        	name: 'statusLongPeriod',
//		        	fieldLabel: 'Status Long Period(sec)',
//		        	anchor:'50%',minValue:0,maxValue:1000000000
//		        },{
//		        	xtype: 'numberfield',
//		        	name: 'staticsPeriod',
//		        	fieldLabel: 'Statics Period(sec)',
//		        	anchor:'50%',minValue:0,maxValue:1000000000
//		        }]
//			
//			},
			{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Provision Setting',
				itemId:'provison_info',
				ulan:'fsProvisionSetting',
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
//			listeners:{
//	    		activate: function(tab){
//	    			if(tab.forceRefresh==1){
//	    				tab.forceRefresh=0;
//	    				tab.store.load();
//	    			}
//	    		}
//	    	}
		});
		
		tgTab.addListener("afterlayout",function(){
			privilege.procPrivilege(tgTab);
			lanControll.setFieldSet(this);
		},this,{single:true});
		var commit={
	            text: 'Commit',
	            iconCls:'save',
	            flag:"domain_edit",
	            ulan:'btCommit',
	            disabled: true,
	            formBind: false,
	            handler: function() {
	        		var tmp = this.up('form').down('fieldcontainer[itemId=tg_alias]');
	        		if(tmp.getComponent('picture').flag==0)
	            	return;
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'neManager!updateNe.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		ip.commitSuccess(tgTab,tgTab.store);
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	            }
	        };
		var refresh={
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
	        			var store=tgTab.store;
	        			store.load();
	       	 		}
	       	 	}
       	};
		
		var reboot={	
        	text: 'Reboot',
        	iconCls:'reboot',
        	flag:"device_action",
        	ulan:'btReboot',
        	handler:function(){
				var store = this.up("form").store;
        		Ext.MessageBox.confirm(boxWarnning,boxReboot,function(e) {																			
						if( e == 'yes' ){
		        			var ids = store.getAt(0).get('uuid');
		        			var handler = Ext.getCmp('handler');
							var productId = store.getAt(0).get('productId');
							var alias = store.getAt(0).get('alias');
		        			if(handler==undefined){
		        				handler = Ext.create('app.util.Handler',{});
		        			}
		        			handler.RebootHandler(ids,productId,alias);
						}
        		});
        	}
        };
        var restore={
        	text: 'Restore Password',
        	iconCls:'restore_pwd',
        	flag:"device_action",
        	ulan:'btRestorePwd',
        	handler:function(){
        		var store = this.up("form").store;
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
        };
        
        var remote={
       		 xtype:'button',
       		 text:'Remote Web',
       		 ulan:'btRemoteWeb',
       		 iconCls: 'domain-group',
       		flag:"domain_action",
//       		 menu:{
//	       		 xtype:'menu',			       		 
//	       		 items:[{
//	       			text:'New Tab',
//	       			ulan:'miNewTab',
//	       			handler:function(){
//       		 			var sn=tgTab.getForm().findField('productSnStr').getValue();
//       		 			var uuid=tgTab.getForm().findField('uuid').getValue();
//       		 			var domainUuid = tgTab.getForm().findField('domainUuid').getValue();
//       		 			var panel = this.up('form');
//       		 			var id = panel.id+'_remote';
//       		 				       		 			
//       		 			Ext.Ajax.request({
//	                		url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid,
//	                		method:'POST',
//	                		callback: function (options, success, response) {
//		             var obj=Ext.JSON.decode(response.responseText);			
//		               if(obj['success']){
//		            	    var url=obj['url'];				            	   
//		            	  	var remoteTab=panel.up('panel');
//		            	  	var tab = Ext.getCmp(id);
//		            	  	if(tab!=undefined){
//		            	  		tab.destroy();
//		            	  	}
//    	  	          tab=remoteTab.add({
//    	  	                 title:sn,
//            	            	  	id:id,
//            					    closable: true,
//            					    autoScroll: true,
//            					    layout:'fit',
//            					    items :[{
//            					        itemId:'remote_web',
//            					        layout:'fit',
//            							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
//            						}]
//            					});
//		            	  	tab.show();	
//		               }else{
//		            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
//		               }
//		               }
//		                        })
//       		 			
//	       		 	}
//	       		 },{
//	       			text:'New Window',
//	       			ulan:'miNewWindow',
	       			handler:function(){
       		 			var sn=tgTab.getForm().findField('productSnStr').getValue();
       		 			var uuid=tgTab.getForm().findField('uuid').getValue();
       		 			var domainUuid = tgTab.getForm().findField('domainUuid').getValue();
       		 					       		 			
       		 			Ext.Ajax.request({
	                		url:'remoteManager!createRemote.action?sn='+sn+"&uuid="+uuid+"&domainUuid="+domainUuid,
	                		method:'POST',
	                		callback: function (options, success, response) {
		             var obj=Ext.JSON.decode(response.responseText);			
		               if(obj['success']){
              	   				   var url=obj['url'];
//              					    window.open(url);
              	   				openChildWin(url);
			               }else{
			            	   Ext.MessageBox.alert(boxWarnning,boxErrorRemote);
		               }
		               }
		                        })
       		 		}
//	       		 	
//	       		 }], 
//       	 	 }
       	 };
		
        var upgrade={ 
        		 xtype:'button',
	       		 text: 'Upgrade',
	       		 ulan:'btUpgrade',
	       		 iconCls: 'provision-small',
	       		 flag:"device_action",
	       		 listeners:{
	       			 click:function(){
						var ids=tgTab.getForm().findField('uuid').getValue();
						var maxVersion=tgTab.getForm().findField('packageVersion').getValue();
						var store = tgTab.store;
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
						var alias = store.getAt(0).get('alias');
						var upgradeNe = Ext.getCmp('maintenanceUpgradeNe');
						if(upgradeNe==undefined && upgradeNe==null){
							upgradeNe=Ext.create('app.view.operation.domain.roamzone.site.UpgradeNe',{});
							lanControll.setLan(upgradeNe);
						}
						var domainUuid = tgTab.getForm().findField("domainUuid").getValue();
	        			var domainInfoStore=Ext.create('app.store.operation.domain.DomainInfoStore',{});
	        			domainInfoStore.on('beforeload', function (domainInfoStore, options) {
	        		        var params = { uuid:domainUuid};
	        		        Ext.apply(domainInfoStore.proxy.extraParams, params);
	        		    });
	        			var vendorId=store.getAt(0).get('vendorId');;
	        			domainInfoStore.on('load',function(){
//	        				vendorId=domainInfoStore.getAt(0).get('vendorId');
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
									if(vendorId==101){
										vendorId=01;
									}else if(vendorId==102){
										vendorId=02;
									}
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
          };		
		
		var tbs = [];
		
		if(!maintenance){
			tbs.push(commit);
			tbs.push('-');
			ip.createEditButton(tgTab,tgTab.store,tbs);
			tbs[tbs.length-2].flag = "domain_edit";
			tbs[tbs.length-2].ulan='btEdit';
		}else{
			tbs.push(upgrade);
			tbs.push('-');
			tbs.push(reboot);
			tbs.push('-');
			tbs.push(restore);
			tbs.push('-');
		}
		tbs.push(remote);
		tbs.push('-');
		tbs.push(refresh);
		
		var di=[{
	        xtype: 'toolbar',
	        items: tbs
	    }];
		tgTab.addDocked(di);

		var tab = tgTab;
		var store = tab.store;
		var tgLoadMask=new Ext.LoadMask(tab, {
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
			var type=r.get('productId');
			var sn=r.get('productSnStr');
			var pt=tab.getForm().findField('productId');
			var ps=tab.getForm().findField('productSnStr');
			pt.setValue('TG');
			ps.setValue(sn);
			
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));

			
			var ntpStatus=parseInt(r.get('ntpStatus'));
			var autoRebootFlag=parseInt(r.get('autoRebootFlag'));
			var switchChipStatus=parseInt(r.get('switchChipStatus'));

//			var portType1=parseInt(r.get('portType1'));
//			var portType2=parseInt(r.get('portType2'));
//			var portType3=parseInt(r.get('portType3'));
//			var portType4=parseInt(r.get('portType4'));
//			var portType5=parseInt(r.get('portType5'));
//			var portType6=parseInt(r.get('portType6'));

			
			var uresult=parseInt(r.get('lastUpgradeResult'));
			var uflag=parseInt(r.get('upgradeStatus'));
			        				
			
			var opr=tab.getForm().findField('oprStatus');
			var run=tab.getForm().findField('runStatus');
	
			var ntpStatusField=tab.getForm().findField('ntpStatus');
			var autoRebootFlagField=tab.getForm().findField('autoRebootFlag');
			var switchChipStatusField=tab.getForm().findField('switchChipStatus');

//			var portType1Field=tab.getForm().findField('portType1');
//			var portType2Field=tab.getForm().findField('portType2');
//			var portType3Field=tab.getForm().findField('portType3');
//			var portType4Field=tab.getForm().findField('portType4');
//			var portType5Field=tab.getForm().findField('portType5');
//			var portType6Field=tab.getForm().findField('portType6');
//			
//			portType1Field.setValue(rs.portType(portType1));
//			portType2Field.setValue(rs.portType(portType2));
//			portType3Field.setValue(rs.portType(portType3));
//			portType4Field.setValue(rs.portType(portType4));
//			portType5Field.setValue(rs.portType(portType5));
//			portType6Field.setValue(rs.portType(portType6));
		

			ntpStatusField.setValue(rs.ntpStatus(ntpStatus));
			autoRebootFlagField.setValue(rs.autoRebootFlag(autoRebootFlag));
			switchChipStatusField.setValue(rs.switchChipStatus(switchChipStatus));
		
			var lastUpgradeResult=tab.getForm().findField('lastUpgradeResult');
			var upgradeFlag=tab.getForm().findField('upgradeStatus');
			var vendorId=parseInt(r.get('vendorId'));
			var vendor=tab.getForm().findField('vendorId');
			
			vendor.setValue(rs.vendor(vendorId));
			opr.setValue(rs.oprStatus(oprStatus));    				  
			run.setValue(rs.runStatus(runStatus));    				  
			lastUpgradeResult.setValue(rs.lastUpgradeResult(uresult));
			upgradeFlag.setValue(rs.upgradeFlag(uflag));

			removeCSSRule(styleSheet,'.avgCpu5Cls::before');
			removeCSSRule(styleSheet,'.curCpuCls::before');
			removeCSSRule(styleSheet,'.avgCpu600Cls::before');
			removeCSSRule(styleSheet,'.avgCpu60Cls::before');
			removeCSSRule(styleSheet,'.memAosUsageCls::before');
			setPseudo1(styleSheet,'.avgCpu5Cls:before',r.get('avgCpu5'));
			setPseudo1(styleSheet,'.curCpuCls:before',r.get('curCpu'));
			setPseudo1(styleSheet,'.avgCpu600Cls:before',r.get('avgCpu600'));
			setPseudo1(styleSheet,'.avgCpu60Cls:before',r.get('avgCpu60'));
			setPseudo1(styleSheet,'.memAosUsageCls:before',r.get('memAosUsage'));
			
			Ext.resumeLayouts(true);
		});
		var comboxStore =Ext.create("app.store.util.ComboxStore",{});
		tgTab.comboxStore=comboxStore;
		comboxStore.on('load',function(){
			var store0 = tab.getForm().findField('siteUuid').store;      				
			store0.removeAll();       				
			for(var i=0; i<comboxStore.getCount(); i++){
				if(comboxStore.getAt(i).get('type')=='site'){
					store0.add(comboxStore.getAt(i));
				}
			}
			
			store.load();
		})
		
		
		ip.initOtiose(1,tgTab);
		
		var moduleId=this.moduleId;
		var tgpListId=moduleId+"_tgpInNe";
		var tgpInNe=Ext.getCmp(tgpListId);
		if(!tgpInNe){
			tgpInNe=Ext.create('app.view.operation.domain.roamzone.site.nes.TgPortInNe',{
				title:tiPortList,
				id:tgpListId,
				moduleId:moduleId,
			});
			tgpInNe.addListener("afterlayout",function(){
				privilege.procPrivilege(tgpInNe);
			},this,{single:true});			
		}
		tgpInNe.store.on('beforeload',function(){
			tgpInNe.store.loadFlag = false;
		})
		var tgpMapId=moduleId+"_tgpTab";
		var tgpTab=Ext.getCmp(tgpMapId);
		if(!tgpTab){
			tgpTab=Ext.create('app.view.operation.domain.roamzone.site.nes.TgPortTab',{
				title:tiPortMap,
				id:tgpMapId,
				moduleId:moduleId,
				maintenance:maintenance,
				store:tgpInNe.store
				
			});
			tgpTab.addListener("afterlayout",function(){
				privilege.procPrivilege(tgpTab);
			},this,{single:true});
		}

		if(this.moduleId==undefined || this.moduleId=='config'){
			this.items=[{
		       	xtype: 'tabpanel',
		       	items:[tgTab,tgpInNe],
		       	listeners:{			
					tabchange:function(tabPanel,newTab,oldTab,obj){
						controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
					}
				}
		       
			}];
		}else{
//			var tab4 = Ext.create("app.view.module.AlarmPanel",{
//				createDesc:'current',
//				nodeDesc:'ne',
//				id:'tgCurrentAlarmPanel'
//			});
//			tab4.addListener("afterlayout",function(){
//				privilege.procPrivilege(tab4);
//			},this,{single:true});
//			var tab3 = Ext.create("app.view.module.AlarmLogPanel",{
//				createDesc:'history',
//				nodeDesc:'ne',
//				id:'tgHistoryAlarmPanel'
//			});
//			tab3.addListener("afterlayout",function(){
//				privilege.procPrivilege(tab3);
//			},this,{single:true});
			this.items=[{
		       	xtype: 'tabpanel',
		       	items:[tgTab,tgpInNe],
		       	listeners:{			
					tabchange:function(tabPanel,newTab,oldTab,obj){
						controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
					}
				}
		       
			}];
		}
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});