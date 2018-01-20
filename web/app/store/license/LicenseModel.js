Ext.define('app.store.license.LicenseModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'name',type: 'string'},
            {name:'eType',type:'string'},
            {name:'tid',type:'string'},
            {name:'nid',type:'string'},
        ]
});