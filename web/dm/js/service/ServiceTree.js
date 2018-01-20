
define(["tree",'text!html/tree.html'],function(tree,tpl){
  function procLan(child){
	  if(child.etype=="dc"){
		  child.name=window.lc.getValue("disableCall")+'<span name="badge" class="tree-badge badge badge-success">'+child.cnt+'</span>';
	  }
	  if(child.etype=="dr"){
		  child.name=window.lc.getValue("record")+'<span name="badge" class="tree-badge badge badge-success">'+child.cnt+'</span>';
	  }
	  if(child.etype=="sipserver"){
		  child.name=window.lc.getValue("sipServer");
	  }
	  if(child.etype=="number"){
		  child.name=window.lc.getValue("numAuth");
	  }
	  if(child.etype=="freq"){
		  child.name=window.lc.getValue("freqControl");
	  }
  }
  
  function loadTree(){
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
		var isSuper=window.roleType.isSuper(window.user.roleId);
	    $.ajax({ url: "dmManager!getServiceTree.action", data:params,complete: function(data,str){
	        if(data && data.responseJSON && data.responseJSON.dmTree){
	      	  for(var i=0;i<data.responseJSON.dmTree.children.length;i++){
	    		  var item=data.responseJSON.dmTree.children[i];
	    		  procLan(item);
	    	  }
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
		  				window.tabAfterShow();
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
    loadTree:loadTree,
    getTreePara:tree.getTreePara
  }
})
