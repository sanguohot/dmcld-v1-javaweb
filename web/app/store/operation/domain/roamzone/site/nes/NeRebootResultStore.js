Ext.require('app.store.operation.domain.roamzone.site.nes.NeRebootResultModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.NeRebootResultStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.NeRebootResultModel',
    storeId:'maintenanceNeRebootResultStore',
    autoLoad: false,
});
console.log("load NeRebootResult store");