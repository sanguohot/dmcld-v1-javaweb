Ext.define('app.store.systemconfig.ObjectTypeModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'objectTypeId',type:'int'},
            {name:'name',type:'string'},
            {name:'detailDesc',type:'string'}
        ]
});