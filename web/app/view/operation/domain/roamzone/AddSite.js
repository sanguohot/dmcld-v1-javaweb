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
		xtype: 'combo',
		name: 'zoneUuid',
		fieldLabel: 'Zone',
		displayField : 'name',
		editable:false,
		valueField : 'uuid',
		mode : 'local',
		queryMode : 'local',
		allowBlank:false,
		store:Ext.create("app.store.util.ComboxStore",{}),
		valueNotFoundText :""
	},{
    	layout:'hbox',
    	xtype:'fieldcontainer',
    	itemId:'site_name',
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
		            	var tip = Ext.getCmp('AddSite_tip');
		            	tip.show();
		            });
	        	},
	    		focus:function(){
	    			var textobj = this;
	    			var gettip = Ext.getCmp('GetTip');
	    			if(gettip==undefined || gettip==null){
	    				gettip = Ext.create("app.util.GetTip",{});
	    			}
	    			var tip = Ext.getCmp('AddSite_tip');
	    			if(tip==undefined || tip==null){
	    				var tipManage = Ext.getCmp('TipObjManage');
	    				if(tipManage==undefined || tipManage==null){
	    					tipManage = Ext.create("app.util.TipObjManage",{});
	    				}
	    				tip = tipManage.createObjNameTipObj('AddSite_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
	    			}	    			
	    			tip.show();
	    			tip.clearListeners();
	    			//alert(tmp.html)
	    		},
		    	blur:function(field,eOpts){
	    			this.up('fieldcontainer').getComponent('picture').flag = 0;
	    			var tip = Ext.getCmp('AddSite_tip');
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
	                    		url:'siteManager!checkSite.action',
	                    		method:'POST',
	                    		params:{name:name,zoneUuid:form.getForm().findField('zoneUuid').getValue()},
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
//        labelAlign: 'top',
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
    		var tmp = this.up('form').getComponent('site_name');
    		if(tmp.getComponent('picture').flag==0)
            	return;
            if (this.up('form').getForm().isValid()) {
            		var  win=this.up('window');
	               var form = this.up('form').getForm();
	               var zoneUuid=form.findField('zoneUuid').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'siteManager!addSite.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
					                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		              						Ext.getCmp(win.cmpId).down('panel[itemId=grid]').getStore().load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	                this.up('form').getForm().reset();
	                win.hide();
	            }
            }
        
    }]
});

Ext.define("app.view.operation.domain.roamzone.AddSite", {
	extend : 'Ext.window.Window',
	alias : 'widget.addSite',
	id:'addSite',
	title : lanControll.getLanValue('tiAddSite'),
	width : 500,
	closeAction: 'hide',
	closable:false,
	minWidth : 350,
	height : 250,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
    comboxStore:Ext.create("app.store.util.ComboxStore",{}),
	listeners:{
		beforeshow:function(){
		    var picture = this.down('form').getComponent('site_name').getComponent('picture');
		    picture.flag = 2;
		    picture.update("");
		}
	}
});

