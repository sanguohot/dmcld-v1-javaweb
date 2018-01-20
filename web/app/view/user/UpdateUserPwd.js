var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,
    frame:true,
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 140,
        anchor: '80%'
    },
    items: [{
    	layout:'hbox',
    	xtype:'fieldcontainer',
    	border:false,
    	itemId:'rule_name',
    	anchor: '100%',
    	items:[{
        xtype: 'textfield',
        name:'name',
        ulan:'oldPassword',
        fieldLabel: 'Old Password',
        allowBlank: false,
        labelWidth:140,
        inputType: 'password',
        listeners:{
    			render : function(p) {
			        p.getEl().on('mouseup', function(p){
			        	var tip = Ext.getCmp('updateUserPwd_tip');
			        	tip.show();
			        });
				},
				focus:function(){
					var textobj = this;
					var gettip = Ext.getCmp('GetTip');
					if(gettip==undefined || gettip==null){
						gettip = Ext.create("app.util.GetTip",{});
					}
					var tip = Ext.getCmp('updateUserPwd_tip');
					if(tip==undefined || tip==null){
						var tipManage = Ext.getCmp('TipObjManage');
						if(tipManage==undefined || tipManage==null){
							tipManage = Ext.create("app.util.TipObjManage",{});
						}
						tip = tipManage.createObjNameTipObj('updateUserPwd_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
					}
					tip.show();
					tip.clearListeners();
					//alert(tmp.html)
				},
				blur:function(field,eOpts){
					this.up('fieldcontainer').getComponent('picture').flag = 0;
					var tip = Ext.getCmp('updateUserPwd_tip');
					tip.hide();
					var textobj = this;
					var prefix = "<div style='background:#DFE9F6'>&nbsp;";
					var suffix  = "</div>"
					var checkobj = Ext.getCmp("DataCheck");
					if(checkobj==undefined || checkobj==null){
						checkobj = Ext.create("app.util.DataCheck",{});
					}
					var str = ""; //checkobj.getErrorStr(textobj.getValue());
					var picture = this.up('fieldcontainer').getComponent('picture');
					if(str != ""){
						str = "<font color=#f00>"+str+"</font>"
						picture.update(prefix+str+suffix);
						picture.flag = 0;
					}else{
						var pwd=field.getValue();
		    			var uuid=form.getForm().findField('uuid').getValue();
						if(pwd!=null&&pwd!=""){
							Ext.Ajax.request({
		                		url:'userManager!checkPwd.action',
		                		method:'POST',
		                		params:{passwordMd5:pwd,uuid:uuid},
			            		callback: function (options, success, response) {
			                    	var obj=Ext.JSON.decode(response.responseText);
			                    	if(obj['success']){
			                    		str = "<img  src='resources/images/right.png'/>";
			                    		picture.flag = 1;
			                    	}else{
			                    		str = "<font color=#f00>Old Password Is Error</font>";
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
    	xtype:'textfield',
    	name:'passwordMd5',
    	ulan:'password',
    	fieldLabel:'Password',
    	allowBlank: false,
    	inputType: 'password'
    },{
    	xtype:'textfield',
    	name:'rePassword',
    	fieldLabel:'Confirm Password',
    	ulan:'confirmPassword',
    	allowBlank: false,
    	inputType: 'password',
		 listeners:{
	    	blur:function(field,eOpts){
				var pwd=field.getValue();
				var rePwd=form.getForm().findField('passwordMd5').getValue();
				if(pwd!=rePwd){
					boxPwdNotEqual = lanControll.getLanValue('boxPwdNotEqual');
					Ext.MessageBox.alert(boxFailture,boxPwdNotEqual);
				}
	    	}
		}
    },{
    	xtype:'hiddenfield',
    	name:'uuid',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'name1',
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
               
	            	var picture = this.up('form').getComponent('rule_name').getComponent('picture');
					if(picture.flag==0){
						return;
					}
            	
	                var form = this.up('form').getForm();
	                
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'userManager!updatePwd.action',
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

Ext.define("app.view.user.UpdateUserPwd", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateUserPwd',
	id:'updateUserPwd',
	title : tiSetting,
	width : 400,
	closeAction: 'hide',
	minWidth : 500,
	height : 200,
	minHeight: 180,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
    listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
		},
		beforeshow:function(){
			var ruleName=this.down('form').getComponent('rule_name').getComponent('picture');
			var tmp = "";
			var prefix = "<div style='background:#DFE9F6'>&nbsp;";
			var suffix  = "</div>"
			var str = "";

			ruleName.update(prefix+str+suffix);
			ruleName.flag = 2;
			
		}
	}
	
});

