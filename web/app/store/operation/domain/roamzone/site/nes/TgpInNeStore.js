Ext.require('app.store.operation.domain.roamzone.site.nes.TgPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.TgpInNeStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.TgPortInfoModel',
    storeId:'tgpInNeStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'tgpManager!getPortByNe.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'tgpList'
        }	
    }
});