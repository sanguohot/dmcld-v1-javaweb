Ext.require('app.store.operation.domain.roamzone.site.nes.BkPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.BkpStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.BkPortInfoModel',
    storeId:'bkpStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'bkpManager!getBkp.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'bkpList'
        }	
    }
});
console.log("load bkp store");