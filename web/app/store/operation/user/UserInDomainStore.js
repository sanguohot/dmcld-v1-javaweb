Ext.require('app.store.operation.user.UserInfoModel');

Ext.define('app.store.operation.user.UserInDomainStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.user.UserInfoModel',
    storeId:'userInDomainStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'userListManager!getUserByDomain.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'userList'
        }	
    }
});
console.log("load user list store");