define(["pay-tree","pay-fun",'text!html/loading.html','text!html/pay/OrderDetail.html'],function (tree,fun,tpl,otpl){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});
	function createView(pid,row){
		var tempFn = window.dot.template(otpl);
		var html=tempFn({price:fun.getPriceHtml(row.price),user:getUserHtml(row),status:fun.getOrderStatusHtml(row,row.status)
			,createTime:window.format.timeStaticFormat(row.createTime)
			,number:row.number,days:row.days,expireDay:row.expireDay,tradeNo:row.tradeNo?row.tradeNo:'-'
			,tradeStatus:row.tradeStatus?row.tradeStatus:'-'});
		$("#"+pid).html(html);
		$("#"+pid+" a[name=back]").bind("click",function(){
//			createView("pay_order");
			require(["pay-order"], function(pay) {
				pay.createView(pid);
			});
		});
		
		window.payMainData.curOrderNumber=row.number;
		require(["pay-order-item"], function(pay) {
			pay.createView(pid);
		});
	}

	function getUserHtml(row){
		var dn=row["domainName"]?row["domainName"]:" - "
		var ret=row.userName+'&nbsp;<font color=gray>&lt;'+dn+'&gt;</font>';
		return ret;
	}

    return {
    	createView:createView
    };
});


