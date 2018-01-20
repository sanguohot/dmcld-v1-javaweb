
define([],function (){
	function getColumns(){
		return [{
			field: 'value0',
			title: window.lc.getValue("totalCallCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value1',
			title: window.lc.getValue("totalCallFail"),
			align: 'center',
			valign: 'middle'
		}];
	}
	
    return {
    	getColumns:getColumns
    };
});