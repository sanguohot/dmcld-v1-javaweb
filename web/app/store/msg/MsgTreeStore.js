Ext.require('app.store.msg.MsgTreeModel');

Ext.define('app.store.msg.MsgTreeStore',{
	extend: 'Ext.data.TreeStore',
    model: 'app.store.msg.MsgTreeModel',
    autoLoad: false,
//    proxy: {
//	    type: 'ajax',
//	    url: 'getOperationRootTree.action',
//	//    url:'temp/operationTree.json',
//	//	type: 'json',  
//	    root: 'children',
//	    timeout:10*60*1000
//    }
});
console.log("load log");