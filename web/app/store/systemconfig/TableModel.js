Ext.define('app.store.systemconfig.TableModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'tableName',type:'string'},
            {name:'detailDesc',type:'string'}
        ]
});