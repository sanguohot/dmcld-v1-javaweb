Ext.require('app.store.provision.producttype.version.VersionModel');

Ext.define('app.store.provision.UpgradeVersionStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.provision.producttype.version.VersionModel',
        autoLoad:false,
        storeId:'upgradeVersionStore',
        proxy: {
            type: 'ajax',
            url: 'versionList.action',
            timeout:5*60*1000,
            reader: {
                type: 'json',
                root: 'versionList'
            }	
        }
});