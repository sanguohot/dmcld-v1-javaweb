Ext.define('app.store.log.LicPaidLogModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'cardSn',type: 'string'},
	         {name: 'actionStatus',type: 'int'},
	         {name: 'actionResult',type: 'int'},
	         {name: 'actionTime',type: 'string'},
	         {name: 'cardStatus',type: 'int'},
	         {name: 'cardType',type: 'int'},
	         {name: 'cardPrice',type: 'int'},
	         {name: 'usedSysUuid',type: 'int'},
	         {name: 'usedDomainUuid',type: 'int'},
	         {name: 'usedTime',type: 'string'},
	         {name: 'detailDesc',type: 'string'},
	         {name: 'usedDomainName',type: 'string'},
	         {name: 'usedSysName',type: 'string'},
	        ]
});