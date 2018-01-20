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
    	itemId:'paid_group_name',
    	border:false,
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
		            	var tip = Ext.getCmp('AddPaidGroup_tip');
		            	tip.show();
		            });
	        	},
	    		focus:function(){
	    			var textobj = this;
	    			var gettip = Ext.getCmp('GetTip');
	    			if(gettip==undefined || gettip==null){
	    				gettip = Ext.create("app.util.GetTip",{});
	    			}
	    			var tip = Ext.getCmp('AddPaidGroup_tip');
	    			if(tip==undefined || tip==null){
	    				var tipManage = Ext.getCmp('TipObjManage');
	    				if(tipManage==undefined || tipManage==null){
	    					tipManage = Ext.create("app.util.TipObjManage",{});
	    				}
	    				tip = tipManage.createObjNameTipObj('AddPaidGroup_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
	    			}	    			
	    			tip.show();
	    			tip.clearListeners();
	    			//alert(tmp.html)
	    		},
		    	blur:function(field,eOpts){
	    			this.up('fieldcontainer').getComponent('picture').flag = 0;
	    			var tip = Ext.getCmp('AddPaidGroup_tip');
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
	                    		url:'paidGroupManager!checkGroup.action',
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
			html:'', flex:1, border:false,itemId:'picture',flag:2,
		}]
    },{
        xtype: 'textfield',
        name:'alias',
        fieldLabel: 'Alias',
    },{
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name:'detailDesc',
        flex: 1,
        margins: '0',
       
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
    		var tmp = this.up('form').getComponent('paid_group_name');
    		if(tmp.getComponent('picture').flag==0)
            	return;
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	               var domainUuid=form.findField('domainUuid').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'paidGroupManager!addGroup.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
					                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		              						Ext.getCmp('fPaidGroupPanel').down('panel[itemId=grid]').getStore().load({params:{domainUuid:domainUuid}});
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

Ext.define("app.view.operation.domain.group.AddPaidGroup", {
	extend : 'Ext.window.Window',
	alias : 'widget.addPaidGroup',
	id:'addPaidGroup',
	title : lanControll.getLanValue('tiAddPaidGrp'),
	width : 500,
	closeAction: 'hide',
	closable:false,
	minWidth : 350,
	height : 240,
	minHeight: 240,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
	listeners:{
		beforeshow:function(){
		    var picture = this.down('form').getComponent('paid_group_name').getComponent('picture');
		    picture.flag = 2;
		    picture.update("");
		}
	}
});

