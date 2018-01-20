define(["bootstrap-table","form-field",'lan-con'],function (bt,field,lan){
	
	
	
	function createList(pid){
		 pn=$("#"+pid);
		    if(!pn){
		      return;
		    }
		    var lid=pid+"_list";
		    pn.html("");
		    var html='<div id="'+lid+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
		    var domainUuid=window.global.getDomainUuid();
//		    if(domainUuid){
		    
			   // html+='<button id="'+lid+'-add" class="btn btn-success btn-sm"><i class="fa fa-user-plus bigger-130"></i></button>'
//		        +'<button id="'+lid+'-del" class="btn btn-link">删除</button>'
//		        +'<button id="'+lid+'-set" class="btn btn-link">修改</button>'
//		        +'<button id="'+lid+'-restore" class="btn btn-link">重置密码</button>'
//		        +'<button id="'+lid+'-set-pwd" class="btn btn-link">修改密码</button>';
//		    }
		    html+='</div>';	
//		    var html='';
		    html+='<table id='+lid+'></table>';
		    pn.append(html);
		    lan.initEvent();
		    var c = lan.getCookie("userLan");
		
		    var name="";
		    if(c==1){
		    	 name="nameCn";
		    }else{
		    	name="nameEn";
		    }
	      $('#'+lid).bootstrapTable({
				method: 'get',
				url: "operateNewManager!getList.action",
				cache: false,
//				height: 500,
				responseHandler:function(res){				
					if(res && res.operateNew){
//						if(res && res.userList2){
						var obj={};
						obj["rows"]=res.operateNew;
						obj.total=res["total"];
						return obj;
					}
					return res;
				},
				queryParams:function(p){
					var params="";
					params+="&domainUuid="+window.global.getDomainUuid();
					params+="&userUuid="+window.user.uuid;
					params+="&limit="+p.limit;
					params+="&start="+p.offset;
					if(p.search)
					params+="&search="+p.search;
					return params;
				},
				
				striped: true,
				toolbar:"#"+lid+"-toolbar",
				pagination: true,
				pageSize: 10,
//				pageNumber:1,
				sidePagination: "server",
				pageList: [10,20,50,100],
				search:true,
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
					field: name,
					title: window.lc.getValue("buttonName"),
					align: 'center',
					valign: 'middle'
				},{
					field: 'createTime',
					title: window.lc.getValue("time"),
					align: 'center',
					valign: 'middle',
					formatter:function(value,row,index){
						return window.format.timeStaticFormat(value);
		        	},	
					
				}],
	      });
	      $('#'+pid).on('post-body.bs.table', function () {
				$('#'+pid+' [data-rel=tooltip]').tooltip();
				window.list.changeForAce(pid);
			})
		
	       $("#button_list button[name=refresh]").addClass("btn-info");
		   $("#button_list button[name=toggle]").addClass("btn-info");
		   $("#button_list button[data-toggle=dropdown]").addClass("btn-info");
	   
	    
		
	
	    
        
		
	}
    return {
    	createList:createList,
    	
    };
});


