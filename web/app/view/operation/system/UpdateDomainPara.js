Ext.define("app.view.operation.system.UpdateDomainPara", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : 650,
	closeAction: 'hide',
    layout: 'fit',
    resizable: true,
    modal: true,
    id:'updateDomainPara',
    closable:false,
    initComponent:function(){
		var sysStore = Ext.create('app.store.util.ComboxStore',{});
		var nodeStore = Ext.create('app.store.util.ComboxStore',{});
		var cloudStore = Ext.create('app.store.util.ComboxStore',{});
		
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        labelWidth:180,
		        anchor: '100%',
		    },
		    items: [{
		    	xtype:'hiddenfield',
		    	name:'name'//first name of these domains
		    },{
				name : 'specCloudUuid',
				hidden:true,
				xtype: 'combo',
				mode: 'local',
				fieldLabel: 'Spec Cloud',
				ulan:'specCloud',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				store:cloudStore,
				editable:false,
				value:-1,
				listeners :{
	    			change:function(cmp){
			    		if(cmp.getValue()==-1){
	    					return;
	    				}
			    		if(!cmp.isVisible()){
			    			return;
			    		}
			    		var firstLoad=form.up('panel').firstLoad;
			    		if(firstLoad){
			    			form.up('panel').firstLoad=false;
			    			return;
			    		}
	    				var comboxStore = Ext.create("app.store.util.ComboxStore",{});
	    				var specSysUuid=this.up('form').getForm().findField("specSysUuid");
	    				var specSysUuidStore = specSysUuid.getStore();
	    				specCloudUuid=cmp.getValue();
	    				var params = {params:{cloudUuid:specCloudUuid,types:'server'}};
	    				comboxStore.on('load',function(){
	    					specSysUuidStore.removeAll();
	    					specSysUuidStore.add({uuid:-1,name:'-SELECT-'});
	    					specSysUuidStore.add({uuid:0,name:'NULL'});
	    					for(var i=0; i<comboxStore.getCount(); i++){
	    						if(comboxStore.getAt(i).get('type')=='server'){
	    							specSysUuidStore.add(comboxStore.getAt(i));
	    						}
	    					}
	    					specSysUuid.setValue(0);
	    						
	    				},this,{single: true})
	    				comboxStore.load(params);
	    			}
	    		}
			},{
				name : 'specSysUuid',
				xtype: 'combo',
				mode: 'local',
				fieldLabel: 'Specific Server',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				store:sysStore,
				editable:false,
				value:-1,
			},rs.createSysLockedFlag(),{
		        xtype: 'combo',
		        name: 'vendorId',
		        fieldLabel: 'Vendor',
				mode : 'local',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				editable:false,
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : '-SELECT-',
						value : -1
					},{
						name : 'NULL',
						value : 0
					},{
						name : 'UCSPEED',
						value : 1
					}, {
						name : 'DINSTAR',
						value : 2
					}, {
						name : 'CHANGYOU',
						value : 3
					}]
				}),
				value:-1
			},{
		        xtype: 'combo',
		        name: 'productId',
		        fieldLabel: 'Product Type',
				mode : 'local',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				editable:false,
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : '-SELECT-',
						value : -1
					},{
						name : 'SIM Cloud',
						value : 0
					},{
						name : 'DM Cloud',
						value : 1
					}]
				}),
				value:-1
			},{
		    	xtype:'hiddenfield',
		    	name:'ids',
		    },rs.createAdminStatus(null,[0,1,2],null),{    	
		    	xtype:'textfield',
		    	name:'alarmMax',
		    	fieldLabel:'Alarm Max',
		    },{    	
		    	name:'pm15mMax',
		    	fieldLabel:'PM 15M Max',
	
		        xtype: 'combo',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'value' ],
				data : [ {
					name : '-SELECT-',
					value : 0
				},{
					name : lanControll.getLanValue('pm15Max_'+288),
					value : 288
				}, {
					name : lanControll.getLanValue('pm15Max_'+672),
					value : 672
				}, {
					name : lanControll.getLanValue('pm15Max_'+1440),
					value : 1440 
				}, {
					name : lanControll.getLanValue('pm15Max_'+2880),
					value : 2880
				}  ]
			}),
			value:0
		},{
	    	name:'pm24hMax',
	    	fieldLabel:'PM 24H Max',
	    	
	    	xtype: 'combo',
			mode : 'local',
			editable:false,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'value' ],
				data : [ {
					name : '-SELECT-',
					value : 0
				}, {
					name : lanControll.getLanValue('pm24Max_'+7),
					value : 7
				}, {
					name : lanControll.getLanValue('pm24Max_'+30),
					value : 30 
				}, {
					name : lanControll.getLanValue('pm24Max_'+90),
					value : 90
				}, {
					name : lanControll.getLanValue('pm24Max_'+180),
					value : 180
				}, {
					name : lanControll.getLanValue('pm24Max_'+365),
					value : 365
				}]
			}),
			value:0
		},{
	    	xtype:'textfield',
	    	name:'pmCallMax',
	    	fieldLabel:'PM Call Max',
		},{
	    	xtype:'textfield',
	    	name:'pmUssdMax',
	    	fieldLabel:'PM USSD Max',
		},{
	    	xtype:'textfield',
	    	name:'pmSmsMax',
	    	fieldLabel:'PM SMS Max',
		},{
	    	xtype:'textfield',
	    	name:'logUserMax',
	    	fieldLabel:'Log User Max',
		},{
	    	xtype:'textfield',
	    	name:'snumberMax',
	    	fieldLabel:'Static Num Max',
		},{
	    	xtype:'textfield',
	    	name:'dnumberMax',
	    	fieldLabel:'Dynamic Num Max',
		}],
	
		    buttons: [{
		        text: 'Cancel',
		        ulan:'btCancel',
		        handler: function() {
		            this.up('form').getForm().reset();
		            this.up('window').hide();
		        }
		    }, {
		        text: 'Commit',
		        ulan:'btCommit',
		        handler: function() {
			    	var obj2 = this.up('form');
		            if (this.up('form').getForm().isValid()) {
		            		var vendorId=Ext.get('vendorId').value;
		            		
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'domainListManager!updateTblDomainPmHead.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
	//			                    		Ext.getCmp('fDomainTab').getStore().load();
				                    		obj2.store.load();
				                    	}else{
				                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
				                    	}
			                    	}
			                	});
			                }
			                this.up('form').getForm().reset();
			                this.up('window').hide();
			            }
		            }
		        
		    }]
		});
		this.items = [form];
		this.callParent();
	}
});

