define(["dev-sch","text!html/service/ServiceDcDrMain.html"],function (sch,tpl){
    var tempFn = window.dot.template(tpl);
    var html = tempFn({hisCalc:window.lc.getValue("hisCalc")
    	,curStatus:window.lc.getValue("curStatus"),alarmLog:window.lc.getValue("alarmLog")});
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
		//名称/别名/描述/IP地址
		window.field.createMainSearch(window.lc.getValue("name")+"/IP "+window.lc.getValue("addr")
				,tabAfterShow);
		
	}
	function tabAfterShow(id){
		var etype=window.global.getEtype();
		if(window.interval){
			clearInterval(window.interval);
		}
		if(id=="#service_status"){
			require(["service-"+etype+"-status"], function(chart) {
				chart.loadData("service_status");
				var inv=setInterval(function(){					
					if(etype!=window.global.getEtype()){
						clearInterval(window.interval);
						return;
					}else{
						chart.loadData("service_status");
					}
				}, 5000);
				window.interval=inv;				
			});		
		}else if(id=="#service_his"){
			require(["service-"+etype+"-his"], function(chart) { 
				chart.createCalc("service_his");
			});
//		}else if(id=="#service_list"){
//			require(["service-"+etype+"-list"], function(chart) { 
//				chart.createList("service_list");
//			});
		}else if(id=="#service_per_calc"){
		
		}else if(id=="#service_alarm"){
			require(["service-alarm"], function(da) { 
				da.createAlarmList2(id.substring(1),"dmManager!getSysAlarmList.action");
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


