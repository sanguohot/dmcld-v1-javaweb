Ext.require('app.store.operation.domain.paidgroup.PaidGroupInfoModel');

Ext.define('app.store.operation.domain.paidgroup.PaidGroupInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.paidgroup.PaidGroupInfoModel',
    storeId:'paidGroupInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'paidGroupManager!getGroup.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'paidGroupList'
        }	
    }
});
console.log("load paid group info store");