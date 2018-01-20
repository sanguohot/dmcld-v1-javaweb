require.config({
  paths: {
//    "jquery": "lib/jquery-1.11.2.min",
	"jquery":"ace-1.33/assets/js/jquery.2.1.1.min",
//	"jquery": "lib/jquery-tree/js/jquery-1.3.2.min",
//    "bootstrap": "bootstrap-3.3.2-dist/dist/js/bootstrap.min",
	"bootstrap": "ace-1.33/assets/js/bootstrap.min",
    "bootstrap-table": "bootstrap-table/bootstrap-table-all.min",
//     "echarts-main": "echarts-2.2.0/echarts-2.2.0/build/dist/echarts",
//    "echarts-mobile": "echarts-m-1.0.0/source/echarts",
//    "echarts-mobile": "lib/echarts.min",
    "flat-ui-video":"flat-ui/dist/js/vendor/video",
    "table-Export":"ace-1.33/assets/js/tableExport",
    "flat-ui-min":"flat-ui/dist/js/flat-ui.min",
    "flat-ui-app":"flat-ui/docs/assets/js/application",
    "dev-panel":"js/dev/DevPanel",
    "jquery-form":"jquery-form/jquery.form",
    "format":"js/format",
    "auto-fill":"auto-fill/jquery.formautofill",
    "datetimepicker":"datetimepicker/js/bootstrap-datetimepicker",
    "moment":"moment/moment",
    "bootstrap-tags":"bootstrap-tags/dist/bootstrap-tagsinput.min",
    "bootstrap-tags-app":"bootstrap-tags/examples/assets/app",
    "bootstrap-tags-angular":"bootstrap-tags/dist/bootstrap-tagsinput-angular.min",
    "headroom":"lib/Headroom",
    "sco-message":"lib/scojs/js/sco.message",
    "text":"lib/text",
    "dot":"lib/doT.min",
    "theme-macarons":"lib/theme/macarons",
    "ajax-file-upload":"lib/ajaxfileupload",
    "bootstrap-table-export":"bootstrap-table/bootstrap-table-export",
    "table-export":"lib/tableExport",
    "bootstrap-table-cn":"bootstrap-table/locale/bootstrap-table-zh-CN",
    "bootstrap-table-en":"bootstrap-table/locale/bootstrap-table-en-US",
    "chosen":"ace-1.33/assets/js/chosen.jquery.min",
    "ace-extra":"ace-1.33/assets/js/ace-extra.min",
    "ace-main":"ace-1.33/assets/js/ace.min",
    "bootstrap-multiselect":"ace-1.33/assets/js/bootstrap-multiselect.min",
    
    "bootstrap-editable":"ace-1.33/assets/js/bootstrap-editable.min",
    "ace-editable":"ace-1.33/assets/js/ace-editable.min",
    "ace-select2":"ace-1.33/assets/js/select2.min",
    "spinner":"ace-1.33/assets/js/fuelux.spinner.min",
    "ace-el":"ace-1.33/assets/js/ace-elements.min",
    "jquery-valid":"ace-1.33/assets/js/jquery.validate.min",
    "jquery-cookie":"lib/jquery.cookie",
    "dual-list":"ace-1.33/assets/js/jquery.bootstrap-duallistbox.min",

    "lan-cn":"js/lan/LanCn",
    "lan-en":"js/lan/LanEn",
    "lan-con":"js/lan/LanCon",
    "map":"js/map",
    "tip":"js/tip",
    "progress":"js/progress",
    "modal":"js/modal",
    "form-field":"js/FormField",
    "jquery-tree":"lib/jquery-tree/js/navigation",
    "list":"js/list",
    "status":"js/status",
    "tree":"js/tree",
    "validate":"js/validate",
    "global":"js/global",
    "init":"js/init",
    "path":"js/path",

    "devModel-main": "js/devModel/DevModelMain",
    "devModel-list": "js/devModel/DevModelList",
    "devModel-tree": "js/devModel/DevModelTree",
    "devModel-fun":"js/devModel/DevModelFun",
    "dev-calc": "js/dev/DevCalc",
    "dev-call-chart": "js/dev/DevCallChart",
    "dev-call-list": "js/dev/DevCallList",
    "dev-call-fun": "js/dev/DevCallFun",
    "dev-his-calc": "js/dev/DevHisCalc",
    "dev-calc-group": "js/dev/DevCalcGroup",
    "dev-list": "js/dev/DevList",
    "dev-call-calc":"js/dev/DevCallCalc",
    "dev-per-calc":"js/dev/DevPerCalc",
    "dev-per-chart": "js/dev/DevPerChart",
    "dev-per-list": "js/dev/DevPerList",
    "dev-per-fun": "js/dev/DerPerFun",
    "dev-per-calc-new":"js/dev/DevPerCalcNew",
    "dev-alarm":"js/dev/DevAlarm",
    "dev-main":"js/dev/DevMain",
    "dev-sch":"js/dev/DevSch",
    "dev-tree":"js/dev/DevTree",
    "dag-port-list":"js/dev/DagPortList",
    "mtg-port-list":"js/dev/MtgPortList",
    "dev-fun":"js/dev/DevFun",
    "dev-unknown-list":"js/dev/DevUnknowList",
    "dev-conf":"js/dev/DevConf",
    "agp-list":"js/dev/AgpList",
    "dev-lic":"js/dev/DevLic",
    "dev-path":"js/dev/DevPath",
    "dev-zone":"js/dev/DevZone",
    "dev-site":"js/dev/DevSite",
    "zone-fun":"js/dev/ZoneFun",
    "site-fun":"js/dev/SiteFun",
    "dev-validate":"js/dev/DevValidate",
    "site-validate":"js/dev/SiteValidate",
    "dev-type":"js/dev/DevType",
    "dag-cdr":"js/dev/DagCdr",
    "pmd-port":"js/dev/port/PmdPort",
    "pmd-eth":"js/dev/port/PmdEth",
    "pmd-sip":"js/dev/port/PmdSip",
    "pmd-ss7":"js/dev/port/PmdSs7",
    "pmd-dsp":"js/dev/port/PmdDsp",
    "pmd-tgp":"js/dev/port/PmdTgp",
    "pmd-agp":"js/dev/port/PmdAgp",
    "dev-report-fun":"js/dev/DevReportFun",
    "dev-report-list":"js/dev/DevReportList",
    "dev-report-field":"js/dev/DevReportField",
    "dev-config-list":"js/dev/DevConfigList",
    "sip-port-list":'js/dev/SipPortList',
    "sip-port-fun":'js/dev/SipPortFun',

    "dev-ip-list":'js/dev/DevIpList',
    "columns-list":'js/dev/ColumnsList',

    
    "pay-main":"js/pay/PayMain",
    "pay-order":"js/pay/PayOrder",
    "pay-list":"js/pay/PayList",
    "pay-fun":"js/pay/PayFun",
    "pay-tree":"js/pay/PayTree",
    "pay-car":"js/pay/PayCar",
    "pay-salesman":"js/pay/PaySalesman",
    "pay-price":"js/pay/PayPrice",
    "pay-order-item":"js/pay/PayOrderItem",
    "pay-order-detail":"js/pay/PayOrderDetail",
    "pay-sales-detail":"js/pay/PaySalesDetail",
    "pay-validate":"js/pay/PayValidate",
    
    "alarm-main":"js/alarm/AlarmMain",
    "alarm-calc":"js/alarm/AlarmCalc",
    "alarm-column":"js/alarm/AlarmColumn",
    "alarm-log-column":"js/alarm/AlarmLogColumn",
    "alarm-list":"js/alarm/AlarmList",
    "alarm-fun":"js/alarm/AlarmFun",
    "alarm-col-event":"js/alarm/AlarmColEvent",
    "alarm-win":"js/alarm/AlarmWin",
    "alarm-log-win":"js/alarm/AlarmLogWin",
    "alarm-tree":"js/alarm/AlarmTree",
    "run-log-list":"js/alarm/RunLogList",
    "user-log-list":"js/alarm/UserLogList",
    "object-type":"js/alarm/ObjectType",
    "operate-type":"js/alarm/OperateType",
    "alarm-man":"js/alarm/AlarmMan",
    "alarm-grp":"js/alarm/AlarmGrp",
    "alarm-desc":"js/alarm/AlarmDesc",
    "alarm-rule":"js/alarm/AlarmPushRule",
    "alarm-log":"js/alarm/AlarmLogList",
    "alarm-domain":"js/alarm/AlarmDomainList",
    "alarm-validate":"js/alarm/AlarmValidate",
    
    "change-pwd":"js/user/ChangePwd",
    "user-list":"js/user/UserList",
    "domain-group":"js/user/DomainGroup",
    "domain-group-fun":"js/user/DomainGroupFun",
    "user-main":"js/user/UserMain",
    "user-panel":"js/user/UserPanel",
    "user-tree":"js/user/UserTree",
    "role-list":"js/user/RoleList",
    "user-fun":"js/user/UserFun",
    "role-type":"js/user/RoleType",
    "button-list":'js/user/ButtonList',
    
    "service-main":"js/service/ServiceMain",
    "service-dr-status":"js/service/ServiceDrStatus",
    "service-dr-list":"js/service/ServiceDrList",
    "service-dc-status":"js/service/ServiceDcStatus",
    "service-dc-list":"js/service/ServiceDcList",
    "service-dr-his":"js/service/ServiceDrHis",
    "service-dc-his":"js/service/ServiceDcHis",
    "service-fun":"js/service/ServiceFun",
    "service-tree":"js/service/ServiceTree",
    "service-dc-dr-main":"js/service/ServiceDcDrMain",
    "service-alarm":"js/service/ServiceAlarm",
    "service-num-main":"js/service/ServiceNumMain",
    "service-num-list":"js/service/ServiceNumList",
    "service-sip-server-main":"js/service/ServiceSipServerMain",
    "service-sip-server-list":"js/service/ServiceSipServerList",
    "service-freq-main":"js/service/ServiceFreqMain",
    "service-freq-calc":"js/service/ServiceFreqCalc",
    "service-white-num-list":"js/service/ServiceWhiteNumList",
    "service-domain-list":"js/service/ServiceDomainList",
    
    "write-msg":"js/mes/WriteMsg",
    "mes-main":"js/mes/MesMain",
    "send-msg":"js/mes/SendMsg",
    "msg-fun":"js/mes/MsgFun",
    "dr-box":"js/mes/DraftBox",
    "rec-msg":"js/mes/ReceivingMsg",	
//    "myhtml":"text!thtml",
    "ver-main":"js/version/VersionMain",
    "ver-list":"js/version/VersionList",
    "ver-fun":"js/version/VersionFun",
    "pri-pri":"js/privilege/Privilege",
    
    "report-main":"js/report/ReportMain",
    "user-report-list":"js/report/UserReportList",
    'user-report':'js/report/UserReport',
    'user-report-charts':'js/report/UserReportCharts',
    'report-fun':'js/report/ReportFun',
    "dev-report-list1":"js/report/DevReportList1",
    "dev-report":'js/report/DevReport',
    "dev-report-charts":'js/report/DevReportCharts',
    "alarm-report-list":"js/report/AlarmReportList",
    "alarm-report":'js/report/AlarmReport',
    "alarm-report-charts":'js/report/AlarmReportCharts',
   
    
  },
  shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bs'
    }, 
    'ace-main': {
        deps: ['bootstrap'],
        exports: 'ace-main'
     },
    'flat-ui-min': {
      deps: ['flat-ui-video'],
      exports: 'fum'
    },
    'flat-ui-app': {
      deps: ['flat-ui-min'],
      exports: 'fua'
    },
    'bootstrap-table-cn': {
        deps: ['bootstrap-table'],
        exports: 'btc'
      },
      'bootstrap-table-en': {
          deps: ['bootstrap-table'],
          exports: 'btcn'
        },     
      'bootstrap-table-export': {
          deps: ['bootstrap-table'],
          exports: 'bten'
        },
    'bootstrap-table-export': {
        deps: ['bootstrap-table'],
        exports: 'bte'
      },
    'init': {
      deps: ['jquery-valid','ace-editable'],
      exports: 'init'
    },
    'ace-editable': {
      deps: ['bootstrap-editable'],
      exports: 'init'
    },
    'dot': {
	    exports: 'dot'

	  

	  },
	  'bootstrap-table-cookies':{
		  deps: ['bootstrap-table'],
	      exports: 'btc'
      }

  }
});

