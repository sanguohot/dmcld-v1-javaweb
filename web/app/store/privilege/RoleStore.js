
Ext.require('app.store.privilege.RoleModel');

Ext.define('app.store.privilege.RoleStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.privilege.RoleModel',
	
	autoLoad: false,	
    proxy: {
        type: 'ajax',
        url: 'roleManager!getList.action',
        reader: {
            type: 'json',
            root: 'roleList',
        }
    } 
});

