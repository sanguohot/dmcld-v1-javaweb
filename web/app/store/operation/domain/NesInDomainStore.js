Ext.require('app.store.operation.domain.roamzone.site.nes.NeInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.NesInDomainStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
    storeId:'nesInDomainStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'nesInSiteManager!getNeInDomainList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList'
        }	
    }
});
console.log("load nes in domain info store");