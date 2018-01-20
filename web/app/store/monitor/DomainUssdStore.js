Ext.require('app.store.monitor.UssdModel');

Ext.define('app.store.monitor.DomainUssdStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.UssdModel',
    storeId:'domainUssdStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ussdManager!getDomainUssd.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ussdList'
        }	
    }
});
