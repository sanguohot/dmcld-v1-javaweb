define(["dev-sch","bootstrap-table"],function (sch){
	function createListView(pid){
		var id=pid+"_chart_list";
		var html='<table id='+id+'></table>';
		$("#"+pid+"_chart").html(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "androidManager!getCallCalc.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.dmCall && res.dmCall.list){
					return res.dmCall.list;
				}else{
					return [];
				}
			},
			queryParams:function(p){
				var params={productSn:window.devCall.productSn,neUuid:window.devCall.neUuid,totalDot:1};
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
				field: 'totalCallCount',
				title: window.lc.getValue("totalCallCnt"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'curCallCount',
				title: window.lc.getValue("curCallCnt"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'totalSuccCount',
				title: window.lc.getValue("totalSucc"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'riseCallCnt',
				title: window.lc.getValue("riseCallCnt"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'riseCallFailCnt',
				title: window.lc.getValue("riseCallFailCnt"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'totalCallFailCnt',
				title: window.lc.getValue("totalCallFailCnt"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'totalCallMin',
				title: window.lc.getValue("totalCallMin"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'riseCallTime',
				title: window.lc.getValue("riseCallTime"),
				align: 'center',
				valign: 'middle'
//			},{
//				field: 'totalCallTime',
//				title: window.lc.getValue("totalCallTime"),
//				align: 'center',
//				valign: 'middle'
			},{
				field: 'acd',
				title: window.lc.getValue("acd"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'asr',
				title: window.lc.getValue("asr"),
				align: 'center',
				valign: 'middle'			
			},{
				field: 'curPstn',
				title: window.lc.getValue("curPstn"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'curSip',
				title: window.lc.getValue("curSip"),
				align: 'center',
				valign: 'middle'			
			},{
				field: 'capsIn',
				title: window.lc.getValue("capsIn"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'capsOut',
				title: window.lc.getValue("capsOut"),
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