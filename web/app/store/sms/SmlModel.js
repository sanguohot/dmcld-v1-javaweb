Ext.define('app.store.sms.SmlModel', {
    extend: 'Ext.data.Model',
    fields: [
             {name: 'uuid',type:'int'},
             {name: 'recStatus',type:'int'},
             {name: 'domainUuid',type:'int'},
             {name: 'smsSn',type:'int'},
             {name: 'userTaskId',type:'int'},
             {name: 'alias',type:'string'},
             {name: 'specGrpUuid',type:'int'},
             {name: 'specSimUuid',type:'int'},
             {name: 'gwpUuid',type:'int'},
             {name: 'simUuid',type:'int'},
             {name: 'smsNumber',type:'string'},
             {name: 'encode',type:'int'},
             {name: 'smsStatus',type:'int'},
             {name: 'smsReceipt',type:'int'},
             {name: 'smsResult',type:'int'},
             {name: 'splitCnt',type:'int'},
             {name: 'splitSuccCnt',type:'int'},
             {name: 'splitFailCnt',type:'int'},
             {name: 'smsTime',type:'date'},
             {name: 'resultTime',type:'date'},
             {name: 'receiptTime',type:'date'},
             {name: 'content',type:'string'},
             ]
});