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
    bodyStyle: {
		background: '#DFE9F6',
	},
//    frame: true,
//    fileUpload:true,
    items: [{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'File',
        labelWidth:140,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: lanControll.getLanValue('selFile'),
        validator:function(val){
			if(val.substring(val.length-4).toLowerCase()==".xls" || val.substring(val.length-4).toLowerCase()=='.zip'){
				return true;
			}else{
				return "Only support xls file";
			}
		}
    },{
		name : 'specSysUuid',
		xtype: 'combo',
		mode: 'local',
		fieldLabel: 'Spec Server',
		displayField: 'name',
		valueField: 'uuid',
		queryMode: 'local',
		labelWidth: 140,
		store:Ext.create('app.store.util.ComboxStore',{}),
		editable:false,
		hidden:true,
		value:-1,
	},rs.createSysLockedFlag({labelWidth:140}),
	rs.createYesOrNoFlag('importLic',lanControll.getLanValue('tiImportLic'),{labelWidth:140}),
	{
    	xtype:'hiddenfield',
    	name:'type',
    	value:1
    },{
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
	                	var importMode=win.importMode;
	                	var cmpId=win.cmpId;
	                	
	                	Ext.MessageBox.confirm(boxWarnning,boxRestore,function(e) {
	                		if( e == 'yes' ){
	                		var store=Ext.create('app.store.util.StepStore');
	                		form.submit({
	                            url: 'importConfig!'+importMode+'.action',
//	                            waitMsg: 'Uploading Config...',
	                            success: function(fp, o) {
	                				Ext.MessageBox.hide();
	                				autoRefresh.stopTask(null,store);
	                				Ext.MessageBox.alert(boxSuccess, boxUploadSucc);
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
	                   			autoRefresh.stopTask(null,store);
	                   			Ext.MessageBox.alert(boxFailture, boxUploadFail);
	                            	form.reset();
	        	 	                win.hide();
	                            }
	                        });
	                		
	                		var boxObj = {
                		    		title:boxInfo,
                		    		width : 300,
                		    		msg:boxWaitMsg,
                		    		modal:true,
                		    		closable:false,
                		    		wait:true
                		    };
                			sleepBar(store,true);
	                		
	                		}
	                	});

	                }
	               
            }
        
    }]
});

Ext.define("app.view.operation.ImportConfig", {
	extend : 'Ext.window.Window',
	alias : 'widget.importConfig',
	id:'importConfig',
	title : lanControll.getLanValue('tiImportCfg'),
	importMode:'',
	cmpId:'',
	width : 450,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

