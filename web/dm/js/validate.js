define([],function (){
	function isIP(strIP) {
		if (!strIP) return false;
		var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
		if(re.test(strIP))
		{
		if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
		}
		return false;
	}
	function isEmail(str) {
		if (!str) return false;
//		var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
	//	var myreg=/^[a-z1-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
		var myreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
//		var Regex = new RegExp(myreg);
		if(!myreg.test(str)){
			return false;
		}
		return true;
	}
	function isPositveNum(str){
		var r = /^\+?[1-9][0-9]*$/;　　//正整数 
	    return r.test(str);
	}
    return {
    	isIP:isIP,
    	isEmail:isEmail,
    	isPositveNum:isPositveNum
    };
});


