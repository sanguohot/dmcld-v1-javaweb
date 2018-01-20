define(["dev-validate",'text!html/modal.html','text!html/field/select.html'
        ,'text!html/field/radio.html','text!html/field/text.html'
        ,"zone-fun","site-validate"],function (valid,modal,select,radio,text,fun,validate){
	function delSite(pid,id,rows){
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var ids="";
		for(var i=0;i<rows.length;i++){
			if(rows[i].defaultFlag){
				window.tip.show_pk("warning",null,window.lc.getValue("canNotDelDefault"));
				return;
			}
			if(ids!=""){
				ids+=",";
			}
			ids+=rows[i].uuid;
		}
		
		var domainUuid=window.global.getDomainUuid();
		var params="ids="+ids;
		var pa=window.global.getTreeStrPara();
		params+="&"+pa;
		fun.createAjax("siteManager!deleteSite.action",params,id,rows);
	}
	function hasLockSite(rows){
		var ret=false;
		for(var i=0;i<rows.length;i++){
			if(rows[i].mtgStatus==1){
				ret=true;
				break;
			}
		}
		return ret;
	}
	function updateSite(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length || rows.length!=1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}
		var body='';
		body=getSiteBody("set");
		var obj={
			title:window.lc.getValue("set"),
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
		var form=$("#myModal form");
		form.autofill(rows[0]);
		form.validate();
		$('#myModal button[name=commit]').bind("click",function(){			
			if(!form.valid()){
				return;
			}
			var params=form.formSerialize();
			params+="&uuid="+rows[0].uuid;
			params+="&domainUuid="+rows[0].domainUuid;
			fun.createAjax("siteManager!updateSite.action",params,id);
		});	
	}
	function getSiteBody(type){
		var domainUuid=window.global.getDomainUuid();
		var body="";
		body+='<form class="" role="form">';
		  if(!domainUuid && type=="add"){
			var co={
				name:'domainUuid',
				label:window.lc.getValue("domain"),
				list:window.domainList
			  }
			  var tempFn = window.dot.template(select);
			  var html = tempFn(co);
			  body+=html;
		  }		  
	      body+=field.getTextField("name","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("name"),"","","","")           
	      +field.getTextField("alias","",window.lc.getValue("alias"),"","","","")
	      +field.getTextareaField("detailDesc","",window.lc.getValue("desc"),"")
	      +'</form>';
	   return body;   
	}
	function addSite(pid,id){
		var et=window.global.getEtype();
		if(!et || (et!="zone"&&et!="site")){
			window.tip.show_pk("warning",null,"请在左侧导航树选择一个漫游区节点");
			return;
		}
		var pn=$("#myModal");
		if(!pn) return;
		var body='';
		var domainUuid=window.global.getDomainUuid();
		body=getSiteBody("add");
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
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		var form=$("#myModal form");
		form.validate();
		$('#myModal button[name=commit]').bind("click",function(){
			if(!form.valid()){
				return;
			}
			var params=form.formSerialize();
			if(domainUuid){
				var pa=window.global.getTreeStrPara();
				params+="&"+pa;
			}else if(!$('#myModal select').val()){
				window.tip.show_pk("warning",null,window.lc.getValue("plSelDomain"));
				return;
			}

			fun.createAjax("siteManager!addSite.action",params,id);
		});
	}

	function setMtgThreshold(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var x="<font color=red>*</font> ";
		var domainUuid=window.global.getDomainUuid();
		var ids=window.global.getIds(rows);
 	    var tempFn = window.dot.template(radio);
	    var mh = tempFn({label:window.lc.getValue("mtgSwitch"),name:"mtgSwitch",list:[{uuid:0,name:window.lc.getValue("close")},{uuid:1,name:window.lc.getValue("open")}]});
 	    var tempFn = window.dot.template(text);
//	    var ch = tempFn({label:"呼叫上限(秒)",name:"threshold",value:''});
 	    var moneyh=tempFn({label:x+window.lc.getValue("preMoney")+'('+window.lc.getValue("cent")+')',name:"money",value:''});
 	    var perh=tempFn({label:x+window.lc.getValue("preRate")+'('+window.lc.getValue("cent")+'/'+window.lc.getValue("mins")+')',name:"moneyPerSec",value:''});
	    var oh = tempFn({label:window.lc.getValue("mtgOfflineCallTimeSec")+'('+window.lc.getValue("secs")+')',name:"offlineTime",value:''});
		var body="<form>"+mh+"<div name=content>"+moneyh+perh+oh+"</div>"+"</form>";
		var obj={
			title:window.lc.getValue("set"),
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
		var form=$("#myModal form");
		$('#myModal input[name=mtgSwitch]').bind("click",function(){
			var val=$(this).val();
			var content=form.find("div[name=content]");
			if(val==1){
				content.css("display","block");
			}else{
				content.css("display","none");
			}
		})
		
		if(rows.length==1){
			if(rows[0].mtgSwitch && rows[0].mtgSwitch==1){
				$("#myModal input[name=mtgSwitch][value=1]").trigger("click");
			}else{
				$("#myModal input[name=mtgSwitch][value=0]").trigger("click");
			}
//			form.find("input[name=threshold]").val(rows[0].mtgThresholdSec);
			form.find("input[name=offlineTime]").val(rows[0].mtgOfflineCallTimeSec);
			form.find("input[name=money]").val(rows[0].mtgCallMoney);
			form.find("input[name=moneyPerSec]").val(rows[0].mtgCallMoneyPerSec);
		}
		$('#myModal button[name=commit]').bind("click",function(){
			if($('#myModal input[name=mtgSwitch]:checked').val()==1){
				validate.threshold();
				if(!form.valid()){
					return;
				}
			}
			var params=form.formSerialize();
			var money=parseInt(form.find("input[name=money]").val());
			var moneyPerSec=parseInt(form.find("input[name=moneyPerSec]").val());
			var threshold=0;
			if(money && moneyPerSec){
				threshold=Math.round(money*60/moneyPerSec);
			}
			params+="&ids="+ids+"&domainUuid="+domainUuid+"&threshold="+threshold;
			createAjax("siteManager!updateMtgThreshold.action",params,id);
		});
	}
	function setMtgStatus(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var domainUuid=window.global.getDomainUuid();
		var ids=window.global.getIds(rows);
 	    var tempFn = window.dot.template(radio);
	    var mh = tempFn({label:window.lc.getValue("mtgStatus"),name:"mtgStatus",list:[{uuid:0,name:window.lc.getValue("lockStatus",2)},{uuid:1,name:window.lc.getValue("lockStatus",1)}]});
		var body="<form>"+mh+"</form>";
		var obj={
			title:window.lc.getValue("set"),
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
		var form=$("#myModal form");
		console.log(rows);
		if(rows.length==1){
			if(rows[0].mtgStatus && rows[0].mtgStatus==1){
				$("#myModal input[name=mtgStatus][value=1]").trigger("click");
			}else{
				$("#myModal input[name=mtgStatus][value=0]").trigger("click");
			}
		}
		$('#myModal button[name=commit]').bind("click",function(){
			var params=form.formSerialize();
			params+="&ids="+ids+"&domainUuid="+domainUuid;
			createAjax("siteManager!updateMtgStatus.action",params,id);
		});		
	}
    function createAjax(url,param,id){
    	$.ajax({
			url: url,
			data:param,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
    			$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					$('#'+id).bootstrapTable("refresh");
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
    }
    return {
        delSite:delSite,
        updateSite:updateSite,
        addSite:addSite,
        setMtgThreshold:setMtgThreshold,
        setMtgStatus:setMtgStatus,
        hasLockSite:hasLockSite
    };
});