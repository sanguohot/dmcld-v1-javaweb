Ext.require('app.store.operation.system.process.ProcessInfoModel');

Ext.define('app.store.operation.system.process.ProcessInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.system.process.ProcessInfoModel',
    storeId:'processInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'processManager!getProcess.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'procList'
        }	
    }
});
console.log("load process info store");