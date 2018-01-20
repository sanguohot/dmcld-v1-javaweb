Ext.define('app.store.operation.domain.roamzone.site.nes.BkPortInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'portUuid',type: 'int'},
	         {name: 'gwpUuid',type: 'int'},
	         {name: 'simUuid',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'status',type: 'int'},
	         {name: 'imsi',type: 'string'},
	         {name: 'atr',type: 'atr'},
	         {name: 'lastErrorCount',type: 'int'},
	         {name: 'lastBindTime',type: 'date'},
	         {name: 'lastUsedTime',type: 'date'},
	         
	         {name: 'curCallStatus',type: 'int'},
	         {name: 'curSmsStatus',type: 'int'},
	         {name: 'curUssdStatus',type: 'int'},
	         {name: 'roundTripDelay',type: 'int'},
	         {name: 'packetAll',type: 'int'},
	         {name: 'packetRetries',type: 'int'},
	         {name: 'packetTimeout',type: 'int'},
	      
	         
	         {name: 'neUuid',type: 'int'},
	         {name: 'type',type: 'int'},
	         {name: 'shelfNo',type: 'int'},
	         {name: 'slotNo',type: 'int'},
	         {name: 'portNo',type: 'int'},
	         {name: 'alias',type: 'string'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},

	         {name: 'neAlias',type: 'string'},
	         {name: 'neSn',type: 'string'},
	         {name: 'neSnStr',type: 'string'},
	         {name: 'operator',type: 'string'},
	         {name: 'gwpPortNoStr',type: 'string'},
	         {name: 'simImsi',type: 'string'},
	         {name: 'simAlias',type: 'string'},
	         {name: 'portAlias',type: 'string'},
	         
	         {name: 'portGrpUuid',type: 'int'},
	         {name: 'portGrpName',type: 'string'},
	        ]
});
console.log("load bkp info model");