define(["bootstrap-table","dev-report-fun",'text!html/dev/DevReport.html',"text!html/DateTimeRow.html","dev-report-field"],function (bt,fun,report,datetime,field){
	function createView(pid,row,type){
		pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    var id=pid+"-list";
	    var datetimeFn = window.dot.template(datetime);
	    var datetimeField=datetimeFn({lan:{fromTime:window.lc.getValue("fromTime")
    		,toTime:window.lc.getValue("toTime")
    		,today:window.lc.getValue("today")
    		,last3Day:window.lc.getValue("last3Day")
    		,last7Day:window.lc.getValue("last7Day")
    		,lastMonth:window.lc.getValue("lastMonth")}});
	    var lan={searchCondition:window.lc.getValue("searchCondition")
	    		,searchResult:window.lc.getValue("searchResult"),expt:window.lc.getValue("expt")};
	    var tempFn = window.dot.template(report);
	    var html=tempFn({pid:pid,id:id,datetimeField:datetimeField,lan:lan,type:type});
	    pn.html(html);
	    $('#'+pid+' .form_datetime').datetimepicker({
	        language:'zh-CN',
			format:'yyyy-mm-dd 00:00:00',
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
			toFirst(pid);
		});
	    createList(pid,row,type);
	    listen(pid);
	}
	function listen(pid){
		$(".form_datetime .input-group-addon").hover(function(){
			$(this).css("background-color","#c7c7c7");
		},function(){
			$(this).css("background-color","#eeeeee");	
		});
		$('.input-group-addon').bind("click",function(){
			var child=$(this).find(".glyphicon-remove");
			if(child){
				$(this).parent().find("input.form-control").val("");
				toFirst(pid);
			}	
		})

		$('#'+pid+' button[name=time]').bind("click",function(){
			var n=$(this);
			var val=n.attr("value");
			if(val){
				var obj=window.global.getDateObj(val);
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
					toFirst(pid);
				}
			}
		});
	}
	function doRefresh(pid){
		var id=pid+"-list";
		$('#'+id).bootstrapTable("refresh");
	}
	function toFirst(pid){
		var id=pid+"-list";
		$('#'+id).bootstrapTable("selectPage",1);
	}
	function createList(pid,row,type){
		var id=pid+"-list";
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "devReportManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.rl){					
					obj["rows"]=res.rl;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				return fun.getQueryParams(pid,id,p,row,type);
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 5,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [5,10,25,50,100],
//			search: true,
			showColumns: true,
			sortable: false,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: field.getColumn(type)
		});
	    $("#"+pid+" button[name=expt]").bind('click',function(){
	    	fun.exportReport(pid,id,row,type);
	    });
	    
	    $('#'+id).on('post-body.bs.table', function () {
	    	$('#'+id+' [data-rel=tooltip]').tooltip();
	    	window.list.changeForAce(pid);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}

    return {
        createList:createList,
        createView:createView,
        doRefresh:doRefresh
    };
});


