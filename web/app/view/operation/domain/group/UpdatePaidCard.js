var form = Ext.widget('form', {
    border: false,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0'
    },
    frame:true,
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '75%',
    },
    items: [{
    	xtype:'hiddenfield',
    	name:'domainUuid'
    },{
    	xtype:'hiddenfield',
    	name:'uuid',
    	value:0,
    },{
    	xtype:'hiddenfield',
    	name:'paidStatusSearch'
    },{
    	xtype:'hiddenfield',
    	name:'paidReportSearch'
    },{
    	xtype:'hiddenfield',
    	name:'selectAll',
    	value:0,
    },{
    	xtype:'hiddenfield',
    	name:'discardCnt'
    },{
    	xtype:'hiddenfield',
    	name:'uuids'
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
        xtype: 'textfield',
        name:'alias',
        fieldLabel: 'Alias',
    },{
        xtype: 'combo',
        name: 'paidMode',
        fieldLabel: 'Paid Mode',
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
        disabled:true,
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
		    			if(newValue){
		    				callDuration.setDisabled(false);
				    	}else{
				    		callDuration.setDisabled(true);
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
	    	maxValue:99999,
	    	disabled:true,
		}]
	},{
        xtype: 'textfield',
        name:'paidContent',
        fieldLabel: 'Content',
        disabled:true,
    },{
        xtype: 'combo',
        name: 'paidStatus',
        fieldLabel: 'Paid Status',
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
			},{
				name : lanControll.getLanValue('paidStatus_'+0),
				statusId : 0
			},{
				name : lanControll.getLanValue('paidStatus_'+1),
				statusId : 1
//			},{
//				name : 'WAIT',
//				statusId : 2
//			},{
//				name : 'SENDING',
//				statusId : 3
			},{
				name : lanControll.getLanValue('paidStatus_'+4),
				statusId : 4
			},{
				name : lanControll.getLanValue('paidStatus_'+5),
				statusId : 5
			},{
				name : lanControll.getLanValue('paidStatus_'+6),
				statusId : 6
			}]
		}),
		listeners:{
			change:function(field,newValue,oldValue,opts){
		    	if(newValue>=0 && newValue<=10){
	    			var name=form.down('textfield[name=name]');
			    	var alias=form.down('textfield[name=alias]');
			    	var paidMode=form.down('combo[name=paidMode]');
	    			var paidNumber=form.down('textfield[name=paidNumber]');
	    			var paidContent=form.down('textfield[name=paidContent]');
	    			var paidStatus=form.down('combo[name=paidStatus]');
	    			var commit=Ext.getCmp('paidList-commit');
	
	    			var paidStatus=form.down('combo[name=paidStatus]');
	    			if(newValue==0||newValue==1||newValue==4||newValue==5||newValue==6){
	    				name.setReadOnly(false);
	    				name.setFieldStyle("background:#FFF");
	    				
	    				alias.setReadOnly(false);
	    				alias.setFieldStyle("background:#FFF");
	    				
	    				paidMode.setReadOnly(false);
	    				paidMode.setFieldStyle("background:#FFF");
	    				
	    				paidNumber.setReadOnly(false);
	    				paidNumber.setFieldStyle("background:#FFF");
	    				
	    				paidContent.setReadOnly(false);
	    				paidContent.setFieldStyle("background:#FFF");
	    				
	    				paidStatus.setReadOnly(false);
	    				paidStatus.setFieldStyle("background:#FFF");
	    				
	    				commit.setVisible(true);
	    				
	    			}else if(newValue==2||newValue==3){
	    				
	    				if(paidStatus.getValue()==2){
	    					paidStatus.setValue('WAIT');
	    				}else if(paidStatus.getValue()==3){
	    					paidStatus.setValue('SENDING');
	    				}
	    				
	    				name.setReadOnly(true);
	    				name.setFieldStyle("background:#DFE9F6");
	    				
	    				alias.setReadOnly(true);
	    				alias.setFieldStyle("background:#DFE9F6");
	    				
	    				paidMode.setReadOnly(true);
	    				paidMode.setFieldStyle("background:#DFE9F6");
	    				
	    				paidNumber.setReadOnly(true);
	    				paidNumber.setFieldStyle("background:#DFE9F6");
	    				
	    				paidContent.setReadOnly(true);
	    				paidContent.setFieldStyle("background:#DFE9F6");
	    				
	    				paidStatus.setReadOnly(true);
	    				paidStatus.setFieldStyle("background:#DFE9F6");
	    				
	    				commit.setVisible(false);
	    			}
    			}
    		}
    	}	
		
    },{
        xtype: 'displayfield',
        name:'paidReport',
        fieldLabel:'Report',
    }],

    buttons: [{
        text: 'Cancel',
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    }, {
    	id:'paidList-commit',
        text: 'Commit',
        ulan:'btCommit',
        handler: function() {
            var form = this.up('form').getForm();
            var paidGrpUuid=form.findField('paidGrpUuid').getValue();
            var discardCnt=form.findField('discardCnt').getValue();
           
            if (form.isValid()) {
            	Ext.Ajax.request({
            		url:'paidListManager!updatePaid.action',
            		method:'POST',
            		params:form.getValues(),
            		callback: function (options, success, response) {
                    	var obj=Ext.JSON.decode(response.responseText);			
			                  	if(obj['success']){
                    		if(discardCnt>0){
                    			Ext.MessageBox.alert(boxInfo,boxDiscardList+discardCnt);
                    		}else{
                    		}
                    		Ext.getCmp('paidListTab').down('panel[itemId=grid]').getStore().load({params:{paidGrpUuid:paidGrpUuid}});
                    	}else{
                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
                    	}
                	}
            	});
            }
            this.up('form').getForm().reset();
            this.up('window').hide();
            }
        
    }]
});

Ext.define("app.view.operation.domain.group.UpdatePaidCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.updatePaidCard',
	id:'updatePaidCard',
	title : tiSetting,
	width : 500,
	closeAction: 'hide',
	closable:false,
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
});

