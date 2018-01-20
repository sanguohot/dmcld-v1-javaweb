define(["dev-tree","dev-sch","bootstrap-table"],function (tree,sch){
	function createAlarmList2(pid,url,cv){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var cid=pid+"-alarm";
		var html='';
		html+='<div id="'+cid+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		html+='<button name="export" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("expt")+'"><i class="fa fa-cloud-download bigger-130"></i>'+window.lc.getValue("expt")+'</button>';
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
				if(res && res.alarmList){
					var obj={};
					obj["rows"]=res.alarmList;
					obj.total=res["total"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params={mainSearch:$.trim($('#dev_tag').val())};
				params["et"]=window.global.getEtype();
				params["dstDomainUuid"]=window.global.getDomainUuid();
				params["limit"]=p.limit;
				params["start"]=p.offset;
				return params;
			},
			striped: true,
			toolbar:"#"+cid+"-toolbar",
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
				field: 'alarmSn',
				title: window.lc.getValue("sn"),
				align: 'center',
				valign: 'middle',
				sortable: true
			}, {
				field: 'alarmLevel',
				title: window.lc.getValue("alarmLevel"),
				align: 'center',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
		          var t=window.lc.getValue("alarmLevel",value);
		          var ret=t;
		          var cls="";
		          if(value==0){
		        	  cls="label label-danger";
		          }else if(value==1 || value==2 || value==3 || value==4){
		        	  cls="label label-warning";
		          }else{
		        	  cls="label label-info";
		          }
		          ret='<span class="'+cls+'">'+t+'</span>';
		          return ret;
		        }
			}, {
				field: 'reportTime',
				title: window.lc.getValue("time"),
				align: 'center',
				valign: 'middle',
				sortable: true,
		        formatter:function(value,row,index){
	    	  		if(value){
	    	  			return window.format.timeStaticFormat(value);
	    	  		}
	    	  		return "---";
		       	}
			}, {
				field: 'alarmName',
				title: window.lc.getValue("alarmName"),
				align: 'center',
				valign: 'middle',
				sortable: true,
			},{
				field: 'content',
				title: window.lc.getValue("content"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				if(window.lc.isEn()){
					return row["objectBrief"]+":"+row["alarmDesc"];
				}
				return row["objectBrief"]+":"+row["alarmDescCn"];
				}
			}],
			onClickRow: function (row) {

            }
		});
		$("#"+pid+" button[name=export]").bind('click',function(){
			var rows=$('#'+cid).bootstrapTable("getData");
			if(!rows || rows.length==0){
				window.tip.show_pk("info",null,window.lc.getValue("noRecords"));
				return;
			}
			var params={mainSearch:$.trim($('#dev_tag').val())};
			params["et"]=window.global.getEtype();
			params["dstDomainUuid"]=window.global.getDomainUuid();
			var url="exportConfig!exportServerAlarm.action";
			window.tip.show_pk("info",10,window.lc.getValue("exportingWait"),true);
			$.ajax({ 
				url: url,
				data:params,
				complete: function(data,str){
				window.tip.close_pk();
				$('#'+cid).bootstrapTable("removeAll");
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
		
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,cid,600);
		});
		window.list.changeView(pid,cid,600);
	}
	
    return {
    	createAlarmList2:createAlarmList2
    };
});


