define(['text!html/service/ServiceMain.html'],function (tpl){
	function defaultView(){
		var node=window.global.getNode();
		var et=window.global.getEtype();
		if(!node || et=="root" || et=="cloud" || et=="domain"){
			 var lan={welcomeUse:window.lc.getValue("welcomeUse")
		    		,serviceManage:window.lc.getValue("serviceManage")
		    		,domainList:window.lc.getValue("domainList")
		    		,plSelServUnderDomain:window.lc.getValue("plSelServUnderDomain")};
		    var tempFn = window.dot.template(tpl);
		    var html=tempFn({lan:lan,isSuper:window.roleType.isSuper(window.user.roleId)});
			$("#my-tab-position").html(html);
			$('#myTab a:first').tab("show");
			require(["service-domain-list"], function(obj) { 
				obj.createList("service_domain");
			});
		}
	}
	function tabAfterShow(){
		var node=null;
		if(window.curNid){
			node=$("#nav-list [nid="+window.curNid+"]");
		}
    	//先清空主搜索
		$("#main_search").html("");
    	//先清空标签页
		$("#my-tab-position").html("");	
	    if(node){		
			var etype=node.attr("etype");
			if(etype=="dc" || etype=="dr"){
				require(["service-dc-dr-main"], function(obj) { 
					obj.init();
				});
			}else if(etype=="domain"){
				defaultView();
			}else if(etype=="number"){
				require(["service-num-main"], function(obj) { 
					obj.init();
				});
			}else if(etype=="sipserver"){
				require(["service-sip-server-main"], function(obj) { 
					obj.init();
				});
			}else if(etype=="freq"){
				require(["service-freq-main"], function(obj) { 
					obj.init();
				});
			}else{
				defaultView();
			}
	    }else{
	    	defaultView();
	    }
	};
	function createTree(){
	    require(["service-tree"], function(at) {
	    	at.loadTree();
	    });
	}
	function init(){
		window.tabAfterShow=tabAfterShow;
	  	window.global.createDomainSel(createTree);	  	
		pn=$(".m-nav");
		pn.html("");
//    	//先清空主搜索
		$("#main_search").html("");
//    	//先清空标签页
		$("#my-tab-position").html("");
	    defaultView();
//	    window.global.procTab();
	}
    return {
		init:init
    };
});


