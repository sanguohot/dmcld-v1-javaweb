define(["bootstrap-table","form-field"],function (bt,field){
	function createPortList(pid){
		n=$("#"+pid);
		if(!n){
			return;
		}
		n.html("");
		var tid=pid+"_agp";
	    var html='<div id="'+tid+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	    html+='<button name="back" type="button" class="btn btn-sm btn-info" title="返回"><i class="fa fa-reply bigger-130"></i></button>';
		html+='</div>';
	    n.html(html+'<table id="'+tid+'"></table>');
		$('#'+tid).bootstrapTable({
			method: 'get',
			url: "dmManager!getAgpList.action",
			cache: false,
//			height: 400,
			responseHandler:function(res){
				if(res && res.agpl){
					var obj={};
		            obj["rows"]=res.agpl;
		            obj.total=res["maxTotal"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
//				p.type="all";
				var pa=window.portList.params;
	        	if(pid.indexOf("dev_list")>=0){
	        		pa={};
	        	}
				for(var x in pa){
					p[x]=pa[x];
				}
				p.start=p.offset;
				return p;
			},
			toolbar:"#"+tid+"-toolbar",
	      pagination: true,
	      pageSize: 10,
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
				field: 'state',
				checkbox: true
			},{
				field: 'neAlias',
				title: '设备别名',
				align: 'left',
				valign: 'middle',
				sortable: true
			},{
				field: 'portNo',
				title: '端口号',
				align: 'left',
				valign: 'middle',
				sortable: true
			},{
				field: 'runStatus',
				title: '运行状态',
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
					return window.lc.getValue("runStatus",value);
				}
			},{
				field: 'agpWorkState',
				title: '工作状态',
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
					return window.lc.getValue("workStatus",value);
				}
			},{
				field: 'agpPrimaryStatus',
				title: '主账户注册状态',
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
					return window.lc.getValue("primaryStatus",value);
				}
			}, {
				field: 'agpSecondaryStatus',
				title: '备用账户注册状态',
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
					return window.lc.getValue("primaryStatus",value);
				}
			},{
				field: 'agpRegFailCount',
				title: '注册失败数',
				align: 'left',
				valign: 'middle',
				sortable: true,
//			},{
//				field: 'agpCallStatus',
//				title: 'callStatus',
//				align: 'left',
//				valign: 'middle',
//				sortable: true,
//			},{
//				field: 'agpLastDuration',
//				title: 'lastDuration',
//				align: 'left',
//				valign: 'middle',
//				sortable: true,
//			},{
//				field: 'agpLastFail',
//				title: 'LastCallFailResn',
//				align: 'left',
//				valign: 'middle',
//				sortable: true,
//			},{
//				field: 'agpVoltage',
//				title: 'voltage',
//				align: 'left',
//				valign: 'middle',
//				sortable: true,
//			},{
//				field: 'current',
//				title: 'current',
//				align: 'left',
//				valign: 'middle',
//				sortable: true,
			}],
			onClickRow: function (row) {
				if(row){

				}
            }
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,tid,600);
		});
		window.list.changeView(pid,tid,600);
		
		$("#"+pid+" button[name=back]").bind('click',function(){
		      if(pid.indexOf("dev_calc")>=0){
				require(["dev-calc-group"], function(chart) { 
					chart.createCalc("dev_calc");
				});
		      }
		    });
	}
    return {
        createPortList:createPortList
    };
});


