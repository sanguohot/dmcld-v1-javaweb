Ext.define('app.store.RoamZoneModel', {
    extend: 'Ext.data.Model',
    fields: [
		{ name: 'domain' },
        { name: 'roamzoneid' },
		{ name: 'roamzonename'},
		{name:'desc'}
    ]
});