define(["dev-tree","dev-sch"],function (tree,sch){
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
					text: title,
					x:'center',
					y:'top',
					textStyle:{
						fontSize: 14,
//						fontWeight: 'bolder',
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
						radius : ['0', '60%'],
						center : ['50%', '50%'],
						data:getData(nl,dl),
						itemStyle : {
							normal : {
								label : {
									show : true
								},
								labelLine : {
									show : true
								}
							},
							emphasis : {
								label : {
									show : true
								},
								labelLine : {
									show : true
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
		var tr=tree.getTreePara();
		if(tr)
		params[tr.name]=tr.value;
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


