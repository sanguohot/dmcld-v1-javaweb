Ext.define('app.store.privilege.MailModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'uuid', type: 'int'},
			{name: 'recStatus', type: 'int'},
			{name: 'domainUuid', type: 'int'},
			{name: 'alias', type: 'string'},
			{name: 'actionStatus', type: 'int'},
			{name: 'actionResult', type: 'int'},
			{name: 'userTaskType', type: 'int'},
			{name: 'userTaskId', type: 'int'},
			{name: 'mailIndex', type: 'int'},
			{name: 'mailSn', type: 'int'},
			{name: 'mailqUuid', type: 'int'},
			{name: 'dstAddr', type: 'string'},
			{name: 'path', type: 'string'},
			{name: 'content', type: 'string'},
			{name: 'subject', type: 'string'},
			{name: 'creatTime', type: 'date'},
			{name: 'mailResult', type: 'int'},
			{name: 'resultDesc', type: 'string'},
			{name: 'mailTime', type: 'date'},
			{name: 'contentType', type: 'int'},
			{name: 'logUuid', type: 'int'},
			{name: 'domainName', type: 'string'},
		]
});