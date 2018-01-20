var vendor=2;
var isIp=true;
var canRegisterFlag=0;
var sysMode="";
var sysUuid=0;
var loginUrl="";
function initCookie(){
	var pd=getCookie("password");
	if(pd && pd.charAt(pd.length-1)=="="){
		deleteCookie("password");
	}
	var bv=navigator.appVersion;
	var isIe=navigator.userAgent.indexOf("MSIE");
	if(isIe>0){
		document.body.innerHTML="";
		document.write("Please choose <a href='https://www.google.com/intl/en/chrome/browser/?hl=en'>Chrome</a> " +
				" Or <a href='http://download.firefox.com.cn/releases/webins3.0/official/en-US/Firefox-latest.exe'>FireFox</a> " +
				" Or <a href='http://get4.opera.com/pub/opera/win/1200/zh-cn/Opera_1200_int_Setup.exe'>Opera</a> "+
				" Or <a href='http://www.apple.com.cn/safari/'>Safari</a> browser");
		return;
	}
	
	var host=window.location.host;
	var domain="-";
	var temp=host.indexOf(".dmcld.com");
	var simcld=host.indexOf(".ucspeed.com");
	if(temp>=0 || simcld>=0){
		isIp=false;
	}
	
	var logo=document.getElementById('logo');
	
	if(temp>=0){
		vendor=2;
		domain=host.substring(0,temp);
		if(domain=="www" || domain==""){
			domain="-";
		}
		logo.src="resources2/images/logo.png";
	}else{
		vendor=1;
		domain=host.substring(0,simcld);
		if(domain=="www" || domain==""){
			domain="-";
		}
		logo.src="resources1/images/logo.png";
	}
	if(host.indexOf('changyoumifi.com')>=0){
		vendor=3;
		logo.src="resources/mibox/logo.png";
	}
	
	if(domain.indexOf("server")>-1){
		isIp=true;
	}
	
	if(domain=='-'){
		var temp_domain=getUrlDomain();
		if(temp_domain!=''){
			domain=temp_domain;
		}
	}
	findRealSys(domain,vendor);
	document.getElementById('vendorId').value=vendor;
	
	var userName=getCookie("userName");
	var password=getCookie("password");
	var loginMode=getCookie("loginMode");
	var c_domain=getCookie("domain");
	
	if(userName!=null && userName!="" && password!=null && password !="" ){
		document.getElementById('remeber').checked=true;
//		document.getElementById('cookie').disabled=false;
		
		if(domain=='-' && c_domain!=null && c_domain!=""){
			domain=c_domain;
		}
	}
	
	document.getElementById("domain").value=domain;
//	document.getElementById('loginMode').value=loginMode;
	document.getElementById('userName').value=userName;

  //判断密码是否已cookie保存，若保存进行解码
  if(password != null && password != ''){
	str = password;		 
//	if (str && str.lenstr.charAt(str.length-1)=="=" && str.charAt(str.length-2)=="=") {
//		document.getElementById('password').value=password;
//	}else{
//		document.getElementById('password').value=base64_decode(password);
//	}
	document.getElementById('password').value=password;
  }
//	document.getElementById('password').value=password;

	var host=window.location.href;
	if(host.indexOf('?error')>0){
		var obj={};
		beforeLogin(obj);
		document.getElementById('ins').innerHTML=obj.invalidUserTips;
	}
}

function getUrlDomain(){
	var host=window.location.href;
	var domainName="";
	if(host.indexOf("domainName")>0){
		domainName=host.substring(host.lastIndexOf("domainName=")+11, host.length);
	}
	return domainName;
}

