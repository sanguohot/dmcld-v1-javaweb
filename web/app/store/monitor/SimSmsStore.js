Ext.require('app.store.monitor.SmsModel');

Ext.define('app.store.monitor.SimSmsStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.SmsModel',
    storeId:'simSmsStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'smsManager!getSimSms.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'smsList'
        }	
    }
});
