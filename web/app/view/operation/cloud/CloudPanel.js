Ext.define('app.view.operation.cloud.CloudPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	initComponent: function(){
		var store = Ext.create('app.store.operation.cloud.CloudInfoStore',{});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		this.store = store;
		store.on('beforeload',function(){
			store.loadFlag = false;
		})
		var cloudUuid=this.treeName;
		var cloudTab1=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiCloudInfo'),
			store:store,
			border:false,
			forceRefresh:0,
			bodyStyle: {
			background: '#DFE9F6',
			},
			url:'cloudManager!updateCloud.action',
		    bodyPadding: 5,
		    treeName:'',
		    getTreeName:function(){
				return this.treeName;
			},
	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },
	        items:[{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'cloud_basic_info',
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
						name : 'name',
						fieldLabel: 'Name',
						labelWidth: 180,
						maxLength:31,
						anchor:'75%'
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
			    		src:Ext.get('resources').value+'/images/panel_logo/node_list.png',
			    	
			        },{
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        },{
			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2],adminSizeObj),{
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
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            labelWidth: 180,
			            height:50,
			            rows:1,
			            fieldLabel: 'Description',
			        }]
			    }]
			},{
	        	xtype: 'fieldset',
				layout:'anchor',
				title:'Alarm Push',
				ulan:'fsAlarmPush',
				itemId:'basic',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
					xtype:'combo',
					fieldLabel:'Domain',
					anchor: '45%',
					name:'manDomainUuid',
					ulan:'manDomainName',
//					comboxStore:Ext.create("app.store.util.ComboxStore",{}),
					store:Ext.create("app.store.util.ComboxStore",{}),
					valueField:'uuid',
					displayField:'name',
					queryMode : 'local',
//				},{
//					xtype:'textfield',
//					fieldLabel:'SMTP Address',
//					anchor: '45%',
//					name:'smtpServer',
//					value:''
//				},{
//					xtype:'textfield',
//					fieldLabel:'SMTP Port',
//					anchor: '45%',
//					name:'smtpPort',
//					value:''
//				},{
//					xtype:'textfield',
//					fieldLabel:'Account',
//					name:'smtpUserName',
//					anchor: '45%',
//					value:''
//				},{
//					xtype:'textfield',
//					fieldLabel:'Password',
//					name:'smtpPassWord',
//					inputType:'password',
//					anchor: '45%',
//					value:''
//				},{
//					xtype:'textfield',
//					fieldLabel:'Mail from',
//					name:'mailFrom',
//					anchor: '45%',
//					value:''
				}]
			}],
	        maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			
	    			var commit = Ext.create('Ext.button.Button',{
			            text: 'Commit',
			            iconCls:'save',
			            flag:"super_edit",
			            ulan:'btCommit',
			            disabled: true,
			            formBind: false,
			            handler: function() {
	    					var store = this.up('form').store;
	    					var name = store.getAt(0).get('name');
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'cloudManager!updateCloud.action?name='+name,
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	if(success){
				                    		ip.commitSuccess(cloudTab1,cloudTab1.store);
//				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    	}else{
				                    		ip.commitFailure(cloudTab1);
//				                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(cloudTab1,cloudTab1.store,tbar);
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
	    	}
		});
		cloudTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(cloudTab1);
		},this,{single:true});
		
		ip.initOtiose(1,cloudTab1);
		ruleLoadMask=new Ext.LoadMask(cloudTab1, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load',function(){
			var r=store.getAt(0);
			cloudTab1.loadRecord(r);
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=cloudTab1.getForm().findField('oprStatus');
			var run=cloudTab1.getForm().findField('runStatus');  
			opr.setValue(rs.oprStatus(oprStatus));  
			run.setValue(rs.runStatus(runStatus));
		});
		
		var comboxStore = Ext.create("app.store.util.ComboxStore",{});
		var domainUuid = cloudTab1.down('combo[name=manDomainUuid]');
		domainUuid.comboxStore = comboxStore;
		cloudTab1.comboxStore = comboxStore;
		var domainUuidStore = domainUuid.store;
		comboxStore.on('load',function(){
//			comboxStore.filter("type","locksim");
			domainUuidStore.removeAll();
			for(var i=0; i<comboxStore.getCount(); i++){
				if(comboxStore.getAt(i).get('type')=='domain'){
					domainUuidStore.add(comboxStore.getAt(i));
				}
			}
			store.load();
		})
		
		
		var id = 'sysInCloudPanel';
		if(maintenance){
			id = 'maintenanceSysInCloudPanel';
		}
		var sysListPanel=Ext.create('app.view.operation.cloud.SysListPanel',{
			title:tiSysList,
			border:false,
			id:id,
		});
		sysListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(sysListPanel);
		},this,{single:true});
		
		var id = 'domainInCloudPanel';
		if(maintenance){
			id = 'maintenanceDomainInCloudPanel';
		}
		var domainTab=Ext.create('app.view.operation.domain.DomainListPanel',{
			title:tiDomainList,
			border:false,
			id:id
		});
		domainTab.addListener("afterlayout",function(){
			privilege.procPrivilege(domainTab);
		},this,{single:true});
		
		var id = 'nesInCloudTab';
		if(maintenance){
			id = 'maintenanceNesInCloudTab';
		}
		var systemTab3=Ext.create('app.view.operation.NesInCloudTab',{
			title:tiDeviceList,
			border:false,
			id:id
		});
		systemTab3.addListener("afterlayout",function(){
			privilege.procPrivilege(systemTab3);
		},this,{single:true});
		
		var id = 'neNasInCloudTab';
		if(maintenance){
			id = 'maintenanceNeNasInCloudTab';
		}
//		var systemTab4=Ext.create('app.view.operation.NeNasInCloudTab',{
//			title:lanControll.getLanValue('tiUnknownDeviceList'),
//			border:false,
//			id:id
//		});
//		systemTab4.addListener("afterlayout",function(){
//			privilege.procPrivilege(systemTab4);
//		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[cloudTab1,sysListPanel,domainTab,systemTab3],
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