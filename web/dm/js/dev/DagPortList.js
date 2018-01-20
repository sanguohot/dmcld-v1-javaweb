define(["bootstrap-table","form-field"],function (bt,field){
	function createHtml(pid,id,params,type,from){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
		var html='<form id="'+pid+"_form"+'" role="form">';
		html+='<div class="container-fluid my-tab" >'
		+'<div class="row ">'
			+'<div class="col-md-12">'
			 +'<div class="btn-group">'
			 +'<button id="'+id+'-back" type="button" class="btn btn-info btn-sm"><i class="fa fa-reply bigger-130"></i></button>'
			+'</div>'
			+'</div>'
		+'</div>'
		+'</div>'
		+'<div class="container-fluid my-tab" >'
		+'<div class="row"><div class="col-md-12"><h4 ><label>'+window.lc.getValue("filter")+'</label></h4></div></div>'
		+'<div class="row">'
			+'<div class="col-md-12">'			
			+field.getRadioField("portType",1,window.lc.getValue("portType"),[{value:1,text:window.lc.getValue("publicType")},{value:2,text:"LINE"}
			,{value:3,text:"LAN"},{value:4,text:"WAN"},{value:5,text:"DSP"}])
			+'</div>'			
		+'</div>'
		+'</div>'
		html+='</form>';
//		var html='<div id="'+id+'-toolbar" class="btn-group" role="group" aria-label="...">'
//		html+='<button id="'+id+'-back" type="submit" class="btn btn-info btn-sm"><i class="fa fa-reply bigger-130"></i></button>'
////		+'<button id="'+id+'-all" type="submit" class="btn btn-link">综合类型</button>'
////		+'<button id="'+id+'-line" type="submit" class="btn btn-link">LINE</button>'
////		+'<button id="'+id+'-lan" type="submit" class="btn btn-link">LAN</button>'
////		+'<button id="'+id+'-wan" type="submit" class="btn btn-link">WAN</button>'
////		+'<button id="'+id+'-dsp" type="submit" class="btn btn-link">DSP</button>'
//		+'<form>'
//		+field.getRadioField("portType",1,"",[{value:1,text:"综合类型"},{value:2,text:"LINE"}
//		,{value:3,text:"LAN"},{value:4,text:"WAN"},{value:5,text:"DSP"}])
//		+'</form>'
//		+'</div>'

		html+='<div class="container-fluid my-tab" >'
		+'<div class="row ">'
			+'<div class="col-md-12" id="'+id+'">'
			+'</div>'
		+'</div>'
		+'</div>'
		pn.html("");
		pn.append(html);
//		html+=+'</form>';
		
		$("#"+id+"-back").bind('click',function(){
			var uuid=params.neUuid;
			var domainUuid=params.domainUuid;
			var p={neUuid:uuid,dstDomainUuid:domainUuid};
			if(from=="form"){
				require(["dev-panel"], function (panel){
					panel.loadRemoteData(pid,pid+"_form",p);
				});
			}else if(from=="list"){
				require(["dev-list"], function(grid) {
					grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
				});	
			}
		});
		
//		$("#"+id+"-line").bind('click',function(){
//			createPortList(pid,pid+"_ag",{neUuid:params.neUuid,domainUuid:params.domainUuid},"line");
//		});
//		$("#"+id+"-all").bind('click',function(){
//			createPortList(pid,pid+"_ag",{neUuid:params.neUuid,domainUuid:params.domainUuid},"all");
//		});
//		$("#"+id+"-lan").bind('click',function(){
//			createPortList(pid,pid+"_ag",{neUuid:params.neUuid,domainUuid:params.domainUuid},"lan");
//		});
//		$("#"+id+"-wan").bind('click',function(){
//			createPortList(pid,pid+"_ag",{neUuid:params.neUuid,domainUuid:params.domainUuid},"wan");
//		});
//		$("#"+id+"-dsp").bind('click',function(){
//			createPortList(pid,pid+"_ag",{neUuid:params.neUuid,domainUuid:params.domainUuid},"dsp");
//		});
		$("input[name=portType]").bind("click",function(){
			var value=$("input[name=portType]:checked").val();
			console.log(value);
			var str="all";
			if(value==1){
				
			}
			if(value==2){
				str="line";
			}
			if(value==3){
				str="lan";
			}
			if(value==4){
				str="eth";
			}
			if(value==5){
				str="dsp";
			}

			var con=getContent(str);			
			var tid=id+"_"+str;
			var pa={neUuid:params.neUuid,domainUuid:params.domainUuid,type:con.type};
			$('#'+tid).bootstrapTable("refresh",{url:con.url,queryParams:pa});
			createTable(pid,pid+"_ag",{neUuid:params.neUuid,domainUuid:params.domainUuid},str);
		})
		//默认选择综合端口
		var pt=$("input[name=portType]:first");
		pt.trigger("click");

	}
	function createTable(pid,id,params,type,from){
		n=$("#"+id);
		if(!n){
			return;
		}
		n.html("");
		var tid=id+"_"+type;
		n.html('<table id="'+tid+'"></table>');
		var con=getContent(type);		
		var tid=id+"_"+type;
		$('#'+tid).bootstrapTable({
			method: 'get',
			url: con.url,
			cache: false,
//			height: 400,
			responseHandler:function(res){
				if(type=="dsp" || type=="eth"){
					if(res && res.tgpList){
						return res.tgpList;
					}
					return res;
				}
				if(res && res.agpList){
					return res.agpList;
				}
				return res;
			},
			queryParams:function(p){
//				p.type="all";
				var pa=window.devList.params;
	        	if(pid.indexOf("dev_list")>=0){
	        		pa={};
	        	}
				for(var x in pa){
					p[x]=pa[x];
				}
				for(var x in params){
					p[x]=params[x];
				}
				p.type=con.type;
				return p;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 10,
//			pageList: [10, 25, 50, 100, 200],
			search: true,
			showColumns: true,
			showRefresh: true,
			minimumCountColumns: 2,
			showToggle:true,
			clickToSelect: true,
			columns: con.columns,
			onClickRow: function (row) {
				if(row){

				}
            }
		});
		window.list.changeForAce(pid);
		$(window).resize(function () {
			window.list.changeView(pid,tid,600);
		});
		window.list.changeView(pid,tid,600);
	}
	function createPortList(pid,id,params,type,from){
		createHtml(pid,id,params,type,from);
		createTable(pid,id,params,type,from);
		
	}
	function getContent(type){
		var obj={};
		var columns=[{
			field: 'state',
			checkbox: true
		}, {
			field: 'portNo',
			title: window.lc.getValue("portNo"),			
			align: 'left',
			valign: 'middle',
			sortable: true
		}, {
			field: 'type',
			title: window.lc.getValue("type"),
			align: 'left',
			valign: 'middle',
			sortable: true,
			formatter:function(value,row,index){
			return window.lc.getValue("portType",value);
		}
		}, {
			field: 'alias',
			title: window.lc.getValue("alias"),
			align: 'left',
			valign: 'middle',
			sortable: true,
//		},{
//			field: 'adminStatus',
//			title: window.lc.getValue("adminStatus"),
//			align: 'left',
//			valign: 'middle',
//			sortable: true,
//			formatter:function(value,row,index){
//				return window.lc.getValue("adminStatus",value);
//			}
//		}, {
//			field: 'runStatus',
//			title: window.lc.getValue("runStatus"),
//			align: 'left',
//			valign: 'middle',
//			clickToSelect: false,
//			formatter:function(value,row,index){
//				return window.lc.getValue("runStatus",value);
//			}
		}];
		var url="agpManager!getPortByNe.action";
		var t=type;
		if(type=="eth" || type=="dsp"){
			url="tgpManager!getPortByNe.action";
		}
		if(type=="line" || type=="agp"){
			t="agp";
			columns=[{
				field: 'state',
				checkbox: true
			}, {
				field: 'portNo',
				title: window.lc.getValue("portNo"),
				align: 'left',
				valign: 'middle',
				sortable: true
//			}, {
//				field: 'runStatus',
//				title: window.lc.getValue("runStatus"),
//				align: 'left',
//				valign: 'middle',
//				clickToSelect: false,
//				formatter:function(value,row,index){
//					return window.lc.getValue("runStatus",value);
//				}
			},{
				field: 'agpWorkState',
				title: window.lc.getValue("workStatus"),
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
					return window.lc.getValue("agpWorkState",value);
				}
			},{
				field: 'agpPrimarySip',
				title: window.lc.getValue("priSip"),
				align: 'left',
				valign: 'middle',
				clickToSelect: false
			},{
				field: 'agpSecondarySip',
				title: window.lc.getValue("secSip"),
				align: 'left',
				valign: 'middle',
				sortable: true
			},{
				field: 'agpPrimaryStatus',
				title: window.lc.getValue("priRegStatus"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("primaryStatus",value);
			}
			}, {
				field: 'agpSecondaryStatus',
				title: window.lc.getValue("secRegStatus"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("primaryStatus",value);
			}
			},{
				field: 'agpRegFailCount',
				title: window.lc.getValue("regFailCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'agpCallStatus',
				title: window.lc.getValue("callStatus"),
				align: 'left',
				valign: 'middle',
				sortable: true,
//				formatter:function(value,row,index){
//				return window.lc.getValue("workStatus",value);
//			}
			},{
				field: 'agpLastDuration',
				title: window.lc.getValue("lastCallTime"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'agpLastFail',
				title: window.lc.getValue("lastCallFailReason"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("lastFail",value);
			}
			},{
				field: 'agpVoltage',
				title: window.lc.getValue("voltage"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'agpCurrent',
				title: window.lc.getValue("current"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}];
			if(type=="agp"){
				url="dmManager!getAgpList.action";
			}
		}
		if(type=="dsp"){
			columns=[{
				field: 'state',
				checkbox: true
			}, {
				field: 'portNo',
				title: window.lc.getValue("portNo"),
				align: 'left',
				valign: 'middle',
				sortable: true
//			}, {
//				field: 'runStatus',
//				title: window.lc.getValue("runStatus"),
//				align: 'left',
//				valign: 'middle',
//				clickToSelect: false,
//				formatter:function(value,row,index){
//					return window.lc.getValue("runStatus",value);
//				}
			},{
				field: 'dspWorkStatus',
				title: window.lc.getValue("workStatus"),
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
					return window.lc.getValue("dspWorkStatus",value);
				}
			},{
				field: 'dspPcmLaw',
				title: window.lc.getValue("pcmLaw"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("dspPcmLaw",value);
			}
			}, {
				field: 'dspWorkTime',
				title: window.lc.getValue("workTime"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return value+"&nbsp;"+window.lc.getValue("secs");
			}
			},{
				field: 'value6',
				title: window.lc.getValue("rstCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'dspChannelNum',
				title: window.lc.getValue("channelNum"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'dspChannelFail',
				title: window.lc.getValue("channelFail"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'dspRtpDelay',
				title: window.lc.getValue("rtpDelay"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'dspRtpDelayMax',
				title: window.lc.getValue("maxRtpDelay"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'dspRtpDbm',
				title: window.lc.getValue("voltage")+'(Dbm)',
				align: 'left',
				valign: 'middle',
				sortable: true,
			}];		
		}
		if(type=="lan" || type=="eth"){
			columns=[{
				field: 'state',
				checkbox: true
			}, {
				field: 'portNo',
				title: window.lc.getValue("portNo"),
				align: 'left',
				valign: 'middle',
				sortable: true
//			}, {
//				field: 'runStatus',
//				title: window.lc.getValue("runStatus"),
//				align: 'left',
//				valign: 'middle',
//				clickToSelect: false,
//				formatter:function(value,row,index){
//					return window.lc.getValue("runStatus",value);
//				}
			},{
				field: type=='lan'?'lanWorkState':'ethWorkState',
				title: window.lc.getValue("workStatus"),
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
					return window.lc.getValue("ethWorkState",value);
				}
			}, {
				field: 'value0',
				title: window.lc.getValue("rxPkt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value1',
				title: window.lc.getValue("txPkt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value2',
				title: window.lc.getValue("txByte"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value3',
				title: window.lc.getValue("rxByte"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}];		
		}
		obj.type=t;
		obj.columns=columns;
		obj.url=url;
		return obj;
	}
    return {
        createHtml:createHtml,
        createPortList:createPortList
    };
});


