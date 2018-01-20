var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,
    frame:true,
    fieldDefaults: {
    	labelWidth: 180,
    },
    defaults: {
        margins: '0 0 10 0'
    },

    items: [{
        xtype: 'combo',
        name: 'apiEnabled',
        fieldLabel: 'Service API Enabled',
		mode : 'local',
		editable:false,
		
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [{
				name : '-SELECT-',
				statusId : -1
			}, {
				name : lanControll.getLanValue('enableOrDisable_'+0),
				statusId : 0
			}, {
				name : lanControll.getLanValue('enableOrDisable_'+1),
				statusId : 1
			} ]
		}),
		value:-1
    },{
    	xtype: 'numberfield',
    	name:'maxTimeoutSec',
    	fieldLabel: 'Max Request Timeout(sec)',
    	minValue:0,
    	maxValue:99999
    },{
    	xtype: 'combo',
    	name:'apiAuthType',
    	fieldLabel: 'API Auth Type',
    	mode : 'local',
		editable:false,
		anchor: '75%',
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [{
				name : '-SELECT-',
				statusId : -1
			}, {
				name : 'NULL',
				statusId : 0
			}, {
				name : 'MD5',
				statusId : 1
			} ]
		}),
		value:-1
//    },{
//    	xtype: 'textfield',
//    	name:'apiAuthPwd',
//    	fieldLabel: 'API Auth Password',
    }, createPasswordContainer({name:'apiAuthPwd',ulan:'apiAuthPwd'}),{
    	xtype: 'numberfield',
    	name:'maxReqPerMin',
    	fieldLabel: 'Max Request Per Minute',
    	minValue:0,
    	maxValue:99999
    },{
    	xtype: 'combo',
    	name:'apiAclFlag',
    	fieldLabel: 'API ACL Control',
    	mode : 'local',
		editable:false,
		anchor: '75%',
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [{
				name : '-SELECT-',
				statusId : -1
			}, {
				name : lanControll.getLanValue('yesOrNo_'+0),
				statusId : 0
			}, {
				name : lanControll.getLanValue('yesOrNo_'+1),
				statusId : 1
			} ]
		}),
		value:-1
    },{
    	xtype: 'textfield',
    	name:'validIpAddr',
    	fieldLabel: 'Valid IP Address-1',
    },{
    	xtype: 'textfield',
    	name:'validIpAddr2',
    	fieldLabel: 'Valid IP Address-2',
    },{
    	xtype: 'textfield',
    	name:'validIpAddr3',
    	fieldLabel: 'Valid IP Address-3',
    },{
    	xtype: 'combo',
    	name:'apiTrapFlag',
    	fieldLabel: 'API Trap Setting',
    	mode : 'local',
		editable:false,
		anchor: '75%',
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [{
				name : '-SELECT-',
				statusId : -1
			}, {
				name : lanControll.getLanValue('yesOrNo_'+0),
				statusId : 0
			}, {
				name : lanControll.getLanValue('yesOrNo_'+1),
				statusId : 1
			} ]
		}),
		value:-1
    },{
    	xtype: 'textfield',
    	name:'trapIpAddr',
    	fieldLabel: 'Trap IP Address',
    },{
    	xtype: 'numberfield',
    	name:'trapPortNo',
    	fieldLabel: 'Trap Port No',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'name',
    }],

    buttons: [{
        text: 'Cancel',
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('form').getForm().findField('apiEnabled').setValue(-1);
            this.up('window').hide();
        }
    }, {
        text: 'Commit',
        ulan:'btCommit',
        handler: function() {
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                var obj = this.up('form');
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'userManager!updateUserAPI.action',
	                		method:'POST',
//	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	if(success){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		obj.store.load();
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

Ext.define("app.view.operation.user.UpdateUserAPI", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateUserAPI',
	title : lanControll.getLanValue('tiApiSetting'),
	id:'updateUserAPI',
	closeAction: 'hide',
	width:600,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

