define(['text!html/field/select.html',"ajax-file-upload"],function (select){
	//弹出对话框
	function confirm(confirmText,cb){
		var pn=$("#myModal");
	    if(!pn) return;
	    var html="<div class='modal-dialog'>" +
	      "<div class='modal-content'><div class=\"modal-header\">" +
	      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
	      "<h4 class=\"modal-title\" id=\"myModalLabel\">"+'<font class="red"><i class="fa fa-warning"></i>&nbsp;'+confirmText+'</font>'+"</h4></div>" +
	      "<div class=\"\"></form></div>" +
	      "<div class=\"modal-footer\"><button name=\"close\" type=\"button\" class=\"btn btn-default btn-sm\" data-dismiss=\"modal\">"+window.lc.getValue("cancel")+"</button>" +
	      "<button name=\"commit\" type=\"button\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue("confirm")+"</button></div></div><!-- /.modal-content --></div>"
	    pn.html("");
	    pn.append(html);
	    $('#myModal').modal().css({
	      width: 'auto',
	      backdrop:false
	    });
	    $('#myModal button[name=commit]').bind("click",function(){
	    	$('#myModal button[name=close]').trigger("click");
	    	if(cb)
	    	cb();
	    });
	}
	function confirm1(confirmText,cb){
		var pn=$("#myModal");
	    if(!pn) return;
	    var html="<div class='modal-dialog'>" +
	      "<div class='modal-content' style=\"border-bottom-color: #ffffff;height: 82px\">" +
	      "<div class=\"modal-header\">" +
	      "<button type=\"button\" name=\"close\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
	      "<h4 class=\"modal-title\" name=\"name1\" id=\"myModalLabel\">"+'<font class="red"><i class="fa fa-warning"></i>&nbsp;'+confirmText+'</font>'+"</h4>" +
	      "<h3 class=\"modal-title\" style=\"display:none\" id=\"myModalLabel1\">"+'<font class="blue" style="margin-left: 249px;"><i class="fa fa-success"></i>&nbsp;'+window.lc.getValue('message')+'</font>'+"</h3>" +
	      "<h3 class=\"modal-title\" style=\"display:none\" id=\"myModalLabel3\">"+'<font class="blue" style="margin-left: 32%;"><i class="fa fa-success"></i>&nbsp;'+window.lc.getValue('sysnSucess')+'</font>'+"</h3>" +
	      "<h3 class=\"modal-title\" style=\"display:none\" id=\"myModalLabel4\">"+'<font class="blue" style="margin-left: 200px;"><i class="fa fa-success"></i>&nbsp;'+window.lc.getValue('sysnFail')+'</font>'+"</h3>" +
	      "<h4 class=\"modal-title\" id=\"myModalLabel2\" style=\"display:none;margin-top: 0px;margin-bottom: -5px;\">"+'<font class="gray" style="font-size: 20px;color: blue; margin-left: 31px;"><i class="fa fa-success" ></i>&nbsp;'+window.lc.getValue('pleaseWaitAMoment')+'</font>'+"</h4></div>" +
	      "<div style=\"display:none\" class=\"progress\">"+
	      "<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar \" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\">" +
	        "<span class=\"sr-only\">60% Complete</span>" +
	      "</div>" +
	     "</div>" +
	    
	     
	      /*"<div class=\"\"></form></div>" +*/
	     "<div id=\"modal-footer\" class=\"modal-footer\"><button name=\"close\" type=\"button\" class=\"btn btn-default btn-sm\" data-dismiss=\"modal\">"+window.lc.getValue("cancel")+"</button>" +
	      "<button name=\"commit\" type=\"button\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue("confirm")+"</button>" +
	      "<button name=\"commit1\" style=\"display:none\"type=\"button\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue("confirm")+"</button>"+
	      "</div></div><!-- /.modal-content --></div>"
	    pn.html("");
	    pn.append(html);
	   
	    $('#myModal').modal({
	        backdrop: false
	      })
	    $('#myModal button[name=commit]').bind("click",function(){
	    	
	    	$('#myModalLabel').hide();
	    	$('#myModalLabel1').show();
	    	$('#myModalLabel2').show();
	    	$('button[name=close]').hide();
	    	$('.progress').show();
	    	$('button[name=commit]').hide();
	    	$('.modal-content').height(153);
	    	document.getElementById("modal-footer").style.backgroundColor="#fff";
	    	document.getElementById("modal-footer").style.borderTopColor="#fff";
	    	if(cb)
	    	cb();
	    });
	}
	/*function confirm2(confirmText,confirmText1){
		var pn=$("#myModal");
	    if(!pn) return;
	    var html="<div class='modal-dialog'>" +
	      "<div class='modal-content'><div class=\"modal-header\">" +
	      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
	      "<h4 class=\"modal-title\" id=\"myModalLabel\">"+'<font class="blue" style="margin-left: 229px;"><i class="fa fa-success"></i>&nbsp;'+confirmText1+'</font>'+"</h4></div>" +
	      "<h4 class=\"modal-title\" style=\"height: 44px; margin-top:22px\" id=\"myModalLabel\">"+'<font class="blue" style="margin-left: 224px;"><i class="fa fa-success"></i>&nbsp;'+confirmText+'</font>'+"</h4></div>" +
	      "<div class=\"\"></form></div>" +
	      "<div class=\"modal-footer\">"+
	      "<button name=\"commit\" style=\"left: -289px;\" type=\"button\" class=\"btn btn-info btn-sm\">确认</button></div></div><!-- /.modal-content --></div>"
	    pn.html("");
	    pn.append(html);
	    $('#myModal').modal({
	        backdrop: false
	      })
	    $('#myModal button[name=commit]').bind("click",function(){
	    
	    	
	    });
	   
	}*/
	function confirm3(confirmText,cb){
	
		var pn=$("#myModal");
	    if(!pn) return;
		$.ajax({ 
			url: "domainListManager!getDmList.action", 
			data:{domainUuid:window.user.dstDomainUuid},
			complete: function(data,str){
			window.domainList=data.responseJSON.domainList;
		     }
		});
	    var tempFn = window.dot.template(select);
	    var selh = tempFn({multiple:true,placeholder:window.lc.getValue("notSel"),multiCls:true,name:"alarmIdl",label:window.lc.getValue("plSelDomain")
	    	,list:window.domainList,help:window.lc.getValue("domainHelp")});
	    var html="<div class='modal-dialog'>" +
	      "<div class='modal-content'><div class=\"modal-header\">" +
	      "<button name=\"close\"type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
	      "<h4 class=\"modal-title\" id=\"myModalLabel\">"+'<font class="red"><i class="fa fa-warning"></i>&nbsp;'+confirmText+'</font>'+"</h4>" +
	      "<h4 class=\"modal-title\" style=\"display:none\" id=\"myModalLabel1\">"+'<font class="blue"><i class="fa fa-info"></i>&nbsp;'+window.lc.getValue('uploadFile')+'</font>'+"</h4>" +
	      "<h4 class=\"modal-title\" style=\"display:none;margin-left:208px\" id=\"myModalLabel2\">"+'<font class="blue"><i class="fa fa-success"></i>&nbsp;'+window.lc.getValue('uploadSuccess')+'</font>'+"</h4>" +
	      "<h4 class=\"modal-title\" style=\"display:none;margin-left:208px\" id=\"myModalLabel3\">"+'<font class="red"><i class="fa fa-warning"></i>&nbsp;'+window.lc.getValue('uploadFail')+'</font>'+"</h4>" +
	      "<div class=\"form-group\">"
	      +"<form id=\"myFile\" name=\"param\" role=\"form\">"
	      +"<label for=\"inputfile\"></label>"
	      +"<input type=\"file\" id=\"inputfile\" name=\"file\">"
	      +"<p class=\"help-block\">"+window.lc.getValue("plSelFile")+".</p>"
	      +"</from>"
	       +"</div>"
	       +"<div id=\"domainSelect\">"
	       +selh
	       +"</div>"
	       +"<div>"
	       +"<p id=\"myModalLabel5\" class=\"help-block\">"+window.lc.getValue("desc")+":</p>"
	       +"<textarea id=\"detailDesc\" name=\"detailDesc\" class=\"form-control\" style=\"height:40px;\" >"
		   +"</textarea>"
	       +"</div>"
	       +"</div>" + 
	       "<div style=\"display:none\" class=\"progress\">"+
		      "<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar \" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\">" +
		        "<span class=\"sr-only\">60% Complete</span>" +
		      "</div>" +
		     "</div>" +
	       //"<div class=\"\"></form></div>" +
	      "<div id=\"modal-footer\" class=\"modal-footer\"><button name=\"close\" type=\"button\" class=\"btn btn-default btn-sm\" data-dismiss=\"modal\">"+window.lc.getValue("cancel")+"</button>" +
	      "<button name=\"commit\" type=\"button\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue("confirm")+"</button>" +
	      "<button name=\"commit1\" style=\"display:none\"type=\"button\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue("confirm")+"</button>"+
	      "</div></div><!-- /.modal-content --></div>"
	    pn.html("");
	    pn.append(html);
	    $('#myModal').modal({
	        backdrop: false
	      })
	      window.global.doMultiSelect('domainSelect');
	    //if(window.sysMode!=10||window.sysMode!=11){
	    	//$('#domainSelect').hide();
	   // }
	    
	     $('#inputfile').ace_file_input();//进行样式格式化
	     var productId=$('#inputfile').val();
	    $('#myModal button[name=commit]').bind("click",function(){
	   
	    	var  domainValue=$('#domainSelect select').val();
	    	var file=$('#inputfile').val();
	    	if(!file){
	    		return window.tip.show_pk("danger",null,window.lc.getValue("plSelFile"));
	    	}
	    	if(!file.endWith(".gz") && !file.endWith(".zip")){
	    		return window.tip.show_pk("danger",null,window.lc.getValue("fileFormatGzOrZip"));
	    	}
	    	if (domainValue==undefined){
	    		domainValue="";
	    	}
	    	var detailDesc=$('#detailDesc').val();
	    	if(!detailDesc){
	    	return window.tip.show_pk("danger",null,window.lc.getValue("detailDescNotNull"))
	    	}
	    	var params=$('#myModal form[name=param]').formSerialize();//进行序列化
	     params+="&provUrl="+window.extra.provUrl;
	    	params+="&domainValue="+domainValue;
	    	params+="&seeStatus=1";
	    	//params+="&provUrl=172.16.0.40";
	    	params+="&detailDesc="+detailDesc;
		    $.ajaxFileUpload({
		        url : "importVersion.action?"+params,// 需要链接到服务器地址
		        fileElementId : "inputfile", // 文件选择框的id属性
		        dataType : 'json', // 服务器返回的格式，可以是json
		        success: function (data)  //服务器成功响应处理函数
	            {  
		    	
	            },
	            error: function (data)//服务器响应失败处理函数
	             {    
	            	if(eval("(" + data.responseText+ ")").success){
	            	
	            	$('#myModalLabel2').show();
					$('#myModalLabel1').hide();
			    	$('button[name=close]').show();
			    	$('.progress').hide();
			    	$('button[name=commit1]').show();
			    	$('.modal-content').height(130);
			    	$('.modal-footer button[name=close]').hide();
			    	$('button[name=refresh]').click();
			    	 $('#myModal button[name=commit1]').bind("click",function(){
				 	    	$('#myModal button[name=close]').trigger("click");
				    	 });
	            }else {
	            	$('#myModalLabel3').show();
					$('#myModalLabel1').hide();
			    	$('button[name=close]').show();
			    	$('.progress').hide();
			    	$('button[name=commit1]').show();
			    	$('.modal-content').height(130);
			    	$('.modal-footer button[name=close]').hide();
			    	$('button[name=refresh]').click();
			    	 $('#myModal button[name=commit1]').bind("click",function(){
				 	    	$('#myModal button[name=close]').trigger("click");
				    	 });
	            }
	            }
		    });
	    	$('#myModalLabel1').show();
	    	$('#myModalLabel').hide();
	    	$('button[name=close]').hide();
	    	$('#myFile').hide();
	    	$('.progress').show();
	    	$('button[name=commit]').hide();
	    	$('#domainSelect').hide();
	    	$('#detailDesc').hide();
	    	$('#myModalLabel5').hide();
	    	$('.modal-content').height(130);
	    	document.getElementById("modal-footer").style.backgroundColor="#fff";
	    	document.getElementById("modal-footer").style.borderTopColor="#fff";
	    	if(cb)
	    	cb();
	    });
	   
	}
	function confirmReboot(confirmText,cb){
		var pn=$("#myModal");
	    if(!pn) return;
	    var html="<div class='modal-dialog'>" +
	      "<div class='modal-content'><div class=\"modal-header\">" +
	      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
	      "<h4 class=\"modal-title\" id=\"myModalLabel\">"+'<font class="red"><i class="fa fa-warning"></i>&nbsp;'+confirmText+'</font>'+"</h4>" +
	      "<div id=\"vcodeitem\" class=\"g-collection-item\">"+
	      "<label name=\"imageVeriSpec\" class=\"g-collection-label\"><span class=\"txt-impt\" style=\" color:red\">*</span>&nbsp;"+window.lc.getValue("validCode")+"：</label>"+
	      "<div class=\"ipt-wraper\" id=\"verifycodeWrap\">"+
          "<input id=\"verify\" name=\"verify\" type=\"text\" onfocus=\"document.getElementById('verif_div').style.display='none'\"; class=\"g-ipt\" style=\"width:214px\" tabindex=\"9\" />"+ 
          "<img src=\"rand.action\" id=\"verifyImg\" onclick='changeValidateCode1(this)'/>"+ 
		  "<div id=\"verif_div\" class=\"tit\"  style=\"display:none;color: red;font-size: 20px;\"></div>"+
		  "<div id=\"verifyCodeNot\" class=\"txt-info\"><span id=\"showimgMsg\" name=\"imageVeriTips\">"+window.lc.getValue("notClearPlClick")+"</span> <a href=\"javascript:changeValidateCode1(document.getElementById('verifyImg'));\" name=\"changeImage\" id=\"imageA\">"+window.lc.getValue("changeAnother")+"</a></div>"+
          "</div>"+
          "</div>"+
	      "</div>" +
	      "<div class=\"\"></form></div>" +
	      "<div class=\"modal-footer\"><button name=\"close\" type=\"button\" class=\"btn btn-default btn-sm\" data-dismiss=\"modal\">"+window.lc.getValue("cancel")+"</button>" +
	      "<button name=\"commit\" type=\"button\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue("confirm")+"</button></div></div><!-- /.modal-content --></div>"
	    pn.html("");
	    pn.append(html);
	    $('#myModal').modal().css({
	      width: 'auto',
	      backdrop:false
	    });
	    
	    $('#myModal button[name=commit]').bind("click",function(){
	    	var vedorId=document.getElementById("verify").value;
	    	
	    	  $.ajax({
	    		  url:'validationRandom.action',
	    		  type:'post',
	    		  data:{'vedorId':vedorId,domainUuid:window.user.domainUuid,userUuid:window.user.uuid},
	    		  complete: function(data){
                 if(data.responseJSON.value==1){
                	var verifdiv= document.getElementById("verif_div");
                	verifdiv.innerHTML=window.lc.getValue('validationIsNull');
        			verifdiv.style.display=''
                	 return;
                 }else if(data.responseJSON.value==2){
                	 var verifdiv= document.getElementById("verif_div");
                 	verifdiv.innerHTML=window.lc.getValue('validationError');
         			verifdiv.style.display=''
                 	 return;
                  }else if(data.responseJSON.value==0){
                	$('#myModal button[name=close]').trigger("click");
          	    	if(cb)
          	    	cb();
                  }	    			  
	    		  }
	    	  })
	    	
	    });
	}
	//弹出消息模块的对话框
	 function creatMes(confirmText,confirmText1){
		 var pn=$("#myModal");
		    if(!pn) return;
		    var html="<div class='modal-dialog'>" +
		      "<div class='modal-content'><div class=\"modal-header\">" +
		      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
		      "<h3 class=\"modal-title\" id=\"myModalLabel\">"+'<font class="blue" style="margin-left: 206px;"><i class="fa fa-success"></i>&nbsp;'+confirmText+'</font>'+"</h3></div>" +
		      "<h4 class=\"modal-title\"  style=\"margin-top: 13px;margin-bottom: 13px;\">"+'<font class="gray" style="font-size: 20px;color: blue; margin-left: 31px;"><i class="fa fa-success" ></i>&nbsp;'+confirmText1+'</font>'+"</h4></div>" +
		      "<div class=\"\"></form></div>" +
		      "<div class=\"modal-footer\"><h3   id=\"another-message\" style=\"left:-24px\"class=\"btn btn-danger btn-sm\" data-dismiss=\"modal\">"+window.lc.getValue('writeAnotherMessage')+" </h3>" +
		      "<h3  style=\"left:4px\" id=\"view-message\" class=\"btn btn-danger btn-sm\">"+window.lc.getValue('viewThisMessage')+"</h3></div></div></div>"
		    pn.html("");
		    pn.append(html);
		    $('#myModal').modal().css({
		      width: 'auto',
		      backdrop:false
		    });
		   
		 
	 }
	 //但接收到新消息时弹出消息
	 function creatTip(roleType,record){
		 var pn=$("#myModal");
		    if(!pn) return;
		    if(record.cancelStatus!=0){
		    	return;
		    }
		    
		    var reg = /^[A-Za-z]+$/;
		    if(reg.test(record.theme)){
		    if(record.theme.length>40&&record.theme.length<80){
		    	record.theme=record.theme.substring(0,40)+"</br>"+record.theme.substring(40,record.theme.length);
		    }else if(record.theme.length>80&&record.theme.length<126){
		    	record.theme=record.theme.substring(0,40)+"</br>"+record.theme.substring(40,90)+"</br>"+record.theme.substring(90,record.theme.length);	
		    }
		    }
		    var html="<div class='modal-dialog'>" +
		      "<div class='modal-content'><div class=\"modal-header\">" +
		      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
		      "<h3 class=\"modal-title\" id=\"myModalLabel\">"+'<font class="blue"><i class="fa fa-success"></i>&nbsp;'+window.lc.getValue("addresser")+':&nbsp&nbsp&nbsp'+record.srcUserName+'</font>'+'<font style=" font-size: 14px;color: rgb(55, 51, 31);margin-left: 18px; "class="gray"><i class="fa fa-success"></i>&nbsp;&lt'+roleType+'&gt</font>'+"</h3></div>" +
		      "<div class=\"modal-title\" style=\"font-size:24px\" >"+'<font class="blue" ><i class="fa fa-success" style="margin-left: 15px;"></i>'+window.lc.getValue("theme")+': </font>'+'<font class="gray" style="font-size:24px;margin-left:9px;"><i class="fa fa-success"></i>'+record.theme+'</font>'+"</div>" +
		      "<div class=\"modal-title\" style=\"font-size:24px\" >"+'<font class="blue" ><i class="fa fa-success" style="margin-left: 15px;"></i>'+window.lc.getValue("time")+': </font>'+'<font class="gray" style="font-size:22px;margin-left:9px;"><i class="fa fa-success"></i>'+window.format.timeStaticFormat(record.time)+'</font>'+"</div></div>" +
              "<div class=\"\"></form></div>" +
		      "<div class=\"modal-footer\"><textarea name=\"textarea\" class=\"form-control\" rows=\"20\" placeholder=\"请输入文本\">"+record.content+"</textarea></div><!-- /.modal-content --></div>"
		    pn.html("");
		    pn.append(html);
		    $('#myModal').modal().css({
		      width: 'auto',
		      backdrop:false
		    });
		           
	
		    $('#myModal button[name=commit]').bind("click",function(){
		    	$('#myModal button[name=close]').trigger("click");
		    	 $('#myTab a[href=#mes_received]').tab("show");
		    	 require(["rec-msg"], function (rec) {
			    		rec.createView('mes_received');
			    		
			    	});
		    });
		  
		 
	 }
	function createModel(obj){
		//obj格式{title:"",body:"",commit:true}
		var pn=$("#myModal");
		if(!pn) return;
		require(['text!modal.html'],function(tpl){
            var tempFn = window.dot.template(tpl);
            var html = tempFn(obj);
            pn.html(html);
			$('#myModal').modal().css({
			    width: 'auto',
			    backdrop:false,
			});
	  	})
	}
	
    return {
    	confirm:confirm,
    	createModel:createModel,
    	creatMes:creatMes,
    	creatTip:creatTip,
    	confirmReboot:confirmReboot,
    	confirm1:confirm1,
    	
    	confirm3:confirm3,
    };
});


