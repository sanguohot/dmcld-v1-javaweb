Ext.require('app.store.log.LicPaidLogModel');

Ext.define('app.store.log.LicPaidLogStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.log.LicPaidLogModel',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'licPaidLogManager!findPaidLogList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'logList'
        }	
    }
});