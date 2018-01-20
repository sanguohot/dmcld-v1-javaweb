Ext.require('app.store.license.LicSrvModel');

Ext.define('app.store.license.LicSrvStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.license.LicSrvModel',
        autoLoad:false,
        remoteSort:true,
        proxy: {
            type: 'ajax',
            url: 'licSrvManager!getLicSrvAllInfo.action',
            reader: {
                type: 'json',
                root: 'smList'
            }	
        }
});