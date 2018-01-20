Ext.require('app.store.operation.domain.DomainInfoModel');

Ext.define('app.store.operation.domain.DomainInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.DomainInfoModel',
    storeId:'domainInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'domainManager!getDomainInfo.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'dmList'
        }	
    }
});
console.log("load domain info store");