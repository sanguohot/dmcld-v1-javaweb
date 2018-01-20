Ext.define("app.view.systemconfig.AddEnumDef", {
	extend : 'Ext.window.Window',
	alias : 'widget.addEnumDef',
	id:'addEnumDef',
	title : lanControll.getLanValue('tiAddEnumDef'),
	width : 500,
	closeAction: 'hide',
	closable:true,
	minWidth : 350,
	height : 180,
	minHeight: 100,
    layout: 'fit',
    resizable: true,
    modal: true,
    isType:false,
    initComponent:function(){
		this.createEnumType();
		this.items = this.createForm();
		this.callParent(arguments);	
	},
	runProc:function(isType){
		if(isType != this.isType){
			this.down('form').remove(this.getEnumType(this.isType),false);
			this.down('form').insert(0,this.getEnumType(isType));
		}
		this.isType = isType;
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
	createEnumType:function(){
		this.enumTypeText = Ext.create("Ext.form.field.Text",{
			fieldLabel:'Enum Type',
			name:'typeName',
			fieldStyle:"background:#DFE9F6",
			readOnly:true,
		});
		var tip = this.createToolTip();
		this.enumTypeContainer = Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
//		    	itemId:'ag_alias',
	    	anchor: '100%',
	    	items:[{
				xtype:'textfield',
				fieldLabel:'Enum Type',
				name:'typeName',
//					allowBlank: false,			
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
	        			var str = checkobj.getErrorStr(value);
	        			var picture = this.up('fieldcontainer').getComponent('picture');
	        			if(str != ""){
	        				str = "<font color=#f00>"+str+"</font>";
	        				picture.update(prefix+str+suffix);
	        				picture.flag = 0;
	        				this.markInvalid("");
	        			}else{
	        				Ext.Ajax.request({
	                    		url:'enumDefManager!checkEnum.action',
	                    		method:'POST',
	                    		scope:this,
	                    		params:{typeName:value},
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
	getEnumType:function(isType){
		if(isType){
			return this.enumTypeContainer;
		}else{
			return this.enumTypeText;
		}
	},
	createEnumId:function(){
//		var enumType = this.createEnumType();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
//	    	itemId:'ag_alias',
	    	anchor: '100%',
	    	items:[{
				xtype:'numberfield',
				fieldLabel:'Enum Id',
	            maxValue:2147483647,
	            minValue:-2147483648,
				name:'enumId',
//				allowBlank: false,
				flex:75,
                msgTarget:'none',
	            enableKeyEvents : true,
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
						var typeName = this.up('form').getForm().findField('typeName').getValue();
						Ext.Ajax.request({
			        		url:'enumDefManager!checkEnum.action',
			        		method:'POST',
			        		scope:this,
			        		params:{typeName:typeName,enumId:value},
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
	createEnumValue:function(){
		var tip = this.createToolTip();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
//		    	itemId:'ag_alias',
	    	anchor: '100%',
	    	items:[{
				xtype:'textfield',
				fieldLabel:'Enum Value',
				name:'enumValue',
//					allowBlank: false,			
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
	        			this.up('fieldcontainer').getComponent('picture2').flag = 0;
	        			var myTip = this.myTip;
	        			if(myTip != null){
	        				myTip.hide();
	        			}
	        			var prefix = "<div>&nbsp;";
	        			var suffix  = "</div>";
						var picture = this.up('fieldcontainer').getComponent('picture2');
						var value = this.getValue();
						if(value==null || value==""){
	            		picture.flag = 0;
	            		this.markInvalid("");
	            		str = "Shouldn't be null";
	            		str = "<font color=#f00>"+str+"</font>"
	            		picture.update(prefix+str+suffix);
	            		return;
						}						
						if(value.length>31){
	            		picture.flag = 0;
	            		this.markInvalid("");
	            		str = "Too more input";
	            		str = "<font color=#f00>"+str+"</font>"
	            		picture.update(prefix+str+suffix);
	            		return;
						}
        				var typeName = this.up('form').getForm().findField('typeName').getValue();
        				Ext.Ajax.request({
                    		url:'enumDefManager!checkEnum.action',
                    		method:'POST',
                    		scope:this,
                    		params:{typeName:typeName,enumValue:value},
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
    			html:'', flex:25, border:false,itemId:'picture2',flag:2
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
		    items: [this.getEnumType(this.isType),this.createEnumId(),this.createEnumValue(),{
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
		    		if(this.up('form').up('panel').isType){
		    			var picture = this.up('form').down('panel[itemId=picture]');
			    		if(picture.flag != 1){
			    			return;
			    		}
		    		}
		    		var picture2 = this.up('form').down('panel[itemId=picture2]');
		    		var picture1 = this.up('form').down('panel[itemId=picture1]');
		    		if(picture1.flag != 1){
		    			return;
		    		}
		    		if(picture2.flag != 1){
		    			return;
		    		}
		            if (this.up('form').getForm().isValid()) {
		               
			                var form = this.up('form').getForm();
			                var componentId=form.findField('componentId').getValue();
			                	Ext.Ajax.request({
			                		url:'enumDefManager!addEnumDef.action',
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
			if(this.isType){
				var picture = this.down('panel[itemId=picture]');
				picture.update("");
				picture.flag = 2;
			}
			
			var picture1 = this.down('panel[itemId=picture1]');
			picture1.update("");
			picture1.flag = 2;
			var picture2 = this.down('panel[itemId=picture2]');
			picture2.update("");
			picture2.flag = 2;
		}
	}
	
});

