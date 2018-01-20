define(["pay-tree","pay-fun",'text!html/loading.html'],function (tree,fun,tpl){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});
	function getLoadHtml(){
		var html='<span style="padding:5px;"><div class="icon-middle">'
		    +'<i class="fa fa-spinner fa-spin" style="color:#82af6f;"></i>'
		    +'</div> 正在刷新请稍候...</span>';
		return html;
	}
    function createColEvents(pid,id){
	    var ud=0;
	    if(window.user){
	    	ud=window.user.domainUuid;
	    }
	    var del=function(e, value, row, index){
	    	var cb=function(){
				$.ajax({ 
					url: "payManager!delOrder.action",
					data:{domainUuid:ud,orderNumber:row.number},
					type:"POST",
					timeout:60 * 60 * 1000,
					complete: function(data,str){
						if(data.responseJSON && data.responseJSON.success){
							window.list.delRefresh(id,[row]);
							window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
						}
					}});
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 

	    }
	    var cancel=function(e, value, row, index){
	    	var cb=function(){
				$.ajax({ 
					url: "payManager!cancelOrder.action",
					data:{domainUuid:ud,orderNumber:row.number},
					type:"POST",
					timeout:60 * 60 * 1000,
					complete: function(data,str){
						if(data.responseJSON && data.responseJSON.success){
							$('#'+id).bootstrapTable("refresh");	
							window.tip.show_pk("success",null,window.lc.getValue("cancelSucc"));
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("cancelFail"));
						}
					}});
	    	}
	    	window.modal.confirm("确认取消订单吗"+'？',cb); 

	    }
	    var confirm=function(e, value, row, index){
			$.ajax({ 
				url: "payManager!confirmOrder.action",
				data:{domainUuid:ud,orderNumber:row.number},
				type:"POST",
				timeout:60 * 60 * 1000,
				complete: function(data,str){
					if(data.responseJSON && data.responseJSON.success){
						$('#'+id).bootstrapTable("refresh");	
						window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
					}
				}});
	    }
	    var pay=function(e, value, row, index){
//	    	var ps="?domainUuid="+ud+"&orderNumber="+row.number+"&price="+row.price
//	    	window.open("/create_direct_pay_by_user-JAVA-UTF-8/dm.jsp"+ps);
    		$.ajax({ 
				url: "payManager!payOrder.action",
				data:{domainUuid:ud,orderNumber:row.number,price:row.price},
				type:"POST",
				timeout:60 * 60 * 1000,
				complete: function(data,str){
					if(data.responseJSON && data.responseJSON.alipayUrl){
//						$('#'+id).bootstrapTable("refresh");
						window.open(data.responseJSON.alipayUrl);
//						window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					}else{
						if(data.responseJSON && data.responseJSON.errMsg){
							window.tip.show_pk("danger",null,data.responseJSON.errMsg);
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
						}
					}
				}});
			
	    }
	    var orderDetail=function(e, value, row, index){
			require(["pay-order-detail"], function(pay) {
				pay.createView(pid,row);
			});
	    }
	    
	    window.operateEvents = {
	        'click a[action=del]':del,
	        'click a[action=cancel]':cancel,
	        'click a[action=confirm]':confirm,
	        'click a[action=pay]':pay,
	        'click a[action=orderDetail]':orderDetail
	    };
    }
	function createView(pid){
		var id=pid+"_list";
		var h='';
	    h+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    if(pid=="pay_list")
	    h+='<button id="'+id+'-back" type="button" class="btn btn-sm btn-info" ><i class="fa fa-reply bigger-130"></i>&nbsp;</button>';
//	    h+='<button id="'+id+'-car" type="button" class="btn btn-sm btn-info" ><i class="fa fa-external-link bigger-130"></i>&nbsp;充值车</button>';
	    h+='</div>';
		h+='<table id='+id+'></table>';
		$("#"+pid).html(h);
		createColEvents(pid,id);
		createList(pid,id);
	}

	function createList(pid,id){
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "payManager!getOrderList.action",
			cache: false,
//			height: 500,
			cardView:false,
			responseHandler:function(res){				
				if(res && res.total){
					var obj={};
					obj["rows"]=res.olist;
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
				if(pid=="pay_list" && window.payList.sn){
					params["productSn"]=window.payList.sn
				}
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
			columns: [{
				field: 'userName',
				title: '下单人',
				align: 'center',
				valign: 'middle',
				visible:window.roleType.isSuper(user.roleId)?true:false
			},{
				field: 'number',
				title: '订单号',
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){
		    	  var html='';
		    	  html+=''
		    		+'<a action="orderDetail"  class="blue" href="#" >'
					+value
					+'</a>'
					+'&nbsp;'
					return html;
				},
				events:operateEvents
			},{
				field: 'tradeNo',
				title: '交易号',
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){
			  		if(value){
			  			return value;
			  		}
			  		return "-";
		     	}
			},{
				field: 'createTime',
				title: '下单时间',
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){
			  		if(value){
			  			return window.format.timeStaticFormat(value);
			  		}
			  		return "-";
		     	}
			},{
				field: 'price',
				title: "订单总额",
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
		          return fun.getPriceHtml(fun.changeTwoDecimal(value));
		        }
			},{
				field: 'status',
				title: "订单状态",
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){
					return fun.getOrderStatusHtml(row,value);
		        }
			},{
		          field: 'option',
		          title: window.lc.getValue("operate"),
		          align: 'left',
		          valign: 'middle',
		          clickToSelect: true,
		          visible:true,
		          formatter:function(value,row,index){
			    	  var html='';
			    	  var orderDetail='<a action="orderDetail"  class="blue" href="#" >'
							+'查看'
							+'</a>';
			    	  var pay='<a action="pay"  class="red" href="#" >'
				    		+'去付款'
				    		+'</a>';
			    	  var cancel='<a action="cancel"  class="blue" href="#" >'
				    		+'取消订单'
							+'</a>';
			    	  var del='<a action="del"  class="yellow" href="#" >'
				    		+'删除订单'
							+'</a>';
			    	  html+=orderDetail;
		    	  	if(row.status==0){
			    		html+=pay;
			    		html+=cancel;
		    	  	}else if(row.status==1 || row.status==2 || row.status==3 || row.status==4){
		    	  		if(row.recStatus && row.recStatus!=2){
		    	  			html+=del;
		    	  		}
		    	  	}
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
		
	    $("#"+id+"-back").bind('click',function(){
			require(["pay-list"], function(chart) {
				chart.createView("pay_list");		
			});
	      });
	}



	
    return {
    	createView:createView
    };
});


