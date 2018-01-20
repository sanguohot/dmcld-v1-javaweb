Ext.define('app.store.operation.cloud.CloudInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},
	         {name: 'vendorName',type: 'string'},
	         {name: 'productName',type: 'string'},
	         {name: 'cliPrompt',type: 'string'},
	         {name: 'passwordMd5',type: 'string'},
	         {name: 'softwareVersion',type: 'string'},
	         {name: 'softwareBuildTime',type: 'date'},
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	         {name: 'detailDesc',type: 'string'},
	         
	         {name: 'manDomainUuid',type: 'int'},
	         {name: 'manDomainName',type: 'string'},
	         {name: 'smtpServer',type: 'string'},
	         {name: 'smtpPort',type: 'int'},
	         {name: 'smtpUserName',type: 'string'},
	         {name: 'smtpPassWord',type: 'string'},
	         {name: 'mailFrom',type: 'string'},
	        ]
});
console.log("load cloudinfo model");