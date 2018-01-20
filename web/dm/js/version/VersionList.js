define(["ver-fun"],function (verFun){
  function createList(pid,productId){
		var view=function (e, value, row, index) {
		     verFun.creatVersionHtml(row,"my-tab-position")
		};
		
		window.operateEvents11={
		      'click a[action=view]':view
		    };
		
		
	  window.productIdNum2=productId;
	  var sysMode="";
	     $.ajax({
	    	 url:'registerManager!findCloudSys.action',
	    	 type:'post',
	    	 complete:function(data){
	    	 window.sysMode=data.responseJSON.sysMode;
	        } 
	     });
	  pn=$("#"+pid);
	  if(!pn){
	      return;
	    }
	  var id=pid+"_list";
	  var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
 if(window.sysMode==10||window.sysMode==11){
	  html+='<button id="'+id+'-add" type="submit" class="btn btn-sm btn-success" title="'+window.lc.getValue("add")+'"><i class="fa fa-plus"></i>'+window.lc.getValue("add")+'</button>';
	  html+='<button id="'+id+'-del" type="submit" class="btn btn-sm btn-danger" title="'+window.lc.getValue("del")+'"><i class="fa fa-remove"></i>'+window.lc.getValue("del")+'</button>';
	  }
	  html+='<button id="'+id+'-exp" name="export" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("expt")+'"><i class="fa fa-cloud-upload bigger-130"></i>'+window.lc.getValue("expt")+'</button>';
      html+='<button id="'+id+'-synVersion" type="submit" class="btn btn-sm btn-success" title="'+window.lc.getValue("synVersion")+'"><i class="fa fa-refresh"></i>'+window.lc.getValue("synVersion")+'</button>';
      html+='</div>'
      html+='<table id='+id+'></table>';
      pn.html("");
      pn.append(html);
      $('#'+id).bootstrapTable({
			method: 'get',
			url: "versionList!getVersionList1.action",
			cache: false,
//			height: 500,
			responseHandler:function(res){				
				if(res && res.versionList){
					var obj={};
					obj["rows"]=res.versionList;
					obj.total=res["total"];
					return obj;
				}
				return res;
			},
			queryParams:function(p){
				var params="";
				//productId=window.global.getProductId();
				
				params+="&productId="+productId;
				params+="&status=-1";
				params+="&limit="+p.limit;
				params+="&start="+p.offset;
				if(p.search){
				params+="&search="+p.search;
				
				}
				return params;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageNumber:1,
			sidePagination: "server",
//			pageList: [10,25],
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
				visible:false
			},{
				field: 'packageVer',
				title: window.lc.getValue("version"),
				align: 'middle',
				valign: 'middle',				
				
			},{
				field: 'relyVer',
				title: window.lc.getValue("relyVer"),
				align: 'middle',
				valign: 'middle',	
				formatter:function(value,row,index){
				if(value){
					return value;
				}else {
					return '--'
				}
			}
			},{
				field: 'status',
				title: window.lc.getValue("status"),
				align: 'middle',
				valign: 'middle',				
				formatter:function(value,row,index){
				     if(row.status==0){
				    	 return window.lc.getValue('test');
				     }else if(row.status==1){
				    	 return window.lc.getValue('official'); 
				     }
				}
		          
           },{
			  field: 'detailDesc',
			  title: window.lc.getValue("detailedDescription"),
			  align: 'middle',
			  valign: 'middle',	
			  formatter:function(value,row,index){
			     if(row.detailDesc==""||row.detailDesc==null||row.detailDesc==undefined){
			    	 return '--';
			     }else if(row.detailDesc.length<50){
			    	 return row.detailDesc; 
			     }else if(row.detailDesc.length>50){
			    	 return row.detailDesc.substring(0,50)+'...'
			     }
			}
		},{
			field:'',
			title:window.lc.getValue("operate"),
			align:'center',
			valign:'middle',
			clickToSelect:true,
	        visible:true,
			formatter:function(value,row,index){
			var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
				var view='<a action="view" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("view")+'">'
					+'<i class="fa fa-search-plus bigger-130"></i>'
					+'</a>';
				html+=view
				html+='</div>';
				var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
					  +'<div class="inline position-relative">'
					    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
					      +'<i class="fa fa-cog icon-only bigger-110"></i>'
					    +'</button>'
					    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
					      +'<li>'+view+'</li>'
					    tmp+='</ul>'
					  +'</div>'
					+'</div>';
				tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
				html+=tmp;
	    	  return html;
          },
		 events:operateEvents11
		}]
      });
      $('#'+pid).on('post-body.bs.table', function () {
			$('#'+pid+' [data-rel=tooltip]').tooltip();
			window.list.changeForAce(pid);
		})
		window.productIdNum=-1;
       $("#version_list button[name=refresh]").addClass("btn-info");
	   $("#version_list button[name=toggle]").addClass("btn-info");
	   $("#version_list button[data-toggle=dropdown]").addClass("btn-info");
	//导出操作
    $('#'+id+'-exp').click(function(){
    	 var rows=$('#'+id).bootstrapTable('getSelections');
		 if(rows.length==0){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}else if(rows.length>1){
				window.tip.show_pk("warning",null,window.lc.getValue("notExp"));
				return;
			}
		 var cb=function(){
			 verFun.expVersion(rows,id);
			 
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToExp")+'？',cb); 
    })  
    //同步操作
    $('#'+id+'-synVersion').click(function(){
   	 var rows=$('#'+id).bootstrapTable('getSelections');
		 
		 var cb=function(){
			 verFun.synVersion(rows,id);
			 
	    	}
	    	window.modal.confirm1(window.lc.getValue("sureToSyn")+'？',cb); 
   }); 
    //删除操作
   $('#'+id+'-del').click(function(){
	   var row=$('#'+id).bootstrapTable('getSelections');
	        var params={};
	        var rows='';
	        
	        params.productId=-1;
	        params.status=-1;
	        $.ajax({
	        	url: "versionList!getVersionList1.action",
	        	type:'post',
	        	data:params,
	        	complete:function(data){
	        	
	        	 rows=data.responseJSON.versionList;
	        }
	        })
	   
		 if(row.length==0){
				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
				return;
			}
		 var cb=function(){
			 verFun.delVersion(row,rows,id);
			 
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb); 
  });
   //增加操作
   $('#'+id+'-add').click(function(){
	   productId=window.global.getProductId();
	          var cb=function(){
			 verFun.upDownVersion();
			 
   	}
   	window.modal.confirm3(window.lc.getValue("sureUploadFile"),cb); 
});
	   
  
      
  }
	
	return {
		createList:createList,
	}
})