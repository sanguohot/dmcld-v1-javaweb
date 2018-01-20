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
//    frame: true,
//    fileUpload:true,
    items: [{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'paidGrpUuid'
    },{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'File',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: lanControll.getLanValue('selFile'),
        validator:function(val){
			if(val.substring(val.length-4).toLowerCase()==".xls"){
				return true;
			}else{
				return "Only support xls file";
			}
		}
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
	                	var form = this.up('form').getForm();
	                	var win=this.up('window');
	                    if(form.isValid()){
	                        form.submit({
	                            url: 'importPaidCard.action',
	                            waitMsg: boxWaitMsg,
	                            success: function(fp, o) {
	                                Ext.MessageBox.alert(boxSuccess, boxUploadSucc);
	        	                	form.reset();
	        	 	                win.hide();
	        	 	               Ext.getCmp('paidListTab').down('panel[itemId=grid]').getStore().load();
	                            },
	                            failure:function(fp,o){
	                            	Ext.MessageBox.alert(boxSuccess, boxUploadFail);
	                            	form.reset();
	        	 	                win.hide();
	                            }
	                        });
	                    }
	                	


	                }
	               
            }
        
    }]
});

Ext.define("app.view.operation.domain.group.ImportPaidCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.importPaidCard',
	title : lanControll.getLanValue('tiImportPaid'),
	id:'importPaidCard',
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
	height : 120,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

