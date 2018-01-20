Ext.require('app.store.dm.AuthNumModel');

Ext.define('app.store.dm.AuthNumStore',{
    extend: 'Ext.data.Store',
    model: 'app.store.dm.AuthNumModel',
    storeId:'authNumStore',
    remoteSort:true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'authNumManager!findAuthNumInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'authNumList'
        }
    }
});