
Ext.require('app.store.GroupPolicyModel');

Ext.define('app.store.GroupPolicyStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.GroupPolicyModel',
	storeId:'GroupPolicyStore',
	autoLoad: false,	
    proxy: {
        type: 'ajax',
        url: 'data/groupPolicy.json',
        reader: {
            type: 'json',
            root: 'groupPolicyList'
            
        }
    }
});
console.log('GroupPolicyStore load.');