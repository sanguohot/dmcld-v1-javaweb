Ext.require('app.store.operation.domain.roamzone.SimCardModel');

Ext.define('app.store.operation.domain.roamzone.SimCardStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.SimCardModel',
    storeId:'simCardStore',
    remoteSort:true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'simCardInGroupManager!getSimCard.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'simCardList',
            totalProperty:'total',
        }	
    }
});
console.log("load simcard store");