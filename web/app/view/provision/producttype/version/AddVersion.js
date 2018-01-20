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
    frame: true,
    
//    fileUpload:true,
    items: [{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'File',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: lanControll.getLanValue('selFile'),
    },{
    	xtype:'hiddenfield',
    	name:'provUrl',
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
	                	var provUrl=form.findField('provUrl').getValue();
	                	
	                	var win=this.up('window');
	                    if(form.isValid()){
	                    	try{
	                    		var task=null;
		                        form.submit({
		                            url: 'importVersion.action',
		                            waitMsg: 'Uploading file...',
		                            timeout:60*60*1000,
		                            success: function(fp, o) {
		                                Ext.MessageBox.alert(boxSuccess, boxUploadSucc);
		        	                	form.reset();
		        	 	                win.hide();
		        	 	                
		                            },
		                            failure:function(fp,o){
		                            	Ext.MessageBox.alert(boxFailture, boxUploadFail);
		                            	win.hide();
		                            	
		                            }
		                        });
		                       
	                    	}catch(e){
	                    		
	                    		Ext.MessageBox.alert(boxSuccess, boxUploadSucc);
        	                	form.reset();
        	 	                win.hide();
	                    	}

	                    }

	                }
	               
            }
        
    }]
});
Ext.define("app.view.provision.producttype.version.AddVersion", {
	extend : 'Ext.window.Window',
	alias : 'widget.addVersion',
	id:'addVersion',
	title : lanControll.getLanValue('boxAddVer'),
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
