define(["progress","form-field"],function (pg,field){
	function openService(etype,list,uuid,tpl){
		if(!etype)
			return;
		var pn=$("#myModal");
		if(!pn) return;
	    var tempFn = window.dot.template(tpl);
	    var html = tempFn({close:window.lc.getValue("close")
	    	,commit:window.lc.getValue("commit"),add:window.lc.getValue("add")});
		pn.html(html);
		var n=$("#myModalForm");
		if(!n) return;
		var html='';
		var domainUuid=window.user.dstDomainUuid;
		if(!domainUuid){
			domainUuid=window.global.getDomainUuid();
			
		}
		if(!domainUuid){
			window.tip.show_pk("info",null,window.lc.getValue("plSelServUnderDomain"));
			return;
		}
		var hide=false;
		if(domainUuid){
			hide=true;
		}
		html+=field.getComboField("cloudUuid","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("cloud"),[],hide);
		html+=field.getTextField("uuid","",'<font color="red">*</font>&nbsp;UUID',"","number");
		html+=field.getTextField("name","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("name"));
		html+=field.getTextField("alias","",window.lc.getValue("alias"));
		html+=field.getTextField("sysIpAddr","",'<font color="red">*</font>&nbsp;IP '+window.lc.getValue("addr"));
		html+=field.getTextareaField("detailDesc","",window.lc.getValue("desc"));
		n.html(html);
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		if(domainUuid){
			$("#myModalForm select[name=cloudUuid]").val(domainUuid);
		}
		if(uuid){
			$("#myModalForm input[name=uuid]").attr("readOnly",true);
			$("#myModalForm input[name=uuid]").val(uuid);
			$("#myModalForm input[name=name]").val("server_"+uuid);
			$("#myModalForm input[name=name]").attr("readOnly",true);
		}
		$('#myModal button[name=commit]').bind("click",function(){
			var name=$('#myModal input[name=name]');
			var uuid=$('#myModal input[name=uuid]');
			var ipv=$("#myModalForm input[name=sysIpAddr]").val();
			if(!ipv){
				window.tip.show_pk("warning",null,window.lc.getValue("ipCanNotEmpty"));
				return;
			}
			if(!window.validate.isIP(ipv)){
				window.tip.show_pk("warning",null,window.lc.getValue("ipNotValid"));
				return;
			}
			$.ajax({ url: "sysManager!checkSysIp.action", data:{sysIpAddr:ipv,domainUuid:domainUuid},complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){				
					next();
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("ipIsExist")+"!");
				}
			}});
			function next(){
				field.check(uuid.val(),"systemUuid",false,uuid,function(){
					field.check(name.val(),"systemName",true,name,function(){
						 var productId=61;
						 if(etype=="dc"){
							 productId=62;
						 }
						 var pa=$("#myModalForm").formSerialize();
						 pa+="&productId="+productId;
						 pa+="&cloudUuid="+domainUuid;
						 pa+="&domainUuid="+domainUuid;
						 $.ajax({ url: "sysManager!addSys.action", data:pa,complete: function(data,str){
								$('#myModal button[name=close]').trigger("click");
								if(data.responseJSON && data.responseJSON.success){
									window.tip.show_pk("success",null,window.lc.getValue("commitSucc")+"!");
								}else{
									window.tip.show_pk("danger",null,window.lc.getValue("commitFail")+"!");
								}
							}});
					});
				});
			}			
		});
	}
	function addServer(){
		var pa={};
		if(!window.global.getDomainUuid()){
			return;
		}
		pa.domainUuid=window.global.getDomainUuid();
		 $.ajax({ url: "sysManager!findMaxSysUuid.action", data:pa,complete: function(data,str){
				if(data.responseJSON && data.responseJSON.uuid){
					require(['text!html/service/AddServer.html'],function(tpl){
						openService(window.global.getEtype(),null,data.responseJSON.uuid,tpl);
					})										
				}
			}});
	}
	function addNum(lid){
		var pn=$("#myModal");
		if(!pn) return;
		createAddNumHtml(window.lc.getValue("add"));
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var name=$("#myModal input[name=name]").val();
			var domainUuid=window.global.getDomainUuid();
			var pa=form.formSerialize();
			pa+="&domainUuid="+domainUuid;			
			$.ajax({ 
				url: "numDMManager!addNum.action",
				data:pa,
				complete: function(data,str){
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});			
		});		
	}
	function addWhiteNum(lid,type){
		var pn=$("#myModal");
		if(!pn) return;
        var fh='';		
		fh+=field.getTextField("num","",window.lc.getValue("num"));
		var list=[{text:window.lc.getValue("caller"),value:"1"},{text:window.lc.getValue("callee"),value:"2"}];
		fh+=field.getComboField("role","",window.lc.getValue("option"),list);
 		if(type=="black"){
 			fh+=field.getTextField("timeLimit","",window.lc.getValue("period")+"("+window.lc.getValue("mins")+")","","",false,window.lc.getValue("ifEmptyUseGlobal"));
 			fh+=field.getTextField("maxNum","",window.lc.getValue("callMaxNum"),"","",false,window.lc.getValue("ifEmptyUseGlobal"));
 		}
 		fh+=field.getTextareaField("detailDesc","",window.lc.getValue("desc"));
		createAddNumHtml(window.lc.getValue("add"),fh);
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var domainUuid=window.global.getDomainUuid();
			var pa=form.formSerialize();
			pa+="&dstDomainUuid="+domainUuid;
			pa+="&type="+type;
			$.ajax({ 
				url: "freqManager!addWhiteNum.action",
				data:pa,
				complete: function(data,str){
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});			
		});		
	}
	function createAddNumHtml(title,fh){
		var pn=$("#myModal");
		if(!pn) return;
		var list=[{text:window.lc.getValue("dmNumAction",1),value:1},{text:window.lc.getValue("dmNumAction",2),value:2}
		,{text:window.lc.getValue("dmNumAction",3),value:3},{text:window.lc.getValue("dmNumAction",4),value:4}];
		var t='';
		if(fh){
			t=fh;
		}else{
			t+=field.getTextField("num","",window.lc.getValue("num"));
			t+=field.getComboField("action","",window.lc.getValue("option"),list);
			t+=field.getTextareaField("detailDesc","",window.lc.getValue("desc"));
		}
		var ti="";
		if(title){
			ti=title;
		}
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +ti
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">';
			  html+=t;
		      html+='</form>'
		      +'</div>'
		      +'<div class="modal-footer">'
		      +'<button name="close" type="button" class="btn btn-default" '
		      +'data-dismiss="modal">'+window.lc.getValue("close")
		      +'</button>'
		      +'<button name="commit" type="button" class="btn btn-primary">'
		      +window.lc.getValue("commit")
		      +'</button>'
		      +'</div>'
		      +'</div><!-- /.modal-content -->'
		      +'</div>';
		pn.html("");
		pn.append(html);
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
	}
	function setNum(lid,rows){
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		 var ids="";
         var name = "";
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
                 name = rows[i]["num"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
        createAddNumHtml(window.lc.getValue("set"));
        var form=$("#myModal form");
        if(rows.length==1){
        	form.autofill(rows[0]);
        }
		$('#myModal button[name=commit]').bind("click",function(){			
			var domainUuid=window.global.getDomainUuid();
			var pa=form.formSerialize();
			pa+="&domainUuid="+domainUuid;
			pa+="&uuids="+ids;
			$.ajax({ 
				url: "numDMManager!updateNum.action",
				data:pa,
				complete: function(data,str){
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});			
		});		
	}
	
	function setWhiteNum(lid,rows){
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(rows.length!=1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}
		 var ids="";
         var name = "";
         var type="white";
         if(rows[0]["freqSwitch"]==1){
        	 type="black";
         }
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
                 name = rows[i]["num"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
         var fh='';		
 		fh+=field.getTextField("num","",window.lc.getValue("num"));
 		var list=[{text:window.lc.getValue("caller"),value:"1"},{text:window.lc.getValue("callee"),value:"2"}];
 		fh+=field.getComboField("role","",window.lc.getValue("option"),list);
 		if(type=="black"){
 			fh+=field.getTextField("timeLimit","",window.lc.getValue("period")+"("+window.lc.getValue("mins")+")","","",false,window.lc.getValue("nullNotChange"));
 			fh+=field.getTextField("maxNum","",window.lc.getValue("callMaxNum"),"","",false,window.lc.getValue("nullNotChange"));
 		}
 		fh+=field.getTextareaField("detailDesc","",window.lc.getValue("desc"));
 		createAddNumHtml(window.lc.getValue("set"),fh);
        var form=$("#myModal form");
        if(rows.length==1){
        	form.autofill(rows[0]);
        	var val=rows[0]["callNum"];
        	$('#myModal input[name=num]').val(val);
        }
		$('#myModal button[name=commit]').bind("click",function(){			
			var domainUuid=window.global.getDomainUuid();
			var pa=form.formSerialize();
			pa+="&dstDomainUuid="+domainUuid;
			pa+="&uuid="+ids;
			$.ajax({ 
				url: "freqManager!setWhiteNum.action",
				data:pa,
				complete: function(data,str){
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,"commitFail");
				}
			}});			
		});		
	}
	
	function setSipServer(lid,rows){
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		 var ids="";
         var name = "";
         for ( var i = 0; i < rows.length; i++) {
        	 //采用同步的方式，允许离线配置sip锁定相关内容
//        	 if(window.sta.isOffline(rows[i]["runStatus"])){
//     			window.tip.show_pk("warning",null,window.lc.getValue("plSelOnlineDev"));
//    			return; 
//        	 }
             if(i==0){
                 ids=rows[i]["uuid"];
                 name = rows[i]["num"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
        var fh='';		
		fh+=field.getSwitch("sipsrvLockFlag","",window.lc.getValue("sipsrvLockFlag"),1);
		fh+='<div id="sip_body">';
		fh+=field.getTextField("primarySipServer","",window.lc.getValue("priSipAddr"));
		fh+=field.getTextField("primarySipsrvPort","",window.lc.getValue("priSipPort"));
		fh+=field.getTextField("secondarySipServer","",window.lc.getValue("secSipAddr"));
		fh+=field.getTextField("secondarySipsrvPort","",window.lc.getValue("secSipPort"));
		fh+='</div>';
        createAddNumHtml(window.lc.getValue("set"),fh);
        var form=$("#myModal form");
        if(rows.length==1){
        	form.autofill(rows[0]);
        }
		$("#sip_body").css("display","none");
		$('#myModal form input[name=sipsrvLockFlag]').bind("click",function(){
			var n=$(this);
			var n=$('#myModal form input[name=sipsrvLockFlag]:checked');
			if(n.length){
				$("#sip_body").css("display","block");
			}else{
				$("#sip_body").css("display","none");
			}
		});
		if(rows[0]["sipsrvLockFlag"]){
			$("#sip_body").css("display","block");
		}else{
			$("#sip_body").css("display","none");
		}
		
		$('#myModal button[name=commit]').bind("click",function(){			
			var domainUuid=window.global.getDomainUuid();
			var primarySipsrvPort=$("#myModal input[name=primarySipsrvPort]").val();
			var secondarySipsrvPort=$("#myModal input[name=secondarySipsrvPort]").val();
			if(isNaN(primarySipsrvPort) || isNaN(secondarySipsrvPort)){
				return window.tip.show_pk("warning",null,"端口必须是数字");
			}
			primarySipsrvPort=parseInt(primarySipsrvPort);
			secondarySipsrvPort=parseInt(secondarySipsrvPort);
			if(primarySipsrvPort<=0 || primarySipsrvPort>=65535){
				return window.tip.show_pk("warning",null,"端口范围为0-65535，不包括0和65535");
			}
			if(secondarySipsrvPort<=0 || secondarySipsrvPort>=65535){
				return window.tip.show_pk("warning",null,"端口范围为0-65535，不包括0和65535");
			}
			var pa=form.formSerialize();
			if(pa.indexOf("sipsrvLockFlag")<0){
				pa+="&sipsrvLockFlag=0";
			}
			pa+="&domainUuid="+domainUuid;
			pa+="&ids="+ids;
			pa+="&alias="+rows[0]["alias"];
			$.ajax({ 
				url: "neManager!updateNeSipServer.action",
				data:pa,
				complete: function(data,str){
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});			
		});		
	}
	
	function importNum(lid,rows){
		var domainUuid=window.global.getDomainUuid();
		var fh=field.getFileField("");
//		var fh='<div class="form-group">'
//	      +'<label for="inputfile">文件输入</label>'
//	      +'<input type="file" id="inputfile">'
//	      +'<p class="help-block">请选择xml文件。</p>'
//	   +'</div>';
        createAddNumHtml(window.lc.getValue("impt"),fh);
        $('#inputfile').ace_file_input();
		$('#myModal button[name=commit]').bind("click",function(){
			var domainUuid=window.global.getDomainUuid();
//			var pa="";
//			pa+="&domainUuid="+domainUuid;
			$('#myModal button[name=close]').trigger("click");
			window.tip.show_pk("info",10,window.lc.getValue("importingPlWait")+"...",true);
			
			$.ajaxFileUpload({ 
				url: "importConfig!importDMNum.action"+"?domainUuid="+domainUuid,
//				data:pa,
				fileElementId:'inputfile',
//				complete: function(data,str){
//				$('#'+lid).bootstrapTable("refresh");
//				$('#myModal button[name=close]').trigger("click");
//				if(data.responseJSON && data.responseJSON.success){
//					window.tip.show_pk("success",null,"导入成功");
//				}else{
//					window.tip.show_pk("danger",null,"导入失败");
//				}
                success: function (data, status)  //服务器成功响应处理函数
                {
				$('#'+lid).bootstrapTable("removeAll");
				$('#'+lid).bootstrapTable("refresh");				
					window.tip.show_pk("success",null,window.lc.getValue("importSucc"));
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                	$('#'+lid).bootstrapTable("removeAll");
    				$('#'+lid).bootstrapTable("refresh");
//    				$('#myModal button[name=close]').trigger("click");
                	window.tip.show_pk("danger",null,window.lc.getValue("importFail"));
                }
			});			
		});		
	}
	function importWhiteNum(lid,rows,type){
		var domainUuid=window.global.getDomainUuid();
		var fh=field.getFileField("");
        createAddNumHtml(window.lc.getValue("impt"),fh);
        $('#inputfile').ace_file_input();
		$('#myModal button[name=commit]').bind("click",function(){
			var domainUuid=window.global.getDomainUuid();
			$('#myModal button[name=close]').trigger("click");
			window.tip.show_pk("info",10,window.lc.getValue("importingPlWait")+"...",true);			
			$.ajaxFileUpload({ 
				url: "http://127.0.0.1:3100/postImportExam?main_type=党规党章&name=试卷一",
//				data:pa,
				fileElementId:'inputfile',
                success: function (data, status)  //服务器成功响应处理函数
                {
					console.log(data)
					$('#'+lid).bootstrapTable("removeAll");
					$('#'+lid).bootstrapTable("refresh");				
					window.tip.show_pk("success",null,window.lc.getValue("importSucc"));
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                	$('#'+lid).bootstrapTable("removeAll");
    				$('#'+lid).bootstrapTable("refresh");
//    				$('#myModal button[name=close]').trigger("click");
                	window.tip.show_pk("danger",null,window.lc.getValue("importFail"));
                }
			});
//			$.ajaxFileUpload({ 
//				url: "importConfig!importFreq.action"+"?domainUuid="+domainUuid,
////				data:pa,
//				fileElementId:'inputfile',
//                success: function (data, status)  //服务器成功响应处理函数
//                {
//					console.log(data)
//					$('#'+lid).bootstrapTable("removeAll");
//					$('#'+lid).bootstrapTable("refresh");				
//					window.tip.show_pk("success",null,window.lc.getValue("importSucc"));
//                },
//                error: function (data, status, e)//服务器响应失败处理函数
//                {
//                	$('#'+lid).bootstrapTable("removeAll");
//    				$('#'+lid).bootstrapTable("refresh");
////    				$('#myModal button[name=close]').trigger("click");
//                	window.tip.show_pk("danger",null,window.lc.getValue("importFail"));
//                }
//			});	
		});		
	}
	function exportNum(lid,rows){	  
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		 var ids="";
         var name = "";
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
                 name = rows[i]["num"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
        var form=$("#myModal form");
        if(rows.length==1){
        	form.autofill(rows[0]);
        }
        window.tip.show_pk("info",10,window.lc.getValue("exportingPlWait")+"...",true);
		var domainUuid=window.global.getDomainUuid();
		var pa="";
		pa+="&domainUuid="+domainUuid;
		pa+="&uuids="+ids;
		$.ajax({ 
			url: "exportConfig!exportDMNum.action",
			data:pa,
			complete: function(data,str){
			$('#'+lid).bootstrapTable("refresh");
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){
				window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
//				window.tip.close_pk();
				window.location.href="download/"+data.responseJSON["fileName"];
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
			}
		}});	
	}	
	function exportWhiteNum(lid,rows,type){	  
		var domainUuid=window.global.getDomainUuid();
        window.tip.show_pk("info",10,window.lc.getValue("exportingPlWait")+"...",true);
		var domainUuid=window.global.getDomainUuid();
		var pa="";
		pa+="&domainUuid="+domainUuid;
		pa+="&mainSearch="+$.trim($('#dev_tag').val());
		pa+="&ty="+type;
		$.ajax({ 
			url: "exportConfig!exportFreq.action",
			data:pa,
			complete: function(data,str){
			$('#'+lid).bootstrapTable("refresh");
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){
				window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
//				window.tip.close_pk();
				window.location.href="download/"+data.responseJSON["fileName"];
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
			}
		}});	
	}
	function delNum(lid,rows){
		del(lid,rows,"numDMManager!deleteNum.action");
	}
	function delWhiteNum(lid,rows,url){
		del(lid,rows,"freqManager!delFreq.action");
	}
	function del(lid,rows,url){
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		 var ids="";
         var name = "";
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
                 name = rows[i]["num"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
        var param={};
        if(url=="numDMManager!deleteNum.action"){
        	param['domainUuid'] = domainUuid;
        	param['uuids'] = ids;
        }else{
        	param['dstDomainUuid'] = domainUuid;
        	param['ids'] = ids;
        }
		
		
		param['selectAll']=0;
		param['mainSearch']=$.trim($('#dev_tag').val());
		$.ajax({ 
			url: url,
			data:param,
			type:"POST",
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){					
					window.list.delRefresh(lid,rows);
					window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
				}
		}});
	}
	function delServer(lid,rows,cb,pid){
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(rows.length!=1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}
        var param={};
        param['dstDomainUuid'] = domainUuid;
        param['productId'] = rows[0]["productId"];
        param['sysUuid'] = rows[0]["uuid"];
		$.ajax({ 
			url: 'dmManager!delServer.action',
			data:param,
			type:"POST",
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){
					if(lid){
						$('#'+lid).bootstrapTable("removeAll");
						$('#'+lid).bootstrapTable("refresh");
					}else if(cb){
						cb(pid);
					}
					
					window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
				}
		}});
	}
	function remoteSys(rows){
		var domainUuid=window.global.getDomainUuid();
		params={};
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(rows.length!=1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}

		window.open("http://"+rows[0]["sysIpAddr"]+":"+rows[0]["sysPort"]);
	}	
    return {
    	openService:openService,
    	addServer:addServer,
    	addNum:addNum,
    	delNum:delNum,
    	setNum:setNum,
    	exportNum:exportNum,
    	importNum:importNum,
    	exportWhiteNum:exportWhiteNum,
    	importWhiteNum:importWhiteNum,
    	setSipServer:setSipServer,
    	addWhiteNum:addWhiteNum,
    	delWhiteNum:delWhiteNum,
    	setWhiteNum:setWhiteNum,
    	remoteSys:remoteSys,
    	delServer:delServer
    };
});