if(window.location.pathname.indexOf("/alipay.html")>=0){	
	window.location = "login.html";
}
require(['ace-main'],function(ace){
	$(document).ajaxComplete( function(event, jqXHR, options){
		//超时需要退出重新登录
		if(jqXHR.responseText && jqXHR.responseText=="{login_timeout:true}"){
			if(window.location.search){
				window.location = "login.html"+window.location.search;
			}else{
				window.location = "login.html";
			}			
		}
	});
	$.ajax({ 
		url: "userManager!getUserSession.action",
		complete: function(data,str){
		if(data.responseJSON && data.responseJSON.success){
			var obj=data.responseJSON.curUser;
			if(obj){
				window.user=obj;				
			}
			window.extra=data.responseJSON.extra;
			window.alipay=data.responseJSON.alipayModule;
			if(window.alipay=="on"){
				$("#pay_manage").parent().css("display","inline-block");
			}			
		}
		if(data.responseJSON && data.responseJSON.extra){
			window.extra=data.responseJSON.extra;
		}
		if(data.responseJSON && data.responseJSON.operateNew){
			window.operateNew=data.responseJSON.operateNew;
		}
		require(['lan-con','global','format','tip','list','dot','form-field','modal','status','validate','role-type','pay-fun'
		         ,'bootstrap-tags-app','jquery-form'
		         ,'auto-fill','datetimepicker','map','sco-message','text','ajax-file-upload','bootstrap-table-export','table-export'

		         ,'bootstrap-table-en','bootstrap-table-cn','ace-select2'

		         ,'bootstrap-table-en','bootstrap-table-cn','ace-select2',/*'bootstrap-table-cookies',*/

		         ,'bootstrap-editable','spinner','ace-editable','ace-el','jquery-valid','chosen','jquery-cookie','dual-list','bootstrap-multiselect']
		         ,function(lc,global,format,tip,list,dot,field,modal,status,validate,rt,payFun){
			lc.initLan(callAfterLan);
			window.lc=lc;
			window.global=global;
			window.tip=tip;
			window.list=list;
			window.sta=status;
			window.modal=modal;
			window.validate=validate;
			window.dev={};
			window.dev.devPer={};
			window.format=format;
			window.field=field;
			window.dot=dot;
			window.roleType=rt;
			//window.setTimeout(alert('aaaaa'),5000);
			lc.changeLocale();
		
			if(window.location.search.indexOf("alarmUuid=")>=0){
				require(['alarm-fun'],function(fun){
					fun.viewAlarm();
				})
			}			
			if(window.alipay!="on"){
				return;
			}
			if(window.location.pathname.indexOf("/alipay.html")<=0){
				payFun.init();
			}

		})
	}});
	
	window.setInterval("window.global.getMailTip()",10000);
	
})

