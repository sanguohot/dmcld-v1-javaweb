Ext.require('app.store.operation.domain.group.GroupInfoModel');

Ext.define('app.store.operation.domain.group.GroupInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.group.GroupInfoModel',
    storeId:'groupInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'groupManager!getGroup.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'groupList'
        }	
    }
});
console.log("load group info store");