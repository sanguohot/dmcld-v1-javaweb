Ext.require('app.store.operation.user.UserInfoModel');

Ext.define('app.store.operation.user.UserListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.user.UserInfoModel',
    storeId:'userListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'userListManager!getUserListByDomain.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'userList'
        }
    }
});