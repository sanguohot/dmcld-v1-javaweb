define(function(){
	function createView(pid,row){
		pn=$("#"+pid);
	    if(!pn){
	      return;
	    }
	   id=pid+"_ip_list";
	    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
	       html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
	       html+='</div>'
	       html+='<table id='+id+'></table>';
	    pn.html("");
	    pn.append(html);
	    $('#'+id).bootstrapTable({
		      method: 'get',
		      url: "runLogManager!getIpList.action",
		      cache: false,
//		      height: 400,
		      responseHandler:function(res){
		    	if(res && res.logList){
					var obj={};
					obj["rows"]=res.logList;
					obj.total=res["total"];
					return obj;
				}
				return res;
		      },
		      queryParams:function(p){
		            var params={};
		            params.productSns=row.productSns;
		            params.limit=p.limit;
		            params.start=p.offset;
		            
		            return params;
		        
		      },
		      striped: true,
		      toolbar:"#"+id+"-toolbar",
//		      toolbarAlign:'right',
		      pagination: true,
		      pageSize: 10,
//					pageNumber:1,
		      sidePagination: "server",
				pageList: [10,25],
		    //  search: true,
		      searchOnEnterKey:true,
//		      searchText:"Sip Account",
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
				field: 'uuid',
				title: 'uuid',
				align: 'center',
				valign: 'middle',
//				sortable: true,
				visible:false
		      },{
		        field: 'reportTime',
		        title: window.lc.getValue("time"),
		        align: 'left',
		        valign: 'middle',
		        formatter:function(value,row,index){
		        return window.format.timeStaticFormat(value);
		      }
		      },{
		          field: 'log',
		          title: window.lc.getValue("ipAddr"),
		          align: 'center',
		          valign: 'middle',
//		          sortable: true,
		          formatter:function(value,row,index){
			      return value.substring(value.indexOf('addr:')+5,value.indexOf('inner_ip')-2)
			      }
//		          width:155,
		      },{
		        field: 'log',
		        title: window.lc.getValue("innerIpAddr"),
		        align: 'center',
		        valign: 'middle',
		        formatter:function(value,row,index){
		    	 return value.substring(value.indexOf('inner_ip')+9)  
		      }  
		        }]
				 
	})
	
	  $('#'+id).on('post-body.bs.table', function () {
//	    	$('#'+id+' [data-rel=tooltip]').tooltip();
	    	window.list.changeForAce(pid,id,600);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	    
	    
	    $("button[name=back]").click(function(){
	    	$("#dev_manage").click();
	    	
	    })
	}
	return{
		createView:createView,
	}
})