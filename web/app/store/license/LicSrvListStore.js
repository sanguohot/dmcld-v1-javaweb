Ext.require('app.store.license.LicSrvModel');

Ext.define('app.store.license.LicSrvListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.license.LicSrvModel',
    storeId:'licSrvListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'licSrvManager!getLicSrvList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'smList'
        }	
    }
});