var form = Ext.widget('form', {
    border: false,
    frame:true,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '75%',
    },
    items: [{
        xtype: 'combo',
        name: 'cardType',
        fieldLabel: 'Card Type',
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'value',
		queryMode : 'local',
		allowBlank: false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'value' ],
			data : [{
				name : '-SELECT-',
				value : -1
			},{
				name : lanControll.getLanValue('licPaidType_'+0),
				value : 0
			},{
				name : lanControll.getLanValue('licPaidType_'+1),
				value : 1
			}]
		}),
		value:0,
    },{
        xtype: 'textfield',
        name:'cardSn',
        fieldLabel: 'Card Sn',
        allowBlank: false,
        validateOnChange:false,
    	validator:function(val){return check(val,'licCardSn',false)}
    	
    },{
    	xtype: 'textfield',
    	name:'cardPwd',
    	ulan:'password',
    	fieldLabel: 'Card Password',
    	allowBlank: false,
    	minLength:8
    },{
        xtype: 'combo',
        name: 'cardStatus',
        fieldLabel: 'Card Status',
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'value',
		queryMode : 'local',
		allowBlank: false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'value' ],
			data : [{
				name : '-SELECT-',
				value : -1
			},{
				name : lanControll.getLanValue('licPaidStatus_'+0),
				value : 0
			},{
				name : lanControll.getLanValue('licPaidStatus_'+1),
				value : 1
			}]
		}),
		value:1,
    },{
        xtype: 'combo',
        name: 'cardPrice',
        fieldLabel: 'Card Price',
		mode : 'local',
		displayField : 'name',
		valueField : 'value',
		queryMode : 'local',
		allowBlank: false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'value' ],
			data : [{
				name : '-SELECT-',
				value : -1
			},{
				name : '50',
				value :50
			},{
				name : '150',
				value : 150
			},{
				name : '320',
				value : 320
			},{
				name : '500',
				value : 500
			},{
				name : '1000',
				value : 1000
			},{
				name : '2000',
				value : 2000
			},{
				name : '5000',
				value : 5000
			},{
				name : '10000',
				value : 10000
			}]
		}),
		value:1000,
		validateOnChange:false,
    	validator:function(val){return userCheck(val,/^(-)?[0-9]{0,9}$/)}
    },{
		xtype:'textareafield',
		fieldLabel:'Description',
		name:'detailDesc',
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
            var win=this.up('window');
            var cmpId=win.cmpId;
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'licPaidCardManager!addPaidCard.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                    	var obj=Ext.JSON.decode(response.responseText);			
			                  	if(obj['success']){
              						Ext.getCmp(cmpId).down('panel[itemId=grid]').getStore().load();
                    	}else{
                    		Ext.MessageBox.alert(boxFailure,boxCommitFail);
                    	}
                }
            	});
            	this.up('form').getForm().reset();
            	this.up('window').hide();
            }
            }
        
    }]
});

Ext.define("app.view.license.AddLicPaidCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.addLicPaidCard',
	id:'addLicPaidCard',
	title : lanControll.getLanValue('tiAddPaidCard'),
	width : 500,
	closeAction: 'hide',
	closable:false,
	minWidth : 350,
	minHeight: 200,
    layout: 'fit',
    resizable: true,
    modal: true,
    cmpId:'',
    items: form
});

