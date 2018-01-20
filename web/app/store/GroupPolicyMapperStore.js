Ext.require('app.store.GroupPolicyMapperModel');

Ext.define('app.store.GroupPolicyMapperStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.GroupPolicyMapperModel',
	storeId:'GroupPolicyMapperStore',
	autoLoad: false,	
    proxy: {
        type: 'ajax',
        url: 'data/groupPolicyMapper.json',
        reader: {
            type: 'json',
            root: 'groupPolicyMapperList'
            
        }
    }
});
console.log('GroupPolicyMapperStore load.');