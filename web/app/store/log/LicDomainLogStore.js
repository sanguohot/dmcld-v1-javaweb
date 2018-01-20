Ext.require('app.store.log.LicDomainLogModel');

Ext.define('app.store.log.LicDomainLogStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.log.LicDomainLogModel',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'licDomainLogManager!findDomainLogList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'logList'
        }	
    }
});