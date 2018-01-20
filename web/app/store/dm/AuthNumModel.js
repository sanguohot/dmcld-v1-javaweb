Ext.define('app.store.dm.AuthNumModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'uuid',type: 'int'},
        {name: 'serverUuid',type: 'int'},
        {name: 'avgProcessTime',type: 'int'},
        {name: 'maxProcessTime',type: 'int'},
        {name: 'curPendingCnt',type: 'int'},
        {name: 'totalProcess',type: 'int'},
        {name: 'startTime',type: 'string'},
    ]
});