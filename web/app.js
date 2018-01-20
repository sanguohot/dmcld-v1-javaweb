Ext.Loader.setConfig({enabled:true,scriptCharset:'utf-8',disableCaching:true,dcVersion:17.00});
Ext.Loader.setPath('Ext.ux.desktop', 'app');
Ext.Loader.setPath('Ext.ux.grid', 'extjs/examples/ux/grid');

var lanControll = Ext.create('app.lan.LanControll');

Ext.require('Ext.container.Viewport');
Ext.require('Ext.window.MessageBox');
Ext.require('app.store.DesktopModel');
// Ext.require('app.view.SystemStatus');
Ext.require('app.view.operation.OperationModule');
Ext.require('app.view.provision.ProvisionModule');
Ext.require('app.view.operation.MaintenanceModule');
Ext.require('app.view.monitor.MonitorModule');
Ext.require('app.view.systemconfig.SystemConfigModule');
Ext.require('app.view.log.LogModule');
Ext.require('app.view.privilege.PrivilegeModule');
Ext.require('app.view.Settings');
Ext.require('app.lan.LanControll');
Ext.require('app.view.log.AlarmObject');
Ext.require('app.util.Override');

var alarmObject;
var override;
var task;
var rs;
var Color;
var ip;
var controller;
var treeFn;
var roleType;
var privilege;
var autoRefresh;
var alarmUtil;

