define(function (){
	 function createHtml(pid){
		 var pn=$("#"+pid);
		    pn.html("");
		    var html='<ul id="myTab" class="nav nav-tabs">'
		        +'<li role="presentation" ><a href="#user_report"><i class="fa fa-bars"></i>'+window.lan["userReport"]+'</a></li>'
		        +'<li role="presentation" ><a href="#dev_report_list"><i class="fa fa-bars"></i>'+window.lan["devReport"]+'</a></li>'
		        +'<li role="presentation" ><a href="#alarm_report"><i class="fa fa-bars"></i>'+window.lan["alarmReport"]+'</a></li>'
		        //+'<li role="presentation" ><a href="#mes_draft"><i class="fa fa-envelope"></i>'+window.lan["draftBox"]+'</a></li>'
		        +'</ul>'
		        +'<div  class="tab-content">'
		        +'<div class="tab-pane fade in "  id="user_report" ></div>'
		        +'<div class="tab-pane fade in "  id="dev_report_list" ></div>'
		        +'<div class="tab-pane fade in "  id="alarm_report" ></div>'
		       // +'<div class="tab-pane fade in "  id="mes_draft" >'
		        +'</div>';
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
			
		    if(id=="#user_report") {
		    	require(["user-report"], function (url) {
		    		url.createUserReport(id.substring(1));
		    	});
		    }else if(id=="#dev_report_list"){
		    	require(["dev-report"], function (drl) {
		    		drl.createDevReport(id.substring(1));
		    	});
		    }else if(id=="#alarm_report"){
		    	require(["alarm-report"], function (arl) {
		    		arl.createAlarmReport(id.substring(1));
		    	});
		    }
		  }
		 
	function init(){
		window.tabAfterShow=tabAfterShow;
		 $("#nav-list").html("");
		    createHtml("my-tab-position");
		    window.global.procTab();
		  window.global.createDomainSel(null);
		
		 
	}
	 return {
		 tabAfterShow:tabAfterShow,
		  createHtml:createHtml,
		    init:init
		   
		  };
});