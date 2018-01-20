
Ext.require('app.store.UserRightModel');

Ext.define('app.store.UserRightStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.UserRightModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/userright.json',
        reader: {
            type: 'json',
            root: 'userrights',
            successProperty: 'success'
        }
    } 
});
console.log('UserRightStore load.');
