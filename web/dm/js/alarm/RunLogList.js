define(["bootstrap-table"],function (bt){
	function createList(pid){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    pn.html("");
	    var cid=pid+"_list";
	    var html='<table id='+cid+'></table>';
	    pn.append(html);
		
		var url="runLogManager!getList.action";
	    

		$('#'+cid).bootstrapTable({
			method: 'get',
			url: url,
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.logList){					
					obj["rows"]=res.logList;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				var params="";
				params+="&dstDomainUuid="+window.global.getDomainUuid();
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				if(p.search)
				params+="&search="+p.search;
				return params;
			},
			striped: true,
			toolbar:"#"+cid+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
			search: true,
			showColumns:true,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [{
				field: 'logSn',
				title: window.lc.getValue("sn"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'reportTime',
				title: window.lc.getValue("time"),
				align: 'center',
				valign: 'middle',
		          formatter:function(value,row,index){
		    	  		if(value){
		    	  			return window.format.timeStaticFormat(value);
		    	  		}
			          return "-";
			       }
			},{
				field: 'log',
				title: window.lc.getValue("content"),
				align: 'left',
				valign: 'middle'
			}]
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,cid,600);
		});
		window.list.changeView(pid,cid,600);
	}
    return {
    	createList:createList
    };
});


