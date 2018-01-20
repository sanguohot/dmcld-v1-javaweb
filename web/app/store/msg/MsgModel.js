Ext.define('app.store.msg.MsgModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'msgUuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'domainName',type: 'string'},
	         {name: 'roleId',type: 'int'},
	         {name: 'userUuid',type: 'int'},
	         {name: 'userName',type: 'string'},
	         {name: 'time',type: 'string'},
	         {name: 'theme',type: 'string'},
	         {name: 'content',type: 'string'},
	         {name: 'sendToRole',type: 'string'},
	         {name: 'readStatus',type: 'int'},
	         {name: 'srcDomainUuid',type: 'int'},
	         {name: 'srcRoleId',type: 'int'},
	         {name: 'srcUserUuid',type: 'int'},
	         {name: 'srcUserName',type: 'string'},
	         {name: 'cancelStatus',type:'int'},
	        ]
});
console.log("load log model");