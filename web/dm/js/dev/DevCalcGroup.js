define(["form-field","dev-fun","dev-sch","tree","dev-path","bootstrap-table"],function (field,fun,sch,tree,path){
	function createPiePer(id,title,data){
		var myChart = echarts.init(document.getElementById(id)); 
		option = {
			
			title: {
				text: title,
				x:'center',
				y:'top',
		        textStyle:{
				    fontSize: 14,
//				    fontWeight: 'bolder',
				    color: '#707070'
				}
			},

			tooltip : {
				trigger: 'item',
				formatter: "{b} :{c} <br/>{d}%"
			},
			
			calculable : false,
			series : [
				{
					name:window.lc.getValue("versionDistribution"),
					type:'pie',
					radius : ['0', '80%'],
					center : ['50%', '50%'],
					data:data,
					itemStyle : {
		                normal : {
		                    label : {
		                        show : false
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                },
		                emphasis : {
		                    label : {
		                        show : false
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
				}				
			]
		};             
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function getLink(cnt,obj,type){
		if(!cnt){
			return '';
		}

		return '<a total="'+cnt+'" type="'+type+'" domain_uuid="'+obj.domainUuid+'" zone_uuid="'+obj.zoneUuid+'" site_uuid="'+obj.siteUuid+'" class="blue dev-search" href="#" title="'+window.lc.getValue("view")+'"><i class="fa fa-search-plus bigger-120"></i></a>';
	}
	function getHtml(pid,index,list){
		var html="";
		var obj=list[index];
		var cid=pid+"_chart_"+index;
		var node=window.global.getNode();
		var et=window.global.getEtype();
		var groupBy=window.groupBy;
		var domainUuid=window.global.getDomainUuid();
		var srcDomainUuid=window.user.domainUuid;
		if(!groupBy){
//			html+=getAlink("root",0,"",window.lc.getValue("groupByDomain")+'?',"domain");
			html+=path.getNextPath(obj,window.lc.getValue("groupByDomain")+'?');
		}else if(groupBy=="domain"){
			html+=window.lc.getValue("ownDomain")+'('+obj.domainName+')';
			html+=path.getNextPath(obj,window.lc.getValue("groupByZone")+'?');
//			html+='&nbsp;'+getAlink("domain",obj.domainUuid,"",window.lc.getValue("groupByZone")+'?',"zone");
		}else if(groupBy=="zone"){
			html+=window.lc.getValue("ownZone")+'('+obj.zoneName+')';
			html+=path.getNextPath(obj,window.lc.getValue("groupBySite")+'?');
//			html+='&nbsp;'+getAlink("zone",obj.zoneUuid,"",window.lc.getValue("groupBySite")+'?',"site");
		}else if(groupBy=="site"){
			html+=window.lc.getValue("ownSite")+'('+obj.siteName+')';
		}

		var ho={cid:cid,title:html,total:obj.totalCnt,totalLink:getLink(obj.totalCnt,obj,"total")
				,versionLink:getLink(obj.list.length,obj,"version")
				,dag:obj.dagCnt,dagLink:getLink(obj.dagCnt,obj,"dag")
			    ,mtg:obj.mtgCnt,mtgLink:getLink(obj.mtgCnt,obj,"mtg")
				,online:obj.onlineCnt,onlineLink:getLink(obj.onlineCnt,obj,"online")
				,fault:obj.faultCnt,faultLink:getLink(obj.faultCnt,obj,"fault")
				,upgrade:obj.upgradingCnt,upgradeLink:getLink(obj.upgradingCnt,obj,"upgrade")
				,batch:obj.batchingCnt,batchLink:getLink(obj.batchingCnt,obj,"batch")
				,dbo:obj.dboCnt,dboLink:getLink(obj.dboCnt,obj,"dbo")	
				,agp:obj.agpCnt,agpLink:getLink(obj.agpCnt,obj,"agp")
				,fxs:obj.fxsCnt,fxsLink:getLink(obj.fxsCnt,obj,"fxs")
				,fxo:obj.fxoCnt,fxoLink:getLink(obj.fxoCnt,obj,"fxo")
				,regSuccAgp:obj.regSuccAgpCnt,regSuccAgpLink:getLink(obj.regSuccAgpCnt,obj,"regsuccagp")	
				,regFailAgp:obj.regFailAgpCnt,regFailAgpLink:getLink(obj.regFailAgpCnt,obj,"regfailagp")
				,noReg:obj.noRegCnt,noRegLink:getLink(obj.noRegCnt,obj,"noregagp")
				,e1:obj.e1Cnt
				,enableE1:obj.enableE1Cnt	
			    ,sip:obj.sipCnt,pri:obj.priCnt,ss7:obj.ss7Cnt};
		return ho;
	}
	function getRow(list,uuid){
		for(var i=0;i<list.length;i++){
			var t=list[i];
			if(t.sysUuid==uuid){
				t.uuid=uuid;
				return t;
			}
		}
		return null;
	}
	//点击链接统一入口
	function updateNid(curNid){
		window.devCalc.curNid=curNid;
		
	}
	function clickNid(pid,nid){

	}
	function procClick(pid,n){
		path.pathClick(n);
	}
	function createCalc(pid){
		createCondition(pid);
		loadRemoteData(pid);
	}
	function getAlink(etype,uuid,name,text,groupBy){
		var nid=etype+"_"+uuid;
		if(!uuid){
			nid=etype;
		}
		return '<a class="blue" group-by="'+groupBy+'" etype="'+etype+'" nid="'+nid+'" name="'+name+'" href="#">'+text+'</a>';
	}
	function getRfreshLink(){
		return '&nbsp;<a name="refresh" class="blue dev-search" href="#" title="'+window.lc.getValue("refresh")+'" etype="'+etype+'" nid="'+nid+'"><i class="fa fa-refresh bigger-120"></i></a>';
	}
	//顶部路径
	function getTotalHtml(cnt,obj,loaded){
		if(loaded){
			var ret='<span style="padding:5px;">'+window.lc.getValue("total")+'&nbsp;<span class="badge badge-success">'+cnt+'</span>&nbsp;'+window.lc.getValue("devs")+'</span>&nbsp;'			
			ret+=path.getPrevPath(window.lc.getValue("goToPrevView")+'?');
//			ret+=path.getRfreshLink();
			return ret;
		}else{
			return fun.getLoadHtml();
		}
	}
	function createContent(pid,list){
		if(list.length){
			var id=pid+"_child"+"_content";
			var n=$("#"+id);
			var html='';
			var obj=list[0];
			var cnt=0;
			var l=[];
			var o={};
			for(var i=0;i<list.length;i++){
				cnt+=list[i].totalCnt;
			}
			
			html+=getTotalHtml(cnt,obj,true);
			for(var i=0;i<list.length;i++){
				l.push(getHtml(pid,i,list));
			}
			o.list=l;
			var lf=window.lc.getValue;
			var lo={devCnt:lf("devCnt"),mtgCnt:lf("mtgCnt"),dagCnt:lf("dagCnt"),onlineDevCnt:lf("onlineDevCnt")
,devFaultCnt:lf("devFaultCnt"),upgradingCnt:lf("upgradingCnt"),dboEnableCnt:lf("dboEnableCnt"),batchingCnt:lf("batchingCnt"),portCnt:lf("portCnt")
,fxsCnt:lf("fxsCnt"),fxoCnt:lf("fxoCnt"),regSuccPortCnt:lf("regSuccPortCnt"),regFailPortCnt:lf("regFailPortCnt"),noAccountPortCnt:lf("noAccountPortCnt")
,e1Cnt:lf("e1Cnt"),enableE1Cnt:lf("enableE1Cnt"),sipCnt:lf("sipCnt"),priCnt:lf("priCnt"),ss7Cnt:lf("ss7Cnt"),versionDistribution:lf("versionDistribution")};
			o.lan=lo;
			require(['text!html/dev/DevCalcGroup.html'],function(tpl){
	            var tempFn = window.dot.template(tpl);
	            html+= tempFn(o);
	            n.html(html);
	            
	            for(var i=0;i<list.length;i++){
	    			var clist=list[i].list;
	    			if(clist&&clist.length){
	    				var data=[];
	    				for(var j=0;j<clist.length;j++){
	    					var item=clist[j];
	    					data.push({value:item.cnt,name:item.version});
	    				}
	    				var cid=pid+"_chart_"+i;
	    				createPiePer(cid,'',data);
	    			}
	    		}
	    		
	    		$("#"+pid+" a").bind("click",function(){
	    			if(!$(this).hasClass("dev-search"))
	    			procClick(pid,$(this));
	    		});
	    		$(".dev-search").bind("click",function(){
	    			var n=$(this);
	    			var ty=n.attr("type");
	    			var domainUuid=n.attr("domain_uuid");
	    			var zoneUuid=n.attr("zone_uuid");
	    			var siteUuid=n.attr("site_uuid");
	    			var total=n.attr("total");
	    			if(!ty){
	    				return;
	    			}
	    			if(ty=="version"){
	    				var data=window.devCalc.data;
	    				if(data){
	    					var obj=null;
	    					for(var i=0;i<data.length;i++){
	    						var item=data[i];
	    						if(item.siteUuid==siteUuid && item.zoneUuid==zoneUuid && item.domainUuid==domainUuid){
	    							obj=item;
	    							break;
	    						}
	    					}
	    					if(obj){
	    						createVerList(pid,obj.list);
	    					}
	    				}
	    			}else if(ty=="agp"){
	    				createPortList(pid,ty,n);
	    			}else if(ty=="fxo"){
	    				createPortList(pid,ty,n);
	    			}else if(ty=="fxs"){
	    				createPortList(pid,ty,n);
	    			}else if(ty=="regsuccagp"){
	    				createPortList(pid,ty,n);
	    			}else if(ty=="regfailagp"){
	    				createPortList(pid,ty,n);
	    			}else if(ty=="noregagp"){
	    				createPortList(pid,ty,n);
	    			}else{
	    				var pa=window.devList.params;
	    				pa.type=ty;			
	    				pa.dstDomainUuid=domainUuid;
	    				pa.zoneUuid=zoneUuid;
	    				pa.siteUuid=siteUuid;
	    				pa.total=total;
	    				require(["dev-list"], function(grid) {
	    					grid.createDevList2(pid,pid+"_child","dmManager!getNeList2.action");
	    				});
	    			}
	    		});
			});
		}
	}
	function createPortList(pid,ty,n){
		var ty=n.attr("type");
		var domainUuid=n.attr("domain_uuid");
		var zoneUuid=n.attr("zone_uuid");
		var siteUuid=n.attr("site_uuid");
		var total=n.attr("total");
		window.portList.params={dstDomainUuid:domainUuid,zoneUuid:zoneUuid,siteUuid:siteUuid
				,mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara(),total:total,type:ty};
		require(["agp-list"], function(grid){
			grid.createPortList(pid);
		});
	}
	function createCondition(pid){
		var pn=$("#"+pid);
		if(!pn) return;
		var id=pid+"_child";
		var html='<form id="'+id+'" class="my-tab" role="form">';

		html+='<div id="'+id+'_content">'+getTotalHtml(0)+'</div>'
		html+='</form>';
		pn.html("");		
		pn.append(html);
		$("#"+pid+" a").bind("click",function(){
			procClick(pid,$(this));
		});
	}
	function loadLocalData(pid){
		var tmp=[{"totalCnt":100,"onlineCnt":60,"domainUuid":105,"domainName":"lewis","zoneUuid":1,"zoneName":"深圳","siteUuid":1
				,"siteName":"宝安","unknownCnt":20,"dagCnt":42,"mtgCnt":"58"
				,"list":[{"version":"01230223","cnt":10},{"version":"NA","cnt":30}
				,{"version":"01230332","cnt":10},{"version":"01230432","cnt":50}]
				,"faultCnt":10,"upgradingCnt":20,"dboCnt":30,"batchingCnt":0,"fxoCnt":0,"fxsCnt":2
			,"regFailPortCnt":0,"e1Cnt":8,"enableE1Cnt":1},
			{"totalCnt":100,"onlineCnt":60,"domainUuid":106,"domainName":"evan","zoneUuid":2,"zoneName":"广州","siteUuid":2
				,"siteName":"天河","unknownCnt":20,"dagCnt":42,"mtgCnt":"58"
				,"list":[{"version":"01230223","cnt":10},{"version":"NA","cnt":30}
				,{"version":"01230332","cnt":10},{"version":"01230432","cnt":50}]
				,"faultCnt":10,"upgradingCnt":20,"dboCnt":30,"batchingCnt":0,"fxoCnt":0,"fxsCnt":2
			,"regFailPortCnt":0,"e1Cnt":8,"enableE1Cnt":1}];
		createCalc(pid,tmp);
	}
	function loadData(pid){
		loadRemoteData(pid);
	}
	function getGroup(grp){		
		return window.groupBy;
	}
	function loadRemoteData(pid){
		var params={mainSearch:$.trim($('#dev_tag').val()),upSearch:sch.getSchPara(),group:getGroup()};
		window.global.getTreePara(params);
		 $.ajax({ 
			url: "dmManager!getDevCalcGrp.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.dcdgl && data.responseJSON.dcdgl.length){
				var obj=data.responseJSON.dcdgl;
				window.devCalc.data=obj;
				createContent(pid,obj);
			}else{
				var id=pid+"_child";
				var cid=id+"_content";
				$("#"+cid).html(getTotalHtml(0,null,true));
			}
		}});
	}
	function createVerList(pid,list){
		var id=pid+"_ver";
		var obj={close:window.lc.getValue("close"),title:window.lc.getValue("versionDistribution"),body:'<table id="'+id+'"></table>',commit:false};
		var pn=$("#myModal");
		if(!pn) return;
		require(['text!html/modal.html'],function(tpl){
            var tempFn = window.dot.template(tpl);
            var html = tempFn(obj);
            pn.html(html);
			$('#myModal').modal().css({
			    width: 'auto',
			    backdrop:false,
			});
			
            $('#'+id).bootstrapTable({
    			method: 'get',
    			url: "",
    			cache: false,
    			data:list,
    			striped: true,
    			toolbar:"#"+id+"-toolbar",
    			pagination: true,
    			pageSize: 10,
    			pageList: [10, 25, 50, 100, 200],
    			search: true,
    			showToggle:true,
    			smartDisplay:true,
    			minimumCountColumns: 2,
    			clickToSelect: true,
    			columns: [{
    				field: 'version',
    				title: window.lc.getValue("version"),
    				align: 'center',
    				valign: 'middle',
    				sortable: true
    			},{
    				field: 'cnt',
    				title: window.lc.getValue("cnt"),
    				align: 'center',
    				valign: 'middle',
    				sortable: true
    			}]
    		});
    		window.list.changeForAce("myModal");
    		$(window).resize(function (){
    			window.list.changeView("myModal",id,600);
    		});
    		window.list.changeView("myModal",id,600);
	  	})
	}
    return {
    	createCalc:createCalc,
    	loadRemoteData:loadRemoteData,
    	createPiePer:createPiePer,
    	loadLocalData:loadLocalData,
    	loadData:loadData,
    	clickNid:clickNid
    };
});


