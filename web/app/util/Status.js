Ext.define('app.util.Status',{
	adminStatus: function(adminStatus){
		return lanControll.getEnumValue("adminStatus",adminStatus);
	},
	runStatus: function(runStatus){
		return lanControll.getEnumValue("runStatus",runStatus);
	},
	
	oprStatus: function(oprStatus){
		return lanControll.getEnumValue("oprStatus",oprStatus);
	},
	workStatus: function(workStatus){
		return lanControll.getEnumValue("workStatus",workStatus);
	},
	modStatus: function(modStatus){
		return lanControll.getEnumValue("modStatus",modStatus);
	},
	workType: function(workType){
		return lanControll.getEnumValue("workType",workType);
	},
	modType: function(modType){
		return lanControll.getEnumValue("modType",modType);
	},
	defaultEncode: function(val){
		return lanControll.getEnumValue("defaultEncode",val);
	},
	userType: function(userType){
		return lanControll.getEnumValue("userType",userType);
	},
	switchReason: function(reason){
		return lanControll.getEnumValue("switchReason",reason);
	},
	callDirection: function(dir){
		return lanControll.getEnumValue("callDirection",dir);
	},
	cdrFlag: function(res){
		return lanControll.getEnumValue("cdrFlag",res);
	},
	callStatus: function(res){
		return lanControll.getEnumValue("callStatus",res);
	},
	smsDirection: function(dir){
		return lanControll.getEnumValue("smsDirection",dir);
	},
	
	smsStatus: function(res){
		return lanControll.getEnumValue("smsStatus",res);
	},
	smsEncode: function(res){
		return lanControll.getEnumValue("smsEncode",res);
	},
	ussdDirection: function(dir){
		return lanControll.getEnumValue("ussdDirection",dir);
	},
	ussdStatus: function(res){
		return lanControll.getEnumValue("ussdStatus",res);
	},
	smsUssdCallResult: function(res){
		return lanControll.getEnumValue("smsUssdCallResult",res);
	},
	ussdParam: function(dir){
		return lanControll.getEnumValue("ussdParam",dir);
	},
	upgradeFlag: function(flag){
		return lanControll.getEnumValue("upgradeFlag",flag);
	},
	lastUpgradeResult: function(flag){
		return lanControll.getEnumValue("lastUpgradeResult",flag);
	},
	lockStatus: function(val){
		return lanControll.getEnumValue("lockStatus",val);
	},
	natMode: function(val){
		return lanControll.getEnumValue("natMode",val);
	},
	natStatus: function(val){
		return lanControll.getEnumValue("natStatus",val);
	},
	primaryStatus: function(val){
		return lanControll.getEnumValue("primaryStatus",val);
	},
	lastFail: function(val){
		return lanControll.getEnumValue("lastFail",val);
	},
	linkMode: function(val){
		return lanControll.getEnumValue("linkMode",val);
	},
	msgCode: function(val){
		return lanControll.getEnumValue("msgCode",val);
	},
	mark: function(val){
		return lanControll.getEnumValue("mark",val);
	},
	dmNumAction: function(val){
		return lanControll.getEnumValue("dmNumAction",val);
	},
	tranSecond:function(sec){		
		var day=parseInt(sec/(24*60*60));
		var hour_temp=parseInt(sec-day*24*60*60);
		var hour=parseInt(hour_temp/(60*60));		
		var min_temp=parseInt(sec-day*24*60*60-hour*60*60);
		var min=parseInt(min_temp/60);
		var second=parseInt(sec-day*24*60*60-hour*60*60-min*60);
		var days = lanControll.getLanValue("days");
		var hours = lanControll.getLanValue("hours");
		var mins = lanControll.getLanValue("mins");
		var secs = lanControll.getLanValue("secs");
		return day+" "+days+" "+hour+" "+hours+" "+min+" "+mins+" "+second+" "+secs;
	},
	tranSecondMin:function(sec,runStatus){
		var temp="";
		if(runStatus==6 || runStatus==9){
			temp="-";
		}else{
			var day=parseInt(sec/(24*60*60));
			var hour_temp=parseInt(sec-day*24*60*60);
			var hour=parseInt(hour_temp/(60*60));
			
			var min_temp=parseInt(sec-day*24*60*60-hour*60*60);
			var min=parseInt(min_temp/60);
			var second=parseInt(sec-day*24*60*60-hour*60*60-min*60);
			var days = lanControll.getLanValue("daysSpec");
			var hours = lanControll.getLanValue("hoursSpec");
			var mins = lanControll.getLanValue("minsSpec");
			var secs = lanControll.getLanValue("secsSpec");
//			console.log("sec:"+sec+",day:"+day+",hour:"+hour+",min:"+min+",second:"+second);
			if(day>0){
				temp=day+" "+days+" "+hour+" "+hours+" "+min+" "+mins+" "+second+" "+secs;
			}else if(day==0&& hour>0){
				temp=hour+" "+hours+" "+min+" "+mins+" "+ second+" "+secs;
			}else if(day==0&& hour==0 && min>0){
				temp=min+" "+mins+" "+ second+" "+secs;
			}else if(day==0 && hour==0 && min==0 && second>0){
				temp=second+" "+secs;
			}else{
				temp='-';
			}
		}
		return temp;
	},
	tranPriority:function(p){
		return lanControll.getEnumValue("tranPriority",p);
	},
	domainType: function(type){
		return lanControll.getEnumValue("domainType",type);
	},
	upgradeType: function(type){
		return lanControll.getEnumValue("upgradeType",type);
	},	
	vendor: function(type){
		return lanControll.getEnumValue("vendor",type);
	},	
	producttype: function(type){
		return lanControll.getEnumValue("producttype",type);
	},
	paidStatus: function(type){
		return lanControll.getEnumValue("paidStatus",type);
	},
	hbmWorkMode: function(type){
		return lanControll.getEnumValue("hbmWorkMode",type);
	},
	defaultFlag:function(defaultFlag){
		return lanControll.getEnumValue("defaultFlag",defaultFlag);
	},
	paidMode:function(paidMode){
		return lanControll.getEnumValue("paidMode",paidMode);
	},
	connectFlag:function(val){
		return lanControll.getEnumValue("connectFlag",val);
	},
	yesOrNo:function(val){
		return lanControll.getEnumValue("yesOrNo",val);
	},
	enableOrDisable:function(val){
		return lanControll.getEnumValue("enableOrDisable",val);
	},
	
	testToneMode:function(val){
		return lanControll.getEnumValue("testToneMode",val);
	},
	sysLogDebugLevel:function(val){
		if(val<0){
			val = -val;
			val = "",val
		}
		return lanControll.getEnumValue("sysLogDebugLevel",val);
	},
	sysLogStatus:function(val){
		return lanControll.getEnumValue("sysLogStatus",val);
	},
	
	agpWorkState:function(val){
		return lanControll.getEnumValue("agpWorkState",val);
	},
	agpWorkMode:function(val){
		return lanControll.getEnumValue("agpWorkMode",val);
	},
	agpModType:function(val){
		return lanControll.getEnumValue("agpModType",val);
	},
	tgpWorkState:function(val){
		return lanControll.getEnumValue("tgpWorkState",val);
	},
	tgpModType:function(val){
		return lanControll.getEnumValue("tgpModType",val);
	},
	signalType:function(val){
		return lanControll.getEnumValue("signalType",val);
	},
	alarmFlag:function(val){
		return lanControll.getEnumValue("alarmFlag",val);
	},
	alarmType:function(val){
		return lanControll.getEnumValue("alarmType",val);
	},
	cleanFlag:function(val){
		return lanControll.getEnumValue("cleanFlag",val);
	},
	alarmLevel:function(val){
		return lanControll.getEnumValue("alarmLevel",val);
	},
	lowBalanceFlag:function(val){
		return lanControll.getEnumValue("lowBalanceFlag",val);
	},
	simRechargedFlag:function(val){
		return lanControll.getEnumValue("simRechargedFlag",val);
	},
	sipsrvLockFlag:function(val){
		return lanControll.getEnumValue("sipsrvLockFlag",val);
	},
	promotionStatus:function(val){
		return lanControll.getEnumValue("promotionStatus",val);
	},
	userTaskType:function(val){
		return lanControll.getEnumValue("userTaskType",val);
	},
	userTaskId:function(val){
		return lanControll.getEnumValue("userTaskId",val);
	},
	getOperate:function(val){
		return lanControll.getEnumValue("getOperate",val);
	},
	batchSet:function(val){
		return lanControll.getEnumValue("batchSet",val);
	},
	execResult:function(val){
		return lanControll.getEnumValue("execResult",val);
	},
	
	licenseStatus:function(val){
		return lanControll.getEnumValue("licenseStatus",val);
	},
	
	serverMode:function(val){
		return lanControll.getEnumValue("serverMode",val);
	},
	
	licenseType:function(val){
		return lanControll.getEnumValue("licenseType",val);
	},
	hangupSide:function(val){
		return lanControll.getEnumValue("hangupSide",val);
	},
	endReason:function(val){
		return lanControll.getEnumValue("endReason",val);
	},
	
	//module:bkp,gwp,sim
	runStatusImg:function(runStatus){
		var temp = "";
		if(runStatus==1){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/init_s.png" />';
		}else if(runStatus==2){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/auth_s.png" />';
		}else if(runStatus==3){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/active_s.png" />';
		}else if(runStatus==4){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/fault_s.png" />';
		}else if(runStatus==5){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/empty_s.png" />';
		}else if(runStatus==6){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/comm_fail_s.png" />';
		}else if(runStatus==7){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/mismatch_s.png" />';
		}else if(runStatus==8){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/facility_fault_s.png" />';
		}else if(runStatus==9){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/disabled_s.png" />';
		}else if(runStatus==10){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/idle_s.png" />';
		}else if(runStatus==11){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/busy_s.png" />';
		}else if(runStatus==12){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/locked_s.png" />';
		}else if(runStatus==13){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/elegant_stop_s.png" />';
		}else if(runStatus==14){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/testing_s.png" />';
		}else if(runStatus==15){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/ready_s.png" />';
		}else if(runStatus==16){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/stopped_s.png" />';
		}else if(runStatus==17){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/no_balance_s.png" />';
		}else if(runStatus==18){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/offline_s.png" />';
		}else if(runStatus==19){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/init_s.png" />';
		}else if(runStatus==20){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/low_balance_s.png" />';
		}else if(runStatus==21){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/disabled_s.png" />';
		}else if(runStatus==22){
			temp='<img src="'+Ext.get('resources').value+'/images/runstatus_s/null_s.png" />';
		}
		temp = temp+lanControll.getEnumValue("runStatus",runStatus);
		return temp;
	},
	encryptType:function(val){
		return lanControll.getEnumValue("encryptType",val);
	},
	activateType:function(val){
		return lanControll.getEnumValue("activateType",val);
	},
	getDate:function(strDate) {
	    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
	    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
	    return date;
	},
	//return string
	timeFormat:function(value){
		var valueD = this.getDate(value);
		var da = new Date(valueD);
		var off = valueD.getTimezoneOffset()
		da.setHours(da.getHours()-off/60)
		var va = Ext.Date.format(da,"Y-m-d H:i:s");
 		return va;

	},
	//return string
	timeFormat1:function(value,format){
		var valueD = this.getDate(value);
		var da = new Date(valueD);
		var off = valueD.getTimezoneOffset()
		da.setHours(da.getHours()-off/60)
		var va = Ext.Date.format(da,format);
 		return va;

	},
	dateFormat:function(value,format){
		var da = new Date(value);
		var off = da.getTimezoneOffset()
		da.setHours(da.getHours()-off/60)
		var va = Ext.Date.format(da,format);
 		return va;
	},
	createFuzzySearch:function(){
		var p=Ext.create("Ext.panel.Panel",{
			 itemId:'searchNorth',
			 region:'north',
			 border:false,
			 items:[{
					xtype: 'trigger',
					triggerCls: 'x-form-search-trigger',
					name:'fuzzySearch',
					margin:'5 0 3 3',
					onTriggerClick: function () {
				 		this.up('panel').up('panel').down('button[itemId=search]').handler();
					},
					width:280,
					emptyText:'search',
					enableKeyEvents: true,
					listeners: {
						keyup: {
							fn: function (field, e) {
								if (Ext.EventObject.ENTER == e.getKey()) {
									this.up('panel').up('panel').down('button[itemId=search]').handler();
								}
							}
						},
					}
					}]
		 });
		return p;
	},
	createFuzzySearch2:function(){
		var p=Ext.create("Ext.panel.Panel",{
			 itemId:'searchNorth',
			 region:'north',
			 border:false,
			 layout:'hbox',
			 items:[{
					xtype: 'trigger',
					triggerCls: 'x-form-search-trigger',
					name:'fuzzySearch',
					margin:'5 0 3 3',
					onTriggerClick: function () {
				 		this.up('panel').up('panel').down('button[itemId=search]').handler();
					},
					width:280,
					emptyText:'search',
					enableKeyEvents: true,
					listeners: {
						keyup: {
							fn: function (field, e) {
								if (Ext.EventObject.ENTER == e.getKey()) {
									this.up('panel').up('panel').down('button[itemId=search]').handler();
								}
							}
						},
					}
					},{
						xtype:'displayfield',
						name:'display',
						margin:'5 0 5 150',
						height:20,
						value:'  '
					}]
		 });
		return p;
	},
	dateSearchFormat:function(value,format,add){
	
		if(add=='begin'){
			value=value+" 00:00:00";
		}else if(add=='end'){
			value=value+" 23:59:59";
		}
		var da = new Date(value);
		var off = da.getTimezoneOffset()
		da.setHours(da.getHours()+off/60)
		var va = Ext.Date.format(da,format);
 		return va;
	},
	trimStr:function(val){
		var temp="";
		if(val==null){
			temp="";
		}else{
			temp=val.substr(0,val.length-1);
		}
		return temp;
	},
	//return date
	timeStrToDate:function(value){
		var valueD = this.getDate(value);
		var da = new Date(valueD);
		var off = valueD.getTimezoneOffset()
		da.setHours(da.getHours()-off/60)
 		return da;

	},
	versionStatus:function(val){
		return lanControll.getEnumValue("versionStatus",val);
	},
	signType:function(val){
		return lanControll.getEnumValue("signType",val);
	},
	licPaidStatus:function(val){
		return lanControll.getEnumValue("licPaidStatus",val);
	},
	licPaidType:function(val){
		return lanControll.getEnumValue("licPaidType",val);
	},
	getPrivilegeImg:function(value){
		if(value)
			return "<img src='"+Ext.get('resources').value+"/images/accept.png'>";
		else
			return "<img src='"+Ext.get('resources').value+"/images/cancel.png'>";
	},

	min15:function(val){
		var ret = lanControll.getEnumValue("min15",val);
		return ret;
	},
	hour24:function(val){
		return lanControll.getEnumValue("hour24",val);
	},

	sipRegFlag:function(val){
		return lanControll.getEnumValue("sipRegFlag",val);
	},
	sipCallMode:function(val){
		return lanControll.getEnumValue("sipCallMode",val);
	},
	priWorkStatus :function(val){
		return lanControll.getEnumValue("priWorkStatus",val);
	},
	ss7Type :function(val){
		return lanControll.getEnumValue("ss7Type",val);
	},
	ss7Mode :function(val){
		return lanControll.getEnumValue("ss7Mode",val);
	},
	ss7WorkStatus :function(val){
		return lanControll.getEnumValue("ss7WorkStatus",val);
	},
	dspPcmLaw:function(val){
		return lanControll.getEnumValue("dspPcmLaw",val);
	},
	dspWorkStatus :function(val){
		return lanControll.getEnumValue("dspWorkStatus",val);
	},

	ethWorkState :function(val){
		return lanControll.getEnumValue("ethWorkState",val);
	},
	ethSpeed :function(val){
		return lanControll.getEnumValue("ethSpeed",val);
	},
	ethMode :function(val){
		return lanControll.getEnumValue("ethMode",val);
	},
	ntpStatus :function(val){
		return lanControll.getEnumValue("ntpStatus",val);
	},
	autoRebootFlag :function(val){
		return lanControll.getEnumValue("autoRebootFlag",val);
	},
	timeChipStatus :function(val){
		return lanControll.getEnumValue("timeChipStatus",val);
	},
	switchChipStatus :function(val){
		return lanControll.getEnumValue("switchChipStatus",val);
	},
	portType:function(val){
		return lanControll.getEnumValue("portType",val);
	},
	confirmFlag:function(val){
		var temp = "";
		if(val==1){
			temp=val;
		}else{
			temp='else';
		}
		return lanControll.getEnumValue("confirmFlag",temp);
	},
	tgpPcmMode:function(val){
		return lanControll.getEnumValue("tgpPcmMode",val);
	},
	tgpFrameMode:function(val){
		return lanControll.getEnumValue("tgpFrameMode",val);
	},
	tgpLineCode:function(val){
		return lanControll.getEnumValue("tgpLineCode",val);
	},
	tgpLineBuiltOut:function(val){
		return lanControll.getEnumValue("tgpLineBuiltOut",val);
	},
	tgpClockSrc:function(val){
		return lanControll.getEnumValue("tgpClockSrc",val);
	},
	priProto:function(val){
		return lanControll.getEnumValue("priProto",val);
	},
	priSwside:function(val){
		return lanControll.getEnumValue("priSwside",val);
	},
	priAlertIndi:function(val){
		return lanControll.getEnumValue("priAlertIndi",val);
	},
	sipTransProto:function(val){
		return lanControll.getEnumValue("sipTransProto",val);
	},
	sipAuthType:function(val){
		return lanControll.getEnumValue("sipAuthType",val);
	},
	sipSipT:function(val){
		return lanControll.getEnumValue("sipSipT",val);
	},
	sipLinkStatus:function(val){
		return lanControll.getEnumValue("sipLinkStatus",val);
	},
	sipDetectTrunk:function(val){
		return lanControll.getEnumValue("sipDetectTrunk",val);
	},
	ss7Proto:function(val){
		return lanControll.getEnumValue("ss7Proto",val);
	},
	ss7NetIndi:function(val){
		return lanControll.getEnumValue("ss7NetIndi",val);
	},
	ss7LinkStatus:function(val){
		return lanControll.getEnumValue("ss7LinkStatus",val);
	},
	ss7SendSltm:function(val){
		return lanControll.getEnumValue("ss7SendSltm",val);
	},
	gsmCode:function(val){
		return lanControll.getEnumValue("gsmCode",val);
	},
	slaveType:function(val){
		return lanControll.getEnumValue("slaveType",val);
	},
	simCloudMode:function(val){
		if(val==undefined || val==null){
			val=Ext.get('productId').value;
		}
		return lanControll.getEnumValue("simCloudMode",val);
	},
	dmCloudMode:function(val){
		if(val==undefined || val==null){
			val=Ext.get('productId').value;
		}
		console.log(val);
		return lanControll.getEnumValue("dmCloudMode",val);
	},
	serverType:function(val){
		return lanControll.getEnumValue("serverMode",val);
	},
	domainProductType:function(val){
		var temp="";
		if(val==0){
			temp="SIM Cloud";
		}else if(val==1){
			temp="DM Cloud";
		}else{
			temp=val;
		}
		return temp;
	},
	dateTimeFormat:function(value,format,haveOffset){
		if(value!=""&&value!=null){
			value=value+"Z";
			var d=new Date(value);
			var localtime = d.getTime();
			var localOffset=d.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数 
			//var utc = localtime + localOffset; //utc即GMT时间 
			var offset =-d.getTimezoneOffset() / 60; //获取时区
			//var ddd = utc + (3600000*offset);
			var ddd=localtime + localOffset+ (3600000*offset);
			var nd = new Date(ddd);
			if(!format){
				format="Y-m-d H:i:s";
			}
			if(haveOffset){
				return (Ext.util.Format.date(nd, format)+"+"+offset);	
			}else{
				return (Ext.util.Format.date(nd, format));
			}
			
		}else{
			return "";
		}
	},
	hbmRoleType:function(val){
		return lanControll.getEnumValue("hbmRoleType",val);
	},
	mailResult:function(val){
		return lanControll.getEnumValue("mailResult",val);
	},
	hbmImeiFlag:function(val){
		var temp=val;
		if(val==0){
			temp=lanControll.getLanValue("nall");
		}else if(val==1){
			temp=lanControll.getLanValue("eachLoad");
		}else if(val==2){
			temp=lanControll.getLanValue("eachBind");
		}
		return temp;
	},
	localSysMode:function(val){
		if(val==undefined || val==null){
			val=Ext.get('sysMode').value;
		}
		var temp = "";
		if(val==1){
			temp=val;
		}else{
			temp="else";
		}
		return lanControll.getEnumValue("localSysMode",temp);
	},
	dnsSysMode:function(val){
		if(val==undefined || val==null){
			val=Ext.get('sysMode').value;
		}
		var temp = false;
		if(val==11){
			temp=true;
		}else{
			temp=false;
		}
		return temp;
	},
	isDCServer:function(val){
		if(val==undefined || val==null){
			return false;
		}else if(val==62){
			return true;
		}
	},
	isDRServer:function(val){
		if(val==undefined || val==null){
			return false;
		}else if(val==61){
			return true;
		}
	},
	isSIMServer:function(val){
		if(val==undefined || val==null){
			return false;
		}else if(val==32){
			return true;
		}
	},
	sigToUnsig:function(val){
		if(val<0){
			val=val>>>0;
		}
		return val;
	},
	createPriority:function(){
		var combo = Ext.create('Ext.form.field.ComboBox',{
			name : 'priority',
			xtype : 'combo',
			mode : 'local',
			editable:false,
			fieldLabel : 'Priority',
			displayField : 'name',
			valueField : 'priorityId',
			queryMode : 'local',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'priorityId' ],
				data : [ {
					name : lanControll.getEnumValue("tranPriority",0),
					priorityId : 0
				},{ 
					name : lanControll.getEnumValue("tranPriority",1),
					priorityId : 1
				}, {
					name : lanControll.getEnumValue("tranPriority",2),
					priorityId : 2
				}, {
					name : lanControll.getEnumValue("tranPriority",3),
					priorityId : 3
				}, {
					name : lanControll.getEnumValue("tranPriority",4),
					priorityId : 4
				} ]
			}),
			value:2
		});
		return combo;
	},
	createSysLockedFlag:function(sizeObj){
		var combo = Ext.create('Ext.form.field.ComboBox',{	         
            name: 'sysLockedFlag',
	        xtype: 'combo',
	        fieldLabel: 'Server Locked Flag',
			mode : 'local',
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable:false,
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'value' ],
				data : [{
					name : lanControll.getEnumValue("yesOrNo",1),
					value : 1
				}, {
					name : lanControll.getEnumValue("yesOrNo",0),
					value : 0
				}  ]
			}),
			value:0
            
        });
		if(sizeObj && sizeObj.labelWidth){
			combo.labelWidth = sizeObj.labelWidth;
		}
		return combo;
	},
	createYesOrNoFlag:function(name,label,sizeObj){
		var combo = Ext.create('Ext.form.field.ComboBox',{	         
			name: name,
			xtype: 'combo',
			fieldLabel: label,
			mode : 'local',
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable:false,
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'value' ],
				data : [{
					name : '-SELECT-',
					value :-1
				},{
					name : lanControll.getEnumValue("yesOrNo",1),
					value : 1
				}, {
					name : lanControll.getEnumValue("yesOrNo",0),
					value : 0
				}  ]
			}),
			value:-1
			
		});
		if(sizeObj && sizeObj.labelWidth){
			combo.labelWidth = sizeObj.labelWidth;
		}
		if(sizeObj && sizeObj.width){
			combo.width = sizeObj.width;
		}
		return combo;
	},
	createSipLockedFlag:function(ulan,sizeObj){
		var combo = Ext.create('Ext.form.field.ComboBox',{	         
            name: 'sipsrvLockFlag',
	        xtype: 'combo',
	        ulan:ulan,
	        fieldLabel: 'SIP Server Lock',
			mode : 'local',
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable:false,
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'value' ],
				data : [
				{name : '-SELECT-',   value: -1},{
					name : lanControll.getEnumValue("sipsrvLockFlag",1),
					value : 1
				}, {
					name : lanControll.getEnumValue("sipsrvLockFlag",0),
					value : 0
				}  ]
			}),
			value:-1,
			listeners:{
				change:function(field,newValue,oldValue,opts){
	    			if(newValue == 0){
	        			this.up('form').getForm().findField('primarySipServer').setDisabled(true);
	        			this.up('form').getForm().findField('primarySipsrvPort').setDisabled(true);
	        			this.up('form').getForm().findField('secondarySipServer').setDisabled(true);
	        			this.up('form').getForm().findField('secondarySipsrvPort').setDisabled(true);
	    			}else{
	        			this.up('form').getForm().findField('primarySipServer').setDisabled(false);
	        			this.up('form').getForm().findField('primarySipsrvPort').setDisabled(false);
	        			this.up('form').getForm().findField('secondarySipServer').setDisabled(false);
	        			this.up('form').getForm().findField('secondarySipsrvPort').setDisabled(false);
	    			}
				}
			}
        });
		if(sizeObj && sizeObj.labelWidth){
			combo.labelWidth = sizeObj.labelWidth;
		}
		return combo;
	},
	createRunStatus:function(length,valueList){
		function createObj(obj,name,value){
			obj[name] = value;
		}
		function createData(length,valueList){
			var data = [];
			if(length){
				for(var i=0;i<length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('runStatus',i));
					createObj(obj,'statusId',i);
					data.push(obj);
				}
			}else if(valueList){
				for(var i=0;i<valueList.length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('runStatus',valueList[i]));
					createObj(obj,'statusId',valueList[i]);
					data.push(obj);
				}
			}
			return data;
		}
		var data=createData(length,valueList);
		var value = 0;
		if(valueList){
			value = valueList[0];
		}
		var combo = Ext.create('Ext.form.field.ComboBox',{
            xtype: 'combo',
            name: 'runStatus',
            fieldLabel: 'Run Status',
			mode : 'local',
			editable:false,
			displayField : 'name',
			valueField : 'statusId',
			queryMode : 'local',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : data
			}),
			value:value
        });
		return combo;
	},
	createAdminStatus:function(length,valueList,sizeObj){
		function createObj(obj,name,value){
			obj[name] = value;
		}
		function createData(length,valueList){
			var data = [];
			if(length){
				for(var i=0;i<length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('adminStatus',i));
					createObj(obj,'statusId',i);
					data.push(obj);
				}
			}else if(valueList){
				for(var i=0;i<valueList.length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('adminStatus',valueList[i]));
					createObj(obj,'statusId',valueList[i]);
					data.push(obj);
				}
			}
			return data;
		}
		var data=createData(length,valueList);
		var value = 0;
		if(valueList){
			value = valueList[0];
		}
		var combo = Ext.create('Ext.form.field.ComboBox',{
            xtype: 'combo',
            name: 'adminStatus',
            fieldLabel: 'Admin Status',
			mode : 'local',
			editable:false,
//			labelWidth: 180,
//			width:280,
			displayField : 'name',
			valueField : 'statusId',
			queryMode : 'local',
			valueNotFoundText:'',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : data
			}),
			value:value
        });
		if(sizeObj){
			if(sizeObj.labelWidth)
			combo.labelWidth = sizeObj.labelWidth;
			if(sizeObj.labelAlign)
				combo.labelAlign = sizeObj.labelAlign;
			if(sizeObj.width)
			combo.width = sizeObj.width;
		}
		return combo;
	},
	createCombo:function(param){
		function createObj(obj,name,value){
			obj[name] = value;
		}
		function createData(length,valueList,prefix){
			var data = [];
			if(length){
				for(var i=0;i<length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue(prefix,i));
					createObj(obj,'statusId',i);
					data.push(obj);
				}
			}else if(valueList){
				for(var i=0;i<valueList.length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue(prefix,valueList[i]));
					createObj(obj,'statusId',valueList[i]);
					data.push(obj);
				}
			}
			return data;
		}
		var length = param.length;
		var valueList = param.valueList;
		var prefix = param.prefix;
		var data=createData(length,valueList,prefix);
		var combo = Ext.create('Ext.form.field.ComboBox',{
            xtype: 'combo',
            name: prefix,
            fieldLabel: lanControll.getLanValue(param.ulan?param.ulan:prefix),
			mode : 'local',
			editable:false,
//			labelWidth: 180,
//			width:280,
			displayField : 'name',
			valueField : 'statusId',
			queryMode : 'local',
			valueNotFoundText:'',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : data
			}),
			value:param.value
        });
		if(param.labelWidth)
			combo.labelWidth = param.labelWidth;
			if(param.labelAlign)
				combo.labelAlign = param.labelAlign;
			if(param.width)
			combo.width = param.width;
		return combo;
	},
	createUpgradeType:function(length,valueList,sizeObj){
		function createObj(obj,name,value){
			obj[name] = value;
		}
		function createData(length,valueList){
			var data = [];
			if(length){
				for(var i=0;i<length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('upgradeType',i));
					createObj(obj,'statusId',i);
					data.push(obj);
				}
			}else if(valueList){
				for(var i=0;i<valueList.length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('upgradeType',valueList[i]));
					createObj(obj,'statusId',valueList[i]);
					data.push(obj);
				}
			}
			return data;
		}
		var data=createData(length,valueList);
		var combo = Ext.create('Ext.form.field.ComboBox',{
            xtype: 'combo',
            name: 'upgradeType',
            fieldLabel: 'Upgrade Type',
			mode : 'local',
			editable:false,
			displayField : 'name',
			valueField : 'statusId',
			queryMode : 'local',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : data
			}),
        });
		if(sizeObj){
			if(sizeObj.labelWidth)
			combo.labelWidth = sizeObj.labelWidth;
			if(sizeObj.width)
			combo.width = sizeObj.width;
		}
		return combo;
	},
	createUpgradeStatus:function(length,valueList,sizeObj){
		function createObj(obj,name,value){
			obj[name] = value;
		}
		function createData(length,valueList){
			var data = [];
			if(length){
				for(var i=0;i<length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('upgradeFlag',i));
					createObj(obj,'statusId',i);
					data.push(obj);
				}
			}else if(valueList){
				for(var i=0;i<valueList.length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('upgradeFlag',valueList[i]));
					createObj(obj,'statusId',valueList[i]);
					data.push(obj);
				}
			}
			return data;
		}
		var data=createData(length,valueList);
		var combo = Ext.create('Ext.form.field.ComboBox',{
			xtype: 'combo',
			name: 'upgradeStatus',
			fieldLabel: 'Upgrade Status',
			mode : 'local',
			editable:false,
			displayField : 'name',
			valueField : 'statusId',
			queryMode : 'local',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : data
			}),
		});
		if(sizeObj){
			if(sizeObj.labelWidth)
				combo.labelWidth = sizeObj.labelWidth;
			if(sizeObj.width)
				combo.width = sizeObj.width;
		}
		return combo;
	},
	createNumType:function(length,valueList,sizeObj){
		function createObj(obj,name,value){
			obj[name] = value;
		}
		function createData(length,valueList){
			var data = [];
			if(length){
				for(var i=0;i<length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('num',i));
					createObj(obj,'statusId',i);
					data.push(obj);
				}
			}else if(valueList){
				for(var i=0;i<valueList.length;i++){
					var obj = {};
					createObj(obj,'name',lanControll.getEnumValue('num',valueList[i]));
					createObj(obj,'statusId',valueList[i]);
					data.push(obj);
				}
			}
			return data;
		}
		var data=createData(length,valueList);
		var combo = Ext.create('Ext.form.field.ComboBox',{
			name : 'type',
			xtype: 'combo',
			mode: 'local',
			fieldLabel: 'Type',
			displayField: 'name',
			valueField: 'statusId',
			queryMode: 'local',
			editable:false,
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : data
			}),
			value:0,				
		});
		if(sizeObj){
			if(sizeObj.labelWidth)
				combo.labelWidth = sizeObj.labelWidth;
			if(sizeObj.width)
				combo.width = sizeObj.width;
		}
		return combo;
	},
	getValue:function(name,value){
		return lanControll.getEnumValue(name,value);
	},
	getMap:function(){//初始化map_，给map_对象增加方法，使map_像个Map  
	    var map_=new Object();  
	    //属性加个特殊字符，以区别方法名，统一加下划线_  
	    map_.put=function(key,value){    map_[key]=value;}   
	    map_.get=function(key){    return map_[key];}  
	    map_.remove=function(key){    delete map_[key];}      
	    map_.keyset=function(){  
	        var ret="";  
	        for(var p in map_){      
	            if(typeof p =='string' && p.substring(p.length-1)=="_"){   
	                ret+=",";  
	                ret+=p;  
	            }  
	        }             
	        if(ret==""){  
	            return ret.split(","); //empty array  
	        }else{  
	            return ret.substring(1).split(",");   
	        }  
	    }     
	    return map_;  
	},
	getIcon:function(color,content,border){
		removeCSSRule(styleSheet,'.icon_'+color+'::before');
		var _border=border;
		var _size=15;
		if(color=='white'){
			_border='1px solid black';
			_size=13;
		}else if(!border){
			_border='0';
			_size=15;
		}
		var obj = {width:_size,height:_size,lineHeight:_size,color:Color.getValue(color)
				,textAlign:'center',content:'',border:_border};
		setPseudo3(styleSheet,'.icon_'+color+'::before',obj);
		var tmp = '<span class=icon_'+color+'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;'+content;
		
		return tmp;
	},
	apiKey:function(val){
		var temp = "9db5870542fc1cf77d47dd35407a223e";
		
		var obj=new Array('9db5870542fc1cf77d47dd35407a223e',
				           '766b9ceed2c394622f3a3d72582d7d53',
				           '04628dc123e108e06f9f8d7efa80760d',
				           'a55b440a30ab118e4e09bcddb53525b3',
				           '5bcd1d6770bc56a743ec98f732033e86',
				           'd0abdf5e6d319ae151742c6ad86ae499',
				           '8a09d9cace8205726504906cbb95d41a',
				           'ae44e632463fce371830e9e2d1994299',
				           '93ecea8031b92226faccdf2e84d212c5',
				           '507a7fe3db2a4da3d3636b16469fd330',
				           '29be08eee0fe35c62f6fe9b9ef81d6b0',
				           '0069f42e616a61a22d22f962062435dd',
				           '1c9d46dbf7ead0f613b7eeac21d45439',
				           'dfd582d061f6293a2c1235bdd017e722',
				           '5af2a000dfb33f779a0913647143a854'
		);
		var m=Math.random();
		m=Math.floor(m*(obj.length));
		temp=obj[m];
		return temp;
	},
});
