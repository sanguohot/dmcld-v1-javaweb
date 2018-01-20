Ext.define('app.store.msg.MsgLModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'receivedUnread',type: 'int'},
	         {name: 'receivedRead',type: 'int'},
	         {name: 'receivedTotal',type: 'int'},
	         {name: 'sentTotal',type: 'int'},
	         {name: 'sendTotal',type: 'int'},
	         {name: 'unsentTotal',type: 'int'},
	         {name: 'checked',type: 'int'},
	         {name: 'unchecked',type: 'int'},
	         {name: 'roleId',type: 'int'},
	         {name: 'userUuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	        ]
});
console.log("load log model");