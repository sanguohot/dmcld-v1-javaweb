Ext.require('app.store.operation.domain.policy.PolicyInfoModel');

Ext.define('app.store.operation.domain.PolicyInDomainStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.policy.PolicyInfoModel',
    storeId:'policyInDomainStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'policyInDomainManager!getPolicyListByDomain.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'policyList'
        }	
    }
});
console.log("load policy info store");