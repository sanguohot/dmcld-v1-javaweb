define(["bootstrap-table","user-fun","pri-pri"],function (bt,fun,pri){
	function createColEvents(pid,lid){
	    var view=function (e, value, row, index) {
			require(['user-panel'],function(up){
				  up.createPanel(pid,row);
			});
	    };

	    var add=function(e, value, row, index){
	    	
	    	fun.createAdd(lid);
			
	    }
	    var del=function(e, value, row, index){
	    	
	    	var rows=[row];	    	
	    	var cb=function(){
	    		fun.delDev(lid,rows);
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);  
			
	    }
	    var restorePwd=function(e, value, row, index){
	    	var rows=[row];
    		if(pri.procPrivilegeUser(row)){
    			fun.restorePwd(lid,rows); 
    		}else{
    			window.tip.show_pk("warning",null,window.lc.getValue("notLegal"));
    		} 
	    }
	    var set=function(e, value, row, index){
	    	var rows=[row];
	    
    		if(pri.procPrivilegeUser(row)){
    			fun.createSet(lid,rows);
    		}else{
    			window.tip.show_pk("warning",null,window.lc.getValue("notLegal"));
    		} 	
			
	    }
	    var setPwd=function(e, value, row, index){
	    	var rows=[row];
	    	
    		if(pri.procPrivilegeUser(row)){
    			fun.setPwd(lid,rows);
    		}else{
    			window.tip.show_pk("warning",null,window.lc.getValue("notLegal"));
    		}  	  		 	
			
	    }
	     var viewSite=function(e, value, row, index){
	    	 fun.createSiteList(pid,row);
	    	 
	     }
	     var addSite=function(e, value, row, index){
	    	 fun.addSiteList(row);
	    	 
	     }
	     var perView=function(e, value, row, index){
	    	 fun.createPerHtmlList(row,pid);
	    	 
	     }
	     var setGroud=function(e, value, row, index){
	    	 fun.createGroudHtmlList(row,pid);
	    	 
	     }
	    window.operateEvents = {
	        'click a[action=view]':view,
	        'click a[action=add]':add,
	        'click a[action=del]':del,
	        'click a[action=setPwd]':setPwd,
	        'click a[action=restorePwd]':restorePwd,
	        'click a[action=set]':set,
	        'click a[action=viewSite]':viewSite,
	        'click a[action=addSite]':addSite,
	        'click a[action=perView]':perView,
	        'click a[action=setGroud]':setGroud,
	    };
	}
	function createHtml(pid){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    var lid=pid+"_list";
	    pn.html("");
	    var html='<div id="'+lid+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    var domainUuid=window.global.getDomainUuid();
//	    if(domainUuid){
	    if(pid.indexOf("user_list")<0){
	        html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
	      }else if(window.roleType.isSuper(window.user.roleId) || window.roleType.isDomainAdmin(window.user.roleId)){
	    	  html+='<button id="'+lid+'-add" style="display:'+window.global.getClass("addDevice")+'" class="btn btn-success btn-sm"><i class="fa fa-user-plus bigger-130"></i></button>'
	      }		    
//	        +'<button id="'+lid+'-del" class="btn btn-link">删除</button>'
//	        +'<button id="'+lid+'-set" class="btn btn-link">修改</button>'
//	        +'<button id="'+lid+'-restore" class="btn btn-link">重置密码</button>'
//	        +'<button id="'+lid+'-set-pwd" class="btn btn-link">修改密码</button>';
//	    }
	    html+='</div>';	
//	    var html='';
	    html+='<table id='+lid+'></table>';
	    pn.append(html);
	    
	    $("#"+lid+"-add").bind("click",function(){
	    	//if(pri.procPrivilegeEdit()){
			//   	   return;
			//}else{
	    	fun.createAdd(lid);
			//}
	    });
	    $("#"+lid+"-del").bind("click",function(){
	    	var rows=$('#'+lid).bootstrapTable('getSelections');
	    	fun.delDev(lid,rows);
	    });
	    $("#"+lid+"-set").bind("click",function(){
	    	var rows=$('#'+lid).bootstrapTable('getSelections');
	    	fun.createSet(lid,rows);
	    });
	    $("#"+lid+"-restore").bind("click",function(){
	    	var rows=$('#'+lid).bootstrapTable('getSelections');
	    	fun.restorePwd(lid,rows);
	    });
	    $("#"+lid+"-set-pwd").bind("click",function(){
	    	var rows=$('#'+lid).bootstrapTable('getSelections');
	    	fun.setPwd(lid,rows);	    	
	    });
	}
	function createList(pid,grpUuid){
		createHtml(pid);
	    var lid=pid+"_list";
		
		var url="userListManager!getList.action";	    
	    createColEvents(pid,lid);
	    if(window.global.getDomainUuid()>0){
	    	var visible=true;
	    }else{
	    	visible=false;
	    }
		$('#'+lid).bootstrapTable({
			method: 'get',
			url: url,
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.userList2){
					
					for(var i=0;i<res.userList2.length;i++){
						if(roleType.isDomainUserWithoutAdmin(res.userList2[i].roleId)){
							res.userList2[i].roleName=res.userList2[i].nameCn;
							
						}
					}
					var obj={};
					obj["rows"]=res.userList2;
					obj.total=res["total"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params="";
				params+="&dstDomainUuid="+window.global.getDomainUuid();
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				if(grpUuid){
					params+="&grpUuid="+grpUuid;
				}			
				if(p.search)
				params+="&search="+p.search;
				return params;
			},
			striped: true,
			toolbar:"#"+lid+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
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
		        field: 'state',
		        checkbox: true,
		        cardVisible:false,		        
		    },{
				field: 'uuid',
				title: 'uuid',
				align: 'left',
				valign: 'middle',				
				visible:false
			},{
				field: 'name',
				title: window.lc.getValue("user"),
				align: 'left',
				valign: 'middle',				
				formatter:function(value,row,index){
					if(!window.global.getDomainUuid()){
						var domainName="-";
						if(row["domainName"]){
							domainName=row["domainName"];
						}
						return value+'&nbsp;<font color=gray>&lt;'+domainName+'&gt;</font>';
					}
					return value;
				}
			},{
				field: 'roleName',
				title: window.lc.getValue("role"),
				align: 'left',
				valign: 'middle',
				formatter:function(value,row,index){
					if(value=="域编辑者"){
						return "role_domain_editor";
					}else if(value=="域操作者"){
						return "role_domain_operator";
					}else if(value=="域观察者"){
						return "role_domain_viewer";
						
					}
					return value;
				}
			},{
				field: 'typeStr',
				title: window.lc.getValue("type"),
				align: 'left',
				valign: 'middle',
				visible:visible,
					formatter:function(value,row,index){
					if(value=="用户自定义"){
						return window.lc.getValue('userDefined');
					}else if(value=='系统预定义'){
						return window.lc.getValue('sysCustom');
					}
				}
			},{
				field: 'email',
				title: window.lc.getValue("email"),
				align: 'left',
				valign: 'middle',				
				formatter:function(value,row,index){
					return window.format.getDisplayValue(null,null,value);
				}
		          
			},{
				field: 'phone',
				title: window.lc.getValue("phone"),
				align: 'left',
				valign: 'middle',				
				formatter:function(value,row,index){
					return window.format.getDisplayValue(null,null,value);
				}
		          
			},{
				field: 'address',
				title: window.lc.getValue("addr"),
				align: 'left',
				valign: 'middle',				
				formatter:function(value,row,index){
					return window.format.getDisplayValue(null,null,value);
				}		          
			},{
				field: 'detailDesc',
				title: window.lc.getValue("desc"),
				align: 'left',
				valign: 'middle',				
				formatter:function(value,row,index){
					return window.format.getDisplayValue(null,null,value);
				}		          
			},window.list.getCreateTime(),{
	          field: '',
	          title: window.lc.getValue("option"),
	          align: 'left',
	          valign: 'middle',
	          visible:pid.indexOf("user_list")<0?false:true,
	          clickToSelect: true,
	          formatter:function(value,row,index){
				var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
					var view='<a action="view" class="blue"  title="'+window.lc.getValue("view")+'">'
						+'<i class="fa fa-search-plus bigger-130"></i>'
						+'</a>';
					var del='<a action="del"  class="red"  title="'+window.lc.getValue("del")+'">'
					+'<i class="fa fa-remove bigger-130"></i>'
					+'</a>';
					var set='<a action="set" class="green"  title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					var restorePwd='<a action="restorePwd" class="blue"  title="'+window.lc.getValue("resetPwd")+'">'
					+'<i class="fa fa-key bigger-130"></i>'
					+'</a>';
					var setPwd='<a action="setPwd" class="blue"  title="'+window.lc.getValue("setPwd")+'">'
					+'<i class="fa fa-exchange bigger-130"></i>'
					+'</a>';
					var viewSite='<a action="viewSite" class="blue"  title="'+window.lc.getValue("viewSite")+'">'
					+'<i class="fa fa-sitemap bigger-130"></i>'
					+'</a>'
					var addSite='<a action="addSite" class="green"  title="'+window.lc.getValue("addSite")+'">'
					+'<i class="fa fa-plus bigger-130"></i>'
					+'</a>'
					var perView='<a action="perView" class="blue"  title="'+window.lc.getValue("perView")+'">'
					+'<i class="fa fa-user-secret bigger-130"></i>'
					+'</a>'
					var setGroud='<a action="setGroud" class="green"  title="'+window.lc.getValue("setGroud")+'">'
					+'<i class="fa fa fa-google-plus bigger-130"></i>'
					+'</a>'
					 
					html+="";
					if(!roleType.isDomainAdmin(row.roleId) && window.user.uuid!=row.uuid){
						html+=del;
					}
					
					if(pri.procPrivilegeUser(row)){
						html+=set+restorePwd+setPwd;
					}
					
					if(window.global.getDomainUuid()>0){
						html+=viewSite+perView;
						if(roleType.isDomainAdmin(window.user.roleId)||roleType.isSuper(window.user.roleId)){
							if(!roleType.isDomainAdmin(row.roleId))
							html+=addSite+setGroud;
						}
					}
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">';
							if(!roleType.isDomainAdmin(row.roleId) && window.user.uuid!=row.uuid){
								tmp+='<li>'+del+'</li>'
							}
							if(pri.procPrivilegeUser(row)){
								tmp+='<li>'+set+'</li>'
								tmp+='<li>'+setPwd+'</li>'
								tmp+='<li>'+restorePwd+'</li>'
							}
						      if(window.global.getDomainUuid()>0){
				    			  tmp+='<li>'+viewSite+'</li>'	
				    			  tmp+='<li>'+perView+'</li>'
						    	  if(roleType.isDomainAdmin(window.user.roleId)||roleType.isSuper(window.user.roleId)){
						    		  if(!roleType.isDomainAdmin(row.roleId)){
						    			  tmp+='<li>'+addSite+'</li>'
						    			  tmp+='<li>'+setGroud+'</li>'
						    		  }
						    	  }
								}
						    tmp+='</ul>'
						  +'</div>'
						+'</div>';
					tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
					html+=tmp;
		    	  return html;
	          },
	          events:operateEvents
		    }]
		});
	    $("#"+pid+" button[name=back]").bind('click',function(){
	        if(pid.indexOf("user_list")<0){
	  			require(["domain-group"], function(chart) {
	  				chart.createList("domain_group");
	  			});
	        }
	      });
		$('#'+lid).on('post-body.bs.table', function () {
			$('#'+lid+' [data-rel=tooltip]').tooltip();
			window.list.changeForAce(pid);
		})
		$(window).resize(function () {
			window.list.changeView(pid,lid,600);
		});
	    window.list.changeView(pid,lid,600);
    }
	
    return {
    	createList:createList,
    	createHtml:createHtml
    };
});


