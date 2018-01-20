Ext.define("app.view.operation.system.MoveDomain", {
	extend : 'Ext.window.Window',
	title : tiSetting,
	width : 650,
	closeAction: 'hide',
    layout: 'fit',
    resizable: true,
    modal: true,
    id:'moveDomain',
    closable:false,
    initComponent:function(){
		var sysStore = Ext.create('app.store.util.ComboxStore',{});
		var toSysStore = Ext.create('app.store.util.ComboxStore',{});
		
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        labelWidth:140,
		        anchor: '100%',
		    },
		    items: [{
		    	xtype:'hiddenfield',
		    	name:'name'//first name of these domains
		    },{
		    	xtype:'hiddenfield',
		    	name:'domainNames'
		    },{
		    	xtype:'hiddenfield',
		    	name:'sysLockedFlag',
		    	value:1
		    },{
		    	xtype:'hiddenfield',
		    	name:'type',
		    	value:0
		    },{
				name : 'fromServerUuid',
				xtype: 'combo',
				mode: 'local',
				ulan:'fromSys',
				fieldLabel: 'From Server',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				store:sysStore,
				editable:false,
				value:-1,
				hidden:true
		    },{
		    	name : 'toServerUuid',
		    	xtype: 'combo',
		    	mode: 'local',
		    	ulan:'toSys',
		    	fieldLabel: 'To Server',
		    	displayField: 'name',
		    	valueField: 'uuid',
		    	queryMode: 'local',
		    	store:toSysStore,
		    	editable:false,
		    	value:-1,
//			},{
//	            name: 'sysLockedFlag',
//		        xtype: 'combo',
//		        fieldLabel: 'Server Locked Flag',
//				mode : 'local',
//				displayField : 'name',
//				valueField : 'value',
//				queryMode : 'local',
//				editable:false,
//				store : Ext.create('Ext.data.Store', {
//					fields : [ 'name', 'value' ],
//					data : [{
//						name : '-SELECT-',
//						value : -1
//					}, {
//						name : 'YES',
//						value : 1
//					}, {
//						name : 'NO',
//						value : 0
//					}  ]
//				}),
//				value:-1
	        },{
		    	xtype:'hiddenfield',
		    	name:'ids',
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
			    	var obj = this.up('form');
		            if (this.up('form').getForm().isValid()) {
		            		var vendorId=Ext.get('vendorId').value;
		            		
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	
			                	var boxObj = {
	                		    		title:boxInfo,
	                		    		width : 300,
	                		    		msg:boxWaitMsg,
	                		    		modal:true,
	                		    		closable:false,
	                		    		wait:true
	                		    };
			                	var store=Ext.create('app.store.util.StepStore');
	                			sleepBar(store,true);
			                	
			                	Ext.Ajax.request({
									url:'backupManager!moveDomain.action',
									method:'POST',
									params:form.getValues(),
									timeout:30*60*1000,
									callback: function (options, success, response) {
										boxObj.wait = false;
										Ext.MessageBox.hide();
										autoRefresh.stopTask(null,store);
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
		this.items = [form];
		this.callParent();
	}
});

