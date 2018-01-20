Ext.require('app.store.monitor.PmdGwpCurModel');

Ext.define('app.store.monitor.PmdGwpCurStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGwpCurModel',
    storeId:'pmdGwpCurStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGwpCurManager!getPmdGwpCur.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gwpCurList'
        }
    }
});
