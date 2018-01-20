Ext.require('app.store.monitor.PmdGwCurModel');

Ext.define('app.store.monitor.PmdGwCurStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGwCurModel',
    storeId:'pmdGwCurStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGwCurManager!getPmdGwCur.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gwCurList'
        }
    }
});
