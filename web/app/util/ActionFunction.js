Ext.define('app.util.ActionFunction',{
	id:'ActionFunction',
	UpgradeAction:function(win,form,provUrl){
	    var obj;
	    var task = null;
		var boxObj = {
	    		title:boxPromotion,
	    		width : 300,
	    		msg:boxWaitMsg,
	    		modal:true,
	    		closable:false,
	    		wait:true
	    };
		var msg = Ext.MessageBox.show(boxObj);
		Ext.Ajax.timeout = 60 * 60 * 1000;
		obj = {
	    		url:provUrl+'upgradeNe!upgrade.action',
	    		method:'GET',                    		
	    		params:form.getValues(),
	    		callback: function (options, success, response) {
					boxObj.wait = false;
					msg.hide();
					if(task != null){
						Ext.TaskManager.stop(task);
					}
					var obj2=Ext.JSON.decode(response.responseText);
					if(obj2==undefined || obj2==null){
	    	        		form.reset();
	    	        		win.hide();
	    	        		return;
					}
					var successFlag = obj2["success"];
					if(successFlag==undefined || successFlag==null){
    	        		form.reset();
    	        		win.hide();
    	        		return;
					}else if(successFlag == false){
						var reason = obj2["reason"];
    	        		form.reset();
    	        		win.hide();
						if(reason==undefined || reason==null){
	    	        		return;
						}else{
	    	        		Ext.MessageBox.alert(boxPromotion,reason);
	    	        		return;
						}
					}
					
	    	        	var data = obj2["upgradeResultList"];
	    	        	if(data==null || data==undefined){
	    	        		form.reset();
	    	        		win.hide();	    	        		
	    	        		Ext.MessageBox.alert(boxPromotion,
	    	        				boxIllegalData);
	    	        		return;
	    	        	}
	    	        	var tmp = Ext.getCmp('maintenanceUpgradeNeResult');
	    	        	if(tmp == undefined){
	    	        	       tmp = Ext.create("app.view.operation.domain.roamzone.site.UpgradeNeResult",{});
	    	        	       lanControll.setLan(tmp);
	    	        	}
	    	        	var gridstore = tmp.getComponent("gridpanel").store;
	    	        	gridstore.removeAll();
	    	        	for(var i=0; i<data.length; i++){
	    	        		gridstore.add(data[i]);
	    	        	}
	    	        	var tip = Ext.getCmp('GetTip');
	    	        	if(tip == undefined){
	    	        		tip = Ext.create("app.util.GetTip",{});
	    	        	}
	    	        	tip_info = tip.getUpgradeResultTip(obj2["successNum"],obj2["failNum"]);
	    	        	tmp.getComponent("upgradeResultTip").update(tip_info);          	
	            	tmp.show();
	            	form.reset();
	            	win.hide();
	                      	},
	            
	    }
	
		var ajaxObj = null;
		ajaxObj = Ext.Ajax.request(obj);
		var count = 0;
		task = {
				run:function(){
					count++;
					if(count>1){
	    				Ext.TaskManager.stop(task);
	    				task = null;
	                	if(ajaxObj != null){
	                		Ext.Ajax.abort(ajaxObj);
	                	}		    							        						
						msg.hide();
		        				form.reset();
		        				win.hide();
		        				Ext.MessageBox.alert(boxPromotion,
		        						boxRequestTimeout);
					}
				},
				interval:60000
			};
		Ext.TaskManager.start(task);  
	},
	actionProc:function(store,url,params){
	    var obj;
	    var task = null;
		var boxObj = {
	    		title:boxPromotion,
	    		width : 300,
	    		msg:boxWaitMsg,
	    		modal:true,
	    		closable:false,
	    		wait:true
	    };
		var msg = Ext.MessageBox.show(boxObj);
		Ext.Ajax.timeout = 60 * 60 * 1000;
		obj = {
	    		url:url,
	    		method:'GET',                    		
	    		params:params,
	    		callback: function (options, success, response) {
					boxObj.wait = false;
					msg.hide();
					if(task != null){
						Ext.TaskManager.stop(task);
					}
					var obj2=Ext.JSON.decode(response.responseText);
					if(obj2==undefined || obj2==null){
	    	        		return;
					}
					if(obj2['success']){
	              				Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
	                      		store.load();
	                      	}else{
	                      		Ext.MessageBox.alert(boxFailture,boxCommitFail);
	                      	}
	          },
	            
	    }
	
		var ajaxObj = null;
		ajaxObj = Ext.Ajax.request(obj);
		var count = 0;
		task = {
				run:function(){
					count++;
					if(count>1){
	    				Ext.TaskManager.stop(task);
	    				task = null;
	                	if(ajaxObj != null){
	                		Ext.Ajax.abort(ajaxObj);
	                	}		    							        						
						msg.hide();
        				Ext.MessageBox.alert(boxPromotion,
        						boxRequestTimeout);
					}
				},
				interval:60000
			};
		Ext.TaskManager.start(task);  
	}
});
