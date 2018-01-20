define(["pay-tree","pay-fun",'text!html/loading.html','text!html/pay/PayDetail.html']
        ,function (tree,fun,tpl,pd){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});

    function createColEvents(pid,id){
    	
	    var del=function(e, value, row, index){
	    	
	    	var cb=function(){
	    		fun.createDelAjax("priceManager!delPrice.action",{ids:row.uuid},id);
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
	    }
	    var modify=function(e, value, row, index){
//	    	fun.toPayCar(pid,[row]);
	    	fun.updatePrice(row,id)
	    }
	    window.operateEvents = {
	        'click a[action=del]':del,
	        'click a[action=modify]':modify
	    };
  }
    
	function createView(pid){
		var id=pid+"_list";
		var h='';
	    h+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    h+='<button id="'+id+'-add" type="button" class="btn btn-sm btn-info" >添加</button>';
//	    h+='<button id="'+id+'-car" type="button" class="btn btn-sm btn-info btn-app radius-4 my-btn-app head-shopcart" >充值车'+'<span class="badge badge-pink">'+cnt+'</span>'+'</button>';
	    h+='</div>';
		h+='<table id='+id+'></table>';
		$("#"+pid).html(h);
		createColEvents(pid,id);
		createList(pid,id);
	}
	function createList(pid,id){		
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "priceManager!getPriceList.action",
			cache: false,
//			height: 500,
			cardView:false,
			responseHandler:function(res){				
				if(res && res.total){
					var obj={};
					obj["rows"]=res.sl;
					obj.total=res.total;
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={mainSearch:$.trim($('#dev_tag').val())};
				window.global.getTreePara(params);
//				var tr=tree.getTreePara();
//				if(tr)
//				params[tr.name]=tr.value;
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
//			pageList: [10,25],
			search: false,
			showColumns: true,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			sortable:false,
//			detailView:true,
//			detailFormatter:function(index, row) {
//			    var tf = window.dot.template(pd);
//			    var html=tf({detailDesc:row.productSnStr,salesMan:"root",id:"salesman_"+index});
//				return html;
//			},
			columns: [{
		        field: 'state',
		        checkbox: true,
//		        valign: 'middle',
//		        align: 'left',
		        cardVisible:false
		      },{
				field: 'productName',
				title: window.lc.getValue("productName"),
				align: 'center',
				valign: 'middle',
//				sortable: true
			},{
				field: 'type',
				title: window.lc.getValue("type"),
				align: 'center',
				valign: 'middle',
//				sortable: true,
		        formatter:function(value,row,index){					
					return window.lc.getValue("priceType",value);
	        	}
			},{
				field: 'price',
				title: '单价',
				align: 'center',
				valign: 'middle',
//				sortable: true
		        formatter:function(value,row,index){					
					return fun.getPriceHtml(value);
	        	}
			},{
				field: 'detailDesc',
				title: '备注',
				align: 'center',
				valign: 'middle',
//				sortable: true
			},{
		          field: 'option',
		          title: window.lc.getValue("operate"),
		          align: 'left',
		          valign: 'middle',
//		          sortable: true,
		          clickToSelect: true,
		          visible:true,
		          formatter:function(value,row,index){
			    	  var html='';
			    	  var modify='<a action="modify"  class="blue Q-buy-btn" href="#" >'
							+'修改'
							+'</a>';
			    	  var del='<a action="del"  class="blue Q-buy-btn" href="#" >'
							+'删除'
							+'</a>';
						
			    	  html+='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
			    	  html+=modify;
			    	  html+=del;
			    	  html+='</div>';
			    	  return html;
		          },
		          events:operateEvents
		      }]
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
		window.list.changeView(pid,id,600);
//	    $('#'+id).on('post-body.bs.table', function () {
//	    	$("#"+pid+" a[action=addToCar]").bind("click",function(){})
//	    })

		$("#"+id+"-add").bind('click',function(){
			fun.addPrice(id);
		});
		
	    $('#'+id).on('expand-row.bs.table', function (e,index, row, detail) {
	        
	    })
	}
    return {
    	createView:createView
    };
});


