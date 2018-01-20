Ext.require('app.store.operation.domain.roamzone.site.nes.GwpBkpSimModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.GwpBkpSimStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.GwpBkpSimModel',
    storeId:'gwpBkpSimStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'gwpManager!getGwpRelevanceInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gbsList'
        }	
    }
});
console.log("load gwp relevance info store");