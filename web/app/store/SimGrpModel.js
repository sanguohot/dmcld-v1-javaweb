Ext.define('app.store.SimGrpModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'simgrpid', type: 'int'},
			{name: 'simgrpname', type: 'string'},
			{name: 'desc',type: 'string'},
		]
});