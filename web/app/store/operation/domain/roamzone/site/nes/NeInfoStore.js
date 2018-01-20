Ext.require('app.store.operation.domain.roamzone.site.nes.NeInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.NeInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
    storeId:'neInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'neManager!getNe.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList'
        }	
    }
});
console.log("load neinfo store");