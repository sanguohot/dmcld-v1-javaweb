Ext.define('app.store.SuperUserModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'name',   type: 'string'},
			{name: 'password',   type: 'string'},
			{name: 'domain',   type: 'string'},
			{name: 'status', type: 'string'},
			{name: 'level', type: 'string'},
		]
});