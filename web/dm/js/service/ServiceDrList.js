define(["dev-tree","service-fun","pri-pri","bootstrap-table"],function (tree,fun,pri){
  function createColEvents(pid){
	    var view=function (e, value, row, index) {
		      var uuid=row.uuid;
		      var domainUuid=row.domainUuid;
		      var params={neUuid:uuid,dstDomainUuid:domainUuid};
		      require(["dev-panel"], function (panel){
		        panel.loadRemoteData(pid,pid+"_form",params);
		      });
	    };
	    var id=pid+"_child";
	    var del=function(e, value, row, index){
	    	
	    	var rows=[row];
	        fun.delServer(id,rows);
			
	    }
	    var remote=function(e, value, row, index){
	    	var rows=[row];
	        fun.remoteSys(rows);
	    }
	    
	    window.operateEvents = {
	        'click a[action=view]':view,
	        'click a[action=remote]':remote,
	        'click a[action=del]':del
	    };
  }
  function createList(pid){
    pn=$("#"+pid);
    if(!pn){
      return;
    }
    var domainUuid=window.global.getDomainUuid();
    var id=pid+"_child"
    var html='';
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
    createColEvents(pid);
    $('#'+id).bootstrapTable({
      method: 'get',
      url: "dmManager!getSystemList.action",
      cache: false,
//      height: 400,
      responseHandler:function(res){
    	var obj={};
        if(res && res.sysList && res.total){
          var ret={};
          ret["rows"]=res.sysList;
          ret.total=res.total;
          return ret;
        }
        return res;
      },
      queryParams:function(p){
          var params={mainSearch:$.trim($('#dev_tag').val())};
          params["et"]=window.global.getEtype();
          params["dstDomainUuid"]=domainUuid;
          params["limit"]=p.limit;
          params["start"]=p.offset;
          return params;
      },
      striped: true,
      toolbar:"#"+id+"-toolbar",
//      toolbarAlign:'right',
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
        field: 'state',
        checkbox: true,
        cardVisible:true,
      },{
		field: 'uuid',
		title: 'uuid',
		align: 'center',
		valign: 'middle',
		sortable: true,
		visible:false
      },{
        field: 'name',
        title: '名称',
        align: 'center',
        valign: 'middle',
        sortable: true,
      },{
          field: 'sysIpAddr',
          title: 'IP地址',
          align: 'center',
          valign: 'middle',
          sortable: true,
          formatter:function(value,row,index){
      	 	return value;
          }	  
      },{
          field: 'detailDesc',
          title: '详细描述',
          align: 'center',
          valign: 'middle',
          sortable: true,
          formatter:function(value,row,index){
      	 	return value;
          }	  
      },{
          field: '',
          title: '',
          align: 'left',
          valign: 'middle',
          sortable: true,
          clickToSelect: true,
          formatter:function(value,row,index){
	    	  var html='';
				html+=''
		    		+'<a action="del"  class="red" href="#" title="删除">'
					+'<i class="fa fa-remove bigger-130"></i>'
					+'</a>'
					+'&nbsp;';
				html+='<a action="remote" class="blue" href="#" title="远程访问">'
				+'<i class="fa fa-arrow-circle-right bigger-130"></i>'
				+'</a>';
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
  }

  return {
	  createList:createList
  };
});


