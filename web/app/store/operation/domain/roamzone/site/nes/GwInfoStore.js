Ext.require('app.store.operation.domain.roamzone.site.nes.GwInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.GwInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.GwInfoModel',
    storeId:'gwInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'neManager!getGwAllInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gwList'
        }	
    }
});