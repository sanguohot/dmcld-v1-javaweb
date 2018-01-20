Ext.define('app.store.operation.domain.roamzone.site.nes.GwpBkpSimModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'bkpAlias',type: 'string'},
	         {name: 'simImsi',type: 'string'},
	         {name: 'simAlias',type: 'string'},
	         {name: 'iccId',type: 'string'},
	         {name: 'bindImei',type: 'string'},
	         {name: 'operator',type: 'string'},
	         {name: 'mobile',type: 'string'},
	        ]
});
console.log("load gwp relevance info model");