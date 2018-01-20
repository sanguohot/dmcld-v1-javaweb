Ext.require('app.store.operation.domain.roamzone.site.SiteInfoModel');

Ext.define('app.store.operation.domain.roamzone.SiteInZoneStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.SiteInfoModel',
    storeId:'siteInZoneStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'siteInZoneManager!getSiteListByZone.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'siteList'
        }	
    }
});
console.log("load site in zone store");