define(["bootstrap-table","form-field"],function (bt,field){
	function createHtml(pid,id,params,type,from){
		pn=$("#"+pid);
		if(!pn){
			return;
		}
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
			+field.getRadioField("portType",1,"",[{value:1,text:window.lc.getValue("publicType")},{value:2,text:"E1"}
			,{value:3,text:"ETH"},{value:4,text:"DSP"},{value:5,text:"SS7"},{value:6,text:"PRI"}
			,{value:7,text:"SIP"}])
			+'</div>'			
		+'</div>'
		+'</div>'
		html+='</form>';
//		var html='<div id="'+id+'-toolbar" class="btn-group" role="group" aria-label="...">'
//		html+='<button id="'+id+'-back" type="submit" class="btn btn-info btn-sm"><i class="fa fa-reply bigger-130"></i></button>'
//		+'<button id="'+id+'-all" type="submit" class="btn btn-link">综合类型</button>'
//		+'<button id="'+id+'-e1" type="submit" class="btn btn-link">E1</button>'
//		+'<button id="'+id+'-eth" type="submit" class="btn btn-link">ETH</button>'
//		+'<button id="'+id+'-dsp" type="submit" class="btn btn-link">DSP</button>'
//		+'<button id="'+id+'-ss7" type="submit" class="btn btn-link">SS7</button>'
//		+'<button id="'+id+'-pri" type="submit" class="btn btn-link">PRI</button>'
//		+'<button id="'+id+'-sip" type="submit" class="btn btn-link">SIP</button>'
//		+field.getRadioField("portType",1,"",[{value:1,text:"综合类型"},{value:2,text:"E1"}
//		,{value:3,text:"ETH"},{value:4,text:"DSP"},{value:5,text:"SS7"},{value:6,text:"PRI"}
//		,{value:7,text:"SIP"}])
//		+'</div>'

		html+='<div class="container-fluid my-tab" >'
			+'<div class="row ">'
				+'<div class="col-md-12" id="'+id+'">'
				+'</div>'
			+'</div>'
			+'</div>';
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
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"line");
//		});
//		$("#"+id+"-all").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"all");
//		});
//		$("#"+id+"-e1").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"e1");
//		});
//		$("#"+id+"-eth").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"eth");
//		});
//		$("#"+id+"-dsp").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"dsp");
//		});
//		$("#"+id+"-ss7").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"ss7");
//		});		
//		$("#"+id+"-pri").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"pri");
//		});		
//		$("#"+id+"-sip").bind('click',function(){
//			createPortList(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},"sip");
//		});
		$("input[name=portType]").bind("click",function(){
			var value=$("input[name=portType]:checked").val();
			var str="all";
			if(value==1){
				
			}
			if(value==2){
				str="e1";
			}
			if(value==3){
				str="eth";
			}
			if(value==4){
				str="dsp";
			}
			if(value==5){
				str="ss7";
			}
			if(value==6){
				str="pri";
			}
			if(value==7){
				str="sip";
			}		
			createTable(pid,pid+"_tg",{neUuid:params.neUuid,domainUuid:params.domainUuid},str);
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
		$('#'+tid).bootstrapTable({
			method: 'get',
			url: "tgpManager!getPortByNe.action",
			cache: false,
//			height: 400,
			responseHandler:function(res){
				if(res && res.tgpList){
					return res.tgpList;
				}
				return res;
			},
			queryParams:function(p){
//				p.type="all";
				for(var x in params){
					p[x]=params[x];
				}
				p.type=con.type;
				return p;
			},
			striped: true,
			toolbar:"#"+id+"-toolbar",
			pagination: true,
			pageSize: 25,
//			pageList: [10, 25, 50, 100, 200],
			search: true,
			showColumns: true,
			showRefresh: true,
			showToggle:true,
			minimumCountColumns: 2,
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
		if(type=="e1"){
			var columns=[{
				field: 'state',
				checkbox: true
			}, {
				field: 'portNo',
				title: window.lc.getValue("portNo"),
				align: 'left',
				valign: 'middle',
				sortable: true
			},{
				field: 'alias',
				title: window.lc.getValue("alias"),
				align: 'left',
				valign: 'middle',
				sortable: true
			}, {
				field: 'modType',
				title: window.lc.getValue("type"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpModType",value);
			}
//			},{
//				field: 'runStatus',
//				title: window.lc.getValue("runStatus"),
//				align: 'left',
//				valign: 'middle',
//				clickToSelect: false,
//				formatter:function(value,row,index){
//					return window.lc.getValue("runStatus",value);
//				}
			},{
				field: 'workState',
				title: window.lc.getValue("workStatus"),
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpWorkState",value);
			}
			},{
				field: 'pcmMode',
				title: window.lc.getValue("pcmLaw"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpPcmMode",value);
			}
			},{
				field: 'frameMode',
				title: window.lc.getValue("frameMode"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpFrameMode",value);
			}
			},{
				field: 'lineCode',
				title: window.lc.getValue("lineCode"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpLineCode",value);
			}
			},{
				field: 'lineBuiltOut',
				title: window.lc.getValue("haulMode"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpLineBuiltOut",value);
			}
			},{
				field: 'clockSrc',
				title: window.lc.getValue("clockSrc"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("tgpClockSrc",value);
			}
			},{
				field: 'slaveType',
				title: window.lc.getValue("slaveType"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'slaveIp',
				title: window.lc.getValue("slaveIp"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'slaveTgNo',
				title: window.lc.getValue("slaveTgNo"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'slaveE1Count',
				title: window.lc.getValue("slaveE1Count"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'slaveStartNo',
				title: window.lc.getValue("slaveStartNo"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'slaveE1No',
				title: window.lc.getValue("slaveE1No"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value6',
				title: window.lc.getValue("txFrame"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value7',
				title: window.lc.getValue("rxFrame"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value8',
				title: window.lc.getValue("txFail"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'value9',
				title: window.lc.getValue("rxFail"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}];
		}else if(type=="eth"){
			var columns=[{
				field: 'state',
				checkbox: true
			}, {
				field: 'portNo',
				title: window.lc.getValue("portNo"),
				align: 'left',
				valign: 'middle',
				sortable: true
//			},{
//				field: 'runStatus',
//				title: window.lc.getValue("runStatus"),
//				align: 'left',
//				valign: 'middle',
//				clickToSelect: false,
//				formatter:function(value,row,index){
//					return window.lc.getValue("runStatus",value);
//				}
			},{
				field: 'ethMode',
				title: window.lc.getValue("mode"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("ethMode",value);
			}
			},{
				field: 'ethWorkState',
				title: window.lc.getValue("workStatus"),
				align: 'left',
				valign: 'middle',
				clickToSelect: false,
				formatter:function(value,row,index){
				return window.lc.getValue("ethWorkState",value);
			}
			},{
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
		
		}else if(type=="dsp"){
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
		}else if(type=="ss7"){
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
				field: 'ss7CurCalls',
				title: window.lc.getValue("curCallCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}, {
				field: 'ss7CurCallsMax',
				title: window.lc.getValue("maxCallCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Acd',
				title: window.lc.getValue("acd")+'('+window.lc.getValue("secs")+')',
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Asr',
				title: window.lc.getValue("asr")+'(%)',
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Type',
				title: window.lc.getValue("type"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("ss7Type",value);
			}
			},{
				field: 'ss7NetIndi',
				title: window.lc.getValue("netIndi"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("ss7NetIndi",value);
			}
			},{
				field: 'ss7Opc',
				title: window.lc.getValue("opc"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Dpc',
				title: window.lc.getValue("dpc"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Link0Status',
				title: window.lc.getValue("link0Status"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("ss7LinkStatus",value);
			}
			},{
				field: 'ss7Link0Slc',
				title: window.lc.getValue("link0Slc"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Link0Port',
				title: window.lc.getValue("link0Port"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Link0Ts',
				title: window.lc.getValue("link0Ts"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Link1Status',
				title: window.lc.getValue("link1Status"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("ss7LinkStatus",value);
			}
			},{
				field: 'ss7Link1Slc',
				title: window.lc.getValue("link1Slc"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Link1Port',
				title: window.lc.getValue("link1Port"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'ss7Link1Ts',
				title: window.lc.getValue("link1Ts"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}];				
		}else if(type=="pri"){

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
				field: 'priCurCalls',
				title: window.lc.getValue("curCallCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}, {
				field: 'priCurCallsMax',
				title: window.lc.getValue("maxCallCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'priAcd',
				title: window.lc.getValue("acd"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'priAsr',
				title: window.lc.getValue("asr"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'priProto',
				title: window.lc.getValue("protocol"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("priProto",value);
			}
			},{
				field: 'priSwside',
				title: window.lc.getValue("switchSide"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("priSwside",value);
			}
			},{
				field: 'priAlertIndi',
				title: window.lc.getValue("alertIndi"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("priAlertIndi",value);
			}
			}];				
		
		}else if(type=="sip"){

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
				field: 'sipCurCalls',
				title: window.lc.getValue("curCallCnt"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipAcd',
				title: window.lc.getValue("acd"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipAsr',
				title: window.lc.getValue("asr"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipRemoteAddr',
				title: window.lc.getValue("remoteAddr"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipRemotePort',
				title: window.lc.getValue("remotePort"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipRegFlag',
				title: window.lc.getValue("regFlag"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("sipRegFlag",value);
			}
			},{
				field: 'sipCallMode',
				title: window.lc.getValue("callMode"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("sipCallMode",value);
			}
			},{
				field: 'sipAuthType',
				title: window.lc.getValue("authType"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("sipAuthType",value);
			}
			},{
				field: 'sipSipT',
				title: window.lc.getValue("supportSipT"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("sipSipT",value);
			}
			},{
				field: 'sipDetectTrunk',
				title: window.lc.getValue("detectTrunk"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("sipDetectTrunk",value);
			}
			},{
				field: 'sipTransProto',
				title: window.lc.getValue("transProtocol"),
				align: 'left',
				valign: 'middle',
				sortable: true,
				formatter:function(value,row,index){
				return window.lc.getValue("sipTransProto",value);
			}
			},{
				field: 'sipProtoVer',
				title: window.lc.getValue("sipVer"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipAcctName',
				title: window.lc.getValue("sipAccount"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipBindGrp',
				title: window.lc.getValue("bindPstnGrp"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			},{
				field: 'sipExpireTime',
				title: window.lc.getValue("expireTime"),
				align: 'left',
				valign: 'middle',
				sortable: true,
			}];				
		
		}
		var t=type;
		if(type=="e1"){
			t="tgp";
		}

		obj.type=t;
		obj.columns=columns;
		return obj;
	}
    return {
        createHtml:createHtml,
        createPortList:createPortList
    };
});


