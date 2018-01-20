Ext.require('app.store.operation.node.NodeGroupModel');

Ext.define('app.store.operation.node.NodeGroupStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.node.NodeGroupModel',
    storeId:'nodeGroupStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'nodeGrpManager!getList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'nodeGrpList'
        }	
    }
});
console.log("load node grp store");