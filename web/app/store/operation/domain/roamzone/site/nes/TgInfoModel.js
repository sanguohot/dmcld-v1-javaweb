Ext.define('app.store.operation.domain.roamzone.site.nes.TgInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'alias',type: 'string'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},
	         {name:'domainUuid',type:'int'},
	         {name: 'siteUuid',type: 'int'},
	         {name:'policyUuid',type:'int'},
	         {name: 'vendorId',type: 'int'},
	         {name: 'productId',type: 'int'},
	         {name: 'productName',type: 'string'},
	         {name: 'packageVersion',type: 'string'},
	         {name: 'packageBuildTime',type: 'date'},
	         {name: 'detailVer',type: 'string'},
	         {name: 'sipAgent',type: 'string'},
	         {name: 'sipOwner',type: 'string'},
	         {name: 'cliPrompt',type: 'string'},
	         {name: 'dhcpDefault',type: 'string'},
	         {name: 'ipType',type: 'string'},
	         {name: 'ipAddr',type: 'string'},
	         {name: 'macAddrNum',type: 'string'},
	         {name: 'madeFactory',type: 'string'},
	         {name: 'madeSite',type: 'string'},
	         {name: 'madeDate',type: 'string'},
	         {name: 'testSite',type: 'string'},
	         {name: 'testDate',type: 'string'},
	         {name: 'password',type: 'string'},
	         {name: 'encryptType',type: 'string'},
	         {name: 'outerIpAddr',type: 'string'},
	         {name: 'innerIpAddr',type: 'string'},
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	         {name: 'lastRegTime',type: 'date'},
	         {name: 'regFailCount',type: 'int'},
	         {name: 'upgradeType',type: 'int'},
	         {name: 'upgradeFlag',type: 'int'},
	         {name: 'upgradeForceFlag',type: 'int'},
	         {name: 'targetSoftwareVer',type: 'string'},
	         {name: 'upgradeStatus',type: 'int'},
	         {name: 'lastUpgradeResult',type: 'int'},
	         {name: 'lastUpgradeTime',type: 'date'},
	         {name: 'portTotalCount',type: 'int'},
	         {name: 'portWorkCount',type: 'int'},
	         {name: 'detailDesc',type: 'string'},
	         {name: 'devTime',type: 'date'},
	         
	         {name: 'productSn',type: 'string'},
	         {name: 'productSnStr',type: 'string'},
	         {name: 'macAddrBegin',type: 'string'},

	         {name: 'nextNeAlarmSn',type: 'int'},
	         {name: 'syslogStatus',type: 'int'},
	         {name: 'logSysUuid',type: 'int'},
	         {name: 'syslogBeginDate',type: 'date'},
	         {name: 'syslogEndDate',type: 'date'},
	         {name: 'syslogExpiryDate',type: 'date'},
	         {name: 'syslogDebugLevel',type: 'int'},
	         {name: 'cdrLogFlag',type: 'int'},
	         {name: 'signalLogFlag',type: 'int'},
	         {name: 'mediaLogFlag',type: 'int'},
	         {name: 'systemLogFlag',type: 'int'},
	         {name: 'mngLogFlag',type: 'int'},

	         {name: 'ntpStatus',type: 'int'},
	         {name: 'autoRebootFlag',type: 'int'},
	         {name: 'timeChipStatus',type: 'int'},
	         {name: 'switchChipStatus',type: 'int'},
	         {name: 'curCpu',type: 'int'},
	         {name: 'avgCpu5',type: 'int'},
	         {name: 'avgCpu60',type: 'int'},
	         {name: 'avgCpu600',type: 'int'},
	         {name: 'freeMem',type: 'int'},
	         {name: 'totalMem',type: 'int'},
	         {name: 'memAosUsage',type: 'int'},
	         //tg
	         {name: 'tgUuid',type: 'int'},
	         {name: 'tgAlias',type: 'string'},
	         {name: 'portType1',type: 'int'},
	         {name: 'portCount1',type: 'int'},
	         {name: 'portType2',type: 'int'},
	         {name: 'portCount2',type: 'int'},
	         {name: 'portType3',type: 'int'},
	         {name: 'portCount3',type: 'int'},
	         {name: 'portType4',type: 'int'},
	         {name: 'portCount4',type: 'int'},
	         {name: 'portType5',type: 'int'},
	         {name: 'portCount5',type: 'int'},
	         {name: 'portType6',type: 'int'},
	         {name: 'portCount6',type: 'int'},
	         {name: 'portType7',type: 'int'},
	         {name: 'portCount7',type: 'int'},
	         {name: 'portType8',type: 'int'},
	         {name: 'portCount8',type: 'int'},
	        ]
});