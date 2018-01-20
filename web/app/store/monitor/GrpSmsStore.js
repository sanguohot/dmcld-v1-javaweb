Ext.require('app.store.monitor.SmsModel');

Ext.define('app.store.monitor.GrpSmsStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.SmsModel',
    storeId:'grpSmsStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'smsManager!getGrpSms.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'smsList'
        }	
    }
});
