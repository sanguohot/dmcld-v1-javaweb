define(["dev-tree","dev-sch","dev-fun","bootstrap-table"],function (tree,sch,fun){
	function createColEvents(pid,productId){
	    var cfg_restore=function(e, value, row, index){
//	        var rows=[row];
	        cfgRestore(row,productId);
	    }
	    window.operateEvents = {
	        'click a[action=cfg_restore]':cfg_restore
	    };
  }
  function cfgRestore(row,productId){
	  //实际上只支持单行
	 // params.provUrl="172.16.0.40";//文件上传路径
		//params.provUrl=window.extra.provUrl;
	  var cb=function(){
	  	  window.tip.show_pk("warning",5000,window.lc.getValue("settingWait"),true);
		  var ds=row.deviceSn;
	      $.ajax({
	        url: "neManager!updateNeActionStatus.action",
	        data: {productSn:ds,actionStatus:33,domainUuid:window.user.dstDomainUuid,name:row["name"],provUrl:"server02.dmcld.com",productId:productId},
	        type:"get",
	        complete: function(data,str){
	          if(data.responseJSON && data.responseJSON.success){
	            window.tip.show_pk("ok",null,window.lc.getValue("setSucc",1));
	          }else{
	            window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
	          }
	       }})  
	  }
	  if(window.sta.isOffline(row["runStatus"])){
		  window.tip.show_pk("warning",null,window.lc.getValue("devIsNotOnline"));
		  return;
	  }
	  window.modal.confirm(window.lc.getValue("devWillRestartContinue")+"？",cb);
  }
  function createConf(pid,row){
 var productId=row.productId; 
    pn=$("#"+pid);
    if(!pn){
      return;
    }
    var domainUuid=window.global.getDomainUuid();
    var id=pid+"_list";
    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
    if(pid.indexOf("dev_conf")<0){
      html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>';      
    }
    html+='<button name="del" type="button" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i></button>';
    html+='</div>';
    html+='<table id='+id+'></table>';
    pn.html(html);
    createColEvents(pid,productId);
    $('#'+id).bootstrapTable({
      method: 'get',
      url: "dmManager!getCfgList.action",
      cache: false,
//      height: 400,
      responseHandler:function(res){
        if(res && res.neCfgList){
          var obj={};
          obj["rows"]=res.neCfgList;
          obj.total=res["maxTotal"];
          return obj;
        }
        return res;
      },
      queryParams:function(p){
        var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
        params["limit"]=p.limit;
        params["start"]=p.offset;
        if(p.search)
        params["search"]=p.search;
        if(row){
        	params["neUuid"]=row["uuid"];
        }
        window.global.getTreePara(params);
        return params;
      },
      striped: true,
      toolbar:"#"+id+"-toolbar",
      pagination: true,
      pageSize: 10,
      sidePagination: "server",
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
        cardVisible:false,
      },{
		field: 'uuid',
		title: 'uuid',
		align: 'left',
		valign: 'middle',
		sortable: true,
		visible:false
      },{
        field: 'name',
        title: window.lc.getValue("name"),
        align: 'left',
        valign: 'middle',
        sortable: true
      },{
          field: 'alias',
          title: window.lc.getValue("alias"),
          align: 'left',
          valign: 'middle',
          sortable: true
      },{
          field: 'deviceSn',
          title: window.lc.getValue("productSn"),
          align: 'left',
          valign: 'middle',
          sortable: true
      },{
          field: 'runStatus',
          title: window.lc.getValue("runStatus"),
          align: 'center',
          valign: 'middle',
          sortable: true,
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
          field: 'defaultConfModel',
          title: window.lc.getValue("defaultConfModel"),
          align: 'left',
          valign: 'middle',
          sortable: true,
          formatter:function(value,row,index){
    	  	if(value==1){
    	  		return window.lc.getValue("defaultFile");
    	  	}else{
    	  		return window.lc.getValue("normalFile");
    	  	}
  	  		
          }
      },{
        field: 'type',
        title: window.lc.getValue("type"),
        align: 'left',
        valign: 'middle',
        sortable: true,
        formatter:function(value,row,index){
	  		return window.lc.getValue("cfgType",value);
      	}
      },{
        field: 'time',
        title: window.lc.getValue("createTime"),
        align: 'left',
        valign: 'middle',
        clickToSelect: false,
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
          align: 'left',
          valign: 'middle',
          clickToSelect: false
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
				+'<a action="cfg_restore" class="green" href="#" title="'+window.lc.getValue("cfgRestore")+'">'
				+'<i class="fa fa-cloud-download bigger-130"></i>'
				+'</a></br>';
	    	  return html;
          },
          events:operateEvents
      }],
        onClickRow: function (row) {}
    });
    $("#"+pid+" button[name=back]").bind('click',function(){
		require(["dev-list"], function(grid) { 
			grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
		});	
      });
    $("#"+pid+" button[name=del]").bind('click',function(){
		var rows=$('#'+id).bootstrapTable('getSelections');
    	if(rows.length==0){
    		window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
    		return;
    	}
    	var cb=function(){
        	var ids="";
        	for(var i=0;i<rows.length;i++){
        		if(ids!=""){
        			ids+=",";
        		}
        		ids+=rows[i].uuid;
        	}
	      $.ajax({
	        url: "dmManager!delCfgList.action",
	        data: {ids:ids},
	        type:"get",
	        complete: function(data,str){
	          if(data.responseJSON && data.responseJSON.success){
	        	  window.list.delRefresh(id,rows);
	        	  window.tip.show_pk("success",null,window.lc.getValue("delSucc"));
	          }else{
	            window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
	          }
	       }})
    	}
    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);  
    	
      });    
    window.list.changeForAce(pid);
    
	$(window).resize(function () {
		window.list.changeView(pid,id,600);
	});
	window.list.changeView(pid,id,600);
  }

  return {
    createConf:createConf
  };
});


