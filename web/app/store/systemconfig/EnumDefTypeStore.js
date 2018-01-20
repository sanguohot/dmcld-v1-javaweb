Ext.require('app.store.systemconfig.EnumDefModel');

Ext.define('app.store.systemconfig.EnumDefTypeStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfig.EnumDefModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'enumDefManager!getType.action',
            reader: {
                type: 'json',
                root: 'enumDefList'
            }	
        }
});