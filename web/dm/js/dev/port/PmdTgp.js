define([],function (){
	function getColumns(){
		return [{
				field: 'value0',
				title: window.lc.getValue("frameErr"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value1',
				title: window.lc.getValue("codeErr"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value2',
				title: window.lc.getValue("crcErr"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value3',
				title: window.lc.getValue("ebitErr"),
				align: 'center',
				valign: 'middle'
			},{
				field: 'value4',
				title: window.lc.getValue("workTime"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'value5',
				title: window.lc.getValue("callTime"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'value6',
				title: window.lc.getValue("sendFrame"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'value7',
				title: window.lc.getValue("recvFrame"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'value8',
				title: window.lc.getValue("sendFail"),
				align: 'center',
				valign: 'middle'				
			},{
				field: 'value9',
				title: window.lc.getValue("recvFail"),
				align: 'center',
				valign: 'middle'				
			}];
	}

	
    return {
    	getColumns:getColumns
    };
});


