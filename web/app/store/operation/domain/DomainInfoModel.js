Ext.define('app.store.operation.domain.DomainInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'adminUserUuid',type: 'int'},
	         {name: 'defaultGrpUuid',type: 'int'},
	         {name: 'defaultVendorId',type: 'int'},
	         {name: 'vendorId',type: 'int'},
	         {name: 'specCloudUuid',type: 'int'},
	         {name: 'cloudUuid',type: 'int'},
	         {name: 'sysUuid',type: 'int'},
	         {name: 'procUuid',type: 'int'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},
	         {name: 'idleTime',type: 'int'},
	         {name: 'specCloudUuid',type: 'int'},
	         {name: 'specSysUuid',type: 'int'},
	         {name: 'timezoneFlag',type: 'int'},
	         {name: 'ntpServer1',type: 'string'},
	         {name: 'ntpServer2',type: 'string'},
	         {name: 'detailDesc',type: 'string'},
	         {name: 'userName',type: 'string'},
	         {name: 'serverName',type: 'string'},

	         {name: 'idleSwitchFlag',type: 'int'},
	         {name: 'smoothSwitchFlag',type: 'int'},
	         {name: 'switchTimeout',type: 'int'},
	         {name: 'type',type: 'int'},
	         {name: 'productId',type: 'int'},
	         //130227 add
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	        ]
});
console.log("load domain info model");