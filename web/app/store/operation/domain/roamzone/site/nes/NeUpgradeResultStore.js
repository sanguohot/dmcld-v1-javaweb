Ext.require('app.store.operation.domain.roamzone.site.nes.NeUpgradeResultModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.NeUpgradeResultStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeUpgradeResultModel',
    storeId:'maintenanceNeUpgradeResultStore',
    autoLoad: false,
});
console.log("load NeUpgradeResult store");