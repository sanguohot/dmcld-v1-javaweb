define(["bootstrap-table","alarm-fun"],function (bt,fun){
	function createList(pid,row){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='';
		var id=pid+"-list";
//		var html='<h5 class="header smaller lighter red">CDR['+row.productSns+']<div style="float:right;" class="btn-group"><a class="btn btn-sm btn-warning" action="exchange" href="#" title="切换视图为列表或者图表"><i class="fa fa-exchange bigger-120"></i>&nbsp;切换视图</a><a style="float:right;" class="btn btn-sm btn-success" action="search" href="#" title="刷新"><i class="fa fa-refresh bigger-120"></i>&nbsp;刷新</a></div></h5>'
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		if(row){
			html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i>'+window.lc.getValue("back")+'</button>';
		}
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "alarmAttrManager!getAlarmAll.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.alarmAttrList){					
					obj["rows"]=res.alarmAttrList;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				var params={domainUuid:window.global.getDomainUuid()};
				if(row){
					params["alarmLevel"]=row.alarmLevel;
					if(row.alarmId){
						params["alarmId"]=row.alarmId;
					}
				}else{
					params["alarmLevel"]=-1;
				}
				
				params["limit"]=p.limit;
				params["start"]=p.offset;
				if(p.search)
				params["search"]=p.search;
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [10,25,50,100],
			search: true,
			showColumns: true,
			sortable: false,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [{
				field: 'uuid',
				title: window.lc.getValue("alarmId"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'alarmName',
				title: window.lc.getValue("alarmName"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'alarmLevel',
				title: window.lc.getValue("alarmLevel"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
		          var t=window.lc.getValue("alarmLevel",value);
		          var ret=t;
		          var cls="";
		          if(value==0){
		        	  cls="label label-danger";
		          }else if(value==1 || value==2 || value==3 || value==4){
		        	  cls="label label-warning";
		          }else{
		        	  cls="label label-info";
		          }
		          ret='<span class="'+cls+'">'+t+'</span>';
		          return ret;
	        	}
			},{
				field: 'jitterSec',
				title: window.lc.getValue("jitterSec"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'desc',
				title: window.lc.getValue("alarmDesc"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(window.lc.isEn()){
						return row.alarmDesc;
					}
					return row.alarmDescCn
	        	}
			}]
		});
	    $("#"+pid+" button[name=back]").bind('click',function(){
	    	require(["alarm-rule"], function (log) {
		        log.createList(pid);
		      });
	    });
	    
	    $('#'+id).on('post-body.bs.table', function () {
	    	window.list.changeForAce(pid);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}
	
    return {
        createList:createList
    };
});


