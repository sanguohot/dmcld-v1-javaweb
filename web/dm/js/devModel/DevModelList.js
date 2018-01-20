/**
 * Created by Rainc on 2015/3/20.
 */
define(["devModel-tree","devModel-fun","pri-pri","bootstrap-table"],function (dmt,dmf,pri){
	function createColEvents(pid,id){
	    var set=function (e, value, row, index) {
	    	
	    	editModel(id,[row]);
			
	    };
	    var apply=function(e, value, row, index){
	    	
	    	applyModel(pid,id,[row]);
			
	    }
	      
	    window.operateEvents = {
	        'click a[action=set]':set,
	        'click a[action=apply]':apply
	    };
  }
  function popupModel(id){
	if(window.global.getEtype() != 'producttype'){
		 window.tip.show_pk("warning",null,window.lc.getValue("youShouldSelDomainOrType"));
		 return;
	} 
	var node=window.global.getNode()
    var domainUuid = window.global.getDomainUuid();
    var productId = node.attr("uuid");
    if(domainUuid != 0 && productId != undefined){
      var url = 'model_manage/index.html#/0/' + domainUuid + '/' + productId + '/0/0/0';
      var newWindow = window.open(url);
      //判断窗口是否被关闭
      var checkClosed = setInterval(function(){
        if(newWindow.closed==true){
          $('#' + id).bootstrapTable('refresh', {silent: false});
          clearInterval(checkClosed);
        }
      },1000)
    }else{
      window.tip.show_pk("warning",null,window.lc.getValue("youShouldSelDomainOrType"));
    }
  }
  function delModel(id){
    var rows=$('#'+id).bootstrapTable('getSelections');
    var domainUuid =window.global.getDomainUuid();
    var uuids = '';
    if(rows.length==0){
      window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
      return;
    }else if(rows.length == 1){
      uuids += rows[0]['uuid'] ;
    }else{
      for ( var i = 0; i < rows.length - 1; i++) {
        uuids += rows[i]['uuid'] + ',';
      }
      uuids += rows[rows.length -1]['uuid'];
    }
    //生成确认对话框
    dmf.createModConfirm();

    $('#myModal').modal().css({
      width: 'auto',
      backdrop:false
    });
    $('#myModal button[name=commit]').bind("click",function(){
      $.ajax({
        url: "batchManager!deleteBatchByUuids.action",
        data: {domainUuid:domainUuid,uuids:uuids},
        type:"get",
        complete: function(data,str){
          $('#myModal button[name=close]').trigger("click");
          if(data.responseJSON && data.responseJSON.success){
            window.tip.show_pk("ok",null,window.lc.getValue("delSucc"));
            window.list.delRefresh(id,rows);
          }else{
            window.tip.show_pk("danger",null,window.lc.getValue("delFail"));
          }
        }})
    });
  }
  function editModel(id,rs){
    var rows=$('#'+id).bootstrapTable('getSelections');
    if(rs){
    	rows=rs;
    }
    if(rows.length==0){
      window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
      return;
    }else if(rows.length > 1){
      window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
      return;
    }else{
      var uuid = rows[0]['uuid'];
      var productId = rows[0]['productId'];
      var domainUuid = rows[0]['domainUuid'];
      var modelName = rows[0]['name'];
      var detailDesc = rows[0]['detailDesc'] == '' ? 0 : rows[0]['detailDesc'];
      var filePath = rows[0]['filePath'];
      var url = 'model_manage/index.html#/'+ uuid + '/' + domainUuid + '/' + productId + '/' + modelName + '/' + detailDesc;

      if(filePath){
        filePath = filePath.replace('/','$');
        filePath = filePath.replace('\\','$');
        url += '/' + filePath+"?"+new Date().getTime();
        var newWindow = window.open(url);
        //判断窗口是否被关闭
        var checkClosed = setInterval(function(){
          if(newWindow.closed==true){
            $('#' + id).bootstrapTable('refresh', {silent: false});
            clearInterval(checkClosed);
          }
        },1000)
      }else{
        window.tip.show_pk("danger",null,window.lc.getValue("canNotFindCache"));
      }
    }
  }
  function applyModel(pid,id,rs){
    var rows=$('#'+id).bootstrapTable('getSelections');
    if(rs){
    	rows=rs;
    }
    if(rows.length==0){
      window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
      return;
    }else if(rows.length > 1){
      window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
      return;
    }else{
      var modelUuid = rows[0]['uuid'];
      var domainUuid= rows[0]['domainUuid'];
      require(["dev-list"], function(grid) {
        window.tip.show_pk("info",null,window.lc.getValue("plSelDevToApply"));
        grid.createDevList2(pid,pid+"_child","nesInSiteManager!getNeInSiteList.action",modelUuid,domainUuid);
      });
    }
  }
  function createDevModList(pid,id,url){
    var pn=$("#"+pid);
    if(!pn){
      return;
    }
    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
    if(window.global.getEtype() == 'producttype'){
      html += '<button id="'+id+'-add" style="display:'+window.global.getClass("addDevice")+'" class="btn btn-success btn-sm" title="'+window.lc.getValue("add")+'"><i class="fa fa-plus bigger-130"></i></button>'
//        +'<button id="'+id+'-apply" type="submit" class="btn btn-default btn-width">Apply</button>'
    }
    html+='<button id="'+id+'-del" style="display:'+window.global.getClass("deleteDevice")+'" class="btn btn-danger btn-sm" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove bigger-130"></i></button>'
//      +'<button id="'+id+'-edit" type="submit" class="btn btn-default btn-width">Edit</button>'
      +'</div>'
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
    createColEvents(pid,id);
    $('#'+id).bootstrapTable({
      method: 'get',
      url: url,
      cache: false,
//      height: 500,
      responseHandler:function(res){
        if(res && res.batchList){
          return res.batchList;
        }
        return res;
      },
      queryParams:function(){
        var params={};
        window.global.getTreePara(params);
          return params;
      },
      striped: true,
      toolbar:"#"+id+"-toolbar",
      pagination: true,
      pageSize: 10,
      pageList: [10, 25, 50, 100, 200],
      search: true,
      showColumns: true,
      showRefresh: true,
      showToggle:true,
      minimumCountColumns: 2,
      clickToSelect: true,
      columns: [{
        field: 'state',
        checkbox: true,
        valign: 'middle',
      },{
        field: 'uuid',
        title: 'uuid',
        align: 'left',
        valign: 'middle',
        sortable: true,
        visible: false
      },{
        field: 'name',
        title: window.lc.getValue("name"),
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'productId',
        title: window.lc.getValue("productId"),
        align: 'left',
        valign: 'middle',
        sortable: true
      },{
        field: 'productName',
        title: window.lc.getValue("productName"),
        align: 'left',
        valign: 'middle',
        sortable: true,
        visible: false
      }, {
        field: 'detailDesc',
        title: window.lc.getValue("desc"),
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'domainUuid',
        title: 'domainUuid',
        align: 'left',
        valign: 'middle',
        sortable: true,
        visible: false
      },{
        field: 'status',
        title: window.lc.getValue("status"),
        align: 'left',
        valign: 'middle',
        sortable: true,
        visible:false
      },{
        field: 'createTime',
        title: window.lc.getValue("createTime"),
        align: 'left',
        valign: 'middle',
        sortable: true,
        formatter:function(value,row,index){
	  		if(value){
	  			return window.format.timeStaticFormat(value);
	  		}
	  		return "---";
     	}
      },{
        field: 'updateTime',
        title: window.lc.getValue("updateTime"),
        align: 'left',
        valign: 'middle',
        sortable: true,
        formatter:function(value,row,index){
	  		if(value){
	  			return window.format.timeStaticFormat(value);
	  		}
	  		return "---";
     	}
      },{
        field: 'packageVersion',
        title: window.lc.getValue("version"),
        align: 'left',
        valign: 'middle',
        sortable: true,
        visible: false
      },{
          field: '',
          title: '',
          align: 'left',
          valign: 'middle',
          sortable: true,
          clickToSelect: true,
          formatter:function(value,row,index){
    	  	var html='';
    	  	if(window.global.getClass("modifyDevice")=='inline-block'){
			html+='<a action="set" class="green" href="#" title="'+window.lc.getValue("set")+'">'
				+'<i class="fa fa-pencil bigger-130"></i>'
				+'</a>'
				+'&nbsp;';
			if(window.global.getEtype() == 'producttype'){
			html+=''
				+'<a action="apply" class="blue" href="#" title="'+window.lc.getValue("apply")+'">'
				+'<i class="fa fa-mars-stroke-h  bigger-130"></i>'
				+'</a>'
				+'&nbsp;';
			}
    	  	}
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
    //Add event
    $("#"+ id +"-add").click(function(e){
    
      popupModel(id);      //检验域和产品类型，弹出模板设置页面
		
    })
    $("#"+ id +"-del").click(function(e){
    	
    	delModel(id); 
		            //删除模板
//	  	var cb=function(){
//	  		delModel(id);      //删除模板
//		}
//		window.modal.confirm('确定删除该项？',cb);   
    })
    $("#"+ id +"-edit").click(function(e){
    	
      editModel(id);      //编辑已有模板
		
    })
    $("#"+ id +"-apply").click(function(e){
    	
      applyModel(pid,id);      //应用模板
		
    })
  }

  return {
    createDevModList:createDevModList
  };
});


