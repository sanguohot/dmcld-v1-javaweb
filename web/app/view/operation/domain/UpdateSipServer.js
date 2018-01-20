Ext.define("app.view.operation.domain.UpdateSipServer", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : 500,
	closeAction: 'hide',
	closable:true,
	id:'updateSipServer',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    closable:true,
    tipId:'',
    initComponent:function(){
		this.createView();
		this.callParent();
	},
	createView:function(){
		this.items = this.createForm();
	},
	createForm:function(){
		return Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '100%',
		        labelWidth: 150
		    },
		    items: [{
		    	xtype:'hiddenfield',
		    	name:'ids'
		    },rs.createSipLockedFlag('sipsrvLockFlagAbbr',null),{
		    	xtype:'textfield',
		    	name:'primarySipServer',
		    	fieldLabel:'Primary SIP Server',
		    	maxLength:127
		    },{
		    	xtype:'numberfield',
		    	name:'primarySipsrvPort',
		    	fieldLabel:'Primary Port',
		    	minValue:0,maxValue:65535
		    },{
		    	xtype:'textfield',
		    	name:'secondarySipServer',
		    	fieldLabel:'Secondary SIP Server',
		    	maxLength:127
		    },{
		    	xtype:'numberfield',
		    	name:'secondarySipsrvPort',
		    	fieldLabel:'Secondary Port',
		    	minValue:0,maxValue:65535
		    },{
		    	xtype:'hiddenfield',
		    	name:'orginal_name',
		    },{
		    	xtype:'hiddenfield',
		    	name:'neAlias',
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
		            		var vendorId=Ext.get('vendorId').value;
		            		
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'neManager!updateNeSipServer.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		Ext.getCmp('config_sipserver').down('pagingtoolbar').moveFirst();
				                    	}else{
				                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
				                    	}
			                    	}
			                	});
			                }
			                this.up('form').getForm().reset();
			                this.up('window').hide();
			            }
		            }		        
		    }]
		});
	},
	listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
		}
	}
});

