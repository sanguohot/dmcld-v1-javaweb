Ext.require('app.store.operation.domain.roamzone.site.SiteInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.SiteInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.SiteInfoModel',
    storeId:'siteInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'siteManager!getSite.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'siteList'
        }	
    }
});
console.log("load siteinfo store");