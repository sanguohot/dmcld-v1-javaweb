define(["dev-tree","zone-fun","pri-pri","bootstrap-table"],function (tree,fun,pri){
	function createColEvents(pid,id){
	    var view=function (e, value, row, index) {
		      var params={zoneUuid:row.uuid};
//		      require(["dev-panel"], function (panel){
//		        panel.loadRemoteData(pid,pid+"_form",params);
//		      });
	    };
	    var set=function(e, value, row, index){
	    	
	    	fun.updateZone(pid,id,[row]);
		   	  
	    }
	    var del=function(e, value, row, index){
	    	
	    	   var cb=function(){
	    		fun.delZone(pid,id,[row]);
	    	    }
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);  
		   	 
	    }
	    window.operateEvents = {
	        'click a[action=view]':view,
	        'click a[action=del]':del,
	        'click a[action=set]':set
	    };
   }
	function createList(pid){
		var id=pid+"-list";
		createColEvents(pid,id);
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='';		
		var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		if(window.roleType.isDomainAdmin(window.user.roleId) || window.roleType.isSuper(window.user.roleId)){
			html+='<button name="add" type="button" class="btn btn-sm btn-info"><i class="fa fa-plus"></i>'+window.lc.getValue("add")+'</button>'
			html+='<button name="del" type="button" class="btn btn-sm btn-danger"><i class="fa fa-remove"></i>'+window.lc.getValue("del")+'</button>'
		}
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "zoneManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.zoneList){
					var obj={};
					obj["rows"]=res.zoneList;
					obj.total=res["total"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={};
	            window.global.getTreePara(params);
				params["limit"]=p.limit;
				params["start"]=p.offset;
				params["zoneUuid"]=0;
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
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
				field: 'name',
				title: window.lc.getValue("name"),
				align: 'center',
				valign: 'middle',
				sortable: true
			},{
				field: 'alias',
				title: window.lc.getValue("alias"),
				align: 'center',
				valign: 'middle',
				sortable: true
			}, {
				field: 'detailDesc',
				title: window.lc.getValue("desc"),
				align: 'center',
				valign: 'middle',
				sortable: true
			},{
	          field: '',
	          title: window.lc.getValue("operate"),
	          align: 'left',
	          valign: 'middle',
	          clickToSelect: true,
	          visible:(window.roleType.isDomainAdmin(window.user.roleId) || window.roleType.isSuper(window.user.roleId))?true:false,
	          formatter:function(value,row,index){
				var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
					var view='<a action="view" class="blue tooltip-info" href="#" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("view")+'">'
						+'<i class="fa fa-search-plus bigger-130"></i>'
						+'</a>';
		    		var del='<a action="del"  class="red tooltip-error" href="#" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
					+'<i class="fa fa-remove bigger-130"></i>'
					+'</a>';
					var set='<a action="set" class="green tooltip-success" href="#" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					if(window.roleType.isDomainAdmin(window.user.roleId) || window.roleType.isSuper(window.user.roleId))
						html+=del+set;
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
//						      +'<li>'+view+'</li>'
						    if(window.roleType.isDomainAdmin(window.user.roleId) || window.roleType.isSuper(window.user.roleId))
						    tmp+='<li>'+del+'</li>'+'<li>'+set+'</li>'
						    +'</ul>'
						  +'</div>'
						+'</div>';
					tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
					html+=tmp;
		    	  return html;
	          },
	          events:operateEvents
	      }]
		});

	    $('#'+id).on('post-body.bs.table', function () {
	    	$('#'+id+' [data-rel=tooltip]').tooltip();
	    	window.list.changeForAce(pid,id,600);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
		
		$("#"+pid+" button[name=add]").bind('click',function(){
			
			fun.addZone(pid,id);
		   	     
		});
		$("#"+pid+" button[name=del]").bind('click',function(){
			
			var rows=$('#'+id).bootstrapTable('getSelections');
			if(!rows || !rows.length){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}
	    	var cb=function(){
	    		fun.delZone(pid,id,rows);
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
		   	 
	    });
		
	}
	
    return {
        createList:createList
    };
});


