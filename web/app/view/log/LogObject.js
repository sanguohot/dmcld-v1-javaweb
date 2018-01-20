Ext.define('app.view.log.LogObject',{
	dwg:1,
	ag:2,
	simbank:3,
	tg:4,
	getObjectType:function(eType){
		if(!eType)
			return 0;
		var objType = 0;
		if(eType=='gw'){
			objType = this.dwg;
		}else if(eType=='ag'){
			objType = this.ag;
		}else if(eType=='bk'){
			objType = this.simbank;
		}else if(eType=='tg'){
			objType = this.tg;
		}
		console.log(eType+'----'+objType)
		return objType;
	},
	getDomainUuid:function(eType,record){
		var temp = eType.toLowerCase();
		var objectId = 0;
		var name=record.raw.tid;
		if(temp=="domain"){
			objectId = name;
		}
		console.log(eType+'----domainUuid='+objectId)
		return objectId;
	},
	getObjectId:function(eType,record){
		var temp = eType.toLowerCase();
		var objectId = 0;
		var name=record.raw.tid;
		if(temp=="gw" || temp=="bk" || temp=="ag" || temp=="tg"){
			objectId = name;
		}
		return objectId;
	},
});