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
    frame:true,
    items: [{
		name : 'vendorId',
		xtype : 'combo',
		mode : 'local',
		fieldLabel : 'Vendor',
		displayField : 'vendorName',
		valueField : 'vendorId',
		editable:false,
		queryMode : 'local',
		listeners:{ 
   			change: function(field,newValue,oldValue,opts) {
				var productId=form.getForm().findField('productId').getValue();
				var maxVersion=form.getForm().findField('maxVersion').getValue();
				var packageField=form.getForm().findField('packageVer');
				var upgradeTypes=form.getForm().findField('upgradeTypes').getValue();
				packageField.setValue('');
//				var upgradeVersionStore=packageField.getStore();
				var upgradeVersionStore=packageField.getStore();
				
				var provUrl=form.getForm().findField('provUrl').getValue();
//				if(upgradeVersionStore.storeId!='upgradeVersionStore'){
//					upgradeVersionStore=Ext.create('app.store.provision.UpgradeVersionStore',{});
//				}
//				provUrl="http://172.16.66.99:8080/SIMCloud/";
				upgradeVersionStore.on('beforeload', function (upgradeVersionStore, options) {
    				var params = { productId:productId,vendorId:newValue,maxVersion:maxVersion,upgradeTypes:upgradeTypes,provUrl:'',status:-1};
    				Ext.apply(upgradeVersionStore.proxy.extraParams, params);
    		    });
				upgradeVersionStore.on('load',function(groupInfoStore, options){
					form.getForm().findField('packageVer').store=upgradeVersionStore;
    			});
				
				upgradeVersionStore.removeAll();
				upgradeVersionStore.load();
				
			}
		}
	},{
		name : 'upgradeType1',
		xtype : 'displayfield',
		fieldLabel : 'Upgrade Type',
	},{
		name : 'upgradeTypes',
		xtype : 'hiddenfield',
	},{
		name : 'packageVer',
		xtype : 'combo',
		mode : 'local',
		ulan:'version',
		fieldLabel : 'Version',
		displayField : 'showStr',
		valueField : 'packageVer',
		queryMode : 'local',
		editable:false,
		listConfig: { loadMask: false },
		allowBlank:false,
		store:Ext.create('app.store.provision.UpgradeVersionStore',{}),
		listeners:{
			change: function(field,newValue,oldValue,opts) {
				try{
					var st=field.getStore().findRecord('packageVer',field.getValue());
					
					var desc=st.get('detailDesc');
					form.getForm().findField('detailDesc').setValue(desc);
				}catch(e){
					form.getForm().findField('detailDesc').setValue("");
				}
			}
		}
	},{
//		fieldLabel :'Force to Upgrade',
		xtype:'checkbox',
		boxLabelCls:'box_label',
		boxLabel:'Force upgrade even if target version is older',
		name:'forceUpgrade',
		checked:true,
		inputValue:1,
	},{
		xtype:'textareafield',
		name:'detailDesc',
		readOnly:true,
		fieldLabel:'Description'
	},{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'productId',
    },{
    	xtype:'hiddenfield',
    	name:'maxVersion',
    },{
    	xtype:'hiddenfield',
    	name:'provUrl',
    },{
    	xtype:'hiddenfield',
    	name:'alias',
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
    		var win=this.up('window');
//          	var provUrl=form.findField('provUrl').getValue();
    		var provUrl = "";
			if(form.findField('maxVersion').getValue()>=form.findField('packageVer').getValue()
					&& form.findField('forceUpgrade').getValue()==false){
				var ids = form.findField('ids').getValue();
				var str = "This device ";
				if(ids.indexOf('-')>=0){
					str = "Several devices ";
				}
	    		Ext.MessageBox.alert(boxWarnning,
	    				str+"will be degraded or remain unchanged,you should enable 'Forse to Upgrade' first");
	    		return;
			}
	        
	        if (form.isValid()) {
	        	var ActionFunction = Ext.getCmp('ActionFunction');
	        	if(ActionFunction == undefined){
	        		ActionFunction = Ext.create('app.util.ActionFunction',{});
	        	}
	        	ActionFunction.UpgradeAction(win,form,provUrl);
	        }
           	            
        }
        
    }]
});

Ext.define("app.view.operation.domain.roamzone.site.UpgradeNe", {
	extend : 'Ext.window.Window',
	
	alias : 'widget.upgradeNe',
	title : lanControll.getLanValue('tiUpgradeNe'),
	id:'maintenanceUpgradeNe',
	width : 500,
	closeAction: 'hide',
	minWidth : 450,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
    closable:false,
//    listeners:{
//		beforeshow:function(){
//			form.getForm().findField('upgradeType').setValue('0');
//		}
//	}
});