
Ext.require('app.store.SimPortModel');

Ext.define('app.store.SimPortStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.SimPortModel',
	storeId:'SimPortStore',
	autoLoad: false,	
    proxy: {
        type: 'ajax',
        url: 'getSimPort.action',
        reader: {
            type: 'json',
            root: 'simPortList'
            
        }
    }
});
console.log('simportstore load.');
