Ext.require('app.store.log.LicSrvLogModel');

Ext.define('app.store.log.LicSrvLogStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.log.LicSrvLogModel',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'licSrvLogManager!findSrvLogList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'logList'
        }	
    }
});