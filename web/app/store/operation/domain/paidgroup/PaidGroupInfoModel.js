Ext.define('app.store.operation.domain.paidgroup.PaidGroupInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'totalCount',type: 'int'},
	         {name: 'usedCount',type: 'int'},
	         {name: 'verifyCount',type: 'int'},
	         {name: 'unusedCount',type: 'int'},
	         {name: 'failCount',type: 'int'},
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	         {name: 'detailDesc',type: 'string'},
	         {name: 'defaultFlag',type: 'int'},
	        ]
});