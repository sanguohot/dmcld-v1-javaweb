Ext.require('app.store.sms.SimCallModel');

Ext.define('app.store.sms.SimCallStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.SimCallModel',
    storeId:'simCallStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'callManager!getSimCall.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'scList'
        }	
    }
});
