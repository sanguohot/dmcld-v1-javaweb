/**
 * Created by Rainc on 14-11-7.
 */
function IPv6_check(str)
{
  if(str.match(/:/g)!=null){
    return str.match(/:/g).length<=7
      &&/::/.test(str)
      ?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)
      :/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str);
  }
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

  szarray = [0,0,0,0];
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

function ip_check(ip_proto, str)
{
  if (2 == ip_proto)
  {
    return IPv6_check(str);
  }
  else
  {
    return is_ipaddr(str);
  }
}

function isIP_endGTstart(endIP, startIP)
{
  var vEnd = endIP.split('.');
  var vSta = startIP.split('.');
  var nSta = (parseInt(vSta[0])<<24) + (parseInt(vSta[1])<<16) + (parseInt(vSta[2])<<8) + (parseInt(vSta[3])<<0);
  var nEnd = (parseInt(vEnd[0])<<24) + (parseInt(vEnd[1])<<16) + (parseInt(vEnd[2])<<8) + (parseInt(vEnd[3])<<0);
  if (nEnd  < nSta)
  {
    return false;
  }

  return true;
}

function isValidMacAddress(MacAddress)
{
  var c = '';
  var num = 0;
  var i = 0, j = 0;
  var zeros = 0;
  var cnt_ff=0;
  addrParts = MacAddress.split('-');
  if (addrParts.length != 6)
  {
    return false;
  }

  for (i = 0; i < 6; i++)
  {
    if (addrParts[i] == '')
    {
      return false;
    }
    for (j = 0; j < addrParts[i].length; j++)
    {
      c = addrParts[i].toLowerCase().charAt(j);
      if ((c >= '0' && c <= '9')
        || (c >= 'a' && c <= 'f'))
        continue;
      else
        return false;
    }

    num = parseInt(addrParts[i], 16);
    if ((num == NaN) || (num < 0) || (num > 255))
      return false;
    if (num == 255)
      cnt_ff++;
    if (num == 0)
      zeros++;
  }
  if ((zeros == 6) || (cnt_ff == 6))
    return false;

  return true;
}

