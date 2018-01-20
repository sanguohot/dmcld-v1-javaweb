function getInfoByName(name,value1){
	var temp='tips';
	if(name=='grp_hbmPromDayMax'){
		temp=lanControll.getLanValue("zeroIsNoLimit");
	}else if(name=='grp_keys'){
		temp=lanControll.getLanValue("hbmPromCfmTips");
	}else if(name=='grp_hbmImeiFlag'){
		var vendId=Ext.get('vendorId').value;
		var vendor="";
		if(vendId=="2"){
			vendor=vendId;
		}else{
			vendor="other";
		}
		temp = lanControll.getLanValue("hbmImeiFlagTips_"+vendor);
		
	}else if(name=='grp_max_work_sim_count'){
		temp=lanControll.getLanValue("maxWorkSimCountTips");
	}else if(name=='grp_maxCallDiscardFail'){
		temp=lanControll.getLanValue('maxCallDiscardFailTips');
	}else if(name=='grp_maxSmsDiscardFail'){
		temp=lanControll.getLanValue('maxSmsDiscardFailTips');
	}else if(name=='grp_maxUssdDiscardFail'){
		temp=lanControll.getLanValue('maxUssdDiscardFailTips');
	}else if(name=='grp_hbmRoamingFlag'){
		temp=lanControll.getLanValue('hbmRoamingFlagTips');
	}else if(name=='grp_hbmOnceAfterReg'){
		temp=lanControll.getLanValue('hbmOnceAfterRegTips');
	}else if(name=='grp_hbmAcdFlag'){
		temp=lanControll.getLanValue('hbmAcdFlagTips');
	}else if(name=='grp_lowBalanceLimit'){
		temp=lanControll.getLanValue('lowBalanceLimitTips');
	}else if(name=='grp_maxNoBalanceWait1'){
		temp=lanControll.getLanValue('maxNoBalanceWait1Tips');
	}else if(name=='exp_info'){
		temp=lanControll.getLanValue('validInputTips');
	}else if(name=='gw_port_spec_group'){
		temp = lanControll.getLanValue('gwpSpecGrpTips');
	}else if(name=='gw_port_spec_policy'){
		temp = lanControll.getLanValue('gwpSpecPolicyTips');
	}else if(name=='bk_port_spec_group'){
		temp = lanControll.getLanValue('bkpSpecGrpTips');
	}else if(name=='grp_spec_number'){
		temp = lanControll.getLanValue('hbmSmsSpecNumberTips');
	}else if(name=='sms_from_number'){
		temp = lanControll.getLanValue('multipleNumTips');
	}else if(name=='block_failure_keys'){
		temp = lanControll.getLanValue('hbmBlockedFailTips');
	}else if(name=='low_asr_monitor'){
		temp = lanControll.getLanValue('hbmAcdAsrFlagTips');
	}else if(name=='grp_initBalanceVal'){
		temp = lanControll.getLanValue('initBalanceValTips');
	}else if(name=='dtmf_number'){
		temp = lanControll.getLanValue('dtmfNumberTips');
	}else if(name=='imei_tac'){
		temp = lanControll.getLanValue('hbmImeiTacsTips');
	}else if(name==''){
		if(value1!=''){
			temp=value1;
		}else{
			temp=""	;
		}
	}else if(name=='alarm_push_sms_addr'){
		temp = lanControll.getLanValue('multiplePushNumTips');
	}else if(name=='alarm_push_mail_addr'){
		temp = lanControll.getLanValue('multipleEmailTips');
	}else if(name=='tg_port_map'){
		if(value1){
			temp=value1;
		}
	}else if(name=='ss7_dpc'){
		temp = lanControll.getLanValue('ss7DpcTips');
	}else if(name=='ss7_opc'){
		temp = lanControll.getLanValue('ss7OpcTips');
	}else if(name=='ss7_link0_slc'){
		temp = lanControll.getLanValue('ss7Link0SlcTips');
	}else if(name=='ss7_link1_slc'){
		temp = lanControll.getLanValue('ss7Link1SlcTips');
	}else if(name=='ss7_net_indi'){
		temp = lanControll.getLanValue('ss7NetIndiTips');
	}else if(name=='pri_alert_indi'){
		temp = lanControll.getLanValue('priAlertIndiTips');
	}else if(name=='sip_pstn_grp'){
		temp = lanControll.getLanValue('sipBindGrpTips');
	}else if(name=='sip_trk_status'){
		temp = lanControll.getLanValue('sipTransProtoTips');
	}else if(name=='sip_tran_proto'){
		temp = lanControll.getLanValue('sipDetectTrunkTips');
	}else if(name=='add_sml_number'){
		temp = lanControll.getLanValue('learnNumberTips');
	}else if(name=='grp_hbmSmsCountLimit'){
		temp = lanControll.getLanValue('grp_hbmSmsCountLimit');
	}else if(name=='grp_hbmCallCountLimit'){
		temp = lanControll.getLanValue('grp_hbmCallCountLimit');
	}else if(name=='blackInfectFlagTips'){
		temp = lanControll.getLanValue('blackInfectFlagTips');
	}else if(name=='numberValidLenTips'){
		temp = lanControll.getLanValue('numberValidLenTips');
	}else if(name=='failCallWeight'){
		temp = lanControll.getLanValue('failCallWeightTips');
	}else if(name=='grp_hbmAcdFailWeight'){
		temp = lanControll.getLanValue('hbmAcdFailWeightTips');
	}else if(name=='numberExpireTimeTips'){
		temp = lanControll.getLanValue('numberExpireTimeTips');
	}
	
	return temp;
	
}