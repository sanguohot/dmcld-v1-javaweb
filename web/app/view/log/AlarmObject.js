Ext.define('app.view.log.AlarmObject',{
	system:4097,
	node:4099,
	domain:4352,
	ne:8192,
	sim:4358,
	port:9216,
	gwp:9217,
	bkp:9218,
	agp:9219,
	tgp:9220,
	eth:9221,
	lan:9222,
	dsp:9473,
	ss7:9474,
	pri:9475,
	sip:9476,
	h323:9477,
	r2:9478,
	getObjectTypes:function(node){
		var temp = node.toLowerCase();
		var objectTypes = "";
		if(temp == "fcloud"){
			
		}else if(temp == "system"){
			objectTypes = objectTypes+this.system;
		}else if(temp == "node"){
			objectTypes = objectTypes+this.node;
		}else if(temp == "fdomain"){
			objectTypes = objectTypes+this.domain+','
						+this.ne+','+this.bkp+','+this.gwp
						+','+this.agp+','+this.tgp+','
						+this.sip+','+this.eth+','+this.pri
						+','+this.ss7+','+this.dsp+','+this.tgp+','+this.lan
						+','+this.r2+','+this.h323;
		}else if(temp == "domain"){
			objectTypes = objectTypes+this.domain;
		}else if(temp=="gw"
			|| temp=="bk" || temp=="ag" || temp=="tg"){
			objectTypes = objectTypes+this.ne;
		}else if(temp=="bkport"){
			objectTypes = objectTypes+this.bkp;
		}else if(temp=="gwport"){
			objectTypes = objectTypes+this.gwp;
		}else if(temp=="agport"){
			objectTypes = objectTypes+this.agp;
		}else if(temp=="ftgp"){
			objectTypes = objectTypes+this.tgp;
		}else if(temp=="fsip"){
			objectTypes = objectTypes+this.sip;
		}else if(temp=="fpri"){
			objectTypes = objectTypes+this.pri;
		}else if(temp=="fss7"){
			objectTypes = objectTypes+this.ss7;
		}else if(temp=="feth"){
			objectTypes = objectTypes+this.eth;
		}else if(temp=="fdsp"){
			objectTypes = objectTypes+this.dsp;
		}else if(temp=="flan"){
			objectTypes = objectTypes+this.lan;
		}
		return objectTypes;
	},
	getObjectIds:function(node,record){
		var temp = node.toLowerCase();
		var objectIds = "";
		var name=record.raw.tid;
		if(temp=="domain" || temp=="gw" || temp=="system"
			|| temp=="bk" || temp=="ag" || temp=="tg"){
			objectIds = objectIds+name;
		}
		return objectIds;
	},
	getObjectType:function(eType){
		if(!eType)
			return null;
		var objType = null;
		if(eType=='gw' || eType=='ag' || eType=='bk' || eType=='tg'){
			objType = this.ne;
		}
		return objType;
	},
	getColorByLevel:function(level){
		var gray = "#BDBDBD",green = "#006400",blue = "#3665CD";orange = "#FE6400"
			,red = "#CA0032",black='black';
		var color = 'black';
		if(level==0 || level==1 || level==2){
			color = red;
		}else if(level==3 || level==4){
			color = orange;
		}else if(level==5 || level==6 || level==8){
			color = blue;
		}else{
			color = black;
		}
		return color;
	},
	getAlarmLevel:function(value,metaData,record,rowIndex,store,view,flag){
		var color = 'black';
		var level = value;
		var gray = "#BDBDBD",green = "#006400",blue = "#3665CD";orange = "#FE6400"
			,red = "#CA0032",black='black';
		if(flag=='cur'){
			if(record.get('confirmFlag')==1){
				color = gray;
			}else{							
				color = this.getColorByLevel(level);
			}
		}else if(flag=='his'){
			if(record.get('alarmType')==3){
				color = green;
			}else if(record.get('alarmType')==2){
				color = black;
			}else{
				color = this.getColorByLevel(level);
			}
		}else{
			color = this.getColorByLevel(level);
		}
		removeCSSRule(styleSheet,'.alarm_'+flag+rowIndex+'::before');
		var content = "";
		if(record.get('levelDescFlag')==1){
			content = "*";
		}
		var obj = {width:15,height:15,lineHeight:15,color:color,textAlign:'center',content:""};

		var tmp = '<span class=alarm_'+flag+rowIndex+">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"
		+rs.alarmLevel(value)+"&nbsp;"+content;
        if(color == red){
//            obj.color = orange;
//            setPseudo3(styleSheet,'.alarm_'+flag+rowIndex+'::before',obj);
            var tmp = "<img style='width:15px;height: 15px' src='./picture/alarm.png'/>&nbsp;"
                +rs.alarmLevel(value)+"&nbsp;"+content;
        }
//		console.log(tmp+color)
		return tmp + '|' + color;
	},
	getTimeCheckMax:function(value,metaData,record,rowIndex,store,view){
		var content = "";
		if(record.get('timeDescFlag')==1){
			content = "*";
		}
		return value+" "+content;
	}
});