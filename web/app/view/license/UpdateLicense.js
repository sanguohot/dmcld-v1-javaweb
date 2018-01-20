var form=Ext.widget('form',{
			treeName:'',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
			border : false,
			bodyPadding : 10,

			fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '100%'
	        },

			items :[{
				xtype:'hiddenfield',
				name:'srvUuid',
				value:-1,
			},{
				xtype:'hiddenfield',
				name:'domainUuid',
				value:-1,
			},{
				xtype:'hiddenfield',
				name:'name',
			},{
				xtype:'hiddenfield',
				name:'sysTotalSimCard',
			},{
				xtype:'hiddenfield',
				name:'curSimCard',
			},{
				name : 'operate',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				fieldLabel : 'License Operate',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : lanControll.getLanValue('licOpr_'+'newLic'),
						value : 'newLic'
					},{ 
						name : lanControll.getLanValue('licOpr_'+'renewLic'),
						value : 'renewLic'
					}]
				}),
				value:'newLic',
				listeners:{
					change:function(field,newValue,oldValue,opts){
						var srvMode=form.down('displayfield[name=srvMode]');
		    			var srvMagic=form.down('textfield[name=srvMagic]');
		    			var signType=form.down('combo[name=signType]');
		    			var maxSimCard=form.down('combo[name=maxSimCard]');
		    			var hbmFeatures=form.down('combo[name=hbmFeatures]');
		    			var validDays=form.down('combo[name=validDays]');
		    			var signType=form.down('combo[name=signType]');
		    			
		    			srvMode.setValue(rs.serverMode(srvMode.getValue()));
		    			validDays.store.removeAll();
		    			if(newValue=='newLic'){
		    				
		    				if(srvMagic.getValue()==""){
		    					srvMagic.setDisabled(false);
			    				srvMagic.setFieldStyle("background:#FFF");
			    				srvMagic.setReadOnly(false);
		    				} else if(roleType.isSuperAdmin(privilege.roleObj.roleId)){
		    					srvMagic.setReadOnly(false);
		    					srvMagic.setFieldStyle("background:#FFF");
		    				}else{
		    					srvMagic.setDisabled(false);

			    				srvMagic.setFieldStyle("background:#DFE9F6");
			    				srvMagic.setReadOnly(true);
		    				}
		    				
		    				signType.setDisabled(false);
		    				maxSimCard.setDisabled(false);
		    				hbmFeatures.setDisabled(false);
		    				signType.setFieldStyle("background:#FFF");
		    				maxSimCard.setFieldStyle("background:#FFF");
		    				hbmFeatures.setFieldStyle("background:#FFF");
		    				signType.setReadOnly(false);
		    				maxSimCard.setReadOnly(false);
		    				hbmFeatures.setReadOnly(false);
		    				
		    				
		    			}else{
		    				srvMagic.setFieldStyle("background:#DFE9F6");
		    				signType.setFieldStyle("background:#DFE9F6");
		    				maxSimCard.setFieldStyle("background:#DFE9F6");
		    				hbmFeatures.setFieldStyle("background:#DFE9F6");
		    				srvMagic.setReadOnly(true);
		    				signType.setReadOnly(true);
		    				maxSimCard.setReadOnly(true);
		    				hbmFeatures.setReadOnly(true);
		    			}
		    			
		    			if( signType.getValue()==1){
		    				validDays.store.add({name:'30 day',value:30});
		    				validDays.store.add({name:'90 day',value:90});
//		    				validDays.setValue(30);
		    			}else{
		    				validDays.store.add({name:'1 year',value:365});
		    				validDays.store.add({name:'2 year',value:365*2});
		    				validDays.store.add({name:'3 year',value:365*3});
//		    				validDays.setValue(365);
		    			}
		    			
		    			var store=form.up('window').store;
		    			if(store&&store.getAt(0)){
		    				form.getForm().loadRecord(store.getAt(0));
		    			}
		    			
		    		}
	    		}	
	        },{
				xtype: 'displayfield',
				name: 'srvMode',
				fieldLabel: 'Server Mode',
			},{
	            xtype: 'textfield',
	            name: 'srvMagic',
	            fieldLabel: 'Server Magic',
	            allowBlank: false,
	            maxLength:63
	        },{
				name : 'signType',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				fieldLabel : 'Sign Type',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : lanControll.getLanValue('signType_'+1),
						value: 1
					},{ 
						name : lanControll.getLanValue('signType_'+2),
						value : 2
					}]
				}),
				listeners:{
					change:function(field,newValue,oldValue,opts){
						var srvMode=form.down('displayfield[name=srvMode]');
		    			var srvMagic=form.down('textfield[name=srvMagic]');
		    			var signType=form.down('combo[name=signType]');
		    			var maxSimCard=form.down('combo[name=maxSimCard]');
		    			var hbmFeatures=form.down('combo[name=hbmFeatures]');
		    			var validDays=form.down('combo[name=validDays]');
		    			
		    			validDays.store.removeAll();
		    			if(newValue==1){
		    				validDays.store.add({name:'30 day',value:30});
		    				validDays.store.add({name:'90 day',value:90});
		    				validDays.setValue(30);
		    			}else{
		    				validDays.store.add({name:'1 year',value:365});
		    				validDays.store.add({name:'2 year',value:365*2});
		    				validDays.store.add({name:'3 year',value:365*3});
		    				validDays.setValue(365);
		    			}
		    		}
	    		}
			},{
				name : 'maxSimCard',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				fieldLabel : 'Max SIM Card',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : '128 ( 1 * 128SIM )',
						value : 128
					},{ 
						name : '256 ( 2 * 128SIM )',
						value : 256
					},{ 
						name : '384 ( 3 * 128SIM )',
						value : 384
					},{
						name : '512 ( 4 * 128SIM )',
						value : 512
					},{
						name : '640 ( 5 * 128SIM )',
						value : 640
					},{
						name : '768 ( 6 * 128SIM )',
						value : 768
					},{
						name : '896 ( 7 * 128SIM )',
						value : 896
					},{
						name : '1024 ( 8 * 128SIM )',
						value : 1024
					},{
						name : '1152 ( 9 * 128SIM )',
						value : 1152
					},{
						name : '1280 ( 10 * 128SIM )',
						value : 1280
					},{
						name : '1536 ( 12 * 128SIM )',
						value : 1536
					},{
						name : '2048 ( 16 * 128SIM )',
						value : 2048
					},{
						name : '4096 ( 32 * 128SIM )',
						value : 4096
					},{
						name : '8192 ( 64 * 128SIM )',
						value : 8192
					},{
						name : '12288 ( 96 * 128SIM )',
						value : 12288
					},{
						name : '16384 ( 128 * 128SIM )',
						value : 16384
					}]
				}),
