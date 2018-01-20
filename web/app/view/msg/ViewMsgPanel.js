Ext.define('app.view.msg.ViewMsgPanel',{
	extend:'Ext.form.Panel',
	layout:'vbox',
	border:false,
	hidden:true,
	id:'viewMsgPanel',
	bodyStyle: {
//		background: '#DFE9F6',
		background: 'white',
		
	},
//	bodyPadding:'10 10 10 10',
	defaults:{
		labelAlign:"right",
		labelWidth:100,
		margin:'0 0 0 0',
//		width:800,
	},
	align:'stretch',
	items:[{
		xtype:'container',
		uitemId:'html1',
		html:'<div class="readmailinfo" style="position:relative;z-index:2;zoom:1;"><span id="subjectTip"></span><table style="height:24px" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td height="24" valign="middle" style="word-break:break-all;padding:9px 8px 2px 14px;" class="txt_left settingtable readmail_subject"><div class="qm_left" style="padding-bottom:3px;"><span id="subject" class="sub_title ">dadsdasf</span></div><div id="tagContainer" ck="tag" class="TagDiv TagReadmail" style="overflow:visible;margin-top:0;"></div><div class="clr"></div></td><td module="qmSenderInfo" id="senderInfo2" width="1%" nowrap="" class="f_size settingtable" style="padding:5px 12px 0 0;text-align:right;"><div style="width:45px;text-align:left;"> </div></td></tr></tbody></table><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-left:14px;" class="settingtable txt_left"><span class="addrtitle">发件人：</span><span><span rejecthtml="rejectionhtml" t="1" e="281406674@qq.com" u="-3038496402" n="281406674" addrvip="" filinghtml="filinghtml" mailhtml="operhidepanel" mop="1" sa="0" addrid="404" se="1"><b t="u" class="grn">281406674</b>&nbsp;<b class="tcolor" t="u" id="tipFromAddr_readmail" fromaddr="281406674@qq.com">&lt;281406674@qq.com&gt;</b>&nbsp;&nbsp;&nbsp;</span>&nbsp;</span><span id="operhidepanel" style="display:none"><span class="hide">&nbsp;<a href="javascript:;" class="pointer" module="qmSenderInfo" ck="toggle" id="senderInfo3">查看</a>&nbsp;&nbsp;</span></span><span id="latestqzone"></span>      </td><td width="1%" nowrap="" style="padding-right:12px;" class="settingtable"></td></tr></tbody></table><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="word-break:break-all;padding:2px 12px 0 14px;line-height:19px;" width="99%" class="settingtable txt_left"><span class="addrtitle">时&nbsp;&nbsp;&nbsp;间：</span><b class="tcolor">2015年1月9日(星期五) 下午3:33</b></td><td nowrap="" valign="bottom" style="padding:4px 10px 2px 0;*padding:4px 10px 2px 0;text-align:right" width="1%" rowspan="2" class="txt_right settingtable noUnderLineList"><span style="display:none;vertical-align:6px;vertical-align:4px\9;"><a >纯文本</a> | </span><a href="javascript:;" ck="newWinRead"><span type="button" class="qm_ico_reopen" title="新窗口读信"></span></a><a href="javascript:;"><span id="rmd" module="qmRemark" ck="toggle" class="qm_ico_remarkoff" title="添加邮件备注"></span></a><a href="javascript:;"><span ck="createRule" fromaddr="281406674@qq.com" class="qm_ico_addFilter" title="创建收信规则"></span></a><a href="javascript:;"><span class="qm_ico_print" id="mail_print" title="打印" onclick=""></span></a><a id="aSwitchOption" onclick="getTop().switchOption(window)" style="text-decoration:none;" hidefocus=""><span class="qm_ico_quickdown" alt="显示更多操作" id="display_more_operator"></span></a><span id="tipRemindEdit"></span></td></tr><tr><td style="padding:0 0 0 14px;line-height:19px;" class="settingtable txt_left"><div><div class="addrtitle nowrap" style="position:absolute;">收件人：</div><div style="padding-left:48px;font-size:12px;overflow:hidden; zoom:1;"><span style="white-space:nowrap;height:18px;line-height:18px; " class="left" t="1" e="281406674@qq.com" u="-3038496402" n="幽冥之弈" mop="1" se="0">幽冥之弈&nbsp;<b t="u" class="tcolor">&lt;281406674@qq.com&gt;</b></span></div></div></td></tr><tr><td style="padding:0 14px;line-height:20px;" class="settingtable txt_left"><span id="trOption" style="display:none"><span class="addrtitle">大&nbsp;&nbsp;&nbsp;小：</span>1.3K<br><a href="javascript:;" ck="optMail2" opt="print">打印</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="mime" title="显示邮件的源代码">显示邮件原文</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="dleml" title="导出为邮件客户端可用的文件">导出为eml文件</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="code" title="改变页面编码以解决邮件乱码问题">邮件有乱码？</a>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="fwgroup">转发到群邮件</a><span>&nbsp;|&nbsp;<a id="savetonotepad" href="javascript:;" ck="optMail2" opt="note">保存到记事本</a><span id="remind_add_mailid:ZC0809-SJrLGfVxE9Z5eWk9_rcxH51">&nbsp;<span id="addtoremind">|&nbsp;<a href="javascript:;" ck="optMail2" opt="remind">添加到日历</a></span><span id="remind_edit_ZC0809-SJrLGfVxE9Z5eWk9_rcxH51" class="pointer"></span></span>&nbsp;|&nbsp;<a href="javascript:;" ck="optMail2" opt="fweml">作为附件转发</a></span></span></td></tr></tbody></table><div module="qmRemark" id="remarkcontainer" style="display:none; margin:5px 0 0;; padding:2px 0 0;"><div class="qqshowbd" style="border-width:1px 0 0;padding:7px 14px 2px;"><div class="addrtitle qm_left" style="*margin-top:3px;">备  注：</div><div id="remarkread" style="display:none; margin-left:48px;*margin-left:45px;width:463px;*width:475px;"><div class="remarksContent" id="remarkContent" ck="modify" style="font-size:12px;min-height:42px;padding:10px;background:#fff6cf; border:1px solid #dec694;color:#733900;line-height:18px;" title="点击编辑"></div><div class="attbg" style="padding:4px 0 4px 8px;"><a href="javascript:;" ck="modify" style="margin-right:5px;"><input style="background:url(http://rescdn.qqmail.com/zh_CN/htmledition/webp/images/newicon/mail227195.png) scroll -64px -142px; width:12px; height:14px;cursor:pointer;border:none;margin-right:3px;vertical-align:bottom\9\0;_vertical-align:1px;" onfocus="this.blur()">编辑</a><a href="javascript:;" ck="del"><input style="background:url(http://rescdn.qqmail.com/zh_CN/htmledition/webp/images/newicon/mail227195.png) scroll -80px -142px; width:13px; height:13px;cursor:pointer;border:none;margin-right:3px;vertical-align:bottom\9\0;_vertical-align:1px;" onfocus="this.blur()">删除</a></div></div><div class="remarkModify" style="display:none;margin-left:45px;" id="remarkwrite"><textarea id="remarktext" style="width:475px;*height:74px;min-height:72px;font-size:14px; overflow:hidden; margin:0 0 3px; padding:3px; color:#A0A0A0;" class="qm_txt">请在此输入备注...</textarea><div style="margin-left:3px;*margin-left:6px;"><input type="button" class="qm_btn wd2" value="保存" ck="save" id="remarksave"><a ck="cancel" id="remarkdel" style="*vertical-align:5px;display:inline-block;padding-left:6px;">取消</a></div></div></div></div><table border="0" cellspacing="0" cellpadding="0">        <tbody><tr><td class="onesize settingtable" style="height:5px;"></td></tr></tbody></table>    <div class="txt_left"><div class="attbg" id="starStatus" style="_zoom:1;padding:6px 14px;display:none"><span class="addrtitle">标记：</span>已将此邮件标记为星标邮件。&nbsp;<a id="starStatuslink" ck="starMail" href="javascript:;">取消星标</a></div><div class="attbg" id="mailtopStatus" style="_zoom:1;padding:6px 14px;display:none"><span class="addrtitle">标记：</span>已将此邮件在列表中置顶。&nbsp;<a id="mailtopStatuslink" ck="topMail" href="javascript:;">取消置顶</a></div><div class="attbg" id="starTopStatus" style="_zoom:1;padding:6px 14px;display:none"><span class="addrtitle">标记：</span>已将此邮件标记为星标邮件，并在列表中置顶。&nbsp;<a ck="starMail" href="javascript:;">取消星标</a>&nbsp;<a ck="topMail" href="javascript:;">取消置顶</a></div>'
	},{
		xtype:'container',
		uitemId:'html2',
		html:'<div id="contentDiv" onmouseover="getTop().stopPropagation(event);" onclick="" style="position:relative;font-size:14px;height:auto;padding:15px 15px 10px 15px;z-index:1;zoom:1;line-height:1.7;" class="body">    <div class="" id="qm_con_body"><div id="mailContentContainer" class="qmbox qm_con_body_content"><div>dsdsdasdasdaskljdsj</div></div></div><!-- --><style>#mailContentContainer .txt {height:auto;}</style>  </div>',
	}],
	initComponent: function(){
		var me=this;
		var tbar=[];
		var back=Ext.create("Ext.button.Button",{
     		 xtype:'button',
      		 text:'Back',
      		 iconCls:'backward',
      		 listeners:{
      		 	click:function(){
					if(mc.eType!="receivedmsg"){
						mc.clickTree(Ext.getCmp("msgTree"),"sentmsg",true);
					}else{
						mc.clickTree(Ext.getCmp("msgTree"),mc.eType,true);
					}
				}
      	 	}
      	 });
		var edit=Ext.create("Ext.button.Button",{
    		 xtype:'button',
     		 text:'Re-edit',
     		 iconCls:'edit',
     		 listeners:{
     		 	click:function(){
					if(me.record)
					mc.writeMsgPanel(me.record);
				}
     	 	}
     	 });
		tbar.push(back);
//		tbar.push("-");
		tbar.push(edit);
		this.tbar=tbar;
		this.callParent(arguments);	
	},
});