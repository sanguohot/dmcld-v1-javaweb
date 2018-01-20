
define([],function(){
  function createTree(obj){

    if(!obj){
      return;
    }
    var html="";

//    html=getHtml2(obj);
    html=getHtml(null,obj);
//    console.log(html)
    
    if(html){
      var node=$("#my_tree");
      node.html("");
      node.append(html);
      $('#webmenu li').hover(function () {
          $(this).children('ul').stop(true, true).show('fast');
      }, function () {
          $(this).children('ul').stop(true, true).hide('fast');
      });

      $('#webmenu li').hover(function () {
          $(this).children('div').stop(true, true).show('fast');
      }, function () {
          $(this).children('div').stop(true, true).hide('fast');
      });
      initTreeListeners();
    }
  }
  function getHtml2(obj){
    var html="";
    if(obj.children && obj.children.length){
      for(var i=0;i<obj.children.length;i++){
        html=html+getHtml(obj.children[i].nid,obj.children[i]);
      }
    }
    return html;
  }
  function getAprop(obj){
	if(!obj){
		return "";
	}
    return ' uuid='+obj.uuid+' puuid='+obj.puuid+' nid='+obj.nid+' pid='+obj.pid+' domainUuid='+obj.domainUuid+' etype='+obj.etype+' ';
  }
  function getTreePara(){
    var node=window.global.getNode();
    if(node){
      var et=window.global.getEtype();
      if(et=="root"){
        return "";
      }else if(et=="domain"){
        return {name:"dstDomainUuid",value:node.attr("uuid")};
      }else if(et=="zone"){
        return {name:"zoneUuid",value:node.attr("uuid")};
      }else if(et=="site"){
        return {name:"siteUuid",value:node.attr("uuid")};
      }else if(et=="producttype"){
        return {domainUuid:window.global.getDomainUuid(),productId:node.attr("uuid")};
      }
    }
    return "";
  }
  function getHtml(nid,obj){
//    var html='<div class="cat_title" onmouseover="this.className='+"'cat_title active_cat'"+'" onmouseout="this.className='+"'cat_title'"+'">';
	  var level="first";
	  var html="";
//	  var html='<ul id="webmenu" class="'+level+'-menu">';
//    var curObj=window.curTreeNode;
//    //如果是当前选中节点凸显其样式
//    if(curObj && curObj.nid==nid){
//      html='<div class="cat_title select_root">';
//    }
//    html=html+'<div class="category_name">'
//      +'<a '+getAprop(obj)+' class="my_tree_b" name="my_tree_a" >'+obj.name+'</a>'
//      +'</div>';

    if(obj.children && obj.children.length){
      var tmp=loopHtml(obj.children,level);
//      tmp=tmp.replace('class="show_border"','class="show_border_2"');
      html+=tmp;
    }
//    html=html+'</ul>';
    return html;
  }
  function getNextLevel(level){
	  var ls=["first","second","third","fourth"];
	  var index=ls.indexOf(level);
	  if(index>=0 && index<3){
		  return ls[index+1];
	  }else{
		  return null;
	  }
  }
  function getLiList(arr,level){
	  var html="";
	  var st=0;
	  if(level=="first"){
		  st=window.start;
	  }
	  for(var i=st;i<arr.length;i++){
	      var obj=arr[i];
	      var tmp='';
	      
	      if(level=="first" && i==window.start && arr.length>window.limit){
	    	  if(window.start==0){
	    		  tmp+='<li><a id="prevpage" href="#" etype="prevpage" class="btn btn-default arrow1 disabled" style="border:0px;">'+window.lc.getValue("lastPage")+'&nbsp;<i class="fa fa-arrow-up"></i></a></li>';
	    	  }else{
	    		  tmp+='<li><a id="prevpage" href="#" etype="prevpage" class="btn btn-info arrow1" style="border:0px;">'+window.lc.getValue("lastPage")+'&nbsp;<i class="fa fa-arrow-up"></i></a></li>';
	    	  }
	      }	      
	      if(obj.children && obj.children.length){
	    	  //arrow
	    	  tmp+='<li><a '+getAprop(obj)+' href="#" class="arrow1" target="_self">'+obj.name+'<i class="fa fa-caret-right"></i></a>';
	      }else{
	    	  tmp+='<li><a '+getAprop(obj)+' href="#" target="_self">'+obj.name+'</a>';
	      }
	      html=html+tmp;
	      var value=obj.children;
	      if(value){
	    	  var l=getNextLevel(level);
	    	  if(l)
	    	  html+=loopHtml(value,l);
	      }else{

	      }
	      html=html+'</li>';
		  //树收敛展开
//		  if(level=="first" && i+1==window.maxFirstTreeSize){
//			  	if(window.treeStatus=="collapse"){
//			  		html+='<li><a status="collapse" id="tree_collapse" href="#" etype="collapsebt" >展开更多</a></li>';
//			  		break;
//			  	}else{
//			  		html+='<li><a status="expand" id="tree_collapse" href="#" etype="collapsebt" >收敛起来</a></li>';
//			  		continue;
//			  	}
//		  }
	      if(level=="first" && arr.length>window.limit){
	    	  if((i+1==window.start+window.limit) || (i+1==arr.length)){
	    		  if(window.start+window.limit>=arr.length){
	    			  html+='<li><a id="nextpage" href="#" etype="nextpage" class="btn btn-default arrow1 disabled" style="border:0px;">'+window.lc.getValue("nextPage")+'&nbsp;<i class="fa fa-arrow-down"></i></a></li>';
	    		  }else{
	    			  html+='<li><a id="nextpage" href="#" etype="nextpage" class="btn btn-info arrow1 " style="border:0px;">'+window.lc.getValue("nextPage")+'&nbsp;<i class="fa fa-arrow-down"></i></a></li>';
	    		  }
		    	  break;
	    	  }
	      }
	    }
	  return html;
  }
  function loopHtml(arr,level){
    var html='<ul class="'+level+'-menu">';
    if(level=="first"){
    	html='<ul id="webmenu" class="'+level+'-menu">';
    }
    html+=getLiList(arr,level);
    html=html+'</ul>';
    return html;
  }
  function getData(nid,obj){
    if(!obj){
      return null;
    }
    if(!nid){
      return window.treeCache;
    }
    if(obj.nid==nid){
      return obj;
    }else{
      var value=obj.children;
      if(value){
        return loopData(nid,value);
      }
      return null;
    }

  }
  function getParentData(obj){
    var data=obj;
    if(data){
      if(data.pid){
        return getData(data.pid,window.treeCache);
      }else{
        return window.treeCache;
      }
    }
    return null;
  }
  function loopData(nid,arr){
    for(var i=0;i<arr.length;i++){
      var obj=arr[i];
      if(obj.nid==nid){
        return obj;
      }
      var value=obj.children;
      if(value){
        var ret=loopData(nid,value);
        if(ret){
          return ret;
        }
      }
    }
    return null;
  }

  function update(obj,pobj,name){
    if(name && name=="my_position"){
        createTree(obj);
      }else{
        createTree(pobj);
      }
    var nid=obj.nid;
	  var first=$("div#ur_here");
	    var tmp="";
	    first.html("");
	    //tmp='<a '+getAprop(obj)+' name=my_position>'+html+'</a>';
	    if(name && name=="my_position"){
	      tmp='<a '+getAprop(obj)+' name=my_position>'+obj.name+'</a> &gt;'+tmp;
	    }
	    if(pobj.nid!=nid){
	      tmp='<a '+getAprop(pobj)+' name=my_position>'+pobj.name+'</a> &gt;'+tmp;
	      if(pobj.pid!=''){
	        var t1=getParentData(pobj);
	        if(t1){
		        tmp='<a '+getAprop(t1)+' name=my_position>'+t1.name+'</a> &gt;'+tmp;
		        pobj=t1;
	        }
	      }
	      if(pobj.pid!=''){
	        var t1=getParentData(pobj);
	        if(t1){
		        tmp='<a '+getAprop(t1)+' name=my_position>'+t1.name+'</a> &gt;'+tmp;
		        pobj=t1;
	        }
	      }
	    }

	    first.html(tmp);
	    $("[name='my_position']").unbind("click");
	    $("[name='my_position']").bind('click',updatePosition);
  }
  function updateView(nid,pid,name){
  	var obj=getData(nid,window.treeCache);
    var pobj=getParentData(obj);
    if(!obj || !pobj){
      return;
    }
    var pt=$("#prevpage");
    if(pt){
    	var tmp=pt.parent().next();
    	var a=tmp.children("a");
    	var et=a.attr("etype");
        if(et!=obj.etype){
        	window.start=0;
        }
    }else{
    	window.start=0;
    }
    var index=pobj.children.indexOf(obj);
    if(index>=0){
	    var cnt=Math.floor(index/window.limit);
	    window.start=cnt*window.limit;
	    window.curTreeNode=obj;
    }
    //更新路径和分页
    update(obj,pobj,name);
    //更新选中节点
    var nnid=nid;
    $("#webmenu li a").each(function(){
    	var c=$(this);
    	var cnid=c.attr("nid");
    	if(cnid && cnid && nnid!=cnid){
    		c.removeClass("active");
    	}else if(nnid && cnid && nnid==cnid){
    		c.addClass("active");
    	}
    })
  }
  function removeActive(){
    $("#webmenu li a").each(function(){
    	var c=$(this);
    	var cls=c.attr("class");
    	if(cls.indexOf("active")>=0){
    		c.removeClass("active");
    	}
    })
  }
  function updatePositionByPara(nid,pid,name){
	   //树视图刷新
	  	updateView(nid,pid,name);
	    //主视图刷新
	    var node=$("#myTab .active a");
	    var activeId=null;
	    if(node){
	    	activeId=node.attr("href");	    
	    }
	    window.tabAfterShow(activeId);
  }
  function updatePosition(){
  	var tmp=$(this).attr("status");
	if(tmp){
    	if(tmp=="collapse"){
    		window.treeStatus="expand";
    	}else{
    		window.treeStatus="collapse";
    	}
    	$(this).attr("status",window.treeStatus);
		//根据当前节点生成导航树
		update(window.curTreeNode,getParentData(window.curTreeNode),"my_position");
		return;
	}
	//翻页操作
  	var tmp=$(this).attr("etype");
	if(tmp && tmp.indexOf("page")>=0){
//		var po=getParentData(window.curTreeNode);
		
		var a=$(this).parent().prev().children("a");
		if(tmp=="prevpage"){
			a=$(this).parent().next().children("a");
		}
	    var nid=a.attr("nid");
	    var pid=a.attr("pid");
	    var obj=getData(nid,window.treeCache);
	    var pobj=getParentData(obj);
		var start=window.start,limit=window.limit;
		var max=pobj.children.length;
//		window.curTreeNode=po;
		if(tmp=="prevpage" && start>0){
			window.start=(start>=limit?(start-limit):0);			
		}
		if(tmp=="nextpage" && (start+limit<max)){
			window.start=start+limit;		
		}
		update(obj,pobj,"");
		var fn=$("#webmenu li a[nid="+window.curTreeNode.nid+"]");
		if(fn.length){
			fn.addClass("active");
		}
		return;
	}

    var nid=$(this).attr("nid");
    var pid=$(this).attr("pid");
    var obj=getData(nid,window.treeCache);
    var pobj=getParentData(obj);
    if(!obj || !pobj){
      return;
    }
    var pt=$("#prevpage");
    if(pt){
    	var tmp=pt.parent().next();
    	var a=tmp.children("a");
    	var et=a.attr("etype");
        if(et!=obj.etype){
        	window.start=0;
        }
    }else{
    	window.start=0;
    }
    
    var name=$(this).attr("name");
    var n=$(this);
    var nnid=n.attr("nid");
    window.curTreeNode=obj;
    update(obj,pobj,name);


    $("#webmenu li a").each(function(){
    	var c=$(this);
    	var cnid=c.attr("nid");
    	if(cnid && cnid && nnid!=cnid){
    		c.removeClass("active");
    	}else if(nnid && cnid && nnid==cnid){
    		c.addClass("active");
    	}
    })
   
    
    var node=$("#myTab .active a");
    var activeId=null;
    if(node){
    	activeId=node.attr("href");	    
    }
    window.tabAfterShow(activeId);
//    $('#myTab').find("a[href="+activeId+"]").trigger("click");
  }
  function initTreeListeners(){
    $("#webmenu a").bind('click',updatePosition);
    $("#ur_here a").bind('click',updatePosition);
  }

  return{
    getTreePara:getTreePara,
    createTree:createTree,
    getData:getData,
    getParentData:getParentData,
    updatePositionByPara:updatePositionByPara,
    update:update,
    updateView:updateView,
    removeActive:removeActive
  }
})
