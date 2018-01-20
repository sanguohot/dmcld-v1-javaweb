Ext.define('app.store.SimPortModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'portno', type: 'int'},
			{name: 'domain', type: 'int'},
			{name: 'bankid',type: 'string'},
			{name: 'simgrpid', type: 'int'},
			{name: 'simgrpname', type:'string'},
			{name: 'imsi', type: 'string'},
			{name: 'gwid',type: 'string'},
			{name: 'gwname',type: 'string'},
			{name: 'gwportno',type: 'int'},
			{name: 'status', type: 'int'},
			{name: 'balance', type: 'float'},
			{name: 'call_time', type: 'int'},
			{name: 'sms_cnt', type: 'int'},
			{name: 'last_load', type: 'date'},
			{name: 'last_use', type: 'date'},
			{name: 'load_unload', type: 'date'}
		]
});