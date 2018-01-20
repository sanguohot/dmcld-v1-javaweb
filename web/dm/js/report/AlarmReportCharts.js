define(['theme-macarons','text!html/modal.html','report-fun'],function (theme,modal,fun){
	
	function createChartByIndex(pid,index,obj){
		var cid=pid+"_chart";
		if(index==1){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("alarmNum"),"alarmNum",window.lc.getValue("alarmNumDesc"));
		}else if(index==2){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("seriousAlarmNum"),"seriousAlarmNum",window.lc.getValue("seriousAlarmNumDesc"));
		}else if(index==3){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("repairAlarmNum"),"repairAlarmNum",window.lc.getValue("repairAlarmNumDesc"));
		}else if(index==4){
			fun.createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("pushAlarmNum"),"pushAlarmNum",window.lc.getValue("pushAlarmNumDesc"));
		}
	}
	function createBigChart(pid,index,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';
		html+=fun.getChartItemHtml(pid,cid+"_"+index);
		html+="</div>";
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			window.alarmReport.isBig=false;
			window.alarmReport.bigIndex=0;
			createChart(pid,obj);
		})	
		createChartByIndex(pid,index,obj);
	}
	function createChart(pid,obj){
		if(window.alarmReport.isBig){
			createBigChart(pid,window.alarmReport.bigIndex,obj);
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
			window.alarmReport.isBig=true;
			window.alarmReport.bigIndex=index;
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