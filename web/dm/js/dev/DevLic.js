define(["dev-tree","dev-sch",'text!html/loading.html'],function (tree,sch,tpl){
    var tempFn = window.dot.template(tpl);
    var html=tempFn({refreshWaiting:window.lc.getValue("refreshWaiting")});
	function getLoadHtml(){
		var html='<span style="padding:5px;"><div class="icon-middle">'
		    +'<i class="fa fa-spinner fa-spin" style="color:#82af6f;"></i>'
		    +'</div> 正在刷新请稍候...</span>';
		return html;
	}

	function createView(pid){
		var id=pid+"_list";
		var h='';
	    h+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    h+='<button id="'+id+'-mul" type="button" class="btn btn-sm btn-info" ><i class="fa fa-external-link bigger-130"></i>&nbsp;单台充值</button>';
	    h+='<button id="'+id+'-car" type="button" class="btn btn-sm btn-info" ><i class="fa fa-external-link bigger-130"></i>&nbsp;充值车</button>';
	    h+='</div>';
		h+='<table id='+id+'></table>';
		$("#"+pid).html(h);
		createList(pid,id);
	}
	function createList(pid,id){
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "abcd",
			cache: false,
//			height: 500,
			cardView:false,
			responseHandler:function(res){				
				if(1){
					var obj={};
					obj["rows"]=[];
					obj.total=0;
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
				window.global.getTreePara(params);
				params["limit"]=p.limit;
				params["start"]=p.offset;
				return params;
			},
			striped: true,
//			toolbar:"#"+id+"-toolbar",
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
			columns: [{
				field: 'productSns',
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
			}, {
				field: 'unitCost',
				title: "单价",
				align: 'center',
				valign: 'middle',
				sortable: true,
			}, {
				field: 'months',
				title: "月数",
				align: 'center',
				valign: 'middle',
				sortable: true,
			},{
				field: 'price',
				title: "小计",
				align: 'left',
				valign: 'middle',
				sortable: true,
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
//		          events:operateEvents
		      }]
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
		window.list.changeView(pid,id,600);
		
		$("#"+pid+" button[name=back]").bind('click',function(){

		    });
	}
    return {
    	createView:createView
    };
});


