Ext.require('app.store.monitor.SmsModel');

Ext.define('app.store.monitor.DomainSmsStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.SmsModel',
    storeId:'domainSmsStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'smsManager!getDomainSms.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'smsList'
        }	
    }
});
