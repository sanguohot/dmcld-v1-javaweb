Ext.require('app.store.util.ProvisionFileModel');

Ext.define('app.store.util.ProvisionFileStore', {
		extend:'Ext.data.Store',
        model: 'app.store.util.ProvisionFileModel',
        autoLoad:false,
        storeId:'provisionFileStore',
        proxy: {
            type: 'ajax',
            url: 'provisionFileManager!getProvisionLog.action',
            reader: {
                type: 'json',
                root: 'pfmList'
            },
            timeout:5*60*1000
        }
});