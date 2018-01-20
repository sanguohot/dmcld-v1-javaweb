define(["dev-validate",'text!html/modal.html','text!html/field/select.html'],function (valid,modal,select){
	function delZone(pid,id,rows){
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
		createAjax("zoneManager!deleteZone.action",params,id,rows);
	}
	function updateZone(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length || rows.length!=1){
			window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
			return;
		}
		var body='';
		body=getZoneBody("set");
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
			createAjax("zoneManager!updateZone.action",params,id);
		});	
	}
	function getZoneBody(type){
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
	function addZone(pid,id){
		var pn=$("#myModal");
		if(!pn) return;
		var body='';
		var domainUuid=window.global.getDomainUuid();
		body=getZoneBody("add");
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

			createAjax("zoneManager!addZone.action",params,id);
		});
	}
    function createAjax(url,param,id,rows){
    	$.ajax({
			url: url,
			data:param,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));			
					if(url.indexOf("delete")>=0 && rows){
						window.list.delRefresh(id,rows);
					}
					require(["dev-tree"], function(dev_t) {
						dev_t.loadTree();
					});
					$('#myModal button[name=close]').trigger("click");
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
    }
    return {
        delZone:delZone,
        updateZone:updateZone,
        addZone:addZone,
        createAjax:createAjax
    };
});