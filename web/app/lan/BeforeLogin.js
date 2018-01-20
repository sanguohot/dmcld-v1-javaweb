//登录前语言包
function initLan(){
	var c = getCookie("userLan");
	if(!c){
		document.write(" <script language='javascript' charset='utf-8' src='app/lan/BeforeLoginEn.js' > </script>");
	}else{
		if(c==1){
			document.write(" <script type='text/javascript' charset='utf-8' src='app/lan/BeforeLoginCn.js' > </script>");
		}else{
			document.write(" <script type='text/javascript' charset='utf-8' src='app/lan/BeforeLoginEn.js' > </script>");
		}
	}
}
//加载ext语言包
function initLan1(){
	document.write('<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">');
	var c = getCookie("userLan");
	if(!c){
	}else{
		if(c==1){
			document.write('<script src="extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>');
		}else{
			
		}
	}
}

function procLanByName(name){
	var tmp =  document.getElementsByName(name);
	if(tmp && tmp.length>0){
		for(var i=0;i<tmp.length;i++){
			tmp[i].innerHTML = this[name];
		}		
	}
}
function procLanByPV(p,v){
	var tmp =  document.getElementsByName(p+"");
	if(tmp && tmp.length>0){
		for(var i=0;i<tmp.length;i++){
			tmp[i].innerHTML = v;
		}		
	}
}
function procLan(){
	var obj={};
	beforeLogin(obj);
	for(var p in obj){
		procLanByPV(p,obj[p+""]);
	}
//	procLanByName("userName");
//	procLanByName("domain");
//	procLanByName("password");
//	procLanByName("useCookie");
//	procLanByName("cookieTime");
//	procLanByName("chinese");
//	procLanByName("english");
//	procLanByName("login");
//	procLanByName("regIndex");
//	procLanByName("oneDay");
//	procLanByName("oneMonth");
//	procLanByName("oneYear");
//	procLanByName("chooseRegType2");
//	procLanByName("chooseRegType");
//	procLanByName("welcomeTitle");
//	procLanByName("regNaviTitle");
}
function changeLan(value){
	//
	SetCookie("userLan",value, "one month");
	window.location.reload();
}
function deleteCookie(name) {
	document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
}
function SetCookie(name,value, time)//两个参数，一个是cookie的名子，一个是值
{
	var exp = new Date(); //new Date("December 31, 9998");
	var Days;//cookie 保留的天数
	var month;
	var year;
	if(time == null)
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
	else
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

function getCookie(name)//取cookies函数
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;

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