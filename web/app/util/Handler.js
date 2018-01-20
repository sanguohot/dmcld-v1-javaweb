Ext.define('app.util.Handler',{
	id:'handler',
	RebootHandler: function(ids,productId,alias){
		var actionStatus = '2';
		var boxObj = {
	    		title:boxPromotion,
	    		width : 300,
	    		msg:boxWaitMsg,
	    		modal:true,
	    		closable:false,
	    		wait:true
	    };
		var msg = Ext.MessageBox.show(boxObj);
		Ext.Ajax.timeout = 6 * 60 * 1000;
		var task = null;
		var ajaxObj = null;
		ajaxObj = Ext.Ajax.request({
	 		url:'neManagerMaintenance!updateNeActionStatus.action',
	 		method:'POST',
	 		params:{ids:ids,actionStatus:actionStatus,productId:productId,alias:alias},
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
	        	var data = obj2["upgradeResultList"];
	        	if(data==null || data==undefined){
	        		Ext.MessageBox.alert(boxPromotion,
	        				boxIllegalData);
	        		return;
	        	}
	        	var tmp = Ext.getCmp('maintenanceRebootNeResult');
	        	if(tmp == undefined){
	        		tmp = Ext.create("app.view.operation.domain.roamzone.site.RebootNeResult",{});
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
	        	tip_info = tip.getNeResultTip(obj2["successNum"],obj2["failNum"]);
	        	tmp.getComponent("rebootResultTip").update(tip_info);          	
                      	tmp.show();
	              	}
	 	});
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
        				boxUnknowError);
					}
				},
				interval:60000
			};
		Ext.TaskManager.start(task);  
	},
	
	RestorePwdHandler: function(ids,productId,alias){
		var actionStatus = '5';
    	var boxObj = {
        		title:boxPromotion,
        		width : 300,
        		msg:boxWaitMsg,
        		modal:true,
        		closable:false,
        		wait:true
        };
    	var msg = Ext.MessageBox.show(boxObj);
		Ext.Ajax.timeout = 6 * 60 * 1000;
		var task = null;
		var ajaxObj = null;
		ajaxObj = Ext.Ajax.request({
     		url:'neManagerMaintenance!updateNeActionStatus.action',
     		method:'POST',
     		params:{ids:ids,actionStatus:actionStatus,productId:productId,alias:alias},
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
	        	var data = obj2["success"];
	        	if(data==undefined || data==null){
	        		Ext.MessageBox.alert(boxPromotion,
	        				boxIllegalData);
	        		return;
	        	}
	        	boxObj.buttons = 1;
		              	if(data){
		              		boxObj.msg = boxCommitSucc;
		              	}else{
		              		boxObj.msg = boxCommitFail;
		              	}
   Ext.MessageBox.show(boxObj);
     		}
     	});
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
        				boxUnknowError);
					}
				},
				interval:60000
			};
		Ext.TaskManager.start(task); 
	},
	
	ResetPortHandler: function(ids,portStr){
		var actionStatus = '3';
    	var boxObj = {
        		title:boxPromotion,
        		width : 300,
        		msg:boxWaitMsg,
        		modal:true,
        		closable:false,
        		wait:true
        };
    	var msg = Ext.MessageBox.show(boxObj);
		Ext.Ajax.timeout = 6 * 60 * 1000;
		var task = null;
		var ajaxObj = null;
		ajaxObj = Ext.Ajax.request({
     		url:'portManagerMaintenance!updatePortActionStatus.action',
     		method:'POST',
     		params:{ids:ids,actionStatus:actionStatus,portStr:portStr},
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
	        	var data = obj2["success"];
	        	if(data==undefined || data==null){
	        		Ext.MessageBox.alert(boxPromotion,
	        				boxIllegalData);
	        		return;
	        	}
	        	boxObj.buttons = 1;
		              	if(data){
		              		boxObj.msg = boxCommitSucc;
		              	}else{
		              		boxObj.msg = boxCommitFail;
		              	}
   Ext.MessageBox.show(boxObj);
     		}
     	});
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
        				boxUnknowError);
					}
				},
				interval:60000
			};
		Ext.TaskManager.start(task); 
	},
	
	ElegantStopPortHandler: function(ids,portStr){
		var actionStatus = '4';
    	var boxObj = {
        		title:boxPromotion,
        		width : 300,
        		msg:boxWaitMsg,
        		modal:true,
        		closable:false,
        		wait:true
        };
    	var msg = Ext.MessageBox.show(boxObj);
		Ext.Ajax.timeout = 6 * 60 * 1000;
		var task = null;
		var ajaxObj = null;
		ajaxObj = Ext.Ajax.request({
     		url:'portManagerMaintenance!updatePortActionStatus.action',
     		method:'POST',
     		params:{ids:ids,actionStatus:actionStatus,portStr:portStr},
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
	        	var data = obj2["success"];
	        	if(data==undefined || data==null){
	        		Ext.MessageBox.alert(boxPromotion,
	        				boxIllegalData);
	        		return;
	        	}
	        	boxObj.buttons = 1;
		              	if(data){
		              		boxObj.msg = boxCommitSucc;
		              	}else{
		              		boxObj.msg = boxCommitFail;
		              	}
   Ext.MessageBox.show(boxObj);
     		}
     	});
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
        				boxUnknowError);
					}
				},
				interval:60000
			};
		Ext.TaskManager.start(task); 
	}
});
