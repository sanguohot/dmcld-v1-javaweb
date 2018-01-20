define([],function (){
	function getList(){
		var list=[],vl=[2,4,6,7,12,14,15,16,17,20,22,24,25,26,27,28,29,30,40,41,42,43,44];
//		for(var i=1;i<=33;i++){
//			var text=window.lc.getValue("objectType",i);
//			var obj={value:i,text:text};
//			list.push(obj);
//		}
//		var value=40;
//		var text=window.lc.getValue("objectType",value);
//		var obj={value:value,text:text};
//		list.push(obj);
		for(var i=0;i<vl.length;i++){
			var text=window.lc.getValue("objectType",vl[i]);
			var obj={value:vl[i],text:text};
			list.push(obj);
		}
		return list;
	}
    return {
    	getList:getList
    };
});


