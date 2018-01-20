define(["service-fun","pri-pri","bootstrap-table"],function (fun,pri){
  function createColEvents(pid){
	    window.operateEvents = {
	    };
  }
  function createList(pid){
    pn=$("#"+pid);
    if(!pn){
      return;
    }
    var domainUuid=window.global.getDomainUuid();
    var id=pid+"-child"; 
    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
    html+='<button name="set" type="button" style="display:'+window.global.getClass("modifyDevice")+'"  class="btn btn-sm btn-success" title="'+
    window.lc.getValue("set")+'"><i class="fa fa-pencil bigger-130"></i>&nbsp;'+window.lc.getValue("set")+'</button>';
    html+='</div>'   
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
//    createColEvents(pid);
    $('#'+id).bootstrapTable({
      method: 'get',
      url: 'dmManager!getSipServerList.action',
      cache: false,
//      height: 400,
      responseHandler:function(res){
        if(res && res.devList){
          var obj={};
          obj["rows"]=res.devList;
          obj.total=res["total"];
          return obj;
        }
        return res;
      },
      queryParams:function(p){
          var params={mainSearch:$.trim($('#dev_tag').val())};
          params["limit"]=p.limit;
          params["dstDomainUuid"]=domainUuid;
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
//			pageList: [3,25],
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
        field: 'alias',
        title: window.lc.getValue("name"),
        align: 'center',
        valign: 'middle',        
        formatter:function(value,row,index){
    	  return value;
        },
    	cellStyle:function(value,row,index){
    		return {
			    css: {"min-width": "120px"}
			};
    	}
      },{
          field: 'productSnStr',
          title: window.lc.getValue("productSn"),
          align: 'center',
          valign: 'middle',
      	  cellStyle:function(value,row,index){
  			return {
			    css: {"min-width": "140px"}
  			};
	  	  }
//      },{
//        field: 'productName',
//        title: window.lc.getValue("productName"),
//        align: 'center',
//        valign: 'middle',
//        sortable: true
      },{
        field: 'runStatus',
        title: window.lc.getValue("runStatus"),
        align: 'center',
        valign: 'middle',        
        formatter:function(value,row,index){
          var t=window.lc.getValue("runStatus",value);
          var ret=t;
          var cls="";
          if(value==0 || value==9 || value==18 || value==21 || value==6){
        	  cls="label label-danger";
          }else if(value==3 || value==10){
        	  cls="label label-success";
          }else if(value==11){
        	  cls="label label-warning";
          }else{
        	  cls="label label-info";
          }
          ret='<span class="'+cls+'">'+t+'</span>';
          return ret;
        }
      },{
          field: 'sipsrvLockFlag',
          title: window.lc.getValue("sipsrvLockFlag"),
          align: 'center',
          valign: 'middle',
          
          formatter:function(value,row,index){
      	  return window.format.getPrivilegeImg(value);
          },
//          events:operateEvents
       },{
           field: 'primarySipServer',
           title: window.lc.getValue("priSipAddr"),
           align: 'center',
           valign: 'middle',          
           formatter:function(value,row,index){
    	   return window.format.getDisplayValue("","",value);
           },
//           events:operateEvents
        },{
            field: 'primarySipsrvPort',
            title: window.lc.getValue("priSipPort"),
            align: 'center',
            valign: 'middle',           
            formatter:function(value,row,index){
        	return window.format.getDisplayValue("","",value);
            },
//            events:operateEvents
         },{
             field: 'secondarySipServer',
             title: window.lc.getValue("secSipAddr"),
             align: 'center',
             valign: 'middle',            
             formatter:function(value,row,index){
         	  	return window.format.getDisplayValue("","",value);
             },
//             events:operateEvents
         },{
             field: 'secondarySipsrvPort',
             title: window.lc.getValue("secSipPort"),
             align: 'center',
             valign: 'middle',             
             formatter:function(value,row,index){
        	 return window.format.getDisplayValue("","",value);
             }
//             events:operateEvents
          },{
              field: 'sipserverSetResult',
              title: "锁定结果",
              align: 'center',
              valign: 'middle'
           }]
    });
    window.list.changeForAce(pid);
    
    $("#"+pid+" button[name=set]").bind('click',function(){
    	
        var rows=$('#'+id).bootstrapTable('getSelections');
        fun.setSipServer(id,rows);
		
      });
	$(window).resize(function () {
		window.list.changeView(pid,id,600);
	});
	window.list.changeView(pid,id,600);
  }

  return {
	  createList:createList
  };
});


