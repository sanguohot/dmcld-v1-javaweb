Ext.require('app.store.operation.system.SysInfoModel');

Ext.define('app.store.operation.system.SysAndLicInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.system.SysInfoModel',
    storeId:'sysInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'sysManager!getSysInfo.action',
        reader: {
            type: 'json',
            root: 'sysList3'
        }	
    }
});