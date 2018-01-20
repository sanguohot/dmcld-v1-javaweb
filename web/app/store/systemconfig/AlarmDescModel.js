Ext.define('app.store.systemconfig.AlarmDescModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'alarmId',type:'int'},
            {name:'alarmLevel',type:'int'},
            {name:'alarmName',type:'string'},
            {name:'alarmDesc',type:'string'},
            {name:'alarmDescCn',type:'string'},
            {name:'taddAlarmType',type:'int'},
            {name:'taddTimeCheckMax',type:'int'},
            {name:'alarmType',type:'int'},
            {name:'timeCheckMax',type:'int'},
        ]
});