Ext.define('app.util.CallOpenModel',{
	setModel:function(row,isSendBtn){
		var sendCall=Ext.getCmp('addCall');
		if(sendCall==undefined ||sendCall==null){
			sendCall=Ext.create('app.view.sms.AddCall',{});
			lanControll.setLan(sendCall);
		}
		sendCall.maintenance = this.maintenance;
		sendCall.simcard = this.simcard;
		var callNumber=sendCall.down('form').getForm().findField('callNumber');
		var connectFlag=sendCall.down('form').getForm().findField('connectFlag');
		var connectFlagAll=sendCall.down('form').getForm().findField('connectFlagAll');
		var callDirection=sendCall.down('form').getForm().findField('callDirection');
		var callDirectionAll=sendCall.down('form').getForm().findField('callDirectionAll');
		var callDuration=sendCall.down('form').getForm().findField('callDuration');
		var testToneMode=sendCall.down('form').getForm().findField('testToneMode');
		var testToneModeAll=sendCall.down('form').getForm().findField('testToneModeAll');
		var dtmfNumber=sendCall.down('form').getForm().findField('dtmfNumber');
		var callResult=sendCall.down('form').getForm().findField('callResult');
		var callTime=sendCall.down('form').getForm().findField('callTime');
		var resultTime=sendCall.down('form').getForm().findField('resultTime');
		var curFailRetries=sendCall.down('form').getForm().findField('curFailRetries');
		var maxFailRetries=sendCall.down('form').getForm().findField('maxFailRetries');
		var maxFailRetries2=sendCall.down('form').getForm().findField('maxFailRetries2');

		var _callNumber=row.get('callNumber');
		var callStatus=row.get('callStatus');
		var _connectFlag=row.get('connectFlag');
		var _callDirection=row.get('callDirection');
		var simUuid=row.get('uuid');
		var smlUuid=row.get('smlUuid');
		var _callDuration=row.get('callDuration');
		var _testToneMode=row.get('testToneMode');
		var _dtmfNumber=row.get('dtmfNumber');
		var _callResult=row.get('callResult');
		var _callTime=row.get('callTime');
		var _resultTime=row.get('resultTime');
		var _curFailRetries=row.get('curFailRetries');
		var _maxFailRetries=row.get('maxFailRetries');
		
		var cancel=Ext.getCmp('call_cancel');
		var save=Ext.getCmp('call_save');
		var sendNow=Ext.getCmp('call_send');
		var clear=Ext.getCmp('call_clear');
		if(callStatus==0){
//			sendCall.setHeight(400);
//			sendCall.setWidth(580);
			
			save.setVisible(true);
			sendNow.setVisible(true);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			connectFlagAll.setDisabled(false);
			callDirectionAll.setDisabled(false);
			testToneModeAll.setDisabled(false);
			
			callNumber.setVisible(true);
			connectFlag.setVisible(true);
			callDirection.setVisible(true);
			callDuration.setVisible(true);
//			testToneMode.setVisible(false);
			dtmfNumber.setVisible(true);
			callResult.setVisible(false);
			callTime.setVisible(false);
			resultTime.setVisible(false);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			callNumber.setReadOnly(false);
			callNumber.setFieldStyle("background:#FFF");
			maxFailRetries2.setDisabled(false);
			maxFailRetries.setDisabled(false);
			
			callNumber.setValue(_callNumber);
			connectFlag.setValue(_connectFlag);
			callDirection.setValue(_callDirection);
			callDuration.setValue(_callDuration);
			testToneMode.setValue(_testToneMode);
			dtmfNumber.setValue(_dtmfNumber);
			_callResult=rs.smsUssdCallResult(_callResult);
			callResult.setValue(_callResult);
			callTime.setValue(_callTime);
			resultTime.setValue(_resultTime);
			
			if(isSendBtn==0){
				callNumber.setValue(_callNumber);
				connectFlag.setValue(_connectFlag);
				callDirection.setValue(_callDirection);
				curFailRetries.setValue(_curFailRetries);
				if(_maxFailRetries==255){
					maxFailRetries2.setValue(_maxFailRetries);
				}else{
					maxFailRetries.setValue(_maxFailRetries);
				}
			}
		}else if(callStatus==1){
//			sendCall.setHeight(540);
//			sendCall.setWidth(680);
			
			save.setVisible(false);
			sendNow.setVisible(false);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			connectFlagAll.setDisabled(true);
			callDirectionAll.setDisabled(true);
			testToneModeAll.setDisabled(true);
			
			callNumber.setVisible(true);
			connectFlag.setVisible(true);
			callDirection.setVisible(true);

			callDuration.setVisible(true);
			testToneMode.setVisible(true);
			dtmfNumber.setVisible(true);
			callResult.setVisible(true);
			callTime.setVisible(true);
			resultTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);

			callNumber.setReadOnly(true);
			callNumber.setFieldStyle("background:#DFE9F6");
			maxFailRetries2.setDisabled(true);
			maxFailRetries.setDisabled(true);
			
			callNumber.setValue(_callNumber);
			connectFlag.setValue(_connectFlag);
			callDirection.setValue(_callDirection);
			callDuration.setValue(_callDuration);
			testToneMode.setValue(_testToneMode);
			dtmfNumber.setValue(_dtmfNumber);
			_callResult=rs.smsUssdCallResult(_callResult);
			callResult.setValue(_callResult);
			callTime.setValue(_callTime);
			resultTime.setValue(_resultTime);
			
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
			
			
		}else if(callStatus==2){
//			sendCall.setHeight(540);
//			sendCall.setWidth(680);
			
			save.setVisible(false);
			sendNow.setVisible(false);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			connectFlagAll.setDisabled(true);
			callDirectionAll.setDisabled(true);
			testToneModeAll.setDisabled(true);
			
			callNumber.setVisible(true);
			connectFlag.setVisible(true);
			callDirection.setVisible(true);
			
			callDuration.setVisible(true);
			testToneMode.setVisible(true);
			dtmfNumber.setVisible(true);
			callResult.setVisible(true);
			callTime.setVisible(true);
			resultTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			callNumber.setReadOnly(true);
			callNumber.setFieldStyle("background:#DFE9F6");
			maxFailRetries2.setDisabled(true);
			maxFailRetries.setDisabled(true);
			
			callNumber.setValue(_callNumber);
			connectFlag.setValue(_connectFlag);
			callDirection.setValue(_callDirection);
			callDuration.setValue(_callDuration);
			testToneMode.setValue(_testToneMode);
			dtmfNumber.setValue(_dtmfNumber);
			_callResult=rs.smsUssdCallResult(_callResult);
			callResult.setValue(_callResult);
			callTime.setValue(_callTime);
			resultTime.setValue(_resultTime);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
			
		}else if(callStatus==3||callStatus==4||callStatus==103||callStatus==202){
//			sendCall.setHeight(540);
//			sendCall.setWidth(680);
			
			save.setVisible(true);
			sendNow.setVisible(true);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			connectFlagAll.setDisabled(false);
			callDirectionAll.setDisabled(false);
			testToneModeAll.setDisabled(false);
			
			callNumber.setVisible(true);
			connectFlag.setVisible(true);
			callDirection.setVisible(true);
			
			callDuration.setVisible(true);
			testToneMode.setVisible(true);
			dtmfNumber.setVisible(true);
			callResult.setVisible(true);
			callTime.setVisible(true);
			resultTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			callNumber.setReadOnly(false);
			callNumber.setFieldStyle("background:#FFF");
			maxFailRetries2.setDisabled(false);
			maxFailRetries.setDisabled(false);
			
			callNumber.setValue(_callNumber);
			connectFlag.setValue(_connectFlag);
			callDirection.setValue(_callDirection);
			callDuration.setValue(_callDuration);
			testToneMode.setValue(_testToneMode);
			dtmfNumber.setValue(_dtmfNumber);
			_callResult=rs.smsUssdCallResult(_callResult);
			callResult.setValue(_callResult);
			callTime.setValue(_callTime);
			resultTime.setValue(_resultTime);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
		
		}else{
			if(this.simcard==1){
//				sendCall.setHeight(400);
//				sendCall.setWidth(580);
				
				save.setVisible(true);
				sendNow.setVisible(true);
				cancel.setVisible(true);
				clear.setVisible(true);
				
				connectFlagAll.setDisabled(false);
				callDirectionAll.setDisabled(false);
				testToneModeAll.setDisabled(false);
				
				callNumber.setVisible(true);
				connectFlag.setVisible(true);
				callDirection.setVisible(true);
				callDuration.setVisible(true);
//				testToneMode.setVisible(false);
				dtmfNumber.setVisible(true);
				callResult.setVisible(false);
				callTime.setVisible(false);
				resultTime.setVisible(false);
				curFailRetries.setVisible(true);
				maxFailRetries.setVisible(true);
				
				callNumber.setReadOnly(false);
				callNumber.setFieldStyle("background:#FFF");
				maxFailRetries2.setDisabled(false);
				maxFailRetries.setDisabled(false);
				
				callNumber.setValue(_callNumber);
				connectFlag.setValue(_connectFlag);
				callDirection.setValue(_callDirection);
				callDuration.setValue(_callDuration);
				testToneMode.setValue(_testToneMode);
				dtmfNumber.setValue(_dtmfNumber);
				_callResult=rs.smsUssdCallResult(_callResult);
				callResult.setValue(_callResult);
				callTime.setValue(_callTime);
				resultTime.setValue(_resultTime);
				
				if(isSendBtn==0){
					callNumber.setValue(_callNumber);
					connectFlag.setValue(_connectFlag);
					callDirection.setValue(_callDirection);
					curFailRetries.setValue(_curFailRetries);
					if(_maxFailRetries==255){
						maxFailRetries2.setValue(_maxFailRetries);
					}else{
						maxFailRetries.setValue(_maxFailRetries);
					}
				}
			}
		}
		return sendCall;
}
	
	
});
