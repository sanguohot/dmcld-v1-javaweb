
Ext.require('app.store.SimCardModel');

Ext.define('app.store.SimCardStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.SimCardModel',
	storeId:'SimCardStore',
	autoLoad: false,	
    proxy: {
        type: 'ajax',
        url: 'data/simport.json',
        reader: {
            type: 'json',
            root: 'simports'
            
        }
    }
});
console.log('simcardstore load.');
