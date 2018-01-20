Ext.require('app.store.operation.domain.roamzone.site.nes.AgPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.AgpStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.AgPortInfoModel',
    storeId:'agpStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'agpManager!getAgpByPort.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'agpList'
        }	
    }
});