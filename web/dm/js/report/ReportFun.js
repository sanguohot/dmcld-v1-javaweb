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
		        		if(pid=="user_report"){
		        			if(obj && obj.tbluserReportList.length && obj.tbluserReportList){
				                for (var i = obj.tbluserReportList.length-1; i>=0; i--) {
				                	var time=obj.tbluserReportList[i]["createTime2"];
				                	
				                	if(time){
				                		var td=window.format.getDate(time);
				                		list.push(td.format(window.format.getDateTimeFormat(ft,tt)).substring(0,5));
				                	}
				                }
			                }
		        		}else if(pid=="dev_report_list"){
		        			if(obj && obj.tblDevReportList.length && obj.tblDevReportList){
				                for (var i = obj.tblDevReportList.length-1; i>=0; i--) {
				                	var time=obj.tblDevReportList[i]["createTime2"];
				                	if(time){
				                		var td=window.format.getDate(time);
				                		list.push(td.format(window.format.getDateTimeFormat(ft,tt)).substring(0,5));
				                	}
				                }
			                }
		        		}else if(pid=="alarm_report"){
		        			
		        			if(obj && obj.tblAlarmReportList.length && obj.tblAlarmReportList){
				                for (var i = obj.tblAlarmReportList.length-1; i>=0; i--) {
				                	var time=obj.tblAlarmReportList[i]["createTime2"];
				                	if(time){
				                		var td=window.format.getDate(time);
				                		list.push(td.format(window.format.getDateTimeFormat(ft,tt)).substring(0,5));
				                	}
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
		                if(pid=="user_report"){
		                	if(obj && obj.tbluserReportList.length && obj.tbluserReportList){
			                	for (var i = obj.tbluserReportList.length-1; i>=0; i--) {
				                    list.push(obj.tbluserReportList[i][name]);
				                }
			                }
		                }else if(pid=="dev_report_list"){
		                	if(obj && obj.tblDevReportList.length && obj.tblDevReportList){
			                	for (var i = obj.tblDevReportList.length-1; i>=0; i--) {
				                    list.push(obj.tblDevReportList[i][name]);
				                }
			                }
		                }else if(pid=="alarm_report"){
		                if(obj && obj.tblAlarmReportList.length && obj.tblAlarmReportList){
		                	for (var i = obj.tblAlarmReportList.length-1; i>=0; i--) {
			                    list.push(obj.tblAlarmReportList[i][name]);
			                }
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
	
	function getChartItemHtml(pid,id){
		var cid=pid+"_chart";
		var index=id.substring(cid.length+1);
		if(pid=="user_report"){
		var isBig=window.userReport.isBig;
		}else if(pid=="dev_report_list"){
			var isBig=window.devReport.isBig;
		}else if(pid=="alarm_report"){
			var isBig=window.alarmReport.isBig;	
		}
		var str=isBig?window.lc.getValue("backSmall"):window.lc.getValue("viewBig");
		var fa=isBig?"fa-reply":"fa-search-plus";
		var col=isBig?"col-md-12":"col-md-6";
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
	function strDateTime(fromTime,toTime) { 
	  var flag=true;
	  if(fromTime){
		if(!/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(fromTime)){
			flag=false;
			return flag;
		} 
	  }
	  if(toTime){
		if(!/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(toTime)){
			flag=false;
			return flag;
		 }
	  }
	return flag;
	} 
	
	return {
		getChartItemHtml:getChartItemHtml,
		createCallPerChart:createCallPerChart,
		strDateTime:strDateTime
	}
	
})