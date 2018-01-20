var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,

    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 180,
        anchor: '75%'
    },
    bodyStyle: {
		background: '#DFE9F6',
	},
    items: [{

        xtype: 'combo',
        name: 'logSysUuid',
        mode : 'local',
        editable:false,
        anchor:'50%',
        fieldLabel: 'Syslog Server',
        displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create("app.store.util.ComboxStore",{}),
    
	},{
        name: 'syslogExpiryDateFlag',
    	xtype:'checkbox',
        inputValue:1,
        boxLabel:'Set Syslog Expire Date',
		boxLabelCls:'box_label',
		listeners:{
        	change:function(field,newValue,oldValue,opts){
    			form.down('fieldcontainer[name=syslogExpiryDateFC]').setVisible(newValue);
        	}
        }
    },{
    	name: 'syslogExpiryDateFC',
    	fieldLabel: 'Expiry Date',
    	xtype: 'fieldcontainer',
    	layout:'hbox',
    	hidden:true,
    	items: [
				{xtype:'numberfield',name: 'expireDay', decimalPrecision:0,value: 1,width:50,minValue:0,maxValue:90 },
				{xtype: 'displayfield',width:40,value:'&nbsp;&nbsp;day' },
				{xtype:'numberfield',name: 'expireHour', decimalPrecision:0,value: 0,width:50,minValue:0,maxValue:23 },
				{xtype: 'displayfield',width:40,value:'&nbsp;&nbsp;hour' },
				{xtype:'numberfield',name: 'expireMin', decimalPrecision:0,value: 0,width:50,minValue:0,maxValue:59 },
				{xtype: 'displayfield',width:40,value:'&nbsp;&nbsp;min' },
				{xtype: 'hiddenfield',width:40,name:'syslogExpiryDate',value:'' },
			]
		
    },{
        xtype: 'combo',
        name: 'syslogDebugLevel',
        fieldLabel: 'Syslog Debug Level',
		mode : 'local',
		editable:false,
		anchor:'50%',
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [ {
				name : 'EMERG',
				statusId : 0
			},{
				name : 'ALERT',
				statusId : 1
			}, {
				name : 'CRIT',
				statusId : 2
			},{
				name : 'ERR',
				statusId : 3
			},{
				name : 'WARNING',
				statusId : 4
			},{
				name : 'NOTICE',
				statusId : 5
			},{
				name : 'INFO',
				statusId : 6
			},{
				name : 'DEBUG',
				statusId : 7
			} ]
		}),
        
    },{
    	name: 'cdrLogFlag',
    	xtype:'checkbox',
        inputValue:1,
        boxLabel:'Enable CDR Log',
		boxLabelCls:'box_label'
    },{
    	name: 'signalLogFlag',
    	xtype:'checkbox',
        inputValue:1,
        boxLabel:'Enable Signal Log',
		boxLabelCls:'box_label'
    },{
    	name: 'mediaLogFlag',
    	xtype:'checkbox',
        inputValue:1,
        boxLabel:'Enable Media Log',
		boxLabelCls:'box_label'
    },{
    	name: 'systemLogFlag',
    	xtype:'checkbox',
        inputValue:1,
        boxLabel:'Enable System Log',
		boxLabelCls:'box_label'
    },{
        name: 'mngLogFlag',
        xtype:'checkbox',
        inputValue:1,
        boxLabel:'Enable Management Log',
		boxLabelCls:'box_label'
    },{
    	xtype:'hiddenfield',
    	name:'productSnStr',
    },{
    	xtype:'hiddenfield',
    	name:'uuid',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
        name: 'parentId',
    	xtype:'hiddenfield',
    },{
        name: 'syslogStatus',
    	xtype:'hiddenfield',
        value:1,
    }],

    buttons: [{
        text: 'Cancel',
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
            
//            var syslogExpiryDate=r.get('syslogExpiryDate');
//			if(syslogExpiryDate!=null && syslogExpiryDate!=undefined){
//				tab.down('checkbox[name=syslogExpiryDateFlag]').setValue(1);
//				tab.down('numberfield[name=expireDay]').setValue(syslogExpiryDate.getDate());
//				tab.down('numberfield[name=expireHour]').setValue(syslogExpiryDate.getHours());
//				tab.down('numberfield[name=expireMin]').setValue(syslogExpiryDate.getMinutes());
//			}
        }
    }, {
        text: 'Commit',
        ulan:'btCommit',
        handler: function() {
    		var form=this.up('form').getForm();
            if (form.isValid()) {
	                var parentId=form.findField('parentId').getValue();
	                
	                var syslogExpiryDateFlag=this.up('form').down('checkbox[name=syslogExpiryDateFlag]').getValue();
	                var syslogExpiryDate=this.up('form').down('hiddenfield[name=syslogExpiryDate]');
	                if(syslogExpiryDateFlag==1){
	                	var expireDay=this.up('form').down('numberfield[name=expireDay]').getValue();
	                	var expireHour=this.up('form').down('numberfield[name=expireHour]').getValue();
	                	var expireMin=this.up('form').down('numberfield[name=expireMin]').getValue();
	                	syslogExpiryDate.setValue('2013-01-'+expireDay+" "+expireHour+":"+expireMin+":00");
	                }else{
	                	syslogExpiryDate.setValue('');
	                }
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'neManager!startSyslog.action',
	                		method:'POST',
	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(parentId).store.load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
		                    	form.reset();
	                    	}
	                	});
	                }
	                
	                this.up('window').hide();
	            }
            }
        
    }]
});

Ext.define("app.view.operation.domain.roamzone.site.StartSyslog", {
	extend : 'Ext.window.Window',
	alias : 'widget.startSyslog',
	title : lanControll.getLanValue('tiStartSyslog'),
	id:'startSyslog',
	width : 600,
	closeAction: 'hide',
	minWidth : 350,
	
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

