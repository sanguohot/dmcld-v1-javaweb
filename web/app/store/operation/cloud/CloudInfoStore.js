Ext.require('app.store.operation.cloud.CloudInfoModel');

Ext.define('app.store.operation.cloud.CloudInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.cloud.CloudInfoModel',
    storeId:'CloudInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cloudManager!getCloud.action',
        reader: {
            type: 'json',
            root: 'cloudList'
        },
        timeout:5*60*1000
    }
});