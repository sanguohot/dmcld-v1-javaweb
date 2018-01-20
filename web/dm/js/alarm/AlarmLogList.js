define(["bootstrap-table","dev-fun",'text!html/alarm/AlarmLog.html'
        ,'text!html/field/checkbox.html',"text!html/DateTimeRow.html","text!html/SearchRow.html"
        ,"alarm-log-column","alarm-log-win"]
        ,function (bt,dfun,alarmLog,checkbox,datetime,searchRow,column,win){
	function createColEvents(pid,id){
	    var view=function (e, value, row, index) {
	    	  if(row.neUuid && row.domainUuid){
			      var params={neUuid:row.neUuid,dstDomainUuid:row.domainUuid};
			      require(["dev-panel"], function (panel){
			        panel.loadRemoteData(pid,pid+"_form",params);
			      });
	    	  }else{
	    		  window.tip.show_pk("info",null,window.lc.getValue("notDevAlarm"));
	    	  }
	    };
	    var remote=function (e, value, row, index) {
	    	dfun.doRemoteWeb(row.neSn,row.neUuid,row.domainUuid);
	    };
	    var all=function (e, value, row, index) {
	    	
	    	win.createView(row.neUuid,column,row);
	    };
	    window.operateEvents = {
	        'click a[action=view]':view,
	        'click a[action=remote]':remote,
	        'click a[action=all]':all
	    };
  }
	function createView(pid){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    var searchRowFn = window.dot.template(searchRow);
	    var searchRowField=searchRowFn({pid:pid,lan:{placeholder:window.lc.getValue("sipAccount")}});
	    var datetimeFn = window.dot.template(datetime);
	    var datetimeField=datetimeFn({lan:{fromTime:window.lc.getValue("fromTime")
    		,toTime:window.lc.getValue("toTime")
    		,today:window.lc.getValue("today")
    		,last3Day:window.lc.getValue("last3Day")
    		,last7Day:window.lc.getValue("last7Day")
    		,lastMonth:window.lc.getValue("lastMonth")}});
	    var checkboxFn = window.dot.template(checkbox);
	    var alarmLevelField=checkboxFn({label:window.lc.getValue("alarmLevel"),name:'alarmLevelList',list:[{value:"0",text:window.lc.getValue("alarmLevel",0)}
		,{value:"1",text:window.lc.getValue("alarmLevel",1)},{value:"2",text:window.lc.getValue("alarmLevel",2)}
		,{value:"3",text:window.lc.getValue("alarmLevel",3)},{value:"4",text:window.lc.getValue("alarmLevel",4)}
			,{value:"6",text:window.lc.getValue("alarmLevel",6)}
		]});
	    var alarmTypeField=checkboxFn({label:window.lc.getValue("alarmType"),name:'alarmTypeList',list:[{value:"1",text:window.lc.getValue("alarmType",1)}
		,{value:"2",text:window.lc.getValue("alarmType",2)},{value:"3",text:window.lc.getValue("alarmType",3)}]});
	    var alarmAlarmTypeField=checkboxFn({label:window.lc.getValue("alarmObject"),name:'alarmAlarmTypeList',list:[{value:"1",text:window.lc.getValue("alarmAlarmType",1)}
		,{value:"3",text:window.lc.getValue("alarmAlarmType",3)},{value:"4",text:window.lc.getValue("alarmAlarmType",4)}
		,{value:"2",text:window.lc.getValue("alarmAlarmType",2)}]});
	    var lan={searchCondition:window.lc.getValue("searchCondition")
	    		,searchResult:window.lc.getValue("searchResult")};
	    var tempFn = window.dot.template(alarmLog);
	    var html=tempFn({pid:pid,searchRowField:searchRowField,datetimeField:datetimeField,alarmLevelField:alarmLevelField
	    	,lan:lan,alarmAlarmTypeField:alarmAlarmTypeField,alarmTypeField:alarmTypeField});
	    pn.html(html);
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
			toFirst(pid);
		});
	    $('#operate-sel').chosen({width:'85%',allow_single_deselect:true});
	    $('#object-type-sel').chosen({width:'85%',allow_single_deselect:true});
	    createList(pid);
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

		$('#'+pid+' input[type=checkbox]').bind("click",function(){
			toFirst(pid);
		});
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
					toFirst(pid);
				}
			}
		});
		$("#"+pid+"_search_bt").bind("click",function(){
			toFirst(pid);
		});
        $("#"+pid+"_search_input").bind('keypress',function(event){
            if(event.keyCode == "13")    
            {
            	toFirst(pid);
            }
        });
        $("#"+pid+"_search_clear").bind("click",function(){
        	$("#"+pid+"_search_input").val("");
        	toFirst(pid);
        })
	}
	function toFirst(pid){
		var id=pid+"_list";
		$('#'+id).bootstrapTable("selectPage",1);
	}
	function createList(pid){
		var id=pid+"_list";
		createColEvents(pid,id);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "alarmLogManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.total){					
					obj["rows"]=res.alarmList;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;					
				}
				return obj;
			},
			queryParams:function(p){
				var params="";
				params+="&domainUuid="+window.global.getDomainUuid();
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				var str=window.global.getCheckboxParams(pid,"alarmLevelList");
				if(str){
					params+=str;
				}
				var str=window.global.getCheckboxParams(pid,"alarmTypeList");
				if(str){
					params+=str;
				}
				var str=window.global.getCheckboxParams(pid,"alarmAlarmTypeList");
				if(str){
					params+=str;
				}
				var fromTime=$("#"+pid+" input[name=fromTime]").val();
				var toTime=$("#"+pid+" input[name=toTime]").val();
				if(fromTime){
					console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
					params+="&fromTime="+window.format.browseToUtc(fromTime);
				}
				if(toTime){
					console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
					params+="&toTime="+window.format.browseToUtc(toTime);
				}
				if(p.search){
					params+="&search="+p.search;
				}
				params+="&sip="+$("#"+pid+"_search_input").val();
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 5,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [5,10,25,50],
			search: true,
			searchOnEnterKey:true,
			showColumns: true,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: column.getColumn(true,false)
		});
		var cid=id;
	    $('#'+cid).on('post-body.bs.table', function () {
	    	window.list.changeForAce(pid,cid,600);
	    	$('#'+cid+' [data-rel=tooltip]').tooltip();
	    })
		$(window).resize(function () {
			window.list.changeView(pid,cid,600);
		});
	}
	
    return {
    	createList:createList,
    	createView:createView
    };
});


