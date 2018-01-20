Ext.require('app.store.monitor.UssdModel');

Ext.define('app.store.monitor.GwUssdStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.UssdModel',
    storeId:'gwUssdStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ussdManager!getGwUssd.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ussdList'
        }	
    }
});
