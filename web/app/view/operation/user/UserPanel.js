Ext.define('app.view.operation.user.UserPanel',{
	extend:'Ext.panel.Panel',
	requires: [
	            'Ext.util.Format',
	            'Ext.grid.Panel',
	        ],
//	id:'userPanel',
	layout:'fit',
	hidden:true,
	border:false,
	autoScroll:true,
	initComponent: function(){
		
		var store = Ext.create('app.store.operation.user.UserInfoStore',{});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		this.store = store;	
		var userName;
		if(maintenance){
			userName = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'name',
				fieldLabel: 'Name',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}else{
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			userName = generalObj.createName2('user_name'
					,75,25,'name','Name','#DFE9F6','registerManager!checkUser.action',store);
			store.on('load',function(){
    			var picture = userName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
			userName.anchor = '75%';
		}
		var userTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiUserInfo'),
//			id:'userTab',
			border:false,
			store:store,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,
		    border : false,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '75%',
	            labelWidth:180
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'user_basic_info',
				items:[{
					border:false,
					layout: {
			            type: 'table',
			            columns: 3
			        },
			        defaults: {
			            width:640, 
			            height: 25,
			        },
			        bodyStyle: {
						background: '#DFE9F6',
					},
			        items: [{
			            xtype: 'displayfield',
			            name: 'name',
			            fieldLabel: 'Name',
			            maxLength:31,
			        },{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:3,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 3,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/user.png',
			    	
			        }, {
			            xtype: 'textfield',
			            name: 'alias',
			            fieldLabel: 'Alias',
			            maxLength:31,
			        },{
			        	xtype : 'textareafield',
						fieldLabel : 'Description',
						name:'detailDesc',
						margins : '0',
						labelWidth: 180,
			            height:80,
			            rows:3,
			            maxLength:255,
			        }
			        ]}
				]
	        },{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				itemId:'user_detail_info',
				ulan:'fsDetailInfo',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		        	xtype: 'displayfield',
		        	name:'type',
		        	ulan: 'userType',
		        	fieldLabel: 'User Type',
		        },{
		            xtype: 'hiddenfield',
		            name: 'passwordMd5',
		            ulan:'password',
		            fieldLabel: 'Password',
//		            inputType: 'password',
		        }, {
		            xtype: 'textfield',
		            name: 'mobile',
		            fieldLabel: 'Mobile',
		        }, {
		            xtype: 'textfield',
		            name: 'phone',
		            fieldLabel: 'Phone',
		        }, {
		        	layout:'hbox',
		        	xtype:'fieldcontainer',
		        	itemId:'email_address',
		        	border:false,
//		        	anchor: '100%',
		        	items:[{
		        		xtype: 'textfield',
		 	            name: 'email',
		 	            fieldLabel: 'Email',
		            	allowBlank: false,
		            	labelWidth:180,
		                flex:75,
		                msgTarget:'none',
		                enableKeyEvents : true,
		                listeners:{
		        	    	blur:function(field,eOpts){
		        				this.up('fieldcontainer').getComponent('picture').flag = 0;
		    					var picture = this.up('fieldcontainer').getComponent('picture');
		    					var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
		    					
		    		            var str="<div style='background:#DFE9F6'>&nbsp;";
		    		            var Regex = new RegExp(myreg);
		    		    		if(Regex.test(field.getValue()) == false){
		    		            	str = str+"<font color=#f00>Invalid Email address</font>";
		    		            	picture.flag = 0;          		
		    	        		}else{
		    	        			str = str+"<img  src='resources/images/right.png'/>";
		    	        			picture.flag = 1;
		    	        		}
		    					picture.update(str+'</div>');
		    				}
		            	}
		    		},{
		    			html:'', flex:25, border:false,itemId:'picture',flag:2
		    		}]
		        
		        
		        },{
		            xtype: 'textfield',
		            name: 'address',
		            fieldLabel: 'Address',
		        }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'API Info',
				ulan:'fsApiInfo',
				itemId:'api_detail_info',
				name:'apiInfo',
				layout: 'anchor',
				collapsible: true,
				collapsed: true,
				items:[{
		        	xtype: 'displayfield',
		        	name:'apiEnabled',
		        	fieldLabel:'Service API Enabled',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.enableOrDisable(cmp.getValue()));
				        	}
		                }
		            }
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		        	xtype: 'displayfield',
		        	name:'apiAuthType',
		        	fieldLabel: 'API Auth Type',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 && cmp.getValue()<1000){
				        		if(cmp.getValue()==0){
				        			cmp.setValue('NULL');
				        		}else if(cmp.getValue()==1){
					        		cmp.setValue('MD5');
					        	}
				        	}
		                }
		            }
