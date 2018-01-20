
Ext.require('app.store.SimBankModel');

Ext.define('app.store.SimBankStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.SimBankModel',
	
	storeId: 'SimBankStore',
	autoLoad: false,	
    proxy: {
        type: 'ajax',
        url: 'data/nes.json',
        reader:{
			type:'json',
			root:'nesList'
		}
    } 
});
console.log('simbankstore.');
