Ext.require('app.store.common.RunLogModel');

Ext.define('app.store.common.RunLogStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.common.RunLogModel',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'runLogManager!getRunLogList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'logList'
        }	
    }
});