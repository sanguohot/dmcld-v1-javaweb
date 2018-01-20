function beforeLogin(obj){
	obj.domain = "域名:";
	obj.userNameSpec = "<span class='txt-impt'>*</span>&nbsp;用户名&nbsp;";
	obj.userNameAbbr = "用户名:";
	obj.password = "密码:";
	obj.chinese = "中文";
	obj.english = "English";
	obj.useCookie = "记住密码";
	obj.cookieTime = "登录至:";
	obj.oneDay = "一天";
	obj.oneMonth = "一月";
	obj.oneYear = "一年";
	obj.cloudMode = "云端服务器";
	obj.accountMode = "账户中心";
	obj.localMode = "本地服务器";
	obj.login = "登录";	
	obj.welcomeTitle = "欢迎使用DM Cloud";
	obj.regIndex = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册新的账户 >>";
	obj.regNaviTitle = "注册新域名";
	obj.chooseRegType = "请选择注册类型:<br>"
		+'<a href="http://www.dmcld.com/register.html"><b>在云端服务器上注册新域名 >></b></a><br>'
		+"   新域名必须在www.dmcld.com注册, 注册成功后,<br>" 
		+"   请用XXX.dmcld.com登录云端服务器(注:XXX为新注册的域名).<br>"
		+"<br>"														
		+'<div id="tempDiv" hidden="true"><a href="register.html"><b>在本地服务器注册新域名 >></b></a><br>'
	obj.chooseRegType2 = "请选择注册类型( 例如：域的类型 ):<br>"
		+'<a href="http://www.ucspeed.com/register2.html"><b>在云端服务器上注册新域名  >></b></a><br>'
			+"   新域名必须在www.ucspeed.com注册, 注册成功后,<br>" 
		+"   请用XXX.ucspeed.com登录云端服务器(注:XXX为新注册的域名).<br>"
		+"<br>"														
		+'<div id="tempDiv" hidden="true"><a href="register2.html"><b>在本地服务器注册新域名 >></b></a><br>'
	obj.regTitle = "注册新域名";
	obj.domainNameSpec = "<span class='txt-impt'>*</span>&nbsp;域名&nbsp;";
	obj.suggest = "建议使用公司名称.<br/>";
	obj.validDomainName = "      命名规则如下:<br/>"
      +"(1)至少三个字符，最长31个字符;<br/>"
      +"(2)合法字符为'a-z', 'A'-'Z','0'-'9' , '-';<br/>"
      +"(3)首字符和末字符不能为'-';";
	obj.passwordSpec = "<span class='txt-impt'>*</span>&nbsp;输入密码&nbsp;";
	obj.confirmPwdSpec = "<span class='txt-impt'>*</span>&nbsp;确认密码&nbsp;";
	obj.emailSpec = "<span class='txt-impt'>*</span>&nbsp;邮箱地址&nbsp;";
	obj.emailTips = "请输入一个合法的邮箱地址.";
	obj.phoneSpec = "<span class='txt-impt'></span><span class='txt-impt' style='visibility:hidden'>*</span>&nbsp;固定电话&nbsp;";
	obj.mobileSpec = "<span class='txt-impt'></span><span class='txt-impt' style='visibility:hidden'>*</span>&nbsp;移动电话&nbsp;";
	obj.addrSpec = '<span class="txt-impt"></span><span class="txt-impt" style="visibility:hidden">*</span>&nbsp;详细地址&nbsp;';
	obj.imageVeriSpec = '<span class="txt-impt">*</span>&nbsp;验证码&nbsp;';
	obj.imageVeriTips = '请输入验证码';
	obj.changeImage = '看不清? 换一个';
	obj.domainNameNullTips = '请输入 "域名".';
	obj.domainNameInvalidTips = '"域名"非法. 必须符合右边的规则[a-zA-Z0-9][-a-zA-Z0-9]{0,29}[a-zA-Z0-9]';
	obj.domainNameExistTips = '"域名" 已被占用.';
	obj.userNameNullTips = '请输入"用户名".';
	obj.userNameInvalidTips = '"用户名"非法. 必须符合右边的规则[a-zA-Z0-9][-a-zA-Z0-9]{0,29}[a-zA-Z0-9]';
	obj.userNameExistTips = '"用户名"已被占用.';
	obj.pwdNullTips = '请输入"密码".';
	obj.pwdNotMatchTips = '两次输入的密码不一致.';
	obj.confirmPwdNullTips = '请输入"密码".';
	obj.emailNullTips = '请输入"邮箱地址".';
	obj.veriNullTips = '请输入"验证码".';
	obj.emailInvalidTips = '请输入合法的"邮箱地址".';
	obj.veriWrongTips = '验证码错误,请再次输入".';
	obj.regSuccTips = '注册成功! </br>'
		+'十分钟后注册的域可用...';//仅用于云端服务器	
	obj.completeItemTips = '请完成所有"*"标注的必填项';
	obj.invalidUserTips = '<font color=red>用户名或密码错误</font>';
	obj.userNameNullTips1 = '<font color=red>请输入用户名</font>';
	obj.pwdNullTips1 = '<font color=red>请输入密码</font>';
	obj.workServerSpec = '<span class="txt-impt">*</span>&nbsp;工作服务器&nbsp;';
}