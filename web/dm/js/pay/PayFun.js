/**
 * Created by Rainc on 2015/3/22.
 */
define(['text!html/modal.html','pay-validate'
        ,'text!html/field/text.html','text!html/field/textarea.html','text!html/field/select2.html']
        ,function(modal,valid,text,textarea,select2){
	function clearCarMap(){
		var cm=window.payMainData.carMap;
		if(!cm) return;
		cm.clear();
	}
    function createAjax(url,param,id){
    	$.ajax({ 
			url: url,
			data:param,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					//此处删除单行
					$('#'+id).bootstrapTable("refresh");
					$('#myModal button[name=close]').trigger("click");
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
    }
    function createDelAjax(url,param,id){
    	$.ajax({ 
			url: url,
			data:param,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
					//此处删除单行
					var rows=[];
					rows.push(1);
					window.list.delRefresh(id,rows);
					$('#myModal button[name=close]').trigger("click");
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
    }
    function createAjax2(url,param){
    	$.ajax({ 
			url: url,
			data:param,
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));					
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
			}});
    }
    function updateCarMap(rows,append){
		var cm=window.payMainData.carMap;
		if(!cm) return;
		if(!append){
			cm.clear();
		}
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			var ps=row.productSnStr?row.productSnStr:row.productSn;
			if(!cm.get(""+ps)){
				var cnt=1;
				if(row.cnt){
					cnt=row.cnt;
				}
				cm.put(""+ps,{productSn:ps,productName:row.productName,
					cnt:cnt,unitCost:row.unitCost,rowTotal:row.unitCost,validDays:row.validDays,domainUuid:row.domainUuid
					,productId:row.productId,productMac:"",detailDesc:''});
				
			}else{
				var obj=cm.get(""+ps);
				obj.cnt=obj.cnt+1;
				var rt=obj.cnt*obj.unitCost;
				obj.rowTotal=changeTwoDecimal(rt);
			}
			var tmp=cm.get(""+ps);
			tmp.expireDay=getRealExpireDay(tmp.validDays,tmp.cnt);
			tmp.displayExpireDay=getDisplayExpireDay(tmp.validDays,tmp.cnt);
			tmp.days=getDays(tmp.validDays,tmp.cnt);
		}
    }
    function updateCarCnt(){
		var cnt=0;
		var cm=window.payMainData.carMap;
		if(cm){
//			cnt=cm.size();
			cm.each(function(k,v,i){
				cnt+=v.cnt;
			});
		};
		$("#pay_car_cnt").html(cnt);
    }
    function updateCarMapItem(productSn,cnt){
		var cm=window.payMainData.carMap;
		if(!cm) return;
		if(cm.get(""+productSn)){
			var obj=cm.get(""+productSn);
			obj.cnt=parseInt(cnt);
			var rt=obj.cnt*obj.unitCost;
			obj.rowTotal=changeTwoDecimal(rt);
			obj.expireDay=getRealExpireDay(obj.validDays,obj.cnt);
			obj.displayExpireDay=getDisplayExpireDay(obj.validDays,obj.cnt);
			obj.days=getDays(obj.validDays,obj.cnt);			
		}
    }
    function getParCarMap(cb){
    	$.ajax({ 
			url: "payManager!getCarList.action",
//			data:getOrderPara(),
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.pcList && data.responseJSON.pcList.length){				
					updateCarMap(data.responseJSON.pcList,false);
					updateCarCnt();
				}
				cb();
			}});
    }
    function updatePayCar(){
		$.ajax({ 
			url: "payManager!addToCar.action",
			data:getOrderPara(),
			type:"POST",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){				
					console.log("tbl_par_car UPDATE SUCCESS");
					window.payMainData.cmNeedUpdate=false;
				}else{
					console.log("tbl_par_car UPDATE FAIL");
				}
			}});
    }
    function init(){
    	window.payMainData={carMap:new Map(),curOrderNumber:'',cmNeedUpdate:false};
    }
	function getPriceHtml(value){
		ret='<span class="red">￥'+value+'</span>';
        return ret;
	}
	function getOrderStatusHtml(row,value){
        var t=window.lc.getValue("orderStatus",value);
        var ret=t;
        var cls="";
        var recStatus=row.recStatus;
        if(value==0){
      	  cls="label label-danger";
        }else if(value==1 || value==2){
      	  cls="label label-success";
        }else if(value==3 || value==4 || value==5){
      	  cls="label label-warning";
        }else{
      	  cls="label label-info";
        }
        if(recStatus && recStatus==2){
        	t+=",已删除";
        }
        ret='<span class="'+cls+'">'+t+'</span>';
        return ret;
	}
	function updateSalesVar(){
    	$.ajax({ 
			url: "salesManager!getSalesList.action",
			data:{},
			type:"GET",
			timeout:60 * 60 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){				
					var sl=data.responseJSON.sl;
					window.payList.sl=sl;
					window.payList.sm=new Map();
		        	$.each(sl, function(i, v) {
		        		window.payList.sm.put(""+v.name,v);
		        	});
				}else{
					console.log("GET SALES MAN ERROR");
				}
			}});
	}
	function getOrderPara(){
		var cm=window.payMainData.carMap;
		if(!cm) return {};
		var params={price:0,sns:""};
		var list=[];
		cm.each(function(k,v,i){
			list.push(v);
			params.price+=changeTwoDecimal(v.unitCost*v.cnt);
			if(params.sns){
				params.sns+=",";
			}
			params.sns+=v.productSn;
		});
		//we need to translate again in case of some problem
		params.price=changeTwoDecimal(params.price);
		if(list.length>0){
			params.jsonStr=JSON.stringify(list);
		}else{
			params.jsonStr="";
		}
		
		return params;
    }
    function getExpireDay(validDays,cnt){
    	var d=new Date();
		d.setHours(0,0,0,0);
//		if(cnt)
//		d.setMonth(d.getMonth()+cnt); 
//		if(validDays)
//		d.setDate(d.getDate()+validDays);
		var days=getDays(validDays,cnt);
		d.setDate(d.getDate()+days);
		return d;
    }
    function getRealExpireDay(validDays,cnt){
    	var d=getExpireDay(validDays,cnt);
		var va = d.format("yyyy-MM-dd hh:mm:ss");
		return va;
    }
    function getDisplayExpireDay(validDays,cnt){
    	var d=getExpireDay(validDays,cnt);
		var va = d.format("yyyy-MM-dd");
		return va;
    }
    function getDays(validDays,cnt){
//    	var d=new Date();
//		d.setHours(0,0,0,0);
//		var td=new Date(d);
//		if(cnt)
//			td.setMonth(d.getMonth()+cnt); 
//		if(validDays)
//			td.setDate(d.getDate()+validDays);
//		var diff=td.getTime()-d.getTime()  //时间差的毫秒数
//		var days=Math.floor(diff/(24*3600*1000))
    	var days=0;
//    	if(validDays){
//    		days+=validDays;
//    	}
    	if(cnt){
    		days+=cnt;
    	}
		return days;
    }
    function toPayCar(pid,rows){
		if(rows.length==0){
	        window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
	        return;
		}
    	for(var i=0;i<rows.length;i++){
    		var row=rows[i];
    		if(!checkBeforePay(row,row.licStatus)){
    			return;
    		}
    	}
		
		window.payMainData.cmNeedUpdate=true;
		updateCarMap(rows,false);
		updateCarCnt();
		//更新数据库
		updatePayCar();
//		require(["pay-car"], function(chart) {
//			chart.createView(pid);		
//		});
		$('#pay_car').trigger("click");
		$('#myTab a[href=#pay_car]').trigger("click");
    }
    function checkBeforePay(row,status){
    	var ps=row.productSnStr?row.productSnStr:row.productSn;
    	if(status==0 || status==1 || status==2){
    		return true;
    	}else if(status==3){
	        window.tip.show_pk("warning",null,"服务器正在更新设备("+ps+")的许可证,暂不接受该设备的充值");
	        return false;
    	}else if(status==4){
	        window.tip.show_pk("warning",null,"服务器更新设备("+ps+")的许可证超时,请耐心等待响应");
	        return false;
    	}else if(status==5){
	        window.tip.show_pk("warning",null,"设备("+ps+")已经充值,请耐心等待充值完成");
	        return false;
    	}else{
	        window.tip.show_pk("warning",null,"设备("+ps+")LICENSE状态未知,暂不允许充值");
	        return false;
    	}
    }

    function addPrice(id){
    	procPrice("priceManager!addPrice.action",null,id,null,"添加价格");
    }
    
    function procPrice(url,extraParam,id,row,title){
    	var textFn = window.dot.template(text);
        var textareaFn = window.dot.template(textarea);
        var productName=textFn({label:'<font class="red">*</font>&nbsp;设备型号',name:'productName',value:(row && row.productName)?row.productName:""});
        var price=textFn({label:'<font class="red">*</font>&nbsp;单价',name:'price',value:(row && row.price)?row.price:""});
        var detailDesc=textareaFn({label:'描述',name:'detailDesc',value:(row && row.detailDesc)?row.detailDesc:""});
		var body='<form role="form">';
		body+=productName;
		body+=price;
		body+=detailDesc;
		body+='</form>';
	
		var obj={close:window.lc.getValue("close"),title:title,
				body:body,
				commit:true,commitLan:"提交"};
		var pn=$("#myModal");
		if(!pn) return;
        var tempFn = window.dot.template(modal);
        var html = tempFn(obj);
        pn.html(html);
		pn.modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		valid.checkPrice();	
		pn.find("button[name=commit]").on('click', function () {
			var form=$("#myModal form");
			if(!form.valid()){
				return;
			}		
			var params=form.formSerialize();
			if(extraParam){
				params+="&"+extraParam;
			}
			createAjax(url,params,id);
	    })
    }
    function updatePrice(row,id){
    	procPrice("priceManager!updateMul.action","ids="+row.uuid,id,row,"修改价格");		
    }
    
    function addSales(id){
        var textFn = window.dot.template(text);
        var textareaFn = window.dot.template(textarea);
        var sales=textFn({label:'<font class="red">*</font>&nbsp;业务员',name:'name',value:''});
        var email=textFn({label:'<font class="red">*</font>&nbsp;邮箱',name:'email',value:''});
        var mobile=textFn({label:'<font class="red">*</font>&nbsp;手机',name:'mobile',value:''});
        var address=textFn({label:'地址',name:'address',value:''});
        var detailDesc=textareaFn({label:'描述',name:'detailDesc',value:''});
		var body='<form role="form">';
		body+=sales;
		body+=mobile;
		body+=email;
		body+=address;
		body+=detailDesc;
		body+='</form>';
		
		var obj={close:window.lc.getValue("close"),title:"添加业务员",
				body:body,
				commit:true,commitLan:"提交"};
		var pn=$("#myModal");
		if(!pn) return;
        var tempFn = window.dot.template(modal);
        var html = tempFn(obj);
        pn.html(html);
		pn.modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		valid.addSales();
		pn.find("button[name=commit]").on('click', function () {
			var form=$("#myModal form");
			if(!form.valid()){
				return;
			}
			var params=form.formSerialize();
			createAjax("salesManager!addSales.action",params,id);
			updateSalesVar();
	    })
    }
    function updateSales(row,id){
    	var textFn = window.dot.template(text);
        var textareaFn = window.dot.template(textarea);
        var mobile=textFn({label:'<font class="red">*</font>&nbsp;手机',name:'mobile',value:row.mobile?row.mobile:""});
        var email=textFn({label:'<font class="red">*</font>&nbsp;邮箱',name:'email',value:row.email?row.email:""});
        var address=textFn({label:'地址',name:'address',value:row.address?row.address:""});
        var detailDesc=textareaFn({label:'描述',name:'detailDesc',value:row.detailDesc?row.detailDesc:""});
		var body='<form role="form">';
		body+=mobile;
		body+=email;
		body+=address;
		body+=detailDesc;
		body+='</form>';
		
		var obj={close:window.lc.getValue("close"),title:"修改业务员",
				body:body,
				commit:true,commitLan:"提交"};
		var pn=$("#myModal");
		if(!pn) return;
        var tempFn = window.dot.template(modal);
        var html = tempFn(obj);
        pn.html(html);
		pn.modal().css({
		    width: 'auto',
		    backdrop:false,
		});
		valid.addSales();
		
		pn.find("button[name=commit]").on('click', function () {
			var form=$("#myModal form");
			if(!form.valid()){
				return;
			}
			var params=form.formSerialize();
			createAjax("salesManager!updateSales.action",params+"&name="+row.name,id);
			updateSalesVar();
	    })
    }
    function checkPrice(num)
    {
      var reg = /^\d+(?=\.{0,1}\d+$|$)/
      if(reg.test(num)) return true;
      return false ;  
    }
    function changeTwoDecimal(floatvar){

    	if(floatvar){
    		return Math.round(floatvar*100)/100;
    	}
    	
	    return 0;
    }
    function payListMulSet(rows,id){
    	if(rows.length==0){
	       window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
	       return;
	    }
    	var row=null;
    	if(rows.length==1){
    		row=rows[0];
 	    }
	    var ids="";
    	$.each(rows, function(i, v) {
    		if(ids){
    			ids+=",";
    		}
    		ids+=v.uuid;
    	});
//    	 var select2Fn = window.dot.template(select2);
         var textareaFn = window.dot.template(textarea);
         var detailDesc=textareaFn({label:'描述',name:'detailDesc',value:(row && row.detailDesc)?row.detailDesc:""});
		var body='<form class="" role="form">';
		body+='<span class="dc-label">业务员</span>'
			+'<span style="display: inline-block;" id="payListMulSales"></span>';
//		body+=salesman;
		body+=detailDesc;
		body+='</form>';
		
        var countries = [];
        var sl=window.payList.sl;
        if(!sl || !sl.length){
        	console.log("SALESMAN LIST IS EMPTY");
        }else{
        	$.each(sl, function(i, v) {
        		countries.push({id:v.name,text:v.name});
        	});
        }
		var obj={close:window.lc.getValue("close"),title:"多选修改",
				body:body,
				commit:true,commitLan:"提交"};
		var pn=$("#myModal");
		if(!pn) return;
        var tempFn = window.dot.template(modal);
        var html = tempFn(obj);
        pn.html(html);
        
        var si=$('#payListMulSales');
        si.select2({
            placeholder: "设置业务员",
            allowClear: true,
            data:countries,
            width:'100%',
            minimumResultsForSearch: Infinity
//            value:sales
         });
        si.select2("val", (row && row.salesman)?row.salesman:""); 
//        si.val(sales);
        pn.find("button[name=commit]").on('click', function () {
        	var s=si.select2("val");
        	var form=$("#myModal form");
			var params=form.formSerialize();
			if(params && s){
				params+="&salesman="+s;
			}else  if(!params && s){
				params=s;
			}else if(!params && !s){
				params="";
			}
			params+="&ids="+ids;
			createAjax("payManager!updateNe.action",params,id);			
	    })
		pn.modal().css({
		    width: 'auto',
		    backdrop:false,
		});
    }    
  return{
	  getPriceHtml:getPriceHtml,
	  getDays:getDays,
	  getDisplayExpireDay:getDisplayExpireDay,
	  getRealExpireDay:getRealExpireDay,
	  getExpireDay:getExpireDay,
	  updateCarMap:updateCarMap,
	  toPayCar:toPayCar,
	  checkBeforePay:checkBeforePay,
	  init:init,
	  getOrderPara:getOrderPara,
	  getParCarMap:getParCarMap,
	  updateCarCnt:updateCarCnt,
	  clearCarMap:clearCarMap,
	  createAjax:createAjax,
	  addSales:addSales,
	  updateSales:updateSales,
	  createAjax2:createAjax2,
	  payListMulSet:payListMulSet,
	  addPrice:addPrice,
	  updatePrice:updatePrice,
	  getOrderStatusHtml:getOrderStatusHtml,
	  changeTwoDecimal:changeTwoDecimal,
	  updateCarMapItem:updateCarMapItem,
	  updatePayCar:updatePayCar,
	  checkPrice:checkPrice,
	  updateSalesVar:updateSalesVar,
	  createDelAjax:createDelAjax 
  }
})