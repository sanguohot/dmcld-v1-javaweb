Ext.require('app.store.monitor.PmdGw15Model');

Ext.define('app.store.monitor.PmdGw15Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGw15Model',
    storeId:'pmdGw15Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGw15Manager!getPmdGw15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gw15List'
        }
    }
});
