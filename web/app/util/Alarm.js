Ext.define('app.util.Alarm',{
	createAlarmType:function(){
		var alarmType = Ext.create("Ext.form.field.ComboBox",{
	        xtype: 'combo',
	        name: 'alarmType',
	        fieldLabel: 'Alarm Type',
			mode : 'local',
			editable:false,
			displayField : 'name',
			valueField : 'statusId',
			value:-1,
			queryMode : 'local',
			store : Ext.create('Ext.data.Store', {
				fields : [ 'name', 'statusId' ],
				data : [ {
					name : '-SELECT-',
					statusId : -1
				},{
					name : lanControll.getLanValue('alarmType_'+1),
					statusId :1
				}, {
					name : lanControll.getLanValue('alarmType_'+2),
					statusId :2
//				}, {
//					name : lanControll.getLanValue('alarmType_'+3),
//					statusId :3
				}]
			}),
		});
		return alarmType;
	}
});
