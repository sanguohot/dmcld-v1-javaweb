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
    items: [{
    	xtype:'textfield',
    	name:'backupName',
    	ulan:'name',
    	fieldLabel:'Name',
    },{    	
    	xtype:'textareafield',
    	name:'backupDesc',
    	ulan:'detailDesc',
    	fieldLabel:'Description',
	}],

    buttons: [{
        text: 'Cancel',
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    },{
        text: 'Commit',
        ulan:'btCommit',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
            	var form = this.up('form').getForm();
            	var win=this.up('window');
            	var cmpId=win.cmpId;
            	
            	var url=win.url;
				Ext.MessageBox.confirm(boxInfo,boxBackup,function(e) {
            		if( e == 'yes' ){
            			var boxObj = {
            		    		title:boxInfo,
            		    		width : 300,
            		    		msg:boxWaitMsg,
            		    		modal:true,
            		    		closable:false,
            		    		wait:true
            		    };
            			var store=Ext.create('app.store.util.StepStore');
            			sleepBar(store,true);
            			Ext.Ajax.request({
    		           		url:url,
    		           		params:form.getValues(),
    		           		method:'POST',
    		           		timeout:30*60*1000,
    		           		callback: function (options, success, response) {
                				boxObj.wait = false;
                				Ext.MessageBox.hide();
	                   		autoRefresh.stopTask(null,store);
            					var obj=Ext.JSON.decode(response.responseText);
    	                   	if(obj["success"]){
    	                   		win.hide();
    	                   		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
    	                   	}else{
    	                   		win.hide();
    	                   		if(obj["msgcode"]==99){
    	                   			Ext.MessageBox.alert(boxFailture,rs.msgCode(99));
    	                   		}else{
    	                   			Ext.MessageBox.alert(boxFailture,boxCommitFail);
    	                   		}
    	                   	}
	               	}
    		           	})
            	}});
            }
       }
    }]
});

Ext.define("app.view.operation.BackupToCloud", {
	extend : 'Ext.window.Window',
	alias : 'widget.backupToCloud',
	id:'backupToCloud',
	title : lanControll.getLanValue('btBackup'),
	importMode:'',
	cmpId:'',
	width : 550,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
});

