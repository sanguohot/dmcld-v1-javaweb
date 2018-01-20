define(function (){
	function changeLan(value){
		//
		setCookie("userLan",value, "one month");
		window.location.reload();
	}
	function initEvent(){
		$("#lancon li a").bind("click",function(){
			var val=$(this).attr("val");
			$("#lant").html('<i class="fa fa-language"></i>&nbsp;'+$(this).html()+' <b class="caret"></b>');
			if(val=="cn"){				
				setCookie("userLan",1, "one month");
				window.location.reload();
			}else{
				setCookie("userLan",2, "one month");
				window.location.reload();
			}
		});
	}
	function getTableList(){
		return [{name:"dev",value:window.lan["dev"]},{name:"domain",value:window.lan["domain"]},{name:"zone",value:window.lan["zone"]}
		,{name:"site",value:window.lan["site"]}];
	}
	function getWordList(tb){
		var ret=[{name:"name",value:window.lan["name"]},{name:"alias",value:window.lan["alias"]},{name:"desc",value:window.lan["desc"]}];
		if(tb==window.lan["dev"]){
			ret=[{name:"alias",value:window.lan["alias"]},{name:"desc",value:window.lan["desc"]}
			,{name:"version",value:window.lan["version"]}
			,{name:"productName",value:window.lan["productName"]}];
		}
		return ret;
	}
	function parseValues(values){
		console.log(values);
		var t=values.split(",");
		var tl=getTableList();
		var ret="";
		for(var i=0;i<t.length;i++){
			if(ret!=""){
				ret=ret+",";
			}
			var tt=t[i].split("*");
			
			
			
			for(var k=0;k<tl.length;k++){
				if(tl[k].value==tt[0]){
					ret+=tl[k].name;
					ret=ret+"*";
					break;
				}
			}
			var wl=getWordList(tt[0]);
			
			for(var j=0;j<wl.length;j++){
				if(wl[j].value==tt[1]){
					ret+=wl[j].name;
					ret=ret+"*";
					break;
				}
			}
			ret+=tt[2];
		}
		
		console.log(ret);
		return ret;
	}
	function initLan(callAfterLan){
		initEvent();
		var c = getCookie("userLan");
		if(!c){
			require(["lan-cn"], function(cn) { 
				window.lan=cn;
				$("#lant").html('<i class="fa fa-language"></i>&nbsp;'+$("#lancn").html()+' <b class="caret"></b>');
				if(callAfterLan) callAfterLan();
			});	
		}else{
			if(c==1){
				require(["lan-cn"], function(cn) { 
					window.lan=cn;
					$("#lant").html('<i class="fa fa-language"></i>&nbsp;'+$("#lancn").html()+' <b class="caret"></b>');
					if(callAfterLan) callAfterLan();
				});
			}else{
				require(["lan-en"], function(en) { 
					window.lan=en;
					$("#lant").html('<i class="fa fa-language"></i>&nbsp;'+$("#lanen").html()+' <b class="caret"></b>');
					if(callAfterLan) callAfterLan();
				});
			}
		}
	}
	function isEn(){
		var c = getCookie("userLan");
		if(!c || c==1){
			return false;
		}
		return true;
	}
	function getValue(name,val){
		var lan=window.lan;
		if(!lan) return;
		var c = getCookie("userLan");
		var str=name;
		if(val!=undefined && val!=null){
			str=str+"_"+val;
		}
		if(lan[str]){
			return lan[str];
		}else if(name && !val){
			return name;
		}else if(c==1){
			return "未知";
		}else{
			return "Unknow";
		}		
	}
	function getResetReason(val){
		if(!val){
			return "-";
		}
		return window.lc.getValue("devResetReason",val);
	}
	function getObjectType(val){
		if(!val || val=="null" || val=="undefined"){
			return "-";
		}
		return getValue("objectType",val);
	}
	function getProductType(productId){
		if(productId==80 || productId==81 || productId==82 || productId==17 || productId==18 || productId==19 || productId==11 || productId==12 || productId==15 || productId==16){
			return "DAG";
		}else if(productId==1 || productId==2 || productId==3 || productId==4 || productId==5 || productId==6 || productId==7 || productId==8){
			return "MTG";
		}
		return productId;
	}
	function getLicDisplayStatus(value){
		if(value==1 || value==2){
			return getValue("licStatus",2);
		}else if(value==3 || value==4){
			return getValue("licStatus",1);
		}else{
			return getValue("licStatus",0);
		}
	}
	function getCookie(name)//取cookies函数
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]); return null;

	}

	function setCookie(name,value, time)//两个参数，一个是cookie的名子，一个是值
	{
		var exp = new Date(); //new Date("December 31, 9998");
		var Days;//cookie 保留的天数
		var month;
		var year;
		if(time == 0)
		{
			Days = 0;
		}
		else if (time=="one day")
		{
			Days = 1;
		}
		else if (time=="one month")
		{
			month = exp.getMonth()+1;
			year =  exp.getFullYear();
			Days = GetDayNum(month,year);
		}
		else if(time=="one year")
		{
			year =  exp.getFullYear();
			if(IsLeapYear(year))
			{
				Days = 366;
			}
			else
			{
				Days = 365;
			}
		}

		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}
	function GetDayNum(month,year)
	{
		if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)
		{
			return 31;
		}
		else if(month==4 || month==6 || month==9 || month==11)
		{
			return 30;
		}
		else if(month == 2)
		{
			if(IsLeapYear(year))
			{
				return 29;
			}
			else
			{
				return 28;
			}
		}
		else
		{
			return 0;
		}
	}

	function IsLeapYear(iYear) 
	{
		if (iYear % 4 == 0 && iYear % 100 != 0)
		{
			return true;
		} 
		else if(iYear % 400 == 0) 
		{
			return true;
		} 
		else 
		{
			return false;
		}
	}
	function changeLocale(){
		if(isEn()){
			$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['en-US']);
		}else{
			$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
		}
	}
	function getRunStatus(name,value){
		if(!value || value=="null" || value=="undefined"){
			value=0;
		}
		var t=window.lc.getValue(name,value);
        var ret=t;
        var cls="";
        if(value==0 || value==9 || value==18 || value==21 || value==6){
      	  cls="label label-danger";
        }else if(value==3 || value==10){
      	  cls="label label-success";
        }else if(value==11){
      	  cls="label label-warning";
        }else{
      	  cls="label label-info";
        }
        ret='<span class="'+cls+'">'+t+'</span>';
        return ret;
	}
	function getTimeZoneList(){
		return [ {
            name : '(GMT -12:00) Eniwetok, Kwajalein',
            uuid : 720
        }, {
            name : '(GMT -11:00) Midway Island, Samoa',
            uuid : 660
        },{
            name : '(GMT -10:00) Hawaii',
            uuid : 600
        },{
            name : '(GMT -9:00) Alaska',
            uuid : 540
        },{
            name : '(GMT -8:00) Pacific Time (US & Canada)',
            uuid : 480
        },{
            name : '(GMT -7:00) Mountain Time (US & Canada)',
            uuid : 420
        },{
            name : '(GMT -6:00) Central Time (US & Canada), Mexico City',
            uuid : 360
        },{
            name : '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
            uuid : 300
        },{
            name : '(GMT -4:30) Caracas',
            uuid : 270
        },{
            name : '(GMT -4:00) Atlantic Time (Canada), La Paz, Santiago',
            uuid : 240
        },{
            name : '(GMT -3:30) Newfoundland',
            uuid : 210
        },{
            name : '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
            uuid : 180
        },{
            name : '(GMT -2:00) Mid-Atlantic',
            uuid : 120
        },{
            name : '(GMT -1:00 ) Azores, Cape Verde Islands',
            uuid : 60
        },{
            name : '(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca',
            uuid : 0
        },{
            name : '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
            uuid :-60
        },{
            name : '(GMT +2:00) Kaliningrad, South Africa, Cairo',
            uuid : -120
        },{
            name : '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
            uuid : -180
        },{
            name : '(GMT +3:30) Tehran',
            uuid : -210
        },{
            name : '(GMT +4:00) Abu Dhabi, Muscat, Yerevan, Baku, Tbilisi',
            uuid : -240
        },{
            name : '(GMT +4:30) Kabul',
            uuid : -270
        },{
            name : '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
            uuid : -300
        },{
            name : '(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi',
            uuid : -330
        },{
            name : '(GMT +5:45) Kathmandu',
            uuid : -345
        },{
            name : '(GMT +6:00) Almaty, Dhaka, Colombo',
            uuid : -360
        },{
            name : '(GMT +6:30) Yangon, Cocos Islands',
            uuid : -390
        },{
            name : '(GMT +7:00) Bangkok, Hanoi, Jakarta',
            uuid : -420
        },{
            name : '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
            uuid : -480
        },{
            name : '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
            uuid : -540
        },{
            name : '(GMT +9:30) Adelaide, Darwin',
            uuid : -570
        },{
            name : '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
            uuid : -600
        },{
            name : '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
            uuid : -660
        },{
            name : '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
            uuid : -720
        }];
	}
	function getTimeZoneText(value){
		if(value==null || value==undefined){
			value=-480;
		}
		var list=getTimeZoneList();
		var name="-";
		for(var i=0;i<list.length;i++){
			var obj=list[i];
			if(obj.uuid==value){
				name=obj.name;
				break;
			}
		}
		return name;
	}
	function getComfirmFlag(value){
        var t=window.lc.getValue("confirmFlag",value);
        var ret=t;
        var cls="";
        if(value==0){
      	  cls="label label-danger";
        }else{
      	  cls="label label-success";
        }
        ret='<span class="'+cls+'">'+t+'</span>';
        return ret;
	}
	function getSwitch(value){
		var t=window.lc.getValue("close");
		var cls="label label-danger";
  		if(value==1){
  			t=window.lc.getValue("open");
  			cls="label label-success";
  		}
        return '<span class="'+cls+'">'+t+'</span>';
	}
	return {
		getValue:getValue,
		setCookie:setCookie,
		getCookie:getCookie,
		initLan:initLan,
		parseValues:parseValues,
		getTableList:getTableList,
		getWordList:getWordList,
		getProductType:getProductType,
		isEn:isEn,
		changeLocale:changeLocale,
		getLicDisplayStatus:getLicDisplayStatus,
		getObjectType:getObjectType,
		getRunStatus:getRunStatus,
		getTimeZoneText:getTimeZoneText,
		getTimeZoneList:getTimeZoneList,
		getComfirmFlag:getComfirmFlag,
		getResetReason:getResetReason,
		getSwitch:getSwitch,
		initEvent:initEvent,
	};
});


