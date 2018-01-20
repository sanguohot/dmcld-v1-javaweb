Ext.require('app.store.monitor.PmdSimCurModel');

Ext.define('app.store.monitor.PmdSimCurStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSimCurModel',
    storeId:'pmdSimCurStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdSimCurManager!getPmdSimCur.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'simCurList'
        }
    }
});
