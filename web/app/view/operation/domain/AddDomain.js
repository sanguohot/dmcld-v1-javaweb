var width = 500;

Ext.define("app.view.operation.domain.AddDomain", {
	extend : 'Ext.window.Window',
	alias : 'widget.addDomain',
	id:'addDomain',
	title : lanControll.getLanValue('tiAddDomain'),
	width : width,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    domainStore:null,
//    items: form,
    initComponent:function(){
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    store:store,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '75%',
		    },
		    items: [{
		    	xtype:'hiddenfield',
		    	name:'orginal_name',
		    	value:"",
		    },{
				name : 'cloudUuid',
				xtype: 'combo',
				mode: 'local',
				fieldLabel: 'Spec Cloud',
				ulan:'specCloud',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				labelWidth: 180,
				store:Ext.create('app.store.util.ComboxStore',{}),
				editable:false,
				allowBlank: false,
				listeners :{
	    			change:function(cmp){
			    		if(cmp.getValue()==-1){
	    					return;
	    				}
			    		if(!cmp.isVisible()){
			    			return;
			    		}
			    		var firstLoad=form.up('panel').firstLoad;
			    		if(firstLoad){
			    			form.up('panel').firstLoad=false;
			    			return;
			    		}
	    				var comboxStore = Ext.create("app.store.util.ComboxStore",{});
	    				var specSysUuid=this.up('form').getForm().findField("specSysUuid");
	    				var specSysUuidStore = specSysUuid.getStore();
	    				specCloudUuid=cmp.getValue();
	    				var params = {params:{cloudUuid:specCloudUuid,types:'server'}};
	    				comboxStore.on('load',function(){
	    					specSysUuidStore.removeAll();
	    					specSysUuidStore.add({uuid:-1,name:'-SELECT-'});
	    					specSysUuidStore.add({uuid:0,name:'NULL'});
	    					for(var i=0; i<comboxStore.getCount(); i++){
	    						if(comboxStore.getAt(i).get('type')=='server'){
	    							specSysUuidStore.add(comboxStore.getAt(i));
	    						}
	    					}
	    					specSysUuid.setValue(0);
	    						
	    				},this,{single: true})
	    				comboxStore.load(params);
	    			}
	    		}
			},{
				name : 'specSysUuid',
				xtype: 'combo',
				mode: 'local',
				fieldLabel: 'Specific Server',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				labelWidth: 180,
				store:Ext.create('app.store.util.ComboxStore',{}),
				editable:false,
				allowBlank: false,
				value:-1,
			},{
		    	xtype:'textfield',
		    	name:'password',
		    	fieldLabel:'Password',
		    	allowBlank: false,
		    	labelWidth: 180,
		    	inputType: 'password'
		    },{
		    	xtype:'textfield',
		    	name:'email',
		    	fieldLabel:'Email',
		    	labelWidth: 180,
		    	allowBlank: false
		    },{
		    	xtype:'textfield',
		    	name:'phone',
		    	labelWidth: 180,
		    	fieldLabel:'Phone'
		    },{
		    	xtype:'textfield',
		    	name:'mobile',
		    	labelWidth: 180,
		    	fieldLabel:'Mobile'
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
			    	var store = obj.store;
					var picture = obj.getComponent('domain_name').getComponent('picture');
					if(picture.flag!=1)
						return;
		            if (this.up('form').getForm().isValid()) {
		            		var vendorId=Ext.get('vendorId').value;
		            		
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'registerManager.action?vendorId='+vendorId,
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		store.load();
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
			var backupField = null;
			var store = null;
			domainName = generalObj.createName('domain_name'
					,75,25,'domainName','Domain Name','#fff'
					,'registerManager!check.action',store,backupField);
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
		
		form.insert(3,domainName);
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

