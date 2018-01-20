Ext.require('app.store.operation.domain.roamzone.ZoneInfoModel');

Ext.define('app.store.operation.domain.roamzone.ZoneInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.ZoneInfoModel',
    storeId:'zoneInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'zoneManager!getZone.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'zoneList'
        }	
    }
});
console.log("load zoneinfo store");