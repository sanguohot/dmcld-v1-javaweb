define([],function (){
	function getColumns(){
		return [{
			field: 'value0',
			title: window.lc.getValue("recvPkt"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value1',
			title: window.lc.getValue("sendPkt"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value2',
			title: window.lc.getValue("sendByte"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'value3',
			title: window.lc.getValue("recvByte"),
			align: 'center',
			valign: 'middle'
		}];
	}
	
    return {
    	getColumns:getColumns
    };
});


