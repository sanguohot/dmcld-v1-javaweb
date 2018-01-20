Ext.define('app.store.provision.ProvisionModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'string'},
            {name:'name',type:'string'},
            {name:'eType',type:'string'},
            {name:'nid',type:'string'}
        ]
});