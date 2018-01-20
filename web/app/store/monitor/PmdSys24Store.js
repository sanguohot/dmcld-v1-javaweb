Ext.require('app.store.monitor.PmdSys15Model');

Ext.define('app.store.monitor.PmdSys24Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSys15Model',
    storeId:'pmdSys24Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdSys24Manager!getPmdSys24.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'sys24List'
        }	
    }
});
