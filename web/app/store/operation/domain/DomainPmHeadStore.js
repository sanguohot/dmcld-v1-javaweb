Ext.require('app.store.operation.domain.DomainPmHeadModel');

Ext.define('app.store.operation.domain.DomainPmHeadStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.DomainPmHeadModel',
    storeId:'domainPmHeadStore',
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