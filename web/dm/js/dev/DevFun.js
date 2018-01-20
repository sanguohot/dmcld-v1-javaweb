define(["progress","form-field",'text!html/modal.html','text!html/field/radio.html'],function (pg,field,modal,radio){
	function getLoadHtml(){
		var html='<div style="padding-left:5px;" name="load">'
		    +'<i class="fa fa-refresh fa-spin blue"></i>'
		    +'&nbsp;<span class=blue>'+window.lc.getValue("refreshingWait")+'...</span></div>';
		return html;
	}

	function applyToDev(pid,rows,modelUuid,modelDomainUuid){
	      var deviceUuids = '';
	      if(rows.length==0){
	        window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
	        return;
	      }else if(rows.length == 1){
	        deviceUuids = rows[0]['uuid'];
	      }else{
	        for(var i =0;i<rows.length -1;i++){
	          deviceUuids += rows[i]['uuid'] + ','
	        }
	        deviceUuids += rows[rows.length-1]['uuid'];
	      }
	      if(deviceUuids){
	        window.tip.show_pk("info",60,window.lc.getValue("applyingWait"),true);
	        $.ajax({
	          url: "batchManager!applyBatch.action",
	          data: {domainUuid:modelDomainUuid,uuid:modelUuid,deviceUuids:deviceUuids},
	          type:"get",
	          complete: function(data,str){
              window.tip.close_pk();
	            if(data.responseJSON && data.responseJSON.success){
	              window.tip.show_pk("ok",null,window.lc.getValue("applySucc"));
	              $("#"+pid+" button[name=back]").trigger("click");
	            }else{
	              window.tip.show_pk("danger",null,window.lc.getValue("applyFail"));
	            }
	          }})
	      } 
	}
	function importNe(pid,id){
		var domainUuid=window.global.getDomainUuid();
		var srcDomainUuid=window.user.dstDomainUuid;
		if(srcDomainUuid){
			domainUuid=srcDomainUuid;
		}
		if(!domainUuid){
			window.tip.show_pk("info",null,window.lc.getValue("plSelDomainOrZoneOrSite"));
			var html='<select style="display: none;" class="chosen-select width-85" id="domain-modal-sel" data-placeholder="请选择域"></select>';
			return;
		}
		var params={domainUuid:domainUuid,types:'site'};
		 $.ajax({ 
			url: "siteManager!getUserSiteList",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.siteList){
				var list=data.responseJSON.siteList;
				var li=[];
				for(var i=0;i<list.length;i++){
					var item=list[i];
					var obj={text:item.name,value:item.uuid};
					li.push(obj);
				}
				importNeHtml(li);
				$('#myModal button[name=commit]').bind("click",function(){
					var val=$("#inputfile").val();
					if(!val){
						window.tip.show_pk("info",null,window.lc.getValue("plSelFile"));
						return;
					}
					if(!val.endWith(".xls")){
						window.tip.show_pk("info",null,window.lc.getValue("plSelXls"));
						return;
					}
					doImportNe(pid,id);
				});
			}
		}});
	}
	function doFileRet(pid,id,data){
		var text=data.responseText;
        var start = text.indexOf(">");
        if(start != -1) {
          var end = text.indexOf("<", start + 1);
          if(end != -1) {
        	  text = text.substring(start + 1, end);
           }
        }
        var obj=eval("("+text+")");
      
		$('#'+id).bootstrapTable("removeAll");
		$('#'+id).bootstrapTable("refresh");
		if(obj.success){
			window.tip.show_pk("success",null,window.lc.getValue("importSucc")+","+obj.msg);
		}else{
			window.tip.show_pk("danger",null,window.lc.getValue("importFail"));
		}			
	}
	function doImportNe(pid,id){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;
        window.tip.show_pk("info",10,window.lc.getValue("importingPlWait"),true);
        $('#myModal button[name=close]').trigger("click");
        $.ajaxFileUpload({ 
			url: "neManager!importNe.action?"+params,
			fileElementId:'inputfile',
			dataType: 'json',
            success: function (data, status)  //服务器成功响应处理函数
            {
        		doFileRet(pid,id,data);
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
            	doFileRet(pid,id,data);
            }
		});
	}
	function importNeHtml(list){
		var pn=$("#myModal");
		if(!pn) return;
		var body=''		
	      +'<div class="row">'
	      +'<div class="col-md-6" >'
	      +'<label>'+window.lc.getValue('importFormat')+':</label>'
	      +'<ul class="ace-thumbnails">'
	      +'<li>'
	      +'<a href="#" data-rel="colorbox" class="cboxElement">'
	      +'<img alt="150x150" src="/dm/images/importne.png" width="100%" height="140px">'
	      +'<div class="text">'
	      +'<div class="inner">只有一列设备序列号，格式如图中所示</div>'
	      +'</div>'
	      +'</a>'
	      +'</li>'
	      +'</ul>'
	      +'</div>'
	      +'<div class="col-md-6" >'
	      +'<form class="" name="param" role="form">'
	      +field.getComboField("productId",1,'<font color="red">*</font>&nbsp;'+window.lc.getValue("devType"),[{text:"MTG",value:"1"},{text:"DAG",value:"17"}])
	      +field.getComboField("siteUuid","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("ownSite"),list)
	      +'</form>'
	      +'<form class="" name="sn-file" role="form">'
	      +field.getFileField("")
	      +'</form>'
	      +'</div>'			  
	      +'</div>';
		var obj={
			title:window.lc.getValue("impt"),
			body:body,
			close:window.lc.getValue("close"),
			commit:true,
			commitLan:window.lc.getValue("commit"),
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);
		
		pn.html(html);
		var pa={};
		window.global.getTreePara(pa);
		if(pa.siteUuid){
			$('#myModal select[name=siteUuid]').val(pa.siteUuid);
		}
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		$('#inputfile').ace_file_input();
	}
	function setReport(pid,id,rows){
		var ids="";
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel")+"!");
			return;
		}
		var nep="";
         for ( var i = 0; i < rows.length; i++) {
        	 var row=rows[i];
        	 var obj={uuid:rows[i].uuid,domainUuid:rows[i].domainUuid};
        	 //JSON.stringify(obj)
        	 nep+="&neList["+i+"].uuid="+row.uuid;
        	 nep+="&neList["+i+"].domainUuid="+row.domainUuid;
             if(i==0){
                 ids=rows[i]["uuid"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
         var val="";
         reportHtml();
         if(rows.length==1){
        	 var reportSwitch=rows[0]["reportSwitch"];
        	 if(reportSwitch==1){
        		 $('#myModal input[value=1]').trigger("click");
        	 }else{
        		 $('#myModal input[value=0]').trigger("click")
        	 }
         }

		$('#myModal button[name=commit]').bind("click",function(){
			var params=$('#myModal form').formSerialize();
			params+="&domainUuid="+window.global.getDomainUuid();
			params+="&ids="+ids;
			params+=nep;
			$.ajax({ 
				url: "neManager!updateReport.action",
				data:params,
				type:"POST",
				complete: function(data,str){
					$('#myModal button[name=close]').trigger("click");
					$('#'+id).bootstrapTable("refresh");
					if(data.responseJSON && data.responseJSON.success){				
						window.tip.show_pk("success",null,window.lc.getValue("setSucc")+"!");
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("setFail")+"");
					}
			}});
		});
	}
	function reportHtml(){
		var pn=$("#myModal");
		if(!pn) return;
		var body='<form class="" name="param" role="form">'
			+field.getRadioField("reportSwitch",0,window.lc.getValue("reportSwitch"),[{value:0,text:window.lc.getValue("close")},{value:1,text:window.lc.getValue("open")}])
	      +'</form>';
		var obj={
			title:window.lc.getValue("impt"),
			body:body,
			close:window.lc.getValue("close"),
			commit:true,
			commitLan:window.lc.getValue("commit"),
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);		
		pn.html(html);
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
	}
	function getComboData(id){
		var domainUuid=window.global.getDomainUuid();
		var srcDomainUuid=window.user.dstDomainUuid;
		if(srcDomainUuid){
			domainUuid=srcDomainUuid;
		}
		if(!domainUuid){
			window.tip.show_pk("info",null,window.lc.getValue("plSelDomainOrZoneOrSite"));
			var html='<select style="display: none;" class="chosen-select width-85" id="domain-modal-sel" data-placeholder="请选择域"></select>';
			return;
		}
		var params={domainUuid:domainUuid,types:'site'};
		 $.ajax({ 
			url: "siteManager!getUserSiteList",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.siteList){
				var list=data.responseJSON.siteList;
				var li=[];
				for(var i=0;i<list.length;i++){
					var item=list[i];
					var obj={text:item.name,value:item.uuid};
					li.push(obj);
				}
				createAddDevHtml(li);
				$('#myModal button[name=commit]').bind("click",function(){
					var sn=$('#myModal input[name=productSn]').val();
					var alias=$('#myModal input[name=alias]').val();
					if(sn==""){
						window.tip.show_pk("warning",null,window.lc.getValue("productSnCanNotEmpty"));
						return;
					}
					var exp = /^[a-fA-F0-9]{4}(-)[a-fA-F0-9]{4}(-)[a-fA-F0-9]{4}(-)[a-fA-F0-9]{4}$/;
					var Regex = new RegExp(exp);
					if(Regex.test(sn) == false){
						window.tip.show_pk("warning",null,window.lc.getValue("productSn",1));
						return;
					}
					 $.ajax({ 
							url: "neManager!checkSn.action",
							data:{productSn:sn,domainUuid:domainUuid},
							complete: function(data,str){
							if(data.responseJSON && data.responseJSON.success){
								if(alias==""){
									window.tip.show_pk("warning",null,window.lc.getValue("devNameCanNotEmpty"));
									return;
								}
								$.ajax({ 
										url: "neManager!checkAlias.action",
										data:{alias:alias,domainUuid:domainUuid},
										complete: function(data,str){
										if(data.responseJSON && data.responseJSON.success){
											addDev(id);
										}else {
											window.tip.show_pk("danger",null,window.lc.getValue("devNameIsExist"));
											return;
										}
									}});
							}else {
								window.tip.show_pk("danger",null,window.lc.getValue("productSnIsExist"));
								return;
							}
						}});					
				});
			}
		}});
	}
	function addDev(id){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form').formSerialize();
		params+="&domainUuid="+domainUuid;
		 $.ajax({ 
			url: "neManager!addNe.action",
			data:params,
			type:"POST",
			complete: function(data,str){
			 $('#'+id).bootstrapTable("removeAll");
			 	$('#'+id).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("setSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
				}
		}});
	}
	
	function rebootDev(rows){
	  var cb=function(){
		  devAction(rows,"reboot"); 
	  }

	  window.modal.confirmReboot(window.lc.getValue("sureToRestart")+"？",cb);
		
	}
	function devAction(rows,action){
		params="";
		 var ids="";
         var alias = "";
         var productId=0;
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("noRecords")+"!");
			return;
		}
		var domainUuid=0;
         for ( var i = 0; i < rows.length; i++) {
//       	  if(window.sta.isOffline(rows[i]["runStatus"])){
//    		  window.tip.show_pk("warning",null,window.lc.getValue("devIsNotOnline"));
//    		  return;
//    	  }
             if(i==0){
                 ids=rows[i]["uuid"];
                 alias = rows[i]["alias"];
                 productId = rows[i]["productId"];
                 domainUuid = rows[i]["domainUuid"];
             }else {
            	 if(rows[i]["domainUuid"]!=domainUuid){
         			window.tip.show_pk("info",null,window.lc.getValue("plSelDevInSameDomain")+"!");
        			return;
            	 }
                 ids=ids+"-"+rows[i]["uuid"];
             }
             
         }
