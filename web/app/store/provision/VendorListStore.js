Ext.require('app.store.provision.VendorModel');

Ext.define('app.store.provision.VendorListStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.provision.VendorModel',
        autoLoad:false,
        storeId:'vendorListStore',
        proxy: {
            type: 'ajax',
            url: 'vendorManager!getVendor.action',
            timeout:5*60*1000,
            reader: {
                type: 'json',
                root: 'vendorList'
            }	
        }
});