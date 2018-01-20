Ext.define('app.store.operation.domain.roamzone.site.SiteInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'zoneUuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'defaultFlag',type: 'int'},
	         {name: 'domainUuid',type: 'int'},
	         {name: 'detailDesc',type: 'string'},
	         {name: 'nextSiteUuid',type: 'int'},
	        ]
});
console.log("load siteinfo model");