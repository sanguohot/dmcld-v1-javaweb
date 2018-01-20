
Ext.require('app.store.SuperUserModel');

Ext.define('app.store.SuperUserStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.SuperUserModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/superuser.json',
        reader: {
            type: 'json',
            root: 'superusers',
            successProperty: 'success'
        }
    } 
});
console.log('superuserstore load.');
