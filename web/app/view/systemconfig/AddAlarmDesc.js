Ext.define("app.view.systemconfig.AddAlarmDesc", {
	extend : 'Ext.window.Window',
	alias : 'widget.addAlarmDesc',
	id:'addAlarmDesc',
	title : lanControll.getLanValue('tiAddAlarmDesc'),
	width : 500,
	closeAction: 'hide',
	closable:true,
	minWidth : 350,
//	height : 250,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
//    items: form,
    initComponent:function(){
		this.items = this.createForm();
		this.callParent(arguments);	
	},
	createToolTip:function(){
		return Ext.create('Ext.tip.ToolTip', {
			title:boxPromotion,
		    dismissDelay:0,
		    anchor: 'left',
		    width:250,
		    maxWidth:300,
		    autoHide:false,
		    autoScroll:true,
		});
	},
	createAlarmId:function(){
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
//	    	itemId:'ag_alias',
	    	anchor: '100%',
	    	items:[{
				xtype:'numberfield',
				fieldLabel:'Alarm Id',
				name:'alarmId',
//				allowBlank: false,
				flex:75,
                msgTarget:'none',
	            enableKeyEvents : true,
	            maxValue:2147483647,
	            minValue:-2147483648,
	            listeners:{
	    	    	blur:function(field,eOpts){
	    				this.up('fieldcontainer').getComponent('picture1').flag = 0;
						var value = this.getValue();
	        			var prefix = "<div>&nbsp;";
	        			var suffix  = "</div>";
						var picture = this.up('fieldcontainer').getComponent('picture1');
						if(value==null || typeof(value)=='object'){
	            		picture.flag = 0;
	            		this.markInvalid("");
	            		str = "Shouldn't be null";
	            		str = "<font color=#f00>"+str+"</font>"
	            		picture.update(prefix+str+suffix);
	            		return;
						}
						var str = "";
						Ext.Ajax.request({
			        		url:'alarmDescManager!countAlarmDesc.action',
			        		method:'POST',
			        		scope:this,
			        		params:{alarmId:value},
			        		callback: function (options, success, response) {
			                	var obj=Ext.JSON.decode(response.responseText);			
			                	if(obj['success']){
			                		str = "<img  src='resources/images/right.png'/>";
			                		picture.flag = 1;
			                		this.clearInvalid("");
			                	}else{
			                		str = "<font color=#f00>"+alreadyInUse+"</font>";
			                		picture.flag = 0;
			                		this.markInvalid("");
			                	}
			                	picture.update(prefix+str+suffix);
			            	}
			        	});
	    			}
	        	}
	    	},{
    			html:'', flex:25, border:false,itemId:'picture1',flag:2
    		}]
        });
	},
	createAlarmName:function(){
		var tip = this.createToolTip();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
//	    	itemId:'ag_alias',
	    	anchor: '100%',
	    	items:[{
				xtype:'textfield',
				fieldLabel:'Alarm Name',
				name:'alarmName',
//				allowBlank: false,			
				flex:75,
                msgTarget:'none',
	            enableKeyEvents : true,
	            myTip:null,
	            listeners:{
		    		render : function(p) {
	    				var text = this;
	                    p.getEl().on('mouseup', function(p){
	                    	if(text.myTip != null){
	                    		text.myTip.show();
	                    	}
	                    });
            		},
	        		focus:function(){
	        			var gettip = Ext.getCmp('GetTip');
	        			if(gettip==undefined || gettip==null){
	        				gettip = Ext.create("app.util.GetTip",{});
	        			}
	        			var myTip = this.myTip;
	        			if(myTip == null){
	        				this.myTip = tip;
	        				myTip = tip;
	        				tip.setTarget(this.getEl().dom.id);
	        				tip.update(gettip.getObjNameTip(this.fieldLabel));
	        			}
	        			myTip.show();
	        			myTip.clearListeners();
	        		},
	    	    	blur:function(field,eOpts){
	        			this.up('fieldcontainer').getComponent('picture').flag = 0;
	        			var myTip = this.myTip;
	        			if(myTip != null){
	        				myTip.hide();
	        			}
	        			var prefix = "<div>&nbsp;";
	        			var suffix  = "</div>";
	        			var checkobj = Ext.getCmp("DataCheck");
	        			if(checkobj==undefined || checkobj==null){
	        				checkobj = Ext.create("app.util.DataCheck",{});
	        			}
	        			var value = this.getValue();
	        			var str = checkobj.getErrorStr2(value,/^[-_.A-Za-z0-9\s]{0,29}$/);
	        			var picture = this.up('fieldcontainer').getComponent('picture');
	        			if(str != ""){
	        				str = "<font color=#f00>"+str+"</font>";
	        				picture.update(prefix+str+suffix);
	        				picture.flag = 0;
	        				this.markInvalid("");
	        			}else{
	        				Ext.Ajax.request({
	                    		url:'alarmDescManager!countAlarmDesc.action',
	                    		method:'POST',
	                    		scope:this,
	                    		params:{alarmName:value},
	                    		callback: function (options, success, response) {
	    	                    	var obj=Ext.JSON.decode(response.responseText);			
	    	                    	if(obj['success']){
	    	                    		str = "<img  src='resources/images/right.png'/>";
	    	                    		picture.flag = 1;
	    	                    		this.clearInvalid("");
	    	                    	}else{
	    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
	    	                    		picture.flag = 0;
	    	                    		this.markInvalid("");
	    	                    	}
	    	                    	picture.update(prefix+str+suffix);
	                        	}
				        	});
	        			}
	    	    	}
	        	}
	    	},{
    			html:'', flex:25, border:false,itemId:'picture',flag:2
    		}]
        });
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
		    items: [this.createAlarmId(),this.createAlarmName(),{

		        xtype: 'combo',
		        name: 'alarmLevel',
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
				
		    
			},alarmUtil.createAlarmType(),{
				xtype:'numberfield',
				fieldLabel:'Filter Period',
				name:'timeCheckMax',
				minValue:0,
				maxValue:50
		    },{
				xtype:'textareafield',
				fieldLabel:'Alarm Desc',
				ulan:'null',
				name:'alarmDesc',
			},{
				xtype:'textareafield',
				fieldLabel:'告警描述',
				ulan:'null',
				name:'alarmDescCn',
			},{
				xtype:'hiddenfield',
				name:'componentId',
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
		    		
		    		var picture = this.up('form').down('panel[itemId=picture]');
		    		var picture1 = this.up('form').down('panel[itemId=picture1]');
		    		if(picture1.flag != 1){
		    			return;
		    		}
		    		if(picture.flag != 1){
		    			return;
		    		}
		            if (this.up('form').getForm().isValid()) {
		               
			                var form = this.up('form').getForm();
			                var componentId=form.findField('componentId').getValue();
			                	Ext.Ajax.request({
			                		url:'alarmDescManager!addAlarmDesc.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
							                  	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		Ext.getCmp(componentId).store.load();
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
	},
    listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
			var picture = this.down('panel[itemId=picture]');
			picture.update("");
			picture.flag = 2;
			var picture1 = this.down('panel[itemId=picture1]');
			picture1.update("");
			picture1.flag = 2;
		}
	}
	
});

