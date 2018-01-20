function openChildWin(url){
	if(!url) return;
	windowHandle = window.open('', 'old_remote_name', 'width='+ (window.screen.availWidth-10)+',height='+(window.screen.availHeight-60)+ ',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
	try {
	 windowHandle.document.location.href = data.responseJSON.url;
	} catch (exc) {
	 windowHandle.close();
	 windowHandle = window.open('', 'old_remote_name', 'width='+ (window.screen.availWidth-10)+',height='+(window.screen.availHeight-60)+ ',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
	 windowHandle.document.location.href = url;
	}
	windowHandle.focus();
}
function check(val,action,exp){
	var info;
	if(exp==true){
		exp = /^[A-Za-z0-9][-_.A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
		if(!exp.test(val)){
			info= "Invalid input";
		}
	}else if(exp==false){
	}else{
		exp = /^[A-Za-z0-9][-_.A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
		if(!exp.test(val)){
			info= "Invalid input";
		}
	}
	if(!info){
		var url="check!"+action+".action?name="+val;
		Ext.Ajax.request({
			url:url,
			method:'POST',
			async:false, 
			success: function (response, options) {
			var obj=Ext.JSON.decode(response.responseText);	
			console.log(obj);
			if(obj['success']){
				info=true;
			}else{
				info=alreadyInUse;
			}
		}
		});
	}
	return info;
}
function checkString(val,exp){
	var info=true;
	if(exp==true || exp==undefined){
		exp = /^[A-Za-z0-9][-_.A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
		if(!exp.test(val)){
			info= "Invalid input";
		}
	}else if(exp!=""){
		if(!exp.test(val)){
			info= "Invalid input";
		}
	}
	return info;
}

function userCheck(val,exp,tips){
	var info;
	if(exp){
		if(!exp.test(val)){
			if(tips){
				info=tips;
			}else{
				info= 'Invalid Input';
			}
		}else{
			info=true;
		}
	}else{
		var exp=/^[0-9]{0,9}$/;
		if(!exp.test(val)){
			info='Invalid Input,Can only enter the Number';
		}else{
			info=true;
		}
	}
	return info;
}

function moveOver(name,e,value1) {
		var x=parseInt(e.clientX);
		var y=parseInt(e.clientY);
		var tipsInfo=getInfoByName(name,value1);
		var length=tipsInfo.length;
		var tipsWinHeight=length*25/30;
		var linkInfoWin=Ext.getCmp('linkInfoWin');
		if(linkInfoWin==undefined||linkInfoWin==null){
			linkInfoWin=Ext.create('Ext.window.Window',{
				id:'linkInfoWin',
				border:false,
				header:false,
				x:x,
				y:y,
				closable:false,
				padding: '0 0 0 0',
				bodyPadding:'5 5 5 3',
//				width:200,
//				height:tipsWinHeight,
				bodyStyle:{
//					background:'#DFE9F6',
					background:'#FFFFB0',
				},
				html:tipsInfo
			});
			
		}else{
//			linkInfoWin.setHeight(tipsWinHeight);
			linkInfoWin.setPosition(x,y);
			linkInfoWin.update(tipsInfo);
		}
		linkInfoWin.show();
}
function movePortOver(adminStatus,runStatus,callStatus,smsStatus,ussdStatus,e,modStatus) {
	var x=parseInt(e.clientX);
	var y=parseInt(e.clientY);
	
	var tipsInfo="Admin Status&nbsp;&nbsp;:&nbsp;"+rs.adminStatus(adminStatus)+"&nbsp;&nbsp;</br>"
				+"Run Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+rs.runStatus(runStatus)+"</br>";
		if(modStatus!=null){
			tipsInfo=tipsInfo+"Module Status :&nbsp;"+rs.modStatus(modStatus)+"</br>";
		}
		tipsInfo=tipsInfo+"Call Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+rs.callStatus(callStatus)+"</br>"
				+"SMS Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+rs.smsStatus(smsStatus)+"</br>"
				+"USSD Status&nbsp;&nbsp;&nbsp;:&nbsp;"+rs.ussdStatus(ussdStatus);
	var length=tipsInfo.length;
	var tipsWinHeight=length*25/30;
	
	var linkInfoWin=Ext.getCmp('linkInfoWin');
	if(linkInfoWin==undefined||linkInfoWin==null){
		linkInfoWin=Ext.create('Ext.window.Window',{
			id:'linkInfoWin',
			border:false,
			header:false,
			x:x,
			y:y,
			closable:false,
			padding: '0 0 0 0',
			bodyPadding:'5 5 5 3',
			floating: true,
//			width:200,
//			height:tipsWinHeight,
			bodyStyle:{
				background:'#FFFFB0',
			},
			html:tipsInfo
		});
		
	}else{
//		linkInfoWin.setHeight(tipsWinHeight);
		linkInfoWin.setPosition(x,y);
		linkInfoWin.update(tipsInfo);
	}
	linkInfoWin.show();
}

function moveTGPortOver(runStatus,workState,slaveType,slaveTgNo,slaveIp,e) {
	var x=parseInt(e.clientX);
	var y=parseInt(e.clientY);
	var tipsInfo="Run Status&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+rs.runStatus(runStatus)+"&nbsp;&nbsp;</br>"+
		"Work Status&nbsp;&nbsp;:&nbsp;"+rs.tgpWorkState(workState)+"&nbsp;&nbsp;</br>";
	
	if(slaveType>0){
		tipsInfo=tipsInfo+"Slave Type&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+rs.slaveType(slaveType)+"-<b>"+slaveTgNo+"</b>&nbsp;</br>"
		+"Slave IP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+slaveIp+"</br>";
	}
	var length=tipsInfo.length;
	var tipsWinHeight=length*25/30;
	
	var linkInfoWin=Ext.getCmp('linkInfoWin');
	if(linkInfoWin==undefined||linkInfoWin==null){
		linkInfoWin=Ext.create('Ext.window.Window',{
			id:'linkInfoWin',
			border:false,
			header:false,
			x:x,
			y:y,
			closable:false,
			padding: '0 0 0 0',
			bodyPadding:'5 5 5 3',
			floating: true,
			bodyStyle:{
				background:'#FFFFB0',
			},
			html:tipsInfo
		});
		
	}else{
		linkInfoWin.setPosition(x,y);
		linkInfoWin.update(tipsInfo);
	}
	linkInfoWin.show();
	
}
		
function moveOut(){
	var linkInfoWin=Ext.getCmp('linkInfoWin');
	if(linkInfoWin!=undefined||linkInfoWin!=null){
		linkInfoWin.html="";
		linkInfoWin.hide();
	}
}
function viewSyslog(tabpanelId,fileName,fileHref){
//	var tabpanel = syslogGrid.up('panel').up('panel');
	var tabpanel=Ext.getCmp(tabpanelId);
	var prefix = 'syslogDetail_';
	var id=prefix+"name_"+fileName;
	var tab = Ext.getCmp(id);
	if(tab==undefined){
		tab=tabpanel.add({
				id:id,
				title:fileName,
				closable: true,
			    autoScroll: true,
			    width:'100%',
			    height:'100%',
			    layout:'fit',
			    items :[{
			        itemId:'remote_web',
			        layout:'fit',
					html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+fileHref+'"></iframe>'
				}]
		});
	}
	tab.show();
}

function logout(sessionTimeout){
	if(!Ext.get('userUuid').value){
		return;
	}
	var params = {username:Ext.get('username').value,userUuid:Ext.get('userUuid').value
			,domainUuid:Ext.get('domainUuid').value,sessionTimeout:sessionTimeout};
	
	Ext.Ajax.request({
		url:'doLogin!logout.action',
		method:'POST',
		params:params,
	});
}

function downloadAhead(){
//	Ext.Loader.require('app.util.GMapPanel')
	Ext.Loader.require('app.view.operation.domain.group.GroupPanel')
	Ext.Loader.require('app.store.operation.domain.group.GroupInfoStore')
	Ext.Loader.require('app.store.operation.domain.group.GroupInfoModel')
	Ext.Loader.require('app.store.util.ComboxStore')
	Ext.Loader.require('app.store.util.ComboxModel')
	Ext.Loader.require('app.view.operation.domain.roamzone.SimCardTab')
	Ext.Loader.require('app.view.operation.domain.group.ImportSIMCard')
	Ext.Loader.require('app.store.monitor.GrpSmsStore')
	Ext.Loader.require('app.store.monitor.SmsModel')
	Ext.Loader.require('app.store.operation.domain.roamzone.SimCardStore')
	Ext.Loader.require('app.store.operation.domain.roamzone.SimCardModel')
	Ext.Loader.require('app.view.sms.SimSmlTab')
	Ext.Loader.require('app.util.SmlOpenModel')
	Ext.Loader.require('app.store.sms.SimSmlStore')
	Ext.Loader.require('app.store.sms.SimSmlModel')
	Ext.Loader.require('app.view.sms.SimUsslTab')
	Ext.Loader.require('app.util.UsslOpenModel')
	Ext.Loader.require('app.store.sms.SimUsslStore')
	Ext.Loader.require('app.store.sms.SimUsslModel')
	Ext.Loader.require('app.view.sms.SimCallTab')
	Ext.Loader.require('app.util.CallOpenModel')
	Ext.Loader.require('app.store.sms.SimCallStore')
	Ext.Loader.require('app.store.sms.SimCallModel')
	Ext.Loader.require('app.view.sms.SmsGrid')
	Ext.Loader.require('app.store.sms.SmsInGroupStore')
	Ext.Loader.require('app.store.sms.SmsInGroupModel')
	Ext.Loader.require('app.view.sms.UssdGrid')
	Ext.Loader.require('app.store.sms.UssdInGroupStore')
	Ext.Loader.require('app.store.sms.UssdInGroupModel')
	Ext.Loader.require('app.view.sms.CallGrid')
	Ext.Loader.require('app.store.sms.SimCdrStore')
	Ext.Loader.require('app.store.sms.SimCdrModel')
}
function dynamicLoadScript(url,cache){
	if(cache){
		document.write("<s"+"cript type='text/javascript' src='"+url+"?"+Math.random()+"'></scr"+"ipt>");
	}else{
		document.write("<s"+"cript type='text/javascript' src='"+url+"'></scr"+"ipt>");
	}
}
function sleep(obj,iMinSecond){
	if (window.eventList==null){
		window.eventList=new Array(); 
	}
	var ind=-1; 
	for (var i=0;i<window.eventList.length;i++) { 
		if (window.eventList[i]==null){ 
			window.eventList[i]=obj; 
			ind=i; 
			break; 
		}
	}
	if (ind==-1){
		ind=window.eventList.length; 
		window.eventList[ind]=obj; 
	}
	setTimeout("GoOn(" + ind + ")",iMinSecond); 
}
function GoOn(ind){
	var obj=window.eventList[ind]; 
	window.eventList[ind]=null; 
	if (obj.NextStep) obj.NextStep(); 
	else obj(); 
}

function sleepBar(store,createBox){
	var mw=Ext.getCmp('messageWindow');
	
	if(createBox){
		if(!mw){
			mw=Ext.create('app.view.common.MessageWindow',{title:boxWaitTitle});
		}
//		Ext.MessageBox.show({
//			title: boxWaitTitle,
//			msg:boxWaitMsg,
//			progressText: boxInitMsg,
//			width:300,
//			progress:true,
//			closable:false
//		});
	}
	mw.down('form').getForm().reset();
	mw.show();
	showProcessBar(store);
}
function showProcessBar(store){
	
	createBaseTask(store,500);
	
//	if(store){
//		store.on('load',function(){
//			var mw=Ext.getCmp('messageWindow');
//			console.log(store.getCount());
//			for(var a=mw.count;a<store.getCount();a++){
//				var obj=store.getAt(a);
//				console.log(obj.get('step'));
//				mw.down('form').getForm().findField('message').setValue(mw.down('form').getForm().findField('message').getValue()+'\n'+obj.get('step'));
//			}
//			mw.count=store.getCount();
////			updateBox(store,0);
//		});
//		store.load();
//		
//		timer=setInterval(function(){
//			store.removeAll();
//			store.load();
//		},1000);
//	}else{
////		timer=setInterval(function(){
////		},1000);
//	}
	
}

function createBaseTask(store,interval){
	var mw=Ext.getCmp('messageWindow');
	mw.store=store;
	autoRefresh.stopTask(null,store);
	var autoRefreshCb=function(){
		var cnt=0;
		var task = {
			run:function(){
				if(cnt==1){
					store.load();
					var mess=mw.down('form').getForm().findField('message');
					for(var i=0;i<store.getCount();i++){
						var obj=store.getAt(i);
						mess.setValue(mess.getValue()+'\n'+obj.get('step'));
						mw.getEl().down('textarea').dom.scrollTop = mw.getEl().down('textarea').dom.scrollHeight;
					}
					Ext.TaskManager.stop(task);
					store.task = null;																											
				}
				cnt++;
			},
			interval:interval
		};
		store.task = task;
		store.interval = interval;
		Ext.TaskManager.start(task);
	};
	store.autoRefreshCb = autoRefreshCb;
	store.on('load',autoRefreshCb);
	store.load();		
}

function updateBox(store,i){
	
	
//	var mw=Ext.getCmp('messageWindow');
//	if(obj!=null){
//		for(var a=0;a<store.getCount();a++){
//			var obj=store.getAt(a);
//			consolo.log(obj);
//			mw.down('form').getForm().findField('message').setValue(mw.down('form').getForm().findField('message').getValue()+'\n'+obj.get('step'));
//		}
//		sleep(obj,obj.get('ms'));
//		obj.NextStep=function(){
//			console.log(obj.get('step')+"[ "+obj.get('ms')+" ]"+i);
//			mw.down('form').getForm().findField('message').setValue(mw.down('form').getForm().findField('message').getValue()+'\n'+obj.get('step'));
//			Ext.MessageBox.updateProgress(1,obj.get('step'));
//			i=i+1;
//			if(store.getCount()>i){
//				updateBox(store,i);
//			}
//		}
//	}
}

function versionCallBack(rs){
	var res=eval('('+rs.responseText+')');
	alert(res.versionList);
	if(res.versionList){
		alert('success');
	}else{
		alert('failure');
	}
}

function addCssRule(filter, cssText) {
    var styleSheet = document.styleSheets[0];
    if (styleSheet.addRule) {
        styleSheet.addRule(filter, cssText);
    } else {
        styleSheet.insertRule(filter+"{" + cssText + "}", styleSheet.cssRules.length);
    }
}
function addCssRule1(styleSheet,filter, cssText) {
    if (styleSheet.addRule) {
        styleSheet.addRule(filter, cssText);
    } else {
        styleSheet.insertRule(filter+"{" + cssText + "}", styleSheet.cssRules.length);
    }
}
function setPseudo(styleSheet,filter,rate) {
	if(rate>1 || rate<0){
		return;
	}	
	var borderCol,startCol,endCol,stopCol,startRate,endRate,stopRate;	
	startCol = "#f4f4f4";
	stopRate = "";
	var tmp = Math.ceil(100*rate);
	var rateTmp = 100-tmp-10;
	startRate = (rateTmp>0)?rateTmp:(100-tmp);	
	endRate = 100-tmp;
	startRate = startRate+"%";
	endRate = endRate+"%";
	if(tmp < 50){
		endCol = "#b6e48f";
		stopCol = "#9cd87a";
		borderCol = "#43a547";	
	}else{		
		endCol = "#f19463";
		stopCol = "#e42b16";
		borderCol = "#cb3f3d";
	}
	var strTmp = "linear-gradient("
	+startCol+" "+startRate+","
	+endCol+" "+endRate+","
	+stopCol+")";
	var str0 = "content:'"+tmp+"%'";
	var str1 = "background:"+strTmp;
	var str2 = "background:-webkit-"+strTmp;
	var str3 = "background:-moz-"+strTmp;
	var str4 = "border:2px solid "+borderCol;
	addCssRule1(styleSheet,filter,str0+";");
	addCssRule1(styleSheet,filter,str1+";");
	addCssRule1(styleSheet,filter,str2+";");
	addCssRule1(styleSheet,filter,str3+";");
	addCssRule1(styleSheet,filter,str4+";");
	
	addCssRule1(styleSheet,filter,"position:absolute;");
	addCssRule1(styleSheet,filter,"width:20px;");
	addCssRule1(styleSheet,filter,"height:20px;");
	addCssRule1(styleSheet,filter,"line-height:20px;");
	addCssRule1(styleSheet,filter,"text-align:center;");
	addCssRule1(styleSheet,filter,"border-radius:50%;");
	addCssRule1(styleSheet,filter,"box-shadow:0 0 2px 0 #e8e5df inset;");
}
function setPseudo1(styleSheet,filter,rate) {
	var borderCol,startCol,endCol,stopCol,startRate,endRate,stopRate;	
	startCol = "#f4f4f4";
	stopRate = "";
	var tmp = rate;
	var rateTmp = 100-tmp-10;
	startRate = (rateTmp>0)?rateTmp:(100-tmp);	
	endRate = 100-tmp;
	startRate = startRate+"%";
	endRate = endRate+"%";
	if(tmp < 60){
		endCol = "#b6e48f";
		stopCol = "#b6e48f";
		borderCol = "#43a547";	
	}else if(tmp<80){		
		endCol = "#f19463";
		stopCol = "#f19463";
		borderCol = "#cb3f3d";
	}else{
		endCol = "#FF4321";
		stopCol = "#FF4321";
		borderCol = "#FF4321";
	}
//	if(tmp < 80){
//		endCol = "#b6e48f";
//		stopCol = "#9cd87a";
//		borderCol = "#43a547";	
//	}else{		
//		endCol = "#f19463";
//		stopCol = "#e42b16";
//		borderCol = "#cb3f3d";
//	}
	var strTmp = "linear-gradient("
	+"right,"
	+startCol+" "+endRate+","
	+endCol+" "+endRate+","
	+stopCol+")";
	var str0 = "content:'"+tmp+"%'";
	var str1 = "background:"+strTmp;
	var str2 = "background:-webkit-"+strTmp;
	var str3 = "background:-moz-"+strTmp;
	var str4 = "border:1px solid #999";
	addCssRule1(styleSheet,filter,str0+";");
	addCssRule1(styleSheet,filter,str1+";");
	addCssRule1(styleSheet,filter,str2+";");
	addCssRule1(styleSheet,filter,str3+";");
	addCssRule1(styleSheet,filter,str4+";");
	
	addCssRule1(styleSheet,filter,"position:absolute;");
	addCssRule1(styleSheet,filter,"width:200px;");
	addCssRule1(styleSheet,filter,"height:14px;");
	addCssRule1(styleSheet,filter,"line-height:14px;");
	addCssRule1(styleSheet,filter,"text-align:center;");
//	addCssRule1(styleSheet,filter,"border-radius:50%;");
	addCssRule1(styleSheet,filter,"box-shadow:0 0 2px 0 #e8e5df inset;");
	addCssRule1(styleSheet,filter,"font:10px/20px '宋体';");
}
function setPseudo2(styleSheet,filter,obj) {
	var str0 = "content:'"+obj.content+"'";
	var str1 = "background:linear-gradient(right,"+obj.color+","+obj.color+")";
	var str2 = "background:-webkit-linear-gradient(right,"+obj.color+","+obj.color+")";
	var str3 = "background:-moz-linear-gradient(right,"+obj.color+","+obj.color+")";
	var str4 = "border:0px solid #999";
	addCssRule1(styleSheet,filter,str0+";");
	addCssRule1(styleSheet,filter,str1+";");
	addCssRule1(styleSheet,filter,str2+";");
	addCssRule1(styleSheet,filter,str3+";");
	addCssRule1(styleSheet,filter,str4+";");
	addCssRule1(styleSheet,filter,"position:absolute;");	
	addCssRule1(styleSheet,filter,"width:"+obj.size*obj.times+"px;");
	addCssRule1(styleSheet,filter,"height:20px;");
	addCssRule1(styleSheet,filter,"line-height:20px;");
	addCssRule1(styleSheet,filter,"text-align:right;");
//	addCssRule1(styleSheet,filter,"border-radius:50%;");
	addCssRule1(styleSheet,filter,"box-shadow:0 0 2px 0 #e8e5df inset;");
	addCssRule1(styleSheet,filter,"font:10px/20px '宋体';");
	addCssRule1(styleSheet,filter,"color:green");
}
function setPseudo3(styleSheet,filter,obj) {
	var str0 = "content:'"+obj.content+"'";
    var str1 = "background-image: url(./picture/alarm.png)"
//	var str1 = "background:linear-gradient(right,"+obj.color+","+obj.color+")";
	var str2 = "background:-webkit-linear-gradient(right,"+obj.color+","+obj.color+")";
	var str3 = "background:-moz-linear-gradient(right,"+obj.color+","+obj.color+")";
	var str4 = "border:0px solid #999";
	addCssRule1(styleSheet,filter,str0+";");
	addCssRule1(styleSheet,filter,str1+";");
	addCssRule1(styleSheet,filter,str2+";");
	addCssRule1(styleSheet,filter,str3+";");
	addCssRule1(styleSheet,filter,str4+";");
	addCssRule1(styleSheet,filter,"position:absolute;");
	addCssRule1(styleSheet,filter,"width:"+obj.width+"px;");
	addCssRule1(styleSheet,filter,"height:"+obj.height+"px;");
	addCssRule1(styleSheet,filter,"line-height"+obj.lineHeight+"px;");
	addCssRule1(styleSheet,filter,"text-align:"+obj.textAlign+";");
	addCssRule1(styleSheet,filter,"-moz-border-radius:50%;");
	addCssRule1(styleSheet,filter,"-webkit-border-radius:50%;");
	addCssRule1(styleSheet,filter,"border-radius:50%;");
	if(obj.border) addCssRule1(styleSheet,filter,"border:"+obj.border);
	addCssRule1(styleSheet,filter,"box-shadow:0 0 2px 0 #e8e5df inset;");
	addCssRule1(styleSheet,filter,"font:10px/"+obj.lineHeight+"px '宋体';");
	addCssRule1(styleSheet,filter,"color:red");
}
function getCSSRule(styleSheet,ruleName, deleteFlag) {              
   ruleName=ruleName.toLowerCase();                       
   if (styleSheet) {                           
         var ii=0;                                        
         var cssRule=false;                               
         do {                                             
            if (styleSheet.cssRules) {                    
               cssRule = styleSheet.cssRules[ii];         
            } else {                                      
               cssRule = styleSheet.rules[ii];            
            }                                            
            if (cssRule)  {            	
               if (cssRule.selectorText.toLowerCase()==ruleName) { 
                  if (deleteFlag=='delete') {             
                     if (styleSheet.cssRules) {          
                        styleSheet.deleteRule(ii);       
                     } else {                             
                        styleSheet.removeRule(ii);        
                     }                                    
                     return true;                         
                  } else {                                
                     return cssRule;                      
                  }                                      
               }                                          
            }                                             
            ii++;                                         
         } while (cssRule)                                              
   }                                                      
   return false;                                          
}                                                         

function removeCSSRule(styleSheet,ruleName) {              
   ruleName=ruleName.toLowerCase();                       
   if (styleSheet) {      
         var length = 0;
         if (styleSheet.cssRules) {                    
        	 length = styleSheet.cssRules.length;         
         } else {                                      
        	 length = styleSheet.rules.length;            
         }
         if(length==0){
        	 return;
         }
         var cssRule=false;
         var ii=length - 1;
         do {                                             
            if (styleSheet.cssRules) {                    
               cssRule = styleSheet.cssRules[ii];         
            } else {                                      
               cssRule = styleSheet.rules[ii];            
            }                                            
            if (cssRule)  {
//            	console.log(cssRule.selectorText)
               if (cssRule.selectorText.toLowerCase()==ruleName) {           	   
                   if (styleSheet.cssRules) {         
                       styleSheet.deleteRule(ii);       
                   } else {                             
                       styleSheet.removeRule(ii);        
                   }                                      
               }                                          
            }                                             
            ii--;
         } while (ii>=0)                                              
   }                                      
}
function loadVersion(){
}
function getTagByName(root,name){
	if(!root || !root.childNodes || !root.childNodes.length)
		return null;
	var childNodes = root.childNodes;
	for(var i=0; i<childNodes.length; i++){
		alert(childNodes[i].tagName)
		if(childNodes[i].name && childNodes[i].name==name)
			return childNodes[i];
	}
	return null;
}
function createPasswordCmp(inputType,value,obj){
	var name = "password";
	if(obj && obj.name) name=obj.name;
	var ulan = "registerPassword";
	if(obj && obj.ulan) ulan=obj.ulan;
	var password2 = Ext.create("Ext.form.field.Text",{
        xtype: 'textfield',
        name: name,
        inputType:inputType,
        ulan:ulan,
        fieldLabel: lanControll.getLanValue(ulan),
        flex:65,
        labelWidth:180,
        value:value
	});
	return password2;
}
function showOrHidePasswordCmp(container,obj){
	var password = null;
	var button = container.down("button");
	var pwdCmp = container.down("textfield");
	var value = pwdCmp.getValue();
	var fieldStyle = pwdCmp.fieldStyle;
	if(button.ulan == "btShow"){
		button.ulan = "btHide";
		button.setText(lanControll.getLanValue(button.ulan));
		password = createPasswordCmp("text",value,obj);
	}else{
		button.ulan = "btShow";
		button.setText(lanControll.getLanValue(button.ulan));
		password = createPasswordCmp("password",value,obj);
	}

	password.setFieldStyle(fieldStyle);
	container.remove(pwdCmp,true);
	container.insert(0,password);
}
function createPasswordContainer(obj){
	var password = createPasswordCmp("password",null,obj);
	var container = Ext.create("Ext.form.FieldContainer",{
    	xtype: 'fieldcontainer',
    	layout:'hbox',
    	anchor: '75%',
    	items:[password,{
    		xtype:'button',
    		text:'show',
    		ulan:'btShow',
    		flex:10,
    		handler:function(){
    			var container = this.up('fieldcontainer');
    			showOrHidePasswordCmp(container,obj);
    		}
    	}]
    });
	return container;
}
function timeFormat(value){
	console.log('value:'+value);
	var valueD = this.getDate(value);
	var da = new Date(valueD);
	var off = valueD.getTimezoneOffset()
	da.setHours(da.getHours()-off/60)
	var va = Ext.Date.format(da,"Y-m-d H:i:s");
		return va;

}
function searchProc(form,button){
	if(form && button){
		var basicForm = form.getForm();
		var search = button;
		var text = search.text;
		var index = text.indexOf("<span style='color:red'> !</span>");
		if(basicForm.isDirty()){
			if(index < 0)
			search.setText(text+"<span style='color:red'> !</span>");
		}else{				
			if(index >= 0){
				search.setText(text.substring(0,index));
			}
		}
	}
}
function textSize(fontSize, text) {
    var span = document.getElementById('textSize111');
    if(!span){
    	console.log('span')
	    span = document.createElement("span");
	    span.id = 'textSize111';
	    span.style.visibility = "hidden";
	    document.body.appendChild(span);
    }
    var result = {};
    result.width = span.offsetWidth;
    result.height = span.offsetWidth; 
//    if (typeof span.textContent != "undefined")
//        span.textContent = text;
//    else 
    	span.innerText = text;
    result.width = span.offsetWidth - result.width;
    result.height = span.offsetHeight - result.height;
//    span.parentNode.removeChild(span);
    return result;
}
function getStrLen(str) {
    var width = len = str.length;
    for(var i=0; i < len; i++) {
        if(str.charCodeAt(i) >= 255) {
            width++;
        }
    }
    return width;
}
function initializeMap() {
	loadGmaps();
}
function loadGmapScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://maps.google.com/maps/api/js?v=3&sensor=false&callback=initializeMap';
	document.body.appendChild(script);
}
function loadGmaps(){
	var script2 = document.createElement('script');
	script2.type = 'text/javascript';
	script2.src = 'gmaps.js';
	document.body.appendChild(script2);
}
function createCheckbox(name,boxLabel,checked){
	var checkbox = Ext.create("Ext.form.field.Checkbox",{
		xtype:'checkbox',
		boxLabel:boxLabel, 
		boxLabelCls:'box_label',
		name: name,
		inputValue:1,
		checked:checked
	})
	return checkbox;
}
