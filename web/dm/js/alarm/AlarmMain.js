/**
 * Created by Rainc on 2015/3/20.
 */
define(function (){
	function hideNode(type){
		$("#"+type).html("");
		$("#my-tab-position a[href=#"+type+"]").parent().css("display","none");
	}
	function showNode(type){
		$("#"+type).html("");
		$("#my-tab-position a[href=#"+type+"]").parent().css("display","inline-block");
	}
  function createHtml(pid){
    var pn=$("#"+pid);
    pn.html("");
  //<i class="fa fa-pie-chart"></i>&nbsp;
    var html='<ul id="myTab" class="nav nav-tabs">'
      +'<li role="presentation" ><a href="#alarm_calc"><i class="fa fa-warning"></i>'+window.lan["alarmCalc"]+'</a></li>'
      +'<li role="presentation" ><a href="#alarm_his"><i class="fa fa-header"></i>'+window.lan["alarmHis"]+'</a></li>'
      +'<li role="presentation" ><a href="#user_log"><i class="fa fa-users"></i>'+window.lan["userLog"]+'</a></li>'
      +'<li role="presentation" ><a href="#run_log"><i class="fa fa-pencil-square-o"></i>'+window.lan["runLog"]+'</a></li>'
      +'<li role="presentation" ><a href="#alarm_domain"><i class="fa fa-file-text"></i>'+window.lan["domainList"]+'</a></li>'
      +'<li role="presentation" ><a href="#alarm_desc"><i class="fa fa-file-text"></i>'+window.lan["alarmDesc"]+'</a></li>'
      +'<li role="presentation" ><a href="#alarm_man"><i class="fa fa-user"></i>'+window.lan["alarmMan"]+'</a></li>'
      +'<li role="presentation" ><a href="#alarm_grp"><i class="fa fa-sitemap"></i>'+window.lan["alarmGrp"]+'</a></li>'
      +'<li role="presentation" ><a href="#alarm_rule"><i class="fa fa-send"></i>'+window.lan["alarmPushRule"]+'</a></li>'
      +'</ul>'
      +'<div  class="tab-content">'
      +'<div class="tab-pane fade in "  id="alarm_calc" ></div>'
      +'<div class="tab-pane fade in "  id="alarm_his" ></div>'
      +'<div class="tab-pane fade in "  id="user_log" ></div>'
      +'<div class="tab-pane fade in "  id="run_log" >'
      +'</div>'
      +'<div class="tab-pane fade in "  id="alarm_domain" ></div>'
      +'<div class="tab-pane fade in "  id="alarm_desc" ></div>'
      +'<div class="tab-pane fade in "  id="alarm_man" ></div>'
      +'<div class="tab-pane fade in "  id="alarm_grp" ></div>'
      +'<div class="tab-pane fade in "  id="alarm_rule" ></div>'
      +'</div>';
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
	if(!domainUuid){
		hideNode("alarm_man");
		hideNode("alarm_grp");
		hideNode("alarm_rule");
		//需判断，否则会有bug
		if(id=="#alarm_man" || id=="#alarm_grp"  || id=="#alarm_rule"){
			$("#myTab a[href=#alarm_calc]").tab("show");
			return;
		}
	}else{
		//只有域id不为0时显示告警联系人和告警联系组节点
		showNode("alarm_man");
		showNode("alarm_grp");
		showNode("alarm_rule");
	}
    if(id=="#alarm_calc") {
    	require(["alarm-calc"], function (alarm) {
    		alarm.loadRemoteData(id.substring(1));
    	});
    }else if(id=="#alarm_his"){
    	require(["alarm-log"], function (log) {
	        log.createView(id.substring(1));
	      });    	
    }else if(id=="#run_log"){
    	require(["run-log-list"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#user_log"){
    	require(["user-log-list"], function (log) {
	        log.createView(id.substring(1));
	      });    	
    }else if(id=="#alarm_man"){
    	require(["alarm-man"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#alarm_grp"){
    	require(["alarm-grp"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#alarm_rule"){
    	require(["alarm-rule"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#alarm_desc"){
    	require(["alarm-desc"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }else if(id=="#alarm_domain"){
    	require(["alarm-domain"], function (log) {
	        log.createList(id.substring(1));
	      });    	
    }
    
  }
 
  function init(){
	  window.tabAfterShow=tabAfterShow;
	  //清空树内容
	  $("#nav-list").html("");
	    createHtml("my-tab-position");
	    window.global.procTab();
	  window.global.createDomainSel(null);

  }
  return {
    createHtml:createHtml,
    init:init,
    tabAfterShow:tabAfterShow
  };
});


