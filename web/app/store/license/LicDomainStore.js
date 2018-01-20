Ext.require('app.store.license.LicDomainModel');

Ext.define('app.store.license.LicDomainStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.license.LicDomainModel',
        autoLoad:false,
        remoteSort:true,
        proxy: {
            type: 'ajax',
            url: 'licDomainManager!getLicDomainAllInfo.action',
            reader: {
                type: 'json',
                root: 'dmList'
            }	
        }
});