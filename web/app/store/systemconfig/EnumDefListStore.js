Ext.require('app.store.systemconfig.EnumDefModel');

Ext.define('app.store.systemconfig.EnumDefListStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfig.EnumDefModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'enumDefManager!getEnumDefByType.action',
            reader: {
                type: 'json',
                root: 'enumDefList'
            }	
        }
});