Ext.require('app.store.operation.domain.roamzone.site.nes.NeNaInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.NeNasInSiteStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeNaInfoModel',
    storeId:'neNasInSiteStore',
    remoteSort:true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'neNaManager!findNeNaList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neNaList'
		}
    }
});