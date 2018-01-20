Ext.define('app.store.dm.NumDMModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'type',type: 'int'},
	         {name: 'num',type: 'string'},
	         {name: 'action',type: 'int'},
	         {name: 'createTime',type: 'string'},
	        ]
});