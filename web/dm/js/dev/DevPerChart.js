define(['theme-macarons','text!html/modal.html'],function (theme,modal){
	function createPerChart(pid,id,obj,nl,vl,title,subtext){
		var series=[];
		for(var i=0;i<nl.length;i++){
			var item={
	            type:'line',
	            stack: window.lc.getValue("total"),
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            }
		    };
			item.name=nl[i];
			item.data=vl[i];
			series.push(item);			
		}
		echarts.registerTheme("macarons",theme);
		var myChart = echarts.init(document.getElementById(id),"macarons"); 

		option = {
			title: {
				text: title,
				subtext:subtext,
				x: 'left',
		        textStyle:{
				    fontSize: 13,
				    fontWeight:'normal'
				}
			},
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
		                if(obj && obj.length){
			                for (var i = 0; i<obj.length; i++) {
			                	var time=obj[i]["generateTime2"];
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
		    series : series
		};
			                           
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function getChartData(obj){
		if(!obj) return {};
		var tl=[
		        window.lc.getValue("runTimeAfterReg")+"("+window.lc.getValue("secs")+")",
		        window.lc.getValue("neRunTime")+"("+window.lc.getValue("secs")+")",
		        window.lc.getValue("curCpuUsage")+"(%)",
		        window.lc.getValue("devMemUsage")+"(%)",
		        window.lc.getValue("commFailCount"),
		        window.lc.getValue("pingSipDelay")+"("+window.lc.getValue("ms")+")",
		        window.lc.getValue("pingSipLost")+"(%)",
		        window.lc.getValue("curPingDelay")+"("+window.lc.getValue("ms")+")",
		        window.lc.getValue("maxPingDelay")+"("+window.lc.getValue("ms")+")",
		        window.lc.getValue("recvLostRate")+"(%)",
		        window.lc.getValue("sendLostRate")+"(%)"
		        ];
		var subtextl=[
		        window.lc.getValue("runTimeAfterRegDesc"),
		        window.lc.getValue("neRunTimeDesc"),
		        window.lc.getValue("curCpuUsageDesc"),
		        window.lc.getValue("devMemUsageDesc"),
		        window.lc.getValue("commFailCountDesc"),
		        window.lc.getValue("pingSipDelayDesc"),
		        window.lc.getValue("pingSipLostDesc"),
		        window.lc.getValue("curPingDelayDesc"),
		        window.lc.getValue("maxPingDelayDesc"),
		        window.lc.getValue("recvLostRateDesc"),
		        window.lc.getValue("sendLostRateDesc")
		        ];
		var nl=[];
		for(var i=0;i<tl.length;i++){
			nl.push([tl[i]]);
		}
		var neRunTimelen=[],recvLossRate=[],sendLossRate=[],recvTimeoutRate=[],sendTimeoutRate=[];
		var curPingDelayMs=[],maxPingDelayMs=[],flashRdFailCount=[],flashWtFailCount=[],memAllocFailCount=[],sysUpTimelen=[];
		var curCpuUsage=[],memUsage=[],pingSipDelay=[],pingSipLost=[],commFailCount=[],vl=[];
		for(var i=0;i<obj.length;i++){
			var o=obj[i];
			neRunTimelen.push(o.neRunTimelen);			
			var rl=0;
			memUsage.push(o.memUsage);
			commFailCount.push(o.commFailCount);
			pingSipDelay.push(o.pingSipDelayMs);
			pingSipLost.push(o.pingSipDelayLost);
			if(o.recvPktCnt){
				rl=Math.floor(o.recvLossCnt*100/o.recvPktCnt);
			}
			recvLossRate.push(rl);
			var sl=0;
			if(o.sendPktCnt){
				sl=Math.floor(o.sendLossCnt*100/o.sendPktCnt);
			}
			sendLossRate.push(sl);
//			var rt=0;
//			if(o.recvPktCnt){
//				rt=Math.floor(o.recvTimeoutCnt*100/o.recvPktCnt);
//			}
//			recvTimeoutRate.push(rt);
//			var st=0;
//			if(o.sendPktCnt){
//				st=Math.floor(o.sendTimeoutCnt*100/o.sendPktCnt);
//			}
//			sendTimeoutRate.push(st);			
			curPingDelayMs.push(o.curPingDelayMs);
			maxPingDelayMs.push(o.maxPingDelayMs);			
//			flashRdFailCount.push(o.flashRdFailCount);
//			flashWtFailCount.push(o.flashWtFailCount);
//			memAllocFailCount.push(o.memAllocFailCount);			
			sysUpTimelen.push(o.sysUpTimelen);			
			curCpuUsage.push(o.curCpuUsage);
		}
		
		vl.push([neRunTimelen]);
		vl.push([sysUpTimelen]);
		vl.push([curCpuUsage]);
		vl.push([memUsage]);
		vl.push([commFailCount]);
		vl.push([pingSipDelay]);
		vl.push([pingSipLost]);
		vl.push([curPingDelayMs]);
		vl.push([maxPingDelayMs]);
		vl.push([recvLossRate]);
		vl.push([sendLossRate]);
		var data={nl:nl,vl:vl,tl:tl,sl:subtextl};
		return data;
	}
	function createChartByIndex(pid,index,obj,data){
		var i=parseInt(index);
		var cid=pid+"_chart";		
		var vl=data.vl,nl=data.nl;
		//丢包率和超时率
		var lc=window.lc.getValue;
		var title=data.tl;
		var sl=data.sl;
		createPerChart(pid,cid+"_"+i,obj,nl[i-1],vl[i-1],title[i-1],sl[i-1]);
	}
	function createBigChart(pid,index,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';
		html+=getChartItemHtml(pid,cid+"_"+index);
		html+="</div>";
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			window.devPer.isBig=false;
			window.devPer.bigIndex=0;
			createChart(pid,obj);
		})
		var data=getChartData(obj);
		createChartByIndex(pid,index,obj,data);
	}
	function createChart(pid,obj){
		if(window.devPer.isBig){
			createBigChart(pid,window.devPer.bigIndex,obj);
		}else{
			createSmallChart(pid,obj);
		}
	}
	function createSmallChart(pid,obj){
		var cid=pid+"_chart";
		var html='<div class="row alert" style="padding:0;margin-right:0px;margin-left:0px;margin-bottom:10px;">';	
		for(var i=0;i<11;i++){
			html+=getChartItemHtml(pid,cid+"_"+(i+1));
		}
		html+='</div>';
		
		$("#"+cid).html(html);
		$("#"+cid+" div[name=view]").bind("click",function(){
			var index=$(this).attr("index");
			window.devPer.isBig=true;
			window.devPer.bigIndex=index;
			createChart(pid,obj);
		})
		
		var data=getChartData(obj);
		for(var i=1;i<=11;i++){
			createChartByIndex(pid,i,obj,data);
		}
	}
	function getChartItemHtml(pid,id){
		var cid=pid+"_chart";
		var index=id.substring(cid.length+1);
		var isBig=window.devPer.isBig;
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
    	createPerChart:createPerChart,
		createBigChart:createBigChart,
		createChartByIndex:createChartByIndex,
		getChartItemHtml:getChartItemHtml,
		createSmallChart:createSmallChart,
		createChart:createChart
    };
});