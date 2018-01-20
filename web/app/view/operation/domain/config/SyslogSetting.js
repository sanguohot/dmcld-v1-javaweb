var width = 500;
Ext.define("app.view.operation.domain.config.SyslogSetting", {
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
		    bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '100%',
		        labelWidth: 150
		    },
		    items: [
//		            {
//
//		        xtype: 'combo',
//		        name: 'logSysUuid',
//		        mode : 'local',
//		        editable:false,
//		        anchor:'70%',
//		        fieldLabel: 'Syslog Server',
//		        displayField : 'name',
//				valueField : 'uuid',
//				queryMode : 'local',
//				store:Ext.create("app.store.util.ComboxStore",{}),
//		    
//			},
//			{
//		        name: 'syslogExpiryDateFlag',
//		    	xtype:'checkbox',
//		        inputValue:1,
//		        boxLabel:'Set Syslog Expire Date',
//				boxLabelCls:'box_label',
//				listeners:{
//		        	change:function(field,newValue,oldValue,opts){
//		    			this.up('form').down('fieldcontainer[name=syslogExpiryDateFC]').setVisible(newValue);
//		        	}
//		        }
//		    },
		    {
		    	name: 'syslogExpiryDateFC',
		    	fieldLabel: 'Expiry Date',
		    	xtype: 'fieldcontainer',
		    	layout:'hbox',
//		    	hidden:true,
		    	items: [
						{xtype:'numberfield',name: 'expireDay', decimalPrecision:0,value: 1,width:50,minValue:0,maxValue:90 },
						{xtype: 'displayfield',width:40,value:'&nbsp;&nbsp;day' },
						{xtype:'numberfield',name: 'expireHour', decimalPrecision:0,value: 0,width:50,minValue:0,maxValue:23 },
						{xtype: 'displayfield',width:40,value:'&nbsp;&nbsp;hour' },
						{xtype:'numberfield',name: 'expireMin', decimalPrecision:0,value: 0,width:50,minValue:0,maxValue:59 },
						{xtype: 'displayfield',width:40,value:'&nbsp;&nbsp;min' },
						{xtype: 'hiddenfield',width:40,name:'syslogExpiryDate',value:'' },
					]
				
		    },{
		        xtype: 'combo',
		        name: 'syslogDebugLevel',
		        fieldLabel: 'Syslog Level',
				mode : 'local',
				editable:false,
				anchor:'70%',
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : 'EMERG',
						statusId : 0
					},{
						name : 'ALERT',
						statusId : 1
					}, {
						name : 'CRIT',
						statusId : 2
					},{
						name : 'ERR',
						statusId : 3
					},{
						name : 'WARNING',
						statusId : 4
					},{
						name : 'NOTICE',
						statusId : 5
					},{
						name : 'INFO',
						statusId : 6
					},{
						name : 'DEBUG',
						statusId : 7
					} ]
				}),
				value:6,
				allowBlank:false,
		    },{
		        xtype: 'checkboxgroup',
		        fieldLabel: 'Enable',
		        // Arrange checkboxes into two columns, distributed vertically
		        columns: 2,
		        vertical: true,
		        items: [
		            { boxLabel: 'CDR Log',boxLabelCls:'box_label', name: 'cdrLogFlag', inputValue: 1 },
		            { boxLabel: 'Signal Log',boxLabelCls:'box_label', name: 'signalLogFlag', inputValue: 1, checked: true },
		            { boxLabel: 'Media Log', boxLabelCls:'box_label',name: 'mediaLogFlag', inputValue: 1 },
		            { boxLabel: 'System Log', boxLabelCls:'box_label',name: 'systemLogFlag', inputValue: 1 },
		            { boxLabel: 'Management Log',boxLabelCls:'box_label', name: 'mngLogFlag', inputValue: 1 },
		        ]
		    },
		    
//		    {
//		    	name: 'cdrLogFlag',
//		    	xtype:'checkbox',
//		        inputValue:1,
//		        boxLabel:'Enable CDR Log',
//				boxLabelCls:'box_label'
//		    },{
//		    	name: 'signalLogFlag',
//		    	xtype:'checkbox',
//		        inputValue:1,
//		        boxLabel:'Enable Signal Log',
//				boxLabelCls:'box_label'
//		    },{
//		    	name: 'mediaLogFlag',
//		    	xtype:'checkbox',
//		        inputValue:1,
//		        boxLabel:'Enable Media Log',
//				boxLabelCls:'box_label'
//		    },{
//		    	name: 'systemLogFlag',
//		    	xtype:'checkbox',
//		        inputValue:1,
//		        boxLabel:'Enable System Log',
//				boxLabelCls:'box_label'
//		    },{
//		        name: 'mngLogFlag',
//		        xtype:'checkbox',
//		        inputValue:1,
//		        boxLabel:'Enable Management Log',
//				boxLabelCls:'box_label'
//		    },
		    
		    {
		    	xtype:'hiddenfield',
		    	name:'productSnStr',
		    },{
		    	xtype:'hiddenfield',
		    	name:'domainUuid',
		    },{
		        name: 'parentId',
		    	xtype:'hiddenfield',
		    },{
		        name: 'syslogStatus',
		    	xtype:'hiddenfield',
		        value:1,
		    },{
		    	name: 'logSysUuid',
		    	xtype:'hiddenfield',
		    	value:Ext.get('sysUuid').value,
		    },{
	        	xtype:'hiddenfield',
	        	name:'componentId'
		    },{
		    	xtype:'hiddenfield',
		    	name:'ids'
	        },{
		    	xtype:'hiddenfield',
		    	name:'productId'
	        },{
		    	xtype:'hiddenfield',
		    	name:'alias'
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
	              
//	                var syslogExpiryDateFlag=this.up('form').down('checkbox[name=syslogExpiryDateFlag]').getValue();
	                var syslogExpiryDate=this.up('form').down('hiddenfield[name=syslogExpiryDate]');
//	                if(syslogExpiryDateFlag==1){
	                	var expireDay=this.up('form').down('numberfield[name=expireDay]').getValue();
	                	var expireHour=this.up('form').down('numberfield[name=expireHour]').getValue();
	                	var expireMin=this.up('form').down('numberfield[name=expireMin]').getValue();
	                	syslogExpiryDate.setValue('2013-01-'+expireDay+" "+expireHour+":"+expireMin+":00");
//	                }else{
//	                	syslogExpiryDate.setValue('');
//	                }
	                
	                var componentId=form.findField('componentId').getValue();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'neManager!startSyslog.action',
	                		method:'POST',
	                		timeout:60000,
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

