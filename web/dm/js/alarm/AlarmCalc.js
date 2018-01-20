define(["dev-tree","dev-sch"],function (tree,sch,ech){
	function createBar(id,title,nl,dl){
		 function getData(nl){
    		var data=[];
    		for(var i=0;i<nl.length;i++){
    			var obj={xAxis:i,y:350,name:nl[i],symbolSize:20};
    			data.push(obj);
//    			if(!dl[i]){
//    				dl[i]='-';
//    			}
    		}
//    		console.log(dl)
//    		console.log(data);
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
					    color: '#333'
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
			                          '#d9534f','#f0ad4e','#f0ad4e','#f0ad4e',
			                           '#f0ad4e','#5bc0de','#5bc0de','#5bc0de','#5bc0de',
			                           '#5bc0de','#5bc0de','#5bc0de','#5bc0de','#5bc0de'
			                        ];
			                        return colorList[params.dataIndex]
			                    },
			                    label: {
			                        show: true,
			                        position: 'bottom',
//			                        formatter: '{b}\n'+'{c}'
			                        formatter: function (b) {
//			                    	console.log(b.name);
			                    	if(!b.value){
			                    		b.value="0";
			                    	}
			                            return b.name+":"+b.value; // 范围标签显示内容。
			                        }
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
		var did=pid+"_dev";
		var srid=pid+"_server";
		var cid=pid+"_call";
		var seid=pid+"_service";
		var seid1=pid+"_service1";
		var seid2=pid+"_service2";
		var seid3=pid+"_service3";
		var lid=pid+"_log";
		var html='<div class=" my-tab">'		
		+'<div class="container-fluid" >'
		+'<div class="row ">'
			+'<div class="col-md-6">'
			+'<div id="'+did+'" style="height:200px;width:100%;border:1px solid #eee;margin-top:10px;"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="'+srid+'" style="height:200px;width:100%;border:1px solid #eee;margin-top:10px;"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="'+cid+'" style="height:200px;width:100%;border:1px solid #eee;margin-top:10px;"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="'+seid+'" style="height:200px;width:100%;border:1px solid #eee;margin-top:10px;"></div>'
			+'</div>'
			+'<div class="col-md-6">'
			+'<div id="'+lid+'" style="height:200px;width:100%;border:1px solid #eee;margin-top:10px;"></div>'
			+'</div>'	
		+'</div>'
		
		+'</div>'
		+'<form>';
		pn.append(html);
	}
	function createCalc(pid,obj){
//		if(!obj) return;
		createHtml(pid);
		var nl=[window.lc.getValue("alarmLevel",0),window.lc.getValue("alarmLevel",1),window.lc.getValue("alarmLevel",2)
                ,window.lc.getValue("alarmLevel",3),window.lc.getValue("alarmLevel",4)];
		createBar(pid+"_dev",window.lc.getValue("devAlarm"),nl
		                            ,[obj.dev["level0"],obj.dev["level1"],obj.dev["level2"],obj.dev["level3"],obj.dev["level4"]]);
		createBar(pid+"_server",window.lc.getValue("serverAlarm"),nl
			                            ,[obj.server["level0"],obj.server["level1"],obj.server["level2"],obj.server["level3"],obj.server["level4"]]);
		createBar(pid+"_call",window.lc.getValue("callAlarm"),nl
			                            ,[obj.call["level0"],obj.call["level1"],obj.call["level2"],obj.call["level3"],obj.call["level4"]]);

		createBar(pid+"_service",window.lc.getValue("serviceAlarm"),nl
			                            ,[obj.service["level0"],obj.service["level1"],obj.service["level2"],
			                               obj.service["level3"],obj.service["level4"]]);
		createBar(pid+"_log",window.lc.getValue("alarmHis"),nl
                ,[obj.log["level0"],obj.log["level1"],obj.log["level2"],
                   obj.log["level3"],obj.log["level4"]]);
		$("#"+pid+" div.col-md-6 div").hover(function(){
			$(this).css("background-color","#eee");
		},function(){
		$(this).css("background-color","#fff");	
		});
		$("#"+pid+" div.col-md-6 div").bind("click",function(){
			var did=$(this).attr("id");
			if(did){
				if(did.indexOf("_log")>=0){
					$('#myTab a[href=#alarm_his]').tab("show");
				}else{
					require(["alarm-list"], function(alarm) {
						alarm.createAll(pid,did);
					});
				}
			}
		});
		
	}
	function loadLocalData(pid,obj){
		createCalc(pid,obj);
	}
	function loadRemoteData(pid){
		var params={dstDomainUuid:window.global.getDomainUuid()};
//		var tr=tree.getTreePara();
//		if(tr)
//		params[tr.name]=tr.value;
		 $.ajax({ url: "dmManager!getAlarmCalc.action", data:params,complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON.dac;
				//缓存远端设备统计数据
//				if(obj && obj.length){
//					window.dev.devPerCalc=pc;
//				}else{
//					window.dev.devPerCalc={};
//				}
//				console.log(obj)
				loadLocalData(pid,obj);
			}
		}});
	}	
    return {
		createBar:createBar,
		createHtml:createHtml,
		createCalc:createCalc,
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData
    };
});


