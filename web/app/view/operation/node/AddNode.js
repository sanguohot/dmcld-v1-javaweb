var form=Ext.widget('form',{
			treeName:'',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
			border : false,
			bodyPadding : 10,
			fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '80%'
	        },

			items :[{
		    	layout:'hbox',
		    	xtype:'fieldcontainer',
		    	border:false,
		    	anchor: '100%',
		    	items:[{
		            xtype: 'textfield',
		            name: 'name',
		            flex:4,
		            fieldLabel: 'Name',
		            allowBlank: false,
		            listeners:{
		                render : function(p) {
		                    p.getEl().on('mouseup', function(p){ 
		                    	var tip = Ext.getCmp('AddNode_tip');
		                    	tip.show();
		                    });
	                	},
		        		focus:function(){
		        			var textobj = this;
		        			var gettip = Ext.getCmp('GetTip');
		        			if(gettip==undefined || gettip==null){
		        				gettip = Ext.create("app.util.GetTip",{});
		        			}
		        			var tip = Ext.getCmp('AddNode_tip');
		        			if(tip==undefined || tip==null){
		        				var tipManage = Ext.getCmp('TipObjManage');
		        				if(tipManage==undefined || tipManage==null){
		        					tipManage = Ext.create("app.util.TipObjManage",{});
		        				}
		        				tip = tipManage.createObjNameTipObj('AddNode_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
		        			}
		        			tip.show();
		        			tip.clearListeners();
		        			//alert(tmp.html)
		        		},
		    	    	blur:function(field,eOpts){
		        			var tip = Ext.getCmp('AddNode_tip');
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
			        			var name=textobj.getValue();
			        			var cloudUuid=this.up('form').getForm().findField('cloudUuid').getValue();
			        			if(name!=null&&name!=""){
			        				Ext.Ajax.request({
			                    		url:'nodeManager!checkNode.action',
			                    		method:'POST',
			                    		params:{cloudUuid:cloudUuid,name:name},
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
		    	},{
	    			html:'', flex:1, border:false,itemId:'picture'
	    		}]
			},{
	            xtype: 'textfield',
	            name: 'alias',
	            fieldLabel: 'Alias',
	        },rs.createPriority(), {
	            xtype: 'textfield',
	            name: 'ipAddr',
	            fieldLabel: 'IP Address',
	        }, {
	            xtype: 'textfield',
	            name: 'portNo',
	            fieldLabel: 'Port No',
	        },{
				xtype : 'textareafield',
				fieldLabel : 'Description',
				name:'detailDesc',
				margins : '0',
			},{
				xtype : 'hiddenfield',
				name:'cloudUuid',
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
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'nodeManager!addNode.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
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

Ext.define("app.view.operation.node.AddNode", {
	extend : 'Ext.window.Window',
	alias : 'widget.addNode',
	id:'addNode',
	title : lanControll.getLanValue('tiAddNode'),
	closeAction: 'hide',
	layout:'fit',
	height : 340,
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:600,
    layout: 'fit',
    resizable: true,
//    modal: true,
    items: form
	
});
