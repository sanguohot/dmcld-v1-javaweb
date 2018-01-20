
define(["tree","dev-sch",'text!html/tree.html','dev-fun'],function(tree,sch,tpl,fun){
  function loadTree(){
	var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara()};
	window.global.getTreePara(params);
	if(window.global.getDomainUuid()){
		createReq();
	}
	function createReq(){
		var date1=new Date();
		var node=window.global.getNode();
		var pnid=null;
		if(node && node.attr("etype")=="site"){
			pnid="zone_"+node.attr("puuid");
		}
		var load='<li class=""><a href="#" class="dropdown-toggle">'
            +'<i class="menu-icon fa fa-refresh fa-spin blue" style="text-align:center;"></i>'
//            +'<span class="menu-text green"> 正在刷新... </span>'
        +'</a></li>';
		$("#nav-list").html(load);
	    $.ajax({ url: "dmManager!getDevTree.action", data:params,complete: function(data,str){
	        if(data && data.responseJSON && data.responseJSON.dmTree){
	        	var cb=function(){
		      	  	var tmp=data.responseJSON.dmTree;
		  	 	    var tempFn = window.dot.template(tpl);
		  		    var html = tempFn(tmp);
		  			$("#nav-list").html(html);
		  			//js冲突，解决方案
					$("#sidebar-collapse").trigger("click");
					$("#sidebar-collapse").trigger("click");
					
		  			$("#nav-list a").bind("click",function(){
		  				var n=$(this);
		  				var nid=n.attr("nid");
		  				window.curNid=nid;
		  				
		  				$("#nav-list li").each(function(k,v){
		  					if($(this).hasClass("active")){
		  						$(this).removeClass("active");
		  					}
		  				})
		  				var et=n.attr("etype");
		  				if(et && et=="site"){
			  				var p=n.parent().parent().parent();
			  				if(p && p.length){
			  					if(!p.hasClass("open")){
			  						p.addClass("open");
			  					}
			  					if(!p.hasClass("active")){
			  						p.addClass("active");
			  					}
			  					n.parent().parent().css("display","block");
			  				}
		  				}

		  				n.parent().addClass("active");
		  				var et=n.attr("etype");
		  				if(et=="zone" || et=="site"){
		  					window.groupBy="site";
		  				}
		  				
		  				//生成路径
						require(["path"],function(path){
							path.createPath();
						});
		  				window.tabAfterShow($('#myTab li[class=active] a').attr("href"));
		  			})
		  			if(window.curNid){
		  				var cn=$("#nav-list a[nid="+window.curNid+"]");		  				
		  				if(cn && cn.length){
		  					cn.trigger("click");
		  				}else if(pnid){
		  					var pn=$("#nav-list a[nid="+pnid+"]");
		  					if(pn && pn.length)
			  				pn.trigger("click");
			  			}
		  			}
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
    loadTree:loadTree
  }
})
