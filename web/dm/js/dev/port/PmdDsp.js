define([],function (){
	function getColumns(){
		return [{
			field: 'value0',
			title: window.lc.getValue("msgRetries"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value1',
			title: window.lc.getValue("recvDupMsg"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value2',
			title: window.lc.getValue("delayErr"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value3',
			title: window.lc.getValue("lostCnt"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value4',
			title: window.lc.getValue("jitterErr"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value5',
			title: window.lc.getValue("rtpErr"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value6',
			title: window.lc.getValue("rstCnt"),
			align: 'center',
			valign: 'middle'
		}];
	}
	
    return {
    	getColumns:getColumns
    };
});


