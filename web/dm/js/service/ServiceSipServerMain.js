define(["text!html/service/ServiceSipServerMain.html"],function (tpl){
    var tempFn = window.dot.template(tpl);
    var html = tempFn({sipServer:window.lc.getValue("sipServer")});
	function createHtml(pid){		
		createMainSchHtml();
		createTabHtml(pid);
	}
	function createTabHtml(pid){
		var pn=$("#"+pid);
		pn.html("");
		pn.append(html);
	}
	function createMainSchHtml(){		
		//主搜索位置生成html
		window.field.createMainSearch(window.lc.getValue("productSn")+"/"+window.lc.getValue("devAlias")
				+"/"+window.lc.getValue("priSipAddr")+"/"+window.lc.getValue("priSipPort")+"/"
				+window.lc.getValue("secSipAddr")+"/"+window.lc.getValue("secSipPort"),tabAfterShow);
	}
	function tabAfterShow(id){
		var etype=window.global.getEtype();
		if(id=="#service_sip_server"){
			require(["service-sip-server-list"], function(da) { 
				da.createList(id.substring(1));
			});	
		}
	}
	function procTab(){
		$('#myTab a').bind("shown.bs.tab",function(){
			var id=$(this).attr("href");
			tabAfterShow(id);
		});
		
		$('#myTab a').click(function(e) {
		 e.preventDefault()
		 $(this).tab('show');
		});
		//默认加载第一个tab
		$('#myTab a:first').trigger("click");
	}
	function init(){
		createHtml("my-tab-position");
		procTab();
	}
    return {
    	createHtml:createHtml,
    	createTabHtml:createTabHtml,
    	createMainSchHtml:createMainSchHtml,
		procTab:procTab,
		init:init,
		tabAfterShow:tabAfterShow
    };
});


