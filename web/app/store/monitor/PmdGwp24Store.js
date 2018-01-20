Ext.require('app.store.monitor.PmdGwp24Model');

Ext.define('app.store.monitor.PmdGwp24Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGwp24Model',
    storeId:'pmdGwp24Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGwp24Manager!getPmdGwp24.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gwp24List'
        }
    }
});
