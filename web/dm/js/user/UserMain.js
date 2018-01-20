/**
 * Created by Rainc on 2015/3/20.
 */
define(function (){
  function createHtml(pid){
    var pn=$("#"+pid);
    pn.html("");
    //<i class="fa fa-pie-chart"></i>&nbsp;
    var html='<ul id="myTab" class="nav nav-tabs">'
      html+='<li role="presentation" ><a href="#user_list"><i class="fa fa-user"></i>&nbsp;'+window.lan["userList"]+'</a></li>'
      if(window.roleType.isSuper(window.user.roleId) || window.roleType.isDomainAdmin(window.user.roleId))
      html+='<li role="presentation" ><a href="#domain_group"><i class="fa fa-users"></i>&nbsp;'+window.lan["roleList"]+'</a></li>'
//      html+='<li role="presentation" ><a href="#role_list"><i class="fa fa-users"></i>&nbsp;'+window.lan["roleList"]+'</a></li>'
     if(roleType.isDomainAdmin(window.user.grpUuid)||window.user.grpUuid==0){
      html+='<li role="presentation" ><a href="#button_list"><i class="fa fa-users"></i>&nbsp;'+window.lan["buttonList"]+'</a></li>'
         }
      html+='</ul>'
      html+='<div  class="tab-content">'
      html+='<div class="tab-pane fade in "  id="user_list" ></div>'
      if(window.roleType.isSuper(window.user.roleId) || window.roleType.isDomainAdmin(window.user.roleId))
      html+='<div class="tab-pane fade in "  id="domain_group" ></div>'
//      html+='<div class="tab-pane fade in "  id="role_list" ></div>'
    if(roleType.isDomainAdmin(window.user.grpUuid)||window.user.grpUuid==0){
      html+='<div class="tab-pane fade in "  id="button_list" ></div>'
    	  }
      html+='</div>';
    pn.append(html);

    //清空主搜索位置html代码
    pn=$("#main_search");
    pn.html("");

    //清空分类位置html代码
    pn=$(".m-nav");
    pn.html("");
    
    //清空树代码
    $("#ur_here").html('');
    $("#my_tree").html("");
  }
  function tabAfterShow(id){
	  var domainUuid=window.global.getDomainUuid();
	  if(domainUuid){
		  showNode("domain_group");
	  }else{
		  hideNode("domain_group");
	  }
    if(id=="#user_list") {
      require(["user-list"], function (user) {
    	  user.createList(id.substring(1));
      });
    }else if(id=="#domain_group"){
    	require(["domain-group"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#role_list"){
    	require(["role-list"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#button_list"){
    	require(["button-list"], function (bl) {
	        bl.createList(id.substring(1));
	      });    	
    }
  }
	function hideNode(type){
		$("#dev_"+type).html("");
		$("#my-tab-position a[href=#"+type+"]").parent().css("display","none");
	}
	function showNode(type){
		$("#dev_"+type).html("");
		$("#my-tab-position a[href=#"+type+"]").parent().css("display","inline-block");
	}
  function init(){
	  window.tabAfterShow=tabAfterShow;
	    createHtml("my-tab-position");
	    window.global.procTab();
	  
	  //清空树内容
	  window.global.createDomainSel(null);

  }
  return {
    createHtml:createHtml,
    init:init,
    tabAfterShow:tabAfterShow
  };
});


