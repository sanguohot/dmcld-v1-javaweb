define(["text!html/pay/PayMain.html","pay-fun"],function (tpl,fun){
    var tempFn = window.dot.template(tpl);
    var user=window.user;
    var display="none";
    if(user && window.roleType.isSuper(user.roleId)){
    	display="inline-block";
    }
    var html = tempFn({display:display});
    
	function createHtml(pid){
	    var pn=$("#"+pid);
	    pn.html("");

	    //清空主搜索位置html代码
	    pn=$("#main_search");
	    pn.html("");

	    //清空分类位置html代码
	    pn=$(".m-nav");
	    pn.html("");
	    
	    //清空树代码
	    $("#ur_here").html('');
	    $("#my_tree").html("");
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
		window.field.createMainSearch("设备序列号/产品型号/有效期"
				,tabAfterShow);
		
	}
	function tabAfterShow(id){
		if(window.interval){
			clearInterval(window.interval);
		}
		if(id=="#pay_list"){
			$("#dev_tag").attr("placeholder","设备序列号/产品型号");
			require(["pay-list"], function(chart) {
				chart.createView("pay_list");		
			});
		}else if(id=="#pay_order"){
			$("#dev_tag").attr("placeholder","订单号/设备序列号");
			require(["pay-order"], function(chart) {
				chart.createView("pay_order");		
			});
		}else if(id=="#pay_car"){
			$("#dev_tag").attr("placeholder","");
			require(["pay-car"], function(chart) {
				chart.createView("pay_car");		
			});	
		}else if(id=="#pay_salesman"){
			$("#dev_tag").attr("placeholder","业务员/手机/邮箱/备注");
			require(["pay-salesman"], function(chart) {
				chart.createView("pay_salesman");		
			});	
		}else if(id=="#pay_price"){
			$("#dev_tag").attr("placeholder","设备型号/备注");
			require(["pay-price"], function(chart) {
				chart.createView("pay_price");		
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
		window.payList={sn:null};
		createHtml("my-tab-position");
		window.tabAfterShow=tabAfterShow;
		fun.updateSalesVar();
//		procTab();
//			if(window.location.pathname.indexOf("/alipay.html")<0){
//			  if(window.user && window.user.dstDomainUuid){
//			  }else{
//				    require(["pay-tree"], function(at) {
//				    	window.tabAfterShow=tabAfterShow;
//				    	at.loadTree();
//				    });
//			  }
//			}
		  fun.getParCarMap(procTab);
		  window.global.createDomainSel(null);
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


