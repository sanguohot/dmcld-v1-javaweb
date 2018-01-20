var form = Ext.widget('form', {
//    layout: {
//        type: 'vbox',
//        align: 'stretch'
//    },
    border: false,
    bodyPadding: 10,

    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '75%',
    },
    items: [{
    	xtype:'hiddenfield',
    	name:'domainUuid'
    },{
    	layout:'hbox',
    	xtype:'fieldcontainer',
    	border:false,
    	itemId:'policy_name',
    	anchor: '100%',
    	items:[{
            xtype: 'textfield',
            name:'name',
            fieldLabel: 'Name',
            flex:3,
            allowBlank: false,
            msgTarget:'none',
            listeners:{
	            render : function(p) {
		            p.getEl().on('mouseup', function(p){ 
		            	var tip = Ext.getCmp('AddPolicy_tip');
		            	tip.show();
		            });
	        	},
	    		focus:function(){
	    			var textobj = this;
	    			var gettip = Ext.getCmp('GetTip');
	    			if(gettip==undefined || gettip==null){
	    				gettip = Ext.create("app.util.GetTip",{});
	    			}
	    			var tip = Ext.getCmp('AddPolicy_tip');
	    			if(tip==undefined || tip==null){
	    				var tipManage = Ext.getCmp('TipObjManage');
	    				if(tipManage==undefined || tipManage==null){
	    					tipManage = Ext.create("app.util.TipObjManage",{});
	    				}
	    				tip = tipManage.createObjNameTipObj('AddPolicy_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
	    			}
	    			tip.show();
	    			tip.clearListeners();
	    			//alert(tmp.html)
	    		},
		    	blur:function(field,eOpts){
	    			this.up('fieldcontainer').getComponent('picture').flag = 0;
	    			var tip = Ext.getCmp('AddPolicy_tip');
	    			tip.hide();
	    			var textobj = this;
	    			var prefix = "<div>&nbsp;";
	    			var suffix  = "</div>"
	    			var checkobj = Ext.getCmp("DataCheck");
	    			if(checkobj==undefined || checkobj==null){
	    				checkobj = Ext.create("app.util.DataCheck",{});
	    			}
	    			var str = checkobj.getErrorStr(textobj.getValue());
	    			var picture = this.up('fieldcontainer').getComponent('picture');
	    			if(str != ""){
	    				str = "<font color=#f00>"+str+"</font>"
	    				picture.update(prefix+str+suffix);
	    				picture.flag = 0;
	    			}else{
	        			var name=textobj.getValue();
	        			if(name!=null&&name!=""){
	        				Ext.Ajax.request({
	                    		url:'policyManager!checkPolicy.action',
	                    		method:'POST',
	                    		params:{name:name,domainUuid:form.getForm().findField('domainUuid').getValue()},
	                    		callback: function (options, success, response) {
	    	                    	var obj=Ext.JSON.decode(response.responseText);			
	    	                    	if(obj['success']){
	    	                    		str = "<img  src='resources/images/right.png'/>";
	    	                    		picture.flag = 1;
	    	                    	}else{
	    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
	    	                    		picture.flag = 0;
	    	                    	}
	    	                    	picture.update(prefix+str+suffix);
	                        	}
	                    	});
	        			}
	    			}
		    	}
        	}
        },{
			html:'', flex:1, border:false,itemId:'picture',flag:2
		}]
    },{
        xtype: 'textfield',
        name:'alias',
        fieldLabel: 'Alias',
    },{
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name:'detailDesc',
////        labelAlign: 'top',
//        flex: 1,
//        margins: '0',
       
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
    		var tmp = this.up('form').getComponent('policy_name');
    		if(tmp.getComponent('picture').flag==0)
        	return;
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'policyManager!addPolicy.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	if(success){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('fpolicyPanel').down('panel[itemId=grid]').getStore().load();
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

Ext.define("app.view.operation.domain.policy.AddPolicy", {
	extend : 'Ext.window.Window',
	alias : 'widget.addPolicy',
	id:'addPolicy',
	title : lanControll.getLanValue('tiAddPolicy'),
	width : 500,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
	listeners:{
		beforeshow:function(){
			var picture = this.down('form').getComponent('policy_name').getComponent('picture');
			picture.update("");
			picture.flag = 2;
		}
	}
});

