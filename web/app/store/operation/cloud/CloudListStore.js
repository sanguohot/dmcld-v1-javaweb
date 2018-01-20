Ext.require('app.store.operation.cloud.CloudInfoModel');
Ext.define('app.store.operation.cloud.CloudListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.cloud.CloudInfoModel',
    remoteSort:true,
    storeId:'cloudListStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'cloudManager!getList.action',
        reader: {
            type: 'json',
            root: 'cloudList2'
        }	
    }
});