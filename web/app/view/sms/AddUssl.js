var form = Ext.widget('form', {
    border: false,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    frame:true,
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth:120,
        anchor: '80%',
    },
    items: [{
    	xtype:'textareafield',
    	name:'content',
    	fieldLabel:'Content',
    	allowBlank: false,
    },{
    	xtype: 'radiogroup',
		name: 'ussdParamAll',
		ulan:'ussdParam',
		fieldLabel: 'Ussd Param',
		columns: 3,
		items: [
			{boxLabel: 'SEND',boxLabelCls:'box_label',width:60,ulan:'ussdParam_1', name: 'ussdParam', inputValue: 1,checked:true},
			{boxLabel: 'CANCLE_SESSION',boxLabelCls:'box_label',ulan:'ussdParam_2', name: 'ussdParam', inputValue:2},
		],
    },{
    	xtype:'displayfield',
    	name:'ussdResult',
    	fieldLabel:'Ussd Result',
    	hidden:true
    },{
		xtype: 'fieldcontainer',
		fieldLabel: lanControll.getLanValue('maxFailRetries'),
		layout:'hbox',
		
		allowBlank: false,
		items: [{
	    	xtype:'numberfield',
	    	name:'maxFailRetries',
	    	fieldLabel:'',
	    	width:95,
	    	value: 0,
	    	minValue:0,
	    	maxValue:245,
		},{xtype: 'displayfield',width:20,value:'' },{
	    	xtype:'checkbox',
	    	name:'maxFailRetries2',
	    	fieldLabel:'',
	    	inputValue:255,
	    	listeners:{
	        	change:function(field,newValue,oldValue,opts){
	    			form.down('numberfield[name=maxFailRetries]').setDisabled(newValue);
	    		}
	    	}
		},{xtype: 'displayfield',width:200,value:lanControll.getLanValue('reSendUntilOk') },
    ]
    },{
    	xtype:'displayfield',
    	name:'curFailRetries',
    	fieldLabel:'Cur Fail Retries',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'ussdTime',
    	fieldLabel:'Ussd Time',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'resultTime',
    	fieldLabel:'Sent Time',
    	hidden:true
    },{
    	xtype:'hiddenfield',
    	name:'simUuids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'usslUuids',
    },{
    	xtype:'hiddenfield',
    	name:'simUsslUuids',
    }],

    buttons: [{
        text: 'Close',
        ulan:'btClose',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    },{
    	id:'ussl_cancel',
        text: 'Clear Status',
        ulan:'btClearStatus',
        handler: function() {
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            var maintenance = this.up('form').up('panel').maintenance;
            var simcard = this.up('form').up('panel').simcard;
        	Ext.Ajax.request({
        		url:'usslManager!cancelUssl.action',
        		method:'POST',
        		params:form.getValues(),
        		callback: function (options, success, response) {
            	var obj=Ext.JSON.decode(response.responseText);			
                	if(obj['success']){
                		form.reset();
              	                	win.hide();
              	                	var id = 'simUsslTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimUsslTab';
	              	                }
	              	                if(simcard==1){
		              	                Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		              	            }
              	               		Ext.getCmp(id).down('panel[itemId=grid]').getStore().load();
                	}else{
                		Ext.MessageBox.alert(boxFailture,boxCommitFail);
                	}
           }
        	});
            }
    },{
    	id:'ussl_clear',
        text: 'Clear Ussd',
        ulan:'btClearUssd',
        handler: function() {
    		var form=this.up('form').getForm()
    		var win=this.up('window');
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
        	Ext.Ajax.request({
        		url:'usslManager!clearUssl.action',
        		method:'POST',
        		params:form.getValues(),
        		callback: function (options, success, response) {
            		var obj=Ext.JSON.decode(response.responseText);			
                	if(obj['success']){
                		form.reset();
              	               		win.hide();
               	                	var id = 'simUsslTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimUsslTab';
	              	                }
              	                 	if(simcard==1){
	              	                	Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
	              	                }
              	                	Ext.getCmp(id).down('panel[itemId=grid]').getStore().load();
                	}else{
                		Ext.MessageBox.alert(boxFailture,boxCommitFail);
                	}
           }
        	});
            }
    },{
    	id:'ussl_save',
        text: 'Save',
        ulan:'btSave',
        handler: function() {
    		var form=this.up('form').getForm()
    		var win=this.up('window');
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'usslManager!sendUssl.action?status=0',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	           	                var id = 'simUsslTab';
              	               		if(maintenance){
              	               	 		id = 'maintenanceSimUsslTab';
              	                	}
              	               		if(simcard==1){
 	              	                	Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
 	              	                }
	              	                Ext.getCmp(id).down('panel[itemId=grid]').getStore().load();
                    	}else{
                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
                    	}
               }
            	});
            }
            }
    },{
    	id:'ussl_send',
        text: 'Send Now',
        ulan:'btCommit',
        handler: function() {
    		var form=this.up('form').getForm()
    		var win=this.up('window');
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'usslManager!sendUssl.action?status=1',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	           	                var id = 'simUsslTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimUsslTab';
	              	                }
	              	                if(simcard==1){
	              	                	Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
	              	                }
	              	                Ext.getCmp(id).down('panel[itemId=grid]').getStore().load();
                    	}else{
                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
                    	}
               }
            	});
            }
            }
    }]
});

Ext.define("app.view.sms.AddUssl", {
	extend : 'Ext.window.Window',
	alias : 'widget.addUssl',
	id:'addUssl',
	title : lanControll.getLanValue('boxSendUssd'),
	width : 550,
	closeAction: 'hide',
	minWidth : 380,
	height : 240,
	minHeight: 180,
	y:100,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

