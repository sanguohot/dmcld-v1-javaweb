Ext.require('app.store.dm.NumDMModel');

Ext.define('app.store.dm.NumDMStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.dm.NumDMModel',
    autoLoad: false,
    remoteSort:false,
    proxy: {
        type: 'ajax',
        url: 'numDMManager!findNumList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'numList'
        }	
    }
});