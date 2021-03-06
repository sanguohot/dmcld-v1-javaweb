﻿define(["dev-tree","dev-sch"],function (tree,sch){
	function createBar(id,title,nl,dl){
		 function getData(nl){
     		var data=[];
     		for(var i=0;i<nl.length;i++){
     			var obj={xAxis:i,y:350,name:nl[i],symbolSize:20};
     			data.push(obj);
     		}
     		console.log(data);
     		return data;
     	}
		require.config({
			paths: {
//		        "echarts": "echarts-2.2.0/echarts-2.2.0/src",
			"echarts": "echarts-m-1.0.0/source",
		    }
		});	
		require(
			[
				'echarts',
				'echarts/chart/bar'
			],
			function (ec) {
				//$("#"+id).html("");
				
				$(window).resize(function(){
					myChart.resize();    
				}); 				
			}
		);
	}
	function createPie(id,title,nl,dl){
		 function getData(nl,dl){
    		var data=[];
    		for(var i=0;i<nl.length;i++){
    			var obj={value:dl[i],name:nl[i],symbolSize:20};
    			data.push(obj);
    		}
    		console.log(data);
    		return data;
    	}
		 var myChart = echarts.init(document.getElementById(id)); 

			option = {
			    title: {
			        x: 'center',
			        text: title,
			        textStyle:{
					    fontSize: 14,
//					    fontWeight: 'bolder',
//					    color: '#707070'
					}
			    },
			    calculable: true,
			    grid: {
			        borderWidth: 0,
			        y: 80,
			        y2: 60
			    },
			    xAxis: [
			        {
			            type: 'category',
			            show: false,
			            data: nl
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value',
			            show: false
			        }
			    ],
			    series: [
			        {
			            name: 'CPU性能',
			            type: 'bar',
			            barWidth: 20,
			            itemStyle: {
			                normal: {
			                    color: function(params) {
			                        // build a color map as your need.
			                        var colorList = [
			                          '#f0ad4e','#5cb85c','#5bc0de','#27727B',
			                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
			                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
			                        ];
			                        var colorList=[];
			                        for(var i=0;i<dl.length;i++){
			                        	var v=dl[i];
			                        	if(v<30){
			                        		colorList.push("#5cb85c");
			                        	}else if(v>=30 && v<=60){
			                        		colorList.push("#5bc0de");
			                        	}else if(v>60 && v<80){
			                        		colorList.push("#f0ad4e");
			                        	}else{
			                        		colorList.push("#d9534f");
			                        	}
			                        }
			                        return colorList[params.dataIndex]
			                    },
			                    label: {
			                        show: true,
			                        position: 'bottom',
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            data: dl,
			            markPoint: {
			                data:getData(nl)
			            }
			        }
			    ]
			};
				                                 
			myChart.setOption(option);
			$(window).resize(function(){
				myChart.resize();    
			});
	}
	function createHtml(pid){
		var pn=$("#"+pid);
		pn.html("");
		var html='<div class="my-tab">'		
		+'<div class="container-fluid" >'
		+'<div class="row ">'
			+'<div class="col-md-6">'
			+'<div id="dev_per_calc_cpu" style="height:200px;width:100%"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="dev_per_calc_mem" style="height:200px;width:100%"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="dev_per_calc_loss" style="height:200px;width:100%"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="dev_per_calc_timeout" style="height:200px;width:100%"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="dev_per_calc_nat_mode" style="height:200px;width:100%"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="dev_per_calc_nat_status" style="height:200px;width:100%"></div>'
			+'</div>'
		+'</div>'
		+'</div>'
		+'<form>';
		pn.append(html);
	}
	function createCalc(pid,obj){
		if(!obj) return;
		createHtml(pid);
		createBar(pid+"_cpu","CPU占用率",["5(sec)","60(sec)","600(sec)"]
		                            ,[obj["avgCpu5"],obj["avgCpu60"],obj["avgCpu600"]]);
		createBar(pid+"_mem","内存和存储空间占用率",["AOS","LINUX","存储空间"]
		                                ,[obj["memAosUsage"],obj["memLinuxUsage"],obj["storeUsage"]]);
		createBar(pid+"_loss","丢包率",["发送","接收","总计"]
		                                ,[obj["sendLossRate"],obj["recvLossRate"],obj["totalLossRate"]]);
		createBar(pid+"_timeout","超时率",["发送","接收","总计"]
		                                ,[obj["sendTimeoutRate"],obj["recvTimeoutRate"],obj["totalTimeoutRate"]]);
		createPie(pid+"_nat_mode","NAT模式分布",["NA","STUN","UPNP","STATIC","DYNAMIC","DISABLE"]
		                                ,[obj["natModeNa"],obj["natModeStun"],obj["natModeUpnp"],
		                                  obj["natModeStatic"],obj["natModeDynamic"],obj["natModeDisable"]]);
		createPie(pid+"_nat_status","NAT状态分布",["NA","SUCCESS","FAIL","SYN","DISABLE"]
		                                ,[obj["natStatusNa"],obj["natStatusSucc"],obj["natStatusFail"],
		                                  obj["natStatusSyn"],obj["natStatusDisable"]]);

//		$("#"+pid+" div.col-md-6").hover(function(){
//			$(this).css("background-color","#e7e7e7");
//		},function(){
//		$(this).css("background-color","#f8f8f8");	
//		});
	}
	function loadLocalData(pid,obj){
		createCalc(pid,obj);
		
	}
	function loadRemoteData(pid){
		var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
		window.global.getTreePara(params);
		 $.ajax({ url: "pmdNe15Manager!getPerCalc.action", data:params,complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON.pc;
				//缓存远端设备统计数据
				if(obj && obj.length){
					window.dev.devPerCalc=pc;
				}else{
					window.dev.devPerCalc={};
				}
				loadLocalData(pid,obj);
			}
		}});
	}	
    return {
        createBar:createBar,
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData,
		createCalc:createCalc,
		createHtml:createHtml
    };
});


