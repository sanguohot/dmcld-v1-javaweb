define(["dev-tree","dev-sch"],function (tree,sch){
	function createLine(id,tl,nl,vl,title){
		var series=[];
		for(var i=0;i<nl.length;i++){
			var item={
	            type:'line',
	            stack: '总量',
		    };
			item.name=nl[i];
			item.data=vl[i];
			series.push(item);			
		}
		var myChart = echarts.init(document.getElementById(id)); 

		option = {
			title: {
				text: title,
				x:'center',
				y:'top',
		        textStyle:{
				    fontSize: 14,
//				    fontWeight: 'bolder',
				    color: '#707070'
				}
			},
		    dataZoom : {
		        show : true,
		        realtime : true,
		        start : 20,
		        end : 80
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    //拖拽重计算 很影响性能 默认关闭
//		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : tl
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : series
		};
			                           
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function createHtml(pid){
		var pn=$("#"+pid);
		if(!pn) return;
		var fid=pid+'_form';
		var cid=pid+'_chart';
		var html='';
		html+='<form id="'+fid+'" role="form">';
		html+='<div class="container-fluid my-tab" >';
		html+='<div class="row ">'
		+'<div class="col-md-3">';
		html+=window.field.getComboField("groupTime","","过滤参数",[{text:"最近一个小时",value:"hour"},{text:"最近一天",value:"day"},{text:"最近一周",value:"week"}],false);
		html+='<a class="blue dev-search" style="position:absolute;top:32px;left:230px;" href="#" title="刷新"><i class="fa fa-refresh bigger-120"></i></a>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="container-fluid my-tab" id="'+cid+'">'
		html+=getLoadHtml();	
		+'</form>'
		html+='</form>';
		pn.html(html);
		$("#"+fid+" select").bind("change",function(){
			loadRemoteData(pid);
		});
		$("#"+fid+" .dev-search").bind("click",function(){
			loadRemoteData(pid);
		});
		
	}
	function getChartData(obj){
		var tl=[],nl=[["AG总数","TG总数"],["AG新增数","TG新增数"]
		              ,["AG未知数","TG未知数"],["AG在线数","TG在线数"]];
//		var vl12
		var totalAgCount=[],totalTgCount=[],newAgCount=[],newTgCount=[],onlineAgCount=[],onlineTgCount=[];
		var unknownTgCount=[],unknownAgCount=[];
		for(var i=0;i<obj.length;i++){
			var o=obj[i];
//			vl=[o.neRegFailCnt]
			totalAgCount.push(o.totalAgCount);
			totalTgCount.push(o.totalTgCount);
			newAgCount.push(o.newAgCount);
			newTgCount.push(o.newTgCount);
			
			unknownAgCount.push(o.unknownAgCount);
			unknownTgCount.push(o.unknownTgCount);
			
			onlineAgCount.push(o.onlineAgCount);
			onlineTgCount.push(o.onlineTgCount);
		
			tl.push(o.generateTime2);
		}
		var vl1=[totalAgCount,totalTgCount];
		var vl2=[newAgCount,newTgCount];
		var vl3=[unknownAgCount,unknownTgCount];
		var vl4=[onlineAgCount,onlineTgCount];
	
		var data={tl:tl,nl:nl,vl:[vl1,vl2,vl3,vl4]};
		return data;
	}
	function getLoadHtml(){
		var html='<span style="padding:5px;"><div class="icon-middle">'
		    +'<i class="fa fa-spinner fa-spin" style="color:#82af6f;"></i>'
		    +'</div> 正在刷新请稍候...</span>';
		return html;
	}
	function drawLine(pid,obj){
		//画图
		var cid=pid+'_chart';
		var html='';
		html+='<div class="row ">'
		+'<div class="col-md-12">'
			+'<div id="'+cid+'_1'+'" style="height:300px;width:100%;"></div>'
		+'</div>'			
	+'</div>'
	+'<div class="row " style="margin-top:20px;">'
		+'<div class="col-md-12">'
			+'<div id="'+cid+'_2'+'" style="height:300px;width:100%;"></div>'
		+'</div>'
		+'</div>'
		+'<div class="row " style="margin-top:20px;">'
		+'<div class="col-md-12">'
			+'<div id="'+cid+'_3'+'" style="height:300px;width:100%;"></div>'
		+'</div>'
	+'</div>'
	+'<div class="row " style="margin-top:20px;">'
	+'<div class="col-md-12">'
		+'<div id="'+cid+'_4'+'" style="height:300px;width:100%;"></div>'
	+'</div>'
+'</div>'	
	+'</div>'
	$("#"+cid).html(html);
		var data=getChartData(obj);
		var tl=data.tl,vl=data.vl,nl=data.nl;
		//丢包率和超时率
		var title=["AG/TG总数历史曲线","AG/TG新增数历史曲线","AG/TG未知数历史曲线","AG/TG在线数历史曲线"];
		for(var i=0;i<4;i++){
			console.log(data[i])
			createLine(cid+"_"+(i+1),tl,nl[i],vl[i],title[i]);
		}
	}
	function createView(pid){
		createHtml(pid);
		loadRemoteData(pid);
	}
	function loadRemoteData(pid){
		var params={};
		var cid=pid+"_chart";
		var sel=$("#"+pid+" select");
		var groupTime="hour";
		if(sel.length){
			groupTime=sel.val();
		}
		params["groupTime"]=groupTime;
		$("#"+cid).html(getLoadHtml());
		 $.ajax({ url: "pmdSys15Manager!getDevHisCalc.action", data:params,complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON.sys15List;
				for(var i=0;i<obj.length;i++){
					var item=obj[i];
					var time=window.format.timeStaticFormat(item.generateTime);
					item.generateTime2=time;
				}
				drawLine(pid,obj);
			}
		}});
	}	
    return {
    	loadRemoteData:loadRemoteData,
    	createView:createView
    };
});


