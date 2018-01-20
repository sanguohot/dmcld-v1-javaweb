Ext.require('app.store.operation.domain.group.GroupInfoModel');

Ext.define('app.store.operation.domain.GroupInDomainStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.group.GroupInfoModel',
    storeId:'groupInDomainStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'groupInDomainManager!getGroupListByDomain.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'groupList'
        }
    }
});
console.log("load group in domain info store");