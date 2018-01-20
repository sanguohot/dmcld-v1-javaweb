Ext.require('app.store.monitor.PmdSys15Model');

Ext.define('app.store.monitor.PmdSys15Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSys15Model',
    storeId:'pmdSys15Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdSys15Manager!getPmdSys15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'sys15List'
        }	
    }
});
