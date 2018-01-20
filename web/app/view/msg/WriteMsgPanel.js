Ext.define('app.view.msg.WriteMsgPanel',{
	extend:'Ext.form.Panel',
	layout:'vbox',
	border:false,
	id:'writeMsgPanel',
	bodyStyle: {
//		background: '#DFE9F6',
		background: 'white',
		
	},
//	bodyPadding:'10 10 10 10',
	defaults:{
		labelAlign:"right",
		labelWidth:100,
		margin:'40 0 0 0',
		width:800,
	},
	align:'stretch',
	items:[{
		xtype:'displayfield',
		name:'display',
		margin:'5 0 5 350',
		height:20,
		value:'  '
	},{
		name : 'roleIdList',
		xtype : 'combo',
		mode : 'local',
		editable:true,
		fieldLabel : 'Send to',
		displayField : 'name',
		valueField : 'priorityId',
		multiSelect:true,
		forceSelection: true,
		typeAhead: true,
		margin:'5 0 0 0',
		autoSelect:true,
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'priorityId' ],
			data : [ {
				name : roleType.getDisplayMapItem(roleType.role_super_admin),
				priorityId : roleType.role_super_admin,
			},{ 
				name : roleType.getDisplayMapItem(roleType.role_super_user),
				priorityId : roleType.role_super_user,
			}, {
				name : roleType.getDisplayMapItem(roleType.role_super_viewer),
				priorityId : roleType.role_super_viewer,
			}, {
				name : roleType.getDisplayMapItem(roleType.role_super_finance),
				priorityId : roleType.role_super_finance,
			}, {
				name : roleType.getDisplayMapItem(roleType.role_domain_admin),
				priorityId : roleType.role_domain_admin,
			},{
				name : roleType.getDisplayMapItem(roleType.role_domain_editor),
				priorityId : roleType.role_domain_editor,
			},{
				name : roleType.getDisplayMapItem(roleType.role_domain_viewer),
				priorityId : roleType.role_domain_viewer,
			},{
				name : roleType.getDisplayMapItem(roleType.role_domain_operator),
				priorityId : roleType.role_domain_operator,
			},{
				name : roleType.getDisplayMapItem(roleType.role_domain_user01),
				priorityId : roleType.role_domain_user01,
			},{
				name : roleType.getDisplayMapItem(roleType.role_domain_user02),
				priorityId : roleType.role_domain_user02,
			},{
				name : roleType.getDisplayMapItem(roleType.role_domain_user03),
				priorityId : roleType.role_domain_user03,
			}]
		}),
		value:"",	
	},{
		xtype:'container',
		margin:'2 0 0 110',
		html:'<font color=gray>"Send to" support multiselections.</font>'
	},{
		xtype:"hiddenfield",
		name:'sendToRole',
		margin:'0 0 0 0',
		fieldLabel:'Send To',
		value:'',
	},{
		xtype:"textfield",
		name:'theme',
		fieldLabel:'Theme',
	},{
		xtype:'textareafield',
		name:'content',
		fieldLabel:'Content',
		flex:1,
		margin:'40 0 40 0',
	},{
		xtype:'hiddenfield',
		name:'msgUuid',
		value:0,
	}],
	initComponent: function(){
		var me=this;
		var tbar=[];
		var send=Ext.create("Ext.button.Button",{
     		 xtype:'button',
      		 text:'Send',
      		 iconCls:'add',
      		 uitemId:'send',
      		 listeners:{
      		 	click:function(){
					var msgUuid=me.down("hiddenfield[name=msgUuid]");
					var field=me.down("displayfield[name=display]");
					mc.saveListToStrs(me);
					mc.getTask(field).cancel();
					var action="send";
					mc.procResult(field,action,"");
					if(msgUuid){
						var params=me.getForm().getValues();
						params["msgUuid"]=msgUuid.getValue();
						Ext.Ajax.request({
		            		url:'msgManager!sendMsg.action',
		            		method:'POST',
		            		params:params,
		            		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);
		                    	var value=msgUuid.getValue();
		                    	if((!value || value=="0" || value=="undefined" || value=="null")
		                    			&& obj['retValue']){
		                    		 msgUuid.setValue(obj['retValue']);
		                    	}
		                    	if(obj['success']){
//		                    		mc.procResult(field,action,"success");
		                    		Ext.getCmp("msgTree").lstore.load();
//		                    		var store2=Ext.create("app.store.msg.MsgStore");
//		                    		store2.getProxy().url="msgManager!getSentMsg.action";
//		                    		store2.on("load",function(){
//		                    			if(store){
//		                    				
//		                    			}
//		                    		},this,{single:true});
		                    		var sendMsgResult=Ext.getCmp("sendMsgResult");
		                    		sendMsgResult.sendObj.sendToRole=params["sendToRole"];
		                    		sendMsgResult.sendObj.theme=params["theme"];
		                    		sendMsgResult.sendObj.content=params["content"];
		                    		sendMsgResult.sendObj.msgUuid=msgUuid.getValue();
		                    		var d=new Date();
		                    		localTime = d.getTime();
		                    		localOffset = d.getTimezoneOffset()*60000; 
		                    		utc = localTime + localOffset;
		                    		var da=new Date(utc); 
		                    		var tmp=Ext.Date.format(da,"Y-m-d H:i:s");
		                    		sendMsgResult.sendObj.time=tmp;
		                    		me.setVisible(false);
		                    		sendMsgResult.setVisible(true);
		                    		var result=sendMsgResult.down("container[uitemId=result]");
		                    		if(result && msgUuid.getValue()){
		                    			result.update(mc.getSendResultHtml(true,msgUuid.getValue()));
		                    		}
		                    	}else{
		                    		mc.procResult(field,action,"fail");
		                    	}
//		                    	me.hide();
//		                    	var p=Ext.create("app.view.msg.SendMsgResult",{});
//		                    	p.show();
		                    	mc.getTask(field,null).delay(3000,function(){
		            				field.setValue("");
		            			});

		                	}
		            	});
					}
			 	}
      	 	}
      	 });
		var save=Ext.create("Ext.button.Button",{
    		 xtype:'button',
     		 text:'Save',
     		 iconCls:'save',
     		 uitemId:'save',
     		 listeners:{
     		 	click:function(){
					var msgUuid=me.down("hiddenfield[name=msgUuid]");
					var field=me.down("displayfield[name=display]");
					mc.saveListToStrs(me);
					mc.getTask(field).cancel();
					var action="save";
					mc.procResult(field,action,"");
					if(msgUuid){
						var params=me.getForm().getValues();
						params["msgUuid"]=msgUuid.getValue();
        				Ext.Ajax.request({
                    		url:'msgManager!saveMsg.action',
                    		method:'POST',
                    		params:params,
                    		callback: function (options, success, response) {
    	                    	var obj=Ext.JSON.decode(response.responseText);
    	                    	
    	                    	if(obj['success']){
    	                    		mc.procResult(field,action,"success");
    	                    		Ext.getCmp("msgTree").lstore.load();
    	                    	}else{
    	                    		mc.procResult(field,action,"fail");
    	                    	}
    	                    	mc.getTask(field).delay(3000,function(){
    	            				field.setValue("");
    	            			});
    	                    	var value=msgUuid.getValue();
    	                    	if((!value || value=="0" || value=="undefined" || value=="null")
    	                    			&& obj['retValue']){
    	                    		 msgUuid.setValue(obj['retValue']);
    	                    	}
                        	}
                    	});
					}
     	 		}
     	 	}
     	 });
		var save2=Ext.create("Ext.button.Button",{
   		 	xtype:'button',
    		 text:'Save',
    		 iconCls:'save',
    		 hidden:true,
    		 uitemId:'save2',
    		 listeners:{
    		 	click:function(){
					var msgUuid=me.down("hiddenfield[name=msgUuid]");
					var field=me.down("displayfield[name=display]");
					mc.saveListToStrs(me);
					mc.getTask(field).cancel();
					var action="save";
					mc.procResult(field,action,"");
					var params=me.getForm().getValues();
					if(msgUuid.getValue()>0){
	       				Ext.Ajax.request({
	                   		url:'msgManager!reeditMsg.action',
	                   		method:'POST',
	                   		params:params,
	                   		callback: function (options, success, response) {
	   	                    	var obj=Ext.JSON.decode(response.responseText);
	   	                    	
	   	                    	if(obj['success']){
	   	                    		mc.procResult(field,action,"success");
	   	                    	}else{
	   	                    		mc.procResult(field,action,"fail");
	   	                    	}
	   	                    	mc.getTask(field).delay(3000,function(){
	   	            				field.setValue("");
	   	            			});
	                       	}
	                   	});
					}
    	 		}
    	 	}
    	 });
//		var refresh=Ext.create("Ext.button.Button",{
//      		 xtype:'button',
//       		 text:'Refresh',
//       		 ulan:'btRefresh',
//       		 iconCls:'refresh2',
//       		 listeners:{
//       		 	click:function(){
//					this.up('panel').store.load();
//       	 		}
//       	 	}
//       	 });
		tbar.push(send);
		tbar.push(save);
		tbar.push(save2);
//		tbar.push("-");
//		tbar.push(refresh);
		this.tbar=tbar;
		this.callParent(arguments);	
	},
});