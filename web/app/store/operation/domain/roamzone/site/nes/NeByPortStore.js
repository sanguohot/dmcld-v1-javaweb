Ext.require('app.store.operation.domain.roamzone.site.nes.NeInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.NeByPortStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
    storeId:'neInfoByPortStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'portManager!getNeByPortUuid.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ne'
        }	
    }
});
console.log("load neinfo store");