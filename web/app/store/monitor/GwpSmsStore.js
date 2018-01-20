Ext.require('app.store.monitor.SmsModel');

Ext.define('app.store.monitor.GwpSmsStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.SmsModel',
    storeId:'gwpSmsStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'smsManager!getGwpSms.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'smsList'
        }	
    }
});
