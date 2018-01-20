define(["dev-tree","service-fun","pri-pri","bootstrap-table"],function (tree,fun,pri){  
  function createColEvents(pid){
	  	var id=pid+"_child";
//	    var view=function (e, value, row, index) {
//		      var uuid=row.uuid;
//		      var domainUuid=row.domainUuid;
//		      var params={neUuid:uuid,dstDomainUuid:domainUuid};
//		      require(["dev-panel"], function (panel){
//		        panel.loadRemoteData(pid,pid+"_form",params);
//		      });
//	    };
//	    
	    var set=function(e, value, row, index){
	    	
	    	var rows=[row];
	        fun.setNum(id,rows);
			
	    }
//	    var remote=function(e, value, row, index){
//	    	var rows=[row];
//	        fun.remoteDev(rows);
//	    }
//	    
	    window.operateEvents = {
	        'click a[action=set]':set
//	        'click a[action=remote]':remote
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
    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
    html+='<button id="'+id+'-add" style="display:'+window.global.getClass("addDevice")+'" class="btn btn-success btn-sm "><i class="fa fa-plus bigger-130"></i>&nbsp;'+window.lc.getValue("add")+'</button>';
    html+='<button id="'+id+'-del" style="display:'+window.global.getClass("deleteDevice")+'" class="btn btn-danger btn-sm "><i class="fa fa-remove bigger-130"></i>&nbsp;'+window.lc.getValue("del")+'</button>';
//    html+='<button id="'+id+'-set" class="btn btn-success btn-sm visible-lg-block"><i class="fa fa-pencil bigger-130"></i>&nbsp;修改</button>';
    html+='<button id="'+id+'-export" class="btn btn-info btn-sm visible-lg-block"><i class="fa fa-download bigger-130"></i>&nbsp;'+window.lc.getValue("expt")+'</button>';
    html+='<button id="'+id+'-import" style="display:'+window.global.getClass("addDevice")+'" class="btn btn-info btn-sm "><i class="fa fa-upload bigger-130"></i>&nbsp;'+window.lc.getValue("impt")+'</button>';
//    html+='<button id="'+id+'-all" class="btn btn-info btn-sm visible-lg-block"><i class="fa fa-sellsy bigger-130"></i>&nbsp;全选</button>';
    html+='</div>';
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
    createColEvents(pid);
    $('#'+id).bootstrapTable({
      method: 'get',
      url: "numDMManager!findNumList.action",
      cache: false,
//      height: 400,
      responseHandler:function(res){
    	var obj={};
        if(res && res.numList && res.total){
          var ret={};
          ret["rows"]=res.numList;
          ret.total=res.total;
          return ret;
        }
        return res;
      },
      queryParams:function(p){
          var params={num:$.trim($('#dev_tag').val())};
          window.global.getTreePara(params);
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
		field: 'domainUuid',
		title: 'domainUuid',
		align: 'center',
		valign: 'middle',
		sortable: true,
		visible:false
      },{
        field: 'num',
        title: window.lc.getValue("num"),
        align: 'center',
        valign: 'middle',
        sortable: true,
      },{
          field: 'action',
          title: window.lc.getValue("option"),
          align: 'center',
          valign: 'middle',
          sortable: true,
          formatter:function(value,row,index){
    	  	return window.lc.getValue("dmNumAction",value);
          }	  
      },{
		field: 'createTime',
		title: window.lc.getValue("createTime"),
		align: 'center',
		valign: 'middle',
		sortable: true,
        formatter:function(value,row,index){
	  		if(value){
	  			return window.format.timeStaticFormat(value);
	  		}
	  		return "---";
       	}
	  },{
        field: 'detailDesc',
        title: window.lc.getValue("desc"),
        align: 'center',
        valign: 'middle',
        sortable: true,
      },{
          field: '',
          title: '',
          align: 'center',
          valign: 'middle',
          sortable: true,
          clickToSelect: true,
          formatter:function(value,row,index){
	    	  	var html='';
					html+='<a action="set" class="green" href="#" title="'+window.lc.getValue("set")+'">'
					+'<i class="fa fa-pencil bigger-130"></i>'
					+'</a>'
					+'&nbsp;';
					if(window.global.getClass("addDevice")=='inline-block'){
				      return html;
					}else{
						return '';
					}
          },
          events:operateEvents
	    }]
    });
    $("#"+id+"-add").bind("click",function(){
    	
    	fun.addNum(id);
		
    });
    $("#"+id+"-del").bind("click",function(){
    	
    	var rows=$('#'+id).bootstrapTable('getSelections');
		if(rows.length==0){
			window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
			return;
		}    	
    	var cb=function(){
    		fun.delNum(id,rows);
    	}
    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);  
		
    });
    $("#"+id+"-set").bind("click",function(){
    	
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.setNum(id,rows);
		
    });
    $("#"+id+"-export").bind("click",function(){
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.exportNum(id,rows);
    });
    $("#"+id+"-import").bind("click",function(){
    	
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.importNum(id,rows);
		
    });
    window.list.changeForAce(pid);
	$(window).resize(function () {
		window.list.changeView(pid,id,600);
	});
	window.list.changeView(pid,id,600);
  }

  return {
	  //创建黑名单列表
	  createList:createList
  };
});


