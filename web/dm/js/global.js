define([],function (){
	function getStrSize(str,fontSize){
		var n=$("#strSize");
		var fs="14px";
		if(fontSize){
			fs=fontSize;
		}
		n.css("font-size",fs);
		n.html(str);
		var ret={height:$("#strSize").height(),width:$("#strSize").width()};
		n.html("");
		return ret;
	}
	function openChildWin(url){
		if(!url) return;
		//此处删除cookie避免错误访问设备
		$.cookie('devckie', null, { path: '/',expires:-1 });
		$.cookie('devckie', null, { path: '/goform',expires:-1});	
		console.log("cookie devckie:"+$.cookie("devckie"));
		windowHandle = window.open('', 'old_remote_name', 'width='+ (window.screen.availWidth-10)+',height='+(window.screen.availHeight-60)+ ',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
		try {
		 windowHandle.document.location.href = data.responseJSON.url;
		} catch (exc) {
		 windowHandle.close();
		 windowHandle = window.open('', 'old_remote_name', 'width='+ (window.screen.availWidth-10)+',height='+(window.screen.availHeight-60)+ ',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
		 windowHandle.document.location.href = url;
		}
		windowHandle.focus();
	}
	function getDomainUuid(){
		var node=$("#domain-sel");
		if(window.user.dstDomainUuid){
			return window.user.dstDomainUuid;
		}else if(window.user.domainUuid){
			return window.user.domainUuid;
		}else if(node && node.val()){
			return node.val();
		}else{
			return 0;
		}
	}
	function getProductId(){
		var node=$("#version-sel");
		if(node && node.val()){
			return node.val();
		}else{
			return -1;
		}
	}
	function getLoadHtml(){
		var html='<div style="padding-left:5px;" name="load">'
		    +'<i class="fa fa-refresh fa-spin blue"></i>'
		    +'&nbsp;<span class=blue>'+window.lc.getValue("refreshingWait")+'...</span></div>';
		return html;
	}
	//baidu  interface
	function getOperator(address){
		if(!address){
			return "---";
		}
		var arr=address.split("|");
		if(arr && arr.length && arr[4]){
			return arr[4];
		}
		return "---";
	}
	function getOutIp(ipStr){
		if(!ipStr){
			return null;
		}
	    var ret=ipStr.match(/(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])/g);
	    if(!ret){
	        console.log("can not get ip addr by reg match");
	        return null;
	    }
	    if(ret[0]!="0.0.0.0"){
	        console.log("get ip addr "+ret[0]);
	        var reg=new RegExp(/1(((0|27)(\.(([1-9]?|1[0-9])[0-9]|2([0-4][0-9]|5[0-5])))|(72\.(1[6-9]|2[0-9]|3[01])|92\.168))(\.(([1-9]?|1[0-9])[0-9]|2([0-4][0-9]|5[0-5]))){2})/);
	        var bool=reg.test(ret[0]);
	        if(bool){
	            console.log(ret[0]+" is inner ip");
	            return null;
	        }else{
	            console.log(ret[0]+" is outter ip");
	            return ret[0];
	        }
	    }else{
	        console.log("get ip addr 0.0.0.0,is invalid");
	        return null;
	    }
	}
	function getTreePara(para){
		var domainUuid=window.global.getDomainUuid();
		para.domainUuid=domainUuid;
		para.dstDomainUuid=domainUuid;
		var nid=window.curNid;
		if(!nid) return;
		var node=$("[nid="+nid+"]");
		if(node && node.length){
			var et=node.attr("etype");
			var uuid=node.attr("uuid");
			if(!domainUuid){
				domainUuid=node.attr("domain_uuid");
				para.domainUuid=domainUuid;
				para.dstDomainUuid=domainUuid;
			}
			
			if(et=="site"){
				para.siteUuid=uuid;
				para.zoneUuid=node.attr("puuid");
			}else if(et=="zone"){
				para.zoneUuid=uuid;
			}else if(et=="producttype"){
				para.productId=uuid;
			}
		}
		return;
	}
	function getTreeStrPara(){
		var domainUuid=window.global.getDomainUuid();
		var para="domainUuid="+domainUuid+"&dstDomainUuid="+domainUuid;
		var nid=window.curNid;
		if(!nid) return para;
		var node=$("[nid="+nid+"]");
		if(node && node.length){
			var et=node.attr("etype");
			var uuid=node.attr("uuid");
			if(!domainUuid){
				domainUuid=node.attr("domain_uuid");
				para="domainUuid="+domainUuid+"&dstDomainUuid="+domainUuid;
			}
			
			if(et=="site"){
				para+="&siteUuid="+uuid;
				para+="&zoneUuid="+node.attr("puuid");
			}else if(et=="zone"){
				para+="&zoneUuid="+uuid;
			}else if(et=="producttype"){
				para+="&productId="+uuid;
			}
		}
		return para;
	}
	function getMsgPara(){
		var domainUuid=window.global.getDomainUuid();
		var para="domainUuid="+domainUuid+"&dstDomainUuid="+domainUuid;
		
		return para;
	}
	function doMultiSelect(id){
		$('#'+id+' select').multiselect({
			 enableFiltering: true,
			 nonSelectedText:'未选择',
			 buttonClass: 'btn btn-white btn-primary',
			 enableCaseInsensitiveFiltering:true,
			 includeSelectAllOption:true,
			 maxHeight:300,
			 templates: {
				button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"></button>',
				ul: '<ul class="multiselect-container dropdown-menu"></ul>',
				filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
				filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
				li: '<li><a href="javascript:void(0);"><label></label></a></li>',
				divider: '<li class="multiselect-item divider"></li>',
				liGroup: '<li class="multiselect-item group"><label class="multiselect-group"></label></li>'
			 }
	    });
	}
	function getIds(rows){
		var ids="";
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(ids){
				ids+=",";
			}
			ids+=row.uuid;
		}
		return ids;
	}
	function getAlarmLevelList(){
		var list=[];
		for(var i=0;i<8;i++){
			var obj={uuid:i,name:window.lc.getValue("alarmLevel",i)};
			list.push(obj);
		}
		return list;
	}
	  function getCheckboxParams(pid,name){
		  var str="";;    
		  $("#"+pid+" input[name="+name+"]:checked").each(function(){    
			  str+="&"+name+"="+$(this).val();   
		  });
		  return str;
	  }
	function createDomainSel(cb){
		var domainUuid=getDomainUuid();
		$("#sidebar-shortcuts-large").html("");		
		$.ajax({ url: "domainListManager!getDmList.action", data:{domainUuid:window.user.dstDomainUuid},complete: function(data,str){
			window.domainList=data.responseJSON.domainList;
			if(window.domainList && window.domainList.length){
				var plSelDomain=window.lc.getValue("plSelDomain",1);
				var html='<select style="display: none;" class="chosen-select width-85" id="domain-sel" data-placeholder="'+plSelDomain+'">';
				html+='<option></option>';
				console.log(window.user)
				if(window.user.dstDomainUuid){
					html='<select style="display: none;" class="chosen-select width-85" id="domain-sel" data-placeholder="'+plSelDomain+'">';
				}
				for(var i=0;i<window.domainList.length;i++){
					var d=window.domainList[i];
					html+='<option value="'+d.uuid+'">'+d.name+'</option>';							
				}
				html+='</select>';
				$("#sidebar-shortcuts-large").html(html);
				if(window.user.dstDomainUuid){
					$('#domain-sel').chosen({width:'85%'});
					$('#domain-sel').attr('disabled', true).trigger("chosen:updated");
				}else if(domainUuid){
					$('#domain-sel').chosen({width:'85%',allow_single_deselect:true});
					$('#domain-sel').val(domainUuid).trigger("chosen:updated");
				}else{
					$('#domain-sel').chosen({width:'85%',allow_single_deselect:true});
				}
				window.domainChange=function(a,b,nid){
					window.curNid="";
					if(!$("#domain-sel").val()){
						$("#nav-list").html("");
					}
					udpateGroupBy();
					if(cb) cb();
					if(window.tabAfterShow);
					window.tabAfterShow($('#myTab li[class=active] a').attr("href"));
					
					require(["path"],function(path){
						path.createPath();
					});
					setTimeout(function(){
						$("#dev_list button[name=refresh]").trigger("click");
						
					},300)
					getUserList();
					
				}
				$("#domain-sel").chosen().change(window.domainChange);
				window.domainChange();
			}
		}})
	}
	function createVersionSel(cb){
		$("#sidebar-shortcuts-large").html("");
		$.ajax({
			url:"getPervisionRootTree.action",
			type:'post',
			complete: function(data,str){
			  if(data.responseJSON.children&&data.responseJSON.children.length){
				  var plSelVersion=window.lc.getValue("plSelVersion");
				  var html='<div  class="chosen-select width-85 text-left "  data-placeholder="'+plSelVersion+'">';
					//html+='<option></option>';
				     html+='<ul style= list-style:none;" id="version-sel">'
				    	 html+='<li value="-1">'+plSelVersion+'</li>';
					//html+='<select  class="chosen-select width-85" id="version-sel" data-placeholder="'+plSelVersion+'">';
					for(var i=0;i<data.responseJSON.children[0].children.length;i++){
						var d=data.responseJSON.children[0].children[i];
						html+='<li value="'+d.nid.substring(12)+'">'+d.name+'</li>';							
					}
				    html+='</ul>' 
					html+='</div>';
					$("#sidebar-shortcuts-large").html(html);
					//$('#version-sel').chosen({width:'85%',allow_single_deselect:true});
					/*window.domainChange=function(a,b,nid){
						
						if(!$("#version-sel").val()){
							$("#nav-list").html("");
						}
						
					
						if(window.tabAfterShow);
						window.tabAfterShow($('#myTab li[class=active] a').attr("href"));
						require(["path"],function(path){
							path.createVersionPath();
						});
						
					}
					$("#version-sel").chosen().change(window.domainChange);
					window.domainChange();*/
				
					if(!window.productIdNum){
					require(['ver-list'],function(vm){
						vm.createList("version_list",-1);
					  });
					
					}else{
						require(['ver-list'],function(vm){
							vm.createList("version_list",window.productIdNum);
						  });
						
						
					}
					require(["path"],function(path){
						path.createPath();
					});
					allLi = document.getElementById("version-sel").getElementsByTagName("li");
					for(var i=0,len=allLi.length;i<len;i++){
                        if(window.productIdNum==undefined){
                        	allLi[0].style.background = "#6FB3E0";
                        	
                        }else {
						if(window.productIdNum == allLi[i].value){

							allLi[i].style.background = "#6FB3E0";

						}else{
							allLi[i].style.background = "#F2F2F2";
						}
                        }
					}
					var ulItem = document.getElementById("version-sel");
					ulItem.onclick = function(e){
					e = e || window.event;//这一行及下一行是为兼容IE8及以下版本
					var target = e.target || e.srcElement;
					if(target.tagName.toLowerCase() === "li"){
					
					require(['ver-list'],function(vm){
						vm.createList("version_list",target.value);
					  });
					require(["path"],function(path){
						path.createPath();
					});
					}
					allLi = document.getElementById("version-sel").getElementsByTagName("li");
					for(var i=0,len=allLi.length;i<len;i++){

						if(target == allLi[i]){

							allLi[i].style.background = "#6FB3E0";

						}else{
							allLi[i].style.background = "#F2F2F2";
						}

					}
					
					}
			  }
				
				}
		})
		
	}
	function udpateGroupBy(){
		if(!$("#domain-sel").val()){
			if(window.groupBy && window.groupBy!="domain")
			window.groupBy="domain";
		}else{
			window.groupBy="zone";
		}
	}
	function getTimeObj(type){
		var obj={fromTime:"",toTime:""};
		var cur=new Date();
		if(type=="hour"){
			obj.toTime=window.format.getFormatDate(cur);
			cur.setHours(cur.getHours()-1);
			obj.fromTime=window.format.getFormatDate(cur);			
		}else if(type=="day"){
			obj.toTime=window.format.getFormatDate(cur);
			cur.setHours(0, 0, 0, 0);
			obj.fromTime=window.format.getFormatDate(cur);			
		}else if(type=="3day"){
			obj.toTime=window.format.getFormatDate(cur);
			cur.setDate(cur.getDate()-3);
			obj.fromTime=window.format.getFormatDate(cur);		
		}else if(type=="7day"){			
			obj.toTime=window.format.getFormatDate(cur);
			cur.setDate(cur.getDate()-7);
			obj.fromTime=window.format.getFormatDate(cur);	
		}else if(type=="month"){
			obj.toTime=window.format.getFormatDate(cur);
			cur.setMonth(cur.getMonth()-1);
			obj.fromTime=window.format.getFormatDate(cur);	
		}
		return obj;
	}
	function getDateObj(type){
		var obj={fromTime:"",toTime:""};
		var t=new Date();
		t.setDate(t.getDate()+1);
		obj.toTime=t.format("yyyy-MM-dd 00:00:00");
		var f=new Date();
		if(type=="day"){	
			obj.fromTime=f.format("yyyy-MM-dd 00:00:00");
		}else if(type=="3day"){
			f.setDate(f.getDate()-2);
			obj.fromTime=f.format("yyyy-MM-dd 00:00:00");				
		}else if(type=="7day"){			
			f.setDate(f.getDate()-6);
			obj.fromTime=f.format("yyyy-MM-dd 00:00:00");	
		}else if(type=="month"){
			f.setMonth(f.getMonth()-1);
			obj.fromTime=f.format("yyyy-MM-dd 00:00:00");	
		}
		return obj;
	}
	function doTabExist(id,obj,cb){
		var isExist=false;
		var pid=id.substring(1);
		if($('#'+pid).html()){
			var dl=$('#myTab a[href='+id+']');
			if(dl && dl.length){
		    	dl.tab("show");
		    	isExist=true;
		    }
		}
		if(isExist && obj.doRefresh){
			obj.doRefresh(id.substring(1));
		}else{
			cb();
		}
	}
	function procTab(){
		//默认显示第一个tab
		var dl=$('#myTab a[href=#dev_list]');
		if(dl && dl.length){
	    	dl.tab("show");
	    }else{
	    	$('#myTab a:first').tab("show");
	    }
	    $('#myTab a').bind("shown.bs.tab",function(){
	      var id=$(this).attr("href");
	      tabAfterShow(id);
	    });
	    $('#myTab a').click(function(e) {
//	      e.preventDefault()
	      $(this).tab('show');
	    });
	  }
	function trimNumber(str){ 
		return str.replace(/\d+/g,''); 
	} 
	function getNode(){
		return window.curNid?$("#nav-list [nid="+window.curNid+"]"):null;
	}
	function getEtype(){
		var node=getNode();
		return node?node.attr("etype"):null;
	}
	function initGroupBy(){
		if(window.user.dstDomainUuid || window.user.domainUuid){
			window.groupBy="zone";
		}else{
			window.groupBy="";
		}
	}
  function getRoleToNum(row){
	  var sendToRole=row.sendToRole.split(",");
	   for(var i=0;i<sendToRole.length;i++){
		   if(sendToRole[i]=="super_admin"){
			   sendToRole[i]=1;
		   }else if(sendToRole[i]=="super_support"){
			   sendToRole[i]=2;
		   }else if(sendToRole[i]=="domain_admin"){
			   sendToRole[i]=3;
		   }else if(sendToRole[i]=="domain_editor"){
			   sendToRole[i]=4;
		   }else if(sendToRole[i]=="domain_operator"){
			   sendToRole[i]=5;
		   }else if(sendToRole[i]=="domain_viewer"){
			   sendToRole[i]=6;
		   }else if(sendToRole[i]=="super_finance"){
			   sendToRole[i]=7;
		   }else if(sendToRole[i]=="super_viewer"){
			   sendToRole[i]=8;
		   }else if(sendToRole[i]=="domain_user01"){
			   sendToRole[i]=9;
		   }else if(sendToRole[i]=="domain_user02"){
			   sendToRole[i]=10;
		   }else if(sendToRole[i]=="domain_user03"){
			   sendToRole[i]=11;
		   }
	   }
	   return sendToRole;
  }
  function getRoleToNums(row){
	  var sendToRole=row.sendToRole.split(",");
	   for(var i=0;i<sendToRole.length;i++){
		   if(sendToRole[i]=="super_admin"){
			   sendToRole[i]=1;
		   }else if(sendToRole[i]=="super_support"){
			   sendToRole[i]=2;
		   }else if(sendToRole[i]=="domain_admin"){
			   sendToRole[i]=3;
		   }else if(sendToRole[i]=="domain_editor"){
			   sendToRole[i]=4;
		   }else if(sendToRole[i]=="domain_operator"){
			   sendToRole[i]=5;
		   }else if(sendToRole[i]=="domain_viewer"){
			   sendToRole[i]=6;
		   }else if(sendToRole[i]=="super_finance"){
			   sendToRole[i]=7;
		   }else if(sendToRole[i]=="super_viewer"){
			   sendToRole[i]=8;
		   }else if(sendToRole[i]=="domain_user01"){
			   sendToRole[i]=9;
		   }else if(sendToRole[i]=="domain_user02"){
			   sendToRole[i]=10;
		   }else if(sendToRole[i]=="domain_user03"){
			   sendToRole[i]=11;
		   }
	   }
	   return sendToRole;
  }
  function getNumToRole(roleId1){
	  var roleType1="";
	  var m='';
		var n=roleId1.split(",");
		for(var i=0;i<n.length;i++)
		{
		switch(parseInt(n[i])){
		case 1:roleType1="super_admin";break;
		case 2:	roleType1="super_support";break;
		case 3:	roleType1="domain_admin";break;
		case 4:	roleType1="domain_editor";break;
		case 5:	roleType1="domain_operator";break;
		case 6:	roleType1="domain_viewer";break;
		case 7:	roleType1="super_finance";break;
		case 8:	roleType1="super_viewer"; break;  
		case 9:	roleType1="domain_user01";break;
		case 10:roleType1="domain_user02";break;
		case 11:roleType1="domain_user03";break;
		default: break;
		}
		if(m!=""){
			m+=",";
		}
		m+=roleType1;
		}
		return m;
	  
  }
  function oneNumToRole(roleId1){
	  var roleType1="";
		switch(roleId1){
		case 1:roleType1="super_admin";break;
		case 2:	roleType1="super_support";break;
		case 3:	roleType1="domain_admin";break;
		case 4:	roleType1="domain_editor";break;
		case 5:	roleType1="domain_operator";break;
		case 6:	roleType1="domain_viewer";break;
		case 7:	roleType1="super_finance";break;
		case 8:	roleType1="super_viewer"; break;  
		case 9:	roleType1="domain_user01";break;
		case 10:roleType1="domain_user02";break;
		case 11:roleType1="domain_user03";break;
		default: break;
		}
		return roleType1;
	
  }
  function getMailTip(){
	  var flag=false;
	  $.ajax({
		  url:'msgManager!getRecUnreadMsg.action?'+new Date().toTimeString(),
	      type:'post',
		  data:{page:1,start:0,limit:25,domainUuid:window.global.getDomainUuid(),userUuid:window.user.uuid},
		  complete:function(data){
		  if(data.responseJSON && data.responseJSON.success){
			  if(!data.responseJSON.messageList){
				  return;
				  }
			var record=data.responseJSON.messageList[0];
			var roleType=window.global.oneNumToRole(record.srcRoleId);
			var sendToRoleId=record.sendToRole.split(",");
			
			if(roleType&&data.responseJSON.messageList[0].srcUserName){
				  for(var i=0;i<sendToRoleId.length;i++){
					  if(sendToRoleId[i]==window.user.roleId){
			          	flag=window.modal.creatTip(roleType,record);
					  }
				  }
			}
			
		  }
	      }
	  });
	  return flag;
	  
  }
  function getUserList(){
	  var params="";
		params+="&domainUuid="+window.global.getDomainUuid();
//		params+="&limit="+p.limit;
//		params+="&start="+p.offset;
		var roleId=0;
		 window.roleObj='';
		if(window.global.getDomainUuid()>0){
			roleId=window.roleType.getDomainAdmin();
		}
		params+="&roleId="+roleId;
       $.ajax({
    	 url:'roleManager!getList2.action',
    	 type:'post',
    	 data:params,
    	complete:function(data){
    	 for(var i=0;i<data.responseJSON.roleList2.length;i++){
    			if(window.user.roleId==data.responseJSON.roleList2[i].roleId){
    				window.roleTypeObj=data.responseJSON.roleList2[i];
    			}
    		}
     } 
    	 
     })
     
  }
  
 function  getClass(str,id){
	 if(window.operateNew[str]==0){
		
		
		 return "none";
	 }
	 return "inline-block";
	 
 }

    return {
    	getStrSize:getStrSize,
    	openChildWin:openChildWin,
    	getDomainUuid:getDomainUuid,
    	createDomainSel:createDomainSel,
    	procTab:procTab,
    	getTreePara:getTreePara,
    	getEtype:getEtype,
    	getNode:getNode,
    	initGroupBy:initGroupBy,
    	getTreeStrPara:getTreeStrPara,
    	getOutIp:getOutIp,
    	getOperator:getOperator,
    	getTimeObj:getTimeObj,
    	getLoadHtml:getLoadHtml,
    	trimNumber:trimNumber,
    	getAlarmLevelList:getAlarmLevelList,
    	doMultiSelect:doMultiSelect,
    	getCheckboxParams:getCheckboxParams,
    	getIds:getIds,
    	getMsgPara:getMsgPara,
    	getRoleToNum:getRoleToNum,
    	getNumToRole:getNumToRole,
    	oneNumToRole:oneNumToRole,
    	getMailTip:getMailTip,
    	createVersionSel:createVersionSel,
    	getProductId:getProductId,
    	getDateObj:getDateObj,
    	doTabExist:doTabExist,
    	getUserList:getUserList,
    	 getClass:getClass,
    	
    };
});


