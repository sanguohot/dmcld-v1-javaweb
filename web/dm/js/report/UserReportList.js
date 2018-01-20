define(["msg-fun","report-fun",'text!html/DateTimeRow.html','text!html/mes/recivied.html',"bootstrap-table",'theme-macarons'],function (msgFun,rfun,datetime,recivied){
	
	  
	
	function createListView(pid){
		  
		var id=pid+"_chart_list";
		var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		//html+='<button id="'+id+'-clear" type="submit" class="btn btn-sm btn-info" title="'+window.lc.getValue("cleanCdr")+'"><i class="fa fa-external-link"></i>'+window.lc.getValue("cleanCdr")+'</button>';
		html+='<button id="'+id+'-expt" name="export" type="button" class="btn btn-sm btn-success btn-info" title="'+window.lc.getValue("expt")+'"><i class="fa fa-cloud-download bigger-130"></i>'+window.lc.getValue("expt")+'</button>';
		html+='</div>';
		 html+='<table id='+id+'></table>';
		
		$("#"+pid+"_chart").html(html);
		
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "reportManager!getUserReportList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
			var obj={};
			
			if(res && res.tbluserReportList){	
				
				
				obj["rows"]=res.tbluserReportList;
				obj.total=res["total"];
			}else{
				obj["rows"]=[];
				obj.total=0;
			}
			return obj;
		},
			queryParams:function(p){
			
				var params={};
	           
				params["limit"]=p.limit;
				params["start"]=p.offset;
				
				
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
						toTime+=" 22:59:59";
					}
				 if(fromTime){
						console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
						params['fromTime']=window.format.browseToUtc(fromTime);
					}
					if(toTime){
						console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
						params['toTime']=window.format.browseToUtc(toTime);
					}
				if(p.search){
				params["fuzzySearch"]=p.search;
				}
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [10,20,50,100],
			search:false,
			showColumns: true,
			sortable: false,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [
	        	{
				field: 'createTime',
				title: window.lc.getValue("time"),
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
					return value.substring(0,10);
	        	},	
				
			},{
				field: 'domainNum',
				title: window.lc.getValue("domainNum"),
				align: 'center',
				valign: 'middle',
				
			},{
				field: 'userNum',
				title: window.lc.getValue("userNum"),
				align: 'center',
				valign: 'middle',
				
				
			},{
				field: 'loginUserNum',
				title: window.lc.getValue("loginUserNum"),
				align: 'center',
				valign: 'middle',
				
				
			},{
				field: 'localSysNum',
				title: window.lc.getValue("localSysNum"),
				align: 'center',
				valign: 'middle',
				
				
			}]
		});
		$('#'+id).on('post-body.bs.table', function () {
			$('#'+id+' [data-rel=tooltip]').tooltip();
			
		})
		$("#user_report button[name=refresh]").addClass("btn-info btn-sm");
		 $("#user_report button[name=toggle]").addClass("btn-info btn-sm");
		 $("#user_report button[data-toggle=dropdown]").addClass("btn-info btn-sm");
		
		$("#"+id+"-expt").click(function (){
			var params={};
			 var fromTime=$("#"+pid+" input[name=fromTime]").val();
				var toTime=$("#"+pid+" input[name=toTime]").val();
			 if(fromTime){
					console.log(fromTime+"===fromTime==="+window.format.browseToUtc(fromTime));
					params['fromTime']=window.format.browseToUtc(fromTime);
				}
				if(toTime){
					console.log(toTime+"===toTime==="+window.format.browseToUtc(toTime));
					params['toTime']=window.format.browseToUtc(toTime);
				}
			$.ajax({
				url:'reportManager!expUserReport.action',
				type:'post',
				data:params,
				complete:function(data){
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
					window.location.href="download/"+data.responseJSON["fileName"];
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
				}
				
			}
			})
		});
	}
	
	 return {
		 
		 createListView:createListView,
		  };
});