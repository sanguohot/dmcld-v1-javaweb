define(["dev-tree","dev-sch","dev-fun","bootstrap-table"],function (tree,sch,fun){
  function createDevList(pid,id){
    pn=$("#"+pid);
    if(!pn){
      return;
    }
     $('#drpStatus').hide();
    var domainUuid=window.global.getDomainUuid();
    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
    	html+='<button id="'+id+'-add" class="btn btn-success btn-sm" title="'+window.lc.getValue("add")+'"><i class="fa fa-plus bigger-130"></i></button>';
    	html+='<button id="'+id+'-remote" type="submit" class="btn btn-info btn-sm" title="'+window.lc.getValue("remoteWeb")+'"><i class="fa fa-arrow-circle-right bigger-130"></i></button>';
    
    html+='</div>';
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
    $('#'+id).bootstrapTable({
      method: 'get',
      url: "dmManager!getUnknownNeList.action",
      cache: false,
      responseHandler:function(res){
        if(res && res.neNaList){
          var obj={};
          obj["rows"]=res.neNaList;
          obj.total=res["maxTotal"];
          return obj;
        }
        return res;
      },
      queryParams:function(p){
//				return {mainSearch:$.trim($('#dev_tag').val())?window.lc.parseValues($.trim($('#dev_tag').val())):""};
        var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
        window.global.getTreePara(params);
        params["limit"]=p.limit;
        params["start"]=p.offset;
        return params;
      },
      striped: true,
      toolbar:"#"+id+"-toolbar",
      pagination: true,
      pageSize: 10,
//			pageNumber:1,
      sidePagination: "server",
//			pageList: [10,25],
//      search: true,
      showColumns: true,
      showRefresh: true,
      queryParamsType:'limit',
      sidePagination: "server",
      showToggle:true,
      smartDisplay:true,
      minimumCountColumns: 2,
      clickToSelect: true,
      singleSelect:false,
      columns: [{
        field: 'state',
        checkbox: true
      },{
          field: 'addFlag',
          title: window.lc.getValue("addFlag"),
          align: 'left',
          valign: 'middle',
//          sortable: true,
          formatter:function(value,row,index){
    	  	if(value){
    	  		return window.lc.getValue("added");
    	  	}else{
    	  		return window.lc.getValue("notAdd");
    	  	}
          }
      },{
        field: 'productSnStr',
        title: window.lc.getValue("productSn"),
        align: 'left',
        valign: 'middle',
//        sortable: true
      },{
        field: 'productName',
        title: window.lc.getValue("productName"),
        align: 'left',
        valign: 'middle',
//        sortable: true
      },{
          field: 'alias',
          title: window.lc.getValue("alias"),
          align: 'left',
          valign: 'middle',
//          sortable: true
      }, {
        field: 'adminStatus',
        title: window.lc.getValue("adminStatus"),
        align: 'left',
        valign: 'middle',
//        sortable: true,
        formatter:function(value,row,index){
          return window.lc.getValue("adminStatus",value);
        }
      },{
        field: 'runStatus',
        title: window.lc.getValue("runStatus"),
        align: 'left',
        valign: 'middle',
//        sortable: true,
        formatter:function(value,row,index){
          return window.lc.getValue("runStatus",value);
        }
      },{
          field: 'sysName',
          title: window.lc.getValue("server"),
          align: 'left',
          valign: 'middle',
//          sortable: true
      },{
          field: 'domainName',
          title: window.lc.getValue("domain"),
          align: 'left',
          valign: 'middle',
//          sortable: true
      }, {
        field: 'lastRegTime',
        title: window.lc.getValue("regTime"),
        align: 'left',
        valign: 'middle',
        clickToSelect: false
      },{
          field: 'outerIpAddr',
          title: window.lc.getValue("outterIp"),
          align: 'left',
          valign: 'middle',
//          sortable: true
      }]
    });
    
    $("#"+id+"-add").bind('click',function(){
//			createAddDevHtml();
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.addUnknownDev(rows);
    });
    $("#"+id+"-remote").bind('click',function(){
    	var rows=$('#'+id).bootstrapTable('getSelections');
      	fun.remoteDev(rows,"nena");
    });
    window.list.changeForAce(pid);
	$(window).resize(function () {
		window.list.changeView(pid,id,600);
	});
	window.list.changeView(pid,id,600);
  }

  return {
    createDevList:createDevList
  };
});


