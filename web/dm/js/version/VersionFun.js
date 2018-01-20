define(["form-field",'text!html/field/select.html'],function(fileld,select){
	 /*var view=function (e, value, row, index) {
		 createViewHtml(row);  
};
    window.operateEvents6 = {
        'click a[action=view]':view,
        
    };
   
    function createViewHtml(row){
    	createModalHtml();
		if(row.seeStatus==0){
			document.getElementsByName("adminStatus")[0].checked="checked";
			}else if(row.seeStatus==1){
				document.getElementsByName("adminStatus")[1].checked="checked";
			}
		
		$('#myModal button[name=commit]').bind("click",function(){
			var params={};
			params.seeStatus=$('#myModal input[name=adminStatus]:checked').val();
			params.packageVer=window.packageVer;
			params.domainUuid=row.uuid;
		    $.ajax({
		    	url:"importVersion!updateVersionBlackAndWhileList.action",
		    	type:'post',
		        data:params,
		        complete:function(data){
		    	if(eval("(" + data.responseText+ ")").success){
		    		$('#myModal button[name=close]').trigger("click");
		    		$('#version_mes button[name=refresh]').click();
					//$('#version_mes').bootstrapTable("refresh");
					
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
		    	}else{
		    		window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
		    	}
		    }
		    })
			 
		});
    	
    }*/
    function createModalHtml(){
    	var tempFn = window.dot.template(select);
	    var selh = tempFn({multiple:true,placeholder:window.lc.getValue("notSel"),multiCls:true,name:"alarmIdl",label:window.lc.getValue("plSelDomain")
	    	,list:window.domainList,help:window.lc.getValue("domainHelp")});
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
		      +'<div class="col-md-12" id="domainSelect" >'
		        +selh
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
		 window.global.doMultiSelect('domainSelect');
    }
	function expVersion(rows,id){
		var uuids=rows[0].uuid;
		$.ajax({
			url:'exportVersion.action?uuids='+uuids,
			type:'post',
			complete: function(data,str){
			//var obj=data.responseJSON;
			if(data.responseJSON.success){
				if(data.responseJSON.fileName=='404'){
				window.tip.show_pk("warning",null,window.lc.getValue("expFaile"));
				}else {
					window.location.href=data.responseJSON.fileName;
				}
			}else {
				window.tip.show_pk("warning",null,window.lc.getValue("expFaile"));
			}
		}
		
		});
		
	}
	function synVersion(rows){
		$.ajax({
			url:'versionList!synchroVersion.action',
			type:'post',
			complete: function(data,str){
			if(data.responseJSON.success){
				
				//window.tip.show_pk("success",null,window.lc.getValue("submitSuccess"));
				$('#myModalLabel3').show();
				$('#myModalLabel2').hide();
				$('#myModalLabel1').hide();
				$('button[name=close]').show();
				$('.modal-footer button[name=close]').hide();
				$('.modal-content').height(118);
		    	$('.progress').hide();
		    	$('button[name=commit1]').show();
		    	 $('#myModal button[name=commit1]').bind("click",function(){
		 	    	$('#myModal button[name=close]').trigger("click");
		    	 })
				$('#version_list button[name=refresh]').click();
		    	 
				
			}else{
				//window.tip.show_pk("warning",null,window.lc.getValue("submitFail"));
				$('#myModalLabel4').show();
				$('#myModalLabel2').hide();
				$('#myModalLabel1').hide();
				$('button[name=close]').show();
				$('.modal-footer button[name=close]').hide();
				$('.modal-content').height(118);
		    	$('.progress').hide();
		    	$('button[name=commit1]').show();
		    	 $('#myModal button[name=commit1]').bind("click",function(){
		 	    	$('#myModal button[name=close]').trigger("click");
		    	 })
				$('#version_list button[name=refresh]').click();
			}
		}
	})
	}
	function creatVersionHtml(row,pid){
		var pn=$("#"+pid);
	    pn.html(""); 
	    var html='<ul id="myTab" class="nav nav-tabs">'
	        +'<li role="presentation" ><a href="#version_mes"><i class="fa fa-user"></i>&nbsp;'+window.lan["versionMessage"]+'</a></li>'     
	       
	        +'</ul>'
	        +'<div  class="tab-content">'
	        +'<div class="tab-pane fade in "  id="version_mes" ></div>'
	        +'</div>';
	      pn.append(html);  
	      pn=$("#main_search");
	      pn.html("");

	      //清空分类位置html代码
	      pn=$(".m-nav");
	      pn.html("");
	      createList("version_mes",row);
	      window.global.procTab();
		
	}
	function createList(pid,row){
		var pn=$("#"+pid);
		if(!pn) return;
		$.ajax({
			url:'versionManager!getVersion.action',
			type:'post',
			data:{uuid:row.uuid},
			 complete:function(data){	
				if(data.responseJSON.versionList&&data.responseJSON.success){
					var versionList=data.responseJSON.versionList;
					creatversionList(versionList,pid,row);
				}
			}
			
		});
		
	        
	}
	
	function creatversionList(versionList,pid,row){
		var pn=$("#"+pid);
		var format=window.format;
		var id=pid+"_form";
		window.packageVer=row.packageVer;
		var html='<form id="'+id+'" class="my-tab" role="form">'
		  html+='<div class="btn-group">'
			  +'<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
			  +'<button type="button" id='+id+'_submit name="submit" class="btn btn-muted btn-sm tooltip-success" ><i class="fa fa-save bigger-130"></i>&nbsp;'+window.lc.getValue("submit")+'</button>'
			   +'<button type="button"  name="edit" class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-edit bigger-130"></i>&nbsp;'+window.lc.getValue("edit")+'</button>'
			   +'<button type="button" style="display:none;" name="backOut" class="btn btn-info btn-sm tooltip-error"><i class="fa fa-repeat bigger-130"></i>&nbsp;'+window.lc.getValue("backOut")+'</button>'
			   +'<button type="button"  name="refersh" class="btn btn-info btn-sm tooltip-error"><i class="fa fa-refresh bigger-130"></i>&nbsp;'+window.lc.getValue("refresh")+'</button>'
			 if(window.sysMode==10||window.sysMode==11){
			       if(row.productId!=61||row.productId!=62){
			   html+='<button type="button"  name="editDomain" class="btn btn-info btn-sm tooltip-error"><i class="fa fa-plus bigger-130"></i>&nbsp;'+window.lc.getValue("versionBlackAndwhileList")+'</button>'
			       }
			}
	      html+='</div>'
	    	  html+='<div class="container-fluid" style="margin-top: 10px;">'
	    	  html+='<div class="row">'
	    		  html+=field.getDisplayTextField("version",versionList[0].packageVer,window.lc.getValue("version"))
	    		  html+=field.getDisplayTextField("alias",versionList[0].alias,window.lc.getValue("alias"))
	    		  html+=field.getDisplayTextField("relyVer",versionList[0].relyVer,window.lc.getValue("relyVer"))
	    		  html+=field.getDiaplaySelectfiled("status",versionList[0].status,window.lc.getValue("status"))
	    		  if(versionList[0].vendorId==1){
	    		  html+=field.getDisplayTextField("producers","UCSPEED",window.lc.getValue("producers"))
	    		  }else if(versionList[0].vendorId==2){
	    			  html+=field.getDisplayTextField("producers","DINSTAR",window.lc.getValue("producers"))  
	    		  }else if(versionList[0].vendorId==66){
	    			  html+=field.getDisplayTextField("producers",window.lc.getValue("unifiedCommunications"),window.lc.getValue("producers"))  
	    		  }
	    		  html+=field.getDisplayTextField("productId",versionList[0].productId,window.lc.getValue("productId"))
	    		  html+=field.getDisplayTextField("createTime",window.format.timeStaticFormat(versionList[0].createTime),window.lc.getValue("createTime"))
	    		  html+=field.getDisplayTextareaField("detailedDescription",versionList[0].detailDesc,window.lc.getValue("detailedDescription"))
	    	  html+='</div>'
	    	  html+='</div>'
	      html+='</from>'
	      pn.html("");
	      pn.append(html);
	       
	      if(versionList[0].status==0){
				
				 $("#sureSelectToDisable option[value='"+versionList[0].status+"']").attr("selected","selected");
				}else if(versionList[0].status==1){
					 $("#sureSelectToDisable option[value='"+versionList[0].status+"']").attr("selected","selected");
				}
			
	        document.getElementById("version_mes_form_submit").disabled=true;
	        var ulItem = document.getElementById("version-sel");
			ulItem.onclick = function(e){
			e = e || window.event;//这一行及下一行是为兼容IE8及以下版本
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase() === "li"){
				$("#service_version").click();
				window.global.procTab();
			window.productIdNum=target.value;
			}
			}
	        
	        $('#version_mes_form button[name=edit]').click(function(){
	        	 document.getElementById("version_mes_form_submit").disabled=false;
	        	 document.getElementById("sureSelectToDisable").disabled=false;
	        	 document.getElementById("sureTextareaToDisabled").disabled=false;
	        	$("#version_mes_form_submit").removeClass("btn-muted").addClass("btn-info");
	        	$('#version_mes_form button[name=edit]').hide();
	        	$('#version_mes_form button[name=backOut]').show();
	        	$('.container-fluid').show();
	        });
	        $('#version_mes_form button[name=back]').click(function(){
	    	      require(["ver-list"], function (ver) {
    	  	    	 ver.createList(pid,-1);
    	  	      });
	        });
	        $('#version_mes_form button[name=backOut]').click(function(){
	        	createList(pid,row);
	        });
	        $('#version_mes_form button[name=refersh]').click(function(){
	        	createList(pid,row);
	        });
	        $('#version_mes_form button[name=back]').click(function(){
	        	window.productIdNum;
	        	$("#service_version").click();
	        	window.global.procTab();
	        });
	        //提交按钮操作
	        $('#version_mes_form button[name=submit]').click(function(){
	        	var params={};
	        	
	        	params.status=$('#sureSelectToDisable option:selected') .val();
	        	params.detailDesc=$("textarea[name=detailedDescription]").val();
	        	params.uuid=versionList[0].uuid;
	        	$.ajax({
	        		url:'versionManager!updateVersion.action',
	        		type:'post',
	        		data:params,
	        		 complete:function(data){	
	        		if(data.responseJSON.success){
	        		window.tip.show_pk("success",null,window.lc.getValue("submitSuccess"));
	        		createList(pid,row);
	        		}else{
	        		window.tip.show_pk("warning",null,window.lc.getValue("submitFail"));
	        		}
	        	}
	        	});
	        });
	        //黑白名单操作
	        $('#version_mes_form button[name=editDomain]').click(function(){
	        pn=$("#"+pid);
	        if(!pn){
	         return;
	        }
	      var id=pid+"_list"
	      var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'    
	          html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
	         html+='<button type="button"  name="set" class="btn btn-sm btn-success" title="'+window.lc.getValue("set")+'"><i class="fa fa-pencil"></i>'+window.lc.getValue("set")+'</button>';
	        //  html+='<button type="button"  name="allSet" class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-edit bigger-130"></i>&nbsp;'+window.lc.getValue("selectAllSet")+'</button>'
	          html+='</div>'
	    	  html+='<table id='+id+'></table>';
	    	  pn.html("");
	    	  pn.append(html);
	    		  $('#'+id).bootstrapTable({
	    				method: 'get',
	    				url: "importVersion!getVersionBlackAndWhileList.action",
	    				cache: false,
//	    				height: 500,
	    				responseHandler:function(res){				
	    					if(res && res.domainPackageVer){
	    						var obj={};
	    						obj["rows"]=res.domainPackageVer;
	    						obj.total=res["total"];
	    						return obj;
	    					}
	    					return res;
	    				},
	    				queryParams:function(p){
	    					var params="";
	    					//productId=window.global.getProductId();
	    					
	    					params+="&packageVer="+row.packageVer;
	    					
	    					params+="&limit="+p.limit;
	    					params+="&start="+p.offset;
	    					if(p.search){
	    					params+="&search="+p.search;
	    					
	    					}
	    					return params;
	    				},
	    				striped: true,
	    				toolbar:"#"+id+"-toolbar",
	    				pagination: true,
	    				pageSize: 15,
//	    				pageNumber:1,
	    				sidePagination: "server",
//	    				pageList: [10,25],
	    				search: true,
	    				showColumns: true,
	    				showRefresh: true,
	    				queryParamsType:'limit',
	    				sidePagination: "server",
	    				showToggle:true,
	    				smartDisplay:true,
	    				minimumCountColumns: 2,
	    				clickToSelect: true,
	    				columns: [{
	    					field: 'uuid',
	    					title: 'uuid',
	    					align: 'left',
	    					valign: 'middle',				
	    					visible:false
	    				},{
	    					field: 'packageVer',
	    					title: 'packageVer',
	    					align: 'left',
	    					valign: 'middle',				
	    					visible:false
	    				},{
	    					field: 'name',
	    					title: window.lc.getValue("name"),
	    					align: 'middle',
	    					valign: 'middle',				
	    					
	    				},{
	    					field: 'seeStatus',
	    					title: window.lc.getValue("status"),
	    					align: 'middle',
	    					valign: 'middle',				
	    					formatter:function(value,row,index){
	    					     
	    					    	 return window.lc.getValue('visible'); 
	    					     
	    					}
	    			}]
	    	      });
	    		  $('#'+id).on('post-body.bs.table', function () {
	    				$('#'+id+' [data-rel=tooltip]').tooltip();
	    			})
	    			 $("#version_mes  button[name=refresh]").addClass("btn-info btn-sm");
	    			 $("#version_mes button[name=toggle]").addClass("btn-info btn-sm");
	    			 $("#version_mes button[data-toggle=dropdown]").addClass("btn-info btn-sm");
	    			 $("#version_mes input[class=form-control]").addClass("input-sm");
	    			 $("#version_mes button[name=back]").click(function(){
	    	    		 creatversionList(versionList,pid,row);
	    	    	 });
	    			 //全选批量操作
	    	  $("#version_mes button[name=allSet]").click(function(){
	    		   $('#version_mes_list input[name=btSelectAll]').trigger("click");
	    		     createModalHtml(); 
	    		 
	    	    	 $('#myModal button[name=commit]').bind("click",function(){
	    	    		 var ids='';
	    	    		 var params={};
	    	    		 for(var i=0;i<window.domainList.length;i++){
	    	    			 if(i==0){
	    	    				 ids=window.domainList[i].uuid;
	    	    			 }else{
	    	    				 ids=ids+'-'+window.domainList[i].uuid;
	    	    			 }
	    	    		 }
	    	 			params.seeStatus=$('#myModal input[name=adminStatus]:checked').val();
	    	 			params.packageVer=window.packageVer;
	    	 			params.ids=ids;
	    	 			window.tip.show_pk("info",10,window.lc.getValue("setWait"),true);
	    	 		    $.ajax({
	    	 		    	url:"importVersion!updateVersionBlackAndWhileList.action",
	    	 		    	type:'post',
	    	 		        data:params,
	    	 		        complete:function(data){
	    	 		    	if(eval("(" + data.responseText+ ")").success){
	    	 		    		$('#myModal button[name=close]').trigger("click");
	    	 		    		$('#version_mes button[name=refresh]').click();
	    	 					//$('#version_mes').bootstrapTable("refresh");
	    	 					
	    	 					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
	    	 		    	}else{
	    	 		    		window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
	    	 		    	}
	    	 		    }
	    	 		    });
	    	 		 });
	    	 	 });
	    	  //多选操作
              /* $("#version_mes button[name=set]").click(function(){
            	   
            	   var rows=$('#'+id).bootstrapTable('getSelections');
            	   if(rows.length==0){
            		   window.tip.show_pk("danger",null,window.lc.getValue("youNotSel")); 
            		   return;
            	   }
            	   createModalHtml();
            	   $('#myModal button[name=commit]').bind("click",function(){
	    	    		 var ids='';
	    	    		 var params={};
	    	    		  for(var i=0;i<rows.length;i++){
	               		   if(i==0){
	     	    				 ids=rows[i].uuid;
	     	    			 }else{
	     	    				 ids=ids+'-'+rows[i].uuid;
	     	    			 }
	               		   
	               	   }
	    	 			params.seeStatus=$('#myModal input[name=adminStatus]:checked').val();
	    	 			params.packageVer=window.packageVer;
	    	 			params.ids=ids;
	    	 		    $.ajax({
	    	 		    	url:"importVersion!updateVersionBlackAndWhileList.action",
	    	 		    	type:'post',
	    	 		        data:params,
	    	 		        complete:function(data){
	    	 		    	if(eval("(" + data.responseText+ ")").success){
	    	 		    		$('#myModal button[name=close]').trigger("click");
	    	 		    		$('#version_mes button[name=refresh]').click();
	    	 					//$('#version_mes').bootstrapTable("refresh");
	    	 					
	    	 					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
	    	 		    	}else{
	    	 		    		window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
	    	 		    	}
	    	 		    }
	    	 		    });
	    	 		 });
            	 
	    		
                });*/
	    	  $("#version_mes button[name=set]").click(function(){
	    		  createModalHtml();
	    		  var params={};
	    		  
	    		$('#myModal button[name=commit]').bind("click",function(){ 
	    			
	    		  var domainValue=$('#domainSelect select').val();
	    		  if(!domainValue){
	    				window.tip.show_pk("danger",null,window.lc.getValue("plSelDomain_1"));
	    				return;
	    		  }
	    		  params+="&domainValue="+domainValue;
	  	    	params+="&seeStatus=1";
	  	    	params+="&packageVer="+row.packageVer;
	    		 
	    		  $.ajax({
  	 		    	url:"importVersion!updateDomainPackageVer.action",
  	 		    	type:'post',
  	 		        data:params,
  	 		        complete:function(data){
	    			  if(eval("(" + data.responseText+ ")").success){
  	 		    		$('#myModal button[name=close]').trigger("click");
  	 		    		$('#version_mes button[name=refresh]').click();
  	 					//$('#version_mes').bootstrapTable("refresh");
  	 					
  	 					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
  	 		    	}else{
  	 		    		window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
  	 		    	}
	    			  
	    			  
	    		    }
	    		  });
	    		  
	    		});
	    		  
	    	   }) ;
	    })
	    	 
	    	  
	       
	        
	}
	function delVersion(row,rows,id){
		var firstFlag=true;
		var versions="";
		var names=new Array();
		//判断要删除的版本是否有其他版本依赖他
		for(var i=0;i<row.length;i++){
			 for(var j=0;j<rows.length;j++){
				 if(rows[j].relyVer==row[i].packageVer){
						if(names.length==3){
							names.push("</br>... ...");
						}else if(names.length==0){
							names.push(row[i].packageVer);
						}else if(names.length<3){
							names.push("</br>"+row[i].packageVer);
						}
						break;
					}
				 
				 
			 }
			
			if(firstFlag){
				versions=row[i].uuid+"-"+row[i].packageName+"-"+row[i].productId;
				firstFlag=false;
			}else{
				versions=versions+","+row[i].uuid+"-"+row[i].packageName+"-"+row[i].productId;
				
			}
		}
		if(names.length>0){
			window.tip.show_pk("warning",null,window.lc.getValue("relyVerVersionFaile"));
			return;
		}
		
		var params={};
		params.versions=versions;
		$.ajax({
			url:'versionManager!deleteVersion.action',
			type:'post',
			data:params,
			 complete:function(data){
			if(data.responseJSON.success){
				window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
				$('#version_list button[name=refresh]').click();
			}else {
				window.tip.show_pk("warning",null,window.lc.getValue("delFail"));	
			}
		}
			
		});
	}
	function upDownVersion(){
		
		
	}
	return {
		expVersion:expVersion,
		synVersion:synVersion,
		creatVersionHtml:creatVersionHtml,
		createList:createList,
		creatversionList:creatversionList,
		delVersion:delVersion,
		upDownVersion:upDownVersion,
		//createViewHtml:createViewHtml,
		createModalHtml :createModalHtml,
	}
})