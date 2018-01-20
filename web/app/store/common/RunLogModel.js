Ext.define('app.store.common.RunLogModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'recStatus',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'domainName',type: 'string'},
	         {name: 'logSn',type: 'int'},
	         {name: 'logIndex',type: 'int'},
	         {name: 'objectType',type: 'int'},
	         {name: 'objectId',type: 'int'},
	         {name: 'reportTime',type: 'string'},
	         {name: 'log',type: 'string'},
	        ]
});
