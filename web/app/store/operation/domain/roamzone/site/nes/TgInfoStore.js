Ext.require('app.store.operation.domain.roamzone.site.nes.TgInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.TgInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.TgInfoModel',
    storeId:'tgInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'tgManager!getTgAllInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'tgList'
        }	
    }
});