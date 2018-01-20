Ext.define('app.store.common.BackupModel',{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'uuid',type: 'int'},
		{name: 'relateUuid',type: 'int'},
		{name: 'domainName',type: 'string'},
		{name: 'userName',type: 'string'},
		{name: 'status',type: 'int'},
		{name: 'name',type: 'name'},
		{name: 'size',type: 'long'},
		{name: 'type',type: 'int'},
		{name: 'createTime',type: 'date'},
		{name: 'detailDesc',type: 'string'},
	]
});