var boxWarnning,boxSuccess,boxFailture,boxNoRecordSel,boxCancelSucc,boxCancelFail,boxSaveOrNot,
boxCommitSucc,boxCommitFail,boxClearSucc,boxClearFail,boxInfo,boxImport,boxImportSucc,boxImportFail,boxExport,boxExportSucc
,boxExportFail,boxWaitMsg,boxLocalMode,boxJumpToLic,boxError,boxReset,boxElegantStop
,boxBkpNotBindSim,boxBkpNotBindGwp,boxPromotion,boxRequestTimeout,boxIllegalData
,boxUnknowError,boxWaitTitle,boxLoadingMsg,boxInitMsg,boxCompletedMsg,boxGwpNotBindBkp
,boxSimNotBindBkp,boxDownChart,boxStopSyslog,boxUpgradeNeedEnable,boxOneTypeToUpgrade
,boxCanNotUpgrade,boxUpgradeStatus,boxErrorRemote,boxOnlyOneRecord,boxAtLeastOneRecord,boxDefault
,boxIsUsing,boxHasChildNode,boxUseSucc,boxUseFail,boxDelSucc,boxDelFail,boxTerms,boxBackup,boxDiscardList
,boxReboot,boxRestorePwd,boxMaxNe,boxDelNe,boxDelModel,boxDelNode,boxRestore,boxNoRight,boxForbidden
,boxDelUser,boxDelDefAdmin,boxDelSuperAdmin,boxResetUserPwd,boxSimNotAvailable
,tiSearch,tiSetting,tiDetail,tiResult,tiUpdatePort,tiLicSysList,tiLicDomainList,tiLicInfo
,ti15MinList,ti24HourList,tiCurList,tiChart,tiNeCur,tiNe24Hour,tiNe15Min,tiCdrList
,tiUssdList,tiSmsList,tiSysList,tiDomainList,tiDeviceList,tiPortList,tiPortMap,tiTableInfo
,admin_enable,admin_disable,admin_locked,admin_noBalance,admin_null,admin_demo
,tiLicCardList,tiLicCardLogList,tiLicSysLogList,tiLicDomainLogList,alreadyInUse;
var style = document.createElement('style');
document.getElementsByTagName('HEAD').item(0).appendChild(style);
var styleSheet = document.styleSheets[document.styleSheets.length - 1];
var adminSizeObj = {labelWidth:180,width:280},logObj;
var height=25;
Ext.define('dmsApp', {

	extend : 'Ext.ux.desktop.App',
	init : function() {
//		Ext.Ajax.disableCaching = false;
		ip=Ext.create('app.util.InitPanel',{});
		rs=Ext.create('app.util.Status',{});
		Color=Ext.create('app.util.Color',{});
		
//		lanControll = Ext.create('app.lan.LanControll');
		alarmObject = Ext.create('app.view.log.AlarmObject');
		override = Ext.create('app.util.Override');
		window.mc=Ext.create("app.view.msg.MsgC");
		window.mc.init();
		autoRefresh = Ext.create('app.util.AutoRefresh',{});
		alarmUtil = Ext.create('app.util.Alarm',{});
		controller = Ext.create('app.util.Controller',{});
		treeFn = Ext.create('app.util.TreeFn',{});
		roleType = Ext.create("app.util.RoleType");
		lanControll.initLan();
		privilege = Ext.create("app.view.privilege.Privilege",{});
		privilege.initPrivilege();
		alarmObject = Ext.create('app.view.log.AlarmObject');
		logObj = Ext.create('app.view.log.LogObject');
		override.init();
		// custom logic before getXYZ methods get called...
		var a=this.callParent();
//		加载不打开版本信息页面
//		var hide=ip.readDB('vv',0,'hide');
//		if(hide!='1'){
//			var vp=Ext.getCmp('vp');
//			if(!vp){
//				vp=Ext.create('app.view.version.VersionPanel');
//			}
//			vp.show();
//		}
		var mp=Ext.getCmp('mp');
		if(!mp){
			mp=Ext.create('app.view.common.ModulePanel',{id:'mp',height:(this.desktop.getHeight()-height-1)});
		}
		var lbar=[];
		var haveConfig=false;
		var haveMainten=false;
    var showMonitor = false;
		for(var a=0;a<store.getCount();a++){
			var rec=store.getAt(a);
			var module=rec.get('module');
			var bg='#285BA7';
			var btnText='<font color="#FFFFFF">'+rec.get('name')+'</font>';
//			if(module=='operation_win'){
//				bg='#62D7FA';
//				btnText='<font color="#DB5224">'+rec.get('name')+'</font>';
//				haveConfig=true;
//			}
//			if(!haveConfig && module=='maintenance_win'){
//				bg='#62D7FA';
//				btnText='<font color="#DB5224">'+rec.get('name')+'</font>';
//				haveMainten=true;
//			}
      if(module=='batch_win'){
        bg='#62D7FA';
        btnText='<font color="#DB5224">'+rec.get('name')+'</font>';
        showMonitor=true;
      }
      if(!showMonitor && module=='maintenance_win'){
        bg='#62D7FA';
        btnText='<font color="#DB5224">'+rec.get('name')+'</font>';
        haveMainten=true;
      }
            if(module=='systemConfig_win' || module == 'license_win' || module == 'version_info'){
                continue;
            }
			var t=Ext.create('Ext.button.Button',{
		    	text:btnText,
		    	iconCls: rec.get('iconCls'),
		    	scale: 'large',
		    	width:83,
		    	iconAlign: 'top',
		    	module:module,
		    	text2:rec.get('name'),
		    	style: {
		    		background: bg,
		    	},
		    	handler: function() {
//		    		Ext.suspendLayouts();
					var openLink=null;
					if(treeFn.record){
						openLink=treeFn.record.raw.nid;
					}
					ip.closeAllFlag=false;
		    		var win=ip.createModule(this.module,openLink);
		    		if(win){
		    			if(treeFn.record){
		    				var treepanel = win.down('treepanel');
		    				if(treepanel){
		    					var rootNode=treepanel.getRootNode();
			        			var node=rootNode.findChild('nid',treeFn.record.raw.nid,true);
				    			if(node){
				    				var temp=node;
				    				for(var c=0;c<5;c++){
				    					if(temp.parentNode){
				    						temp=temp.parentNode;
				    						if(temp){
				    							if(!temp.isExpanded()){
				    								treepanel.expandNode(temp);
				    							}
				    						}
				    					}else{
				    						break;
				    					}
				    				}
				    				treepanel.getSelectionModel().select(node);
				    				treepanel.fireEvent('itemclick',null,treeFn.record);
				    				treepanel.getSelectionModel().setLastFocused(node);
				    			}
		    				}
		    				
		    			}
		    			if(treeFn.triggerValue!=undefined){
		    				win.down('trigger').setValue(treeFn.triggerValue);
		    			}
		    		}
		    		var tb=this.up('toolbar').query('button');
		    		for(var b=0;b<tb.length;b++){
		    			tb[b].getEl().setStyle('background-color','#285BA7');
		    			tb[b].setText('<font color="#FFFFFF">'+tb[b].text2+'</font>');
		    		}
		    		
		    		this.getEl().setStyle('background-color','#62D7FA');
		    		this.setText('<font color="#DB5224">'+this.text2+'</font>');
		    		
//		    		Ext.resumeLayouts(true);
		    	}
			});
			lbar.push(t);
			lbar.push(' ');
			lbar.push(' ');
		}
		var dockedItems = {
				xtype: 'toolbar',
			    autoScroll:true,
			    dock: 'right',
			    border: 0,
			    width:83,
			    style: {
		    		background: '#285BA7',
		    		borderColor: '#285BA7',
			        borderStyle: 'solid'
		    	},
		    	margin:'0 0 0 0',
		    	padding:'0 0 0 0',
				items:lbar
		};
        //初始化桌面打开monitor_win窗口
		if(showMonitor){
			ip.createModule('batch_win');
//			ip.createModule('msg_win');
		}else if(haveMainten){
			ip.createModule('maintenance_win');
		}
		mp.addDocked(dockedItems);
		mp.show();
		
	},

	getDesktopConfig : function() {
		var me = this, ret = me.callParent();
		var wallpaper = ip.readDB('dtb',0,'view');
		if(!wallpaper){
			wallpaper="resources/wallpapers/desk.jpg";
		}
		return Ext.apply(ret, {
			// cls: 'ux-desktop-black',
			contextMenuItems : [ {
				text : lanControll.getLanValue('tiChangeSetting'),
				handler : me.onSettings,
				scope : me
			},{
				text:lanControll.getLanValue('transToNew'),
				handler:function(){
					window.location = "bootstrap.html";
				}
//	       		iconCls: 'domain-group',
			},{
				text : lanControll.getLanValue('language'),
				menu:{
				    xtype:'menu',
				    items: [{
				        text: 'English',
				        handler:function(){
				    		changeLan(2);
				    	},
				    },{
				        text: '中文',
				        handler:function(){
				    		changeLan(1);
				    	}
				    }]			
				}
			}],
			/*hide the desktop icon*/
//			shortcuts :store,
			wallpaper : wallpaper,
			wallpaperStretch : true
		});
	},
	
	getModules : function() {
		var desktopArray=new Array();
		for(var i=0;i<store.getCount();i++){
			var module=store.getAt(i).get('module');
			
			if(module=='monitor_win'){
				desktopArray[i]=Ext.create('app.view.monitor.MonitorModule');
			}else if(module=='operation_win'){
				desktopArray[i]=Ext.create('app.view.operation.OperationModule');
			}else if(module=='maintenance_win'){
				desktopArray[i]=Ext.create('app.view.operation.MaintenanceModule');
			}else if(module=='provision_win'){
				desktopArray[i]=Ext.create('app.view.provision.ProvisionModule');
			}else if(module=='systemConfig_win'){
				desktopArray[i]=Ext.create('app.view.systemconfig.SystemConfigModule');
			}else if(module=='log_win'){
				desktopArray[i]=Ext.create('app.view.log.LogModule');
			}else if(module=='license_win'){
				desktopArray[i]=Ext.create('app.view.license.LicenseModule');
			}else if(module=='version_info'){
				desktopArray[i]=Ext.create('app.view.version.VersionInfoModule');
			}else if(module=='privilege_win'){
				desktopArray[i]=Ext.create('app.view.privilege.PrivilegeModule');
			}else if(module=='batch_win'){
                desktopArray[i]=Ext.create('app.view.batch.BatchModule');
            }else if(module=='msg_win'){
                desktopArray[i]=Ext.create('app.view.msg.MsgModule');
            }
		}
		
		return desktopArray;

	},

	// config for the start menu
	getStartConfig : function() {
		var me = this, ret = me.callParent();

		return Ext.apply(ret, {
			title : lanControll.getLanValue('loginAs')+'<b>'+username+'</b>',
			iconCls : 'user',
			height : 300,
			toolConfig : {
				width : 100,
				items : [ {
					text : tiSetting,
					iconCls : 'settings',
					handler : me.onSettings,
					scope : me
				}, '-', {
					text : lanControll.getLanValue('logout'),
					iconCls : 'logout',
					handler : me.onLogout,
					scope : me
				} ]
			}
		});
	},
	map_init2:function(){
		alert('tes');
	},
	getTaskbarConfig : function() {
		var ret = this.callParent();
		//给InitPanel中的app赋值
		ip.app=ret.app;
		var desktopArray=new Array();
		for(var i=0;i<store.getCount();i++){
			var module=store.getAt(i).get('module');
			if(module=='monitor_win'){
				desktopArray[i]={name : lanControll.getLanValue('modulePerName'),iconCls : 'monitor-small',module : 'monitor_win'};
			}else if(module=='operation_win'){
				desktopArray[i]={name : lanControll.getLanValue('moduleConfigName'),iconCls : 'operation-small',module : 'operation_win'};
			}else if(module=='maintenance_win'){
				desktopArray[i]={name : lanControll.getLanValue('moduleMainName'),iconCls : 'maintain-small',module : 'maintenance_win'};
			}else if(module=='provision_win'){
				desktopArray[i]={name : lanControll.getLanValue('moduleProName'),iconCls : 'provision-small',module : 'provision_win'};
			}else if(module=='systemConfig_win'){
				desktopArray[i]={name : lanControll.getLanValue('moduleSystemCfgName'),iconCls : 'systemconfig-small',module : 'systemConfig_win'};
			}else if(module=='log_win'){
				desktopArray[i]={name : lanControll.getLanValue('moduleLogName'),iconCls : 'log-shortcut',module : 'log_win'};
			}else if(module=='license_win'){
				desktopArray[i]={name : lanControll.getLanValue('moduleLicName'),iconCls : 'license-small',module : 'license_win'};
			}else if(module=='version_info'){
				desktopArray[i]={name : lanControll.getLanValue('moduleVersionName'),iconCls : 'notepad',module : 'version_info'};
			}else if(module=='privilege_win'){
				desktopArray[i]={name : lanControll.getLanValue('modulePrivilegeName'),iconCls : 'privilege-shortcut',module : 'privilege_win'};
			}else if(module=='batch_win'){
                desktopArray[i]={name : lanControll.getLanValue('moduleBatchName'),iconCls : 'batch-shortcut',module : 'batch_win'};
            }else if(module=='msg_win'){
                desktopArray[i]={name : lanControll.getLanValue('moduleMsgName'),iconCls : 'msg32',module : 'msg_win'};
            }
		}
		var startText="Start";
		var startWidth=86;
		if(vendorId=="1"){
			startText="UCSPEED";
		}else if(vendorId=="101"){
			startText="UCSPEED";
		}else if(vendorId=="2"){
			startText="DINSTAR";
		}else if(vendorId=="102"){
			startText="DINSTAR";
		}else if(vendorId=="3" || vendorId=="103"){
			if(getCookie("userLan")=="1"){
				startText="畅游宝";
			}else{
				startText="CHANGYOU";
				startWidth=120;
			}
		}else{
			startText="UCSPEED";
		}
		console.log(document.title);
		if(getCookie("userLan")=="1"){
			document.title=startText+"管理系统";
		}else{
			document.title=startText+" Management System";
		}
		
		startText="<b><font color='#2254AA'>"+startText+"</font></b>";
		
		return Ext.apply(ret, {
			/* hide the quick start icon */
//			quickStart :desktopArray,
			startBtnText:startText,
			width:startWidth,
//			viewBtn:btn,
			height:height,
			trayItems : [{
				text:lanControll.getLanValue('transToNew'),
				handler:function(){
					window.location = "bootstrap.html";
				}
//	       		iconCls: 'domain-group',
			},{
				handler : function(){					
					changeLan(1);
				},
				icon:'app/lan/cn.png',
			},'-',{
				icon:'app/lan/en.png',
				handler : function(){				
					changeLan(2);
				},
			},'-',{
				xtype:'displayfield',
				value :sysAlias+"("+serverIp+")",
				cls: 'ux-desktop-trayclock',
			},{
				xtype : 'trayclock',
				flex : 1
			} ]
		});
	},
	
	onLogout : function() {
		Ext.Msg.confirm(boxWarnning, lanControll.getLanValue('boxLogout'), function(
				btn, text) {
			if (btn == 'yes') {
				window.location = 'login.html';
				logout(false);
			}
		});
	},

	onSettings : function() {
		var dlg = new app.view.Settings( {
			desktop : this.desktop
		});
		dlg.show();
	}

});
var store=null;
var domainUuid="";
var userUuid="";
var username="";
var serverIp="";
var sysUuid=0;
var vendorId=0;
var productId=0;
var roleObj=null;
var sysMode=-1;
var licStatus=-1;
var dnsUrl="";
var provUrl="";
var sysAlias="";
var realSysUuid=0;
Ext.application( {
	name : 'dms',
	appFolder : 'app',
	launch : function() {
		store=Ext.create('app.store.DesktopStore');
		store.on('load',function(store, options){
			var dmsApp=Ext.create('dmsApp', {});
			for(var i=0;i<store.getCount();i++){
//				store.getAt(i).set("name","log")
				var module=store.getAt(i).get('module');
				
				if(module=='monitor_win'){
					store.getAt(i).set("name",lanControll.getLanValue('modulePerName'))					
				}else if(module=='operation_win'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleConfigName'))
				}else if(module=='maintenance_win'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleMainName'))
				}else if(module=='provision_win'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleProName'))
				}else if(module=='systemConfig_win'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleSystemCfgName'))
				}else if(module=='log_win'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleLogName'))
				}else if(module=='license_win'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleLicName'))
				}else if(module=='version_info'){
					store.getAt(i).set("name",lanControll.getLanValue('moduleVersionName'))
				}else if(module=='privilege_win'){
					store.getAt(i).set("name",lanControll.getLanValue('modulePrivilegeName'))
				}else if(module=='batch_win'){
                    store.getAt(i).set("name",lanControll.getLanValue('moduleBatchName'))
                }else if(module=='msg_win'){
                    store.getAt(i).set("name",lanControll.getLanValue('moduleMsgName'))
                }
//				var record = Ext.create("app.store.DesktopModel");
//				record.set('name',"");
//				record.set('name',"");
			}
		});
		
		Ext.Ajax.on('beforerequest', function(conn,options,eopts){
			var domainUuid = Ext.get('domainUuid').value;
			var roleId = Ext.get('roleId').value;
//			console.log("beforerequest---roleId="+roleId+","+"domainUuid="+domainUuid+",options="+options);
			if(roleType && !roleType.isSuper(roleId) && domainUuid){
				domainUuid=parseInt(domainUuid);
				if(options.url){
					if(options.url.indexOf('domainUuid')>=0){

					}else{
						if(options.form){
							var _form=options.form;
							for(var a=0;a<_form.length;a++){
								if(_form[a].name=='domainUuid'){
									return;
								}
							}
						}
						if(options.params){
							options.params['domainUuid'] = domainUuid;
						}else{
							options.params = {domainUuid:domainUuid};
						}
					}
				}
			}
		}, this);

		
		Ext.Ajax.on('requestcomplete', getUserName, this);
		function getUserName(conn, response, options) {
            if(response.responseXML){
                return;
            }
			var res=Ext.JSON.decode(response.responseText);
			var timeout=res['login_timeout'];

			if(timeout==true){
				var redirect = 'login.html';
				window.location = redirect;
				logout(true);
			}else{
				username=res['username'];
				userUuid=res['userUuid'];
				var type=res['type'];
				var dnsUrl=res['dnsUrl'];
				var cookieList=res['cookieList'];
				domainUuid=res['domainUuid'];
				serverIp=res['serverIp'];
				sysUuid=res['sysUuid'];
				sysMode=res['sysMode'];
				licStatus=res['licStatus'];
				provUrl=res['provUrl'];
				sysAlias=res['sysAlias'];
				roleObj=res['roleObj'];
				realSysUuid=res['realSysUuid'];
				vendorId=res['vendorId'];
				productId=res['productId'];
				if(username!=undefined && username!=""&& type>-1){
					if(vendorId=="2"){
						Ext.get('resources').value="resources2";
					}else if(vendorId=="1"){
						Ext.get('resources').value="resources1";
					}else if(vendorId=="101"){
						Ext.get('resources').value="resources101";
					}else if(vendorId=="102"){
						Ext.get('resources').value="resources102";
					}else{
						Ext.get('resources').value="resources2";
					}
					lanControll.resources = Ext.get('resources').value;
					Ext.get('roleId').value=res['roleId'];
					Ext.get('g_usertype').value=type;
					Ext.get('username').value=username;
					Ext.get('userUuid').value=userUuid;
					Ext.get('domainUuid').value=domainUuid;
					Ext.get('sysUuid').value=sysUuid;
					Ext.get('vendorId').value=vendorId;
					Ext.get('productId').value=productId;
					Ext.get('cookieList').value=cookieList;
					Ext.get('roleObj').value=roleObj;
					Ext.get('sysMode').value=sysMode;
					Ext.get('licStatus').value=licStatus;
					Ext.get('dnsUrl').value=dnsUrl;
					Ext.get('provUrl').value=provUrl;
					Ext.get('sysAlias').value=sysAlias;
					Ext.get('realSysUuid').value=realSysUuid;
					console.log(Ext.get('realSysUuid').value);
				}

			}
		}
		store.load();
	}

});