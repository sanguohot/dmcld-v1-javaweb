Ext.require('app.store.monitor.CdrModel');

Ext.define('app.store.monitor.SimCdrStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.CdrModel',
    storeId:'simCdrStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cdrManager!getSimCdr.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'cdrList'
        }	
    }
});
