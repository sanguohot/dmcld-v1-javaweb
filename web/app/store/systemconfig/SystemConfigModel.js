Ext.define('app.store.systemconfig.SystemConfigModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'name',type: 'string'},
            {name:'eType',type:'string'},
            {name:'tid',type:'string'},
            {name:'nid',type:'string'},
        ]
});