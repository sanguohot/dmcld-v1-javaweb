define([],function (){
	function changeView(pid,cid,changeWidth){
		var width=$(window).width();
		var maxWidth=600;
		if(changeWidth){
			maxWidth=changeWidth;
		}
		var ns=$('#'+cid).find("div[class=card-view]");
		var bt=$('#'+pid).find("button[name=toggle]");
		if(bt.length){
			//小于600宽切换成名片布局,反之切换成列表布局
			if(width<=maxWidth){				
				if(ns.length){
					//当前已经是名片布局,什么都不做
				}else{
					bt.trigger("click");
				}
			}else{
				if(ns.length){					
					bt.trigger("click");
				}else{
					//当前已经是列表布局,什么都不做
				}
			}
		}
		$('#'+cid).bootstrapTable('resetView');
	}
	function delRefresh(lid,rows){
		var da=$('#'+lid).bootstrapTable('getData');
		console.log(da.length+"----"+rows.length);
		if(da.length<=rows.length){
			$('#'+lid).bootstrapTable("removeAll");
			$('#'+lid).bootstrapTable('selectPage',1);
		}else{
			$('#'+lid).bootstrapTable("removeAll");
			$('#'+lid).bootstrapTable("refresh");
		}
	}
	function changeForAce(id){
	    //ace框架与bootstrap-table冲突，需要修改
	    var db=$('#'+id).find("button");
	    if(db.length){
		    db.each(function(){
		    	$(this).removeClass("btn-default");
		    	$(this).addClass("btn-sm");
		    	$(this).addClass("btn-info");
		    })
	    }
	    var s=$('#'+id).find(".search input");
	    if(s.length){
	    	s.addClass("input-sm");
	    }
	}
	function getCreateTime(name){
		name=name?name:"createTime";
		return {
			field: name,
			title: window.lc.getValue("createTime"),
			align: 'center',
			valign: 'middle',
		    formatter:function(value,row,index){
				return window.format.timeStaticFormat(value);
        	},
        	cellStyle:function(value,row,index){
        		return {
    			    css: {"min-width": "90px"}
    			};
        	}
		}
	}
    return {
    	changeView:changeView,
    	changeForAce:changeForAce,
    	delRefresh:delRefresh,
    	getCreateTime:getCreateTime
    };
});