// 		var params=$('#myModal form').formSerialize();
		params+="&domainUuid="+domainUuid;
		params+="&ids="+ids;
		params+="&alias="+alias;
		params+="&productId="+productId;
		var status=2;
		if(action=="restore"){
			status=5;
		}
		params+="&actionStatus="+status;
		var text1=window.lc.getValue("settingWait");
		var text2=window.lc.getValue("setSucc");
		var text3=window.lc.getValue("setFail");
		window.tip.show_pk("info",10,text1,true);
		$.ajax({ 
			url: "neManagerMaintenance!updateNeActionStatus.action",
			data:params,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				window.tip.close_pk();
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,text2);
				}else{
					window.tip.show_pk("danger",null,text3);
				}
		}});	
	}
	function addUnknownDev(rows){
		var ids="",domainUuid=0;
        var alias = "";
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
         for ( var i = 0; i < rows.length; i++) {
//			if(i==0){
//				domainUuid=rows[0]["domainUuid"];
//			}
//			if(domainUuid!=rows[i]["domainUuid"]){
//				window.tip.show_pk("warning",null,window.lc.getValue("plSelDevInSameDomain")+"!");
//				return;
//			}
			if(rows[i]["addFlag"]){
				window.tip.show_pk("warning",null,window.lc.getValue("plSelDevNotAdd")+"!");
				return;
			}
             if(i==0){
                 ids=rows[i]["uuid"];
                 alias = rows[i]["alias"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
//		window.tip.show_pk("success",10,"正在加载数据请稍候",true);
			var pa={domainUuid:domainUuid,types:'site'};
			var url="siteManager!getUserSiteList";
			if(!domainUuid){
				pa="";
				url="dmManager!getDomainList.action";
			}
		 $.ajax({ 
			url: url,
			data:pa,
			complete: function(data,str){
			if(data.responseJSON){
//				window.tip.close_pk();
				var l=data.responseJSON.dlist;
				if(domainUuid){
					l=data.responseJSON.comboxList;
				}
				var list=[];
				if(l && l.length){
					for(var i=0;i<l.length;i++){
						if(domainUuid){
							if(l[i]["type"]=="site"){
								list.push({value:l[i]["uuid"],text:l[i]["name"]});
							}
						}else{
							list.push({value:l[i]["uuid"],text:l[i]["name"]});
						}
					}
				}
				createUnknownHtml(domainUuid,list);
				$('#myModal button[name=commit]').bind("click",function(){
					var params=$('#myModal form').formSerialize();
					if(domainUuid>0){
						params+="&domainUuid="+domainUuid;
					}
					params+="&uuids="+ids;
					params+="&alias="+alias;
					$.ajax({ 
						url: "neNaManager!addNe.action",
						data:params,
						type:"POST",
						complete: function(data,str){
							$('#myModal button[name=close]').trigger("click");
							if(data.responseJSON && data.responseJSON.success){				
								window.tip.show_pk("success",null,window.lc.getValue("setSucc")+"!");
							}else{
								window.tip.show_pk("danger",null,window.lc.getValue("setFail")+"");
							}
					}});
				});
				
			}
		}});	
	}
	function setDbo(pid,id,rows){
		var ids="",domainUuid=0;
        var alias = "";

		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel")+"!");
			return;
		}
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
                 alias = rows[i]["alias"];
                 domainUuid = rows[i]["domainUuid"];
             }else {
            	 if(rows[i]["domainUuid"]!=domainUuid){
          			window.tip.show_pk("info",null,window.lc.getValue("plSelDevInSameDomain")+"!");
         			return;
             	 }
                 ids=ids+","+rows[i]["uuid"];
             }
         }
         var val="";
         createDboHtml(val);
         if(rows.length==1){
        	 var dboStatus=rows[0]["dboStatus"];
        	 if(dboStatus==1){
        		 $('#myModal input[value=1]').trigger("click");
        	 }else{
        		 $('#myModal input[value=0]').trigger("click")
        	 }
         }

		$('#myModal button[name=commit]').bind("click",function(){
			var params=$('#myModal form').formSerialize();
			params+="&dstDomainUuid="+domainUuid;
			params+="&ids="+ids;
			params+="&alias="+alias;
			$.ajax({ 
				url: "dmManager!updateDbo.action",
				data:params,
				type:"POST",
				complete: function(data,str){
					$('#myModal button[name=close]').trigger("click");
					$('#'+id).bootstrapTable("refresh");
					if(data.responseJSON && data.responseJSON.success){				
						window.tip.show_pk("success",null,window.lc.getValue("setSucc")+"!");
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("setFail")+"");
					}
			}});
		});
	}
	function remoteDev(rows,ty){
		params="";
		var domainUuid=0;
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		if(ty && ty=="nena"){
		}else{
			domainUuid=rows[0]["domainUuid"];
			if(!domainUuid){
			      window.tip.show_pk("warning",null,window.lc.getValue("devIsNotInDomain"));
			      return;
			}
		}
		if(rows.length>1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}
//		if(window.format.isMtg(rows[0].productId)){
//			window.tip.show_pk("info",null,window.lc.getValue("mtgNotSupportRemote"));
//			return;
//		}
	    if(rows[0]['runStatus']!=3){
	      window.tip.show_pk("danger",null,window.lc.getValue("devIsNotOnline"));
	      return;
	    }
       
// 		var params=$('#myModal form').formSerialize();
		var sn=rows[0]['productSnStr'];
 		var uuid=rows[0]["uuid"];
 		doRemoteWeb(sn,uuid,domainUuid,ty);	
	}
	function doRemoteWeb(sn,uuid,domainUuid,type){
		if(!uuid || !domainUuid){
			return window.tip.show_pk("danger",null,window.lc.getValue("invalidParam"));
		}
		var params={domainUuid:domainUuid,sn:sn,uuid:uuid,type:type};
		window.tip.show_pk("success",10,window.lc.getValue("gettingDevRouteWait"),true);
		$.ajax({ 
			url: "remoteManager!createRemote.action",
			data:params,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				window.tip.close_pk();
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("gettingSucc"));
					window.global.openChildWin(data.responseJSON.url);
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("gettingFail"));
				}
		}});
	}

	function isEmptyObject(obj) {
		for ( var name in obj ) { 
		return false; 
		} 
		return true; 
	} 
	function restoreDev(rows){
		devAction(rows,"restore");
	}
  function restoreCfg(pid,rows){
//  	for(var i=0;i<rows.length;i++){
//  		if(!window.format.isDag(rows[i].productId)){
//  			window.tip.show_pk("warning",null,window.lc.getValue("tgNotSupportCfgRestore"));
//  			return;
//  		}
//  	}
	require(["dev-conf"], function(conf) { 
		conf.createConf(pid,rows[0]);
	});
  }
  function createBackupCfgHtml(rows){
	    if(rows.length==0){
	        window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
	        return;
	      }
	    var ids = '',domainUuid=0;
	  	for(var i=0;i<rows.length;i++){
//	  		if(!window.format.isDag(rows[i].productId)){
//	  			window.tip.show_pk("warning",null,window.lc.getValue("tgNotSupportCfgRestore"));
//	  			return;
//	  		}
	  	   	  if(window.sta.isOffline(rows[i]["runStatus"])){
	  			  window.tip.show_pk("warning",null,window.lc.getValue("devIsNotOnline"));
	  			  return;
	  	   	  }
	          if(i==0){
	          	ids += rows[i]['uuid'];
	          	domainUuid = rows[i]['domainUuid'];
	          }else{
	          	ids += '-'+rows[i]['uuid'];
	  		   	 if(rows[i]["domainUuid"]!=domainUuid){
	  				window.tip.show_pk("info",null,window.lc.getValue("plSelDevInSameDomain"));
	  				return;
	  		  	 }
	          }
	  	}

		var pn=$("#myModal");
		if(!pn) return;
		var tempFn = window.dot.template(radio);
	    var rf = tempFn({inline:true,name:"defaultConfModel",label:window.lc.getValue("defaultConfModel"),list:[{uuid:0,name:window.lc.getValue("normalFile")}/*,{uuid:1,name:window.lc.getValue("defaultFile")}*/]});
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("cfgBackup")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">';
			  html+=rf;	
			  html+='<div id="modal-content"></div>';	
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
		$('#myModal input[name=defaultConfModel]').bind("click",function(){
			var val=$(this).val();
			if(val=="1"){
				$("#modal-content").html("");
			}else{				
			    var h=field.getTextField("name","",window.lc.getValue("alias"));
			    h+=field.getTextareaField("desc","",window.lc.getValue("desc"));
				$("#modal-content").html(h);
			}
		})
		$("#myModal input[name=defaultConfModel][value=0]").trigger("click");
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var name=$("#myModal input[name=name]").val();
			var defaultConfModel=$("#myModal input[name=defaultConfModel]:checked").val();
			var desc=$("#myModal textarea[name=desc]").val();
			var pa="";
			if(name){
				if(pa!=""){
					pa+="&";
				}
				pa+="name="+name;
			}
			if(desc){
				if(pa!=""){
					pa+="&";
				}
				pa+="desc="+desc;
			}
			pa+="&domainUuid="+domainUuid;
			pa+="&ids="+ids;
			pa+="&actionStatus="+32;
			pa+="&defaultConfModel="+defaultConfModel;
			backupCfg(pa);			
		});
		
	}
  function backupCfg(pa){
      window.tip.show_pk("info",5000,window.lc.getValue("settingWait"),true);
      $.ajax({
        url: "neManager!updateNeActionStatus.action?"+pa,
//        data: {ids:ids,actionStatus:32,domainUuid:domainUuid},
        type:"get",
        complete: function(data,str){
        	$('#myModal button[name=close]').trigger("click");
          if(data.responseJSON && data.responseJSON.success){
            window.tip.show_pk("ok",null,window.lc.getValue("setSucc",2));
          }else{
            window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
          }
        }})
  }
	function upgradeDev(rows){
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}

		var productId=rows[0]["productId"];
		var ids="",upgradeTypes="",alias="",domainUuid=0;
		var maxVersion=rows[0]["packageVersion"];
		var defaultVendorId=rows[0]["vendorId"];
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			var tp=row["productId"];
			if(tp!=productId){
				window.tip.show_pk("warning",null,window.lc.getValue("plSelDevOfSameType"));
				return;
			}
			var type=row["upgradeType"];
			if(type==0){
				window.tip.show_pk("warning",null,window.lc.getValue("someDevDisableUpgrade"));
				return;
			}
			var vid=row["vendorId"];
			if(vid!=defaultVendorId){
				window.tip.show_pk("warning",null,window.lc.getValue("plSelDevOfSameVendor"));
				return;
			}
