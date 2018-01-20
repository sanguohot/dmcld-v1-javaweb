Ext.require('app.store.sms.SimUsslModel');

Ext.define('app.store.sms.SimUsslStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.SimUsslModel',
    storeId:'simUsslStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'usslManager!getSimUssl.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'suList'
        }	
    }
});
