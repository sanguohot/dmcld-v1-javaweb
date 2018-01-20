Ext.define('app.store.monitor.UssdModel', {
    extend: 'Ext.data.Model',
    fields: [
             {name: 'uuid',type:'int'},
             {name: 'recStatus',type:'int'},
             {name: 'domainUuid',type:'int'},
             {name: 'ussdSn',type:'int'},
             {name: 'alias',type:'string'},
             {name: 'userTaskId',type:'int'},
             {name: 'specSimUuid',type:'int'},
             {name: 'gwpUuid',type:'int'},
             {name: 'simUuid',type:'int'},
             {name: 'ussdDirection',type:'int'},
             {name: 'ussdParam',type:'int'},
             {name: 'ussdStatus',type:'int'},
             {name: 'ussdResult',type:'int'},
             {name: 'ussdTime',type:'date'},
             {name: 'resultTime',type:'date'},
             {name: 'content',type:'string'},
             ]
});