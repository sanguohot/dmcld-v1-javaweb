Ext.define('app.store.operation.domain.NumModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'number',type: 'string'},
	         {name: 'numberRole',type: 'int'},
	         {name: 'type',type: 'int'},
	         {name: 'callCnt',type: 'int'},
	         {name: 'lastCallTime',type: 'string'},
	         {name: 'srcIp',type: 'string'},
	         {name: 'dynamicWeight',type: 'int'},
	         {name: 'snumberMax',type: 'int'},
	         {name: 'dnumberMax',type: 'int'},
	         {name: 'blackInfectedFlag',type: 'int'},
	         {name: 'invalidFlag',type: 'int'},
	         {name: 'createTime',type: 'string'},
	        ]
});