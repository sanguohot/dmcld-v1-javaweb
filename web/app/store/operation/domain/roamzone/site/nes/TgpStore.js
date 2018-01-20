Ext.require('app.store.operation.domain.roamzone.site.nes.TgPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.TgpStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.TgPortInfoModel',
    storeId:'tgpStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'tgpManager!getTgpByUuid.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'tgpList'
        }	
    }
});