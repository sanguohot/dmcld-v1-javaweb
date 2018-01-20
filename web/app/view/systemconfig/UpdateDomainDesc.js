Ext.define("app.view.systemconfig.UpdateDomainDesc", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateAlarmDesc',
	id:'updateDomainDesc',
	title : lanControll.getLanValue('btSetting'),
	width : 500,
	closeAction: 'hide',
	closable:true,
	minWidth : 350,
//	height : 250,
//	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    alarmName:'',
//    items: form,
    initComponent:function(){
		this.items = this.createForm();
		this.callParent(arguments);	
	},
	createForm:function(){
		return Ext.widget('form', {
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
		        xtype: 'combo',
		        name: 'dstAlarmLevel',
		        ulan:'alarmLevel',
		        fieldLabel: 'Alarm Level',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				value:-1,
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -1
					},{
						name : 'EMERG',
						statusId :0
					}, {
						name : 'ALERT',
						statusId :1
					}, {
						name : 'CRIT',
						statusId :2
					}, {
						name : 'ERR',
						statusId :3
					}, {
						name : 'WARNING',
						statusId :4
					}, {
						name : 'NOTICE',
						statusId :5
					}, {
						name : 'INFO',
						statusId :6
//					}, {
//						name : 'DEBUG',
//						statusId :7
					}, {
						name : 'DISABLED',
						statusId :8
					} ]
				}),
				
		    
			},{
				xtype:'numberfield',
				fieldLabel:'timeCheckMax',
				name:'timeCheckMax',
				minValue:0,
				maxValue:3600
			},{
				xtype:'hiddenfield',
				name:'domainUuid',
			},{
				xtype:'hiddenfield',
				name:'alarmIds',
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
		            		
			                var form = this.up('form');
			                var params = form.params;
			                var dstAlarmLevel = form.getForm().findField("dstAlarmLevel");
			                var timeCheckMax = form.getForm().findField("timeCheckMax");
			                if(dstAlarmLevel.getValue()==-1 && timeCheckMax.getValue()==null){
			                	return;
			                }
			                params["dstAlarmLevel"] = dstAlarmLevel.getValue();
			                params["timeCheckMax"] = timeCheckMax.getValue();
			                var store = form.store;
			                	Ext.Ajax.request({
			                		url:'alarmDomainDescManager!batchInsert.action',
			                		method:'POST',
			                		params:params,
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
			                
			                this.up('form').getForm().reset();
			                this.up('window').hide();
			            }
		            }
		        
		    }]
		});
	}
});

