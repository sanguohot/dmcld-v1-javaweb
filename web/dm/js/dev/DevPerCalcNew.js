define(["dev-sch",'dev-fun','dev-per-chart','dev-per-list'
        ,'text!html/dev/NoData.html',"text!html/DateTimeRow2.html"],function (sch,fun,chart,list,ndTpl,datetime){	
	function getHtml(pid){
	    var datetimeFn = window.dot.template(datetime);
	    var datetimeField=datetimeFn({lan:{fromTime:window.lc.getValue("fromTime")
    		,toTime:window.lc.getValue("toTime")
    		,today:window.lc.getValue("today")
    		,last3Day:window.lc.getValue("last3Day")
    		,last7Day:window.lc.getValue("last7Day")
    		,hour:window.lc.getValue("hour")}});
		var cid=pid+"_chart";
		var lid=pid+"_list";
		var fid=pid+"_form";
		var lpid=pid+"_plist";
		var sn=window.devPer.productSn;
		var tmp=sn?(' ['+window.devPer.productSn+']'):"";
		var html='<form id="'+fid+'" role="form">'		
		html+='<div class="container-fluid my-tab" style="border-bottom-width:0;padding-top:0;padding-bottom:0;">';
		html+='<h5 class="header smaller lighter red">'+window.lan["perCalc"]+tmp
		html+='<div style="float:right;" class="btn-group">';
		if(pid!="dev_per_calc")
		html+='<a  class="btn btn-sm btn-info" action="back"  title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-120"></i>&nbsp;'+window.lc.getValue("back")+'</a>';
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
		if(window.devPer.view=="chart"){
			window.devPer.view="list";
		}else if(window.devPer.view=="list"){
			window.devPer.view="chart";
		}
		refresh(pid);
	}
	function createView(pid){
		var fid=pid+"_form";
		var html=getHtml(pid);
		var pn=$("#"+pid);
		pn.html("");
		pn.append(html);
		 
		$("#"+fid+" a[action=search]").bind("click",function(){
			refresh(pid);
		});
		$("#"+fid+" a[action=exchange]").bind("click",function(){
			exchange(pid);			
		});
		
		$("#"+fid+" a[action=back]").bind("click",function(){
			require(["dev-list"], function(grid) { 
				grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
			});	
		});
	}

	function refresh(pid){
		if(window.devPer.view=="chart"){
			loadRemoteData(pid);
		}else if(window.devPer.view=="list"){
			list.createListView(pid);
		}
	}
	function listen(pid){
		$('#'+pid+' .form_datetime').datetimepicker({
	        language:'zh-CN',
			format:'yyyy-mm-dd hh:ii:ss',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			minView:1,
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
					$("#"+pid+" input[name=fromTime]").val(obj.fromTime);
					flag=1;
				}
				if(obj.toTime){
					$("#"+pid+" input[name=toTime]").val(obj.toTime);
					flag=1;
				}
				if(flag){
					refresh(pid);
				}
			}
		});
	}
	function createPerCalc(pid,neUuid,productSn,domainUuid){
		window.devPer={productSn:productSn,neUuid:neUuid,view:'chart',domainUuid:domainUuid};
		createView(pid);
		listen(pid);
		$("#"+pid+" button[value=hour]").trigger("click");
	}
	function loadLocalData(pid,obj){
		chart.createChart(pid,obj);
	}
	function loadRemoteData(pid){
		var params={productSn:window.devPer.productSn,neUuid:window.devPer.neUuid,dstDomainUuid:window.devPer.domainUuid};
		params.mainSearch=$('#dev_tag').val();
		params.upSearch=sch.getSchPara();
		var fromTime=$("#"+pid+" input[name=fromTime]").val();
		var toTime=$("#"+pid+" input[name=toTime]").val();
		if(fromTime){
			console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
			params.fromTime=window.format.browseToUtc(fromTime);
		}
		if(toTime){
			console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
			params.toTime=window.format.browseToUtc(toTime);
		}
		window.global.getTreePara(params);
		var cid=pid+"_chart";		
		$("#"+cid).html(fun.getLoadHtml());
		 $.ajax({ url: "pmdNe15Manager!getPerCalc.action", data:params,complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON.pmdNeList;
				//缓存远端设备统计数据
				if(obj){
					window.devPer.data=obj;
				}else{
					window.devPer.data={};
				}
				if(obj && obj.length){
					for(var i=0;i<obj.length;i++){
						var item=obj[i];
						var time=window.format.timeStaticFormat(item.generateTime);
						item.generateTime2=time;
					}
				}
				if(!obj || !obj.length){
				    var tempFn = window.dot.template(ndTpl);
				    var html=tempFn({info:window.lc.getValue("canNotFindData")});
					$("#"+cid).html(html);
				}else{
					loadLocalData(pid,obj);
				}
			}
		}});
	}

    return {
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData,
		createView:createView,
		getHtml:getHtml,
		createPerCalc:createPerCalc
    };
});