Ext.define('app.util.DefWin',{
	getBodyStyle:function(){
		return {background: '#DFE9F6'};
	},
	getDefaults:function(sizeObj){
//		var labelWidth = 100;
//		if(sizeObj && sizeObj.winWidth){
//			var itemWidth = sizeObj.winWidth-20
//			labelWidth = Math.round((itemWidth)*4/10);
//		}
		
		return {
	        margins: '0 15 3 15',
	        labelWidth:sizeObj.labelWidth,
	        width:Math.floor((sizeObj.labelWidth)*10/4),
	        labelAlign:'right',
	    };
	},
	getWinWidth:function(labelWidth){
		var padding = 20;
		var winWidth = Math.floor((labelWidth)*10/4)+2*padding;
		
		return winWidth;
	},
	getCommitMargin:function(){
		return '0 15 5 0';
	},
	getTbarStyle:function(){
		return {background:'#D3E1F1'};
	},
});
