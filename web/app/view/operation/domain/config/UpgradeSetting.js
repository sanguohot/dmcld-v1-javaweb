var width = 500;
Ext.define("app.view.operation.domain.config.UpgradeSetting", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : width,
	closeAction: 'hide',
	closable:true,
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
		    },rs.createUpgradeType(2,null,{labelWidth:150}),{
	        	xtype:'hiddenfield',
	        	name:'componentId'
	        },{
	        	xtype:'hiddenfield',
	        	name:'neAlias'
	        },{
	        	xtype:'hiddenfield',
	        	name:'productId'
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
		    		var basicForm = this.up('form').getForm();
		    		
	                var form = this.up('form').getForm();
	                var componentId=form.findField('componentId').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'neManager!upgradeSetting.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
	                    		var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(componentId).down("panel[itemId=grid]").down('pagingtoolbar').moveFirst();
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
	},
	listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
		}
	}
});

