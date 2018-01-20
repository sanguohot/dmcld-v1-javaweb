'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$rootScope','$window','$routeParams', '$location', '$cookies', function ($scope, $rootScope, $window, $routeParams , $location,$cookies) {
    $scope.slide = '';
    $rootScope.isHome= true;

    $rootScope.back = function() {
      $scope.slide = 'slide-right';
      $window.history.back();
    };

    $rootScope.go = function(path){
      $scope.slide = 'slide-left';
      $location.path(path);
    };

    $rootScope.getSelect = function(para,num,type){
      if(type == 'form'){
        setTimeout(function(){
          document.forms[num][para].select();
          document.forms[num][para].style.borderColor = 'red';
        },300)
      }else{
        setTimeout(function(){
          document.getElementById(para).select();
          document.getElementById(para).style.borderColor = 'red';
        },300)
      }

    }

    $rootScope.getFocus = function(para,num,type){
      if(type == 'form'){
        setTimeout(function(){
          document.forms[num][para].focus();
          document.forms[num][para].style.borderColor = 'red';
        },300)
      }else{
        setTimeout(function(){
          document.getElementById(para).focus();
          document.getElementById(para).style.borderColor = 'red';
        },300)
      }
    }

  }])

  .controller('contentCtrl', ['$scope', '$rootScope', '$routeParams', '$cookies', 'SaveService','CheckNameService','XmlStrServer',
    function ($scope, $rootScope, $routeParams, $cookies ,SaveService,CheckNameService,XmlStrServer) {
      $scope.title = '配置模板管理系统';
      $scope.SipServer = true;
      $scope.LineParam = false;
      $scope.MediaStream = false;
      $scope.SipParam = false;
      $scope.FaxCfg = false;
      $scope.DigitMap = false;
      $scope.FeatureCodes = false;
      $scope.SystemCfg = false;
      $scope.ActionUrl = false;
      $scope.WildProxyReg = false;
      $scope.PortGroup = false;
      $scope.IPTrunk = false;
      $scope.RouteIP2PSTNParam = false;
      $scope.RouteIP2PSTN = false;
      $scope.RoutePSTN2IP = false;
      $scope.RouteIP2IP = false;
      $scope.TR069Param = false;
      $scope.NetSNMPParam = false;
      $scope.SyslogParam = false;
      $scope.Provision = false;
      $scope.CloudServerCfg = false;
      $scope.UserManage= false;
      $scope.RemoteServerCfg= false;
      $scope.RelayServerCfg = false;
      $scope.WhiteListForWEB = false;
      $scope.WhiteListForTEL = false;
      $scope.Password = false;
      $scope.Encrypt = false;
      $scope.EiaRecordCfg=false;
      $rootScope.is_post = false;
      $rootScope.is_alert = false;

      //左侧菜单控制函数
      $scope.menu_click = function (plus_minus,id_Menu)
      {
        if(document.getElementById(id_Menu).style.display == "none")
        {
          hide_all();
          document.getElementById(id_Menu).style.display = "";
          document.getElementById(plus_minus).src = "image/minus.gif";
        }
        else
        {
          document.getElementById(id_Menu).style.display = "none"
          document.getElementById(plus_minus).src = "image/plus.gif";
        }
      }

      $rootScope.href_click = function (to_Show) {
        var form_arr = [
          'SipServer',
          'LineParam',
          'MediaStream',
          'SipParam',
          'FaxCfg',
          'DigitMap',
          'FeatureCodes',
          'SystemCfg',
          'ActionUrl',
          'WildProxyReg',
          'PortGroup',
          'IPTrunk',
          'RouteIP2PSTNParam',
          'RouteIP2PSTN',
          'RoutePSTN2IP',
          'RouteIP2IP',
          'TR069Param',
          'NetSNMPParam',
          'SyslogParam',
          'Provision',
          'CloudServerCfg',
          'UserManage',
          'RemoteServerCfg',
          'RelayServerCfg',
          'WhiteListForWEB',
          'WhiteListForTEL',
          'Password',
          'Encrypt',
          'EiaRecordCfg',
        ]

        for(var i in form_arr){
          if(to_Show == form_arr[i]){
            $scope[form_arr[i]] = true;
          }else{
            $scope[form_arr[i]] = false;
          }
        }
      }

      function hide_all()
      {
        document.getElementById("id_Statistics").style.display = "none"
        document.getElementById("plus_minus0").src = "image/plus.gif";

        document.getElementById("id_NetworkConfig").style.display = "none"
        document.getElementById("plus_minus2").src = "image/plus.gif";

        document.getElementById("id_Advanced").style.display = "none"
        document.getElementById("plus_minus5").src = "image/plus.gif";

        document.getElementById("id_RouteConfig").style.display = "none"
        document.getElementById("plus_minus6").src = "image/plus.gif";

        document.getElementById("id_ManipulationConfig").style.display = "none"
        document.getElementById("plus_minus7").src = "image/plus.gif";

        document.getElementById("id_Tools").style.display = "none"
        document.getElementById("plus_minus10").src = "image/plus.gif";

        document.getElementById("id_Security").style.display = "none"
        document.getElementById("plus_minus9").src = "image/plus.gif";

        document.getElementById("id_Management").style.display = "none"
        document.getElementById("plus_minus8").src = "image/plus.gif";
      }

      $scope.toClose = function(para){
        $rootScope[para]= false;
      }

      $scope.toSaveWhole = function(){
        if( $rootScope.SipServerFormCheck() == true && $rootScope.LineParamFormCheck() == true && $rootScope.MediaStreamFormCheck() == true
          && $rootScope.SipParamFormCheck() == true && $rootScope.FaxCfgFormCheck() == true && $rootScope.DigitMapFormCheck() == true
          && $rootScope.FeatureCodesFormCheck() == true && $rootScope.SystemCfgFormCheck() == true && $rootScope.ActionUrlFormCheck() == true
          && $rootScope.TR069ParamFormCheck() == true && $rootScope.NetSNMPParamFormCheck() == true && $rootScope.SyslogParamFormCheck() == true
          && $rootScope.RelayServerCfgFormCheck() == true
          && $rootScope.ProvisionFormCheck() == true && $rootScope.CloudServerCfgFormCheck() == true
          && $rootScope.WhiteListForWEBFormCheck() == true && $rootScope.WhiteListForTELFormCheck() == true
          && $rootScope.PasswordFormCheck() == true && $rootScope.EncryptFormCheck() == true
          && $rootScope.RemoteServerCfgFormCheck() == true && $rootScope.EiaRecordCfgFormCheck()==true
          ){
          document.getElementById("model_name").value = '';
          document.getElementById('model_detail').value = '';
          if($routeParams.modelName != 0 ){
            document.getElementById("model_name").value = $routeParams.modelName;
          }
          if($routeParams.detailDesc != 0 ){
            document.getElementById('model_detail').value = $routeParams.detailDesc;
          }
          $rootScope.is_post = true;
        }
      }

      $scope.clearCurrent = function(){
        if( document.getElementsByName(current)[0].type == 'checkbox'){
          document.getElementsByName(current)[0].parentNode.style.color = 'grey';
        }else if(document.getElementsByName(current)[0].type == 'radio' ){
          var len = document.getElementsByName(current).length;
          for(var i = 0;i<len;i++){
            document.getElementsByName(current)[i].parentNode.style.color = 'grey';
          }
        }else{
          document.getElementsByName(current)[0].style.borderColor = 'grey';
          document.getElementsByName(current)[0].style.color = 'grey';
        }
      }

      $scope.restoreCurrent = function(){
        $rootScope.loadXml($rootScope.xmlDoc,true);
      }

      $scope.restoreAll = function(){
        $rootScope.loadXml($rootScope.xmlDoc,false);
      }

      $scope.help = function(){
        var iWidth=400; //弹出窗口的宽度;
        var iHeight=650; //弹出窗口的高度;
        var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
        var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
        window.open('help.html','Help', 'height=' + iHeight + ', width=' + iWidth + ', top=' +
          iTop + ', left=' + iLeft + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
      }
      $scope.changeToEnable = function(value){
        if(value == true){
          return 'enable'
        }else{
          return 'disable'
        }
      }

      //待模板元素加载完成后操作
      setTimeout(function(){
        //给所有表单添加onchange属性,同时改变所有表单框颜色与字体颜色
        addChange('xmlContent');

        $rootScope.start_form_data = form2object('xmlContent','.',false);
//         console.log( $rootScope.start_form_data);

        //判断是否需要加载模板值
        if($routeParams.filePath != 0){
          $routeParams.filePath = $routeParams.filePath.replace('$','/');
          XmlStrServer.getXml($routeParams.filePath,function(ret){
            $rootScope.xmlDoc = $.parseXML(ret);
            $rootScope.loadXml = function(xmlDoc,checkCurrent){
              //特殊字段处理
              if($(xmlDoc).find("white_list_for_web").length != 0 ){
                $("#WhiteList").empty();      //清空TelWhiteList
                $(xmlDoc).find("white_list_for_web").children().each(function(){
                  if($(this)[0].attributes.name.value != 'enable'){
                    document.getElementById('WhiteList')['options'].add(new Option($(this)[0].attributes.value.value,$(this)[0].attributes.value.value))
                  }
                })
              }
              if($(xmlDoc).find("white_list_for_telnet").length != 0 ){
                $("#TelWhiteList").empty();      //清空TelWhiteList
                $(xmlDoc).find("white_list_for_telnet").children().each(function(){
                  if($(this)[0].attributes.name.value != 'enable'){
                    document.getElementById('TelWhiteList')['options'].add(new Option($(this)[0].attributes.value.value,$(this)[0].attributes.value.value))
                  }
                })
              }
              if($(xmlDoc).find("daily_reboot").length != 0 ){
                $(xmlDoc).find("daily_reboot").children().each(function(){
                  if($(this)[0].attributes.name.value == 'daily_reboot_time'){
                    var hours = parseInt(parseInt($(this)[0].attributes.value.value)/60);
                    var min = parseInt($(this)[0].attributes.value.value)%60;
                    var param1 = xmlDoc.createElement('param');
                    param1.setAttribute('name','daily_reboot_time_hour');
                    param1.setAttribute('value',hours);
                    var param2 = xmlDoc.createElement('param');
                    param2.setAttribute('name','daily_reboot_time_minute');
                    param2.setAttribute('value',min);
                    xmlDoc.getElementsByTagName("daily_reboot")[0].appendChild(param1);
                    xmlDoc.getElementsByTagName("daily_reboot")[0].appendChild(param2);
                  }
                })
              }
              if($(xmlDoc).find("ntp").length != 0 ){
                var zone_hour = -1 ,zone_minute = -1;
                var val = -1;
                $(xmlDoc).find("ntp").children().each(function(){
                  if($(this)[0].attributes.name){
                    if($(this)[0].attributes.name.value == 'zone hour'){
                      zone_hour = $(this)[0].attributes.value.value
                    }else if($(this)[0].attributes.name.value == 'zone minute'){
                      zone_minute = $(this)[0].attributes.value.value
                    }
                  }
                })
                if(zone_hour == -12 && zone_minute == 0){
                  val = 0;
                }else if(zone_hour == -11 && zone_minute == 0){
                  val = 1;
                }else if(zone_hour == -10 && zone_minute == 0){
                  val = 2;
                }else if(zone_hour == -9 && zone_minute == 0){
                  val = 3;
                }else if(zone_hour == -8 && zone_minute == 0){
                  val = 4;
                }else if(zone_hour == -7 && zone_minute == 0){
                  val = 5;
                }else if(zone_hour == -6 && zone_minute == 0){
                  val = 6;
                }else if(zone_hour == -5 && zone_minute == 0){
                  val = 7;
                }else if(zone_hour == -4 && zone_minute == 0){
                  val = 8;
                }else if(zone_hour == -3 && zone_minute == 0){
                  val = 9;
                }else if(zone_hour == -2 && zone_minute == 0){
                  val = 10;
                }else if(zone_hour == -1 && zone_minute == 0){
                  val = 11;
                }else if(zone_hour == 0 && zone_minute == 0){
                  val = 12;
                }else if(zone_hour == 1 && zone_minute == 0){
                  val = 13;
                }else if(zone_hour == 2 && zone_minute == 0){
                  val = 14;
                }else if(zone_hour == 3 && zone_minute == 0){
                  val = 15;
                }else if(zone_hour == 4 && zone_minute == 0){
                  val = 16;
                }else if(zone_hour == 5 && zone_minute == 0){
                  val = 17;
                }else if(zone_hour == 6 && zone_minute == 0){
                  val = 18;
                }else if(zone_hour == 7 && zone_minute == 0){
                  val = 19;
                }else if(zone_hour == 8 && zone_minute == 0){
                  val = 20;
                }else if(zone_hour == 9 && zone_minute == 0){
                  val = 21;
                }else if(zone_hour == 10 && zone_minute == 0){
                  val = 22;
                }else if(zone_hour == 11 && zone_minute == 0){
                  val = 23;
                }else if(zone_hour == 12 && zone_minute == 0){
                  val = 24;
                }else if(zone_hour == 13 && zone_minute == 0){
                  val = 25;
                }else if(zone_hour == -3 && zone_minute == 30){
                  val = 26;
                }else if(zone_hour == 5 && zone_minute == 30){
                  val = 27;
                }else if(zone_hour == 5 && zone_minute == 45){
                  val = 28;
                }else if(zone_hour == 6 && zone_minute == 30){
                  val = 29;
                }else if(zone_hour == 9 && zone_minute == 30){
                  val = 30;
                }
                var param = xmlDoc.createElement('param');
                param.setAttribute('name','zone_hour_minute');
                param.setAttribute('value',val);
                if(val != -1){
                  xmlDoc.getElementsByTagName("ntp")[0].appendChild(param);
                }
              }
              if($(xmlDoc).find("DaylightSavingTime").length != 0 ){
                //start_weekday用于判断是哪一个选项，为0时，表示选择天数
                var isStartday1 = false;
                var isEndday1 = false;
                var startDayValue = 0;
                var endDayValue = 0;
                $(xmlDoc).find("DaylightSavingTime").children().each(function(){
                  if($(this)[0].attributes.name.value == 'start_weekday'){
                    if($(this)[0].attributes.value.value == 0){
                      isStartday1 = true
                    }
                  }else if($(this)[0].attributes.name.value == 'end_weekday'){
                    if($(this)[0].attributes.value.value == 0){
                      isEndday1 = true
                    }
                  }else if($(this)[0].attributes.name.value == 'start_day'){
                    startDayValue = $(this)[0].attributes.value.value;
                  }else if($(this)[0].attributes.name.value == 'end_day'){
                    endDayValue = $(this)[0].attributes.value.value;
                  }
                })
                if(startDayValue != 0){
                  if(isStartday1){
                    document.getElementsByName("CheckStartDate")[0].checked = 'checked';
                    document.getElementsByName("StartDay")[0].value = startDayValue;
                  }else{
                    document.getElementsByName("CheckStartDate")[1].checked = 'checked';
                    document.getElementsByName("StartWeekNo")[0].value = startDayValue;
                    document.getElementsByName("StartWeekNo")[0].style.color = 'orange';
                  }
                }
                if(endDayValue != 0){
                  if(isEndday1){
                    document.getElementsByName("CheckEndDate")[0].checked = 'checked';
                    document.getElementsByName("EndDay")[0].value = endDayValue;
                  }else{
                    document.getElementsByName("CheckEndDate")[1].checked = 'checked';
                    document.getElementsByName("EndWeekNo")[0].value = endDayValue;
                    document.getElementsByName("EndWeekNo")[0].style.color = 'orange';
                  }
                }
              }
              if($(xmlDoc).find("lines").length != 0){
                //当线路参数有配置项时，更新dom值
                if($(xmlDoc).find("lines").children().length != 0 ){
                  if($(xmlDoc).find("lines").children().length == 112){
                    changeElseToSelect('LinePort',254);
                  }
                  var set_mode = 0;    //配置增益默认为0;
                  for(var i =0;i<4;i++){
                    //node名为param
                    if($(xmlDoc).find("lines").children().children()[i].nodeName == 'param'){
                      if($(xmlDoc).find("lines").children().children()[i].attributes[0].value == 'workmode'){
                        changeElseToSelect('LineWorkMode',$(xmlDoc).find("lines").children().children()[i].attributes[1].value);
                      }else if($(xmlDoc).find("lines").children().children()[i].attributes[0].value == 'scene_mode'){
                        if($(xmlDoc).find("lines").children().children()[i].attributes[1].value == 0){
                          changeRadioToSelect('AnswerMode',0);
                        }else{
                          changeRadioToSelect('AnswerMode',1);
                        }
                      }else if($(xmlDoc).find("lines").children().children()[i].attributes[0].value == 'set_mode'){
                        if($(xmlDoc).find("lines").children().children()[i].attributes[1].value == 0){
                          set_mode = 0;
                          changeRadioToSelect('SetMode',0);
                        }else{
                          set_mode = 1;
                          changeRadioToSelect('SetMode',1);
                        }
                      }
                    }else{
                      //node名为gain
                      if($(xmlDoc).find("lines").children().children().children().length != 0 ){
                        for(var j =0;j<2;j++){
                          //发送增益
                          if($(xmlDoc).find("lines").children().children().children()[j].attributes[0].value == 'tx_gain'){
                            if(set_mode == 0){
                              document.getElementById('idTinySetLGT').style.display = '';
                              document.getElementById('idUserSetLGT').style.display = 'none';
                              changeElseToSelect('TSLineGainTx',$(xmlDoc).find("lines").children().children().children()[j].attributes[1].value)
                            }else{
                              document.getElementById('idTinySetLGT').style.display = 'none';
                              document.getElementById('idUserSetLGT').style.display = '';
                              changeElseToSelect('USLineGainTx',$(xmlDoc).find("lines").children().children().children()[j].attributes[1].value)
                            }
                          }else if($(xmlDoc).find("lines").children().children().children()[j].attributes[0].value == 'rx_gain'){
                            if(set_mode == 0){
                              document.getElementById('idTinySetLGR').style.display = '';
                              document.getElementById('idUserSetLGR').style.display = 'none';
                              changeElseToSelect('TSLineGainRx',$(xmlDoc).find("lines").children().children().children()[j].attributes[1].value)
                            }else{
                              document.getElementById('idTinySetLGR').style.display = 'none';
                              document.getElementById('idUserSetLGR').style.display = '';
                              changeElseToSelect('USLineGainRx',$(xmlDoc).find("lines").children().children().children()[j].attributes[1].value)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              //加载模板值
              $(xmlDoc).find("config").each(function () {
                $(this).children().each(function() {
                  //var str = 'config' + '\/' + $(this).children()[0].tagName + '\/lines\/lines{\\w*}\/workmode';
//                       var str = 'config' + '\/' + $(this)[0].tagName;
                  var str = '';
                  var str1 =  $(this)[0].tagName;
                  var value = '';
                  $(this).children().each(function(){
                    if($(this).children().length == 0){
                      str = 'config' + '\/' + str1 + '/' + $(this)[0].attributes.name.value;
                      value = $(this)[0].attributes.value.value;
                       if(str=="config/record/start_time"){
                    	  var time=new Array()
                    		  time=value.split(';')
                    			for(var i=0;i<time.length-1;i++){
                    		        str="config/record/start_time"+i;
                    			    value=time[i];
                    			checkStr(str,value,$rootScope.start_form_data,checkCurrent); 
                    			}
                    	
                    	  
                      }else if(str=="config/record/end_time"){
                    	  time=value.split(';')
              			for(var i=0;i<time.length-1;i++){
              		        str="config/record/end_time"+i;
              			    value=time[i];
              			checkStr(str,value,$rootScope.start_form_data,checkCurrent);
                    	  
                        }
                      }else {
                      checkStr(str,value,$rootScope.start_form_data,checkCurrent);
                      }
                    }else{
                      var str2 = $(this)[0].tagName;
                      $(this).children().each(function(){
                        if($(this).children().length == 0){
                          str =  'config' + '\/' + str1 + '/' + str2 + '/' +  $(this)[0].attributes.name.value;
                          value = $(this)[0].attributes.value.value;
                          checkStr(str,value,$rootScope.start_form_data,checkCurrent);
                        }else{
                          var str3 = $(this)[0].tagName;
                          $(this).children().each(function(){
                            if($(this).children().length == 0){
                              if(new RegExp('\\w+\\[\\w+\\]{1}').test(str3)){
                                str =  'config' + '\/' + str1 + '/' + str2 + '/\\w+\\[\\w+\\]?' + '/' + $(this)[0].attributes.name.value;
                              }else{
                                str =  'config' + '\/' + str1 + '/' + str2 + '/' + str3 + '/' + $(this)[0].attributes.name.value;
                              }
                              value = $(this)[0].attributes.value.value;
                              checkStr(str,value,$rootScope.start_form_data,checkCurrent);
                            }else{
                              //第4层判断
                              var str4 = $(this)[0].tagName;
                              $(this).children().each(function(){
                                str =  'config' + '\/' + str1 + '/' + str2 + '/' + str3 + '/' + str4 + '/' + $(this)[0].attributes.name.value;
                                value = $(this)[0].attributes.value.value;
                                checkStr(str,value,$rootScope.start_form_data,checkCurrent);
                              })
                            }
                          })
                        }
                      })
                    }
                  })

//                       if($(this).children()[0]){
//                         str1 = '/' + $(this).children()[0].tagName;
//                         if($(this).children().children()[0]){
//                           str2 = '/' + $(this).children().children()[0].tagName;
//                           if($(this).children().children().children()[0]){
//                             str3 = '/' + $(this).children().children().children()[0].attributes.name.value;
//                           }else{
//                             str2 = '/' + $(this).children().children()[0].attributes.name.value;
//                           }
//                         }else{
//                           str2 = '/' + $(this).children().children()[0].attributes.name.value;
//                         }
//                       }
//                       if(str3 != ''){
//                         str += str1 + '/\\w+[{\\w+}]?' + str3
//                         value = $(this).children().children().children()[0].attributes.value.value
//                       }else{
//                         str += str1 + str2
//                         value = $(this).children().children()[0].attributes.value.value
//                       }
                })
              });
            }
            $rootScope.loadXml($rootScope.xmlDoc,false);
          })
        }
      },1000)



      $scope.saveWhole = function(){
        var modelName = document.getElementById("model_name").value;
        var modelNameReg = new RegExp(/^[\u4e00-\u9fa5]*\w*[\u4e00-\u9fa5]*\w*[\u4e00-\u9fa5]*[_.]*\w*[\u4e00-\u9fa5]*\w*[\u4e00-\u9fa5]*$/);
        if(modelName == ''){
          alert("模板名称不能为空！");
          document.getElementById('model_name').select();
        }else if(!modelNameReg.test(modelName)){
          alert("模板名称不正确！只支持中文、英文字母、数字、下划线和点！");
          document.getElementById('model_name').select();
        }else{
          var xmlDoc = "";
          var config = {};
          var form_data = form2object('xmlContent','.',true);
//          console.log(JSON.stringify(form_data));

          config = changeToJson(form_data);
//          console.log(JSON.stringify(config));

          //特殊字段处理
          for(var i in config){
            if(i == 'sipserver'){
              if(config[i]['server0']){
                if(config[i]['server0']['heartbeat'] != undefined){
                  config[i]['server0']['heartbeat'] = $scope.changeToEnable(config[i]['server0']['heartbeat']);
                }
              }
              if(config[i]['server1']){
                if(config[i]['server1']['heartbeat'] != undefined){
                  config[i]['server1']['heartbeat'] = $scope.changeToEnable(config[i]['server1']['heartbeat']);
                }
              }
              if(config[i]['local']){
                if(config[i]['local']['random_port'] != undefined){
                  config[i]['local']['random_port'] = $scope.changeToEnable(config[i]['local']['random_port']);
                }
              }
              if(config[i]['transport'] != undefined){
                if(config[i]['transport'] == '0'){
                  config[i]['transport'] = 'udp';
                }else if(config[i]['transport'] == '1'){
                  config[i]['transport'] = 'tcp';
                }else{
                  config[i]['transport'] = 'auto';
                }
              }
            }
            if(i == 'fxs_fxo'){
              //特殊处理线路参数
              if(config[i]['lines'] != undefined){
                //初始化
                config[i]['lines'] = {};
                //获取端口值
                var port_num = document.getElementById('LinePort').value;
                var work_mode = document.getElementById('LineWorkMode').value;
                var answer_mode = document.getElementsByName('AnswerMode');
                var set_mode = document.getElementsByName('SetMode');
                var TSLineGainTx = document.getElementById('TSLineGainTx').value;
                var TSLineGainRx = document.getElementById('TSLineGainRx').value;
                var USLineGainTx = document.getElementById('USLineGainTx').value;
                var USLineGainRx = document.getElementById('USLineGainRx').value;
                for(var j = 0;j<2;j++){
                  if(answer_mode[j].checked){
                    answer_mode = answer_mode[j].value
                    break;
                  }
                }
                for(var j = 0;j<2;j++){
                  if(set_mode[j].checked){
                    set_mode = set_mode[j].value
                    break;
                  }
                }
                if(port_num == 254){
                  //所有端口，默认112个端口
                  for(var j=0;j<112;j++){
                    config[i]['lines']['line'+j] = {};
                    config[i]['lines']['line'+j]['workmode'] = work_mode;
                    config[i]['lines']['line'+j]['scene_mode'] = answer_mode;
                    config[i]['lines']['line'+j]['set_mode'] = set_mode;
                    config[i]['lines']['line'+j]['gain'] = {};
                    if(set_mode == 0){
                      config[i]['lines']['line'+j]['gain']['tx_gain'] = TSLineGainTx;
                      config[i]['lines']['line'+j]['gain']['rx_gain'] = TSLineGainRx;
                    }else{
                      config[i]['lines']['line'+j]['gain']['tx_gain'] = USLineGainTx;
                      config[i]['lines']['line'+j]['gain']['rx_gain'] = USLineGainRx;
                    }
                  }
                }else if(port_num != 255){
                  config[i]['lines']['line'+port_num] = {};
                  config[i]['lines']['line'+port_num]['workmode'] = work_mode;
                  config[i]['lines']['line'+port_num]['scene_mode'] = answer_mode;
                  config[i]['lines']['line'+port_num]['set_mode'] = set_mode;
                  config[i]['lines']['line'+port_num]['gain'] = {};
                  if(set_mode == 0){
                    config[i]['lines']['line'+port_num]['gain']['tx_gain'] = TSLineGainTx;
                    config[i]['lines']['line'+port_num]['gain']['rx_gain'] = TSLineGainRx;
                  }else{
                    config[i]['lines']['line'+port_num]['gain']['tx_gain'] = USLineGainTx;
                    config[i]['lines']['line'+port_num]['gain']['rx_gain'] = USLineGainRx;
                  }
                }
              }
              if(config[i]['no_rtp_detect'] != undefined){
                config[i]['no_rtp_detect'] = $scope.changeToEnable(config[i]['no_rtp_detect']);
              }
              if(config[i]['auto_gain_ctrl'] != undefined){
                config[i]['auto_gain_ctrl'] = $scope.changeToEnable(config[i]['auto_gain_ctrl']);
              }
              if(config[i]['fxs']){
                if(config[i]['fxs']['send_rolarity_reversal'] != undefined){
                  config[i]['fxs']['send_rolarity_reversal'] = $scope.changeToEnable(config[i]['fxs']['send_rolarity_reversal']);
                }
                if(config[i]['fxs']['flashhook_detect'] != undefined){
                  config[i]['fxs']['flashhook_detect'] = $scope.changeToEnable(config[i]['fxs']['flashhook_detect']);
                }
                if(config[i]['fxs']['send_cid_brfore_ring'] != undefined){
                  config[i]['fxs']['send_cid_brfore_ring'] = $scope.changeToEnable(config[i]['fxs']['send_cid_brfore_ring']);
                }
                if(config[i]['fxs']['longlinesupport'] != undefined){
                  config[i]['fxs']['longlinesupport'] = $scope.changeToEnable(config[i]['fxs']['longlinesupport']);
                }
              }
            }
            if(i == 'media'){
              if(config[i]['check_the_udp_header'] != undefined){
                config[i]['check_the_udp_header'] = $scope.changeToEnable(config[i]['check_the_udp_header']);
              }
              if(config[i]['rtp_port_random'] != undefined){
                config[i]['rtp_port_random'] = $scope.changeToEnable(config[i]['rtp_port_random']);
              }
              if(config[i]['send_flash_event'] != undefined){
                config[i]['send_flash_event'] = $scope.changeToEnable(config[i]['send_flash_event']);
              }
              if(config[i]['dtmf_tone_gen'] != undefined){
                config[i]['dtmf_tone_gen'] = $scope.changeToEnable(config[i]['dtmf_tone_gen']);
              }
              if(config[i]['payload_pype_prefered'] != undefined){
                if(config[i]['payload_pype_prefered'] == '0'){
                  config[i]['payload_pype_prefered'] = 'local';
                }else{
                  config[i]['payload_pype_prefered'] = 'remote';
                }
              }
              //对编码silence_suppression进行处理
              for(var j=0;j<16;j++){
                if(config[i]['codec' + j]){
                  if(config[i]['codec' + j]['silence_suppression'] == '1'){
                    config[i]['codec' + j]['silence_suppression'] = 'enable';
                  }else{
                    config[i]['codec' + j]['silence_suppression'] = 'disable';
                  }
                }
              }
              //对编码payload_type进行处理
              for(var j=0;j<16;j++){
                if(config[i]['codec' + j]){
                  if(config[i]['codec' + j]['payload_type'] == '动态'){
                    config[i]['codec' + j]['payload_type'] =  $('#CoderName' + j).val();
                  }
                }
              }
            }
            if(i == 'sip'){
              if(config[i]['CallConfirmTone'] != undefined){
                config[i]['CallConfirmTone'] = $scope.changeToEnable(config[i]['CallConfirmTone']);
              }
              if(config[i]['report_sdp_whatever'] != undefined){
                config[i]['report_sdp_whatever'] = $scope.changeToEnable(config[i]['report_sdp_whatever']);
              }
              if(config[i]['mwi'] != undefined){
                config[i]['mwi'] = $scope.changeToEnable(config[i]['mwi']);
              }
              if(config[i]['rfc3407'] != undefined){
                config[i]['rfc3407'] = $scope.changeToEnable(config[i]['rfc3407']);
              }
              if(config[i]['ip_to_ip_call'] != undefined){
                config[i]['ip_to_ip_call'] = $scope.changeToEnable(config[i]['ip_to_ip_call']);
              }
              if(config[i]['include_user_is_phone'] != undefined){
                config[i]['include_user_is_phone'] = $scope.changeToEnable(config[i]['include_user_is_phone']);
              }
              if(config[i]['rfc3325'] != undefined){
                config[i]['rfc3325'] = $scope.changeToEnable(config[i]['rfc3325']);
              }
              if(config[i]['only_accept_calls_from_ACL'] != undefined){
                config[i]['only_accept_calls_from_ACL'] = $scope.changeToEnable(config[i]['only_accept_calls_from_ACL']);
              }
              if(config[i]['anonymous_call'] != undefined){
                config[i]['anonymous_call'] = $scope.changeToEnable(config[i]['anonymous_call']);
              }
              if(config[i]['reject_anonymous_call'] != undefined){
                config[i]['reject_anonymous_call'] = $scope.changeToEnable(config[i]['reject_anonymous_call']);
              }
              if(config[i]['sharp_as_end_dial'] != undefined){
                config[i]['sharp_as_end_dial'] = $scope.changeToEnable(config[i]['sharp_as_end_dial']);
              }
              if(config[i]['sharp_escape'] != undefined){
                config[i]['sharp_escape'] = $scope.changeToEnable(config[i]['sharp_escape']);
              }
              if(config[i]['sharp_send_enable'] != undefined){
                config[i]['sharp_send_enable'] = $scope.changeToEnable(config[i]['sharp_send_enable']);
              }
              if(config[i]['3rd_not_send_18x'] != undefined){
                config[i]['3rd_not_send_18x'] = $scope.changeToEnable(config[i]['3rd_not_send_18x']);
              }
              if(config[i]['refer_delay'] != undefined){
                config[i]['refer_delay'] = $scope.changeToEnable(config[i]['refer_delay']);
              }
              if(config[i]['send_bye_after_refer'] != undefined){
                config[i]['send_bye_after_refer'] = $scope.changeToEnable(config[i]['send_bye_after_refer']);
              }
              if(config[i]['send_new_reg_when_recv_423'] != undefined){
                config[i]['send_new_reg_when_recv_423'] = $scope.changeToEnable(config[i]['send_new_reg_when_recv_423']);
              }
              if(config[i]['cseq_start_with_1'] != undefined){
                config[i]['cseq_start_with_1'] = $scope.changeToEnable(config[i]['cseq_start_with_1']);
              }
              if(config[i]['forbid_invalid_media'] != undefined){
                config[i]['forbid_invalid_media'] = $scope.changeToEnable(config[i]['forbid_invalid_media']);
              }
              if(config[i]['call_confirm_tone'] != undefined){
                config[i]['call_confirm_tone'] = $scope.changeToEnable(config[i]['call_confirm_tone']);
              }
              if(config[i]['support_huawei_cw'] != undefined){
                config[i]['support_huawei_cw'] = $scope.changeToEnable(config[i]['support_huawei_cw']);
              }
              if(config[i]['accept_orphan_200ok'] != undefined){
                config[i]['accept_orphan_200ok'] = $scope.changeToEnable(config[i]['accept_orphan_200ok']);
              }
              if(config[i]['dns_cache_enable'] != undefined){
                config[i]['dns_cache_enable'] = $scope.changeToEnable(config[i]['dns_cache_enable']);
              }
              if(config[i]['early_media'] != undefined ){
                config[i]['early_media'] = $scope.changeToEnable(config[i]['early_media']);
              }
              if(config[i]['session_timer'] != undefined){
                config[i]['session_timer'] = $scope.changeToEnable(config[i]['session_timer']);
              }
              if(config[i]['rc3262'] != undefined){
                config[i]['rc3262'] = $scope.changeToEnable(config[i]['rc3262']);
              }
              if(config[i]['preack_only_183'] != undefined){
                config[i]['preack_only_183'] = $scope.changeToEnable(config[i]['preack_only_183']);
              }
              if(config[i]['early_answer'] != undefined){
                config[i]['early_answer'] = $scope.changeToEnable(config[i]['early_answer']);
              }
              if(config[i]['refer_to_refers_contact'] != undefined){
                config[i]['refer_to_refers_contact'] = $scope.changeToEnable(config[i]['refer_to_refers_contact']);
              }
            }
            if(i == 'fax'){
              if(config[i]['vbd'] != undefined){
                config[i]['vbd'] = $scope.changeToEnable(config[i]['vbd']);
              }
              if(config[i]['silencesupp'] != undefined){
                config[i]['silencesupp'] = $scope.changeToEnable(config[i]['silencesupp']);
              }
              if(config[i]['ecm'] != undefined){
                config[i]['ecm'] = $scope.changeToEnable(config[i]['ecm']);
              }
              if(config[i]['x_fax'] != undefined){
                config[i]['x_fax'] = $scope.changeToEnable(config[i]['x_fax']);
              }
              if(config[i]['fax'] != undefined){
                config[i]['fax'] = $scope.changeToEnable(config[i]['fax']);
              }
              if(config[i]['x_modem'] != undefined){
                config[i]['x_modem'] = $scope.changeToEnable(config[i]['x_modem']);
              }
              if(config[i]['modem'] != undefined){
                config[i]['modem'] = $scope.changeToEnable(config[i]['modem']);
              }
              if(config[i]['ced_cng_as_fax_tone'] != undefined){
                config[i]['ced_cng_as_fax_tone'] = $scope.changeToEnable(config[i]['ced_cng_as_fax_tone']);
              }
            }
            if(i == 'feature_code'){
              var arr = [20,21,13,40,15,19,16,17,18,24,41,42,22,39,23,12,38,0,2,1,7,3,4,8,9,10,11,5,6,31]
              for(var j = 0;j<arr.length;j++){
                if(config[i]['feature' + arr[j]] ){
                  if(config[i]['feature' + arr[j]]['usedefault'] != undefined){
                    config[i]['feature' + arr[j]]['usedefault'] = $scope.changeToEnable(config[i]['feature' + arr[j]]['usedefault']);
                  }
                  if(config[i]['feature' + arr[j]]['enabled'] != undefined){
                    if(config[i]['feature' + arr[j]]['enabled'] == '0'){
                      config[i]['feature' + arr[j]]['enabled'] = 'enable';
                    }else{
                      config[i]['feature' + arr[j]]['enabled'] = 'disable';
                    }
                  }
                }
              }
            }
            if(i == 'system'){
              if(config[i]['ntp']){
                //TimeZone字段处理
                if(config[i]['ntp']['zone_hour_minute']){
                  var hour = 0;
                  var min = 0;
                  switch (config[i]['ntp']['zone_hour_minute']){
                    case '0':
                      hour = -12;min = 0;
                      break;
                    case '1':
                      hour = -11;min = 0;
                      break;
                    case '2':
                      hour = -10;min = 0;
                      break;
                    case '3':
                      hour = -9;min = 0;
                      break;
                    case '4':
                      hour = -8;min = 0;
                      break;
                    case '5':
                      hour = -7;min = 0;
                      break;
                    case '6':
                      hour = -6;min = 0;
                      break;
                    case '7':
                      hour = -5;min = 0;
                      break;
                    case '8':
                      hour = -4;min = 0;
                      break;
                    case '9':
                      hour = -3;min = 0;
                      break;
                    case '10':
                      hour = -2;min = 0;
                      break;
                    case '11':
                      hour = -1;min = 0;
                      break;
                    case '12':
                      hour = 0;min = 0;
                      break;
                    case '13':
                      hour = 1;min = 0;
                      break;
                    case '14':
                      hour = 2;min = 0;
                      break;
                    case '15':
                      hour = 3;min = 0;
                      break;
                    case '16':
                      hour = 4;min = 0;
                      break;
                    case '17':
                      hour = 5;min = 0;
                      break;
                    case '18':
                      hour = 6;min = 0;
                      break;
                    case '19':
                      hour = 7;min = 0;
                      break;
                    case '20':
                      hour = 8;min = 0;
                      break;
                    case '21':
                      hour = 9;min = 0;
                      break;
                    case '22':
                      hour = 10;min = 0;
                      break;
                    case '23':
                      hour = 11;min = 0;
                      break;
                    case '24':
                      hour = 12;min = 0;
                      break;
                    case '25':
                      hour = 13;min = 0;
                      break;
                    case '26':
                      hour = -3;min = 30;
                      break;
                    case '27':
                      hour = 5;min = 30;
                      break;
                    case '28':
                      hour = 5;min = 45;
                      break;
                    case '29':
                      hour = 6;min = 30;
                      break;
                    case '30':
                      hour = 9;min = 30;
                      break;
                    default:
                      hour = -12;min = 0;
                  }
                  config[i]['ntp']['zone hour'] = hour;
                  config[i]['ntp']['zone minute'] = min;
                  delete config[i]['ntp']['zone_hour_minute'];
                }
                //DaylightSavingTime/flag字段处理
                if(config[i]['ntp']['DaylightSavingTime'] != undefined){
                  var strNew,endNew;
                  if(config[i]['ntp']['DaylightSavingTime']['flag'] != undefined){
                    if(config[i]['ntp']['DaylightSavingTime']['flag'] == true){
                      config[i]['ntp']['DaylightSavingTime']['flag'] = 1;
                    }else{
                      config[i]['ntp']['DaylightSavingTime']['flag'] = 0;
                    }
                  }
                  for(var k = 0;k<(document.getElementsByName("CheckStartDate")).length;k++){
                    if(document.getElementsByName("CheckStartDate").item(k).checked) {
                      strNew = document.getElementsByName("CheckStartDate").item(k).getAttribute("value");
                      break;
                    }
                  }
                  for(var k = 0;k<(document.getElementsByName("CheckEndDate")).length;k++){
                    if(document.getElementsByName("CheckEndDate").item(k).checked) {
                      endNew = document.getElementsByName("CheckEndDate").item(k).getAttribute("value");
                      break;
                    }
                  }
                  if(strNew == 0){
                    //当选择第一个框时，start_weekday为0
                    config[i]['ntp']['DaylightSavingTime']['start_weekday'] = 0;
                  }
                  if(endNew == 0){
                    //当选择第一个框时，end_weekday为0
                    config[i]['ntp']['DaylightSavingTime']['end_weekday'] = 0;
                  }
                }
                if(config[i]['ntp']['flag'] != undefined){
                  if(config[i]['ntp']['flag'] == true){
                    config[i]['ntp']['flag'] = "on";
                  }else{
                    config[i]['ntp']['flag'] = 'off';
                  }
                }
              }
              if(config[i]['daily_reboot']){
                if(config[i]['daily_reboot']['daily_reboot'] != undefined){
                  config[i]['daily_reboot']['daily_reboot'] = $scope.changeToEnable(config[i]['daily_reboot']['daily_reboot']);
                }
                //daily_reboot_time 字段处理
                if(config[i]['daily_reboot']['daily_reboot_time_hour']){
                  if(config[i]['daily_reboot']['daily_reboot_time_minute']){
                    config[i]['daily_reboot']['daily_reboot_time'] = parseInt(config[i]['daily_reboot']['daily_reboot_time_hour'] * 60) +
                      parseInt(config[i]['daily_reboot']['daily_reboot_time_minute']);

                    delete config[i]['daily_reboot']['daily_reboot_time_hour'];
                    delete config[i]['daily_reboot']['daily_reboot_time_minute'];
                  }else{
                    config[i]['daily_reboot']['daily_reboot_time'] = parseInt(config[i]['daily_reboot']['daily_reboot_time_hour'] * 60) ;
                    delete config[i]['daily_reboot']['daily_reboot_time_hour'];
                  }
                }else if(config[i]['daily_reboot']['daily_reboot_time_minute']){
                  config[i]['daily_reboot']['daily_reboot_time'] =  parseInt(config[i]['daily_reboot']['daily_reboot_time_minute']);
                  delete config[i]['daily_reboot']['daily_reboot_time_minute'];
                }
              }
              if(config[i]['white_list_for_web']){
                if(config[i]['white_list_for_web']['enable'] != undefined){
                  if(config[i]['white_list_for_web']['enable'] == true){
                    config[i]['white_list_for_web']['enable'] = 'enable';
                    for(var j = 0;j < document.getElementById('WhiteList')['options'].length;j++){
                      config[i]['white_list_for_web']['item'+ j] = document.getElementById('WhiteList')['options'][j]['text'];
                    }
                  }else{
                    config[i]['white_list_for_web']['enable'] = 'disable';
                  }
                }
              }
              if(config[i]['white_list_for_telnet']){
                if(config[i]['white_list_for_telnet']['enable'] != undefined){
                  if(config[i]['white_list_for_telnet']['enable'] == true){
                    config[i]['white_list_for_telnet']['enable'] = 'enable';
                    for(var j = 0;j < document.getElementById('TelWhiteList')['options'].length;j++){
                      config[i]['white_list_for_telnet']['Telitem'+ j] = document.getElementById('TelWhiteList')['options'][j]['text'];
                    }
                  }else{
                    config[i]['white_list_for_telnet']['enable'] = 'disable';
                  }
                }
              }
              if(config[i]['entrypt_param']){
                if(config[i]['entrypt_param']['sip_encrypt']){
                  if(config[i]['entrypt_param']['sip_encrypt'] == '0'){
                    config[i]['entrypt_param']['sip_encrypt'] = 'enable';
                  }else{
                    config[i]['entrypt_param']['sip_encrypt'] = 'disable';
                  }
                }
              }
              if(config[i]['summary_config'] != undefined){
                config[i]['summary_config'] = $scope.changeToEnable(config[i]['summary_config']);
              }
            }
            if(i == 'tr069'){
              if(config[i]['Enable'] != undefined){
                if(config[i]['Enable'] == true){
                  config[i]['Enable'] = 1;
                }else{
                  config[i]['Enable'] = 0;
                }
              }
              if(config[i]['agent']){
                if(config[i]['agent']['periodic']){
                  if(config[i]['agent']['periodic']['enable'] != undefined){
                    if(config[i]['agent']['periodic']['enable'] == true){
                      config[i]['agent']['periodic']['enable'] = 1;
                    }else{
                      config[i]['agent']['periodic']['enable'] = 0;
                    }
                  }
                }
              }
            }
            if(i == 'remote_server'){
              if(config[i]['enable'] != undefined){
                if(config[i]['enable'] == true){
                  config[i]['enable'] = 'on';
                }else{
                  config[i]['enable'] = 'off';
                }
              }
            }
            if(i == 'syslog'){
              var arr = ['flag','cdr','signal','media','system','management'];
              for(var j = 0;j<arr.length;j++){
                if(config[i][arr[j]] != undefined){
                  if(config[i][arr[j]] == true){
                    config[i][arr[j]] = 'on';
                  }else{
                    config[i][arr[j]] = 'off';
                  }
                }
              }
            }
            if(i == 'provision'){
              if(config[i]['default_configuration_enable'] != undefined){
                config[i]['default_configuration_enable'] = $scope.changeToEnable(config[i]['default_configuration_enable']);
              }
            }
            if(i == 'simserver'){
              if(config[i]['password'] != undefined){
                config[i]['password'] = encode64(config[i]['password'])
              }
              if(config[i]['default_configuration_enable'] != undefined){
                config[i]['default_configuration_enable'] = $scope.changeToEnable(config[i]['default_configuration_enable']);
              }
            }
            if(i == 'record'){
                if(config[i]['enable'] != undefined){
                  if(config[i]['enable'] == true){
                    config[i]['enable'] = 'enable';
                  }else{
                    config[i]['enable'] = 'disable';
                  }
                }
                if(config[i]['period_mode']==3){
                	config[i]['start_time']=config[i]['start_time0']+";"+config[i]['start_time1']+";"+config[i]['start_time2']+";"
                	config[i]['end_time']=config[i]['end_time0']+";"+config[i]['end_time1']+";"+config[i]['end_time2']+";"
                	
                	
                }else if(config[i]['period_mode']==2){
                	config[i]['start_time']=config[i]['start_time0']+";"+config[i]['start_time1']+";"
                	config[i]['end_time']=config[i]['end_time0']+";"+config[i]['end_time1']+";"
                	
                } 
                else if(config[i]['period_mode']==1){
                	config[i]['start_time']=config[i]['start_time0']+";"
                	config[i]['end_time']=config[i]['end_time0']+";"
                	
                }else if(config[i]['period_mode']==0){
                	config[i]['start_time']=""
                	config[i]['end_time']=""
                }
                delete config[i]['start_time0'];
                delete config[i]['start_time1']
                delete config[i]['start_time2']
                delete config[i]['end_time0'];
                delete config[i]['end_time1']
                delete config[i]['end_time2']
              }

          }

          //change json to xml
          xmlDoc += "<?xml version='1.0' encoding='utf-8'?><config version='x.x' md5=''>";
          for(var i in config){
//          for(var j in config[i]){
            xmlDoc += jsonToXml1(i,config[i]);
//          }
          }
          xmlDoc += "</config>";
          var obj = {
            name: modelName ,
            detailDesc: document.getElementById('model_detail').value,
            domainUuid: $routeParams.domainUuid,
            productId : $routeParams.productId,
            status: 1,
            batchStr : xmlDoc
          }
          if($routeParams.uuid != 0 ){
            obj['uuid'] = $routeParams.uuid;
          }
          console.log(xmlDoc);
          if($routeParams.modelName == 0){
            CheckNameService.checkname(obj.name,obj.domainUuid,function(ret){
              console.log(ret);
              if(ret.success == false){     //表示该名字不存在，可用
                SaveService.save(obj,function(ret){
                  console.log(ret);
                  if(ret.success == false){
//                    console.log('save model error!');
                    $rootScope.alertMsg = "保存模板出错！"
                    $rootScope.is_alert = true;
                  }else{
//                    console.log('save model success!');
                    $rootScope.alertMsg = "保存模板成功！"
                    $rootScope.is_alert = true;
                    saveChange('xmlContent');
                  }
                })
                $rootScope.is_post = false;
              }else{
                $rootScope.is_post = false;
                $rootScope.alertMsg = "模板名字不正确或重复！";
                $rootScope.is_alert = true;
                //判断是否为窗口打开模式，若是，则定时关闭窗口
                if(parent.document.getElementById('modelTab_id') == null){
                  setTimeout(function(){
                    window.close();
                  },800)
                }
              }
            })
          }else{
            SaveService.save(obj,function(ret){
//              console.log(ret);
              if(ret.success == false){
                console.log('save model error!');
                $rootScope.alertMsg = "保存模板出错！"
                $rootScope.is_alert = true;
              }else{
                console.log('save model success!');
                $rootScope.is_post = false;
                $rootScope.alertMsg = "保存模板成功！"
                $rootScope.is_alert = true;
                saveChange('xmlContent');
              }
              //判断是否为窗口打开模式，若是，则定时关闭窗口
              if(parent.document.getElementById('modelTab_id') == null){
                setTimeout(function(){
                  window.close();
                },800)
              }
            })
          }
        }
      }
    }])

  .controller('SipServerCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var PortNum=0, FxoNum=0;
    var SipEncrpt = '0';
    var RelayServerEnable = '0';
    var gSipPortRandom;
    var gSipUdpLocalPort;
    var gSipTLSLocalPort;
    var g_IPProto;

    MM_callJS('no', 'Admin', '', '5060', '5061', '1')

    function MM_callJS(ServerLocked, user, SipPortRandom, SipUDPLocalPort, SipTLSLocalPort, IPProto)
    {
      if("yes" == ServerLocked)
      {
        document.forms[0].PrimServerAddr.disabled = true;
        document.forms[0].SecondServerAddr.disabled = true;
        document.forms[0].PrimServerPort.disabled = true;
        document.forms[0].SecondServerPort.disabled = true;
      }

      g_IPProto = parseInt(IPProto);
      gSipUdpLocalPort = parseInt(SipUDPLocalPort);
      gSipTLSLocalPort = parseInt(SipTLSLocalPort);
      if ("checked" == SipPortRandom)
      {
        gSipPortRandom = true;
      }
      else
      {
        gSipPortRandom = false;
      }
      document.forms[0].SipPortRandom.checked = gSipPortRandom;
      document.forms[0].SipUDPLocalPort.value = gSipUdpLocalPort;
      document.forms[0].SipTLSLocalPort.value = gSipTLSLocalPort;

      if (user == "Admin")
      {
        document.getElementById("id_PriServerTitle").style.display = "";
        document.getElementById("id_PriServerAddr").style.display = "";
        document.getElementById("id_PriServerPort").style.display = "";
        document.getElementById("id_PriServerRegEp").style.display = "";
        document.getElementById("id_PriServerHeart").style.display = "";
        document.getElementById("id_PriServerSpan").style.display = "";

        document.getElementById("id_SedServerTitle").style.display = "";
        document.getElementById("id_SedServerAddr").style.display = "";
        document.getElementById("id_SedServerPort").style.display = "";
        document.getElementById("id_SedServerRegEp").style.display = "";
        document.getElementById("id_SedServerHeart").style.display = "";
        document.getElementById("id_SedServerSpan").style.display = "";

        document.getElementById("id_PriOutboundTitle").style.display = "";
        document.getElementById("id_PriOutboundAddr").style.display = "";
        document.getElementById("id_PriOutboundPort").style.display = "";
        document.getElementById("id_PriOutboundSpan").style.display = "";

        document.getElementById("id_SecOutboundTitle").style.display = "";
        document.getElementById("id_SecOutboundAddr").style.display = "";
        document.getElementById("id_SecOutboundPort").style.display = "";
        document.getElementById("id_SecOutboundSpan").style.display = "";
      }
    }
    $scope.mouse_click = function (){
      if (document.forms[0].SipPortRandom.checked)
      {
        document.forms[0].SipUDPLocalPort.disabled = true;
        document.forms[0].SipTLSLocalPort.disabled = true;
      }
      else
      {
        document.forms[0].SipUDPLocalPort.disabled = false;
        document.forms[0].SipTLSLocalPort.disabled = false;
      }
      if (3 == document.forms[0].SIPTransType.value)
      {
        document.getElementById("id_SIPSURL").style.display = "";
      }
      else
      {
        document.getElementById("id_SIPSURL").style.display = "none";
      }

      if (1 == SipEncrpt)
      {
        document.forms[0].PrimServerOptEnable.checked = false;
        document.forms[0].PrimServerOptEnable.disabled = true;
        document.forms[0].SecondServerOptEnable.checked = false;
        document.forms[0].SecondServerOptEnable.disabled = true;
      }
    }

    $rootScope.SipServerFormCheck = function() {
      var SipPortChange = false;

      if (0 != document.forms[0].SIPTransType.value)
      {
        if (1 == RelayServerEnable)
        {
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SIPTransType',0,'form');
          alert("动态带宽优化暂时只支持UDP传输!");
          return false;
        }
      }

      if (0 != document.forms[0].SecondServerAddr.value.length
        && 0 == document.forms[0].PrimServerAddr.value.length) {
        alert("请优先设置'主用SIP服务器地址'!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PrimServerAddr',0,'form');
        return false;
      }

      if (document.forms[0].PrimServerAddr.value.length >= 128) {
        alert("'主用SIP服务器地址'长度必须小于128!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PrimServerAddr',0,'form');
        return false;
      }

      if (0 != document.forms[0].PrimServerAddr.value.length
        && document.forms[0].SecondServerAddr.value == document.forms[0].PrimServerAddr.value) {
        alert("'主用SIP服务器地址' 与 '备用SIP服务器地址' 不能相同!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('SecondServerAddr',0,'form');
        return false;
      }

      if (!is_number(document.forms[0].PrimServerPort.value, 0, 65535)) {
        alert("'主用SIP服务器端口'范围为0-65535!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PrimServerPort',0,'form');
        return false;
      }

      if (!is_number(document.forms[0].PrimRegInterval.value, 1, 7200)) {
        alert("主'注册间隔'范围为1-7200");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PrimRegInterval',0,'form');
        return false;
      }

      if (document.forms[0].SecondServerAddr.value.length >= 128) {
        alert("'备用SIP服务器地址'长度必须小于128!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('SecondServerAddr',0,'form');
        return false;
      }

      if (0 != document.forms[0].SecondServerAddr.value.length) {
        if (!is_number(document.forms[0].SecondServerPort.value, 0, 65535)) {
          alert("'备用SIP服务器端口'范围为0-65535!");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SecondServerPort',0,'form');
          return false;
        }

        if (!is_number(document.forms[0].SecondRegInterval.value, 1, 7200)) {
          alert("备'注册间隔'范围为1-7200!");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SecondRegInterval',0,'form');
          return false;
        }
      }

      if (document.forms[0].PriOutboundAddr.value.length >= 128) {
        alert("'主用外拨代理服务器地址'长度必须小于128!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PriOutboundAddr',0,'form');
        return false;
      }

      if (0 != document.forms[0].PriOutboundPort.value.length) {
        if (!is_number(document.forms[0].PriOutboundPort.value, 0, 65535)) {
          alert("'主用外拨代理服务器端口'范围为0-65535!");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('PriOutboundPort',0,'form');
          return false;
        }
      }

      if(document.forms[0].SecOutboundAddr.value.length >= 128)
      {
        alert("'备用外拨代理服务器地址'长度必须小于128!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('SecOutboundAddr',0,'form');
        return false;
      }

      if(0 != document.forms[0].SecOutboundPort.value.length)
      {
        if(!is_number(document.forms[0].SecOutboundPort.value,0,65535))
        {
          alert("'备用外拨代理服务器端口'范围为0-65535!");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SecOutboundPort',0,'form');
          return false;
        }
      }

      if(0 != document.forms[0].SecOutboundAddr.value.length
        && 0 == document.forms[0].PriOutboundAddr.value.length)
      {
        alert("请优先设置'主用外拨代理服务器'!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PriOutboundAddr',0,'form');
        return false;
      }

      if (0 != document.forms[0].PriOutboundAddr.value.length
        && document.forms[0].SecOutboundAddr.value == document.forms[0].PriOutboundAddr.value)
      {
        alert("'主用外拨代理服务器' 与 '备用外拨代理服务器' 不能相同!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('SecOutboundAddr',0,'form');
        return false;
      }

      /*主备外拨代理都存在时，必须都为ip地址*/
      if (0 != document.forms[0].PriOutboundAddr.value.length
        && 0 != document.forms[0].SecOutboundAddr.value.length)
      {
        if(!ip_check(g_IPProto, document.forms[0].PriOutboundAddr.value))
        {
          alert("'主用外拨代理服务器'和'备用外拨代理服务器'都存在，必须都为IP地址 ");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('PriOutboundAddr',0,'form');
          return false;
        }

        if(!ip_check(g_IPProto, document.forms[0].SecOutboundAddr.value))
        {
          alert("'主用外拨代理服务器'和'备用外拨代理服务器'都存在，必须都为IP地址 ");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SecOutboundAddr',0,'form');
          return false;
        }
      }

      if (!is_number(document.forms[0].RegAgainInterval.value, 10, 360)) {
        alert("'注册失败重连间隔'范围为10-360!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('RegAgainInterval',0,'form');
        return false;
      }

      if (!is_number(document.forms[0].RegTimesPerS.value, 0, 512)) {
        alert("'每秒注册次数'范围为0-512!");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('RegTimesPerS',0,'form');
        return false;
      }

      if (!document.forms[0].SipPortRandom.checked) {
        if (!is_number(document.forms[0].SipUDPLocalPort.value, 1024, 65535)) {
          alert("'本地SIP端口' 范围为1024-65535!");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SipUDPLocalPort',0,'form');
          return false;
        }

        if (!is_number(document.forms[0].SipTLSLocalPort.value,1024,65535))
        {
          alert("'本地SIP TLS端口' 范围为1024-65535!");
          $rootScope.href_click('SipServer');
          $rootScope.getSelect('SipTLSLocalPort',0,'form');
          return false;
        }
        if (gSipTLSLocalPort != document.forms[0].SipTLSLocalPort.value && 3 == document.forms[0].SIPTransType.value) {
          SipPortChange = true;
        } else if (gSipUdpLocalPort != document.forms[0].SipUDPLocalPort.value && 3 != document.forms[0].SIPTransType.value)
        {
          SipPortChange = true;
        }
      }

      if (gSipPortRandom != document.forms[0].SipPortRandom.checked) {
        SipPortChange = true;
      }

      if (true == SipPortChange) {
        if (confirm("警告：'本地SIP端口'发生变化，将会拆除当前所有呼叫，是否继续？")) {
          return true;
        }
        else {
          $rootScope.href_click('SipServer');
          return false;
        }
      }

      if (false == BlankCheck(document.forms[0].PrimServerAddr.value))
      {
        alert("‘主用SIP服务器地址’中含有空白字符");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PrimServerAddr',0,'form');
        return false;
      }

      if (false == BlankCheck(document.forms[0].SecondServerAddr.value))
      {
        alert("‘备用SIP服务器地址’中含有空白字符");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('SecondServerAddr',0,'form');
        return false;
      }

      if (false == BlankCheck(document.forms[0].PriOutboundAddr.value))
      {
        alert("‘主用外拨代理服务器地址’中含有空白字符");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('PriOutboundAddr',0,'form');
        return false;
      }

      if (false == BlankCheck(document.forms[0].SecOutboundAddr.value))
      {
        alert("‘备用外拨代理服务器地址’中含有空白字符");
        $rootScope.href_click('SipServer');
        $rootScope.getSelect('SecOutboundAddr',0,'form');
        return false;
      }

      return true;
    }

    function BlankCheck(string)
    {
      if (string.indexOf(' ') >= 0)
      {
        return false;
      }
      return true;
    }
  }])

  .controller('LineParamCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var oPortNum=0;
    var sPortNum=0;
    var g_OSType;
    var lineAttr = 0;
    var g_ToneParam = eval('(' + "{user:{flag:0, value:{callback:'0,0,0,0,0,0,0,0', busy:'0,0,0,0,0,0,0,0', dial:'0,0,0,0,0,0,0,0'}},tone0:{id:0, value:{callback:'440,260,480,260,2000,4000,0,0', busy:'480,260,620,260,500,500,0,0', dial:'350,260,440,260,0,0,0,0'}},tone1:{id:1, value:{callback:'400,260,450,260,400,200,0,0', busy:'400,260,400,630,400,400,0,0', dial:'350,260,440,260,0,0,0,0'}},tone2:{id:2, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone3:{id:3, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone4:{id:4, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone5:{id:5, value:{callback:'425,260,450,630,1000,4000,0,0', busy:'425,260,450,630,480,480,0,0', dial:'425,260,450,630,0,0,0,0'}},tone6:{id:6, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone7:{id:7, value:{callback:'425,260,450,630,1000,4000,0,0', busy:'425,260,450,630,500,500,0,0', dial:'425,260,450,630,0,0,0,0'}},tone8:{id:8, value:{callback:'384,260,416,630,1000,2000,0,0', busy:'450,260,450,630,350,350,0,0', dial:'400,260,450,630,0,0,0,0'}},tone9:{id:9, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone10:{id:10, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone11:{id:11, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone12:{id:12, value:{callback:'400,260,450,260,400,200,0,0', busy:'400,260,400,630,400,400,0,0', dial:'350,260,440,260,0,0,0,0'}},tone13:{id:13, value:{callback:'400,260,450,260,400,200,0,0', busy:'425,260,400,630,400,400,0,0', dial:'400,260,450,260,0,0,0,0'}},tone14:{id:14, value:{callback:'450,260,450,630,1000,4000,0,0', busy:'450,260,450,630,350,350,0,0', dial:'450,260,450,630,0,0,0,0'}},tone15:{id:15, value:{callback:'440,260,480,260,400,200,0,0', busy:'480,260,620,260,500,500,0,0', dial:'350,260,440,260,0,0,0,0'}},tone16:{id:16, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone17:{id:17, value:{callback:'425,260,450,630,800,3200,0,0', busy:'425,260,440,630,400,400,0,0', dial:'425,260,425,630,0,0,0,0'}},tone18:{id:18, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone19:{id:19, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone20:{id:20, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone21:{id:21, value:{callback:'440,260,440,630,1500,3500,0,0', busy:'440,260,450,630,500,500,0,0', dial:'440,260,450,630,0,0,0,0'}},tone22:{id:22, value:{callback:'425,260,450,630,1000,4000,0,0', busy:'425,260,440,630,500,500,0,0', dial:'425,260,425,630,0,0,0,0'}},tone23:{id:23, value:{callback:'440,260,480,260,800,4000,0,0', busy:'480,260,620,260,500,500,0,0', dial:'350,260,440,260,0,0,0,0'}}}" + ')');
    var g_jDevInfo = eval("(" + "{DevType:'normal', TotalPorts:8, TotalSlots:0, PortsPerSlot:0, SlotMap:''}" + ")");
    var totalPort=0;
    var totalTTPort=0;
    var szFXOTestMap;
    var g_LineParam = eval('(' + "{port0:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port1:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port2:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port3:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port4:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port5:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port6:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},port7:{rx:2,tx:2,workmode:2,scenemode:0,setmode:0},count:112}" + ')');
    var g_RemoteBoard = 0;

    $scope.mouse_click = function(){
      if (document.getElementById("LineParam").SetMode[0].checked)
      {
        document.getElementById("idTinySetLGT").style.display = "";
        document.getElementById("idTinySetLGR").style.display = "";
        document.getElementById("idUserSetLGT").style.display = "none";
        document.getElementById("idUserSetLGR").style.display = "none";
      }
      else
      {
        document.getElementById("idTinySetLGT").style.display = "none";
        document.getElementById("idTinySetLGR").style.display = "none";
        document.getElementById("idUserSetLGT").style.display = "";
        document.getElementById("idUserSetLGR").style.display = "";
      }

      if(document.getElementById("RTPDetectedEnable").checked == true)
      {
        document.getElementById("SilenceTimeout").disabled = false;
      }
      else
      {
        document.getElementById("SilenceTimeout").disabled = true;
      }

      if (g_OSType == "Linux")
      {
        var curtone = document.getElementById("CallProgressTone").value;
        if (curtone == 255)
        {
          document.getElementById("ToneRingBack").readOnly = false;
          document.getElementById("ToneDial").readOnly = false;
          document.getElementById("ToneBusy").readOnly = false;

          if (g_ToneParam.user.flag == 1)
          {
            document.getElementById("ToneRingBack").value = eval("g_ToneParam.user.value.callback");
            document.getElementById("ToneDial").value = eval("g_ToneParam.user.value.dial");
            document.getElementById("ToneBusy").value = eval("g_ToneParam.user.value.busy");
          }
        }
        else
        {
          document.getElementById("ToneRingBack").readOnly = true;
          document.getElementById("ToneDial").readOnly = true;
          document.getElementById("ToneBusy").readOnly = true;
          document.getElementById("ToneRingBack").value = eval("g_ToneParam.tone"+curtone+".value.callback");
          document.getElementById("ToneDial").value = eval("g_ToneParam.tone"+curtone+".value.dial");
          document.getElementById("ToneBusy").value = eval("g_ToneParam.tone"+curtone+".value.busy");
        }
      }

      if (sPortNum != 0)
      {
        if(document.getElementById("DetectHookFlash").checked == false)
        {
          document.getElementById("idFlashLowerLimit").style.display="none";
          document.getElementById("idFlashLimit").style.display="none";
        }
        else
        {
          document.getElementById("idFlashLowerLimit").style.display="";
          document.getElementById("idFlashLimit").style.display="";
        }

        if (document.getElementById("CIDTransMode").value == 1 )
        {
          document.getElementById("idCIDMsgType").style.display = "none";
          document.getElementById("idCIDMsgFormat").style.display = "none";
        }
        else
        {
          document.getElementById("idCIDMsgType").style.display = "";
          document.getElementById("idCIDMsgFormat").style.display = "";
        }

        if(document.getElementById("CIDSendBeforeRing").checked)
        {
          document.getElementById("idCIDSendDelay").style.display = "none";
        }
        else
        {
          document.getElementById("idCIDSendDelay").style.display = "";
        }
      }

      if(oPortNum != 0)
      {
        if (document.getElementById("SendCallerIDEnable").checked)
        {
          document.getElementById("idFormatValid").style.display = "";
          document.getElementById("idFormatInvalid").style.display = "";
        }
        else
        {
          document.getElementById("idFormatValid").style.display = "none";
          document.getElementById("idFormatInvalid").style.display = "none";
        }

        if(document.getElementById("FxoKeepOnhook").checked)
        {
          document.getElementById("idFxoRejectOffhookDelay").style.display = "";
          document.getElementById("idPlayHintToOPort").style.display = "none";
        }
        else
        {
          document.getElementById("idFxoRejectOffhookDelay").style.display = "none";
          document.getElementById("idPlayHintToOPort").style.display = "";
        }

        if(document.getElementById("CurrentDisconnectEnable").checked == true)
        {
          document.getElementById("CurrentDisconnectThreshold").disabled = false;
        }
        else
        {
          document.getElementById("CurrentDisconnectThreshold").disabled = true;
        }

        if(document.getElementById("OPort1StageCalling").checked == false)
        {
          document.getElementById("idFxoDetectPolarity").style.display = "none";
          document.getElementById("idOffhookTimeout").style.display = "none";
          document.getElementById("idFXODialDelay").style.display = "none";
          document.getElementById("idAnswerToCallerWhen").style.display = "none";
        }
        else
        {
          document.getElementById("idFxoDetectPolarity").style.display = "";
          document.getElementById("idFXODialDelay").style.display = "";

          document.getElementById("idOffhookTimeout").style.display = "";
          document.getElementById("idAnswerToCallerWhen").style.display = "";
        }

        if (document.getElementById("DialMode").value == 0)
        {
          document.getElementById("idPulseMode").style.display = "none";
        }
        else
        {
          document.getElementById("idPulseMode").style.display = "";
        }

        var PortId = parseInt(document.getElementById("TestPort").value);
        if(PortId < totalPort)
        {
          if(szFXOTestMap.charAt(PortId) == '1')
          {
            document.getElementById("StartFXOTest").disabled = true;
          }
          else
          {
            document.getElementById("StartFXOTest").disabled = false;
          }
        }
        else
        {
          if(totalTTPort == oPortNum)
          {
            document.getElementById("StartFXOTest").disabled = true;
          }
          else
          {
            document.getElementById("StartFXOTest").disabled = false;
          }
        }
      }
    }

    MM_callJS('0', '8', 'Linux', '00000000','Admin', 'no');

    function MM_callJS(FxoPortNum,FxsPortNum, OSType, FxoTestMap,user, WhetherDevWithRemoteBoard)
    {
      var n=0;
      oPortNum = parseInt(FxoPortNum);
      sPortNum = parseInt(FxsPortNum);
      g_OSType = OSType;
      totalPort = oPortNum + sPortNum;
      szFXOTestMap = FxoTestMap;
      var firstPort = 0;

      document.getElementById("idTinySetLGT").style.display = "none";
      document.getElementById("idTinySetLGR").style.display = "none";
      document.getElementById("idUserSetLGT").style.display = "";
      document.getElementById("idUserSetLGR").style.display = "";

      document.getElementById("LineParam").AnswerMode[0].checked= true;
      document.getElementById("LineParam").SetMode[0].checked = true;

      if ("yes" == WhetherDevWithRemoteBoard)
      {
        g_RemoteBoard = true;
        document.getElementById("idSPIBLProtectedTime").style.display = "";
      }
      else
      {
        g_RemoteBoard = false;
      }

      if (sPortNum != 0)
      {
        document.getElementById("tbFXS").style.display = "";
        document.getElementById("idSlic").style.display = "";
        document.getElementById("idLongLineSupport").style.display = "";
        document.getElementById("idFxsConnectPhoneCount").style.display = "";
        document.getElementById("AutoImpTbl").style.dispaly = "";

        for(var i=0; i<totalPort; i++)
        {
          if(FxoTestMap.charAt(i) == '0')
          {
            continue;
          }
          if(FxoTestMap.charAt(i) == '1')
          {
            totalTTPort++;
          }
          document.getElementById("TestPort").options.add(new Option(""+i, ""+i));
        }
        document.getElementById("TestPort").options.add(new Option("All", "255"));

        firstPort = parseInt(document.getElementById("TestPort").value);
        if(FxoTestMap.charAt(firstPort) == '1')
        {
          document.getElementById("StartFXOTest").disabled = true;
        }
      }

      if(oPortNum != 0)
      {
        document.getElementById("tbFXO").style.display="";
        document.getElementById("ACImpTbl").style.display = "";
      }

      if (sPortNum != 0 && oPortNum != 0)
      {
        document.getElementById("idOfflineEscape").style.display = "";
      }
      else
      {
        document.getElementById("idOfflineEscape").style.display = "none";
      }

      document.getElementById("LinePort").options.add(new Option("请选择端口", 255));
      document.getElementById("LinePort").options.add(new Option("所有端口", 254));

      for (n=0; n<g_LineParam.count; n++)
      {
        document.getElementById("LinePort").options.add(new Option("Port " + n, n));
      }

      if (g_OSType == "Linux")
      {
        document.getElementById("idAgeEnable").style.display = "";
      }

      if (g_OSType != "Linux")
      {
        var length = document.getElementById("CallProgressTone").length;
        var i;
        for (i=0; i<length; i++)
        {
          if (document.getElementById("CallProgressTone").options[i].value == 255)
          {
            document.getElementById("CallProgressTone").options.remove(i);
            break;
          }
        }
      }
      var curtone = document.getElementById("CallProgressTone").value;
      if (curtone == 255)
      {
        document.getElementById("ToneRingBack").readOnly = false;
        document.getElementById("ToneDial").readOnly = false;
        document.getElementById("ToneBusy").readOnly = false;

        document.getElementById("ToneRingBack").value = eval("g_ToneParam.user.value.callback");
        document.getElementById("ToneDial").value = eval("g_ToneParam.user.value.dial");
        document.getElementById("ToneBusy").value = eval("g_ToneParam.user.value.busy");
      }

      if (g_jDevInfo.DevType == "dag3000")
      {
        document.getElementById("idLongLineDag3000Item").style.display = "";
        document.getElementById("idLongLineItem").innerHTML = "&nbsp;";
      }
      $scope.mouse_click();

      lineAttr = 1;
    }

//    $scope.startfxotest_onclick = function()
//    {
//      var xmlHttp=null;
//      try{
//        // Firefox, Opera 8.0+, Safari
//        xmlHttp=new XMLHttpRequest();
//      }catch (e){
//        // Internet Explorer
//        try{
//          xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
//        }catch (e){
//          xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
//        }
//      }
//
//      if (xmlHttp == null){
//        alert("Error!");
//      }
//      var PortId = parseInt(document.getElementById("TestPort").value);
//      var param = "TestPort=" + PortId;
//
//      url = "/goform/EiaStartPortTest";
//
//      xmlHttp.onreadystatechange = function(){
//        if (xmlHttp.readyState==4 && xmlHttp.status == 200){
//          var result = xmlHttp.responseText;
//        }
//      };
//      xmlHttp.open("POST", url, true);
//      xmlHttp.send(param);
//
//      document.getElementById("StartFXOTest").disabled = true;
//
//    }

    function line_param_option_add()
    {
      var portObj,TsTxGainObj,TsRxGainObj,UsTxGainObj,UsRxGainObj,workModeObj;

      if (lineAttr == "0")
      {
        return;
      }

      portObj = document.getElementById("LinePort");
      TsTxGainObj = document.getElementById("TSLineGainTx");
      TsRxGainObj = document.getElementById("TSLineGainRx");
      UsTxGainObj = document.getElementById("USLineGainTx");
      UsRxGainObj = document.getElementById("USLineGainRx");
      workModeObj = document.getElementById("LineWorkMode");

      if (portObj.value == "255" )
      {
        document.getElementById("LineParam").AnswerMode[0].checked = true;
        document.getElementById("LineParam").SetMode[0].checked = true;
        //tiny set
        if (TsTxGainObj.options[0].value != "255")
        {
          TsTxGainObj.options.add((new Option("", 255)), 0);
          TsTxGainObj.options[0].selected = true ;
        }

        if (TsRxGainObj.options[0].value != "255")
        {
          TsRxGainObj.options.add((new Option("", 255)), 0);
          TsRxGainObj.options[0].selected = true ;
        }
        //user set
        if (UsTxGainObj.options[0].value != "255")
        {
          UsTxGainObj.options.add((new Option("", 255)), 0);
          UsTxGainObj.options[0].selected = true ;
        }

        if (UsRxGainObj.options[0].value != "255")
        {
          UsRxGainObj.options.add((new Option("", 255)), 0);
          UsRxGainObj.options[0].selected = true ;
        }
        //work mode
        if (workModeObj.options[0].value != "255")
        {
          workModeObj.options.add((new Option("", 255)), 0);
          workModeObj.options[0].selected = true ;
        }
      }
    }

    function line_param_option_del()
    {
      var portObj,TsTxGainObj,TsRxGainObj,UsTxGainObj,UsRxGainObj,workModeObj;

      if (lineAttr == "0")
      {
        return;
      }

      portObj = document.getElementById("LinePort");
      TsTxGainObj = document.getElementById("TSLineGainTx");
      TsRxGainObj = document.getElementById("TSLineGainRx");
      UsTxGainObj = document.getElementById("USLineGainTx");
      UsRxGainObj = document.getElementById("USLineGainRx");
      workModeObj = document.getElementById("LineWorkMode");

      if (portObj.value != "255" )
      {
        //tiny set
        if (TsTxGainObj.options[0].value == "255")
        {
          TsTxGainObj.options.remove(0);
        }
        if (TsRxGainObj.options[0].value == "255")
        {
          TsRxGainObj.options.remove(0);
        }
        //user set
        if (UsTxGainObj.options[0].value == "255")
        {
          UsTxGainObj.options.remove(0);
        }
        if (UsRxGainObj.options[0].value == "255")
        {
          UsRxGainObj.options.remove(0);
        }
        //work mode
        if (workModeObj.options[0].value == "255")
        {
          workModeObj.options.remove(0);
        }
      }
    }

    $scope.lineport_click = function()
    {
      var temp,portObj,TsTxGainObj,TsRxGainObj,UsTxGainObj,UsRxGainObj,workModeObj;
      var portno;

      if (lineAttr == "0")
      {
        return;
      }

      portObj = document.getElementById("LinePort");
      TsTxGainObj = document.getElementById("TSLineGainTx");
      TsRxGainObj = document.getElementById("TSLineGainRx");
      UsTxGainObj = document.getElementById("USLineGainTx");
      UsRxGainObj = document.getElementById("USLineGainRx");
      workModeObj = document.getElementById("LineWorkMode");

      if (portObj.value < g_LineParam.count)
      {
        portno = portObj.value;
      }
      else if (portObj.value == "254")
      {
        portno = 0;
      }
      else
      {
        line_param_option_add();
        return;
      }

      if (portObj.value != "255")
      {
        temp = eval("g_LineParam.port" + portno + ".scenemode");
        if (temp)
        {
          //选择了话机模式
          document.getElementById("LineParam").AnswerMode[1].checked = true;
        }
        else
        {
          //选择了耳机模式
          document.getElementById("LineParam").AnswerMode[0].checked = true;
        }

        temp = eval("g_LineParam.port" + portno + ".setmode");
        if (temp)
        {
          //选择了基本模式
          document.getElementById("LineParam").SetMode[1].checked = true;
        }
        else
        {
          //选择了高级模式
          document.getElementById("LineParam").SetMode[0].checked = true;
        }

        if (document.getElementById("LineParam").SetMode[0].checked)
        {
          TsRxGainObj.value = eval("g_LineParam.port" + portno + ".rx");
          TsTxGainObj.value = eval("g_LineParam.port" + portno + ".tx");
          UsRxGainObj.value = 2;
          UsTxGainObj.value = 2;
        }
        else
        {
          TsRxGainObj.value = 2;
          TsTxGainObj.value = 2;
          UsRxGainObj.value = eval("g_LineParam.port" + portno + ".rx");
          UsTxGainObj.value = eval("g_LineParam.port" + portno + ".tx");
        }

        workModeObj.value = eval("g_LineParam.port" + portno + ".workmode");

        line_param_option_del();
      }


      if (document.getElementById("LineParam").SetMode[0].checked)
      {
        document.getElementById("idTinySetLGT").style.display = "";
        document.getElementById("idTinySetLGR").style.display = "";
        document.getElementById("idUserSetLGT").style.display = "none";
        document.getElementById("idUserSetLGR").style.display = "none";
      }
      else
      {
        document.getElementById("idTinySetLGT").style.display = "none";
        document.getElementById("idTinySetLGR").style.display = "none";
        document.getElementById("idUserSetLGT").style.display = "";
        document.getElementById("idUserSetLGR").style.display = "";
      }
    }

    $rootScope.LineParamFormCheck = function(){
      var HookFlashMinTime;

      if (document.getElementById("CallProgressTone").value == 255)
      {
        if (!check_call_process_tone_str(document.getElementById("ToneRingBack").value))
        {
          alert("'回铃音' 配置不正确, 请阅读注意事项!");
          $rootScope.href_click('LineParam');
          $rootScope.getFocus('ToneRingBack',0,'id');
          return false;
        }
        if (!check_call_process_tone_str(document.getElementById("ToneBusy").value))
        {
          alert("'忙音' 配置不正确, 请阅读注意事项！");
          $rootScope.href_click('LineParam');
          $rootScope.getFocus('ToneBusy',0,'id');
          return false;
        }

        if (!check_call_process_tone_str(document.getElementById("ToneDial").value))
        {
          alert("'拨号音' 配置不正确, 请阅读注意事项！");
          $rootScope.href_click('LineParam');
          $rootScope.getFocus('ToneDial',0,'id');
          return false;
        }
      }

      if(!is_number(document.getElementById("NoDialTimeout").value,3,10))
      {
        alert("'位间拨号超时时间'范围为3-10!");
        $rootScope.href_click('LineParam');
        $rootScope.getSelect('NoDialTimeout',0,'id');
        return false;
      }

      if(!is_number(document.getElementById("NoAnswerTimeout").value,10,255))
      {
        alert("'应答超时时间(呼出)'范围为10-255!");
        $rootScope.href_click('LineParam');
        $rootScope.getSelect('NoAnswerTimeout',0,'id');
        return false;
      }

      if(!is_number(document.getElementById("RingTimeout").value,10,255))
      {
        alert("'应答超时时间(呼入)'范围为10-255!");
        $rootScope.href_click('LineParam');
        $rootScope.getSelect('RingTimeout',0,'id');
        return false;
      }

      if (document.getElementById("RTPDetectedEnable").checked == true
        && !is_number(document.getElementById("SilenceTimeout").value,10,120))
      {
        alert("'RTP报文中断最大时长'范围为10-120!");
        $rootScope.href_click('LineParam');
        $rootScope.getSelect('SilenceTimeout',0,'id');
        return false;
      }

      if (g_RemoteBoard)
      {
        if(!is_number(document.getElementById("SPIBLProtectedTime").value,2,30))
        {
          alert("'SPI断链保护时间'范围为2 - 30秒!");
          $rootScope.href_click('LineParam');
          $rootScope.getSelect('SPIBLProtectedTime',0,'id');
          return false;
        }
      }

      if(sPortNum != 0)//fxs
      {
        if(document.getElementById("DetectHookFlash").checked == true)
        {
          HookFlashMinTime = document.getElementById("HookFlashMinTime");
          if(!is_number(HookFlashMinTime.value,60,1500))
          {
            alert("拍叉‘最小时长’范围为60-1500!");
            $rootScope.href_click('LineParam');
            $rootScope.getSelect('HookFlashMinTime',0,'id');
            return false;
          }

          if(!is_number(document.getElementById("HookFlashMaxTime").value,HookFlashMinTime.value,1500))
          {
            alert("拍叉‘最大时长’范围为"+HookFlashMinTime.value+" -1500!");
            $rootScope.href_click('LineParam');
            $rootScope.getSelect('HookFlashMaxTime',0,'id');
            return false;
          }
        }
        if(!is_number(document.getElementById("NoReplyTimeout").value,10,255))
        {
          alert("'无应答呼转等待时间'范围为10-255!");
          $rootScope.href_click('LineParam');
          $rootScope.getSelect('NoReplyTimeout',0,'id');
          return false;
        }
        if(!is_number(document.getElementById("CIDSendDelay").value,150, 1500))
        {
          alert("'振铃后延迟发送CID时间'范围为150-1500!");
          $rootScope.href_click('LineParam');
          $rootScope.getSelect('CIDSendDelay',0,'id');
          return false;
        }
        if(!is_number(document.getElementById("FxsConnectPhoneCount").value,1,4))
        {
          alert("'REN'范围为1-4!");
          $rootScope.href_click('LineParam');
          $rootScope.getSelect('FxsConnectPhoneCount',0,'id');
          return false;
        }
      }

      if(oPortNum != 0)
      {
        if(document.getElementById("OPort1StageCalling").checked)
        {
          if (!document.getElementById("FxoOutRPolarityOffhook").checked
            && document.getElementById("OffhookTimeout").value.length == 0)
          {
            alert("必须要输入'超过应答时限' 或选择 '检测到外线反极信号'!");
            $rootScope.href_click('LineParam');
            return false;
          }

          if(document.getElementById("OffhookTimeout").value.length!=0)
          {
            if(!is_number(document.getElementById("OffhookTimeout").value,1,255))
            {
              alert("'超过应答时限'范围为1-255!");
              $rootScope.href_click('LineParam');
              $rootScope.getSelect('OffhookTimeout',0,'id');
              return false;
            }
          }
        }

        if(document.getElementById("CurrentDisconnectEnable").checked == true)
        {
          if(!is_number(document.getElementById("CurrentDisconnectThreshold").value,100,2000))
          {
            alert("'无电流最大时长'范围为100-2000!");
            $rootScope.href_click('LineParam');
            $rootScope.getSelect('CurrentDisconnectThreshold',0,'id');
            return false;
          }
        }

        if(document.getElementById("FxoKeepOnhook").checked)
        {
          if (!is_number(document.getElementById("FxoRejectOffhookDelay").value, 500, 5000))
          {
            alert("'呼叫被拒绝FXO摘挂机间隔'范围为500-5000!");
            $rootScope.href_click('LineParam');
            $rootScope.getSelect('FxoRejectOffhookDelay',0,'id');
            return false;
          }
        }

        if (!is_number(document.getElementById("FXODialDelay").value, 0, 1500))
        {
          alert("'FXO摘机拨号延迟时间'范围为0-1500!");
          $rootScope.href_click('LineParam');
          $rootScope.getSelect('FXODialDelay',0,'id');
          return false;
        }
      }

      if (document.getElementById("TSLineGainRx").value != "255"
        || document.getElementById("TSLineGainTx").value != "255"
        || document.getElementById("USLineGainRx").value != "255"
        || document.getElementById("USLineGainTx").value != "255"
        || document.getElementById("LineWorkMode").value != "255")
      {
        if (document.getElementById("LinePort").value == "255")
        {
          alert("请选择端口!");
          $rootScope.href_click('LineParam');
          return false;
        }
      }

      return true;
    }

  }])

  .controller('MediaStreamCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var gFxsPortNum;
    var gSupportedCodes = eval('(' + "{item0:{name:'G.711U', pt:0}, item1:{name:'G.711A', pt:8}, item2:{name:'G.723', pt:4}, item3:{name:'G.729', pt:18}, item4:{name:'iLBC-13K', pt:97}, item5:{name:'iLBC-15K', pt:98}, item6:{name:'G.726-16', pt:111}, item7:{name:'G.726-24', pt:110}, item8:{name:'G.726-32', pt:109}, item9:{name:'G.726-40', pt:108}, count:10 }" + ')');
    var gCodecList =  eval('(' + "{item0:{name:8, payload:8, Ptime:20, rate:64, silence :0},item1:{name:8, payload:8, Ptime:20, rate:64, silence :0},item2:{name:8, payload:8, Ptime:20, rate:64, silence :0},item3:{name:8, payload:8, Ptime:20, rate:64, silence :0},item4:{name:8, payload:8, Ptime:20, rate:64, silence :0},item5:{name:8, payload:8, Ptime:20, rate:64, silence :0},item6:{name:8, payload:8, Ptime:20, rate:64, silence :0},item7:{name:8, payload:8, Ptime:20, rate:64, silence :0},item8:{name:8, payload:8, Ptime:20, rate:64, silence :0},item9:{name:8, payload:8, Ptime:20, rate:64, silence :0},count:10, max:16}" + ')');

    MM_callJS(16,'Admin');

    function MM_callJS(FxsPortNum,user)
    {
      gFxsPortNum = parseInt(FxsPortNum);
      init_codec_list();
      setTimeout(function(){
        mouse_click();
      },1500)
    }

    $scope.mouse_click = function()
    {
      if (gFxsPortNum > 0)
      {
        var DtmfMethod = document.getElementById("DTMFMethod").value;
        if ("0" == DtmfMethod) //inband
        {
          document.getElementById("idFlashEventBlank").style.display = "none";
          document.getElementById("idFlashEvent").style.display = "none";
          document.getElementById("idFlashRTPEvent").style.display = "none";
          document.getElementById("idContentType").style.display = "none";
          document.getElementById("idContentLength").style.display = "none";
          document.getElementById("idFlashBody").style.display = "none";
          document.getElementById("idDTMFSend").style.display = "none";
        }
        else
        {
          document.getElementById("idFlashEventBlank").style.display = "";
          document.getElementById("idFlashEvent").style.display = "";
          document.getElementById("idDTMFSend").style.display = "";
          if ($("#SendFlashEvent").prop('checked'))
          {
            if ("1" == DtmfMethod)  //signal
            {
              document.getElementById("idFlashRTPEvent").style.display = "none";
              document.getElementById("idContentType").style.display = "";
              document.getElementById("idContentLength").style.display = "";
              document.getElementById("idFlashBody").style.display = "";
            }
            else  //rfc2833
            {
              document.getElementById("idFlashRTPEvent").style.display = "";
              document.getElementById("idContentType").style.display = "none";
              document.getElementById("idContentLength").style.display = "none";
              document.getElementById("idFlashBody").style.display = "none";
            }
          }
          else
          {
            document.getElementById("idFlashRTPEvent").style.display = "none";
            document.getElementById("idContentType").style.display = "none";
            document.getElementById("idContentLength").style.display = "none";
            document.getElementById("idFlashBody").style.display = "none";
          }
        }
      }

      if ("2" == document.getElementById("DTMFMethod").value)  //rfc2833
      {
        document.getElementById("idPayload2833").style.display ="";
        document.getElementById("idRFC2833PTPrefered").style.display ="";
      }
      else
      {
        document.getElementById("idPayload2833").style.display ="none";
        document.getElementById("idRFC2833PTPrefered").style.display ="none";
      }


      if ($("#RTPPortRandom").prop("checked"))
      {
        document.getElementById('RtpPort').disabled = true;
      }
      else
      {
        document.getElementById('RtpPort').disabled = false;
      }
    }

    function mouse_click(){
      if (gFxsPortNum > 0)
      {
        var DtmfMethod = document.getElementById("DTMFMethod").value;
        if ("0" == DtmfMethod) //inband
        {
          document.getElementById("idFlashEventBlank").style.display = "none";
          document.getElementById("idFlashEvent").style.display = "none";
          document.getElementById("idFlashRTPEvent").style.display = "none";
          document.getElementById("idContentType").style.display = "none";
          document.getElementById("idContentLength").style.display = "none";
          document.getElementById("idFlashBody").style.display = "none";
          document.getElementById("idDTMFSend").style.display = "none";
        }
        else
        {
          document.getElementById("idFlashEventBlank").style.display = "";
          document.getElementById("idFlashEvent").style.display = "";
          document.getElementById("idDTMFSend").style.display = "";
          if ($("#SendFlashEvent").prop('checked'))
          {
            if ("1" == DtmfMethod)  //signal
            {
              document.getElementById("idFlashRTPEvent").style.display = "none";
              document.getElementById("idContentType").style.display = "";
              document.getElementById("idContentLength").style.display = "";
              document.getElementById("idFlashBody").style.display = "";
            }
            else  //rfc2833
            {
              document.getElementById("idFlashRTPEvent").style.display = "";
              document.getElementById("idContentType").style.display = "none";
              document.getElementById("idContentLength").style.display = "none";
              document.getElementById("idFlashBody").style.display = "none";
            }
          }
          else
          {
            document.getElementById("idFlashRTPEvent").style.display = "none";
            document.getElementById("idContentType").style.display = "none";
            document.getElementById("idContentLength").style.display = "none";
            document.getElementById("idFlashBody").style.display = "none";
          }
        }
      }

      if ("2" == document.getElementById("DTMFMethod").value)  //rfc2833
      {
        document.getElementById("idPayload2833").style.display ="";
        document.getElementById("idRFC2833PTPrefered").style.display ="";
      }
      else
      {
        document.getElementById("idPayload2833").style.display ="none";
        document.getElementById("idRFC2833PTPrefered").style.display ="none";
      }


      if ($("#RTPPortRandom").prop("checked"))
      {
        document.getElementById('RtpPort').disabled = true;
      }
      else
      {
        document.getElementById('RtpPort').disabled = false;
      }
    }

    function init_codec_list()
    {
      var i, j;
      var CodecName = "";
      var CodecPT = 0;

      /* 添加配置项 */
      for (i=0; i<gSupportedCodes.count; i++)
      {
        document.getElementById("idCoder" + i + "th").style.display = "";
        document.getElementById("CoderName" + i).options.add(new Option("",255));

        /* 把所有支持的编解码全部加进去 */
        for (j=0; j<gSupportedCodes.count; j++)
        {
          CodecName = eval("gSupportedCodes.item" + j + ".name");
          CodecPT = eval("gSupportedCodes.item" + j + ".pt");

          document.getElementById("CoderName" + i).options.add(new Option(CodecName, CodecPT));
        }
      }

      $scope.CoderChange = function(serial)
      {
        var i,j,coder, Tmp;

        coder = eval("document.getElementById('CoderName"+serial+"').value");

        PktTime_Check(serial, coder);

        if (255 == coder)
        {
          eval("document.getElementById('CoderPT"+serial+"').value=''");
          eval("document.getElementById('CoderPktTime"+serial+"').value='255'");
          eval("document.getElementById('CoderRate"+serial+"').value=''");
          eval("document.getElementById('CoderSilence"+serial+"').options.length=0");
          return true;
        }

        document.getElementById("CoderSilence" + serial).options.length = 0;
        document.getElementById("CoderSilence" + serial).options.add(new Option("禁止", 0));
        document.getElementById("CoderSilence" + serial).options.add(new Option("启用", 1));

        if (coder == 0)
        {
          eval("document.getElementById('CoderPT"+serial+"').value=0");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=64");
        }
        else if (coder == 4)
        {
          eval("document.getElementById('CoderPT"+serial+"').value=4");
          eval("document.getElementById('CoderPktTime"+serial+"').value=30");
          eval("document.getElementById('CoderRate"+serial+"').value=6.3");
        }
        else if (coder == 8)
        {
          eval("document.getElementById('CoderPT"+serial+"').value=8");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=64");
        }
        else if (coder == 18)
        {
          eval("document.getElementById('CoderPT"+serial+"').value=18");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=8");
        }
        else if (coder == 97)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=30");
          eval("document.getElementById('CoderRate"+serial+"').value=13");
        }
        else if (coder == 98)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=15");
        }
        else if (coder == 99)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value='动态'");
        }
        else if (coder == 100)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value='动态'");
        }
        else if (coder == 108)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=40");
        }
        else if (coder == 109)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=32");
        }
        else if (coder == 110)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=24");
        }
        else if (coder == 111)
        {
          eval("document.getElementById('CoderPT"+serial+"').value='动态'");
          eval("document.getElementById('CoderPktTime"+serial+"').value=20");
          eval("document.getElementById('CoderRate"+serial+"').value=16");
        }

        eval("document.getElementById('CoderSilence"+serial+"').value=0");

        //同时将关联的打包时长，静音抑制，框变蓝色，用于关联保存
        document.getElementById('CoderPktTime'+serial).style.borderColor = '#056aa6';
        document.getElementById('CoderPktTime'+serial).style.color = 'black';
        document.getElementById('CoderSilence'+serial).style.borderColor = '#056aa6';
        document.getElementById('CoderSilence'+serial).style.color = 'black';
        document.getElementById('CoderPT'+serial).style.borderColor = '#056aa6';
        document.getElementById('CoderPT'+serial).style.color = 'black';
        document.getElementById('CoderRate'+serial).style.borderColor = '#056aa6';
        document.getElementById('CoderRate'+serial).style.color = 'black';

        return true;
      }

      /* 把配置数据填进去 */
      for (i=0; i<gCodecList.count; i++)
      {
        document.getElementById("CoderName" + i).value = eval("gCodecList.item" + i + ".name");
        $scope.CoderChange(i);
        if (eval("gCodecList.item" + i + ".name") == 255)
        {
          continue;
        }

        document.getElementById("CoderPT" + i).value = eval("gCodecList.item" + i + ".payload");
        document.getElementById("CoderPktTime" + i).value = eval("gCodecList.item" + i + ".Ptime");
        document.getElementById("CoderRate" + i).value = eval("gCodecList.item" + i + ".rate");
        document.getElementById("CoderSilence" + i).value = eval("gCodecList.item" + i + ".silence");
      }
    }

    function PktTime_Check(number,coder)
    {
      var i, CoderPktTime;

      CoderPktTime = document.getElementById("CoderPktTime"+number);

      //remove all(remain)
      CoderPktTime.options.length = 0;

      if (coder == 0 || coder == 8)//G711
      {
        //20,30,40,50,60
        for (i=20; i<=60; i+=10)
        {
          CoderPktTime.options.add(new Option(i,i));
        }
      }
      else if (coder == 4)//G723
      {
        //30,60
        CoderPktTime.options.add(new Option(30,30));
        CoderPktTime.options.add(new Option(60,60));
      }
      else if (coder == 18)//G729
      {
        //20,30
        CoderPktTime.options.add(new Option(10,10));
        CoderPktTime.options.add(new Option(20,20));
        CoderPktTime.options.add(new Option(30,30));
        CoderPktTime.options.add(new Option(40,40));
        CoderPktTime.options.add(new Option(50,50));
        CoderPktTime.options.add(new Option(60,60));
      }
      else if (coder == 97) //ilbc 13k
      {
        CoderPktTime.options.add(new Option(30,30));
      }
      else if (coder == 98) //ilbc 15k
      {
        CoderPktTime.options.add(new Option(20,20));
      }
      else if (coder == 99 || coder == 100) // amr
      {
        CoderPktTime.options.add(new Option(20,20));
        CoderPktTime.options.add(new Option(40,40));
        CoderPktTime.options.add(new Option(60,60));
        //CoderPktTime.options.add(new Option(80,80));
      }
      else if (coder == 108 || coder == 109 || coder == 110 || coder == 111) // g.726
      {
        CoderPktTime.options.add(new Option(10,10));
        CoderPktTime.options.add(new Option(20,20));
        CoderPktTime.options.add(new Option(30,30));
        CoderPktTime.options.add(new Option(40,40));
        CoderPktTime.options.add(new Option(50,50));
        CoderPktTime.options.add(new Option(60,60));
      }
      else if (coder == 255)
      {
        CoderPktTime.options.add(new Option(" ",255));
      }

      return true;
    }

    $rootScope.MediaStreamFormCheck = function()
    {
      if(!is_number(document.getElementById("MediaStreamCfg").RtpPort.value,1024,65535))
      {
        alert("'RTP起始端口'范围为1024-65535!");
        $rootScope.href_click('MediaStream');
        $rootScope.getSelect('RtpPort',2,'form');
        return false;
      }

      if(!is_number(document.getElementById("MediaStreamCfg").Payload2833.value,0,200))
      {
        alert("'RFC2833 Payload Type'范围为0-200!");
        $rootScope.href_click('MediaStream');
        $rootScope.getSelect('Payload2833',2,'form');
        return false;
      }

      if(!is_number(document.getElementById("MediaStreamCfg").DTMFSendInterval.value,10,2000))
      {
        alert("'DTMF送号间隔'范围为10-2000!");
        $rootScope.href_click('MediaStream');
        $rootScope.getSelect('DTMFSendInterval',2,'form');
        return false;
      }

      if (gFxsPortNum > 0 && $("#SendFlashEvent").prop('checked'))
      {
        if ("1" == document.getElementById("DTMFMethod").value)
        {
          if (document.getElementById("MediaStreamCfg").FlashContentType.value.length > 31)
          {
            alert("'Content-Type' 长度必须小于32!");
            $rootScope.href_click('MediaStream');
            $rootScope.getSelect('FlashContentType',2,'form');
            return false;
          }

          if (document.getElementById("MediaStreamCfg").FlashBody.value.length > 31)
          {
            alert("'Body' 长度必须小于32!");
            $rootScope.href_click('MediaStream');
            $rootScope.getSelect('FlashBody',2,'form');
            return false;
          }

          if (document.getElementById("MediaStreamCfg").FlashContentLength.value
            != document.getElementById("MediaStreamCfg").FlashBody.value.length + 2)
          {
            alert("'Content-Length' 长度错误!");
            $rootScope.href_click('MediaStream');
            $rootScope.getSelect('FlashContentLength',2,'form');
            return false;
          }
        }
        else if ("2" == document.getElementById("DTMFMethod").value)
        {
          if(!is_number(document.getElementById("MediaStreamCfg").FlashRTPEvent.value,16,65535))
          {
            alert("'拍叉事件值' 范围为 16-65535!");
            $rootScope.href_click('MediaStream');
            $rootScope.getSelect('FlashRTPEvent',2,'form');
            return false;
          }
        }
      }
      return true;
    }
  }])

  .controller('SipParamCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var gOSType;
    var SipEncrpt = '0';

    MM_callJS(16,'Linux','Admin');

    function MM_callJS(FxsPortNum, OSType,user)
    {
      FxsPortNum = parseInt(FxsPortNum);
      gOSType = OSType;
      mouse_click();
    }

    $scope.mouse_click = function()
    {
      if (document.getElementById("MWIEnable").checked)
      {
        document.getElementById('SipCfg').MWIExpires.disabled = false;
        document.getElementById('SipCfg').VMUserID.disabled = false;
        document.getElementById('SipCfg').VisualMWIType.disabled = false;
      }
      else
      {
        document.getElementById('SipCfg').MWIExpires.disabled = true;
        document.getElementById('SipCfg').VMUserID.disabled = true;
        document.getElementById('SipCfg').VisualMWIType.disabled = true;
      }

      if (document.getElementById("SessionTimer").checked)
      {
        document.getElementById('SipCfg').SessionInterval.disabled = false;
        document.getElementById('SipCfg').SessionMinTimer.disabled = false;
      }
      else
      {
        document.getElementById('SipCfg').SessionInterval.disabled = true;
        document.getElementById('SipCfg').SessionMinTimer.disabled = true;
      }

      if (document.getElementById("EarlyMedia").checked)
      {
        /* PRACK set to enable */
        document.getElementById('SipCfg').rel100Enable.checked = true;
        document.getElementById('SipCfg').rel100Enable.disabled = true;

        document.getElementById('SipCfg').rel100Only183.disabled = false;
        document.getElementById('SipCfg').EarlyAnswer.disabled = false;
      }
      else
      {
        document.getElementById('SipCfg').rel100Enable.disabled = false;

        /* PRACK 183 & Early Answer set to disable */
        document.getElementById('SipCfg').rel100Only183.checked = false;
        document.getElementById('SipCfg').rel100Only183.disabled = true;
        document.getElementById('SipCfg').EarlyAnswer.checked = false;
        document.getElementById('SipCfg').EarlyAnswer.disabled = true;
      }

      if (document.getElementById("UseDialKey").checked)
      {
        document.getElementById('SipCfg').SharpKeyEscape.disabled = true;
        document.getElementById('SipCfg').SharpKeyEscape.checked = false;
      }
      else
      {
        document.getElementById('SipCfg').SharpKeyEscape.disabled = false;
      }
      if (1 == SipEncrpt)
      {
        document.getElementById('SipCfg').SendAnonymousEnable.disabled = true;
        document.getElementById('SipCfg').SendAnonymousEnable.checked = false;
      }
    }

    function mouse_click(){
      if (document.getElementById("MWIEnable").checked)
      {
        document.getElementById('SipCfg').MWIExpires.disabled = false;
        document.getElementById('SipCfg').VMUserID.disabled = false;
        document.getElementById('SipCfg').VisualMWIType.disabled = false;
      }
      else
      {
        document.getElementById('SipCfg').MWIExpires.disabled = true;
        document.getElementById('SipCfg').VMUserID.disabled = true;
        document.getElementById('SipCfg').VisualMWIType.disabled = true;
      }

      if (document.getElementById("SessionTimer").checked)
      {
        document.getElementById('SipCfg').SessionInterval.disabled = false;
        document.getElementById('SipCfg').SessionMinTimer.disabled = false;
      }
      else
      {
        document.getElementById('SipCfg').SessionInterval.disabled = true;
        document.getElementById('SipCfg').SessionMinTimer.disabled = true;
      }

      if (document.getElementById("EarlyMedia").checked)
      {
        /* PRACK set to enable */
        document.getElementById('SipCfg').rel100Enable.checked = true;
        document.getElementById('SipCfg').rel100Enable.disabled = true;

        document.getElementById('SipCfg').rel100Only183.disabled = false;
        document.getElementById('SipCfg').EarlyAnswer.disabled = false;
      }
      else
      {
        document.getElementById('SipCfg').rel100Enable.disabled = false;

        /* PRACK 183 & Early Answer set to disable */
        document.getElementById('SipCfg').rel100Only183.checked = false;
        document.getElementById('SipCfg').rel100Only183.disabled = true;
        document.getElementById('SipCfg').EarlyAnswer.checked = false;
        document.getElementById('SipCfg').EarlyAnswer.disabled = true;
      }

      if (document.getElementById("UseDialKey").checked)
      {
        document.getElementById('SipCfg').SharpKeyEscape.disabled = true;
        document.getElementById('SipCfg').SharpKeyEscape.checked = false;
      }
      else
      {
        document.getElementById('SipCfg').SharpKeyEscape.disabled = false;
      }
      if (1 == SipEncrpt)
      {
        document.getElementById('SipCfg').SendAnonymousEnable.disabled = true;
        document.getElementById('SipCfg').SendAnonymousEnable.checked = false;
      }
    }

    $rootScope.SipParamFormCheck = function()
    {
      if (document.getElementById('SipCfg').MWIEnable.checked)
      {
        if (!is_number(document.getElementById('SipCfg').MWIExpires.value,60,7200))
        {
          alert("'MWI订阅时长'范围为60-7200!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('MWIExpires',3,'form');
          return false;
        }

        if (0 == document.getElementById('SipCfg').VMUserID.value.length
          || document.getElementById('SipCfg').VMUserID.value.length > 31)
        {
          alert("'语音邮箱账户'长度必须小于128!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('VMUserID',3,'form');
          return false;
        }
      }

      if(!is_number(document.getElementById('SipCfg').SipKeepAliveInterval.value,1,3600))
      {
        alert("'心跳间隔'范围为1-3600!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('SipKeepAliveInterval',3,'form');
        return false;
      }

      if(!is_number(document.getElementById('SipCfg').DNSRefInterval.value,0,60000))
      {
        alert("'域名重新解析的间隔'范围为0-60000!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('DNSRefInterval',3,'form');
        return false;
      }

      if (document.getElementById("SessionTimer").checked)
      {
        if (!is_number(document.getElementById('SipCfg').SessionInterval.value, 90, 65535))
        {
          alert("'会话刷新间隔'范围为90-65535(缺省: 1800秒)!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('SessionInterval',3,'form');
          return false;
        }

        if (!is_number(document.getElementById('SipCfg').SessionMinTimer.value, 90, 65535))
        {
          alert("'会话刷新最小间隔'范围为90-65535(缺省: 1800秒)!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('SessionMinTimer',3,'form');
          return false;
        }

        if (parseInt(document.getElementById('SipCfg').SessionInterval.value) < parseInt(document.getElementById('SipCfg').SessionMinTimer.value))
        {
          alert("'会话刷新间隔'不能小于'会话刷新最小间隔'!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('SessionInterval',3,'form');
          return false;
        }
      }

      if (parseInt(document.getElementById('SipCfg').T1Time.value)<=0
        || document.getElementById('SipCfg').T1Time.value.length == 0)
      {
        alert("'T1'必须大于0!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('T1Time',3,'form');
        return false;
      }
      if (parseInt(document.getElementById('SipCfg').T2Time.value)<=0
        || document.getElementById('SipCfg').T2Time.value.length == 0)
      {
        alert("'T2'必须大于0!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('T2Time',3,'form');
        return false;
      }
      if (parseInt(document.getElementById('SipCfg').T4Time.value)<=0
        || document.getElementById('SipCfg').T4Time.value.length == 0)
      {
        alert("'T4'必须大于0!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('T4Time',3,'form');
        return false;
      }
      if (parseInt(document.getElementById('SipCfg').TMaxTime.value)<=0
        || document.getElementById('SipCfg').TMaxTime.value.length == 0)
      {
        alert("'最大超时时长'必须大于0!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('TMaxTime',3,'form');
        return false;
      }

      var T1 = parseInt(document.getElementById('SipCfg').T1Time.value);
      if (!is_number(document.getElementById('SipCfg').HeartbeatTimeout.value, 4, 64*T1/1000 - 1))
      {
        alert("'心跳超时'范围为4-64*T1/1000!");
        $rootScope.href_click('SipParam');
        $rootScope.getSelect('HeartbeatTimeout',3,'form');
        return false;
      }

      var i, ResponseCodeVal, ResponseCodeMappedVal;
      for(i=0;i<4;i++)
      {
        ResponseCodeVal = eval("document.forms[3].SipResponseCode"+i+".value");
        ResponseCodeMappedVal = eval("document.forms[3].SipResponseCodeMapped"+i+".value");

        if(ResponseCodeVal.length!=0 && !is_number(ResponseCodeVal,100,999))
        {
          alert("'响应码'范围为100-999!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('SipResponseCode' + i,3,'form');
          return false;
        }
        if(ResponseCodeVal.length!=0 && !is_number(ResponseCodeMappedVal,100,999))
        {
          alert("'变换后的响应码'范围为100-999!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('SipResponseCodeMapped'+i,3,'form');
          return false;
        }
        if(ResponseCodeMappedVal.length!=0 && !is_number(ResponseCodeVal,100,999))
        {
          alert("'响应码'范围为100-999!");
          $rootScope.href_click('SipParam');
          $rootScope.getSelect('SipResponseCode'+i,3,'form');
          return false;
        }
      }
      return true;
    }
  }])

  .controller('FaxCfgCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    $scope.mouse_click = function (){
      if ("0" == document.getElementById('FaxMode').value)		//T.38
      {
        document.getElementById("idXFax").style.display = "none";
        document.getElementById("idFax").style.display = "none";
        document.getElementById("idXModem").style.display = "none";
        document.getElementById("idModem").style.display = "none";
        document.getElementById("idVBD").style.display = "none";
        document.getElementById("idSilenceSupp").style.display = "none";

        document.getElementById("idECM").style.display = "";
        document.getElementById("idRate").style.display = "";
      }
      else if ("4" == document.getElementById('FaxMode').value)//VBD
      {
        document.getElementById("idXFax").style.display = "";
        document.getElementById("idFax").style.display = "";
        document.getElementById("idXModem").style.display = "";
        document.getElementById("idModem").style.display = "";
        document.getElementById("idVBD").style.display = "";
        document.getElementById("idSilenceSupp").style.display = "";

        document.getElementById("idECM").style.display = "none";
        document.getElementById("idRate").style.display = "none";
      }
      else//Adaptive
      {
        document.getElementById("idXFax").style.display = "";
        document.getElementById("idFax").style.display = "";
        document.getElementById("idXModem").style.display = "";
        document.getElementById("idModem").style.display = "";
        document.getElementById("idVBD").style.display = "";
        document.getElementById("idSilenceSupp").style.display = "";

        document.getElementById("idECM").style.display = "";
        document.getElementById("idRate").style.display = "";
      }

      if ("0" == document.getElementById('FaxToneDetectionMode').value)	//local
      {
        document.getElementById("CNGDetectFlag").disabled = false;
      }
      else //remote
      {
        document.getElementById("CNGDetectFlag").disabled = true;
      }
    }

    $rootScope.FaxCfgFormCheck = function()
    {
      return true;
    }

    MM_callJS('Admin');
    function MM_callJS(user){
      $scope.mouse_click();
    }
  }])

  .controller('DigitMapCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var g_OSType = "Linux";
    MM_callJS();
    function MM_callJS(){}

    $rootScope.DigitMapFormCheck = function()
    {
      if (g_OSType == "Linux")
      {
        if (document.getElementById('DigitMapCfg').DigitMap.value.length == 0
          || document.getElementById('DigitMapCfg').DigitMap.value.length >= 5*1024)
        {
          alert("'拨号规则'总长度不能超过5120！");
          $rootScope.href_click('DigitMap');
          $rootScope.getSelect('DigitMap',5,'form');
          return false;
        }
      }else
      {
        if (document.getElementById('DigitMapCfg').DigitMap.value.length == 0
          || document.getElementById('DigitMapCfg').DigitMap.value.length >= 184)
        {
          alert("'拨号规则'总长度不能超过184！");
          $rootScope.href_click('DigitMap');
          $rootScope.getSelect('DigitMap',5,'form');
          return false;
        }
      }
      return true;
    }
  }])

  .controller('FeatureCodesCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var oPortNum;
    var sPortNum;

    MM_callJS('', '', '0', '16', 'Linux', 'yes','Admin');
    function MM_callJS(ePhoneVSFC, hintDisplayFC, FxoPortNum, FxsPortNum, OSType, ComplexCfgFlag,user)
    {
      oPortNum = parseInt(FxoPortNum);
      sPortNum = parseInt(FxsPortNum);

      if (oPortNum > 0)
      {
        document.getElementById("idFCFXOConfigEnable").style.display = "";
      }
      else
      {
        document.getElementById("idFCFXOConfigEnable").style.display = "none";
      }

      if (ComplexCfgFlag == "yes")
      {
        document.getElementById("idFCQueryIPAddress").style.display = "";
        document.getElementById("idFCNetworkWorkingMode").style.display = "";
      }
      else
      {
        document.getElementById("idFCQueryIPAddressItem").innerHTML = "查询IP地址";
      }

      setTimeout(function(){
        mouse_click();
      },1500)
    }

    $rootScope.FeatureCodesFormCheck = function()
    {
      var pattern1 = /^\*\d{1,5}\#$/;
      var pattern2 = /^\*\d{1,5}\*$/;
      var pattern3 = /^\*\d{0,2}\#$/;

      if ( document.getElementById("QueryIPAddressFCEnable").value == 0 && !pattern1.test(document.getElementById("FCQueryIPAddress").value))
      {
        if( document.getElementById("DefQueryIPAddressEnable").checked != true)
        {
          window.alert("'查询LAN口IP地址'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCQueryIPAddress',0,'id');
          return false;
        }
      }

      if ( document.getElementById("QueryWANIPAddressFCEnable").value == 0 && !pattern1.test(document.getElementById("FCQueryWANIPAddress").value))
      {
        if( document.getElementById("DefQueryWANIPAddressEnable").checked != true)
        {
          window.alert("'查询WAN口IP地址'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCQueryWANIPAddress',0,'id');
          return false;
        }
      }

      if ( document.getElementById("QueryAccountFCEnable").value == 0 && !pattern1.test(document.getElementById("FCQueryAccount").value))
      {
        if( document.getElementById("DefQueryAccountEnable").checked != true)
        {
          window.alert("'查询电话号码'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCQueryAccount',0,'id');
          return false;
        }
      }


      if ( document.getElementById("QueryPortGroupFCEnable").value == 0 && !pattern1.test(document.getElementById("FCQueryPortGroup").value))
      {
        if( document.getElementById("DefQueryPortGroupEnable").checked != true)
        {
          window.alert("'设置获取端口组号码方式'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCQueryPortGroup',0,'id');
          return false;
        }
      }

      if ( document.getElementById("NetworkConnModeFCEnable").value == 0 && !pattern2.test(document.getElementById("FCNetworkConnMode").value))
      {
        if( document.getElementById("DefNetworkConnModeEnable").checked != true)
        {
          window.alert("'设置获取IP方式'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCNetworkConnMode',0,'id');
          return false;
        }
      }

      if ( document.getElementById("NetworkWorkModeFCEnable").value == 0 && !pattern2.test(document.getElementById("FCNetworkWorkingMode").value))
      {
        if( document.getElementById("DefNetworkWorkModeEnable").checked != true)
        {
          window.alert("'设置网络模式'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCNetworkWorkingMode',0,'id');
          return false;
        }
      }

      if ( document.getElementById("IPAddressConfigFCEnable").value == 0 && !pattern2.test(document.getElementById("FCIPAddressConfig").value))
      {
        if( document.getElementById("DefIPAddressConfigEnable").checked != true)
        {
          window.alert("'设置IP地址'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCIPAddressConfig',0,'id');
          return false;
        }
      }
      if ( document.getElementById("SubnetMaskConfigFCEnable").value == 0 && !pattern2.test(document.getElementById("FCSubnetMaskConfig").value))
      {
        if( document.getElementById("DefSubnetMaskConfigEnable").checked != true)
        {
          window.alert("'设置子网掩码'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCSubnetMaskConfig',0,'id');
          return false;
        }
      }
      if ( document.getElementById("GatewayConfigFCEnable").value == 0 && !pattern2.test(document.getElementById("FCGatewayConfig").value))
      {
        if( document.getElementById("DefGatewayConfigEnable").checked != true)
        {
          window.alert("'设置网关'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCGatewayConfig',0,'id');
          return false;
        }
      }
      if ( document.getElementById("RenewDHCPFCEnable").value == 0 && !pattern1.test(document.getElementById("FCRenewDHCP").value))
      {
        if( document.getElementById("DefRenewDHCPEnable").checked != true)
        {
          window.alert("'再次通过DHCP获取IP地址'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCRenewDHCP',0,'id');
          return false;
        }
      }
      if (oPortNum > 0
        && document.getElementById("FXOConfigEnableFCEnable").value == 0
        && !pattern2.test(document.getElementById("FCFXOConfigEnable").value))
      {
        if( document.getElementById("DefFXOConfigEnable").checked != true)
        {
          window.alert("'打开FXO配置开关'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCFXOConfigEnable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("RMEnableFCEnable").value == 0 && !pattern2.test(document.getElementById("FCRemoteManagementEnable").value))
      {
        if( document.getElementById("DefRMEnable").checked != true)
        {
          window.alert("'打开WAN口访问WEB开关'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCRemoteManagementEnable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("BasicResetFCEnable").value == 0 && !pattern2.test(document.getElementById("FCBasicReset").value))
      {
        if( document.getElementById("DefBasicResetEnable").checked != true)
        {
          window.alert("'基本配置恢复出厂值'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCBasicReset',0,'id');
          return false;
        }
      }
      if ( document.getElementById("FactoryResetFCEnable").value == 0 && !pattern2.test(document.getElementById("FCFactoryReset").value))
      {
        if( document.getElementById("DefFactoryResetEnable").checked != true)
        {
          window.alert("'恢复出厂设置'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCFactoryReset',0,'id');
          return false;
        }
      }
      if ( document.getElementById("ResetDeviceFCEnable").value == 0 && !pattern1.test(document.getElementById("FCResetDevice").value))
      {
        if( document.getElementById("DefResetDeviceEnable").checked != true)
        {
          window.alert("'重启设备'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCResetDevice',0,'id');
          return false;
        }
      }

      if ( document.getElementById("CallHoldFCEnable").value == 0 && !pattern3.test(document.getElementById("FCCallHold").value))
      {
        if( document.getElementById("DefCallHoldEnable").checked != true)
        {
          window.alert("'呼叫保持'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCCallHold',0,'id');
          return false;
        }
      }

      if ( document.getElementById("IPCallFCEnable").value == 0 && !pattern2.test(document.getElementById("FCIPCall").value))
      {
        if( document.getElementById("DefIPCallEnable").checked != true)
        {
          window.alert("'直接IP地址呼叫'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCIPCall',0,'id');
          return false;
        }
      }
      if ( document.getElementById("CWActiveFCEnable").value == 0 && !pattern1.test(document.getElementById("FCCWActive").value))
      {
        if( document.getElementById("DefCWActiveEnable").checked != true)
        {
          window.alert("'启用呼叫等待'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCCWActive',0,'id');
          return false;
        }
      }
      if ( document.getElementById("CWDeactiveFCEnable").value == 0 && !pattern1.test(document.getElementById("FCCWDeactive").value))
      {
        if( document.getElementById("DefCWDeactiveEnable").checked != true)
        {
          window.alert("'禁用呼叫等待 '功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCCWDeactive',0,'id');
          return false;
        }
      }
      if ( document.getElementById("CallForwardingFCEnable").value == 0 && !pattern2.test(document.getElementById("FCCallForwarding").value))
      {
        if( document.getElementById("DefCallForwardingEnable").checked != true)
        {
          window.alert("'盲转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCCallForwarding',0,'id');
          return false;
        }
      }
      if ( document.getElementById("UCFEnableFCEnable").value == 0 && !pattern2.test(document.getElementById("FCUCFEnable").value))
      {
        if( document.getElementById("DefUCFEnable").checked != true)
        {
          window.alert("'启用无条件呼转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCUCFEnable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("UCFDisableFCEnable").value == 0 && !pattern1.test(document.getElementById("FCUCFDisable").value))
      {
        if( document.getElementById("DefUCFDisable").checked != true)
        {
          window.alert("'禁用无条件呼转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCUCFDisable',0,'id');
          return false
        }
      }
      if ( document.getElementById("BCFEnableFCEnable").value == 0 && !pattern2.test(document.getElementById("FCBCFEnable").value))
      {
        if( document.getElementById("DefBCFEnable").checked != true)
        {
          window.alert("'启用遇忙呼转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCBCFEnable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("BCFDisableFCEnable").value == 0 && !pattern1.test(document.getElementById("FCBCFDisable").value))
      {
        if( document.getElementById("DefBCFDisable").checked != true)
        {
          window.alert("'禁用遇忙呼转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCBCFDisable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("NACFEnableFCEnable").value == 0 && !pattern2.test(document.getElementById("FCNACFEnable").value))
      {
        if( document.getElementById("DefNACFEnable").checked != true)
        {
          window.alert("'启用无应答呼转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCNACFEnable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("NACFDisableFCEnable").value == 0 && !pattern1.test(document.getElementById("FCNACFDisable").value))
      {
        if( document.getElementById("DefNACFDisable").checked != true)
        {
          window.alert("'禁用无应答呼转'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCNACFDisable',0,'id');
          return false;
        }
      }
      if ( document.getElementById("DNDActiveFCEnable").value == 0 && !pattern1.test(document.getElementById("FCDNDActive").value))
      {
        if( document.getElementById("DefDNDActiveEnable").checked != true)
        {
          window.alert("'启用免打扰'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCDNDActive',0,'id');
          return false;
        }
      }
      if ( document.getElementById("DNDDeactiveFCEnable").value == 0 && !pattern1.test(document.getElementById("FCDNDDeactive").value))
      {
        if( document.getElementById("DefDNDDeactiveEnable").checked != true)
        {
          window.alert("'禁用免打扰'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCDNDDeactive',0,'id');
          return false;
        }
      }
      if ( document.getElementById("DialVoicemailFCEnable").value == 0 && !pattern1.test(document.getElementById("FCDialVoicemail").value))
      {
        if( document.getElementById("DefDialVoicemailEnable").checked != true)
        {
          window.alert("'访问语音邮箱'功能键错误!");
          $rootScope.href_click('FeatureCodes');
          $rootScope.getFocus('FCDialVoicemail',0,'id');
          return false;
        }
      }

      return true;
    }

    function mouse_click()
    {
      hide_all();
      var DefQueryIPAddressEnable = document.getElementById("DefQueryIPAddressEnable");
      var FCQueryIPAddress = document.getElementById("FCQueryIPAddress");
      if ( "0" == document.getElementById("QueryIPAddressFCEnable").value)
      {
        DefQueryIPAddressEnable.disabled=false;
        if( DefQueryIPAddressEnable.checked)
        {
          FCQueryIPAddress.value="*158#";
          FCQueryIPAddress.disabled=true;
        }
        else
        {
          FCQueryIPAddress.disabled=false;
        }
      }
      else
      {
        DefQueryIPAddressEnable.checked = false;
        DefQueryIPAddressEnable.disabled=true;
        FCQueryIPAddress.value="";
        FCQueryIPAddress.disabled=true;
      }

      var DefQueryWANIPAddressEnable = document.getElementById("DefQueryWANIPAddressEnable");
      var FCQueryWANIPAddress = document.getElementById("FCQueryWANIPAddress");
      if ( "0" == document.getElementById("QueryWANIPAddressFCEnable").value)
      {
        DefQueryWANIPAddressEnable.disabled=false;
        if( DefQueryWANIPAddressEnable.checked)
        {
          FCQueryWANIPAddress.value="*159#";
          FCQueryWANIPAddress.disabled=true;
        }
        else
        {
          FCQueryWANIPAddress.disabled=false;
        }
      }
      else
      {
        DefQueryWANIPAddressEnable.checked = false;
        DefQueryWANIPAddressEnable.disabled=true;
        FCQueryWANIPAddress.value="";
        FCQueryWANIPAddress.disabled=true;
      }

      var DefQueryAccountEnable = document.getElementById("DefQueryAccountEnable");
      var FCQueryAccount = document.getElementById("FCQueryAccount");
      if ( "0" == document.getElementById("QueryAccountFCEnable").value)
      {
        DefQueryAccountEnable.disabled=false;
        if( DefQueryAccountEnable.checked)
        {
          FCQueryAccount.value="*114#";
          FCQueryAccount.disabled=true;
        }
        else
        {
          FCQueryAccount.disabled=false;
        }
      }
      else
      {
        DefQueryAccountEnable.checked = false;
        DefQueryAccountEnable.disabled=true;
        FCQueryAccount.value="";
        FCQueryAccount.disabled=true;
      }

      var DefQueryPortGroupEnable = document.getElementById("DefQueryPortGroupEnable");
      var FCQueryPortGroup = document.getElementById("FCQueryPortGroup");
      if ( "0" == document.getElementById("QueryPortGroupFCEnable").value)
      {
        DefQueryPortGroupEnable.disabled=false;
        if( DefQueryPortGroupEnable.checked)
        {
          FCQueryPortGroup.value ="*115#";
          FCQueryPortGroup.disabled=true;
        }
        else
        {
          FCQueryPortGroup.disabled=false;
        }
      }
      else
      {
        DefQueryPortGroupEnable.checked = false;
        DefQueryPortGroupEnable.disabled=true;
        FCQueryPortGroup.value="";
        FCQueryPortGroup.disabled=true;
      }


      var DefNetworkConnModeEnable = document.getElementById("DefNetworkConnModeEnable");
      var FCNetworkConnMode = document.getElementById("FCNetworkConnMode");
      if ( "0" == document.getElementById("NetworkConnModeFCEnable").value)
      {
        DefNetworkConnModeEnable.disabled=false;
        if( DefNetworkConnModeEnable.checked)
        {
          FCNetworkConnMode.value="*150*";
          FCNetworkConnMode.disabled=true;
        }
        else
        {
          FCNetworkConnMode.disabled=false;
        }
      }
      else
      {
        DefNetworkConnModeEnable.checked = false;
        DefNetworkConnModeEnable.disabled=true;
        FCNetworkConnMode.value="";
        FCNetworkConnMode.disabled=true;
      }

      var DefNetworkWorkModeEnable = document.getElementById("DefNetworkWorkModeEnable");
      var FCNetworkWorkingMode = document.getElementById("FCNetworkWorkingMode");
      if ( "0" == document.getElementById("NetworkWorkModeFCEnable").value)
      {
        DefNetworkWorkModeEnable.disabled=false;
        if( DefNetworkWorkModeEnable.checked)
        {
          FCNetworkWorkingMode.value="*157*";
          FCNetworkWorkingMode.disabled=true;
        }
        else
        {
          FCNetworkWorkingMode.disabled=false;
        }
      }
      else
      {
        DefNetworkWorkModeEnable.checked = false;
        DefNetworkWorkModeEnable.disabled=true;
        FCNetworkWorkingMode.value="";
        FCNetworkWorkingMode.disabled=true;
      }

      var DefIPAddressConfigEnable = document.getElementById("DefIPAddressConfigEnable");
      var FCIPAddressConfig = document.getElementById("FCIPAddressConfig");
      if ( "0" == document.getElementById("IPAddressConfigFCEnable").value)
      {
        DefIPAddressConfigEnable.disabled=false;
        if( DefIPAddressConfigEnable.checked)
        {
          FCIPAddressConfig.value="*152*";
          FCIPAddressConfig.disabled=true;
        }
        else
        {
          FCIPAddressConfig.disabled=false;
        }
      }
      else
      {
        DefIPAddressConfigEnable.checked = false;
        DefIPAddressConfigEnable.disabled=true;
        FCIPAddressConfig.value="";
        FCIPAddressConfig.disabled=true;
      }

      var DefSubnetMaskConfigEnable = document.getElementById("DefSubnetMaskConfigEnable");
      var FCSubnetMaskConfig = document.getElementById("FCSubnetMaskConfig");
      if ( "0" == document.getElementById("SubnetMaskConfigFCEnable").value)
      {
        DefSubnetMaskConfigEnable.disabled=false;
        if( DefSubnetMaskConfigEnable.checked)
        {
          FCSubnetMaskConfig.value="*153*";
          FCSubnetMaskConfig.disabled=true;
        }
        else
        {
          FCSubnetMaskConfig.disabled=false;
        }
      }
      else
      {
        DefSubnetMaskConfigEnable.checked = false;
        DefSubnetMaskConfigEnable.disabled=true;
        FCSubnetMaskConfig.value="";
        FCSubnetMaskConfig.disabled=true;
      }

      var DefGatewayConfigEnable = document.getElementById("DefGatewayConfigEnable");
      var FCGatewayConfig = document.getElementById("FCGatewayConfig");
      if ( "0" == document.getElementById("GatewayConfigFCEnable").value)
      {
        DefGatewayConfigEnable.disabled=false;
        if( DefGatewayConfigEnable.checked)
        {
          FCGatewayConfig.value="*156*";
          FCGatewayConfig.disabled=true;
        }
        else
        {
          FCGatewayConfig.disabled=false;
        }
      }
      else
      {
        DefGatewayConfigEnable.checked = false;
        DefGatewayConfigEnable.disabled=true;
        FCGatewayConfig.value="";
        FCGatewayConfig.disabled=true;
      }

      var DefRenewDHCPEnable = document.getElementById("DefRenewDHCPEnable");
      var FCRenewDHCP = document.getElementById("FCRenewDHCP");
      if ( "0" == document.getElementById("RenewDHCPFCEnable").value)
      {
        DefRenewDHCPEnable.disabled=false;
        if( DefRenewDHCPEnable.checked)
        {
          FCRenewDHCP.value="*193#";
          FCRenewDHCP.disabled=true;
        }
        else
        {
          FCRenewDHCP.disabled=false;
        }
      }
      else
      {
        DefRenewDHCPEnable.checked = false;
        DefRenewDHCPEnable.disabled=true;
        FCRenewDHCP.value="";
        FCRenewDHCP.disabled=true;
      }

      var DefPortVoiceUpEnable = document.getElementById("DefPortVoiceUpEnable");
      var FCPortVoiceUp = document.getElementById("FCPortVoiceUp");
      if ( "0" == document.getElementById("PortVoiceUpFCEnable").value)
      {
        DefPortVoiceUpEnable.disabled=false;
        if( DefPortVoiceUpEnable.checked)
        {
          FCPortVoiceUp.value="*170#";
          FCPortVoiceUp.disabled=true;
        }
        else
        {
          FCPortVoiceUp.disabled=false;
        }
      }
      else
      {
        DefPortVoiceUpEnable.checked = false;
        DefPortVoiceUpEnable.disabled=true;
        FCPortVoiceUp.value="";
        FCPortVoiceUp.disabled=true;
      }

      var DefPortVoiceDownEnable = document.getElementById("DefPortVoiceDownEnable");
      var FCPortVoiceDown = document.getElementById("FCPortVoiceDown");
      if ( "0" == document.getElementById("PortVoiceDownFCEnable").value)
      {
        DefPortVoiceDownEnable.disabled=false;
        if( DefPortVoiceDownEnable.checked)
        {
          FCPortVoiceDown.value="*171#";
          FCPortVoiceDown.disabled=true;
        }
        else
        {
          FCPortVoiceDown.disabled=false;
        }
      }
      else
      {
        DefPortVoiceDownEnable.checked = false;
        DefPortVoiceDownEnable.disabled=true;
        FCPortVoiceDown.value="";
        FCPortVoiceDown.disabled=true;
      }

      var DefFXOConfigEnable = document.getElementById("DefFXOConfigEnable");
      var FCFXOConfigEnable = document.getElementById("FCFXOConfigEnable");
      if (oPortNum > 0 )
      {
        if ( "0" == document.getElementById("FXOConfigEnableFCEnable").value)
        {
          DefFXOConfigEnable.disabled=false;
          if( DefFXOConfigEnable.checked)
          {
            FCFXOConfigEnable.value="*149*";
            FCFXOConfigEnable.disabled=true;
          }
          else
          {
            FCFXOConfigEnable.disabled=false;
          }
        }
        else
        {
          DefFXOConfigEnable.checked = false;
          DefFXOConfigEnable.disabled=true;
          FCFXOConfigEnable.value="";
          FCFXOConfigEnable.disabled=true;
        }
      }
      else
      {
        DefFXOConfigEnable.checked = false;
        DefFXOConfigEnable.disabled=true;
        FCFXOConfigEnable.value="";
        FCFXOConfigEnable.disabled=true;
      }

      var DefRMEnable = document.getElementById("DefRMEnable");
      var FCRemoteManagementEnable = document.getElementById("FCRemoteManagementEnable");
      if ( "0" == document.getElementById("RMEnableFCEnable").value)
      {
        DefRMEnable.disabled=false;
        if( DefRMEnable.checked)
        {
          FCRemoteManagementEnable.value="*160*";
          FCRemoteManagementEnable.disabled=true;
        }
        else
        {
          FCRemoteManagementEnable.disabled=false;
        }
      }
      else
      {
        DefRMEnable.checked = false;
        DefRMEnable.disabled=true;
        FCRemoteManagementEnable.value="";
        FCRemoteManagementEnable.disabled=true;
      }

      var DefBasicResetEnable = document.getElementById("DefBasicResetEnable");
      var FCBasicReset = document.getElementById("FCBasicReset");
      if ( "0" == document.getElementById("BasicResetFCEnable").value)
      {
        DefBasicResetEnable.disabled=false;
        if( DefBasicResetEnable.checked)
        {
          FCBasicReset.value="*165*";
          FCBasicReset.disabled=true;
        }
        else
        {
          FCBasicReset.disabled=false;
        }
      }
      else
      {
        DefBasicResetEnable.checked = false;
        DefBasicResetEnable.disabled=true;
        FCBasicReset.value="";
        FCBasicReset.disabled=true;
      }

      var DefFactoryResetEnable = document.getElementById("DefFactoryResetEnable");
      var FCFactoryReset = document.getElementById("FCFactoryReset");
      if ( "0" == document.getElementById("FactoryResetFCEnable").value)
      {
        DefFactoryResetEnable.disabled=false;
        if( DefFactoryResetEnable.checked)
        {
          FCFactoryReset.value="*166*";
          FCFactoryReset.disabled=true;
        }
        else
        {
          FCFactoryReset.disabled=false;
        }
      }
      else
      {
        DefFactoryResetEnable.checked = false;
        DefFactoryResetEnable.disabled=true;
        FCFactoryReset.value="";
        FCFactoryReset.disabled=true;
      }

      var DefResetDeviceEnable = document.getElementById("DefResetDeviceEnable");
      var FCResetDevice = document.getElementById("FCResetDevice");
      if ( "0" == document.getElementById("ResetDeviceFCEnable").value)
      {
        DefResetDeviceEnable.disabled=false;
        if( DefResetDeviceEnable.checked)
        {
          FCResetDevice.value="*111#";
          FCResetDevice.disabled=true;
        }
        else
        {
          FCResetDevice.disabled=false;
        }
      }
      else
      {
        DefResetDeviceEnable.checked = false;
        DefResetDeviceEnable.disabled=true;
        FCResetDevice.value="";
        FCResetDevice.disabled=true;
      }

      var DefCallHoldEnable = document.getElementById("DefCallHoldEnable");
      var FCCallHold = document.getElementById("FCCallHold");
      if ( "0" == document.getElementById("CallHoldFCEnable").value)
      {
        DefCallHoldEnable.disabled=false;
        if( DefCallHoldEnable.checked)
        {
          FCCallHold.value="*#";
          FCCallHold.disabled=true;
        }
        else
        {
          FCCallHold.disabled=false;
        }
      }
      else
      {
        DefCallHoldEnable.checked = false;
        DefCallHoldEnable.disabled=true;
        FCCallHold.value="";
        FCCallHold.disabled=true;
      }

      var DefIPCallEnable = document.getElementById("DefIPCallEnable");
      var FCIPCall = document.getElementById("FCIPCall");
      if ( "0" == document.getElementById("IPCallFCEnable").value)
      {
        DefIPCallEnable.disabled=false;
        if( DefIPCallEnable.checked)
        {
          FCIPCall.value="*47*";
          FCIPCall.disabled=true;
        }
        else
        {
          FCIPCall.disabled=false;
        }
      }
      else
      {
        DefIPCallEnable.checked = false;
        DefIPCallEnable.disabled=true;
        FCIPCall.value="";
        FCIPCall.disabled=true;
      }

      var DefCWActiveEnable = document.getElementById("DefCWActiveEnable");
      var FCCWActive = document.getElementById("FCCWActive");
      if ( "0" == document.getElementById("CWActiveFCEnable").value)
      {
        DefCWActiveEnable.disabled=false;
        if( DefCWActiveEnable.checked)
        {
          FCCWActive.value="*51#";
          FCCWActive.disabled=true;
        }
        else
        {
          FCCWActive.disabled=false;
        }
      }
      else
      {
        DefCWActiveEnable.checked = false;
        DefCWActiveEnable.disabled=true;
        FCCWActive.value="";
        FCCWActive.disabled=true;
      }

      var DefCWDeactiveEnable = document.getElementById("DefCWDeactiveEnable");
      var FCCWDeactive = document.getElementById("FCCWDeactive");
      if ( "0" == document.getElementById("CWDeactiveFCEnable").value)
      {
        DefCWDeactiveEnable.disabled=false;
        if( DefCWDeactiveEnable.checked)
        {
          FCCWDeactive.value="*50#";
          FCCWDeactive.disabled=true;
        }
        else
        {
          FCCWDeactive.disabled=false;
        }
      }
      else
      {
        DefCWDeactiveEnable.checked = false;
        DefCWDeactiveEnable.disabled=true;
        FCCWDeactive.value="";
        FCCWDeactive.disabled=true;
      }

      var DefCallForwardingEnable = document.getElementById("DefCallForwardingEnable");
      var FCCallForwarding = document.getElementById("FCCallForwarding");
      if ( "0" == document.getElementById("CallForwardingFCEnable").value)
      {
        DefCallForwardingEnable.disabled=false;
        if( DefCallForwardingEnable.checked)
        {
          FCCallForwarding.value="*87*";
          FCCallForwarding.disabled=true;
        }
        else
        {
          FCCallForwarding.disabled=false;
        }
      }
      else
      {
        DefCallForwardingEnable.checked = false;
        DefCallForwardingEnable.disabled=true;
        FCCallForwarding.value="";
        FCCallForwarding.disabled=true;
      }

      var DefUCFEnable = document.getElementById("DefUCFEnable");
      var FCUCFEnable = document.getElementById("FCUCFEnable");
      if ( "0" == document.getElementById("UCFEnableFCEnable").value)
      {
        DefUCFEnable.disabled=false;
        if( DefUCFEnable.checked)
        {
          FCUCFEnable.value="*72*";
          FCUCFEnable.disabled=true;
        }
        else
        {
          FCUCFEnable.disabled=false;
        }
      }
      else
      {
        DefUCFEnable.checked = false;
        DefUCFEnable.disabled=true;
        FCUCFEnable.value="";
        FCUCFEnable.disabled=true;
      }

      var DefUCFDisable = document.getElementById("DefUCFDisable");
      var FCUCFDisable = document.getElementById("FCUCFDisable");
      if ( "0" == document.getElementById("UCFDisableFCEnable").value)
      {
        DefUCFDisable.disabled=false;
        if( DefUCFDisable.checked)
        {
          FCUCFDisable.value="*73#";
          FCUCFDisable.disabled=true;
        }
        else
        {
          FCUCFDisable.disabled=false;
        }
      }
      else
      {
        DefUCFDisable.checked = false;
        DefUCFDisable.disabled=true;
        FCUCFDisable.value="";
        FCUCFDisable.disabled=true;
      }

      var DefBCFEnable = document.getElementById("DefBCFEnable");
      var FCBCFEnable = document.getElementById("FCBCFEnable");
      if ( "0" == document.getElementById("BCFEnableFCEnable").value)
      {
        DefBCFEnable.disabled=false;
        if( DefBCFEnable.checked)
        {
          FCBCFEnable.value="*90*";
          FCBCFEnable.disabled=true;
        }
        else
        {
          FCBCFEnable.disabled=false;
        }
      }
      else
      {
        DefBCFEnable.checked = false;
        DefBCFEnable.disabled=true;
        FCBCFEnable.value="";
        FCBCFEnable.disabled=true;
      }

      var DefBCFDisable = document.getElementById("DefBCFDisable");
      var FCBCFDisable = document.getElementById("FCBCFDisable");
      if ( "0" == document.getElementById("BCFDisableFCEnable").value)
      {
        DefBCFDisable.disabled=false;
        if( DefBCFDisable.checked)
        {
          FCBCFDisable.value="*91#";
          FCBCFDisable.disabled=true;
        }
        else
        {
          FCBCFDisable.disabled=false;
        }
      }
      else
      {
        DefBCFDisable.checked = false;
        DefBCFDisable.disabled=true;
        FCBCFDisable.value="";
        FCBCFDisable.disabled=true;
      }

      var DefNACFEnable = document.getElementById("DefNACFEnable");
      var FCNACFEnable = document.getElementById("FCNACFEnable");
      if ( "0" == document.getElementById("NACFEnableFCEnable").value)
      {
        DefNACFEnable.disabled=false;
        if( DefNACFEnable.checked)
        {
          FCNACFEnable.value="*92*";
          FCNACFEnable.disabled=true;
        }
        else
        {
          FCNACFEnable.disabled=false;
        }
      }
      else
      {
        DefNACFEnable.checked = false;
        DefNACFEnable.disabled=true;
        FCNACFEnable.value="";
        FCNACFEnable.disabled=true;
      }

      var DefNACFDisable = document.getElementById("DefNACFDisable");
      var FCNACFDisable = document.getElementById("FCNACFDisable");
      if ( "0" == document.getElementById("NACFDisableFCEnable").value)
      {
        DefNACFDisable.disabled=false;
        if( DefNACFDisable.checked)
        {
          FCNACFDisable.value="*93#";
          FCNACFDisable.disabled=true;
        }
        else
        {
          FCNACFDisable.disabled=false;
        }
      }
      else
      {
        DefNACFDisable.checked = false;
        DefNACFDisable.disabled=true;
        FCNACFDisable.value="";
        FCNACFDisable.disabled=true;
      }

      var DefDNDActiveEnable = document.getElementById("DefDNDActiveEnable");
      var FCDNDActive = document.getElementById("FCDNDActive");
      if ( "0" == document.getElementById("DNDActiveFCEnable").value)
      {
        DefDNDActiveEnable.disabled=false;
        if( DefDNDActiveEnable.checked)
        {
          FCDNDActive.value="*78#";
          FCDNDActive.disabled=true;
        }
        else
        {
          FCDNDActive.disabled=false;
        }
      }
      else
      {
        DefDNDActiveEnable.checked = false;
        DefDNDActiveEnable.disabled=true;
        FCDNDActive.value="";
        FCDNDActive.disabled=true;
      }

      var DefDNDDeactiveEnable = document.getElementById("DefDNDDeactiveEnable");
      var FCDNDDeactive = document.getElementById("FCDNDDeactive");
      if ( "0" == document.getElementById("DNDDeactiveFCEnable").value)
      {
        DefDNDDeactiveEnable.disabled=false;
        if( DefDNDDeactiveEnable.checked)
        {
          FCDNDDeactive.value="*79#";
          FCDNDDeactive.disabled=true;
        }
        else
        {
          FCDNDDeactive.disabled=false;
        }
      }
      else
      {
        DefDNDDeactiveEnable.checked = false;
        DefDNDDeactiveEnable.disabled=true;
        FCDNDDeactive.value="";
        FCDNDDeactive.disabled=true;
      }

      var DefDialVoicemailEnable = document.getElementById("DefDialVoicemailEnable");
      var FCDialVoicemail = document.getElementById("FCDialVoicemail");
      if ( "0" == document.getElementById("DialVoicemailFCEnable").value)
      {
        DefDialVoicemailEnable.disabled=false;
        if( DefDialVoicemailEnable.checked)
        {
          FCDialVoicemail.value="*200#";
          FCDialVoicemail.disabled=true;
        }
        else
        {
          FCDialVoicemail.disabled=false;
        }
      }
      else
      {
        DefDialVoicemailEnable.checked = false;
        DefDialVoicemailEnable.disabled=true;
        FCDialVoicemail.value="";
        FCDialVoicemail.disabled=true;
      }
    }

    $scope.mouse_click = function()
    {
      hide_all();
      var DefQueryIPAddressEnable = document.getElementById("DefQueryIPAddressEnable");
      var FCQueryIPAddress = document.getElementById("FCQueryIPAddress");
      if ( "0" == document.getElementById("QueryIPAddressFCEnable").value)
      {
        DefQueryIPAddressEnable.disabled=false;
        if( DefQueryIPAddressEnable.checked)
        {
          FCQueryIPAddress.value="*158#";
          FCQueryIPAddress.disabled=true;
        }
        else
        {
          FCQueryIPAddress.disabled=false;
        }
      }
      else
      {
        DefQueryIPAddressEnable.checked = false;
        DefQueryIPAddressEnable.disabled=true;
        FCQueryIPAddress.value="";
        FCQueryIPAddress.disabled=true;
      }

      var DefQueryWANIPAddressEnable = document.getElementById("DefQueryWANIPAddressEnable");
      var FCQueryWANIPAddress = document.getElementById("FCQueryWANIPAddress");
      if ( "0" == document.getElementById("QueryWANIPAddressFCEnable").value)
      {
        DefQueryWANIPAddressEnable.disabled=false;
        if( DefQueryWANIPAddressEnable.checked)
        {
          FCQueryWANIPAddress.value="*159#";
          FCQueryWANIPAddress.disabled=true;
        }
        else
        {
          FCQueryWANIPAddress.disabled=false;
        }
      }
      else
      {
        DefQueryWANIPAddressEnable.checked = false;
        DefQueryWANIPAddressEnable.disabled=true;
        FCQueryWANIPAddress.value="";
        FCQueryWANIPAddress.disabled=true;
      }

      var DefQueryAccountEnable = document.getElementById("DefQueryAccountEnable");
      var FCQueryAccount = document.getElementById("FCQueryAccount");
      if ( "0" == document.getElementById("QueryAccountFCEnable").value)
      {
        DefQueryAccountEnable.disabled=false;
        if( DefQueryAccountEnable.checked)
        {
          FCQueryAccount.value="*114#";
          FCQueryAccount.disabled=true;
        }
        else
        {
          FCQueryAccount.disabled=false;
        }
      }
      else
      {
        DefQueryAccountEnable.checked = false;
        DefQueryAccountEnable.disabled=true;
        FCQueryAccount.value="";
        FCQueryAccount.disabled=true;
      }

      var DefQueryPortGroupEnable = document.getElementById("DefQueryPortGroupEnable");
      var FCQueryPortGroup = document.getElementById("FCQueryPortGroup");
      if ( "0" == document.getElementById("QueryPortGroupFCEnable").value)
      {
        DefQueryPortGroupEnable.disabled=false;
        if( DefQueryPortGroupEnable.checked)
        {
          FCQueryPortGroup.value ="*115#";
          FCQueryPortGroup.disabled=true;
        }
        else
        {
          FCQueryPortGroup.disabled=false;
        }
      }
      else
      {
        DefQueryPortGroupEnable.checked = false;
        DefQueryPortGroupEnable.disabled=true;
        FCQueryPortGroup.value="";
        FCQueryPortGroup.disabled=true;
      }


      var DefNetworkConnModeEnable = document.getElementById("DefNetworkConnModeEnable");
      var FCNetworkConnMode = document.getElementById("FCNetworkConnMode");
      if ( "0" == document.getElementById("NetworkConnModeFCEnable").value)
      {
        DefNetworkConnModeEnable.disabled=false;
        if( DefNetworkConnModeEnable.checked)
        {
          FCNetworkConnMode.value="*150*";
          FCNetworkConnMode.disabled=true;
        }
        else
        {
          FCNetworkConnMode.disabled=false;
        }
      }
      else
      {
        DefNetworkConnModeEnable.checked = false;
        DefNetworkConnModeEnable.disabled=true;
        FCNetworkConnMode.value="";
        FCNetworkConnMode.disabled=true;
      }

      var DefNetworkWorkModeEnable = document.getElementById("DefNetworkWorkModeEnable");
      var FCNetworkWorkingMode = document.getElementById("FCNetworkWorkingMode");
      if ( "0" == document.getElementById("NetworkWorkModeFCEnable").value)
      {
        DefNetworkWorkModeEnable.disabled=false;
        if( DefNetworkWorkModeEnable.checked)
        {
          FCNetworkWorkingMode.value="*157*";
          FCNetworkWorkingMode.disabled=true;
        }
        else
        {
          FCNetworkWorkingMode.disabled=false;
        }
      }
      else
      {
        DefNetworkWorkModeEnable.checked = false;
        DefNetworkWorkModeEnable.disabled=true;
        FCNetworkWorkingMode.value="";
        FCNetworkWorkingMode.disabled=true;
      }

      var DefIPAddressConfigEnable = document.getElementById("DefIPAddressConfigEnable");
      var FCIPAddressConfig = document.getElementById("FCIPAddressConfig");
      if ( "0" == document.getElementById("IPAddressConfigFCEnable").value)
      {
        DefIPAddressConfigEnable.disabled=false;
        if( DefIPAddressConfigEnable.checked)
        {
          FCIPAddressConfig.value="*152*";
          FCIPAddressConfig.disabled=true;
        }
        else
        {
          FCIPAddressConfig.disabled=false;
        }
      }
      else
      {
        DefIPAddressConfigEnable.checked = false;
        DefIPAddressConfigEnable.disabled=true;
        FCIPAddressConfig.value="";
        FCIPAddressConfig.disabled=true;
      }

      var DefSubnetMaskConfigEnable = document.getElementById("DefSubnetMaskConfigEnable");
      var FCSubnetMaskConfig = document.getElementById("FCSubnetMaskConfig");
      if ( "0" == document.getElementById("SubnetMaskConfigFCEnable").value)
      {
        DefSubnetMaskConfigEnable.disabled=false;
        if( DefSubnetMaskConfigEnable.checked)
        {
          FCSubnetMaskConfig.value="*153*";
          FCSubnetMaskConfig.disabled=true;
        }
        else
        {
          FCSubnetMaskConfig.disabled=false;
        }
      }
      else
      {
        DefSubnetMaskConfigEnable.checked = false;
        DefSubnetMaskConfigEnable.disabled=true;
        FCSubnetMaskConfig.value="";
        FCSubnetMaskConfig.disabled=true;
      }

      var DefGatewayConfigEnable = document.getElementById("DefGatewayConfigEnable");
      var FCGatewayConfig = document.getElementById("FCGatewayConfig");
      if ( "0" == document.getElementById("GatewayConfigFCEnable").value)
      {
        DefGatewayConfigEnable.disabled=false;
        if( DefGatewayConfigEnable.checked)
        {
          FCGatewayConfig.value="*156*";
          FCGatewayConfig.disabled=true;
        }
        else
        {
          FCGatewayConfig.disabled=false;
        }
      }
      else
      {
        DefGatewayConfigEnable.checked = false;
        DefGatewayConfigEnable.disabled=true;
        FCGatewayConfig.value="";
        FCGatewayConfig.disabled=true;
      }

      var DefRenewDHCPEnable = document.getElementById("DefRenewDHCPEnable");
      var FCRenewDHCP = document.getElementById("FCRenewDHCP");
      if ( "0" == document.getElementById("RenewDHCPFCEnable").value)
      {
        DefRenewDHCPEnable.disabled=false;
        if( DefRenewDHCPEnable.checked)
        {
          FCRenewDHCP.value="*193#";
          FCRenewDHCP.disabled=true;
        }
        else
        {
          FCRenewDHCP.disabled=false;
        }
      }
      else
      {
        DefRenewDHCPEnable.checked = false;
        DefRenewDHCPEnable.disabled=true;
        FCRenewDHCP.value="";
        FCRenewDHCP.disabled=true;
      }

      var DefPortVoiceUpEnable = document.getElementById("DefPortVoiceUpEnable");
      var FCPortVoiceUp = document.getElementById("FCPortVoiceUp");
      if ( "0" == document.getElementById("PortVoiceUpFCEnable").value)
      {
        DefPortVoiceUpEnable.disabled=false;
        if( DefPortVoiceUpEnable.checked)
        {
          FCPortVoiceUp.value="*170#";
          FCPortVoiceUp.disabled=true;
        }
        else
        {
          FCPortVoiceUp.disabled=false;
        }
      }
      else
      {
        DefPortVoiceUpEnable.checked = false;
        DefPortVoiceUpEnable.disabled=true;
        FCPortVoiceUp.value="";
        FCPortVoiceUp.disabled=true;
      }

      var DefPortVoiceDownEnable = document.getElementById("DefPortVoiceDownEnable");
      var FCPortVoiceDown = document.getElementById("FCPortVoiceDown");
      if ( "0" == document.getElementById("PortVoiceDownFCEnable").value)
      {
        DefPortVoiceDownEnable.disabled=false;
        if( DefPortVoiceDownEnable.checked)
        {
          FCPortVoiceDown.value="*171#";
          FCPortVoiceDown.disabled=true;
        }
        else
        {
          FCPortVoiceDown.disabled=false;
        }
      }
      else
      {
        DefPortVoiceDownEnable.checked = false;
        DefPortVoiceDownEnable.disabled=true;
        FCPortVoiceDown.value="";
        FCPortVoiceDown.disabled=true;
      }

      var DefFXOConfigEnable = document.getElementById("DefFXOConfigEnable");
      var FCFXOConfigEnable = document.getElementById("FCFXOConfigEnable");
      if (oPortNum > 0 )
      {
        if ( "0" == document.getElementById("FXOConfigEnableFCEnable").value)
        {
          DefFXOConfigEnable.disabled=false;
          if( DefFXOConfigEnable.checked)
          {
            FCFXOConfigEnable.value="*149*";
            FCFXOConfigEnable.disabled=true;
          }
          else
          {
            FCFXOConfigEnable.disabled=false;
          }
        }
        else
        {
          DefFXOConfigEnable.checked = false;
          DefFXOConfigEnable.disabled=true;
          FCFXOConfigEnable.value="";
          FCFXOConfigEnable.disabled=true;
        }
      }
      else
      {
        DefFXOConfigEnable.checked = false;
        DefFXOConfigEnable.disabled=true;
        FCFXOConfigEnable.value="";
        FCFXOConfigEnable.disabled=true;
      }

      var DefRMEnable = document.getElementById("DefRMEnable");
      var FCRemoteManagementEnable = document.getElementById("FCRemoteManagementEnable");
      if ( "0" == document.getElementById("RMEnableFCEnable").value)
      {
        DefRMEnable.disabled=false;
        if( DefRMEnable.checked)
        {
          FCRemoteManagementEnable.value="*160*";
          FCRemoteManagementEnable.disabled=true;
        }
        else
        {
          FCRemoteManagementEnable.disabled=false;
        }
      }
      else
      {
        DefRMEnable.checked = false;
        DefRMEnable.disabled=true;
        FCRemoteManagementEnable.value="";
        FCRemoteManagementEnable.disabled=true;
      }

      var DefBasicResetEnable = document.getElementById("DefBasicResetEnable");
      var FCBasicReset = document.getElementById("FCBasicReset");
      if ( "0" == document.getElementById("BasicResetFCEnable").value)
      {
        DefBasicResetEnable.disabled=false;
        if( DefBasicResetEnable.checked)
        {
          FCBasicReset.value="*165*";
          FCBasicReset.disabled=true;
        }
        else
        {
          FCBasicReset.disabled=false;
        }
      }
      else
      {
        DefBasicResetEnable.checked = false;
        DefBasicResetEnable.disabled=true;
        FCBasicReset.value="";
        FCBasicReset.disabled=true;
      }

      var DefFactoryResetEnable = document.getElementById("DefFactoryResetEnable");
      var FCFactoryReset = document.getElementById("FCFactoryReset");
      if ( "0" == document.getElementById("FactoryResetFCEnable").value)
      {
        DefFactoryResetEnable.disabled=false;
        if( DefFactoryResetEnable.checked)
        {
          FCFactoryReset.value="*166*";
          FCFactoryReset.disabled=true;
        }
        else
        {
          FCFactoryReset.disabled=false;
        }
      }
      else
      {
        DefFactoryResetEnable.checked = false;
        DefFactoryResetEnable.disabled=true;
        FCFactoryReset.value="";
        FCFactoryReset.disabled=true;
      }

      var DefResetDeviceEnable = document.getElementById("DefResetDeviceEnable");
      var FCResetDevice = document.getElementById("FCResetDevice");
      if ( "0" == document.getElementById("ResetDeviceFCEnable").value)
      {
        DefResetDeviceEnable.disabled=false;
        if( DefResetDeviceEnable.checked)
        {
          FCResetDevice.value="*111#";
          FCResetDevice.disabled=true;
        }
        else
        {
          FCResetDevice.disabled=false;
        }
      }
      else
      {
        DefResetDeviceEnable.checked = false;
        DefResetDeviceEnable.disabled=true;
        FCResetDevice.value="";
        FCResetDevice.disabled=true;
      }

      var DefCallHoldEnable = document.getElementById("DefCallHoldEnable");
      var FCCallHold = document.getElementById("FCCallHold");
      if ( "0" == document.getElementById("CallHoldFCEnable").value)
      {
        DefCallHoldEnable.disabled=false;
        if( DefCallHoldEnable.checked)
        {
          FCCallHold.value="*#";
          FCCallHold.disabled=true;
        }
        else
        {
          FCCallHold.disabled=false;
        }
      }
      else
      {
        DefCallHoldEnable.checked = false;
        DefCallHoldEnable.disabled=true;
        FCCallHold.value="";
        FCCallHold.disabled=true;
      }

      var DefIPCallEnable = document.getElementById("DefIPCallEnable");
      var FCIPCall = document.getElementById("FCIPCall");
      if ( "0" == document.getElementById("IPCallFCEnable").value)
      {
        DefIPCallEnable.disabled=false;
        if( DefIPCallEnable.checked)
        {
          FCIPCall.value="*47*";
          FCIPCall.disabled=true;
        }
        else
        {
          FCIPCall.disabled=false;
        }
      }
      else
      {
        DefIPCallEnable.checked = false;
        DefIPCallEnable.disabled=true;
        FCIPCall.value="";
        FCIPCall.disabled=true;
      }

      var DefCWActiveEnable = document.getElementById("DefCWActiveEnable");
      var FCCWActive = document.getElementById("FCCWActive");
      if ( "0" == document.getElementById("CWActiveFCEnable").value)
      {
        DefCWActiveEnable.disabled=false;
        if( DefCWActiveEnable.checked)
        {
          FCCWActive.value="*51#";
          FCCWActive.disabled=true;
        }
        else
        {
          FCCWActive.disabled=false;
        }
      }
      else
      {
        DefCWActiveEnable.checked = false;
        DefCWActiveEnable.disabled=true;
        FCCWActive.value="";
        FCCWActive.disabled=true;
      }

      var DefCWDeactiveEnable = document.getElementById("DefCWDeactiveEnable");
      var FCCWDeactive = document.getElementById("FCCWDeactive");
      if ( "0" == document.getElementById("CWDeactiveFCEnable").value)
      {
        DefCWDeactiveEnable.disabled=false;
        if( DefCWDeactiveEnable.checked)
        {
          FCCWDeactive.value="*50#";
          FCCWDeactive.disabled=true;
        }
        else
        {
          FCCWDeactive.disabled=false;
        }
      }
      else
      {
        DefCWDeactiveEnable.checked = false;
        DefCWDeactiveEnable.disabled=true;
        FCCWDeactive.value="";
        FCCWDeactive.disabled=true;
      }

      var DefCallForwardingEnable = document.getElementById("DefCallForwardingEnable");
      var FCCallForwarding = document.getElementById("FCCallForwarding");
      if ( "0" == document.getElementById("CallForwardingFCEnable").value)
      {
        DefCallForwardingEnable.disabled=false;
        if( DefCallForwardingEnable.checked)
        {
          FCCallForwarding.value="*87*";
          FCCallForwarding.disabled=true;
        }
        else
        {
          FCCallForwarding.disabled=false;
        }
      }
      else
      {
        DefCallForwardingEnable.checked = false;
        DefCallForwardingEnable.disabled=true;
        FCCallForwarding.value="";
        FCCallForwarding.disabled=true;
      }

      var DefUCFEnable = document.getElementById("DefUCFEnable");
      var FCUCFEnable = document.getElementById("FCUCFEnable");
      if ( "0" == document.getElementById("UCFEnableFCEnable").value)
      {
        DefUCFEnable.disabled=false;
        if( DefUCFEnable.checked)
        {
          FCUCFEnable.value="*72*";
          FCUCFEnable.disabled=true;
        }
        else
        {
          FCUCFEnable.disabled=false;
        }
      }
      else
      {
        DefUCFEnable.checked = false;
        DefUCFEnable.disabled=true;
        FCUCFEnable.value="";
        FCUCFEnable.disabled=true;
      }

      var DefUCFDisable = document.getElementById("DefUCFDisable");
      var FCUCFDisable = document.getElementById("FCUCFDisable");
      if ( "0" == document.getElementById("UCFDisableFCEnable").value)
      {
        DefUCFDisable.disabled=false;
        if( DefUCFDisable.checked)
        {
          FCUCFDisable.value="*73#";
          FCUCFDisable.disabled=true;
        }
        else
        {
          FCUCFDisable.disabled=false;
        }
      }
      else
      {
        DefUCFDisable.checked = false;
        DefUCFDisable.disabled=true;
        FCUCFDisable.value="";
        FCUCFDisable.disabled=true;
      }

      var DefBCFEnable = document.getElementById("DefBCFEnable");
      var FCBCFEnable = document.getElementById("FCBCFEnable");
      if ( "0" == document.getElementById("BCFEnableFCEnable").value)
      {
        DefBCFEnable.disabled=false;
        if( DefBCFEnable.checked)
        {
          FCBCFEnable.value="*90*";
          FCBCFEnable.disabled=true;
        }
        else
        {
          FCBCFEnable.disabled=false;
        }
      }
      else
      {
        DefBCFEnable.checked = false;
        DefBCFEnable.disabled=true;
        FCBCFEnable.value="";
        FCBCFEnable.disabled=true;
      }

      var DefBCFDisable = document.getElementById("DefBCFDisable");
      var FCBCFDisable = document.getElementById("FCBCFDisable");
      if ( "0" == document.getElementById("BCFDisableFCEnable").value)
      {
        DefBCFDisable.disabled=false;
        if( DefBCFDisable.checked)
        {
          FCBCFDisable.value="*91#";
          FCBCFDisable.disabled=true;
        }
        else
        {
          FCBCFDisable.disabled=false;
        }
      }
      else
      {
        DefBCFDisable.checked = false;
        DefBCFDisable.disabled=true;
        FCBCFDisable.value="";
        FCBCFDisable.disabled=true;
      }

      var DefNACFEnable = document.getElementById("DefNACFEnable");
      var FCNACFEnable = document.getElementById("FCNACFEnable");
      if ( "0" == document.getElementById("NACFEnableFCEnable").value)
      {
        DefNACFEnable.disabled=false;
        if( DefNACFEnable.checked)
        {
          FCNACFEnable.value="*92*";
          FCNACFEnable.disabled=true;
        }
        else
        {
          FCNACFEnable.disabled=false;
        }
      }
      else
      {
        DefNACFEnable.checked = false;
        DefNACFEnable.disabled=true;
        FCNACFEnable.value="";
        FCNACFEnable.disabled=true;
      }

      var DefNACFDisable = document.getElementById("DefNACFDisable");
      var FCNACFDisable = document.getElementById("FCNACFDisable");
      if ( "0" == document.getElementById("NACFDisableFCEnable").value)
      {
        DefNACFDisable.disabled=false;
        if( DefNACFDisable.checked)
        {
          FCNACFDisable.value="*93#";
          FCNACFDisable.disabled=true;
        }
        else
        {
          FCNACFDisable.disabled=false;
        }
      }
      else
      {
        DefNACFDisable.checked = false;
        DefNACFDisable.disabled=true;
        FCNACFDisable.value="";
        FCNACFDisable.disabled=true;
      }

      var DefDNDActiveEnable = document.getElementById("DefDNDActiveEnable");
      var FCDNDActive = document.getElementById("FCDNDActive");
      if ( "0" == document.getElementById("DNDActiveFCEnable").value)
      {
        DefDNDActiveEnable.disabled=false;
        if( DefDNDActiveEnable.checked)
        {
          FCDNDActive.value="*78#";
          FCDNDActive.disabled=true;
        }
        else
        {
          FCDNDActive.disabled=false;
        }
      }
      else
      {
        DefDNDActiveEnable.checked = false;
        DefDNDActiveEnable.disabled=true;
        FCDNDActive.value="";
        FCDNDActive.disabled=true;
      }

      var DefDNDDeactiveEnable = document.getElementById("DefDNDDeactiveEnable");
      var FCDNDDeactive = document.getElementById("FCDNDDeactive");
      if ( "0" == document.getElementById("DNDDeactiveFCEnable").value)
      {
        DefDNDDeactiveEnable.disabled=false;
        if( DefDNDDeactiveEnable.checked)
        {
          FCDNDDeactive.value="*79#";
          FCDNDDeactive.disabled=true;
        }
        else
        {
          FCDNDDeactive.disabled=false;
        }
      }
      else
      {
        DefDNDDeactiveEnable.checked = false;
        DefDNDDeactiveEnable.disabled=true;
        FCDNDDeactive.value="";
        FCDNDDeactive.disabled=true;
      }

      var DefDialVoicemailEnable = document.getElementById("DefDialVoicemailEnable");
      var FCDialVoicemail = document.getElementById("FCDialVoicemail");
      if ( "0" == document.getElementById("DialVoicemailFCEnable").value)
      {
        DefDialVoicemailEnable.disabled=false;
        if( DefDialVoicemailEnable.checked)
        {
          FCDialVoicemail.value="*200#";
          FCDialVoicemail.disabled=true;
        }
        else
        {
          FCDialVoicemail.disabled=false;
        }
      }
      else
      {
        DefDialVoicemailEnable.checked = false;
        DefDialVoicemailEnable.disabled=true;
        FCDialVoicemail.value="";
        FCDialVoicemail.disabled=true;
      }
    }

    function getElementPos(elementId)
    {
      var ua = navigator.userAgent.toLowerCase();
      var isOpera = (ua.indexOf('opera') != -1);
      var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
      var el = document.getElementById(elementId);
      if (el.parentNode === null || el.style.display == 'none')
      {
        return false;
      }
      var parent = null;
      var pos = [];
      var box;
      if (el.getBoundingClientRect) //IE
      {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return { x: box.left + scrollLeft, y: box.top + scrollTop };
      }
      else if (document.getBoxObjectFor) // gecko
      {
        box = document.getBoxObjectFor(el);
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
      }
      else // safari & opera
      {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el)
        {
          while (parent)
          {
            pos[0] += parent.offsetLeft;
            pos[1] += parent.offsetTop;
            parent = parent.offsetParent;
          }
        }
        if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute'))
        {
          pos[0] -= document.body.offsetLeft;
          pos[1] -= document.body.offsetTop;
        }
      }

      if (el.parentNode)
      {
        parent = el.parentNode;
      }
      else
      {
        parent = null;
      }
      while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML')
      { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
        if (parent.parentNode)
        {
          parent = parent.parentNode;
        }
        else
        {
          parent = null;
        }
      }
      return {x: pos[0],y: pos[1]};
    }

    $scope.display = function(id,param){
      for(var i=0; i<17; i++)
      {
        if(i != id )
        {
          hide(i);
        }
        else
        {
          var BOX = getElementPos("dx" + i);
          var Y = document.getElementById("dx" + i).scrollHeight;
          document.getElementById("ex" + i).style.left = BOX.x + "px";
          document.getElementById("ex" + i).style.top = BOX.y + Y + "px";
          document.getElementById("ex" + i).style.display = "";
        }
      }
    }

    function display(id, param)
    {
      for(var i=0; i<17; i++)
      {
        if(i != id )
        {
          hide(i);
        }
        else
        {
          var BOX = getElementPos("dx" + i);
          var Y = document.getElementById("dx" + i).scrollHeight;
          document.getElementById("ex" + i).style.left = BOX.x + "px";
          document.getElementById("ex" + i).style.top = BOX.y + Y + "px";
          document.getElementById("ex" + i).style.display = "";
        }
      }
    }

    $scope.hide = function(id){
      document.getElementById("ex" + id).style.display = "none";
    }

    function hide(id)
    {
      document.getElementById("ex" + id).style.display = "none";
    }

    $scope.hide_all = function(){
      for(var i=0; i<16; i++)
      {
        hide(i);
      }
    }

    function hide_all()
    {
      for(var i=0; i<16; i++)
      {
        hide(i);
      }
    }
  }])

  .controller('SystemCfgCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var gOSType;
    var gIPProto;
    var g_ComplexCfgFlag;
    var old_strDay = 1,old_endDay = 1;
    var g_hintnum;
    var RelayServerEnable= '0';
    var PrimDNS = "8.8.8.8";
    var BJTeleFlag = "false";

    MM_callJS('no', 'Linux', 0, 0, 1,0,'Admin');
    function MM_callJS(ComplexCfgFlag, OSType, RebootHour, RebootMinute, IPProto,HintNum,user)
    {
      g_ComplexCfgFlag = ComplexCfgFlag;
      gOSType = OSType;
      gIPProto = parseInt(IPProto);
      g_hintnum = parseInt(HintNum);

      if (1 == g_hintnum)
      {
        document.getElementById("idHintLanguage").style.display = "none";
        document.getElementById("idBlankHint").style.display = "none";
      }
      else
      {
        document.getElementById("idHintLanguage").style.display = "";
        document.getElementById("idBlankHint").style.display = "";
      }

      if ("yes" == g_ComplexCfgFlag)
      {
        if (gOSType == "Linux")
        {
          document.getElementById("idRemoteManageFlag").style.display = "";
          document.getElementById("idRemoteManageWEBByWAN").style.display = "";
          document.getElementById("idRemoteManageWEBByLAN").style.display = "";
          document.getElementById("idRemoteManageTelnetByWAN").style.display = "";
          document.getElementById("idRemoteManageTelnetByLAN").style.display = "";
        }
        else
        {
          document.getElementById("idRemoteManageFlag").style.display = "";
          document.getElementById("idRemoteManageWEBByWAN").style.display = "";
        }
      }

      document.getElementById('RebootTimeHour').value = RebootHour;
      document.getElementById('RebootTimeMinute').value = RebootMinute;

      if (2 != gIPProto) //IPv6 NAT not surpport
      {
        document.getElementById("idNatTrvsl").style.display = "";
        document.getElementById("idBlankNAT").style.display = "";
      }

      setTimeout(function(){
        addOption();
        mouse_click();
        start_month_change();
        end_month_change();
      },300)
      setTimeout(function(){
        date_radio_click();
      },1000)
    }

    function addOption(){
      var currDay;
      var StartMonth = document.getElementById("StartMonth").value;
      var EndMonth = document.getElementById("EndMonth").value;
      var StartDay = document.getElementById("StartDay");
      var EndDay = document.getElementById("EndDay");
      var StartHour = document.getElementById("StartHour");
      var EndHour = document.getElementById("EndHour");
      var StartMinute = document.getElementById("StartMinute");
      var EndMinute = document.getElementById("EndMinute");
      var max_start_days = ssp_days_per_month(StartMonth);
      var max_end_days = ssp_days_per_month(EndMonth);
      for (var i=1; i<= max_start_days; i++)
      {
        var opt = document.createElement ("option");
        opt.value = i;
        opt.innerText = i;
        StartDay.appendChild (opt);
      }
      for (var i=1; i<= max_end_days; i++)
      {
        var opt = document.createElement ("option");
        opt.value = i;
        opt.innerText = i;
        EndDay.appendChild (opt);
      }
      for (var i=0; i<24; i++)
      {
        var opt = document.createElement ("option");
        opt.value = i;
        opt.innerText = i;
        StartHour.appendChild (opt);
      }
      for (var i=0; i<24; i++)
      {
        var opt = document.createElement ("option");
        opt.value = i;
        opt.innerText = i;
        EndHour.appendChild (opt);
      }
      for (var i=0; i<60; i++)
      {
        var opt = document.createElement ("option");
        opt.value = i;
        opt.innerText = i;
        StartMinute.appendChild (opt);
      }
      for (var i=0; i<60; i++)
      {
        var opt = document.createElement ("option");
        opt.value = i;
        opt.innerText = i;
        EndMinute.appendChild (opt);
      }
      document.getElementById("StartHour").options[2].selected = true;
      document.getElementById("EndHour").options[2].selected = true;
      document.getElementById("StartDay").options[1].selected = true;
      document.getElementById("EndDay").options[1].selected = true;
      document.getElementById("StartMinute").options[0].selected = true;
      document.getElementById("EndMinute").options[0].selected = true;
    }

    function mouse_click(){
      if (2 != gIPProto) //IPv6 NAT not surpport
      {
        var TraversalMode = document.getElementById("NatTraversal").value;
        if (0 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "none";
          document.getElementById("idNatIP").style.display = "none";
          document.getElementById("idSTUNServerAddr").style.display = "none";
          document.getElementById("idSTUNServerPort").style.display = "none";
        }
        else if (1 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "";
          document.getElementById("idNatIP").style.display = "none";
          document.getElementById("idSTUNServerAddr").style.display = "";
          document.getElementById("idSTUNServerPort").style.display = "";
        }
        else if (2 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "none";
          document.getElementById("idNatIP").style.display = "";
          document.getElementById("idSTUNServerAddr").style.display = "none";
          document.getElementById("idSTUNServerPort").style.display = "none";
        }
        else if (3 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "none";
          document.getElementById("idNatIP").style.display = "none";
          document.getElementById("idSTUNServerAddr").style.display = "none";
          document.getElementById("idSTUNServerPort").style.display = "none";
        }
      }

      if (document.getElementById("NTPEnable").checked)
      {
        document.getElementById("idPrimNTPServAddr").style.display = "";
        document.getElementById("idPrimNTPServPort").style.display = "";
        document.getElementById("idSecondNTPServAddr").style.display = "";
        document.getElementById("idSecondNTPServPort").style.display = "";
        document.getElementById("idCheckInterval").style.display = "";
        document.getElementById("idTimeZone").style.display = "";

        document.getElementById("idBlankNTP").style.display = "";

        document.getElementById('IsEnableDST').disabled = false;
        if(document.getElementById("IsEnableDST").checked)
        {
          document.getElementById("idStartTime").style.display = "";
          document.getElementById("idEndTime").style.display = "";
          document.getElementById("idOffsetTime").style.display = "";
        }
//        else
//        {
//          document.getElementById("idStartTime").style.display = "none";
//          document.getElementById("idEndTime").style.display = "none";
//          document.getElementById("idOffsetTime").style.display = "none";
//        }

        document.getElementById('DailyReboot').disabled = false;
        document.getElementById('RebootTimeHour').disabled = false;
        document.getElementById('RebootTimeMinute').disabled = false;
      }
      else
      {
        document.getElementById("idPrimNTPServAddr").style.display = "none";
        document.getElementById("idPrimNTPServPort").style.display = "none";
        document.getElementById("idSecondNTPServAddr").style.display = "none";
        document.getElementById("idSecondNTPServPort").style.display = "none";
        document.getElementById("idCheckInterval").style.display = "none";
        document.getElementById("idTimeZone").style.display = "none";

        document.getElementById("idBlankNTP").style.display = "";
        document.getElementById('IsEnableDST').checked = false;
        document.getElementById('IsEnableDST').disabled = true;
        document.getElementById("idStartTime").style.display = "none";
        document.getElementById("idEndTime").style.display = "none";
        document.getElementById("idOffsetTime").style.display = "none";

        document.getElementById('DailyReboot').disabled = true;
        document.getElementById('RebootTimeHour').disabled = true;
        document.getElementById('RebootTimeMinute').disabled = true;
      }
    }

    $scope.mouse_click = function()
    {
      if (2 != gIPProto) //IPv6 NAT not surpport
      {
        var TraversalMode = document.getElementById("NatTraversal").value;
        if (0 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "none";
          document.getElementById("idNatIP").style.display = "none";
          document.getElementById("idSTUNServerAddr").style.display = "none";
          document.getElementById("idSTUNServerPort").style.display = "none";
        }
        else if (1 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "";
          document.getElementById("idNatIP").style.display = "none";
          document.getElementById("idSTUNServerAddr").style.display = "";
          document.getElementById("idSTUNServerPort").style.display = "";
        }
        else if (2 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "none";
          document.getElementById("idNatIP").style.display = "";
          document.getElementById("idSTUNServerAddr").style.display = "none";
          document.getElementById("idSTUNServerPort").style.display = "none";
        }
        else if (3 == TraversalMode)
        {
          document.getElementById("idNatInterval").style.display = "none";
          document.getElementById("idNatIP").style.display = "none";
          document.getElementById("idSTUNServerAddr").style.display = "none";
          document.getElementById("idSTUNServerPort").style.display = "none";
        }
      }

      if (document.getElementById("NTPEnable").checked)
      {
        document.getElementById("idPrimNTPServAddr").style.display = "";
        document.getElementById("idPrimNTPServPort").style.display = "";
        document.getElementById("idSecondNTPServAddr").style.display = "";
        document.getElementById("idSecondNTPServPort").style.display = "";
        document.getElementById("idCheckInterval").style.display = "";
        document.getElementById("idTimeZone").style.display = "";

        document.getElementById("idBlankNTP").style.display = "";

        document.getElementById('IsEnableDST').disabled = false;
        if(document.getElementById("IsEnableDST").checked)
        {
          document.getElementById("idStartTime").style.display = "";
          document.getElementById("idEndTime").style.display = "";
          document.getElementById("idOffsetTime").style.display = "";
        }
        else
        {
          document.getElementById("idStartTime").style.display = "none";
          document.getElementById("idEndTime").style.display = "none";
          document.getElementById("idOffsetTime").style.display = "none";
        }

        document.getElementById('DailyReboot').disabled = false;
        document.getElementById('RebootTimeHour').disabled = false;
        document.getElementById('RebootTimeMinute').disabled = false;
      }
      else
      {
        document.getElementById("idPrimNTPServAddr").style.display = "none";
        document.getElementById("idPrimNTPServPort").style.display = "none";
        document.getElementById("idSecondNTPServAddr").style.display = "none";
        document.getElementById("idSecondNTPServPort").style.display = "none";
        document.getElementById("idCheckInterval").style.display = "none";
        document.getElementById("idTimeZone").style.display = "none";

        document.getElementById("idBlankNTP").style.display = "";
        document.getElementById('IsEnableDST').checked = false;
        document.getElementById('IsEnableDST').disabled = true;
        document.getElementById("idStartTime").style.display = "none";
        document.getElementById("idEndTime").style.display = "none";
        document.getElementById("idOffsetTime").style.display = "none";

        document.getElementById('DailyReboot').disabled = true;
        document.getElementById('RebootTimeHour').disabled = true;
        document.getElementById('RebootTimeMinute').disabled = true;
      }
    }

    $rootScope.SystemCfgFormCheck = function()
    {
      if (2 != gIPProto) //IPv6 NAT not surpport
      {
        var TraversalMode = document.getElementById("NatTraversal").value;
        if (1 == TraversalMode)
        {
          if (1 == RelayServerEnable)
          {
            $rootScope.href_click('SystemCfg');
            alert("动态带宽优化和STUN不能同时启用!");
            return false;
          }
          if (!is_number(document.getElementById("RefreshInterval").value,1,65535))
          {
            alert("‘刷新间隔’范围为1-65535!");
            $rootScope.href_click('SystemCfg');
            $rootScope.getSelect('RefreshInterval',0,'id');
            return false;
          }
          if (document.getElementById("STUNServerAddr").value.length == 0
            || document.getElementById("STUNServerAddr").value.length >= 128)
          {
            alert("'STUN服务器地址'长度必须小于128!");
            $rootScope.href_click('SystemCfg');
            $rootScope.getSelect('STUNServerAddr',0,'id');
            return false;
          }
          if(!ip_check(1, document.getElementById("STUNServerAddr").value))
          {
            if (PrimDNS == "")
            {
              alert("STUN服务器使用域名请先配置DNS服务器");
              $rootScope.href_click('SystemCfg');
              return false;
            }
          }
          if(document.getElementById("STUNServerPort").value.length == 0
            || !is_number(document.getElementById("STUNServerPort").value,0,65535))
          {
            alert("'STUN服务器端口'范围为0-65535!");
            $rootScope.href_click('SystemCfg');
            $rootScope.getSelect('STUNServerPort',0,'id');
            return false;
          }
        }
        else if (2 == TraversalMode)
        {
          if ( document.getElementById("NatIP").value.length == 0
            || document.getElementById("NatIP").value.length >= 128 )
          {
            alert("‘NAT 地址’长度必须小于128!");
            $rootScope.href_click('SystemCfg');
            $rootScope.getSelect('NatIP',0,'id');
            return false;
          }
        }
      }

      if(document.getElementById("NTPEnable").checked == true)
      {
        if(document.getElementById("PrimNTPServAddr").value.length >= 128)
        {
          alert("‘主NTP服务器地址’长度必须小于128!");
          $rootScope.href_click('SystemCfg');
          $rootScope.getSelect('PrimNTPServAddr',0,'id');
          return false;
        }
        if(!is_number(document.getElementById("PrimNTPServPort").value,0,65535))
        {
          alert("'主NTP服务器端口'范围为0-65535!");
          $rootScope.href_click('SystemCfg');
          $rootScope.getSelect('PrimNTPServPort',0,'id');
          return false;
        }

        if(document.getElementById("SecondNTPServAddr").value.length >= 128)
        {
          alert("'备NTP服务器地址'长度必须小于128!");
          $rootScope.href_click('SystemCfg');
          $rootScope.getSelect('SecondNTPServAddr',0,'id');
          return false;
        }
        if(!is_number(document.getElementById("SecondNTPServPort").value,0,65535))
        {
          alert("'备NTP服务器端口'范围为0-65535!");
          $rootScope.href_click('SystemCfg');
          $rootScope.getSelect('SecondNTPServPort',0,'id');
          return false;
        }

        if(document.getElementById("NTPCheckInterval").value == "0")
        {
          alert("‘NTP同步周期’必须大于0!");
          $rootScope.href_click('SystemCfg');
          $rootScope.getSelect('NTPCheckInterval',0,'id');
          return false;
        }
      }

      if (document.getElementById('SystemCfg').WebPort.value != 80
        && !is_number(document.getElementById('SystemCfg').WebPort.value,1024,65535))
      {
        alert("‘WEB端口’取值范围为1024-65535或者80!");
        $rootScope.href_click('SystemCfg');
        $rootScope.getSelect('WebPort',7,'form');
        return false;
      }

      if (document.getElementById('SystemCfg').SSLPort.value != 443
        && !is_number(document.getElementById('SystemCfg').SSLPort.value,1024,65535))
      {
        alert("'SSL端口'取值范围为1024-65535或者443!");
        $rootScope.href_click('SystemCfg');
        $rootScope.getSelect('SSLPort',7,'form');
        return false;
      }

      if (document.getElementById('SystemCfg').TelnetPort.value != 23
        && !is_number(document.getElementById('SystemCfg').TelnetPort.value,1024,65535))
      {
        alert("'Telnet端口'取值范围为1024-65535或者23!");
        $rootScope.href_click('SystemCfg');
        $rootScope.getSelect('TelnetPort',7,'form');
        return false;
      }

      if(document.getElementById('SystemCfg').WebPort.value == document.getElementById('SystemCfg').TelnetPort.value)
      {
        alert("Web端口和Telnet端口一样,请输入另外一个!");
        $rootScope.href_click('SystemCfg');
        $rootScope.getSelect('WebPort',7,'form');
        return false;
      }

      if ("yes" == g_ComplexCfgFlag && "Linux" == gOSType)
      {
        if (document.getElementById("RemoteManageEnable").checked == false
          && document.getElementById("RemoteManageWEBByLAN").checked == false
          && document.getElementById("RemoteManageTelnetByWAN").checked == false
          && document.getElementById("RemoteManageTelnetByLAN").checked == false)
        {
          alert("'访问控制'不能同时关闭!");
          $rootScope.href_click('SystemCfg');
          $rootScope.getSelect('TelnetPort',7,'form');
          return false;
        }
      }

      return true;
    }

    function ssp_days_per_month(month)
    {
      var max_date = 31;
      var d = new Date();


      var year = d.getFullYear();
      var month = parseInt(month);
      switch ( month )
      {
        case 1  :
        case 3  :
        case 5  :
        case 7  :
        case 8  :
        case 10 :
        case 12 :
          max_date = 31 ;
          break ;

        case 4  :
        case 6  :
        case 9  :
        case 11 :
          max_date = 30 ;
          break ;

        case 2  :
          if (( year % 4 ) == 0 )
          {
            if((year % 100) == 0)
            {
              if ((year % 400) == 0)
                max_date = 29 ;
              else
                max_date = 28;
            }
            else  max_date = 29;
          }
          else max_date = 28 ;
          break ;

        default :
          break ;
      }
      return  max_date ;
    }

    function start_month_change(){
      var month = document.getElementById("StartMonth").value;
      var max_days ;
      var currDay;
      max_days = ssp_days_per_month(month);

      document.getElementById("StartDay").options.length = 0;
      for (var i = 1; i<= max_days; i++)
      {
        document.getElementById("StartDay").options.add(new Option(i,i));
      }
      currDay = '2';
      currDay = parseInt(currDay);
      if(month == parseInt("3"))
      {
        document.getElementById("StartDay").options[currDay - 1].selected = true;
      }
      else
      {
        document.getElementById("StartDay").options[old_strDay - 1].selected = true;
      }
    }
    $scope.start_month_change = function()
    {
      var month = document.getElementById("StartMonth").value;
      var max_days ;
      var currDay;
      max_days = ssp_days_per_month(month);

      document.getElementById("StartDay").options.length = 0;
      for (var i = 1; i<= max_days; i++)
      {
        document.getElementById("StartDay").options.add(new Option(i,i));
      }
      currDay = '2';
      currDay = parseInt(currDay);
      if(month == parseInt("3"))
      {
        document.getElementById("StartDay").options[currDay - 1].selected = true;
      }
      else
      {
        document.getElementById("StartDay").options[old_strDay - 1].selected = true;
      }
    }

    $scope.get_curr_start_day = function()
    {
      old_strDay = document.getElementById("StartDay").value;
    }

    function get_curr_start_day(){
      old_strDay = document.getElementById("StartDay").value;
    }

    function end_month_change(){
      var month = document.getElementById("EndMonth").value;
      var max_days ;
      var currDay;
      max_days = ssp_days_per_month(month);

      document.getElementById("EndDay").options.length = 0;
      for (var i = 1; i<= max_days; i++)
      {
        document.getElementById("EndDay").options.add(new Option(i,i));
      }
      currDay = '1';
      currDay = parseInt(currDay);
      if(month == parseInt("11"))
      {
        document.getElementById("EndDay").options[currDay - 1].selected = true;
      }
      else
      {
        document.getElementById("EndDay").options[old_endDay - 1].selected = true;
      }
    }

    $scope.end_month_change = function()
    {
      var month = document.getElementById("EndMonth").value;
      var max_days ;
      var currDay;
      max_days = ssp_days_per_month(month);

      document.getElementById("EndDay").options.length = 0;
      for (var i = 1; i<= max_days; i++)
      {
        document.getElementById("EndDay").options.add(new Option(i,i));
      }
      currDay = '1';
      currDay = parseInt(currDay);
      if(month == parseInt("11"))
      {
        document.getElementById("EndDay").options[currDay - 1].selected = true;
      }
      else
      {
        document.getElementById("EndDay").options[old_endDay - 1].selected = true;
      }
    }

    function get_curr_end_day(){
      old_endDay = document.getElementById("EndDay").value;
    }
    $scope.get_curr_end_day = function()
    {
      old_endDay = document.getElementById("EndDay").value;
    }

    $scope.date_radio_click = function()
    {
      if($("#SystemCfg input[name=CheckStartDate][value='0']").prop("checked"))
      {
        document.getElementById("StartWeekNo").disabled = true;
        document.getElementById("StartWeek").disabled = true;

        document.getElementById("StartDay").disabled = false;
        //将另一个radio项剔除
        document.getElementById("StartWeekNo").style.color = 'grey';
        document.getElementById("StartWeekNo").style.borderColor = 'grey';
        document.getElementById("StartWeek").style.color = 'grey';
        document.getElementById("StartWeek").style.borderColor = 'grey';
      }

      if($("#SystemCfg input[name=CheckStartDate][value='1']").prop("checked"))
      {
        document.getElementById("StartWeekNo").disabled = false;
        document.getElementById("StartWeek").disabled = false;

        document.getElementById("StartDay").disabled = true;
        //将另一个radio项剔除
        document.getElementById("StartDay").style.color = 'grey';
        document.getElementById("StartDay").style.borderColor = 'grey';
      }

      if($("#SystemCfg input[name=CheckEndDate][value='0']").prop("checked"))
      {
        document.getElementById("EndWeekNo").disabled = true;
        document.getElementById("EndWeek").disabled = true;

        document.getElementById("EndDay").disabled = false;
        //将另一个radio项剔除
        document.getElementById("EndWeekNo").style.color = 'grey';
        document.getElementById("EndWeekNo").style.borderColor = 'grey';
        document.getElementById("EndWeek").style.color = 'grey';
        document.getElementById("EndWeek").style.borderColor = 'grey';
      }

      if($("#SystemCfg input[name=CheckEndDate][value='1']").prop("checked"))
      {
        document.getElementById("EndWeekNo").disabled = false;
        document.getElementById("EndWeek").disabled = false;

        document.getElementById("EndDay").disabled = true;
        //将另一个radio项剔除
        document.getElementById("EndDay").style.color = 'grey';
        document.getElementById("EndDay").style.borderColor = 'grey';
      }
    }

    function date_radio_click()
    {
      if($("#SystemCfg input[name=CheckStartDate][value='0']").prop("checked"))
      {
        document.getElementById("StartWeekNo").disabled = true;
        document.getElementById("StartWeek").disabled = true;

        document.getElementById("StartDay").disabled = false;
        //将另一个radio项剔除
        document.getElementById("StartWeekNo").style.color = 'grey';
        document.getElementById("StartWeekNo").style.borderColor = 'grey';
        document.getElementById("StartWeek").style.color = 'grey';
        document.getElementById("StartWeek").style.borderColor = 'grey';
      }

      if($("#SystemCfg input[name=CheckStartDate][value='1']").prop("checked"))
      {
        document.getElementById("StartWeekNo").disabled = false;
        document.getElementById("StartWeek").disabled = false;

        document.getElementById("StartDay").disabled = true;
        //将另一个radio项剔除
        document.getElementById("StartDay").style.color = 'grey';
        document.getElementById("StartDay").style.borderColor = 'grey';
      }

      if($("#SystemCfg input[name=CheckEndDate][value='0']").prop("checked"))
      {
        document.getElementById("EndWeekNo").disabled = true;
        document.getElementById("EndWeek").disabled = true;

        document.getElementById("EndDay").disabled = false;
        //将另一个radio项剔除
        document.getElementById("EndWeekNo").style.color = 'grey';
        document.getElementById("EndWeekNo").style.borderColor = 'grey';
        document.getElementById("EndWeek").style.color = 'grey';
        document.getElementById("EndWeek").style.borderColor = 'grey';
      }

      if($("#SystemCfg input[name=CheckEndDate][value='1']").prop("checked"))
      {
        document.getElementById("EndWeekNo").disabled = false;
        document.getElementById("EndWeek").disabled = false;

        document.getElementById("EndDay").disabled = true;
        //将另一个radio项剔除
        document.getElementById("EndDay").style.color = 'grey';
        document.getElementById("EndDay").style.borderColor = 'grey';
      }
    }
  }])

  .controller('ActionUrlCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var oPortNum;
    var sPortNum;
    MM_callJS('Admin');
    function MM_callJS(user)
    {
      mouse_click();
    }
    $rootScope.ActionUrlFormCheck = function()
    {
      for(var i = 0;i<7;i++)
      {
        if ( document.getElementById(("event"+i)).value.length>128)
        {
          alert("Action URL的长度必须小于128!");
          return false;
        }
      }
      return true;
    }
    $scope.mouse_click = function(){}
    function mouse_click(){}
  }])

  .controller('WildProxyRegCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var g_PortInfo = eval("(" + "{port0:{index:0, pc:'6001', sc:' '},port1:{index:1, pc:'6002', sc:' '},port2:{index:2, pc:'6003', sc:' '},port3:{index:3, pc:'6004', sc:' '},port4:{index:4, pc:'6005', sc:' '},port5:{index:5, pc:'6006', sc:' '},port6:{index:6, pc:'6007', sc:' '},port7:{index:7, pc:'6008', sc:' '},port8:{index:8, pc:'6009', sc:' '},port9:{index:9, pc:'6010', sc:' '},port10:{index:10, pc:'6011', sc:' '},port11:{index:11, pc:'6012', sc:' '},port12:{index:12, pc:'6013', sc:' '},port13:{index:13, pc:'6014', sc:' '},port14:{index:14, pc:'6015', sc:' '},port15:{index:15, pc:'6016', sc:' '},portcnt:16, pg0:{index:0, pc:' ', sc:' '},pg1:{index:1, pc:' ', sc:' '},pg2:{index:2, pc:' ', sc:' '},pg3:{index:3, pc:' ', sc:' '},pg4:{index:4, pc:' ', sc:' '},pg5:{index:5, pc:' ', sc:' '},pg6:{index:6, pc:' ', sc:' '},pg7:{index:7, pc:' ', sc:' '},pg8:{index:8, pc:' ', sc:' '},pg9:{index:9, pc:' ', sc:' '},pg10:{index:10, pc:' ', sc:' '},pg11:{index:11, pc:' ', sc:' '},pg12:{index:12, pc:' ', sc:' '},pg13:{index:13, pc:' ', sc:' '},pg14:{index:14, pc:' ', sc:' '},pg15:{index:15, pc:' ', sc:' '},pgcnt:16 }" + ")");
    /*
     var g_Wildcard = eval("(" + "{item0:{index:0,master_account:'5054',slave_count:2,slave_account0:'14801',slave_account1:'14802'},item1:{index:1, master_account:'5050',slave_count:3,slave_account0:'5051',slave_account1:'5052',slave_account2:'5053'},count:2}" + ")");
     var g_PortInfo = eval("(" + "{port0:{index:0, pc:'14800', sc:' '},port1:{index:1, pc:'14801', sc:' '},port2:{index:2, pc:'14802', sc:' '},port3:{index:3, pc:'5050', sc:' '},port4:{index:4, pc:'5051', sc:' '},port5:{index:5, pc:'5052', sc:' '},port6:{index:6, pc:'5053', sc:' '},port7:{index:7, pc:'5054', sc:' '},portcnt:8, pg0:{index:0, pc:' ', sc:' '},pg1:{index:1, pc:' ', sc:' '},pg2:{index:2, pc:' ', sc:' '},pg3:{index:3, pc:' ', sc:' '},pg4:{index:4, pc:' ', sc:' '},pg5:{index:5, pc:' ', sc:' '},pg6:{index:6, pc:' ', sc:' '},pg7:{index:7, pc:' ', sc:' '},pgcnt:8}" + ")");
     */
    var g_objArrayMaster = new Array();
    var g_objArraySlave = new Array();
    var g_objArrayAll = new Array();
    var g_blDisplayMode = 0;
    var g_blModifyFlag = false;

    var data= []; //用于添加数据时缓存的数组
    var g_Wildcard = []; //用于存储显示已添加的数组

    MM_callJS('Admin');
    function MM_callJS(user)
    {
      for (var i=0; i<g_PortInfo.portcnt; i++)
      {
        g_objArrayAll.push(eval("g_PortInfo.port" + i + ".pc"));
        g_objArrayAll.push(eval("g_PortInfo.port" + i + ".sc"));
      }

      for (var i=0; i<g_PortInfo.pgcnt; i++)
      {
        g_objArrayAll.push(eval("g_PortInfo.pg" + i + ".pc"));
        g_objArrayAll.push(eval("g_PortInfo.pg" + i + ".sc"));
      }

      if (0 == g_Wildcard.length)
      {
        document.getElementById("idSpace0").style.display = "";
        document.getElementById("idSpace1").style.display = "";
      }
      else
      {
        document.getElementById("idSpace0").style.display = "none";
        document.getElementById("idSpace1").style.display = "none";
      }


      //清除表单中行
      var num = document.getElementById('WildcardRegBody').rows.length;
      for(var i = 0; i < num - 3 ; i++) {
        document.getElementById("WildcardRegBody").deleteRow(1);
      }

      for (var i=0; i<g_Wildcard.length; i++)
      {
        /* Init global param */
        g_objArrayMaster.push(eval("g_Wildcard['" + i + "'].master_account"));

        for (var j=0; j<eval("g_Wildcard['" + i + "'].slave_count").length; j++)
        {
          g_objArraySlave.push(eval("g_Wildcard['" + i + "'].slave_count['" + j + "']"));
        }

        /* init UI */
        var objTableRow = document.getElementById("WildcardRegBody").insertRow(i+1);
        var cell0 = objTableRow.insertCell(0);
        var cell1 = objTableRow.insertCell(1);
        var cell2 = objTableRow.insertCell(2);

        cell0.align = "center";
        cell1.align = "center";
        cell2.align = "center";
        cell2.style.padding = "5px;"

        cell0.innerHTML = "<input type='checkbox' id='Item" + i + "' name='Item" + eval("g_Wildcard['" + i + "'].index") + "' ng-click='OnMouseClick()' />";
        cell1.innerHTML = eval("g_Wildcard['" + i + "'].master_account");

        var sel = document.createElement("select");
        for (var j=0; j<eval("g_Wildcard['" + i + "'].slave_count").length; j++)
        {
          var opt = new Option(eval("g_Wildcard['" + i + "'].slave_count['" + j + "']"), j);
          sel.options.add(opt);
        }

        sel.className = "list";
        sel.size = 4;

        cell2.appendChild(sel);
      }
      data=[];
      OnMouseClick();
    }

    $scope.OnMouseClick = function ()
    {
      var SelectedRows = 0;

      for (var i=0; i<g_Wildcard.length; i++)
      {
        if(document.getElementById("Item" + i)){
          if (document.getElementById("Item" + i).checked)
          {
            SelectedRows++;
          }
        }
      }
      if (SelectedRows == 0)
      {
        document.getElementById("Mod").disabled = true;
        document.getElementById("Del").disabled = true;
      }
      else if (SelectedRows == 1)
      {
        document.getElementById("Mod").disabled = false;
        document.getElementById("Del").disabled = false;
      }
      else
      {
        document.getElementById("Mod").disabled = true;
        document.getElementById("Del").disabled = false;
      }
    }

    function OnMouseClick()
    {
      var SelectedRows = 0;

      for (var i=0; i<g_Wildcard.length; i++)
      {
        if(document.getElementById("Item" + i)){
          if (document.getElementById("Item" + i).checked)
          {
            SelectedRows++;
          }
        }
      }
      if (SelectedRows == 0)
      {
        document.getElementById("Mod").disabled = true;
        document.getElementById("Del").disabled = true;
      }
      else if (SelectedRows == 1)
      {
        document.getElementById("Mod").disabled = false;
        document.getElementById("Del").disabled = false;
      }
      else
      {
        document.getElementById("Mod").disabled = true;
        document.getElementById("Del").disabled = false;
      }
    }

    $scope.OnConfigurePorts = function(action)
    {
      var objArrayAccounts;

      document.getElementById("MasterAcc").options.length = 0;
      document.getElementById("SlaveAccSelected").options.length = 0;

      if ("modify" == action)
      {
        var SelectedRows = 0;

        for ( var i=0; i<g_Wildcard.count; i++)
        {
          if (document.getElementById("Item" + i).checked)
          {
            break;
          }
        }

        document.getElementById("MasterAcc").options.add(new Option(eval("g_Wildcard.item" + i + ".master_account"), i));

        for (var j=0; j<eval("g_Wildcard.item" + i + ".slave_count"); j++)
        {
          document.getElementById("SlaveAccSelected").options.add(new Option(eval("g_Wildcard.item" + i + ".slave_account" + j), i));
        }

        g_blModifyFlag = true;
      }

      if ("add" == action)
      {
        document.getElementById('divMsg').style.display = '';
        g_blModifyFlag = false;
      }

      if("" == action){
        document.getElementById('divMsg').style.display = 'none';
      }

      objArrayAccounts = GetAvailableAccs();

      for (var i=0; i<objArrayAccounts.length; i++)
      {
        document.getElementById("MasterAcc").options.add(new Option(objArrayAccounts[i], i));
        //document.getElementById("SlaveAccAvailable").options.add(new Option(objArrayAccounts[i], i));
      }

      OnMasterAccountChanged();

      if (g_blDisplayMode == 0)
      {
        document.body.id = "msgBody";
        g_blDisplayMode = 1;
      }
      else
      {
        document.body.id = "";
        g_blDisplayMode = 0;
      }
    }

    function GetAvailableAccs()
    {
      var objArrayAccs = new Array();
      var blExistFlag = true;

      for (var i=0; i<g_objArrayAll.length; i++)
      {
        if (g_objArrayAll[i].charAt(0) == ' ')
        {
          continue;
        }

        for (var j=0, blExistFlag=false; j<g_objArrayMaster.length; j++)
        {
          if (g_objArrayAll[i] == g_objArrayMaster[j])
          {
            blExistFlag = true;
            break;
          }
        }
        if (blExistFlag)
        {
          continue;
        }

        for (var j=0, blExistFlag=false; j<g_objArraySlave.length; j++)
        {
          if (g_objArrayAll[i] == g_objArraySlave[j])
          {
            blExistFlag = true;
            break;
          }
        }
        if (blExistFlag)
        {
          continue;
        }

        objArrayAccs.push(g_objArrayAll[i]);
      }
      return objArrayAccs;
    }

    $scope.OnMasterAccountChanged = OnMasterAccountChanged();
    function OnMasterAccountChanged()
    {
      var i;
      var opts = document.getElementById("MasterAcc").options;
      var SelectIndex = document.getElementById("MasterAcc").selectedIndex;

      document.getElementById("SlaveAccAvailable").options.length = 0;

      for (var i=0; i<opts.length; i++)
      {
        if (i == SelectIndex)
        {
          continue;
        }
        document.getElementById("SlaveAccAvailable").options.add(new Option(opts[i].text, i));
      }
    }

    $scope.OnAccountModifyed = function(action){
      var CurrentIndex;
      var CurrentOption;
      var i;

      if (action == "del")
      {
        CurrentIndex = document.getElementById("SlaveAccSelected").selectedIndex;
        CurrentOption = document.getElementById("SlaveAccSelected").options[CurrentIndex];

        document.getElementById("MasterAcc").options.add(new Option(CurrentOption.text, document.getElementById("MasterAcc").options.length));
        document.getElementById("SlaveAccAvailable").options.add(new Option(CurrentOption.text, document.getElementById("SlaveAccAvailable").options.length));
        document.getElementById("SlaveAccSelected").options.remove(CurrentIndex);
      }
      else if (action == "add")
      {
        if(document.getElementById("SlaveAccAvailable").options[document.getElementById("SlaveAccAvailable").selectedIndex]){
          var CurrentAccount = document.getElementById("SlaveAccAvailable").options[document.getElementById("SlaveAccAvailable").selectedIndex].text;
          document.getElementById("SlaveAccSelected").options.add(new Option(CurrentAccount, document.getElementById("SlaveAccSelected").options.length));
        }

        for (i=0; i<document.getElementById("MasterAcc").options.length; i++)
        {
          if (document.getElementById("MasterAcc").options[i].text == CurrentAccount)
          {
            document.getElementById("MasterAcc").options.remove(i);
            break;
          }
        }

        for (i=0; i<document.getElementById("SlaveAccAvailable").options.length; i++)
        {
          if (document.getElementById("SlaveAccAvailable").options[i].text == CurrentAccount)
          {
            document.getElementById("SlaveAccAvailable").options.remove(i);
            break;
          }
        }
      }
    }

    $scope.OnSaveData = function()
    {
      var strSlaveAccs = "";
      var i;

      document.getElementById("MasterAccou").value = document.getElementById("MasterAcc").options[document.getElementById("MasterAcc").selectedIndex].text;
      var MasterAccou = document.getElementById("MasterAccou").value ;

      if(document.getElementById("SlaveAccSelected").options.length > 0){
        for (var i=0; i<document.getElementById("SlaveAccSelected").options.length - 1; i++)
        {
          strSlaveAccs += document.getElementById("SlaveAccSelected").options[i].text + "|";
        }
        strSlaveAccs += document.getElementById("SlaveAccSelected").options[document.getElementById("SlaveAccSelected").options.length - 1].text;
        document.getElementById("SlaveAccou").value = strSlaveAccs;
        strSlaveAccs = strSlaveAccs.split('|');

        data.push({master_account:MasterAccou,slave_count:strSlaveAccs}) //放置在一个数组中
        g_Wildcard.push(data[0]);
        document.getElementById('divMsg').style.display = 'none';
      }

      MM_callJS();
    }

    $scope.OnDeleteData = function()
    {
      var Items = g_Wildcard;
      for (var i=0; i<Items.length; i++)
      {
        if(document.getElementById("Item" + i)){
          if (document.getElementById("Item" +i).checked == true)
          {
            g_Wildcard.splice(i,1);
          }
        }
      }
      MM_callJS();
    }
  }])

  .controller('PortGroupCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var currentpage =-1;
    var pagenum = 0;
    var RowCount = 0;
    var TableSize = 0;
    var g_jDevInfo = eval("(" + "{DevType:'normal', TotalPorts:16, TotalSlots:0, PortsPerSlot:0, SlotMap:''}" + ")");
    var g_user;

    MM_callJS('0', '1','0', '16', '0','Admin');
    function MM_callJS(rownum,currentpageno,allpagenum, tblSize, curEntrys,user)
    {
      var i = 0;
      var idPortGroup;
      var PageIndex = "";
      var PageNo   = "";
      g_user = user;
      RowCount = parseInt(rownum);
      pagenum = parseInt(allpagenum);
      currentpage = parseInt(currentpageno)-1;
      TableSize = parseInt(tblSize);
      var  CurEntrys = parseInt(curEntrys);
      if (CurEntrys >= TableSize)
      {
        document.getElementById('Add').disabled = true;
      }

      document.getElementById('page').length = pagenum;
      for (i = 0; i < pagenum; i ++)
      {
        PageIndex="第 "+ (i + 1) + " 页";
        PageNo = ""+ i;
        document.getElementById('page').options[i].text = PageIndex;
        document.getElementById('page').options[i].value = PageNo;
        document.getElementById('page').options[i].selected = false;
      }

      for (i = 0; i < RowCount;i ++)
      {
        var preClassName="";
        if (i > 0)
        {
          idPortGroup = "idPortGroup" + (i-1);
          preClassName = document.getElementById(idPortGroup).className;
        } else {
          document.getElementById("idPortGroup0").className="";
        }
        idPortGroup = "idPortGroup" + i;
        document.getElementById(idPortGroup).style.display="";
        if( i > 0)
          document.getElementById(idPortGroup).className = preClassName?"":"interval";
      }
      if(RowCount>0) {
        document.getElementById("last").style.display="none";
        document.getElementById("PortGroupNone").style.display="none";
        var lastClassName = document.getElementById(idPortGroup).className;
        document.getElementById("last").className = lastClassName?"":"interval";
      } else {
        document.getElementById("last").className = "interval";
      }

      if (pagenum==0)
      {
        document.getElementById('page').disabled = true;
      }
      else
      {
        document.getElementById('page').options[currentpage].selected = true;
      }

      var idName, Name;
      for (i=0; i<RowCount; i++)
      {
        idName = "idDesc"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idPrimSipAcc"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idPrimAuthID"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idPrimDisplayName"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idSecondSipAcc"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idSecondAuthID"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idSecondDisplayName"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        idName = "idHotLine"+i;
        Name = document.getElementById(idName);
        if (null != Name)
        {
          Name.title = Name.innerHTML;
        }

        if (g_jDevInfo.DevType != "dag3000")
        {
          idName = "idDestPrefix"+i;
          Name = document.getElementById(idName);
          if (null != Name)
          {
            Name.innerHTML = document.getElementById("PortGroupHidden" + i).value;
            Name.title = document.getElementById("PortGroupHidden" + i).value;
          }
        }
        else
        {
          idName = "idDestPrefix"+i;
          Name = document.getElementById(idName);
          if (null != Name)
          {
            Name.innerHTML = "......";
          }
        }
      }

      mouse_click();
    }

    function mouse_click()
    {
      var i = 0,Selectcount = 0;

      for (i = 0; i < RowCount;i++)
      {
        if (eval("document.forms[0].PortGroupEnable"+i+".checked") == true)
        {
          Selectcount++;
        }
      }

      if (Selectcount==1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = false;
      }
      else if (Selectcount>1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = true;
      }
      else
      {
        document.getElementById('Del').disabled = true;
        document.getElementById('Mod').disabled = true;
      }

      if (RowCount >= TableSize)
      {
        document.forms[0].Add.disabled = true;
      }
    }

    function doRefresh()
    {
      document.forms[0].action="/goform/EiaPortGroupChange";
      for (i = 0; i < pagenum; i++)
      {
        if (document.getElementById('page').options[i].selected == true)
        {
          document.forms[0].curpage.value = ""+i;
          break;
        }
      }
      document.forms[0].submit();
    }
    function AddData()
    {
      location.href = "PortGroupAdd.htm";
    }
    function DelData()
    {
      if(confirm("确认删除?"))
      {
        document.forms[0].action="/goform/EiaPortGroupGoDel";
        return true;
      }
      return false;
    }

    function ModData()
    {
      document.forms[0].action="/goform/EiaPortGroupGoMod";
      document.forms[0].submit();
    }
    function displayex(id)
    {
      for (i=0; i<g_jDevInfo.TotalPorts; i++)
      {
        document.getElementById("PortBox" + i).style.backgroundColor = "#CCC";
      }

      var PortMap = document.getElementById("PortGroupHidden" + id).value;
      var PortList = PortMap.split(",");
      for (i=0; i<PortList.length - 1; i++)
      {
        document.getElementById("PortBox" + PortList[i]).style.backgroundColor = "#0F0";
      }

      var BOX = getElementPos("idDestPrefix" + id);
      var Y = document.getElementById("idDestPrefix" + id).scrollHeight;
      document.getElementById("ex").style.left = (BOX.x - 100)+ "px";
      document.getElementById("ex").style.top = BOX.y + Y + "px";
      document.getElementById("ex").style.display = "";
    }

    function hiddenex()
    {
      document.getElementById("ex").style.display = "none";
    }
  }])

  .controller('IPTrunkCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var currentpage =-1;
    var pagenum = 0;
    var RowCount = 0;
    var TableSize = 0;
    var g_user;

    MM_callJS('0', '1','0', '128', '0','Admin');
    function MM_callJS(rownum,currentpageno,allpagenum, tblSize, curEntry,user)
    {
      var i = 0;
      var idIpCfg;
      var PageIndex = "";
      var PageNo   = "";
      g_user = user;
      RowCount = parseInt(rownum);
      pagenum = parseInt(allpagenum);
      currentpage = parseInt(currentpageno)-1;
      TableSize = parseInt(tblSize);
      var CurEntrys = parseInt(curEntry);
      if (CurEntrys >= TableSize)
      {
        document.getElementById('Add').disabled = true;
      }
      document.getElementById('page').length = pagenum;
      for (i = 0; i < pagenum; i ++)
      {
        PageIndex="第 "+ (i + 1) + " 页";
        PageNo = ""+ i;
        document.getElementById('page').options[i].text = PageIndex;
        document.getElementById('page').options[i].value = PageNo;
        document.getElementById('page').options[i].selected = false;
      }

      for (i = 0; i < RowCount;i ++)
      {
        var preClassName="";
        if (i > 0)
        {
          idIpCfg = "idIpCfg" + (i-1);
          preClassName = document.getElementById(idIpCfg).className;
        } else
        {
          document.getElementById("idIpCfg0").className="";
        }
        idIpCfg = "idIpCfg" + i;
        document.getElementById(idIpCfg).style.display="";
        if( i > 0)
          document.getElementById(idIpCfg).className = preClassName?"":"interval";
      }
      if(RowCount>0)
      {
        document.getElementById("last").style.display="none";
        document.getElementById("IpCfgNone").style.display="none";
        var lastClassName = document.getElementById(idIpCfg).className;
        document.getElementById("last").className = lastClassName?"":"interval";
      } else
      {
        document.getElementById("last").className = "interval";
      }

      if (pagenum==0)
      {
        document.getElementById('page').disabled = true;
      }
      else
      {
        document.getElementById('page').options[currentpage].selected = true;
      }

      var idName, Name;
      var idFieldArray = new Array("idDomain","idPort","idDesc");
      for (i=0; i<RowCount; i++)
      {
        for(var j in idFieldArray)
        {
          idName = idFieldArray[j]+i;
          Name = document.getElementById(idName);
          if (null != Name)
          {
            Name.title = Name.innerHTML;
          }
        }
      }

      mouse_click();
    }

    function mouse_click()
    {
      var i = 0,Selectcount = 0;

      for (i = 0; i < RowCount;i++)
      {
        if (eval("document.forms[0].IPTrunkEnable"+i+".checked") == true)
        {
          Selectcount++;
        }
      }

      if (Selectcount==1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = false;
      }
      else if (Selectcount>1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = true;
      }
      else
      {
        document.getElementById('Del').disabled = true;
        document.getElementById('Mod').disabled = true;
      }

      if (RowCount >= TableSize)
      {
        document.forms[0].Add.disabled = true;
      }

      if(g_user == "Guest")
      {
        DisableButton();
      }
    }

    $scope.AddData = function()
    {
      $rootScope.href_click('IPTrunk');
    }
    $scope.DelData = function()
    {
      if(confirm("确认删除吗?"))
      {
        return true;
      }
      return false;
    }

  }])

  .controller('RouteIP2PSTNParamCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var g_IP2IPSupport = "true";
    MM_callJS('no','Admin');
    function MM_callJS(IsSinglePort,user)
    {
      if (IsSinglePort != "yes")
      {
        document.getElementById("IP2TelParam").style.display = "";
      }

      if ("true" == g_IP2IPSupport)
      {
        document.getElementById("idIP2IPRouteEnable").style.display = "";
        document.getElementById("idSpace0").style.display = "";
      }
    }
  }])

  .controller('RouteIP2PSTNCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var currentpage =-1;
    var pagenum = 0;
    var RowCount = 0;
    var TableSize = 0;
    var g_user;

    MM_callJS('0', '1','0','128', '0','Admin');
    function MM_callJS(rownum,currentpageno,allpagenum, tblSize, allRowNum,user)
    {	
      var i = 0;
      var idRouteIP2PSTN;
      var PageIndex = "";
      var PageNo   = "";
      g_user = user;
      RowCount = parseInt(rownum);
      pagenum = parseInt(allpagenum);
      currentpage = parseInt(currentpageno)-1;
      TableSize = parseInt(tblSize);
      var AllRowNum = parseInt(allRowNum);

      if (AllRowNum >= TableSize)
      {
        document.getElementById("Add").disabled = true;
      }

      document.getElementById('page').length = pagenum;
      for (i = 0; i < pagenum; i ++)
      {
        PageIndex="第 "+ (i + 1) + " 页";
        PageNo = ""+ i;
        document.getElementById('page').options[i].text = PageIndex;
        document.getElementById('page').options[i].value = PageNo;
        document.getElementById('page').options[i].selected = false;
      }

      for (i = 0; i < RowCount;i ++)
      {
        var preClassName="";
        if (i > 0)
        {
          idRouteIP2PSTN = "idRouteIP2PSTN" + (i-1);
          preClassName = document.getElementById(idRouteIP2PSTN).className;
        } else
        {
          document.getElementById("idRouteIP2PSTN0").className="";
        }
        idRouteIP2PSTN = "idRouteIP2PSTN" + i;
        document.getElementById(idRouteIP2PSTN).style.display="";
        if( i > 0)
          document.getElementById(idRouteIP2PSTN).className = preClassName?"":"interval";
      }
      if(RowCount>0)
      {
        document.getElementById("last").style.display="none";
        document.getElementById("RouteIP2PSTNNone").style.display="none";
        var lastClassName = document.getElementById(idRouteIP2PSTN).className;
        document.getElementById("last").className = lastClassName?"":"interval";
      } else
      {
        document.getElementById("last").className = "interval";
      }

      if (pagenum==0)
      {
        document.getElementById('page').disabled = true;
      }
      else
      {
        document.getElementById('page').options[currentpage].selected = true;
      }

      var idName, Name;
      var idFieldArray = new Array("idDesc","idSrcPrefix","idSrcTrunk","idDestPrefix","idDestTrunk");
      for (i=0; i<RowCount; i++)
      {
        for(var j in idFieldArray)
        {
          idName = idFieldArray[j]+i;
          Name = document.getElementById(idName);
          if (null != Name)
          {
            Name.title = esc_transform(Name.innerHTML);
          }
        }
      }
      mouse_click();
    }

    function mouse_click()
    {
      var i = 0,Selectcount = 0;

      for (i = 0; i < RowCount;i++)
      {
        if (eval("document.forms[0].RouteIP2PSTNEnable"+i+".checked") == true)
        {
          Selectcount++;
        }
      }

      if (Selectcount==1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = false;
      }
      else if (Selectcount>1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = true;
      }
      else
      {
        document.getElementById('Del').disabled = true;
        document.getElementById('Mod').disabled = true;
      }

      if (RowCount >= TableSize)
      {
        document.forms[0].Add.disabled = true;
      }
    }

    function doRefresh()
    {
      document.forms[0].action="/goform/EiaRouteIP2PSTNChange";
      for (i = 0; i < pagenum; i++)
      {
        if (document.getElementById('page').options[i].selected == true)
        {
          document.forms[0].curpage.value = ""+i;
          break;
        }
      }
      document.forms[0].submit();
    }
    function AddData()
    {
      location.href = "RouteIP2PSTNAdd.htm";
    }
    function DelData()
    {
      if(confirm("确认删除吗?"))
      {
        document.forms[0].action="/goform/EiaRouteIP2PSTNGoDel";
        return true;
      }
      return false;
    }

    function ModData()
    {
      document.forms[0].action="/goform/EiaRouteIP2PSTNGoMod";
      document.forms[0].submit();
    }
  }])

  .controller('RoutePSTN2IPCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var currentpage =-1;
    var pagenum = 0;
    var RowCount = 0;
    var TableSize = 0;
    var g_user;

    MM_callJS('0', '1','0','128','no', '0','Admin');
    function MM_callJS(rownum,currentpageno,allpagenum, tblSize, IsSinglePort, allRowNum,user)
    {
      var i = 0;
      var idRoutePSTN2IP;
      var PageIndex = "";
      var PageNo   = "";
      g_user = user;
      RowCount = parseInt(rownum);
      pagenum = parseInt(allpagenum);
      currentpage = parseInt(currentpageno)-1;
      TableSize = parseInt(tblSize);
      var AllRowNum = parseInt(allRowNum);

      if (AllRowNum >= TableSize)
      {
        document.getElementById("Add").disabled = true;
      }

      document.getElementById('page').length = pagenum;
      for (i = 0; i < pagenum; i ++)
      {
        PageIndex="第 "+ (i + 1) + " 页";
        PageNo = ""+ i;
        document.getElementById('page').options[i].text = PageIndex;
        document.getElementById('page').options[i].value = PageNo;
        document.getElementById('page').options[i].selected = false;
      }

      for (i = 0; i < RowCount;i ++)
      {
        var preClassName="";
        if (i > 0)
        {
          idRoutePSTN2IP = "idRoutePSTN2IP" + (i-1);
          preClassName = document.getElementById(idRoutePSTN2IP).className;
        } else {
          document.getElementById("idRoutePSTN2IP0").className="";
        }
        idRoutePSTN2IP = "idRoutePSTN2IP" + i;
        document.getElementById(idRoutePSTN2IP).style.display="";
        if( i > 0)
          document.getElementById(idRoutePSTN2IP).className = preClassName?"":"interval";
      }
      if(RowCount>0) {
        document.getElementById("last").style.display="none";
        document.getElementById("RoutePSTN2IPNone").style.display="none";
        var lastClassName = document.getElementById(idRoutePSTN2IP).className;
        document.getElementById("last").className = lastClassName?"":"interval";
      } else {
        document.getElementById("last").className = "interval";
      }

      if (pagenum==0)
      {
        document.getElementById('page').disabled = true;
      }
      else
      {
        document.getElementById('page').options[currentpage].selected = true;
      }

      var idName, Name;
      var idFieldArray = new Array("idDesc","idSrcPrefix","idSrcTrunk","idDestPrefix","idDestTrunk");
      for (i=0; i<RowCount; i++)
      {
        for(var j in idFieldArray)
        {
          idName = idFieldArray[j]+i;
          Name = document.getElementById(idName);
          if (null != Name)
          {
            Name.title = esc_transform(Name.innerHTML);
          }
        }
      }

      if (IsSinglePort != "yes")
      {
        document.getElementById("idSrcPortTitle").style.display="";
        document.getElementById("idSrcPortRail").style.display="";
        document.getElementById("idSrcPortBlank").style.display="";

        var SrcTrunk;
        for (i=0; i<RowCount; i++)
        {
          SrcTrunk = "idSrcTrunk" + i;
          document.getElementById(SrcTrunk).style.display="";
        }
      }
      mouse_click();
    }

    function mouse_click()
    {
      var i = 0,Selectcount = 0;

      for (i = 0; i < RowCount;i++)
      {
        if (eval("document.forms[0].RoutePSTN2IPEnable"+i+".checked") == true)
        {
          Selectcount++;
        }
      }

      if (Selectcount==1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = false;
      }
      else if (Selectcount>1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = true;
      }
      else
      {
        document.getElementById('Del').disabled = true;
        document.getElementById('Mod').disabled = true;
      }

      if (RowCount >= TableSize)
      {
        document.forms[0].Add.disabled = true;
      }
      if(g_user == "Guest")
      {
        DisableButton();
      }
    }

    function doRefresh()
    {
      document.forms[0].action="/goform/EiaRoutePSTN2IPChange";
      for (i = 0; i < pagenum; i++)
      {
        if (document.getElementById('page').options[i].selected == true)
        {
          document.forms[0].curpage.value = ""+i;
          break;
        }
      }
      document.forms[0].submit();
    }
    function AddData()
    {
      location.href = "RoutePSTN2IPAdd.htm";
    }
    function DelData()
    {
      if(confirm("确认删除吗?"))
      {
        document.forms[0].action="/goform/EiaRoutePSTN2IPGoDel";
        return true;
      }
      return false;
    }

    function ModData()
    {
      document.forms[0].action="/goform/EiaRoutePSTN2IPGoMod";
      document.forms[0].submit();
    }
  }])

  .controller('RouteIP2IPCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var currentpage =-1;
    var pagenum = 0;
    var RowCount = 0;
    var TableSize = 0;

    MM_callJS('0', '1','0','128', '0','Admin');
    function MM_callJS(rownum,currentpageno,allpagenum, tblSize, allRowNum,user)
    {
      var i = 0;
      var idRouteIP2IP;
      var PageIndex = "";
      var PageNo   = "";
      RowCount = parseInt(rownum);
      pagenum = parseInt(allpagenum);
      currentpage = parseInt(currentpageno)-1;
      TableSize = parseInt(tblSize);
      var AllRowNum = parseInt(allRowNum);

      if (AllRowNum >= TableSize)
      {
        document.getElementById("Add").disabled = true;
      }

      document.getElementById('page').length = pagenum;
      for (i = 0; i < pagenum; i ++)
      {
        PageIndex="第 "+ (i + 1) + " 页";
        PageNo = ""+ i;
        document.getElementById('page').options[i].text = PageIndex;
        document.getElementById('page').options[i].value = PageNo;
        document.getElementById('page').options[i].selected = false;
      }

      for (i = 0; i < RowCount;i ++)
      {
        var preClassName="";
        if (i > 0)
        {
          idRouteIP2IP = "idRouteIP2IP" + (i-1);
          preClassName = document.getElementById(idRouteIP2IP).className;
        } else
        {
          document.getElementById("idRouteIP2IP0").className="";
        }
        idRouteIP2IP = "idRouteIP2IP" + i;
        document.getElementById(idRouteIP2IP).style.display="";
        if( i > 0)
          document.getElementById(idRouteIP2IP).className = preClassName?"":"interval";
      }
      if(RowCount>0)
      {
        document.getElementById("last").style.display="none";
        document.getElementById("RouteIP2IPNone").style.display="none";
        var lastClassName = document.getElementById(idRouteIP2IP).className;
        document.getElementById("last").className = lastClassName?"":"interval";
      } else
      {
        document.getElementById("last").className = "interval";
      }

      if (pagenum==0)
      {
        document.getElementById('page').disabled = true;
      }
      else
      {
        document.getElementById('page').options[currentpage].selected = true;
      }

      var idName, Name;
      var idFieldArray = new Array("idDesc","idSrcPrefix","idSrcTrunk","idDestPrefix","idDestTrunk");
      for (i=0; i<RowCount; i++)
      {
        for(var j in idFieldArray)
        {
          idName = idFieldArray[j]+i;
          Name = document.getElementById(idName);
          if (null != Name)
          {
            Name.title = esc_transform(Name.innerHTML);
          }
        }
      }
      mouse_click();
    }

    function mouse_click()
    {
      var i = 0,Selectcount = 0;

      for (i = 0; i < RowCount;i++)
      {
        if (eval("document.forms[0].RouteIP2IPEnable"+i+".checked") == true)
        {
          Selectcount++;
        }
      }

      if (Selectcount==1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = false;
      }
      else if (Selectcount>1)
      {
        document.getElementById('Del').disabled = false;
        document.getElementById('Mod').disabled = true;
      }
      else
      {
        document.getElementById('Del').disabled = true;
        document.getElementById('Mod').disabled = true;
      }

      if (RowCount >= TableSize)
      {
        document.forms[0].Add.disabled = true;
      }
    }

    function doRefresh()
    {
      document.forms[0].action="/goform/EiaRouteIP2IPChange";
      for (i = 0; i < pagenum; i++)
      {
        if (document.getElementById('page').options[i].selected == true)
        {
          document.forms[0].curpage.value = ""+i;
          break;
        }
      }
      document.forms[0].submit();
    }
    function AddData()
    {
      location.href = "RouteIP2IPAdd.htm";
    }
    function DelData()
    {
      if(confirm("确认删除吗?"))
      {
        document.forms[0].action="/goform/EiaRouteIP2IPGoDel";
        return true;
      }
      return false;
    }

    function ModData()
    {
      document.forms[0].action="/goform/EiaRouteIP2IPGoMod";
      document.forms[0].submit();
    }
  }])

  .controller('TR069ConfigCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    MM_callJS('Admin');
    function MM_callJS(user)
    {
      setTimeout(function(){
        mouse_click();
      },1000)
    }

    function mouse_click(){
      if($("#TR069Enable").prop("checked"))
      {
        document.getElementById("TR069BLANK").style.display = "none";
        document.getElementById("TR069").style.display = "";
        document.getElementById("trBlank").style.display = "";
      }
      else
      {
        document.getElementById("TR069BLANK").style.display = "";
        document.getElementById("TR069").style.display = "none";
        document.getElementById("trBlank").style.display = "none";
      }

      if(document.getElementById("PeriodicEnable").checked)
      {
        document.getElementById("PeriodicInterval").disabled  = false;
      }
      else
      {
        document.getElementById("PeriodicInterval").disabled  = true;
      }
    }

    $scope.mouse_click = function()
    {
      if(document.getElementById("TR069Enable").checked)
      {
        document.getElementById("TR069BLANK").style.display = "none";
        document.getElementById("TR069").style.display = "";
        document.getElementById("trBlank").style.display = "";
      }
      else
      {
        document.getElementById("TR069BLANK").style.display = "";
        document.getElementById("TR069").style.display = "none";
        document.getElementById("trBlank").style.display = "none";
      }

      if(document.getElementById("PeriodicEnable").checked)
      {
        document.getElementById("PeriodicInterval").disabled  = false;
      }
      else
      {
        document.getElementById("PeriodicInterval").disabled  = true;
      }
    }

    function isValidACSURL(ACSURL)
    {
      var index;
      var ip,ipStartIndex,ipEndIndex;
      var port,portStartIndex,portEndIndex;
      index = ACSURL.indexOf("http://");
      if(index == -1)
      {
        return false;
      }

      ipStartIndex = 7;
      ip = ACSURL.substring(ipStartIndex);
      ipEndIndex = ip.indexOf(":");
      if(ipEndIndex == -1)
      {
        ipEndIndex = ip.indexOf("/");
        if(ipEndIndex == -1)
        {
          ipEndIndex = ip.length;
        }
      }
      else
      {
        portStartIndex = ipStartIndex + ipEndIndex + 1;
        portEndIndex = ip.indexOf("/");
        if(portEndIndex == -1)
        {
          portEndIndex = ip.length;
        }
        portEndIndex = ipStartIndex + portEndIndex;

      }

      ip = ACSURL.substring(ipStartIndex,ipStartIndex+ipEndIndex);
      if(is_ipv4_addr(ip) && !is_ipaddr(ip))
      {
        return false;
      }

      port = ACSURL.substring(portStartIndex,portStartIndex+portEndIndex);
      if(port.length > 0)
      {
        if(parseInt(port) > 65535)
        {
          return false;
        }
      }

      return true;
    }


    function is_ipv4_addr(ip_string)
    {
      var length ;
      length = ip_string.length;
      for (var i = 0; i < length; i++)
      {
        var c = ip_string.charAt(i);
        if (c == '.' || (c >= '0' && c <= '9'))
        {
          continue;
        }
        else
        {
          return false;
        }
      }
      return true;
    }

    $rootScope.TR069ParamFormCheck = function()
    {
      if(document.getElementById("TR069Enable").checked)
      {
        if(document.getElementById('TR069Config').ACSURL.value.length > 0)
        {
          if(isValidACSURL(document.getElementById('TR069Config').ACSURL.value) == false)
          {
            alert("ACS URL不正确,请输入另外一个!(例如. http://172.16.247.85:7547/ACS) !");
            $rootScope.href_click('TR069Param');
            $rootScope.getSelect('ACSURL',16,'form');
            return false;
          }
        }
        else
        {
          alert("请输入ACS URL!");
          $rootScope.href_click('TR069Param');
          $rootScope.getSelect('ACSURL',16,'form');
          return false;
        }

        if(is_number_string(document.getElementById("PeriodicInterval").value,2,8) == false)
        {
          alert("周期连接间隔不正确,请输入数字!");
          $rootScope.href_click('TR069Param');
          $rootScope.getSelect('PeriodicInterval',16,'form');
          return false;
        }

        if(document.getElementById("PeriodicInterval").value < 30)
        {
          alert("周期连接间隔不正确,请输入一个大于30的值!");
          $rootScope.href_click('TR069Param');
          $rootScope.getSelect('PeriodicInterval',16,'form');
          return false;
        }

        if(document.getElementById("ConReqPort").value > 65535 || document.getElementById("ConReqPort").value < 0 || document.getElementById("ConReqPort").value == '')
        {
          alert("连接CPE端口不正确,请输入一个小于65535大于0的值!");
          $rootScope.href_click('TR069Param');
          $rootScope.getSelect('ConReqPort',16,'form');
          return false;
        }
      }
      return true;
    }
  }])

  .controller('NetSNMPParamCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var glbcopycommunityname,glbaccessreadviewname,glbaccesswriteviewname,glbaccessnotifyviewname,glbgroupname;

    MM_callJS('disable','0','Admin');
    function MM_callJS(SnmpEnable,versionChange,user)
    {
      /*add by adam -------begin*/
      var sel,i,serial,curVersion;
      sel=document.getElementById("UserPrivacyPassword0");
      if(sel.value.length==0)
      {
        document.getElementById("UserPrivacyType0").value=0;
      }

      //show page
      if (SnmpEnable == "checked")
      {
        enable = true;
      }
      else if (versionChange == 1)
      {
        var enable = true;
      }
      else
      {
        var enable = false;
      }
      snmp_enable_show(enable);

      /*different brower,different handler*/
//community change
      var newopenCommunityChange = function(serial)
      {
        return function()
        {
          communityNameChange(serial);
        }
      }
      for(i=0;i<3;i++)
      {
        if(navigator.userAgent.indexOf("MSIE")>0)
        {
          document.getElementById("CommunityName"+i).attachEvent("onpropertychange",newopenCommunityChange(i));
        }
        else
        {
          document.getElementById("CommunityName"+i).addEventListener("input",newopenCommunityChange(i),false);
        }
      }
      glbcopycommunityname=new Array();
      for(i=0;i<3;i++)
      {
        glbcopycommunityname[i]=document.getElementById("GroupSecurityname"+i).value;
      }

//group change
      var newopenGroupnameChange = function(serial)
      {
        return function()
        {
          GroupNameChange(serial);
        }
      }
      for(i=0;i<4;i++)
      {
        if(navigator.userAgent.indexOf("MSIE")>0)
        {
          document.getElementById("GroupName"+i).attachEvent("onpropertychange",newopenGroupnameChange(i));
        }
        else
        {
          document.getElementById("GroupName"+i).addEventListener("input",newopenGroupnameChange(i),false);
        }
      }
      glbgroupname=new Array();
      for(i=0;i<3;i++)
      {
        glbgroupname[i]=document.getElementById("AccessGroupName"+i).value;
      }

//viewname change
      var newopenViewnameChange = function(serial)
      {
        return function()
        {
          ViewNameChange(serial);
        }
      }
      for(i=0;i<3;i++)
      {
        if(navigator.userAgent.indexOf("MSIE")>0)
        {
          document.getElementById("ViewName"+i).attachEvent("onpropertychange",newopenViewnameChange(i));
        }
        else
        {
          document.getElementById("ViewName"+i).addEventListener("input",newopenViewnameChange(i),false);
        }
      }
      glbaccessreadviewname=new Array();
      for(i=0;i<4;i++)
      {
        glbaccessreadviewname[i]=document.getElementById("AccessRead"+i).value;
      }

      glbaccesswriteviewname=new Array();
      for(i=0;i<4;i++)
      {
        glbaccesswriteviewname[i]=document.getElementById("AccessWrite"+i).value;
      }

      glbaccessnotifyviewname=new Array();
      for(i=0;i<4;i++)
      {
        glbaccessnotifyviewname[i]=document.getElementById("AccessNotify"+i).value;
      }


//username change
      var newopenUserNameChange = function(serial)
      {
        return function()
        {
          UserNameChange(serial);
        }
      }
      if(navigator.userAgent.indexOf("MSIE")>0)
      {
        document.getElementById("UserName0").attachEvent("onpropertychange",newopenUserNameChange(0));
      }
      else
      {
        document.getElementById("UserName0").addEventListener("input",newopenUserNameChange(0),false);
      }
      return true;
    }

    $rootScope.NetSNMPParamFormCheck = function()
    {
//add by adam ------begin
      var i,j,sel;
      var selcommunity,selsource;
//community
      for(i=0;i<3;i++)
      {
        selcommunity = document.getElementById("CommunityName"+i);
        if(selcommunity.value.length>33)
        {
          alert("共同体名称错误, 输入长度必须小于34!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("CommunityName"+i,0,'id');
          return false;
        }
        selsource = document.getElementById("CommunitySource"+i);
        if(selsource.value.length>269)
        {
          alert("共同体源地址错误, 输入长度必须小于270!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("CommunitySource"+i,0,'id');
          return false;
        }

        if(selcommunity.value.length>0)
        {
          if(selsource.value.length==0)
          {
            alert("如果共同体不为空，那么必须输入源地址!");
            $rootScope.href_click('NetSNMPParam');
            $rootScope.getSelect("CommunitySource"+i,0,'id');
            return false;
          }
        }
      }

//group
      var selgroupname,selgroupsecurityname;
      for(i=0;i<4;i++)
      {
        selgroupname = document.getElementById("GroupName"+i);
        if(selgroupname.value.length>33)
        {
          alert("组名称错误, 输入长度必须小于34!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("GroupName"+i,0,'id');
          return false;
        }

        selgroupsecurityname = document.getElementById("GroupSecurityname"+i);
        if(selgroupsecurityname.value.length>33)
        {
          alert("组共同体名错误, 输入长度必须小于34!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("GroupSecurityname"+i,0,'id');
          return false;
        }

        //if GroupName is not null,GroupSecurityname is also not null
        if(selgroupname.value.length>0)
        {
          if(selgroupsecurityname.value == "")
          {
            alert("如果组不为空，组成员不为空，请选择组成员!");
            $rootScope.href_click('NetSNMPParam');
            return false;
          }
        }

        //if GroupSecurityname is not null,GroupName is also not null
        if(selgroupsecurityname.value != "")
        {
          if(selgroupname.value.length == 0)
          {
            alert("如果组成员不为空，组不为空，请选择组!");
            $rootScope.href_click('NetSNMPParam');
            $rootScope.getSelect("GroupName"+i,0,'id');
            return false;
          }
        }
      }

//view
      var selviewname,selviewsubtree,selviewtype;
      for(i=0;i<3;i++)
      {
        selviewname = document.getElementById("ViewName"+i);
        if(selviewname.value.length>33)
        {
          alert("视图名错误, 输入长度必须小于34!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("ViewName"+i,0,'id');
          return false;
        }

        selviewsubtree = document.getElementById("ViewSubtree"+i);
        if(selviewsubtree.value.length>255)
        {
          alert("视图mib树错误，输入长度必须小于256!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("ViewSubtree"+i,0,'id');
          return false;
        }

        sel = document.getElementById("ViewMask"+i);
        if(sel.value.length>33)
        {
          alert("视图掩码错误, 输入长度必须小于34!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("ViewMask"+i,0,'id');
          return false;
        }
        //if viewname is not null,viesubtree is also not null
        selviewtype=document.getElementById("ViewType"+i);
        if(selviewname.value.length>0)
        {
          if(selviewsubtree.value.length==0)
          {
            alert("如果视图名不为空，mib树不为空，请输入mib树的值!");
            $rootScope.href_click('NetSNMPParam');
            $rootScope.getSelect("ViewSubtree"+i,0,'id');
            return false;
          }
          else if(selviewtype.value==0)
          {
            alert("如果视图名不为空，视图类型不为空，请输入视图类型值!");
            return false;
          }
        }
        if(selviewname.value.length==0)
        {
          if(selviewtype.value>0 || selviewsubtree.value.length>0)
          {
            alert("如果视图类型或者视图mib树不为空，视图名不能为空，请输入视图名!");
            $rootScope.href_click('NetSNMPParam');
            $rootScope.getSelect("ViewName"+i,0,'id');
            selviewtype.value=0;
            selviewsubtree.value="";
            return false
          }
        }

      }
//access
      var selaccessgroupname,selaccessseclevel;
      selaccessgroupname = document.getElementById("AccessGroupName"+3);
      selaccessseclevel=document.getElementById("AccessSecleve"+3);
      if(selaccessgroupname.value!="")
      {
        if(selaccessseclevel.value==0)
        {
          alert("如果组不为空，请选择一个安全级别!");
          $rootScope.href_click('NetSNMPParam');
          return false;
        }
      }
      //if group is not null,read/write/notify are also not null
      for(i=0;i<4;i++)
      {
        selaccessgroupname = document.getElementById("AccessGroupName"+i);
        if(selaccessgroupname.value!="")
        {
          if(document.getElementById("AccessRead"+i).value=="")
          {
            alert("如果组不为空，请选择一个读视图!");
            $rootScope.href_click('NetSNMPParam');
            return false;
          }
        }
      }

//user
      var selusername,userauthtype,userprivacytype,seluserauthpassword,seluserprivacypassword;
      selusername = document.getElementById("UserName0");
      if(selusername.value.length>255)
      {
        alert("用户名称错误,输入长度必须小于256!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("UserName0",0,'id');
        return false;
      }

      seluserauthpassword=document.getElementById("UserAuthPassword0");
      if(seluserauthpassword.value.length>255)
      {
        alert("用户认证密码错误，输入长度必须小于256!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("UserAuthPassword0",0,'id');
        return false;
      }
      else if(seluserauthpassword.value.length>0&&seluserauthpassword.value.length<8)
      {
        alert("用户认证密码错误，输入长度必须大于8!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("UserAuthPassword0",0,'id');
        return false;
      }

      userauthtype=document.getElementById("UserAuthType0").value;
      if(userauthtype>0 && userauthtype<3)
      {
        if(seluserauthpassword.value.length==0)
        {
          alert("如果认证类型不为空，认证密码不为空!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("UserAuthPassword0",0,'id');
          return false;
        }
      }

      seluserprivacypassword=document.getElementById("UserPrivacyPassword0");
      if(seluserprivacypassword.value.length>255)
      {
        alert("用户加密密码错误，输入长度必须小于256!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("UserPrivacyPassword0",0,'id');
        return false;
      }
      else if(seluserprivacypassword.value.length>0&&seluserprivacypassword.value.length<8)
      {
        alert("加密密码错误，输入长度必须大于8!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("UserPrivacyPassword0",0,'id');
        return false;
      }

      userprivacytype=document.getElementById("UserPrivacyType0").value;
      if(userprivacytype>0 && userprivacytype<4)
      {
        if(seluserprivacypassword.value.length==0)
        {
          alert("如果加密类型不为空，加密密码也不能为空!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("UserPrivacyPassword0",0,'id');
          return false;
        }
      }
      //if username is not null,other values are not null
      if(document.getElementById("SNMPVersion").value==2)
      {
        if(selusername.value.length>0)
        {
          if(userauthtype==0 )
          {
            alert("如果用户名称不为空，认证类型不为空，请选择认证类型!");
            $rootScope.href_click('NetSNMPParam');
            return false;
          }
        }
      }

      //if access sel is authnoprivacy,the privacypassword is null
      if(selaccessseclevel.value==2)
      {
        if(userprivacytype!=0 || seluserprivacypassword.value.length>0)
        {
          alert("如果安全级别是authnopriv,加密类型和加密密码必须为空");
          $rootScope.href_click('NetSNMPParam');
          return false;
        }
      }

      if(selaccessseclevel.value==3)
      {
        if(userprivacytype ==0 || seluserprivacypassword.value.length==0)
        {
          alert("如果安全级别是authpriv,请选择加密类型和加密密码!");
          $rootScope.href_click('NetSNMPParam');
          return false;
        }
      }

//trap
      var seltrapip,seltrapflag,seltrapcommunity;
      seltrapip=document.getElementById("TrapIP0");
      if(seltrapip.value.length>0 && !is_ipaddr(seltrapip.value))
      {
        alert("请输入陷阱IP地址(例如 192.168.0.100) !");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("TrapIP0",0,'id');
        return false;
      }

      sel=document.getElementById("TrapPort0");
      if(!is_number(sel.value,0,65535))
      {
        alert("请输入陷阱端口，范围为0-65535!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("TrapPort0",0,'id');
        return false;
      }

      seltrapcommunity = document.getElementById("TrapCommunity0");
      if(seltrapcommunity.value.length>33)
      {
        alert("陷阱共同体错误，输入长度必须小于34!");
        $rootScope.href_click('NetSNMPParam');
        $rootScope.getSelect("TrapCommunity0",0,'id');
        return false;
      }

      seltrapflag=document.getElementById("TrapFlag0");
      if(seltrapip.value.length>0)
      {
        if(seltrapflag.value==0)
        {
          alert("如果陷阱IP不为空，请选择陷阱标志!");
          $rootScope.href_click('NetSNMPParam');
          return false;
        }
        if(seltrapcommunity.value.length==0)
        {
          alert("如果陷阱IP不为空，陷阱共同体也不为空!");
          $rootScope.href_click('NetSNMPParam');
          $rootScope.getSelect("TrapCommunity0",0,'id');
          return false;
        }
      }
      /*---------------------end*/
      return true;
    }

    $scope.mouse_click = function()
    {
      var enable;

      if(document.getElementById("IsEnableNETSNMP").checked)
      {
        enable = true;
      }
      else
      {
        enable = false;
      }
      snmp_enable_show(enable);

      return true;
    }


    function snmp_enable_show(SnmpEnable)
    {
      var  version;

      if (SnmpEnable == true)
      {
        document.getElementById("viewcfg").style.display = "";
        document.getElementById("trapcfg").style.display = "";
        document.getElementById("SNMPVertionr").style.display = "";
        version = document.getElementById("SNMPVersion").value;
        SNMPVersionChange_page(version);
      }
      else
      {
        document.getElementById("communitycfg").style.display="none";
        document.getElementById("groupcfg").style.display="none";
        document.getElementById("viewcfg").style.display="none";
        document.getElementById("accesscfg").style.display="none";
        document.getElementById("usercfg").style.display="none";
        document.getElementById("trapcfg").style.display="none";
        document.getElementById("SNMPVertionr").style.display="none";
        document.getElementById("accesscfgv3").style.display="none";
      }
      return true;
    }

    $scope.SNMPVersionChange = function()
    {
      var version;
      version=document.getElementById("SNMPVersion").value;
      SNMPVersionChange_page(version);
    }

    function SNMPVersionChange_page(serial)
    {
      var i;

      document.getElementById("IsEnableNETSNMP").checked = true;
      if(serial==0 || serial==1)
      {
        document.getElementById("groupcfg").style.display = "";
        document.getElementById("usercfg").style.display="none";
        document.getElementById("communitycfg").style.display="";
        //group
        for(i=1;i<4;i++)
        {
          document.getElementById("groupcfg"+i).style.display="";
        }
        document.getElementById("groupcfg4").style.display="none";

        //access
        document.getElementById("accesscfg").style.display="";
        document.getElementById("accesscfgv3").style.display="none";

      }
      else if(serial==2)
      {
        document.getElementById("groupcfg").style.display = "";
        document.getElementById("usercfg").style.display="";
        document.getElementById("communitycfg").style.display="none";
        //group
        for(i=1;i<4;i++)
        {
          document.getElementById("groupcfg"+i).style.display="none";
        }
        document.getElementById("groupcfg4").style.display="";
        //access
        document.getElementById("accesscfg").style.display="none";
        document.getElementById("accesscfgv3").style.display="";
      }

    }

    $scope.AccessSellevelChange = function(serial)
    {
      var  selaccesssellevel;
      selaccesssellevel=document.getElementById("AccessSecleve"+serial);
      if(selaccesssellevel.value==2)
      {
        if(window.confirm("如果选择authnopriv,加密类型和加密密码将会为空,确定吗?")==true)
        {
          //document.getElementById("UserPrivacyType0").disabled=true;
          document.getElementById("UserPrivacyType0").value=0;
          document.getElementById("UserPrivacyPassword0").value="";
          document.getElementById("UserPrivacyPassword0").disabled=true;

        }
        else
        {
          selaccesssellevel.options[0].selected=true;
        }
      }
      else if(selaccesssellevel.value==3)
      {
        //document.getElementById("UserPrivacyType0").disabled=false;
        document.getElementById("UserPrivacyPassword0").disabled=false;
      }
      return true;
    }

    $scope.userPrivacykeyChange = function(serial)
    {
      var  seluserprivacypassword;
      seluserprivacypassword=document.getElementById("UserPrivacyPassword"+serial);
      seluserprivacypassword.value="";
    }

    $scope.userAuthkeyChange = function(serial)
    {
      var  seluserauthpassword;
      seluserauthpassword=document.getElementById("UserAuthPassword"+serial);
      seluserauthpassword.value="";
    }

    $scope.completeCommunity = function(serial)
    {
      var selcommunityname,selone,selother;
      var mySelect,obj;
      var selgroupsecurity;

      selcommunityname=document.getElementById("CommunityName"+serial);
      if(serial==0)
      {
        selone=document.getElementById("CommunityName1");
        selother=document.getElementById("CommunityName2");
        if(selcommunityname.value.length>0&&(selcommunityname.value==selone.value || selcommunityname.value==selother.value))
        {
          alert("组名称不能一样，请重新输入!");
          setTimeout(function() {selcommunityname.focus();}, 0);
          return false;
        }
      }
      else if(serial==1)
      {
        selone=document.getElementById("CommunityName0");
        selother=document.getElementById("CommunityName2");
        if(selcommunityname.value.length>0 && (selcommunityname.value==selone.value || selcommunityname.value==selother.value) )
        {
          alert("组名称不能一样，请重新输入!");
          setTimeout(function() {selcommunityname.focus();}, 0);
          return false;
        }
      }
      else if(serial==2)
      {
        selone=document.getElementById("CommunityName0");
        selother=document.getElementById("CommunityName1");
        if(selcommunityname.value.length>0&&(selcommunityname.value==selone.value || selcommunityname.value==selother.value))
        {
          alert("组名称不能一样，请重新输入!");
          setTimeout(function() {selcommunityname.focus();}, 0);
          return false;
        }
      }
    }

    function communityNameChange(serial)
    {
      var i;
      var  selcommunityname,selsource,selgroupsecurity,selgroupname;
      var  copygroupname;
      var  newOptionGroupsecurity;

      selcommunityname=document.getElementById("CommunityName"+serial);
      selsource=document.getElementById("CommunitySource"+serial);
      if(selcommunityname.value.length==0)//del
      {
        selsource.value="";
      }
      else  if(selcommunityname.value.length>0)  //modify/add
      {
        selsource.value="default";
      }

      //update glbcopycommunityname value
      for(i=0;i<3;i++)
      {
        glbcopycommunityname[i]=document.getElementById("GroupSecurityname"+i).value;
      }

      //community change,three groupsecurity change
      for(i=0;i<3;i++)
      {

        GroupSecurityname_click(i,serial);
      }

      //group is null,add a null and show
      for(i=0;i<3;i++)
      {
        if(document.getElementById("GroupName"+i).value=="")
        {
          var newOption = new Option("","",true);
          document.getElementById("GroupSecurityname"+i).options[3]=newOption;
          document.getElementById("GroupSecurityname"+i).options[3].selected=true;
        }
      }

      return true;
    }

    function GroupSecurityname_click(serial,serialchange)
    {
      var i,newOption;
      var selcomuintyname,selgroupsecurity,selusername,selgroupname;
      selgroupsecurity=document.getElementById("GroupSecurityname"+serial);
      selgroupname=document.getElementById("GroupName"+serial)
      if(serialchange<3)
      {
        /*init*/
        for(i=0;i<3;i++)
        {
          newOption = new Option("","",false);
          selgroupsecurity.options[i]=newOption;
        }
        /*add option*/
        for(i=0;i<3;i++)
        {
          selcomuintyname=document.getElementById("CommunityName"+i);
          if(selcomuintyname.value.length>0)
          {
            newOption = new Option(selcomuintyname.value,selcomuintyname.value,false);
            selgroupsecurity.options[i]=newOption;
          }
        }

        /*select a option*/
        for(i=0;i<3;i++)
        {
          if(selgroupsecurity.options[i].value==glbcopycommunityname[serial])
          {
            selgroupsecurity.options[i].selected=true;
            break;
          }
        }
        if(i==3)
        {
          selgroupsecurity.options[serialchange].selected=true;

          if(selgroupsecurity.options[serialchange].value=="")
          {
            selgroupname.value="";
            GroupNameChange(serial);
          }
        }
        /*	for(i=2;i>-1;i--)
         {
         if(selgroupsecurity.options[i].value=="")
         {
         selgroupsecurity.remove(i);
         }
         }*/
      }

      if(serialchange==3)
      {
        selusername=document.getElementById("UserName0");
        newOption = new Option(selusername.value,selusername.value,false);
        selgroupsecurity[0]=newOption;
        selgroupsecurity.options[0].selected = true;
      }
      return true;
    }


    $scope.GroupSecurityname_focus = function(serial)
    {
      var selgroupsecurity,i,curselect,newOption;
      var selusername;

      selgroupsecurity=document.getElementById("GroupSecurityname"+serial);

      if(serial==3)
      {
        selusername=document.getElementById("UserName0");
        newOption = new Option(selusername.value,selusername.value,false);
        document.getElementById("GroupSecurityname"+serial).options[0].selected = true;
        document.getElementById("GroupSecurityname"+serial).options[0]=newOption;
        return true;
      }

      //touch thing
      for(i=0;i<3;i++)
      {
        communityNameChange(i);
      }

      //default select
      for(i=0;i<3;i++)
      {
        if(selgroupsecurity.options[i].value==glbcopycommunityname[serial])
        {
          curselect=i;
          break;
        }
      }
      selgroupsecurity.selectedIndex=curselect;

      if(document.getElementById("GroupSecurityname"+serial).options.length==4
        &&document.getElementById("GroupSecurityname"+serial).options[3].value=="")
      {
        document.getElementById("GroupSecurityname"+serial).remove(3);
      }

    }

//view change
    function ViewNameChange(serial)
    {
      var i,selviewname,selviewsubtree,selviewtype,selviewmask;

      selviewname = document.getElementById("ViewName"+serial);
      selviewsubtree = document.getElementById("ViewSubtree"+serial);
      selviewmask = document.getElementById("ViewMask"+serial);

      //if viewname is not null,viesubtree is also not null
      selviewtype=document.getElementById("ViewType"+serial);

      if(selviewname.value.length==0)
      {
        selviewsubtree.value="";
        selviewtype.value=0;
        selviewmask.value="";
      }

      //update read view
      for(i=0;i<4;i++)
      {
        glbaccessreadviewname[i]=document.getElementById("AccessRead"+i).value;
      }
      //update write view
      for(i=0;i<4;i++)
      {
        glbaccesswriteviewname[i]=document.getElementById("AccessWrite"+i).value;
        //window.alert(glbaccesswriteviewname[i]);
      }
      //update notify view
      for(i=0;i<4;i++)
      {
        glbaccessnotifyviewname[i]=document.getElementById("AccessNotify"+i).value;
        //window.alert(glbaccessnotifyviewname[i]);
      }

      //view change,access read/write/notify change
      for(i=0;i<4;i++)
      {

        if(document.getElementById("AccessGroupName"+i).value.length>0)
        {
          accessread_click(i,serial);
          accesswrite_click(i,serial);
          accessnotify_click(i,serial);
        }
      }
      return true;

    }

    function accessread_click(serial,serialchange)
    {
      var i,j=1,currSelect=256;
      var selviewname,selaccessread,newOption,accessread;
      var selaccessgroup;
      selaccessgroup=document.getElementById("AccessGroupName"+serial);
      selaccessread=document.getElementById("AccessRead"+serial);


      /*init*/
      for(i=0;i<4;i++)
      {
        newOption = new Option("","",false);
        selaccessread.options[i]=newOption;
      }

      //add options
      newOption = new Option("none","none",false);
      selaccessread.options[0]=newOption;

      for(i=0;i<3;i++)
      {
        selviewname=document.getElementById("ViewName"+i);
        if(selviewname.value.length>0)
        {
          //window.alert(selviewname.value);
          newOption = new Option(selviewname.value,selviewname.value,false);
          selaccessread.options[j]=newOption;
          j++;
        }
      }

      //select option
      for(i=0;i<4;i++)
      {
        if(selaccessread.options[i].value==glbaccessreadviewname[serial])
        {
          selaccessread.options[i].selected=true;
          break;
        }
        else if(0 == glbaccessreadviewname[serial])
        {
          selaccessread.options[0].selected=true;
          break;
        }
      }
      if(i==4)
      {
        selaccessread.options[0].selected=true;
      }


      //if  option is null,remove
      for(i=3;i>0;i--)
      {
        //window.alert(selaccessread.options[i].value);
        if(selaccessread.options[i].value=="")
        {
          selaccessread.remove(i);
        }
      }

      return true;
    }

    function accesswrite_click(serial,serialchange)
    {
      var i,j=1,currSelect=256;
      var selviewname,selaccesswrite,newOption,accesswrite;
      var selaccessgroup;
      selaccessgroup=document.getElementById("AccessGroupName"+serial);
      selaccesswrite=document.getElementById("AccessWrite"+serial);


      /*init*/
      for(i=0;i<4;i++)
      {
        newOption = new Option("","",false);
        selaccesswrite.options[i]=newOption;
      }


      //add options
      newOption = new Option("none","none",false);
      selaccesswrite.options[0]=newOption;

      for(i=0;i<3;i++)
      {
        selviewname=document.getElementById("ViewName"+i);
        if(selviewname.value.length>0)
        {
          //window.alert(selviewname.value);
          newOption = new Option(selviewname.value,selviewname.value,false);
          selaccesswrite.options[j]=newOption;
          j++;
        }
      }


      //select option
      for(i=0;i<4;i++)
      {
        if(selaccesswrite.options[i].value==glbaccesswriteviewname[serial])
        {
          selaccesswrite.options[i].selected=true;
          break;
        }
        else if(0 == glbaccesswriteviewname[serial])
        {
          selaccesswrite.options[0].selected=true;
          break;
        }
      }
      if(i==4)
      {
        selaccesswrite.options[0].selected=true;
      }


      //if  option is null,remove
      for(i=3;i>0;i--)
      {
        //window.alert(selaccesswrite.options[i].value);
        if(selaccesswrite.options[i].value=="")
        {
          selaccesswrite.remove(i);
        }
      }

      return true;
    }

    function accessnotify_click(serial,serialchange)
    {
      var i,j=1,currSelect=256;
      var selviewname,selaccessnotify,newOption,accessnotify;
      var selaccessgroup;
      selaccessgroup=document.getElementById("AccessGroupName"+serial);
      selaccessnotify=document.getElementById("AccessNotify"+serial);

      /*init*/
      for(i=0;i<4;i++)
      {
        newOption = new Option("","",false);
        selaccessnotify.options[i]=newOption;
      }

      //add options
      newOption = new Option("none","none",false);
      selaccessnotify.options[0]=newOption;

      for(i=0;i<3;i++)
      {
        selviewname=document.getElementById("ViewName"+i);
        if(selviewname.value.length>0)
        {
          //window.alert(selviewname.value);
          newOption = new Option(selviewname.value,selviewname.value,false);
          selaccessnotify.options[j]=newOption;
          j++;
        }
      }

      //select option
      for(i=0;i<4;i++)
      {
        if(selaccessnotify.options[i].value==glbaccessnotifyviewname[serial])
        {
          selaccessnotify.options[i].selected=true;
          break;
        }
        else if(0 == glbaccessnotifyviewname[serial])
        {
          selaccessnotify.options[0].selected=true;
          break;
        }
      }
      if(i==4)
      {
        selaccessnotify.options[0].selected=true;
      }

      //if  option is null,remove
      for(i=3;i>0;i--)
      {
        if(selaccessnotify.options[i].value=="")
        {
          selaccessnotify.remove(i);
        }
      }

      return true;
    }

//group change
    function GroupNameChange(serial)
    {
      var i;

      //v3 GroupName change
      if(serial==3)
      {
        accessgroup_click(0,3);
        return;
      }

      //update glbcopycommunityname value
      for(i=0;i<3;i++)
      {
        glbgroupname[i]=document.getElementById("AccessGroupName"+i).value;
      }

      for(i=0;i<3;i++)
      {
        accessgroup_click(i,serial);
      }

      //read/write/notify is null,add a null and show
      for(i=0;i<3;i++)
      {
        if(document.getElementById("AccessRead"+i).value=="")
        {
          var newOption = new Option("","",false);
          document.getElementById("AccessGroupName"+i).options[3]=newOption;
          document.getElementById("AccessGroupName"+i).options[3].selected=true;
        }
      }
      return true;
    }

    $scope.accessgroup_click = function(serial,serialchange){

      var i,newOption;
      var selaccessgroupname,selgroupname;
      selaccessgroupname=document.getElementById("AccessGroupName"+serial);
      if(serialchange<3)
      {
        /*init*/
        for(i=0;i<3;i++)
        {
          newOption = new Option("","",false);
          selaccessgroupname.options[i]=newOption;
        }
        /*add option*/
        for(i=0;i<3;i++)
        {
          selgroupname=document.getElementById("GroupName"+i);
          if(selgroupname.value.length>0)
          {
            newOption = new Option(selgroupname.value,selgroupname.value,false);
            selaccessgroupname.options[i]=newOption;
          }

        }

        /*select a option*/
        for(i=0;i<3;i++)
        {
          if(selaccessgroupname.options[i].value==glbgroupname[serial])
          {
            selaccessgroupname.options[i].selected=true;
            break;
          }
        }
        if(i==3)
        {
          selaccessgroupname.options[serialchange].selected=true;
          if(selaccessgroupname.options[serialchange].value=="")
          {
            //document.getElementById("AccessRead"+serialchange).options.length=0;

            document.getElementById("AccessRead"+serial).options.length=0;
            document.getElementById("AccessWrite"+serial).options.length=0;
            document.getElementById("AccessNotify"+serial).options.length=0;
          }
        }
        //update glbcopycommunityname value

      }

//v3 handle
      if(serialchange==3)
      {
        selgroupname=document.getElementById("GroupName"+3);
        newOption = new Option(selgroupname.value,selgroupname.value,true);
        selaccessgroupname=document.getElementById("AccessGroupName"+3);
        selaccessgroupname.options[0]=newOption;

        if(selgroupname.value.length==0)
        {
          //document.getElementById("GroupSecurityname"+serialchange).options.length=0;
          document.getElementById("AccessSecleve"+serialchange).value=0;
          document.getElementById("AccessRead"+serialchange).options.length=0;
          document.getElementById("AccessWrite"+serialchange).options.length=0;
          document.getElementById("AccessNotify"+serialchange).options.length=0;
        }

      }
      return true;
    }

    function accessgroup_click(serial,serialchange)
    {
      var i,newOption;
      var selaccessgroupname,selgroupname;
      selaccessgroupname=document.getElementById("AccessGroupName"+serial);
      if(serialchange<3)
      {
        /*init*/
        for(i=0;i<3;i++)
        {
          newOption = new Option("","",false);
          selaccessgroupname.options[i]=newOption;
        }
        /*add option*/
        for(i=0;i<3;i++)
        {
          selgroupname=document.getElementById("GroupName"+i);
          if(selgroupname.value.length>0)
          {
            newOption = new Option(selgroupname.value,selgroupname.value,false);
            selaccessgroupname.options[i]=newOption;
          }

        }

        /*select a option*/
        for(i=0;i<3;i++)
        {
          if(selaccessgroupname.options[i].value==glbgroupname[serial])
          {
            selaccessgroupname.options[i].selected=true;
            break;
          }
        }
        if(i==3)
        {
          selaccessgroupname.options[serialchange].selected=true;
          if(selaccessgroupname.options[serialchange].value=="")
          {
            //document.getElementById("AccessRead"+serialchange).options.length=0;

            document.getElementById("AccessRead"+serial).options.length=0;
            document.getElementById("AccessWrite"+serial).options.length=0;
            document.getElementById("AccessNotify"+serial).options.length=0;
          }
        }
        //update glbcopycommunityname value

      }

//v3 handle
      if(serialchange==3)
      {
        selgroupname=document.getElementById("GroupName"+3);
        newOption = new Option(selgroupname.value,selgroupname.value,true);
        selaccessgroupname=document.getElementById("AccessGroupName"+3);
        selaccessgroupname.options[0]=newOption;

        if(selgroupname.value.length==0)
        {
          //document.getElementById("GroupSecurityname"+serialchange).options.length=0;
          document.getElementById("AccessSecleve"+serialchange).value=0;
          document.getElementById("AccessRead"+serialchange).options.length=0;
          document.getElementById("AccessWrite"+serialchange).options.length=0;
          document.getElementById("AccessNotify"+serialchange).options.length=0;
        }

      }
      return true;
    }

    $scope.accessgroupname_focus = function(serial)
    {
      var selaccessgroupname,i,curselect;

      selaccessgroupname=document.getElementById("AccessGroupName"+serial);

      //touch thing
      for(i=0;i<3;i++)
      {
        GroupNameChange(i);
      }
      //default select
      for(i=0;i<3;i++)
      {
        if(selaccessgroupname.options[i].value==glbgroupname[serial])
        {
          curselect=i;
          break;
        }
      }
      selaccessgroupname.selectedIndex=curselect;

      if(selaccessgroupname.options.length==4
        &&selaccessgroupname.options[3].value=="")
      {
        selaccessgroupname.remove(3);
      }
      //onChange event
//      selaccessgroupname.fireEvent("onchage");

    }

//trap config
    $scope.trapflag_click = function()
    {
      var seltrapip,seltrapport,seltrapcommunity,seltrapflag;
      seltrapip=document.getElementById("TrapIP0");
      seltrapport=document.getElementById("TrapPort0");
      seltrapcommunity = document.getElementById("TrapCommunity0");
      seltrapflag=document.getElementById("TrapFlag0");
      if(seltrapflag.value==0)
      {
        seltrapport.value=0;
        seltrapip.value="";
        seltrapcommunity.value="";
      }
      else
      {
        seltrapport.value=162;
        seltrapip.value="";
        seltrapcommunity.value="public";
      }
    }

//UserNameChange
    function UserNameChange(serial)
    {
      var selusername,newOption,selgroupsecurityname;
      selusername=document.getElementById("UserName"+serial);
      selgroupsecurityname=document.getElementById("GroupSecurityname3");
      newOption = new Option(selusername.value,selusername.value,true);
      selgroupsecurityname.options[0]=newOption;
      if(selusername.value.length==0)
      {
        document.getElementById("UserAuthType0").value=0;
        document.getElementById("UserAuthPassword0").value="";
        document.getElementById("UserPrivacyType0").value=0;
        document.getElementById("UserPrivacyPassword0").value="";
        document.getElementById("GroupName3").value="";
        GroupNameChange(3);
      }

    }

    $scope.view_click = function(serial)
    {
      var i,selaccesswrite,selaccessread,selaccessnotify;
      var currSerial;
      //touch thing
      for(i=0;i<3;i++)
      {
        ViewNameChange(i);
      }

      //default select
      currSerial= serial%4;
      for(i=0;i<4;i++)
      {
        //read
        if(serial>-1&&serial<4)
        {
          selaccessread = document.getElementById("AccessRead"+currSerial);
          if(selaccessread.options[i].value==glbaccessreadviewname[currSerial])
          {
            selaccessread.selectedIndex=i;
            break;
          }
        }
        //write
        if(serial>3&&serial<8)
        {
          selaccesswrite = document.getElementById("AccessWrite"+currSerial);
          if(selaccesswrite.options[i].value==glbaccesswriteviewname[currSerial])
          {
            selaccesswrite.selectedIndex=i;
            break;
          }
        }
        //notify
        if(serial>7&&serial<12)
        {
          selaccessnotify = document.getElementById("AccessNotify"+currSerial);
          if(selaccessnotify.options[i].value==glbaccessnotifyviewname[currSerial])
          {
            selaccessnotify.selectedIndex=i;
            break;
          }
        }
      }
    }
    $scope.accessgroupname_change = function(serial)
    {
      var selaccessgroupname;
      selaccessgroupname=document.getElementById("AccessGroupName"+serial);
      if(selaccessgroupname.value=="")
      {
        document.getElementById("AccessRead"+serial).options.length=0;
        document.getElementById("AccessWrite"+serial).options.length=0;
        document.getElementById("AccessNotify"+serial).options.length=0;
      }
    }
  }])

  .controller('SyslogParamCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    function clearspace(str)
    {
      while(str.indexOf(" ")!=-1){
        str=str.replace(" ","");
      }
      return  str;
    }
    function ipverify(ip_string){
      var c;
      var n = 0;
      var ch = ".0123456789";
      if (ip_string.length < 7 || ip_string.length > 15)
        return false;
      for (var i = 0; i < ip_string.length; i++){
        c = ip_string.charAt(i);
        if (ch.indexOf(c) == -1)
          return false;
        else{
          if (c == '.'){
            if(ip_string.charAt(i+1) != '.')
              n++;
            else
              return false;
          }
        }
      }
      if (n != 3)
        return false;
      if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
        return false;
      var szarray = [0,0,0,0];
      var remain;
      var i;
      for(i = 0; i < 3; i++){
        var n = ip_string.indexOf('.');
        szarray[i] = ip_string.substring(0,n);
        remain = ip_string.substring(n+1);
        ip_string = remain;
      }
      szarray[3] = remain;
      for(i = 0; i < 4; i++){
        if (szarray[i] < 0 || szarray[i] > 255){
          return false;
        }
      }
      return true;
    }
    function is_ipaddr(ip_string){
      if(ip_string.length == 0){
        return false;
      }
      if (!ipverify(ip_string)){
        return false;
      }
      return true;
    }
    function is_number(num_string,nMin,nMax){
      var c;
      var ch = "-0123456789";
      if(num_string.length == 0){
        return false;
      }
      for (var i = 0; i < num_string.length; i++){
        c = num_string.charAt(i);
        if (ch.indexOf(c) == -1)
          return false;
      }
      if(parseInt(num_string) < nMin || parseInt(num_string) > nMax)
        return false;
      return true;
    }
    function charCompare_length_limit(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.<>,[]{}?/+=|\\'\":;~!#$%()` & ";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }
    function is_string_length_limit(name_string, limit){
      if(name_string.length == 0){
        return false;
      }
      if(!charCompare_length_limit(name_string,limit)){
        return false;
      }
      else
        return true;
    }

    MM_callJS('1','Admin');
    function MM_callJS(IPProto,user)
    {
      var tmp,obj,tmp2,obj2;

      tmp = '{module:"syslog",syslog_enable:"off",address:"",port:"514",syslog_level:"-1",cdr:"off",syslog_signal:"off",syslog_media:"off",syslog_system:"off",syslog_management:"off"}';
      obj = eval('('+tmp+')');
      if(typeof(obj)!="object"
        ||obj.module!='syslog')
      {
        alert("未知错误!!!");
        return;
      }
      if(obj.syslog_enable == "on"){
        document.getElementById('SyslogEnable').checked = true;
      }else{
        document.getElementById('SyslogEnable').checked = false;
      }
      document.getElementById('SyslogServer').value = obj.address;
      document.getElementById('SyslogPort').value = obj.port;
      document.getElementById('SyslogLevel').value = obj.syslog_level;
      if(obj.syslog_signal == "on"){
        document.getElementById('signal').checked = true;
      }else{
        document.getElementById('signal').checked = false;
      }
      if(obj.syslog_media == "on"){
        document.getElementById('media').checked = true;
      }else{
        document.getElementById('media').checked = false;
      }
      if(obj.syslog_system == "on"){
        document.getElementById('system').checked = true;
      }else{
        document.getElementById('system').checked = false;
      }
      if(obj.syslog_management == "on"){
        document.getElementById('management').checked = true;
      }else{
        document.getElementById('management').checked = false;
      }
      if(obj.cdr == "on"){
        document.getElementById('SendCDR').checked = true;
      }else{
        document.getElementById('SendCDR').checked = false;
      }
      tmp2 = '{module:"serverlog",serverlog_enable:"off",address:"",port:"514",serverlog_level:"-1",cdr:"off",serverlog_signal:"off",serverlog_media:"off",serverlog_system:"off",serverlog_management:"off"}';
      obj2 = eval('('+tmp2+')');
      if(typeof(obj2)!="object"
        ||obj2.module!='serverlog')
      {
        alert("Unexpect Error!!!");
        return;
      }
      if(obj2.serverlog_enable == "on"){
        document.getElementById('ServerLogEnable').checked = true;
      }else{
        document.getElementById('ServerLogEnable').checked = false;
      }
      document.getElementById('ServerLogServer').value = obj2.address;
      document.getElementById('ServerLogPort').value = obj2.port;
      document.getElementById('ServerLogLevel').value = obj2.serverlog_level;
      if(obj2.serverlog_signal == "on"){
        document.getElementById('ServerLogSignal').checked = true;
      }else{
        document.getElementById('ServerLogSignal').checked = false;
      }
      if(obj2.serverlog_media == "on"){
        document.getElementById('ServerLogMedia').checked = true;
      }else{
        document.getElementById('ServerLogMedia').checked = false;
      }
      if(obj2.serverlog_system == "on"){
        document.getElementById('ServerLogSystem').checked = true;
      }else{
        document.getElementById('ServerLogSystem').checked = false;
      }
      if(obj2.serverlog_management == "on"){
        document.getElementById('ServerLogManagement').checked = true;
      }else{
        document.getElementById('ServerLogManagement').checked = false;
      }
      if(obj2.cdr == "on"){
        document.getElementById('ServerLogSendCDR').checked = true;
      }else{
        document.getElementById('ServerLogSendCDR').checked = false;
      }
      IPProto = parseInt(IPProto);
      if (1 == IPProto)  //IPv4
      {
//        document.getElementById("idServerLogTbl").style.display="";
      }
      else
      {
        document.getElementById('ServerLogEnable').checked = false;
      }
      setTimeout(function(){
        mouse_click();
      },1000)
    }

    $scope.mouse_click = function(){
      if($("#SyslogEnable").prop("checked"))
      {
        document.getElementById("idSyslogAddr").style.display="";
        document.getElementById("idSyslogLevel").style.display="";
        document.getElementById("idSyslogPort").style.display="";
//        document.getElementById("idSendCDR").style.display="";
        document.getElementById("idSignal").style.display="";
        document.getElementById("idMedia").style.display="";
        document.getElementById("idSystem").style.display="";
        document.getElementById("idManagement").style.display="";
      }
      else
      {
        document.getElementById("idSyslogAddr").style.display="none";
        document.getElementById("idSyslogLevel").style.display="none";
        document.getElementById("idSyslogPort").style.display="none";
        document.getElementById("idSendCDR").style.display="none";
        document.getElementById("idSignal").style.display="none";
        document.getElementById("idMedia").style.display="none";
        document.getElementById("idSystem").style.display="none";
        document.getElementById("idManagement").style.display="none";
      }
      if(document.getElementById("ServerLogEnable").checked == true)
      {
        document.getElementById("idServerLogAddr").style.display="";
        document.getElementById("idServerLogPort").style.display="";
        document.getElementById("idServerLogLevel").style.display="";
        document.getElementById("idServerLogSendCDR").style.display="";
        document.getElementById("idServerLogSignal").style.display="";
        document.getElementById("idServerLogMedia").style.display="";
        document.getElementById("idServerLogSystem").style.display="";
        document.getElementById("idServerLogManagement").style.display="";
      }
      else
      {
        document.getElementById("idServerLogAddr").style.display="none";
        document.getElementById("idServerLogPort").style.display="none";
        document.getElementById("idServerLogLevel").style.display="none";
        document.getElementById("idServerLogSendCDR").style.display="none";
        document.getElementById("idServerLogSignal").style.display="none";
        document.getElementById("idServerLogMedia").style.display="none";
        document.getElementById("idServerLogSystem").style.display="none";
        document.getElementById("idServerLogManagement").style.display="none";
      }
    }
    function mouse_click()
    {
      if(document.getElementById("SyslogEnable").checked == true)
      {
        document.getElementById("idSyslogAddr").style.display="";
        document.getElementById("idSyslogLevel").style.display="";
        document.getElementById("idSyslogPort").style.display="";
//        document.getElementById("idSendCDR").style.display="";
        document.getElementById("idSignal").style.display="";
        document.getElementById("idMedia").style.display="";
        document.getElementById("idSystem").style.display="";
        document.getElementById("idManagement").style.display="";
      }
      else
      {
        document.getElementById("idSyslogAddr").style.display="none";
        document.getElementById("idSyslogLevel").style.display="none";
        document.getElementById("idSyslogPort").style.display="none";
        document.getElementById("idSendCDR").style.display="none";
        document.getElementById("idSignal").style.display="none";
        document.getElementById("idMedia").style.display="none";
        document.getElementById("idSystem").style.display="none";
        document.getElementById("idManagement").style.display="none";
      }
      if(document.getElementById("ServerLogEnable").checked == true)
      {
        document.getElementById("idServerLogAddr").style.display="";
        document.getElementById("idServerLogPort").style.display="";
        document.getElementById("idServerLogLevel").style.display="";
        document.getElementById("idServerLogSendCDR").style.display="";
        document.getElementById("idServerLogSignal").style.display="";
        document.getElementById("idServerLogMedia").style.display="";
        document.getElementById("idServerLogSystem").style.display="";
        document.getElementById("idServerLogManagement").style.display="";
      }
      else
      {
        document.getElementById("idServerLogAddr").style.display="none";
        document.getElementById("idServerLogPort").style.display="none";
        document.getElementById("idServerLogLevel").style.display="none";
        document.getElementById("idServerLogSendCDR").style.display="none";
        document.getElementById("idServerLogSignal").style.display="none";
        document.getElementById("idServerLogMedia").style.display="none";
        document.getElementById("idServerLogSystem").style.display="none";
        document.getElementById("idServerLogManagement").style.display="none";
      }
    }

    function local_syslog_all_disable()
    {
      if (document.getElementById("signal").checked
        || document.getElementById("media").checked
        || document.getElementById("system").checked
        || document.getElementById("management").checked
        || document.getElementById("SendCDR").checked)
      {
        return false;
      }
      else
      {
        return true;
      }
    }

    function server_syslog_all_disable()
    {
      if (document.getElementById("ServerLogSignal").checked
        || document.getElementById("ServerLogMedia").checked
        || document.getElementById("ServerLogSystem").checked
        || document.getElementById("ServerLogManagement").checked
        || document.getElementById("ServerLogSendCDR").checked)
      {
        return false;
      }
      else
      {
        return true;
      }
    }

    $rootScope.SyslogParamFormCheck = function()
    {
      document.getElementById('SyslogServer').value = clearspace(document.getElementById('SyslogServer').value);
      document.getElementById('SyslogPort').value = clearspace(document.getElementById('SyslogPort').value);
      if (document.getElementById("SyslogEnable").checked == true)
      {
        if (document.getElementById('SyslogServer').value.length == 0
          || document.getElementById('SyslogServer').value.length >= 128)
        {
          alert("'Syslog服务器地址'长度必须小于128!");
          $rootScope.href_click('SyslogParam');
          $rootScope.getSelect('SyslogServer',0,'id');
          return false;
        }

        if (!is_number(document.getElementById('SyslogPort').value,0,65535))
        {
          alert("'服务器端口'范围为0-65535!");
          $rootScope.href_click('SyslogParam');
          $rootScope.getSelect('SyslogPort',0,'id');
          return false;
        }
      }

      if (document.getElementById("SyslogEnable").checked)
      {
        if (true == local_syslog_all_disable())
        {
          alert("请选择至少一个本地syslog输出到服务器!");
          $rootScope.href_click('SyslogParam');
          return false;
        }
      }

      if (document.getElementById("ServerLogEnable").checked)
      {
        if (true == server_syslog_all_disable())
        {
          alert("请选择至少一个服务器syslog输出到服务器!");
          $rootScope.href_click('SyslogParam');
          return false;
        }
      }

      return true;
    }
    function DisableAll()
    {
      var arr = document.getElementsByTagName("input");
      for(var i=0; i<arr.length; i++)
      {
        arr[i].disabled = true;
      }
      arr = document.getElementsByTagName("select");
      for(i=0; i<arr.length; i++)
      {
        arr[i].disabled = true;
      }
    }
  }])

  .controller('provisionCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    function clearspace(str)
    {
      while(str.indexOf(" ")!=-1){
        str=str.replace(" ","");
      }
      return  str;
    }
    function is_number(num_string,nMin,nMax){
      var c;
      var ch = "-0123456789";
      if(num_string.length == 0){
        return false;
      }
      for (var i = 0; i < num_string.length; i++){
        c = num_string.charAt(i);
        if (ch.indexOf(c) == -1)
          return false;
      }
      if(parseInt(num_string) < nMin || parseInt(num_string) > nMax)
        return false;
      return true;
    }

    function charCompare_length_limit(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.<>,[]{}?/+=|\\'\":;~!#$%()` & ";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }
    function is_string_length_limit(name_string, limit){
      if(name_string.length == 0){
        return false;
      }
      if(!charCompare_length_limit(name_string,limit)){
        return false;
      }
      else
        return true;
    }

    MM_callJS('Admin');
    function MM_callJS(user)
    {
      var tmp = '{url:"",interval:"",acc:"",pwd:"",proxy_domain:"",proxy_port:"",proxy_acc:"",proxy_pwd:""}';
      var obj;
      ProChange();
      obj  = eval('('+tmp+')');
      if(typeof(obj)!="object")
      {
        alert("未知错误!!!");
        return;
      }
      document.getElementById('ProvisonURL').value = obj.url;
      document.getElementById('ProvisonInterval').value = obj.interval;
      document.getElementById('ProvisonAcc').value = obj.acc;
      document.getElementById('ProvisonPwd').value = obj.pwd;
      document.getElementById('ProxyDomain').value = obj.proxy_domain;
      document.getElementById('ProxyPort').value = obj.proxy_port;
      document.getElementById('ProxyAcc').value = obj.proxy_acc;
      document.getElementById('ProxyPwd').value = obj.proxy_pwd;
      process_password('provison','ModFlag',0);
      process_password('provison','ProxyModFlag',0);
      ProChange();
    }

    $rootScope.ProvisionFormCheck = function()
    {
      document.getElementById('ProvisonURL').value = clearspace(document.getElementById('ProvisonURL').value);
      ProChange();
      document.getElementById('ProvisonInterval').value = clearspace(document.getElementById('ProvisonInterval').value);
      document.getElementById('ProvisonAcc').value = clearspace(document.getElementById('ProvisonAcc').value);
      document.getElementById('ProvisonPwd').value = clearspace(document.getElementById('ProvisonPwd').value);
      document.getElementById('ProxyDomain').value = clearspace(document.getElementById('ProxyDomain').value);
      document.getElementById('ProxyPort').value = clearspace(document.getElementById('ProxyPort').value);
      document.getElementById('ProxyAcc').value = clearspace(document.getElementById('ProxyAcc').value);
      document.getElementById('ProxyPwd').value = clearspace(document.getElementById('ProxyPwd').value);

      if(document.getElementById('ProvisonURL').value.length == 0)
      {
        if(document.getElementById('ProvisonInterval').value.length != 0
          || document.getElementById('ProvisonAcc').value.length != 0
          || document.getElementById('ProvisonPwd').value.length != 0)
        {
          alert("请输入'URL'");
          $rootScope.href_click('Provision');
          $rootScope.getSelect('ProvisonURL',0,'id');
          return false;
        }
//        if(document.forms[19].CurrProtocol.value != "tftp")
//        {
//          if(document.getElementById('ProxyDomain').value.length != 0
//            || document.getElementById('ProxyPort').value.length != 0
//            || document.getElementById('ProxyAcc').value.length != 0
//            || document.getElementById('ProxyPwd').value.length != 0)
//          {
//            alert("请输入'URL'");
//            $rootScope.href_click('Provision');
//            $rootScope.getSelect('ProvisonURL',0,'id');
//            return false;
//          }
//        }
      }
      else
      {
        if(!URLCheck()
          || !is_string_length_limit(document.getElementById('ProvisonURL').value,127))
        {
          alert("'URL'错误!");
          $rootScope.href_click('Provision');
          $rootScope.getSelect('ProvisonURL',0,'id');
          return false;
        }

        if (document.getElementById('ProvisonInterval').value.length == 0
          || document.getElementById('ProvisonInterval').value < 300)
        {
          alert("请输入'查询周期',不能小于300!");
          $rootScope.href_click('Provision');
          $rootScope.getSelect('ProvisonInterval',0,'id');
          return false;
        }

        if(document.getElementById('ProvisonAcc').value.length != 0)
        {
          if(!is_string_length_limit(document.getElementById('ProvisonAcc').value,63))
          {
            alert("'账户'错误!");
            $rootScope.href_click('Provision');
            $rootScope.getSelect('ProvisonAcc',0,'id')
            return false;
          }
        }
        else
        {
          if(document.getElementById('ProvisonPwd').value.length != 0)
          {
            alert("请输入'账户'!");
            $rootScope.href_click('Provision');
            $rootScope.getSelect('ProvisonAcc',0,'id')
            return false;
          }
        }

        if(document.getElementById('ProvisonPwd').value.length != 0)
        {
          if(!is_string_length_limit(document.getElementById('ProvisonPwd').value,31))
          {
            alert("'密码'错误!");
            $rootScope.href_click('Provision');
            $rootScope.getSelect('ProvisonPwd',0,'id')
            return false;
          }
        }

        if(document.getElementById('ProvisonURL').value.substring(0,4).toUpperCase() != "TFTP")
        {
          if(document.getElementById('ProxyDomain').value.length == 0)
          {
            if(document.getElementById('ProxyPort').value.length != 0
              || document.getElementById('ProxyAcc').value.length != 0
              || document.getElementById('ProxyPwd').value.length != 0)
            {
              alert("请输入'代理域名'");
              $rootScope.href_click('Provision');
              $rootScope.getSelect('ProxyDomain',0,'id')
              return false;
            }
          }
          else
          {
            if(!is_string_length_limit(document.getElementById('ProxyDomain').value,127))
            {
              alert("'代理域名'错误!");
              $rootScope.href_click('Provision');
              $rootScope.getSelect('ProxyDomain',0,'id')
              return false;
            }

            if(document.getElementById('ProxyPort').value.length == 0)
            {
              alert("请输入'代理端口'");
              $rootScope.href_click('Provision');
              $rootScope.getSelect('ProxyPort',0,'id')
              return false;
            }
            if(!is_number(document.getElementById('ProxyPort').value,0,65535))
            {
              alert("请输入0-65535的数字!");
              $rootScope.href_click('Provision');
              $rootScope.getSelect('ProxyPort',0,'id')
              return false;
            }

            if(document.getElementById('ProxyAcc').value.length != 0)
            {
              if(!is_string_length_limit(document.getElementById('ProxyAcc').value,63))
              {
                alert("'代理账户'错误!");
                $rootScope.href_click('Provision');
                $rootScope.getSelect('ProxyAcc',0,'id')
                return false;
              }
            }
            else
            {
              if(document.getElementById('ProxyPwd').value.length != 0)
              {
                alert("请输入'代理账户'!");
                $rootScope.href_click('Provision');
                $rootScope.getSelect('ProxyAcc',0,'id')
                return false;
              }
            }

            if(document.getElementById('ProxyPwd').value.length != 0)
            {
              if(!is_string_length_limit(document.getElementById('ProxyPwd').value,31))
              {
                alert("'代理密码'错误!");
                $rootScope.href_click('Provision');
                $rootScope.getSelect('ProxyPwd',0,'id')
                return false;
              }
            }
          }
        }
      }

      return true;
    }

    function DisableAll()
    {
      var arr = document.getElementsByTagName("input");
      for(var i=0; i<arr.length; i++)
      {
        arr[i].disabled = true;
      }

      arr = document.getElementsByTagName("select");
      for(i=0; i<arr.length; i++)
      {
        arr[i].disabled = true;
      }
    }

    function URLCheck()
    {
      var str;
      if(document.getElementById('ProvisonURL').value.length <= 6)
      {
        return false;
      }
      str = document.getElementById('ProvisonURL').value.substring(0,6).toUpperCase();
      if(str == "FTP://")
      {
        return true;
      }
      else
      {
        if(document.getElementById('ProvisonURL').value.length <= 7)
        {
          return false;
        }

        str = document.getElementById('ProvisonURL').value.substring(0,7).toUpperCase();
        if(str == "HTTP://")
        {
          return true;
        }
        else if(str == "TFTP://")
        {
          return true;
        }
        else
        {
          return false;
        }
      }
    }

    $scope.ProChange = function(){
      var i;
      var str4;

      if(document.getElementById('ProvisonURL').value.length > 3)
      {
        str4 = document.getElementById('ProvisonURL').value.substring(0,4).toUpperCase();
        if(str4 == "TFTP")
        {
          for(i=0; i<4; i++)
          {
            document.getElementById("Proxy_" + i).style.display = "none";
          }
        }
        else
        {
          for(i=0; i<4; i++)
          {
            document.getElementById("Proxy_" + i).style.display = "";
          }
        }
      }
      else{
        for(i=0; i<4; i++)
        {
          document.getElementById("Proxy_" + i).style.display = "";
        }
      }
    }

    function ProChange()
    {
      var i;
      var str4;

      if(document.getElementById('ProvisonURL').value.length > 3)
      {
        str4 = document.getElementById('ProvisonURL').value.substring(0,4).toUpperCase();
        if(str4 == "TFTP")
        {
          for(i=0; i<4; i++)
          {
            document.getElementById("Proxy_" + i).style.display = "none";
          }
        }
        else
        {
          for(i=0; i<4; i++)
          {
            document.getElementById("Proxy_" + i).style.display = "";
          }
        }
      }
      else{
        for(i=0; i<4; i++)
        {
          document.getElementById("Proxy_" + i).style.display = "";
        }
      }
    }

    function getElementPos(elementId)
    {
      var ua = navigator.userAgent.toLowerCase();
      var isOpera = (ua.indexOf('opera') != -1);
      var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
      var el = document.getElementById(elementId);
      if (el.parentNode === null || el.style.display == 'none')
      {
        return false;
      }
      var parent = null;
      var pos = [];
      var box;
      if (el.getBoundingClientRect) //IE
      {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return { x: box.left + scrollLeft, y: box.top + scrollTop };
      }
      else if (document.getBoxObjectFor) // gecko
      {
        box = document.getBoxObjectFor(el);
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
      }
      else // safari & opera
      {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el)
        {
          while (parent)
          {
            pos[0] += parent.offsetLeft;
            pos[1] += parent.offsetTop;
            parent = parent.offsetParent;
          }
        }
        if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute'))
        {
          pos[0] -= document.body.offsetLeft;
          pos[1] -= document.body.offsetTop;
        }
      }

      if (el.parentNode)
      {
        parent = el.parentNode;
      }
      else
      {
        parent = null;
      }
      while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML')
      { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
        if (parent.parentNode)
        {
          parent = parent.parentNode;
        }
        else
        {
          parent = null;
        }
      }
      return {x: pos[0],y: pos[1]};
    }

    $scope.display = function(id)
    {
      for(var i=0; i<1; i++)
      {
        if(i != id )
        {
          hide(i);
        }
        else
        {
          var BOX = getElementPos("bx" + i);
          //alert(BOX.x+"..."+BOX.y)
          var Y = document.getElementById("bx" + i).scrollHeight;
          document.getElementById("ax" + i).style.left = (BOX.x + 20) + "px";
          document.getElementById("ax" + i).style.top = BOX.y + Y + "px";
          document.getElementById("ax" + i).style.display = "";
        }
      }
    }

    $scope.hide = function(id)
    {
      document.getElementById("ax" + id).style.display = "none";
    }

    function hide_all()
    {
      for(var i=0; i<14; i++)
      {
        hide(i);
      }
    }
    $scope.proxy_key_up = function()
    {
      process_password('provison','ProxyModFlag',1);
    }
    $scope.key_up = function()
    {
      process_password('provison','ModFlag',1);
    }
    function process_password(form_id,node_id,value){
      var parent = document.getElementById(form_id);
      var child = document.getElementById(node_id);
      if(child==null){
        child = document.createElement('input');
        child.name = node_id;
        child.id = node_id;
        child.type = 'hidden';
        parent.appendChild(child);
      }
      child.value = value;
    }
  }])

  .controller('CloudServerCfgCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    MM_callJS('Admin');
    function MM_callJS(user)
    {
      var tmp, obj;
      tmp = '{address:"",port:"",pwd:"",domain:""}';
      obj = eval('('+tmp+')');

      if(typeof(obj)!="object")
      {
        alert("Unexpect Error!!!");
        return;
      }
      document.getElementById('CloudServerAddress').value = obj.address;
      document.getElementById('CloudServerPort').value = obj.port;
      document.getElementById('CloudServerPwd').value = obj.pwd;
      document.getElementById('CloudServerDomain').value = obj.domain;
      process_password('CloudServerCfg','ModFlag',0);
    }

    function charCompare_length_limit(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.<>,[]{}?/+=|\\'\":;~!#$%()` & ";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }
    function is_string_length_limit(name_string, limit){
      if(name_string.length == 0){
        return false;
      }
      if(!charCompare_length_limit(name_string,limit)){
        return false;
      }
      else
        return true;
    }

    function clearspace(str)
    {
      while(str.indexOf(" ")!=-1){
        str=str.replace(" ","");
      }
      return  str;
    }

    $rootScope.CloudServerCfgFormCheck = function()
    {
      document.getElementById('CloudServerAddress').value = clearspace(document.getElementById('CloudServerAddress').value);
      document.getElementById('CloudServerPort').value = clearspace(document.getElementById('CloudServerPort').value);
      document.getElementById('CloudServerPwd').value = clearspace(document.getElementById('CloudServerPwd').value);

      if(document.getElementById("CloudServerAddress").value.length != 0)
      {
        if(!is_string_length_limit(document.getElementById('CloudServerAddress').value,127))
        {
          alert("'服务器地址'错误!");
          $rootScope.href_click('CloudServerCfg');
          $rootScope.getSelect('CloudServerAddress',0,'id');
          return false;
        }

        if(document.getElementById('CloudServerPort').value.length == 0)
        {
          alert("请输入'端口'!");
          $rootScope.href_click('CloudServerCfg');
          $rootScope.getSelect('CloudServerPort',0,'id');
          return false;
        }

        if(!is_number(document.getElementById('CloudServerPort').value,0,65535))
        {
          alert("请输入0-65535的数字!");
          $rootScope.href_click('CloudServerCfg');
          $rootScope.getSelect('CloudServerPort',0,'id');
          return false;
        }

        if(document.getElementById('CloudServerPwd').value.length != 0)
        {
          if(!is_string_length_limit(document.getElementById('CloudServerPwd').value,31))
          {
            alert("'密码'错误!");
            $rootScope.href_click('CloudServerCfg');
            $rootScope.getSelect('CloudServerPwd',0,'id');
            return false;
          }
        }

        if(document.getElementById('CloudServerDomain').value.length != 0)
        {
          if(!is_string_length_limit(document.getElementById('CloudServerDomain').value,31))
          {
            alert("'域名'错误!");
            $rootScope.href_click('CloudServerCfg');
            $rootScope.getSelect('CloudServerDomain',0,'id');
            return false;
          }
        }

        //parent.menuFrame.document.getElementById("idProvision").style.display = "none";
      }
      else
      {
        if(document.getElementById('CloudServerPwd').value.length != 0
          || document.getElementById('CloudServerPort').value.length != 0
          || document.getElementById('CloudServerDomain').value.length != 0)
        {
          alert("请输入'服务器地址'");
          $rootScope.href_click('CloudServerCfg');
          $rootScope.getSelect('CloudServerAddress',0,'id');
          return false;
        }

        //parent.menuFrame.document.getElementById("idProvision").style.display = "";
      }

      return true;
    }


    $scope.key_up = function()
    {
      process_password('CloudServerCfg','ModFlag',1);
    }

    function process_password(form_id,node_id,value)
    {
      var parent = document.getElementById(form_id);
      var child = document.getElementById(node_id);
      if(child==null){
        child = document.createElement('input');
        child.name = node_id;
        child.id = node_id;
        child.type = 'hidden';
        parent.appendChild(child);
      }
      child.value = value;
    }
  }])

  .controller('UserManageCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var g_user;
    var g_currNum ;

    MM_callJS('Admin', '1','1');
    function MM_callJS(user,userNum,canAdd)
    {
      g_user = user;
      g_currNum = parseInt(userNum);

      if (user == "Admin")
      {
        document.getElementById("idAdd").style.display="";
        document.getElementById("idMod").style.display="";
        document.getElementById("idClear").style.display="";
      }

      if (canAdd == "0")
      {
        document.getElementById("Add").disabled = true;
      }
      else
      {
        document.getElementById("Add").disabled = false;
      }

      mouse_click();
    }

    function form_check()
    {
      return true;
    }

    function AddData()
    {
      location.href="AddUser.htm";
    }

    function mouse_click()
    {
      var i = 0,Selectcount = 0;

      for (i = 0; i < g_currNum;i++)
      {
        if (document.getElementById("UserEnable"+i).checked)
        {
          Selectcount++;
        }
      }

      if (Selectcount == 1)
      {
        document.getElementById("Clear").disabled = false;
        document.getElementById("Mod").disabled = false;
      }
      else
      {
        document.getElementById("Clear").disabled = true;
        document.getElementById("Mod").disabled = true;
      }
    }
    function ClearData()
    {
      if(confirm("Are you sure?"))
      {
        document.forms[0].action="/goform/EiaUserGoClear";
        return true;
      }
      return false;
    }
    function ModData()
    {
      document.forms[0].action="/goform/EiaUserGoMod";
      document.forms[0].submit();
    }
  }])

  .controller('RemoteServerCfgCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    MM_callJS();
    function MM_callJS()
    {
      var tmp, obj;
      tmp = '{remote_enable:"off",domain:"",port:"",pwd:""}';
      obj = eval('('+tmp+')');

      if(typeof(obj)!="object")
      {
        alert("Unexpect Error!!!");
        return;
      }
      if(obj.remote_enable == "on")
      {
        document.getElementById('RemoteEnable').checked = true;
      }else{
        document.getElementById('RemoteEnable').checked = false;
      }
      document.getElementById('RemoteAddr').value = obj.domain;
      document.getElementById('RemotePort').value = obj.port;
      document.getElementById('RemotePwd').value = obj.pwd;

    }

    $scope.mouse_click = function ()
    {
      if(document.getElementById("RemoteEnable").checked == true)
      {
        document.getElementById("id_RemoteAddr").style.display="";
        document.getElementById("id_RemotePort").style.display="";
        document.getElementById("id_RemotePwd").style.display="none";
      }
      else
      {
        document.getElementById("id_RemoteAddr").style.display="none";
        document.getElementById("id_RemotePort").style.display="none";
        document.getElementById("id_RemotePwd").style.display="none";
      }
    }

    function charCompare_length_limit(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }

    function charCompare_length_limit_pwd(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.<>,[]{}?/+=|\\'\":;~!#$%()` & ";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }

    function is_string_length_limit(name_string, type, limit){
      if(name_string.length == 0){
        return false;
      }
      if(type == 0)
      {
        if(!charCompare_length_limit(name_string,limit)){
          return false;
        }
        else
          return true;
      }
      else if(type == 1)
      {
        if(!charCompare_length_limit_pwd(name_string,limit)){
          return false;
        }
        else
          return true;
      }
    }

    function clearspace(str)
    {
      while(str.indexOf(" ")!=-1){
        str=str.replace(" ","");
      }
      return  str;
    }

    $rootScope.RemoteServerCfgFormCheck  = function ()
    {
      document.getElementById('RemoteAddr').value = clearspace(document.getElementById('RemoteAddr').value);
      document.getElementById('RemotePort').value = clearspace(document.getElementById('RemotePort').value);
      document.getElementById('RemotePwd').value = "";

      if(document.getElementById("RemoteEnable").checked == true)
      {
        if(document.getElementById('RemoteAddr').value  == 0
          || !is_string_length_limit(document.getElementById('RemoteAddr').value ,0,127))
        {
          alert("'服务器URL/IP'不正确!");
          $rootScope.href_click('RemoteServerCfg');
          $rootScope.getSelect('RemoteAddr',0,'id');
          return false;
        }

        if(document.getElementById('RemotePort').value.length == 0
          || !is_number(document.getElementById('RemotePort').value,0,65535))
        {
          alert("'服务器端口'不正确,请输入0-65535!");
          $rootScope.href_click('RemoteServerCfg');
          $rootScope.getSelect('RemotePort',0,'id');
          return false;
        }

        if(document.getElementById('RemotePwd').value.length > 0
          && !is_string_length_limit(document.getElementById('RemotePwd').value,1,31))
        {
          alert("'密码'不正确!");
          $rootScope.href_click('RemoteServerCfg');
          $rootScope.getSelect('RemotePwd',0,'id');
          return false;
        }
      }
      return true;
    }
  }])

  .controller('RelayServerCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var SipEncrpt = '0';
    var RtpEncrpt = '0';
    var StunEnable = '0';
    var SipTransType = 'selected';

    $scope.mouse_click = function()
    {
      if(document.getElementById("MuxRelayEnable").checked == true)
      {
        document.getElementById("idDboMuxPort").style.display="";
        document.getElementById("idRelayServerAddr").style.display="";
        document.getElementById("idRelayServerPort0").style.display="";
        document.getElementById("idRelayServerPort1").style.display="";
        document.getElementById("idRelayServerPort2").style.display="";
        document.getElementById("idRelayServerPort3").style.display="";
        document.getElementById("idRelayUsername").style.display="";
        document.getElementById("idRelayServerPwd").style.display="";
        document.getElementById("idRelayServSecAddr").style.display="";
        document.getElementById("idRelayServSecPort0").style.display="";
        document.getElementById("idRelayServSecPort1").style.display="";
        document.getElementById("idRelayServSecPort2").style.display="";
        document.getElementById("idRelayServSecPort3").style.display="";
        document.getElementById("idRelaySecUsername").style.display="";
        document.getElementById("idRelayServSecPwd").style.display="";
        document.getElementById("idSipRelayEnable").style.display="";
        document.getElementById("idRtpRelayEnable").style.display="";
        document.getElementById("idDboAdvanced").style.display="";
        document.getElementById("idDboAdvancedParam").style.display="";
      }
      else
      {
        document.getElementById("idDboMuxPort").style.display="none";
        document.getElementById("idRelayServerAddr").style.display="none";
        document.getElementById("idRelayServerPort0").style.display="none";
        document.getElementById("idRelayServerPort1").style.display="none";
        document.getElementById("idRelayServerPort2").style.display="none";
        document.getElementById("idRelayServerPort3").style.display="none";
        document.getElementById("idRelayUsername").style.display="none";
        document.getElementById("idRelayServerPwd").style.display="none";
        document.getElementById("idRelayServSecAddr").style.display="none";
        document.getElementById("idRelayServSecPort0").style.display="none";
        document.getElementById("idRelayServSecPort1").style.display="none";
        document.getElementById("idRelayServSecPort2").style.display="none";
        document.getElementById("idRelayServSecPort3").style.display="none";
        document.getElementById("idRelaySecUsername").style.display="none";
        document.getElementById("idRelayServSecPwd").style.display="none";
        document.getElementById("idSipRelayEnable").style.display="none";
        document.getElementById("idRtpRelayEnable").style.display="none";
        document.getElementById("idDboAdvanced").style.display="none";
        document.getElementById("idDboAdvancedParam").style.display="none";
      }
    }

    MM_callJS('0');
    function MM_callJS(EiaDboAvailable)
    {
      var tmp, obj;

      tmp = '{module:"mux",mux_enable:"off",domain:"",port0:"",port1:"",port2:"",port3:"",username:"",pwd:"",secdomain:"",secport0:"",secport1:"",secport2:"",secport3:"",secusername:"",secpwd:"",sip_enable:"off",rtp_enable:"off",rtphead:"off",rtpudpcheck:"off",rtpcompress:"off",rtpquality:"off",dbo_port:""}';
      obj = eval('('+tmp+')');

      if(typeof(obj)!="object"
        ||obj.module!='mux')
      {
        alert("Unexpect Error!!!");
        return;
      }

      if(obj.mux_enable == "on"){
        document.getElementById('RelayServerCfg').MuxRelayEnable.checked = true;
      }else{
        document.getElementById('RelayServerCfg').MuxRelayEnable.checked = false;
      }

      document.getElementById('RelayServerCfg').RelayServerAddr.value = obj.domain;
      document.getElementById('RelayServerCfg').RelayServerPort0.value = obj.port0;
      document.getElementById('RelayServerCfg').RelayServerPort1.value = obj.port1;
      document.getElementById('RelayServerCfg').RelayServerPort2.value = obj.port2;
      document.getElementById('RelayServerCfg').RelayServerPort3.value = obj.port3;
      document.getElementById('RelayServerCfg').RelayUsername.value = obj.username;
      document.getElementById('RelayServerCfg').RelayServerPwd.value = obj.pwd;

      document.getElementById('RelayServerCfg').RelayServSecAddr.value = obj.secdomain;
      document.getElementById('RelayServerCfg').RelayServSecPort0.value = obj.secport0;
      document.getElementById('RelayServerCfg').RelayServSecPort1.value = obj.secport1;
      document.getElementById('RelayServerCfg').RelayServSecPort2.value = obj.secport2;
      document.getElementById('RelayServerCfg').RelayServSecPort3.value = obj.secport3;
      document.getElementById('RelayServerCfg').RelaySecUsername.value = obj.secusername;
      document.getElementById('RelayServerCfg').RelayServSecPwd.value = obj.secpwd;

      if(obj.sip_enable == "on"){
        document.getElementById('RelayServerCfg').SipRelayEnable.checked = true;
      }else{
        document.getElementById('RelayServerCfg').SipRelayEnable.checked = false;
      }

      if(obj.rtp_enable == "on"){
        document.getElementById('RelayServerCfg').RtpRelayEnable.checked = true;
      }else{
        document.getElementById('RelayServerCfg').RtpRelayEnable.checked = false;
      }

      if(obj.rtphead == "on"){
        document.getElementById('RelayServerCfg').RtpHeadCompress.checked = true;
      }else{
        document.getElementById('RelayServerCfg').RtpHeadCompress.checked = false;
      }

      if(obj.rtpudpcheck == "on"){
        document.getElementById('RelayServerCfg').RtpUdpCheck.checked = true;
      }else{
        document.getElementById('RelayServerCfg').RtpUdpCheck.checked = false;
      }

      if(obj.rtpcompress == "on"){
        document.getElementById('RelayServerCfg').RtpCompress.checked = true;
      }else{
        document.getElementById('RelayServerCfg').RtpCompress.checked = false;
      }

      if(obj.rtpquality == "on"){
        document.getElementById('RelayServerCfg').RtpQuality.checked = true;
      }else{
        document.getElementById('RelayServerCfg').RtpQuality.checked = false;
      }

      if(parseInt(EiaDboAvailable) == 0)
      {
        document.getElementById('RelayServerCfg').RtpCompress.checked = false;
        document.getElementById('RelayServerCfg').RtpQuality.checked = false;
        document.getElementById('RelayServerCfg').RtpCompress.disabled = true;
        document.getElementById('RelayServerCfg').RtpQuality.disabled = true;
      }
      else
      {
        document.getElementById('RelayServerCfg').RtpCompress.disabled = false;
        document.getElementById('RelayServerCfg').RtpQuality.disabled = false;
      }
      document.getElementById("idRtpQuality").style.display="none";

      document.getElementById('RelayServerCfg').LocalPort.value = obj.dbo_port;

      $scope.mouse_click();
    }

    function charCompare_length_limit(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }

    function charCompare_length_limit_pwd(szname,limit){
      var c;
      var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.<>,[]{}?/+=|\\'\":;~!#$%()` & ";
      if(szname.length > limit)
        return false;
      for (var i = 0; i < szname.length; i++){
        c = szname.charAt(i);
        if (ch.indexOf(c) == -1){
          return false;
        }
      }
      return true;
    }

    function is_string_length_limit(name_string, type, limit){
      if(name_string.length == 0){
        return false;
      }
      if(type == 0)
      {
        if(!charCompare_length_limit(name_string,limit)){
          return false;
        }
        else
          return true;
      }
      else if(type == 1)
      {
        if(!charCompare_length_limit_pwd(name_string,limit)){
          return false;
        }
        else
          return true;
      }
    }

    function clearspace(str)
    {
      while(str.indexOf(" ")!=-1){
        str=str.replace(" ","");
      }
      return  str;
    }


    $rootScope.RelayServerCfgFormCheck = function()
    {
      document.getElementById('RelayServerCfg').LocalPort.value = clearspace(document.getElementById('RelayServerCfg').LocalPort.value);
      document.getElementById('RelayServerCfg').RelayServerAddr.value = clearspace(document.getElementById('RelayServerCfg').RelayServerAddr.value);
      document.getElementById('RelayServerCfg').RelayServerPort0.value = clearspace(document.getElementById('RelayServerCfg').RelayServerPort0.value);
      document.getElementById('RelayServerCfg').RelayServerPort1.value = clearspace(document.getElementById('RelayServerCfg').RelayServerPort1.value);
      document.getElementById('RelayServerCfg').RelayServerPort2.value = clearspace(document.getElementById('RelayServerCfg').RelayServerPort2.value);
      document.getElementById('RelayServerCfg').RelayServerPort3.value = clearspace(document.getElementById('RelayServerCfg').RelayServerPort3.value);
      document.getElementById('RelayServerCfg').RelayUsername.value = clearspace(document.getElementById('RelayServerCfg').RelayUsername.value);
      document.getElementById('RelayServerCfg').RelayServerPwd.value = clearspace(document.getElementById('RelayServerCfg').RelayServerPwd.value);

      document.getElementById('RelayServerCfg').RelayServSecAddr.value = clearspace(document.getElementById('RelayServerCfg').RelayServSecAddr.value);
      document.getElementById('RelayServerCfg').RelayServSecPort0.value = clearspace(document.getElementById('RelayServerCfg').RelayServSecPort0.value);
      document.getElementById('RelayServerCfg').RelayServSecPort1.value = clearspace(document.getElementById('RelayServerCfg').RelayServSecPort1.value);
      document.getElementById('RelayServerCfg').RelayServSecPort2.value = clearspace(document.getElementById('RelayServerCfg').RelayServSecPort2.value);
      document.getElementById('RelayServerCfg').RelayServSecPort3.value = clearspace(document.getElementById('RelayServerCfg').RelayServSecPort3.value);
      document.getElementById('RelayServerCfg').RelaySecUsername.value = clearspace(document.getElementById('RelayServerCfg').RelaySecUsername.value);
      document.getElementById('RelayServerCfg').RelayServSecPwd.value = clearspace(document.getElementById('RelayServerCfg').RelayServSecPwd.value);

      if(document.getElementById("MuxRelayEnable").checked == true)
      {
        if (1 == SipEncrpt || 1 == RtpEncrpt || 1 == StunEnable)
        {
          alert("动态带宽优化和VOS加密或STUN不能同时启用!");
          $rootScope.href_click('RelayServerCfg');
          return false;
        }
        if(document.getElementById("RelayServerAddr").value.length != 0)
        {
          if(document.getElementById('RelayServerCfg').LocalPort.value.length != 0
            && !is_number(document.getElementById('RelayServerCfg').LocalPort.value,0,65535))
          {
            alert("'本地DBO端口'设置不正确!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('LocalPort',0,'id');
            return false;
          }

          if(!is_string_length_limit(document.getElementById('RelayServerCfg').RelayServerAddr.value,0,127))
          {
            alert("'主代理URL/IP'不正确!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerAddr',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayServerPort0.value.length == 0
            && document.getElementById('RelayServerCfg').RelayServerPort1.value.length == 0
            && document.getElementById('RelayServerCfg').RelayServerPort2.value.length == 0
            && document.getElementById('RelayServerCfg').RelayServerPort3.value.length == 0)
          {
            alert("请输入一个'主代理端口'!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerPort0',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayServerPort0.value.length != 0
            && !is_number(document.getElementById('RelayServerCfg').RelayServerPort0.value,0,65535))
          {
            alert("'主代理端口 22'不正确,请输入0-65535!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerPort0',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayServerPort1.value.length != 0
            && !is_number(document.getElementById('RelayServerCfg').RelayServerPort1.value,0,65535))
          {
            alert("'主代理端口 1'不正确,请输入0-65535!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerPort1',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayServerPort2.value.length != 0
            && !is_number(document.getElementById('RelayServerCfg').RelayServerPort2.value,0,65535))
          {
            alert("'主代理端口 2'不正确,请输入0-65535!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerPort2',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayServerPort3.value.length != 0
            && !is_number(document.getElementById('RelayServerCfg').RelayServerPort3.value,0,65535))
          {
            alert("'主代理端口 3'不正确,请输入0-65535!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerPort3',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayUsername.value.length == 0)
          {
            alert("请输入'主代理用户ID'!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayUsername',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayUsername.value.length != 0)
          {
            if(!is_string_length_limit(document.getElementById('RelayServerCfg').RelayUsername.value,1,31))
            {
              alert("'主代理用户ID'不正确!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayUsername',0,'id');
              return false;
            }
          }

          if(document.getElementById('RelayServerCfg').RelayServerPwd.value.length == 0)
          {
            alert("请输入'主代理密码'!");
            $rootScope.href_click('RelayServerCfg');
            $rootScope.getSelect('RelayServerPwd',0,'id');
            return false;
          }

          if(document.getElementById('RelayServerCfg').RelayServerPwd.value.length != 0)
          {
            if(!is_string_length_limit(document.getElementById('RelayServerCfg').RelayServerPwd.value,1,31))
            {
              alert("'主代理密码'不正确!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServerPwd',0,'id');
              return false;
            }
          }

          if(document.getElementById("RelayServSecAddr").value.length != 0)
          {
            if(!is_string_length_limit(document.getElementById('RelayServerCfg').RelayServSecAddr.value,0,127))
            {
              alert("'备代理URL/IP'不正确!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecAddr',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPort0.value.length == 0
              && document.getElementById('RelayServerCfg').RelayServSecPort1.value.length == 0
              && document.getElementById('RelayServerCfg').RelayServSecPort2.value.length == 0
              && document.getElementById('RelayServerCfg').RelayServSecPort3.value.length == 0)
            {
              alert("请输入一个'备代理端口'!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecPort0',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPort0.value.length != 0
              && !is_number(document.getElementById('RelayServerCfg').RelayServSecPort0.value,0,65535))
            {
              alert("'备代理端口 0'不正确,请输入0-65535!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecPort0',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPort1.value.length != 0
              && !is_number(document.getElementById('RelayServerCfg').RelayServSecPort1.value,0,65535))
            {
              alert("'备代理端口 1'不正确,请输入0-65535!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecPort1',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPort2.value.length != 0
              && !is_number(document.getElementById('RelayServerCfg').RelayServSecPort2.value,0,65535))
            {
              alert("'备代理端口 2'不正确,请输入0-65535!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecPort2',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPort3.value.length != 0
              && !is_number(document.getElementById('RelayServerCfg').RelayServSecPort3.value,0,65535))
            {
              alert("'备代理端口 3'不正确,请输入0-65535!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecPort3',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelaySecUsername.value.length == 0)
            {
              alert("请输入'备代理用户ID'!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelaySecUsername',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelaySecUsername.value.length != 0)
            {
              if(!is_string_length_limit(document.getElementById('RelayServerCfg').RelaySecUsername.value,1,31))
              {
                alert("'备代理用户ID'不正确!");
                $rootScope.href_click('RelayServerCfg');
                $rootScope.getSelect('RelaySecUsername',0,'id');
                return false;
              }
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPwd.value.length == 0)
            {
              alert("请输入'备代理密码'!");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecPwd',0,'id');
              return false;
            }

            if(document.getElementById('RelayServerCfg').RelayServSecPwd.value.length != 0)
            {
              if(!is_string_length_limit(document.getElementById('RelayServerCfg').RelayServSecPwd.value,1,31))
              {
                alert("'备代理密码'不正确!");
                $rootScope.href_click('RelayServerCfg');
                $rootScope.getSelect('RelayServSecPwd',0,'id');
                return false;
              }
            }
          }
          else
          {
            if(document.getElementById('RelayServerCfg').RelayServSecPort0.value.length != 0
              || document.getElementById('RelayServerCfg').RelayServSecPort1.value.length != 0
              || document.getElementById('RelayServerCfg').RelayServSecPort2.value.length != 0
              || document.getElementById('RelayServerCfg').RelayServSecPort3.value.length != 0
              || document.getElementById('RelayServerCfg').RelaySecUsername.value.length != 0
              || document.getElementById('RelayServerCfg').RelayServSecPwd.value.length != 0)
            {
              alert("请输入'备代理URL/IP'");
              $rootScope.href_click('RelayServerCfg');
              $rootScope.getSelect('RelayServSecAddr',0,'id');
              return false;
            }
          }
        }
        else
        {
          alert("请输入'主代理URL/IP'!");
          $rootScope.href_click('RelayServerCfg');
          $rootScope.getSelect('RelayServerAddr',0,'id');
          return false;
        }

        if(document.getElementById("SipRelayEnable").checked == false
          && document.getElementById("RtpRelayEnable").checked == false)
        {
          alert("SIP转发和RTP转发至少要启用一项!!!");
          $rootScope.href_click('RelayServerCfg');
          $rootScope.getSelect('RtpRelayEnable',0,'id');
          return false;
        }
      }

//      if(document.getElementById("MuxRelayEnable").checked == true)
//      {
//        parent.menuFrame.document.getElementById("idMuxStat").style.display = "";
//      }
//      else
//      {
//        parent.menuFrame.document.getElementById("idMuxStat").style.display = "none";
//      }

      return true;
    }
  }])


  .controller('WhiteListForWEBCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var g_JosnObj = eval("(" + "{count:0, enable:'false'}" + ")");
    MM_callJS('Admin');
    function MM_callJS(user)
    {
      var i;
      var index;
      var value;

      if (g_JosnObj.enable == "true")
      {
        document.getElementById("WhiteListEnable").checked = "true";
      }

      for(i=0; i<g_JosnObj.count; i++)
      {
        index = eval("g_JosnObj.item" + i + ".index");
        value = eval("g_JosnObj.item" + i + ".value");
        document.getElementById("WhiteList").options.add(new Option(value, index));
      }
      setTimeout(function(){
        onElementClicked();
      },1000)
    }

    $scope.onElementClicked = function(){
      if ($("#WhiteListEnable").prop("checked"))
      {
        document.getElementById("WhiteList").disabled = false;
        document.getElementById("BtnAdd").disabled = false;
        document.getElementById("BtnDelete").disabled = false;
        document.getElementById("Item").disabled = false;
      }
      else
      {
        document.getElementById("WhiteList").disabled = true;
        document.getElementById("BtnAdd").disabled = true;
        document.getElementById("BtnDelete").disabled = true;
        document.getElementById("Item").disabled = true;
      }
    }

    function onElementClicked()
    {
      if ($("#WhiteListEnable").prop("checked"))
      {
        document.getElementById("WhiteList").disabled = false;
        document.getElementById("BtnAdd").disabled = false;
        document.getElementById("BtnDelete").disabled = false;
        document.getElementById("Item").disabled = false;
      }
      else
      {
        document.getElementById("WhiteList").disabled = true;
        document.getElementById("BtnAdd").disabled = true;
        document.getElementById("BtnDelete").disabled = true;
        document.getElementById("Item").disabled = true;
      }
    }

    $scope.onItemDelete = function()
    {
      var CurrentIndex;

      CurrentIndex = document.getElementById("WhiteList").selectedIndex;
      document.getElementById("WhiteList").options.remove(CurrentIndex);
    }

    $scope.onItemAdd = function()
    {
      var NewIP = document.getElementById("Item").value;
      if (document.getElementById("WhiteList").options.length > 128)
      {
        alert("地址池已满!");
        $rootScope.href_click('WhiteListForWEB');
        $rootScope.getSelect("Item",0,'id');
        return;
      }

      if (!ip_check(1, NewIP) && !ip_check(2, NewIP))
      {
        alert("其输入一个合法的IP地址!");
        $rootScope.href_click('WhiteListForWEB');
        $rootScope.getSelect("Item",0,'id');
        return;
      }

      var i = 0;
      var cnt = document.getElementById("WhiteList").options.length;
      for (var i=0; i<cnt; i++)
      {
        if (document.getElementById("WhiteList").options[i].text == NewIP)
        {
          alert("IP地址'"+ NewIP + "'已经存在!");
          $rootScope.href_click('WhiteListForWEB');
          $rootScope.getSelect("Item",0,'id');
          return;
        }
      }

      document.getElementById("WhiteList").options.add(new Option(NewIP, NewIP));
      document.getElementById("Item").value = "";
    }

    $rootScope.WhiteListForWEBFormCheck = function()
    {
      var param;
      var cnt;
      var i, j;

      if (document.getElementById("WhiteList").options.length == 0
        && document.getElementById("WhiteListEnable").checked == true)
      {
        alert("如果开启该功能，需要至少添加一条记录!");
        $rootScope.href_click('WhiteListForWEB');
        return false;
      }

      return true;
    }
  }])

  .controller('WhiteListForTELCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    var g_JosnObj = eval("(" + "{count:0, enable:'false'}" + ")");

    MM_callJS('Admin');
    function MM_callJS(user)
    {
      var i;
      var index;
      var value;

      if (g_JosnObj.enable == "true")
      {
        document.getElementById("TelWhiteListEnable").checked = "true";
      }

      for(i=0; i<g_JosnObj.count; i++)
      {
        index = eval("g_JosnObj.Telitem" + i + ".index");
        value = eval("g_JosnObj.Telitem" + i + ".value");
        document.getElementById("TelWhiteList").options.add(new Option(value, index));
      }

      setTimeout(function(){
        onElementClicked();
      },1000)
    }

    $scope.onElementClicked = function(){
      if ($('#TelWhiteListEnable').prop('checked'))
      {
        document.getElementById("TelWhiteList").disabled = false;
        document.getElementById("TelBtnAdd").disabled = false;
        document.getElementById("TelBtnDelete").disabled = false;
        document.getElementById("TelItem").disabled = false;
      }
      else
      {
        document.getElementById("TelWhiteList").disabled = true;
        document.getElementById("TelBtnAdd").disabled = true;
        document.getElementById("TelBtnDelete").disabled = true;
        document.getElementById("TelItem").disabled = true;
      }
    }

    function onElementClicked()
    {
      if ($('#TelWhiteListEnable').prop('checked'))
      {
        document.getElementById("TelWhiteList").disabled = false;
        document.getElementById("TelBtnAdd").disabled = false;
        document.getElementById("TelBtnDelete").disabled = false;
        document.getElementById("TelItem").disabled = false;
      }
      else
      {
        document.getElementById("TelWhiteList").disabled = true;
        document.getElementById("TelBtnAdd").disabled = true;
        document.getElementById("TelBtnDelete").disabled = true;
        document.getElementById("TelItem").disabled = true;
      }
    }

    $scope.onItemDelete = function()
    {
      var CurrentIndex;

      CurrentIndex = document.getElementById("TelWhiteList").selectedIndex;
      document.getElementById("TelWhiteList").options.remove(CurrentIndex);
    }

    $scope.onItemAdd = function()
    {
      var NewIP = document.getElementById("TelItem").value;
      if (document.getElementById("TelWhiteList").options.length > 128)
      {
        alert("地址池已满!");
        $rootScope.href_click('WhiteListForTEL');
        $rootScope.getSelect('TelItem',0,'id');
        return;
      }

      if (!ip_check(1, NewIP) && !ip_check(2, NewIP))
      {
        alert("其输入一个合法的IP地址!");
        $rootScope.href_click('WhiteListForTEL');
        $rootScope.getSelect('TelItem',0,'id');
        return;
      }

      var i = 0;
      var cnt = document.getElementById("TelWhiteList").options.length;
      for (i=0; i<cnt; i++)
      {
        if (document.getElementById("TelWhiteList").options[i].text == NewIP)
        {
          alert("IP地址'"+ NewIP + "'已经存在!");
          $rootScope.href_click('WhiteListForTEL');
          $rootScope.getSelect('TelItem',0,'id');
          return;
        }
      }

      document.getElementById("TelWhiteList").options.add(new Option(NewIP, NewIP));
      document.getElementById("TelItem").value = "";
    }

    $rootScope.WhiteListForTELFormCheck = function()
    {
      var param;
      var cnt;
      var i, j;

      if (document.getElementById("TelWhiteList").options.length == 0
        && document.getElementById("TelWhiteListEnable").checked == true)
      {
        alert("如果开启该功能，需要至少添加一条记录!");
        $rootScope.href_click('WhiteListForTEL');
        return false;
      }

      return true;
    }
  }])

  .controller('PasswordCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    MM_callJS('Admin');
    function MM_callJS(user)
    {
      var i = 0;

      if (user == "Admin")
      {
        for (i = 0;i < 7;i++)
        {
          document.getElementById("id_telnet"+i).style.display = "";
        }
      }
    }

    $rootScope.PasswordFormCheck = function()
    {
      if(document.forms['Password'].OldName.value.length==0)
      {
//        alert("请输入WEB原用户名!");
//        $rootScope.href_click('Password');
//        $rootScope.getSelect('OldName',0,'id');
//        return false;
      }
      if(document.forms['Password'].OldPsw.value.length!=0)
      {
        if(document.forms['Password'].NewName.value.length==0)
        {
          alert("请输入WEB新用户名!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('NewName',0,'id');
          return false;
        }

        var str = document.forms['Password'].NewName.value;
        for (var i=0; i<str.length; i++)
        {
          if ((str.charAt(i) >= '0' && str.charAt(i) <= '9')
            || (str.charAt(i) >= 'a' && str.charAt(i) <= 'z')
            || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z')
            || str.charAt(i) == '_')
          {}
          else
          {
            alert("用户名只能包含数值、字母或者下划线!");
            $rootScope.href_click('Password');
            $rootScope.getSelect('NewName',0,'id');
            return false;
          }
        }

        if(document.forms['Password'].NewPsw.value.length==0)
        {
          alert("请输入WEB新密码!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('NewPsw',0,'id');
          return false;
        }
        if(document.forms['Password'].NewPsw2.value.length==0)
        {
          alert("请再次输入WEB新密码!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('NewPsw2',0,'id');
          return false;
        }
        if(document.forms['Password'].NewPsw2.value!=document.forms['Password'].NewPsw.value)
        {
          alert("两次输入的WEB新密码不相同!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('NewPsw2',0,'id');
          return false;
        }
      }

      if(document.forms['Password'].TelnetOldName.value.length==0)
      {
        alert("请输入Telnet原用户名!");
        $rootScope.href_click('Password');
        $rootScope.getSelect('TelnetOldName',0,'id');
        return false;
      }
      if(document.forms['Password'].TelnetOldPsw.value.length!=0)
      {
        if(document.forms['Password'].TelnetNewName.value.length==0)
        {
          alert("请输入Telnet新用户名!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('TelnetNewName',0,'id');
          return false;
        }
        if(document.forms['Password'].TelnetNewPsw.value.length==0)
        {
          alert("请输入Telnet新密码!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('TelnetNewPsw',0,'id');
          return false;
        }
        if(document.forms['Password'].TelnetNewPsw2.value.length==0)
        {
          alert("请再次输入Telnet新密码!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('TelnetNewPsw2',0,'id');
          return false;
        }
        if(document.forms['Password'].TelnetNewPsw2.value!=document.forms['Password'].TelnetNewPsw.value)
        {
          alert("两次输入的Telnet新密码不相同!");
          $rootScope.href_click('Password');
          $rootScope.getSelect('TelnetNewPsw2',0,'id');
          return false;
        }
      }
      return true;
    }
  }])

  .controller('EncryptCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
    MM_callJS('Admin');
    var RelayServerEnable = '0';
    function MM_callJS(user)
    {
      mouse_click();
    }
    function mouse_click()
    {	/* 密钥编辑框，暂时不启用 */
      /*if(document.getElementById("AddSipEncrypt").checked == true)
       {
       document.getElementById("idEncryptkey").style.display="";
       }
       else
       {
       document.getElementById("idEncryptkey").style.display="none";
       }*/
    }
    $rootScope.EncryptFormCheck = function()
    {
      var SipEncrypt = document.getElementById("AddSipEncrypt").value;
      var RtpEncrypt = document.getElementById("AddRtpEncrypt").value;
      if (1 == SipEncrypt || (RtpEncrypt > 0))
      {
        if (1 == RelayServerEnable)
        {
          alert("动态带宽优化和VOS加密不能同时启用!");
          return false;
        }
      }
      /*if(document.getElementById("AddSipEncrypt").checked == true)
       {
       if (document.forms[0].Encryptkey.value.length == 0
       || document.forms[0].Encryptkey.value.length > 255)
       {
       alert("'密钥' 错误, 长度不能超过255个字符!");
       document.forms[0].Encryptkey.select();
       return false;
       }
       }*/
      return true;
    }
  }])
   .controller('EiaRecordConfigCtrl', ['$scope', '$rootScope','$window', '$location', '$cookies', function ($scope, $rootScope, $window, $location,$cookies) {
	   $scope.mouse_click = function()
	   {
	   	if (document.getElementById("RecordEnable").checked)
	   	{
	   		document.getElementById("idRcdIPAddress").style.display = "";
	   		document.getElementById("idRcdPort").style.display = "";
	   		//document.getElementById("idFilterNo").style.display = "";
	   		document.getElementById("idRcdMax").style.display = "";
	   		document.getElementById("idRcdPeriodEnable").style.display = "";
	   		if(document.getElementById("RcdPeriodMode").value == 0)
	           {
	   			document.getElementById("idPeriodTime0").style.display = "none";
	   			document.getElementById("idPeriodTime1").style.display = "none";
	   			document.getElementById("idPeriodTime2").style.display = "none";
	   		}
	   		else if(document.getElementById("RcdPeriodMode").value == 1)
	           {
	   			document.getElementById("idPeriodTime0").style.display = "";
	   			document.getElementById("idPeriodTime1").style.display = "none";
	   			document.getElementById("idPeriodTime2").style.display = "none";
	   		}
	   		else if(document.getElementById("RcdPeriodMode").value == 2)
	           {
	   			document.getElementById("idPeriodTime0").style.display = "";
	   			document.getElementById("idPeriodTime1").style.display = "";
	   			document.getElementById("idPeriodTime2").style.display = "none";
	   		}
	   		else if(document.getElementById("RcdPeriodMode").value == 3)
	           {
	   			document.getElementById("idPeriodTime0").style.display = "";
	   			document.getElementById("idPeriodTime1").style.display = "";
	   			document.getElementById("idPeriodTime2").style.display = "";
	   		}

	   		//document.getElementById("idRcdForkMode").style.display = "";
	   		//document.getElementById("idRcdForkLevel").style.display = "";
	   	}
	       else
	       {
	   		document.getElementById("idRcdIPAddress").style.display = "none";
	   		document.getElementById("idRcdPort").style.display = "none";
	   		//document.getElementById("idFilterNo").style.display = "none";
	   		document.getElementById("idRcdMax").style.display = "none";
	   		document.getElementById("idRcdPeriodEnable").style.display = "none";
	   		document.getElementById("idPeriodTime0").style.display = "none";
	   		document.getElementById("idPeriodTime1").style.display = "none";
	   		document.getElementById("idPeriodTime2").style.display = "none";
	   		document.getElementById("idRcdForkMode").style.display = "none";
	   		document.getElementById("idRcdForkLevel").style.display = "none";
	   	}
	   	
	   	return true;	
	   }
	  
	   MM_callJS('Admin');
	   function MM_callJS(user)
	   {
	   	//var profileVal = "255";
	   	//document.getElementById("RcdNumFilterID").value= profileVal;
	   	$scope.mouse_click();
	   	
	   
	   }

	   $rootScope.EiaRecordCfgFormCheck = function(){
		       
		   if (document.getElementById("RecordEnable").checked)
		    {     //alert( document.getElementById("RcdIPAddress").value);
		        if(document.getElementById('RcdIPAddress').value.length == 0)
				{  
		        	$rootScope.href_click('EiaRecordCfg');
		            $rootScope.getSelect('RcdIPAddress',0,'id');
					alert("请输入服务器地址");
					//document.getElementById('RcdIPAddress').style.borderColor = 'red'
					return false;
				}
		        
		    	if (!is_number(document.getElementById("RcdPort").value,1,65535))
		    	{
		    		$rootScope.href_click('EiaRecordCfg');
		            $rootScope.getSelect('RcdPort',0,'id');
		    		alert("'录音端口' 错误， 端口号应该是1-65535之间的一个整数!");
		    		//document.forms[0].RcdPort.select();
		    		//document.getElementById('RcdPort').style.borderColor = 'red';
		    		return false;
		    	}
		        
		    	if (!is_number(document.getElementById("RcdMax"),0,2000))
		    	{    $rootScope.href_click('EiaRecordCfg');
	              $rootScope.getSelect('RcdMax',0,'id');
		    		alert("'录音最大路数' 错误， 录音最大路数不可设置超过2000!");
		    		//document.forms[0].RcdMax.select();
		    		//document.getElementById('RcdMax').style.borderColor = 'red';
		    		return false;
		    	}

		    	var st0 = document.getElementById("from_time0").value;
		    	var et0 = document.getElementById("end_time0").value;
		    	var st1 = document.getElementById("from_time1").value;
		    	var et1 = document.getElementById("end_time1").value;
		    	var st2 = document.getElementById("from_time2").value;
		    	var et2 = document.getElementById("end_time2").value;

		    	var a0 = st0.match(/^([01][0-9]|2[0-3])\:[0-5][0-9]$/);
		    	var b0 = et0.match(/^([01][0-9]|2[0-3])\:[0-5][0-9]$/);
		    	var a1 = st1.match(/^([01][0-9]|2[0-3])\:[0-5][0-9]$/);
		    	var b1 = et1.match(/^([01][0-9]|2[0-3])\:[0-5][0-9]$/);
		    	var a2 = st2.match(/^([01][0-9]|2[0-3])\:[0-5][0-9]$/);
		    	var b2 = et2.match(/^([01][0-9]|2[0-3])\:[0-5][0-9]$/);

		    	if(document.getElementById("RcdPeriodMode").value == 1)
		    	{
		    		if(a0 == null || b0 == null)
		    		{
		    			 alert("请输入正确时间，例如:08:08");
		    			 return false;
		    		}
		    	}
		    	else if(document.getElementById("RcdPeriodMode").value == 2)
		    	{
		    		if(a0 == null || b0 == null || a1 == null || b1 == null)
		    		{
		                alert("请输入正确时间，例如:08:08");
		    			 return false;
		    		}
		    		if(st1 < et0)
		    		{
		    			 alert("上一段的结束时间不能超过下一段的开始时间!!!");
		    			 return false;
		    		}
		    	}
		    	else if(document.getElementById("RcdPeriodMode").value == 3)
		    	{
		    		if(a0 == null || b0 == null || a1 == null || b1 == null || a2 == null || b2 == null)
		    		{
		                alert("请输入正确时间，例如:08:08");
		    			 return false;
		    		}
		    		if(st1 < et0 || st2 < et1)
		    		{
		    			 alert("上一段的结束时间不能超过下一段的开始时间!!!");
		    			 return false;
		    		}
		    	}

		    	if(st0 > et0 || st1 > et1 || st2 > et2)
		    	{
		    		 alert("开始时间不能大于结束时间!");
		    		 return false;
		        }
			}
		    
			return true;

		   
		   
	   }
	   
	   
   }])   
  