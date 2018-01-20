define(["pay-tree","pay-fun",'text!html/loading.html','text!html/pay/PayDetail.html'],function (tree,fun,tpl,pd){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});

    function createColEvents(pid,id){
    	var viewOrder=function(e, value, row, index){
    		var sn=row.productSnStr;
    		window.payList.sn=sn;
			require(["pay-order"], function(chart) { 
				chart.createView("pay_list");
			});
	    }
    	
	    var addToCar=function(e, value, row, index){
	    	var rows=[row];
    		if(!fun.checkBeforePay(row,row.licStatus)){
    			return;
    		}
//    		var img = $(this).parent().find('img');
			//需要更新数据库
			window.payMainData.cmNeedUpdate=true;
	    	fun.updateCarMap(rows,true);
    		var img=$(this).find("i");
    		var flyElm = img.clone().css('opacity', 0.75);
    		$('body').append(flyElm);
    		//default is head-shopcart
    		var css="my-shopcart";
    		flyElm.css({
    			'z-index': 9000,
    			'display': 'block',
    			'position': 'absolute',
    			'top': img.offset().top +'px',
    			'left': img.offset().left +'px',
    			'width': img.width() +'px',
    			'height': img.height() +'px'
//    			'width': 3 +'px',
//    			'height': 3 +'px'
    		});
    		flyElm.animate({
    			top: $('.'+css).offset().top-5,
    			left: $('.'+css).offset().left+$('.'+css).width()+20,
    			width: 20,
    			height: 32
    		}, 'slow', function() {
    			flyElm.remove();
//    			var cnt=parseInt($("#"+id+"-car span").html());
//    			$("#"+id+"-car span").html(cnt+1);
//    			var cnt=parseInt($("#pay_car_cnt").html());
//    			$("#pay_car_cnt").html(cnt+1);
    			fun.updateCarCnt();
    			fun.updatePayCar();
    		});
    		
	    }
	    
	    var onePay=function(e, value, row, index){
	    	fun.toPayCar(pid,[row]);
	    }
	    function createAjax(url,param){
	    	$.ajax({ 
				url: url,
				data:param,
				type:"POST",
				timeout:60 * 60 * 1000,
				complete: function(data,str){
					if(data.responseJSON && data.responseJSON.success){				
						window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
						$('#'+id).bootstrapTable('refresh');
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
					}
				}});
	    }
	    var lock=function(e, value, row, index){
	    	fun.createAjax("payManager!lockDev.action",{domainUuid:row.domainUuid,productSn:row.productSnStr},id);
	    }
	    
	    var unlock=function(e, value, row, index){
	    	fun.createAjax("payManager!unlockDev.action",{domainUuid:row.domainUuid,productSn:row.productSnStr},id);
	    }
	    
	    window.operateEvents = {
	        'click a[action=onePay]':onePay,
	        'click a[action=addToCar]':addToCar,
	        'click a[action=lock]':lock,
	        'click a[action=unlock]':unlock,
	        'click a[action=viewOrder]':viewOrder
	    };
  }
	function getLoadHtml(){
		var html='<span style="padding:5px;"><div class="icon-middle">'
		    +'<i class="fa fa-spinner fa-spin" style="color:#82af6f;"></i>'
		    +'</div> 正在刷新请稍候...</span>';
		return html;
	}

	function createView(pid){
//		$("#myTab a[href=#pay_list]").find("font").html("设备license信息");
		var cm=window.payMainData.carMap;
		var cnt=0;
		if(cm && !cm.isEmpty()){
			cm.each(function(k,v,i){
				cnt+=v.cnt;
			})
		}
		var id=pid+"_list";
		var h='';
	    h+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    h+='<button id="'+id+'-mul" type="button" class="btn btn-sm btn-info" >多选充值</button>';
	    h+='<button id="'+id+'-mul-set" type="button" class="btn btn-sm btn-info" >多选修改</button>';
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
			url: "payManager!getPayList.action",
			cache: false,
//			height: 500,
			cardView:false,
			responseHandler:function(res){				
				if(res && res.total){
					var obj={};
					obj["rows"]=res.list;
					obj.total=res.total;
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={mainSearch:$.trim($('#dev_tag').val())};
//				var tr=tree.getTreePara();
//				if(tr)
//				params[tr.name]=tr.value;
				window.global.getTreePara(params);
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
			detailView:true,
			detailFormatter:function(index, row) {
			    var tf = window.dot.template(pd);
			    var html=tf({totalPaidDays:row.totalPaidDays,domainName:row.domainName,detailDesc:row.detailDesc,salesman:row.salesman,id:"salesman_"+index,id2:"ne_detail_"+index});
				return html;
			},
			columns: [{
		        field: 'state',
		        checkbox: true,
//		        valign: 'middle',
//		        align: 'left',
		        cardVisible:false
		      },{
				field: 'productSnStr',
				title: window.lc.getValue("productSn"),
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
		    	  		var title="业务员:"+row.salesman;
						var ret='<span class="tooltip-warning" data-rel="tooltip" data-placement="bottom" title="" data-original-title="'+title+'">'+value+'</span>';
						return ret;
	          	}
			},{
				field: 'alias',
				title: window.lc.getValue("devName"),
				align: 'center',
				valign: 'middle',
				visible:false,
				sortable: true,
			},{
				field: 'productName',
				title: window.lc.getValue("productName"),
				align: 'center',
				valign: 'middle',
				sortable: true,
			},{
				field: 'packageVersion',
				title: window.lc.getValue("version"),
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
			}, {
				field: 'licValidDays',
				title: "有效天数",
				align: 'center',
				valign: 'middle',
				sortable: true,
//			},{
//				field: 'expireDay',
//				title: "失效日期",
//				align: 'center',
//				valign: 'middle',
//				sortable: true,
//		        formatter:function(value,row,index){
//					return fun.getDisplayExpireDay(row.validDays,0);
//	            }
//			},{
//				field: 'licStatus',
//				title: "LICENSE状态",
//				align: 'center',
//				valign: 'middle',
//				sortable: true,
//		        formatter:function(value,row,index){
//		          var t=window.lc.getValue("licStatus",value);
//		          var ret=t;
//		          var cls="";
//		          if(value==2 || value==4){
//		        	  cls="label label-danger";
//		          }else if(value==3){
//		        	  cls="label label-warning";
//		          }else if(value==1){
//		        	  cls="label label-success";
//		          }else{
//		        	  cls="label label-info";
//		          }
//		          ret='<span class="'+cls+'">'+t+'</span>';
//		          return ret;
//	            }
			},{
		        field: 'runStatus',
		        title: window.lc.getValue("runStatus"),
		        align: 'center',
		        valign: 'middle',
		        sortable: true,
		        formatter:function(value,row,index){
		          var t=window.lc.getValue("runStatus",value);
		          var cls="";
		          if(value==0 || value==9 || value==18 || value==21 || value==6){
		        	  cls="label label-danger";
		          }else if(value==3 || value==10){
		        	  cls="label label-success";
		          }else if(value==11){
		        	  cls="label label-warning";
		          }else{
		        	  cls="label label-info";
		          }
		          var ret='<span class="'+cls+'">'+t+'</span>';	          
		          return ret;
		        }
		      },{
		        field: 'licLockFlag',
		        title: "锁定状态",
		        align: 'center',
		        valign: 'middle',
		        sortable: true,
		        formatter:function(value,row,index){
		          var ret='<span class="'+cls+'">'+t+'</span>';
		          var t=window.lc.getValue("lockStatus",value);
		          var cls="";
		          if(value==1){
		        	  cls="label label-danger";
		          }else if(value==2){
		        	  cls="label label-success";
		          }else{
		        	  cls="label label-info";
		          }
		          var ret='<span class="'+cls+'">'+t+'</span>';	 		          
		          return ret;
		        }			        
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
			    	  var onePay='<a action="onePay"  class="blue" href="#" >'
							+'单选充值'
							+'</a>';
			    	  var addToCar='<a action="addToCar"  class="blue Q-buy-btn" href="#" >'
			    		+'<i class="fa fa-shopping-cart"></i>'
						+'加入充值车'
						+'</a>';
			    	  var lock='<a action="lock"  class="blue Q-buy-btn" href="#" >'
							+'锁定设备'
							+'</a>';
			    	  var unlock='<a action="unlock"  class="blue Q-buy-btn" href="#" >'
							+'解锁设备'
							+'</a>';
			    	  var viewOrder='<a action="viewOrder"  class="blue Q-buy-btn" href="#" >'
							+'查看订单'
							+'</a>';
						
			    	  html+='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
			          html+=onePay;
			    	  html+=addToCar;
					if(window.user && !window.user.domainUuid && window.location.pathname.indexOf("/alipay.html")<0){
						if(!row.licLockFlag){
				    		html+=lock;
					    	html+=unlock;
						}else if(row.licLockFlag==2){
				    		html+=lock;
						}else if(row.licLockFlag==1){
				    		html+=unlock;
						}
			    		html+='</div>';
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
	    $('#'+id).on('post-body.bs.table', function () {
	    	$('#'+id+' [data-rel=tooltip]').tooltip();
	    })
		$("#"+id+"-mul").bind('click',function(){
			var rows=$('#'+id).bootstrapTable('getSelections');
			fun.toPayCar(pid,rows);
		});
		$("#"+id+"-mul-set").bind('click',function(){
			var rows=$('#'+id).bootstrapTable('getSelections');
			fun.payListMulSet(rows,id);
		});
		$("#"+id+"-car").bind('click',function(){
			require(["pay-car"], function(chart) {
				chart.createView("pay_list");		
			});	
		});
		
	    $('#'+id).on('expand-row.bs.table', function (e,index, row, detail) {	    	
	    	
	        var countries = [];
	        var sl=window.payList.sl;
	        if(!sl || !sl.length){
	        	console.log("SALESMAN LIST IS EMPTY");
	        }else{
	        	$.each(sl, function(i, v) {
	        		countries.push({id:v.name,text:v.name});
	        	});
	        }
	        var currentValue = row.salesman;
	        if(!currentValue){
	        	currentValue=null;
	        }
	        var si=$('#salesman_'+index);
	        if(window.user && window.roleType.isSuper(window.user.roleId)){		        
		        si.editable({
		            type: 'select2',
		            source: countries,
		            success: function(response, newValue) {	        		
		                if(currentValue == newValue) return;
		                fun.createAjax("payManager!updateNeSales.action"
		                		,{domainUuid:row.domainUuid,productSn:row.productSnStr,salesman:newValue},id);
		            },
		            select2: {
		                placeholder: '设置业务员',
		                allowClear: true
	//	                minimumInputLength: 1
		            }
		        });
		        si.editable('setValue', currentValue);
	        }else{
        		if(si.hasClass("editable")){
        			si.removeClass("editable");
        		}
        		if(si.hasClass("editable-click")){
        			si.removeClass("editable-click");
        		}
	        	if(currentValue){
	        		si.html(currentValue);
	        		if(si.hasClass("editable-empty")){
	        			si.removeClass("editable-empty");
	        		}
	        	}else{
	        		si.html("Empty");
	        		if(!si.hasClass("editable-empty")){
	        			si.addClass("editable-empty");
	        		}
	        	}
	        }
	        
			//editables 
		    $('#ne_detail_'+index).editable({
				type: 'textarea',
				name: 'detailDesc',
	            success: function(response, newValue) {
		    		fun.createAjax("payManager!updateNeDesc.action"
		    				,{domainUuid:row.domainUuid,productSn:row.productSnStr,detailDesc:newValue},id);
	            }
		    });
	        //change profile
	        $('[data-toggle="buttons"] .btn').on('click', function(e){
	            var target = $(this).find('input[type=radio]');
	            var which = parseInt(target.val());
	            $('.user-profile').parent().addClass('hide');
	            $('#user-profile-'+which).parent().removeClass('hide');
	        });
	    })
	}
    return {
    	createView:createView
    };
});


