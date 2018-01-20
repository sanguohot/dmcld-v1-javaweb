Ext.require('app.store.operation.domain.roamzone.site.nes.AgInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.AgInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.AgInfoModel',
    storeId:'agInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'agManager!getAgAllInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'agList'
        }	
    }
});