Ext.define('app.view.operation.domain.group.SimCardPanel',{
	extend:'Ext.panel.Panel',
	id:'simCardInfoPanel',
	layout:'fit',
//	autoScroll:true,
	border:false,
	initComponent: function(){
		
		var simCardTab=Ext.create('Ext.form.Panel',{
			title:'',
			id:'simCardInfoTab',
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
	            fieldLabel: 'Alias',
	        },{
	            xtype: 'combo',
	            name: 'grpUuid',
	            ulan:'group',
	            mode : 'local',
	            editable:false,
	            fieldLabel: 'Group',
	            displayField : 'name',
				valueField : 'uuid',
				queryMode : 'local',
				store:Ext.create("app.store.util.ComboxStore",{}),
	        },rs.createAdminStatus(null,[1,2,5,6],adminSizeObj),{
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
						{xtype: 'button',ulan:'btToSimbankPort',text:'>>To SIMBank Port',id:'toSimBankPort',
							
							listeners:{
								click:function(but,even,eOpts){
				        			var ss=Ext.create('app.util.SetBkpStore',{});
				        			var bkpUuid=simCardTab.getForm().findField('bkpUuid').getValue();
				        			if(bkpUuid<1){
				        				Ext.MessageBox.alert(boxWarnning,boxGwpNotBindBkp)
				        			}else{
				        				var bkTab=Ext.getCmp('simCardInfoPanel');
				        				
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
						     				
						     				var bkpInfoPanel=Ext.getCmp('linkBkpSimCardPanel');
						     				
						     				if(bkpInfoPanel==undefined || bkpInfoPanel=='undefined'){
						     					bkpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.LinkBkpSimCardPanel',{});
						     				}
						     				var linkDwgPort=Ext.getCmp('linkDwgSimCardPort');
						     				var linkSimCard=Ext.getCmp('linkSimCardSimCard');
						     				ss.setBkpStoreAndCreateTab(bkpUuid,bkpInfoPanel,bkTab.up('panel').up('panel'),linkDwgPort,linkSimCard);
						     				
						     			}else{
					     					var bkpInfoPanel=Ext.getCmp('linkBkpSimCardPanel');
					     					if(bkpInfoPanel){
					     						bkpInfoPanel.setVisible(true);
					     					}
					     					var linkDwgPort=Ext.getCmp('linkDwgSimCardPort');
					     					var linkSimCard=Ext.getCmp('linkSimCardSimCard');
					     					ss.setBkpStore(bkpUuid,bkpInfoPanel,bkpInfoTab,linkDwgPort,linkSimCard);
						        			
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
	            xtype: 'textfield',
	            name: 'mobile',
	            fieldLabel: 'Mobile',
	        },{
	            xtype: 'displayfield',
	            name: 'curBalance',
	            fieldLabel: 'Current Balance',
	        },{
	            xtype: 'displayfield',
	            name: 'leftCallTime',
	            fieldLabel: 'Left Call Time(min)',
	        },{
	            xtype: 'displayfield',
	            name: 'lowBalanceFlag',
	            fieldLabel: 'Low Balance Flag',
	        },{
	            xtype: 'displayfield',
	            name: 'noBalanceFlag',
	            fieldLabel: 'No Balance Flag',
	        },{
	            xtype: 'displayfield',
	            name: 'promotionStatus',
	            fieldLabel: 'Promotion Status',
	        },{
	            xtype: 'displayfield',
	            name: 'blockedFlag',
	            fieldLabel: 'Blocked Flag',
	        },{
	            xtype: 'displayfield',
	            name: 'regErrorCount',
	            fieldLabel: 'Register Error Count',
	        },{
	            xtype: 'displayfield',
	            name: 'deactiveReason',
	            fieldLabel: 'Deactive Reason',
	        },{
	            xtype: 'displayfield',
	            name: 'lastDeactiveReason',
	            fieldLabel: 'Last Deactive Reason',
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
			                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
			                    	}
		                    	}
		                	});
		                }
		            }
		        },'-',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
		        			var ssc=Ext.create('app.util.SetSimCardStore',{});
		        			var uuid=Ext.getCmp('simCardInfoTab').getForm().findField('uuid').getValue();
		        			var simCardPanel=Ext.getCmp('simCardInfoPanel');
		        			var simCardInfoTab=simCardPanel.up('panel');
		        			var toSimBankPort=Ext.getCmp('toSimBankPort');
		        			
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