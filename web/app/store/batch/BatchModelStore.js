/**
 * Created by Rainc on 2014/11/22.
 */
Ext.require('app.store.batch.BatchModelModel');

Ext.define('app.store.batch.BatchModelStore',{
    extend: 'Ext.data.Store',
    model: 'app.store.batch.BatchModelModel',
    storeId:'batchModelStore',
    remoteSort:true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'batchManager!findBatchList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'batchList'
        }
    }
});
console.log("load batchModel store");