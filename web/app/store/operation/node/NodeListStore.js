Ext.require('app.store.operation.node.NodeInfoModel');

Ext.define('app.store.operation.node.NodeListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.node.NodeInfoModel',
    storeId:'nodeListStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'nodeManager!getNodes.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'nodeList'
        }	
    }
});