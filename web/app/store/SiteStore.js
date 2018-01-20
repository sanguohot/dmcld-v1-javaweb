
Ext.require('app.store.SiteModel');

Ext.define('app.store.SiteStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.SiteModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/site.json',
        reader: {
            type: 'json',
            root: 'site',
            successProperty: 'success'
        }
    } 
});
