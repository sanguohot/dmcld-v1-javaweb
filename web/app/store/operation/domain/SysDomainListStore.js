Ext.require('app.store.operation.domain.SysDomainModel');

Ext.define('app.store.operation.domain.SysDomainListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.SysDomainModel',
    remoteSort:true,
    storeId:'sysDomainListStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'domainListManager!getDomainListBySysId.action',
        reader: {
            type: 'json',
            root: 'domainList2'
        }	
    }
});
console.log("load domain list store");