Ext.require('app.store.operation.system.SysInfoModel');

Ext.define('app.store.operation.system.SysListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.system.SysInfoModel',
    storeId:'sysListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'sysListManager.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'sysList'
        }	
    }
});
console.log("load sys List store");