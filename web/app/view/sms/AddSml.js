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
    	xtype:'textfield',
    	name:'number',
    	fieldLabel:'Send To',
    	ulan:'sendTo',
    	allowBlank: false
    },{
    	xtype:'textareafield',
    	name:'content',
    	fieldLabel:'Content',
    	allowBlank: false,
    	listeners:{
			change:function(field,newValue,oldValue,opts){
    			form.getForm().findField('words').setValue(field.getValue().length);
		    	var encode=form.getForm().findField('encode');
		    	var split=form.getForm().findField('split');
    			if(encode.getValue()==0){
		    		split.setValue(Math.ceil((field.getValue().length)/140));
		    	}else{
		    		split.setValue(Math.ceil((field.getValue().length)/70));
		    	}
				
			}
		}
    },{
		xtype: 'fieldcontainer',
		layout:'hbox',
		allowBlank: false,
		items: [{
		    	xtype:'displayfield',
		    	width:110,
			},{
		    	xtype:'displayfield',
		    	name:'words',
		    	fieldLabel:'Word',
		    	labelAlign: 'left',
		    	labelWidth:40,
		    	value:0,
			},{
		    	xtype:'displayfield',
		    	value:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			},{
		    	xtype:'displayfield',
		    	name:'split',
		    	fieldLabel:'Split',
//		    	labelWidth:30,
		    	labelAlign: 'left',
		    	
			}]
    },{
    	
		xtype: 'radiogroup',
		name: 'encodeAll',
		ulan:'encode',
		width:450,
		fieldLabel: 'Encode',
		columns: 3,
		items: [
		    {boxLabel: 'ASCII&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ascii', name: 'encode', inputValue: 1},
			{boxLabel: 'UNICODE&nbsp;',boxLabelCls:'box_label',ulan:'unicode', name: 'encode', inputValue: 0,checked:true},
		],
		allowBlank: false,
		listeners:{
			change:function(field,newValue,oldValue,opts){
    			var content=form.getForm().findField('content');
		    	var encode=form.getForm().findField('encode');
		    	var split=form.getForm().findField('split');
    			if(encode.getValue()==0){
		    		split.setValue(Math.ceil(content.getValue().length/140));
		    	}else{
		    		split.setValue(Math.ceil(content.getValue().length/70));
		    	}
				
			}
		}
    },{
    	
		xtype: 'radiogroup',
		name: 'learnAll',
		width:450,
		fieldLabel: 'Learn Number',
		ulan:'learnNumber',
		columns: 3,
		items: [
		    {boxLabel: 'NO&nbsp;&nbsp;',ulan:'learnNumber_0',boxLabelCls:'box_label', name: 'learnNumber', inputValue:0,checked:true},
			{boxLabel: 'YES',ulan:'learnNumber_1',boxLabelCls:'box_label', name: 'learnNumber', inputValue: 1},
		],
		listeners:{
			change:function(field,newValue,oldValue,opts){
    			var number=form.getForm().findField('number');
		    	var learnNumber=form.getForm().findField('learnNumber');
    			if(learnNumber.getValue()==0){
    				number.setFieldLabel('Send To');
		    	}else{
		    		number.setFieldLabel('<label onmouseover=moveOver("add_sml_number",event) onmouseout=moveOut() class="tips_label">Send To</label>');
		    	}
				
			}
		}
    },{
		xtype: 'fieldcontainer',
		fieldLabel: lanControll.getLanValue('maxFailRetries'),
		layout:'hbox',
		
		allowBlank: false,
		items: [{
	    	xtype:'numberfield',
	    	name:'maxFailRetries',
	    	fieldLabel:'',
	    	value: 0,
	    	width:95,
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
		},
		{xtype: 'displayfield',value:lanControll.getLanValue('reSendUntilOk') },
		]
    },{
    	xtype:'displayfield',
    	name:'curFailRetries',
    	fieldLabel:'Cur Fail Retrie',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'splitSucc',
    	fieldLabel:'Split Success',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'splitFail',
    	fieldLabel:'Split Failure',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'smsReceipt',
    	fieldLabel:'SMS Receipt',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'smsResult',
    	fieldLabel:'SMS Result',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'smsTime',
    	fieldLabel:'Send Time',
    	hidden:true
    },{
    	xtype:'displayfield',
    	name:'resultTime',
    	fieldLabel:'Sent Time',
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
    	name:'smlUuids',
    },{
    	xtype:'hiddenfield',
    	name:'simSmlUuids',
    }],

    buttons: [{
        text: 'Close',
        ulan:'btClose',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    },{
    	id:'sml_cancel',
        text: 'Clear Status',
        ulan:'btClearStatus',
        handler: function() {
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            	Ext.Ajax.request({
            		url:'smlManager!cancelSml.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simSmlTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimSmlTab';
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
    	id:'sml_clear',
        text: 'Clear SMS',
        ulan:'btClearSms',
        handler: function() {	
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            	Ext.Ajax.request({
            		url:'smlManager!clearSml.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                		var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simSmlTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimSmlTab';
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
    	id:'sml_save',
        text: 'Save',
        ulan:'btSave',
        handler: function() {
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'smlManager!sendSml.action?status=0',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                		var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
	              	                var id = 'simSmlTab';
	              	                if(maintenance){
	              	                	id = 'maintenanceSimSmlTab';
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
    	id:'sml_send',
        text: 'Send Now',
        ulan:'btCommit',
        handler: function() {
    		var maintenance = this.up('form').up('panel').maintenance;
    		var simcard = this.up('form').up('panel').simcard;
    		var form=this.up('form').getForm()
    		var win=this.up('window');
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'smlManager!sendSml.action?status=1',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                		var obj=Ext.JSON.decode(response.responseText);			
                    	if(obj['success']){
                    		form.reset();
	              	                win.hide();
      	                	var id = 'simSmlTab';
          	                	if(maintenance){
          	                		id = 'maintenanceSimSmlTab';
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

Ext.define("app.view.sms.AddSml", {
	extend : 'Ext.window.Window',
	alias : 'widget.addSml',
	id:'addSml',
	title : lanControll.getLanValue('boxSendSms'),
	width : 580,
	closeAction: 'hide',
	minWidth : 350,
	height : 400,
	minHeight: 250,
	y:100,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

