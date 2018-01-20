Ext.require('app.store.monitor.PmdGwp15Model');

Ext.define('app.store.monitor.PmdGwp15Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGwp15Model',
    storeId:'pmdGwp15Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGwp15Manager!getPmdGwp15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gwp15List'
        }
    }
});
