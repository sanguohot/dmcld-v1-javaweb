Ext.define('app.util.Color',{
	gray:"#BDBDBD",
	green:"#006400",
	blue:"#3665CD",
	orange:"#FE6400",
	red:"#CA0032",
	black:'#000000',
	white:"#FFFFFF",
	getValue:function(name){
		var value=name;
		if(name=='gray'){
			value='#BDBDBD';
		}else if(name=='green'){
			value='#006400';
		}else if(name=='blue'){
			value='#3665CD';
		}else if(name=='orange'){
			value='#FE6400';
		}else if(name=='red'){
			value='#CA0032';
		}else if(name=='black'){
			value='#000000';
		}else if(name=='white'){
			value='#FFFFFF';
		}
		return value;
	}
});
