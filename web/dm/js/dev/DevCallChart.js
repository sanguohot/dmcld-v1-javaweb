define(['theme-macarons','text!html/modal.html'],function (theme,modal){
	function createCallPerChart(pid,id,obj,text,name,subtext){
		echarts.registerTheme("macarons",theme);
		var myChart = echarts.init(document.getElementById(id),"macarons"); 
		option = {
		    tooltip : {
		        trigger: 'axis',
                formatter: function (b,c) {
		    		var str="";
		    		for(var i=0;i<b.length;i++){
		            	var obj=b[i],val=obj.value;
		            	if(obj.value=="-" || !obj.value){
		            		obj.value="0";
		            	}
		            	if(!str){
		            		str+=obj.name;
		            	}
		            	str+="<br>"+obj.seriesName+" : "+obj.value;
		    		}

                    return str;
                }
		    },
		    title: {
		        text: text,
		        subtext: subtext,
		        x: 'left',
		        textStyle:{
				    fontSize: 13,
				    fontWeight:'normal'
				}
			},
//		    calculable : true,
//		    dataZoom : {
//		        show : true,
//		        realtime : true,
//		        start : 0,
//		        end : 100,
//		        height:20
//		    },
		    grid: {
		        left: '25px',
		        right: '25px',
		        bottom: '5px',
		        top:'28%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : function (){
		                var list = [];
		        		var ft=$("#"+pid+" input[name=fromTime]").val();
		        		var tt=$("#"+pid+" input[name=toTime]").val();
		                if(obj && obj.list && obj.list.length){
			                for (var i = obj.list.length-1; i>=0; i--) {
			                	var time=obj.list[i]["generateTime2"];
			                	if(time){
			                		var td=window.format.getDate(time);
			                		list.push(td.format(window.format.getDateTimeFormat(ft,tt)));
			                	}
			                }
		                }
		                return list;
		            }()
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
                    axisLabel : {
                        formatter: ''
                    }
		        }
		    ],
		    series : [
		        {
		            name:text,
		            type:'line',
//		            areaStyle: {normal: {}},
		            stack: '总量',
//		            areaStyle: {normal: {}},
		            data:function (){
		                var list = [];
		                if(obj && obj.list && obj.list.length){
		                	for (var i = obj.list.length-1; i>=0; i--) {
			                    list.push(obj.list[i][name]);
			                }
		                }
		                return list;
		            }(),
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function createChartByIndex(pid,index,obj){
		var cid=pid+"_chart";
		if(index==1){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("riseCallCnt"),"riseCallCnt",window.lc.getValue("riseCallCntDesc"));
		}else if(index==2){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("riseCallTime")+"("+window.lc.getValue("mins")+")"
					,"riseCallTime",window.lc.getValue("riseCallTimeDesc"));
		}else if(index==3){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("acd")+"("+window.lc.getValue("secs")+")"
					,"acd",window.lc.getValue("acdDesc"));
		}else if(index==4){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("asr"),"asr",window.lc.getValue("asrDesc"));
		}else if(index==5){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("capsIn"),"capsIn",window.lc.getValue("capsInDesc"));
		}else if(index==6){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("capsOut"),"capsOut",window.lc.getValue("capsOutDesc"));
		}else if(index==7){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("curCallCnt"),"curCallCount",window.lc.getValue("curCallCntDesc"));
		}else if(index==8){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("curPstn"),"curPstn",window.lc.getValue("curPstnDesc"));
		}else if(index==9){
			createCallPerChart(pid,cid+"_"+index,obj,window.lc.getValue("curSip"),"curSip",window.lc.getValue("curSipDesc"));
		}
	}
	function createBigChart(pid,index,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';
		html+=getChartItemHtml(pid,cid+"_"+index);
		html+="</div>";
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			window.devCall.isBig=false;
			window.devCall.bigIndex=0;
			createChart(pid,obj);
		})	
		createChartByIndex(pid,index,obj);
	}
	function createChart(pid,obj){
		if(window.devCall.isBig){
			createBigChart(pid,window.devCall.bigIndex,obj);
		}else{
			createSmallChart(pid,obj);
		}
	}
	function createSmallChart(pid,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';	
		for(var i=0;i<9;i++){
			html+=getChartItemHtml(pid,cid+"_"+(i+1));
		}
		html+='</div>';
		
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			var index=$(this).attr("index");
			window.devCall.isBig=true;
			window.devCall.bigIndex=index;
			createChart(pid,obj);
		})
		for(var i=1;i<=9;i++){
			createChartByIndex(pid,i,obj);
		}
	}
	function getChartItemHtml(pid,id){
		var cid=pid+"_chart";
		var index=id.substring(cid.length+1);
		var isBig=window.devCall.isBig;
		var str=isBig?window.lc.getValue("backSmall"):window.lc.getValue("viewBig");
		var fa=isBig?"fa-reply":"fa-search-plus";
		var col=isBig?"col-md-12":"col-md-4";
		var ret='<div class="'+col+'" >'
	      +'<ul class="ace-thumbnails ">'
	      +'<li style="height:100%;width:100%;border:1px solid #CCC;">'
	      +'<a data-rel="colorbox" >'
	      +'<div id="'+id+'" style="height:180px;width:100%;"></div>'
	      +'<div name="view" index="'+index+'" class="tools tools-top">'
	      +'<a name="view" index="'+index+'" id="'+id+'_view'+'">'
	      +'<i class="ace-icon fa '+fa+'">'+str+'</i>'
	      +'</a>'
	      +'</div>'
	      +'</a>'
	      +'</li>'
	      +'</ul>'
	      +'</div>';
		return ret;
	}
    return {
		createCallPerChart:createCallPerChart,
		createBigChart:createBigChart,
		createChartByIndex:createChartByIndex,
		getChartItemHtml:getChartItemHtml,
		createSmallChart:createSmallChart,
		createChart:createChart
    };
});