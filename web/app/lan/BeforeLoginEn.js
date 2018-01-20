function beforeLogin(obj){
	obj.domain = "Domain:";
	obj.userNameSpec = "<span class='txt-impt'>*</span>&nbsp;User Name&nbsp;";
	obj.userNameAbbr = "Username:";
	obj.password = "Password:";
	obj.chinese = "中文";
	obj.english = "English";
	obj.useCookie = "remember me";
	obj.cookieTime = "Login To:";
	obj.oneDay = "One Day";
	obj.oneMonth = "One Month";
	obj.oneYear = "One Year";
	obj.cloudMode = "Cloud Server";
	obj.accountMode = "Account Center";
	obj.localMode = "Local Server";
	obj.login = "Login";	
	obj.welcomeTitle = "Welcome to use DM Cloud";
	obj.regIndex = "Register for new DM Cloud account >>";
	obj.regNaviTitle = "Register UCSPEED DM Cloud Managerment Services";
	obj.chooseRegType = "Please choose your register type:<br>"
		+'<a href="http://www.dmcld.com/register.html"><b>Register Public Domain >></b></a><br>'
		+"   Public Domain MUST be registered at www.dmcld.com, after new domain registered,<br>" 
		+"   yours domain url will be activated.<br>"
		+"   You can log in your Public Domain via the url: yourdomain.dmcld.com<br>"
		+"<br>"														
		+'<div id="tempDiv" hidden="true"><a href="register.html"><b>Register Local Domain >></b></a><br>'
	obj.chooseRegType2 = "Please choose your register type( e.g. yourdomain ):<br>"
		+'<a href="http://www.dmcld.com/register2.html"><b>Register Public Domain >></b></a><br>'
		+"   Public Domain MUST be registered at www.ucspeed.com, after new domain registered,<br>" 
		+"   yours domain url will be activated.<br>"
		+"   You can log in your Public Domain via the url: yourdomain.dmcld.com<br>"
		+"<br>"														
		+'<div id="tempDiv" hidden="true"><a href="register2.html"><b>Register Local Domain >></b></a><br>'

	obj.regTitle = "Register UCSPEED DM Cloud Managerment Services";
	obj.domainNameSpec = "<span class='txt-impt'>*</span>&nbsp;Domain Name&nbsp;";
	obj.suggest = "Suggest using your company name.<br/>";
	obj.validDomainName = "      Tips: valid domain name:<br/>"
      +"(1)at least 3 chars, and maximun 31 chars;<br/>"
      +"(2)valid char is 'a-z', 'A'-'Z', '0'-'9' or '-';<br/>"
      +"(3)first/last char can't be '-';";
	obj.passwordSpec = "<span class='txt-impt'>*</span>&nbsp;Password&nbsp;";
	obj.confirmPwdSpec = "<span class='txt-impt'>*</span>&nbsp;Confirm Password&nbsp;";
	obj.emailSpec = "<span class='txt-impt'>*</span>&nbsp;Email Address&nbsp;";
	obj.emailTips = "Please enter a valid email address for yourself.";
	obj.phoneSpec = "<span class='txt-impt'></span><span class='txt-impt' style='visibility:hidden'>*</span>&nbsp;Phone&nbsp;";
	obj.mobileSpec = "<span class='txt-impt'></span><span class='txt-impt' style='visibility:hidden'>*</span>&nbsp;Mobile&nbsp;";
	obj.addrSpec = '<span class="txt-impt"></span><span class="txt-impt" style="visibility:hidden">*</span>&nbsp;Address&nbsp;';
	obj.imageVeriSpec = '<span class="txt-impt">*</span>&nbsp;Image Verification&nbsp;';
	obj.imageVeriTips = 'Please enter the characters of pictures';
	obj.changeImage = 'change image';
	obj.domainNameNullTips = 'Please complete the required field "Domain Name".';
	obj.domainNameInvalidTips = '"Domain Name" is Invalid. matching [a-zA-Z0-9][-a-zA-Z0-9]{0,29}[a-zA-Z0-9]';
	obj.domainNameExistTips = '"Domain Name" is already in use.';
	obj.userNameNullTips = 'Please complete the required field "User Name".';
	obj.userNameInvalidTips = '"User Name" is Invalid. matching [a-zA-Z0-9][-a-zA-Z0-9]{0,29}[a-zA-Z0-9]';
	obj.userNameExistTips = '"User Name" is already in use.';
	obj.pwdNullTips = 'Please complete the required field "Password".';
	obj.pwdNotMatchTips = 'The entered passwords do not match.';
	obj.confirmPwdNullTips = 'Please complete the required field "Password Confirm".';
	obj.emailNullTips = 'Please complete the required field "Email Address".';
	obj.veriNullTips = 'Please complete the required field "Verification".';
	obj.emailInvalidTips = 'Please input  valid  "Email Address".';
	obj.veriWrongTips = 'Please enter the same verification code".';
	obj.regSuccTips = 'Registered Success ! </br>'
		+'Please wait 10 minutes to activate new domain...';//仅用于云端服务器
	obj.completeItemTips = 'Please complete "*" item';
	obj.invalidUserTips = '<font color=red>Invalid Username or Password.</font>';
	obj.userNameNullTips1 = '<font color=red>Please enter your user name</font>';
	obj.pwdNullTips1 = '<font color=red>Please enter your password.</font>';
	obj.workServerSpec = '<span class="txt-impt">*</span>&nbsp;Work Server&nbsp;';
}