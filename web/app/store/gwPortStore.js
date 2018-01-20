
Ext.require('app.store.gwPortModel');

Ext.define('app.store.gwPortStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.gwPortModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/gwport.json',
        reader: {
            type: 'json',
            root: 'gwports',
            successProperty: 'success'
        }
    } 
});

