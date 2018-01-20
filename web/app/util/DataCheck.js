Ext.define('app.util.DataCheck',{
	id:'DataCheck',
	getErrorStr: function(ObjName,exp){
		if(ObjName.length == 0){
			return lanControll.getLanValue('notBeNull');
//		}else if(ObjName.length < 3){
//			return lanControll.getLanValue('tooLittleInput');
		}else if(ObjName.length > 31){
			return lanControll.getLanValue('tooMoreInput');
		}
		if(exp==null||exp==undefined){
			exp = /^.*?['"\\\%].*?$/;
		}
		var Regex = new RegExp(exp);
		if(Regex.test(ObjName) == true){
			return lanControll.getLanValue('invalidInput');
		}
		return "";
	},
	getErrorStr2: function(ObjName,exp){
		if(ObjName.length == 0){
			return lanControll.getLanValue('notBeNull');
		}else if(ObjName.length > 31){
			return lanControll.getLanValue('tooMoreInput');
		}
//		if(exp==null||exp==undefined){
//			exp = /^[A-Za-z0-9][-_.A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
//		}
//		var Regex = new RegExp(exp);
//		if(Regex.test(ObjName) == false){
//			return lanControll.getLanValue('invalidInput');
//		}
		return "";
	},
	getErrorStr3: function(ObjName,exp){
		if(ObjName.length == 0){
			return lanControll.getLanValue('notBeNull');
		}else if(ObjName.length < 3){
			return lanControll.getLanValue('tooLittleInput');
		}else if(ObjName.length > 31){
			return lanControll.getLanValue('tooMoreInput');
		}
		if(exp==null||exp==undefined){
			exp = /^[A-Za-z0-9][-_.A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
		}
		var Regex = new RegExp(exp);
		if(Regex.test(ObjName) == false){
			return lanControll.getLanValue('invalidInput');
		}
		return "";
	},
	getSNErrorStr: function(SN){
		if(SN.length == 0){
			return lanControll.getLanValue('notBeNull');
		}else if(SN.length != 19){
			return lanControll.getLanValue('invalidLen');
		}
		var exp = /^[a-fA-F0-9]{4}(-)[a-fA-F0-9]{4}(-)[a-fA-F0-9]{4}(-)[a-fA-F0-9]{4}$/;
		var Regex = new RegExp(exp);
		if(Regex.test(SN) == false){
			return lanControll.getLanValue('invalidFormat');
		}
		return "";
	},
});