function findRealVendor(domain,vendorId){
//	if(domain!="-" && domain.indexOf("server")<0 && isIp==false){
		ajaxrequest("doLogin!findRealVendor.action?domain="+domain+"&vendorId="+vendorId,"post",true,null,vendorCallBack,document);
//	}
}
function vendorCallBack(rs){	
	var res=eval('('+rs.responseText+')');
	var realVendor=1;
	if(res.success){
		if(!checkIP(window.location.hostname) && res.domain.indexOf('server')<0 && res.domain!="-"){
			if(res.vendorId){
				if(res.vendorId==2 && res.vendorId!=vendor){
					window.location="http://"+res.domain+".dmcld.com";
					realVendor=2;
				}else if(res.vendorId==1 && res.vendorId!=vendor){
					window.location="http://"+res.domain+".ucspeed.com";
					realVendor=2;
				}
			}
		}
	}
	
	var realDns="ucspeed.com";
	if(vendor==2){
		realDns="dmcld.com";
	}else if(vendor==3){
		realDns="changyoumifi.com";
	}else{
		realDns="ucspeed.com";
	}
	var userName=document.getElementById('userName');
	var password=document.getElementById('password');
	var domain=document.getElementById("domain");
	var vendorId=document.getElementById('vendorId');
	var remeber=document.getElementById('remeber');
	var ins=document.getElementById('ins');
	var loginMode=document.getElementById('loginMode');
	
	var errorMsg=checkInput(userName.value,password.value);
	if(errorMsg!=""){
		ins.innerHTML=errorMsg;
		return;
	}
//	str = password.value;
//	if (str && str.chartAt(str.length-1)!="=") {
//		password.value=base64_encode(password.value);
//	}
	if(remeber.checked){
    //判断若cookie中有password，则先解码

		setCookie("password",password.value,'one year');
//    if(!getCookie('password')){
//      setCookie("password",base64_encode(password.value),'one year');
//    }
		setCookie("domain",domain.value,'one year');
		setCookie("userName",userName.value,'one year');
		setCookie("loginMode",loginMode.value,'one year');
	}else{
		setCookie("domain","",0);
		setCookie("userName","",0);
		setCookie("password","",0);
		setCookie("loginMode","",0);
	}
	var loginMode=document.getElementById('loginMode').value;
	if(loginMode=='cloud'){
		if(sysMode!=10){
			if(domain.value!='-'){
				loginUrl="http://"+domain.value+"."+realDns+"/";
			}else{
				loginUrl="";
//				loginUrl="http://www."+realDns+"/";
			}
		}else{
			loginUrl="";
		}
	}else if(loginMode=='local'){
		loginUrl="";
	}else if(loginMode=='account'){
		if(sysMode!=11){
			loginUrl="http://www."+realDns+"/";
		}else{
			loginUrl="";
		}
	}
//  if(!getCookie('password')){
//    password.value = base64_encode( password.value);
//  }else{
//    password.value = getCookie('password');
//  }
	var form=document.getElementsByName('loginForm')[0];
	form.action=loginUrl+"doLogin.action"+window.location.search;
	form.submit();
//	ajaxrequest(loginUrl+"doLogin.action?userName="+userName.value+"&password="+password.value+"&domain="+domain.value+"&vendorId="+vendorId.value,"post",true,null,callBack,document);

			
}
function findRealSys(domain,vendorId){
//	if(domain!="-" && domain.indexOf("server")<0 && isIp==false){
		ajaxrequest("doLogin!findRealVendor.action?domain="+domain+"&vendorId="+vendorId,"post",true,null,sysCallBack,document);
//	}
}
function sysCallBack(rs){
	var res=eval('('+rs.responseText+')');
	if(res.success){
		sysMode=res.sysMode;
		sysUuid=res.srvUuid;
		var loginMode=document.getElementById('loginMode');
		var realDns="";
		if(vendor==2){
			realDns="dmcld";
		}else if(vendor==3){
			realDns="changyoumifi";
		}else{
			realDns="ucspeed";
		}
		var loginModeValue=null;//getCookie("loginMode");
		if(sysMode==1){
			loginMode.value='local';
			loginMode.options[0].hidden=true;
			loginMode.options[2].hidden=false;
			if(loginModeValue=='cloud'){
				loginModeValue=null;
			}
		}else if(sysMode==10){
			loginMode.value='cloud';
			loginMode.options[0].hidden=false;
			loginMode.options[2].hidden=true;
			
			if(loginModeValue=='local'){
				loginModeValue=null;
			}
		}else if(sysMode==11){
			loginMode.value='cloud';
			loginMode.options[0].hidden=false;
			loginMode.options[2].hidden=true;
			if(loginModeValue=='local'){
				loginModeValue=null;
			}
		}
		if(loginModeValue!=null){
			loginMode.value=loginModeValue;
		}
		var domain=document.getElementById('domain');
		if(loginMode.value=='cloud'){
			if(domain.value=='-'){
				document.getElementById('ins').innerHTML='<font color="#888">login to www.'+realDns+'.com</font>';
			}else{
				document.getElementById('ins').innerHTML='<font color="#888">login to '+domain.value+'.'+realDns+'.com</font>';
			}
		}else if(loginMode.value=='local'){
			document.getElementById('ins').innerHTML='<font color="#888">login to localhost</font>';
		}else if(loginMode.value=='account'){
			document.getElementById('ins').innerHTML='<font color="#888">login to www.'+realDns+'.com</font>';
		}
		
		//如果有错误信息显示错误信息
		var host=window.location.href;
		if(host.indexOf('?error')>0){
			var obj={};
			beforeLogin(obj);
			document.getElementById('ins').innerHTML=obj.invalidUserTips;
		}
		
		canRegisterFlag=res.canRegisterFlag;
		if(canRegisterFlag==1){
			document.getElementById('registerDiv').hidden=true;
		}else{
			document.getElementById('registerDiv').hidden=false;
		}
		
	}
}

