Ext.define('app.store.provision.producttype.ProductTypeModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'productId',type:'int'},
            {name:'productName',type:'string'}
        ]
});