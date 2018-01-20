define(["dev-sch"],function (sch){
	function getQueryParams(pid,id,p,row,type){
		var params={type:type,domainUuid:window.global.getDomainUuid(),search:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
		if(p){
			params["limit"]=p.limit;
			params["start"]=p.offset;
			if(p.search){
				params["search"]=p.search;
			}				
		}
		window.global.getTreePara(params);
		if(row){
			params["neUuid"]=row.uuid;
		}
		var fromTime=$("#"+pid+" input[name=fromTime]").val();
		var toTime=$("#"+pid+" input[name=toTime]").val();
		if(fromTime){
			params.fromTime=fromTime;
		}
		if(toTime){
			params.toTime=toTime;
		}
		return params;
	}
	function exportReport(pid,id,row,type){
		var rows=$('#'+id).bootstrapTable("getData");
		if(!rows || rows.length==0){
			window.tip.show_pk("info",null,window.lc.getValue("noRecords"));
			return;
		}
		var pa=window.devAlarm.params;
    	if(pid.indexOf("dev_alarm")>=0){
    		pa=null;
    	}
        var params=getQueryParams(pid,id,null,row,type);
		window.tip.show_pk("info",10,window.lc.getValue("exportingWait"),true);
		$.ajax({ 
			url: "devReportManager!exportReport.action",
			data:params,
			complete: function(data,str){
			window.tip.close_pk();
//			$('#'+id).bootstrapTable("refresh");
			$('#myModal button[name=close]').trigger("click");
			if(data.responseJSON && data.responseJSON.success){
				window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
				window.location.href="download/"+data.responseJSON["url"];
			}else{
				window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
			}
		}});	
	    
	}
    function createAjax(url,param,id){
    	$.ajax({
			url: url,
			data:param,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
    			$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					$('#'+id).bootstrapTable("refresh");
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
    }
    return {
    	getQueryParams:getQueryParams,
    	exportReport:exportReport
    };
});