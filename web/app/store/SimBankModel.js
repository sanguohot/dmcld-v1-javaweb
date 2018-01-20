Ext.define('app.store.SimBankModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'id',type: 'int'},
			{name: 'name',type: 'string'},
			{name: 'createtime',type: 'date'},
			{name: 'currVersion',type: 'string'},
			{name: 'desc',   type: 'string'},
			{name: 'domain', type: 'string'},
			{name: 'encrypt', type: 'string'},
			{name: 'lasttime', type: 'string'},
			{name: 'lostrate', type: 'string'},
			{name: 'password', type: 'string'},
			{name: 'port', type: 'string'},
			{name: 'privategw', type: 'string'},
			{name: 'privateip', type: 'string'},
			{name: 'roundtrip', type: 'string'},
			{name: 'status', type: 'string'},
			{name: 'targetVersion', type: 'string'},
			{name: 'type', type: 'string'},
			{name: 'updateFlag', type: 'string'},
			{name: 'updatetime', type: 'date'}
			
		]
});