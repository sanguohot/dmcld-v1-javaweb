Ext.require('app.store.operation.domain.policy.rule.RuleInfoModel');

Ext.define('app.store.operation.domain.policy.rule.RuleInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.policy.rule.RuleInfoModel',
    storeId:'ruleInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ruleManager!getRule.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ruleList'
        }	
    }
});
console.log("load rule info store");