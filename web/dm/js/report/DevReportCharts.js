define(['theme-macarons','text!html/modal.html','report-fun'],function (theme,modal,fun){
	
	function createChartByIndex(pid,index,obj){
		var cid=pid+"_chart";
		if(index==1){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("devNum"),"devNum",window.lc.getValue("devNumDesc"));
		}else if(index==2){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("devRegisterNum"),"devRegisterNum",window.lc.getValue("devRegisterNumDesc"));
		}else if(index==3){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("drpRegisterNum"),"drpRegisterNum",window.lc.getValue("drpRegisterNumDesc"));
		}else if(index==4){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("devDeteleNum"),"devDeteleNum",window.lc.getValue("devDeteleNumDesc"));
		}else if(index==5){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("devRebootNum"),"devRebootNum",window.lc.getValue("devRebootNumDesc"));
		}
	}
	function createBigChart(pid,index,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';
		html+=fun.getChartItemHtml(pid,cid+"_"+index);
		html+="</div>";
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			window.devReport.isBig=false;
			window.devReport.bigIndex=0;
			createChart(pid,obj);
		})	
		createChartByIndex(pid,index,obj);
	}
	function createChart(pid,obj){
		if(window.devReport.isBig){
			createBigChart(pid,window.devReport.bigIndex,obj);
		}else{
			createSmallChart(pid,obj);
		}
	}
	function createSmallChart(pid,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';	
		for(var i=0;i<5;i++){
			html+=fun.getChartItemHtml(pid,cid+"_"+(i+1));
		}
		html+='</div>';
		
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			var index=$(this).attr("index");
			window.devReport.isBig=true;
			window.devReport.bigIndex=index;
			createChart(pid,obj);
		})
		for(var i=1;i<=5;i++){
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