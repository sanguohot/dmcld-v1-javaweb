Ext.define('app.view.operation.domain.roamzone.RoamzonePanel',{
	extend:'Ext.panel.Panel',
//	id:'roamzonePanel',
	layout:'fit',
	hidden:true,
	border:false,
	store:null,
	initComponent: function(){
		var store = Ext.create('app.store.operation.domain.roamzone.ZoneInfoStore',{});
		this.store = store;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var	siteInZoneStore = Ext.create('app.store.operation.domain.roamzone.SiteInZoneStore', {});
		siteInZoneStore.on('beforeload',function(){
			siteInZoneStore.loadFlag = false;
		});		

		var zoneName;
		if(maintenance){
			zoneName = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'name',
				fieldLabel: 'Name',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}else{
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			zoneName = generalObj.createName('zone_name'
					,75,25,'name','Name','#DFE9F6','zoneManager!checkZone.action',store);
			store.on('load',function(){
    			var picture = zoneName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
		}
		
		var roamzoneTab2=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiZoneInfo'),
//			id:'roamzoneTab2',
			treeName:'',
			store:store,
			border:false,
			itemId:'roamForm',
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        	id:'zoneUuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'defaultFlag'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid',
	        	id:'zoneDomainUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'zone_basic_info',
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
			        items: [zoneName,{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:3,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 3,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/zone.png',
			    	
			        },{
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        }, {
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            fieldLabel: 'Description',
			            labelWidth: 180,
			            height:80,
			            rows:3,
			        }]
			    }]
			}, {
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'zone_detail_info',
				height:200,
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'combo',
		            name: 'policyUuid',
		            mode : 'local',
		            editable:false,
		            hidden:rs.dmCloudMode(),
		            fieldLabel: 'Default Policy',
		            displayField : 'name',
					valueField : 'uuid',
					queryMode : 'local',
					store:Ext.create("app.store.util.ComboxStore",{}),
					valueNotFoundText :""
		        },{
		            name: 'localTimeZone',
		            ulan:'timeZone',
		            fieldLabel: 'TimeZone',
		            xtype: 'combo',
					mode : 'local',
					editable:false,
					displayField : 'name',
					valueField : 'value',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'value' ],
						data : [ {
							name : '(GMT -12:00) Eniwetok, Kwajalein',
							value : 720
						}, {
							name : '(GMT -11:00) Midway Island, Samoa',
							value : 660
						},{
							name : '(GMT -10:00) Hawaii',
							value : 600
						},{
							name : '(GMT -9:00) Alaska',
							value : 540
						},{
							name : '(GMT -8:00) Pacific Time (US & Canada)',
							value : 480
						},{
							name : '(GMT -7:00) Mountain Time (US & Canada)',
							value : 420
						},{
							name : '(GMT -6:00) Central Time (US & Canada), Mexico City',
							value : 360
						},{
							name : '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
							value : 300
						},{
							name : '(GMT -4:30) Caracas',
							value : 270
						},{
							name : '(GMT -4:00) Atlantic Time (Canada), La Paz, Santiago',
							value : 240
						},{
							name : '(GMT -3:30) Newfoundland',
							value : 210
						},{
							name : '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
							value : 180
						},{
							name : '(GMT -2:00) Mid-Atlantic',
							value : 120
						},{
							name : '(GMT -1:00 hour) Azores, Cape Verde Islands',
							value : 60
						},{
							name : '(GMT) Western Europe Time, London, Lisbon, Casablanca',
							value : 0
						},{
							name : '(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
							value :-60
						},{
							name : '(GMT +2:00) Kaliningrad, South Africa, Cairo',
							value : -120
						},{
							name : '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
							value : -180
						},{
							name : '(GMT +3:30) Tehran',
							value : -210
						},{
							name : '(GMT +4:00) Abu Dhabi, Muscat, Yerevan, Baku, Tbilisi',
							value : -240
						},{
							name : '(GMT +4:30) Kabul',
							value : -270
						},{
							name : '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
							value : -300
						},{
							name : '(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi',
							value : -330
						},{
							name : '(GMT +5:45) Kathmandu',
							value : -345
						},{
							name : '(GMT +6:00) Almaty, Dhaka, Colombo',
							value : -360
						},{
							name : '(GMT +6:30) Yangon, Cocos Islands',
							value : -390
						},{
							name : '(GMT +7:00) Bangkok, Hanoi, Jakarta',
							value : -420
						},{
							name : '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
							value : -480
						},{
							name : '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
							value : -540
						},{
							name : '(GMT +9:30) Adelaide, Darwin',
							value : -570
						},{
							name : '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
							value : -600
						},{
							name : '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
							value : -660
						},{
							name : '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
							value : -720
						}]
					}),
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
			                var form = this.up('form').getForm();
			                var tmp = this.up('form').down('fieldcontainer[itemId=zone_name]');
		            		if(tmp.getComponent('picture').flag==0)
			                	return;
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'zoneManager!updateZone.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	 var obj=Ext.JSON.decode(response.responseText);			
							                    if(obj['success']){
							        	  	ip.commitSuccess(roamzoneTab2,roamzoneTab2.store);
				                    	}else{
				                    		ip.commitFailure(roamzoneTab2);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(roamzoneTab2,roamzoneTab2.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    		}
	    		
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
//			listeners:{
//				afterlayout:{
//	    			fn:function(){
//	    				this.createTbar();
//	    				
//	    			},
//	    			single:true
//	    		}
//	    	},
		});
		roamzoneTab2.addListener("afterlayout",function(){
			privilege.procPrivilege(roamzoneTab2);
		},this,{single:true});
		roamzoneTab2.createTbar();
//		privilege.procPrivilege(roamzoneTab2);
		
		var tab = roamzoneTab2;
		var zoneLoadMask=new Ext.LoadMask(tab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
       	store.on('load', function(){
			var r=store.getAt(0);
			tab.loadRecord(r);
       	});
		var store_policy = tab.getForm().findField('policyUuid').store;
		var comboxStore=Ext.create('app.store.util.ComboxStore');
		comboxStore.on('beforeload',function(){
			comboxStore.loadFlag = false;
		})
		tab.comboxStore = comboxStore;
		roamzoneTab2.comboxStore = comboxStore;
		comboxStore.removeAll();		
		comboxStore.on('load',function(){
			store_policy.removeAll();
			store_policy.add({uuid:0,name:'-SELECT-'});
			for(var i=0;i<comboxStore.getCount();i++){
				if(comboxStore.getAt(i).get('type')=='policy'){
					store_policy.add(comboxStore.getAt(i));
				}
			}
			
			store.load();
		})
		
		ip.initOtiose(1,roamzoneTab2);
		
		var id = 'siteInZoneTab';
		if(maintenance){
			id = 'maintenanceSiteInZoneTab';
		}
		var roamzoneTab1=Ext.create('app.view.operation.domain.roamzone.site.SiteListTab',{
			id:id,
			title:lanControll.getLanValue('tiSiteList')
		});
		roamzoneTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(roamzoneTab1);
		},this,{single:true});
		
		var id = 'nesInZoneTab';
		if(maintenance){
			id = 'maintenanceNesInZoneTab';
		}
		var nesInZoneTab=Ext.create('app.view.operation.domain.NesInDomainTab',{
			title:tiDeviceList,
			id:id
		});
		nesInZoneTab.addListener("afterlayout",function(){
			privilege.procPrivilege(nesInZoneTab);
		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[roamzoneTab2,roamzoneTab1,nesInZoneTab],
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