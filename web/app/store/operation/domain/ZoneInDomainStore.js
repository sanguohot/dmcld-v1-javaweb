Ext.require('app.store.operation.domain.roamzone.ZoneInfoModel');

Ext.define('app.store.operation.domain.ZoneInDomainStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.ZoneInfoModel',
    storeId:'zoneInDomainStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'zoneInDomainManager!getZoneListByDomain.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'zoneList'
        }	
    }
});
console.log("load zone in domain store");