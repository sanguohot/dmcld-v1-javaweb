define(["text!html/service/ServiceNumMain.html"],function (tpl){
    var tempFn = window.dot.template(tpl);
    var html = tempFn({numAuth:window.lc.getValue("numAuth")});
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
		window.field.createMainSearch(window.lc.getValue("num"),tabAfterShow);
	}
	function tabAfterShow(id){
		var etype=window.global.getEtype();
		if(id=="#service_num"){
			require(["service-num-list"], function(da) { 
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


