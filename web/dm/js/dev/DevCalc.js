define(["dev-tree","dev-sch","echarts-mobile"],function (tree,sch,ech){
	function createPieDevPer(id,data){
		var myChart = echarts.init(document.getElementById(id)); 
		option = {			
			title: {
				text: '在线状态',
				x:'center',
				y:'top',
		        textStyle:{
				    fontSize: 14,
//				    fontWeight: 'bolder',
				    color: '#707070'
				}
			},

			tooltip : {
				trigger: 'item',
				formatter: "{b} :{c} <br/>{d}%"
			},
			
			calculable : false,
			series : [
				{
					name:'MTG Status',
					type:'pie',
					radius : ['0', '70%'],
					center : ['50%', '50%'],
					data:data,
					itemStyle : {
						normal : {
							label : {
								show : false
							},
							labelLine : {
								show : false
							}
						},
						emphasis : {
							label : {
								show : false
							},
							labelLine : {
								show : false
							}
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
	function createBarDevPer(id,name,data){
		var myChart = echarts.init(document.getElementById(id)); 
		option = {
			
			calculable : false,
			xAxis : [
				{
					type : 'value',
					show:false,
					boundaryGap: [0, 0.1]
				}

			],
			yAxis : [
				{
					type : 'category',
					show:false,
					data : [name]
				}	
			],
			grid:{borderWidth:0,borderColor:'white',height:20,x:'0%',x2:'0%',y:"0%",y2:"0"},
			series : [					
				{
					name:'useage',
					type:'bar',
					stack: 'sum',
					barWidth: 20,
					//barHeight:80,
					barCategoryGap: '50%',
					itemStyle: {
						normal: {
							color: '#9fd7fb',
							barBorderColor: 'yellow',
							//barBorderWidth: 6,
							barBorderRadius:0,
//							label : {
//								show: true, position: 'insideLeft'
//							}
						}
					},
					data:data[0]
				},
				{
					name:'other',
					type:'bar',
					barWidth: 20,
					//barHeight:80,
					stack: 'sum',
					itemStyle: {
						normal: {
							color: '#ff9873',
							barBorderColor: 'tomato',
							//barBorderWidth: 6,
							barBorderRadius:0,
//							label : {
//								show: true, position: 'insideRight'
//							}
						}
					},
					data:data[1]
				}					
			]
		};             
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function createDevPerHtml(pid){
		var pn=$("#"+pid);
		pn.html("");
		var html='<div class="my-tab"><div class="container-fluid" >'
				+'<div class="row" >'
					+'<div dev-type="mtg" class="col-md-6" style="padding:5px;">'
						+'<div type="card" style="border:1px solid #eee;padding:5px;">'
						+'<div style="font-size:16px;font-weight:bold;color:#707070;">MTG</div>'
						+'<div style="height:200px;width:100%">'
							+'<span id="mtg_pie"style="display:inline-block;height:100%;width:50%"></span>'					
							+'<span style="display:inline-block;height:100%;width:50%">'
								+'<div style="height:25%;width:100%;">&nbsp;</div>'
								+'<div style="font-size:14px;color:#707070;">'+'使用率(%)'+'</div>'
								+'<div id="mtg_bar_useage" style="height:25%;width:100%;"></div>'
								+'<div style="font-size:14px;color:#707070;">'+'告警(%)'+'：</div>'
								+'<div id="mtg_bar_alarm" style="height:25%;width:100%;"></div>'
								+'<div style="height:25%;width:100%;">&nbsp;</div>'
							+'</span>'
						+'</div>'
						+'</div>'
					+'</div>'
					+'<div dev-type="dag" class="col-md-6" style="padding:5px;">'
					+	'<div type="card" style="border:1px solid #eee;padding:5px;">'
						+'<div style="font-size:16px;font-weight:bold;color:#707070;">DAG</div>'
						+'<div style="height:200px;width:100%">'
							+'<span id="dag_pie" style="display:inline-block;height:100%;width:50%"></span>'					
							+'<span style="display:inline-block;height:100%;width:50%">'
								+'<div style="height:25%;width:100%;">&nbsp;</div>'
								+'<div style="font-size:14px;color:#707070;">'+'使用率(%)'+'</div>'
								+'<div id="dag_bar_useage" style="height:25%;width:100%;"></div>'
								+'<div style="font-size:14px;color:#707070;">'+'告警(%)'+'：</div>'
								+'<div id="dag_bar_alarm" style="height:25%;width:100%;"></div>'
								+'<div style="height:25%;width:100%;">&nbsp;</div>'
							+'</span>'
						+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
				+'</div></div>'				  
		pn.append(html);
		//重新创建图表后添加监听函数
		$("#"+pid+" div[type=card]").hover(function(){
			$(this).css("background-color","#eee");
		},function(){
		$(this).css("background-color","#fff");	
		});
		$("#"+pid+" div.col-md-6").bind('click',function(){
			var devType=$(this).attr("dev-type");
			if(devType=="mtg"){
				require(["dev-list"], function(grid) { 
					grid.createDevList2(pid,pid+"_child","androidManager!getMtgList.action");
				});				
			}else if(devType=="dag"){
				require(["dev-list"], function(grid) { 
					grid.createDevList2(pid,pid+"_child","androidManager!getDagList.action");
				});			
			}
		});

	}
	function getPieData(obj){
		var ret=[];
		var t={};
		t.value=obj.totalCount-obj.curOnlineCount;
		t.name="offline";
		ret.push(t);
		var t2={};
		t2.value=obj.curOnlineCount;
		t2.name="online";
		ret.push(t2);
		
		return ret;
	}
	function getAlarmData(obj){
//		var ret=[[obj.alarmCount],[obj.totalAlarmCount-obj.alarmCount]];
		var a=Math.round(obj.alarmCount*100/obj.totalAlarmCount);
		var b=100-a;
		var ret=[[a],[b]];
//		console.log(a+"---------"+b);
		return ret;
	}
	function getUseageData(obj){
		var ret=[[obj.usedRate],[100-obj.usedRate]];
//		console.log(ret);
//		ret=t?t:"0";
		return ret;
	}
	function loadLocalData(obj){
		if(obj && obj.mtg && obj.mtg.totalCount){
			createPieDevPer("mtg_pie",getPieData(obj.mtg));
			var b=getUseageData(obj.mtg);
			createBarDevPer("mtg_bar_useage","占用率",b);
			var a=getAlarmData(obj.mtg);
			createBarDevPer("mtg_bar_alarm","告警",a);			
			$("#mtg_bar_alarm").prev().html("当前告警数:"+obj.mtg.alarmCount+"("+(!a[0][0]?"0":a[0][0])+"%)");
			$("#mtg_bar_useage").prev().html("使用率:"+"("+(!a[0][0]?"0":a[0][0])+"%)");
		}
		
		if(obj && obj.dag && obj.dag.totalCount){
			createPieDevPer("dag_pie",getPieData(obj.dag));
			var b=getUseageData(obj.dag);
			createBarDevPer("dag_bar_useage","占用率",b);
			var a=getAlarmData(obj.dag);
			createBarDevPer("dag_bar_alarm","告警",a);
			$("#dag_bar_alarm").prev().html("当前告警数:"+obj.dag.alarmCount+"("+(!a[0][0]?"0":a[0][0])+"%)");
			$("#dag_bar_useage").prev().html("使用率:"+"("+(!b[0][0]?"0":b[0][0])+"%)");
		}else{
//			$("div[dev-type=dag]").html("当前无DAG设备");
		}
	}
	function loadRemoteData(){
		var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
		window.global.getTreePara(params);
		 $.ajax({ 
			url: "androidManager!getDevCalc.action",
//			data:{mainSearch:$.trim($('#dev_tag').val())?window.lc.parseValues($.trim($('#dev_tag').val())):""},
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON.dmDev;
				//缓存远端设备统计数据
				if(obj && obj.length){
					window.dev.devPer=obj;
				}else{
					window.dev.devPer={};
				}
				loadLocalData(obj);
			}
		}});
	}	
    return {
        createPieDevPer:createPieDevPer,
		createBarDevPer:createBarDevPer,
		createDevPerHtml:createDevPerHtml,
		getPieData:getPieData,
		getAlarmData:getAlarmData,
		getUseageData:getUseageData,
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData
    };
});


