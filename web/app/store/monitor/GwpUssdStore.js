Ext.require('app.store.monitor.UssdModel');

Ext.define('app.store.monitor.GwpUssdStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.UssdModel',
    storeId:'gwpUssdStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ussdManager!getGwpUssd.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ussdList'
        }	
    }
});
