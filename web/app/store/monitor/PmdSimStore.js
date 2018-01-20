Ext.require('app.store.monitor.PmdSimModel');

Ext.define('app.store.monitor.PmdSimStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSimModel',
    storeId:'pmdSimStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'simCardInGroupManager!getSim.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'simCardList',
            totalProperty:'total',
        }	
    }
});