function callAfterLan(){
	require(['init'],null);
	$("#logo").html('<i class="fa fa-cloud"></i>'+window.lc.getValue("cloudCenter"));
	$("#dev_manage").attr("title",window.lan["devManage"]);
	$("#service_manage").attr("title",window.lan["serviceManage"]);
	if(window.roleType.isSuper(window.user.roleId)){
		$("#service_version").show();
		$("#common_report").show();
	$("#service_version").attr("title",window.lan["version"]);
	$("#common_report").attr("title",window.lan["commonReport"]);
	}
	$("#user_manage").attr("title",window.lan["userManage"]);
	if(window.alipay=="on"){
		$("#pay_manage").attr("title",window.lan["payManage"]);
	}
	
	$("#version_store").attr("title",window.lan["versionStore"]);
	$("#dev_model_store").attr("title",window.lan["devModelStore"]);
	$("#mes_description").attr("title",window.lan["message"]);
	$("#logout").html(window.lan["logout"]);
//	$("#work_station").html(window.lan["workStation"]);
	$("#alarm_log").attr("title",window.lan["alarmLog"]);
    $("#logout").html('<i class="fa fa-power-off"></i>'+window.lan["logout"]+'</a>');
    $("#transToOld").html('<i class="fa fa-share"></i>'+window.lan["transToOld"]+'</a>');
    $("#change_pwd").html('<i class="fa fa-exchange"></i>'+window.lan["changePwd"]+'</a>');
    if(window.user){
	    var h='<i class="fa fa-user"></i>'+window.lc.getValue("welcome")+','+window.user["name"]+' <b class="caret"></b>';
	    $("#cur_user").html(h);
    }
  $("#logout").bind("click",function(){
	  $.ajax({
			 url: "userManager!cleanSession.action",
			 
			  
		  })
	  window.location="login.html";
	  
  });
  $("#change_pwd").bind("click",function(){
		 var bt=$("button[class=navbar-toggle]");
		 if(bt.attr("aria-expanded")=="true"){
			 $("button[class=navbar-toggle]").trigger("click");
		 }
	  require(['change-pwd'],function(cp){
		  cp.createPanel();
	  });
  });

  //上下滚动时，设置顶部导航条隐藏或显示
  require(['headroom'],function(hr){
    // 获取页面元素
    var myElement = document.querySelector("nav");
    // 创建 Headroom 对象，将页面元素传递进去
    var headroom  = new Headroom(myElement);
    // 初始化
    headroom.init();
  })

//顶部导航条事件处理
	$('#bs-example-navbar-collapse a').click(function (e) {
		 e.preventDefault();
		 var c=$(this);
		 var p=$(this).parent().parent();
		 var children=p.children();
		 var aid=$(this).attr("id");
		 var li=$(this).parent();
		 if(!li.hasClass("dropdown")){
			 children.each(function(){
				$(this).removeClass("active");
			 });
			 li.addClass("active");
		 }
		 if(aid){
			 if(aid=="service_manage" || aid=="dev_manage" || aid=="service_version"||aid=="user_manage" || aid=="alarm_log" || aid=="dev_model_store" || aid=="pay_manage"||aid=="mes_description"||aid=="common_report"){

				 var bt=$("button[class=navbar-toggle]");
				 if(bt.attr("aria-expanded")=="true"){
					 $("button[class=navbar-toggle]").trigger("click");
				 }
				  var node=window.global.getNode();
				 window.curNid=null;
				 
				 $("#nav-list").html("");
			    //激活模块
			    activeModule($(this).attr("id"));
			    return;
			 }
		 }
	})

	//临时跳转到充值
	if(window.alipay!="on"){
		$("#dev_manage").trigger("click");
		return;
	}
	$('#pay_manage').trigger("click");
}

