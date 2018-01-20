Ext.require('app.store.operation.system.SysInfoModel');

Ext.define('app.store.operation.system.SysInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.system.SysInfoModel',
    storeId:'sysInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'sysManager!getSys.action',
        reader: {
            type: 'json',
            root: 'sysList'
        }	
    }
});
console.log("load sys info store");