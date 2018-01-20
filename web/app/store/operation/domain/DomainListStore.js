Ext.require('app.store.operation.domain.DomainInfoModel');

Ext.define('app.store.operation.domain.DomainListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.DomainInfoModel',
    storeId:'domainListStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'domainListManager.action',
        reader: {
            type: 'json',
            root: 'domainList'
        }	
    }
});
console.log("load domain list store");