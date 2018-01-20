define(["pay-tree","pay-fun",'text!html/loading.html','text!html/pay/SalesDetail.html'],function (tree,fun,tpl,stpl){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});
	function createView(pid,row){
		var tempFn = window.dot.template(stpl);
		var html=tempFn({salesman:row.name,mobile:row.mobile,email:row.email?row.email:"-"
			,detailDesc:row.detailDesc?row.detailDesc:"-",address:row.address?row.address:"-"});
		$("#"+pid).html(html);
		$("#"+pid+" a[name=back]").bind("click",function(){
//			createView("pay_order");
			require(["pay-salesman"], function(pay) {
				pay.createView(pid);
			});
		});
		
		window.payMainData.salesman=row.name;
		require(["pay-order-item"], function(pay) {
			pay.createView(pid);
		});
	}


    return {
    	createView:createView
    };
});


