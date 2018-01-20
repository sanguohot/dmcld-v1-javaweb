Ext.define('app.store.gwPortModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'portno',   type: 'int'},
			{name: 'status',   type: 'int'},
			{name: 'gwid', type: 'string'},
			{name: 'portgrpid', type: 'int'},
			{name: 'imei', type: 'string'},
			{name: 'remote_imei', type: 'int'},
			{name: 'bankid', type: 'string'},
			{name: 'bankname', type: 'string'},
			{name: 'bankport', type: 'int'},
			{name: 'simgrpid1', type: 'int'},
			{name: 'simgrpname1', type: 'string'},
			{name: 'simgrpid2',   type: 'int'},
			{name: 'simgrpname2', type: 'string'},
			{name: 'simgrpid3',type: 'int'},
			{name: 'simgrpname3', type: 'string'},
			{name: 'acd', type: 'int'},
			{name: 'asr', type: 'int'},
			{name: 'signal', type: 'int'},
			{name: 'ber', type: 'int'},	
			{name: 'error_cnt', type: 'int'},
			{name: 'last_load', type: 'date'},
			{name: 'last_use', type: 'date'},

			{name: 'modSignalLevel ', type: 'int'},
		]
});