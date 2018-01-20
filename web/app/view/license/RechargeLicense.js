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
	            labelWidth: 150,
	            anchor: '100%'
	        },

			items :[{
				xtype: 'hiddenfield',
				name: 'usedSysUuid',
			},{
				xtype: 'hiddenfield',
				name: 'paidCardUuid',
			},{
				xtype: 'hiddenfield',
				name: 'usedDomainUuid',
			},{
				xtype: 'hiddenfield',
				name: 'name',
			},{
	            xtype: 'textfield',
	            name: 'cardSn',
	            fieldLabel: 'Card SN',
	            allowBlank: false,
	            maxLength:31,
	            enableKeyEvents:true,
				listeners:{
					change:function(field,newValue,oldValue,opts){
						this.up('window').task.delay(500);
					},
					keypress:function(field,e,eOpts){
		    			this.up('window').task.delay(500);
    				}
    			}
			},{
				xtype: 'textfield',
				name: 'cardPwd',
				ulan:'password',
				fieldLabel: 'Card Password',
				allowBlank: false,
				maxLength:31,
				enableKeyEvents:true,
				listeners:{
					change:function(field,newValue,oldValue,opts){
						this.up('window').task.delay(500);
					},
		    		keypress:function(field,e,eOpts){
		    			this.up('window').task.delay(500);
    				}
    			}	
	        },{
	    		xtype:'textareafield',
	    		name:'detailDesc',
	    		readOnly:true,
	    		fieldStyle:'background:#DFE9F6',
	    		fieldLabel:'Description'
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
	                var paidCardUuid=form.findField('paidCardUuid').getValue();
	                if(paidCardUuid<=0){
	                	boxCardInvalid = lanControll.getLanValue('boxCardInvalid');
	                	Ext.MessageBox.alert(boxInfo,boxCardInvalid);
	                	return;
	                }
	                var win=this.up('window');
	                var cmpId=win.cmpId;
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
	                		url:'licPaidCardManager!recharge.action',
	                		method:'POST',
	                		timeout:5*60*1000,
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
		        
		    }]
		});

Ext.define("app.view.license.RechargeLicense", {
	extend : 'Ext.window.Window',
	alias : 'widget.rechargeLicense',
	id:'rechargeLicense',
	title : lanControll.getLanValue('tiRecharge'),
	closeAction: 'hide',
	layout:'fit',
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:450,
    layout: 'fit',
    resizable: true,
    modal: true,
    store:{},
    cmpId:'',
    items: form,
    task:new Ext.util.DelayedTask(function(){
    	var cardSn=form.down('textfield[name=cardSn]');
    	var cardPwd=form.down('textfield[name=cardPwd]');
        var detailDesc=form.down('textareafield[name=detailDesc]');
        var paidCardUuid=form.down('hiddenfield[name=paidCardUuid]');
        if(cardSn.getValue().length>6 && cardPwd.getValue().length>6){
        	Ext.Ajax.request({
        		url:'licPaidCardManager!checkPaidCard.action',
        		method:'POST',
        		params:form.getValues(),
        		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                	if(obj['success']){
                		detailDesc.setValue(obj['cardDesc']);
                		paidCardUuid.setValue(obj['paidCardUuid']);
                	}else{
                		detailDesc.setValue(obj['cardDesc']);
                		paidCardUuid.setValue(0);
                	}
            	}
        	});
        }else{
        	paidCardUuid.setValue(0);
        	if(cardSn.getValue().length>0 && cardPwd.getValue().length>0){
        		detailDesc.setValue(cardSn.getValue()+" is Invalid,Please confirm the input.");
        	}
        }
    })
});