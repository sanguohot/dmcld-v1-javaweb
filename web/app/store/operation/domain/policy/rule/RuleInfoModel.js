Ext.define('app.store.operation.domain.policy.rule.RuleInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'policyUuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'grpUuid',type: 'int'},
	         {name: 'defaultFlag',type: 'int'},
	         {name: 'activateType',type: 'int'},
	         {name: 'priority',type: 'int'},
	         {name: 'timeBegin',type: 'date'},
	         {name: 'timeEnd',type: 'date'},
	         
	         {name: 'daySun',type: 'int'},
	         {name: 'dayMon',type: 'int'},
	         {name: 'dayTue',type: 'int'},
	         {name: 'dayWeb',type: 'int'},
	         {name: 'dayThu',type: 'int'},
	         {name: 'dayFri',type: 'int'},
	         {name: 'daySat',type: 'int'},
	         
	         {name: 'detailDesc',type: 'string'},
	         {name: 'grpName',type: 'string'},
	         {name: 'specCallRate',type: 'float'},
	        ]
});
console.log("load rule info model");