Ext.define('app.util.SmlOpenModel',{
	setModel:function(row,isSendBtn){
		var sendSms=Ext.getCmp('addSml');
		if(sendSms==undefined ||sendSms==null){
			sendSms=Ext.create('app.view.sms.AddSml',{});
			lanControll.setLan(sendSms);
		}
		sendSms.maintenance = this.maintenance;
		sendSms.simcard=this.simcard;
		var number=sendSms.down('form').getForm().findField('number');
		var content=sendSms.down('form').getForm().findField('content');
		var encodeAll=sendSms.down('form').getForm().findField('encodeAll');
		var learnAll=sendSms.down('form').getForm().findField('learnAll');
		var encode=sendSms.down('form').getForm().findField('encode');
		var split=sendSms.down('form').getForm().findField('split');
		var splitSucc=sendSms.down('form').getForm().findField('splitSucc');
		var splitFail=sendSms.down('form').getForm().findField('splitFail');
		var smsReceipt=sendSms.down('form').getForm().findField('smsReceipt');
		var smsResult=sendSms.down('form').getForm().findField('smsResult');
		var smsTime=sendSms.down('form').getForm().findField('smsTime');
		var resultTime=sendSms.down('form').getForm().findField('resultTime');
		var receiptTime=sendSms.down('form').getForm().findField('receiptTime');
		var curFailRetries=sendSms.down('form').getForm().findField('curFailRetries');
		var maxFailRetries=sendSms.down('form').getForm().findField('maxFailRetries');
		var maxFailRetries2=sendSms.down('form').getForm().findField('maxFailRetries2');

		var smsNumber=row.get('smsNumber');
		var smsStatus=row.get('smsStatus');
		var smsContent=row.get('content');
		var smsEncode=row.get('encode');
		var simUuid=row.get('uuid');
		var smlUuid=row.get('smlUuid');
		var _split=row.get('splitCnt');
		var _splitSucc=row.get('splitSuccCnt');
		var _splitFailCnt=row.get('splitFailCnt');
		var _smsReceipt=row.get('smsReceipt');
		var _smsResult=row.get('smsResult');
		var _smsTime=row.get('smsTime');
		var _resultTime=row.get('resultTime');
		var _receiptTime=row.get('receiptTime');
		var _curFailRetries=row.get('curFailRetries');
		var _maxFailRetries=row.get('maxFailRetries');
		
		var cancel=Ext.getCmp('sml_cancel');
		var save=Ext.getCmp('sml_save');
		var sendNow=Ext.getCmp('sml_send');
		var clear=Ext.getCmp('sml_clear');
		if(smsStatus==0){
			sendSms.setHeight(400);
			sendSms.setWidth(580);
			
			save.setVisible(true);
			sendNow.setVisible(true);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			number.setVisible(true);
			content.setVisible(true);
			encodeAll.setDisabled(false);
			learnAll.setDisabled(false);
//			encode.setVisible(true);
			split.setVisible(true);
			splitSucc.setVisible(false);
			splitFail.setVisible(false);
			smsReceipt.setVisible(false);
			smsResult.setVisible(false);
			smsTime.setVisible(false);
			resultTime.setVisible(false);
			receiptTime.setVisible(false);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			number.setReadOnly(false);
			number.setFieldStyle("background:#FFF");
			content.setReadOnly(false);
			content.setFieldStyle("background:#FFF");
//			encode.setReadOnly(false)
//			encode.setFieldStyle("background:#FFF");
			maxFailRetries2.setDisabled(false);
			maxFailRetries.setDisabled(false);
			
			if(isSendBtn==0){
				number.setValue(smsNumber);
				content.setValue(smsContent);
				encode.setValue(smsEncode);
				curFailRetries.setValue(_curFailRetries);
				if(_maxFailRetries==255){
					maxFailRetries2.setValue(_maxFailRetries);
				}else{
					maxFailRetries.setValue(_maxFailRetries);
				}
			}
//			split.setValue(0);
		}else if(smsStatus==1){
			sendSms.setHeight(610);
			sendSms.setWidth(680);
			
			save.setVisible(false);
			sendNow.setVisible(false);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			number.setVisible(true);
			content.setVisible(true);
			encode.setVisible(true);

			split.setVisible(true);
			splitSucc.setVisible(true);
			splitFail.setVisible(true);
			smsReceipt.setVisible(true);
			smsResult.setVisible(true);
			smsTime.setVisible(true);
			resultTime.setVisible(true);
			receiptTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);

			number.setReadOnly(true);
			number.setFieldStyle("background:#DFE9F6");
			content.setReadOnly(true);
			content.setFieldStyle("background:#DFE9F6");
			encodeAll.setDisabled(true);
			learnAll.setDisabled(true);
//			encodeAll.setFieldStyle("background:#DFE9F6");
			maxFailRetries2.setDisabled(true);
			maxFailRetries.setDisabled(true);
			
			number.setValue(smsNumber);
			content.setValue(smsContent);
			encode.setValue(smsEncode);
			split.setValue(_split);
			splitSucc.setValue(_splitSucc);
			splitFail.setValue(_splitFailCnt);
			smsReceipt.setValue(_smsReceipt);
			_smsResult=rs.smsUssdCallResult(_smsResult);
			smsResult.setValue(_smsResult);
			smsTime.setValue(_smsTime);
			resultTime.setValue(_resultTime);
			receiptTime.setValue(_receiptTime);
			curFailRetries.setValue(_curFailRetries);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
			
			
		}else if(smsStatus==2){
			sendSms.setHeight(610);
			sendSms.setWidth(680);
			
			save.setVisible(false);
			sendNow.setVisible(false);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			number.setVisible(true);
			content.setVisible(true);
			encode.setVisible(true);
			
			split.setVisible(true);
			splitSucc.setVisible(true);
			splitFail.setVisible(true);
			smsReceipt.setVisible(true);
			smsResult.setVisible(true);
			smsTime.setVisible(true);
			resultTime.setVisible(true);
			receiptTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			number.setReadOnly(true);
			number.setFieldStyle("background:#DFE9F6");
			content.setReadOnly(true);
			content.setFieldStyle("background:#DFE9F6");
			encodeAll.setDisabled(true);
			learnAll.setDisabled(true);
//			encodeAll.setFieldStyle("background:#DFE9F6");
			maxFailRetries2.setDisabled(true);
			maxFailRetries.setDisabled(true);
			
			number.setValue(smsNumber);
			content.setValue(smsContent);
			encode.setValue(smsEncode);
			split.setValue(_split);
			splitSucc.setValue(_splitSucc);
			splitFail.setValue(_splitFailCnt);
			smsReceipt.setValue(_smsReceipt);
			_smsResult=rs.smsUssdCallResult(_smsResult);
			smsResult.setValue(_smsResult);
			smsTime.setValue(_smsTime);
			resultTime.setValue(_resultTime);
			receiptTime.setValue(_receiptTime);
			curFailRetries.setVisible(true);
			curFailRetries.setValue(_curFailRetries);
			maxFailRetries.setVisible(true);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
			
		}else if(smsStatus==3||smsStatus==4||smsStatus==5){
			sendSms.setHeight(610);
			sendSms.setWidth(680);
			
			save.setVisible(false);
			sendNow.setVisible(true);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			number.setVisible(true);
			content.setVisible(true);
			encode.setVisible(true);
			
			split.setVisible(true);
			splitSucc.setVisible(true);
			splitFail.setVisible(true);
			smsReceipt.setVisible(true);
			smsResult.setVisible(true);
			smsTime.setVisible(true);
			resultTime.setVisible(true);
			receiptTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			number.setReadOnly(false);
			number.setFieldStyle("background:#FFF");
			content.setReadOnly(false);
			content.setFieldStyle("background:#FFF");
//			encode.setReadOnly(false)
//			encode.setFieldStyle("background:#FFF");
			maxFailRetries2.setDisabled(false);
			maxFailRetries.setDisabled(false);
			
			number.setValue(smsNumber);
			content.setValue(smsContent);
			encode.setValue(smsEncode);
			split.setValue(_split);
			splitSucc.setValue(_splitSucc);
			splitFail.setValue(_splitFailCnt);
			smsReceipt.setValue(_smsReceipt);
			_smsResult=rs.smsUssdCallResult(_smsResult);
			smsResult.setValue(_smsResult);
			smsTime.setValue(_smsTime);
			resultTime.setValue(_resultTime);
			receiptTime.setValue(_receiptTime);
			curFailRetries.setValue(_curFailRetries);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
		}else{
			if(this.simcard==1){
				sendSms.setHeight(400);
				sendSms.setWidth(580);
				
				save.setVisible(true);
				sendNow.setVisible(true);
				cancel.setVisible(false);
				clear.setVisible(false);
				
				number.setVisible(true);
				content.setVisible(true);
				encodeAll.setDisabled(false);
				learnAll.setDisabled(false);
//				encode.setVisible(true);
				split.setVisible(true);
				splitSucc.setVisible(false);
				splitFail.setVisible(false);
				smsReceipt.setVisible(false);
				smsResult.setVisible(false);
				smsTime.setVisible(false);
				resultTime.setVisible(false);
				receiptTime.setVisible(false);
				curFailRetries.setVisible(true);
				maxFailRetries.setVisible(true);
				
				number.setReadOnly(false);
				number.setFieldStyle("background:#FFF");
				content.setReadOnly(false);
				content.setFieldStyle("background:#FFF");
//				encode.setReadOnly(false)
//				encode.setFieldStyle("background:#FFF");
				maxFailRetries2.setDisabled(false);
				maxFailRetries.setDisabled(false);
				
				if(isSendBtn==0){
					number.setValue(smsNumber);
					content.setValue(smsContent);
					encode.setValue(smsEncode);
					curFailRetries.setValue(_curFailRetries);
					if(_maxFailRetries==255){
						maxFailRetries2.setValue(_maxFailRetries);
					}else{
						maxFailRetries.setValue(_maxFailRetries);
					}
				}
			}
		}
		return sendSms;
}
	
	
});
