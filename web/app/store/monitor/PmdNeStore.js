Ext.require('app.store.monitor.PmdNeModel');

Ext.define('app.store.monitor.PmdNeStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdNeModel',
//    storeId:'pmdNeStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdNe15Manager!getPmdNe15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList'
        }
    }
});
