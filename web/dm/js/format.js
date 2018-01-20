define(function (){
	Date.prototype.format = function(format){ 
		var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
		} 

		if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 

		for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
		format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
		} 
		return format; 
	} 	
	function getRealValue(name,record,value){
		if(record){
			return record[name];
		}else if(value){
			return value;
		}else{
			return "";
		}
	}
	function getDisplayValue(name,record,value){
		if(record && record[name]){
			return record[name];
		}else if(value){
			return value;
		}else{
			return "-";
		}
	}
	function getTimeValue(name,record,value){
		if(record && record[name]){
			return timeStaticFormat(record[name]);
		}else if(value){
			return timeStaticFormat(value);
		}else{
			return "-";
		}
	}
	function getDate(strDate) {
		if(!strDate){
			return "";
		}
	    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
	    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
	    return date;
	}
	//input string;return string
	function timeStaticFormat(value){
		if(!value){
			return "-";
		}
		var valueD = getDate(value);
		var da = new Date(valueD);
		var off = valueD.getTimezoneOffset()
		da.setHours(da.getHours()-off/60)
		var va = da.format("yyyy-MM-dd hh:mm:ss");
 		return va;

	}
	function getDateTimeFormat(ft,tt){
		if(!ft){
			return "MM-dd";
		}
		if(!tt){
			tt=new Date().format("yyyy-MM-dd hh:mm:ss");
		}
		var diff=getDateDiff(ft,tt);
		console.log("diff:"+diff);
		if(diff<=1){
			return "MM-dd hh:mm";
		}else if(diff<=3){
			return "MM-dd hh:mm";
		}else if(diff<=7){
			return "MM-dd hh:mm";
		}else{
			return "MM-dd";
		}
	}
	function getDateDiff(startDate,endDate){  
//		var startTime = new Date(startDate).getTime();     
//		var endTime = new Date(endDate).getTime();
		//浏览器兼容
		var startTime = getDate(startDate).getTime();
		var endTime = getDate(endDate).getTime();
		var days = Math.floor((endTime - startTime)/(1000*60*60*24));
		return  days;    
	};
	function getFormatDate(date){
		if(date){
			return date.format("yyyy-MM-dd hh:mm:ss");
		}
		return null;
	}
	function browseToUtc(value){
		if(!value){
			return "-";
		}
		var valueD = getDate(value);
		var da = new Date(valueD);
		var off = valueD.getTimezoneOffset()
		da.setHours(da.getHours()+off/60)
		var va = da.format("yyyy-MM-dd hh:mm:ss");
 		return va;

	}
	//input string format;return string
	function timeFormat(value,format){
		var valueD = getDate(value);
		var da = new Date(valueD);
		var off = valueD.getTimezoneOffset()
		da.setHours(da.getHours()-off/60)
		var va = da.format(format);
 		return va;

	}
	function getPrivilegeImg(value){
		if(value){
//			return "<img src='/resources/images/accept.png'>";
			return '<i class="fa fa-check" style="color:#69aa46;"></i>&nbsp;';
		}else{
//			return "<img src='/resources/images/cancel.png'>";
			return '<i class="fa fa-times" style="color:#dd5a43;"></i>&nbsp;';
		}

	}
	function getRunStatus(value){
        var t=window.lc.getValue("runStatus",value);
        var ret=t;
        var cls="";
        if(value==0 || value==9 || value==18 || value==21 || value==6){
      	  cls="badge badge-danger";
        }else if(value==3 || value==10){
      	  cls="badge badge-success";
        }else if(value==11){
      	  cls="badge badge-warning";
        }else{
      	  cls="badge badge-info";
        }
        ret='<span class="'+cls+'">'+t+'</span>';
        return ret;
    }
	function getDbo(value){
  		if(value==1){
  			return window.lc.getValue("open");
  		}else{
  			return window.lc.getValue("close");
  		}
    }
	function getDevType(productId){
		if(isDag(productId)){
			return "DAG";
		}
		if(isMtg(productId)){
			return "MTG";
		}
		return "-";
	}
	function isDag(productId){
		var list=[11,12,15,16,17,18,19,80,81,82];
		for(var i=0;i<list.length;i++){
			if(list[i]==productId){
				return true;
			}
		}
		return false;
	}
	function isMtg(productId){
		var list=[1,2,3,4,5,6,7,8];
		for(var i=0;i<list.length;i++){
			if(list[i]==productId){
				return true;
			}
		}
		return false;
	}		
	return {
		getRealValue:getRealValue,
		getDisplayValue:getDisplayValue,
		getTimeValue:getTimeValue,
		timeStaticFormat:timeStaticFormat,
		timeFormat:timeFormat,
		getDate:getDate,
		getPrivilegeImg:getPrivilegeImg,
		isDag:isDag,
		isMtg:isMtg,
		getRunStatus:getRunStatus,
		getDbo:getDbo,
		getDevType:getDevType,
		browseToUtc:browseToUtc,
		getFormatDate:getFormatDate,
		getDateTimeFormat:getDateTimeFormat
	};
});


