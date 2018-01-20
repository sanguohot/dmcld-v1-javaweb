Ext.define('app.store.UserModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'name',   type: 'string'},
			{name: 'password',   type: 'string'},
			{name: 'status', type: 'string'},
			{name: 'level', type: 'string'},
		]
});