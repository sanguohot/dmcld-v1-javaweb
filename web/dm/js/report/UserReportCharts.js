define(['theme-macarons','text!html/modal.html','report-fun'],function (theme,modal,fun){
	
	function createChartByIndex(pid,index,obj){
		var cid=pid+"_chart";
		if(index==1){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("domainNum"),"domainNum",window.lc.getValue("domainNumDesc"));
		}else if(index==2){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("userNum"),"userNum",window.lc.getValue("userNumDesc"));
		}else if(index==3){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("loginUserNum"),"loginUserNum",window.lc.getValue("loginUserNumDesc"));
		}else if(index==4){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("localSysNum"),"localSysNum",window.lc.getValue("localSysNumDesc"));
		}
	}
	function createBigChart(pid,index,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';
		html+=fun.getChartItemHtml(pid,cid+"_"+index);
		html+="</div>";
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			window.userReport.isBig=false;
			window.userReport.bigIndex=0;
			createChart(pid,obj);
		})	
		createChartByIndex(pid,index,obj);
	}
	function createChart(pid,obj){
		if(window.userReport.isBig){
			createBigChart(pid,window.userReport.bigIndex,obj);
		}else{
			createSmallChart(pid,obj);
		}
	}
	function createSmallChart(pid,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';	
		for(var i=0;i<4;i++){
			html+=fun.getChartItemHtml(pid,cid+"_"+(i+1));
		}
		html+='</div>';
		
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			var index=$(this).attr("index");
			window.userReport.isBig=true;
			window.userReport.bigIndex=index;
			createChart(pid,obj);
		})
		for(var i=1;i<=4;i++){
			createChartByIndex(pid,i,obj);
		}
	}
	
    return {
		
		createBigChart:createBigChart,
		createChartByIndex:createChartByIndex,
	
		createSmallChart:createSmallChart,
		createChart:createChart
    };
});