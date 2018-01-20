var errorDn=1;
var errorUn=1;
var errorEmail=1;
var errorPwd=1;
var errorPc=1;
var errorVerify=1;
var canRegisterFlag=0;
function checkServer(){
	ajaxrequest("registerManager!checkServer.action","post",true,null,callBackServer,document);
}

function callBackServer(rs){
	var res=eval('('+rs.responseText+')');
	
	var sysMode=res.sysMode;
	var vendorId=document.getElementById("vendorId").value;
	if(sysMode==1){
		var tempDiv=document.getElementById("tempDiv");
		tempDiv.hidden=false;
	}else{
		var tempDiv=document.getElementById("tempDiv");
		tempDiv.hidden=true;
		if(vendorId==2){
			window.location.href="http://www.dmcld.com/register.html";
		}else{
			window.location.href="http://www.ucspeed.com/register2.html";
		}
	}
}


function checkDn(){
		var obj={};
		beforeLogin(obj);
		var domainName=document.getElementById('domainName').value;
		var dndiv=document.getElementById('domainName_verif_div');
		var passwNot=document.getElementById('passwNot');
		if(domainName==""){
			dndiv.innerHTML=obj.domainNameNullTips;
			passwNot.style.display="";
			dndiv.style.display='';
			errorDn=1
			return;
		}else{
			var exp = /^[A-Za-z0-9][-A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
			var Regex = new RegExp(exp);
			if(Regex.test(domainName) == false){
				dndiv.innerHTML=obj.domainNameInvalidTips;
				dndiv.style.display='';
				errorUn=1;
				return;
			}
			
			ajaxrequest("registerManager!check.action?domainName="+domainName,"post",true,null,callBack,document);
		}
}
function focusName(){
	var passwNot=document.getElementById('passwNot');
	passwNot.style.display="";
}
	
function callBack(rs){
	var obj={};
	beforeLogin(obj);
	var res=eval('('+rs.responseText+')');
	var dndiv=document.getElementById('domainName_verif_div');
	var passwNot=document.getElementById('passwNot');
	if(res.msg=='success'){
		errorDn=0;
		dndiv.style.display='none';
		passwNot.style.display="none";
		passwNot.style.display="none";
	}else if(res.msg=='regError'){
		errorDn=1;
		dndiv.style.display='';
		dndiv.innerHTML=obj.domainNameInvalidTips;
	}else{
		errorDn=1;
		dndiv.style.display='';
		dndiv.innerHTML=obj.domainNameExistTips;
	}
}
	
function checkUn(){
	var obj={};
	beforeLogin(obj);
	var userName=document.getElementById('userName').value;
	var undiv=document.getElementById('userName_verif_div');
	if(userName==""){
		undiv.innerHTML=obj.userNameNullTips;
		undiv.style.display='';
		errorUn=1;
		return;
	}else{
		
		var exp = /^[A-Za-z0-9][-A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
		var Regex = new RegExp(exp);
		if(Regex.test(userName) == false){
			undiv.innerHTML=obj.userNameInvalidTips;
			undiv.style.display='';
			errorUn=1;
			return;
		}
		
		errorUn=0
		undiv.style.display='none';
//		ajaxrequest("registerManager!checkUser.action?userName="+userName,"post",true,null,callBackUn,document);
	}
}
	
function callBackUn(rs){
	var obj={};
	beforeLogin(obj);
	var res=eval('('+rs.responseText+')');
	var undiv=document.getElementById('userName_verif_div');
	if(res.msg=='success'){
		errorUn=0
		undiv.style.display='none';
	}else{
		errorUn=1
		undiv.style.display='';
		undiv.innerHTML=obj.userNameExistTips;
	}
}

function checkPwd(){
	var obj={};
	beforeLogin(obj);
	var password=document.getElementById('password').value;
	var pwddiv=document.getElementById('password_verif_div');
	if(password==""){
		errorPwd=1;
		pwddiv.innerHTML=obj.pwdNullTips;
		pwddiv.style.display='';
		return;
	}else{
		errorPwd=0;
		pwddiv.style.display='none';
	}
}

function checkPc(){
	var obj={};
	beforeLogin(obj);
	var password=document.getElementById('password').value;
	var passwordConfirm=document.getElementById('passwordConfirm').value;
	var pcdiv=document.getElementById('passwordConfirm_verif_div');
	if(passwordConfirm==""){
		errorPc=1;
		pcdiv.innerHTML=obj.confirmPwdNullTips;
		pcdiv.style.display='';
		return;
	}else if(passwordConfirm!=password){
		errorPc=1;
		pcdiv.innerHTML=obj.pwdNotMatchTips;
		pcdiv.style.display='';
		return;
	}else{
		errorPc=0;
		pcdiv.style.display='none';
	}
}

function checkEmail(){
	var obj={};
	beforeLogin(obj);
	var email=document.getElementById('email').value;
	
	var emaildiv=document.getElementById('email_verif_div');
	if(email==""){
		errorEmail=1;
		emaildiv.innerHTML=obj.emailNullTips;
		emaildiv.style.display='';
		
	}else{
		var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
	   
	    if(!myreg.test(email)){
	    	errorEmail=1;
	    	emaildiv.innerHTML=obj.emailInvalidTips;
	    	emaildiv.style.display='';
	        return;
	    }
		errorEmail=0;
		emaildiv.style.display='none';
	}
}
	

function onSubmit(){
	var obj={};
	beforeLogin(obj);
	var domainName=document.getElementById('domainName').value;
	var userName=document.getElementById('userName').value;
	var password=document.getElementById('password').value;
	var email=document.getElementById('email').value;
	var phone=document.getElementById('phone').value;
	var mobile=document.getElementById('mobile').value;
	var address=document.getElementById('address').value;
	
	var vendorId=document.getElementById("vendorId").value;
	var specSysUuid=document.getElementById("specSysUuid").value;
	
	var verify=document.getElementById('verify').value;
	var verifdiv=document.getElementById('verif_div');
	if(errorDn+errorUn+errorEmail+errorPwd+errorPc>0){
		alert(obj.completeItemTips);
	}else{
		if(verify==""){
			errorVerify=1;
			verifdiv.innerHTML=obj.veriNullTips;
			verifdiv.style.display='';
			return;
		}else{
			errorVerify=0;
			verifdiv.style.display='none';
		}
		
		var registerForm=document.getElementById('registerForm');
			var url="registerManager.action?domainName="+domainName+"&userName="+userName+"&password="+password
					+"&email="+email+"&phone="+phone+"&mobile="+mobile+"&address="+address+"&verify="+verify+"&vendorId="+vendorId+"&specSysUuid="+0;
		ajaxrequest(url,"post",true,null,callBackRegister,document);
		
		document.getElementById("regBtn").hidden=true;
//		document.getElementById("regContent").hidden=true;
		document.getElementById("loginInfo").innerHTML="<font>It will take several minutes,please wait......</font>";
	}
}

function callBackRegister(rs){
	var obj={};
	beforeLogin(obj);
	var res=eval('('+rs.responseText+')');
	var verifdiv=document.getElementById('verif_div');
	document.getElementById("regBtn").hidden=false;
	if(res.msg=="success"){
		alert('Register Success');
		domain_name=document.getElementById('domainName').value;
		timer = setInterval("CountDown()",1000); 
		changeValidateCode(document.getElementById('verifyImg'));
	}else if(res.msg=="verfity"){
		verifdiv.innerHTML=obj.veriWrongTips;
		verifdiv.style.display='';
		changeValidateCode(document.getElementById('verifyImg'));
	}else{
		alert('Register Failure');
		changeValidateCode(document.getElementById('verifyImg'));
	}
}

var maxtime = 10*60; 
var domain_name;
function CountDown(){
	var obj={};
	beforeLogin(obj);
	var vendorId=document.getElementById("vendorId").value;
	var cloudName="";
	if(vendorId==2){
		cloudName=".dmcld.com";
	}else{
		cloudName=".ucspeed.com";
	}
	if(maxtime>=0){  
		minutes = Math.floor(maxtime/60);  
		seconds = Math.floor(maxtime%60); 
		if(seconds<10){
			seconds="0"+seconds;
		}
		msg = minutes+":"+seconds;  
		
		document.getElementById("loginInfo").innerHTML=obj.regSuccTips+"&nbsp;&nbsp;&nbsp;&nbsp;("+msg+")<br/>" +
					"<a href=http://"+domain_name+cloudName+">http://"+domain_name+cloudName+"</a>";
		--maxtime;  	
	}else{  
			clearInterval(timer);  
			
			window.location.href="http://"+domain_name+cloudName;
	}  
}  


function findCloudSys(){
	ajaxrequest("registerManager!findCloudSys.action","post",true,null,callBackCloudSys,document);
}

function callBackCloudSys(rs){
	var res=eval('('+rs.responseText+')');
	
	canRegisterFlag=res.canRegisterFlag;
	
	if(canRegisterFlag==1){
		document.getElementById("regBtn").hidden=true;
	}else{
		document.getElementById("regBtn").hidden=false;
	}
	
	var sysMode=res.sysMode;
	var workServerItem=document.getElementById('workServerItem');
	if(sysMode==11){
		workServerItem.hidden=false;
	}else{
		workServerItem.hidden=true;
	}
	
	//工作服务器不允许注册
	if(sysMode==10){
		document.getElementById("regBtn").hidden=true;
		if(window.location.href.indexOf('register.html')>0){
			alert('Cloud Server can not register domain,Please register from www.dmcld.com');
		}else{
			alert('Cloud Server can not register domain,Please register from www.ucspeed.com');
		}
	}
	
	var sysUuid=document.getElementById('specSysUuid');
	var sysList=res.comboxList;
//	sysUuid.options.removeAll();
	for(var i=1;i<sysList.length;i++){
		sysUuid.options.add(new Option(sysList[i].name,sysList[i].uuid));
	}
	
	var host=window.location.href;
	if(host.indexOf("sysUuid")>0){
		var srvUuid="";
		srvUuid=host.substring(host.lastIndexOf("sysUuid=")+8, host.length);
		sysUuid.value=srvUuid;
	}
	
	
}		
