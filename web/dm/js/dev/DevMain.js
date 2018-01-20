define(["dev-sch","dev-fun"],function (sch,fun){
	function createHtml(pid){
		createMainSchHtml();
//		sch.loadSearch();
		createTabHtml(pid);
	}
	function createTabHtml(pid){
		var pn=$("#"+pid);
		pn.html("");
		var html='<ul id="myTab" class="nav nav-tabs">'
			+'<li role="presentation"><a href="#dev_calc"><i class="fa fa-pie-chart"></i>&nbsp;'+window.lan["devCalc"]+'</a></li>'
			+'<li role="presentation"><a href="#dev_list"><i class="fa fa-list"></i>&nbsp;'+window.lan["devList"]+'</a></li>'
//			+'<li role="presentation"><a href="#dev_conf_batch">配置模板</a></li>'
//			+'<li role="presentation"><a href="#dev_conf"><i class="fa fa-file-o"></i>&nbsp;'+window.lan["confList"]+'</a></li>'
			+'<li role="presentation"><a href="#dev_call_calc"><i class="fa fa-phone"></i>&nbsp;'+window.lan["callCalc"]+'</a></li>'
//			+'<li role="presentation"><a href="#dev_per_calc"><i class="fa fa-line-chart"></i>&nbsp;'+window.lan["perCalc"]+'</a></li>'			
			+'<li role="presentation"><a href="#dev_alarm"><i class="fa fa-warning"></i>&nbsp;'+window.lan["alarmLog"]+'</a></li>';
		html+='<li role="presentation"><a href="#dev_config"><i class="fa fa-list"></i>&nbsp;'+window.lan["devConfig"]+'</a></li>';
		if(window.extra.reportSwitch=="on" && window.roleType.isSuper(window.user.roleId)){
			html+='<li role="presentation"><a href="#dev_report"><i class="fa fa-list"></i>&nbsp;'+window.lan["devReport"]+'</a></li>';
		}
			html+='<li role="presentation"><a href="#dev_zone"><i class="fa fa-tag"></i>&nbsp;'+window.lan["zone"]+'</a></li>'
			+'<li role="presentation"><a href="#dev_site"><i class="fa fa-tags"></i>&nbsp;'+window.lan["site"]+'</a></li>';
			html+='</ul>'
			+'<div  class="tab-content">'
			+'<div class="tab-pane fade in"  id="dev_calc" >'			
			+'</div>'
			+'<div class="tab-pane fade in" id="dev_list">'
			+'</div>'		
//			+'<div class="tab-pane fade in " id="dev_conf_batch">'						
//			+'</div>'
//			+'<div class="tab-pane fade in " id="dev_conf">'	 
//			+'</div>'		 
			+'<div class="tab-pane fade in " id="dev_call_calc">'	 
			+'</div>'
//			+'<div class="tab-pane fade in " id="dev_per_calc">'			 
//			+'</div>'
			+'<div class="tab-pane fade" id="dev_alarm"></div>';
			html+='<div class="tab-pane fade" id="dev_config"></div>';
			if(window.extra.reportSwitch=="on" && window.roleType.isSuper(window.user.roleId)){
				html+='<div class="tab-pane fade" id="dev_report"></div>';
			}
			html+='<div class="tab-pane fade" id="dev_zone"></div>'
			+'<div class="tab-pane fade" id="dev_site"></div>';
			html+='</div>';
		var pa=sch.getSchPara();
		if(pa.indexOf("unknownDev")>=0){
			html='<ul id="myTab" class="nav nav-tabs">'
				+'<li role="presentation" ><a href="#dev_unknown_list">'+window.lan["unknownDevList"]+'</a></li>'
				+'</ul>'
				+'<div  class="tab-content">'
				+'<div class="tab-pane fade in"  id="dev_unknown_list" >'			
				+'</div>'
				+'</div>';
		}
		pn.append(html);
	}
	function cb(activeId){
		tabAfterShow(activeId);	
		
	}
	function createMainSchHtml(){		
		//主搜索位置生成html
		window.field.createMainSearch(window.lc.getValue("productSn")+'/'+window.lc.getValue("devName")
				+"/"+window.lc.getValue("version")
				+"/"+window.lc.getValue("desc")
				+"/"+window.lc.getValue("productName"),cb);
	}
	function hideNode(type){
		$("#dev_"+type).html("");
		$("#my-tab-position a[href=#dev_"+type+"]").parent().css("display","none");
	}
	function showNode(type){
		$("#dev_"+type).html("");
		$("#my-tab-position a[href=#dev_"+type+"]").parent().css("display","inline-block");
	}
	function tabAfterShow(id){
		var node=window.global.getNode();
		var aid=id;
		var domainUuid=window.global.getDomainUuid();
		if(!node && !domainUuid){
			hideNode("zone");
			hideNode("site");
			if(aid=="#dev_zone" || aid=="#dev_site"){
				id="#dev_list";
				$("#myTab a[href="+id+"]").tab("show");
				return;
			}
		}else if(!node && domainUuid){
			showNode("zone");
			showNode("site");
		}else{
			showNode("zone");
			showNode("site");
		}
		
		if(id=="#dev_calc"){
			require(["dev-calc-group"], function(obj) { 				
				window.global.doTabExist(id,obj,function(){
					obj.createCalc("dev_calc");
				})
			});		
		}else if(id=="#dev_list"){
			require(["dev-list"], function(obj) { 				
				window.global.doTabExist(id,obj,function(){
					obj.createDevList2(id.substring(1),id.substring(1)+"_child","dmManager!getNeList.action");
				})
			});			
		}else if(id=="#dev_unknown_list"){
			require(["dev-unknown-list"], function(obj) { 			
				window.global.doTabExist(id,obj,function(){
					obj.createDevList(id.substring(1),id.substring(1)+"child");
				})
			});	
		}else if(id=="#dev_call_calc"){
			require(["dev-call-calc"], function(obj) { 				
				window.global.doTabExist(id,obj,function(){
					obj.createCallCalc(id.substring(1),0,"");
				})
			});		
		}else if(id=="#dev_alarm"){
			require(["dev-alarm"], function(obj) { 				
				window.global.doTabExist(id,obj,function(){
					obj.createAlarmList2(id.substring(1),"androidManager!getDevAlarm.action");
				})
			});
		}else if(id=="#dev_his_calc"){
			require(["dev-his-calc"], function(obj) { 			
				window.global.doTabExist(id,obj,function(){
					obj.createView(id.substring(1));
				})
			});
		}else if(id=="#dev_lic"){
			require(["dev-lic"], function(obj) { 				
				window.global.doTabExist(id,obj,function(){
					obj.createView(id.substring(1));
				})
			});
		}else if(id=="#dev_report"){
			require(["dev-report-list"], function(obj) {
				window.global.doTabExist(id,obj,function(){
					obj.createView(id.substring(1),null,"total");
				})				
			});
		}else if(id=="#dev_config"){
			require(["dev-config-list"], function(obj) {
				window.global.doTabExist(id,obj,function(){
					obj.createView(id.substring(1));
				})				
			});
			
		}else if(id=="#dev_site"){
			require(["dev-site"], function(obj) { 				
				window.global.doTabExist(id,obj,function(){
					obj.createList(id.substring(1));
				})
			});				
		}else if(id=="#dev_zone"){
			require(["dev-zone"], function(obj) {				
				window.global.doTabExist(id,obj,function(){
					obj.createList(id.substring(1));
				})
			});
		}
	}

	function globalProc(){
		window.devList={params:{}};
		window.devAlarm={params:{}};
		
		var nid="root";
		if(window.user.dstDomainUuid){
			nid="domain_"+window.user.dstDomainUuid;
		}
		window.devCalc={params:{},data:null};
		window.portList={params:{}};
		window.tabAfterShow=tabAfterShow;
	}
	function createTree(){
		require(["dev-tree"], function(dev_t) {
			dev_t.loadTree();
		});
	}
	function init(){
		window.global.initGroupBy();
		globalProc();
		sch.loadSearch();
		createHtml("my-tab-position");
		window.global.procTab();
		window.global.createDomainSel(createTree);		
		
		//更新高级搜索的设备数
		var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara(),noSearch:1};
		window.global.getTreePara(params);
		$.ajax({ 
			url: "dmManager!getNeCount.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.success){
				var total=data.responseJSON.maxTotal;
				window.devMain.maxTotal=total;
				$("#maxTotal").html(total);
			}
		}});
         
	}
    return {
    	createHtml:createHtml,
    	createTabHtml:createTabHtml,
    	createMainSchHtml:createMainSchHtml,
		init:init,
		tabAfterShow:tabAfterShow,
		cb:cb,
		createTree:createTree
    };
});


