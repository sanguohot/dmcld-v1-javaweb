Ext.require('app.store.monitor.CdrModel');

Ext.define('app.store.monitor.DomainCdrStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.CdrModel',
    storeId:'domainCdrStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cdrManager!getDomainCdr.action',
        timeout:10*60*1000,
        reader: {
            type: 'json',
            root: 'cdrList'
        }	
    }
});
