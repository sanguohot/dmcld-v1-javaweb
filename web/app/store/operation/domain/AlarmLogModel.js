Ext.define('app.store.operation.domain.AlarmLogModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'neAlias',type: 'string'},
	         {name: 'alarmName',type: 'string'},
	         {name: 'causeName',type: 'string'},
	         {name: 'causeDesc',type: 'string'},
	         {name: 'alarmDesc',type: 'string'},
	         {name: 'alarmLevel',type: 'int'},
	         
	         {name: 'uuid',type: 'int'},	         
	         {name: 'recStatus',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'sysUuid',type: 'int'},
	         {name: 'alarmSn',type: 'int'},
	         {name: 'alarmIndex',type: 'int'},	         
	         {name: 'neUuid',type: 'int'},
	         {name: 'objectType',type: 'int'},
	         {name: 'objectId',type: 'int'},
	         {name: 'alarmId',type: 'int'},
	         {name: 'causeId',type: 'int'},
	         {name: 'neInnerSn',type: 'int'},
	         {name: 'reportTime',type: 'string'},
	         {name: 'recvTime',type: 'date'},
	         {name: 'cleanTime',type: 'date'},
	         {name: 'alarmFlag',type: 'int'},
	         {name:'alarmType',type:'int'},
	         {name: 'cleanFlag',type: 'int'},
	         {name: 'objectDesc',type: 'string'},
	         {name:'domainDescFlag',type:'int'},
             {name:'timeDescFlag',type:'int'},
             {name:'levelDescFlag',type:'int'},
	        ]
});
console.log("load alarm log model");