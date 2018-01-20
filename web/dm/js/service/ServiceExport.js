define(["dev-tree","service-fun","bootstrap-table"],function (tree,fun){
	function createList(pid,list){
		var id=pid+"_ver";
		var obj={title:'设备版本分布',body:'<table id="'+id+'"></table>',commit:false};
		var pn=$("#myModal");
		if(!pn) return;
		require(['text!html/modal.html'],function(tpl){
            var tempFn = window.dot.template(tpl);
            var html = tempFn(obj);
            pn.html(html);
			$('#myModal').modal().css({
			    width: 'auto',
			    backdrop:false,
			});
			
            $('#'+id).bootstrapTable({
    			method: 'get',
    			url: "",
    			cache: false,
    			data:list,
    			striped: true,
    			toolbar:"#"+id+"-toolbar",
    			pagination: true,
    			pageSize: 10,
    			pageList: [10, 25, 50, 100, 200],
    			search: true,
//    			showColumns: true,
//    			showRefresh: true,
    			showToggle:true,
    			smartDisplay:true,
    			minimumCountColumns: 2,
    			clickToSelect: true,
//    			iconsPrefix:'fa',
//    			icons:{refresh:'fa-refresh'},
    			columns: [{
    				field: 'version',
    				title: '版本',
    				align: 'center',
    				valign: 'middle',
    				sortable: true,
//    		        formatter:function(value,row,index){
//    			  		if(value){
//    			  			return window.format.timeStaticFormat(value);
//    			  		}
//    			  		return "---";
//    		     	}
    			},{
    				field: 'cnt',
    				title: '数量',
    				align: 'center',
    				valign: 'middle',
    				sortable: true
    			}]
    		});
    		window.list.changeForAce("myModal");
    		$(window).resize(function () {
    			window.list.changeView("myModal",id,600);
    		});
    		window.list.changeView("myModal",id,600);
    		
//    		 window.history.pushState({page: 1}, "title 1", "version.html"); 
	  	})
	}	
  return {
	  createList:createList
  };
});


