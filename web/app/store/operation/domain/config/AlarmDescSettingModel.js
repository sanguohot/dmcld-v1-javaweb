Ext.define('app.store.operation.domain.config.AlarmDescSettingModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'alarmId',type: 'int'},
	         {name: 'alarmLevel',type: 'int'},
	         {name: 'alarmName',type: 'string'},
	         {name: 'alarmDesc',type: 'string'},
	         {name: 'taddUuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'taddAlarmId',type: 'int'},
	         {name: 'taddAlarmLevel',type: 'int'},
	         {name: 'taddAlarmName',type: 'string'},
	         {name: 'taddAlarmDesc',type: 'string'},
            {name:'taddAlarmType',type:'int'},
            {name:'taddTimeCheckMax',type:'int'},
            {name:'alarmType',type:'int'},
            {name:'timeCheckMax',type:'int'},
	        ]
});