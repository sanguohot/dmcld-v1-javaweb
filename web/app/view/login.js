
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
//Ext.require([
//    'Ext.form.*',
//    'Ext.layout.container.Column',
//    'Ext.tab.Panel'
//]);


/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function(){

//    Ext.QuickTips.init();
   
    var bd = Ext.getBody();

    var simple = Ext.create('Ext.form.Panel', {
    enableOverflow: false,
    monitorValid: true,
	//bodyStyle:'padding-top:5px',
    baseCls: 'x-plain',
    renderTo: 'form-box',
    autoHeight: true,
    defaultType: 'textfield',
    defaults: {
      validationEvent: false,
      validateOnBlur: false
    },

        items: [{
			labelWidth: 70,
			labelStyle: "text-align: left;", 
			labelAlign: 'left',			
            fieldLabel: 'Username',
			id:'TxtUserName',
            name: 'TxtUserName',
			width: 210,
            allowBlank:false,
			autoCreate: {
        		tag: "input",
        		type: "text",
        		autocomplete: "on"
     			 }
        },{
			labelWidth: 70,
			labelAlign: 'left',
			labelStyle: "text-align: left;",					
            fieldLabel: 'Password',
			id:'TxtPassword',
			width: 210,
            name: 'TxtPassword',
			inputType: 'password'
        },{
			labelWidth: 193,
			labelAlign: 'left',
			labelStyle: "text-align: left;",						
			xtype: 'checkboxfield',
			id:'checkboxid',
			checked:true,
			fieldLabel: 'Remember your password',
			handler:docheck,
			boxLabel: ''			
		},{
			labelWidth: 70,
			labelStyle: "text-align: left;",
			labelAlign: 'left',						
			fieldLabel: 'Cookie',
			xtype: 'combo',
			disabled:true,
			editable: false,
			id:'cookies',
			name:'cookies',
			width: 210,
			forceSelection: true,
			queryMode: 'local',
			displayField: 'text',
			valueField: 'text',
			hideEmptyLabel: true,
			store: {
				fields: ['text'],
				data: [{
					text: 'One Day'
				},{
					text: 'One Month'
				},{
					text: 'One Year'
				}]
			}
        }],


        buttons: [{
            text: 'Login',
            ulan:'btLogin',		
			handler: loginhandle		
        },{
            text: 'Register',
            ulan:'btRegister',
			margin:"0 11 0 0",
			handler: register
			
        }]
		
		
    });
	
	var cookie = getCookie("TxtUserName");
	
	if(null != cookie)
	{
		Ext.getCmp("TxtUserName").setValue(cookie);
		Ext.getCmp("TxtPassword").setValue(getCookie("TxtPassword"));
//		Ext.getCmp("domain").setValue(getCookie("domain"));
	}
	
	Ext.getCmp("cookies").setValue("One Day");
	if(Ext.getCmp("checkboxid").checked)
	{		
		Ext.getCmp("cookies").setDisabled(false);//设置disabled时，不能直接赋值，否则看不到视觉上的效果
	}

	
	function docheck()
	{		
		if(Ext.getCmp("checkboxid").checked)
		{
			Ext.getCmp("cookies").setDisabled(false);
		}
		else
		{
			Ext.getCmp("cookies").setDisabled(true);
		}	
	}
		
	function loginhandle() 
	{

		var TxtUserName = Ext.getCmp("TxtUserName").getValue();
		var TxtPassword = Ext.getCmp("TxtPassword").getValue();
//		var domain=Ext.getCmp("domain").getValue();
		var time;
		if(Ext.getCmp("checkboxid").checked)
		{
			time = Ext.getCmp("cookies").getValue();			
		}
		else
		{
			time = null;
		}
		SetCookie("TxtUserName",TxtUserName, time);
		SetCookie("TxtPassword",TxtPassword, time);
//		SetCookie("domain",domain, time);
		
		var El = Ext.dd.DragDropManager.getElement("ins");
//		if(TxtUserName=="admin"&&TxtPassword=="admin"){
//			window.location.href="next.html";	
//		}else{
//			Ext.get("ins").applyStyles("color:red");//注意Ext.get和Ext.dd.DragDropManager.getElement虽然都是获取元素，但此次不可以互相替换
//			El.innerText="Unable to Login. Invalid Username or Password.";	
//		}
//		window.location.href="next.html";
		Ext.Ajax.request
		({
		
			 url:"doLogin.action", //请求的地址
			 params:{Checked:"1",username:TxtUserName,password:TxtPassword,domain:''},//发送的参数
			 
			 success:function(response,option)
			 {
				 var obj =  Ext.JSON.decode(response.responseText);//返回的信息
				 if(obj['success']==true)
				 {
					 //Ext.Msg.alert("Promote","Success!");
//					 window.location.href=obj['url'];
					 window.location.href="index.html";
//					 cp.set("user",obj['resultMap'].['user']);
					 //loginWindow.hide();
				 }
				 else
				 {
					 //Ext.get("instructions-ct").setValue("Unable to login. Invalid 'Username' or 'Password'!");
					 
					 
					 var El = Ext.dd.DragDropManager.getElement("ins");
					 
					 Ext.get("ins").applyStyles("color:red");//注意Ext.get和Ext.dd.DragDropManager.getElement虽然都是获取元素，但此次不可以互相替换
					 
					 El.innerHTML="Unable to Login. Invalid Username or Password.";		 
				 }
			 },
			 failure:function()
			 {
//				 Ext.Msg.alert("Unknow failture!!!");
				 var El = Ext.dd.DragDropManager.getElement("ins");
				 
				 Ext.get("ins").applyStyles("color:red");//注意Ext.get和Ext.dd.DragDropManager.getElement虽然都是获取元素，但此次不可以互相替换
	
				 El.innerText="Unable to Login. Invalid Username or Password.";	
			 }
		})
	}
	
	function cancle()
	{
		Ext.getCmp("TxtUserName").setValue("");
		Ext.getCmp("TxtPassword").setValue("");
		Ext.getCmp("cookies").setValue("");
	}
	
	function register(){
		 window.location.href="register.html";
//		showContactForm();
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
/*function delCookie(name)//删除cookie
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}*/
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
});





 