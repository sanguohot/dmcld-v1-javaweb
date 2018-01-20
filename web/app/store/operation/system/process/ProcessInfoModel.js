Ext.define('app.store.operation.system.process.ProcessInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'sysUuid',type: 'int'},
	         {name: 'procNo',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},
	         {name: 'mpe',type: 'int'},
	         {name: 'loadVal',type: 'int'},
	         {name: 'onlineNeCount',type: 'int'},
	         {name: 'onlineSimCard',type: 'int'}
	        ]
});