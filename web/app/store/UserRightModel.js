Ext.define('app.store.UserRightModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'modelname', type: 'string'},
			{name: 'read', type: 'string'},
			{name: 'update',type: 'string'},
			{name: 'create', type: 'string'},
			{name: 'del', type:'string'},
		]
});