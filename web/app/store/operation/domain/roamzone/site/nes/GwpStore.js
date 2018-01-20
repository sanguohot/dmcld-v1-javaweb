Ext.require('app.store.operation.domain.roamzone.site.nes.GwPortInfoModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.GwpStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.GwPortInfoModel',
    storeId:'gwpStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'gwpManager!getGwp.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'gwpList'
        }	
    }
});
console.log("load gwp store");