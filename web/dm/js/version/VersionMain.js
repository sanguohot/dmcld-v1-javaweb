define(function(){
	
	function  createHtml(pid){
		 var pn=$("#"+pid);
		    pn.html(""); 
		    var html='<ul id="myTab" class="nav nav-tabs">'
		        +'<li role="presentation" ><a href="#version_list"><i class="fa fa-user"></i>&nbsp;'+window.lan["versionList"]+'</a></li>'     
		       
		        +'</ul>'
		        +'<div  class="tab-content">'
		        +'<div class="tab-pane fade in "  id="version_list" ></div>'
		       
		        +'</div>'
		        +'</div>';
		      pn.append(html);  
		      pn=$("#main_search");
		      pn.html("");

		      //清空分类位置html代码
		      pn=$(".m-nav");
		      pn.html("");
		   
	  	     /* require(["ver-list"], function (ver) {
	  	    	 
	  	    	 ver.createList("version_list");
	  	      });*/
		      
	}
	function tabAfterShow(id){
  	  if(id=="#version_list") {
  		
  	      require(["ver-list"], function (ver) {
  	    	 ver.createList(id.substring(1),-1);
  	      });
  	    }  
  	  
    }
	
	function init(){
		
		 window.global.createVersionSel(null);
		//window.tabAfterShow=tabAfterShow;
		 $("#nav-list").html("");
		  createHtml("my-tab-position");
		  window.global.procTab();
		  
		 
	}
	return {
		 createHtml: createHtml,
		    init:init,
		    tabAfterShow:tabAfterShow,
		  };
})