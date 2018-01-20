Ext.require('app.store.provision.producttype.ProductTypeModel');

Ext.define('app.store.provision.producttype.ProductTypeStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.provision.producttype.ProductTypeModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'productTypeManager!getProductType.action',
            reader: {
                type: 'json',
                root: 'productTypeList'
            }	
        }
});