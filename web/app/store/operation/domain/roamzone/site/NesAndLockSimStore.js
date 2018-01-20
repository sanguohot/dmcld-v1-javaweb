Ext.require('app.store.operation.domain.roamzone.site.nes.NeInfoModel');
Ext.define('app.store.operation.domain.roamzone.site.NesAndLockSimStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
    storeId:'nesAndLockSimStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'nesInSiteManager!getNeAndLockSim.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList'
        }	
    }
});