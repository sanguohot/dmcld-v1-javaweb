Ext.require('app.store.monitor.CdrModel');

Ext.define('app.store.monitor.GwCdrStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.CdrModel',
    storeId:'gwCdrStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cdrManager!getGwCdr.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'cdrList'
        }	
    }
});
