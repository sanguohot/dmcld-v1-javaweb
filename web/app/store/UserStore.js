
Ext.require('app.store.UserModel');

Ext.define('app.store.UserStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.UserModel',
	
	storeId: 'UserStore',
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/user.json',
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success'
        }
    } 
});
console.log('userstore.');
