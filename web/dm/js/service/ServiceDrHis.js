define(["service-tree","bootstrap-table"],function (tree){

	function createList(pid,id,obj){
		var data=[];
		if(obj && obj.list && obj.list.length){
			data=obj.list;
		}
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "",
			cache: false,
//			height: 300,
			responseHandler:function(res){
				if(res && res.devList){
					return res.devList;
				}
				return res;
			},
			data:data,
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
			pageList: [10, 25, 50, 100, 200],
			search: true,
			showColumns: true,
			showRefresh: true,
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [{
				field: 'generateTime',
				title: window.lc.getValue("time"),
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
			  		if(value){
			  			return window.format.timeStaticFormat(value);
			  		}
			  		return "---";
		     	}
			},{
				field: 'sessionsCount',
				title: window.lc.getValue("sessionCnt"),
				align: 'center',
				valign: 'middle',
				sortable: true
			},{
				field: 'filesCount',
				title: window.lc.getValue("fileCnt"),
				align: 'center',
				valign: 'middle',
				sortable: true,
			}, {
				field: 'recordingsSize',
				title: window.lc.getValue("diskUsed")+'(MB)',
				align: 'center',
				valign: 'middle',
				sortable: true,
			}],
			onClickRow: function (row) {

	        }
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
		window.list.changeView(pid,id,600);
	}

	function createChart(pid,id,obj,text,name){
		var myChart = echarts.init(document.getElementById(id)); 
		option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    title: {
				text: text,
				x:'center',
				y:'top',
		        textStyle:{
				    fontSize: 14,
//				    fontWeight: 'bolder',
				    color: '#707070'
				}
			},
//		    calculable : true,
		    dataZoom : {
		        show : true,
		        realtime : true,
		        start : 20,
		        end : 80
		    },
//		    legend: {
//		    	orient:'horizontal',
//		        data:['总呼叫数','总呼叫分钟','ACD','ASR']
//		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : function (){
		                var list = [];
		                if(obj && obj.length){
			                for (var i = obj.length-1; i>=0; i--) {
			                    list.push(obj[i]["generateTime"]);
			                }
		                }
		                return list;
		            }()
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:text,
		            type:'line',
		            data:function (){
		                var list = [];
		                if(obj && obj.length){
		                	for (var i = obj.length-1; i>=0; i--) {
			                    list.push(obj[i][name]);
			                }
		                }
		                return list;
		            }()
		        }
		    ]
		};
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function getHtml(pid){
		var cid=pid+"_chart";
		var lid=pid+"_list";
		var fid=pid+"_form";
		var lpid=pid+"_plist";
		var html='<form id="'+fid+'" role="form">'		
		+'<div class="container-fluid my-tab" >'
		+'<div class="row ">'
			+'<div class="col-md-12">'
			 +'<div class="btn-group">'
				+'<button type="button" name="refresh" class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>'
			+'</div>'
			+'</div>'
		+'</div>'
		+'</div>'
		+'<div class="container-fluid my-tab" >'
		+'<div class="row"><div class="col-md-12"><h4 ><label>'+window.lc.getValue("filter")+'</label></h4></div></div>'
		+'<div class="row">'
			+'<div class="col-md-6">'			
				+'<div class="form-group-sm">'				
				+'<label class="control-label">'+window.lc.getValue("fromTime")+'</label>'
				+'<div class="input-group date form_datetime" data-date="2013-09-16T05:25:07Z">'
                    +'<input name="fromTime" class="form-control" size="16" type="text" value="" readonly>'
                    +'<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>'
					+'<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>'
				+'</div>'
                +'</div>'
			+'</div>'
			+'<div class="col-md-6">'
				+'<div class="form-group-sm">'
				+'<label class="control-label">'+window.lc.getValue("toTime")+'</label>'
				+'<div class="input-group date form_datetime" data-date="2013-09-16T05:25:07Z">'				
                    +'<input name="toTime" class="form-control" size="16" type="text" value="" readonly>'
                    +'<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>'
					+'<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>'
                +'</div>'
				+'</div>'
			+'</div>'			
		+'</div>'
		+'</div>'
//		+'<div class="container-fluid my-tab" >'
//		+'<div class="row"><div class="col-md-12"><h4 ><label>概况</label></h4></div></div>'
//		+'<div class="row">'
//			+'<div class="col-md-3">'
//			+'<div class="form-group-sm">'
//				+'<label class="control-label">会话数</label>'
//				+'<input type="text" class="form-control display-text"  name="totalCallMin" value="" placeholder="">'
//			+'</div>'
//			+'</div>'
//			+'<div class="col-md-3">'
//			+'<div class="form-group-sm">'
//				+'<label class="control-label">文件数</label>'
//				+'<input type="text" class="form-control display-text"  name="totalCallCount" value="" placeholder="">'
//			+'</div>'
//			+'</div>'
//			+'<div class="col-md-3">'
//			+'<div class="form-group-sm">'
//				+'<label class="control-label">占用空间数</label>'
//				+'<input type="text" class="form-control display-text"  name="asr" value="" placeholder="">'
//			+'</div>'
//			+'</div>'		
//		+'</div>'		
//		+'</div>'
		+'<div class="container-fluid my-tab" >'
		+'<div class="row " style="padding:0">'
			+'<div class="col-md-12" style="padding:0">'
				+'<div id="'+cid+'_1'+'" style="height:300px;width:100%;margin-top:10px;"></div>'
			+'</div>'
			+'<div class="col-md-12" style="padding:0">'
				+'<div id="'+cid+'_2'+'" style="height:300px;width:100%;margin-top:26px;"></div>'
			+'</div>'
			+'<div class="col-md-12" style="padding:0">'
				+'<div id="'+cid+'_3'+'" style="height:300px;width:100%;margin-top:26px;"></div>'
			+'</div>'
		+'</div>'		
		+'</div>'		
//		+'<div class="container-fluid my-tab" >'
//		+'<div class="row ">'
//			+'<div id="'+lpid+'" class="col-md-12">'
//				+'<table id="'+lid+'"></table>'
//			+'</div>'
//		+'</div>'
//		+'</div>'
		
		+'</form>'
		return html;
	}
	function refreshCalc(pid,obj){
		var cid=pid+"_chart";
		var lid=pid+"_list";
		var fid=pid+"_form";
		var lpid=pid+"_plist";
		createChart(pid,cid+"_1",obj,window.lc.getValue("sessionCnt"),"sessionsCount");
		createChart(pid,cid+"_2",obj,window.lc.getValue("fileCnt"),"filesCount");
		createChart(pid,cid+"_3",obj,window.lc.getValue("diskUsed")+"(MB)","recordingsSize");
		var n=$("#"+lpid);
		n.html("");
		var html='<table id="'+lid+'"></table>';
		n.append(html);
	}
	function createPer(pid){
		var html=getHtml(pid);
		var pn=$("#"+pid);
		pn.html("");
		pn.append(html);
		var cid=pid+"_chart";
		var lid=pid+"_list";
		var fid=pid+"_form";
		$('#'+pid+' .form_datetime').datetimepicker({
	        language:'zh-CN',
			format:'yyyy-mm-dd hh:ii:ss',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
	        showMeridian: 1
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
			}	
		})
		$("#"+fid+" button[name=refresh]").bind("click",function(){
//			$('#'+lid).bootstrapTable("refresh");
			loadRemoteData(pid);
		});
	}
	function loadLocalData(pid,obj){
		refreshCalc(pid,obj);
	}
	function createCalc(pid){
		createPer(pid);
		loadRemoteData(pid);
	}
	function loadRemoteData(pid){
		var params={};
	    var domainUuid=window.global.getDomainUuid();
		params.mainSearch=$.trim($('#dev_tag').val());
		var fid=pid+"_form";
		var form=$("#"+fid);
		if(form){
			var fromTime=$("#"+fid+" input[name=fromTime]").val();
			var toTime=$("#"+fid+" input[name=toTime]").val();
			params["toTime"]=toTime;
			params["fromTime"]=fromTime;			
		}
		params["dstDomainUuid"]=domainUuid;
		 $.ajax({ url: "dmManager!getDrHis.action", data:params,complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var obj=data.responseJSON.drList;
				for(var i=0;i<obj.length;i++){
					var item=obj[i];
					var time=window.format.timeStaticFormat(item.generateTime);
					item.generateTime2=time;
				}
				loadLocalData(pid,obj);
			}
		}});
	}		
    return {
		createList:createList,
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData,
		createPer:createPer,
		createChart:createChart,
		getHtml:getHtml,
		createCalc:createCalc,
		refreshCalc:refreshCalc
    };
});


