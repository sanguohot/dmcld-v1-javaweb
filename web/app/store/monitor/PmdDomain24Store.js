Ext.require('app.store.monitor.PmdDomain24Model');

Ext.define('app.store.monitor.PmdDomain24Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdDomain24Model',
    storeId:'pmdDomain24Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdDomain24Manager!getPmdDomain24.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'domain24List'
        }	
    }
});
