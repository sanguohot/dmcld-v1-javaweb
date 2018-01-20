define(["bootstrap-table","alarm-fun","pri-pri"],function (bt,fun,pri){
	function createColEvents(pid,id){
	    var set=function (e, value, row, index) {
	    	
	    	fun.setMan(pid,id,row);
			
	    };
	    var addToGrp=function (e, value, row, index) {
	    	
	    	fun.addToGrp(pid,id,[row]);
			
	    };
	    var del=function (e, value, row, index) {
	    	
			var cb=function(){
				fun.delMan(pid,id,[row]);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
	    };
	    window.operateEvents = {
	        'click a[action=set]':set,
	        'click a[action=add-to-grp]':addToGrp,
	        'click a[action=del]':del
	    };
	}
	function createList(pid,row){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='';
		var id=pid+"-list";
		createColEvents(pid,id);
//		var html='<h5 class="header smaller lighter red">CDR['+row.productSns+']<div style="float:right;" class="btn-group"><a class="btn btn-sm btn-warning" action="exchange"  title="切换视图为列表或者图表"><i class="fa fa-exchange bigger-120"></i>&nbsp;切换视图</a><a style="float:right;" class="btn btn-sm btn-success" action="search"  title="刷新"><i class="fa fa-refresh bigger-120"></i>&nbsp;刷新</a></div></h5>'
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		if(row){
			html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i>'+window.lc.getValue("back")+'</button>';
		}
		if(!row){
			html+='<button name="add-man" style="display:'+window.global.getClass("addDevice")+'" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("addMan")+'"><i class="fa fa-user-plus bigger-130"></i>'+window.lc.getValue("addMan")+'</button>';
			html+='<button name="add-to-grp" style="display:'+window.global.getClass("addDevice")+'" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("addToGrp")+'"><i class="fa fa-sitemap bigger-130"></i>'+window.lc.getValue("addToGrp")+'</button>';
			html+='<button name="del" style="display:'+window.global.getClass("deleteDevice")+'" type="button" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i>'+window.lc.getValue("del")+'</button>';
		}
		
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		var grp=row;
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "alarmManManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.manList){					
					obj["rows"]=res.manList;
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
				if(row){
					params["grpUuid"]=row.uuid;
				}

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
				field: 'email',
				title: window.lc.getValue("email"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'grpList',
				title: window.lc.getValue("alarmGrp"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(value){
						var ret="";
						for(var i=0;i<value.length;i++){
							if(ret!=""){
								ret+=",";
							}
							ret+=value[i].name;
						}
						return ret;
					}
					return "-";
	        	},
	        	cellStyle:function(value,row,index){
	        		return {
	    			    css: {"min-width": "120px","max-width": "300px","word-break":"break-all"}
	    			};
	        	}
			},window.list.getCreateTime(),{
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
					var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
					var set='<a action="set" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					var addToGrp='<a action="add-to-grp" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("addToGrp")+'">'
					+'<i class="fa fa-sitemap bigger-130"></i>'
					+'</a>';
					var del='<a action="del" class="red tooltip-error"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
					+'<i class="fa fa-remove bigger-130"></i>'
					+'</a>';
					if(window.global.getClass("modifyDevice")=="inline-block" ){
					html+=set;
					}
					if(!grp){
						if(window.global.getClass("deleteDevice")=="inline-block" ){
						html+=del;
						}
						if(window.global.getClass("addDevice")=="inline-block" ){
							html+=addToGrp;
						}
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
					}
						      if(!grp){
						    	  if(window.global.getClass("addDevice")=="inline-block" ){	
						    		  tmp+='<li>'+addToGrp+'</li>'
						    	  }
						    	  if(window.global.getClass("deleteDevice")=="inline-block" ){
							      tmp+='<li>'+del+'</li>' 
						    	  }
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
	    $("#"+pid+" button[name=back]").bind('click',function(){
	    	require(["alarm-grp"], function (log) {
		        log.createList(pid);
		      });
	    });
	    $("#"+pid+" button[name=del]").bind('click',function(){
	    	
	    	var rows=$('#'+id).bootstrapTable('getSelections');
			if(rows.length==0){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}
			var cb=function(){
				fun.delMan(pid,id,rows);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
	    });
	    $("#"+pid+" button[name=add-man]").bind('click',function(){
	    	
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	fun.addMan(pid,id,rows);
			
	    });
	    $("#"+pid+" button[name=add-to-grp]").bind('click',function(){
	    	
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	fun.addToGrp(pid,id,rows);
			
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


