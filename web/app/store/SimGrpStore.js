
Ext.require('app.store.SimGrpModel');

Ext.define('app.store.SimGrpStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.SimGrpModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/simgrp.json',
        reader: {
            type: 'json',
            root: 'simgrps',
            successProperty: 'success'
        }
    } 
});
console.log('simgrpstore load.');
