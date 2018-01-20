define(["bootstrap-table","alarm-fun","pri-pri"],function (bt,fun,pri){
	function createColEvents(pid,id){
	    var man=function (e, value, row, index) {
	    	require(["alarm-man"], function (log) {
	    		log.createList(pid,row);
	    	});
	    };
	    var set=function (e, value, row, index) {
	    	
	    	fun.setGrp(pid,id,row);
			
	    };
	    var del=function (e, value, row, index) {
	    	
			var cb=function(){
				fun.delGrp(pid,id,[row]);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
	    };
	    window.operateEvents = {
	    	'click a[action=man]':man,
	        'click a[action=set]':set,
	        'click a[action=del]':del
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
//		var html='<h5 class="header smaller lighter red">CDR['+row.productSns+']<div style="float:right;" class="btn-group"><a class="btn btn-sm btn-warning" action="exchange"  title="切换视图为列表或者图表"><i class="fa fa-exchange bigger-120"></i>&nbsp;切换视图</a><a style="float:right;" class="btn btn-sm btn-success" action="search"  title="刷新"><i class="fa fa-refresh bigger-120"></i>&nbsp;刷新</a></div></h5>'
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		html+='<button name="add-grp" type="button" style="display:'+window.global.getClass("addDevice")+'" class="btn btn-sm btn-success" title="'+window.lc.getValue("addAlarmGrp")+'"><i class="fa fa-google-plus bigger-130"></i>'+window.lc.getValue("addAlarmGrp")+'</button>';
		html+='<button name="del" type="button" style="display:'+window.global.getClass("deleteDevice")+'" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i>'+window.lc.getValue("del")+'</button>';
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "alarmGrpManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.grpList){
					obj["rows"]=res.grpList;
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
			pageSize: 5,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [5,10,25,50,100],
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
				field: 'createTime',
				title: window.lc.getValue("createTime"),
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
				field: 'updateTime',
				title: window.lc.getValue("updateTime"),
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
				field: 'manName',
				title: window.lc.getValue("alarmManResp"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(!value){
						return "-";
					}
					return value;
	        	}
			},{
				field: 'detailDesc',
				title: window.lc.getValue("desc"),
				align: 'center',
				valign: 'middle'
			},{
				field: '',
				title: window.lc.getValue("operate"),
				align: 'left',
				valign: 'middle',
				clickToSelect: true,
				formatter:function(value,row,index){
					var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
					var man='<a action="man" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("alarmMan")+'">'
					+'<i class="fa fa-user bigger-130"></i>'
					+'</a>';
					var set='<a action="set" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					var del='<a action="del" class="red tooltip-error"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
					+'<i class="fa fa-remove bigger-130"></i>'
					+'</a>';
					if(window.global.getClass("modifyDevice")=="inline-block" ){
						html+=set;
						}
						
					if(window.global.getClass("deleteDevice")=="inline-block" ){
					   html+=del;
					  }
					if(window.global.getClass("addDevice")=="inline-block" ){
						html+=man;
					}
						
				
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
					    	if(window.global.getClass("modifyDevice")=="inline-block" ){
						        tmp+='<li>'+set+'</li>'
						    }
				    	    if(window.global.getClass("addDevice")=="inline-block" ){	
				    		  tmp+='<li>'+man+'</li>'
				    	     }
				    	   if(window.global.getClass("deleteDevice")=="inline-block" ){
					         tmp+='<li>'+del+'</li>' 
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
		$("#"+pid+" button[name=del]").bind('click',function(){
			
	    	var rows=$('#'+id).bootstrapTable('getSelections');
			if(rows.length==0){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}
			var cb=function(){
				fun.delGrp(pid,id,rows);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
	    });
	    $("#"+pid+" button[name=add-grp]").bind('click',function(){
	    	
	    	fun.addGrp(pid,id);
			
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