function activeModule(module){
  if(module=="service_manage"){
    require(['service-main'], function (dm){
      window.serviceMain=dm;
      window.searchCol=false;
      dm.init();
    });
  }else if(module=="dev_manage"){
	  $("#my-tab-position").parent().css("margin-top","20px");
    require(['dev-main'], function (dm){
      window.devMain=dm;
      window.searchCol=false;
      dm.init();
    });
  }else if(module=="dev_model_store"){
    require(['devModel-main'], function (dMm){
      window.devModelMain=dMm;
      dMm.init();
    });
  }else if(module=="alarm_log"){
    require(['alarm-main'], function (am){
        window.alarmMain=am;
        am.init();
      });
  }else if(module=="user_manage"){
    require(['role-type','user-main'], function (rt,um){
        window.userMain=um;
        window.roleType=rt;
        um.init();
      });
  }else if(module=="pay_manage"){
		if(window.alipay!="on"){
			return;
		}
	    require(['pay-main'], function (um){
	        window.payMain=um;
	        um.init();
	      });
	  }else if(module=="mes_description"){
		    require(['mes-main'], function (mm){
		        window.mesMain=mm;
		        mm.init();
		      });
	  } else if(module=="service_version"){
		  require(['ver-main'],function(vm){
			  window.verMain=vm;
		        vm.init();
		  });
		  
	  }else if(module=="common_report"){
		  require(['report-main'],function(rm){
			  window.reportMain=rm;
		        rm.init();
		  });
		  
	  }
}
