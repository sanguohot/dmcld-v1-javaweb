Ext.require('app.store.operation.domain.roamzone.site.nes.NeInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.NesInSiteStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
    storeId:'nesInSiteStore',
    remoteSort:true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'nesInSiteManager!getNeInSiteList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList'
        }	
    }
});
console.log("load nes in site info store");