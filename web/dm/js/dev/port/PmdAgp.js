define([],function (){
	function getColumns(){
		return [{
				field: 'value0',
				title: window.lc.getValue("totalOutCallCnt"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value1',
				title: window.lc.getValue("totalOutFailCall"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value2',
				title: window.lc.getValue("totalInCallCnt"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value3',
				title: window.lc.getValue("totalInFailCall"),
				align: 'center',
				valign: 'middle'
			}];
	}

	
    return {
    	getColumns:getColumns
    };
});


