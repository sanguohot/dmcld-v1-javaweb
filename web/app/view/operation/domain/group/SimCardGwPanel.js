Ext.define('app.view.operation.domain.group.SimCardGwPanel',{
	extend:'Ext.panel.Panel',
	id:'simCardGwPanel',
	layout:'fit',
//	autoScroll:true,
	border:false,
	initComponent: function(){
		
		var simCardTab=Ext.create('Ext.form.Panel',{
			title:'',
			id:'simCardGwTab',
			treeName:'',
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
			
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 130,
	            anchor: '75%'
	        },
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'displayfield',
	        	name:'imsi',
	        	fieldLabel:'IMSI'
	        },{
	            xtype: 'textfield',
	            name: 'alias',
	            fieldLabel: 'SIM Card Alias',
	        },{
	            xtype: 'combo',
	            name: 'grpUuid',
	            mode : 'local',
	            editable:false,
	            fieldLabel: 'Group',
	            displayField : 'name',
				valueField : 'uuid',
				queryMode : 'local',
				store:Ext.create("app.store.util.ComboxStore",{}),
	        },{
	            xtype: 'combo',
	            name: 'adminStatus',
	            fieldLabel: 'Admin Status',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : 'ENABLED',
						statusId : 1
					}, {
						name : 'DISABLED',
						statusId : 2
					} , {
						name : 'LOCKED',
						statusId : 5
					} , {
			        	name : 'NO_BALANCE',
			        	statusId : 6
					} ]
				}),
				
	        },{
	            xtype: 'displayfield',
	            name: 'oprStatus',
//	            id:'cloudOprStatus',
	            fieldLabel: 'Opr Status',
	        },{
	            xtype: 'displayfield',
	            name: 'runStatus',
	            fieldLabel: 'Run Status',
	        },{
	            xtype: 'textfield',
	            name: 'origZoneUuid',
	            fieldLabel: 'Original Zone',
	        },{
	            xtype: 'displayfield',
	            name: 'lastSiteUuid',
	            fieldLabel: 'Last Site',
	        },{

	           name: 'simbankUuid',
			   xtype: 'fieldcontainer',
			   layout:'hbox',
			   fieldLabel: 'SIMBank Port',
			   items: [
						{xtype:'hiddenfield',  name: 'bkpUuid'},
						{xtype: 'button',text:'>>To SIMBank Port',id:'toSimBankGwPort',
							
							listeners:{
								click:function(but,even,eOpts){
				        			var ss=Ext.create('app.util.SetBkpStore',{});
				        			var bkpUuid=simCardTab.getForm().findField('bkpUuid').getValue();
				        			if(bkpUuid<1){
				        				Ext.MessageBox.alert('Warnning','This DWG Port not bind SIMBank Port')
				        			}else{
				        				var bkTab=Ext.getCmp('simCardGwPanel');
				        				
				        				var bkpInfoTab=bkTab.up('panel').up('panel').items.get(3);
				        				var isOpen=false;
				        				
				        				for(var i=0;i<10;i++){
				        					bkpInfoTab=bkTab.up('panel').up('panel').items.get(i);
//				        					alert(bkpInfoTab+" i="+i);
				        					if(bkpInfoTab && bkpInfoTab.name=='linkBkp'){
												isOpen=true;
												break;
											}else if(!bkpInfoTab){
												break;
											}
				        				}
				        				
										if(!isOpen){
						     				
						     				var bkpInfoPanel=Ext.getCmp('linkBkpGwPanel');
						     				
						     				if(bkpInfoPanel==undefined || bkpInfoPanel=='undefined'){
						     					bkpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.LinkBkpGwPanel',{});
						     				}
						     				var linkDwgGwPort=Ext.getCmp('linkDwgGwPort');
						     				var linkSimCardGw=Ext.getCmp('linkSimCardGw');
						     				
						     				ss.setBkpStoreAndCreateTab(bkpUuid,bkpInfoPanel,bkTab.up('panel').up('panel'),linkDwgGwPort,linkSimCardGw);
						        			
						     			}else{
					     					var bkpInfoPanel=Ext.getCmp('linkBkpGwPanel');
					     					if(bkpInfoPanel){
					     						bkpInfoPanel.setVisible(true);
					     					}
					     					var linkDwgGwPort=Ext.getCmp('linkDwgGwPort');
						     				var linkSimCardGw=Ext.getCmp('linkSimCardGw');
					     					ss.setBkpStore(bkpUuid,bkpInfoPanel,bkpInfoTab,linkDwgGwPort,linkSimCardGw);
						        			
						        			bkpInfoTab.show();
						     			}
										
				        		
				        			}
				        		}
							
							}
						}
					]
				
	        },{
	            xtype: 'displayfield',
	            name: 'iccId',
	            fieldLabel: 'ICC',
	        },{
	            xtype: 'displayfield',
	            name: 'bindImei',
	            fieldLabel: 'Bind IMEI',
	        },{
	            xtype: 'displayfield',
	            name: 'smsc',
	            fieldLabel: 'SMSC',
	        },{
	            xtype: 'displayfield',
	            name: 'operator',
	            fieldLabel: 'Operator',
	        },{
	            xtype: 'displayfield',
	            name: 'mobile',
	            fieldLabel: 'Mobile',
	        },{
	            xtype: 'displayfield',
	            name: 'prepaidFee',
	            fieldLabel: 'Prepaid Fee',
	        },{
	            xtype: 'displayfield',
	            name: 'totalCost',
	            fieldLabel: 'Total Cost',
	        },{
	            xtype: 'displayfield',
	            name: 'curBalance',
	            fieldLabel: 'Current Balance',
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
	            xtype: 'displayfield',
	            name: 'regErrorCount',
	            fieldLabel: 'Register Error Count',
	        },{
	            xtype: 'displayfield',
	            name: 'deactiveReason',
	            fieldLabel: 'Deactive Reason',
	        }], 
	        dockedItems: [ {
	            xtype: 'toolbar',
	            items: [{
		            text: 'Commit',
		            iconCls:'save',
		            flag:"edit",
		            formBind: true, //only enabled once the form is valid
		            disabled: true,
		            handler: function() {
		                var form = this.up('form').getForm();
		                if (form.isValid()) {
		                	Ext.Ajax.request({
		                		url:'simCardManager!updateSimCardByUuid.action',
		                		method:'POST',
		                		params:form.getValues(),
		                		callback: function (options, success, response) {
								var obj=Ext.JSON.decode(response.responseText);			
									if(obj['success']){
										Ext.MessageBox.alert('success','commit success!');
									}else{
										Ext.MessageBox.alert('failure','commit failure!');
									}
								}
		                	});
		                }
		            }
		        },'-',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		 tooltip:'Refresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
		        			var ssc=Ext.create('app.util.SetSimCardStore',{});
		        			var uuid=Ext.getCmp('simCardGwTab').getForm().findField('uuid').getValue();
		        			var simCardPanel=Ext.getCmp('simCardGwPanel');
		        			var simCardInfoTab=simCardPanel.up('panel');
		        			var toSimBankPort=Ext.getCmp('toSimBankGwPort');
		        			
		        			uuid=parseInt(uuid);
		        			ssc.setSimCardStore(uuid,simCardPanel,simCardInfoTab,toSimBankPort);
		       	 		}
		       	 	}
	       	 	}]
	        }]
	       
		});
		

		this.items=[
	       simCardTab
	       ];
		this.callParent(arguments);	
	}
	
});