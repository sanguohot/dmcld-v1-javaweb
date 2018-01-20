Ext.define('app.store.GatewayModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'name',   type: 'string'},
			{name: 'desc',   type: 'string'},
			{name: 'gwid', type: 'string'},
			{name: 'siteid', type: 'int'},
			{name: 'sitename', type: 'string'},
			{name: 'roamzoneid', type: 'int'},
			{name: 'roamzonename', type: 'string'},
			{name: 'type',   type: 'int'},
			{name: 'mac',type: 'string'},
			{name: 'status', type: 'string'}
		]
});