define(["pay-tree","pay-fun",'text!html/loading.html'
        ,'text!html/pay/EditNumber.html','text!html/pay/number.html'],function (tree,fun,tpl,enTpl,numTpl){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});
    function getData(){
		var cm=window.payMainData.carMap;
		var data=[];
		if(cm){
			cm.each(function(k,v,i){
				data.push(v);
			});
		}
		return data;
    }
    
    function getTotalPrice(){
		var cm=window.payMainData.carMap;
		if(!cm) return 0;
		var total=0;
		cm.each(function(k,v,i){
//			total+=v.rowTotal
			total+=fun.changeTwoDecimal(v.unitCost*v.cnt);
		});
		//we need to translate again in case of some problem
		total=fun.changeTwoDecimal(total);
		return total;
    }
    function updateCarMapItem(productSn,cnt){
		var cm=window.payMainData.carMap;
		if(!cm) return;
		if(cm.get(""+productSn)){
			var obj=cm.get(""+productSn);
			obj.cnt=parseInt(cnt);
			var rt=obj.cnt*obj.unitCost;
			obj.rowTotal=fun.changeTwoDecimal(rt);
			obj.expireDay=fun.getRealExpireDay(obj.validDays,obj.cnt);
			obj.displayExpireDay=fun.getDisplayExpireDay(obj.validDays,obj.cnt);
			obj.days=fun.getDays(obj.validDays,obj.cnt);			
		}
    }
    function mapToList(){
		var cm=window.payMainData.carMap;
		if(!cm) return [];
		
		cm.each(function(k,v,i){
			
		});
		return list;
    }
    function getMonthValue(value){
	    var html='<font class="blue bigger-150">'+value+'</font>';
	    return html;
    }
    function createColEvents(pid,id){
	    
	    var del=function(e, value, row, index){
			//如果删除，那么需要更新数据库	
	    	var cb=function(){
				window.payMainData.cmNeedUpdate=true;
	    		$('#'+id).bootstrapTable('remove', {field: 'productSn', values: [row.productSn]});
	    		var cm=window.payMainData.carMap;
	    		if(cm.get(""+row.productSn)){
	    			cm.remove(""+row.productSn);
	    		}
	    		fun.updateCarCnt();
	    		fun.updatePayCar();
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 

//    		$('#'+id).bootstrapTable('removeAll');
//    		$('#'+id).bootstrapTable('refresh');
	    }

	    window.operateEvents = {
	        'click a[action=del]':del
//	        'click span[action=editNumber]':editNumber
	    };
    }

	function createView(pid){
//		$("#myTab a[href=#pay_list]").find("font").html("充值车");
		var id=pid+"_car";
		var h='';

		h+='<table id='+id+'></table>';
		//id="'+id+'-toolbar" 
	    h+='<div style="margin-top:10px;width:100%;" class="btn-group my-btn-group" role="group" aria-label="...">';
	    h+='<button id="'+id+'-clear" type="button" class="btn btn-sm btn-info" >清空列表</button>';
//	    h+='<button id="'+id+'-refresh" type="button" class="btn btn-sm btn-info" >更新列表</button>';
	    h+='<span style="position:absolute;right:5px;top:0px;">总计：<font id="'+id+'-total"></font></span>'
	    h+='</div>';
	    
	    h+='<div style="margin-top:0px;" class="btn-group my-btn-group pull-right" role="group" aria-label="...">';
	    h+='<button id="'+id+'-back" type="button" class="btn btn-sm btn-info" >继续添加</button>';
	    h+='<button id="'+id+'-commit" type="button" class="btn btn-sm btn-danger" >提交订单</button>';
	    h+='</div>';
		$("#"+pid).html(h);
//		$("#"+id+"-total").html(fun.getPriceHtml(getTotalPrice()));
		createColEvents(pid,id);
		createList(pid,id);
	}
	function createList(pid,id){
//		var data=getData();
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "payManager!getCarList.action",
			responseHandler:function(res){				
				if(res && res.total){
					var obj={};
					obj["rows"]=res.pcList;
//					obj.total=res.total;
					fun.updateCarMap(res.pcList,false);
					fun.updateCarCnt();
					$("#"+id+"-total").html(fun.getPriceHtml(getTotalPrice()));
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={mainSearch:$.trim($('#dev_tag').val())};
//				var tr=tree.getTreePara();
//				if(tr)
//				params[tr.name]=tr.value;
//				params["limit"]=p.limit;
//				params["start"]=p.offset;
				return params;
			},
//			data:data,
			cache: false,
//			height: 500,
			cardView:false,
//			striped: true,
//			toolbar:"#"+id+"-toolbar",
			pagination: false,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
			search: false,
			showColumns: true,
			showRefresh: true,
			queryParamsType:'limit',
//			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			sortable:false,
//			clickToSelect: true,
			columns: [{
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
				field: 'validDays',
				title: "有效天数",
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
					return row.licValidDays;
	        	}
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
			},{
				field: 'cnt',
				title: "充值天数",
				align: 'center',
				valign: 'middle',
				sortable: true,
				
	          formatter:function(value,row,index){
//			    var tempFn = window.dot.template(numTpl);
//			    var html=tempFn({value:getMonthValue(value)});
//		    	var ret='<div class="dc-value">'+html+'</div>';
		    	  return '<span class="editable editable-click" id="payDays_'+index+'" style="display: inline;">'+value+'</span>';
	          },
	          events:operateEvents
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
//				field: 'days',
//				title: "充值天数",
//				align: 'center',
//				valign: 'middle',
//				sortable: true,
//			},{
//				field: 'displayExpireDay',
//				title: "失效日期",
//				align: 'center',
//				valign: 'middle',
//				sortable: true,
			},{
		          field: 'option',
		          title: window.lc.getValue("operate"),
		          align: 'left',
		          valign: 'middle',
		          sortable: true,
		          clickToSelect: true,
		          visible:true,
		          formatter:function(value,row,index){
			    	  var html='';
			    	  html+=''
			    		+'<a action="del"  class="red" href="#" title="'+window.lc.getValue("del")+'">'
						+'<i class="fa fa-remove bigger-130"></i>'
						+'</a>'
						+'&nbsp;'
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
		$("#"+id+"-clear").bind('click',function(){
			//如果清空，那么需要更新数据库
	    	var cb=function(){
				window.payMainData.cmNeedUpdate=true;
				fun.clearCarMap();
				fun.updateCarCnt();
				$('#'+id).bootstrapTable('removeAll');
				fun.updatePayCar();
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
		});
		$("#"+id+"-refresh").bind('click',function(){
			
		});
		$("#"+id+"-back").bind('click',function(){
//			require(["pay-list"], function(chart) {
//				chart.createView("pay_list");		
//			});	
			$('#myTab a:first').trigger("click");
		});
		$("#"+id+"-commit").bind('click',function(){
			var rows=$('#'+id).bootstrapTable('getData');
			if(rows.length==0){
		        window.tip.show_pk("warning",null,"充值车没有数据");
		        return;
			}
			$.ajax({ 
				url: "payManager!createOrder.action",
				data:fun.getOrderPara(),
				type:"POST",
				timeout:60 * 60 * 1000,
				complete: function(data,str){
					if(data.responseJSON && data.responseJSON.success){				
						window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
						$('#'+id).bootstrapTable('removeAll');
						var cm=window.payMainData.carMap;
						if(!cm) return;
						cm.clear();
						
		    			//如果已经入库，那么需要更新数据库
		    			window.payMainData.cmNeedUpdate=true;
		    			fun.updateCarCnt();
		    			fun.updatePayCar();
//						require(["pay-list"], function(chart) {
//							chart.createView("pay_list");		
//						});	
						$('#myTab a[href=#pay_order]').trigger("click");
					}else{
						if(data.responseJSON && data.responseJSON.errMsg){
							window.tip.show_pk("danger",null,data.responseJSON.errMsg);
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
						}
					}
				}});
		});
//		console.log("post-body.bs.table")
		
    	
	    $('#'+id).on('post-body.bs.table', function () {
	    	var arr=$('#'+id).bootstrapTable('getData',true);
	    	if(arr && arr.length)
	    	$.each(arr, function(i, v) {
			    $('#payDays_'+i).editable({
			        type: 'spinner',
					name : 'cnt',
					spinner : {
						min : 1, max:999, step:1
					},
		            success: function(response, newValue) {
						if(!newValue) return;
						
						v.cnt=newValue;
					    fun.updateCarMapItem(v.productSn,newValue);
					    fun.updateCarCnt();
					    fun.updatePayCar();
					    $("#"+id+"-total").html(fun.getPriceHtml(getTotalPrice()));
					    $('#'+id).bootstrapTable('updateRow',{index:i,row:v});
//					    $('#'+id).bootstrapTable('removeAll');
//					    $('#'+id).bootstrapTable('refresh');
		            },
		            validate:function(val){
		            	if(!fun.checkPrice(val)){
		            		return '请输入正确的价格';
		            	}
		            }
				});
	    	});
	    })

	}
    return {
    	createView:createView,
    	createList:createList
    };
});