//		        },{
//		        	xtype: 'displayfield',
//		        	name:'apiAuthPwd',
//		        	fieldLabel: 'API Auth Password',
		        },createPasswordContainer({name:'apiAuthPwd',ulan:'apiAuthPwd'}),{
		        	xtype: 'displayfield',
		        	name:'maxTimeoutSec',
		        	fieldLabel: 'Max Request Timeout(sec)',
		        },{
		        	xtype: 'displayfield',
		        	name:'maxReqPerMin',
		        	fieldLabel: 'Max Request Per Minute',
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		        	xtype: 'displayfield',
		        	name:'apiAclFlag',
		        	fieldLabel: 'API ACL Control',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.yesOrNo(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		        	xtype: 'displayfield',
		        	name:'validIpAddr',
		        	fieldLabel: 'Valid IP Address-1',
		        },{
		        	xtype: 'displayfield',
		        	name:'validIpAddr2',
		        	fieldLabel: 'Valid IP Address-2',
		        },{
		        	xtype: 'displayfield',
		        	name:'validIpAddr3',
		        	fieldLabel: 'Valid IP Address-3',
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		        	xtype: 'displayfield',
		        	name:'apiTrapFlag',
		        	fieldLabel: 'API Trap Setting',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.yesOrNo(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		        	xtype: 'displayfield',
		        	name:'trapIpAddr',
		        	fieldLabel: 'Trap IP Address',
		        },{
		        	xtype: 'displayfield',
		        	name:'trapPortNo',
		        	fieldLabel: 'Trap Port No',
		        },{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
		        	xtype: 'displayfield',
		        	name:'lastReqSn',
		        	fieldLabel: 'Last Request SN',
		        },{
		        	xtype: 'displayfield',
		        	name:'reqCntPerMin',
		        	fieldLabel: 'Request Count(per min)',
		        },{
		        	xtype: 'displayfield',
		        	name:'totalTrapCount',
		        	fieldLabel: 'Total Trap Count',
		        },{
		        	xtype: 'displayfield',
		        	name:'totalReqCount',
		        	fieldLabel: 'Total Request Count',
		        },{
		        	xtype: 'displayfield',
		        	name:'apiAuthFailCnt',
		        	fieldLabel: 'Auth Fail Count',
		        },{
		        	xtype: 'displayfield',
		        	name:'cliIpAddr',
		        	fieldLabel: 'Client IP Address',
		        },{
		        	xtype: 'displayfield',
		        	name:'cliPortNo',
		        	fieldLabel: 'Client Port No',
		        },{
		        	xtype: 'displayfield',
		        	name:'lastUsedTime',
		        	fieldLabel: 'Last Used Time',
		        }]
			}],
	        maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			
	    			var commit = Ext.create('Ext.button.Button',{
			            text: 'Commit',
			            iconCls:'save',
			            ulan:'btCommit',
			            flag:"domain_edit",
			            disabled: true,
			            formBind: false,
			            handler: function() {
//		            		var tmp = this.up('form').down('fieldcontainer[itemId=user_name]');
		            		var email_address = this.up('form').down('fieldcontainer[itemId=email_address]');
		            		if(email_address.getComponent('picture').flag==0){
		            			return;
		            		}
			                var form = this.up('form').getForm();
			                var store = this.up('form').store;
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'userManager!updateUser.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		ip.commitSuccess(userTab,userTab.store);
				                    	}else{
				                    		ip.commitFailure(userTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(userTab,userTab.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    			
	    			var restore = Ext.create('Ext.button.Button',{
			            text: 'Modify Password',
			            iconCls:'restore_pwd',
			            ulan:'btModifyPwd',
			            flag:"domain_action",
//			            formBind: true, //only enabled once the form is valid
//			            disabled: true,
			            handler: function() {
			                var form = this.up('form').getForm();
			                var uuid=form.findField('uuid').getValue();
			                var name=form.findField('name').getValue();
			                var domainUuid=form.findField('domainUuid').getValue();
			                var pwdPanel=Ext.getCmp('updateUserPwd');
			                if(pwdPanel==undefined || pwdPanel=='undefined'){
			                	pwdPanel=Ext.create('app.view.user.UpdateUserPwd',{});
			                	lanControll.setLan(pwdPanel);
			                }
			                pwdPanel.down('form').getForm().reset();
			                pwdPanel.down('form').getForm().findField('uuid').setValue(uuid);
			                pwdPanel.down('form').getForm().findField('name1').setValue(name);
			                pwdPanel.down('form').getForm().findField('domainUuid').setValue(domainUuid);
			                pwdPanel.show();
			            }
			        
			        });
	    			tbar.push(restore);
	    			tbar.push('-');

	    			var apiSetting = Ext.create('Ext.button.Button',{
	    				text:'API Setting',
	    				ulan:'btApiSetting',
	    				iconCls:'option',
	    				flag:"api_action",
	    				listeners:{ 
		    				click: function() {
//								var domainUuid=uDomainTab.treeName;
								var ids=0;
								
								var records=userTab.store.getAt(0);
								var domainUuid=records.get('domainUuid');
								var ids=records.get('uuid');
								var name=records.get('name');
								
								var userAPI =Ext.getCmp('updateUserAPI'); 
								if(userAPI==null || userAPI==undefined){
									userAPI=Ext.create('app.view.operation.user.UpdateUserAPI',{});
									lanControll.setLan(userAPI);
								}
								userAPI.down('form').store = store;
								userAPI.down('form').loadRecord(records);
								userAPI.down('form').getForm().findField('domainUuid').setValue(domainUuid);
								userAPI.down('form').getForm().findField('ids').setValue(ids);
								userAPI.down('form').getForm().findField('name').setValue(name);
								userAPI.show();
		    				}		
	    				}							
	    			});
	    			tbar.push(apiSetting);
	    			tbar.push('-');
	    		}
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
		       		 listeners:{
		       		 	click:function(){
		        			this.up('form').store.load();
		       	 		}
		       	 	}
	       	 	});
	    		tbar.push(refresh);
	    		for(var i=0;i<tbar.length;i++){
	    			if(tbar[i]!='-' && tbar[i]!='->'){
	    				var text = lanControll.getLanValue(tbar[i].ulan);
	    				tbar[i].setText(text);
	    			}
	    		}
	    		var dockedItems = {
	    				xtype:'toolbar',
	    				dock: 'top',
	    				items:tbar
	    		};
	    		this.addDocked(dockedItems);
	    	},
			listeners:{
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    				privilege.procPrivilege(userTab);
	    			},
	    			single:true
	    		}
	    	},
		});
		ip.initOtiose(1,userTab);
//		userTab.addListener("afterlayout",function(){
//			privilege.procPrivilege(userTab);
//		},this,{single:true});
		ruleLoadMask=new Ext.LoadMask(userTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load',function(){
			var r=store.getAt(0);
			userTab.loadRecord(r);
			var type=rs.userType(r.get('type'));
			userTab.getForm().findField('type').setValue(type);
			userTab.getForm().findField('passwordMd5').setValue('');
			
			Ext.Ajax.request({
        		url:'licenseManager!checkHBMOrAPI.action?domainUuid='+r.get('domainUuid'),
        		method:'POST',
        		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                	if(obj['success']){
                		var apiInfo=userTab.down('fieldset[name=apiInfo]');
                		apiInfo.setTitle(lanControll.getLanValue('fsApiInfo')+' ('+obj['apiMsg']+')');
                	}else{
                	}
            	}
        	});
			
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[userTab]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});