Ext.require('app.store.operation.domain.policy.rule.RuleInfoModel');

Ext.define('app.store.operation.domain.policy.RuleInPolicyStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.policy.rule.RuleInfoModel',
    storeId:'ruleInPolicyStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ruleInPolicyManager!getRuleListByPolicy.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ruleList'
        }	
    }
});
console.log("load rule in policy store");