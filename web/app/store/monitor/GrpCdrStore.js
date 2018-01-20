Ext.require('app.store.monitor.CdrModel');

Ext.define('app.store.monitor.GrpCdrStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.CdrModel',
    storeId:'grpCdrStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cdrManager!getGrpCdr.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'cdrList'
        }	
    }
});
