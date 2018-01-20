Ext.define('app.util.InitPanel',{
	app:null,
	initOtiose:function(otiose,form,asyn){
		
		if(otiose==1){
			var textfield=form.query('textfield');
			var checkbox=form.query('checkbox');
			for(var i=0;i<textfield.length;i++){
				textfield[i].setFieldStyle("background:#DFE9F6");
			}
			for(var i=0;i<checkbox.length;i++){
				checkbox[i].setDisabled(true);
			}
		}else{
			var textfield=form.query('textfield');
			var checkbox=form.query('checkbox');
			for(var i=0;i<textfield.length;i++){
				textfield[i].setFieldStyle("background:#FFF");
			}
			for(var i=0;i<checkbox.length;i++){
				checkbox[i].setDisabled(false);
			}
		}
		
	},
	// showOrHide,false-hide,true-show
	changeView:function(grid,ids,showOrHide){
		if(!ids){
			return;
		}
		var dis=ids.split(',');
		Ext.suspendLayouts();
		grid.columnAutoWidthPlugin.suspend();
		var tmp = null;
		for(var i=0;i<dis.length;i++){
			if(dis[i]==''){
				continue;
			}
			if(dis[i]=='checkbox'){
//				if(grid.columns[0].hidden==showOrHide){
					grid.columns[0].setVisible(showOrHide);
//				}
				continue;
			}
			var di=grid.down('gridcolumn[dataIndex='+dis[i]+']');
			if(di){
//				if(di.hidden==showOrHide){
				tmp = di;
					di.setVisible(showOrHide);
//				}
			}
		}

		Ext.resumeLayouts(true);
		grid.columnAutoWidthPlugin.resume(true);
	},
	
	changeUserView:function(grid,mode,item,cmpId){
		var domainUuid=Ext.get('domainUuid').value;
		var un=Ext.get('userUuid').value;
		
 		var c_show=this.readDB(mode,item,'show');
 		var c_hide=this.readDB(mode,item,'hide');
 		
 		if(!c_show){
 			var win=this.initViewSet(grid);
		 	win.down('combo[name=item]').setValue(item);
		 	
		 	win.down('hiddenfield[name=cmpId]').setValue(cmpId);
		 	win.down('hiddenfield[name=mode]').setValue(mode);
		 	win.show();
 		}else{
 			var prefix="_"+domainUuid+"_"+un+"_"+mode+"_";
 			var showIds=Ext.util.Cookies.get(prefix+item+"_show");
 		 	var hideIds=Ext.util.Cookies.get(prefix+item+"_hide");
 			if(!showIds){
 				this.changeView(grid,c_show,true);
 	 			this.changeView(grid,c_hide,false);
 			}else{
 				this.changeView(grid,showIds,true);
 	 			this.changeView(grid,hideIds,false);
 			}
 			
 			this.setCurCookie(c_show,c_hide,mode);
           
 		}
 		
	},
	setCurCookie:function(showIds,hideIds,mode){
		var domainUuid=Ext.get('domainUuid').value;
		
		var un=Ext.get('userUuid').value;
		var prefix="_"+domainUuid+"_"+un+"_"+mode+"_";
//		var expire=new Date();
//		expire.setTime(expire.getTime()+365*24*60*60*1000);
		Ext.util.Cookies.set(prefix+"0_show",showIds);
        Ext.util.Cookies.set(prefix+"0_hide",hideIds);
       
        this.insertDB(mode,0,'show',showIds);
		this.insertDB(mode,0,'hide',hideIds);
	},
	insertViewAdvance:function(grid,mode,item,showIds,hideIds){
        
		var domainUuid=Ext.get('domainUuid').value;
        var un=Ext.get('userUuid').value;
      
        ip.changeView(grid,showIds,true);
        ip.changeView(grid,hideIds,false);

        var showCk="_"+domainUuid+"_"+un+"_"+mode+"_"+item+"_show";
        Ext.util.Cookies.set(showCk,showIds);
        
        var hideCk="_"+domainUuid+"_"+un+"_"+mode+"_"+item+"_hide";
        Ext.util.Cookies.set(hideCk,hideIds);
        
        var c_showCk="_"+domainUuid+"_"+un+"_"+mode+"_"+0+"_show";
        Ext.util.Cookies.set(c_showCk,showIds);
      
        var hideCk="_"+domainUuid+"_"+un+"_"+mode+"_"+0+"_hide";
        Ext.util.Cookies.set(hideCk,hideIds);
        
        ip.insertDB(mode,item,'show',showIds);
		ip.insertDB(mode,item,'hide',hideIds);

		ip.insertDB(mode,0,'show',showIds);
		ip.insertDB(mode,0,'hide',hideIds);
		
	},
	initViewSet:function(grid){
		var win=Ext.getCmp('viewAdvanced');
	 	if(!win){
	 		win=Ext.create('app.util.ViewAdvanced',{});
	 	}
	 	var viewGroup=win.down('checkboxgroup[itemId=viewGroup]');
	 	
 		var cols=grid.columns;
 		viewGroup.removeAll();
 		for(var i=0;i<cols.length;i++){
 			
 			if(i==0&&cols[0].name==null){
 				viewGroup.add({boxLabel:lanControll.getLanValue('checkBox'),boxLabelCls:'box_label', name:'checkbox', inputValue: 1,checked:!cols[0].hidden });
 			}else{
 				viewGroup.add({boxLabel:cols[i].text,boxLabelCls:'box_label', name: cols[i].dataIndex, inputValue: 1,checked:!cols[i].hidden });
 			}
 		}
 		return win;
	},
	insertDB:function(module,item,mode,value){
		var domainUuid=Ext.get('domainUuid').value;
		var userUuid=Ext.get('userUuid').value;
		
		var url="cookieManager!putCookie.action?domainUuid="+domainUuid+"&userUuid="
				+userUuid+"&module="+module+"&item="+item+"&mode="+mode+"&value="+value;
		
		Ext.Ajax.request({
    		url:url,
    		method:'POST',
    		timeout:60000,
    		callback: function (options, success, response) {
            	var obj=Ext.JSON.decode(response.responseText);			
            	if(obj['success']){
            		Ext.util.Cookies.set("_"+domainUuid+"_"+userUuid+"_"+module+"_"+item+"_"+mode,value);
            	}else{
            		
            	}
            
                      	}
    	});
	},
	readDB:function(module,item,mode){
		var domainUuid=Ext.get('domainUuid').value;
		var userUuid=Ext.get('userUuid').value;
		
		var showCk="_"+domainUuid+"_"+userUuid+"_"+module+"_"+item+"_"+mode;
        var ids=Ext.util.Cookies.get(showCk);
        if(ids){
        	return ids;
        }
		var cookieList=Ext.get('cookieList').value;

    if(cookieList){
      for(var i=0;i<cookieList.length;i++){
        var c=cookieList[i];
        if(domainUuid==c.domainUuid && userUuid==c.userUuid && module==c.module && item== c.item && mode== c.mode){
          ids=c.value;
          break;
        }
      }
    }
		return ids;
	},
	
	initTree:function(panel,module){
		var domainUuid=Ext.get('domainUuid').value;
		var un=Ext.get('userUuid').value;
		
		var prefix="_"+domainUuid+"_"+un+"_"+module;
		
		var c_show=this.readDB(module,0,'show');
		var showIds=Ext.util.Cookies.get(prefix+"_0_show");
		
		if(!showIds){
			this.changeView(panel,c_show,true);
		}else{
			this.changeView(panel,showIds,true);
		}
		var c_hide=this.readDB(module,0,'hide');
		var hideIds=Ext.util.Cookies.get(prefix+"_0_hide");
		if(!hideIds){
			this.changeView(panel,c_hide,false);
		}else{
			this.changeView(panel,hideIds,false);
		}
	},
	initSIMCardAction:function(simCardGrid,maintenance){
		var som=Ext.create('app.util.SmlOpenModel',{});
		var uom=Ext.create('app.util.UsslOpenModel',{});
		var com=Ext.create('app.util.CallOpenModel',{});
		var action=[];
		action.push({
   			text:'Send SMS',
   			ulan:'btSendSms',
   			handler:function(){
   			if ( simCardGrid.getSelectionModel().hasSelection()){
				var records= simCardGrid.getSelectionModel().getSelection();
				var simUuids="";
				var domainUuid="";
				var flag=0;
				var smsNumber;
				var smsStatus;
				var smsContent;
				var smsEncode;
				var smlUuids;
				var simSmlUuids;
				for ( var i = 0; i < records.length; i++) {
					if(records[i].get('uuid')==null||records[i].get('uuid')==undefined||records[i].get('uuid')==""){
						continue;
					}
					if(flag==0){
						smsNumber=records[i].get('smsNumber');
						smsContent=records[i].get('smlContent');
						smsEncode=records[i].get('smlEncode');
						smsStatus=records[i].get('smsStatus');
						simUuids=records[i].get('uuid');
						domainUuid=records[i].get('domainUuid');
						smlUuids=records[i].get('smlUuid');
						simSmlUuids=records[i].get('uuid')+"-"+records[i].get('smlUuid');
						flag=1;
					}else {
						simSmlUuids=simSmlUuids+","+records[i].get('uuid')+"-"+records[i].get('smlUuid');
						simUuids=simUuids+"-"+records[i].get('uuid');
						smlUuids=smlUuids+"-"+records[i].get('smlUuid');
						flag=2;
					}
				}
				if(simUuids==""){
					boxSimNotAvailable = lanControll.getLanValue('boxSimNotAvailable');
					Ext.MessageBox.alert(boxWarnning,boxSimNotAvailable);
	 				return;
				}else{
					som.maintenance = maintenance;
					som.simcard=1;
					var sendSms=som.setModel(records[0],1);
					
					sendSms.down('form').getForm().findField('simUuids').setValue(simUuids);
					sendSms.down('form').getForm().findField('smlUuids').setValue(smlUuids);
					sendSms.down('form').getForm().findField('simSmlUuids').setValue(simSmlUuids);
					sendSms.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					
					sendSms.show();
				}
			}else{
 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
 				return;
 			}
   		 	}
       	 });

		action.push({
       		text:'Cancel SMS',
       		ulan:'btCancelSms',
   			handler:function(){
			if(simCardGrid.getSelectionModel().hasSelection()){
		 			var records=simCardGrid.getSelectionModel().getSelection();
		 			if(records.length>0){
		 				
   		 					var simUuids="";
	       		 			var domainUuid;
	       		 			var smlUuids="";
	       		 			var flag=0;
		       		 		for ( var i = 0; i < records.length; i++) {
								if(flag==0){
									simUuids=records[i].get('uuid');
									domainUuid=records[i].get('domainUuid');
									flag=1;
								}else {
									simUuids=simUuids+"-"+records[i].get('uuid');
									flag=2;
								}
		       		 		}
//		       		 	if(smlUuids==""){
//							Ext.MessageBox.alert(boxWarnning,'You choose SIM Card SMS is not available');
//			 				return;
//						}else{
		       		 		var boxCancelSms = lanControll.getLanValue('boxCancelSms');		 
							Ext.MessageBox.confirm(boxWarnning,boxCancelSms,function(e) { 																				
       		 					if( e == 'yes' ){
					       		 	Ext.Ajax.request({
				                		url:'smlManager!cancelSml.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
				                		method:'POST',
				                		timeout:5*60*1000,
				                		callback: function (options, success, response) {
	       									var obj=Ext.JSON.decode(response.responseText);
						if(obj['success']){
							Ext.MessageBox.alert(boxSuccess,boxCancelSucc);
//							simCardGrid.getStore().load();
						}else{
					                    		Ext.MessageBox.alert(boxFailture,boxCancelFail);
					                    	}
				                    	}
				                	})
       		 					}
							})
//						}
		 			}
	 			}else{
	 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
	 			}
			}	
       	 });
		action.push({
       		text:'Clear SMS',
       		ulan:'btClearSms',
   			handler:function(){
			if(simCardGrid.getSelectionModel().hasSelection()){
		 			var records=simCardGrid.getSelectionModel().getSelection();
		 			if(records.length>0){
		 				
   		 					var smlUuids="";
   		 					var simUuids="";
	       		 			var domainUuid;
	       		 			var flag=0;
		       		 		for ( var i = 0; i < records.length; i++) {
//								if(records[i].get('smlUuid')==null||records[i].get('smlUuid')==undefined||records[i].get('smlUuid')==""
//		       		 				||records[i].get('smsStatus')==1||records[i].get('smsStatus')==2){
//									continue;
//								}
								if(flag==0){
									simUuids=records[i].get('uuid');
									domainUuid=records[i].get('domainUuid');
									flag=1;
								}else {
									simUuids=simUuids+"-"+records[i].get('uuid');
									flag=2;
								}
		       		 		}
//		       		 	if(smlUuids==""){
//							Ext.MessageBox.alert(boxWarnning,'You choose SIM Card SMS is not available');
//			 				return;
//						}else{
		       		 		var boxClearSms = lanControll.getLanValue('boxClearSms');		 
							Ext.MessageBox.confirm(boxWarnning,boxClearSms,function(e) { 																				
       		 					if( e == 'yes' ){
			       		 	Ext.Ajax.request({
		                		url:'smlManager!clearSml.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
		                		method:'POST',
		                		timeout:5*60*1000,
		                		callback: function (options, success, response) {
   									var obj=Ext.JSON.decode(response.responseText);
			                    	if(obj['success']){
			                    		if(flag==2){
//			                    			Ext.MessageBox.alert(boxSuccess,'Clear success');
			                    		}else{
			                    			Ext.MessageBox.alert(boxSuccess,boxClearSucc);
			                    		}
//			                    		simCardGrid.getStore().load();
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxClearFail);
			                    	}
		                    	}
		                	})
						}
							})
//						}
		 			}
	 			}else{
	 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
	 			}
			}
	     });
		action.push('-');
		
		action.push({
   			text:'Send USSD',
   			ulan:'btSendUssd',
   			handler:function(){
       		if ( simCardGrid.getSelectionModel().hasSelection()){
				var records= simCardGrid.getSelectionModel().getSelection();
				var simUuids="";
				var domainUuid="";
				var flag=0;
				var usslContent;
				var ussdParam;
				var usslUuids;
				var usslStatus;
				var simUsslUuids;
				for ( var i = 0; i < records.length; i++) {
					if(records[i].get('uuid')==null||records[i].get('uuid')==undefined||records[i].get('uuid')==""){
						continue;
					}
					if(flag==0){
						usslContent=records[i].get('usslContent');
						ussdParam=records[i].get('ussdParam');
						usslStatus=records[i].get('usslStatus');
						simUuids=records[i].get('uuid');
						domainUuid=records[i].get('domainUuid');
						usslUuids=records[i].get('usslUuid');
						simUsslUuids=records[i].get('uuid')+"-"+records[i].get('usslUuid');
						flag=1;
					}else {
						simUsslUuids=simUsslUuids+","+records[i].get('uuid')+"-"+records[i].get('usslUuid');
						simUuids=simUuids+"-"+records[i].get('uuid');
						usslUuids=usslUuids+"-"+records[i].get('usslUuid');
						flag=2;
					}
				}
				if(simUuids==""){
					Ext.MessageBox.alert(boxWarnning,boxSimNotAvailable);
	 				return;
				}else{
					uom.maintenance = maintenance;
					uom.simcard = 1;
					var sendUssl=uom.setModel(records[0],1);
					sendUssl.down('form').getForm().findField('simUuids').setValue(simUuids);
					sendUssl.down('form').getForm().findField('usslUuids').setValue(usslUuids);
					sendUssl.down('form').getForm().findField('simUsslUuids').setValue(simUsslUuids);
					sendUssl.down('form').getForm().findField('domainUuid').setValue(domainUuid);									
					sendUssl.show();
				}
			}else{
 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
 				return;
 			}
       		 
       	 	}
   		 });
		action.push({
       		text:'Cancel USSD',
       		ulan:'btCancelUssd',
   			handler:function(){
			if(simCardGrid.getSelectionModel().hasSelection()){
		 			var records=simCardGrid.getSelectionModel().getSelection();
		 			if(records.length>0){
		 				
   		 					var simUuids="";
	       		 			var domainUuid;
	       		 			var usslUuids="";
	       		 			var flag=0;
		       		 		for ( var i = 0; i < records.length; i++) {
								if(flag==0){
									simUuids=records[i].get('uuid');
									domainUuid=records[i].get('domainUuid');
									flag=1;
								}else {
									simUuids=simUuids+"-"+records[i].get('uuid');
									flag=2;
								}
		       		 		}
		       		 		var boxCancelUssd = lanControll.getLanValue('boxCancelUssd');		 
							Ext.MessageBox.confirm(boxWarnning,boxCancelUssd,function(e) { 																				
	       		 				if( e == 'yes' ){
					       		 	Ext.Ajax.request({
				                		url:'usslManager!cancelUssl.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
				                		method:'POST',
				                		timeout:5*60*1000,
				                		callback: function (options, success, response) {
	       									var obj=Ext.JSON.decode(response.responseText);
					                    	if(obj['success']){
//					                    		simCardGrid.getStore().load();
					                    		Ext.MessageBox.alert(boxSuccess,boxCancelSucc);
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxCancelFail);
					                    	}
				                    	}
				                	})
	       		 				}
							})
//						}
		 			}
	 			}else{
	 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
	 			}
			}
       	 });
		action.push({
       		text:'Clear USSD',
       		ulan:'btClearUssd',
   			handler:function(){
			if(simCardGrid.getSelectionModel().hasSelection()){
		 			var records=simCardGrid.getSelectionModel().getSelection();
		 			if(records.length>0){
		 				
   		 					var usslUuids="";
   		 					var simUuids="";
	       		 			var domainUuid;
	       		 			var flag=0;
		       		 		for ( var i = 0; i < records.length; i++) {
								if(flag==0){
									simUuids=records[i].get('uuid');
									domainUuid=records[i].get('domainUuid');
									flag=1;
								}else {
									simUuids=simUuids+"-"+records[i].get('uuid');
									flag=2;
								}
		       		 		}
		       		 		var boxClearUssd = lanControll.getLanValue('boxClearUssd');		 
							Ext.MessageBox.confirm(boxWarnning,boxClearUssd,function(e) { 																				
       		 					if( e == 'yes' ){
			       		 	Ext.Ajax.request({
		                		url:'usslManager!clearUssl.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
		                		method:'POST',
		                		timeout:5*60*1000,
		                		callback: function (options, success, response) {
   									var obj=Ext.JSON.decode(response.responseText);
			                    	if(obj['success']){
//			                    		simCardGrid.getStore().load();
			                    		Ext.MessageBox.alert(boxSuccess,boxClearSucc);
			                    	}else{
			                    		Ext.MessageBox.alert(boxWarnning,boxClearFail);
			                    	}
		                    	}
		                	})
						}
							})
		 			}
	 			}else{
	 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
	 			}
			}
	     });
		action.push('-');
		
		action.push({
   			text:'Send CALL',
   			ulan:'btSendCall',
   			handler:function(){
   			if ( simCardGrid.getSelectionModel().hasSelection()){
				var records= simCardGrid.getSelectionModel().getSelection();
				var simUuids="";
				var domainUuid="";
				var flag=0;
				var callNumber;
				var callStatus;
				var callUuids;
				var simCallUuids;
				for ( var i = 0; i < records.length; i++) {
					if(records[i].get('uuid')==null||records[i].get('uuid')==undefined||records[i].get('uuid')==""){
						continue;
					}
					if(flag==0){
						callNumber=records[i].get('callNumber');
						callStatus=records[i].get('callStatus');
						simUuids=records[i].get('uuid');
						domainUuid=records[i].get('domainUuid');
						callUuids=records[i].get('callUuid');
						simCallUuids=records[i].get('uuid')+"-"+records[i].get('callUuid');
						flag=1;
					}else {
						simCallUuids=simCallUuids+","+records[i].get('uuid')+"-"+records[i].get('callUuid');
						simUuids=simUuids+"-"+records[i].get('uuid');
						callUuids=callUuids+"-"+records[i].get('callUuid');
						flag=2;
					}
				}
				if(simUuids==""){
					Ext.MessageBox.alert(boxWarnning,boxSimNotAvailable);
	 				return;
				}else{
					com.maintenance = maintenance;
					com.simcard = 1;
					var sendCall=com.setModel(records[0],1);
					
					sendCall.down('form').getForm().findField('simUuids').setValue(simUuids);
					sendCall.down('form').getForm().findField('callUuids').setValue(callUuids);
					sendCall.down('form').getForm().findField('simCallUuids').setValue(simCallUuids);
					sendCall.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					
					sendCall.show();
				}
			}else{
 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
 				return;
 			}	
   		 	}
   		 });
		action.push({
       		text:'Cancel CALL',
       		ulan:'btCancelCall',
   			handler:function(){
			if(simCardGrid.getSelectionModel().hasSelection()){
		 			var records=simCardGrid.getSelectionModel().getSelection();
		 			if(records.length>0){
		 				
   		 					var simUuids="";
	       		 			var domainUuid;
	       		 			var callUuids="";
	       		 			var flag=0;
		       		 		for ( var i = 0; i < records.length; i++) {
								if(flag==0){
									simUuids=records[i].get('uuid');
									domainUuid=records[i].get('domainUuid');
									flag=1;
								}else {
									simUuids=simUuids+"-"+records[i].get('uuid');
									flag=2;
								}
		       		 		}
		       		 		var boxCancelCall = lanControll.getLanValue('boxCancelCall');		 
							Ext.MessageBox.confirm(boxWarnning,boxCancelCall,function(e) { 																				
       		 					if( e == 'yes' ){
					       		 	Ext.Ajax.request({
				                		url:'callManager!cancelCall.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
				                		method:'POST',
				                		timeout:5*60*1000,
				                		callback: function (options, success, response) {
	       									var obj=Ext.JSON.decode(response.responseText);
					                    	if(obj['success']){
					                    		Ext.MessageBox.alert(boxSuccess,boxCancelSucc);
//					                    		simCardGrid.getStore().load();
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxCancelFail);
					                    	}
				                    	}
				                	})
       		 					}
							})
//						}
		 			}
	 			}else{
	 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
	 			}
			}
       	 });
		action.push({
       		text:'Clear CALL',
       		ulan:'btClearCall',
   			handler:function(){
			if(simCardGrid.getSelectionModel().hasSelection()){
		 			var records=simCardGrid.getSelectionModel().getSelection();
		 			if(records.length>0){
		 				
   		 					var callUuids="";
   		 					var simUuids="";
	       		 			var domainUuid;
	       		 			var flag=0;
		       		 		for ( var i = 0; i < records.length; i++) {
								if(flag==0){
									simUuids=records[i].get('uuid');
									domainUuid=records[i].get('domainUuid');
									flag=1;
								}else {
									simUuids=simUuids+"-"+records[i].get('uuid');
									flag=2;
								}
		       		 		}
		       		 		var boxClearCall = lanControll.getLanValue('boxClearCall');
							Ext.MessageBox.confirm(boxWarnning,boxClearCall,function(e) { 																				
       		 					if( e == 'yes' ){
			       		 	Ext.Ajax.request({
		                		url:'callManager!clearCall.action?simUuids='+simUuids+"&domainUuid="+domainUuid,
		                		method:'POST',
		                		timeout:5*60*1000,
		                		callback: function (options, success, response) {
   									var obj=Ext.JSON.decode(response.responseText);
			                    	if(obj['success']){
			                    		if(flag==2){
//			                    			Ext.MessageBox.alert(boxSuccess,'Clear success');
			                    		}else{
			                    			Ext.MessageBox.alert(boxSuccess,boxClearSucc);
			                    		}
//			                    		simCardGrid.getStore().load();
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxClearFail);
			                    	}
		                    	}
		                	})
						}
							})
//						}
		 			}
	 			}else{
	 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	 				return;
	 			}
			}
	     });
		
		return action;
	},
	createEditButton:function(tab,store,tbar){
		var edit = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text:'Edit',
      		 ulan:'btEdit',
      		 iconCls:'edit',
      		 listeners:{
      		 	click:function(){
					
					var button=this;
					tab.getEl().mask('loading...'); 
					
					setTimeout(function(){
						if(button.ulan=='btEdit'){
							button.setText(lanControll.getLanValue('btCancel'));
							button.ulan = 'btCancel';
							button.setIconCls('cancel');
							tab.down('button[ulan=btCommit]').setDisabled(false);
							tab.down('button[ulan=btCommit]').formBind=true;
							ip.initOtiose(0,tab);
						}else{
							button.setText(lanControll.getLanValue('btEdit'));
							button.ulan = 'btEdit';
							button.setIconCls('edit');
							tab.down('button[ulan=btCommit]').setDisabled(true);
							tab.down('button[ulan=btCommit]').formBind=false;
							ip.initOtiose(1,tab);
							setTimeout(function(){
								store.fireEvent('load');
							},10);
						}
						tab.el.unmask();
					},200);
					
//					Ext.MessageBox.hide();
					
      	 		}
      	 	}
  	 	});
		tbar.push(edit);
		tbar.push('-');
	},
	commitSuccess:function(tab,store){
		tab.getEl().mask('loading...'); 
		tab.down('button[ulan=btCommit]').setDisabled(true);
		tab.down('button[ulan=btCommit]').formBind=false;
		tab.down('button[ulan=btCancel]').setIconCls('edit');
		tab.down('button[ulan=btCancel]').setText(lanControll.getLanValue('btEdit'));
		tab.down('button[ulan=btCancel]').ulan = 'btEdit';
		store.load();
		setTimeout(function(){
			ip.initOtiose(1,tab);
			tab.el.unmask();
		},100);
	},
	commitFailure:function(tab){
		Ext.MessageBox.alert(boxFailure,boxCommitFail);
//		ip.initOtiose(0,tab);
	},
	
	createModule:function(module,openLink){
		var module = this.app.getModule(module),
		window;
	    if (module) {
	    	if(openLink){
	    		window = module.createWindow(openLink);
	    	}else{
	    		window = module.createWindow();
	    	}
	    	if(window){
	    		window.show();
	    	}
	    }
	    return window;
	},
	putLatLng:function(latLngs,domainUuid){
		var url="neManager!putLatLng.action?latLngs="+latLngs+"&domainUuid="+domainUuid;
		
		Ext.Ajax.request({
    		url:url,
    		method:'POST',
    		timeout:60000,
			callback: function (options, success, response) {
				var obj=Ext.JSON.decode(response.responseText);			
				if(obj['success']){
					console.log('put lat-lng success');
				}else{
					console.log('put lat-lng failure');
				}
			}
		});
	},
	delHTMLTag:function(str){
		return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
	},
});
