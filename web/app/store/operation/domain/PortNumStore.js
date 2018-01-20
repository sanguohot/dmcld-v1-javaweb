Ext.require('app.store.operation.domain.PortNumModel');

Ext.define('app.store.operation.domain.PortNumStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.PortNumModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'neManager!getPortNumByNeUuid.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList'
        }	
    }
});
console.log("load domain info store");