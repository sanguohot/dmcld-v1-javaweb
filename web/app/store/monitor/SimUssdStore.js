Ext.require('app.store.monitor.UssdModel');

Ext.define('app.store.monitor.SimUssdStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.UssdModel',
    storeId:'simUssdStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ussdManager!getSimUssd.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ussdList'
        }	
    }
});
