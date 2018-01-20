Ext.require('app.store.operation.OperationModel');

Ext.define('app.store.operation.OperationStore', {
		extend:'Ext.data.TreeStore',
        model: 'app.store.operation.OperationModel',
        autoLoad:false,
        storeId:'operationTreeStore',
        proxy: {
            type: 'ajax',
            url: 'getOperationRootTree.action',
//            url:'temp/operationTree.json',
//        	type: 'json',
            root: 'children',
            timeout:10*60*1000
        }
//        folderSort: true
});