function is_maskaddr(mask_string){
  var i,j;
  var substr = mask_string;
  var val, cnt = 0, num = 128, pos = 0;
  a = new Array(32);

  if(mask_string.length == 0){
    return false;
  }
  if (!ipverify(mask_string)){
    return false;
  }
  if(mask_string == "0.0.0.0")
  {
    return true;
  }
  for(i = 0; i < 4; i++)
  {
    pos = substr.indexOf('.',0);
    if(pos == -1)
    {
      val = parseInt(substr);
    }
    else
    {
      val = parseInt(substr.substring(0, pos+1));
      substr = substr.substring(pos + 1, substr.length + 1);
    }
    for (j = 0; j < 8; j++)
    {
      a[8*i + j] = (val&(num>>j))>>(7-j);
    }
  }

  for(j = 0; j < 31; j++)
  {
    if(a[j] != a[j+1])
    {
      cnt++;
    }
  }
  if(cnt > 1 || (a[30] == 0 && a[31] == 1))
  {
    return false;
  }
  return true;
}
function is_gatewayaddr(gateway_string){
  if(gateway_string.length == 0){
    return false;
  }
  if (!ipverify(gateway_string)){
    return false;
  }
  return true;
}
function is_dnsaddr(dns_string){
  if(dns_string.length == 0){
    return false;
  }
  if (!ipverify(dns_string)){
    return false;
  }
  return true;
}
function is_subnet(ip,mask,subip,submask){
  var i = 0,j = 0, pos = 0, cnt = 0;
  var str_ip_a = ip, str_mask_a = mask, str_ip_b = subip, str_mask_b = submask;

  ip_a = new Array(4);
  mask_a = new Array(4);
  ip_b = new Array(4);
  mask_b = new Array(4);

  for(i = 0; i < 4; i++)
  {
    pos = str_ip_a.indexOf('.',0);
    if(pos == -1)
    {
      ip_a[i] = parseInt(str_ip_a);
    }
    else
    {
      ip_a[i] = parseInt(str_ip_a.substring(0, pos+1));
      str_ip_a = str_ip_a.substring(pos + 1, str_ip_a.length + 1);
    }
  }
  for(i = 0; i < 4; i++)
  {
    pos = str_mask_a.indexOf('.',0);
    if(pos == -1)
    {
      mask_a[i] = parseInt(str_mask_a);
    }
    else
    {
      mask_a[i] = parseInt(str_mask_a.substring(0, pos+1));
      str_mask_a = str_mask_a.substring(pos + 1, str_mask_a.length + 1);
    }
  }
  for(i = 0; i < 4; i++)
  {
    pos = str_ip_b.indexOf('.',0);
    if(pos == -1)
    {
      ip_b[i] = parseInt(str_ip_b);
    }
    else
    {
      ip_b[i] = parseInt(str_ip_b.substring(0, pos+1));
      str_ip_b = str_ip_b.substring(pos + 1, str_ip_b.length + 1);
    }
  }
  for(i = 0; i < 4; i++)
  {
    pos = str_mask_b.indexOf('.',0);
    if(pos == -1)
    {
      mask_b[i] = parseInt(str_mask_b);
    }
    else
    {
      mask_b[i] = parseInt(str_mask_b.substring(0, pos+1));
      str_mask_b = str_mask_b.substring(pos + 1, str_mask_b.length + 1);
    }
  }
  for(i = 0; i < 4; i++)
  {
    if((ip_a[i]&mask_a[i]) == (ip_b[i]&mask_a[i])
      && mask_a[i] <= mask_b[i])
    {
      cnt++;
    }
  }
  if(cnt != 4)
  {
    return false;
  }
  return true;
}
function macverify(mac_string){
  var c;
  var n = 0;
  var ch = "-0123456789ABCDEFabcdef";
  if (mac_string.length != 17)
    return false;
  for (var i = 0; i < mac_string.length; i++){
    c = mac_string.charAt(i);
    if (ch.indexOf(c) == -1)
      return false;
    else{
      if (c == '-')
        n++;
    }
  }
  if (n != 5)
    return false;
  for(var i = 2; i < 17; i += 3){
    if (mac_string.charAt(i) != '-')
      return false;
  }
  return true;
}
function is_macaddr(mac_string){
  if(mac_string.length == 0){
    return false;
  }
  if (!macverify(mac_string)){
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
function is_number_range_ok(num_string,nMin,nMax){
  var c;
  var num1;
  var num2;
  c = num_string.indexOf('-',0);

  if(c == 0)
  {
    return false;
  }
  if(c == -1)
  {
    return is_number(num_string,nMin,nMax);
  }
  else
  {
    num1 = num_string.substring(0,c);
    num2 = num_string.substring(c+1,num_string.length+1);
    if(is_number(num1,nMin,nMax) && is_number(num2,nMin,nMax)
      && parseInt(num1) < parseInt(num2))
      return true;
    return false;
  }
}
function is_first_xin(num_string,minlength,maxlength)
{
  var c;
  var nums="0123456789*#";

  if(num_string.length < minlength || num_string.length > maxlength)
  {
    return false;
  }
  c = num_string.charAt(0);
  if (c == '*')
  {
    return false;
  }
  for (var i = 0; i < num_string.length; i++)
  {
    c = num_string.charAt(i);
    if (nums.indexOf(c) == -1)
    {
      return false;
    }
  }

  return true;
}
function is_number_string(num_string,minlength,maxlength){
  var c;
  var nums="0123456789"
  if(num_string.length < minlength || num_string.length > maxlength)
  {
    return false;
  }
  for (var i = 0; i < num_string.length; i++)
  {
    c = num_string.charAt(i);
    if (nums.indexOf(c) == -1)
    {
      return false;
    }
  }
  return true;
}
function charCompare(szname,en_limit,cn_limit){
  var c;
  var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.<>,[]{}?/+=|\\'\":;~!#$%()` & ";
  if(szname.length > en_limit)
    return false;
  for (var i = 0; i < szname.length; i++){
    c = szname.charAt(i);
    if (ch.indexOf(c) == -1){
      if(szname.length > cn_limit)
        return false;
    }
  }
  return true;
}
function is_string(name_string){
  var EN_LIMIT = 64;
  var CN_LIMIT = 32;
  if(name_string.length == 0){
    return false;
  }
  if(!charCompare(name_string,EN_LIMIT,CN_LIMIT)){
    return false;
  }
  else
    return true;
}

function check_call_process_tone_str(CallProcToneStr)
{
  var i;
  var array = new Array();
  var f1, a1, f2, a2;

  for (i=0; i<CallProcToneStr.length; i++)
  {
    if ((CallProcToneStr.charAt(i) < '0' || CallProcToneStr.charAt(i) > '9') && CallProcToneStr.charAt(i) != ',')
    {
      return false;
    }
  }

  array = CallProcToneStr.split(',');
  if (array.length != 6 && array.length != 8)
  {
    return false;
  }

  f1 = parseInt(array[0]);
  a1 = parseInt(array[1]);
  f2 = parseInt(array[2]);
  a2 = parseInt(array[3]);
  if ((f1 < 300 || f1 > 4000) || (a1 < 62 || a1 > 692))
  {
    return false;
  }

  if ((f2 < 300 || f2 > 4000) || (a2 < 62 || a2 > 692))
  {
    return false;
  }

  return true;
}

function esc_transform(esc_string)
{
  while(esc_string.indexOf("&lt;") != -1)
  {
    esc_string = esc_string.replace("&lt;", "<");
  }

  while (esc_string.indexOf("&gt;") != -1)
  {
    esc_string = esc_string.replace("&gt;", ">");
  }

  return esc_string;
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

function DisableButton()
{
  for(var f=0;f<document.forms.length;f++)
  {
    var form=document.forms[f];
    for(var i=0; i<form.length; i++)
    {
      if(form[i].type=='submit')
      {
        if(form[i].disabled != 'true')
        {
          form[i].disabled='true';
        }
      }
      else if(form[i].type=='button')
      {
        if(form[i].name!='Cancel'
          && form[i].name!='cancel'
          && form[i].id!='Cancel'
          && form[i].id!='cancel')
        {
          if(form[i].disabled != 'true')
          {
            form[i].disabled='true';
          }
        }
      }
    }
  }
}

var checkChange = function(name){
  if(parent.document.getElementById('modelTab_id' != null)){
    parent.document.getElementById('modelTab_id').innerHTML = '模板编辑器*';
  }
  if(document.getElementsByName(name)[0].type == 'checkbox' ){
    document.getElementsByName(name)[0].parentNode.style.color = '#056aa6';
  }else if(document.getElementsByName(name)[0].type == 'radio'){
    var len = document.getElementsByName(name).length;
    for(var i =0;i<len;i++){
      document.getElementsByName(name)[i].parentNode.style.color = '#056aa6';
    }
  }else if(document.getElementsByName(name)[0].type == 'button'){
  }else{
    document.getElementsByName(name)[0].style.borderColor = '#056aa6';
    document.getElementsByName(name)[0].style.color = 'black';
  }
}

//获取当前选择框的name
var current = '';
var currentValue = '';
var checkFocus = function(name){
  current = name;
  if(document.getElementsByName(current)[0].type == 'checkbox'){
    currentValue = document.getElementsByName(current)[0].checked
  }else{
    currentValue = document.getElementsByName(current)[0].value
  }
}

function checkStr(str,value,formData,checkCurrent){
  var name = new RegExp(str);
  //checkbox和下拉框特殊值处理
  if(value == 'enable' || value == 'on' || value == 'true'){
    if(str == 'config/system/entrypt_param/sip_encrypt'){
      value = 0;
    }else{
      value = true;
    }
    //feature_code处理
    var arr = [20,21,13,40,15,19,16,17,18,24,41,42,22,39,23,12,38,0,2,1,7,3,4,8,9,10,11,5,6,31];
    for(var j = 0;j<arr.length;j++){
      if(str == 'config/feature_code/feature'+ arr[j] + '/enabled'){
        value = '0'
        break;
      }
    }
    //编码silence_suppression处理
    for(var i = 0;i<16;i++){
      if(str == 'config/media/codec'+ i + '/silence_suppression'){
        value = '1'
        break;
      }
    }
  }else if(value  == 'disable' || value == 'off' || value == 'false'){
    if(str == 'config/system/entrypt_param/sip_encrypt'){
      value = 1;
    }else{
      value = false;
    }
    //feature_code处理
    var arr = [20,21,13,40,15,19,16,17,18,24,41,42,22,39,23,12,38,0,2,1,7,3,4,8,9,10,11,5,6,31];
    for(var j = 0;j<arr.length;j++){
      if(str == 'config/feature_code/feature'+ arr[j] + '/enabled'){
        value = '1'
        break;
      }
    }
    //编码silence_suppression处理
    for(var i = 0;i<16;i++){
      if(str == 'config/media/codec'+ i + '/silence_suppression'){
        value = '0'
        break;
      }
    }
  }

  //alt属性组合完成后，对特殊字段进行处理
  if(str == 'config/sipserver/transport'){
    if(value == 'udp'){
      value = 0 ;
    }else if (value == 'tcp'){
      value = 1 ;
    }else{
      value = 4 ;
    }
  }
  if(str == 'config/simserver/password'){
    value = decode64(value);
  }
  if(str == 'config/tr069/Enable'){
    if(value == '0'){
      value = false ;
    }else{
      value = true ;
    }
  }
  if(str == 'config/tr069/agent/periodic/enable'){
    if(value == '0'){
      value = false ;
    }else{
      value = true ;
    }
  }
  if(str == 'config/media/payload_pype_prefered'){
    if(value == 'local'){
      value = 0 ;
    }else{
      value = 1 ;
    }
  }
   //编码payload_type处理
  for(var i = 0;i<16;i++){
    if(str == 'config/media/codec'+ i + '/payload_type'){
      if(value != 0 && value != 4 && value != 8 && value != 18){
        value = '动态';
        break;
      }else{
        break;
      }
    }
  }
  
  for(var i in formData){
    if(document.getElementsByName(i)[0].attributes.alt){
      if(document.getElementsByName(i)[0].attributes.alt.value != undefined){
        //判断是否为重载当前项功能
        if(checkCurrent){
          if(i != current){
            continue;
          }
        }
        //对alt有类似的字段，进行特殊处理
        if(str == 'config/media/payload_pype'){
          if(document.getElementsByName(i)[0].attributes.alt.value == str){
            if(document.getElementsByName(i)[0].type == 'checkbox'){
              document.getElementsByName(i)[0].checked = value;
              document.getElementsByName(i)[0].parentNode.style.color = 'orange';
              break;
            }else if(document.getElementsByName(i)[0].type == 'radio'){
              var len = document.getElementsByName(i).length;
              for(var j = 0;j<len;j++){
                document.getElementsByName(i)[j].parentNode.style.color = 'orange';
                if(document.getElementsByName(i)[j].value == value){
                  document.getElementsByName(i)[j].checked = true;
                }
              }
              break;
            }else{
              document.getElementsByName(i)[0].value = value;
              document.getElementsByName(i)[0].style.color = 'orange';
              break;
            }
          }
        }else if(str == 'config/system/ntp/DaylightSavingTime/end_day'){
          var name = 'EndDay';
          if(document.getElementsByName("CheckEndDate")[1].checked == true){
            name = 'EndWeekNo';
          }
          if(name == i){
            //判断checkbox,对不同字段进行处理
            if(document.getElementsByName(i)[0].type == 'checkbox'){
              document.getElementsByName(i)[0].checked = value;
              document.getElementsByName(i)[0].parentNode.style.color = 'orange';
              break;
            }else if(document.getElementsByName(i)[0].type == 'radio'){
              var len = document.getElementsByName(i).length;
              for(var j = 0;j<len;j++){
                document.getElementsByName(i)[j].parentNode.style.color = 'orange';
                if(document.getElementsByName(i)[j].value == value){
                  document.getElementsByName(i)[j].checked = true;
                }
              }
              break;
            }else{
              document.getElementsByName(i)[0].value = value;
              document.getElementsByName(i)[0].style.color = 'orange';
              break;
            }
          }
        }else{
          if(name.test(document.getElementsByName(i)[0].attributes.alt.value)){
            if(document.getElementsByName(i)[0].type == 'checkbox'){
              document.getElementsByName(i)[0].checked = value;
              document.getElementsByName(i)[0].parentNode.style.color = 'orange';
              break;
            }else if(document.getElementsByName(i)[0].type == 'radio'){
              changeRadioToSelect(i,value)
              break;
            }else{
              changeElseToSelect(i,value);
              break;
            }
          }
        }
      }
    }
  }
}

function changeElseToSelect(name,value){
  document.getElementsByName(name)[0].value = value;
  document.getElementsByName(name)[0].style.color = 'orange';
}

function changeRadioToSelect(name,value){
  var len = document.getElementsByName(name).length;
  for(var j = 0;j<len;j++){
    document.getElementsByName(name)[j].parentNode.style.color = 'orange';
    if(document.getElementsByName(name)[j].value == value){
      document.getElementsByName(name)[j].checked = true;
    }
  }
}

var saveChange = function(rootNode){
//  if(parent.document.getElementById('modelTab_id') != null){
//    parent.document.getElementById('modelTab_id').innerHTML = '模板编辑器';
//  }
//  rootNode = typeof rootNode == 'string' ? document.getElementById(rootNode) : rootNode;
//  var formValues = getFormValues(rootNode);
//  for (var i = 0; i < formValues.length; i++)
//  {
//    var name = formValues[i].name;
//    if(name  == ""){
//      continue;
//    }
//    if(document.getElementsByName(name)[0].type == 'checkbox'){
//      document.getElementsByName(name)[0].parentNode.style.color = 'grey';
//    }else if(document.getElementsByName(name)[0].type == 'radio'){
//      var len = document.getElementsByName(name).length;
//      for(var j = 0;j<len;j++){
//        document.getElementsByName(name)[j].parentNode.style.color = 'grey';;
//      }
//    }else{
//      document.getElementsByName(name)[0].style.borderColor = 'grey';
//      document.getElementsByName(name)[0].style.color = 'grey';
//    }
//  }
  //保存成功，判断是否为窗口打开模式，若是，则定时关闭窗口，若是tab，则关闭tab
  if(parent.Ext && parent.Ext.getCmp('modelGrid_remote')){
    setTimeout(function(){
      parent.Ext.getCmp('modelGrid_remote').destroy();
    },800)
  }else{
    if(parent.document.getElementById('modelTab_id') == null){
      setTimeout(function(){
        window.close();
      },800)
    }
  }
}

var changeToJson = function(form_data){
  var config = [];
  var obj = {};
  for(var i in form_data){
    if(i != ""){
      var alt = document.getElementsByName(i)[0].alt!=undefined?document.getElementsByName(i)[0].alt:(document.getElementsByName(i)[0].attributes.alt!=undefined?document.getElementsByName(i)[0].attributes.alt.value:undefined);
      if(alt){
        alt = alt.split('/');
        if(obj[alt[1]]){
          if(obj[alt[1]][alt[2]]){
            if(alt[4]){
              if( obj[alt[1]][alt[2]][alt[3]]){
                obj[alt[1]][alt[2]][alt[3]][alt[4]] = form_data[i];
              }else{
                obj[alt[1]][alt[2]][alt[3]] = {};
                obj[alt[1]][alt[2]][alt[3]][alt[4]] = form_data[i];
              }
            }else{
              obj[alt[1]][alt[2]][alt[3]] = form_data[i];
            }
          }else{
            obj[alt[1]][alt[2]] = {};
            if(alt[4]){
              obj[alt[1]][alt[2]][alt[3]] = {};
              obj[alt[1]][alt[2]][alt[3]][alt[4]] = form_data[i];
            }else{
              if(alt[3]){
                obj[alt[1]][alt[2]][alt[3]] = form_data[i];
              }else{
                obj[alt[1]][alt[2]] = form_data[i];
              }
            }
          }
        }else{
          obj[alt[1]] = {};
          obj[alt[1]][alt[2]] = {};
          if(alt[4]){
            obj[alt[1]][alt[2]][alt[3]] = {};
            obj[alt[1]][alt[2]][alt[3]][alt[4]] = form_data[i];
          }else{
            if(alt[3]){
              obj[alt[1]][alt[2]][alt[3]] = form_data[i];
            }else{
              obj[alt[1]][alt[2]] = form_data[i];
            }
          }
        }
      }
    }
//    config.push(obj);
//    obj={};
  }
  return obj;
}

var jsonToXml1 = function(para,content){
  var xmlDoc = "";
  if(typeof(content) != 'object'){
    xmlDoc += "<param name='" + para + "' value='" + content + "'/>"
  }else{
    xmlDoc += "<" + para + ">";
    for(var i in  content){
      if(typeof(content[i]) == 'object'){
        xmlDoc += jsonToXml2(i,content[i])
      }else{
        xmlDoc += "<param name='" + i + "' value='" + content[i] + "'/>"
      }
    }
    xmlDoc += "</" + para + ">"
  }
  return xmlDoc;
}

var jsonToXml2 = function(para,content){
//  console.log(para.split('{').length);
  if(para.split("{").length != 1){
    var a = para.split("{")[0];
    var b = para.split("{")[1].split("}")[0];
    para = a + $("#" + b).val()
  }
  var xmlDoc = "<" + para + ">"
  for(var i in content){
    if(typeof(content[i]) == 'object'){
      xmlDoc += jsonToXml2(i,content[i])
    }else{
      xmlDoc += "<param name='" + i + "' value='" + content[i] + "'/>"
    }
  }
  xmlDoc += "</" + para + ">"
  return xmlDoc;
}

var addChange = function(rootNode){
    rootNode = typeof rootNode == 'string' ? document.getElementById(rootNode) : rootNode;
    var formValues = getFormValues(rootNode);
    for (var i = 0; i < formValues.length; i++)
    {
        var name = formValues[i].name;
      if(name  == ""){
        continue;
      }
      var len = document.getElementsByName(name).length;
      for(var k = 0;k<len;k++){
        if(document.getElementsByName(name)[k].type == 'button'){
          continue;
        }else{
          $(document.getElementsByName(name)[k]).attr('onchange','checkChange(\''+ name + '\');');
          $(document.getElementsByName(name)[k]).attr('onfocus','checkFocus(\''+ name + '\');');
        }
      }
      //change color
      if(document.getElementsByName(name)[0].type == 'checkbox'){
        document.getElementsByName(name)[0].parentNode.style.color = 'grey';
      }else if(document.getElementsByName(name)[0].type == 'button'){
        continue;
      }else if(document.getElementsByName(name)[0].type == 'radio'){
        for(var j=0;j<len;j++){
          document.getElementsByName(name)[j].parentNode.style.color = 'grey';
        }
      }else{
        document.getElementsByName(name)[0].style.color = 'grey';
        document.getElementsByName(name)[0].style.borderColor = 'grey';
      }
    }
}

var form2object = function(rootNode, delimiter , isSkip)
{
  rootNode = typeof rootNode == 'string' ? document.getElementById(rootNode) : rootNode;
  delimiter = delimiter || '.';
  var formValues = getFormValues(rootNode);
  var result = {};
  var arrays = {};

  for (var i = 0; i < formValues.length; i++)
  {
    var value = formValues[i].value;
    //if (value === '') continue;

    var name = formValues[i].name;
    var nameParts = name.split(delimiter);

    var currResult = result;

    if(name == ''){
      continue;
    }

    if(isSkip){
      //当该属性未被修改时，跳过（只保存修改过的属性字段）
      if(document.getElementsByName(nameParts[0])[0] != undefined){
        if(document.getElementsByName(nameParts[0])[0].type == 'checkbox' || document.getElementsByName(nameParts[0])[0].type == 'radio'){
          if(document.getElementsByName(nameParts[0])[0].parentNode.style.color == 'grey' ||
            document.getElementsByName(nameParts[0])[0].parentNode.style.color == 'rgb(128, 128, 128)'
            ){
            continue;
          }
        }else if(document.getElementsByName(nameParts[0])[0].type == 'button'){
          continue;
        }else{
          if(document.getElementsByName(nameParts[0])[0].style.color == 'grey' ||
            document.getElementsByName(nameParts[0])[0].style.color == 'rgb(128, 128, 128)'
            ){
            continue;
          }
        }
      }
    }

    for (var j = 0; j < nameParts.length; j++)
    {
      var namePart = nameParts[j];

      var arrName;

      if (namePart.indexOf('[]') > -1 && j == nameParts.length - 1)
      {
        arrName = namePart.substr(0, namePart.indexOf('['));

        if (!currResult[arrName]) currResult[arrName] = [];
        currResult[arrName].push(value);
      }
      else
      {
        if (namePart.indexOf('[') > -1)
        {
          arrName = namePart.substr(0, namePart.indexOf('['));
          var arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');

          /*
           * Because arrIdx in field name can be not zero-based and step can be
           * other than 1, we can't use them in target array directly.
           * Instead we're making a hash where key is arrIdx and value is a reference to
           * added array element
           */

          if (!arrays[arrName]) arrays[arrName] = {};
          if (!currResult[arrName]) currResult[arrName] = [];

          if (j == nameParts.length - 1)
          {
            currResult[arrName].push(value);
          }
          else
          {
            if (!arrays[arrName][arrIdx])
            {
              currResult[arrName].push({});
              arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
            }
          }

          currResult = arrays[arrName][arrIdx];
        }
        else
        {
          if (j < nameParts.length - 1) /* Not the last part of name - means object */
          {
            if (!currResult[namePart]) currResult[namePart] = {};
            currResult = currResult[namePart];
          }
          else
          {
            currResult[namePart] = value;
          }
        }
      }
    }
  }

  return result;
};

function getFormValues(rootNode)
{
  var result = [];
  var currentNode = rootNode.firstChild;

  while (currentNode)
  {
    if (currentNode.nodeName.match(/INPUT|SELECT|TEXTAREA/i))
    {
      result.push({ name: currentNode.name, value: getFieldValue(currentNode)});
    }
    else
    {
      var subresult = getFormValues(currentNode);
      result = result.concat(subresult);
    }

    currentNode = currentNode.nextSibling;
  }

  return result;
}

function getFieldValue(fieldNode)
{
  if (fieldNode.nodeName == 'INPUT')
  {
    if (fieldNode.type.toLowerCase() == 'radio' || fieldNode.type.toLowerCase() == 'checkbox')
    {
      if (fieldNode.checked && fieldNode.value != "on")
      {
        return fieldNode.value;
      }
      else if(fieldNode.checked)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      if (!fieldNode.type.toLowerCase().match(/button|reset|submit|image/i))
      {
        return fieldNode.value;
      }
    }
  }
  else
  {
    if (fieldNode.nodeName == 'TEXTAREA')
    {
//      return fieldNode.innerHTML;
      return fieldNode.value;
    }
    else
    {
      if (fieldNode.nodeName == 'SELECT')
      {
        return getSelectedOptionValue(fieldNode);
      }
    }
  }

  return '';
}

function getSelectedOptionValue(selectNode)
{
  var multiple = selectNode.multiple;
  if (!multiple) return selectNode.value;

  var result = [];
  for (var options = selectNode.getElementsByTagName("option"), i = 0, l = options.length; i < l; i++)
  {
    if (options[i].selected) result.push(options[i].value);
  }

  return result;
}