//				listeners:{
//					change:function(field,newValue,oldValue,opts){
//						var sysTotalSimCard=form.down('hiddenfield[name=sysTotalSimCard]');
//						var curSimCard=form.down('hiddenfield[name=curSimCard]');
//						if(newValue<sysTotalSimCard.getValue()){
//							Ext.MessageBox.confirm('INFO','The runing SIM Card more than this License Max SIM Card,Are you sure continue?',function(e){
//								if(e=='no'){
//									field.setValue(oldValue);
//									return;
//								}
//							});
//						}
//						if(newValue<curSimCard.getValue()){
//							Ext.MessageBox.alert('INFO','The Current License SIM Card less than this setting SIM Card,Are you sure continue?',function(e){
//								if(e=='no'){
//									field.setValue(oldValue);
//									return;
//								}
//							});
//						}
//					}
//				}
			},{
				name : 'hbmFeatures',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				fieldLabel : 'HBM Features',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : lanControll.getLanValue('no'),
						value : 0
					},{ 
						name : lanControll.getLanValue('yes'),
						value : 1
					}]
				})
			},{
				name : 'validDays',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				fieldLabel : 'Valid Days',
				displayField : 'name',
				valueField : 'value',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'value' ],
					data : [ {
						name : lanControll.getLanValue('validDays_'+30),
						value : 30
					},{ 
						name : lanControll.getLanValue('validDays_'+90),
						value : 90
					}]
				})
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
		                var form1=this.up('form');
		                var form = form1.getForm();
		                var win=this.up('window');
		                var cmpId=win.cmpId;
		                var totalSimCard=form.findField('sysTotalSimCard').getValue();
		                var maxSimCard=form.findField('maxSimCard');
		                var url="licenseManager!"+this.up('window').action+".action";
		                
		                
		                var sysTotalSimCard=form.findField('sysTotalSimCard');
						var curSimCard=form.findField('curSimCard');
						
						if(maxSimCard.getValue()<sysTotalSimCard.getValue()){
							Ext.MessageBox.confirm('INFO','The runing SIM Card more than this License Max SIM Card,Are you sure continue?',function(e){
								if(e=='no'){
									maxSimCard.setValue(oldValue);
									return;
								}
							});
						}
						if(maxSimCard.getValue()<curSimCard.getValue()){
							Ext.MessageBox.confirm('INFO','The setting SIM Card less than current License SIM Card ,Are you sure continue?',function(e){
								if(e=='no'){
									maxSimCard.setValue(curSimCard.getValue());
									return;
								}
							});
						}
		                
		                if(maxSimCard.getValue()<totalSimCard){
		                	boxSimOutOfLimit = lanControll.getLanValue('boxSimOutOfLimit');
		                	Ext.MessageBox.confirm(boxInfo,boxSimOutOfLimit,function(e) {
	       						if( e == 'yes' ){
	       			                if (form.isValid()) {
	       			                	
	       			                	var boxObj = {
	    	                		    		title:boxInfo,
	    	                		    		width : 300,
	    	                		    		msg:boxWaitMsg,
	    	                		    		modal:true,
	    	                		    		closable:false,
	    	                		    		wait:true
	    	                		    };
	    			                	
	    			                	Ext.MessageBox.show(boxObj);
	       			                	Ext.Ajax.request({
	       			                		url:url,
	       			                		method:'POST',
	       			                		timeout:5*30*1000,
	       			                		params:form.getValues(),
	       			                		callback: function (options, success, response) {
		       			                		boxObj.wait = false;
				                				Ext.MessageBox.hide();
	       				                    	var obj=Ext.JSON.decode(response.responseText);			
    				                    		Ext.MessageBox.alert(boxInfo,obj['msg']);
    				                    		Ext.getCmp(cmpId).down('form').store.load();
	       				                    	form.reset();
	       				                    	win.hide();
	       			                    	}
	       			                	});
	       			                }

	       						}
	       					})
		                }else{
		                	var url="licenseManager!"+this.up('window').action+".action";
			                if (form.isValid()) {
			                	var boxObj = {
	                		    		title:boxInfo,
	                		    		width : 300,
	                		    		msg:boxWaitMsg,
	                		    		modal:true,
	                		    		closable:false,
	                		    		wait:true
	                		    };
			                	
			                	Ext.MessageBox.show(boxObj);
			                	
			                	Ext.Ajax.request({
   			                		url:url,
   			                		method:'POST',
   			                		timeout:5*30*1000,
   			                		params:form.getValues(),
   			                		callback: function (options, success, response) {
       			                		boxObj.wait = false;
		                				Ext.MessageBox.hide();
   				                    	var obj=Ext.JSON.decode(response.responseText);			
			                    		Ext.MessageBox.alert(boxInfo,obj['msg']);
			                    		Ext.getCmp(cmpId).down('form').store.load();
   				                    	form.reset();
   				                    	win.hide();
   			                    	}
   			                	});
			                }
		                }
		                
		                
		            }
		        
		    }]
		});

Ext.define("app.view.license.UpdateLicense", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateLicense',
	id:'updateLicense',
	title : lanControll.getLanValue('tiUpdateLic'),
	closeAction: 'hide',
	layout:'fit',
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:550,
    layout: 'fit',
    resizable: true,
    modal: true,
    store:{},
    cmpId:'',
    items: form
});
