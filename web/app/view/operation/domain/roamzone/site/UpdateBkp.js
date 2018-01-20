var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,


    defaults: {
        margins: '0 0 10 0',
        labelWidth:140,
    },

    items: [{
		name : 'portGrpUuid',
		xtype : 'combo',
		mode : 'local',
		editable:false,
		ulan:'null',
		fieldLabel : '<label onmouseover=moveOver("bk_port_spec_group",event) onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecGroup')+'</label>',
		displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create("app.store.util.ComboxStore",{}),
		value:-1
	},{
		name : 'grpUuid',
		ulan:'group',
		xtype : 'combo',
		mode : 'local',
		editable:false,
		fieldLabel : 'SIM Group',
		displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create("app.store.util.ComboxStore",{}),
		value:-1,
	},rs.createAdminStatus(null,[1,2,6],{labelWidth:140}),{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'simUuids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'simStr',
    },{
    	xtype:'hiddenfield',
    	name:'bkpStr',
    },{
    	xtype:'hiddenfield',
    	name:'portStr',
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
               
	                var form = this.up('form').getForm();
	               
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'bkpManager!updateBkpAndSimCard.action',
	                		method:'POST',
	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('bkpInNe').getStore().load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
		                    	form.reset();
	                    	}
	                	});
	                }
	                
	                this.up('window').hide();
	            }
            }
        
    }]
});

Ext.define("app.view.operation.domain.roamzone.site.UpdateBkp", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateBkp',
	title : tiSetting,
	id:'updateBkp',
	width : 400,
	closeAction: 'hide',
	minWidth : 350,
	height: 210,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

