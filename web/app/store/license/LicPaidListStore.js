Ext.require('app.store.license.LicPaidInfoModel');

Ext.define('app.store.license.LicPaidListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.license.LicPaidInfoModel',
    storeId:'licPaidListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'licPaidCardManager!getLicPaidList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'lpcList'
        }	
    }
});