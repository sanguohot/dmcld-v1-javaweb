define(["dev-sch",'dev-fun','dev-call-fun','dev-report-charts','dev-report-list1'

        ,'text!html/dev/NoData.html','text!html/DateTimeRow3.html','report-fun'],function (sch,fun,cfun,chart,list,ndTpl,datetime,rfun){	

	function getHtml(pid){
	    var datetimeFn = window.dot.template(datetime);
	    var datetimeField=datetimeFn({lan:{fromTime:window.lc.getValue("fromTime")
    	    ,toTime:window.lc.getValue("toTime")
    		//,today:window.lc.getValue("today")
    		,last3Day:window.lc.getValue("last3Day")
    		,last7Day:window.lc.getValue("last7Day")
    		,lastMonth:window.lc.getValue("lastMonth")}});
		var cid=pid+"_chart";
		var lid=pid+"_list";
		var fid=pid+"_form";
		var lpid=pid+"_plist";
		
		var html='<form id="'+fid+'" role="form">'		
		html+='<div class="container-fluid my-tab" style="border-bottom-width:0;padding-top:0;padding-bottom:0;">';
		html+='<h5 class="header smaller lighter red">'+window.lan["devReport"]
		html+='<div style="float:right;" class="btn-group">';
		
		html+='<a  class="btn btn-sm btn-warning" action="exchange"  title="'+window.lc.getValue("listChartChange")+'"><i class="fa fa-exchange bigger-120"></i>&nbsp;'+window.lc.getValue("changeView")+'</a>';
		html+='<a style="float:right;" class="btn btn-sm btn-success" action="search"  title="'+window.lc.getValue("refresh")+'"><i class="fa fa-refresh bigger-120"></i>&nbsp;'+window.lc.getValue("refresh")+'</a>';
		html+='</div>'
		html+='</h5>'		
		html+='<div class="row" >'
		+'<div class="col-md-12" style="padding-left:0px;padding-right:0px;">';		
//		html+=window.field.getRadioField("groupTime","hour","",[{text:window.lc.getValue("lastHour"),value:"hour",style:"padding-left:0px;"}
//		,{text:window.lc.getValue("lastDay"),value:"day"},{text:window.lc.getValue("lastWeek"),value:"week"}]);
		html+=datetimeField;
		html+='</div>';
		html+='</div>';
		html+='</div>';
		
		html+='<div class="container-fluid my-tab" style="border-top-width:0;padding-top:0;padding-bottom:0;">'
		html+='<h5 class="header smaller lighter red">'+window.lc.getValue("detailView")+'</h5>';
		html+='<div id="'+cid+'">';
		html+='</div>';				
		+'</div>'
		+'</form>';
		return html;
		
		
	}
	function exchange(pid){
		if(window.devReport.view=="chart"){
			window.devReport.view="list";
		}else if(window.devReport.view=="list"){
			window.devReport.view="chart";
		}
		refresh(pid);
	}
	function createView(pid){
		var fid=pid+"_form";
		var html=getHtml(pid);
		var pn=$("#"+pid);
		pn.html("");
		pn.append(html);
		//$("#"+pid+" input[name=fromTime]").attr("disabled",true)
		loadRemoteData(pid);
		
		$("#"+fid+" a[action=exchange]").bind("click",function(){
			exchange(pid);			
		});
		$("#"+fid+" a[action=search]").bind("click",function(){
			refresh(pid);
		});
		$(document).keydown(function(event){ 
			if(event.keyCode == 13){
				refresh(pid);
			}
		})

		
	}

	function refresh(pid){
		if(window.devReport.view=="chart"){
			loadRemoteData(pid);
		}else if(window.devReport.view=="list"){
			list.createListView(pid);
		}
	}
	function listen(pid){
		$('#'+pid+' .form_datetime').datetimepicker({
	        language:'zh-CN',
			format:'yyyy-mm-dd',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			minView:2,
//			pickerPosition:'bottom-left',
			maxView:2,
			startView: 2,
	        showMeridian: 1
	    }).on('changeDate', function(ev){
	    	refresh(pid);
		});
		$(".form_datetime .input-group-addon").hover(function(){
			$(this).css("background-color","#c7c7c7");
		},function(){
			$(this).css("background-color","#eeeeee");	
		});
		$('.input-group-addon').bind("click",function(){
			var child=$(this).find(".glyphicon-remove");
			if(child){
				$(this).parent().find("input.form-control").val("");
				refresh(pid);
			}	
		})

		$('#'+pid+' button[name=time]').bind("click",function(){
			var n=$(this);
			var val=n.attr("value");
			if(val){
				var obj=window.global.getTimeObj(val);
				var flag=0;
				if(obj.fromTime){
					$("#"+pid+" input[name=fromTime]").val(obj.fromTime.substring(0,10));
					flag=1;
				}
				if(obj.toTime){
					$("#"+pid+" input[name=toTime]").val(obj.toTime.substring(0,10));
					flag=1;
				}
				if(flag){
					refresh(pid);
				}
			}
		});
	}
	function createDevReport(pid){
		window.devReport={view:'chart'};
		createView(pid);
		listen(pid);
		//$("#"+pid+" button[value=hour]").trigger("click");
	}
	function loadLocalData(pid,obj){
		chart.createChart(pid,obj);
	}
	function loadRemoteData(pid){
		//var params={productSn:window.devCall.productSn,neUuid:window.devCall.neUuid};
		//params.mainSearch=$('#dev_tag').val();
		//params.upSearch=sch.getSchPara();
		var params={};
		var fromTime=$("#"+pid+" input[name=fromTime]").val();
		var toTime=$("#"+pid+" input[name=toTime]").val();
		if(!rfun.strDateTime(fromTime,toTime)){
			window.tip.show_pk("warning",null,window.lc.getValue("timeFormatError"));
			return;
		}
		if(fromTime){
			fromTime+=" 00:00:00";
		}
		if(toTime){
			toTime+=" 22:59:00";
		}
		if(fromTime){
			console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
			params.fromTime=window.format.browseToUtc(fromTime);
		}
		if(toTime){
			console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
			params.toTime=window.format.browseToUtc(toTime);
		}
		params.charts=1;
		//window.global.getTreePara(params);
		var cid=pid+"_chart";		
		$("#"+cid).html(fun.getLoadHtml());
		 $.ajax({ 
			 url: "reportManager!getDevReportList.action", 
			 data:params,
			 complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON;
				//缓存远端设备统计数据
				
				if(obj  && obj.tblDevReportList.length){
					for(var i=0;i<obj.tblDevReportList.length;i++){
						var item=obj.tblDevReportList[i];
						var time=item.createTime;
						item.createTime2=time;
					}
				}
				if(!obj  || !obj.tblDevReportList.length){
				    var tempFn = window.dot.template(ndTpl);
				    var html=tempFn({info:window.lc.getValue("canNotFindData")});
					$("#"+cid).html(html);
				}else{
					loadLocalData(pid,obj);
				}
			}else{
				 var tempFn = window.dot.template(ndTpl);
				    var html=tempFn({info:window.lc.getValue("canNotFindData")});
					$("#"+cid).html(html);
			}
		}});
	}

    return {
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData,
		createView:createView,
		getHtml:getHtml,
		createDevReport:createDevReport
    };
});