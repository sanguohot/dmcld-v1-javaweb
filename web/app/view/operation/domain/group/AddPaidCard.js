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
    	xtype:'hiddenfield',
    	name:'domainUuid'
    },{
    	xtype:'hiddenfield',
    	name:'paidGrpUuid'
    },{
        xtype: 'textfield',
        name:'name',
        fieldLabel: 'Name',
        allowBlank: false,
        msgTarget:'none',
    },{
        xtype: 'combo',
        name: 'paidMode',
        fieldLabel: 'Paid Mode',
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		allowBlank: false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [{
				name : '-SELECT-',
				statusId : -1
			},{
				name : lanControll.getLanValue('paidMode_'+0),
				statusId : 0
			},{
				name : lanControll.getLanValue('paidMode_'+1),
				statusId : 1
			},{
				name : lanControll.getLanValue('paidMode_'+2),
				statusId : 2
			}]
		}),
		listeners:{
			change:function(field,newValue,oldValue,opts){
    			var paidNumber=form.down('textfield[name=paidNumber]');
    			var paidContent=form.down('textfield[name=paidContent]');
    			var connectFlagAll=form.down('radiogroup[name=connectFlagAll]');
    			var callDuration=form.down('numberfield[name=callDuration]');
    			
    			connectFlagAll.setVisible(false);
				callDuration.setVisible(false);
				paidContent.setFieldLabel(lanControll.getLanValue('content'));
    			if(newValue==1){
    				paidNumber.setDisabled(true);
    				paidContent.setDisabled(false);
    			}else if(newValue==2){
    				paidNumber.setDisabled(false);
    				paidContent.setDisabled(false);
    				paidContent.setFieldLabel(lanControll.getLanValue('dtmfNumber'));
    				connectFlagAll.setVisible(true);
    				callDuration.setVisible(true);
    			}else{
    				paidNumber.setDisabled(false);
    				paidContent.setDisabled(false);
    			}
    		}
    	}	
		
    },{
        xtype: 'textfield',
        name:'paidNumber',
        fieldLabel: 'Number',
    },{
		xtype: 'radiogroup',
		name: 'connectFlagAll',
		width:450,
		fieldLabel: 'Auto Connect Flag',
		columns: 3,
		items: [
			{boxLabel: 'No&nbsp;&nbsp;',boxLabelCls:'box_label', name: 'connectFlag',ulan:'no', inputValue: 0},
			{boxLabel: 'Yes&nbsp;',boxLabelCls:'box_label', name: 'connectFlag',ulan:'yes', inputValue: 1,
				listeners:{
					change:function(field,newValue,oldValue,opts){
				    	var callDuration=form.getForm().findField('callDuration');
				    	var paidContent=form.down('textfield[name=paidContent]');
		    			if(newValue){
		    				callDuration.setDisabled(false);
		    				paidContent.setDisabled(false);
				    	}else{
				    		callDuration.setDisabled(true);
				    		paidContent.setDisabled(true);
				    	}
					}
				}
			},
		]						
    },{
		xtype: 'fieldcontainer',
		layout:'hbox',
		items: [{
	    	xtype:'numberfield',
	    	name:'callDuration',
	    	fieldLabel:'Test Time(sec)',
	    	width:200,
	    	value: 0,
	    	minValue:0,
	    	maxValue:999,
	    	disabled:true,
		}]
	},{
        xtype: 'textfield',
        name:'paidContent',
        ulan:'content',
        fieldLabel: 'Content',
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
            var paidGrpUuid=form.findField('paidGrpUuid').getValue();
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'paidListManager!addPaid.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                    	var obj=Ext.JSON.decode(response.responseText);			
			                  	if(obj['success']){
                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
              						Ext.getCmp('paidListTab').down('panel[itemId=grid]').getStore().load({params:{paidGrpUuid:paidGrpUuid}});
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

Ext.define("app.view.operation.domain.group.AddPaidCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.addPaidCard',
	id:'addPaidCard',
	title : lanControll.getLanValue('tiAddPaidCard'),
	width : 500,
	closeAction: 'hide',
	closable:false,
	minWidth : 350,

	minHeight: 200,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
});

