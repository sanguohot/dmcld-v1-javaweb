
define([],function(){
  function initSchListeners(){
	  var width=window.screen.width;
		if(310<width&&width<375){
			$('.multi-btn').css('width','21px');
		}
		
    $(".J_navSwitchBtn").bind('click',function(){
      if(!window.searchCol){
        window.searchCol=true;
      }else{
        window.searchCol=false;
      }
      if(window.searchCol){
        $(".nav-panel").css("display","none");
        $(".J_navSwitchBtnSpan").attr("class","myicon-btn-arrow-down-3 J_navSwitchBtnSpan");
      }else{
        $(".nav-panel").css("display","block");
        $(".J_navSwitchBtnSpan").attr("class","myicon-btn-arrow-up-3 J_navSwitchBtnSpan");
      }
    });
         
    $(".J_multiBtn").bind("click",function(){
      var curNode=$(this);
      var curIndex=curNode.index();

      $(".J_multiBtn").each(function(){
        $(this).css("display","block");
        $(this).parent().prev().parent().attr("class","nav-block J_commonBlock type-text");
        $(this).parent().prev().find(".multi-btn-cont").css("display","none");
      });
      //设置当前多选按钮隐藏
      curNode.css("display","none");
      //设置样式支持多选,扩展当前高度
      curNode.parent().prev().parent().attr("class","nav-block J_commonBlock type-text block-expand block-multi");
      //设置确认取消按钮显示
      curNode.parent().prev().find(".multi-btn-cont").css("display","block");
      //打开多选项时清空勾选
      curNode.parent().prev().find("[class*='myicon-hover']").trigger("click");
    });

    $(".param-item.myicon-tag.J_Ajax").bind("click",function(){
      var mulcont=$(this).parent().next();
      var display=mulcont.css("display");
      if(display=="block"){
        //多选,设置是否打勾
        var index=$(this).attr("class").indexOf("myicon-hover");
        if(index>=0){
          $(this).attr("class","param-item myicon-tag J_Ajax");
        }else{
          $(this).attr("class","param-item myicon-tag J_Ajax myicon-hover");
        }
      }else{
        //单选,直接进行查询
        var html=$(this).html();
        var content=$.trim(html.substring(html.indexOf("</span>")+"</span>".length));
        var type=$(this).parent().parent().prev().find(".nav-title").html();
        //console.log($(this).parent(".block-body"))
        //createSelSearch(type,content);
        setSchSel(type,content,true);
        createSchTree();
        //进行查询
        beginSch();

      }
    });
    $(".submit-btn.J_submitBtn").bind("click",function(){
      //直接进行多项查询
      var items=$(this).parent().prev().find("[class*='myicon-hover']");
      if(items.length==0){
        //无勾选只刷新search控件
      }else{
        var type=$.trim($(this).parent().parent().prev().find(".nav-title").html()),content="";
        items.each(function(index){
          var html=$(this).html();
          var tmp=$.trim(html.substring(html.indexOf("</span>")+"</span>".length));
          if(content!=""){
            content=content+",";
          }
          content=content+tmp;
        });
        //createSelSearch(type,content);
        setSchSel(type,content,true);
        createSchTree();

        //进行查询
        beginSch();
       
      }
    });
    $(".cancel-btn.J_cancelBtn").bind("click",function(){
      $(this).parent().css("display","none");
      var parent=$(this).parent().parent().parent();
      parent.attr("class","nav-block J_commonBlock type-text");
      parent.find(".J_multiBtn").css("display","block");;
    });
    $(".m-nav .bread-crumbs .param-selected").bind("mouseover",paraSelMouseover);
    $(".m-nav .bread-crumbs .param-selected").bind("mouseout",paraSelMouseout);
    $(".m-nav .bread-crumbs .param-selected").bind("click",function(){
      //点击删除已选高级搜索条件;
      var html=$.trim($(this).html());
      var tmp=html.substring(0,html.indexOf("<span"));
      var strs=tmp.split(":");
      var type=strs[0];
      var content=strs[1];
      setSchSel(type,content,false);
      createSchTree();
      if(window.searchCol)
        $(".J_navSwitchBtn").trigger("click");

      //进行查询
      beginSch();
     
    });
  }
  function beginSch(){
      var node=$("#myTab .active a");
      var activeId=node.attr("href");
		var pa=getSchPara();
		var flag=0;
		if(pa.indexOf("unknownDev")>=0 && !$("#dev_unknown_list").length){
			window.devMain.createHtml("my-tab-position");
			window.global.procTab();
			flag=1;
		}else if(pa.indexOf("unknownDev")<0 && $("#dev_unknown_list").length){
			window.devMain.createHtml("my-tab-position");
			window.global.procTab();
			flag=1;
		}
		if(flag){
			window.domainChange();
		}else{
			window.tabAfterShow(activeId);
		}
		setTimeout(function(){
			$("#dev_list button[name=refresh]").trigger("click");
			
		},300)
		
//      window.devMain.cb(activeId);
		
  }
  function getSelSearch(type,content,id){
	  id=id+"1";
    var a='<a class="param-selected myicon-tag J_Ajax" id="'+id+'" href="#" data-url="nav"'
      +' data-key="ppath" data-value="21433:90622" data-action="remove" title="'+type+':'+content+'">'
      +type+':'+content
      +'<span class="close-icon myicon-btn-x"></span>'
      +'</a>';
    return a;
  }
  function getSelSearchs(){
    var m=window.devSchMap
    if(!m.size()){
      return "";
    }

    var html="";
    m.each(function(key,value,index){
      var child=value;
      if(!child.selected){
        return;
      }
      var type=window.lc.getValue(child.name),content="";
      if(child.children.length){
        for(var j=0;j<child.children.length;j++){
          var item=child.children[j];
          if(item.selected){
            if(content!=""){
              content=content+",";
            }
            content=content+window.lc.getValue(item.name);
          }
        }
      }
      if(content!=""){
        html=html+getSelSearch(type,content,child.name);
       
      }
    });
    return html;
  }
  function getSchPara(){
    var m=window.devSchMap
    if(!m || !m.size()){
      return "";
    }

    var str="";
    m.each(function(key,value,index){
      var child=value;
      if(!child.selected){
        return;
      }
      if(str!=""){
        str=str+",";
      }
      var tmp="";
      if(child.children.length){
        for(var j=0;j<child.children.length;j++){
          var item=child.children[j];
          if(item.selected){
            if(tmp!=""){
              tmp=tmp+"-";
            }
            tmp=tmp+item.name;
          }
        }
      }
      str+=child.name+":";
      str+=tmp;
    });
    return str;
  }
  function createSelSearch(type,content){
    var a=getSelSearch(type,content,null);
    $("div.crumbs-cont").append(a);
    $(".m-nav .bread-crumbs .param-selected").unbind("mouseover mouseout click");
    $(".m-nav .bread-crumbs .param-selected").bind("mouseover",paraSelMouseover);
    $(".m-nav .bread-crumbs .param-selected").bind("mouseout",paraSelMouseout);
    $(".m-nav .bread-crumbs .param-selected").bind("click",function(){
      $(this).remove();
    });
  }
  function paraSelMouseover(){
    $(this).find("[class*='myicon-btn-x']").css("background","transparent url(picture/taobao.png) no-repeat scroll -73px -374px");
    $(this).css("border","1px solid #ff4400");
  }
  function paraSelMouseout(){
    $(this).find("[class*='myicon-btn-x']").css("background","transparent url(picture/taobao.png) no-repeat scroll -56px -374px");
    $(this).css("border","1px solid #e8e8e8");
  }
  function setSchSel(type,content,selected){
    var devObj=window.devObj;
    if(!devObj || !devObj.children || !devObj.children.length){
      return;
    }
    var m=window.devSchMap;
    for(var i=0;i<devObj.children.length;i++){
      var child=devObj.children[i];
      if(window.lc.getValue(child.name)==type){
        child.selected=selected;
        if(child.children && child.children.length){
          for(var j=0;j<child.children.length;j++){
            if(content.indexOf(window.lc.getValue(child.children[j].name))>=0){
              child.children[j].selected=selected;
            }
          }
        }

        if(m.get(child.name)){
          m.remove(child.name)
        }
        if(selected){
          m.put(child.name,child);
        }
      }
    }
  }
  function getSchHtml(devObj){
    var html2=getSelSearchs();
    //如果先点击drp状态在点击未加要把drp状态去掉
    if(html2.indexOf("drpStatus1")>0){
    	if(html2.indexOf("unknownDev1")>0){
    		$("#drpStatus1").click();
    		 var html2=getSelSearchs();
    	}
    }
    var str="";
//    if(devObj.searchTotal<devObj.total){
    	str='<span id="searchTotal"></span>';
//    }
    var html= '<div class="bread-crumbs row J_breadcrumbs"><div class="bread-crumbs">'
      +'<div class="counts">'
      +'<span class="crumbs-items">'+window.lc.getValue("total")+' <span class="H" id="maxTotal">'
      +devObj.total+'</span> '+window.lc.getValue("devs")+'</span>'+str
      +'<a class="nav-toggle-btn J_navSwitchBtn myicon-tag" href="#">'
      +'<span class="myicon-btn-arrow-down-3 J_navSwitchBtnSpan"></span>'
      +'</a>'
      +'</div>'
      +'<div class="crumbs-cont">'
      +'<span class="cat-name">'+window.lc.getValue(devObj.name)+'</span>'
      +'<span class="cat-divider"><span class="myicon-btn-vbarrow"></span></span>'
      +html2
      +'</div>'
      +'</div>'
      +'</div>';
    if(devObj.children.length){
      var flag=0;
      var tmp='<div class="nav-panel J_navPanel">';
      for(var i=0;i<devObj.children.length;i++){
        var flag2=0;
        var child=devObj.children[i];
        if(child.selected || !child.children.length){
          continue;
        }
        tmp=tmp+'<div class="nav-block J_commonBlock type-text" id="'+child.name+'">'
          +'<div class="block-head">'
          +'<h4>'
          +'<span class="nav-title">'
          +window.lc.getValue(child.name)
          +'</span>'
          +':'
          +'</h4>'
          +'</div>';
        var tmp2='<div class="block-body " style="padding-left:120px;"><div class="params-cont">';
        for(var j=0;j<child.children.length;j++){
          var item=child.children[j];
          if(!item.selected){
            flag2=1;
            tmp2=tmp2+'<a target="_self" trace="navPropertyNew" class=" param-item myicon-tag J_Ajax "' +'href="#" trace-click=";cps:yes_s" data-url="nav" data-key="ppath"' +'data-value="28151:43417" data-action="add">'
              +'<span class="myicon-btn-check-small param-checkbox"></span>'
              +window.lc.getValue(item.name)
              +'</a>';
          }

        }
        tmp2=tmp2+'</div><div class="multi-btn-cont">'
          +'<span trace="navMutiSelect" href="#" class="submit-btn J_submitBtn">'+window.lc.getValue("confirm")+'</span>'
          +'<span class="cancel-btn J_cancelBtn">'+window.lc.getValue("cancel")+'</span>'
          +'</div>'
          +'</div>';
        if(flag2==1){
          flag=1;
          tmp=tmp+tmp2;
        }
        tmp=tmp+'<div class="block-tail">'
          +'<a href="javascript:;" class="multi-btn J_multiBtn"' +'data-spm-anchor-id="a230r.1.0.0">'+window.lc.getValue("multiSel")+'</a>'
          +'<a href="javascript:;" style="display: none;" class="more-btn J_expandBtn">'+window.lc.getValue("more")+'<span' +'class="myicon-btn-arrow-down-2"></span></a>'
          +'</div>';
        tmp=tmp+'</div>';
      }
      tmp=tmp+'</div>';
      if(flag==1){
        html=html+tmp;
      }
    }
    return html;
  }
  function createSchTree(){
    var devObj=window.devObj;
    if(!devObj){
    	loadSearch();
      return;
    }
    
    var html=getSchHtml(devObj);
    $("div.m-nav").html("");
    $("div.m-nav").append(html);
    var total=window.devMain.maxTotal?window.devMain.maxTotal:0;
    $("#maxTotal").html(total);
    initSchListeners();
//	$(".J_navSwitchBtn").trigger("click");
  }
  function loadSearch(){
    var deviceObj={name:"allClassify",total:0,pobj:null,pname:"",children:[]};
    var deviceStatus={name:"devStatus",pname:"allClassify",children:[]};
    var deviceType={name:"devType",pname:"allClassify",children:[]};
    var drpStatus={name:"drpStatus",pname:"allClassify",children:[]};
    var unknownDev={name:"unknownDev",pname:"allClassify",children:[]};
    var record={name:"added",pname:"unknownDev",children:[]};
    unknownDev.children.push(record);
    var record={name:"notAdd",pname:"unknownDev",children:[]};
    unknownDev.children.push(record);
//	var record={name:"online",pname:"devStatus",children:[]};
//	deviceStatus.children.push(record);
//	var record={name:"offline",pname:"devStatus",children:[]};
//	deviceStatus.children.push(record);
    var record={name:"active",pname:"devStatus",children:[]};
    deviceStatus.children.push(record);
   // var record={name:"busy",pname:"devStatus",children:[]};
   // deviceStatus.children.push(record);
   // var record={name:"idle",pname:"devStatus",children:[]};
   // deviceStatus.children.push(record);
    var record={name:"init",pname:"devStatus",children:[]};
    deviceStatus.children.push(record);
    var record={name:"needAuth",pname:"drpStatus",children:[]};
    deviceStatus.children.push(record);
    var record={name:"commFail",pname:"devStatus",children:[]};
    deviceStatus.children.push(record);
    var record={name:"disable",pname:"devStatus",children:[]};
    deviceStatus.children.push(record);
    var record={name:"restart",pname:"devStatus",children:[]};
    deviceStatus.children.push(record);
    //drpSattus add by zhangjian
    /*var record={name:"register",pname:"drpStatus",children:[]};
    drpStatus.children.push(record);*/
    var record={name:"active",pname:"drpStatus",children:[]};
    drpStatus.children.push(record);
    var record={name:"commFail",pname:"drpStatus",children:[]};
    drpStatus.children.push(record);
    var record={name:"needAuth",pname:"drpStatus",children:[]};
    drpStatus.children.push(record);
  //  var record={name:"disable",pname:"drpStatus",children:[]};
  //  drpStatus.children.push(record);
  //  var record={name:"idle",pname:"drpStatus",children:[]};
  //  drpStatus.children.push(record);
   // var record={name:"busy",pname:"drpStatus",children:[]};
  //  drpStatus.children.push(record);
    var record={name:"unregistered",pname:"drpStatus",children:[]};
    drpStatus.children.push(record);
   // var record={name:"offline",pname:"drpStatus",children:[]};
  //  drpStatus.children.push(record);
    //var record={name:"block",pname:"drpStatus",children:[]};
  //  drpStatus.children.push(record);
   //end
    var record={name:"mtg",pname:"devType",children:[]};
    deviceType.children.push(record);
    var record={name:"dag",pname:"devType",children:[]};
    deviceType.children.push(record);
    if(window.extra.reportSwitch=="on" && window.roleType.isSuper(window.user.roleId)){
        var record={name:"dag80",pname:"devType",children:[]};
        deviceType.children.push(record);
    }
    var record={name:"uc",pname:"devType",children:[]};
    deviceType.children.push(record);
    deviceObj.children.push(unknownDev);
   
    deviceObj.children.push(deviceType);
    deviceObj.children.push(drpStatus)
    deviceObj.children.push(deviceStatus);
//	$.getJSON("dm/json/dev-sch.json",function(data){
    window.devObj=deviceObj;
    window.devSchMap=new Map();
    createSchTree();
//	});
  }
  return{
    loadSearch:loadSearch,
    getSchPara:getSchPara
  }
})
