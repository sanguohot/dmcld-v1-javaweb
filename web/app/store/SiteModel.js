Ext.define('app.store.SiteModel', {
    extend: 'Ext.data.Model',
    fields: [
		{ name: 'domain' },
		{ name: 'siteid' },
        { name: 'sitename' },
        { name: 'roamzoneid' },
		{ name: 'roamzonename'},
		{ name: 'desc' }
    ]
});