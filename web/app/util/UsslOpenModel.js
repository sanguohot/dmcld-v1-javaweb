Ext.define('app.util.UsslOpenModel',{
	setModel:function(row,isSendBtn){
		var sendUssl=Ext.getCmp('addUssl');
		if(sendUssl==undefined ||sendUssl==null){
			sendUssl=Ext.create('app.view.sms.AddUssl',{});
			lanControll.setLan(sendUssl);
		}
		sendUssl.maintenance = this.maintenance;
		sendUssl.simcard = this.simcard;
		var content=sendUssl.down('form').getForm().findField('content');
		var ussdParamAll=sendUssl.down('form').getForm().findField('ussdParamAll');
		var ussdParam=sendUssl.down('form').getForm().findField('ussdParam');
		var ussdResult=sendUssl.down('form').getForm().findField('ussdResult');
		var ussdTime=sendUssl.down('form').getForm().findField('ussdTime');
		var resultTime=sendUssl.down('form').getForm().findField('resultTime');
		var curFailRetries=sendUssl.down('form').getForm().findField('curFailRetries');
		var maxFailRetries=sendUssl.down('form').getForm().findField('maxFailRetries');
		var maxFailRetries2=sendUssl.down('form').getForm().findField('maxFailRetries2');
		

		var ussdStatus=row.get('ussdStatus');
		var ussdContent=row.get('content');
		var simUuid=row.get('uuid');
		var usslUuid=row.get('usslUuid');
		var _ussdResult=row.get('ussdResult');
		var _ussdTime=row.get('ussdTime');
		var _resultTime=row.get('resultTime');
		var _curFailRetries=row.get('curFailRetries');
		var _maxFailRetries=row.get('maxFailRetries');
		
		var cancel=Ext.getCmp('ussl_cancel');
		var save=Ext.getCmp('ussl_save');
		var sendNow=Ext.getCmp('ussl_send');
		var clear=Ext.getCmp('ussl_clear');
		if(ussdStatus==0){
			sendUssl.setHeight(300);
			sendUssl.setWidth(550);
			
			save.setVisible(true);
			sendNow.setVisible(true);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			content.setVisible(true);
			ussdParamAll.setDisabled(false);
			ussdParam.setVisible(true);
			ussdResult.setVisible(false);
			ussdTime.setVisible(false);
			resultTime.setVisible(false);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			content.setReadOnly(false);
			content.setFieldStyle("background:#FFFFFF");
			maxFailRetries2.setDisabled(false);
			maxFailRetries.setDisabled(false);
			
			if(isSendBtn==0){
				content.setValue(ussdContent);
				curFailRetries.setValue(_curFailRetries);
				if(_maxFailRetries==255){
					maxFailRetries2.setValue(_maxFailRetries);
				}else{
					maxFailRetries.setValue(_maxFailRetries);
				}
				
			}
//			split.setValue(0);
		}else if(ussdStatus==1){
			sendUssl.setHeight(360);
			sendUssl.setWidth(580);
			
			save.setVisible(false);
			sendNow.setVisible(false);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			content.setReadOnly(true);
			content.setFieldStyle("background:#DFE9F6");
			maxFailRetries2.setDisabled(true);
			maxFailRetries.setDisabled(true);
			
			content.setVisible(true);
			ussdParamAll.setDisabled(true);
			ussdParam.setVisible(true);
			ussdResult.setVisible(true);
			ussdTime.setVisible(true);
			resultTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			content.setValue(ussdContent);
			_ussdResult=rs.smsUssdCallResult(_ussdResult);
			ussdResult.setValue(_ussdResult);
			ussdTime.setValue(_ussdTime);
			resultTime.setValue(_resultTime);
			curFailRetries.setValue(_curFailRetries);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
			
		}else if(ussdStatus==2){
			sendUssl.setHeight(360);
			sendUssl.setWidth(580);
			
			save.setVisible(false);
			sendNow.setVisible(false);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			content.setVisible(true);
			ussdParamAll.setDisabled(true);
			ussdParam.setVisible(true);
			ussdResult.setVisible(true);
			ussdTime.setVisible(true);
			resultTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			content.setReadOnly(true);
			content.setFieldStyle("background:#DFE9F6");
			maxFailRetries2.setDisabled(true);
			maxFailRetries.setDisabled(true);
			
			content.setValue(ussdContent);
			_ussdResult=rs.smsUssdCallResult(_ussdResult);
			ussdResult.setValue(_ussdResult);
			ussdTime.setValue(_ussdTime);
			resultTime.setValue(_resultTime);
			curFailRetries.setValue(_curFailRetries);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
			
		}else if(ussdStatus==3||ussdStatus==4||ussdStatus==5){
			sendUssl.setHeight(360);
			sendUssl.setWidth(580);
			
			save.setVisible(true);
			sendNow.setVisible(true);
			cancel.setVisible(false);
			clear.setVisible(false);
			
			content.setVisible(true);
			ussdParamAll.setDisabled(false);
			ussdParam.setVisible(true);
			ussdResult.setVisible(true);
			ussdTime.setVisible(true);
			resultTime.setVisible(true);
			curFailRetries.setVisible(true);
			maxFailRetries.setVisible(true);
			
			content.setReadOnly(false);
			content.setFieldStyle("background:#FFFFFF");
			maxFailRetries2.setDisabled(false);
			maxFailRetries.setDisabled(false);
			
			content.setValue(ussdContent);
			_ussdResult=rs.smsUssdCallResult(_ussdResult);
			ussdResult.setValue(_ussdResult);
			ussdTime.setValue(_ussdTime);
			resultTime.setValue(_resultTime);
			curFailRetries.setValue(_curFailRetries);
			if(_maxFailRetries==255){
				maxFailRetries2.setValue(_maxFailRetries);
			}else{
				maxFailRetries.setValue(_maxFailRetries);
			}
		}else{
			if(this.simcard==1){
				sendUssl.setHeight(300);
				sendUssl.setWidth(550);
				
				save.setVisible(true);
				sendNow.setVisible(true);
				cancel.setVisible(false);
				clear.setVisible(false);
				
				content.setVisible(true);
				ussdParamAll.setDisabled(false);
				ussdParam.setVisible(true);
				ussdResult.setVisible(false);
				ussdTime.setVisible(false);
				resultTime.setVisible(false);
				curFailRetries.setVisible(true);
				maxFailRetries.setVisible(true);
				
				content.setReadOnly(false);
				content.setFieldStyle("background:#FFFFFF");
				maxFailRetries2.setDisabled(false);
				maxFailRetries.setDisabled(false);
				
				if(isSendBtn==0){
					content.setValue(ussdContent);
					curFailRetries.setValue(_curFailRetries);
					if(_maxFailRetries==255){
						maxFailRetries2.setValue(_maxFailRetries);
					}else{
						maxFailRetries.setValue(_maxFailRetries);
					}
					
				}
			}
		}
		return sendUssl;
}
	
});
