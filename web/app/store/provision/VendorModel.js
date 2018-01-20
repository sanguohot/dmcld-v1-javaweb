Ext.define('app.store.provision.VendorModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'vendorId',type:'int'},
            {name:'vendorName',type:'string'},
            {name:'versionCnt',type:'int'}
        ]
});