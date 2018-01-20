
Ext.require('app.store.BankTypeModel');

Ext.define('app.store.BankTypeStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.BankTypeModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/banktype.json',
        reader: {
            type: 'json',
            root: 'banktypes',
            successProperty: 'success'
        }
    } 
});

