Ext.define('app.store.systemconfig.EnumDefModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'typeName',type:'string'},
            {name:'enumId',type:'int'},
            {name:'typeCnt',type:'int'},
            {name:'enumValue',type:'string'}
        ]
});