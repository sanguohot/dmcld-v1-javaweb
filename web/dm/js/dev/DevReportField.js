define([],function (){
	function getColumn(type){
		return [{
	        field: 'state',
	        checkbox: true,
	        cardVisible:false
		},{
			field: 'domainName',
			title: window.lc.getValue("ownDomain"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'productSn',
			title: window.lc.getValue("productSn"),
			align: 'center',
			valign: 'middle',
        	cellStyle:function(value,row,index){
        		return {
    			    css: {"min-width": "145px"}
    			};
        	}
		},{
			field: 'productName',
			title: window.lc.getValue("productName"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'chipType',
			title: window.lc.getValue("chipType"),
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
				if(!value){
					return "-";
				}
				return value;
        	}
		},window.list.getCreateTime(type=="add"?"generateTime":"firstGenerateTime"),{
			field: 'neIp',
			title: "IP",
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
				if(!value){
					return "-";
				}
				if(value.indexOf(":")>=0){
					value=value.substring(0,value.indexOf(":"));
				}
				return value;
        	},
        	cellStyle:function(value,row,index){
        		return {
    			    css: {"min-width": "110px"}
    			};
        	}
		},{
			field: 'realAddr',
			title: window.lc.getValue("addr"),
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
				if(!value){
					return "-";
				}
				if(value.indexOf("中国")>=0){
					value=value.replaceAll("中国","");
				}
				if(row.isp){
					value+="<br>"+row.isp;
				}
				return value;
        	},
        	cellStyle:function(value,row,index){
        		return {
    			    css: {"min-width": "100px"}
    			};
        	}
		},{
			field: type=="total"?'totalAlarmCnt':'riseAlarmCnt',
			title: window.lc.getValue("alarmCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalCallCnt':'riseCallCnt',
			title: window.lc.getValue("callCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalFailCallCnt':'riseFailCallCnt',
			title: window.lc.getValue("callFailCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalCallTimeSec':'riseCallTimeSec',
			title: window.lc.getValue("callTime")+"<br>("+window.lc.getValue("secs")+")",
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalAsr':'asr',
			title: window.lc.getValue("asr"),
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalAcdSucc':'acdSucc',
			title: window.lc.getValue("acd"),
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalRunTimeSec':'riseRunTimeSec',
			title: window.lc.getValue("neRunTime")+"<br>("+window.lc.getValue("secs")+")",
			align: 'center',
			valign: 'middle'
		},{
			field: type=="total"?'totalRestCnt':'restCnt',
			title: window.lc.getValue("resetCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'mostCpuRate',
			title: window.lc.getValue("maxCpuRate")+"<br>(%)",
			align: 'center',
			visible:type=="total"?false:true,
			valign: 'middle'
		},{
			field: 'highCpuWork',
			title: window.lc.getValue("cpuHighTimeRate")+"<br>(%)",
			align: 'center',
			visible:type=="total"?false:true,
			valign: 'middle'
		},{
			field: 'faxCnt',
			title: window.lc.getValue("faxCnt"),
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
				var ret=0;
				if(type=="add"){
					if(row.t30Cnt){
						ret+=row.t30Cnt;
					}
					if(row.t38Cnt){
						ret+=row.t38Cnt;
					}
				}else if(type=="total"){
					if(row.totalT30Cnt){
						ret+=row.totalT30Cnt;
					}
					if(row.totalT38Cnt){
						ret+=row.totalT38Cnt;
					}
				}

				return ret;
        	}
		},{
			field: 'value0',
			title: window.lc.getValue("value0"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		},{
			field: 'value1',
			title: window.lc.getValue("value1"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		},{
			field: 'value2',
			title: window.lc.getValue("value2"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		},{
			field: 'value3',
			title: window.lc.getValue("value3"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		},{
			field: 'value4',
			title: window.lc.getValue("value4"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		},{
			field: 'value5',
			title: window.lc.getValue("value5"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		},{
			field: 'value6',
			title: window.lc.getValue("value6"),
			align: 'center',
			visible:type=="total"?true:false,
			valign: 'middle'
		}]
	}
    return {
    	getColumn:getColumn
    };
});


