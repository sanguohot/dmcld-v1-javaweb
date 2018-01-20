define(["dev-sch","bootstrap-table"],function (sch){
	function createListView(pid){
		var id=pid+"_chart_list";
		var html='<table id='+id+'></table>';
		$("#"+pid+"_chart").html(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "pmdNe15Manager!getPerCalc.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
			console.log(res);
				if(res && res.pmdNeList){
					return res.pmdNeList;
				}else{
					return [];
				}
			},
			queryParams:function(p){
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
				return params;
			},
			striped: true,
			pagination: true,
			sidePagination:'client',
			pageSize:5,
			pageList:[5,10, 25, 50, 100],
//			search: false,
//			showColumns: true,
			sortable: false,
//			showRefresh: true,
//			showToggle:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [{
				field: 'generateTime',
				title: window.lc.getValue("generateTime"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){					
					return window.format.timeStaticFormat(value);
	        	},
	        	cellStyle:function(value,row,index){
	        		return {
        			    css: {"min-width": "90px"}
        			};
	        	}
			},{
				field: 'neRegFailCnt',
				title: window.lc.getValue("regFailCnt"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'neRunTimelen',
				title: window.lc.getValue("neRunTime"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'recvPktCnt',
				title: window.lc.getValue("recvPkt"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'sendPktCnt',
				title: window.lc.getValue("sendPkt"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'recvLossCnt',
				title: window.lc.getValue("recvLoss"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'sendLossCnt',
				title: window.lc.getValue("sendLoss"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'recvTimeoutCnt',
				title: window.lc.getValue("recvTimeout"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'sendTimeoutCnt',
				title: window.lc.getValue("sendTimeout"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'curPingDelayMs',
				title: window.lc.getValue("curPingDelay"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'minPingDelayMs',
				title: window.lc.getValue("minPingDelay"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'maxPingDelayMs',
				title: window.lc.getValue("maxPingDelay"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'flashRdFailCount',
				title: window.lc.getValue("flashReadFailCnt"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'flashWtFailCount',
				title: window.lc.getValue("flashWriteFailCnt"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'memAllocFailCount',
				title: window.lc.getValue("memAllocFailCnt"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'curCpuUsage',
				title: window.lc.getValue("curCpuUsage"),
				align: 'center',
				valign: 'middle'
				
			}]
		});
	   
	    $('#'+id).on('post-body.bs.table', function () {
//	    	$('#'+id+' [data-rel=tooltip]').tooltip();
	    	window.list.changeForAce(pid,id,600);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}
    return {
		createListView:createListView
    };
});