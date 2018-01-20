Ext.define('app.store.operation.domain.roamzone.SimCardModel',{
	extend: 'Ext.data.Model',
	fields: [
				{name: 'uuid', type: 'int'},
				{name: 'imsi', type: 'string'},
				{name: 'alias', type: 'string'},
				{name: 'adminStatus', type: 'int'},
				{name: 'oprStatus', type: 'int'},
				{name: 'runStatus', type: 'int'},
				{name: 'bkportUuid', type: 'int'},
				{name: 'domainUuid', type: 'int'},
				{name: 'grpUuid', type: 'int'},
				{name: 'origZoneUuid', type: 'int'},
				{name: 'lastSiteUuid', type: 'int'},
				{name: 'bkpUuid', type: 'int'},
				{name: 'iccId', type: 'string'},
				{name: 'bindImei', type: 'string'},
				{name: 'pin1Code', type: 'string'},
				{name: 'pin2Code', type: 'string'},
				{name: 'puk1Code', type: 'string'},
				{name: 'puk2Code', type: 'string'},
				{name: 'operator', type: 'string'},
				{name: 'operator1', type: 'string'},
				{name: 'mobile', type: 'string'},
				{name: 'smsc', type: 'string'},
				{name: 'moneyType', type: 'int'},
				{name: 'prepaidFee', type: 'float'},
				{name: 'totalCost', type: 'float'},
				{name: 'curBalance', type: 'float'},
				{name: 'leftCallTime', type: 'int'},
				{name: 'createTime', type: 'date'},
				{name: 'lastLoadTime', type: 'date'},
				{name: 'lastBindTime', type: 'date'},
				{name: 'lastUsedTime', type: 'date'},
				{name: 'deactiveReason', type: 'int'},
				{name: 'lastDeactiveReason', type: 'int'},
				{name: 'blockedFlag', type: 'int'},
				{name: 'lowBalanceFlag', type: 'int'},
				{name: 'noBalanceFlag', type: 'int'},
				{name: 'promotionFlag', type: 'int'},
				{name: 'gwpUuid', type: 'int'},
				{name: 'bkpPortNoStr', type: 'string'},
				{name: 'gwpPortNoStr', type: 'string'},

				{name: 'simNumber', type: 'string'},
				{name: 'localSimFlag', type: 'int'},
				{name: 'localGwpUuid', type: 'int'},
				{name: 'hbmAcdFailCount', type: 'int'},
				{name: 'hbmSmsFailCount', type: 'int'},
				{name: 'hbmCallFailCount', type: 'int'},
				{name: 'hbmDtmfFailCount', type: 'int'},
				{name: 'simRechargedFlag', type: 'int'},
				{name: 'paidListUuid', type: 'int'},
				
		
				//130227 add
				{name: 'lastPromTime', type: 'date'},
				{name: 'promotionReport', type: 'string'},
				//130228 add
				{name: 'promotionTime', type: 'date'},
				//130311 add
				{name: 'promotionStatus', type: 'int'},
				{name: 'promotionCount', type: 'int'},
				//130313 add
				{name: 'promotionGrpUuid', type: 'int'},

				{name: 'hbmRegFailCount', type: 'int'},

				{name: 'lastBalance', type: 'float'},
				{name: 'lastBalanceTime', type: 'date'},
				{name: 'promCallTime', type: 'int'},
				{name: 'lastSiteName', type: 'string'},

				{name: 'hbmAcdShortCount', type: 'int'},
				{name: 'lastGroupTime', type: 'date'},
				
				{name: 'nextSiteUuid', type: 'int'},
				{name: 'detailDesc', type: 'string'},

				{name: 'hbmAcdSmsCount', type: 'int'},
				
	        ]
});
















