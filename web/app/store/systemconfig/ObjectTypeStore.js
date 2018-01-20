Ext.require('app.store.systemconfig.ObjectTypeModel');

Ext.define('app.store.systemconfig.ObjectTypeStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfig.ObjectTypeModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'objectTypeManager!getObjectTypeAll.action',
            reader: {
                type: 'json',
                root: 'otList'
            }	
        }
});