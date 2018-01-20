define(["bootstrap-table","alarm-fun","pri-pri"],function (bt,fun,pri){
	function createColEvents(pid,id){
	    var set=function (e, value, row, index) {
	    	
	    	fun.updateRule(pid,id,[row]);
			
	    };
	    var view=function (e, value, row, index) {
	    	
	    	require(["alarm-desc"], function (log) {
		        log.createList(pid,row);
		      });
	    };
	    var del=function (e, value, row, index) {
	    	
			var cb=function(){
				fun.delRule(pid,id,[row]);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
	    };
	    window.operateEvents = {
	        'click a[action=set]':set,
	        'click a[action=view]':view,
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
		html+='<button name="add" style="display:'+window.global.getClass("addDevice")+'" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("add")+'"><i class="fa fa-plus bigger-130"></i>'+window.lc.getValue("add")+'</button>';
		html+='<button name="set" style="display:'+window.global.getClass("modifyDevice")+'" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("set")+'"><i class="fa fa-pencil bigger-130"></i>'+window.lc.getValue("set")+'</button>';
		html+='<button name="del" style="display:'+window.global.getClass("deleteDevice")+'" type="button" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i>'+window.lc.getValue("del")+'</button>';
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "alarmPushRuleManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				var obj={};
				if(res && res.ruleList){
					obj["rows"]=res.ruleList;
					obj.total=res["maxTotal"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				var params={domainUuid:window.global.getDomainUuid()};
				params["alarmLevel"]=-1;
				params["limit"]=p.limit;
				params["start"]=p.offset;
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [10,25,50,100],
			search: false,
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
				field: 'ruleType',
				title: window.lc.getValue("ruleType"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(!value){
						return "-";
					}
					return window.lc.getValue("ruleType",value);
	        	}
			},{
				field: 'alarmLevel',
				title: window.lc.getValue("ruleDesc"),
				align: 'left',
				valign: 'middle',
			    formatter:function(value,row,index){
			        
			        var cls="#82af6f";
			        if(row.ruleType==5){
			        	var ret=window.lc.getValue("devType")+' = <font color="'+cls+'">'+window.lc.getValue("devType",row.alarmId)+'</font>';
			        	return ret;
			        }
			        if(value==0){
			        	cls="#d15b47";
			        }else if(value==1 || value==2 || value==3 || value==4){
			        	cls="#f89406";
			        }else{
			        	cls="#6fb3e0";
			        }
			        var t=window.lc.getValue("alarmLevel",value);
			        var ret=window.lc.getValue("alarmLevel")+' = <font color="'+cls+'">'+t+'</font>';
					if(row.ruleType==3){
						ret+="<br>"+window.lc.getValue("alarmName")+""+' = <font color="#82af6f">'+row.alarmName+'</font>';
					}
					return ret;
	        	}
			},{
				field: 'pushType',
				title: window.lc.getValue("pushType"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(!value){
						return "-";
					}
					return window.lc.getValue("pushType",value);
	        	}
			},{
				field: 'pushObject',
				title: window.lc.getValue("pushObject"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(row.alarmMan){
						return row.alarmMan.name;
					}else if(row.alarmGrp){
						return row.alarmGrp.name;
					}
					return "-";
	        	}
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
				field: '',
				title: window.lc.getValue("operate"),
				align: 'left',
				valign: 'middle',
				clickToSelect: true,
				formatter:function(value,row,index){
					var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
					var view='<a action="view" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("view")+'">'
					+'<i class="fa fa-search-plus bigger-130"></i>'
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
					if(row.ruleType!=5){
						html+=view;
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
				    	    
				    	   if(window.global.getClass("deleteDevice")=="inline-block" ){
					         tmp+='<li>'+del+'</li>' 
				    	   }
							if(row.ruleType!=5){
								tmp+='<li>'+view+'</li>';
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
	    	fun.updateRule(pid,id,rows);
			
	    });
	    $("#"+pid+" button[name=del]").bind('click',function(){
	    	
	    	var rows=$('#'+id).bootstrapTable('getSelections');
			if(rows.length==0){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}
			var cb=function(){
				fun.delRule(pid,id,rows);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
	    });
	    $("#"+pid+" button[name=add]").bind('click',function(){
	    	
	    	fun.addRule(pid,id);
			
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


