define(["form-field","service-fun","pri-pri"],function (field,fun,pri){
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
					name:'MTG Status',
					type:'pie',
					radius : ['0', '70%'],
					center : ['50%', '50%'],
					data:data,
				}				
			]
		};             
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function getServerHtml(pid,obj){
		var html="";
		var cid1=pid+"_chart_1_"+obj.sysUuid;
		var cid2=pid+"_chart_2_"+obj.sysUuid;
		html+='<div class="row alert alert-success" style="margin-right:0px;margin-left:0px;margin-bottom:10px;">'
		+'<div class="col-md-4">'
		+'<div><span class="dc-title">'+obj.sysName+'</span><span style="font-color:gray;">('+window.lc.getValue("dcServer")+')</span>'
		+'</div>'	
		+'<div><span class="dc-label">'+window.lc.getValue("status")+'</span>&nbsp;'+window.format.getRunStatus(obj.runStatus)+'</div>'
		+'<div><span class="dc-label">UUID</span>&nbsp;<span class="dc-value" >'+obj.sysUuid+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("maxProcessTime")+'</span>&nbsp;<span class="dc-value" >'+obj.maxProcessTime+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("avgProcessTime")+'</span>&nbsp;<span class="dc-value" >'+obj.avgProcessTime+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("totalProcess")+'</span>&nbsp;<span class="dc-value" >'+obj.totalProcess+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("alarm")+'</span>&nbsp;<span class="badge badge-danger">'+obj.alarmCnt+'</span></div>'
		+'<div><span class="dc-label">IP '+window.lc.getValue("addr")+'</span>&nbsp;<span class="dc-value" >'+obj.sysIpAddr+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("option")+'</span>&nbsp;<span class="dc-value" >'
		if(window.global.getClass("deleteDevice")=='inline-block'){
		+'<a action="del" uuid="'+obj.sysUuid+'"  class="red" href="#" title="'+window.lc.getValue("del")+'">'
		+'<i class="fa fa-remove bigger-130"></i>'
		+'</a>'
		+'&nbsp;'
		}
		if(window.global.getClass("remoteWebAdmin")=='inline-block'){
		+'<a action="remote" uuid="'+obj.sysUuid+'" class="blue" href="#" title="'+window.lc.getValue("remoteWeb")+'">'
		+'<i class="fa fa-arrow-circle-right bigger-130"></i>'
		+'</a>'
		}
		+'</span></div>'
		+'</div>'			
		+'<div class="col-md-4">'			
		+'<div id="'+cid1+'" style="height:192px;width:100%"></div>'	
		+'</div>'
		+'<div class="col-md-4">'
		+'<div id="'+cid2+'" style="height:192px;width:100%"></div>'
		+'</div>'
	+'</div>';
		return html;
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
	function createService(pid,obj){
		var pn=$("#"+pid);
		if(!pn) return;
		var format=window.format;
		var id=pid+"_child";
//		var obj2={maxProcessTime:10,avgProcessTime:2,alarmCnt:3
//				,startTime:'2015-05-06 19:05:08',uuid:1003
//				,curDealStatus4:0,curDealStatus3:0,curDealStatus2:0,curDealStatus1:0,
//				totalProcess:0,curDealCnt:0,curPendingCnt:0
//				,name:"server_1003",runStatus:3};
//		var obj3={maxProcessTime:11,avgProcessTime:12,alarmCnt:13
//				,startTime:'2015-05-06 19:05:18',uuid:1004
//				,totalProcess:12,curDealCnt:4,curPendingCnt:8
//				,curDealStatus4:6,curDealStatus3:3,curDealStatus2:2,curDealStatus1:3
//				,name:"server_1004",runStatus:6};
//		var obj4={maxProcessTime:11,avgProcessTime:12,alarmCnt:13
//				,startTime:'2015-05-06 19:05:18',uuid:1005
//				,totalProcess:9,curDealCnt:6,curPendingCnt:3
//				,curDealStatus4:3,curDealStatus3:5,curDealStatus2:3,curDealStatus1:7
//				,name:"server_1005",runStatus:9};
//		var list=[obj2,obj3,obj4];
		var list=obj.list;
		var html='<form id="'+id+'" class="my-tab" role="form">';
		html+='<span style="padding:5px;">'+window.lc.getValue("total")+'&nbsp;<span class="badge badge-success">'
		+obj.sysCnt+'</span>&nbsp;'+window.lc.getValue("dcServer")+'</span>';
		html+='<span style="padding:5px;color:gray;font-size:12px;">'+window.lc.getValue("autoRef")+':5'+window.lc.getValue("secs")+' <span class="icon-middle"> '
	    +'<i class="fa fa-refresh fa-spin blue"></i></span></span>';
		html+='<div style="padding:5px;"><button type="button" id="openNew"   name="save" style="display:'+window.global.getClass("addDevice")+'"  title="'+window.lc.getValue("add")+'" class="btn btn-success btn-sm tooltip-success"><i class="fa fa-plus bigger-130"></i>&nbsp;'
		+window.lc.getValue("add")+'</button></div>';
		html+='<div class="container-fluid" style="padding:5px;">';
//		+'<div class="row"><div class="col-md-12"><span style="font-family:verdana;font-size:14px;color:black;font-weight:bold;">server_1003</span></div></div>'
		for(var i=0;i<list.length;i++){
			html+=getServerHtml(pid,list[i]);
		}		
		html+='</div>';	 
			+'</form>';
		pn.html("");		
		pn.append(html);
//		$('#'+id).autofill(obj);
		for(var i=0;i<list.length;i++){
			var item=list[i];
			if(item.curDealStatus1 || item.curDealStatus2 || item.curDealStatus3 || item.curDealStatus4){
				var data1=[
		              {value:item.curDealStatus4, name:window.lc.getValue("curDealStatus",4)},
		              {value:item.curDealStatus3, name:window.lc.getValue("curDealStatus",3)},
		              {value:item.curDealStatus1, name:window.lc.getValue("curDealStatus",1)},             
		              {value:item.curDealStatus2, name:window.lc.getValue("curDealStatus",2)}
		          ];
				var cid1=pid+"_chart_1_"+item.sysUuid;
				createPiePer(cid1,'',data1);
			}
			if(item.curDealCnt || item.curPendingCnt){
				var data2=[
		              {value:item.curDealCnt, name:window.lc.getValue("curDealCnt")},
		              {value:item.curPendingCnt, name:window.lc.getValue("curPendingCnt")}
		          ];
				var cid2=pid+"_chart_2_"+item.sysUuid;
				createPiePer(cid2,'',data2);
			}
		}
		$("#"+pid+" a[action=remote]").bind("click",function(){
			var row=getRow(list,$(this).attr("uuid"));
	    	var rows=[row];
	        fun.remoteSys(rows);
		});
		$("#"+pid+" a[action=del]").bind("click",function(){
			if(pri.procPrivilegeEdit()){
			   	   return;
			}else{
			var row=getRow(list,$(this).attr("uuid"));
	    	var rows=[row];	        
	    	var cb=function(){
	    		fun.delServer(null,rows);
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			}
		});
		$("#openNew").bind("click",function(){
			if(pri.procPrivilegeEdit()){
			   	   return;
			}else{
			fun.addServer(loadRemoteData,pid);
			}
		});
	}
	function loadLocalData(pid){
		var nid=window.curNid;
		if(window.dc && window.dc.nid){
			createService(pid,window.dc.nid);
			return;
		}
		var tmp={"alarmCnt":0,"avgProcessTime":"","curDealCnt":0,"curDealStatus1":0,"curDealStatus2":0,"curDealStatus3":0,"curDealStatus4":0
				,"curPendingCnt":0,"generateTime":"","list":[],"maxProcessTime":"","productId":0,"recStatus":0,"runStatus":0,"serialNo":0,"startTime":""
			,"sysCnt":window.curTreeNode.cnt,"sysIpAddr":"","sysName":"","sysPort":0,"sysUuid":0,"totalProcess":0,"uuid":0};
		createService(pid,tmp);
	}
	function loadData(pid){
//		loadLocalData(pid);
		loadRemoteData(pid);
	}
	function loadRemoteData(pid){
		var params={mainSearch:$.trim($('#dev_tag').val())};
		params.dstDomainUuid=window.global.getDomainUuid();
		 $.ajax({ 
			url: "dmManager!getDcCur.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.dcCalc){
				var obj=data.responseJSON.dcCalc;
//				createService(pid,obj);
				if(!window.dc){
					window.dc={};
				}
				var nid=window.curNid;
				if(!window.dc.nid){
					window.dc.nid=obj;
//					loadLocalData(pid);
				}else{
					window.dc.nid=obj;
				}
				loadLocalData(pid);
				var curNode=window.global.getNode();
				if(curNode && window.global.getEtype()=="dc"){
					curNode.find("span[name=badge]").html(obj.list.length);
				}
			}
		}});
	}

    return {
    	createService:createService,
    	loadRemoteData:loadRemoteData,
    	createPiePer:createPiePer,
    	loadLocalData:loadLocalData,
    	loadData:loadData
    };
});


