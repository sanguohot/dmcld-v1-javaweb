Ext.require('app.store.operation.node.NodeInfoModel');

Ext.define('app.store.operation.node.NodeInfoStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.node.NodeInfoModel',
    storeId:'nodeInfoStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'nodeManager!getNode.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'nodeList'
        }	
    }
});
console.log("load node info store");