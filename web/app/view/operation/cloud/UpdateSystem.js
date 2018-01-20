var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0',
        labelWidth:200
    },
    params:null,
    items: [rs.createYesOrNoFlag('canRegisterFlag','不允许注册',{labelWidth:200}),{
		xtype:'combo',
		fieldLabel:'Domain',
		anchor: '60%',
		name:'manageDomain',
		ulan:'manDomainName',
		valueField:'uuid',
		displayField:'name',
		queryMode : 'local',
		editable:false,
		store:Ext.create('app.store.util.ComboxStore'),
	},{
		xtype:'textfield',
		fieldLabel:'SMTP Address',
		anchor: '60%',
		name:'smtpServer',
		value:''
	},{
		xtype:'numberfield',
		fieldLabel:'SMTP Port',
		anchor: '60%',
		name:'smtpPort',
		value:''
	}
	,rs.createYesOrNoFlag('startTls','Use TLS Encrypt',{labelWidth:200})
	,{
		xtype:'textfield',
		fieldLabel:'Account',
		name:'smtpUserName',
		anchor: '60%',
		value:''
	},{
		xtype:'textfield',
		fieldLabel:'Password',
		name:'smtpPassWord',
		inputType:'password',
		anchor: '60%',
		value:''
	},{
		xtype:'textfield',
		fieldLabel:'Mail from',
		name:'mailFrom',
		anchor: '60%',
		value:''
	},{
    	xtype:'hiddenfield',
    	name:'uuids',
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
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                var win=this.up('window');
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'sysManager!updateMuliSys.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
                    			var obj=Ext.JSON.decode(response.responseText);			
        			                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(win.cmpId).down('panel').down('grid[itemId=grid]').store.load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
		                    	form.reset();
	                    	}
	                	});
	                	win.hide();
	                }
	            }
            }
        
    }]
});

Ext.define("app.view.operation.cloud.UpdateSystem", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateSystem',
	title : tiSetting,
	id:'updateSystem',
	width : 560,
	closeAction: 'hide',
	minWidth : 350,
	height : 340,
    layout: 'fit',
    resizable: true,
    modal: true,
    cmpId:'',
    items: form
});

