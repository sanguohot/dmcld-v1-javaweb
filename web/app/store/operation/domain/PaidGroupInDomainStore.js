Ext.require('app.store.operation.domain.paidgroup.PaidGroupInfoModel');

Ext.define('app.store.operation.domain.PaidGroupInDomainStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.paidgroup.PaidGroupInfoModel',
    storeId:'paidGroupInDomainStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'paidGroupManager!getPaidGroupListByDomain.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'paidGroupList'
        }
    }
});
console.log("load paid group in domain info store");