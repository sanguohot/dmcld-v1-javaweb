define(["bootstrap-table","alarm-fun","pri-pri"],function (bt,fun,pri){
	function createColEvents(pid,id){
	    var set=function (e, value, row, index) {
	    	
	    	fun.setCallRule(pid,id,[row]);
			
	    };
	    var clock=function (e, value, row, index) {
	    	
	    	fun.setTimeZone(pid,id,[row]);
			
	    };
	    var alarmApi=function (e, value, row, index) {
	    	
	    	fun.setAlarmApi(pid,id,[row]);
			
	    };
	    window.operateEvents = {
	        'click a[action=set]':set,
	        'click a[action=clock]':clock,
	        'click a[action=alarmApi]':alarmApi
	    };
	}
	function createList(pid){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='';
		var id=pid+"-list";
		createColEvents(pid,id);
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		html+='<button name="set" style="display:'+window.global.getClass("modifyDevice")+'"  type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("set")+'"><i class="fa fa-pencil bigger-130"></i>'+window.lc.getValue("set")+'</button>';
		html+='<button name="clock" style="display:'+window.global.getClass("modifyDevice")+'"  type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("timeZone")+'"><i class="fa fa-clock-o bigger-130"></i>'+window.lc.getValue("timeZone")+'</button>';
		html+='<button name="alarmApi" style="display:'+window.global.getClass("modifyDevice")+'"  type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("alarmApi")+'"><i class="fa fa-toggle-on bigger-130"></i>'+window.lc.getValue("alarmApi")+'</button>';
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "domainListManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.domainList){
					obj["rows"]=res.domainList;
					obj.total=res["maxTotal"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				var params={domainUuid:window.global.getDomainUuid()};
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
		        field: 'state',
		        checkbox: true,
		        cardVisible:false
			},{
				field: 'name',
				title: window.lc.getValue("name"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'callSwitch',
				title: window.lc.getValue("callSwitch"),
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){
					if(value==1){
						var cls="label label-success";
						ret='<span class="'+cls+'">'+window.lc.getValue("open")+'</span>';
						return ret;
					}else{
						var cls="label label-danger";
						ret='<span class="'+cls+'">'+window.lc.getValue("close")+'</span>';
						return ret;
					}
	        	}
			},{
				field: 'asrThreshold',
				title: window.lc.getValue("asrThreshold"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'capsThreshold',
				title: window.lc.getValue("capsThreshold"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'localTimeZone',
				title: window.lc.getValue("timeZone"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					return window.lc.getTimeZoneText(value);
	        	}
			},{
				field: 'alarmApiSwitch',
				title: window.lc.getValue("alarmApiSwitch"),
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){
					if(value==1){
						var cls="label label-success";
						ret='<span class="'+cls+'">'+window.lc.getValue("open")+'</span>';
						return ret;
					}else{
						var cls="label label-danger";
						ret='<span class="'+cls+'">'+window.lc.getValue("close")+'</span>';
						return ret;
					}
	        	}
			},{
				field: 'alarmApiHost',
				title: window.lc.getValue("alarmApiHost"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'alarmApiPort',
				title: window.lc.getValue("alarmApiPort"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'alarmApiPath',
				title: window.lc.getValue("alarmApiPath"),
				align: 'center',
				valign: 'middle'
			},{
				field: '',
				title: window.lc.getValue("operate"),
				align: 'left',
				valign: 'middle',
				clickToSelect: true,
				formatter:function(value,row,index){
					var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
					var set='<a action="set" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					var clock='<a action="clock" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("timeZone")+'">'
					+'<i class="fa fa-clock-o bigger-130"></i>'
					+'</a>';
					var alarmSwitch='<a action="alarmApi" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("alarmApiSwitch")+'">'
					+'<i class="fa fa-toggle-on bigger-130"></i>'
					+'</a>';
					if(window.global.getClass("modifyDevice")=="inline-block" ){
					html+=set+clock+alarmSwitch;
					}
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">';
					   if(window.global.getClass("modifyDevice")=="inline-block" ){
					          tmp+='<li>'+set+'</li>'
						      tmp+='<li>'+clock+'</li>'
						      tmp+='<li>'+alarmSwitch+'</li>'
					   }
						    tmp+='</ul>'
						  +'</div>'
						+'</div>';
					tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
					html+=tmp;
	            
					return html;
	          	},
	          	events:operateEvents
	      }]
		});

	    $("#"+pid+" button[name=set]").bind('click',function(){
	    
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	fun.setCallRule(pid,id,rows);
			
	    });
	    $("#"+pid+" button[name=clock]").bind('click',function(){
	    	
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	fun.setTimeZone(pid,id,rows);
			
	    });
	    $("#"+pid+" button[name=alarmApi]").bind('click',function(){
	    	
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	fun.setAlarmApi(pid,id,rows);
			
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
        createList:createList
    };
});


