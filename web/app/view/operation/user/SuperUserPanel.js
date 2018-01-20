Ext.define('app.view.operation.user.SuperUserPanel',{
	extend:'Ext.panel.Panel',
	requires: [
	            'Ext.util.Format',
	            'Ext.grid.Panel',
	        ],
	id:'superUserPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
	
		var superUserTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiSuperUserInfo'),
			id:'superUserTab',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '65%'
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{
	        	layout:'hbox',
	        	xtype:'fieldcontainer',
	        	border:false,
	        	anchor: '100%',
	        	items:[{
	                xtype: 'textfield',
	                name:'name',
	                ulan:'userName',
	                fieldLabel: 'User Name',
	                flex:65,
	                allowBlank: true,
	                enableKeyEvents : true,
	                listeners:{
		                render : function(p) {
		                    p.getEl().on('mouseup', function(p){ 
		                    	var tip = Ext.getCmp('SuperUserPanel_tip');
		                    	tip.show();
		                    });
	                	},
	            		focus:function(){
	            			var textobj = this;
	            			var gettip = Ext.getCmp('GetTip');
	            			if(gettip==undefined || gettip==null){
	            				gettip = Ext.create("app.util.GetTip",{});
	            			}
	            			var tip = Ext.getCmp('AddUser_tip');
	            			if(tip==undefined || tip==null){
	            				var tipManage = Ext.getCmp('SuperUserPanel_tip');
	            				if(tipManage==undefined || tipManage==null){
	            					tipManage = Ext.create("app.util.TipObjManage",{});
	            				}
	            				tip = tipManage.createObjNameTipObj('SuperUserPanel_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
	            			}
	            			tip.show();
	            			tip.clearListeners();
	            			//alert(tmp.html)
	            		},
	            	
	        	    	blur:function(field,eOpts){
	            			var tip = Ext.getCmp('SuperUserPanel_tip');
	            			tip.hide();
	            			var textobj = this;
	            			var prefix = "<div style='background:#DFE9F6'>&nbsp;";
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
	            			}else{

	    	        			var userName=textobj.getValue();
	    	        			var domainUuid=textobj.up('form').getForm().findField('domainUuid').getValue();
	    	        			if(userName!=null&&userName!=""){
		    				        var store=Ext.data.StoreManager.lookup('userInfoStore');
		    				        var tmp = store.getAt(0).get("name");
		    				        if(userName == tmp){
		    				        	str = "<img  src='resources/images/right.png'/>";
		    				        	picture.update(prefix+str+suffix);
		    				        }
		    				        else{
		    				        	Ext.Ajax.request({
				                    		url:'registerManager!checkUser.action',
				                    		method:'POST',
				                    		params:{name:userName,domainUuid:domainUuid},
				                    		callback: function (options, success, response) {
				    	                    	var obj=Ext.JSON.decode(response.responseText);			
				    	                    	if(obj['success']){
				    	                    		str = "<img  src='resources/images/right.png'/>"
				    	                    	}else{
				    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
				    	                    	}
				    	                    	picture.update(prefix+str+suffix);
				                        	}
		    				        	});
		    				        }
			        			}
	            			}
	        	    	}
	            	}
	    		},{
	    			html:'', flex:35, border:false,itemId:'picture'
	    		}]
	        }, {
	            xtype: 'textfield',
	            name: 'passwordMd5',
	            fieldLabel: 'Password',
	            ulan:'password',
	            inputType: 'password',
	        }
//	        ,{
//	            xtype: 'displayfield',
//	            name: 'adminStatus',
//	            fieldLabel: 'Status',
//	        }, {
//	            xtype: 'displayfield',
//	            name: 'type',
//	            fieldLabel: 'type',
//	        }
	        , {
	            xtype: 'textfield',
	            name: 'mobile',
	            fieldLabel: 'Mobile',
	        }, {
	            xtype: 'textfield',
	            name: 'phone',
	            fieldLabel: 'Phone',
	        }, {
	            xtype: 'textfield',
	            name: 'email',
	            fieldLabel: 'Email',
	        }, {
	            xtype: 'textfield',
	            name: 'address',
	            fieldLabel: 'Address',
	        },{
	            xtype: 'textareafield',
	            name: 'detailDesc',
	            fieldLabel: 'Description',
	        }],
	        dockedItems: [ {
	            xtype: 'toolbar',
	            items: [{
		            text: 'Commit',
		            iconCls:'save',
		            flag:"edit",
		            formBind: true, //only enabled once the form is valid
		            disabled: true,
		            handler: function() {
		                var form = this.up('form').getForm();
		                if (form.isValid()) {
		                	Ext.Ajax.request({
		                		url:'userManager!updateUser.action',
		                		method:'POST',
		                		params:form.getValues(),
		                		callback: function (options, success, response) {
			                    	var obj=Ext.JSON.decode(response.responseText);			
			                    	if(obj['success']){
			                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
			                    		 var store=Ext.data.StoreManager.lookup('userInfoStore');
			                    		 store.load();
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
			                    	}
		                    	}
		                	});
		                }
		            }
		        }]
	        }],
			
		});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[superUserTab]
	       
		}];
		this.callParent(arguments);	
	}
});