function doRegister(){
	var register="register2.html";
	if(vendor==2){
		register='register.html';
	}else if(vendor==1){
		register='register2.html';
	}
	if(sysMode==1){
		window.location.href=register;
	}else if(sysMode==10){
		if(vendor==2){
			window.location.href='http://www.dmcld.com/'+register+"?sysUuid="+sysUuid;
		}else if(vendor==3){
			window.location.href='http://www.changyoumifi.com/'+register+"?sysUuid="+sysUuid;
		}else{
			window.location.href='http://www.ucspeed.com/'+register+"?sysUuid="+sysUuid;
		}
	}else if(sysMode==11){
		window.location.href=register;
	}else{
		window.location.href=register;
	}
	
}
function changeLogin(){
	var loginMode=document.getElementById('loginMode').value;
	var domain=document.getElementById('domain');
	
	var realDns="";
	if(vendor==2){
		realDns="dmcld";
	}else if(vendor==3){
		realDns="changyoumifi";
	}else{
		realDns="ucspeed";
	}
	if(loginMode=='cloud'){
		if(domain.value=='-'){
			document.getElementById('ins').innerHTML='<font color="#888">login to www.'+realDns+'.com</font>';
		}else{
			document.getElementById('ins').innerHTML='<font color="#888">login to '+domain.value+'.'+realDns+'.com</font>';
		}
	}else if(loginMode=='local'){
		document.getElementById('ins').innerHTML='<font color="#888">login to localhost</font>';
	}else if(loginMode=='account'){
		document.getElementById('ins').innerHTML='<font color="#888">login to www.'+realDns+'.com</font>';
	}
}

function login(){
	var userName=document.getElementById('userName');
	var password=document.getElementById('password');
	var domain=document.getElementById("domain");
	var vendorId=document.getElementById('vendorId');
//	var cookie=document.getElementById('cookie');
	var remeber=document.getElementById('remeber');
	var ins=document.getElementById('ins');
	var loginMode=document.getElementById('loginMode');
	
	
	findRealVendor(domain.value,vendor.value);
	
}

function callBack(rs){
	var obj={};
	beforeLogin(obj);
	var res=eval('('+rs.responseText+')');
	if(res.success){
//		window.location.href="bootstrap.html";
		if(res.vendorId){
			if(res.vendorId==1){
				window.location.href="index1.html";
			}else if(res.vendorId==101){
				window.location.href="index101.html";
			}else if(res.vendorId==2){
				window.location.href="index2.html";
			}else if(res.vendorId==102){
				window.location.href="index102.html";
			}else{
				window.location.href="index1.html";
			}
		}else{
			if(vendor==1){
				window.location.href="index1.html";
			}else if(vendor==101){
				window.location.href="index101.html";
			}else if(vendor==2){
				window.location.href="index2.html";
			}else if(vendor==102){
				window.location.href="index102.html";
			}else{
				window.location.href="index1.html";
			}
		}
		
	}else{
		document.getElementById('ins').innerHTML=obj.invalidUserTips;
	}
}


function checkInput(userName,password){
	var obj={};
	beforeLogin(obj);
	var errorMsg="";
	if(userName==null|| userName==""){
		errorMsg=obj.userNameNullTips1;
	}else if(password==null || password==""){
		errorMsg=obj.pwdNullTips1;
	}
	return errorMsg;
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

function checkIP(ip){
	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
	if(re.test(ip)){
		if( RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256){
			return true;
		}
	}
	return false;
}
