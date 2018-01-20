Ext.require('app.store.operation.domain.roamzone.site.nes.AgPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.AgpInNeStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.AgPortInfoModel',
    storeId:'agpInNeStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'agpManager!getPortByNe.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'agpList'
        }	
    }
});