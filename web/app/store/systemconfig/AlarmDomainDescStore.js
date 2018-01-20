Ext.require('app.store.systemconfig.AlarmDomainDescModel');

Ext.define('app.store.systemconfig.AlarmDomainDescStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfig.AlarmDomainDescModel',
        autoLoad:false,
        remoteSort:true,
        proxy: {
            type: 'ajax',
            url: 'alarmDomainDescManager!getAlarmDomainAll.action',
            reader: {
                type: 'json',
                root: 'alarmDomainDescList'
            }	
        }
});