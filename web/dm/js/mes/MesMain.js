define(function (){
	 function createHtml(pid){
		 var pn=$("#"+pid);
		    pn.html("");
		    var html='<ul id="myTab" class="nav nav-tabs">'
		        +'<li role="presentation" ><a href="#mes_write"><i class="fa fa-pencil"></i>'+window.lan["writeMessage"]+'</a></li>'
		        +'<li role="presentation" ><a href="#mes_received"><i class="fa fa-envelope"></i>'+window.lan["receivedMessage"]+'</a></li>'
		        +'<li role="presentation" ><a href="#mes_send"><i class="fa fa-envelope"></i>'+window.lan["sentmessage"]+'</a></li>'
		        +'<li role="presentation" ><a href="#mes_draft"><i class="fa fa-envelope"></i>'+window.lan["draftBox"]+'</a></li>'
		        +'</ul>'
		        +'<div  class="tab-content">'
		        +'<div class="tab-pane fade in "  id="mes_write" ></div>'
		        +'<div class="tab-pane fade in "  id="mes_received" ></div>'
		        +'<div class="tab-pane fade in "  id="mes_send" ></div>'
		        +'<div class="tab-pane fade in "  id="mes_draft" >'
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
			
		    if(id=="#mes_write") {
		    	require(["write-msg"], function (write) {
		    		write.createView(id.substring(1));
		    	});
		    }else if(id=="#mes_received"){
		    	require(['rec-msg'], function (rec) {
		    		rec.createView(id.substring(1));
		    	});
		    	
		   	
		    }else if(id=="#mes_send"){
		    	
		    	require(["send-msg"], function (send) {
		    		send.createView(id.substring(1));
		    	});
		    	
			    	
		    }else if(id=="#mes_draft"){
		    	require(["dr-box"], function (dr) {
		    		dr.createView(id.substring(1));
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