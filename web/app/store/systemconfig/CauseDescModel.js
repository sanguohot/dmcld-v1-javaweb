Ext.define('app.store.systemconfig.CauseDescModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'causeId',type:'int'},
            {name:'causeName',type:'string'},
            {name:'causeDesc',type:'string'},
            {name:'causeDescCn',type:'string'}
        ]
});