//			var status=row["upgradeStatus"];
//			if(status==2){
//				window.tip.show_pk("warning",null,window.lc.getValue("someDevIsUpgrading"));
//				return;
//			}
			if(i==0){
				ids=row["uuid"];
				upgradeTypes = row["upgradeType"];
				alias = row["alias"];
				domainUuid = row["domainUuid"];
			}else {
			   	 if(rows[i]["domainUuid"]!=domainUuid){
					window.tip.show_pk("info",null,window.lc.getValue("plSelDevInSameDomain")+"!");
					return;
			  	 }
				ids=ids+"-"+row["uuid"];
				upgradeTypes = upgradeTypes+'-'+row["upgradeType"];
			}
			var tempVersion=row["packageVersion"];
			
			if(tempVersion>maxVersion){
				maxVersion=tempVersion;
			}
		}
		var vendorId=rows[0]["vendorId"];
		var params={domainUuid:domainUuid,defaultVendorId:vendorId};
		var obj={productId:productId,domainUuid:domainUuid,maxVersion:maxVersion
				,upgradeTypes:upgradeTypes,provUrl:window.extra.provUrl,status:-1,upgradeType:rows[0]["upgradeType"]};
		 $.ajax({ 
			url: "vendorManager!getVendor.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.vendorList){
				var list=data.responseJSON.vendorList;
				createUpgradeHtml(list,vendorId,obj,rows);
				$('#myModal').modal().css({
				    width: 'auto',
				    backdrop:false,
				});
				$('#myModal button[name=commit]').bind("click",function(){
					if(!$('#upgrade-version').val()){
						window.tip.show_pk("warning",10,window.lc.getValue("plSelTargetVer"),false);
						return
					}
			 		var pa=$('#myModal form').formSerialize();
					pa+="&domainUuid="+domainUuid;
					pa+="&alias="+alias;
					pa+="&ids="+ids;
					pa+="&upgradeTypes="+obj.upgradeTypes;
					pa+="&maxVersion="+obj.maxVersion;
					pa+="&provUrl="+obj.provUrl;
					pa+="&productId="+obj.productId;
					var i=0;
					$('#myModal button[name=close]').trigger("click");
					$('#myModal').html("");
					
					window.tip.show_pk("info",10,window.lc.getValue("upgradingWait")+"...",true);

//					pg.startProc();
//					return;
					 $.ajax({ 
							url: "upgradeNe!upgrade.action",
							data:pa,
							type:"POST",
							timeout:60 * 60 * 1000,
							complete: function(data,str){
//						 pg.closeProc();
//								$('#myModal button[name=close]').trigger("click");
						 		window.tip.close_pk();
								if(data.responseJSON && data.responseJSON.success){				
									window.tip.show_pk("success",null,window.lc.getValue("upgradeSucc"));
								}else{
									window.tip.show_pk("danger",null,window.lc.getValue("upgradeFail"));
								}
						}});
				});
			}
		}});
	}
	function setDev(rows,id){
		params={};
		 var ids="";
         var alias = "",domainUuid=0;
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
                 alias = rows[i]["alias"];
                 domainUuid = rows[i]["domainUuid"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
			   	 if(rows[i]["domainUuid"]!=domainUuid){
					window.tip.show_pk("info",null,window.lc.getValue("plSelDevInSameDomain")+"!");
					return;
			  	 }
             }
         }
 		var params=$('#myModal form').formSerialize();
		params+="&domainUuid="+domainUuid;
		params+="&ids="+ids;
		params+="&alias="+alias;
		$.ajax({ 
			url: "neManager!updateDmNe.action",
			data:params,
			type:"POST",
			complete: function(data,str){
			$('#'+id).bootstrapTable("removeAll");
				$('#'+id).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
		}});
	}
	function delDev(rows,id){
		params={};
		
		 var ids="";
         var alias = "",domainUuid=0;
         for ( var i = 0; i < rows.length; i++) {
        	 var ad=rows[i]["adminStatus"];
        	 if(ad==1 || ad==3){
				window.tip.show_pk("warning",null,window.lc.getValue("adminStatusCanNotBe")+":"+window.lc.getValue("adminStatus",ad));
				return;
        	 }
             if(i==0){
                 ids=rows[i]["uuid"];
                 alias = rows[i]["alias"];
                 domainUuid = rows[i]["domainUuid"];
             }else {
			   	 if(rows[i]["domainUuid"]!=domainUuid){
					window.tip.show_pk("info",null,window.lc.getValue("plSelDevInSameDomain")+"!");
					return;
			  	 }
                 ids=ids+"-"+rows[i]["uuid"];
             }
         }
		params.domainUuid=domainUuid;
		params.ids=ids;
		params.alias=alias;
		$.ajax({ 
			url: "neManager!deleteNe.action",
			data:params,
			type:"POST",
			complete: function(data,str){
				window.list.delRefresh(id,rows);
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
				}
		}});
	}
	//删除
	function delDevDag(rows,id){
		//alert("dd");
		params={};
		var neUuid="";
	    var apgUUid="";
		domainUuid=0;
		for(var i=0;i<rows.length;i++){
			if(i==0){
			         neUuid=rows[i]["neUuid"];
	                 UUid = rows[i]["uuid"];
	                 domainUuid = rows[i]["domainUuid"];
			}else{
	                 UUid=UUid+"-"+rows[i]["uuid"];
			}
		}
		params.domainUuid=domainUuid;
		params.UUid=UUid;
		params.neUuid=neUuid;
		
		$.ajax({
			url:"agCdrManager!deleteAgCdr.action",
			data:params,
			type:"post",
			complete: function(data,str){
			window.list.delRefresh(id,rows);
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
	}
			
		});
		
	}
	//清空
	function delDevDagAll(neUuid,domainUuid){
		params={};
		params.domainUuid=domainUuid;
		params.neUuid=neUuid;
		$.ajax({
			url:"agCdrManager!deleteAgCdrAll.action",
			data:params,
			type:"post",
			complete: function(data,str){
			$('#dev_list-list').bootstrapTable("removeAll");
			$('#dev_list-list').bootstrapTable("selectPage",1);
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("cleanSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("cleanFail"));
			}
	}
			
		});
	}
	//导出CDR
	function expCdr(params){
		//alert("ss");
		window.tip.show_pk("info",10,window.lc.getValue("exportingWait"),true);
		$.ajax({ 
			url: "agCdrManager!exportCdr.action",
			data:params,
			complete: function(data,str){
			
			if(data.responseJSON && data.responseJSON.success){
				window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
				window.location.href="download/"+data.responseJSON["fileName"];
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
			}
		}});	
	}
	function createUpgradeHtml(list,vendorId,obj,rows){
		var pn=$("#myModal");
		if(!pn) return;
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("upgrade")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<div id="myProgress_p">'
		     
		      +'</div>'
		      +'<form class="" role="form">'
		      +'<div class="row" >'
		      +'<div class="col-md-12" >' 
		      +'<div class="form-group-sm">'
		      +'<label class="control-label">'+window.lc.getValue("vendor")+'</label>';
			  html +='<select id="upgrade-vendor" name="vendorId" value="'+vendorId+'" class="form-control">';		     
			  for(var i=0;i<list.length;i++){
				  html+='<option value="'+list[i]["vendorId"]+'">'+list[i]["vendorName"]+'</option>';
			  }
		      html+='</select>'
		      +'</div>'            
		      +'<div class="form-group-sm">'
		      +'<label >'+window.lc.getValue("upgradeType")+'</label>'
//		      +'<input type="text" class="form-control display-text"  name="upgradeType" value="'+window.lc.getValue("upgradeType",obj.upgradeType)+'" placeholder="">'
		      +'<p class="form-control display-text"  name="upgradeType"  placeholder="">'+window.lc.getValue("upgradeType",obj.upgradeType)+'</p>'
		      +'</div>'
		      +'<div class="form-group-sm">'
		      +'<label class="control-label">'+window.lc.getValue("version")+'</label>'
		      +'<select id="upgrade-version" name="packageVer" class="form-control">'
		      +'</select>'
		      +'</div>' 
		      +'<div class="checkbox">'
		      +'<label>'
		      +'<input type="checkbox" name="forceUpgrade" value="1"> '+window.lc.getValue("forceUpOrDown")+'(<font color=gray>'+window.lc.getValue("forceUpOrDown",1)+'</font>)'
		      +'</label>'
		      +'</div>'
		      +'<div class="form-group-sm">'
		      +'<label class="control-label">'+window.lc.getValue("desc")+'</label>'
		      +'<textarea name="detailDesc" id="detailDesc" class="form-control" style="height:80px;">'
		      +'</textarea>'
		      +'</div>'     
		      +'</div>'			  
		      +'</div>'
		      +'</form>'
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
		
		/*$("#upgrade-vendor").bind("change",function(){
			var params = { productId:obj.productId,vendorId:$(this).val(),maxVersion:obj.maxVersion,upgradeTypes:obj.upgradeTypes,provUrl:'',status:-1,seeStatus:1,domainUuid:row.domainUuid};
			$.ajax({ 
				url: "versionList.action",
				data:params,
				type:"POST",
				complete: function(data,str){
					if(data.responseJSON && data.responseJSON.versionList){				
						var s=$("#upgrade-version");
						if(s){
							var list=data.responseJSON.versionList;
//							list=[{detailDesc:"abcd",packageVer:"21145466",showStr:"ddssaaddd"},{detailDesc:"ddd",packageVer:"2323213",showStr:"121222"}]
							var html="";
							for(var i=0;i<list.length;i++){
								html+='<option desc="'+list[i]["detailDesc"]+'" value="'+list[i]["packageVer"]+'">'+list[i]["showStr"]+'</option>';
							}
							s.html("");
							s.append(html);
						}
					}
			}});
		});*/
		$("#upgrade-vendor").bind("change",function(){
			var params = { productId:obj.productId,vendorId:$(this).val(),maxVersion:obj.maxVersion,upgradeTypes:obj.upgradeTypes,provUrl:'',status:-1,seeStatus:1,domainUuid:rows[0].domainUuid,sys:window.sysMode};//window.sysMode};
			$.ajax({ 
				//url: "versionList.action",
				url:"versionList!getSeeVersionList.action",
				data:params,
				type:"POST",
				complete: function(data,str){
					if(data.responseJSON && data.responseJSON.versionList){				
						var s=$("#upgrade-version");
						if(s){
							var list=data.responseJSON.versionList;
//							list=[{detailDesc:"abcd",packageVer:"21145466",showStr:"ddssaaddd"},{detailDesc:"ddd",packageVer:"2323213",showStr:"121222"}]
							var html="";
							for(var i=0;i<list.length;i++){
								html+='<option desc="'+list[i]["detailDesc"]+'" value="'+list[i]["packageVer"]+'">'+list[i]["showStr"]+'</option>';
							}
							s.html("");
							s.append(html);
							var node=$("#upgrade-version").find("option:selected");
							var desc=node.attr("desc");
							$("#myModal textarea[name=detailDesc]").val(desc);
							
						}
					}
			}});
		});
		$("#upgrade-version").bind("change",function(){
			var node=$(this).find("option:selected");
			var desc=node.attr("desc");
			$("#myModal textarea[name=detailDesc]").val(desc);
			
		})
//		$('#upgrade-vendor').val(vendorId);
		$('#upgrade-vendor').trigger("change");
		document.getElementById("detailDesc").disabled=true;
	}
	function createAddDevHtml(list){
		var pn=$("#myModal");
		if(!pn) return;
		var body=''
		+'<form class="" role="form">'
	      +'<div class="row">'
	      +'<div class="col-md-6">'
	      +'<a href="#" class="thumbnail">'
	      +'<img src="resources/images/iad-8o.jpg" '
	      +'alt="">'
	      +'</a>'
	      +'<div class="form-group-sm">'
	      +'<label class="control-label">'+window.lc.getValue("desc")+'</label>'
	      +'<textarea name="detailDesc" class="form-control" style="height:80px;">'
	      +'</textarea>'
	      +'</div>'               
	      +'</div>'
	      +'<div class="col-md-6" >'
	      +field.getComboField("productId",1,'<font color="red">*</font>&nbsp;'+window.lc.getValue("devType"),[{text:"MTG",value:"1"},{text:"DAG",value:"17"},{text:"UC",value:"50"}])      
	      +field.getTextField("productSn","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("productSn"),"","","",window.lc.getValue("productSn",1))           
	      +field.getTextField("alias","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("devName"),"","","","")
	      +field.getComboField("siteUuid","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("ownSite"),list)
//	      +'<div class="form-group-sm">'
//	      +'<label class="control-label">'+window.lc.getValue("regPwd")+'</label>'
//	      +'<input type="password" class="form-control"  name="password" value="" placeholder="">'
//	      +'</div>'
//	      +'<div class="form-group-sm">'
//	      +'<label class="control-label">'+window.lc.getValue("confirmPwd")+'</label>'
//	      +'<input type="password" class="form-control"  name="confirmPwd" value="" placeholder="">'
//	      +'</div>'
	      +'</div>'			  
	      +'</div>'
	      +'</form>';
		var obj={
			title:window.lc.getValue("add"),
			body:body,
			close:window.lc.getValue("close"),
			commit:true,
			commitLan:window.lc.getValue("commit"),
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);
		
		pn.html(html);
		var pa={};
		window.global.getTreePara(pa);
		if(pa.siteUuid){
			$('#myModal select[name=siteUuid]').val(pa.siteUuid);
		}
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
	}
	function createSetHtml(rows,id){
		var pn=$("#myModal");
		if(!pn) return;
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("set")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">'
		      +'<div class="row">'
		      +'<div class="col-md-12" >';
		html+=field.getRadioField("adminStatus","",window.lc.getValue("adminStatus")
				,[{value:-1,text:window.lc.getValue("notSet")},{value:2,text:window.lc.getValue("disable")},{value:1,text:window.lc.getValue("enable")}]);
		html+=field.getRadioField("upgradeType","",window.lc.getValue("upgradeType")
				,[{value:-1,text:window.lc.getValue("notSet")},{value:0,text:window.lc.getValue("disable")},{value:1,text:window.lc.getValue("toTargetVer")}]);
		      html+='</div>'			  
		      +'</div>'
		      +'</form>'
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
        if(rows.length==1){
        	$("#myModal form").autofill(rows[0]);
        }else{
        	$('#myModal input[value=-1]').trigger("click");
        }
		$('#myModal button[name=commit]').bind("click",function(){
			if($('#myModal input[name=adminStatus]:checked').val()==-1 && $('#myModal input[name=upgradeType]:checked').val()==-1){
				window.tip.show_pk("info",null,window.lc.getValue("noChange"));
				return;
			}
			setDev(rows,id);
		});
	}
	
	function createUnknownHtml(domainUuid,list){
		var pn=$("#myModal");
		if(!pn) return;
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("add")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">'
		      +'<div class="row">'
		      +'<div class="col-md-12" >';
		      if(!domainUuid){
			      html+=field.getComboField("domainUuid","",window.lc.getValue("ownDomain"),list)
			      html+=field.getComboField("siteUuid","",window.lc.getValue("ownSite"),[])
		      }else{
		    	  html+=field.getComboField("siteUuid","",window.lc.getValue("ownSite"),list)
		      }
//		      html+=field.getTextField("password","",window.lc.getValue("password"))
		      html+='</div>'			  
		      +'</div>'
		      +'</form>'
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
		if(!domainUuid){
			$('#myModal select[name=domainUuid]').bind("click",function(){
				var s=$('#myModal select[name=siteUuid]');
				var value=$(this).val();
				if(s && value){
					var pa={domainUuid:value,types:'site'};
					 $.ajax({ 
						url: "siteManager!getUserSiteList",
						data:pa,
						complete: function(data,str){
						if(data.responseJSON && data.responseJSON.siteList){
							var list=data.responseJSON.siteList;
							if(list && list.length){
								var str="";
								for(var i=0;i<list.length;i++){
									if(list[i].type=="site"){
										str+='<option value="'+list[i]["uuid"]+'">'+list[i]["name"]+'</option>';
									}
								}
								s.html(str);
							}
							
						}
					}});
				}
			});
		}
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
	
	}
	function createDboHtml(val){
		var pn=$("#myModal");
		if(!pn) return;
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("set")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<form class="" role="form">'
		      +'<div class="row">'
		      +'<div class="col-md-12" >';
		html+=field.getRadioField("dboStatus",val,window.lc.getValue("dboSwitch"),[{value:0,text:window.lc.getValue("close")},{value:1,text:window.lc.getValue("open")}])
		      html+='</div>'			  
		      +'</div>'
		      +'</form>'
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
	function goToPortList(pid,row,from){
		var productId=row.productId;
		var name=window.lc.getProductType(productId);
		if(name=="MTG"){
			require(["mtg-port-list"], function(grid) {
				grid.createPortList(pid,pid+"_tg",{neUuid:row.uuid,domainUuid:row.domainUuid},"all",from);
			});	
		}else if(name=="DAG"){
			require(["dag-port-list"], function(grid) {
				grid.createPortList(pid,pid+"_ag",{neUuid:row.uuid,domainUuid:row.domainUuid},"all",from);
			});
		}
	}
	function cancelUpgradeDev(pid,id,rows){	  
		var domainUuid=window.global.getDomainUuid();
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		 var ids="";
         for ( var i = 0; i < rows.length; i++) {
             if(i==0){
                 ids=rows[i]["uuid"];
             }else {
                 ids=ids+","+rows[i]["uuid"];
             }
         }
		var pa="";
		pa+="&domainUuid="+domainUuid;
		pa+="&ids="+ids;
		pa+="&alias="+rows[0].alias;
		$.ajax({ 
			url: "neManager!cancelUpgrade.action",
			data:pa,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				window.tip.show_pk("success",null,window.lc.getValue("cancelSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("cancelFail"));
			}
		}});	
	}	
	function createConfigHtml(){
		var pn=$("#myModal");
		if(!pn) return;
		var html='<div class="modal-dialog">'
		      +'<div class="modal-content">'
		      +'<div class="modal-header">'
		      +'<button type="button" class="close" '
		      +'data-dismiss="modal" aria-hidden="true">'
		      +'&times;'
		      +'</button>'
		      +'<h4 class="modal-title" id="myModalLabel">'
		      +window.lc.getValue("configuration")
		      +'</h4>'
		      +'</div>'
		      +'<div class="modal-body">'
		      +'<div class="action-buttons">'
		      +'<label><input type="checkbox" name="checkbox" value="view"><font style="margin-left:5px">'+window.lc.getValue("view")+'</font></label>'
		      +'<a action="view4" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("view")+'">'
			  +'<i class="fa fa-search-plus bigger-130"  ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="cfgBackup" style="margin-left:15px"><font style="margin-left:5px">'+window.lc.getValue("cfgBackup")+'</font></label>'
			  +'<a action="cfg_backup" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("cfgBackup")+'">'
			  +'<i class="fa fa-cloud-upload bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="del" style="margin-left:15px"><font style="margin-left:5px">'+window.lc.getValue("del")+'</font></label>'
			  +'<a action="del"  class="red tooltip-error"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
			  +'<i class="fa fa-remove bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="cfgEstore" style="margin-left:15px"><font style="margin-left:5px">'+window.lc.getValue("cfgRestore")+'</font></label>'
			  +'<a action="cfg_restore" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("cfgRestore")+'">'
			  +'<i class="fa fa-cloud-download bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="sett" style="margin-left:15px"><font style="margin-left:5px">'+window.lc.getValue("set")+'</font></label>'
			  +'<a action="set" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
			  +'<i class="fa fa-pencil bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="restorePwd" style="margin-left:15px"><font style="margin-left:5px">'+window.lc.getValue("resetPwd")+'</font></label>'
			  +'<a action="restorePwd" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("resetPwd")+'">'
			  +'<i class="fa fa-key bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="reboot"><font style="margin-left:5px">'+window.lc.getValue("restart")+'</font></label>'
			  +'<a action="reboot" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("restart")+'">'
			  +'<i class="fa fa-spinner bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="pmd" style="margin-left:15px" ><font style="margin-left:5px">'+window.lc.getValue("portCalc")+'</font></label>'
			  +'<a action="pmd" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("portCalc")+'">'
			  +'<i class="fa fa-list-ul bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="port" style="margin-left:15px" ><font style="margin-left:5px">'+window.lc.getValue("port")+'</font></label>'
			  +'<a action="port" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("port")+'">'
			  +'<i class="fa fa-product-hunt bigger-130"></i>'
			  +'</a>'
			 /* +'<label><input type="checkbox" name="checkbox" value="conf" style="margin-left:13px"><font style="margin-left:5px">'+window.lc.getValue("confList")+'</label>'
			  +'<a action="conf" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("confList")+'">'
			  +'<i class="fa fa-file-o bigger-130"></i>'
			  +'</a>'*/
			 
			  +'<label><input type="checkbox" name="checkbox" value="per" style="margin-left:15px"><font style="margin-left:5px">'+window.lc.getValue("perCalc")+'</font></label>'
			  +'<a action="per" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("perCalc")+'">'
			  +'<i class="fa fa-line-chart bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="cdr" style="margin-left:14px"><font style="margin-left:5px">'+window.lc.getValue("cdr")+'</font></label>'
			  +'<a action="cdr" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("cdr")+'">'
			  +'<i class="fa fa-registered bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="remote" style="margin-left:15px" ><font style="margin-left:5px">'+window.lc.getValue("remoteWeb")+'</font></label>'
			  +'<a action="remote" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("remoteWeb")+'">'
			  +'<i class="fa fa-arrow-circle-right bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="calls" ><font style="margin-left:5px">'+window.lc.getValue("callCalc")+'</font></label>'
			  +'<a action="call" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("callCalc")+'">'
			  +'<i class="fa fa-phone bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="rmw" style="margin-left: 23px;"><font style="margin-left:5px">'+window.lc.getValue("drpRemoteWeb")+'</font></label>'
			  +'<a action="rmw" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("drpRemoteWeb")+'">'
			  +'<i class="fa fa-wordpress bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="rmt" style="margin-left: 38px;"><font style="margin-left:5px">'+window.lc.getValue("drpRemoteTel")+'</font></label>'
			  +'<a action="rmt" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("drpRemoteTel")+'">'
			  +'<i class="fa fa-tumblr-square bigger-130"></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="sipPortConf" style="margin-left: 23px;"><font style="margin-left:5px">'+window.lc.getValue("sipPortConf")+'</font></label>'
			  +'<a action="sipPortConf" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("sipPortConf")+'">'
			  +'<i class="fa fa-skype bigger-130" ></i>'
			  +'</a>'
			  +'<label><input type="checkbox" name="checkbox" value="ipHistory" style="margin-left: 0px;"><font style="margin-left:5px">'+window.lc.getValue("ipHistory")+'</font></label>'
			  +'<a action="ipHistory" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("ipHistory")+'">'
			  +'<i class="fa fa-rub bigger-130" ></i>'
			  +'</a>'
			  +'</div>'
		      +'</div>'
		      +'<div class="modal-footer">'
		      +'<button name="selectAll" type="button" class="btn btn-success" '
		      +'>'+window.lc.getValue("selectAll")
		      +'</button>'
		      +'<button name="noSelect" type="button" class="btn btn-success" >'+window.lc.getValue("noSelect")
		      +'</button>'
		      +'<button name="close" type="button" class="btn btn-default" '
		      +'data-dismiss="modal">'+window.lc.getValue("close")
		      +'</button>'
		      +'<button name="commit" type="button" class="btn btn-primary">'
		      +window.lc.getValue("confirm")
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
		$('#myModal button[name=selectAll]').click(function(){
		
			var h=document.getElementsByName('checkbox');
			for(var i=0;i<h.length;i++){
				h[i].checked=true;
			}
		})
		$('#myModal button[name=noSelect]').click(function(){
			var h=document.getElementsByName('checkbox');
			for(var i=0;i<h.length;i++){
				h[i].checked=false;
			}
		})
		
		$('#myModal button[name=commit]').click(function(){
			var params={};
			var h=document.getElementsByName('checkbox');
		
			for (var i=0;i<h.length;i++){
				if (h[i].checked){
					params[h[i].value]=1;
				}
			}
			params.userUuid=window.user.uuid;
			params.domainUuid=window.user.domainUuid
			$.ajax({
				url:"buttonManager!updateShowButton.action",
				type:'post',
				data:params,
				complete: function(data,str){
				$('#myModal button[name=close]').trigger("click");
				
				$('#dev_manage').click();
				
		}
				
			});
		});
		
	}
	
	function configDev(pid,id,row){
		createConfigDevHtml(pid,id,row)
		$("input[name=sipSwitch]").get(0).checked=true
		createRoid("sipSwitch",row)
		createOldConfig(row);
		$("input[name=drpSwitch]").get(0).checked=true
		$("input[name=netSwitch]").get(0).checked=true
		$("input[name=callSwitch]").get(0).checked=true
		$("input[name=webSwitch]").get(0).checked=true
		$("input[name=netMangerSwitch]").get(0).checked=true
		$('#myModal input[name=wanMtu]').val('1400');
		getInputDisplay("pppUsername");
		getInputDisplay("pppPassword");
		getInputDisplay("pppServiceName");
		getInputDisplay("ipAddr");
		getInputDisplay("wanMask");
		getInputDisplay("wanGateway");
		getInputDisplay("mainDNS");
		getInputDisplay("secDNS");
		$("input[name=getIP]").get(2).checked=true
		$("#myModal select[name=devConfig]").bind('change',function(){
			var value=$("#myModal select[name=devConfig]").val();
			if(value==1){
				document.getElementById("netManger").style.display="none";
				document.getElementById("drp").style.display="none";
				document.getElementById("net").style.display="none";
				document.getElementById("callFun").style.display="none";
				document.getElementById("webPort").style.display="none";
				document.getElementById("sip").style.display="block";
				createRoid("sipSwitch",row)
			}else if(value==2){
				document.getElementById("sip").style.display="none";
				document.getElementById("drp").style.display="none";
				document.getElementById("net").style.display="none";
				document.getElementById("callFun").style.display="none";
				document.getElementById("webPort").style.display="none";
				document.getElementById("netManger").style.display="block";
				createRoid("netMangerSwitch",row)
			}else if(value==3){
				document.getElementById("netManger").style.display="none";
				document.getElementById("sip").style.display="none";
				document.getElementById("net").style.display="none";
				document.getElementById("drp").style.display="block";
				document.getElementById("webPort").style.display="none";
				document.getElementById("callFun").style.display="none";
				/*var value=$('#myModal input[name="drpSwitch"]:checked').val();
				if(value==2){
					document.getElementById("modal-body").style.height='200px';
				}else{
					document.getElementById("modal-body").style.height='320px';
				}*/
				createRoid("drpSwitch",row)
				//createNewConfig('netMangerSwitch')
			}else if(value==4){
				document.getElementById("netManger").style.display="none";
				document.getElementById("sip").style.display="none";
				document.getElementById("drp").style.display="none";
				document.getElementById("net").style.display="block";
				document.getElementById("webPort").style.display="none";
				document.getElementById("callFun").style.display="none";
				/*var value=$('#myModal input[name="netSwitch"]:checked').val();
				if(value==2){
					document.getElementById("modal-body").style.height='200px';
				}else{
					document.getElementById("modal-body").style.height='500px';
				}*/
				createRoid("netSwitch",row)
				//createNewConfig("netSwitch")
			}else if(value==5){
				document.getElementById("netManger").style.display="none";
				document.getElementById("sip").style.display="none";
				document.getElementById("drp").style.display="none";
				document.getElementById("net").style.display="none";
				document.getElementById("webPort").style.display="none";
				document.getElementById("callFun").style.display="block";
				var val=$('#myModal input[name="callSwitch"]:checked').val();
				/*if(val==2){
					document.getElementById("modal-body").style.height='200px';
				}else{
					document.getElementById("modal-body").style.height='320px';
				}*/
				createRoid("callSwitch",row)
				//createNewConfig("callSwitch")
				
			}else if(value==6){
				document.getElementById("netManger").style.display="none";
				document.getElementById("sip").style.display="none";
				document.getElementById("drp").style.display="none";
				document.getElementById("net").style.display="none";
				document.getElementById("callFun").style.display="none";
				document.getElementById("webPort").style.display="block";
				//createNewConfig("webSwitch")
				/*var val=$('#myModal input[name="webSwitch"]:checked').val();
				if(val==2){
					document.getElementById("modal-body").style.height='200px';
				}else{
					document.getElementById("modal-body").style.height='320px';
				}*/
				createRoid("webSwitch",row)
			}
			
		})
		switchChange("drpSwitch",row);
		switchChange("sipSwitch",row);
		switchChange("netMangerSwitch",row);
		switchChange("netSwitch",row);
		switchChange("callSwitch",row);
		switchChange("webSwitch",row);
        /*  if(row.length>1){
        	  $("input[name=netSwitch]:eq(1)").attr("disabled", "disabled");
        	  $("input[name=drpSwitch]:eq(1)").attr("disabled", "disabled");
        	  $("input[name=sipSwitch]:eq(1)").attr("disabled", "disabled");
        	  $("input[name=netMangerSwitch]:eq(1)").attr("disabled", "disabled");
        	  $("input[name=callSwitch]:eq(1)").attr("disabled", "disabled");
        	  $("input[name=webSwitch]:eq(1)").attr("disabled", "disabled");
        	  
		 }*/
		getButtonFun(row);
	 
	}
	function getButtonFun(rows){
		$('#myModal button[name=commit]').bind('click',function(){
			var sipSwitchValue=$('#myModal input[name=sipSwitch]:checked').val();
			var drpSwitchValue=$('#myModal input[name=drpSwitch]:checked').val();
			var netMangerSwitchValue=$('#myModal input[name=netMangerSwitch]:checked').val();
			var netSwitchValue=$('#myModal input[name=netSwitch]:checked').val();
			var webSwitchValue=$('#myModal input[name=webSwitch]:checked').val();
			var callSwitchValue=$('#myModal input[name=callSwitch]:checked').val();
			if(sipSwitchValue==1){
				var sipAddress=$('#myModal input[name=sipAddress]').val();
				var sipPort=$('#myModal input[name=sipPort]').val();
				if(sipPort==''||sipAddress==''){
				 window.tip.show_pk("danger",null,window.lc.getValue("sipAddrOrport"));
					return;
				}
				if(!validate(sipAddress)){
					window.tip.show_pk("danger",null,window.lc.getValue("sipIpError"));
					return;	
					
				}
				if(!/^\d+$/.test(sipPort)||parseInt(sipPort)<0||parseInt(sipPort)>65535){
					window.tip.show_pk("danger",null,window.lc.getValue("sipPortError"));
					return;	
					
				}
			}
			if(webSwitchValue==1){
				 var webPort=$('#myModal input[name=webPort]').val();
				 var sslPort=$('#myModal input[name=sslPort]').val();
				 if(!/^\d+$/.test(webPort)||parseInt(webPort)<1024||parseInt(webPort)>65535){
					 if(webPort!=80){
				window.tip.show_pk("danger",null,window.lc.getValue("webPortRand"));
				return;
					 }
				 }
				 if(!/^\d+$/.test(sslPort)||parseInt(sslPort)<1024||parseInt(sslPort)>65535){
					 if(sslPort!=443){
				window.tip.show_pk("danger",null,window.lc.getValue("sslPortRand"));
				return;
					 }
				 }
				 if(sslPort==webPort){
					 window.tip.show_pk("danger",null,window.lc.getValue("notSame"));
						return; 
				 }
			}
			if(callSwitchValue==1){
				 var callKeep=$('#myModal input[name=callKeep]').val();
				 if(!/^\*\d{0,2}\#$/.test(callKeep)){
					 window.tip.show_pk("danger",null,window.lc.getValue("callKeepRand"));
						return;	 
				 }
				
			}
			if(netMangerSwitchValue==1){
				var netAddress=$('#myModal input[name=netAddress]').val();
				var netPort=$('#myModal input[name=netPort]').val();
				if(netPort==''||netAddress==''){
				 window.tip.show_pk("danger",null,window.lc.getValue("netAddrOrport"));
					return;
				}
				if(!validate(netAddress)){
					window.tip.show_pk("danger",null,window.lc.getValue("netIpError"));
					return;	
					
				}
				if(!/^\d+$/.test(netPort)||parseInt(netPort)<0||parseInt(netPort)>65535){
					window.tip.show_pk("danger",null,window.lc.getValue("netPortError"));
					return;	
					
				}
			}
			if(drpSwitchValue==1){
				var drpAddress=$('#myModal input[name=drpAddress]').val();
				var drpPort=$('#myModal input[name=drpPort]').val();
				if(drpAddress==''||drpPort==''){
				 window.tip.show_pk("danger",null,window.lc.getValue("drpAddrOrport"));
					return;
				}
				if(!validate(drpAddress)){
					window.tip.show_pk("danger",null,window.lc.getValue("drpIpError"));
					return;	
					
				}
				
					if(!/^\d+$/.test(drpPort)||parseInt(drpPort)<0||parseInt(drpPort)>65535){
						window.tip.show_pk("danger",null,window.lc.getValue("drpPortError"));
						return;	
						
					}
				
			}
			if(netSwitchValue==1){
				var ipValue=$('#myModal select[name=ipProtocol]').val();
				  //若ip6
				  if(ipValue==2){
					  var getIPValue=$('#myModal input[name=getIP]:checked').val();
				    	 if(getIPValue==2){//自动获取IP处理
				    		 var getDNSValue=$('#myModal input[name=getDNS]:checked').val();
				    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
				    		 if(getDNSValue==""||WANMtuValue==""){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuIsNull"));
									return; 
				    		 }
				    		 if(WANMtuValue<512||WANMtuValue>1500){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
									return;  
				    		 }
				    	 }else if(getIPValue==1){//手动获取IP处理
				    		 var ipAddrValue=$('#myModal input[name=ipAddr]').val();
				    		 var wanMaskValue=$('#myModal input[name=wanMask]').val();
				    		 var wanGatewayValue=$('#myModal input[name=wanGateway]').val();
				    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
				    		 var mainDNSValue=$('#myModal input[name=mainDNS]').val();
				    		 var secDNSValue=$('#myModal input[name=secDNS]').val()
				    		 if(ipAddrValue==''||wanMaskValue==''||wanGatewayValue==''||WANMtuValue==''||mainDNSValue==''||secDNSValue==''){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("IPOrDNSIsNull"));
									return;  
				    		 }
				    		 if(!validate(ipAddrValue)){
									window.tip.show_pk("danger",null,window.lc.getValue("netWorkIpError"));
									return;	
								}
				    		 if(!validate(wanMaskValue)){
									window.tip.show_pk("danger",null,window.lc.getValue("wanMaskError"));
									return;	
									
								}
				    		 if(!validate(wanGatewayValue)){
									window.tip.show_pk("danger",null,window.lc.getValue("wanGatewayError"));
									return;	
									
								}
				    		 if(!validate(secDNSValue)){
									window.tip.show_pk("danger",null,window.lc.getValue("secDNSError"));
									return;	
									
								}
				    		 if(!validate(mainDNSValue)){
									window.tip.show_pk("danger",null,window.lc.getValue("mainDNSError"));
									return;	
									
								}
				    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
									return;  
				    		 }
				    	 }else if(getIPValue==3){//PPPOE账号处理
				    		 var pppUsernameValue=$('#myModal input[name=pppUsername]').val();
				    		 var pppPasswordValue=$('#myModal input[name=pppPassword]').val();
				    		 var pppServiceNameValue=$('#myModal input[name=pppServiceName]').val();
				    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
				    		 var secDNSValue=$('#myModal input[name=secDNS]').val();
				    		 
				    		 if(pppUsernameValue==""||pppPasswordValue==""||pppServiceNameValue==""||WANMtuValue==""){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("pppOEIsNull"));
				    			 
				    		 }
				    		 if(/.*[^\x00-\xff]+.*$/.test(pppUsernameValue)||/.*[^\x00-\xff]+.*$/.test(pppPasswordValue)||/.*[^\x00-\xff]+.*$/.test(pppServiceNameValue)){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("pppOEIsError"));
				    			 return;
				    		 }
				    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
				    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
									return;  
				    		 }
				    	 }
					  
					  
					  
				  }else if(ipValue==1){//若为ip4处理
					  var networkModeValue=$('#myModal input[name=networkMode]:checked').val();
					    if(networkModeValue==1){//桥接模式处理
					    	 var getIPValue=$('#myModal input[name=getIP]:checked').val();
					    	 if(getIPValue==2){//自动获取IP处理
					    		 var getDNSValue=$('#myModal input[name=getDNS]:checked').val();
					    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
					    		 if(getDNSValue==""||WANMtuValue==""){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuIsNull"));
										return; 
					    		 }
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    	 }else if(getIPValue==1){//手动获取IP处理
					    		 var ipAddrValue=$('#myModal input[name=ipAddr]').val();
					    		 var wanMaskValue=$('#myModal input[name=wanMask]').val();
					    		 var wanGatewayValue=$('#myModal input[name=wanGateway]').val();
					    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
					    		 var mainDNSValue=$('#myModal input[name=mainDNS]').val();
					    		 var secDNSValue=$('#myModal input[name=secDNS]').val()
					    		 if(ipAddrValue==''||wanMaskValue==''||wanGatewayValue==''||WANMtuValue==''||mainDNSValue==''||secDNSValue==''){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("IPOrDNSIsNull"));
										return;  
					    		 }
					    		 if(!validate(ipAddrValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("netWorkIpError"));
										return;	
									}
					    		 if(!validate(wanMaskValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("wanMaskError"));
										return;	
										
									}
					    		 if(!validate(wanGatewayValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("wanGatewayError"));
										return;	
										
									}
					    		 if(!validate(secDNSValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("secDNSError"));
										return;	
										
									}
					    		 if(!validate(mainDNSValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("mainDNSError"));
										return;	
										
									}
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    	 }else if(getIPValue==3){//PPPOE账号处理
					    		 var pppUsernameValue=$('#myModal input[name=pppUsername]').val();
					    		 var pppPasswordValue=$('#myModal input[name=pppPassword]').val();
					    		 var pppServiceNameValue=$('#myModal input[name=pppServiceName]').val();
					    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
					    		 var secDNSValue=$('#myModal input[name=secDNS]').val();
					    		 
					    		 if(pppUsernameValue==""||pppPasswordValue==""||pppServiceNameValue==""||WANMtuValue==""){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("pppOEIsNull"));
					    			 return;
					    			 
					    		 }
					    		 if(/.*[^\x00-\xff]+.*$/.test(pppUsernameValue)||/.*[^\x00-\xff]+.*$/.test(pppPasswordValue)||/.*[^\x00-\xff]+.*$/.test(pppServiceNameValue)){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("pppOEIsError"));
					    			 return;
					    		 }
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    	 }
					    }else if(networkModeValue==0){//路由模式处理
					    	var getIPValue=$('#myModal input[name=getIP]:checked').val();
					    	 if(getIPValue==2){//自动获取IP处理
					    		 var getDNSValue=$('#myModal input[name=getDNS]:checked').val();
					    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
					    		 var lanIpAddrValue=$('#myModal input[name=lanIpAddr]').val();
					    		 var lanWanMaskValue=$('#myModal input[name=lanWanMask]').val();
					    		 var lanMtuValue=$('#myModal input[name=lanMtu]').val();
					    		 
					    		 if(getDNSValue==""||WANMtuValue==""||lanIpAddrValue==""||lanWanMaskValue==""||lanMtuValue==""){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuIsNull"));
										return; 
					    		 }
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    		 if(!/^\d+$/.test(lanMtuValue)||lanMtuValue<512||lanMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("lanMtuRand"));
										return;  
					    		 }
					    		 if(!validate(lanIpAddrValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("lanIpAddrValue"));
										return;	
									}
					    		 if(!validate(lanWanMaskValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("lanWanMaskError"));
										return;	
									}
					    	 }else if(getIPValue==1){//手动获取IP处理
					    		 var ipAddrValue=$('#myModal input[name=ipAddr]').val();
					    		 var wanMaskValue=$('#myModal input[name=wanMask]').val();
					    		 var wanGatewayValue=$('#myModal input[name=wanGateway]').val();
					    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
					    		 var mainDNSValue=$('#myModal input[name=mainDNS]').val();
					    		 var secDNSValue=$('#myModal input[name=secDNS]').val()
					    		 var lanIpAddrValue=$('#myModal input[name=lanIpAddr]').val();
					    		 var lanWanMaskValue=$('#myModal input[name=lanWanMask]').val();
					    		 var lanMtuValue=$('#myModal input[name=lanMtu]').val();
					    		 if(ipAddrValue==''||wanMaskValue==''||wanGatewayValue==''||WANMtuValue==''||mainDNSValue==''||secDNSValue==''||lanIpAddrValue==""||lanWanMaskValue==""||lanMtuValue==""){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("IPOrDNSIsNull"));
										return;  
					    		 }
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    		 if(!/^\d+$/.test(lanMtuValue)||lanMtuValue<512||lanMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("lanMtuRand"));
										return;  
					    		 }
					    		 if(!validate(lanIpAddrValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("lanIpAddrValue"));
										return;	
									}
					    		 if(!validate(lanWanMaskValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("lanWanMaskError"));
										return;	
									}
					    		 if(!validate(ipAddrValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("netWorkIpError"));
										return;	
									}
					    		 if(!validate(wanMaskValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("wanMaskError"));
										return;	
										
									}
					    		 if(!validate(wanGatewayValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("wanGatewayError"));
										return;	
										
									}
					    		 if(!validate(secDNSValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("secDNSError"));
										return;	
										
									}
					    		 if(!validate(mainDNSValue)){
										window.tip.show_pk("danger",null,window.lc.getValue("mainDNSError"));
										return;	
										
									}
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    	 }else if(getIPValue==3){//PPPOE账号处理
					    		 var pppUsernameValue=$('#myModal input[name=pppUsername]').val();
					    		 var pppPasswordValue=$('#myModal input[name=pppPassword]').val();
					    		 var pppServiceNameValue=$('#myModal input[name=pppServiceName]').val();
					    		 var WANMtuValue=$('#myModal input[name=wanMtu]').val();
					    		 var secDNSValue=$('#myModal input[name=secDNS]').val();
					    		 var lanIpAddrValue=$('#myModal input[name=lanIpAddr]').val();
					    		 var lanWanMaskValue=$('#myModal input[name=lanWanMask]').val();
					    		 var lanMtuValue=$('#myModal input[name=lanMtu]').val();
					    		 if(!/^\d+$/.test(WANMtuValue)||WANMtuValue<512||WANMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("wanMtuRand"));
										return;  
					    		 }
					    		 if(/.*[^\x00-\xff]+.*$/.test(pppUsernameValue)||/.*[^\x00-\xff]+.*$/.test(pppPasswordValue)||/.*[^\x00-\xff]+.*$/.test(pppServiceNameValue)){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("pppOEIsError"));
					    			 return;
					    		 }
					    		 if(!/^\d+$/.test(lanMtuValue)||lanMtuValue<512||lanMtuValue>1500){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("lanMtuRand"));
										return;  
					    		 }
					    		 if(pppUsernameValue==""||pppPasswordValue==""||pppServiceNameValue==""||WANMtuValue==""||lanIpAddrValue==""||lanWanMaskValue==""||lanMtuValue==""){
					    			 window.tip.show_pk("danger",null,window.lc.getValue("pppOEIsNull"));
					    			 return;
					    			 
					    		 }
					    	 }
					    	
					    }
					  
				  }
				  
				
			}
			
			
			
			var params={};
			for(var i=0;i<rows.length;i++){
				if(i==0){
					var productSn=rows[i].productSns;
				}else {
					var productSn=productSn+","+rows[i].productSns;
				}
				
			}
			
			params.productSn=productSn;
			params.domainUuid=rows[0].domainUuid;
			//获取web端口配置
			params.webSwitch=$('#myModal input[name=webSwitch]:checked').val();
			params.webPort=$('#myModal input[name=webPort]').val();
			params.sslPort=$('#myModal input[name=sslPort]').val();
			//获取功能键配置
			params.callSwitch=$('#myModal input[name=callSwitch]:checked').val();
			params.callKeep=$('#myModal input[name=callKeep]').val();
			//获取drp配置的值
			params.drpSwitch=$('#myModal input[name=drpSwitch]:checked').val();
			params.drpAddress=$('#myModal input[name=drpAddress]').val();
			params.drpPort=$('#myModal input[name=drpPort]').val();
			//获取sipp配置的值
			params.sipSwitch=$('#myModal input[name=sipSwitch]:checked').val();
			params.sipServerAddr=$('#myModal input[name=sipAddress]').val();
			params.sipServerPort=$('#myModal input[name=sipPort]').val();
			//获取网络管理的值
			params.netMangerSwitch=$('#myModal input[name=netMangerSwitch]:checked').val();
			params.netManageAddr=$('#myModal input[name=netAddress]').val();
			params.netManagePort=$('#myModal input[name=netPort]').val();
			//获取本地网络配置的值
			params.netSwitch=$('#myModal input[name=netSwitch]:checked').val();
			params.ipProtocol=$('#myModal select[name=ipProtocol]').val();//ipv4或者ip6
			params.networkMode=$('#myModal input[name=networkMode]:checked').val();//桥接或者路由
			params.netMode=$('#myModal input[name=getIP]:checked').val()//自动获取Ip或者手动获取或者pppoe
			params.wanEthMode=1;//暂时设定为1
			params.wanIp=$('#myModal input[name=ipAddr]').val();//wan口ip地址
			params.wanMask=$('#myModal input[name=wanMask]').val();//wan口掩码
			params.wanGateway=$('#myModal input[name=wanGateway]').val();//wan口网关
			var wanMtu=$('#myModal input[name=wanMtu]').val()//wanMtu
			 if(wanMtu==''){
					params.wanMtu=1400;
			 }else{
				 params.wanMtu=wanMtu; 
			 }   
			params.pppUsername=$('#myModal input[name=pppUsername]').val();//ppp用户名
			params.pppPassword=$('#myModal input[name=pppPassword]').val()//ppp用户名
			params.pppServicename=$('#myModal input[name=pppServiceName]').val();//ppp服务器名
			params.lanEthmode=1;//暂时设定为1
			params.lanIp=$('#myModal input[name=lanIpAddr]').val()//lan口IP地址
			params.lanMask=$('#myModal input[name=lanWanMask]').val();//lan口掩码
			var lanMtu=$('#myModal input[name=lanMtu]').val();//lan口MTU
			if(lanMtu==''){
				params.lanMtu=1500;
			}else{
				params.lanMtu=lanMtu;	
			}
			params.usePeerDns=$('#myModal input[name=getDNS]:checked').val();//自动获取dns（disable/enable）
			params.wanDns1=$('#myModal input[name=mainDNS]').val();//主用DNS
			params.wanDns2=$('#myModal input[name=secDNS]').val();//备用dns
			//params.provUrl="121.41.119.101";//文件上传路径
			params.provUrl=window.extra.provUrl;
			$.ajax({
				url:'batchConfigurationManager!batchConfiguration.action',
				type:'post',
				data:params,
				complete:function(data){
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			 }
			})
			
		})
	}
	function switchChange(name,row){
		$('#myModal input[name="'+name+'"]').change(function() { 
			createRoid(name,row)
		
		}); 
	
		
	}
	function createRoid(name,row){
		var value=$('#myModal input[name="'+name+'"]:checked').val();
	/*	if(value==0){
		//if(document.getElementById(name).style.display=="none"){
			document.getElementById(name).style.display='block';
			document.getElementById("modal-body").style.height='320px';
			createNewConfig(name,true);
			if(name=="netSwitch"){
				document.getElementById("modal-body").style.height='500px';
				createNetSwitchFun();
			
			}
		
	 }else*/ if(value==2){
		 document.getElementById(name).style.display='none';
		 document.getElementById("modal-body").style.height='200px';
	 }else if(value==1){
		 document.getElementById(name).style.display='block';
		 document.getElementById("modal-body").style.height='320px';
		 
		 if(name=="netSwitch"){
			 document.getElementById("modal-body").style.height='500px';
				createNetSwitchFun();
			
			}
		 
	 }
	}
	function validate(value){
  if(/^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,4}$/.test(value) ||
	/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)){
		    return true;
		  }else{
		    return false;
		  }
	}
	function createNetSwitchFun() {
		/*$('#myModal input[name=wanMtu]').val('1400');
		getInputDisplay("pppUsername");
		getInputDisplay("pppPassword");
		getInputDisplay("pppServiceName");
		getInputDisplay("ipAddr");
		getInputDisplay("wanMask");
		getInputDisplay("wanGateway");
		getInputDisplay("mainDNS");
		getInputDisplay("secDNS");
		$("input[name=getIP]").get(2).checked=true*/
		
		//ip绑定事件
		$('#myModal select[name=ipProtocol]').bind('change',function(){
		var value=$('#myModal select[name=ipProtocol]').val();
		if(value==1){
			
			document.getElementById("networkMode").style.display='block'
		}else if(value==2){
			document.getElementById("networkMode").style.display='none'
			document.getElementById("LANPort").style.display='none'
		}
			
			
		})
		//网络模式绑定事件
		$('#myModal input[name=networkMode]').bind('change',function(){
		var value=$('#myModal input[name=networkMode]:checked').val();
		
		if(value==0){
			document.getElementById("LANPort").style.display='block'
				$('#myModal input[name=lanMtu]').val('1500');
				$('#span1').text(window.lc.getValue("wanPort"))
		}else if(value==1){
			
			document.getElementById("LANPort").style.display='none'
				$('#span1').text(window.lc.getValue("networkSet"))
				
		}
			
			
		})
		//获取ip绑定事件
		$('#myModal input[name=getIP]').bind('change',function(){
			var value=$('#myModal input[name=getIP]:checked').val();
			createIpChange(value,true);
		})
		
	}
	function createIpChange(value,flag){
		if(value==1){
			getInputEnable("ipAddr")
			getInputEnable("wanMask");
			getInputEnable("wanGateway");
			getInputEnable("mainDNS");
			getInputEnable("secDNS");
			getInputDisplay("pppUsername");
			getInputDisplay("pppPassword");
			getInputDisplay("pppServiceName");
			//$("input[type=radio][name=getDNS][value=0]").attr("checked", "checked")
			if(flag){
			$("input[name=getDNS]").get(0).checked=true
			}
			//$("input[name=getDNS]:eq(0)").attr("checked",'checked')
		}else if(value==2){
			getInputDisplay("ipAddr");
			getInputDisplay("wanMask");
			getInputDisplay("wanGateway");
			getInputDisplay("mainDNS");
			getInputDisplay("secDNS");
			getInputDisplay("pppUsername");
			getInputDisplay("pppPassword");
			getInputDisplay("pppServiceName");
			if(flag){
			$("input[name=getDNS]").get(1).checked=true
			$("input[name=getDNS]").attr("disabled", "disabled");
			}
		}else if(value==3){
			if(flag){
			$("input[name=getDNS]").get(1).checked=true
			$("input[name=getDNS]").attr("disabled", "disabled");
			}
			getInputDisplay("ipAddr");
			getInputDisplay("wanMask");
			getInputDisplay("wanGateway");
			getInputDisplay("mainDNS");
			getInputDisplay("secDNS");
			getInputEnable("pppUsername");
			getInputEnable("pppPassword");
			getInputEnable("pppServiceName");
			}
	}
	function getInputDisplay(name){
		$('#myModal input[name="'+name+'"]').attr("disabled","disabled");
	}
	function getInputEnable(name){
		$('#myModal input[name="'+name+'"]').attr("disabled",false);
	}
	function createConfigDevHtml(pid,id,row){
		var list=[]
		          list.push({value:'1',text:window.lc.getValue("sipServer")},{value:'2',text:window.lc.getValue("netMangerConfig")},
		        		  {value:'3',text:window.lc.getValue("drpConfig")},{value:'4',text:window.lc.getValue("netConfig")},{value:'5',text:window.lc.getValue("callFun")},{value:'6',text:window.lc.getValue("webPort")});    
				var pn=$("#myModal");
				if(!pn) return;
				var html='<div class="modal-dialog" >'
				      +'<div class="modal-content">'
				      +'<div class="modal-header">'
					      +'<button type="button" class="close" '
					      +'data-dismiss="modal" aria-hidden="true">'
					      +'&times;'
					      +'</button>'
					      +'<h4 class="modal-title" id="myModalLabel">'
		  		         +window.lc.getValue("deviceConfig")
					      +'</h4>'
					      +'</div>'
				      +'<div class="modal-body" id="modal-body" style="height:200px;overflow-y:scroll;>'
					      +'<form class="" role="form">'
						      +'<div class="row">'
						      +'<div class="col-md-12" >'
						      html+='<span style="color:gray"><font color="red">*</font>'+window.lc.getValue('sipTip')+'</span>'
						      +'</br>'
						      html+=field.getComboField("devConfig","",window.lc.getValue("selConfig"),list)
						      +'</br>'
                              html+='<div id="callFun" style="display:none">'
                            	  +field.getRadioField("callSwitch",0,window.lc.getValue("callSwitch"),[/*{value:0,text:window.lc.getValue("newConfig")},*/{value:1,text:window.lc.getValue("newConfig")},{value:2,text:window.lc.getValue("cleanConfig")}])
					    		   +'<div id="callSwitch" style="display:none" >'
								       html+=field.getTextField("callKeep","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("callKeep"));
							       html+='</div>'
								  +'</div>'	
								  html+='<div id="webPort" style="display:none">'
	                            	  +field.getRadioField("webSwitch",0,window.lc.getValue("webSwitch"),[/*{value:1,text:window.lc.getValue("newConfig")},*/{value:1,text:window.lc.getValue("newConfig")},{value:2,text:window.lc.getValue("cleanConfig")}])
						    		   +'<div id="webSwitch" style="display:none" >'
						    		      html+='<span style="color:gray"><font color="red">*</font>'+window.lc.getValue('restartEffect')+'</span>';
									       html+=field.getTextField("webPort","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("webPort"));
							               html+=field.getTextField("sslPort","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("sslPort"));
								       html+='</div>'
									  +'</div>'
						      html+='<div id="sip">'
					    		   +field.getRadioField("sipSwitch",0,window.lc.getValue("sipSwitch"),[/*{value:0,text:window.lc.getValue("newConfig")},*/{value:1,text:window.lc.getValue("newConfig")},{value:2,text:window.lc.getValue("cleanConfig")}])
					    		   +'<div id="sipSwitch" style="display:none" >'
								       html+=field.getTextField("sipAddress","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("sipAddress"));
								       html+=field.getTextField("sipPort","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("sipPort"));
							       html+='</div>'
					          html+='</div>'
				        	  html+='<div id="netManger" style="display:none" >'
					    		  +field.getRadioField("netMangerSwitch",0,window.lc.getValue("netMangerSwitch"),[/*{value:0,text:window.lc.getValue("newConfig")},*/{value:1,text:window.lc.getValue("newConfig")},{value:2,text:window.lc.getValue("cleanConfig")}])
					    		  +'<div id="netMangerSwitch" style="display:none" >'
								      html+=field.getTextField("netAddress","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("netAddress"));
								      html+=field.getTextField("netPort","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("netPort"));
							      html+='</div>'
				    	      html+='</div>'	  
			    	    	  html+='<div id="drp" style="display:none">'
			    	    		  html+=field.getRadioField("drpSwitch",0,window.lc.getValue("drpSwitch"),[/*{value:0,text:window.lc.getValue("newConfig")},*/{value:1,text:window.lc.getValue("newConfig")},{value:2,text:window.lc.getValue("cleanConfig")}])
			    	    		  
							      html+='<div id="drpSwitch" style="display:none" >'
							    	 // html+=field.getRadioField("drpSwitch1",0,window.lc.getValue("drpSwitch1"),[{value:1,text:window.lc.getValue("open")},{value:0,text:window.lc.getValue("close")}])
								      html+=field.getTextField("drpAddress","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("drpAddress"));
								      html+=field.getTextField("drpPort","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("drpPort"));
							      html+='</div>'
						         html+='</div>'
						        	 html+='</div>'
								         html+='</div>'	 
				        	 html+='<div id="net" style="display:none;margin-left: 16px">'
			        		 html+=field.getRadioField("netSwitch",0,window.lc.getValue("netSwitch"),[/*{value:0,text:window.lc.getValue("newConfig")},*/{value:1,text:window.lc.getValue("newConfig")},{value:2,text:window.lc.getValue("cleanConfig")}])
						     html+='<div id="netSwitch" style="display:none" >'
						    	 html+='<span style="color:gray"><font color="red">*</font>'+window.lc.getValue('netTip')+'</span>'
						          html+=field.getComboField("ipProtocol","",window.lc.getValue("ipProtocol"),[{value:1,text:"IPv4"},{value:2,text:"IPv6"}])
						          html+='<div id="networkMode">'
						        	  html+=field.getRadioField("networkMode",0,window.lc.getValue("networkMode"),[{value:0,text:window.lc.getValue("routing")},{value:1,text:window.lc.getValue("bridge")}])
							      html+='</div>'
							      html+='<div id="netWorkSet" >'
							    	  html+='<div class="form-group-sm"><label class="margin-bottom-0"><span id="span1">'+window.lc.getValue('networkSet')+'</span></label><div>'
							    	  html+=field.getRadioField("getIP",0,"",[{value:3,text:"PPPoE"},{value:1,text:window.lc.getValue("manuaIp")},{value:2,text:window.lc.getValue("autoIp")}])
							    	 // html+=field.getCheckboxField("autoIp",0,"",[{value:1,text:window.lc.getValue("autoIp")}])
							    	 // html+=field.getCheckboxField("manuaIp",0,"",[{value:1,text:window.lc.getValue("manuaIp")}])
							    	  html+=field.getTextField("ipAddr","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("ipAddr"));
						              html+=field.getTextField("wanMask","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("wanMask"));
						              html+=field.getTextField("wanGateway","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("wanGateway"));
						             // html+=field.getRadioField("getIP",0,"",)
						              html+=field.getTextField("pppUsername","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("pppUsername"));
						              html+=field.getTextField("pppPassword","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("pppPassword"));
						              html+=field.getTextField("pppServiceName","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("pppServiceName"));
						              html+=field.getTextField("wanMtu","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("wanMtu"));
							      html+='</div>' 
						    	  html+='<div id="LANPort" style="display:none">'
						    		  html+='<div class="form-group-sm"><label class="margin-bottom-0"><span id="span2">'+window.lc.getValue('lanPort')+'</span></label><div>' 
						    		  html+=field.getTextField("lanIpAddr","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("ipAddr"));
						              html+=field.getTextField("lanWanMask","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("wanMask"));
						              html+=field.getTextField("lanMtu","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("lanMtu"));
					    		  html+='</div>' 
					    		  html+='</div>'
					    		  html+='</div>'
				    			  html+='<div id="DNSServer">'
				    				  html+='<div class="form-group-sm"><label class="margin-bottom-0"><span id="span2">'+window.lc.getValue('dnsServer')+'</span></label><div>' 
				    				  html+=field.getRadioField("getDNS",0,"",[{value:0,text:window.lc.getValue("manuaDNS")},{value:1,text:window.lc.getValue("autoDNS")}])
				    				 // html+=field.getCheckboxField("autoDNS",0,"",[{value:1,text:window.lc.getValue("autoDNS")}])
							    	 // html+=field.getCheckboxField("manuaDNS",0,"",[{value:1,text:window.lc.getValue("manuaDNS")}])
							    	  html+=field.getTextField("mainDNS","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("mainDNS"));
						              html+=field.getTextField("secDNS","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("secDNS"));
			    				  html+='</div>'   
						      html+='</div>'
					          html+='</div>'
							  html+='</div>'
							  html+='</div>'
							  
					    	  +'</div>'			  
					      +'</div>'
				       +'</form>'
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
				//createOldConfig(row)
			
				
	}
	function createOldConfig(row){
	/*	getInputDisplay("sipAddress");
		getInputDisplay("sipPort");
		getInputDisplay("drpPort");
		getInputDisplay("drpAddress");
		getInputDisplay("netAddress");
		getInputDisplay("netPort");
		getInputDisplay("ipAddr");
		getInputDisplay("wanMask");
		getInputDisplay("wanMtu");
		getInputDisplay("pppUsername");
		getInputDisplay("pppPassword");
		getInputDisplay("pppServiceName");
		getInputDisplay("lanIpAddr");
		getInputDisplay("lanWanMask");
		getInputDisplay("mainDNS");
		getInputDisplay("secDNS");
		getInputDisplay("sslPort");
		getInputDisplay("webPort");
		getInputDisplay("callKeep");
		getInputDisplay("getDNS");
		getInputDisplay("networkMode");
		getInputDisplay("getIP");
		getInputDisplay("wanMtu");
		$('#myModal select[name="ipProtocol"]').attr("disabled","disabled");*/
		if(row.length==1){
			var params={};
			params.domainUuid=row[0].domainUuid;
			params.productSn=row[0].productSns
			$.ajax({
				url:'batchConfigurationManager!getBatchConfiguration.action',
				type:'post',
				data:params,
				complete:function(data){
					if(data.responseJSON && data.responseJSON.success){	
						var devConf=data.responseJSON.devConf;
						window.flag=true;
						var sipSwitchValue=$('#myModal input[name=sipSwitch]:checked').val();
						var drpSwitchValue=$('#myModal input[name=drpSwitch]:checked').val();
						var netMangerSwitchValue=$('#myModal input[name=netMangerSwitch]:checked').val();
						var netSwitchValue=$('#myModal input[name=netSwitch]:checked').val();
						var webSwitchValue=$('#myModal input[name=webSwitch]:checked').val();
						var callSwitchValue=$('#myModal input[name=callSwitch]:checked').val();
						//if(sipSwitchValue==0){
							if(devConf[0].sipSwitch==1){
								$('#myModal input[name=sipAddress]').val(devConf[0].sipServerAddr);
								$('#myModal input[name=sipPort]').val(devConf[0].sipServerPort);
								
								
							}/*else{
							
								createNewConfig("sipSwitch",false);
								
								
							}*/
						//}
						//if(drpSwitchValue==0){
							if(devConf[0].drpSwitch==1){
								$('#myModal input[name=drpAddress]').val(devConf[0].drpAddress);
								$('#myModal input[name=drpPort]').val(devConf[0].drpPort);
								
							}/*else{
								createNewConfig("drpSwitch",false);
								
							}*/
						//}
						//if(netMangerSwitchValue==0){
							if(devConf[0].netMangerSwitch==1){
								$('#myModal input[name=netAddress]').val(devConf[0].netManageAddr);
								$('#myModal input[name=netPort]').val(devConf[0].netManagePort);
								
							}/*else{
								createNewConfig("netMangerSwitch",false);
								
							}*/
						//}
						//if(netSwitchValue==0){
							if(devConf[0].netSwitch==1){
							    $("#myModal select[name=ipProtocol]").find('option[value="'+devConf[0].ipProtocol+'"]').attr("selected",true);
							    $("input[name=networkMode]").get(devConf[0].networkMode).checked=true;
							    if(devConf[0].netMode==3){
							    $("input[name=getIP]").get(0).checked=true;
							    }else if(devConf[0].netMode==2){
							    	 $("input[name=getIP]").get(2).checked=true;
							    }else if(devConf[0].netMode==1){
							    	 $("input[name=getIP]").get(1).checked=true;
							    }
							    $("input[name=getDNS]").get(devConf[0].usePeerDns).checked=true;
							   $('#myModal input[name=ipAddr]').val(devConf[0].wanIp);//wan口ip地址
								$('#myModal input[name=wanMask]').val(devConf[0].wanMask);//wan口掩码
								$('#myModal input[name=wanGateway]').val(devConf[0].wanGateway);//wan口网关
								$('#myModal input[name=wanMtu]').val(devConf[0].wanMtu)//wanMtu
								 
								$('#myModal input[name=pppUsername]').val(devConf[0].pppUsername);//ppp用户名
								$('#myModal input[name=pppPassword]').val(devConf[0].pppPassword)//ppp用户名
								$('#myModal input[name=pppServiceName]').val(devConf[0].pppServicename);//ppp服务器名
								//params.lanEthmode=1;//暂时设定为1
								$('#myModal input[name=lanIpAddr]').val(devConf[0].lanIp)//lan口IP地址
								$('#myModal input[name=lanWanMask]').val(devConf[0].lanMask);//lan口掩码
								
								//params.usePeerDns=$('#myModal input[name=getDNS]:checked').val();//自动获取dns（disable/enable）
								$('#myModal input[name=mainDNS]').val(devConf[0].wanDns1);//主用DNS
								$('#myModal input[name=secDNS]').val(devConf[0].wanDns2);//备用dns
								if(devConf[0].networkMode==1){
									createIpChange(devConf[0].netMode,false)
									
								}
								if(devConf[0].networkMode==0){
									createIpChange(devConf[0].netMode,false)
									document.getElementById("LANPort").style.display='block'
				             $('#myModal input[name=lanMtu]').val(devConf[0].lanMtu);
				              $('#span1').text(window.lc.getValue("wanPort"))
								}
								
							}//else{
//								createNewConfig("netSwitch",false);
//								
//							}
						//}
						//if(webSwitchValue==0){
							if(devConf[0].webSwitch==1){
							params.webSwitch=$('#myModal input[name=webSwitch]:checked').val();
							$('#myModal input[name=webPort]').val(devConf[0].webPort);
						    $('#myModal input[name=sslPort]').val(devConf[0].sslPort);
						    
						 }/*else{
							 
								createNewConfig("webSwitch",false);
						 }*/
						//}
					//	if(callSwitchValue==0){
							if(devConf[0].callSwitch==1){
								$('#myModal input[name=callKeep]').val(devConf[0].callKeep);	
								
						}//else{
//								createNewConfig("callSwitch",false);
//							}
						//}
					
				}/*else{
					createNewConfig("drpSwitch",false);
					createNewConfig("sipSwitch",false);
					createNewConfig("netMangerSwitch",false);
					createNewConfig("netSwitch",false);
					createNewConfig("callSwitch",false);
					createNewConfig("webSwitch",false);
				}*/
			 }
			})
		}
		
	}
/*	function createNewConfig(name,flag){
		if(name=="sipSwitch"){
		//$('#myModal input[name=sipAddress]').val("");
	//	$('#myModal input[name=sipPort]').val('');
			if(flag){
			getInputEnable("sipAddress");
			getInputEnable("sipPort");
			}
		}
		if(name=='drpSwitch'){
	//	$('#myModal input[name=drpAddress]').val('');
	//	$('#myModal input[name=drpPort]').val('');
		if(flag){
		getInputEnable("drpPort");
		getInputEnable("drpAddress");
		}
		}
		if(name=='netMangerSwitch'){
		//$('#myModal input[name=netAddress]').val('');
	//	$('#myModal input[name=netPort]').val('');
		if(flag){
		getInputEnable("netAddress");
		getInputEnable("netPort");
		}
		}
		if(name=="webSwitch")
		{		
	   // $('#myModal input[name=webPort]').val('');
	 //   $('#myModal input[name=sslPort]').val('');
	    if(flag){
	    getInputEnable("sslPort");
	    getInputEnable("webPort");
	    }
		}
		if(name=='callSwitch'){
	    $('#myModal input[name=callKeep]').val('');	
	    if(flag){
	    getInputEnable("callKeep");
	    }
		}
	   if(name=='netSwitch'){
	   $('#myModal input[name=ipAddr]').val('');//wan口ip地址
		$('#myModal input[name=wanMask]').val('');//wan口掩码
		$('#myModal input[name=wanGateway]').val('');//wan口网关
		$('#myModal input[name=wanMtu]').val('')//wanMtu
		 
		$('#myModal input[name=pppUsername]').val('');//ppp用户名
		$('#myModal input[name=pppPassword]').val('')//ppp用户名
		$('#myModal input[name=pppServiceName]').val('');//ppp服务器名
		//params.lanEthmode=1;//暂时设定为1
		$('#myModal input[name=lanIpAddr]').val('')//lan口IP地址
		$('#myModal input[name=lanWanMask]').val('');//lan口掩码
		
		
		//params.usePeerDns=$('#myModal input[name=getDNS]:checked').val();//自动获取dns（disable/enable）
		$('#myModal input[name=mainDNS]').val('');//主用DNS
		$('#myModal input[name=secDNS]').val('');//备用dns
		if(flag){
		getInputEnable("ipAddr");
		getInputEnable("wanMask");
		getInputEnable("wanMtu");
		getInputEnable("pppUsername");
		getInputEnable("pppPassword");
		getInputEnable("pppServiceName");
		getInputEnable("lanIpAddr");
		getInputEnable("lanWanMask");
		getInputEnable("mainDNS");
		getInputEnable("secDNS");
		getInputEnable("getDNS");
		getInputEnable("networkMode");
		getInputEnable("getIP");
		getInputEnable("wanMtu");
		$('#myModal select[name="ipProtocol"]').attr("disabled",false);
		}
	   }
	}*/
    return {
		upgradeDev:upgradeDev,
		addDev:addDev,
		createSetHtml:createSetHtml,
		delDev:delDev,
		delDevDag:delDevDag,
		delDevDagAll:delDevDagAll,
		expCdr:expCdr,
		getComboData:getComboData,
		rebootDev:rebootDev,
		restoreDev:restoreDev,
		backupCfg:backupCfg,
      	restoreCfg:restoreCfg,
		remoteDev:remoteDev,
		addUnknownDev:addUnknownDev,
		createUnknownHtml:createUnknownHtml,
		setDbo:setDbo,
		createDboHtml:createDboHtml,
		applyToDev:applyToDev,
		createBackupCfgHtml:createBackupCfgHtml,
		goToPortList:goToPortList,
		getLoadHtml:getLoadHtml,
		importNe:importNe,
		cancelUpgradeDev:cancelUpgradeDev,
		setReport:setReport,
		doRemoteWeb:doRemoteWeb,
		createConfigHtml:createConfigHtml,
		configDev:configDev,

    };
});


