Ext.require('app.store.sms.SimCallModel');

Ext.define('app.store.sms.CallInGroupStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.SimCallModel',
    storeId:'callInGroupStore',
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
