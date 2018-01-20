Ext.require('app.store.provision.producttype.version.VersionModel');

Ext.define('app.store.provision.producttype.version.VersionStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.provision.producttype.version.VersionModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'versionManager!getVersion.action',
            reader: {
                type: 'json',
                root: 'versionList'
            }	
        }
});