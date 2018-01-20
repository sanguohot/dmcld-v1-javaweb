Ext.define('app.store.log.LogModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'serialNo',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'domainName',type: 'string'},
	         {name: 'userUuid',type: 'int'},
	         {name: 'userName',type: 'string'},
	         {name: 'generateTime',type: 'string'},
	         {name: 'ipAddr',type: 'string'},
	         {name: 'objectTypeName',type: 'string'},
	         {name: 'objectType',type: 'int'},
	         {name: 'objectName',type: 'string'},
	         {name: 'objectId',type: 'int'},
	         {name: 'batchSet',type: 'int'},
	         {name: 'operate',type: 'string'},
	         {name: 'execResult',type: 'int'},
	         {name: 'execSql',type: 'string'},
	        ]
});
console.log("load log model");