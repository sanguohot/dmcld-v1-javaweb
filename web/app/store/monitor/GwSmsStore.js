Ext.require('app.store.monitor.SmsModel');

Ext.define('app.store.monitor.GwSmsStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.SmsModel',
    storeId:'gwSmsStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'smsManager!getGwSms.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'smsList'
        }	
    }
});
