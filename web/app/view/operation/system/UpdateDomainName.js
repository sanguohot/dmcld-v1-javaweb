Ext.define("app.view.operation.system.UpdateDomainName", {
	extend : 'Ext.window.Window',
	title : lanControll.getLanValue('tiRename'),
	width : 500,
	id:'updateDomainName',
	closeAction: 'hide',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    closable:false,
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
		    	xtype:'hiddenfield',
		    	name:'ids',
		    },{
		    	xtype:'hiddenfield',
		    	name:'orginal_name',
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
			    	var obj = this.up('form');
					var picture = this.up('form').getComponent('domain_name').getComponent('picture');
					if(picture.flag==0){
						return;
					}
		            if (this.up('form').getForm().isValid()) {
		            		var vendorId=Ext.get('vendorId').value;
		            		
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'domainListManager!updateName.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
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
		            }
		        
		    }]
		});
		this.items = [form];
		
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var domainName;
		if(maintenance){
			domainName = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'name',
				fieldLabel: 'Name',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}else{
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			var backupField = form.getForm().findField('orginal_name');
			var store = null;
			domainName = generalObj.createName('domain_name'
					,75,25,'name','Name','#fff'
					,'domainListManager!checkDomainName.action',store,backupField);
			if(store){
				store.on('load',function(){
	    			var picture = domainName.getComponent('picture');
	    			picture.update("");
	    			picture.flag = 2;
				});
			}else{
				this.domainName = domainName;
			}
		}
		
		form.insert(0,domainName);
		this.callParent();
	},
	listeners:{
		beforeshow:function(){
			var domainName = this.domainName;
			if(domainName){
    			var picture = domainName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			}
		}
	}
});

