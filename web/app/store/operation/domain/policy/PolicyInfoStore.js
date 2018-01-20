Ext.require('app.store.operation.domain.policy.PolicyInfoModel');

Ext.define('app.store.operation.domain.policy.PolicyInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.policy.PolicyInfoModel',
    storeId:'policyInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'policyManager!getPolicy.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'policyList'
        }	
    }
});
console.log("load policy info store");