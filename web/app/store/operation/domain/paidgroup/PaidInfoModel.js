Ext.define('app.store.operation.domain.paidgroup.PaidInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'paidGrpUuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'paidStatus',type: 'int'},
	         {name: 'paidMode',type: 'int'},
	         {name: 'paidNumber',type: 'string'},
	         {name: 'connectFlag',type: 'int'},
	         {name: 'callDuration',type: 'int'},
	         {name: 'paidContent',type: 'string'},
	         {name: 'paidReport',type: 'string'},
	         {name: 'paidSimUuid',type: 'int'},
	         {name: 'createTime',type: 'date'},
	         {name: 'lastUsedTime',type: 'date'},
	        ]
});
console.log("load paid info model");