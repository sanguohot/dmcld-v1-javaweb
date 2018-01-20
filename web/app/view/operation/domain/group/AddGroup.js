var form = Ext.create('Ext.form.Panel', {
	autoScroll:true,
    border: false,
    fieldDefaults: {
		labelAlign: 'left',
	    anchor: '90%',
	    labelWidth: 180,
    },
    bodyStyle: {
		background: '#DFE9F6',
	},
    defaults: {
        margins: '0 0 10 0'
    },
    items: [{
					xtype:'hiddenfield',
					name:'selectCond',
					value:1
				},{
					xtype:'hiddenfield',
					name:'domainUuid'
				},{	
		            xtype: 'fieldset',
					layout:'anchor',
					title:lanControll.getLanValue('fsBasicInfo'),
					ulan:'fsBasicInfo',
					itemId:'group_info',
					items:[{
						border:false,
//						layout: {
//				            type: 'table',
//				            columns: 3
//				        },
				        defaults: {
				            width:640, 
				            height: 25,
				        },
				        bodyStyle: {
							background: '#DFE9F6',
						},
				        items: [{
					    	layout:'hbox',
					    	xtype:'fieldcontainer',
					    	border:false,
					    	itemId:'group_name',
					    	anchor: '100%',
					    	items:[{	
					    		xtype: 'textfield',
								name : 'name',
								flex:6,
								ulan:'grpName',
								fieldLabel: 'Group Name',
								labelWidth: 180,
								maxLength:31,
					            allowBlank: false,
					            msgTarget:'none',
						            listeners:{
							            render : function(p) {
						                    p.getEl().on('mouseup', function(p){ 
						                    	var tip = Ext.getCmp('add_GroupPanel_tip');
						                    	tip.show();
						                    });
					                	},
						        		focus:function(){
					        			var textobj = this;
					        			var gettip = Ext.getCmp('GetTip');
					        			if(gettip==undefined || gettip==null){
					        				gettip = Ext.create("app.util.GetTip",{});
					        			}
					        			var tip = Ext.getCmp('add_GroupPanel_tip');
					        			if(tip==undefined || tip==null){
					        				var tipManage = Ext.getCmp('TipObjManage');
					        				if(tipManage==undefined || tipManage==null){
					        					tipManage = Ext.create("app.util.TipObjManage",{});
					        				}
					        				tip = tipManage.createObjNameTipObj('add_GroupPanel_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
					        			}
					        			tip.show();
					        			tip.clearListeners();
					        			//alert(tmp.html)
					        		},
					    	    	blur:function(field,eOpts){
					        			this.up('fieldcontainer').getComponent('picture').flag = 0;
					        			var tip = Ext.getCmp('add_GroupPanel_tip');
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
					        				picture.flag = 0;
					        			}else{
						        			var name=textobj.getValue();
						        			if(name!=null&&name!=""){
					    				        
							        				Ext.Ajax.request({
							                    		url:'groupManager!checkGroup.action',
							                    		method:'POST',
							                    		params:{name:name,domainUuid:form.getForm().findField('domainUuid').getValue()},
							                    		callback: function (options, success, response) {
							    	                    	var obj=Ext.JSON.decode(response.responseText);			
							    	                    	if(obj['success']){
							    	                    		str = "<img  src='resources/images/right.png'/>";
							    	                    		picture.flag = 1;
							    	                    	}else{
							    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
							    	                    		picture.flag = 0;
							    	                    	}
							    	                    	picture.update(prefix+str+suffix);
							                        	}
							                    	});
					    				        
						        			}
					        			}
					    	    	}
						        }
							},{
				    			html:'', flex:4, border:false,itemId:'picture',flag:2
				    		}]
						},
				        {	
					    	xtype: 'textfield',
							name: 'alias',
							labelWidth: 180,
							fieldLabel: 'Alias',
							maxLength:31
						},{
				        	xtype: 'fieldcontainer',
				        	layout:'hbox',
				    		items:[rs.createAdminStatus(null,[1,2],adminSizeObj)]
				     },{	
						xtype     : 'textareafield',
					    fieldLabel: 'Description',
						name      : 'detailDesc',
						labelWidth: 180,
			            height:50,
			            rows:1,
					}]
				     }]
				 },{
						
					 	xtype: 'fieldset',
						layout:'anchor',
						title:lanControll.getLanValue('fsDetailInfo'),
						ulan:'fsDetailInfo',
						itemId:'group_detail_info',
						fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '75%',
				            labelWidth: 180,
				        },
						collapsible: true,
						collapsed:false,
						items:[
						   {xtype:'checkbox',boxLabel: 'Init New SIM Card to Clear SIM Status and Statistics',boxLabelCls:'box_label', name: 'hbmInitSimFlag',inputValue:1,checked:true,},
						   {
								xtype     : 'radiogroup',
								name      : 'hbmImeiFlagAll',
								fieldLabel: '<label onmouseover=moveOver("grp_hbmImeiFlag",event) onmouseout=moveOut() class="tips_label">IMEI Assignment Mode</label>',
								columns: [.3,.3,.4],
//								anchor:'75%',
								items: [
									{boxLabel: 'NULL',boxLabelCls:'box_label',ulan:'nall', name: 'hbmImeiFlag',id:'ahbmImeiFlag0', inputValue: 0},
									{boxLabel: 'EACH_LOAD',boxLabelCls:'box_label',ulan:'eachLoad', name: 'hbmImeiFlag',id:'ahbmImeiFlag1', inputValue: 1 },
									{boxLabel: 'EACH_BIND',boxLabelCls:'box_label',ulan:'eachBind', name: 'hbmImeiFlag',id:'ahbmImeiFlag2', inputValue: 2 },
								],
								loadFlag:false,
								listeners:{
									change:function(field,newValue,oldValue,opts){
								    	var hbmImeiFlag1=Ext.getCmp('ahbmImeiFlag1').getValue();
								    	var hbmImeiFlag2=Ext.getCmp('ahbmImeiFlag2').getValue();
							    		if(hbmImeiFlag1 || hbmImeiFlag2){
						    				var vendId=Ext.get('vendorId').value;
						    				var temp="";
						    				if(vendId=="2"){
						    					temp="DINSTAR";
						    				}else{
						    					temp="UCSPEED";
						    				}
						    				var boxImeiAssignment = lanControll.getLanValue("boxImeiAssignment_"+vendId);
						    				Ext.MessageBox.alert(boxPromotion,"<pre>"+boxImeiAssignment+"</pre>");
								    	}
									}
								}
							},
						   {
							xtype     : 'radiogroup',
							name      : 'modTypeAll',
							fieldLabel: 'SIM Module Type',
							columns: [.3,.3,.4],
							items: [
								{boxLabel: 'GSM',boxLabelCls:'box_label',ulan:'gsm', name: 'modType', inputValue: 0},
								{boxLabel: 'CDMA',boxLabelCls:'box_label',ulan:'cdma', name: 'modType', inputValue: 1 },
								{boxLabel: 'WCDMA',boxLabelCls:'box_label',ulan:'wcdma', name: 'modType', inputValue: 3 },
							]						
						},
//						{xtype:'checkbox',boxLabel: 'Auto Delete OFFLINE SIM after pull out SIM Card',boxLabelCls:'box_label', name: 'hbmOfflineCleanFlag',inputValue:1,checked:false,},
						{
							xtype     : 'radiogroup',
							name      : 'defaultEncodeAll',
							ulan:'defSmsEncode',
							fieldLabel: 'Default SMS Encode',
							columns: [.3,.3,.4],
//							anchor:'75%',
							items: [
								{boxLabel: 'UNICODE',boxLabelCls:'box_label', name: 'defaultEncode',ulan:'unicode', inputValue: 0},
								{boxLabel: 'ASCII',boxLabelCls:'box_label', name: 'defaultEncode',ulan:'ascii', inputValue: 1 },
							]						
						},{
				            xtype: 'textfield',
				            name: 'defaultSmsc',
				            anchor: '50%',
				            maxLength:31,
				            fieldLabel: 'Default SMSC',
				            
				        },{
				            xtype: 'combo',
				            name: 'zoneUuid',
//					            id:'grpZoneUuid',
				            mode : 'local',
				            editable:false,
				            allowBlank: false,
				            fieldLabel: 'Location Zone',
				            displayField : 'name',
							valueField : 'uuid',
							queryMode : 'local',
							store:Ext.create("app.store.util.ComboxStore",{}),
				        },{
				        	xtype:'combo',
			        	   name: 'hbmRoleType', 
			        	   mode: 'local',
			        	   fieldLabel: 'HBM Role Type', 
			        	   queryMode: 'local',
			        	   editable:false,
			        	   displayField : 'name',
			        	   valueField : 'statusId',
			        	   width:280,
			        	   store : Ext.create('Ext.data.Store', {
								fields : [ 'name', 'statusId' ],
								data : [ {
									name : lanControll.getLanValue('hbmRoleType_'+0),
									statusId : 0
								}, {
									name : lanControll.getLanValue('hbmRoleType_'+1),
									statusId : 1
								}, {
									name : lanControll.getLanValue('hbmRoleType_'+2),
									statusId : 2
								}, {
									name : lanControll.getLanValue('hbmRoleType_'+3),
									statusId : 3
								} ]
							}),
							listeners:{
								change:function(field,newValue,oldValue,opts){

			           				var hbmTestGrpUuid=form.down('combo[name=hbmTestGrpUuid]');
			           				var hbmPromNextGrp=form.down('combo[name=hbmPromNextGrp]');
			           				var hbmMasterGrpUuid=form.down('combo[name=hbmMasterGrpUuid]');

			           				if(newValue==0){
			           					hbmTestGrpUuid.setDisabled(false);
			           					hbmPromNextGrp.setDisabled(false);
			           					hbmMasterGrpUuid.setDisabled(true);
			           				}else if(newValue==1){
			           					hbmTestGrpUuid.setDisabled(true);
			           					hbmPromNextGrp.setDisabled(true);
			           					hbmMasterGrpUuid.setDisabled(true);
			           				}else if(newValue==2){
			           					hbmTestGrpUuid.setDisabled(false);
			           					hbmPromNextGrp.setDisabled(false);
			           					hbmMasterGrpUuid.setDisabled(false);
			           				}else if(newValue==3){
			           					hbmTestGrpUuid.setDisabled(false);
			           					hbmPromNextGrp.setDisabled(true);
			           					hbmMasterGrpUuid.setDisabled(true);
			           				}else{
			           					hbmTestGrpUuid.setDisabled(false);
			           					hbmPromNextGrp.setDisabled(false);
			           					hbmMasterGrpUuid.setDisabled(false);
			           				
			           				}
				        		}
			           		}
						},{
				            xtype: 'combo',
				            name: 'hbmPromNextGrp',
				            fieldLabel: 'Next Working Group',
				            displayField : 'name',
							valueField : 'uuid',
							mode : 'local',
							queryMode : 'local',
							editable:false,
							store:Ext.create("app.store.util.ComboxStore",{}),
							valueNotFoundText :""
						},{
							xtype: 'combo',
							name: 'hbmNextBlockedGrp',
							fieldLabel: 'Next Blocked Group',
							displayField : 'name',
							valueField : 'uuid',
							mode : 'local',
							queryMode : 'local',
							editable:false,
							store:Ext.create("app.store.util.ComboxStore",{}),
							valueNotFoundText :""
				        },{
				            xtype: 'combo',
				            name: 'hbmMasterGrpUuid',
				            fieldLabel: 'Master Group',
				            displayField : 'name',
							valueField : 'uuid',
							mode : 'local',
							queryMode : 'local',
							editable:false,
							store:Ext.create("app.store.util.ComboxStore",{}),
					    },{
				            xtype: 'combo',
				            name: 'hbmTestGrpUuid',
				            fieldLabel: 'Test Group',
				            displayField : 'name',
							valueField : 'uuid',
							mode : 'local',
							queryMode : 'local',
							editable:false,
							store:Ext.create("app.store.util.ComboxStore",{}),
								
					    },{
				            xtype: 'combo',
				            name: 'paidGrpUuid',
				            fieldLabel: 'Paid Group',
				            displayField : 'name',
							valueField : 'uuid',
							mode : 'local',
							queryMode : 'local',
							editable:false,
							store:Ext.create("app.store.util.ComboxStore",{}),
							valueNotFoundText :""
				        }
//					 ,{xtype:'checkbox',boxLabel: 'Update SIM Number by Auto Generated SMS',boxLabelCls:'box_label', name: 'hbmLearnNumber',inputValue:1,
//					    	listeners:{
//								change:function(field,newValue,oldValue,opts){
//				        			var hbmNumberPrefix=form.down('textfield[name=hbmNumberPrefix]');	
//				        			var newNumberPrefix=form.down('textfield[name=newNumberPrefix]');	
//							        if(newValue){
//							        	hbmNumberPrefix.setDisabled(false);
//							        	newNumberPrefix.setDisabled(false);
//			           				}else{
//			           					hbmNumberPrefix.setDisabled(true);
//			           					newNumberPrefix.setDisabled(true);
//							        }
//			           			}
//		           			}
//				    }
//				    ,{xtype:'textfield',fieldLabel: 'Cut Prefix of SIM Number',name: 'hbmNumberPrefix',anchor: '50%',maxLength:7,disabled:true}
//				    ,{xtype:'textfield',fieldLabel: 'Replace SIM Number Prefix',name: 'newNumberPrefix',anchor: '50%',maxLength:7,disabled:true}
				    ]
				
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
    		var tmp = this.up('form').down('fieldcontainer[itemId=group_name]');
//    		alert(this.up('form').down('fieldcontainer[itemId=group_name]'));
    		if(tmp.getComponent('picture').flag==0)
    		return;
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                var win=this.up('window');
	                if (form.isValid()) {
	                	var sc=0;
	                	var domainUuid=this.up('form').getForm().findField('domainUuid').getValue();
	                	this.up('form').getForm().findField('selectCond').setValue(sc);
	                	Ext.Ajax.request({
	                		url:'groupManager!addGroup.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
	                			var obj=Ext.JSON.decode(response.responseText);
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('fgroupPanel').down('panel[itemId=grid]').getStore().load();
		                    		treeFn.refreshNode('operationTree','fgroup_-'+domainUuid,null);
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	                form.reset();
	                win.hide();
	            }
            }
        
    }]
});

Ext.define("app.view.operation.domain.group.AddGroup", {
	extend : 'Ext.window.Window',
	alias : 'widget.addGroup',
	id:'addGroup',
	title : lanControll.getLanValue('tiAddGrp'),
	closeAction: 'hide',
	height : 620,
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:850,
    layout: 'fit',
    resizable: true,
//    modal: true,
    items: form
	
});

