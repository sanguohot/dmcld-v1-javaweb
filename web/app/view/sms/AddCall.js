var columns = [.2,.3,.2,.3];
var width = 600;
var form = Ext.widget('form', {
    border: false,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
//        align: 'stretch'
    },
    frame:true,
    defaults: {
        margins: '0 0 10 0',
        labelWidth:120,
        width:560,
    },
   
    items: [{
    	xtype:'textfield',
    	name:'callNumber',
    	fieldLabel:'Call Number',
//    	allowBlank: false,
    	width:330,
    },{
		xtype: 'radiogroup',
		name: 'callDirectionAll',
//		width:450,
		ulan:'callDirection',
		fieldLabel: 'Direction',
		columns: columns,
		items: [
			{boxLabel: 'CALL_IN',boxLabelCls:'box_label', name: 'callDirection',ulan:'callDirection_0', inputValue: 0,checked:true},
			{boxLabel: 'CALL_OUT&nbsp;&nbsp;',boxLabelCls:'box_label', name: 'callDirection',ulan:'callDirection_1', inputValue: 1},
		]						
    },{
		xtype: 'radiogroup',
		name: 'connectFlagAll',
//		width:450,
		fieldLabel: 'Connect Flag',
		columns: columns,
		items: [
			{boxLabel: 'No',boxLabelCls:'box_label', name: 'connectFlag',ulan:'no', inputValue: 0,checked:true},
			{boxLabel: 'Yes&nbsp;',boxLabelCls:'box_label', name: 'connectFlag',ulan:'yes', inputValue: 1,
//				listeners:{
//					change:function(field,newValue,oldValue,opts){
//				    	var callDuration=form.getForm().findField('callDuration');
//		    			if(newValue){
//		    				callDuration.setDisabled(false);
//				    	}else{
//				    		callDuration.setDisabled(true);
//				    	}
//					}
//				}
			},
		]						
    },{

    	xtype:'numberfield',
    	name:'callDuration',
    	fieldLabel:'Test Time(sec)',
    	width:195,
    	value: 0,
    	minValue:0,
    	maxLength:5,
    	maxValue:99999,
    	enforceMaxLength:true,
	
	},{
		xtype: 'radiogroup',
		name: 'testToneModeAll',
//		width:450,
		fieldLabel: 'Tone Mode',
		columns: columns,
		items: [
			{boxLabel: 'NULL&nbsp;',boxLabelCls:'box_label', name: 'testToneMode',ulan:'nall',id:'testToneMode1', inputValue: 0,checked:true},
			{boxLabel: 'DTMF_TEST&nbsp;',boxLabelCls:'box_label',ulan:'dtmfTest', name: 'testToneMode',id:'testToneMode2', inputValue: 1},
			{boxLabel: 'IVR_TEST&nbsp;',boxLabelCls:'box_label',ulan:'ivrTest', name: 'testToneMode',id:'testToneMode3', inputValue: 2,},
			{boxLabel: 'DTMF_SEND&nbsp;',boxLabelCls:'box_label',ulan:'dtmfSend', name: 'testToneMode',id:'testToneMode4', inputValue: 3,},
		],
		listeners:{
			change:function(field,newValue,oldValue,opts){
		    	var dtmfNumber=form.getForm().findField('dtmfNumber');
		    	var testToneMode=Ext.getCmp('testToneMode2').getValue();
		    	var testToneMode4=Ext.getCmp('testToneMode4').getValue();
		    	if(testToneMode){
		    		dtmfNumber.setDisabled(false);
		    		dtmfNumber.setValue(0);
		    		dtmfNumber.setEditable(false);
		    	}else if(testToneMode4){
    				dtmfNumber.setDisabled(false);
    				dtmfNumber.setEditable(true);
		    	}else{
		    		dtmfNumber.setDisabled(true);
		    	}
			}
		}
    },{
	    	name:'dtmfNumber',
			xtype: 'combo',
			mode: 'local',
			fieldLabel: '<label onmouseover=moveOver("dtmf_number",event) onmouseout=moveOut() class="tips_label">DTMF Number</label>',
			displayField: 'name',
			valueField: 'value',
			queryMode: 'local',
			width:330,
			maxLength:64,
			disabled:true,
			store: Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : '0', value: '000000'},
					{name : '1',  value: '111111'},
					{name : '2',  value: '222222'},
					{name : '3',  value: '333333'},
					{name : '4',  value: '444444'},
					{name : '5',  value: '555555'},
					{name : '6',  value: '666666'},
					{name : '7',  value: '777777'},
					{name : '8',  value: '888888'},
					{name : '9',  value: '999999'},
				]
			}),
			value:0,
	},{
		xtype: 'fieldcontainer',
		fieldLabel: lanControll.getLanValue('maxFailRetries'),
		layout:'hbox',
		allowBlank: false,
		items: [{
	    	xtype:'numberfield',
	    	name:'maxFailRetries',
	    	fieldLabel:'',
	    	width:70,
//	    	anchor: '20%',
	    	value: 0,
	    	minValue:0,
	    	maxLength:3,
	    	maxValue:245,
	    	enforceMaxLength:true,
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
		},
		{xtype: 'displayfield',width:200,value:lanControll.getLanValue('reSendUntilOk') },
		]
    },{
    	xtype:'displayfield',
    	name:'curFailRetries',
    	fieldLabel:'Cur Fail Retries',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'callResult',
    	fieldLabel:'Call Result',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'callTime',
    	fieldLabel:'Start Time',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'resultTime',
    	fieldLabel:'Result Time',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'receiptTime',
    	fieldLabel:'Report Time',
    	hidden:true
    },{
    	xtype:'hiddenfield',
    	name:'simUuids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'callUuids',
    },{
    	xtype:'hiddenfield',
    	name:'simCallUuids',
    }],

    buttons: [{
        text: 'Close',
        ulan:'btClose',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    },{
    	id:'call_cancel',
        text: 'Clear Status',
        ulan:'btClearStatus',
        handler: function() {
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            	Ext.Ajax.request({
            		url:'callManager!cancelCall.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simCallTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimCallTab';
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
    	id:'call_clear',
        text: 'Clear SMS',
        ulan:'btClearSms',
        handler: function() {
    		var form=this.up('form').getForm()
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var win=this.up('window');
            	Ext.Ajax.request({
            		url:'callManager!clearCall.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                		var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simCallTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimCallTab';
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
    	id:'call_save',
        text: 'Save',
        ulan:'btSave',
        handler: function() {
    		var form=this.up('form').getForm()
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var win=this.up('window');
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'callManager!sendCall.action?callStatus=0',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                		var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simCallTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimCallTab';
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
    	id:'call_send',
        text: 'Send Now',
        ulan:'btCommit',
        handler: function() {
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'callManager!sendCall.action?callStatus=1',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                		var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simCallTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimCallTab';
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

Ext.define("app.view.sms.AddCall", {
	extend : 'Ext.window.Window',
	alias : 'widget.addCall',
	id:'addCall',
	title : lanControll.getLanValue('boxSendCall'),
	width : width,
	closeAction: 'hide',
	minWidth : 350,
//	height : 400,
	minHeight: 250,
	y:100,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

