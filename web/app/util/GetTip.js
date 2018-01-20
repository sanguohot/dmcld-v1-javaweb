Ext.define('app.util.GetTip',{
	id:'GetTip',
	getObjNameTip: function(FieldLable){
		var str = lanControll.getLanValue('validInputTips');
		return str;
	},
	getObjNameTip2: function(FieldLable){
		var str = lanControll.getLanValue('validInputTips2');
		return str;
	},
	getUpgradeResultTip: function(successNum,failNum){
		var str1 = "<table><tr><td>"+lanControll.getLanValue('succNum')+":</td> <td style='color:green'>"
        	+successNum
        	+"</td>"
        	+"<td>&nbsp&nbsp&nbsp&nbsp&nbsp</td>"
        	+"<td>"+lanControll.getLanValue('failNum')+":</td> <td style='color:red'>"
        	+failNum
        	+"</td><td></tr></table>";
		return str1;
	},
	getNeResultTip: function(successNum,failNum){
		var str1 = "<table><tr><td>"+lanControll.getLanValue('succNum')+":</td> <td style='color:green'>"
        	+successNum
        	+"</td>"
        	+"<td>&nbsp&nbsp&nbsp&nbsp&nbsp</td>"
        	+"<td>"+lanControll.getLanValue('failNum')+":</td> <td style='color:red'>"
        	+failNum
        	+"</td><td></tr></table>";
		return str1;
	},
});
