Ext.define("app.view.systemconfig.UpdateCauseDesc", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateCauseDesc',
	id:'updateCauseDesc',
	title : lanControll.getLanValue('tiUpdateCauseDesc'),
	width : 500,
	closeAction: 'hide',
	closable:true,
	minWidth : 350,
//	height : 250,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    causeName:'',
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

	createCauseName:function(){
		var tip = this.createToolTip();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
//	    	itemId:'ag_alias',
	    	anchor: '100%',
	    	items:[{
				xtype:'textfield',
				fieldLabel:'Cause Name',
				name:'causeName',
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
	        			var causeName=field.up('window').causeName;
	        			
	        			this.up('fieldcontainer').getComponent('picture').flag = 1;
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
	        			if(this.getValue()==causeName){
	        				str = "<img  src='resources/images/right.png'/>";
            			picture.flag = 1;
            			this.clearInvalid("");
            			picture.update(prefix+str+suffix);
	        				return;
	        			}
	        			if(str != ""){
	        				str = "<font color=#f00>"+str+"</font>";
	        				picture.update(prefix+str+suffix);
	        				picture.flag = 0;
	        				this.markInvalid("");
	        			}else{
	        				Ext.Ajax.request({
	                    		url:'causeDescManager!countCauseDesc.action',
	                    		method:'POST',
	                    		scope:this,
	                    		params:{causeName:value},
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
    			html:'', flex:25, border:false,itemId:'picture',flag:1
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
		    items: [{
				xtype:'numberfield',
				fieldLabel:'Cause Id',
				name:'causeId',
//				allowBlank: false,
				flex:75,
                msgTarget:'none',
	            maxValue:2147483647,
	            minValue:-2147483648,
	            enableKeyEvents : true,
	           
	    	},this.createCauseName(),{
				xtype:'textareafield',
				fieldLabel:'Cause Desc',
				ulan:'null',
				name:'causeDesc',
			},{
				xtype:'textareafield',
				fieldLabel:'原因描述',
				ulan:'null',
				name:'causeDescCn',
			},{
				xtype:'hiddenfield',
				name:'componentId',
			},{
				xtype:'hiddenfield',
				name:'uuid',
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
		    		
		    		if(picture.flag != 1){
		    			return;
		    		}		    		
		    		
		            if (this.up('form').getForm().isValid()) {
		               
			                var form = this.up('form').getForm();
			                var params = form.getValues();
			                params['lanIsCn'] = lanControll.isCn();
			                var componentId=form.findField('componentId').getValue();
			                	Ext.Ajax.request({
			                		url:'causeDescManager!updateCauseDesc.action',
			                		method:'POST',
			                		params:params,
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
			picture.flag = 1;
			
		}
	}
});

