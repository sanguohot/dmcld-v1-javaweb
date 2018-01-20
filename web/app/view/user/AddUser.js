Ext.define("app.view.user.AddUser", {
	extend : 'Ext.window.Window',
	alias : 'widget.addUser',
	id:'addUser',
	title : lanControll.getLanValue('tiAddUser'),
	width : 550,
	closeAction: 'hide',
	minWidth : 350,
	height : 390,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
//    items: form
    initComponent:function(){
		var role = Ext.create("Ext.form.field.ComboBox",{
			xtype:'combo',
			fieldLabel:"Role",
			displayField : 'name',
			valueField : 'roleId',
			name:'roleId',
			editable:false,
			allowBlank:false,
			store : Ext.create('app.store.privilege.RoleStore', {})
		});

		var generalObj = Ext.getCmp('GeneralObj');
		if(!generalObj){
			generalObj = Ext.create('app.util.GeneralObj',{});
		}
		
		userName = generalObj.createName2('user_name'
				,75,25,'name','Name','','registerManager!checkUser.action',null);
		this.userName = userName;
//		store.on('load',function(){
//			var picture = userName.getComponent('picture');
//			picture.update("");
//			picture.flag = 2;
//		});
		userName.down("textfield").labelWidth=100;
		var form = Ext.widget('form', {
		    border: false,
		    bodyPadding: 10,
	
		    defaults: {
		        margins: '0 0 10 0'
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '75%',
		        labelWidth: 100
		    },
		    items: [userName,{
		    	xtype:'textfield',
		    	name:'passwordMd5',
		    	ulan:'password',
		    	fieldLabel:'Password',
		    	allowBlank: false,
		    	inputType: 'password',
		    	maxLength:31
	//	    },{
	//	    	name:'type',
	//			xtype: 'combo',
	//			mode: 'local',
	//			fieldLabel: 'Type',
	//			displayField: 'name',
	//			valueField: 'value',
	//			queryMode: 'local',
	//			editable:false,
	//			
	//			store: Ext.create('Ext.data.Store', {
	//				fields : ['name', 'value'],
	//				data   : [
	//					{name : 'Normal User',   value: 2},
	//					{name : 'Message User',  value: 3},
	//					
	//				]
	//			}),
	//			value:2,
	//			allowBlank: false
		    },role,{
		    	layout:'hbox',
		    	xtype:'fieldcontainer',
		    	itemId:'email_address',
		    	border:false,
		    	anchor: '100%',
		    	items:[{
		    		xtype:'textfield',
		        	name:'email',
		        	fieldLabel:'Email',
		        	allowBlank: false,
		            flex:3,
		            maxLength:63,
		            msgTarget:'none',
		            enableKeyEvents : true,
		            listeners:{
		    	    	blur:function(field,eOpts){
		    				this.up('fieldcontainer').getComponent('picture').flag = 0;
							var picture = this.up('fieldcontainer').getComponent('picture');
							var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
							
				            var str="<div>&nbsp;";
				            var Regex = new RegExp(myreg);
				    		if(Regex.test(field.getValue()) == false){
				            	str = str+"<font color=#f00>"+lanControll.getLanValue('invalidEmail')+"</font>";
				            	picture.flag = 0;          		
			        		}else{
			        			str = str+"<img  src='resources/images/right.png'/>";
			        			picture.flag = 1;
			        		}
							picture.update(str+'</div>');
						}
		        	}
				},{
					html:'', flex:1, border:false,itemId:'picture',flag:2
				}]
		    
		    },{
		    	xtype:'textfield',
		    	name:'phone',
		    	fieldLabel:'Phone'
		    },{
		    	xtype:'textfield',
		    	name:'mobile',
		    	fieldLabel:'Mobile'
		    },{
		    	xtype:'textfield',
		    	name:'address',
		    	fieldLabel:'Address'
		    },{
		    	xtype:'textareafield',
		    	name:'detailDesc',
		    	fieldLabel:'Description'
		    },{
		    	xtype:'hiddenfield',
		    	name:'domainUuid',
		    	value:0
		    },{
		    	xtype:'hiddenfield',
		    	name:'type',
		    	value:5
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
					var tmp = this.up('form').getComponent('user_name');
					if(tmp.getComponent('picture').flag==0)
			    	return;
		            if (this.up('form').getForm().isValid()) {
		            		var userStore = this.up('form').userStore;
			                var form = this.up('form').getForm();
			                var win=this.up('window');
			                var user_name = this.up('form').getComponent('user_name');
			                var email_address = this.up('form').getComponent('email_address');
			                 
			        		if(user_name.getComponent('picture').flag!=0&& email_address.getComponent('picture').flag!=1)
			                	return;
			               
			                if (form.isValid()) {
			                	
			                	Ext.Ajax.request({
			                		url:'userManager!addUser.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		form.reset();
				                    		userStore.load();
					          	                win.hide();
				                    	}else{
				                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
				                    	}
				                    	
			                    	}
			                	});
			                }
			                
			            }
		            }
		        
		    }]
		});
		this.items = form;
		this.callParent(arguments);
	},
	listeners:{
		beforehide:function(){
			var userName = this.userName;
			var picture = userName.getComponent('picture');
			picture.update("");
			picture.flag = 2;
			var emailAddress = this.down('fieldcontainer[itemId=email_address]')
			if(emailAddress){
				var picture = emailAddress.getComponent('picture');
				picture.update("");
				picture.flag = 2;
			}
		}
	}
	
});

