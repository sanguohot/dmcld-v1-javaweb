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
	            anchor: '90%'
	        },

			items :[{
				xtype:'hiddenfield',
				name:'grpUuid',
			},{
				xtype:'hiddenfield',
				name:'domainUuid'
			},{
	            xtype: 'textfield',
	            name: 'imsi',
	            fieldLabel: 'IMSI',
	            allowBlank:false,
				regex:/\d{8,}/,
	            listeners:{
		   			blur: function(field,opts) {
						var imsi=field.getValue();
						if(imsi.length>6){
							this.up('form').getForm().findField('operator').setValue(imsi.substring(0,6));
						}
						
					}
				}
	        }, {
	            xtype: 'textfield',
	            name: 'alias',
	            fieldLabel: 'Alias',
	        },{
	        	xtype:'textfield',
	        	name:'mobile',
	        	fieldLabel:'Mobile Number'
	        }, {
	        	xtype:'hiddenfield',
	        	name:'operator',
	        	fieldLabel:'Operator'
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
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'simCardManager!addSIMCard.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('simCardTab').down('panel[itemId=grid]').getStore().load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                	this.up('form').getForm().reset();
		                this.up('window').hide();
	                }
	                
	            }
		        
		    }]
		});

Ext.define("app.view.operation.domain.group.AddSIMCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.addSIMCard',
	id:'addSIMCard',
	title : lanControll.getLanValue('tiAddSim'),
	closeAction: 'hide',
	layout:'fit',
	height : 240,
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:400,
    layout: 'fit',
    resizable: true,
//    modal: true,
    items: form
	
});
