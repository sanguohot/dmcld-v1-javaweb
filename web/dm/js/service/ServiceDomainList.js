define(["bootstrap-table","form-field",'text!html/modal.html'],function (bt,field,modal){
	function createColEvents(pid,id){
	    var set=function(e, value, row, index){
	    	var rows=[row];
	        setDcSwitch(pid,id,rows);
	    }

	    window.operateEvents = {	        
	        'click a[action=set]':set
	    };
	}
	function toFirst(pid){
		var id=pid+"-list";
		$('#'+id).bootstrapTable("selectPage",1);
	}
	function createList(pid){
	    pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
		var id=pid+"-list";
		createColEvents(pid,id);
		var html="";
		html+='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		html+='<button name="set" type="button" class="btn btn-sm btn-success" title="'+window.lc.getValue("set")+'"><i class="fa fa-pencil bigger-130"></i>'+window.lc.getValue("set")+'</button>';
		html+='</div>';
		html+='<table id='+id+'></table>';
		pn.html(html);
		$('#'+id).bootstrapTable({
			method: 'get',
			url: "domainListManager!getList.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.domainList){
					var obj={};
					obj["rows"]=res.domainList;
					obj.total=res["maxTotal"];
					return obj;
				}else{
					var obj={};
					obj["rows"]=[];
					obj.total=0;
					return obj;
				}
			},
			queryParams:function(p){
				var params="domainUuid="+window.global.getDomainUuid();
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				if(p.search)
				params+="&search="+p.search;
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 8,
//			pageNumber:1,
			sidePagination: "server",
			pageList: [8,25,50],
			search: true,
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
		        checkbox: true,
		        cardVisible:false
		    },{
				field: 'name',
				title: window.lc.getValue("name"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'alias',
				title: window.lc.getValue("alias"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					var ret="-";
					if(value){
						ret=value;
					}
					return ret;
	        	}
			},{
				field: 'dcSwitch',
				title: window.lc.getValue("dcSwitch"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					var str="",cls="";
					if(!value){
						str=window.lc.getValue("close");
						cls="label label-danger";
					}else if(value==2){
						str=window.lc.getValue("open");
						cls="label label-success";
					}else{
						str=window.lc.getValue("close");
						cls="label label-danger";
					}
					
					ret='<span class="'+cls+'">'+str+'</span>';
					return ret;
	        	}
			},{
				field: 'createTime',
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
			},{
				field: 'detailDesc',
				title: window.lc.getValue("desc"),
				align: 'center',
				valign: 'middle',
			    formatter:function(value,row,index){
					if(value){
						return value;
					}
					return "-";
	        	}
			},{
	          field: '',
	          title: window.lc.getValue("operate"),
	          align: 'left',
	          valign: 'middle',
	          clickToSelect: true,
	          formatter:function(value,row,index){
				var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
					var set='<a action="set" class="green tooltip-success" href="#" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>';
					html+=set;
					html+='</div>';
					var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
						  +'<div class="inline position-relative">'
						    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
						      +'<i class="fa fa-cog icon-only bigger-110"></i>'
						    +'</button>'
						    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
						      +'<li>'+set+'</li>'
						    tmp+='</ul>'
						  +'</div>'
						+'</div>';
					tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
					html+=tmp;
		    	  return html;
	          },
	          events:operateEvents
	      }]
		});
		
	    $("#"+pid+" button[name=set]").bind('click',function(){
	    	var rows=$('#'+id).bootstrapTable('getSelections');
	    	setDcSwitch(pid,id,rows);
	    });
	    $('#'+id).on('post-body.bs.table', function () {
	    	window.list.changeForAce(pid);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}
	function setDcSwitch(pid,id,rows){
		var pn=$("#myModal");
		if(!pn) return;
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}
	    var body='<form class="" role="form">'
	    +field.getRadioField("dcSwitch","",window.lc.getValue("dcSwitch"),[{value:2,text:window.lc.getValue("open")},{value:1,text:window.lc.getValue("close")}]);
	    +'</form>';
	    var tempFn = window.dot.template(modal);
	    var html=tempFn({title:window.lc.getValue("set"),commit:true,body:body
	    	,commitLan:window.lc.getValue("commit"),close:window.lc.getValue("close")});	
		pn.html(html);	
        
		$('#myModal').modal().css({
		    width: 'auto',
		    backdrop:false,
		});
	    if(rows.length==1){
	      var dcSwitch=rows[0].dcSwitch;
	      if(!dcSwitch){
	    	  $('#myModal input[value=1]').trigger("click");
	      }else if(dcSwitch==2){
	    	  $('#myModal input[value=2]').trigger("click");
	      }else{
	    	  $('#myModal input[value=1]').trigger("click");
	      }
	    }
		$('#myModal button[name=commit]').bind("click",function(){
			doSet(pid,id,rows);
		});
	}
	function doSet(pid,id,rows){
		var ids="";
        for ( var i = 0; i < rows.length; i++) {
            if(i==0){
                ids=rows[i]["uuid"];
            }else {
                ids=ids+","+rows[i]["uuid"];
            }
        }
		var params=$('#myModal form').formSerialize();
		params+="&ids="+ids;
		$.ajax({ 
			url: "domainManager!updateDcSwitch.action",
			data:params,
			type:"POST",
			complete: function(data,str){
				$('#myModal button[name=close]').trigger("click");
				if(window.global.getDomainUuid()){
					$('#breadcrumbs a[mid=service_manage]').trigger("click");
				}else{
					$('#'+id).bootstrapTable('refresh');					
				}				
				
				if(data.responseJSON && data.responseJSON.success){				
					window.tip.show_pk("success",null,window.lc.getValue("commitSucc"));
				}else{
					window.tip.show_pk("danger",null,window.lc.getValue("commitFail"));
				}
		}});
	}
    return {
    	createList:createList
    };
});


