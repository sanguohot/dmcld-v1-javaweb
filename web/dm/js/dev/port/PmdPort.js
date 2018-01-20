define(["bootstrap-table",'text!html/dev/port/PmdPort.html','dev-type'],function (bt,tpl,dt){
	function createView(pid,row){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	    var tempFn = window.dot.template(tpl);
	    var lan={calcList:window.lc.getValue("calcList"),portCalc:window.lc.getValue("portCalc")
	    		,portType:window.lc.getValue("portType"),back:window.lc.getValue("back")};
	    var list=[];
	    if(!dt.isDag(row.productId)){
	    	list=[{value:"tgp",text:"E1"},{value:"dsp",text:"DSP"},{value:"ss7",text:"SS7"}
		    ,{value:"pri",text:"PRI"},{value:"sip",text:"SIP"},{value:"eth",text:"ETH"}];
	    }else{
	    	list=[{value:"agp",text:"LINE"},{value:"dsp",text:"DSP"},{value:"lan",text:"LAN"}
		    ,{value:"eth",text:"WAN"}];
	    }
	    var html=tempFn({pid:pid,sn:row.productSns,name:"type",list:list,lan:lan});
	    pn.html(html);
	    $("#"+pid+" input[name=type]").bind("click",function(){
	    	var val=$(this).val();
	    	showPmd(pid,row,val);
	    });
	    if(!dt.isDag(row.productId)){
	    	$("#"+pid+" input[value=tgp]").trigger("click");
	    }else{
	    	$("#"+pid+" input[value=agp]").trigger("click");
	    }	    
	}
	function showPmd(pid,row,type){
		var path="pmd-"+type;
		if(type=="lan"){
			path="pmd-eth";
		}
		if(type=="pri"){
			path="pmd-ss7";
		}
		
		require([path], function(obj) { 
			createList(pid,row,type,obj.getColumns());
		});
	}
//	function toFirst(pid,type){
//		var id=pid+"-"+type+"15-list";
//		$('#'+id).bootstrapTable("selectPage",1);
//	}
	function getColumns(){
		return [{
			field: 'portAlias',
			title: window.lc.getValue("portAlias"),
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){					
				if(value.indexOf("[")>=0){
					return value.replace("[","<br>[");
				}
				return value;
        	},
        	cellStyle:function(value,row,index){
        		return {
    			    css: {"min-width": "120px"}
    			};
        	}
		},{
			field: 'generateTime',
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
		}];
	}
	function createList(pid,row,type,columns){
		var tablePid=pid+"-pmd";
		var node=$("#"+tablePid);
		if(!node){
			return;
		}
		var html='';
		var id=pid+"-"+type+"15-list";
//		var html='<h5 class="header smaller lighter red">CDR['+row.productSns+']<div style="float:right;" class="btn-group"><a class="btn btn-sm btn-warning" action="exchange" href="#" title="切换视图为列表或者图表"><i class="fa fa-exchange bigger-120"></i>&nbsp;切换视图</a><a style="float:right;" class="btn btn-sm btn-success" action="search" href="#" title="刷新"><i class="fa fa-refresh bigger-120"></i>&nbsp;刷新</a></div></h5>'
//		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
//		html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
//		html+='</div>';
		html+='<table id='+id+'></table>';
		node.html(html);
		var cols=getColumns().concat(columns);
		console.log(cols);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "pmdTgMntManager!getPmdTgMntList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
				if(res && res.list){
					var obj={};
					obj["rows"]=res.list;
					obj.total=res["total"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={};
	            window.global.getTreePara(params);
				params["limit"]=p.limit;
				params["start"]=p.offset;
				params["neUuid"]=row.uuid;
				params["flag"]=type+"15";
				return params;
			},
			striped: true,
//			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 5,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [5,10,25,50,100],
			search: false,
			showColumns: true,
			sortable: false,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: cols
		});
	    $("#"+pid+" a[name=back]").bind('click',function(){
			require(["dev-list"], function(grid) { 
				grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
			});	
	      });
	    $('#'+id).on('post-body.bs.table', function () {
	    	window.list.changeForAce(pid);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}
	
    return {
        createList:createList,
        createView:createView
    };
});


