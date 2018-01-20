var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0',
        labelWidth:130
    },
    params:null,
    items: [{
		name : 'grpUuid',
		ulan:'group',
		id:'updateSimCardGrpUuid',
		xtype : 'combo',
		editable:false,
		fieldLabel : 'Group',
		displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create('app.store.util.ComboxStore')
	},{
		name : 'nextSiteUuid',
		xtype : 'combo',
		hidden:true,
		editable:false,
		fieldLabel : 'Next Site',
		displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create('app.store.util.ComboxStore')
	},rs.createAdminStatus(null,[0,1,2,6],{labelWidth:130}),{
        xtype: 'combo',
        name: 'advanceSetting',
        fieldLabel: 'Advance Setting',
		mode : 'local',
		editable:false,
		anchor: '55%',
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [  {
				name : '-SELECT-',
				statusId : 0
			}, {
				name : lanControll.getLanValue('simAdvance_'+1),
				statusId : 1
			}, {
				name : lanControll.getLanValue('simAdvance_'+5),
				statusId : 5,
//			}, {
//				name : 'Manual Recharge',
//				statusId : 2,
			}, {
				name : lanControll.getLanValue('simAdvance_'+3),
				statusId : 3,
			}, {
				name : lanControll.getLanValue('simAdvance_'+4),
				statusId : 4,
			}]
		}),
    },{
        xtype: 'textfield',
        name: 'detailDesc',
        fieldLabel: 'Description',
    },{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },{
    	xtype:'hiddenfield',
    	name:'grpUuidSearch',
    },{
    	xtype:'hiddenfield',
    	name:'selectAll',
    },{
    	xtype:'hiddenfield',
    	name:'adminStatusSearch',
    },{
    	xtype:'hiddenfield',
    	name:'runStatus',
    },{
    	xtype:'hiddenfield',
    	name:'aliasSearch',
    },{
    	xtype:'hiddenfield',
    	name:'imsi',
    },{
    	xtype:'hiddenfield',
    	name:'alias',
    },{
    	xtype:'hiddenfield',
    	name:'simStr',
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
	                var win=this.up('window');
	                if (form.isValid()) {
	                	var selectAll=form.findField('selectAll').getValue();
		                if(selectAll==1){
		                	boxSetSimAll = lanControll.getLanValue('boxSetSimAll');
		                	Ext.MessageBox.confirm(boxWarnning,boxSetSimAll,function(e) {																	
	       						if( e == 'yes' ){
	       							Ext.Ajax.request({
	       		                		url:'simCardManager!updateSimCard.action',
	       		                		method:'POST',
	       		                		params:form.getValues(),
	       		                		callback: function (options, success, response) {
	       	                    			var obj=Ext.JSON.decode(response.responseText);			
	       	        			                  	if(obj['success']){
	       			                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
	       			                    		Ext.getCmp('simCardTab').down('panel[itemId=grid]').getStore().load();
	       			                    	}else{
	       			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
	       			                    	}
	       			                    	form.reset();
	       		                    	}
	       		                	});
	       							win.hide();
	       						}
		                	});
		                }else{
		                	Ext.Ajax.request({
		                		url:'simCardManager!updateSimCard.action',
		                		method:'POST',
		                		params:form.getValues(),
		                		callback: function (options, success, response) {
	                    			var obj=Ext.JSON.decode(response.responseText);			
	        			                  	if(obj['success']){
			                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
			                    		Ext.getCmp('simCardTab').down('panel[itemId=grid]').getStore().load();
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
			                    	}
			                    	form.reset();
		                    	}
		                	});
		                	win.hide();
		                }
	                }
	            }
            }
        
    }]
});

Ext.define("app.view.operation.domain.roamzone.UpdateSimCard", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateSimCard',
	title : tiSetting,
	id:'updateSimCard',
	width : 460,
	closeAction: 'hide',
	minWidth : 350,
	height : 220,
//	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

