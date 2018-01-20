/**
 * Created by Rainc on 2015/3/20.
 */
define(function (){
  function createHtml(pid){
    var pn=$("#"+pid);
    pn.html("");
  //<i class="fa fa-pie-chart"></i>&nbsp;
    var html='<ul id="myTab" class="nav nav-tabs">'
      +'<li role="presentation" class="active"><a href="#devModel_list"><i class="fa fa-file-o"></i>&nbsp;'+window.lan["devModelList"]+'</a></li>'
      +'</ul>'
      +'<div  class="tab-content">'
      +'<div class="tab-pane fade in active"  id="devModel_list" >'
      +'</div>'
      +'</div>';
    pn.append(html);
    
  }
  function tabAfterShow(id){
    if(id=="#devModel_list") {
      require(["devModel-list"], function (grid) {
        grid.createDevModList(id.substring(1), id.substring(1) + "_child", "batchManager!findBatchList.action");
      });
    }
  }
  function procTab(){
    $('#myTab a').bind("shown.bs.tab",function(){
      var id=$(this).attr("href");
      tabAfterShow(id);
    });

//    默认加载第一个tab
    require(["devModel-list"], function (grid) {
      var id = "#devModel_list";
      grid.createDevModList(id.substring(1), id.substring(1) + "_child", "batchManager!findBatchList.action");
    });

    $('#myTab a').click(function(e) {
      e.preventDefault()
      $(this).tab('show');
    });
  }
  function createTree(){
	    require(["devModel-tree"], function(mdl_t) {
	      mdl_t.loadModelTree();
	    });
  }
  function init(){
    createHtml("my-tab-position");
    procTab();
    window.tabAfterShow=tabAfterShow;
	if(!window.user.domainUuid){
		window.global.createDomainSel(createTree);
	}
  //清空树内容
 //清空分类位置html代码
	pn=$(".m-nav");
	pn.html("");
	
	//清空树代码
	$("#ur_here").html('');
	$("#my_tree").html("");
	//先清空主搜索
	$("#main_search").html("");
	//先清空标签页
//	$("#my-tab-position").html("");
	
	
	createTree();

  }
  return {
    createHtml:createHtml,
    procTab:procTab,
    init:init,
    tabAfterShow:tabAfterShow
  };
});


