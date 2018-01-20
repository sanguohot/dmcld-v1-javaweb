Ext.require('app.store.sms.SmsInGroupModel');

Ext.define('app.store.sms.SmsInGroupStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.SmsInGroupModel',
    storeId:'smsInGroupStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'smsInGroupManager!getSmsInGroup.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ssList'
        }	
    }
});
