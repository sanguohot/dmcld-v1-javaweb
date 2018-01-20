Ext.require('app.store.operation.domain.roamzone.site.nes.BkPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.BkpInNeStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.BkPortInfoModel',
    storeId:'bkpInNeStore',
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