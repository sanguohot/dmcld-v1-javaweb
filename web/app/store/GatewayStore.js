
Ext.require('app.store.GatewayModel');

Ext.define('app.store.GatewayStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.GatewayModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/gateway.json',
        reader: {
            type: 'json',
            root: 'gateways',
            successProperty: 'success'
        }
    } 
});

