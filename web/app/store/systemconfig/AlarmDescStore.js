Ext.require('app.store.systemconfig.AlarmDescModel');

Ext.define('app.store.systemconfig.AlarmDescStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfig.AlarmDescModel',
        autoLoad:false,
        remoteSort:true,
        proxy: {
            type: 'ajax',
            url: 'alarmDescManager!getAlarmAll.action',
            reader: {
                type: 'json',
                root: 'alarmDescList'
            }	
        }
});