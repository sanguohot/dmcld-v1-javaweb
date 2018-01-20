Ext.require('app.store.provision.producttype.version.VersionModel');

Ext.define('app.store.provision.producttype.VersionListStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.provision.producttype.version.VersionModel',
        autoLoad:false,
        remoteSort:true,
        proxy: {
            type: 'ajax',
            url: 'versionList.action',
            reader: {
                type: 'json',
                root: 'versionList'
            }	
        }
});