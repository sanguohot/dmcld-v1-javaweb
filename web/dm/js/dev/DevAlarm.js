define(["dev-tree","dev-sch","dev-fun","alarm-fun","alarm-column","alarm-win","pri-pri","bootstrap-table"],function (tree,sch,fun,afun,column,win,pri){
	function createColEvents(pid,id){
	    var view=function (e, value, row, index) {
	    	  if(row.neUuid && row.domainUuid){
			      var params={neUuid:row.neUuid,dstDomainUuid:row.domainUuid};
			      require(["dev-panel"], function (panel){
			        panel.loadRemoteData(pid,pid+"_form",params);
			      });
	    	  }else{
	    		  window.tip.show_pk("info",null,window.lc.getValue("notDevAlarm"));
	    	  }
	    };
	    var confirm=function (e, value, row, index) {
	    	
	    	   afun.confirm(pid,id,[row]);
		   	     
	    };
	    var remote=function (e, value, row, index) {
	    	
	    	fun.doRemoteWeb(row.neSn,row.neUuid,row.domainUuid);
		   	     
	    };
	    var all=function (e, value, row, index) {
	    	win.createView(row.neUuid,column,row);
	    };
	    window.operateEvents = {
	        'click a[action=view]':view,
	        'click a[action=confirm]':confirm,
	        'click a[action=remote]':remote,
	        'click a[action=all]':all,
	    };
	}
	function createAlarmList2(pid,url,cv){		
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='';
		var cid=pid+"-alarm";
		createColEvents(pid,cid);
		var html='<div id="'+cid+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
	    if(pid.indexOf("dev_alarm")<0){
	      html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
	    	  
	    }
		html+='<button name="export" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("expt")+'"><i class="fa fa-cloud-download bigger-130"></i>'+window.lc.getValue("expt")+'</button>';
		html+='<button name="confirm" type="button" style="display:'+window.global.getClass("confirmAlarm")+'" class="btn btn-sm btn-info" title="'+window.lc.getValue("confirm")+'"><i class="fa fa-check bigger-130"></i>'+window.lc.getValue("confirm")+'</button>';
		html+='</div>';
		html+='<table id='+cid+'></table>';
		pn.html("");
		pn.append(html);
		var cardView=false;
		if(cv){
			cardView=true;
		}
		$('#'+cid).bootstrapTable({
			method: 'get',
			url: url,
			cache: false,
//			height: 500,
			cardView:cardView,
			responseHandler:function(res){
				var obj={};
				if(res && res.total){				
					obj["rows"]=res.alarmList;
					obj.total=res["total"];
				}else{
					obj["rows"]=[];
					obj.total=0;
				}
				return obj;
			},
			queryParams:function(p){
				var pa=window.devAlarm.params;
	        	if(pid.indexOf("dev_alarm")>=0){
	        		pa=null;
	        	}
	            var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
	            if(pa){
	            	params=pa;
	            	params.mainSearch=$.trim($('#dev_tag').val());
	            	params.upSearch=sch.getSchPara();
	            }
	            window.global.getTreePara(params);
				params["limit"]=p.limit;
				params["start"]=p.offset;
				if(p.search){
					params["sip"]=p.search;
				}
				return params;
			},
			striped: true,
			toolbar:"#"+cid+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
			search: true,
			searchOnEnterKey:true,
			showColumns: true,
			showRefresh: true,
			queryParamsType:'limit',
			sidePagination: "server",
			showToggle:true,
			smartDisplay:true,
			minimumCountColumns: 2,
			clickToSelect: true,
			columns: column.getColumn(true,true)
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,cid,600);
		});
		window.list.changeView(pid,cid,600);
	    $('#'+cid).on('post-body.bs.table', function () {
	    	$('#'+cid+' [data-rel=tooltip]').tooltip();
	    })
		$("#"+pid+" button[name=back]").bind('click',function(){
		      if(pid.indexOf("dev_alarm")<0){
				require(["dev-list"], function(grid) {
					var url="dmManager!getNeList.action";
					if(pid.indexOf("dev_calc")>=0){
						url="dmManager!getNeList2.action";
					}
					grid.createDevList2(pid,pid+"_child",url);
				});
		      }
		    });
	    $("#"+pid+" button[name=confirm]").bind('click',function(){
	    	
			  var rows=$('#'+cid).bootstrapTable("getSelections");
			  afun.confirm(pid,cid,rows);
		   	     
		});
		$("#"+pid+" button[name=export]").bind('click',function(){
			var rows=$('#'+cid).bootstrapTable("getData");
			if(!rows || rows.length==0){
				window.tip.show_pk("info",null,window.lc.getValue("noRecords"));
				return;
			}
				var pa=window.devAlarm.params;
	        	if(pid.indexOf("dev_alarm")>=0){
	        		pa=null;
	        	}
	            var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
	            if(pa){
	            	params=pa;
	            	params.mainSearch=$.trim($('#dev_tag').val());
	            	params.upSearch=sch.getSchPara();
	            }
	            window.global.getTreePara(params);
				window.tip.show_pk("info",10,window.lc.getValue("exportingWait"),true);
				$.ajax({ 
					url: "exportConfig!exportDevAlarm.action",
					data:params,
					complete: function(data,str){
					window.tip.close_pk();
					$('#'+cid).bootstrapTable("refresh");
					$('#myModal button[name=close]').trigger("click");
					if(data.responseJSON && data.responseJSON.success){
						window.tip.show_pk("success",null,window.lc.getValue("exportSucc"));
						window.location.href="download/"+data.responseJSON["fileName"];
					}else{
						window.tip.show_pk("danger",null,window.lc.getValue("exportFail"));
					}
				}});	
		    });
	}
	
    return {
    	createAlarmList2:createAlarmList2
    };
});


