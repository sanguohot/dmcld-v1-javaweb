Ext.require('app.store.operation.domain.config.AlarmDescSettingModel');

Ext.define('app.store.operation.domain.config.AlarmDescSettingStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.config.AlarmDescSettingModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'alarmDomainSettingManager!getDomainAlarm.action',
        reader: {
            type: 'json',
            root: 'daList'
        }	
    }
});