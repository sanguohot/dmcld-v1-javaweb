Ext.require('app.store.operation.domain.AlarmLogModel');

Ext.define('app.store.operation.domain.AlarmLogStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.AlarmLogModel',
//    storeId:'domainListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'alarmLogManager!getLogList.action',
        reader: {
            type: 'json',
            root: 'alarmLogList'
        }	
    },
//    pageSize:2
});
console.log("load alarm log store");