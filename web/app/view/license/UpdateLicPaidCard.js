var form = Ext.widget('form', {
    border: false,
    frame:true,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '100%',
    },
    items: [{
		xtype: 'hiddenfield',
		name: 'uuids',
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
    },{
		xtype:'textfield',
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
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'licPaidCardManager!updatePaidCard.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
	              var obj=Ext.JSON.decode(response.responseText);			
				                  	if(obj['success']){
	              						Ext.getCmp('licAllPaidInFCloudPanel').down('panel[itemId=grid]').getStore().load();
	                    	}else{
	                		Ext.MessageBox.alert(boxFailture,boxCommitFail);	              	}
	            	}
            	});
            	this.up('form').getForm().reset();
            	this.up('window').hide();
            }
            }
        
    }]
});

Ext.define("app.view.license.UpdateLicPaidCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateLicPaidCard',
	id:'updateLicPaidCard',
	title : lanControll.getLanValue('tiUpdatePaid'),
	width : 420,
	closeAction: 'hide',
	closable:false,
    layout: 'fit',
    resizable: true,
    modal: true,
    cmpId:'',
    items: form
});

