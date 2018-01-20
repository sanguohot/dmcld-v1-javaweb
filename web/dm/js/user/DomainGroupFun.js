/**
 * Created by Rainc on 2015/3/22.
 */
define(["form-field",'text!html/field/select.html','text!html/modal.html','lan-con'],function(field,select,modal,lan){
	function delGrp(pid,id,rows){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var ids=rows[0].uuid;
		var type=rows[0].type;
		if(type==0){
			return window.tip.show_pk("danger",null,window.lc.getValue("canNotDelDefault"));
		}
//		for(var i=0;i<rows.length;i++){
//			var row=rows[i];
//			if(ids!=""){
//				ids+=",";
//			}
//			ids+=row.uuid;
//		}
		$.ajax({ 
			url: "domainGrpManager!delGrp.action",
			data:{domainUuid:domainUuid,uuid:ids},
			complete: function(data,str){
			window.list.delRefresh(id,rows)
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
		}});		
	}
	function setGrp(pid,id,row){
		var domainUuid=window.global.getDomainUuid();
		var userAjax=$.ajax({ 
			url: "userGrpManager!getList.action",
			data:{domainUuid:domainUuid,grpUuid:row.uuid}
		});
		var priAjax=$.ajax({ 
			url: "privilegeNewManager!getList02.action",
			data:{domainUuid:domainUuid,grpUuid:row.uuid}
		});
	　　$.when(userAjax, priAjax).done(function(a1,a2){
   　　　　 var userList=[],priList=[];
   　　　　 if(a1[0].userList){
   　　　　 	userList=a1[0].userList;
   　　　　 }
   　　　　 if(a2[0].priList){
   　　　　 	priList=a2[0].priList;
   　　　　 }
   　　　　 addSetGrp(pid,id,userList,priList,row);
　　　　});
	}
	function addGrp(pid,id){
		
		var domainUuid=window.global.getDomainUuid();
		var userAjax=$.ajax({ 
			url: "userGrpManager!getList.action",
			data:{domainUuid:domainUuid}
		});
		var priAjax=$.ajax({ 
			url: "privilegeNewManager!getList02.action",
			data:{domainUuid:domainUuid}
		});
	　　$.when(userAjax, priAjax).done(function(a1,a2){
   　　　　 var userList=[],priList=[];
   　　　　 if(a1[0].userList){
   　　　　 	userList=a1[0].userList;
   　　　　 }
   　　　　 if(a2[0].priList){
   　　　　 	priList=a2[0].priList;
   　　　　 }
   　　　　 addSetGrp(pid,id,userList,priList);
　　　　});
	}
	function addSetGrp(pid,id,userList,priList,row){
		lan.initEvent();
	    var c = lan.getCookie("userLan");
	
	    var name="";
	    if(c==1){
	    	
	    }else{
	    	for(var i=0;i<priList.length;i++){
	    		priList[i].name=priList[i].nameEn;
	    	}
	    }
	    
		var pn=$("#myModal");
		if(!pn) return;
 	    var tempFn = window.dot.template(select);
	    var userh = tempFn({multiple:true,name:"userIdl",label:window.lc.getValue("plSelUser"),list:userList,help:""});
	    var operateh = tempFn({multiple:true,name:"operateIdl",label:window.lc.getValue("plSelPri"),list:priList,help:""});
		var body=''		
	      +'<div class="row">'
	      +'<div class="col-md-12" >'
	      +'<form class="" name="param" role="form">'
	      +field.getTextField("name","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("name"))
	      +field.getTextareaField("detailDesc","",window.lc.getValue("desc"))
	      +userh
	      +operateh
	      +'</form>'
	      +'</div>'			  
	      +'</div>';
		var obj={
			title:window.lc.getValue("addRole"),
			body:body,
			close:window.lc.getValue("close"),
			commit:true,
			commitLan:window.lc.getValue("commit"),
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);
		
		pn.html(html);
		var pa={domainUuid:window.global.getDomainUuid()};
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		if(row){
			$("#myModal form").autofill(row);
			$('#myModal input[name=name]').val(row.nameCn);
			$('#myModal input[name=name]').attr("disabled","disabled");
		}else{
			$('#myModal input[name=name]').removeAttr("disabled");
		}
		var dualListObj={
		  filterTextClear:window.lc.getValue('filterTextClear'),
		  filterPlaceHolder:window.lc.getValue('filterPlaceHolder'),
		  infoTextEmpty:window.lc.getValue('infoTextEmpty'),
		  infoText:window.lc.getValue('infoText'),
		  infoTextFiltered:window.lc.getValue('infoTextFiltered'),
		  removeAllLabel:window.lc.getValue('removeAllLabel'),
		  removeSelectedLabel:window.lc.getValue('removeSelectedLabel'),
		  moveSelectedLabel:window.lc.getValue('moveSelectedLabel'),
		  moveAllLabel:window.lc.getValue('moveAllLabel')
		};
		$('#myModal select[name="userIdl"]').bootstrapDualListbox(dualListObj);
		$('#myModal select[name="operateIdl"]').bootstrapDualListbox(dualListObj);
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var name=$("#myModal input[name=name]").val();
			if(!name){
				window.tip.show_pk("warning",null,window.lc.getValue("nameCanNotEmpty"));
				$('#myModal input[name=name]').trigger("focus");
				return;
			}
			if(row){
				doSetGrp(pid,id,row);
			}else{
				doAddGrp(pid,id);
			}			
		});
	}
	
	function doAddGrp(pid,id){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;
		$.ajax({ 
			url: "domainGrpManager!addGrp.action",
			data:params,
			complete: function(data,str){
			$('#'+id).bootstrapTable("refresh");
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("addSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("addFail"));
			}
		}});
	}
	function doSetGrp(pid,id,row){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;
		params+="&uuid="+row.uuid;
		$.ajax({ 
			url: "domainGrpManager!setGrp.action",
			data:params,
			complete: function(data,str){
			$('#'+id).bootstrapTable("refresh");
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
			}
		}});
	}
  return{
	  del:delGrp,
	  set:setGrp,
	  add:addGrp
  }
})