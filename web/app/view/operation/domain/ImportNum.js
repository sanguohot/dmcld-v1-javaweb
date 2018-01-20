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
    	itemId:'viewGroup',
        xtype: 'checkboxgroup',
        name:'viewGroup',
        ulan:'numberRole',
        fieldLabel: "Number Role",
        columns: 3,
        vertical: true,
        items:[createCheckbox("caller",lanControll.getLanValue("numberRole_1"),false)
               ,createCheckbox("callee",lanControll.getLanValue("numberRole_2"),true)]
    },{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'File',
//        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
//        anchor: '100%',
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
                	console.log(params);
    				if(params["caller"]!="1" && params["callee"]!="1"){
    					Ext.MessageBox.alert(boxWarnning,lanControll.getLanValue("aNumRole"));
    					return;
    				}
    				
                	var win=this.up('window');
                	params["staticFlag"]=win.staticFlag;
	                if (bForm.isValid()) {
                    	bForm.submit({
                            url: 'importConfig!importBlackWhite.action',
                            timeout:60*60*1000,
                            waitMsg: boxWaitMsg,
                            params:params,
                            success: function(fp, o) {
                                Ext.MessageBox.alert(boxSuccess, boxUploadSucc);
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

Ext.define("app.view.operation.domain.ImportNum", {
	extend : 'Ext.window.Window',
	alias : 'widget.importPaidCard',
	title : lanControll.getLanValue('btImport'),
	id:'importNum',
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
//	height : 120,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

