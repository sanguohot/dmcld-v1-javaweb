Ext.require('app.store.sms.SimSmlModel');

Ext.define('app.store.sms.SimSmlStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.SimSmlModel',
    storeId:'simSmlStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'smlManager!getSimSml.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ssList'
        }	
    }
});
