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
    items: [{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'File',
        msgTarget: 'side',
        allowBlank: false,
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
    				var form = this.up('form');
                	var bForm = this.up('form').getForm();
                	var params=bForm.getValues();
    				
                	var win=this.up('window');
	                if (bForm.isValid()) {
                    	bForm.submit({
                            url: 'importConfig!importDMNum.action',
                            timeout:60*60*1000,
                            waitMsg: boxWaitMsg,
                            params:params,
                            success: function(fp, o) {
                                Ext.MessageBox.alert(boxSuccess, o.result.msg);
        	                	bForm.reset();
        	 	                win.hide();
        	 	                form.store.load();
                            },
                            failure: function(form, action) {
                            	console.log(action)
                                switch (action.result.failType) {
                                    case 1:
                                        Ext.Msg.alert(boxFailture, lanControll.getLanValue("importWrongFormat"));
                                        break;
                                    case 2:
                                        Ext.Msg.alert(boxFailture, lanControll.getLanValue("importBlank"));
                                        break;
                                    default:
                                    	Ext.MessageBox.alert(boxFailture, boxImportFail);
                                    	break;
                               }
                            }
                        });
	                }
	               
            }
        
    }]
});

Ext.define("app.view.dm.ImportDMNum", {
	extend : 'Ext.window.Window',
	alias : 'widget.importDMNum',
	title : lanControll.getLanValue('btImport'),
	id:'importDMNum',
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

