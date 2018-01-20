define([],function (){
	function getColumns(){
		return [{
			field: 'value0',
			title: window.lc.getValue("ip2PstnCall"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value1',
			title: window.lc.getValue("pstn2IpCall"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value2',
			title: window.lc.getValue("ip2PstnFail"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value3',
			title: window.lc.getValue("pstn2IpFail"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value4',
			title: window.lc.getValue("lostCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value5',
			title: window.lc.getValue("workTime"),
			align: 'center',
			valign: 'middle'
		}];
	}
	
    return {
    	getColumns:getColumns
    };
});



