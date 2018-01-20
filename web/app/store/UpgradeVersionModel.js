Ext.define('app.store.UpgradeVersionModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'id',   type: 'string'},
			{name: 'name',   type: 'string'},
			{name: 'type',   type: 'string'},
			{name: 'status', type: 'string'},
			{name: 'version', type: 'string'},
			{name: 'createTime', type: 'string'},
			{name: 'updateTime', type: 'string'},
			{name: 'description', type: 'string'}
		]
});