Ext.require('app.store.monitor.PmdSys15Model');

Ext.define('app.store.monitor.PmdSysCurStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSys15Model',
    storeId:'pmdSysCurStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdSysCurManager!getPmdSysCur.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'sysCurList'
        }	
    }
});
