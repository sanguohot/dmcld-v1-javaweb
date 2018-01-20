define(['text!html/modal.html'],function (modal){
	function createView(neUuid,column,row){
		if(!neUuid){
			return;
		}
		var id="alarm-log-win-list",pid="alarm-log-win";
		var pn=$("#myModal");
		if(!pn) return;
		var body="<div id='"+pid+"'><table id='"+id+"'></table></div>";
		var obj={
			title:window.lc.getValue("alarmLog"),
			body:body,
			close:window.lc.getValue("close"),
			commit:false
		};
 	    var tempFn = window.dot.template(modal);
	    var html = tempFn(obj);
		
		pn.html(html);
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		createList(pid,id,neUuid,column,row);
	}
	function createList(pid,cid,neUuid,column,row){
		$('#'+cid).bootstrapTable({
			method: 'get',
			url: "alarmLogManager!getList.action",
			cache: false,
//			height: 400,
			responseHandler:function(res){
			console.log(res.alarmList)
				return {rows:res.alarmList};
			},
			queryParams:function(p){
				return {neUuid:neUuid,domainUuid:row.domainUuid};
			},
			striped: true,
			toolbar:"#"+cid+"-toolbar",
//			pagination: true,
//			pageSize: 10,
	//		pageNumber:1,
			sidePagination: "server",
	//		pageList: [10,25],
//			search: true,
//			searchOnEnterKey:true,
//			showColumns: true,
			showExport:true,
			showRefresh: true,
//			queryParamsType:'limit',
//			sidePagination: "server",
//			showToggle:true,
//			smartDisplay:true,
			minimumCountColumns: 2,
//			clickToSelect: true,
			columns: column.getColumn(false,false)
		});
		window.list.changeForAce(pid);
//		$(window).resize(function () {
//			window.list.changeView(pid,cid,600);
//		});
//		window.list.changeView(pid,cid,600);
	}
	
    return {
    	createView:createView
    };
});


