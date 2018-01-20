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
	function createBarPer(id,name,data){
		var myChart = echarts.init(document.getElementById(id)); 
		option = {
			
			calculable : false,
			xAxis : [
				{
					type : 'value',
					show:false,
					boundaryGap: [0, 0.1]
				}

			],
			yAxis : [
				{
					type : 'category',
					show:false,
					data : [name]
				}	
			],
			grid:{borderWidth:0,borderColor:'white',height:20,x:'0%',x2:'0%',y:"0%",y2:"0"},
			series : [					
				{
					name:'useage',
					type:'bar',
					stack: 'sum',
					barWidth: 20,
					//barHeight:80,
					barCategoryGap: '50%',
					itemStyle: {
						normal: {
							color: '#9fd7fb',
							barBorderColor: 'yellow',
							//barBorderWidth: 6,
							barBorderRadius:0,
//							label : {
//								show: true, position: 'insideLeft'
//							}
						}
					},
					data:data[0]
				},
				{
					name:'other',
					type:'bar',
					barWidth: 20,
					//barHeight:80,
					stack: 'sum',
					itemStyle: {
						normal: {
							color: '#ff9873',
							barBorderColor: 'tomato',
							//barBorderWidth: 6,
							barBorderRadius:0,
//							label : {
//								show: true, position: 'insideRight'
//							}
						}
					},
					data:data[1]
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
		var bid1=pid+"_bar_1_"+obj.sysUuid;
		var bid2=pid+"_bar_2_"+obj.sysUuid;
		var bid3=pid+"_bar_3_"+obj.sysUuid;
		var cid=pid+"_pie_"+obj.sysUuid;
		html+='<div class="row alert alert-success" style="margin-right:0px;margin-left:0px;margin-bottom:10px;">'
		+'<div class="col-md-4">'
		+'<div><span class="dc-title">'+obj.sysName+'</span><span style="font-color:gray;">('+window.lc.getValue("drServer")+')</span></div>'	
		+'<div><span class="dc-label">'+window.lc.getValue("status")+'</span>&nbsp;'+window.format.getRunStatus(obj.runStatus)+'</div>'
		+'<div><span class="dc-label">UUID</span>&nbsp;<span class="dc-value" >'+obj.sysUuid+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("curSessionCnt")+'</span>&nbsp;<span class="dc-value" >'+obj.sessionsCount+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("fileCnt")+'</span>&nbsp;<span class="dc-value" >'+obj.filesCount+'</span></div>'
//		+'<div><span class="dc-label">占用空间</span>&nbsp;<span class="dc-value" >'+obj.recordingsSize+'</span></div>'
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
		+'<a action="remote" uuid="'+obj.sysUuid+'"  class="blue" href="#" title="'+window.lc.getValue("remoteWeb")+'">'
		+'<i class="fa fa-arrow-circle-right bigger-130"></i>'
		+'</a>'
		}
		+'</span></div>'
		+'</div>'
		+'<div class="col-md-5">'			
		+'<div id="'+cid+'" style="height:171px;width:100%"></div>'	
		+'</div>'
		+'<div class="col-md-3">'
			+'<div style="height:171px;width:100%">'
			+'<span style="display:inline-block;height:100%;width:100%">'
//			+'<div style="height:25%;width:100%;">&nbsp;</div>'
			+'<div style="font-size:14px;color:#707070;margin-top:20px;">'+window.lc.getValue("memUsage")+'(%)'+'</div>'
			+'<div id="'+bid1+'" style="height:20px;width:100%;"></div>'
			+'<div style="font-size:14px;color:#707070;margin-top:5px;">'+window.lc.getValue("diskUsage")+'(%)'+'：</div>'
			+'<div id="'+bid2+'" style="height:20px;width:100%;"></div>'
			+'<div style="font-size:14px;color:#707070;margin-top:5px;">'+window.lc.getValue("cpuUsage")+'(%)'+'：</div>'
			+'<div id="'+bid3+'" style="height:20px;width:100%;"></div>'
			+'<div style="height:25%;width:100%;">&nbsp;</div>'
			+'</span>'
			+'</div>'
		+'</div>'
	+'</div>';
		return html;
	}
	function getBarData(value){
		var b=100-value;
		var ret=[[value],[b]];
		return ret;
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
//		var obj2={recordingsSize:10,sessionsCount:2,filesCount:3,alarmCnt:0
//				,uuid:1006,loadavg1m:1,memoryutilization:9,diskutilization:3,rxRate:3,
//				txRate:10,name:"server_1006",runStatus:3};
//		var obj3={recordingsSize:10,sessionsCount:2,filesCount:3,alarmCnt:0
//				,uuid:1007,loadavg1m:1,memoryutilization:9,diskutilization:3,rxRate:3,
//				txRate:10,name:"server_1007",runStatus:3};
//		var obj4={recordingsSize:10,sessionsCount:2,filesCount:3,alarmCnt:0
//				,uuid:1008,loadavg1m:1,memoryutilization:9,diskutilization:3,rxRate:3,
//				txRate:10,name:"server_1008",runStatus:3};
//		var list=[obj2,obj3];
		var list=obj.list;
		var html='<form id="'+id+'" class="my-tab" role="form">';
		html+='<span style="padding:5px;">'+window.lc.getValue("total")+'&nbsp;<span class="badge badge-success">'+obj.sysCnt
		+'</span>&nbsp;'+window.lc.getValue("drServer")+'</span>';
		html+='<span style="padding:5px;color:gray;font-size:12px;">'+window.lc.getValue("autoRef")+':5'+window.lc.getValue("secs")+' <span class="icon-middle"> '
	    +'<i class="fa fa-refresh fa-spin blue"></i></span></span>';
		html+='<div style="padding:5px;"><button type="button" id="openNew"  name="save" style="display:'+window.global.getClass("addDevice")+'" title="'+window.lc.getValue("add")+'" class="btn btn-success btn-sm tooltip-success"><i class="fa fa-plus bigger-130"></i>&nbsp;'+window.lc.getValue("add")+'</button></div>';
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
			var bid1=pid+"_bar_1_"+item.sysUuid;
			var bid2=pid+"_bar_2_"+item.sysUuid;
			var bid3=pid+"_bar_3_"+item.sysUuid;
			var cid=pid+"_pie_"+item.sysUuid;
			var data1=getBarData(item.memoryutilization);
			var data2=getBarData(item.diskutilization);
			var data3=getBarData(item.loadavg1m);
			createBarPer(bid1,window.lc.getValue("memUsage"),data1);
			createBarPer(bid2,window.lc.getValue("diskUsage"),data2);
			createBarPer(bid3,window.lc.getValue("cpuUsage"),data3);
			$("#"+bid1).prev().html(window.lc.getValue("memUsage")+":"+"("+(!data1[0][0]?"0":data1[0][0])+"%)");
			$("#"+bid2).prev().html(window.lc.getValue("diskUsage")+":"+"("+(!data2[0][0]?"0":data2[0][0])+"%)");
			$("#"+bid3).prev().html(window.lc.getValue("cpuUsage")+":"+"("+(!data3[0][0]?"0":data3[0][0])+"%)");

			var data=[
	              {value:item.rxRate, name:window.lc.getValue("recvByte")},
	              {value:item.txRate, name:window.lc.getValue("sendByte")}
	          ];
			var cid=pid+"_pie_"+item.sysUuid;
			if(!item.rxRate && !item.txRate){
				console.log("no draw,rx:"+item.rxRate+",tx:"+item.txRate);
			}else if(item.rxRate=="0" && item.txRate=="0"){
				console.log("no draw,rx:"+item.rxRate+",tx:"+item.txRate);
			}else{
				console.log("draw,rx:"+item.rxRate+",tx:"+item.txRate);
				createPiePer(cid,'',data);
			}
			
		}
		$("#"+pid+" a[action=remote]").bind("click",function(){
			var row=getRow(list,$(this).attr("uuid"));
	    	var rows=[row];
	        fun.remoteSys(rows);
		});
		$("#"+pid+" a[action=del]").bind("click",function(){
			
			var row=getRow(list,$(this).attr("uuid"));
	    	var rows=[row];
	        
	    	var cb=function(){
	    		fun.delServer(null,rows);
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
			
		});
		$("#openNew").bind("click",function(){
			
			fun.addServer();
			
		});
	}
	function loadLocalData(pid){
		var nid=window.curNid;
		if(window.dr && window.dr.nid){
			createService(pid,window.dr.nid);
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
			url: "dmManager!getDrCur.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.drCalc){
				var obj=data.responseJSON.drCalc;
//				createService(pid,obj);
				if(!window.dr){
					window.dr={};
				}
				var nid=window.curNid;
				if(!window.dr.nid){
					window.dr.nid=obj;
//					loadLocalData(pid);
				}else{
					window.dr.nid=obj;
				}
				loadLocalData(pid);
				var curNode=window.global.getNode();
				if(curNode && window.global.getEtype()=="dr"){
					curNode.find("span[name=badge]").html(obj.list.length);
				}
			}
		}});
	}
    return {
    	createService:createService,
    	loadRemoteData:loadRemoteData,
    	loadLocalData:loadLocalData,
    	loadData:loadData
    };
});


