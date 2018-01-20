Ext.require('app.store.operation.domain.AlarmModel');

Ext.define('app.store.operation.domain.AlarmStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.AlarmModel',
//    storeId:'domainListStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
//        url: 'alarmManager!getDomainList.action',
        url: 'alarmManager!getGenAlarmList.action',
        reader: {
            type: 'json',
            root: 'alarmList'
        }	
    },
//    pageSize:2
});
console.log("load alarm store");