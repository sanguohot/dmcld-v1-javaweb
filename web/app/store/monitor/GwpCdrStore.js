Ext.require('app.store.monitor.CdrModel');

Ext.define('app.store.monitor.GwpCdrStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.CdrModel',
    storeId:'gwpCdrStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cdrManager!getGwpCdr.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'cdrList'
        }	
    }
});
