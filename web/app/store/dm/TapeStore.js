Ext.require('app.store.dm.TapeModel');

Ext.define('app.store.dm.TapeStore',{
    extend: 'Ext.data.Store',
    model: 'app.store.dm.TapeModel',
    storeId:'tapeStore',
    remoteSort:true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'tapeManager!findTapeInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'tapeList'
        }
    }
});