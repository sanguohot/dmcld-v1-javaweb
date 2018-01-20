Ext.require('app.store.common.BackupModel');

Ext.define('app.store.common.BackupStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.common.BackupModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'backupManager!findFileListFromCloud.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'bakList'
        }	
    }
});