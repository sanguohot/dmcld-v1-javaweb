define([],function (){
	function isOffline(runStatus){
		if(runStatus==0 || runStatus==9 || runStatus==21 || runStatus==6 || runStatus==18){
			return true;
		}
		return false;
	}
    return {
    	isOffline:isOffline
    };
});


