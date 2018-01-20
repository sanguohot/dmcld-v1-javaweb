Ext.require('app.store.sms.SimCdrModel');

Ext.define('app.store.sms.SimCdrStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.SimCdrModel',
    storeId:'simCallStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'callInGroupManager!getCallInGroup.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'scList'
        }	
    }
});
