Ext.require('app.store.license.LicDomainModel');
Ext.define('app.store.license.LicDomainListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.license.LicDomainModel',
    storeId:'licDomainListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'licDomainManager!getLicDomainList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'dmList'
        }
    }
});