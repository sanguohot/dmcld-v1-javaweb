Ext.require('app.store.monitor.PmdGw24Model');

Ext.define('app.store.monitor.PmdGw24Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGw24Model',
    storeId:'pmdGw24Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGw24Manager!getPmdGw24.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gw24List'
        }
    }
});
