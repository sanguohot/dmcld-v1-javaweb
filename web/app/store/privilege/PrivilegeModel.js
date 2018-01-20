
Ext.define('app.store.privilege.PrivilegeModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'name',   type: 'string'},
            {name:'eType',type:'string'},
            {name:'tid',type:'string'},
            {name:'nid',type:'string'},
            {name:'uuid',type:'int'},
        ]
});