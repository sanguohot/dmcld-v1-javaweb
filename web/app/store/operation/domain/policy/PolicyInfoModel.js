Ext.define('app.store.operation.domain.policy.PolicyInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'defaultFlag',type: 'int'},
	         {name: 'alias',type: 'string'},
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	         {name: 'detailDesc',type: 'string'},
	        ]
});
console.log("load policy info model");