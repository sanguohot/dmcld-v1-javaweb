define(["dev-tree","zone-fun","dev-fun","pri-pri","bootstrap-table"],function (tree,fun,devFun,pri){
	function createList(pid,row){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='';
		var id=pid+"-list";
//		var html='<h5 class="header smaller lighter red">CDR['+row.productSns+']<div style="float:right;" class="btn-group"><a class="btn btn-sm btn-warning" action="exchange" href="#" title="切换视图为列表或者图表"><i class="fa fa-exchange bigger-120"></i>&nbsp;切换视图</a><a style="float:right;" class="btn btn-sm btn-success" action="search" href="#" title="刷新"><i class="fa fa-refresh bigger-120"></i>&nbsp;刷新</a></div></h5>'
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';
		
		html+='<button id="'+id+'-clean" type="submit" style="display:'+window.global.getClass("deleteDevice")+'" class="btn btn-sm btn-info" title="'+window.lc.getValue("cleanCdr")+'"><i class="fa fa-external-link"></i>'+window.lc.getValue("cleanCdr")+'</button>';
		html+='<button id="'+id+'-del" type="submit" style="display:'+window.global.getClass("deleteDevice")+'" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove"></i>'+window.lc.getValue("del")+'</button>';
		html+='<button id="'+id+'-exp" name="export" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("expt")+'"><i class="fa fa-cloud-download bigger-130"></i>'+window.lc.getValue("expt")+'</button>';
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html("");
		pn.append(html);
		
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "agCdrManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){
			var obj={};
			if(res && res.al){					
				obj["rows"]=res.al;
				obj.total=res["total"];
			}else{
				obj["rows"]=[];
				obj.total=0;
			}
			return obj;
		},
			queryParams:function(p){
			
				var params={};
	            window.global.getTreePara(params);
				params["limit"]=p.limit;
				params["start"]=p.offset;
				params["neUuid"]=row.uuid;
				if(p.search){
				params["search"]=p.search;
				}
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 5,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [5,10,25,50,100],
			search: true,
			showColumns: true,
			sortable: false,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			
			columns: [{
		        field: 'state',
		        checkbox: true,
		        cardVisible:false
		        
		      },{
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
				field: 'callerNumber',
				title: window.lc.getValue("caller"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'callNumber',
				title: window.lc.getValue("callee"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'peerAddr',
				title: window.lc.getValue("peerAddr"),
				align: 'center',
				valign: 'middle'
				,
		        formatter:function(value,row,index){					
		    	  return row.peerIp+":"+row.peerPort;
	        	},
			},{
				field: 'localAddr',
				title: window.lc.getValue("localAddr"),
				align: 'center',
				valign: 'middle',
		        formatter:function(value,row,index){					
		    	  return row.localIp+":"+row.localPort;
	        	},
			},{
				field: 'callDirection',
				title: window.lc.getValue("direction"),
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
					return window.lc.getValue("callDirection",value);
	        	}
			},{
				field: 'startTime',
				title: window.lc.getValue("startTime"),
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
			},{
				field: 'answerTime',
				title: window.lc.getValue("answerTime"),
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
			},{
				field: 'durationSec',
				title: window.lc.getValue("callDuration")+"("+window.lc.getValue("secs")+")",
				align: 'center',
				valign: 'middle'				
			},{
				field: 'payloadType',
				title: window.lc.getValue("payload"),
				align: 'center',
				valign: 'middle',
				formatter:function(value,row,index){
					return window.lc.getValue("payload",value);
	        	}
			},{
				field: 'endCode',
				title: window.lc.getValue("cdrEndCode"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					return value;
	        	}
			},{
				field: 'endReason',
				title: window.lc.getValue("cdrEndReason"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					return window.lc.getValue("cdrEndReason",value);
	        	}
			},{
				field: 'sessionNormal',
				title: window.lc.getValue("sessionStatus"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					return window.lc.getValue("sessionStatus",value);
	        	}
			},{
				field: 'rtpPacketSend',
				title: window.lc.getValue("sendPkt"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'rtpPacketRecv',
				title: window.lc.getValue("recvPkt"),
				align: 'center',
				valign: 'middle'
				
			},{
//				field: 'rtpJitter',
//				title: window.lc.getValue("jitterCnt")+"("+window.lc.getValue("secs")+")",
//				align: 'center',
//				valign: 'middle'
//				
//			},
//			{
				field: 'rtpJitterMean',
				title: window.lc.getValue("rtpJitterMean"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'rtpJitterMax',
				title: window.lc.getValue("rtpJitterMax"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'rtpLostRateMean',
				title: window.lc.getValue("rtpLostRateMean"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'rtpLostRateMax',
				title: window.lc.getValue("rtpLostRateMax"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'rtpDelayMax',
				title: window.lc.getValue("rtpDelayMax"),
				align: 'center',
				valign: 'middle'
				
			},{
				field: 'rtpDelayMean',
				title: window.lc.getValue("rtpDelayMean"),
				align: 'center',
				valign: 'middle'
				
			}]
		});
		 $("#"+id+"-del").bind('click',function(){
			
			 var rows=$('#'+id).bootstrapTable('getSelections');
			 if(rows.length==0){
					window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
					return;
				}
			 var cb=function(){
				 devFun.delDevDag(rows,id);
		    	}
		    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
	      
		 });
		 $("#"+id+"-clean").bind('click',function(){
			 
			  var neUuid=row.uuid;
			 var domainUuid=row.domainUuid;
			
			 if(neUuid==""||domainUuid==""){
					window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
					return;
				}
			 var cb=function(){
				 devFun.delDevDagAll(neUuid,domainUuid);
		    	}
		    	window.modal.confirm(window.lc.getValue("sureToClean")+'？',cb); 
	      	  
		 });
	    $("#"+pid+" button[name=back]").bind('click',function(){
			require(["dev-list"], function(grid) { 
				grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
			});	
	      });
	    $("#"+id+"-exp").bind('click',function(){
	    	
			var rows=$("#dev_list-list").bootstrapTable("getData");
			if(!rows || rows.length==0){
				window.tip.show_pk("info",null,window.lc.getValue("noRecords"));
				return;
			}
			var search=$("#dev_list input[type=text]").val();
			var params={};
			 window.global.getTreePara(params);
				params["neUuid"]=row.uuid;
				if(search){
				params["search"]=search;
				}
				devFun.expCdr(params);
	      	  
			
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
        createList:createList
    };
});


