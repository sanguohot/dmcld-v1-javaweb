var form = Ext.widget('form', {

    border: false,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '75%',
    },
    items: [{
		xtype:'numberfield',
		fieldLabel:'Alarm Id',
		maxValue:2147483647,
		minValue:-2147483648,
		name:'alarmId',
		allowBlank: false
	},{
		xtype:'textfield',
		fieldLabel:'Alarm Name',
		name:'alarmName',
		allowBlank: false
	},{

        xtype: 'combo',
        name: 'alarmLevel',
        fieldLabel: 'Alarm Level',
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [ {
				name : '-SELECT-',
				statusId : -1
			},{
				name : 'EMERG',
				statusId :0
			}, {
				name : 'ALERT',
				statusId :1
			}, {
				name : 'CRIT',
				statusId :2
			}, {
				name : 'ERR',
				statusId :3
			}, {
				name : 'WARNING',
				statusId :4
			}, {
				name : 'NOTICE',
				statusId :5
			}, {
				name : 'INFO',
				statusId :6
//			}, {
//				name : 'DEBUG',
//				statusId :7
			}, {
				name : 'DISABLED',
				statusId :8
			} ]
		}),
		
    
	},{
		xtype:'textareafield',
		fieldLabel:'Description',
		name:'alarmDesc',
	},{
		xtype:'hiddenfield',
		name:'componentId',
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
    		
    		
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                var componentId=form.findField('componentId').getValue();
	                	Ext.Ajax.request({
	                		url:'alarmDomainDescManager!addAlarmDomainDesc.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
					                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(componentId).store.load();
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

Ext.define("app.view.systemconfig.AddAlarmDomainDesc", {
	extend : 'Ext.window.Window',
	alias : 'widget.addAlarmDomainDesc',
	id:'addAlarmDomainDesc',
	title : lanControll.getLanValue('tiAddDomainAlarmDesc'),
	width : 500,
	closeAction: 'hide',
	closable:true,
	minWidth : 350,
	height : 250,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
    listeners:{
		beforeshow:function(){
			form.getForm().reset();
		}
	}
});

