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
    	name:'name'
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    	value:0,
    },{
    	xtype:'hiddenfield',
    	name:'uuid',
    	value:0,
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
			if(val.substring(val.length-4).toLowerCase()==".xml"){
				return true;
			}else{
				return "Only support xml file";
			}
		}
    }],

    buttons: [{
        text: 'Cancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    }, {
        text: 'Commit',
        handler: function() {
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	var form = this.up('form').getForm();
	                	var win=this.up('window');
	                	var importMode=win.importMode;
	                	var cmpId=win.cmpId;
	                	boxImportLic = lanControll.getLanValue('boxImportLic');
	                	Ext.MessageBox.confirm(boxInfo,boxImportLic,function(e) {
	                		if( e == 'yes' ){
	                		form.submit({
	                            url: 'importConfig!importLicense.action',
	                            success: function(fp, o) {
	                				Ext.MessageBox.hide();
	                				Ext.MessageBox.alert(boxSuccess, boxImportSucc);
	        	                	form.reset();
	        	 	                win.hide();
	        	 	                if(Ext.getCmp(cmpId).store){
	        	 	                	Ext.getCmp(cmpId).store.load();
	        	 	                }else{
	        	 	                	Ext.getCmp(cmpId).down('panel[itemId=grid]').store.load();
	        	 	                }
	                            },
	                            failure:function(fp,o){
	                            	Ext.MessageBox.hide();
	                   			Ext.MessageBox.alert(boxFailture, boxImportFail);
	                            	form.reset();
	        	 	                win.hide();
	                            }
	                        });
	                		
	                		Ext.MessageBox.show({
            		    		title:boxInfo,
            		    		width : 300,
            		    		msg:boxWaitMsg,
            		    		modal:true,
            		    		closable:false,
            		    		wait:true
	                		});
	                		
	                		}
	                	});

	                }
	               
            }
        
    }]
});

Ext.define("app.view.license.ImportLicense", {
	extend : 'Ext.window.Window',
	alias : 'widget.importLicense',
	id:'importLicense',
	title : lanControll.getLanValue('tiImportLic'),
	importMode:'',
	cmpId:'',
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

