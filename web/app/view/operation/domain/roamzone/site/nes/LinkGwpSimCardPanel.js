Ext.define('app.view.operation.domain.roamzone.site.nes.LinkGwpSimCardPanel',{
	extend:'Ext.panel.Panel',
	id:'linkGwpSimCardPanel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
//	autoScroll:true,
	hidden:true,
	border:false,
	
	
	initComponent: function(){
	
		var gwpInfoTab=Ext.create('Ext.form.Panel',{
			title:'',
			id:'linkGwpSimCardTab',
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
	            fieldLabel: 'portUuid',
	        },{
	        	xtype:'displayfield',
	        	name:'neSnStr',
	        	fieldLabel:'Device SN'
	        },{
	        	xtype:'displayfield',
	        	name:'neAlias',
	        	fieldLabel:'Device Name'
	        },{
	        	xtype:'displayfield',
	        	name:'portNo',
	        	fieldLabel:'Port No'
	        },{
		    	layout:'hbox',
		    	xtype:'fieldcontainer',
		    	border:false,
		    	anchor: '100%',
		    	items:[{
					xtype:'displayfield',
					fieldLabel:'DWG Port Alias',
					flex:65,
					name:'alias',
					ulan:'gwpAlias',
		            allowBlank: true,
		            enableKeyEvents : true,
		            listeners:{
		                render : function(p) {
		                    p.getEl().on('mouseup', function(p){ 
		                    	var tip = Ext.getCmp('LinkGwpSimCardPanel_tip');
		                    	tip.show();
		                    });
	                	},
		        		focus:function(){
		        			var textobj = this;
		        			var gettip = Ext.getCmp('GetTip');
		        			if(gettip==undefined || gettip==null){
		        				gettip = Ext.create("app.util.GetTip",{});
		        			}
		        			var tip = Ext.getCmp('LinkGwpSimCardPanel_tip');
		        			if(tip==undefined || tip==null){
		        				var tipManage = Ext.getCmp('TipObjManage');
		        				if(tipManage==undefined || tipManage==null){
		        					tipManage = Ext.create("app.util.TipObjManage",{});
		        				}
		        				tip = tipManage.createObjNameTipObj('LinkGwpSimCardPanel_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
		        			}
		        			tip.show();
		        			tip.clearListeners();
		        			//alert(tmp.html)
		        		},
		    	    	blur:function(field,eOpts){
		        			var tip = Ext.getCmp('LinkGwpSimCardPanel_tip');
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
					} , {
						name : 'LOCKED',
						statusId : 5
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
	           name: 'simbankUuid',
			   xtype: 'fieldcontainer',
			   fieldLabel: 'Bind SIMBank Port',
			   ulan:'bindBkp',
			   layout:'hbox',
			   items: [
						{xtype:'hiddenfield', name: 'bkpUuid',},
						{xtype: 'button',ulan:'btToSimbankPort',text:' >> To SIMBANK Port',id:'linkBkpSimCardPort',
							listeners:{
								click:function(but,even,eOpts){
							var ss=Ext.create('app.util.SetBkpStore',{});
							
			     			var linkGwpPanel=Ext.getCmp('linkGwpSimCardPanel');
			     			var bkpInfoTab=linkGwpPanel.up('panel').up('panel').items.get(3);
			     			var isOpen=false;
			     			
			     			for(var i=0;i<10;i++){
			     				bkpInfoTab=linkGwpPanel.up('panel').up('panel').items.get(i);
			     				if(bkpInfoTab && bkpInfoTab.name=='linkBkp'){
									isOpen=true;
									break;
								}else if(!bkpInfoTab){
									break;
								}
			     			}
			     			
			     			var uuid=gwpInfoTab.getForm().findField('bkpUuid').getValue();
			     			if(!isOpen){
			     				
			     				var bkpInfoPanel=Ext.getCmp('linkBkpPanel');
			     				if(bkpInfoPanel==undefined || bkpInfoPanel=='undefined'){
			     					bkpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.LinkBkpSimCardPanel',{});
			     				}
			     				var linkDwgPort=Ext.getCmp('linkDwgSimCardPort');
			     				var linkSimCard=Ext.getCmp('linkSimCardSimCard');

			     				ss.setBkpStoreAndCreateTab(uuid,bkpInfoPanel,linkGwpPanel.up('panel').up('panel'),linkDwgPort,linkSimCard);
			     				
			        			
			     			}else{
		     					var bkpInfoPanel=Ext.getCmp('linkBkpSimCardPanel');
		     					if(bkpInfoPanel){
		     						bkpInfoPanel.setVisible(true);
		     					}
		     					var linkDwgPort=Ext.getCmp('linkDwgSimCardPort');
		     					var linkSimCard=Ext.getCmp('linkSimCardSimCard');

		     					ss.setBkpStore(uuid,bkpInfoPanel,bkpInfoTab,linkDwgPort,linkSimCard);
			        			
			        			bkpInfoTab.show();
			     			}
				        		}
							
							}
						}
					]
			} ,
//			{
//	            xtype: 'displayfield',
//	            name: 'policyUuid',
//	            fieldLabel: 'Policy',
//	        },
	        {
	            xtype: 'hiddenfield',
	            name: 'neUuid',
	            fieldLabel: 'neUuid',
	        }, {
	            xtype: 'displayfield',
	            name: 'simUuid',
	            ulan:'bindSimCard',
	            fieldLabel: 'Bind Sim Card',
	        },{
	            xtype: 'displayfield',
	            name: 'localImei',
	            fieldLabel: 'Local IMEI',
	        },{
	            xtype: 'displayfield',
	            name: 'bindImei',
	            fieldLabel: 'Bind IMEI',
	        },
//	        {
//	            xtype: 'displayfield',
//	            name: 'dynamicImeiFlag',
//	            fieldLabel: 'Dynamic IMEI',
//	        },
	        {
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
	            name: 'lastBindTime',
	            fieldLabel: 'Last Bind Time',
	        },{
	            xtype: 'displayfield',
	            name: 'lastUsedTime',
	            fieldLabel: 'Last Used Time',
	        }
//	        ,{
//	            xtype: 'displayfield',
//	            name: 'curCallStatus',
//	            fieldLabel: 'Current Call Status',
//	        },{
//	            xtype: 'displayfield',
//	            name: 'curSmsStatus',
//	            fieldLabel: 'Current Sms Status',
//	        }
//	        ,{
//	            xtype: 'displayfield',
//	            name: 'roundTripDelay',
//	            fieldLabel: 'Round Trip Delay',
//	        },{
//	            xtype: 'displayfield',
//	            name: 'packetAll',
//	            fieldLabel: 'PacketAll',
//	        },{
//	            xtype: 'displayfield',
//	            name: 'packetRetries',
//	            fieldLabel: 'Packet Retries',
//	        },{
//	            xtype: 'displayfield',
//	            name: 'packetTimeout',
//	            fieldLabel: 'Packet Timeout',
//	        }
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
		                		url:'gwpManager!updateGwp.action',
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
		        			var sgs=Ext.create('app.util.SetGwpStore',{});
		        			var uuid=Ext.getCmp('linkGwpSimCardTab').getForm().findField('uuid').getValue();
		        			var linkGwpGwPanel=Ext.getCmp('linkGwpSimCardPanel');
		        			var gwpInfoTab=linkGwpGwPanel.up('panel');
		        			var toBkpPort=Ext.getCmp('linkBkpSimCardPort');
		        			uuid=parseInt(uuid);
		        			sgs.setGwpStore(uuid,linkGwpGwPanel,gwpInfoTab,toBkpPort);
		       	 		}
		       	 	}
	       	 	}]
	        }],
			
		});
		
		this.items=[gwpInfoTab];
		this.callParent(arguments);	
	}
});