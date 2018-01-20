Ext.require('app.store.util.ComboxModel');

Ext.define('app.store.util.ComboxStore', {
		extend:'Ext.data.Store',
        model: 'app.store.util.ComboxModel',
        autoLoad:false,
        storeId:'ComboxStore',
        proxy: {
            type: 'ajax',
            url: 'getCombox.action',
            reader: {
                type: 'json',
                root: 'comboxList'
            },
            timeout:5*60*1000
        }
});