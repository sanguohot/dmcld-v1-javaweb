Ext.require('app.store.log.LogModel');

Ext.define('app.store.log.LogStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.log.LogModel',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'logManager!getLogUserList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'logList'
        }	
    }
});
console.log("load log");