
Ext.require('app.store.UpgradePolicyModel');

Ext.define('app.store.UpgradePolicyStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.UpgradePolicyModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/upgradepolicy.json',
        reader: {
            type: 'json',
            root: 'policyList',
            successProperty: 'success'
        }
    } 
});
console.log('UpgradePolicyStore load.');
