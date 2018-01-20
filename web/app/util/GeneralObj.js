Ext.define('app.util.GeneralObj',{
	id:'GeneralObj',
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
	createBlackWhiteNum:function(itemId,name,fieldLabel,color,url,store,record,backupField,sizeObj){
		var tip = this.createToolTip();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
	    	itemId:itemId,
	    	anchor: '100%',
	    	items:[{	
	    		xtype: 'textfield',
				name : name,
				flex:sizeObj?sizeObj.textFlex:75,
				fieldLabel: fieldLabel,
				labelWidth: sizeObj?sizeObj.labelWidth:180,
				maxLength:sizeObj?sizeObj.maxLength:31,
				myTip:null,
	            allowBlank: true,
	            msgTarget:'none',
		            listeners:{
	    	    	blur:function(field,eOpts){
	        			//#DFE9F6
	        			var prefix = "<div style='background:"+color+"'>&nbsp;";
	        			var suffix  = "</div>";
	        			var picture = this.up('fieldcontainer').getComponent('picture');
	        			var name0=this.getValue();
	        			if(name0!=null&&name0!=""){
	        				var name1;
	        				if(store){
	        					name1 = store.getAt(0).get(name);
	        				}else if(record){
	        					name1 = record.get(name);
	        				}else if(backupField){
	        					name1 = backupField.getValue();
	        				}else{
	        					name1 = name+'0';
	        				}
    				        if(name0 == name1){
    				        	str = "";
    				        	picture.update(prefix+str+suffix);
    				        	picture.flag = 1;
    				        	this.clearInvalid("");
    				        }
    				        else{
    				        	var tmp = this;	
    				        	if(url){
			        				Ext.Ajax.request({
			                    		url:url,
			                    		method:'POST',
			                    		params:this.up('form').getForm().getValues(),
			                    		callback: function (options, success, response) {
			    	                    	var obj=Ext.JSON.decode(response.responseText);			
			    	                    	if(obj['success']){
			    	                    		str = "<img  src='resources/images/right.png'/>";
			    	                    		picture.flag = 1;
			    	                    		tmp.clearInvalid("");			    	                    		
			    	                    	}else{
			    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
			    	                    		picture.flag = 0;
			    	                    		tmp.markInvalid("");
			    	                    	}
			    	                    	picture.update(prefix+str+suffix);
			                        	}
			                    	});
    				        	}else{
			                	str = "<img  src='resources/images/right.png'/>";
			                	picture.flag = 1;				                    	
			                    	tmp.clearInvalid("");
			                    	picture.update(prefix+str+suffix);
    				        	}
    				        }
	        			}else{
	        				str = "<font color=#f00>"+lanControll.getLanValue('notBeNull')+"</font>";
	        				picture.update(prefix+str+suffix);
	        				picture.flag = 0;
	        				this.markInvalid("");
	        			}
        			
	    	    	}
		        }
			},{
				html:'', flex:sizeObj?(100-sizeObj.textFlex):25,border:false,itemId:'picture',flag:2
			}]
	    });
	},
	createName:function(itemId,flex0,flex1,name,fieldLabel,color,url,store,backupField,sizeObj){
		var tip = this.createToolTip();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
	    	itemId:itemId,
	    	anchor: '100%',
	    	items:[{	
	    		xtype: 'textfield',
				name : name,
				flex:flex0,
				fieldLabel: fieldLabel,
				labelWidth: sizeObj?sizeObj.labelWidth:180,
				maxLength:sizeObj?sizeObj.maxLength:31,
				myTip:null,
	            allowBlank: true,
	            msgTarget:'none',
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
	        			//#DFE9F6
	        			var prefix = "<div style='background:"+color+"'>&nbsp;";
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
		        			var name0=this.getValue();
		        			if(name0!=null&&name0!=""){
		        				var name1;
		        				if(store){
		        					name1 = store.getAt(0).get(name);
		        				}else if(backupField){
		        					name1 = backupField.getValue();
		        				}else{
		        					name1 = name+'0';
		        				}
	    				        if(name0 == name1){
	    				        	str = "";
	    				        	picture.update(prefix+str+suffix);
	    				        	picture.flag = 1;
	    				        	this.clearInvalid("");
	    				        }
	    				        else{
	    				        	var tmp = this;	
	    				        	if(url){
				        				Ext.Ajax.request({
				                    		url:url,
				                    		method:'POST',
				                    		params:this.up('form').getForm().getValues(),
				                    		callback: function (options, success, response) {
				    	                    	var obj=Ext.JSON.decode(response.responseText);			
				    	                    	if(obj['success']){
				    	                    		str = "<img  src='resources/images/right.png'/>";
				    	                    		picture.flag = 1;
				    	                    		tmp.clearInvalid("");			    	                    		
				    	                    	}else{
				    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
				    	                    		picture.flag = 0;
				    	                    		tmp.markInvalid("");
				    	                    	}
				    	                    	picture.update(prefix+str+suffix);
				                        	}
				                    	});
	    				        	}else{
				                	str = "<img  src='resources/images/right.png'/>";
				                	picture.flag = 1;				                    	
				                    	tmp.clearInvalid("");
				                    	picture.update(prefix+str+suffix);
	    				        	}
	    				        }
		        			}
	        			}
	    	    	}
		        }
			},{
				html:'', flex:flex1, border:false,itemId:'picture',flag:2
			}]
	    });
	},
	createName2:function(itemId,flex0,flex1,name,fieldLabel,color,url,store,backupField,sizeObj){
		var tip = this.createToolTip();
		return Ext.create("Ext.form.FieldContainer",{
	    	layout:'hbox',
	    	border:false,
	    	itemId:itemId,
	    	anchor: '100%',
	    	items:[{	
	    		xtype: 'textfield',
				name : name,
				flex:flex0,
				fieldLabel: fieldLabel,
				labelWidth: sizeObj?sizeObj.labelWidth:180,
				maxLength:sizeObj?sizeObj.maxLength:31,
				myTip:null,
	            allowBlank: true,
	            msgTarget:'none',
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
		        				tip.update(gettip.getObjNameTip2(this.fieldLabel));
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
	        			//#DFE9F6
	        			var prefix = "<div style='background:"+color+"'>&nbsp;";
	        			var suffix  = "</div>";
	        			var checkobj = Ext.getCmp("DataCheck");
	        			if(checkobj==undefined || checkobj==null){
	        				checkobj = Ext.create("app.util.DataCheck",{});
	        			}
	        			var value = this.getValue();
	        			var str = checkobj.getErrorStr3(value);
	        			var picture = this.up('fieldcontainer').getComponent('picture');
	        			if(str != ""){
	        				str = "<font color=#f00>"+str+"</font>";
	        				picture.update(prefix+str+suffix);
	        				picture.flag = 0;
	        				this.markInvalid("");
	        			}else{
		        			var name0=this.getValue();
		        			if(name0!=null&&name0!=""){
		        				var name1;
		        				if(store){
		        					name1 = store.getAt(0).get(name);
		        				}else if(backupField){
		        					name1 = backupField.getValue();
		        				}else{
		        					name1 = name+'0';
		        				}
	    				        if(name0 == name1){
	    				        	str = "";
	    				        	picture.update(prefix+str+suffix);
	    				        	picture.flag = 1;
	    				        	this.clearInvalid("");
	    				        }
	    				        else{
	    				        	var tmp = this;	
	    				        	if(url){
				        				Ext.Ajax.request({
				                    		url:url,
				                    		method:'POST',
				                    		params:this.up('form').getForm().getValues(),
				                    		callback: function (options, success, response) {
				    	                    	var obj=Ext.JSON.decode(response.responseText);			
				    	                    	if(obj['success']){
				    	                    		str = "<img  src='resources/images/right.png'/>";
				    	                    		picture.flag = 1;
				    	                    		tmp.clearInvalid("");			    	                    		
				    	                    	}else{
				    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
				    	                    		picture.flag = 0;
				    	                    		tmp.markInvalid("");
				    	                    	}
				    	                    	picture.update(prefix+str+suffix);
				                        	}
				                    	});
	    				        	}else{
				                	str = "<img  src='resources/images/right.png'/>";
				                	picture.flag = 1;				                    	
				                    	tmp.clearInvalid("");
				                    	picture.update(prefix+str+suffix);
	    				        	}
	    				        }
		        			}
	        			}
	    	    	}
		        }
			},{
				html:'', flex:flex1, border:false,itemId:'picture',flag:2
			}]
	    });
	},
	GeneralObjOfName:function(fieldcontainer_itemId,fieldLabel,name,field_itemId
			,tipId,bColor,backup_name_field,url,form,picture_flex){
		if(picture_flex >= 100){
			console.log("GeneralObjOfName param:picture_flex error!!!");
			return;
		}
		var len = 100-picture_flex;
		var FieldContainer = new Ext.form.FieldContainer({
	    	layout:'hbox',
	    	itemId:fieldcontainer_itemId,
	    	border:false,
	    	anchor: '100%',
	    	items:[{
	            xtype: 'textfield',
	            name: name,
	            fieldLabel: fieldLabel,
	            itemId:field_itemId,
	            flex:len,
	            allowBlank: false,
	            msgTarget:'none',
	            listeners:{
	                render : function(p) {
	                    p.getEl().on('mouseup', function(p){
	                    	var tip = Ext.getCmp(tipId);
	                    	tip.show();
	                    });
	                },
	        		focus:function(){
	        			var textobj = this;
	        			var gettip = Ext.getCmp('GetTip');
	        			if(gettip==undefined || gettip==null){
	        				gettip = Ext.create("app.util.GetTip",{});
	        			}
	        			var tip = Ext.getCmp(tipId);
	        			if(tip==undefined || tip==null){
	        				var tipManage = Ext.getCmp('TipObjManage');
	        				if(tipManage==undefined || tipManage==null){
	        					tipManage = Ext.create("app.util.TipObjManage",{});
	        				}
	        				tip = tipManage.createObjNameTipObj(tipId,textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
	        			}
	        			tip.show();
	        			tip.clearListeners();
	        			//alert(tmp.html)
	        		},
	    	    	blur:function(field,eOpts){
	        			this.up('fieldcontainer').getComponent('picture').flag = 0;
	        			var tip = Ext.getCmp(tipId);
	        			tip.hide();
	        			var textobj = this;
	        			var tmp;
	        			if(bColor == null){
	        				tmp = "";
	        			}else{
	        				tmp = "style='background:"+bColor+"'";
	        			}
	        			var prefix = "<div "+tmp+">&nbsp;";
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
	        				picture.flag = 0;
	        			}else{
							var name=textobj.getValue();
							var oldName = backup_name_field.getValue();
							if(oldName==name){
								str = "";
								picture.flag = 2;
								picture.update(prefix+str+suffix);
							}else{
								if(url!=undefined && url!=null && url!=""){
			        				Ext.Ajax.request({
			                    		url:url,
			                    		method:'POST',
			                    		params:form.getForm().getValues(),
			                    		callback: function (options, success, response) {
			    	                    	var obj=Ext.JSON.decode(response.responseText);			
			    	                    	if(obj['success']){
	            			  str = "<img  src='resources/images/right.png'/>";
	            			  picture.flag = 1;
	            			  picture.update(prefix+str+suffix);
			    	                    	}else{
			    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
			    	                    		picture.flag = 0;
			    	                    		picture.update(prefix+str+suffix);		    	                    		
			    	                    	}
			                        	}
			                    	});
								}else{
                  			  str = "<img  src='resources/images/right.png'/>";
	    			  picture.flag = 1;
	    			  picture.update(prefix+str+suffix);
								}
							}
	        			}
	    	    	}
	        	}
	    	},{
				html:'', flex:picture_flex, border:false,itemId:'picture',flag:2
			}]

		})
		return FieldContainer;
	},
	GeneralObjOfSN:function(fieldcontainer_itemId,fieldLabel,name,field_itemId
			,tipId,bColor,backup_name_field,url,form,picture_flex){
		if(picture_flex >= 100){
			console.log("GeneralObjOfSN param:picture_flex error!!!");
			return;
		}
		var len = 100-picture_flex;
		var FieldContainer = new Ext.form.FieldContainer({
	    	layout:'hbox',
	    	itemId:fieldcontainer_itemId,
	    	border:false,
	    	anchor: '100%',
	    	items:[{
	            xtype: 'textfield',
	            name: name,
	            fieldLabel: fieldLabel,
	            itemId:field_itemId,
	            flex:len,
	            allowBlank: false,
	            msgTarget:'none',
	            listeners:{
	                render : function(p) {
	                    p.getEl().on('mouseup', function(p){
	                    	var tip = Ext.getCmp(tipId);
	                    	tip.show();
	                    });
	                },
	        		focus:function(){
	                	if(form.getComponent('imgs') != undefined){
	                		form.getComponent('imgs').setSrc(Ext.get('resources').value+'/images/DevSN.jpg');
	                	}
	        			var textobj = this;
//	        			var gettip = Ext.getCmp('GetTip');
//	        			if(gettip==undefined || gettip==null){
//	        				gettip = Ext.create("app.util.GetTip",{});
//	        			}
//	        			gettip.getObjNameTip(textobj.fieldLabel)
	        			var tip = Ext.getCmp(tipId);
	        			if(tip==undefined || tip==null){
	        				var tipManage = Ext.getCmp('TipObjManage');
	        				if(tipManage==undefined || tipManage==null){
	        					tipManage = Ext.create("app.util.TipObjManage",{});
	        				}
	        				tip = tipManage.createObjNameTipObj(tipId,textobj.getEl().dom.id, lanControll.getLanValue("validInputSnTips"));
	        			}
	        			tip.show();
	        			tip.clearListeners();
	        			//alert(tmp.html)
	        		},
	    	    	blur:function(field,eOpts){
	        			this.up('fieldcontainer').getComponent('picture').flag = 0;
	        			var tip = Ext.getCmp(tipId);
	        			tip.hide();
	        			var textobj = this;
	        			var tmp;
	        			if(bColor == null){
	        				tmp = "";
	        			}else{
	        				tmp = "style='background:"+bColor+"'";
	        			}
	        			var prefix = "<div "+tmp+">&nbsp;";
	        			var suffix  = "</div>"
	        			var checkobj = Ext.getCmp("DataCheck");
	        			if(checkobj==undefined || checkobj==null){
	        				checkobj = Ext.create("app.util.DataCheck",{});
	        			}
	        			var str = checkobj.getSNErrorStr(textobj.getValue());
	        			var picture = this.up('fieldcontainer').getComponent('picture');
	        			if(str != ""){
	        				str = "<font color=#f00>"+str+"</font>"
	        				picture.update(prefix+str+suffix);
	        				picture.flag = 0;
	        			}else{
							var name=textobj.getValue();
							var oldName = backup_name_field.getValue();
							if(oldName==name){
								str = "";
								picture.flag = 2;
								picture.update(prefix+str+suffix);
							}else{
		        				Ext.Ajax.request({
		                    		url:url,
		                    		method:'POST',
		                    		params:form.getForm().getValues(),
		                    		callback: function (options, success, response) {
		    	                    	var obj=Ext.JSON.decode(response.responseText);			
		    	                    	if(obj['success']){
            			  str = "<img  src='resources/images/right.png'/>";
            			  picture.flag = 1;
            			  picture.update(prefix+str+suffix);
		    	                    	}else{
		    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
		    	                    		picture.flag = 0;
		    	                    		picture.update(prefix+str+suffix);		    	                    		
		    	                    	}
		                        	}
		                    	});
							}
	        			}
	    	    	}
	        	}
	    	},{
				html:'', flex:picture_flex, border:false,itemId:'picture',flag:2
			}]

		})
		return FieldContainer;
	},
	GeneralObjOfPwdArr:function(old_lable,new_lable,name,picture_flex,bColor){
		if(picture_flex >= 100){
			console.log("GeneralObjOfSN param:picture_flex error!!!");
			return;
		}
		var len = 100-picture_flex;
		var arr = new Array();
		arr[0] = new Ext.form.field.Text({
			xtype : 'textfield',
			inputType:'password',
			fieldLabel : old_lable,
			name:name,
			maxLength:31,
			enforceMaxLength:true,
			itemId:'password',
			flag:0,
			margins : '0',
			enableKeyEvents : true,
//	        listeners:{
//	    		keyup:function(){
//	    			var obj = this;
//	    			if(obj.value.length != 0){
//	    				obj.flag = 1;
//	    			}else{
//	    				obj.flag = 0;
//	    			}
//	    		}
//	    	}
		});
		arr[1] = new Ext.form.FieldContainer({
	    	layout:'hbox',
	    	xtype:'fieldcontainer',
	    	itemId:'confirm_password',
			maxLength:31,
			enforceMaxLength:true,
	    	border:false,
	    	anchor: '100%',	    	
	    	items:[{	    		
	            xtype: 'textfield',
	            name: 'password2',
	            inputType:'password',
	            ulan:'confirmPassword',
	            fieldLabel: 'Confirm Password',
	            flex:len,
	            listeners:{
		            blur:function(field,eOpts){	
	    				this.up('fieldcontainer').getComponent('picture').flag = 0;
		    			var picture = this.up('fieldcontainer').getComponent('picture');
		    			var pwd=arr[0].getValue();
		                var pwd2=this.getValue();
	        			var tmp;
	        			if(bColor == null){
	        				tmp = "";
	        			}else{
	        				tmp = "style='background:"+bColor+"'";
	        			}
	        			var prefix = "<div "+tmp+">&nbsp;";
	        			var suffix  = "</div>";
	        			if(pwd!="" && pwd2!=""){
			                if(pwd!=pwd2){
			                	str = "<font color=#f00>"+lanControll.getLanValue('notSamePwd')+"</font>";
			                	picture.flag =  0;          		
	            		}else{
	            			str = "<img  src='resources/images/right.png'/>";
	            			picture.flag = 1;
	            		}
	        			}else if(pwd=="" && pwd2==""){
	        				str = "";
	        				picture.flag = 1;
	        			}else{
	        				str = "<font color=#f00>"+lanControll.getLanValue('notSamePwd')+"</font>";
	        				picture.flag =  0;
	        			}
		    			picture.update(prefix+str+suffix);
		    		}
	    		}
	    	},{
	    		html:'', flex:picture_flex, border:false,itemId:'picture',flag:1
	    	}]
		});
		return arr;
	
	}
});
