Ext.define("app.view.operation.UpdateNeNa", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateNeNa',
	title : lanControll.getLanValue('tiAddDev'),
	width : 470,
	closeAction : 'hide',
	minWidth : 300,
//	minHeight : 260,
	layout : 'fit',
	resizable : true,
	treeId:'',
	modal : true,
	gridStore:{},
	comboxStore:Ext.create("app.store.util.ComboxStore",{}),
	param:{},
	initComponent:function(){
	
		var form = Ext.widget('form', {
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
			border : false,
			bodyPadding : 10,
			fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth:120,
	            anchor: '90%'
	        },
			items:[{
					xtype:'hiddenfield',
					name:'domainUuid',
				},{
		            xtype: 'combo',
		            name: 'siteUuid',
		            fieldLabel: lanControll.getLanValue('siteUuid'),
		            displayField : 'name',
		            editable:false,
					valueField : 'uuid',
					mode : 'local',
					queryMode : 'local',
					allowBlank:false,
					store:Ext.create("app.store.util.ComboxStore",{}),
					valueNotFoundText :""
				},{
					xtype : 'textfield',
					ulan:'password',
					fieldLabel : 'Password',
					name:'password',
					maxLength:31,
					enforceMaxLength:true,
					enableKeyEvents : true,
				}],
			buttons : [{
				text : 'Cancel',
				ulan:'btCancel',
				handler : function() {
					this.up('form').getForm().reset();
					this.up('window').hide();
//					Ext.getCmp('moveNeNa').hide();
				}
			}, {
				text : 'Commit',
				ulan:'btCommit',
				handler : function() {
					var form = this.up('form').getForm();
					var win=this.up('window');
					
					if (form.isValid()) {
						var siteUuid=form.findField('siteUuid').getValue();
						var password=form.findField('password').getValue();
						var domainUuid=form.findField('domainUuid').getValue();
						var param = this.up('form').up('window').param;
						param['siteUuid']=siteUuid;
						param['password']=password;
						param['domainUuid']=domainUuid;
						console.log(param);
						Ext.Ajax.request({
			        		url:'neNaManager!addNe.action',
			        		method:'POST',
			        		params:param,
			        		callback: function (options, success, response) {
			                	var obj=Ext.JSON.decode(response.responseText);
		                    		if(obj['success']){
		                    			if(obj['msg']){
		                    				Ext.MessageBox.alert(boxInfo,obj['msg']);
		                    			}else{
		                    				Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    			}
			                		form.reset();
			            			win.hide();
			            			Ext.getCmp('moveNeNa').hide();
			                	}else{
			                		if(obj['msg']){
	                    					Ext.MessageBox.alert(boxInfo,obj['msg']);
	                    				}else{
	                    					Ext.MessageBox.alert(boxFailture,boxCommitFail);
	                    				}
			                		form.reset();
			            			win.hide();
			            			Ext.getCmp('moveNeNa').hide();
			                	}
			            	}
						});
				}
		}
		}]
		});	
		this.items = [form];
		this.callParent();
	},
});

