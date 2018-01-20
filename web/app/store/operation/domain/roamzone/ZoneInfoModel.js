Ext.define('app.store.operation.domain.roamzone.ZoneInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'policyUuid',type: 'int'},
	         {name: 'defaultFlag',type: 'int'},
	         {name: 'localTimeZone',type: 'int'},
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	         {name: 'detailDesc',type: 'string'},
	        ]
});
console.log("load zoneinfo model");