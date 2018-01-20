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
	        fun.setWhiteNum(id,rows);
			
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
  function getColumns(type){
	  var col=[{
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
        field: 'callNum',
        title: window.lc.getValue("num"),
        align: 'center',
        valign: 'middle',
        sortable: true,
      },{
          field: 'role',
          title: window.lc.getValue("direction"),
          align: 'center',
          valign: 'middle',
          sortable: true,
          formatter:function(value,row,index){
    	  	return window.lc.getValue("role",value);
    	  	
          }	  
      }];
	  if(type=="black"){
		  col.push({
	        field: 'timeLimit',
	        title: window.lc.getValue("period")+'('+window.lc.getValue("mins")+')',
	        align: 'center',
	        valign: 'middle',
	        sortable: true,
	      });
		  col.push({
	        field: 'maxNum',
	        title: window.lc.getValue("callMaxNum"),
	        align: 'center',
	        valign: 'middle',
	        sortable: true,
	      });
	  }
	  col.push({
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
	  });
	  col.push({
	        field: 'detailDesc',
	        title: window.lc.getValue("desc"),
	        align: 'center',
	        valign: 'middle',
	        sortable: true,
	      });
	  col.push({
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
	    });

	  return col;
  }
  function createList(pid,type){
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
    html+='<button id="'+id+'-export" class="btn btn-info btn-sm visible-lg-block"><i class="fa fa-download bigger-130"></i>&nbsp;'+window.lc.getValue("expt")+'</button>';
    html+='<button id="'+id+'-import" style="display:'+window.global.getClass("addDevice")+'" class="btn btn-info btn-sm "><i class="fa fa-upload bigger-130"></i>&nbsp;'+window.lc.getValue("impt")+'</button>';
    html+='</div>';
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
    createColEvents(pid);
    var url="freqManager!getWhiteNum.action";
    if(type=="black"){
    	url="freqManager!getBlackNum.action";
    }
    $('#'+id).bootstrapTable({
      method: 'get',
      url: url,
      cache: false,
//      height: 400,
      responseHandler:function(res){
    	var obj={};
        if(res && res.fl && res.total){
          var ret={};
          ret["rows"]=res.fl;
          ret.total=res.total;
          return ret;
        }
        return res;
      },
      queryParams:function(p){
          var params={mainSearch:$.trim($('#dev_tag').val())};
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
      columns: getColumns(type)
    });
    $("#"+id+"-add").bind("click",function(){
    
    	fun.addWhiteNum(id,type);
		
    });
    $("#"+id+"-del").bind("click",function(){
    	
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	
    	var cb=function(){
    		fun.delWhiteNum(id,rows);
    	}
    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
		
    });
//    $("#"+id+"-set").bind("click",function(){
//    	var rows=$('#'+id).bootstrapTable('getSelections');
//    	fun.setNum(id,rows);
//    });
    $("#"+id+"-export").bind("click",function(){
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.exportWhiteNum(id,rows,type);
    });
    $("#"+id+"-import").bind("click",function(){
    	
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.importWhiteNum(id,rows,type);
		
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


