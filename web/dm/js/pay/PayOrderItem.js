define(["pay-tree","pay-fun",'text!html/loading.html'],function (tree,fun,tpl){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});
    function createColEvents(pid,id){

    }
	function createView(pid){
		var id=pid+"_item_list";
		var h='';
	    h+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
//	    h+='<button id="'+id+'-add" type="button" class="btn btn-sm btn-info" >添加</button>';
	    h+='<a id="'+id+'-export" class="btn btn-info btn-sm"><i class="fa fa-download"></i>&nbsp;'+window.lc.getValue("expt")+'</a>';
//	    h+='<button id="'+id+'-car" type="button" class="btn btn-sm btn-info btn-app radius-4 my-btn-app head-shopcart" >充值车'+'<span class="badge badge-pink">'+cnt+'</span>'+'</button>';
	    h+='</div>';
		h+='<table id='+id+'></table>';
		$("#"+pid).find("div[name=table]").html(h);
		createColEvents(pid,id);
		createList(pid,id);
	}

	function createList(pid,id){
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "payManager!getOrderItemList.action",
			cache: false,
//			height: 500,
			cardView:false,
			responseHandler:function(res){				
				if(res && res.oiList){
					var obj={};
					obj["rows"]=res.oiList;
					obj.total=res.total;
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={};
				if(pid=="pay_order"){
					params.orderNumber=window.payMainData.curOrderNumber;
				}else if(pid=="pay_salesman"){
					params.salesman=window.payMainData.salesman;
				}
				params["limit"]=p.limit;
				params["start"]=p.offset;
				return params;
			},
			striped: true,
			pagination: true,
			pageSize: 10,
			toolbar:"#"+id+"-toolbar",
//			pageNumber:1,
			sidePagination: "server",
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			showColumns: true,
			showRefresh: true,
			sortable:false,
			smartDisplay:true,
			minimumCountColumns: 2,
			columns: [{
				field: 'orderNumber',
				title: '订单号',
				align: 'center',
				valign: 'middle',
				sortable: true,
				visible:pid=="pay_salesman"?true:false
			},{
				field: 'productSn',
				title: window.lc.getValue("productSn"),
				align: 'center',
				valign: 'middle',
				sortable: true
			}, {
				field: 'productName',
				title: window.lc.getValue("productName"),
				align: 'center',
				valign: 'middle',
				sortable: true,
			},{
				field: 'unitCost',
				title: "价格/天",
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
					var ret=fun.getPriceHtml(value);
					return ret;
	        	}
//			},{
//				field: 'days',
//				title: "充值天数",
//				align: 'center',
//				valign: 'middle',
//				sortable: true,
			},{
				field: 'cnt',
				title: "充值天数",
				align: 'center',
				valign: 'middle',
				sortable: true,
			},{
				field: 'status',
				title: "LICENSE状态",
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
					var html=window.lc.getValue("orderItemStatus",value);
					if(!value){
						return '<span class="label label-danger">'+html+'</span>';
					}else{
						return '<span class="label label-success">'+html+'</span>';
					}
	        	}
			},{
				field: 'rowTotal',
				title: "小计",
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
					var total=row.cnt*row.unitCost;
					total=fun.changeTwoDecimal(total);
					var ret=fun.getPriceHtml(total);
					return ret;
	        	}
//			},{
//				field: 'expireDay',
//				title: "失效日期",
//				align: 'center',
//				valign: 'middle',
//				sortable: true,
			}]
		});

		$("#"+id+"-export").bind('click',function(){
			var arr=$('#'+id).bootstrapTable('getData',true);
			if(!arr || arr.length==0){
				window.tip.show_pk("warning",null,"没有数据供导出");
				return;
			}
	        window.tip.show_pk("info",10,window.lc.getValue("exportingPlWait")+"...",true);
			var params={};
			if(pid=="pay_order"){
				params.orderNumber=window.payMainData.curOrderNumber;
			}else if(pid=="pay_salesman"){
				params.salesman=window.payMainData.salesman;
			}
			$.ajax({ 
				url: "payManager!exportOrderItem.action",
				data:params,
				complete: function(data,str){
				$('#'+id).bootstrapTable("refresh");
				$('#myModal button[name=close]').trigger("click");
				if(data.responseJSON && data.responseJSON.success){
					window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
//					window.tip.close_pk();
					window.location.href="download/"+data.responseJSON["fileName"];
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
				}
			}});
		});
		
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
		window.list.changeView(pid,id,600);
	}

    return {
    	createView:createView
    };
});


