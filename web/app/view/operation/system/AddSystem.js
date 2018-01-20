Ext.define("app.view.operation.system.AddSystem", {
	extend : 'Ext.window.Window',
	alias : 'widget.addSystem',
	id:'addSystem',
	title : lanControll.getLanValue('tiAddSys'),
	closeAction: 'hide',
	width:500,
	minWidth : 350,
	minHeight: 150,
    layout: 'fit',
    resizable: true,
    modal: true,
    initComponent:function(){
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '75%',
		    },
		    items: [{
				name : 'cloudUuid',
				xtype: 'combo',
				mode: 'local',
				labelWidth: 180,
				fieldLabel: 'Spec Cloud',
				ulan:'specCloud',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				store:Ext.create('app.store.util.ComboxStore',{}),
				allowBlank: false,
				editable:false,
				value:0,
			},{
		    	name : 'productId',
				xtype: 'combo',
				ulan:'deviceType',
				mode: 'local',
				editable:false,
				fieldLabel: 'Type',
				displayField: 'name',
				valueField: 'value',
				queryMode: 'local',
				labelWidth: 180,
				value: 1,
				store: Ext.create('Ext.data.Store', {
					fields : ['name', 'value'],
					data   : [
						{name : 'SIMSERVER',   value: '32'},
						{name : 'DMSERVER',  value: '60'},
						{name : 'DRSERVER',  value: '61'},
						{name : 'DCSERVER',  value: '62'},
					]
				}),
				value:'60',
		    },{
		    	xtype:'numberfield',
		    	name:'uuid',
		    	ulan:'srvUuid',
		    	fieldLabel:'Server Uuid',
		    	labelWidth: 180,
		    	allowBlank: false,
		    	validateOnChange:false,
		    	validator:function(val){return check(val,'systemUuid',false)}
		    },{
		    	xtype:'textfield',
		    	name:'name',
		    	ulan:'label_exp_info',
		    	fieldLabel:'<label onmouseover=moveOver("exp_info",event) onmouseout=moveOut() class="tips_label">Server Name</label>',
		    	labelWidth: 180,
		    	allowBlank: false,
		    	validateOnChange:false,
		    	validator:function(val){return check(val,'systemName')}
		    },{
		    	xtype:'textfield',
		    	name:'alias',
		    	fieldLabel:'Alias',
		    	labelWidth: 180,
		    },{
		    	xtype:'textfield',
		    	name:'sysIpAddr',
		    	labelWidth: 180,
		    	fieldLabel:'IP Address',
		    	allowBlank: false
		    },{
		    	xtype:'textfield',
		    	name:'detailDesc',
		    	labelWidth: 180,
		    	fieldLabel:'Description'
		    },{
		    	xtype:'hiddenfield',
		    	name:'cmpId',
		    	value:0
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
			                var cmpId=form.findField('cmpId').getValue();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'sysManager!addSys.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		Ext.getCmp(cmpId).down('panel').down('grid[itemId=grid]').store.load();
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

