Ext.require('app.store.operation.domain.roamzone.site.nes.BkInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.BkInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.BkInfoModel',
    storeId:'bkInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'neManager!getBkAllInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'bkList'
        }	
    }
});
console.log("load neinfo store");