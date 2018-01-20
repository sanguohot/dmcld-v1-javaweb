var width = 500;
Ext.define("app.view.operation.domain.config.AlarmSetting", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : width,
	closeAction: 'hide',
	closable:true,
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    closable:true,
    tipId:'',
    initComponent:function(){
		this.createView();
		this.callParent();
	},
	createView:function(){
		this.items = this.createForm();
	},
	createForm:function(){
		return Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '100%',
		        labelWidth: 150
		    },
		    items: [{
		    	xtype:'hiddenfield',
		    	name:'taddUuid'
		    },{
		    	xtype:'hiddenfield',
		    	name:'domainUuid'
		    },{
		    	xtype:'hiddenfield',
		    	name:'ids'
		    },{
		    	xtype:'hiddenfield',
		    	name:'alarmType'
		    },{
				xtype:'textfield',
				fieldLabel:'Alarm Id',
				name:'alarmId',
		    },{
				xtype:'textfield',
				fieldLabel:'Domain Alarm Name',
				name:'taddAlarmName',
		    },{
	            xtype: 'combo',
	            name: 'taddAlarmLevel',
	            fieldLabel: 'Alarm Level',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -1
					},{
						name : 'EMERG',
						statusId : 0
					}, {
						name : 'ALERT',
						statusId : 1
					}, {
						name : 'CRIT',
						statusId : 2
					}, {
						name : 'ERR',
						statusId : 3
					}, {
						name : 'WARNING',
						statusId : 4
					}, {
						name : 'NOTICE',
						statusId : 5
					}, {
						name : 'INFO',
						statusId : 6
//					}, {
//						name : 'DEBUG',
//						statusId : 7
					}, {
						name : 'DISABLED',
						statusId : 8
					} ]
				}),
				
	        },{
	        	xtype:'hiddenfield',
	        	name:'componentId'
	        },{
				xtype:'textfield',
				fieldLabel:'Filter Period',
				name:'taddTimeCheckMax',
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
		    		var basicForm = this.up('form').getForm();
		    		
	                var form = this.up('form').getForm();
	                var componentId=form.findField('componentId').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'alarmDomainSettingManager!alarmSetting.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
	                    		var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp(componentId).down("panel[itemId=grid]").down('pagingtoolbar').moveFirst();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	                this.up('form').getForm().reset();
	                this.up('window').hide();
			           
		            }		        
		    }]
		});
	},
	listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
		}
	}
});

