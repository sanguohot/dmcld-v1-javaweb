Ext.define('app.view.msg.SendMsgResult',{
	extend:'Ext.panel.Panel',
	layout:'vbox',
	border:false,
	id:'sendMsgResult',
	hidden:true,
	title:'Send Message Result',
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
	sendObj:{},
	items:[{
		xtype:'container',
		uitemId:'result',
		html:'',
//		html:'<div style="margin:20px 0 0 20px;"><span class="ico_sendf" style="float:left;margin:-2px 4px 0 0;"></span><div class="addrtitle" style="margin-left:50px;"><b class="biginfo_m" id="sendinfomsg">Your message is sent.</b>'
//			+'<div id="sendinfodiv" style="margin:6px 0 14px 2px;line-height:18px"><span id="sendinfomsg_span">This message is sent successfully</span><span id="sSaveSendShow">,and is saved to the "Sent Message"</span>.  <div style=" line-height:20px">'
//			+'<span id="readSendbox"><a class=aCls href="javascript:window.mc.gotoViewMessage("'+msgUuid+'")" >View This Message</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
////			+'<a class=aCls style="margin-left:30px" id="showSendStatus" href="javascript:ShowStatus();">View Send Status</a>'
//			+'<a class=aCls style="margin-left:30px" id="writeMsgAgain" href="javascript:window.mc.gotoWriteMessage();">Write Another Message</a>'
//			+' &nbsp;&nbsp;&nbsp;</div>',
	}],
	initComponent: function(){		
		this.callParent(arguments);	
	},
});