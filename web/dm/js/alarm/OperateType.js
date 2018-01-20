define([],function (){
	function getList(){
		var list=[];
		for(var i=1;i<=16;i++){
			var text=window.lc.getValue("operateType",i);
			var obj={value:i,text:text};
			list.push(obj);
		}
		for(var i=21;i<=23;i++){
			var text=window.lc.getValue("operateType",i);
			var obj={value:i,text:text};
			list.push(obj);
		}
		for(var i=30;i<=32;i++){
			var text=window.lc.getValue("operateType",i);
			var obj={value:i,text:text};
			list.push(obj);
		}
		return list;
	}
    return {
    	getList:getList
    };
});


