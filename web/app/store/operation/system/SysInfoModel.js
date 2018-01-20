Ext.define('app.store.operation.system.SysInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},
	         {name: 'sysIpAddr',type: 'string'},
	         {name: 'sysWebPort',type: 'int'},
	         {name: 'sysMsgPort',type: 'int'},
	         {name: 'sysSmsPort',type: 'int'},
	         {name: 'cloudUuid',type: 'int'},
	         {name: 'hbIntervalMs',type: 'int'},
	         {name: 'hbDeadCheckMs',type: 'int'},
	         {name: 'localTimeZone',type: 'int'},
	         {name: 'manageDomain',type: 'int'},
	         {name: 'manageDomainName',type: 'string'},


	         {name: 'pollIntervalSec',type: 'int'},
	         {name: 'diffIntervalSec',type: 'int'},
	         {name: 'updateIntervalSec',type: 'int'},
	         {name: 'auditIntervalSec',type: 'int'},
	         
	         {name: 'updateDelaySec',type: 'int'},
	         {name: 'auditDelaySec',type: 'int'},
	         {name: 'createDevPort',type: 'int'},
	         {name: 'demoPortNum',type: 'int'},
	         {name: 'demoRandom',type: 'int'},
	         {name: 'localScpPort',type: 'int'},
	         {name: 'iceIdleTimelen',type: 'int'},
	         {name: 'srvCheckTimelen',type: 'int'},
	         {name: 'provXmlUrl',type: 'string'},
	         {name: 'provUsername',type: 'string'},
	         {name: 'provPassword',type: 'string'},

	         {name: 'softwareVersion',type: 'string'},
	         {name: 'softwareBuildTime',type: 'date'},
	         
	         
	         {name: 'procNum',type: 'int'},
	         {name: 'loadVal',type: 'int'},
	         {name: 'createTime',type: 'date'},
	         {name: 'updateTime',type: 'date'},
	         {name: 'lastRegTime',type: 'date'},
	         {name: 'lastHbTime',type: 'date'},
	         {name: 'detailDesc',type: 'string'},

	         {name: 'syslogServerFlag',type: 'int'},
	         {name: 'lifeSecond',type: 'int'},
	         {name: 'bkNum',type: 'int'},
	         {name: 'gwNum',type: 'int'},
	         {name: 'cloudName',type: 'string'},
	         {name: 'specCloudName',type: 'string'},
	         //130814
	         {name: 'authSysUuid',type: 'int'},
	         {name: 'paidCardUuid',type: 'int'},
	         {name: 'paidCardType',type: 'int'},
	         {name: 'paidCardPrice',type: 'int'},
	         {name: 'trialBalance',type: 'float'},
	         {name: 'premiumBalance',type: 'float'},
	         {name: 'licNewSrvMagic',type: 'string'},
	         {name: 'licNewSignType',type: 'int'},
	         {name: 'licNewSimNum',type: 'int'},
	         {name: 'licNewHbmFlag',type: 'int'},
	         {name: 'licRenewDays',type: 'int'},
	         {name: 'licFirstCost',type: 'int'},
	         {name: 'licPeriodCost',type: 'int'},
	         {name: 'ethIpAddr',type: 'string'},
	         {name: 'lastHbTime02',type: 'date'},
	         
	         {name: 'totalNeCount',type: 'int'},
	         {name: 'totalSimCard',type: 'int'},
	         
	         {name: 'srvMode',type: 'int'},
	         {name: 'signType',type: 'int'},
	         {name: 'licStatus',type: 'int'},
	         {name: 'leftDays',type: 'int'},

	         {name: 'onlineNeCount',type: 'int'},
	         {name: 'onlineSimCard',type: 'int'},
	         
	         {name: 'smtpServer',type: 'string'},
	         {name: 'smtpPort',type: 'int'},
	         {name: 'startTls',type: 'int'},
	         {name: 'smtpUserName',type: 'string'},
	         {name: 'smtpPassWord',type: 'string'},
	         {name: 'mailFrom',type: 'string'},
	         
	         {name: 'canRegisterFlag',type: 'int'},
	         
	         {name: 'productId',type: 'int'},
	         {name: 'startTime',type: 'string'},
	         {name: 'curTapeCnt',type: 'int'},
	         {name: 'avgPktLoss',type: 'int'},
	         {name: 'totalTapeCnt',type: 'int'},
	         
	         {name: 'avgProcessTime',type: 'int'},
	         {name: 'maxProcessTime',type: 'int'},
	         {name: 'curPendingCnt',type: 'int'},
	         {name: 'totalProcess',type: 'int'},
	        ],
});