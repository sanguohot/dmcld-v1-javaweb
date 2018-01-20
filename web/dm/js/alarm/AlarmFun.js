/**
 * Created by Rainc on 2015/3/22.
 */
define(['text!html/modal.html','text!html/field/select.html'
        ,'text!html/field/radio.html','text!html/field/ModalWizard.html'
        ,'text!html/alarm/AlarmDetailRow.html','alarm-validate'
        ,'text!html/field/text.html'],function(modal,select,radio,wizard,detail,validate,text){
	function delGrp(pid,id,rows){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var ids="";
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(ids!=""){
				ids+=",";
			}
			ids+=row.uuid;
		}
		$.ajax({ 
			url: "alarmGrpManager!deleteGrp.action",
			data:{domainUuid:domainUuid,ids:ids},
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
		$.ajax({ 
			url: "alarmManManager!getList.action",
			data:{domainUuid:domainUuid,grpUuid:row.uuid},
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.manList){				
				addSetGrp(pid,id,data.responseJSON.manList,row);
			}else{
				window.tip.show_pk("danger",null,"获取联系人列表失败");
			}
		}});		
	}
	function addGrp(pid,id){
		var domainUuid=window.global.getDomainUuid();
		$.ajax({ 
			url: "alarmManManager!getList.action",
			data:{domainUuid:domainUuid},
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.manList){				
				addSetGrp(pid,id,data.responseJSON.manList);
			}else{
				window.tip.show_pk("danger",null,"获取联系人列表失败");
			}
		}});		
	}
	function addSetGrp(pid,id,list,row){
		var pn=$("#myModal");
		if(!pn) return;
 	    var tempFn = window.dot.template(select);
	    var selh = tempFn({multiple:true,name:"manIdl",label:window.lc.getValue("plSelAlarmMan"),list:list,help:window.lc.getValue("alarmGrpHelp",0)});
		var body=''		
	      +'<div class="row">'
	      +'<div class="col-md-12" >'
	      +'<form class="" name="param" role="form">'
	      +field.getTextField("name","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("name"))
	      +tempFn({multiple:false,name:"manUuid",label:window.lc.getValue("plSelAlarmManResp"),list:list
	    	  ,emptyOption:true,placeholder:window.lc.getValue('notSel'),help:window.lc.getValue("alarmGrpHelp",1)})
	      +field.getTextareaField("detailDesc","",window.lc.getValue("desc"))
	      +selh
	      +'</form>'
	      +'</div>'			  
	      +'</div>';
		var obj={
			title:window.lc.getValue("alarmGrp"),
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
			$('#myModal input[name=name]').attr("disabled","disabled");
		}else{
			$('#myModal input[name=name]').removeAttr("disabled");
		}
		$('#myModal select[name=manUuid]').chosen({width:'100%',allow_single_deselect:true});
		var addMan = $('#myModal select[name="manIdl"]').bootstrapDualListbox({
			  filterTextClear:window.lc.getValue('filterTextClear'),
			  filterPlaceHolder:window.lc.getValue('filterPlaceHolder'),
			  infoTextEmpty:window.lc.getValue('infoTextEmpty'),
			  infoText:window.lc.getValue('infoText'),
			  infoTextFiltered:window.lc.getValue('infoTextFiltered'),
			  removeAllLabel:window.lc.getValue('removeAllLabel'),
			  removeSelectedLabel:window.lc.getValue('removeSelectedLabel'),
			  moveSelectedLabel:window.lc.getValue('moveSelectedLabel'),
			  moveAllLabel:window.lc.getValue('moveAllLabel')
			});
		$('#myModal button[name=commit]').bind("click",function(){
			console.log($('#myModal select[name=manUuid] option:selected').text())
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
		params+="&manName="+$('#myModal select[name=manUuid] option:selected').text();
		$.ajax({ 
			url: "alarmGrpManager!addGrp.action",
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
		params+="&manName="+$('#myModal select[name=manUuid] option:selected').text();
		$.ajax({ 
			url: "alarmGrpManager!updateGrp.action",
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
	function delMan(pid,id,rows){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var ids="";
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(ids!=""){
				ids+=",";
			}
			ids+=row.uuid;
		}
		$.ajax({ 
			url: "alarmManManager!deleteMan.action",
			data:{domainUuid:domainUuid,ids:ids},
			complete: function(data,str){
			window.list.delRefresh(id,rows)
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
		}});		
	}
	function setMan(pid,id,row){
		addSetMan(pid,id,row);
	}
	function addToGrp(pid,id,rows){
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var domainUuid=window.global.getDomainUuid();
		$.ajax({ 
			url: "alarmGrpManager!getList.action",
			data:{domainUuid:domainUuid},
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.grpList){				
				showAddToGrp(pid,id,data.responseJSON.grpList,rows);
			}else{
				window.tip.show_pk("danger",null,"获取联系组列表失败");
			}
		}});
	}
	function showAddToGrp(pid,id,list,rows){
		var pn=$("#myModal");
		if(!pn) return;
 	    var tempFn = window.dot.template(select);
	    var selh = tempFn({multiple:false,name:"grpIdl",label:window.lc.getValue("alarmGrp"),list:list});
		var body=''		
	      +'<div class="row">'
	      +'<div class="col-md-12" >'
	      +'<form class="" name="param" role="form">'
	      +selh
	      +'</form>'
	      +'</div>'			  
	      +'</div>';
		var obj={
			title:window.lc.getValue("alarmGrp"),
			body:body,
			close:window.lc.getValue("close"),
			commit:true,
			commitLan:window.lc.getValue("commit"),
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);		
		pn.html(html);
		$('#myModal select[name=grpIdl]').chosen({width:'85%',allow_single_deselect:true});
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			doAddToGrp(pid,id,rows);
		});
	}
	function doAddToGrp(pid,id,rows){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var ids="";
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(ids!=""){
				ids+=",";
			}
			ids+=row.uuid;
		}
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;
		params+="&manIds="+ids;
		$.ajax({ 
			url: "alarmManManager!addToGrp.action",
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
	function updateRule(pid,id,rows){
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		addRule(pid,id,rows);
	}
	function delRule(pid,id,rows){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var ids="";
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(ids!=""){
				ids+=",";
			}
			ids+=row.uuid;
		}
		$.ajax({ 
			url: "alarmPushRuleManager!deleteRule.action",
			data:{domainUuid:domainUuid,ids:ids},
			complete: function(data,str){
			window.list.delRefresh(id,rows)
			if(data.responseJSON && data.responseJSON.success){				
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
			}
		}});		
	}
	function addRule(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		var tempFn = window.dot.template(radio);
	    var rf = rows?"":tempFn({inline:true,name:"ruleType",label:window.lc.getValue("ruleType")
	    	,list:[{uuid:1,name:window.lc.getValue("alarmLevel")},{uuid:3,name:window.lc.getValue("alarmDesc")}
	    	,{uuid:5,name:window.lc.getValue("devType")}]});
	    var pf = tempFn({inline:true,name:"pushType",label:window.lc.getValue("pushType"),list:[{uuid:1,name:window.lc.getValue("alarmMan")},{uuid:2,name:window.lc.getValue("alarmGrp")}]});
		var body=''		
	      +'<div class="row">'
	      +'<div class="col-md-12" >'
	      +'<form class="" name="param" role="form">'
	      +rf
	      +'<div id="rule-type"></div>'
	      +pf
	      +'<div id="push-type"></div>'	      
	      +'</form>'
	      +'</div>'			  
	      +'</div>';
		var obj={
			title:rows?window.lc.getValue("set"):window.lc.getValue("add"),
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
		$('#myModal input[name=ruleType]').bind("click",function(){
			var val=$(this).val();
			if(val==1){
		 	    var tempFn = window.dot.template(select);
			    var html = tempFn({multiple:true,placeholder:window.lc.getValue("notSel"),multiCls:true,name:"alarmLevell",label:window.lc.getValue("alarmLevel")
			    	,list:window.global.getAlarmLevelList(),help:window.lc.getValue("ruleTypeHelp")});
			    $('#rule-type').html(html);
			    window.global.doMultiSelect('rule-type');			    
			}else if(val==3){
			    $.ajax({ 
					url: "alarmAttrManager!getList.action",
					data:pa,
					complete: function(data,str){
					if(data.responseJSON && data.responseJSON.alarmAttrList){
						var en=window.lc.isEn();
						for(var i=0;i<data.responseJSON.alarmAttrList.length;i++){
							var item=data.responseJSON.alarmAttrList[i];
							if(en){
								item.name=item.name+" &lt;"+item.alarmDesc+"&gt;";
							}else{
								item.name=item.name+" &lt;"+item.alarmDescCn+"&gt;";
							}
							console.log(item.name);
						}
				 	    var tempFn = window.dot.template(select);
					    var html = tempFn({multiple:true,placeholder:window.lc.getValue("notSel"),multiCls:true,name:"alarmIdl",label:window.lc.getValue("alarmDesc")
					    	,list:data.responseJSON.alarmAttrList,help:window.lc.getValue("ruleTypeHelp")});
					    $('#rule-type').html(html);
					    window.global.doMultiSelect('rule-type');					    
					}else{
						window.tip.show_pk("danger",null,"获取告警描述列表失败");
					}
				}});
			}else if(val==5){
		 	    var tempFn = window.dot.template(select);
			    var html = tempFn({multiple:true,placeholder:window.lc.getValue("notSel"),multiCls:true,name:"alarmIdl",label:window.lc.getValue("devType")
			    	,list:[{uuid:1,name:"MTG"},{uuid:2,name:"DAG"}],help:window.lc.getValue("ruleTypeHelp")});
			    $('#rule-type').html(html);
			    window.global.doMultiSelect('rule-type');			    
			}		    
		})
		$('#myModal input[name=pushType]').bind("click",function(){
			var val=$(this).val();
			if(val==1){
			    $.ajax({ 
					url: "alarmManManager!getList.action",
					data:pa,
					complete: function(data,str){
					if(data.responseJSON && data.responseJSON.manList){
				 	    var tempFn = window.dot.template(select);
					    var html = tempFn({multiple:false,multiCls:false,name:"pushUuid",label:window.lc.getValue("pushObject"),list:data.responseJSON.manList});
					    $('#push-type').html(html);
					    window.global.doMultiSelect('push-type');
					    if(rows && rows.length==1){
					    	$('#push-type select').multiselect('select',rows[0].pushUuid);
					    }
					}else{
						window.tip.show_pk("danger",null,"获取告警联系人列表失败");
					}
				}});
			}else if(val==2){
				$.ajax({ 
					url: "alarmGrpManager!getList.action",
					data:pa,
					complete: function(data,str){
					if(data.responseJSON && data.responseJSON.grpList){
				 	    var tempFn = window.dot.template(select);
					    var html = tempFn({multiple:false,multiCls:false,name:"pushUuid",label:window.lc.getValue("pushObject"),list:data.responseJSON.grpList});
					    $('#push-type').html(html);
					    window.global.doMultiSelect('push-type');
					    if(rows && rows.length==1){
					    	$('#push-type select').multiselect('select',rows[0].pushUuid);
					    }
					}else{
						window.tip.show_pk("danger",null,"获取告警联系组列表失败");
					}
				}});
			}		    
		})
		$("#myModal input[name=ruleType][value=1]").trigger("click");
		if(rows && rows.length==1 && (rows[0].pushType==1 || rows[0].pushType==2)){
			$("#myModal input[name=pushType][value="+rows[0].pushType+"]").trigger("click");
		}else{
			$("#myModal input[name=pushType][value=1]").trigger("click");
		}		
		
		$('#myModal button[name=commit]').bind("click",function(){
			if(rows){
				doUpdateRule(pid,id,rows);
			}else{
				doAddRule(pid,id);
			}
						
		});
	}
	function doAddRule(pid,id){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;              
		$.ajax({ 
			url: "alarmPushRuleManager!addRule.action",
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
	function doUpdateRule(pid,id,rows){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;
		var ids="";
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(ids){
				ids+=",";
			}
			ids+=row.uuid;
		}
		params+="&ids="+ids;
		$.ajax({ 
			url: "alarmPushRuleManager!updateRule.action",
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
	function addMan(pid,id){
		addSetMan(pid,id);
	}
	function addSetMan(pid,id,row){
		var pn=$("#myModal");
		if(!pn) return;
		var body=''		
	      +'<div class="row">'
	      +'<div class="col-md-12" >'
	      +'<form class="" name="param" role="form">'
	      +field.getTextField("name","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("name"))
	      +field.getTextField("email","",'<font color="red">*</font>&nbsp;'+window.lc.getValue("email"))
	      +field.getTextareaField("detailDesc","",window.lc.getValue("desc"))
	      +'</form>'
	      +'</div>'			  
	      +'</div>';
		var obj={
			title:window.lc.getValue("alarmMan"),
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
			$('#myModal input[name=name]').attr("disabled","disabled");
		}else{
			$('#myModal input[name=name]').removeAttr("disabled");
		}
		$('#myModal button[name=commit]').bind("click",function(){
			var form=$("#myModal form");
			var name=$("#myModal input[name=name]").val();
			if(!name){
				window.tip.show_pk("warning",null,window.lc.getValue("nameCanNotEmpty"));
				$('#myModal input[name=name]').trigger("focus");
				return;
			}
			var ev=$('#myModal input[name=email]').val();
			if(!ev){
				window.tip.show_pk("warning",null,window.lc.getValue("emailCanNotEmpty"));
				$('#myModal input[name=email]').trigger("focus");
				return;
			}
			if(!window.validate.isEmail(ev)){
				window.tip.show_pk("warning",null,window.lc.getValue("emailNotValid"));
				$('#myModal input[name=email]').trigger("focus");
				return;
			}
			if(row){
				doSetMan(pid,id,row);
			}else{
				doAddMan(pid,id);
			}
			
		});
	}
	
	function doAddMan(pid,id){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;              
		$.ajax({ 
			url: "alarmManManager!addMan.action",
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
	function doSetMan(pid,id,row){
		var domainUuid=window.global.getDomainUuid();		
		if(!domainUuid) return;
		var params=$('#myModal form[name=param]').formSerialize();
		params+="&domainUuid="+domainUuid;
		params+="&uuid="+row.uuid;
		$.ajax({ 
			url: "alarmManManager!updateMan.action",
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
  function createModConfirm(){
    var pn=$("#myModal");
    if(!pn) return;
    var html="<div class='modal-dialog'>" +
      "<div class='modal-content'><div class=\"modal-header\">" +
      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
      "<h4 class=\"modal-title\" id=\"myModalLabel\">确认删除该模板？</h4></div>" +
      "<div class=\"modal-body\"></form></div>" +
      "<div class=\"modal-footer\"><button name=\"close\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>" +
      "<button name=\"commit\" type=\"button\" class=\"btn btn-primary\">确认</button></div></div><!-- /.modal-content --></div>"
    pn.html("");
    pn.append(html);
  }
  
	function viewAlarm(){
	  var search=window.location.search;
	  var alarmUuid=0;
	  var index=search.indexOf("alarmUuid=");
	  if(index>=0){
		  alarmUuid=search.substring(index+"alarmUuid=".length);
		  if(alarmUuid.indexOf("&")>0){
			  alarmUuid=alarmUuid.substring(0,alarmUuid.indexOf("&"));
		  }
	  }
	if(!alarmUuid){
		  return;
	}
	
	  $.ajax({ 
			url: "alarmManager!getAlarm.action",
			data:{alarmUuid:alarmUuid},
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.alm){				
				doViewAlarm(data.responseJSON.alm);
			}else{
				window.tip.show_pk("danger",null,"获取告警详细信息失败");
			}			
	  	}
	  })
	}
  	function doViewAlarm(alarm){
  		var pn=$("#myModal");
		if(!pn) return;
		var tempFn = window.dot.template(detail);
		var reportTime=alarm.reportTime?window.format.timeStaticFormat(alarm.reportTime):"-";
		var cleanTime=alarm.cleanTime?window.format.timeStaticFormat(alarm.cleanTime):"-";
		var alarmDesc=window.lc.isEn()?alarm.alarmDesc:alarm.alarmDescCn;
        if(alarm.alarmLevel==0){
      	  cls="label label-danger";
        }else if(alarm.alarmLevel==1 || alarm.alarmLevel==2 || alarm.alarmLevel==3 || alarm.alarmLevel==4){
      	  cls="label label-warning";
        }else{
      	  cls="label label-info";
        }
        var alarmLevel='<span class="'+cls+'">'+window.lc.getValue("alarmLevel",alarm.alarmLevel)+'</span>';
		
		var lan={alarmId:window.lc.getValue("alarmId"),alarmName:window.lc.getValue("alarmName")
				,cleanTime:window.lc.getValue("cleanTime"),reportTime:window.lc.getValue("reportTime")
				,objectDesc:window.lc.getValue("objectDesc"),alarmDesc:window.lc.getValue("alarmDesc")
				,alarmLevel:window.lc.getValue("alarmLevel")}
		var html = tempFn({lan:lan,alarmId:alarm.alarmId,alarmName:alarm.alarmName
			,cleanTime:cleanTime,reportTime:reportTime,objectBrief:alarm.objectBrief,alarmDesc:alarmDesc
			,alarmLevel:alarmLevel});
		var body=''+html;		
		var obj={
			title:"告警详细",
			body:body,
			close:window.lc.getValue("close"),
			commit:false
		};
		var tempFn = window.dot.template(modal);
		var html = tempFn(obj);
		
		pn.html(html);
		var pa={domainUuid:window.global.getDomainUuid()};
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});	
		$('#myModal button[name=close]').bind("click",function(){
			window.location="bootstrap.html";
		})
		$('#myModal button[class=close]').bind("click",function(){
			window.location="bootstrap.html";
		})
  	}
  	function setAlarmApi(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var ids=window.global.getIds(rows);
 	    var tempFn = window.dot.template(radio);
	    var mh = tempFn({label:window.lc.getValue("alarmApiSwitch"),name:"alarmApiSwitch",list:[{uuid:0,name:window.lc.getValue("close")},{uuid:1,name:window.lc.getValue("open")}]});
 	    var tempFn = window.dot.template(text);
 	    var alarmApiHost=tempFn({label:window.lc.getValue("alarmApiHost"),name:"alarmApiHost",value:'',help:""});
	    var alarmApiPort = tempFn({label:window.lc.getValue("alarmApiPort"),name:"alarmApiPort",value:'',help:""});
	    var alarmApiPath = tempFn({label:window.lc.getValue("alarmApiPath"),name:"alarmApiPath",value:'',help:""});
		var body="<form>"+mh+"<div name=content>"+alarmApiHost+alarmApiPort+alarmApiPath+"</div>"+"</form>";
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
		$('#myModal input[name=alarmApiSwitch]').bind("click",function(){
			var val=$(this).val();
			var content=form.find("div[name=content]");
			if(val==1){
				content.css("display","block");
			}else{
				content.css("display","none");
			}
		})
		var form=$("#myModal form");		
		if(rows.length==1){
			if(rows[0].alarmApiSwitch && rows[0].alarmApiSwitch==1){
				$("#myModal input[name=alarmApiSwitch][value=1]").trigger("click");
			}else{
				$("#myModal input[name=alarmApiSwitch][value=0]").trigger("click");
			}
			form.find("input[name=alarmApiHost]").val(rows[0].alarmApiHost);
			form.find("input[name=alarmApiPath]").val(rows[0].alarmApiPath);
			form.find("input[name=alarmApiPort]").val(rows[0].alarmApiPort);
		}
		$('#myModal button[name=commit]').bind("click",function(){
			if($('#myModal input[name=alarmApiSwitch]:checked').val()==1){
				validate.alarmApi();
				if(!form.valid()){
					return;
				}
			}

			var params=form.formSerialize();
			params+="&ids="+ids;
			params+="&domainUuid="+window.global.getDomainUuid();
			setDomainAjax(pid,id,"domainListManager!setAlarmApi.action",params);
		});
	}
  	function setCallRule(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var ids=window.global.getIds(rows);
 	    var tempFn = window.dot.template(radio);
	    var mh = tempFn({label:window.lc.getValue("callSwitch"),name:"callSwitch",list:[{uuid:0,name:window.lc.getValue("close")},{uuid:1,name:window.lc.getValue("open")}]});
 	    var tempFn = window.dot.template(text);
 	    var asrh=tempFn({label:window.lc.getValue("asrThreshold"),name:"asrThreshold",value:'',help:window.lc.getValue("asrThresholdHelp")});
	    var capsh = tempFn({label:window.lc.getValue("capsThreshold"),name:"capsThreshold",value:'',help:window.lc.getValue("capsThresholdHelp")});
		var body="<form>"+mh+"<div name=content>"+asrh+capsh+"</div>"+"</form>";
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
		$('#myModal input[name=callSwitch]').bind("click",function(){
			var val=$(this).val();
			var content=form.find("div[name=content]");
			if(val==1){
				content.css("display","block");
			}else{
				content.css("display","none");
			}
		})
		var form=$("#myModal form");		
		if(rows.length==1){
			if(rows[0].callSwitch && rows[0].callSwitch==1){
				$("#myModal input[name=callSwitch][value=1]").trigger("click");
			}else{
				$("#myModal input[name=callSwitch][value=0]").trigger("click");
			}
			form.find("input[name=asrThreshold]").val(rows[0].asrThreshold);
			form.find("input[name=capsThreshold]").val(rows[0].capsThreshold);
		}
		$('#myModal button[name=commit]').bind("click",function(){
			if($('#myModal input[name=callSwitch]:checked').val()==1){
				validate.domain();
				if(!form.valid()){
					return;
				}
			}

			var params=form.formSerialize();
			params+="&ids="+ids;
			params+="&domainUuid="+window.global.getDomainUuid();
			setDomainAjax(pid,id,"domainListManager!setCallRule.action",params);
		});
	}
  	function setTimeZone(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
		var ids=window.global.getIds(rows);
 	    var tempFn = window.dot.template(select);
 	    var selh = tempFn({name:"timeZone",label:window.lc.getValue("timeZone"),list:window.lc.getTimeZoneList()});
		var body="<form>"+selh+"</form>";
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
		if(rows.length==1){
			var timeZone=-480;
			if(rows[0].localTimeZone!=null && rows[0].localTimeZone!=undefined){
				timeZone=rows[0].localTimeZone;
			}
			form.find("select[name=timeZone]").val(timeZone);
		}
		$('#myModal button[name=commit]').bind("click",function(){
			validate.domain();
			if(!form.valid()){
				return;
			}
			var params=form.formSerialize();
			params+="&ids="+ids;
			params+="&domainUuid="+window.global.getDomainUuid();
			setDomainAjax(pid,id,"domainListManager!updateTimeZone.action",params);
		});
	}
  	function setDomainAjax(pid,id,url,params){
		  $.ajax({ 
				url: url,
				data:params,
				complete: function(data,str){
				$('#'+id).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}			
		  	}
		  })
  	}
  	function confirm(pid,id,rows){  		
  		var ids=window.global.getIds(rows);
  		var domainUuid=window.global.getDomainUuid();
  		
  		var pn=$("#myModal");
		if(!pn) return;
		if(!rows || !rows.length){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
 	    var tempFn = window.dot.template(radio);
 	    var pf = tempFn({inline:true,name:"confirmFlag",label:window.lc.getValue("confirmFlag")
 	    	,list:[{uuid:0,name:window.lc.getValue("confirmFlag",0)},{uuid:1,name:window.lc.getValue("confirmFlag",1)}]
 	    	,help:window.lc.getValue("confirmAlarmHelp")});
		var body="<form>"+pf+"</form>";
		var obj={
			title:window.lc.getValue("set"),
			body:body,
			close:window.lc.getValue("close"),
			commit:true,
			commitLan:window.lc.getValue("commit")
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);
		
		pn.html(html);
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		var form=$("#myModal form");		
		if(rows.length==1){
			form.find("input[name=confirmFlag][value="+rows[0].confirmFlag+"]").trigger("click");
		}
		$('#myModal button[name=commit]').bind("click",function(){
			validate.domain();
			if(!form.valid()){
				return;
			}
			var params=form.formSerialize();
			params+="&ids="+ids+"&domainUuid="+domainUuid;
			setDomainAjax(pid,id,"alarmManager!updateConfirmFlag.action",params);
		});
	}
  return{
    createModConfirm:createModConfirm,
    addMan:addMan,
    addToGrp:addToGrp,
    delMan:delMan,
    setMan:setMan,
    setGrp:setGrp,
    addGrp:addGrp,
    delGrp:delGrp,
    addRule:addRule,
    updateRule:updateRule,
    delRule:delRule,
    viewAlarm:viewAlarm,
    setCallRule:setCallRule,
    setTimeZone:setTimeZone,
    confirm:confirm,
    setAlarmApi:setAlarmApi
  }
})