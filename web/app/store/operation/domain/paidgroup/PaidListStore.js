Ext.require('app.store.operation.domain.paidgroup.PaidInfoModel');

Ext.define('app.store.operation.domain.paidgroup.PaidListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.paidgroup.PaidInfoModel',
    storeId:'paidListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'paidListManager!getPaid.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'paidList'
        }	
    }
});
console.log("load paid group info store");