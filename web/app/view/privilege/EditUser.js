Ext.define("app.view.privilege.EditUser", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : 500,
//	id:'editUser',
	closeAction: 'destroy',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
//    closable:true,
    tipId:'',
    initComponent:function(){
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '75%',
		    },
		    items: [{
				xtype:'combo',
				fieldLabel:"Role",
				displayField : 'name',
				valueField : 'roleId',
				name:'roleId',
				editable:false,
				allowBlank:false,
				store : Ext.create('app.store.privilege.RoleStore', {}),				
			},{
				xtype:'textfield',
				fieldLabel:'Email',
				name:'email',
			},{
				xtype:'textfield',
				fieldLabel:'Phone',
				name:'phone',
			},{
				xtype:'textfield',
				fieldLabel:'Address',
				name:'address',
			},{
				xtype:'textfield',
				fieldLabel:'Detail',
				name:'detailDesc',
			},{
				xtype:'hiddenfield',
				name:'uuid',
			},{
				xtype:'hiddenfield',
				name:'domainUuid',
			}],
	
		    buttons: [{
		        text: 'Cancel',
		        ulan:'btCancel',
		        handler: function() {
		            this.up('form').getForm().reset();
		            this.up('window').close();
		        }
		    }, {
		        text: 'Commit',
		        ulan:'btCommit',
		        handler: function() {
		    		var userStore = this.up('form').userStore;
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'userManager!updateUser.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
	                    		var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		userStore.load();
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
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
		this.items = [form];
		
		this.callParent();
	},
	listeners:{
		beforeshow:function(){
			this.down("combo").store.load();
		}
	}
});

