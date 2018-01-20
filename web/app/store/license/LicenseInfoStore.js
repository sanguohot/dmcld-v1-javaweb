Ext.require('app.store.license.LicenseInfoModel');

Ext.define('app.store.license.LicenseInfoStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.license.LicenseInfoModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'licenseManager!getLicense.action',
            reader: {
                type: 'json',
                root: 'licenseList'
            }	
        }
});