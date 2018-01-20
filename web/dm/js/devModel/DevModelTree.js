/**
 * Created by Rainc on 2015/3/21.
 */
define(["tree",'text!html/tree.html'],function(tree,tpl){
  
  function loadModelTree(){
	var params={};
	window.global.getTreePara(params);
	if(window.global.getDomainUuid()){
		createReq();
	}
	function createReq(){
		var date1=new Date();
		var load='<li class=""><a href="#" class="dropdown-toggle">'
            +'<i class="menu-icon fa fa-refresh fa-spin blue" style="text-align:center;"></i>'
//	            +'<span class="menu-text green"> 正在刷新... </span>'
        +'</a></li>';
		$("#nav-list").html(load);
	    $.ajax({ url: "dmManager!getBatchTree.action", data:params,complete: function(data,str){
	        if(data && data.responseJSON && data.responseJSON.dmTree){
	        	var cb=function(){
		      	  	var tmp=data.responseJSON.dmTree;
		  	 	    var tempFn = window.dot.template(tpl);
		  		    var html = tempFn(tmp);
		  			$("#nav-list").html(html);
		  			$("#nav-list a").bind("click",function(){
		  				var n=$(this);
		  				var nid=n.attr("nid");
		  				window.curNid=nid;
		  				var p=n.parent().parent().parent();
		  				$("#nav-list li").each(function(k,v){
		  					if($(this).hasClass("active")){
		  						$(this).removeClass("active");
		  					}
		  				})
		  				if(p && p.length && p.hasClass("open")){
			  				p.addClass("active");
		  				}
		  				n.parent().addClass("active");
		  				//生成路径
						require(["path"],function(path){
							path.createPath();
						});
		  				window.tabAfterShow($('#myTab li[class=active] a').attr("href"));
		  			})
	        	}
				var date2=new Date();
				var diff=date2.getTime()-date1.getTime()  //时间差的毫秒数
				if(diff<300){
					setTimeout(cb,300-diff);
				}else{
					cb();
				}
	        }else{
	        	$("#nav-list").html("");
	        }
	      }});
	}
    
  }
  return{
	  loadModelTree:loadModelTree,
	  getModelTreePara:tree.getTreePara
  }
})
