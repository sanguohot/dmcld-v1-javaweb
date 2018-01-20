Ext.require('app.store.operation.user.UserInfoModel');

Ext.define('app.store.operation.user.UserInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.user.UserInfoModel',
    storeId:'userInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'userManager!getUser.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'userList'
        }	
    }
});
console.log("load user info store");