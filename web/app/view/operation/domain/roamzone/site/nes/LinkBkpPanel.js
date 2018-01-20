Ext.define('app.view.operation.domain.roamzone.site.nes.LinkBkpPanel',{
	extend:'Ext.panel.Panel',
	id:'linkBkpPanel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
//	autoScroll:true,
	border:false,
	initComponent: function(){
		
		var bkpInfoTab=Ext.create('Ext.form.Panel',{
			title:'',
			id:'linkBkpTab',
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
//			width: 500,
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 100,
	            anchor: '65%'
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
	            fieldLabel: 'PortUuid',
	        },{
	            xtype: 'displayfield',
	            name: 'neSnStr',
	            fieldLabel: 'Device SN',
	        },{
	            xtype: 'displayfield',
	            name: 'neAlias',
	            fieldLabel: 'Device Name',
	        },{
	            xtype: 'displayfield',
	            name: 'portNo',
	            fieldLabel: 'Port No',
	        },{
		    	layout:'hbox',
		    	xtype:'fieldcontainer',
		    	border:false,
		    	anchor: '100%',
		    	items:[{
					xtype:'displayfield',
					fieldLabel:'SIMBANK Port Alias',
					flex:65,
					name:'alias',
					ulan:'bkpAlias',
		            allowBlank: true,
		            enableKeyEvents : true,
		            listeners:{
		                render : function(p) {
		                    p.getEl().on('mouseup', function(p){ 
		                    	var tip = Ext.getCmp('LinkBkpPanel_tip');
		                    	tip.show();
		                    });
	                	},
		        		focus:function(){
		        			var textobj = this;
		        			var gettip = Ext.getCmp('GetTip');
		        			if(gettip==undefined || gettip==null){
		        				gettip = Ext.create("app.util.GetTip",{});
		        			}
		        			var tip = Ext.getCmp('LinkBkpPanel_tip');
		        			if(tip==undefined || tip==null){
		        				var tipManage = Ext.getCmp('TipObjManage');
		        				if(tipManage==undefined || tipManage==null){
		        					tipManage = Ext.create("app.util.TipObjManage",{});
		        				}
		        				tip = tipManage.createObjNameTipObj('LinkBkpPanel_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
		        			}
		        			tip.show();
		        			tip.clearListeners();
		        			//alert(tmp.html)
		        		},
		    	    	blur:function(field,eOpts){
		        			var tip = Ext.getCmp('LinkBkpPanel_tip');
		        			tip.hide();
		        			var textobj = this;
		        			var prefix = "<div style='background:#DFE9F6'>&nbsp;";
		        			var suffix  = "</div>"
		        			var checkobj = Ext.getCmp("DataCheck");
		        			if(checkobj==undefined || checkobj==null){
		        				checkobj = Ext.create("app.util.DataCheck",{});
		        			}
		        			var str = checkobj.getErrorStr(textobj.getValue());
		        			var picture = this.up('fieldcontainer').getComponent('picture');
		        			if(str != ""){
		        				str = "<font color=#f00>"+str+"</font>"
		        				picture.update(prefix+str+suffix);
		        			}else{
		                	str = "<img  src='resources/images/right.png'/>"
		                    	picture.update(prefix+str+suffix);
		        			}
		    	    	}
		        	}
		    	},{
	    			html:'', flex:35, border:false,itemId:'picture'
	    		}]
	        },{
	            xtype: 'combo',
	            name: 'adminStatus',
	            fieldLabel: 'Admin Status',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				valueNotFoundText:'',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : 'ENABLED',
						statusId : 1
					}, {
						name : 'DISABLED',
						statusId : 2
//					} , {
//						name : 'MAINTENANCE',
//						statusId : 3
					},{
						name : 'NO_BALANCE',
						statusId : 6
					} ]
				}),
				
	        },{
	            xtype: 'displayfield',
	            name: 'oprStatus',
	            fieldLabel: 'Opr Status',
	        },{
	            xtype: 'displayfield',
	            name: 'runStatus',
	            fieldLabel: 'Run Status',
	        },{
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   fieldLabel: 'Bind DWG Port',
				   items: [
							{xtype:'hiddenfield', name: 'gwpUuid',},
							{xtype: 'button',ulan:'btToDwgPort',text:'>>To DWG Port',id:'linkDwgPort',
								
								listeners:{
									click:function(but,even,eOpts){
					        			
										var sgs=Ext.create('app.util.SetGwpStore',{});
										var linkBkpPanel=Ext.getCmp('linkBkpPanel');
										var uuid=bkpInfoTab.getForm().findField('gwpUuid').getValue();
										var alias="";
										var gwpInfoTab=linkBkpPanel.up('panel').up('panel').items.get(3);
										var isOpen=false;
										
										for(var i=0;i<10;i++){
											gwpInfoTab=linkBkpPanel.up('panel').up('panel').items.get(i);
											if(gwpInfoTab && gwpInfoTab.name=='linkGwp'){
												isOpen=true;
												break;
											}else if(!gwpInfoTab){
												break;
											}
										}
										
		
										if(!isOpen){
											var linkGwpPanel=Ext.getCmp('linkGwpPanel');
							 				
							 				if(linkGwpPanel==undefined || linkGwpPanel=='undefined'){
							 					
							 					linkGwpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.LinkGwpPanel',{});
							 				}
							 				linkGwpPanel.setVisible(true);
							 				var linkBkpPort=Ext.getCmp('linkBkpPort');
							 				
							 				gwpInfoTab=sgs.setGwpStoreAndCreateTab(uuid,linkGwpPanel,linkBkpPanel.up('panel').up('panel'),linkBkpPort);
							    			
										}else{
											
						 					var linkGwpPanel=Ext.getCmp('linkGwpPanel');
						 					if(linkGwpPanel){
						 						linkGwpPanel.setVisible(true);
						 					}
						 					var linkBkpPort=Ext.getCmp('linkBkpPort');
						 					sgs.setGwpStore(uuid,linkGwpPanel,gwpInfoTab,linkBkpPort);
						        			gwpInfoTab.show();
										}
					        		}
								
								}
							}
						]
				
	        },{
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   fieldLabel: 'Load SIM Card',
				   items: [
							{xtype:'hiddenfield',  name: 'simUuid',},
							{xtype: 'button',ulan:'btToSimCard',text:'>>To SIM Card',id:'linkSimCard',
								
								listeners:{
									click:function(but,even,eOpts){
					        			var linkBkpPanel=Ext.getCmp('linkBkpPanel');
					        			var simUuid=bkpInfoTab.getForm().findField('simUuid').getValue();
					        			var imsi=bkpInfoTab.getForm().findField('imsi').getValue();
					        			var domainUuid=bkpInfoTab.getForm().findField('domainUuid').getValue();
					        			var ssc=Ext.create('app.util.SetSimCardStore',{});
					        			if(simUuid<1){
					        				Ext.MessageBox.alert(boxWarnning,boxBkpNotBindSim)
					        			}else{
					        				var simCardInfoTab=linkBkpPanel.up('panel').up('panel').items.get(2);
					        				var isOpen=false;
					        				
					        				for(var i=0;i<10;i++){
					        					simCardInfoTab=linkBkpPanel.up('panel').up('panel').items.get(i);
					        					if(simCardInfoTab && simCardInfoTab.name=='linkSIM'){
													isOpen=true;
													break;
												}else if(!simCardInfoTab){
													break;
												}
					        				}
						        			if(!simCardInfoTab){
						        				simCardInfoTab=Ext.getCmp('simCardBkTab');
						        			}
						        			if(!isOpen){
						        				
						        				var simCardPanel=Ext.getCmp('simCardBkPanel');
						        				if(!simCardPanel){
						        					simCardPanel=Ext.create('app.view.operation.domain.group.SimCardBkPanel',{});
						        				}
						        				ssc.setSimCardStoreAndCreateTab(simUuid,domainUuid,simCardPanel,linkBkpPanel.up('panel').up('panel'),Ext.getCmp('toSimBankBkPort'));
						        			}else{
						        				var simCardPanel=Ext.getCmp('simCardBkPanel');
							        			if(simCardPanel){
						        					simCardPanel.setVisible(true);
						        				}

							        			ssc.setSimCardStore(simUuid,domainUuid,simCardPanel,simCardInfoTab,Ext.getCmp('toSimBankBkPort'));
						        			}
										
					        			}
					        		}
								
								}
							}
						]
				
	        
	        },{
	            xtype: 'displayfield',
	            name: 'status',
	            fieldLabel: 'Work Status',
	        },{
	            xtype: 'displayfield',
	            name: 'imsi',
	            fieldLabel: 'Bind SIM IMSI',
	        } 
//	        ,{
//	            xtype: 'displayfield',
//	            name: 'atr',
//	            fieldLabel: 'ATR',
//	        }
	        ,{
	            xtype: 'displayfield',
	            name: 'lastErrorCount',
	            fieldLabel: 'Last Error Count',
	        },{
	            xtype: 'displayfield',
	            name: 'lastBindTime',
	            fieldLabel: 'Last Bind Time',
	        },{
	            xtype: 'displayfield',
	            name: 'lastUsedTime',
	            fieldLabel: 'Last Used Time',
	        } 
	        ],
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
		                		url:'bkpManager!updateBkp.action',
		                		method:'POST',
		                		params:form.getValues(),
		                		
		                		callback: function (options, success, response) {
			                    	if(success){
//			                    		var s=Ext.create('app.store.operation.OperationStore',{});
//			                    		Ext.getCmp('operationTree').store=s;
			                    		
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
		        			var sbs=Ext.create('app.util.SetBkpStore',{});
		        			var uuid=Ext.getCmp('linkBkpTab').getForm().findField('uuid').getValue();
		        			var bkpInfoPanel=Ext.getCmp('linkBkpPanel');
		        			var bkpInfoTab=bkpInfoPanel.up('panel');
		        			var toDwgPort=Ext.getCmp('linkDwgPort');
		        			var toSimCard=Ext.getCmp('linkSimCard');
		        			uuid=parseInt(uuid);
		        			sbs.setBkpStore(uuid,bkpInfoPanel,bkpInfoTab,toDwgPort,toSimCard);
		       	 		}
		       	 	}
	       	 	}]
	        }],
			
		});
		
		this.items=[
	       	bkpInfoTab
	      ];
		this.callParent(arguments);	
	}
});