
Ext.define('app.view.msg.MsgC',{
//	extend: 'Ext.app.Controller',
   procMsg:function(msg,max){
	   var len=(msg.length>=max)?max:msg.length;
	   var tmp=msg.substring(0,max);
	   if(msg.length>max){
		   tmp=tmp+"...";
	   }
	   return tmp;
   },
   updateMsg:function(win,msg){
	   var tmp=this.procMsg(msg,win.maxMsg);
	   win.update(tmp);
	   win.show();
   },
   renderRead:function(value,record){
	   if(mc.eType && mc.eType=="receivedmsg"){
		   var readStatus=record.get("readStatus");
		     
		   if(readStatus!=2&&record.get("cancelStatus")==0){
			   // style='font-weight:bold;'
			   return "<font style='font-weight:bold;'>"+value+"</font>";
		   }		   
	   }
	   return value;
   },
   getColumn:function(header,name){
	   if(header){
		   for(var i=0;i<header.items.items.length;i++){
			   var item=header.items.items[i];
			   if(item.dataIndex==name){
				   return item;
			   }
		   }
	   }
	   return null;
   },
   procColumns:function(grid,eType){
	   var head=grid.down("headercontainer");
	   var send=mc.getColumn(head,"srcUserName");
	   var recv=mc.getColumn(head,"sendToRole");
	   if(head && send && recv){
		   if(eType=="receivedmsg"){
			   if(!send.isVisible())
			   send.setVisible(true);
			   if(recv.isVisible())
			   recv.setVisible(false);
		   }else if(eType=="sentmsg" || eType=="draftmsg"){
			   if(send.isVisible())
			   send.setVisible(false);
			   if(!recv.isVisible())
			   recv.setVisible(true);
		   }
	   }
   },
   updateTreeNode:function(node,name){
		node.set("name",name);
		node.commit();
   },
   clickTree:function(tree,eType,selectNode){
	   	if(!tree) tree=Ext.getCmp("msgTree");
	   	var store=tree.store;
		var root=store.getRootNode();;
		var node=root.findChild("eType",eType);
		tree.fireEvent("itemclick",null, node);
		if(selectNode){
			tree.getSelectionModel().select(node);
		}
   },
   procResult:function(field,action,result){
	   var str='<span style="align:middle;background-color:';
	   var tmp=action.substring(1);
	   var tmp2=action.charAt(0).toUpperCase();
		var img="",bcol="#68af02",succ="Successfully",fail="Failure",content=tmp2+tmp+" ";
		if(action=="delete absolutely"){
			content="Delete Absolutely ";
		}
	   if(result=="success"){
		   content=content+succ;
	   }else if(result=="fail"){
		   content=content+fail;
	   }else{
		   bcol="#4b9b1d";
		   img="<img src=picture/ico_loading104474.gif>&nbsp;&nbsp";
		   if(action=="save"){
			   content="Saving message to draft box.";
		   }else if(action=="send"){
			   content="Sending message.";
		   }else if(action=="delete"){
			   content="Deleting message.";
		   }else if(action=="delete absolutely"){
			   content="Deleting message absolutely.";
		   }
	   }
	   str=str+bcol+';padding:2px 10px 2px 10px;">'+img+'<font color=yellow>'+content+'</font></span>';
	   field.setValue(str);
   },
   getTask:function(field,fn){
	   var task=field.task;
	   if(!task){
		   task=new Ext.util.DelayedTask(fn);
		   field.task=task;
	   }
	   return field.task;

   },
   delMsg:function(absolutely,eType,grid,store,field){
		if(grid.getSelectionModel().hasSelection()){
			mc.getTask(field).cancel();			
			var action="delete";
			if(absolutely){
				action=action+" absolutely";
			}
			mc.procResult(field,action,"");
			
			var records = grid.getSelectionModel().getSelection();
			var ids="",readIds="",unreadIds="";
			for ( var i = 0; i < records.length; i++) {
				if(eType=="receivedmsg"){
					if(records[i].get("readStatus")==1){
						if(unreadIds!=""){
							unreadIds=unreadIds+",";
						}
						unreadIds=unreadIds+records[i].get("msgUuid");
					}else if(records[i].get("readStatus")==2){
						if(readIds!=""){
							readIds=readIds+",";
						}
						readIds=readIds+records[i].get("msgUuid");
					}
				}else{
					if(ids!=""){
						ids=ids+",";
					}
					ids=ids+records[i].get("msgUuid");
				}
			}
			var params={nodeType:eType,selAll:0,absolutely:absolutely,ids:ids
					,readIds:readIds,unreadIds:unreadIds};
			Ext.apply(params,store.proxy.extraParams);
			   
			   Ext.Ajax.request({
					url:'msgManager!delMsg.action',
					method:'POST',
					params:params,
					callback: function (options, success, response) {
					   	var obj=Ext.JSON.decode(response.responseText);			   	
					   	if(obj['success']){
					   		mc.procResult(field,action,"success");
					   		store.load();
					   		Ext.getCmp("msgTree").lstore.load();
					   	}else{
					   		mc.procResult(field,action,"fail");
					   	}
					   	mc.getTask(field).delay(3000,function(){
							field.setValue("");
						});
					}
				});
		}else{
			
		}
   },
   
   cancelMsg:function(absolutely,eType,grid,store,field){
		if(grid.getSelectionModel().hasSelection()){
			mc.getTask(field).cancel();			
			var action="cancel";
			if(absolutely){
				action=action+" absolutely";
			}
			mc.procResult(field,action,"");
			
			var records = grid.getSelectionModel().getSelection();
			  if(records.length>1){
				  mc.procResult(field,action,"fail");
				  return;
			  }
			
			var params={nodeType:"sentmsg",msgUuid:records[0].get("msgUuid"),sendToRole:records[0].get("sendToRole")
					,sendStatus:2,domainUuid:records[0].get("domainUuid"),userUuid:records[0].get("userUuid")};
			Ext.apply(params,store.proxy.extraParams);
			   
			   Ext.Ajax.request({
					url:'msgManager!cancelMsg.action',
					method:'POST',
					params:params,
					callback: function (options, success, response) {
					   	var obj=Ext.JSON.decode(response.responseText);			   	
					   	if(obj['success']){
					   		if(obj['cancelStatus']==3){
					   			mc.procResult(field,action,"fail");
					   		}else if(obj['cancelStatus']==2){
					   		mc.procResult(field,action,"success");
					   		} else if(obj['cancelStatus']==1){
					   			mc.procResult(field,action,"someSuccess");
					   		}
					   		store.load();
					   		Ext.getCmp("msgTree").lstore.load();
					   	}else{
					   		mc.procResult(field,action,"fail");
					   	}
					   	mc.getTask(field).delay(3000,function(){
							field.setValue("");
						});
					}
				});
		}else{
			
		}
  },
   getSendResultHtml:function(success,msgUuid){
	   var a="This message is sent successfully",b="";
	   if(!success){
		   a="This message is sent failure";
		   b='style=display:none;';
	   }
	   var tmp='<div style="margin:20px 0 0 20px;"><span class="ico_sendf" style="float:left;margin:-2px 4px 0 0;"></span><div class="addrtitle" style="margin-left:50px;"><b class="biginfo_m" id="sendinfomsg">Your message is sent.</b>'
		+'<div id="sendinfodiv" style="margin:6px 0 14px 2px;line-height:18px"><span id="sendinfomsg_span">'+a+'</span><span id="sSaveSendShow" '+b+'>,and is saved to the "Sent Message"</span>.  <div style=" line-height:20px">'
		+'<span id="readSendbox"><a class=aCls href="javascript:window.mc.gotoViewMessage()" >View This Message</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
//		+'<a class=aCls style="margin-left:30px" id="showSendStatus" href="javascript:ShowStatus();">View Send Status</a>'
		+'<a class=aCls style="margin-left:30px" id="writeMsgAgain" href="javascript:window.mc.gotoWriteMessage();">Write Another Message</a>'
		+' &nbsp;&nbsp;&nbsp;</div>';
		return tmp;
   },
   gotoWriteMessage:function(){
	   mc.clickTree(Ext.getCmp("msgTree"),"writemsg",true);
   },
   gotoViewMessage:function(){
	   var p=Ext.getCmp("sendMsgResult");
	   var record=Ext.create("app.store.msg.MsgModel",{
		   msgUuid:p.sendObj.msgUuid,
		   theme:p.sendObj.theme,
		   content:p.sendObj.content,
		   sendToRole:p.sendObj.sendToRole,
		   time:p.sendObj.time,
	   });
//	   console.log(record);
	   	tree=Ext.getCmp("msgTree");
	   	var store=tree.store;
		var root=store.getRootNode();
		var node=root.findChild("eType","sentmsg");
		tree.getSelectionModel().select(node);
		mc.eType="sentmsg";
	    mc.viewMsgPanel(record);



  
//	   mc.clickTree(Ext.getCmp("msgTree"),"writemsg",true);
//	   var p2=Ext.getCmp("writeMsgPanel");
//	   p2.down("hiddenfield[name=msgUuid]").setValue(p.sendObj.msgUuid);
//	   p2.down("textfield[name=theme]").setValue(p.sendObj.theme);
//	   p2.down("textareafield[name=content]").setValue(p.sendObj.content);
//	   p2.down("hiddenfield[name=sendToRole]").setValue(p.sendObj.sendToRole);
//	   mc.saveStrsToList(p2);
	   
   },
   getViewMsgPanelHtml1:function(record,size){
	   var userName=record.get("srcUserName"),roleId=record.get("srcRoleId");
	   if(mc.eType=="sentmsg" || mc.eType=="writemsg" || mc.eType=="draftmsg"){
		   userName=Ext.get("username").value;
		   roleId=Ext.get("roleId").value;
	   }
	   var html='<div class="readmailinfo" style="position:relative;z-index:2;zoom:1;"><span id="subjectTip"></span><table style="height:24px" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td height="24" valign="middle" style="word-break:break-all;padding:9px 8px 2px 14px;" class="txt_left settingtable readmail_subject"><div class="qm_left" style="padding-bottom:3px;"><span id="subject" class="sub_title ">'
	   +record.get("theme")
	   +'</span></div><div id="tagContainer" ck="tag" class="TagDiv TagReadmail" style="overflow:visible;margin-top:0;"></div><div class="clr"></div></td><td module="qmSenderInfo" id="senderInfo2" width="1%" nowrap="" class="f_size settingtable" style="padding:5px 12px 0 0;text-align:right;"><div style="width:45px;text-align:left;"> </div></td></tr></tbody></table><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-left:14px;" class="settingtable txt_left">'
	   +'<span class="myWidth addrtitle">'
	   +'Sender'
	   +'</span><span class="addrtitle">：</span><span><span rejecthtml="rejectionhtml" t="1" e="281406674@qq.com" u="-3038496402" n="281406674" addrvip="" filinghtml="filinghtml" mailhtml="operhidepanel" mop="1" sa="0" addrid="404" se="1"><b t="u" class="grn">'
	   +userName
	   +'</b>&nbsp;<b class="tcolor" t="u" id="tipFromAddr_readmail" fromaddr="281406674@qq.com">&lt;'
	   +roleType.getDisplayMapItem(roleId)
	   +'&gt;</b>&nbsp;&nbsp;&nbsp;</span>&nbsp;</span>'
	   +'<span id="operhidepanel" style="display:none"><span class="hide">&nbsp;<a href="javascript:;" class="pointer" module="qmSenderInfo" ck="toggle" id="senderInfo3">查看</a>&nbsp;&nbsp;</span></span><span id="latestqzone"></span>      </td><td width="1%" nowrap="" style="padding-right:12px;" class="settingtable"></td></tr></tbody></table><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="word-break:break-all;padding:2px 12px 0 14px;line-height:19px;" width="99%" class="settingtable txt_left">'
	   +'<span class="myWidth addrtitle">'
	   +'Time'
	   +'</span><span class="addrtitle">：</span><b class="tcolor">'
	   +rs.timeFormat(record.get("time"))
	   +'</b>'
	   +'</td><td nowrap="" valign="bottom" style="padding:4px 10px 2px 0;*padding:4px 10px 2px 0;text-align:right" width="1%" rowspan="2" class="txt_right settingtable noUnderLineList"><span style="display:none;vertical-align:6px;vertical-align:4px\9;"><a >纯文本</a> | </span><a href="javascript:;" ck="newWinRead"><span type="button" class="qm_ico_reopen" title="新窗口读信"></span></a><a href="javascript:;"><span id="rmd" module="qmRemark" ck="toggle" class="qm_ico_remarkoff" title="添加邮件备注"></span></a><a href="javascript:;"><span ck="createRule" fromaddr="281406674@qq.com" class="qm_ico_addFilter" title="创建收信规则"></span></a><a href="javascript:;"><span class="qm_ico_print" id="mail_print" title="打印" onclick=""></span></a><a id="aSwitchOption" onclick="getTop().switchOption(window)" style="text-decoration:none;" hidefocus=""><span class="qm_ico_quickdown" alt="显示更多操作" id="display_more_operator"></span></a><span id="tipRemindEdit"></span></td></tr><tr><td style="padding:0 0 0 14px;line-height:19px;" class="settingtable txt_left"><div>'
	   +'<span class="myWidth addrtitle">'
	   +'Receiver'
	   +'</span><span class="addrtitle">：</span><span><span rejecthtml="rejectionhtml" t="1" e="281406674@qq.com" u="-3038496402" n="281406674" addrvip="" filinghtml="filinghtml" mailhtml="operhidepanel" mop="1" sa="0" addrid="404" se="1"><b t="u" class="grn">'
	   +roleType.getDisplayList(record.get('sendToRole'))
	   +'</b>&nbsp;'
//	   +'<b class="tcolor" t="u" id="tipFromAddr_readmail" fromaddr="281406674@qq.com">&lt;'
//	   +record.get('sendToRole')
//	   +'&gt;</b>'
	   +'&nbsp;&nbsp;&nbsp;</span>&nbsp;</span>'
	   +'</div></td></tr><tr><td style="padding:0 14px;line-height:20px;" class="settingtable txt_left"><span id="trOption" style="display:none"><span class="addrtitle">大&nbsp;&nbsp;&nbsp;小：</span>1.3K<br><a href="javascript:;" ck="optMail2" opt="print">打印</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="mime" title="显示邮件的源代码">显示邮件原文</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="dleml" title="导出为邮件客户端可用的文件">导出为eml文件</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="code" title="改变页面编码以解决邮件乱码问题">邮件有乱码？</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="fwgroup">转发到群邮件</a><span>&nbsp;|&nbsp;<a id="savetonotepad" href="javascript:;" ck="optMail2" opt="note">保存到记事本</a><span id="remind_add_mailid:ZC0809-SJrLGfVxE9Z5eWk9_rcxH51">&nbsp;<span id="addtoremind">|&nbsp;<a href="javascript:;" ck="optMail2" opt="remind">添加到日历</a></span><span id="remind_edit_ZC0809-SJrLGfVxE9Z5eWk9_rcxH51" class="pointer"></span></span>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="fweml">作为附件转发</a></span></span></td></tr></tbody></table><div module="qmRemark" id="remarkcontainer" style="display:none; margin:5px 0 0;; padding:2px 0 0;"><div class="qqshowbd" style="border-width:1px 0 0;padding:7px 14px 2px;"><div class="addrtitle qm_left" style="*margin-top:3px;">备  注：</div><div id="remarkread" style="display:none; margin-left:48px;*margin-left:45px;width:463px;*width:475px;"><div class="remarksContent" id="remarkContent" ck="modify" style="font-size:12px;min-height:42px;padding:10px;background:#fff6cf; border:1px solid #dec694;color:#733900;line-height:18px;" title="点击编辑"></div><div class="attbg" style="padding:4px 0 4px 8px;"><a href="javascript:;" ck="modify" style="margin-right:5px;"><input style="background:url(http://rescdn.qqmail.com/zh_CN/htmledition/webp/images/newicon/mail227195.png) scroll -64px -142px; width:12px; height:14px;cursor:pointer;border:none;margin-right:3px;vertical-align:bottom\9\0;_vertical-align:1px;" onfocus="this.blur()">编辑</a><a href="javascript:;" ck="del"><input style="background:url(http://rescdn.qqmail.com/zh_CN/htmledition/webp/images/newicon/mail227195.png) scroll -80px -142px; width:13px; height:13px;cursor:pointer;border:none;margin-right:3px;vertical-align:bottom\9\0;_vertical-align:1px;" onfocus="this.blur()">删除</a></div></div><div class="remarkModify" style="display:none;margin-left:45px;" id="remarkwrite"><textarea id="remarktext" style="width:475px;*height:74px;min-height:72px;font-size:14px; overflow:hidden; margin:0 0 3px; padding:3px; color:#A0A0A0;" class="qm_txt">请在此输入备注...</textarea><div style="margin-left:3px;*margin-left:6px;"><input type="button" class="qm_btn wd2" value="保存" ck="save" id="remarksave"><a ck="cancel" id="remarkdel" style="*vertical-align:5px;display:inline-block;padding-left:6px;">取消</a></div></div></div></div><table border="0" cellspacing="0" cellpadding="0">        <tbody><tr><td class="onesize settingtable" style="height:5px;"></td></tr></tbody></table>    <div class="txt_left"><div class="attbg" id="starStatus" style="_zoom:1;padding:6px 14px;display:none"><span class="addrtitle">标记：</span>已将此邮件标记为星标邮件。&nbsp;<a id="starStatuslink" ck="starMail" href="javascript:;">取消星标</a></div><div class="attbg" id="mailtopStatus" style="_zoom:1;padding:6px 14px;display:none"><span class="addrtitle">标记：</span>已将此邮件在列表中置顶。&nbsp;<a id="mailtopStatuslink" ck="topMail" href="javascript:;">取消置顶</a></div><div class="attbg" id="starTopStatus" style="_zoom:1;padding:6px 14px;display:none"><span class="addrtitle">标记：</span>已将此邮件标记为星标邮件，并在列表中置顶。&nbsp;<a ck="starMail" href="javascript:;">取消星标</a>&nbsp;<a ck="topMail" href="javascript:;">取消置顶</a></div>';
	   return html;
   },
   getViewMsgPanelHtml2:function(record,size){
	     var content="";
	     if(record.get("cancelStatus")==1&&record.get("readStatus")==1){
	    	 content="该邮件已被撤回";
	     }else if(record.get("cancelStatus")==2&&record.get("readStatus")==1){
	    	 content="该邮件已被撤回";
	     }else {
	    	content=record.get("content"); 
	     }
	   var html='<div id="contentDiv"  onclick="" style="position:relative;font-size:14px;height:auto;padding:15px 15px 10px 15px;z-index:1;zoom:1;line-height:1.7;" class="body">    <div class="" id="qm_con_body"><div id="mailContentContainer" class="qmbox qm_con_body_content">'
		   +'<div style="width:'
		   +Math.floor(size.width-40)
		   +'px">'
		   +content
		   +'</div></div></div><!-- --><style>#mailContentContainer .txt {height:auto;}</style>  </div>';
	   return html;
   },
   viewMsgPanel:function(record){
	   	var container=Ext.getCmp("msgPanel");
		var size=container.getSize();
		for(var i=0; i<container.items.items.length; i++){
			var item=container.items.items[i];
			if(item.isVisible()){
				item.setVisible(false);
			}
		}
		var containerId="viewMsgPanel";
    	var licCardPanel=Ext.getCmp(containerId);
		if(licCardPanel==undefined || licCardPanel==null){
			licCardPanel=Ext.create('app.view.msg.ViewMsgPanel',{
				id:containerId,
			});
			container.add(licCardPanel);
			container.doLayout();
		}
//		var back=licCardPanel.down("button[iconCls=backward]");
		var edit=licCardPanel.down("button[iconCls=edit]");
//		if(back){
//			if(mc.eType=="sentmsg" || mc.eType=="receivedmsg"){
//				back.setVisible(true);
//			}else{
//				back.setVisible(false);
//			}
//		}
		if(edit){
			if(mc.eType=="sentmsg"){
				edit.setVisible(true);
			}else{
				edit.setVisible(false);
			}
		}
		var html1=licCardPanel.down("container[uitemId=html1]");
		if(html1){
			html1.update(mc.getViewMsgPanelHtml1(record,size));
		}
		var html2=licCardPanel.down("container[uitemId=html2]");
		if(html2){
			html2.update(mc.getViewMsgPanelHtml2(record,size));
		}
		licCardPanel.record=record;
		licCardPanel.setSize(size.width,size.height);
		licCardPanel.setVisible(true);
   },
   writeMsgPanel:function(record){
	   	var eType="writemsg";
	   	tree=Ext.getCmp("msgTree");
	   	var store=tree.store;
		var root=store.getRootNode();;
		var node=root.findChild("eType",eType);
		var containerId="writeMsgPanel";
		var logPanel=Ext.getCmp("msgPanel");
		for(var i=0; i<logPanel.items.items.length; i++){
			var item=logPanel.items.items[i];
			if(item.isVisible()){
				item.setVisible(false);
			}
		}
		var size=logPanel.getSize();
    	var licCardPanel=Ext.getCmp(containerId);
		if(licCardPanel==undefined || licCardPanel==null){
			licCardPanel=Ext.create('app.view.msg.WriteMsgPanel',{
				id:containerId,
			});
			logPanel.add(licCardPanel);
			logPanel.doLayout();
		}
        
        licCardPanel.getForm().reset();
        licCardPanel.setTitle(node.get("name"));
        var form=licCardPanel;
		var idList=form.down("combo[name=roleIdList]");		
		if(record){
			form.down("hiddenfield[name=msgUuid]").setValue(record.get("msgUuid"));
			form.down("textfield[name=theme]").setValue(record.get("theme"));
			form.down("textareafield[name=content]").setValue(record.get("content"));
			form.down("hiddenfield[name=sendToRole]").setValue(record.get("sendToRole"));
			console.log(record);
			mc.saveStrsToList(form);
		}
		var send=form.down("button[uitemId=send]");
		var save=form.down("button[uitemId=save]");
		var save2=form.down("button[uitemId=save2]");
		if(mc.eType=="writemsg" || mc.eType=="draftmsg"){
			send.setVisible(true);
			save.setVisible(true);
			save2.setVisible(false);
			idList.setDisabled(false);
		}else if(mc.eType=="sentmsg"){
			send.setVisible(false);
			save.setVisible(false);
			save2.setVisible(true);
			idList.setDisabled(true);
		}else{
			send.setVisible(false);
			save.setVisible(false);
			save2.setVisible(false);
			idList.setDisabled(true);
		}
        licCardPanel.setVisible(true);
		licCardPanel.setSize(size.width,size.height);
		licCardPanel.setVisible(true);
   },
   saveListToStrs:function(panel){
	   var list=panel.down("combo[name=roleIdList]");
	   var strs=panel.down("hiddenfield[name=sendToRole]");
	   var tmp="";
	   if(list && strs && list.getValue() && list.getValue().length){
		   for(var i=0;i<list.getValue().length;i++){
			   var item=list.getValue()[i];
			   if(tmp!=""){
				   tmp=tmp+",";
			   }
			   tmp=tmp+item;
		   }
		   
	   }
	   strs.setValue(tmp);
	   
   },
   saveStrsToList:function(panel){
	   var list=panel.down("combo[name=roleIdList]");
	   var strs=panel.down("hiddenfield[name=sendToRole]");
	   var tmp="";
	   if(list && strs && strs.getValue()){
		   str=strs.getValue().split(",");
		   tmp=[];
		    for(i=0;i<str.length ;i++){ 
		        tmp.push(parseInt(str[i]));
		    }		   
	   }
	   list.setValue(tmp);
   },
   openMsgModule:function(){
		if(mc.win){
			mc.win.close();
		}
	   var win=Ext.getCmp("msg_win");
	   var tree=Ext.getCmp("msgTree");
	   if(win && tree && win.isVisible()){
		   this.clickTree(tree,"receivedmsg",true);
	   }else{
		   ip.createModule('msg_win',"receivedmsg");
	   }
   },
   createTask:function(){
//	   Ext.TaskManager.stop(task);
	   task = {
				run:function(){
		   			mc.store2.load();
				},
				interval:60*1000
			};
	   var task1 = new Ext.util.DelayedTask(function(){
		   Ext.TaskManager.start(task);
		});
		task1.delay(30*1000);
   },
   init:function(){
		var store2=Ext.create("app.store.msg.MsgStore");
		store2.getProxy().url="msgManager!getRecUnreadMsg.action";
		mc.store2=store2;
			
		store2.on("load",function(){
			if(store2.getCount()){
				var tree=Ext.getCmp("msgTree");
				if(tree && tree.lstore){
					tree.lstore.load();
				}
				if(mc.win){
					mc.win.close();
				}
				mc.win=Ext.create("app.view.msg.MsgWin");
				var r=store2.getAt(0);
				var record=r;
				var a=roleType.getDisplayMapItem(record.get("srcRoleId"));
				var b="Message";
				if(a && record.get("srcUserName")){
					b="Message from "+mc.renderRead(record.get("srcUserName"),record)+"&nbsp;<font color=gray>&lt;"+a+"&gt;</font>";
				}
				mc.win.setTitle(b);
				var html1="<div class='msg_win_div sub_title'>"+r.get("theme")+"</div>";
//				var size = Ext.util.TextMetrics.measure("span1",r.get("content"),210);
//				var rmh=70;
//				var rmh2=135;
				var size = Ext.util.TextMetrics.measure("span1",r.get("content"),mc.win.width-30);
				var rmh=mc.win.height-100;
				var rmh2=2700;
				var mh=size.height;
	
				var len=r.get("content").length;
				if(mh>=rmh){
					len=Math.floor(len*rmh/mh);
				}
				if(len>rmh2){
					len=rmh2;
				}
				var msg=mc.procMsg(r.get("content"),len);				
				console.log(mh+"----"+len);
				Ext.util.TextMetrics.destroy();
				var theme=mc.win.down("container[uitemId=html1]");
				theme.update(html1);
				var html4=mc.win.down("displayfield[name=html4]");
				html4.setValue("<div class=msg_win_div3>"+msg+"</div>");
				mc.win.show();
			}else{
				if(mc.win){
					mc.win.toFront();
				}
			}
			
		});
		mc.createTask();
   }
});