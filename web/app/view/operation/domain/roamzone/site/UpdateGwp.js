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

    items: [rs.createAdminStatus(null,[1,2,5],{labelWidth:140}),{
		name : 'portGrpUuid',
		xtype : 'combo',
		mode : 'local',
		editable:false,
		fieldLabel : '<label onmouseover=moveOver("gw_port_spec_group",event) onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecGroup')+'</label>',
		displayField : 'name',
		ulan:'null',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create("app.store.util.ComboxStore",{}),
		value:-1,
	},{
		name : 'portPolicyUuid',
		xtype : 'combo',
		mode : 'local',
		editable:false,
		fieldLabel : '<label onmouseover=moveOver("gw_port_spec_policy",event) onmouseout=moveOut() class="tips_label">'+lanControll.getLanValue('portSpecPolicy')+'</label>',
		displayField : 'name',
		ulan:'null',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create("app.store.util.ComboxStore",{}),
		value:-1
	},{
        xtype: 'combo',
        name: 'advanceSetting',
        fieldLabel: 'Advance Setting',
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [  {
				name : '-SELECT-',
				statusId : 0
			}, {
				name : lanControll.getLanValue('gwpAdvance_'+'clearLSP'),
				statusId : 'clearLSP',
			}, {
				name : lanControll.getLanValue('gwpAdvance_'+'clearLSC'),
				statusId : 'clearLSC',
//			}, {
//				name : 'Regen Port Alias',
//				statusId : 'clearAlias',
			}]
		}),
		value:0,
    },{
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
    	name:'portStr',
    },{
    	xtype:'hiddenfield',
    	name:'lockSimUuid',
    	value:-1
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
	                		url:'gwpManager!updateMultGwp.action',
	                		method:'POST',
	                		timeout:60000,
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('gwpInNe').getStore().load();
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

Ext.define("app.view.operation.domain.roamzone.site.UpdateGwp", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateGwp',
	title : tiSetting,
	id:'updateGwp',
	width : 450,
	closeAction: 'hide',
	minWidth : 350,
	height : 250,
//	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
	listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
		}
	}
});

