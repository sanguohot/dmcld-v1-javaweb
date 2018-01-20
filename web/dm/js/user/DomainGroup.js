define(["bootstrap-table","domain-group-fun",'user-fun'],function (bt,fun,userFun){
	function createColEvents(pid,id){
	    var set=function (e, value, row, index) {
	    	fun.set(pid,id,row);
	    };
	    var user=function (e, value, row, index) {
	        require(["user-list"], function (user) {
	      	  user.createList(pid,row.uuid);
	        });
	    };
	    var del=function (e, value, row, index) {
			var cb=function(){
				fun.del(pid,id,[row]);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
	    };
	     var pri=function(e, value, row, index){
	    	 userFun.createPerHtmlList({grpUuid:row.uuid},pid);    	 
	     }
	    window.operateEvents = {
	        'click a[action=user]':user,
	        'click a[action=set]':set,
	        'click a[action=del]':del,
	        'click a[action=pri]':pri
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
		html+='<button name="add" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("add")+'"><i class="fa fa-google-plus bigger-130"></i>'+window.lc.getValue("add")+'</button>';
//		html+='<button name="set" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("set")+'"><i class="fa fa-sitemap bigger-130"></i>'+window.lc.getValue("set")+'</button>';
//		html+='<button name="del" type="button" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i>'+window.lc.getValue("del")+'</button>';
		
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		var grp=row;
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "domainGrpManager!getList02.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				if(!res.grpList || !res.grpList.length){
					return [];
				}
				return res.grpList;
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
			search: true,
			showColumns: true,
			sortable: false,
			showRefresh: true,
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: [{
		        field: 'state',
		        checkbox: true,
		        cardVisible:false
		    },{
				field: 'nameCn',
				title: window.lc.getValue("name"),
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
				if(value=="域编辑者"){
					return "role_domain_editor";
				}else if(value=="域操作者"){
					return "role_domain_operator";
				}else if(value=="域观察者"){
					return "role_domain_viewer";
					
				}
				return value;
			}
			},{
				field: 'typeStr',
				title: window.lc.getValue("type"),
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
				if(value=="用户自定义"){
					return window.lc.getValue('userDefined');
				}else if(value=='系统预定义'){
					return window.lc.getValue('sysCustom');
				}
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
					var man='<a action="user" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("user")+'">'
					+'<i class="fa fa-user bigger-130"></i>'
					+'</a>';
					var pri='<a action="pri" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("perView")+'">'
					+'<i class="fa fa-user-secret bigger-130"></i>'
					+'</a>';
					var set='<a action="set" class="green tooltip-success"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					var del='<a action="del" class="red tooltip-error"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
					+'<i class="fa fa-remove bigger-130"></i>'
					+'</a>';
					html+=man+pri;
					if(row.type==1){
						html+=set+del;
					}
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">';
							tmp+='<li>'+man+'</li>';
							tmp+='<li>'+pri+'</li>';
							if(row.type==1){
								tmp+='<li>'+set+'</li>';
								tmp+='<li>'+del+'</li>';
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
				fun.del(pid,id,rows);
			}
			window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
	    });
	    $("#"+pid+" button[name=add]").bind('click',function(){
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	fun.add(pid,id,rows);
	    });
	    $("#"+pid+" button[name=set]").bind('click',function(){
	    	var rows=$('#'+id).bootstrapTable('getSelections');
			if(rows.length==0){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}
	    	fun.set(pid,id,rows[0]);
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


